export type MedicationKey = "semaglutide" | "tirzepatide";
export type PlanKey = "monthly" | "3-month" | "6-month" | "12-month";

export type CheckoutProduct = {
  medication: MedicationKey;
  plan: PlanKey;
  productId: number;
  fulfillmentProductId: number;
  name: string;
  sku: string;
  amountCents: number;
  months: number;
  dose: string;
  blurb: string;
};

export const CHECKOUT_PRODUCTS: CheckoutProduct[] = [
  {
    medication: "semaglutide",
    plan: "monthly",
    productId: 46,
    fulfillmentProductId: 1,
    name: "Semaglutide Monthly Plan",
    sku: "Semaginj-CR1",
    amountCents: 19000,
    months: 1,
    dose: "0.25 mg/week",
    blurb: "Low commitment with month-to-month care.",
  },
  {
    medication: "semaglutide",
    plan: "3-month",
    productId: 47,
    fulfillmentProductId: 1,
    name: "Semaglutide 3-Month Plan",
    sku: "SG-MAINT-S3-A",
    amountCents: 39900,
    months: 3,
    dose: "0.25 mg/week",
    blurb: "Convenient starter supply with fewer refill steps.",
  },
  {
    medication: "semaglutide",
    plan: "6-month",
    productId: 48,
    fulfillmentProductId: 1,
    name: "Semaglutide 6-Month Plan",
    sku: "Semaginj-CR1-6M",
    amountCents: 71400,
    months: 6,
    dose: "0.25 mg/week",
    blurb: "Longer runway for consistent progress.",
  },
  {
    medication: "semaglutide",
    plan: "12-month",
    productId: 49,
    fulfillmentProductId: 1,
    name: "Semaglutide 12-Month Plan",
    sku: "Semaginj-CR1-12M",
    amountCents: 118800,
    months: 12,
    dose: "0.25 mg/week",
    blurb: "Best annual semaglutide value.",
  },
  {
    medication: "tirzepatide",
    plan: "monthly",
    productId: 50,
    fulfillmentProductId: 7,
    name: "Tirzepatide Monthly Plan",
    sku: "TIRZ-CR1",
    amountCents: 23900,
    months: 1,
    dose: "2.5 mg/week",
    blurb: "Low commitment with month-to-month care.",
  },
  {
    medication: "tirzepatide",
    plan: "3-month",
    productId: 51,
    fulfillmentProductId: 7,
    name: "Tirzepatide 3-Month Plan",
    sku: "TZ-MAINT-S2-A",
    amountCents: 58900,
    months: 3,
    dose: "2.5 mg/week",
    blurb: "Convenient starter supply with fewer refill steps.",
  },
  {
    medication: "tirzepatide",
    plan: "6-month",
    productId: 52,
    fulfillmentProductId: 7,
    name: "Tirzepatide 6-Month Plan",
    sku: "TIRZ-2.5MG-30-6B",
    amountCents: 107400,
    months: 6,
    dose: "2.5 mg/week",
    blurb: "Longer runway for consistent progress.",
  },
  {
    medication: "tirzepatide",
    plan: "12-month",
    productId: 53,
    fulfillmentProductId: 7,
    name: "Tirzepatide 12-Month Plan",
    sku: "TIRZ-2.5MG-30-12B",
    amountCents: 178800,
    months: 12,
    dose: "2.5 mg/week",
    blurb: "Best annual tirzepatide value.",
  },
];

export function normalizeMedication(medication: string | null | undefined): MedicationKey {
  return medication === "tirz" || medication === "tirzepatide" ? "tirzepatide" : "semaglutide";
}

export function normalizePlan(plan: string | null | undefined): PlanKey {
  if (plan === "monthly" || plan === "3-month" || plan === "6-month" || plan === "12-month") return plan;
  return "3-month";
}

export function getCheckoutProduct(medication: string | null | undefined, plan?: string | null | undefined) {
  const normalizedMedication = normalizeMedication(medication);
  const normalizedPlan = normalizePlan(plan);
  return (
    CHECKOUT_PRODUCTS.find(
      (product) => product.medication === normalizedMedication && product.plan === normalizedPlan,
    ) || CHECKOUT_PRODUCTS[1]
  );
}

export function centsPerMonth(amountCents: number, months: number) {
  return Math.round(amountCents / Math.max(1, months));
}

export function formatUsd(amountCents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amountCents / 100);
}
