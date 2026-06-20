const EXCLUDED_AUTOMATIC_PAYMENT_METHOD_TYPES = [
  "amazon_pay",
  "klarna",
  "afterpay_clearpay",
  "affirm",
  "us_bank_account",
];

export async function createStripePaymentIntent(input: {
  amountCents: number;
  receiptEmail?: string;
  description: string;
  metadata: Record<string, string | number | undefined>;
  idempotencyKey?: string;
}) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new Error("Stripe secret key is not configured.");

  const body = new URLSearchParams();
  body.set("amount", String(input.amountCents));
  body.set("currency", "usd");
  body.set("description", input.description);
  body.set("automatic_payment_methods[enabled]", "true");
  body.set("automatic_payment_methods[allow_redirects]", "never");
  EXCLUDED_AUTOMATIC_PAYMENT_METHOD_TYPES.forEach((type) => body.append("excluded_payment_method_types[]", type));
  if (input.receiptEmail) body.set("receipt_email", input.receiptEmail);

  Object.entries(input.metadata).forEach(([key, value]) => {
    if (value !== undefined && value !== "") body.set(`metadata[${key}]`, String(value));
  });

  const response = await fetch("https://api.stripe.com/v1/payment_intents", {
    method: "POST",
    headers: {
      authorization: `Bearer ${secretKey}`,
      "content-type": "application/x-www-form-urlencoded",
      ...(input.idempotencyKey ? { "idempotency-key": input.idempotencyKey } : {}),
    },
    body,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || "Stripe payment intent failed.");
  return data as { id: string; client_secret: string; amount: number; currency: string };
}

export async function retrieveStripePaymentIntent(paymentIntentId: string) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new Error("Stripe secret key is not configured.");

  const response = await fetch(
    `https://api.stripe.com/v1/payment_intents/${encodeURIComponent(paymentIntentId)}`,
    {
      headers: {
        authorization: `Bearer ${secretKey}`,
      },
    },
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || "Stripe payment lookup failed.");
  return data as {
    id: string;
    status: string;
    amount: number;
    currency: string;
    metadata?: Record<string, string>;
  };
}
