"use client";

import { C, sans, mono } from "@/lib/design";
import { useCart } from "./CartProvider";

/** Header cart button with a live item-count badge. Tone matches the nav. */
export function CartButton({ tone = "ink" }: { tone?: "ink" | "bone" }) {
  const { totalCount, openCart, ready } = useCart();
  const color = tone === "ink" ? C.text : C.bone;

  return (
    <button
      type="button"
      aria-label={`Open cart${totalCount ? `, ${totalCount} item${totalCount === 1 ? "" : "s"}` : ""}`}
      onClick={openCart}
      style={{
        position: "relative",
        background: "transparent",
        border: `1px solid ${tone === "ink" ? C.lineStrong : C.inkLineStrong}`,
        borderRadius: 999,
        padding: "9px 14px",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        color,
        ...sans({ fontSize: 13, fontWeight: 600 }),
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 4h2l2.4 12.3a1 1 0 0 0 1 .7h8.8a1 1 0 0 0 1-.8L21 8H6"
          stroke={color}
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9.5" cy="20" r="1.4" fill={color} />
        <circle cx="17.5" cy="20" r="1.4" fill={color} />
      </svg>
      Cart
      {ready && totalCount > 0 && (
        <span
          style={{
            ...mono({ fontSize: 10.5, fontWeight: 700 }),
            background: C.brand,
            color: C.white,
            borderRadius: 999,
            minWidth: 18,
            height: 18,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 5px",
          }}
        >
          {totalCount}
        </span>
      )}
    </button>
  );
}
