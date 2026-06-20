// AUTO-GENERATED structural scaffold for the WomanRx shop. WomanRx-owned; no
// FormBlends dependency. Marketing copy is written fresh in the copy pass.

import type { Product } from "./types";
import { getProductBySlug } from "./products";
import { getTierOptions } from "./tiers";

/**
 * Cart-enable rule (WomanRx, no Shopify): a product is purchasable via the cart
 * only if it is NOT a GLP-1 product AND it has WLMD retail tiers. GLP-1 products
 * route to the on-page assessment funnel; tier-less peptides are research profiles.
 */
export function cartEnabled(product: Product): boolean {
  return !product.isGlp1 && getTierOptions(product.slug).length > 0;
}

export function isResearchProfile(product: Product): boolean {
  return !product.isGlp1 && getTierOptions(product.slug).length === 0;
}

/** On-page GLP-1 assessment funnel entry for a given product slug. */
export function funnelHref(slug: string, source = "shop"): string {
  const product = slug === "tirzepatide" ? "tirzepatide" : "semaglutide";
  return `/glp1-offer-v1/intake/height-weight?source=${source}&product=${product}`;
}

export { getProductBySlug };
