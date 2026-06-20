"use client";

import Link from "next/link";
import { C, sans, mono, label as labelStyle, display } from "@/lib/design";
import { useCart, lineKey, type CartItem } from "./CartProvider";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;
const FREE_SHIP_THRESHOLD = 150;

function planLabel(i: CartItem): string {
  const qty = `${i.quantity} ${i.quantity === 1 ? "vial" : "vials"}`;
  return i.subscribe ? `${qty} · Subscribe & save` : `${qty} · One-time`;
}

export function CartDrawer() {
  const { items, open, closeCart, setCount, removeItem, subtotal, discount, total } = useCart();

  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - total);

  return (
    <>
      {/* scrim */}
      <div
        onClick={closeCart}
        aria-hidden={!open}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 90,
          background: "rgba(14,14,12,0.42)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
      />
      {/* panel */}
      <aside
        aria-label="Shopping cart"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 91,
          width: "min(420px, 92vw)",
          background: C.paper,
          borderLeft: `1px solid ${C.line}`,
          boxShadow: "-24px 0 60px -30px rgba(14,14,12,0.4)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.32s cubic-bezier(0.22,1,0.36,1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 22px",
            borderBottom: `1px solid ${C.line}`,
          }}
        >
          <span style={display({ fontSize: 18, color: C.text })}>Your cart</span>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              ...sans({ fontSize: 22, color: C.mute, lineHeight: 1 }),
            }}
          >
            ×
          </button>
        </header>

        {items.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              padding: 32,
              textAlign: "center",
            }}
          >
            <p style={sans({ fontSize: 15, color: C.mute })}>Your cart is empty.</p>
            <Link href="/shop" onClick={closeCart} className="btn-brand" style={{ padding: "11px 22px" }}>
              Browse the catalog →
            </Link>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
              {items.map((i) => {
                const key = lineKey(i);
                const lineTotal = i.unitPrice * i.quantity * i.count;
                return (
                  <div
                    key={key}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "64px 1fr auto",
                      gap: 12,
                      padding: "14px 6px",
                      borderBottom: `1px solid ${C.line}`,
                      alignItems: "center",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={i.image}
                      alt={i.name}
                      width={64}
                      height={64}
                      style={{
                        width: 64,
                        height: 64,
                        objectFit: "cover",
                        borderRadius: 8,
                        background: C.white,
                        border: `1px solid ${C.line}`,
                      }}
                    />
                    <div>
                      <div style={sans({ fontSize: 14.5, fontWeight: 600, color: C.text })}>{i.name}</div>
                      <div style={mono({ fontSize: 11, color: C.mute, marginTop: 3 })}>{planLabel(i)}</div>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            border: `1px solid ${C.line}`,
                            borderRadius: 999,
                            overflow: "hidden",
                          }}
                        >
                          <button
                            aria-label="Decrease quantity"
                            onClick={() => setCount(key, i.count - 1)}
                            style={qtyBtn}
                          >
                            −
                          </button>
                          <span style={mono({ fontSize: 12.5, color: C.text, minWidth: 22, textAlign: "center" })}>
                            {i.count}
                          </span>
                          <button
                            aria-label="Increase quantity"
                            onClick={() => setCount(key, i.count + 1)}
                            style={qtyBtn}
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(key)}
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            ...mono({ fontSize: 10.5, color: C.mute, letterSpacing: "0.1em", textTransform: "uppercase" }),
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div style={mono({ fontSize: 14, fontWeight: 600, color: C.text })}>{money(lineTotal)}</div>
                  </div>
                );
              })}
            </div>

            <footer style={{ borderTop: `1px solid ${C.line}`, padding: "18px 20px 22px" }}>
              {remaining > 0 ? (
                <p style={sans({ fontSize: 12.5, color: C.mute, marginBottom: 12 })}>
                  Add <strong style={{ color: C.text }}>{money(remaining)}</strong> for free shipping.
                </p>
              ) : (
                <p style={sans({ fontSize: 12.5, color: C.success, marginBottom: 12 })}>✓ Free shipping unlocked</p>
              )}
              <Row label="Subtotal" value={money(subtotal)} />
              {discount > 0 && <Row label={`Stack savings`} value={`− ${money(discount)}`} accent />}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginTop: 8,
                  paddingTop: 12,
                  borderTop: `1px solid ${C.line}`,
                }}
              >
                <span style={display({ fontSize: 16, color: C.text })}>Total</span>
                <span style={mono({ fontSize: 18, fontWeight: 700, color: C.text })}>{money(total)}</span>
              </div>
              <Link
                href="/shop/checkout"
                onClick={closeCart}
                className="btn-brand"
                style={{ marginTop: 16, width: "100%", justifyContent: "center", padding: "15px" }}
              >
                Checkout →
              </Link>
              <p style={{ ...labelStyle(C.mute), marginTop: 12, textAlign: "center", letterSpacing: "0.08em" }}>
                Provider reviewed · US-licensed pharmacy
              </p>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}

const qtyBtn: React.CSSProperties = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: "5px 11px",
  fontSize: 15,
  color: C.text,
  lineHeight: 1,
};

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
      <span style={sans({ fontSize: 13.5, color: C.mute })}>{label}</span>
      <span style={mono({ fontSize: 13.5, color: accent ? C.success : C.text })}>{value}</span>
    </div>
  );
}
