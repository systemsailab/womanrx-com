"use client";

import { useState } from "react";
import { C, sans, mono } from "@/lib/design";
import { useCart, type CartItem } from "./CartProvider";

type Props = {
  item: Omit<CartItem, "count">;
  label?: string;
  variant?: "primary" | "outline";
  full?: boolean;
};

/** Adds a configured product line to the local cart and opens the drawer. */
export function AddToCartButton({ item, label = "Add to cart", variant = "primary", full = true }: Props) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const primary = variant === "primary";
  return (
    <button
      type="button"
      onClick={() => {
        addItem(item);
        setJustAdded(true);
        window.setTimeout(() => setJustAdded(false), 1400);
      }}
      style={{
        width: full ? "100%" : undefined,
        cursor: "pointer",
        border: primary ? "none" : `1.5px solid ${C.brand}`,
        background: primary ? C.brand : "transparent",
        color: primary ? C.white : C.brand,
        borderRadius: 999,
        padding: "14px 24px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        ...sans({ fontSize: 15, fontWeight: 600 }),
        transition: "transform 0.08s ease, opacity 0.15s ease",
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.985)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {justAdded ? "Added ✓" : label}
      {!justAdded && <span style={mono({ fontSize: 13 })}>→</span>}
    </button>
  );
}
