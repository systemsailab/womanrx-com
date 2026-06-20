// AUTO-GENERATED structural scaffold for the WomanRx shop. WomanRx-owned; no
// FormBlends dependency. Marketing copy is written fresh in the copy pass.

import type { ShopTier } from "./types";

// Stored catalog tiers (quantity 1 and 3). Quantity 2 is interpolated.
// retailUnitPrice only — vendor fulfillment cost + WLMD product IDs are resolved
// server-side from WomanRx's own WLMD account when peptide checkout is unparked.
type CatalogTier = { retailUnitPrice: number };
type CatalogMap = Partial<Record<1 | 3, CatalogTier>>;

export const PEPTIDE_STACK_DISCOUNT_PCT = 10;

export const SHOP_TIERS: Record<string, CatalogMap> = {
  "aod-9604": {
    "1": {
      "retailUnitPrice": 194
    },
    "3": {
      "retailUnitPrice": 174
    }
  },
  "bpc-157": {
    "1": {
      "retailUnitPrice": 194
    },
    "3": {
      "retailUnitPrice": 174
    }
  },
  "bpc-157-kpv-tb-500-blend": {
    "1": {
      "retailUnitPrice": 274
    },
    "3": {
      "retailUnitPrice": 244
    }
  },
  "bpc-157-tb-500-blend": {
    "1": {
      "retailUnitPrice": 244
    },
    "3": {
      "retailUnitPrice": 224
    }
  },
  "dsip": {
    "1": {
      "retailUnitPrice": 174
    },
    "3": {
      "retailUnitPrice": 154
    }
  },
  "epithalon": {
    "1": {
      "retailUnitPrice": 194
    },
    "3": {
      "retailUnitPrice": 174
    }
  },
  "ghk-cu": {
    "1": {
      "retailUnitPrice": 174
    },
    "3": {
      "retailUnitPrice": 154
    }
  },
  "ghk-cu-epithalon-blend": {
    "1": {
      "retailUnitPrice": 274
    },
    "3": {
      "retailUnitPrice": 244
    }
  },
  "glutathione-injectable": {
    "1": {
      "retailUnitPrice": 94
    },
    "3": {
      "retailUnitPrice": 84
    }
  },
  "gonadorelin": {
    "1": {
      "retailUnitPrice": 94
    },
    "3": {
      "retailUnitPrice": 84
    }
  },
  "ll-37": {
    "1": {
      "retailUnitPrice": 194
    },
    "3": {
      "retailUnitPrice": 174
    }
  },
  "mots-c": {
    "1": {
      "retailUnitPrice": 244
    },
    "3": {
      "retailUnitPrice": 224
    }
  },
  "mots-c-tesamorelin-blend": {
    "1": {
      "retailUnitPrice": 344
    },
    "3": {
      "retailUnitPrice": 314
    }
  },
  "premium-recovery-quad-stack": {
    "1": {
      "retailUnitPrice": 344
    },
    "3": {
      "retailUnitPrice": 314
    }
  },
  "selank-nasal": {
    "1": {
      "retailUnitPrice": 124
    },
    "3": {
      "retailUnitPrice": 114
    }
  },
  "semax-nasal-spray": {
    "1": {
      "retailUnitPrice": 124
    },
    "3": {
      "retailUnitPrice": 114
    }
  },
  "semax-selank-blend": {
    "1": {
      "retailUnitPrice": 224
    },
    "3": {
      "retailUnitPrice": 194
    }
  },
  "sleep-recovery-stack": {
    "1": {
      "retailUnitPrice": 294
    },
    "3": {
      "retailUnitPrice": 264
    }
  },
  "tadalafil-oxytocin-pt-141-nasal": {
    "1": {
      "retailUnitPrice": 174
    },
    "3": {
      "retailUnitPrice": 154
    }
  },
  "tesamorelin": {
    "1": {
      "retailUnitPrice": 244
    },
    "3": {
      "retailUnitPrice": 224
    }
  },
  "tesamorelin-ipamorelin-blend": {
    "1": {
      "retailUnitPrice": 294
    },
    "3": {
      "retailUnitPrice": 264
    }
  },
  "thymosin-alpha-1": {
    "1": {
      "retailUnitPrice": 244
    },
    "3": {
      "retailUnitPrice": 224
    }
  }
};

/** Per-unit price for a quantity. q1 = base; q2 = 5% off base (interpolated); q3 = stored or 10% off base. */
export function getQuantityUnitPrice(slug: string, quantity: 1 | 2 | 3): number | null {
  const map = SHOP_TIERS[slug];
  if (!map || !map[1]) return null;
  const base = map[1].retailUnitPrice;
  if (quantity === 1) return base;
  if (quantity === 2) return Math.round(base * 0.95);
  return map[3]?.retailUnitPrice ?? Math.round(base * 0.9);
}

/** All available quantity tiers for a slug (empty if not cart-enabled). */
export function getTierOptions(slug: string): ShopTier[] {
  const map = SHOP_TIERS[slug];
  if (!map || !map[1]) return [];
  return ([1, 2, 3] as const)
    .map((q) => {
      const unit = getQuantityUnitPrice(slug, q);
      return unit == null ? null : { quantity: q, retailUnitPrice: unit };
    })
    .filter((t): t is ShopTier => t !== null);
}
