import { NextRequest, NextResponse } from "next/server";
import { getCheckoutProduct } from "@/lib/checkout/products";
import { retrieveStripePaymentIntent } from "@/lib/checkout/stripe";
import { sendOrderNotification } from "@/lib/checkout/notify";
import { createHealthRxOfflineOrder } from "@/lib/womanrx/api";
import type { CheckoutOrderInput } from "@/lib/checkout/types";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  let body: Partial<CheckoutOrderInput> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!body.paymentIntentId) {
    return NextResponse.json({ ok: false, error: "missing_payment_token" }, { status: 400 });
  }

  try {
    const product = getCheckoutProduct(body.medication, body.plan);
    if (product.productId !== Number(body.productId)) {
      return NextResponse.json({ ok: false, error: "product_mismatch" }, { status: 400 });
    }

    const intent = await retrieveStripePaymentIntent(body.paymentIntentId);
    if (intent.status !== "succeeded") {
      return NextResponse.json({ ok: false, error: "payment_not_succeeded" }, { status: 402 });
    }
    if (intent.amount !== product.amountCents || intent.currency !== "usd") {
      return NextResponse.json({ ok: false, error: "payment_amount_mismatch" }, { status: 400 });
    }

    // The customer has paid real money from here down: capture the order and
    // confirm to them no matter what happens with fulfillment handoff.
    let orderId = "";
    let wlmdError = "";
    try {
      const data = await createHealthRxOfflineOrder({
        ...(body as CheckoutOrderInput & { paymentIntentId: string }),
        fulfillmentProductId: product.fulfillmentProductId,
      });
      orderId = data.order_id || "";
    } catch (error) {
      wlmdError = error instanceof Error ? error.message : "unknown_error";
      console.error("womanrx order handoff failed", error);
    }

    const customer = body.customer;
    const shipping = body.shipping;
    const customerName = `${customer?.firstName || ""} ${customer?.lastName || ""}`.trim();
    await sendOrderNotification({
      subject: wlmdError
        ? `ACTION NEEDED: WomanRx order paid, manual WLMD entry required — ${product.name}`
        : `New WomanRx order: ${product.name} — ${customerName || "unknown customer"}`,
      heading: wlmdError ? "Order paid — WLMD handoff FAILED (enter manually)" : "New order captured",
      rows: [
        ["Product", product.name],
        ["Amount", `$${(product.amountCents / 100).toFixed(2)}`],
        ["Customer", customerName || "(unknown)"],
        ["Email", customer?.email || ""],
        ["Phone", customer?.phone || ""],
        [
          "Ship to",
          [shipping?.address, shipping?.address2, shipping?.city, shipping?.state, shipping?.zip]
            .filter(Boolean)
            .join(", "),
        ],
        ["Billing same as shipping", body.billingSameAsShipping ? "YES" : "NO"],
        ["Promo code", body.promoCode || "(none)"],
        ["Stripe PaymentIntent", intent.id],
        ["WLMD order id", orderId || "(none — handoff failed)"],
      ],
      note: wlmdError ? `WLMD error: ${wlmdError}` : undefined,
    });

    return NextResponse.json({ ok: true, orderId });
  } catch (error) {
    console.error("order finalize failed", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "order_finalize_failed" },
      { status: 500 },
    );
  }
}
