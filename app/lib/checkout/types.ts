import type { MedicationKey, PlanKey } from "./products";

export type CheckoutOrderInput = {
  medication: MedicationKey;
  plan: PlanKey;
  productId: number;
  fulfillmentProductId: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shipping: {
    address: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
  };
  billingSameAsShipping: boolean;
  promoCode?: string;
  paymentIntentId?: string;
  checkoutInstanceId?: string;
  startUrl: string;
};
