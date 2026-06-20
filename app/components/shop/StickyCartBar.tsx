"use client";

import { C, sans, mono } from "@/lib/design";
import { AddToCartButton } from "./AddToCartButton";
import type { CartItem } from "./CartProvider";

/**
 * PDP sticky purchase bar. Presentational — the PDP owns the tier/subscribe
 * selection and passes the configured line + a reactive sub-label.
 */
export function StickyCartBar({ item, subLabel }: { item: Omit<CartItem, "count">; subLabel: string }) {
  const lineTotal = item.unitPrice * item.quantity;
  return (
    <div
      className="hrx-sticky-bar"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 60,
        background: C.paper,
        borderTop: `1px solid ${C.line}`,
        boxShadow: "0 -16px 40px -28px rgba(14,14,12,0.4)",
        padding: "12px clamp(16px, 4vw, 28px)",
      }}
    >
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={sans({ fontSize: 14.5, fontWeight: 600, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" })}>
            {item.name}
          </div>
          <div style={mono({ fontSize: 11, color: C.mute, marginTop: 2 })}>
            {subLabel} · {`$${lineTotal.toLocaleString("en-US")}`}
          </div>
        </div>
        <div style={{ flexShrink: 0, minWidth: 180 }}>
          <AddToCartButton item={item} label="Add to cart" />
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 920px) {
          .hrx-sticky-bar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
