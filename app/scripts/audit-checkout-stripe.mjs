#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CHECKOUT_CLIENT = path.join(ROOT, "app/checkout/CheckoutClient.tsx");
const PAYMENT_INTENT_ROUTE = path.join(ROOT, "app/api/checkout/payment-intent/route.ts");
const STRIPE_LIB = path.join(ROOT, "lib/checkout/stripe.ts");

function fail(message) {
  console.error(`checkout stripe audit failed: ${message}`);
  process.exitCode = 1;
}

const checkout = fs.readFileSync(CHECKOUT_CLIENT, "utf8");
const paymentIntent = fs.readFileSync(PAYMENT_INTENT_ROUTE, "utf8");
const stripeLib = fs.readFileSync(STRIPE_LIB, "utf8");
const payIndex = checkout.indexOf("async function pay()");
if (payIndex < 0) fail("manual card pay() handler not found");

const manualPay = payIndex >= 0 ? checkout.slice(payIndex) : "";
const submitIndex = manualPay.indexOf("const submitResult = await elements.submit()");
const createPaymentIndex = manualPay.indexOf("const paymentData = await createPayment({ updateCardState: false })");
const confirmIndex = manualPay.indexOf("stripe.confirmPayment");
const precreatePayment = checkout.indexOf("createPayment({ updateCardState: false })");
const clientSecretElements = checkout.indexOf("clientSecret: loaded.paymentData.clientSecret");
const mountPaymentElement = checkout.indexOf('.create("payment"');
const manualMountGuard = checkout.indexOf("mountedPaymentKey === paymentElementKey");
const manualMountStart = manualMountGuard >= 0 ? checkout.lastIndexOf("useEffect(() => {", manualMountGuard) : -1;
const manualMountEnd = checkout.indexOf("useEffect(() => {\n    if (canSubmitOrder) return;", manualMountStart);
const manualMount = manualMountStart >= 0 && manualMountEnd > manualMountStart ? checkout.slice(manualMountStart, manualMountEnd) : "";

if (precreatePayment < 0 || precreatePayment > clientSecretElements || clientSecretElements > mountPaymentElement) {
  fail("manual card Payment Element must mount with a real PaymentIntent client_secret before card entry");
}
if (manualMount.includes('mode: "payment"') || manualMount.includes("amount: product.amountCents") || checkout.includes("void createPayment();")) {
  fail("manual card checkout must not use the broken deferred-intent Payment Element path");
}
if (checkout.includes(") : !stripe || !elements ? (")) {
  fail("manual card checkout must render #payment-element before stripe/elements are set");
}
if (!manualMount.includes('type: "tabs"') || !manualMount.includes('terms:')) {
  fail("manual card Payment Element must use the known-visible tabs layout");
}
if (
  !checkout.includes('const mountingPaymentKey = useRef("")') ||
  !manualMount.includes("mountingPaymentKey.current === paymentElementKey") ||
  !manualMount.includes("mountingPaymentKey.current = paymentElementKey")
) {
  fail("manual card PaymentIntent creation must be guarded against remount loops");
}
if (!checkout.includes('key={paymentElementKey || "payment"} id="payment-element"')) {
  fail("manual card Payment Element host must be keyed to the mounted PaymentIntent");
}
if (checkout.includes("}, [canSubmitOrder, mountedPaymentKey, order, paymentElementKey]")) {
  fail("manual card Payment Element mount effect must not depend on mountedPaymentKey and unmount itself");
}
if (submitIndex < 0) fail("manual card flow must call elements.submit() before confirmPayment");
if (createPaymentIndex >= 0) fail("manual card Pay click must not create a second PaymentIntent");
if (confirmIndex < 0) fail("manual card flow confirmPayment call not found");
if (submitIndex >= 0 && confirmIndex >= 0 && submitIndex > confirmIndex) {
  fail("manual card flow calls elements.submit() after confirmPayment");
}
if (!manualPay.includes("!clientSecret || !paymentIntentId") || !manualPay.includes("paymentIntentId")) {
  fail("manual card flow must confirm and track the already-mounted PaymentIntent");
}
if (!manualPay.includes("Payment status: ${result.paymentIntent.status}")) {
  fail("manual card flow must treat non-succeeded PaymentIntent status as an error");
}
if (!checkout.includes("const submitResult = await expressElements.submit()")) {
  fail("express checkout flow must submit Stripe Elements before confirmPayment");
}
if (!paymentIntent.includes("checkout-healthcheck@example.com") || !paymentIntent.includes("healthcheck_no_live_payment_intent")) {
  fail("PaymentIntent route must block synthetic healthcheck emails from creating live Stripe PaymentIntents");
}
if (!checkout.includes('paymentMethodTypes: ["card", "link"]')) {
  fail("WomanRx express checkout must request card/link wallet methods only");
}
if (
  !stripeLib.includes('automatic_payment_methods[enabled]", "true"') ||
  !stripeLib.includes('automatic_payment_methods[allow_redirects]", "never"') ||
  !stripeLib.includes("excluded_payment_method_types[]") ||
  stripeLib.includes('body.append("payment_method_types[]')
) {
  fail("WomanRx PaymentIntent must use automatic payment methods without explicit payment_method_types");
}

if (
  !checkout.includes("checkoutInstanceId") ||
  !paymentIntent.includes("stripeIdempotencyKey") ||
  !paymentIntent.includes("idempotencyKey: stripeIdempotencyKey") ||
  !stripeLib.includes('"idempotency-key"')
) {
  fail("WomanRx PaymentIntent creation must use checkout-scoped idempotency keys");
}

if (!process.exitCode) {
  console.log("checkout stripe audit passed");
}
