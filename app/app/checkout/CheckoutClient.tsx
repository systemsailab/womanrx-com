"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  CHECKOUT_PRODUCTS,
  centsPerMonth,
  formatUsd,
  getCheckoutProduct,
  normalizePlan,
  type MedicationKey,
} from "@/lib/checkout/products";
import type { CheckoutOrderInput } from "@/lib/checkout/types";
import { C, mono, sans } from "@/lib/design";

declare global {
  interface Window {
    Stripe?: (key: string) => StripeClient;
  }
}

type ElementsOptions = {
  clientSecret?: string;
  mode?: "payment";
  amount?: number;
  currency?: string;
  paymentMethodTypes?: string[];
  appearance?: Record<string, unknown>;
};

type StripeClient = {
  elements: (options: ElementsOptions) => StripeElements;
  confirmPayment: (options: {
    elements: StripeElements;
    clientSecret?: string;
    confirmParams: { return_url: string };
    redirect?: "if_required" | "always";
  }) => Promise<{ error?: { code?: string; message?: string; type?: string }; paymentIntent?: { id: string; status: string } }>;
};

type StripeElementInstance = {
  mount: (selector: string) => void;
  unmount: () => void;
  on: (eventName: string, handler: (event: never) => void) => void;
};

type StripeElements = {
  create: (type: "payment" | "expressCheckout", options?: Record<string, unknown>) => StripeElementInstance;
  submit: () => Promise<{ error?: { code?: string; message?: string; type?: string } }>;
};

type ExpressAddress = {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
};

type ExpressConfirmEvent = {
  expressPaymentType?: string;
  billingDetails?: { name?: string; email?: string; phone?: string; address?: ExpressAddress };
  shippingAddress?: { name?: string; address?: ExpressAddress };
  paymentFailed?: (options?: { reason?: string }) => void;
};

const STRIPE_JS_URL = "https://js.stripe.com/v3/";
const DEFAULT_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME",
  "MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI",
  "SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

const PRODUCT_BENEFITS = [
  "Medication, shipping, and order updates included",
  "Secure payment by Stripe",
  "WomanRx.com order support included",
];

function loadStripeScript() {
  return new Promise<void>((resolve, reject) => {
    if (window.Stripe) return resolve();
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${STRIPE_JS_URL}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Stripe.js failed to load.")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = STRIPE_JS_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Stripe.js failed to load."));
    document.head.appendChild(script);
  });
}

function splitFullName(name: string) {
  const parts = name.trim().replace(/\s+/g, " ").split(" ").filter(Boolean);
  return {
    firstName: parts[0] || "",
    lastName: parts.length > 1 ? parts.slice(1).join(" ") : "",
  };
}

function createCheckoutInstanceId() {
  if (typeof globalThis.crypto?.randomUUID === "function") return globalThis.crypto.randomUUID();
  return "checkout_" + Date.now() + "_" + Math.random().toString(36).slice(2);
}

