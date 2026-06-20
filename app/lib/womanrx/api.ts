import type { CheckoutOrderInput } from "@/lib/checkout/types";

function apiConfig() {
  const baseUrl = process.env.WOMANRX_API_BASE_URL || "https://panel.whitelabelmd.com/womanrx/api/v1";
  const apiKey = process.env.WOMANRX_API_KEY;
  if (!apiKey) throw new Error("WomanRx.com API key is not configured.");
  return { baseUrl: baseUrl.replace(/\/$/, ""), apiKey };
}

async function womanrxPost(path: string, body: Record<string, unknown>) {
  const { baseUrl, apiKey } = apiConfig();
  const response = await fetch(`${baseUrl}/${path.replace(/^\//, "")}`, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.message || `WomanRx.com API failed with ${response.status}.`);
  return data as { status?: number; message?: string; order_id?: string };
}

export async function createHealthRxOfflineOrder(order: CheckoutOrderInput & { paymentIntentId: string }) {
  const payload = {
    product_id: order.fulfillmentProductId,
    email: order.customer.email,
    first_name: order.customer.firstName,
    last_name: order.customer.lastName,
    phone: order.customer.phone,
    address: order.shipping.address,
    address2: order.shipping.address2 || "",
    city_name: order.shipping.city,
    state_name: order.shipping.state,
    zip_code: order.shipping.zip,
    payment_token: order.paymentIntentId,
    start_url: order.startUrl,
    billingSameAsShipping: order.billingSameAsShipping ? "YES" : "NO",
    billing_address: order.shipping.address,
    billing_city_name: order.shipping.city,
    billing_state_name: order.shipping.state,
    billing_zip_code: order.shipping.zip,
    promo_codes: order.promoCode || null,
  };

  const data = await womanrxPost("Create_Order_Offline", payload);
  if (data.status !== 1) throw new Error(data.message || "WomanRx.com order handoff failed.");
  return data;
}
