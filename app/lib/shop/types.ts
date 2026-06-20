// AUTO-GENERATED structural scaffold for the WomanRx shop. WomanRx-owned; no
// FormBlends dependency. Marketing copy is written fresh in the copy pass.

export interface Product {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  tagline: string;
  description: string;
  longDescription: string;
  benefits: string[];
  scienceNotes: string;
  image: string;
  price: number;
  originalPrice?: number;
  unit: string;
  concentration: string;
  purity: string;
  featured: boolean;
  bestseller: boolean;
  isGlp1: boolean;
  badge?: string;
}

export interface Category {
  slug: string;
  name: string;
  description?: string;
}

/** Per-quantity retail tier (client-safe: no vendor cost or vendor account IDs). */
export interface ShopTier {
  quantity: 1 | 2 | 3;
  retailUnitPrice: number;
}
