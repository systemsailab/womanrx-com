import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getCheckoutProduct } from "@/lib/checkout/products";
import { createStripePaymentIntent } from "@/lib/checkout/stripe";
import type { CheckoutOrderInput } from "@/lib/checkout/types";

export const runtime = "nodejs";

const LIVE_PAYMENT_BLOCKED_EMAILS = new Set(["checkout-healthcheck@example.com"]);

function normalizedEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function isLivePaymentBlockedEmail(value: unknown) {
  return LIVE_PAYMENT_BLOCKED_EMAILS.has(normalizedEmail(value));
}

function stripeIdempotencyKey(body: CheckoutOrderInput, product: NonNullable<ReturnType<typeof getCheckoutProduct>>) {
  const payload = {
    scope: "womanrx-checkout-payment-intent-v1",
    checkoutInstanceId: body.checkoutInstanceId || "",
    amountCents: product.amountCents,
    productId: product.productId,
    medication: product.medication,
    plan: product.plan,
    email: normalizedEmail(body.customer?.email),
    phone: body.customer?.phone?.replace(/\D/g, "") || "",
    shippingAddress: body.shipping?.address?.trim().toLowerCase() || "",
    shippingAddress2: body.shipping?.address2?.trim().toLowerCase() || "",
    shippingCity: body.shipping?.city?.trim().toLowerCase() || "",
    shippingState: body.shipping?.state?.trim().toUpperCase() || "",
    shippingZip: body.shipping?.zip?.trim() || "",
  };
  const digest = crypto.createHash("sha256").update(JSON.stringify(payload)).digest("hex").slice(0, 48);
  return "womanrx_checkout_pi_" + digest;
}

function validOrder(body: Partial<CheckoutOrderInput>): body is CheckoutOrderInput {
  if (!body.medication || !body.plan || !body.productId) return false;
  return true;
}

export async function POST(req: NextRequest) {
  let body: Partial<CheckoutOrderInput> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (isLivePaymentBlockedEmail(body.customer?.email)) {
    return NextResponse.json({ ok: false, error: "healthcheck_no_live_payment_intent" }, { status: 403 });
  }

  if (!validOrder(body)) {
    return NextResponse.json({ ok: false, error: "validation_failed" }, { status: 400 });
  }

  const product = getCheckoutProduct(body.medication, body.plan);
  if (product.productId !== Number(body.productId)) {
    return NextResponse.json({ ok: false, error: "product_mismatch" }, { status: 400 });
  }

  try {
    const intent = await createStripePaymentIntent({
      amountCents: product.amountCents,
      receiptEmail: /^.+@.+\..+$/.test(body.customer?.email || "") ? body.customer?.email : undefined,
      description: product.name,
      idempotencyKey: stripeIdempotencyKey(body, product),
      metadata: {
        product_id: product.productId,
        fulfillment_product_id: product.fulfillmentProductId,
        product_sku: product.sku,
        checkout_instance_id: body.checkoutInstanceId,
        medication: product.medication,
        plan: product.plan,
        months: product.months,
        first_name: body.customer?.firstName,
        last_name: body.customer?.lastName,
        email: body.customer?.email,
        phone: body.customer?.phone,
        ship_address: body.shipping?.address,
        ship_address2: body.shipping?.address2,
        ship_city: body.shipping?.city,
        ship_state: body.shipping?.state,
        ship_zip: body.shipping?.zip,
        billing_same_as_shipping: body.shipping ? (body.billingSameAsShipping ? "YES" : "NO") : undefined,
      },
    });

    return NextResponse.json({
      ok: true,
      paymentIntentId: intent.id,
      clientSecret: intent.client_secret,
      amount: intent.amount,
      currency: intent.currency,
    });
  } catch (error) {
    console.error("stripe payment intent failed", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "stripe_failed" },
      { status: 500 },
    );
  }
}
