"use client";

import Link from "next/link";
import { useState } from "react";
import { C, sans, mono, display, RADIUS } from "@/lib/design";
import type { Product } from "@/lib/shop/types";
import { cartEnabled, isResearchProfile, funnelHref } from "@/lib/shop/catalog";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export function ShopProductCard({ product }: { product: Product }) {
  const [imgOk, setImgOk] = useState(true);
  const buyable = cartEnabled(product);
  const research = isResearchProfile(product);
  const href = product.isGlp1 ? funnelHref(product.slug) : `/shop/${product.slug}`;

  return (
    <Link
      href={href}
      style={{
        display: "flex",
        flexDirection: "column",
        background: C.white,
        border: `1px solid ${C.line}`,
        borderRadius: RADIUS.lg,
        overflow: "hidden",
        textDecoration: "none",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 26px 50px -30px rgba(14,14,12,0.32)";
        e.currentTarget.style.borderColor = C.brandLight;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = C.line;
      }}
    >
      {/* image */}
      <div
        style={{
          position: "relative",
          aspectRatio: "1 / 1",
          background: C.paper,
          borderBottom: `1px solid ${C.line}`,
        }}
      >
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
          <span style={{ ...mono({ fontSize: 12, color: C.brandLight, letterSpacing: "0.14em" }), textTransform: "uppercase", lineHeight: 1.4 }}>
            {product.name}
          </span>
        </div>
        {imgOk && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt=""
            onError={() => setImgOk(false)}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}
      </div>

      {/* body */}
      <div style={{ padding: "15px 16px 17px", display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        <div style={{ ...mono({ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: C.brand }), textTransform: "uppercase" }}>
          {product.isGlp1 ? "GLP-1 · Rx" : research ? "Research" : product.category}
        </div>

        <div style={display({ fontSize: 18, fontWeight: 600, color: C.text, lineHeight: 1.18, letterSpacing: "-0.01em" })}>
          {product.name}
        </div>

        {product.tagline ? (
          <div
            style={{
              ...sans({ fontSize: 12.5, color: C.mute, lineHeight: 1.45 }),
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.tagline}
          </div>
        ) : (
          <div style={sans({ fontSize: 12.5, color: C.mute })}>{product.concentration || product.unit}</div>
        )}

        <div
          style={{
            marginTop: "auto",
            paddingTop: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          {product.isGlp1 ? (
            <span style={sans({ fontSize: 14, fontWeight: 600, color: C.brand })}>Start assessment</span>
          ) : buyable ? (
            <span>
              <span style={mono({ fontSize: 10.5, color: C.mute, letterSpacing: "0.08em" })}>FROM </span>
              <span style={mono({ fontSize: 17, fontWeight: 700, color: C.text })}>{money(product.price)}</span>
            </span>
          ) : (
            <span style={sans({ fontSize: 13, fontWeight: 500, color: C.mute })}>Research profile</span>
          )}
          <span
            aria-hidden
            style={{
              width: 30,
              height: 30,
              borderRadius: 999,
              border: `1px solid ${C.line}`,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              ...mono({ fontSize: 13, color: C.brand }),
            }}
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
