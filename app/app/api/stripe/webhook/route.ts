import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendOrderNotification } from "@/lib/checkout/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PaymentIntentPayload = {
  id?: string;
  amount?: number;
  currency?: string;
  metadata?: Record<string, string>;
};

function verifyStripeSignature(payload: string, header: string | null, secret: string): boolean {
  if (!header) return false;
  let timestamp = "";
  const signatures: string[] = [];
  for (const part of header.split(",")) {
    const eq = part.indexOf("=");
    if (eq < 0) continue;
    const key = part.slice(0, eq);
    const value = part.slice(eq + 1);
    if (key === "t") timestamp = value;
    if (key === "v1") signatures.push(value);
  }
  if (!timestamp || signatures.length === 0) return false;
  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > 300) return false;
  const expected = crypto.createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest("hex");
  return signatures.some((signature) => {
    try {
      return (
        signature.length === expected.length &&
        crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
      );
    } catch {
      return false;
    }
  });
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "webhook_not_configured" }, { status: 500 });
  }

  const payload = await req.text();
  if (!verifyStripeSignature(payload, req.headers.get("stripe-signature"), secret)) {
    return NextResponse.json({ ok: false, error: "bad_signature" }, { status: 400 });
  }

  let event: { type?: string; data?: { object?: PaymentIntentPayload } } = {};
  try {
    event = JSON.parse(payload);
  } catch {
    return NextResponse.json({ ok: false, error: "bad_payload" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data?.object || {};
    const meta = intent.metadata || {};
    const amount = `$${((intent.amount || 0) / 100).toFixed(2)} ${(intent.currency || "usd").toUpperCase()}`;
    const customer = `${meta.first_name || ""} ${meta.last_name || ""}`.trim() || "(unknown)";
    const shipTo =
      [meta.ship_address, meta.ship_address2, meta.ship_city, meta.ship_state, meta.ship_zip]
        .filter(Boolean)
        .join(", ") || "(not in metadata)";

    await sendOrderNotification({
      subject: `Payment received: ${amount} — ${`${meta.medication || ""} ${meta.plan || ""}`.trim() || "unknown product"}`,
      heading: "Stripe payment succeeded (webhook)",
      rows: [
        ["Amount", amount],
        ["Customer", customer],
        ["Email", meta.email || "(unknown)"],
        ["Phone", meta.phone || ""],
        ["Product", `${meta.medication || ""} ${meta.plan || ""}`.trim() || "(unknown)"],
        ["Ship to", shipTo],
        ["PaymentIntent", String(intent.id || "")],
      ],
      note:
        "Safety-net notification: this fires for every successful charge. A separate order-captured email confirms checkout finished on the website; if that one never arrives for this payment, enter the order manually from the details above.",
    });
  }

  return NextResponse.json({ received: true });
}