export function CheckoutClient() {
  const searchParams = useSearchParams();
  const initialProduct = getCheckoutProduct(
    searchParams.get("product") || searchParams.get("med_pref"),
    searchParams.get("plan"),
  );
  const [medication, setMedication] = useState<MedicationKey>(initialProduct.medication);
  const [plan, setPlan] = useState(normalizePlan(searchParams.get("plan")));
  const product = getCheckoutProduct(medication, plan);
  const medicationOptions = CHECKOUT_PRODUCTS.filter((item) => item.plan === "3-month");
  const planOptions = CHECKOUT_PRODUCTS.filter((item) => item.medication === medication);
  const [form, setForm] = useState({
    fullName: [searchParams.get("first_name"), searchParams.get("last_name")].filter(Boolean).join(" "),
    email: searchParams.get("email") || "",
    phone: searchParams.get("phone") || "",
    address: "",
    address2: "",
    city: "",
    state: searchParams.get("state") || "",
    zip: "",
  });
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [elements, setElements] = useState<StripeElements | null>(null);
  const [stripe, setStripe] = useState<StripeClient | null>(null);
  const [mountedPaymentKey, setMountedPaymentKey] = useState("");
  const mountingPaymentKey = useRef("");
  const checkoutInstanceId = useRef(createCheckoutInstanceId());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const nameParts = useMemo(() => splitFullName(form.fullName), [form.fullName]);

  const order = useMemo<CheckoutOrderInput>(
    () => ({
      medication: product.medication,
      plan: product.plan,
      productId: product.productId,
      fulfillmentProductId: product.fulfillmentProductId,
      customer: {
        firstName: nameParts.firstName,
        lastName: nameParts.lastName,
        email: form.email.trim(),
        phone: form.phone.trim(),
      },
      shipping: {
        address: form.address.trim(),
        address2: form.address2.trim(),
        city: form.city.trim(),
        state: form.state.trim().toUpperCase(),
        zip: form.zip.trim(),
      },
      billingSameAsShipping: true,
      checkoutInstanceId: checkoutInstanceId.current,
      startUrl: typeof window !== "undefined" ? window.location.href : "https://womenrx.com/checkout",
    }),
    [form, nameParts, product],
  );

  const canSubmitOrder = Boolean(
    nameParts.firstName &&
    nameParts.lastName &&
    /^.+@.+\..+$/.test(form.email) &&
    form.phone.replace(/\D/g, "").length >= 10 &&
    form.address.trim() &&
    form.city.trim() &&
    form.state.trim().length === 2 &&
    form.zip.trim().length >= 5,
  );

  const paymentElementKey = canSubmitOrder
    ? [
        product.productId,
        product.amountCents,
        nameParts.firstName,
        nameParts.lastName,
        form.email.trim().toLowerCase(),
        form.phone.replace(/\D/g, ""),
        form.address.trim(),
        form.address2.trim(),
        form.city.trim(),
        form.state.trim().toUpperCase(),
        form.zip.trim(),
      ].join("|")
    : "";

  useEffect(() => {
    setClientSecret("");
    setPaymentIntentId("");
    setElements(null);
    setStripe(null);
    setMountedPaymentKey("");
    mountingPaymentKey.current = "";
  }, [product.productId, product.amountCents]);

  useEffect(() => {
    if (
      !canSubmitOrder ||
      !paymentElementKey ||
      !DEFAULT_PUBLISHABLE_KEY ||
      mountedPaymentKey === paymentElementKey ||
      mountingPaymentKey.current === paymentElementKey
    ) {
      return;
    }
    let cancelled = false;
    let mountedElement: StripeElementInstance | null = null;
    mountingPaymentKey.current = paymentElementKey;
    setStripe(null);
    setElements(null);
    setClientSecret("");
    setPaymentIntentId("");
    setError("");
    createPayment({ updateCardState: false })
      .then((paymentData) => {
        if (!paymentData?.clientSecret || !paymentData.paymentIntentId) throw new Error("Could not start payment.");
        if (cancelled) return null;
        setClientSecret(paymentData.clientSecret);
        setPaymentIntentId(paymentData.paymentIntentId);
        return loadStripeScript().then(() => ({ paymentData }));
      })
      .then((loaded) => {
        if (!loaded || cancelled || !window.Stripe) return;
        const stripeClient = window.Stripe(DEFAULT_PUBLISHABLE_KEY);
        const stripeElements = stripeClient.elements({
          clientSecret: loaded.paymentData.clientSecret,
          appearance: {
            theme: "stripe",
            variables: {
              colorPrimary: C.brand,
              borderRadius: "8px",
              fontFamily: "Inter, system-ui, sans-serif",
            },
          },
        });
        const paymentElement = stripeElements.create("payment", {
          layout: {
            type: "tabs",
            defaultCollapsed: false,
          },
          paymentMethodOrder: ["card"],
          terms: {
            card: "never",
          },
        });
        const host = document.getElementById("payment-element");
        if (!host) return;
        host.innerHTML = "";
        paymentElement.mount("#payment-element");
        mountedElement = paymentElement;
        setStripe(stripeClient);
        setElements(stripeElements);
        setMountedPaymentKey(paymentElementKey);
        mountingPaymentKey.current = "";
      })
      .catch((err) => {
        if (cancelled) return;
        mountingPaymentKey.current = "";
        setMountedPaymentKey("");
        setClientSecret("");
        setPaymentIntentId("");
        setError(err instanceof Error ? err.message : "Could not load Stripe.");
      });
    return () => {
      cancelled = true;
      if (mountingPaymentKey.current === paymentElementKey) mountingPaymentKey.current = "";
      try {
        mountedElement?.unmount();
      } catch {
        /* element already gone */
      }
    };
  }, [canSubmitOrder, order, paymentElementKey]);

  useEffect(() => {
    if (canSubmitOrder) return;
    setClientSecret("");
    setPaymentIntentId("");
    setElements(null);
    setStripe(null);
    setMountedPaymentKey("");
    mountingPaymentKey.current = "";
  }, [canSubmitOrder]);

  async function createPayment(options?: { updateCardState?: boolean }) {
    setError("");
    if (!DEFAULT_PUBLISHABLE_KEY) {
      setError("Stripe publishable key is not configured.");
      return;
    }
    const updateCardState = options?.updateCardState !== false;
    if (updateCardState) setBusy(true);
    try {
      const response = await fetch("/api/checkout/payment-intent", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(order),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || "Could not start payment.");
      if (updateCardState) {
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
      }
      return data as { clientSecret: string; paymentIntentId: string };
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start payment.");
      throw err;
    } finally {
      if (updateCardState) setBusy(false);
    }
  }

  const [expressState, setExpressState] = useState<"loading" | "ready" | "unavailable" | "error">("loading");
  const expressSetupKey = useRef("");

  // Price-hold countdown anchored to a per-session deadline so it does NOT reset
  // on every reload (that reads as fake). Persists in sessionStorage; expires gracefully.
  const [reserveSeconds, setReserveSeconds] = useState<number | null>(null);
  useEffect(() => {
    const KEY = "womanrx_price_hold_deadline";
    let deadline = Number(window.sessionStorage.getItem(KEY) || 0);
    if (!deadline || deadline < Date.now()) {
      deadline = Date.now() + 10 * 60 * 1000;
      window.sessionStorage.setItem(KEY, String(deadline));
    }
    const tick = () => setReserveSeconds(Math.max(0, Math.round((deadline - Date.now()) / 1000)));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);
  const reserveActive = reserveSeconds === null || reserveSeconds > 0;
  const reserveClock =
    reserveSeconds === null
      ? "10:00"
      : `${Math.floor(reserveSeconds / 60)}:${String(reserveSeconds % 60).padStart(2, "0")}`;

  useEffect(() => {
    if (!DEFAULT_PUBLISHABLE_KEY) return;
    // Key on amount so a plan switch rebuilds the (free) Elements instance, but
    // still creates ZERO PaymentIntents until a buyer actually taps a wallet.
    const key = `${product.productId}:${product.amountCents}`;
    if (expressSetupKey.current === key) return;
    expressSetupKey.current = key;
    let cancelled = false;
    let mountedElement: StripeElementInstance | null = null;
    setExpressState("loading");
    (async () => {
      try {
        await loadStripeScript();
        if (cancelled || expressSetupKey.current !== key || !window.Stripe) return;
        const stripeClient = window.Stripe(DEFAULT_PUBLISHABLE_KEY);
        // DEFERRED INTENT: render the wallet buttons with mode/amount/currency only.
        // No PaymentIntent is created on page load -- it is created in the confirm
        // handler below, the moment the buyer authorizes a wallet payment.
        const expressElements = stripeClient.elements({
          mode: "payment",
          amount: product.amountCents,
          currency: "usd",
          paymentMethodTypes: ["card", "link"],
        });
        const expressElement = expressElements.create("expressCheckout", {
          emailRequired: true,
          phoneNumberRequired: true,
          shippingAddressRequired: true,
          allowedShippingCountries: ["US"],
          buttonHeight: 48,
        });
        const host = document.getElementById("express-checkout-element");
        if (!host) return;
        host.innerHTML = "";
        expressElement.mount("#express-checkout-element");
        mountedElement = expressElement;
        expressElement.on("ready", ((event: { availablePaymentMethods?: Record<string, boolean> }) => {
          if (cancelled || expressSetupKey.current !== key) return;
          setExpressState(event.availablePaymentMethods ? "ready" : "unavailable");
        }) as (event: never) => void);
        expressElement.on("loaderror", (() => {
          if (cancelled || expressSetupKey.current !== key) return;
          setExpressState("error");
        }) as (event: never) => void);
        expressElement.on("confirm", (async (event: ExpressConfirmEvent) => {
          const shippingInfo = event.shippingAddress;
          const billing = event.billingDetails;
          const { firstName, lastName } = splitFullName((shippingInfo?.name || billing?.name || "").trim());
          const expressOrder: CheckoutOrderInput = {
            medication: product.medication,
            plan: product.plan,
            productId: product.productId,
            fulfillmentProductId: product.fulfillmentProductId,
            customer: {
              firstName,
              lastName: lastName || firstName,
              email: billing?.email || "",
              phone: billing?.phone || "",
            },
            shipping: {
              address: shippingInfo?.address?.line1 || "",
              address2: shippingInfo?.address?.line2 || "",
              city: shippingInfo?.address?.city || "",
              state: (shippingInfo?.address?.state || "").toUpperCase(),
              zip: shippingInfo?.address?.postal_code || "",
            },
            billingSameAsShipping: true,
            checkoutInstanceId: checkoutInstanceId.current,
            startUrl: window.location.href,
          };
          if (!expressOrder.shipping.address || !expressOrder.customer.email) {
            event.paymentFailed?.({ reason: "fail" });
            setError("Your wallet did not share a complete shipping address. Please use card checkout below.");
            return;
          }
          setBusy(true);
          setError("");
          try {
            const submitResult = await expressElements.submit();
            if (submitResult.error) throw new Error(submitResult.error.message || "Payment failed.");
            const piResponse = await fetch("/api/checkout/payment-intent", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(expressOrder),
            });
            const piData = await piResponse.json();
            if (!piResponse.ok || !piData.ok) throw new Error(piData.error || "Could not start payment.");
            const result = await stripeClient.confirmPayment({
              elements: expressElements,
              clientSecret: piData.clientSecret,
              confirmParams: { return_url: `${window.location.origin}/checkout/complete` },
              redirect: "if_required",
            });
            if (result.error) throw new Error(result.error.message || "Payment failed.");
            if (result.paymentIntent?.status === "succeeded") {
              const finalize = await fetch("/api/checkout/finalize-order", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ ...expressOrder, paymentIntentId: result.paymentIntent.id }),
              });
              const finalizeData = await finalize.json();
              if (!finalize.ok || !finalizeData.ok) throw new Error(finalizeData.error || "Order handoff failed.");
              window.location.href = `/checkout/complete?order_id=${encodeURIComponent(finalizeData.orderId || "")}`;
            } else {
              throw new Error(result.paymentIntent?.status ? `Payment status: ${result.paymentIntent.status}. Please try again.` : "Payment did not complete.");
            }
          } catch (err) {
            setError(err instanceof Error ? err.message : "Payment failed.");
          } finally {
            setBusy(false);
          }
        }) as (event: never) => void);
      } catch {
        if (!cancelled && expressSetupKey.current === key) setExpressState("error");
      }
    })();
    return () => {
      cancelled = true;
      try {
        mountedElement?.unmount();
      } catch {
        /* element already gone */
      }
    };
  }, [product.productId, product.amountCents, product.medication, product.plan, product.fulfillmentProductId]);

  async function pay() {
    setError("");
    if (!stripe || !elements) {
      setError("Payment form is still loading.");
      return;
    }
    if (!canSubmitOrder) {
      setError("Please complete your shipping details before placing the order.");
      document.getElementById("shipping-section")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setBusy(true);
    try {
      const submitResult = await elements.submit();
      if (submitResult.error) {
        console.warn("Stripe Payment Element submit failed", {
          code: submitResult.error.code,
          type: submitResult.error.type,
          message: submitResult.error.message,
        });
        throw new Error(submitResult.error.message || "Please check your payment details and try again.");
      }
      if (!clientSecret || !paymentIntentId) throw new Error("Payment form is still loading. Please wait a moment and try again.");
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: `${window.location.origin}/checkout/complete` },
        redirect: "if_required",
      });
      console.info("Stripe confirmPayment result", {
        paymentIntentId: result.paymentIntent?.id || paymentIntentId,
        status: result.paymentIntent?.status,
        errorCode: result.error?.code,
        errorType: result.error?.type,
      });
      if (result.error) throw new Error(result.error.message || "Payment failed.");
      if (result.paymentIntent?.status === "succeeded") {
        const response = await fetch("/api/checkout/finalize-order", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ ...order, paymentIntentId: result.paymentIntent.id || paymentIntentId }),
        });
        const data = await response.json();
        if (!response.ok || !data.ok) throw new Error(data.error || "Order handoff failed.");
        window.location.href = `/checkout/complete?order_id=${encodeURIComponent(data.orderId || "")}`;
      } else {
        throw new Error(result.paymentIntent?.status ? `Payment status: ${result.paymentIntent.status}. Please try again.` : "Payment did not complete.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: C.paper, color: C.text, paddingBottom: 92 }}>
      <div style={{ borderBottom: `1px solid ${C.line}`, background: C.white }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "18px 20px", display: "flex", justifyContent: "space-between" }}>
          <Link href="/" style={{ ...sans({ fontSize: 20, fontWeight: 800, color: C.text }), textDecoration: "none" }}>
            WomanRx.com
          </Link>
          <span style={mono({ fontSize: 12, color: C.mute, textTransform: "uppercase" })}>Secure payment</span>
        </div>
      </div>

      <div style={{ borderBottom: `1px solid ${C.line}`, background: C.paper2 }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "10px 20px", display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "center" }}>
          {["★ 4.8 member rating", "Secure payment by Stripe", "LegitScript-certified", "Licensed clinician review", "Free shipping included"].map((item) => (
            <span key={item} style={mono({ fontSize: 10.5, color: C.text2, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 800 })}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "28px 20px 80px" }}>
        <div style={{ marginBottom: 22, border: `1px solid ${C.line}`, background: "linear-gradient(120deg, #FFF6DD, #F4F0E2)", borderRadius: 16, padding: "clamp(18px, 3vw, 28px)", display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 22, alignItems: "center" }} className="checkout-options">
          <div>
            <span style={{ display: "inline-flex", background: C.ink, color: C.bone, borderRadius: 999, padding: "6px 11px", ...mono({ fontSize: 10, textTransform: "uppercase", fontWeight: 900, letterSpacing: "0.08em" }) }}>
              You&apos;re almost done
            </span>
            <h1 style={sans({ marginTop: 12, fontSize: "clamp(28px, 4.4vw, 44px)", fontWeight: 900, lineHeight: 1, color: C.text })}>
              Complete your {product.medication === "semaglutide" ? "Semaglutide" : "Tirzepatide"} order.
            </h1>
            <p style={sans({ marginTop: 10, fontSize: 15.5, color: C.text2, lineHeight: 1.45, fontWeight: 600 })}>
              Today&apos;s total is <strong>{formatUsd(product.amountCents)}</strong> for your {product.months === 1 ? "monthly" : `${product.months}-month`} plan. Free shipping is included.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
              {["Secure payment by Stripe", "No insurance required", "Free shipping included"].map((chipText) => (
                <span key={chipText} style={{ border: `1px solid ${C.line}`, background: C.white, borderRadius: 999, padding: "6px 11px", ...sans({ fontSize: 12, color: C.text2, fontWeight: 800 }) }}>
                  {chipText}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gap: 10, justifyItems: "center", textAlign: "center" }}>
            <div style={{ border: `1px solid ${C.line}`, background: C.white, borderRadius: 12, padding: "14px 20px", minWidth: 170 }}>
              {reserveActive ? (
                <>
                  <div style={mono({ fontSize: 10, color: C.terracotta, textTransform: "uppercase", fontWeight: 900, letterSpacing: "0.08em" })}>Price reserved</div>
                  <div style={sans({ marginTop: 2, fontSize: 36, fontWeight: 950, color: C.text, lineHeight: 1 })}>{reserveClock}</div>
                  <div style={sans({ marginTop: 6, fontSize: 11.5, color: C.mute, fontWeight: 700, maxWidth: 150 })}>Complete checkout to keep today&apos;s price.</div>
                </>
              ) : (
                <>
                  <div style={mono({ fontSize: 10, color: C.brand, textTransform: "uppercase", fontWeight: 900, letterSpacing: "0.08em" })}>Price held</div>
                  <div style={sans({ marginTop: 2, fontSize: 22, fontWeight: 950, color: C.text, lineHeight: 1.1 })}>Locked in</div>
                  <div style={sans({ marginTop: 6, fontSize: 11.5, color: C.mute, fontWeight: 700, maxWidth: 150 })}>Today&apos;s price is held for your session.</div>
                </>
              )}
            </div>
            <div style={sans({ fontSize: 12.5, color: C.text2, fontWeight: 800 })}>
              <span style={{ color: "#D6A038" }}>★★★★★</span> 4.8 member rating
            </div>
          </div>
        </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 360px", gap: 28 }} className="checkout-grid">
        <section style={{ display: "grid", gap: 18 }}>
          {expressState !== "error" && (
            <Panel eyebrow="Express checkout" title="Pay in one tap">
              <div id="express-checkout-element" />
              {expressState === "loading" && (
                <div style={{ border: `1px solid ${C.line}`, background: C.brandSoft, borderRadius: 10, padding: 14, textAlign: "center", ...sans({ fontSize: 13.5, fontWeight: 700, color: C.text2 }) }}>
                  Checking express checkout availability...
                </div>
              )}
              {expressState === "unavailable" && (
                <div style={{ border: `1px solid ${C.line}`, background: C.brandSoft, borderRadius: 10, padding: 14, textAlign: "center", ...sans({ fontSize: 13.5, fontWeight: 700, color: C.text2 }) }}>
                  Express pay is not available on this device. Card checkout below takes about a minute.
                </div>
              )}
              {expressState === "ready" && (
                <p style={sans({ marginTop: 12, fontSize: 12.5, color: C.mute, textAlign: "center", fontWeight: 700 })}>
                  Your wallet shares shipping and contact details automatically. Or continue below.
                </p>
              )}
            </Panel>
          )}

          <Panel eyebrow="Step 1" title="Choose treatment">
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }} className="checkout-options">
              {medicationOptions.map((item) => (
                <button
                  key={item.medication}
                  type="button"
                  onClick={() => setMedication(item.medication)}
                  style={{
                    padding: 18,
                    textAlign: "left",
                    border: `2px solid ${product.medication === item.medication ? C.brand : "rgba(14,14,12,0.12)"}`,
                    background: product.medication === item.medication ? C.brandTint : C.white,
                    borderRadius: 10,
                    cursor: "pointer",
                    minHeight: 148,
                  }}
                >
                  {product.medication === item.medication && (
                    <span style={mono({ display: "inline-flex", marginBottom: 12, fontSize: 10, color: C.white, background: C.brand, padding: "5px 8px", borderRadius: 999, textTransform: "uppercase", fontWeight: 700 })}>
                      Selected
                    </span>
                  )}
                  <strong style={sans({ display: "block", fontSize: 18, color: C.text })}>
                    {item.medication === "semaglutide" ? "Compounded Semaglutide" : "Compounded Tirzepatide"}
                  </strong>
                  <span style={sans({ display: "block", marginTop: 6, fontSize: 14, color: C.text2 })}>{item.blurb}</span>
                  <span style={mono({ display: "block", marginTop: 12, fontSize: 13, color: C.brand })}>
                    From {formatUsd(centsPerMonth(item.amountCents, item.months))}/mo
                  </span>
                </button>
              ))}
            </div>
          </Panel>

          <Panel eyebrow="Step 2" title="Choose your plan">
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }} className="plan-options">
              {planOptions.map((item) => {
                const monthly = centsPerMonth(item.amountCents, item.months);
                const monthlyRateCents = planOptions.find((option) => option.months === 1)?.amountCents ?? 0;
                const compareAt = monthlyRateCents * item.months;
                const savings = Math.max(0, compareAt - item.amountCents);
                const badge = item.plan === "3-month" ? "Recommended" : item.plan === "12-month" ? "Best value" : "";
                const selected = product.productId === item.productId;
                return (
                  <button
                    key={item.productId}
                    type="button"
                    onClick={() => setPlan(item.plan)}
                    style={{
                      padding: 16,
                      border: `2px solid ${selected ? C.brand : C.line}`,
                      background: selected ? C.brandTint : C.white,
                      borderRadius: 10,
                      textAlign: "left",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    <span style={mono({ display: "block", fontSize: 10, color: selected ? C.brand : C.mute, textTransform: "uppercase", fontWeight: 800 })}>
                      {item.months === 1 ? "Monthly" : `${item.months} months`}
                    </span>
                    {badge && (
                      <span style={mono({ position: "absolute", top: 10, right: 10, fontSize: 9, color: C.white, background: C.brand, borderRadius: 999, padding: "4px 7px", textTransform: "uppercase", fontWeight: 900 })}>
                        {badge}
                      </span>
                    )}
                    {savings > 0 ? (
                      <span style={sans({ display: "block", marginTop: 8, fontSize: 12.5, color: C.mute, textDecoration: "line-through", fontWeight: 700 })}>
                        {formatUsd(compareAt)}
                      </span>
                    ) : (
                      <span style={{ display: "block", marginTop: 8, height: 18 }} />
                    )}
                    <strong style={sans({ display: "block", marginTop: 2, fontSize: 24, color: C.text, fontWeight: 900 })}>
                      {formatUsd(monthly)}
                      <span style={sans({ fontSize: 12, color: C.mute, fontWeight: 700 })}>/mo</span>
                    </strong>
                    <span style={sans({ display: "block", marginTop: 6, fontSize: 12.5, color: C.text2, fontWeight: 700 })}>
                      {formatUsd(item.amountCents)} today
                    </span>
                    {savings > 0 && (
                      <span style={sans({ display: "inline-block", marginTop: 8, fontSize: 11.5, color: C.success, background: "rgba(15,123,61,0.08)", borderRadius: 999, padding: "4px 9px", fontWeight: 900 })}>
                        Save {formatUsd(savings)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

          </Panel>

          <div id="shipping-section">
          <Panel eyebrow="Step 3" title="Shipping details">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14 }} className="checkout-fields">
              <Input label="Full name" value={form.fullName} onChange={(fullName) => setForm((f) => ({ ...f, fullName }))} span autoComplete="name" />
              <Input label="Email" type="email" value={form.email} onChange={(email) => setForm((f) => ({ ...f, email }))} autoComplete="email" inputMode="email" />
              <Input label="Phone" type="tel" value={form.phone} onChange={(phone) => setForm((f) => ({ ...f, phone }))} autoComplete="tel" inputMode="tel" />
              <Input label="Address" value={form.address} onChange={(address) => setForm((f) => ({ ...f, address }))} span autoComplete="address-line1" />
              <Input label="Apt, suite, etc. (optional)" value={form.address2} onChange={(address2) => setForm((f) => ({ ...f, address2 }))} span autoComplete="address-line2" />
              <Input label="City" value={form.city} onChange={(city) => setForm((f) => ({ ...f, city }))} autoComplete="address-level2" />
              <label style={{ display: "grid", gap: 7 }}>
                <span style={mono({ fontSize: 11, color: C.mute, textTransform: "uppercase" })}>State</span>
                <select
                  value={form.state}
                  autoComplete="address-level1"
                  onChange={(event) => setForm((f) => ({ ...f, state: event.target.value }))}
                  style={{ width: "100%", border: `1px solid ${C.lineStrong}`, borderRadius: 8, padding: "13px 14px", background: C.white, ...sans({ fontSize: 15, color: form.state ? C.text : C.mute }) }}
                >
                  <option value="">Select state</option>
                  {US_STATES.map((stateCode) => (
                    <option key={stateCode} value={stateCode}>{stateCode}</option>
                  ))}
                </select>
              </label>
              <Input label="ZIP" value={form.zip} onChange={(zip) => setForm((f) => ({ ...f, zip }))} autoComplete="postal-code" inputMode="numeric" maxLength={10} />
            </div>
          </Panel>
          </div>

          <Panel eyebrow="Step 4" title="Pay with card">
            {!canSubmitOrder ? (
              <div style={{ border: `1px solid ${C.line}`, background: C.brandSoft, borderRadius: 10, padding: 18, textAlign: "center", ...sans({ fontSize: 14, fontWeight: 700, color: C.text2 }) }}>
                Add your shipping details above to unlock card payment &mdash; or use express pay at the top of the page.
              </div>
            ) : (
              <div style={{ border: `2px solid ${C.brand}`, background: C.white, borderRadius: 12, padding: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", paddingBottom: 14, marginBottom: 14, borderBottom: `1px solid ${C.line}` }}>
                  <strong style={sans({ fontSize: 15, color: C.text, fontWeight: 850 })}>Secure payment by Stripe</strong>
                  <PaymentBrandBadges />
                </div>
                <div key={paymentElementKey || "payment"} id="payment-element" />
                {(!stripe || !elements) && (
                  <div style={{ marginTop: 12, border: `1px solid ${C.line}`, background: C.brandSoft, borderRadius: 10, padding: 14, textAlign: "center", ...sans({ fontSize: 13.5, fontWeight: 700, color: C.text2 }) }}>
                    Loading payment options...
                  </div>
                )}
              </div>
            )}
            <button type="button" onClick={pay} disabled={busy || !stripe || !elements} className="btn-brand" style={{ width: "100%", marginTop: 16, justifyContent: "center", padding: "19px 24px", fontSize: 17.5, opacity: busy || !stripe || !elements ? 0.45 : 1 }}>
              Complete secure order - {formatUsd(product.amountCents)}
            </button>
            <p style={sans({ marginTop: 14, fontSize: 12.5, color: C.mute, lineHeight: 1.5, textAlign: "center" })}>
              By completing your order, you agree to the WomanRx.com <Link href="/terms">Terms</Link>, <Link href="/privacy">Privacy Policy</Link>, and order updates.
            </p>
          </Panel>

          {error && <div style={{ border: "1px solid rgba(168,52,30,0.25)", background: "rgba(168,52,30,0.06)", color: C.danger, padding: 14, borderRadius: 10, ...sans({ fontWeight: 700 }) }}>{error}</div>}
        </section>

        <aside style={{ position: "sticky", top: 20, alignSelf: "start", border: `1px solid ${C.line}`, background: C.white, borderRadius: 14, padding: 22 }}>
          <div style={{ aspectRatio: "1.6/1", position: "relative", borderRadius: 10, background: C.paper2, overflow: "hidden", marginBottom: 16 }}>
            <Image
              src={product.medication === "semaglutide" ? "/photo/vial-sema-v2.jpg" : "/photo/vial-tirz-v2.jpg"}
              alt={`Compounded ${product.medication} vial`}
              fill
              sizes="360px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <p style={mono({ fontSize: 11, color: C.mute, textTransform: "uppercase" })}>Today's order</p>
          <h1 style={sans({ marginTop: 10, fontSize: 26, fontWeight: 800, color: C.text, lineHeight: 1.05 })}>{product.name}</h1>
          <p style={sans({ marginTop: 8, fontSize: 14, color: C.text2 })}>
            {product.months === 1 ? "Monthly plan" : `${product.months}-month plan`} · {formatUsd(centsPerMonth(product.amountCents, product.months))}/mo
          </p>
          <div style={{ marginTop: 18, display: "grid", gap: 9 }}>
            {PRODUCT_BENEFITS.map((benefit) => (
              <div key={benefit} style={{ display: "grid", gridTemplateColumns: "18px 1fr", gap: 9, alignItems: "center" }}>
                <span style={{ width: 18, height: 18, borderRadius: 999, background: C.brandSoft, color: C.brand, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900 }}>✓</span>
                <span style={sans({ fontSize: 13, color: C.text2, fontWeight: 700 })}>{benefit}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, background: C.brand, borderRadius: 12, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={sans({ fontWeight: 800, color: C.bone })}>Today's total</span>
            <span style={sans({ fontSize: 28, fontWeight: 950, color: C.white })}>{formatUsd(product.amountCents)}</span>
          </div>
          <div style={{ marginTop: 18, borderRadius: 10, border: `1px solid ${C.line}`, padding: 14, ...sans({ fontSize: 12.5, fontWeight: 700, color: C.mute, lineHeight: 1.45 }) }}>
            Card and Link are available when eligible.
          </div>
          <figure style={{ marginTop: 14, borderTop: `1px solid ${C.line}`, paddingTop: 16, margin: "14px 0 0" }}>
            <span style={{ color: "#D6A038", fontSize: 13, letterSpacing: 2 }}>★★★★★</span>
            <blockquote style={sans({ margin: "8px 0 0", fontSize: 13.5, color: C.text, lineHeight: 1.5, fontWeight: 700 })}>
              &ldquo;I was skeptical about ordering online. The clinician review and the LegitScript certification won me over &mdash; and it shipped in four days.&rdquo;
            </blockquote>
            <figcaption style={sans({ marginTop: 8, fontSize: 12, color: C.mute, fontWeight: 700 })}>Priya S. · Member · Arizona</figcaption>
          </figure>
        </aside>
      </div>

      <div style={{ marginTop: 34, display: "grid", gap: 18 }}>
        <div style={{ border: `1px solid ${C.line}`, background: C.white, borderRadius: 14, padding: 22 }}>
          <p style={mono({ fontSize: 11, color: C.brand, textTransform: "uppercase", fontWeight: 800 })}>What happens next</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16, marginTop: 14 }} className="checkout-options">
            {[
              ["1. Clinician review", "A licensed clinician reviews your order and health answers, usually within one business day.", "/photo/consultation.jpg"],
              ["2. Pharmacy fills it", "Your medication is prepared by a licensed 503A compounding pharmacy.", "/photo/pharmacy.jpg"],
              ["3. Ships to your door", "Free shipping on every plan, with order updates sent to your email.", "/photo/shipping.jpg"],
            ].map(([title, body, img]) => (
              <div key={title}>
                <div style={{ aspectRatio: "16/8", position: "relative", borderRadius: 10, overflow: "hidden", background: C.paper2, marginBottom: 12 }}>
                  <Image src={img} alt={title} fill sizes="(max-width: 900px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                </div>
                <strong style={sans({ display: "block", fontSize: 15, color: C.text, fontWeight: 850 })}>{title}</strong>
                <p style={sans({ marginTop: 6, fontSize: 13.5, color: C.text2, lineHeight: 1.5 })}>{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ border: `1px solid ${C.line}`, background: C.white, borderRadius: 14, padding: 22, display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <a
              href="https://www.legitscript.com/websites/?checker_keywords=womanrx.com"
              target="_blank"
              rel="noopener"
              title="Verify LegitScript Approval for www.womanrx.com"
              style={{ display: "inline-block", lineHeight: 0 }}
            >
              <img
                src="https://static.legitscript.com/seals/50087439.png"
                alt="Verify Approval for www.womanrx.com"
                width={64}
                height={70}
              />
            </a>
            <div style={mono({ fontSize: 10.5, color: C.mute, lineHeight: 1.7, letterSpacing: "0.06em" })}>
              LEGITSCRIPT
              <br />
              CERT 50087439
              <br />
              503A · MD INTEGRATIONS
            </div>
          </div>
          <p style={sans({ fontSize: 13.5, color: C.text2, lineHeight: 1.55, fontWeight: 700, maxWidth: 520 })}>
            Questions before you order? Email <a href="mailto:support@womanrx.com" style={{ color: C.brand }}>support@womanrx.com</a> &mdash; order support is included with every plan.
          </p>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {[
            ["Is this a subscription?", "No. Every plan is a one-time payment for the full supply. Nothing renews automatically; you reorder only when you choose to."],
            ["When will my order ship?", "After a licensed clinician reviews and approves your order, the pharmacy prepares your medication and ships it to your door with free shipping. You will get email updates along the way."],
            ["Who reviews my order?", "Licensed clinicians review every order, and medication is prepared by a licensed 503A compounding pharmacy. WomanRx.com is LegitScript-certified (cert 50087439)."],
          ].map(([q, a]) => (
            <div key={q} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: 18, background: C.white }}>
              <h3 style={sans({ fontSize: 15.5, color: C.text, fontWeight: 850 })}>{q}</h3>
              <p style={sans({ marginTop: 6, fontSize: 13.5, color: C.text2, lineHeight: 1.55 })}>{a}</p>
            </div>
          ))}
        </div>
      </div>
      </div>

      <div className="checkout-mobile-cta">
        <div>
          <span style={mono({ display: "block", fontSize: 10, color: C.mute, textTransform: "uppercase", fontWeight: 800 })}>Today's total</span>
          <strong style={sans({ display: "block", fontSize: 18, color: C.text, fontWeight: 900 })}>{formatUsd(product.amountCents)}</strong>
        </div>
        <button
          type="button"
          onClick={pay}
          disabled={busy || !stripe || !elements}
          className="btn-brand"
          style={{ padding: "12px 18px", fontSize: 14, opacity: busy || !stripe || !elements ? 0.45 : 1 }}
        >
          {stripe && elements ? `Pay securely - ${formatUsd(product.amountCents)}` : "Loading payment"}
        </button>
      </div>

      <style jsx>{`
        :global(.checkout-mobile-cta) {
          display: none;
        }
        @media (max-width: 900px) {
          :global(.checkout-grid) {
            grid-template-columns: 1fr !important;
          }
          :global(.checkout-options),
          :global(.checkout-fields),
          :global(.plan-options) {
            grid-template-columns: 1fr !important;
          }
          :global(.checkout-grid aside) {
            position: static !important;
          }
          :global(.checkout-mobile-cta) {
            position: fixed;
            left: 12px;
            right: 12px;
            bottom: 12px;
            z-index: 70;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            border: 1px solid ${C.line};
            background: rgba(255, 255, 255, 0.97);
            border-radius: 14px;
            padding: 10px 10px 10px 14px;
            box-shadow: 0 18px 50px -22px rgba(14, 14, 12, 0.45);
          }
        }
      `}</style>
    </main>
  );
}

function Panel({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section style={{ border: `1px solid ${C.line}`, background: C.white, borderRadius: 14, padding: 22 }}>
      <p style={mono({ fontSize: 10.5, color: C.brand, textTransform: "uppercase", fontWeight: 800, marginBottom: 6 })}>{eyebrow}</p>
      <h2 style={sans({ fontSize: 24, fontWeight: 850, color: C.text, marginBottom: 18 })}>{title}</h2>
      {children}
    </section>
  );
}

function PaymentBrandBadges() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
      <span style={{ height: 32, display: "inline-flex", alignItems: "center", gap: 7, border: `1px solid ${C.line}`, background: C.white, borderRadius: 8, padding: "0 10px", ...sans({ fontSize: 12, fontWeight: 850, color: C.text2 }) }}>
        <span style={{ position: "relative", display: "inline-block", width: 28, height: 16 }}>
          <span style={{ position: "absolute", left: 0, top: 0, width: 16, height: 16, borderRadius: 999, background: "#eb001b" }} />
          <span style={{ position: "absolute", left: 12, top: 0, width: 16, height: 16, borderRadius: 999, background: "#f79e1b", mixBlendMode: "multiply" }} />
        </span>
        Card
      </span>
      <span style={{ height: 32, display: "inline-flex", alignItems: "center", gap: 7, border: "1px solid rgba(0,214,111,0.32)", background: "#e8fff3", borderRadius: 8, padding: "0 10px", ...sans({ fontSize: 12, fontWeight: 900, color: C.text }) }}>
        <span style={{ width: 16, height: 16, borderRadius: 999, background: "#00d66f", color: C.text, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900 }}>&gt;</span>
        link
      </span>
      <span style={{ height: 32, display: "inline-flex", alignItems: "center", background: "#000", borderRadius: 8, padding: "0 12px", ...sans({ fontSize: 12, fontWeight: 900, color: "#fff" }) }}>
        Apple Pay
      </span>
      <span style={{ height: 32, display: "inline-flex", alignItems: "center", gap: 6, border: `1px solid ${C.line}`, background: C.white, borderRadius: 8, padding: "0 10px", ...sans({ fontSize: 12, fontWeight: 850, color: C.text2 }) }}>
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.6-.2-2.3H12v4.4h5.9c-.3 1.4-1 2.5-2.1 3.2v2.7h3.4c2-1.8 3.4-4.5 3.4-8z" />
          <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.4-2.7c-.9.6-2.2 1-3.9 1-3 0-5.5-2-6.4-4.8H2.1v2.8C3.9 20.4 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.6 13.8c-.2-.6-.4-1.2-.4-1.9s.1-1.3.4-1.9V7.2H2.1C1.4 8.6 1 10.2 1 11.9s.4 3.3 1.1 4.7l3.5-2.8z" />
          <path fill="#EA4335" d="M12 5.3c1.6 0 3.1.6 4.2 1.7l3.1-3.1C17.5 2.1 15 1 12 1 7.7 1 3.9 3.6 2.1 7.2L5.6 10c.9-2.7 3.4-4.7 6.4-4.7z" />
        </svg>
        Pay
      </span>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  span = false,
  maxLength,
  autoComplete,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  span?: boolean;
  maxLength?: number;
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "tel" | "email" | "decimal" | "search" | "url" | "none";
}) {
  return (
    <label style={{ display: "grid", gap: 7, gridColumn: span ? "1 / -1" : undefined }}>
      <span style={mono({ fontSize: 11, color: C.mute, textTransform: "uppercase" })}>{label}</span>
      <input
        type={type}
        value={value}
        maxLength={maxLength}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
        style={{ width: "100%", border: `1px solid ${C.lineStrong}`, borderRadius: 8, padding: "13px 14px", ...sans({ fontSize: 15, color: C.text }) }}
      />
    </label>
  );
}
