"use client";

import { useMemo, useState } from "react";
import { C, sans, mono, display, RADIUS } from "@/lib/design";
import type { Product, ShopTier } from "@/lib/shop/types";
import { AddToCartButton } from "./AddToCartButton";
import { StickyCartBar } from "./StickyCartBar";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

function tierMeta(tier: ShopTier, baseUnit: number) {
  const total = tier.retailUnitPrice * tier.quantity;
  const saved = (baseUnit - tier.retailUnitPrice) * tier.quantity;
  const badge = tier.quantity === 2 ? "Most popular" : tier.quantity === 3 ? "Best value" : null;
  return { total, saved, badge };
}

export function ShopBuyBox({ product, tiers }: { product: Product; tiers: ShopTier[] }) {
  const baseUnit = tiers[0]?.retailUnitPrice ?? product.price;
  const defaultQty = (tiers.find((t) => t.quantity === 2) ?? tiers[0])?.quantity ?? 1;
  const [qty, setQty] = useState<1 | 2 | 3>(defaultQty as 1 | 2 | 3);
  const [subscribe, setSubscribe] = useState(true);

  const selected = useMemo(() => tiers.find((t) => t.quantity === qty) ?? tiers[0], [tiers, qty]);
  const selTotal = selected ? selected.retailUnitPrice * selected.quantity : product.price;

  const item = {
    slug: product.slug,
    name: product.name,
    image: product.image,
    quantity: qty,
    subscribe,
    unitPrice: selected?.retailUnitPrice ?? product.price,
  };

  return (
    <div
      style={{
        background: C.white,
        border: `1px solid ${C.line}`,
        borderRadius: RADIUS.lg,
        padding: "22px 22px 24px",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
        <span style={display({ fontSize: 26, color: C.text })}>{money(selTotal)}</span>
        <span style={mono({ fontSize: 12.5, color: C.mute })}>
          {money(selected?.retailUnitPrice ?? product.price)}/vial
        </span>
      </div>

      {/* quantity tiers */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
        {tiers.map((t) => {
          const { total, saved, badge } = tierMeta(t, baseUnit);
          const active = t.quantity === qty;
          return (
            <button
              key={t.quantity}
              onClick={() => setQty(t.quantity)}
              style={{
                textAlign: "left",
                cursor: "pointer",
                background: active ? C.brandSoft : C.white,
                border: `1.5px solid ${active ? C.brand : C.line}`,
                borderRadius: RADIUS.md,
                padding: "13px 15px",
                display: "grid",
                gridTemplateColumns: "20px 1fr auto",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 999,
                  border: `2px solid ${active ? C.brand : C.lineStrong}`,
                  background: active ? C.brand : "transparent",
                  boxShadow: active ? `inset 0 0 0 3px ${C.white}` : "none",
                }}
              />
              <span>
                <span style={sans({ fontSize: 14.5, fontWeight: 600, color: C.text })}>
                  {t.quantity} {t.quantity === 1 ? "vial" : "vials"}
                </span>
                {badge && (
                  <span
                    style={{
                      ...mono({ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.1em", color: C.brand }),
                      textTransform: "uppercase",
                      marginLeft: 8,
                      background: C.brandSoft,
                      padding: "3px 7px",
                      borderRadius: 999,
                    }}
                  >
                    {badge}
                  </span>
                )}
                <span style={mono({ fontSize: 11.5, color: C.mute, display: "block", marginTop: 3 })}>
                  {money(t.retailUnitPrice)}/vial
                  {saved > 0 ? ` · save ${money(saved)}` : ""}
                </span>
              </span>
              <span style={mono({ fontSize: 14, fontWeight: 600, color: C.text })}>{money(total)}</span>
            </button>
          );
        })}
      </div>

      {/* subscribe / one-time */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14 }}>
        {[
          { sub: true, title: "Subscribe", note: "Auto-resupply, cancel anytime" },
          { sub: false, title: "One-time", note: "Single order" },
        ].map((opt) => {
          const active = subscribe === opt.sub;
          return (
            <button
              key={opt.title}
              onClick={() => setSubscribe(opt.sub)}
              style={{
                cursor: "pointer",
                textAlign: "left",
                background: active ? C.brandSoft : C.white,
                border: `1.5px solid ${active ? C.brand : C.line}`,
                borderRadius: RADIUS.md,
                padding: "10px 12px",
              }}
            >
              <span style={sans({ fontSize: 13.5, fontWeight: 600, color: C.text })}>{opt.title}</span>
              <span style={sans({ fontSize: 11, color: C.mute, display: "block", marginTop: 2 })}>{opt.note}</span>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 18 }}>
        <AddToCartButton item={item} label="Add to cart" />
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "flex", flexDirection: "column", gap: 7 }}>
        {["Provider reviewed before dispensing", "Compounded by a US-licensed pharmacy", "Discreet shipping, cancel anytime"].map(
          (t) => (
            <li key={t} style={{ display: "flex", gap: 8, ...sans({ fontSize: 12.5, color: C.text2 }) }}>
              <span style={{ color: C.brand }}>✓</span>
              {t}
            </li>
          )
        )}
      </ul>

      <StickyCartBar item={item} subLabel={`${qty} ${qty === 1 ? "vial" : "vials"} · ${subscribe ? "Subscribe" : "One-time"}`} />
    </div>
  );
}
