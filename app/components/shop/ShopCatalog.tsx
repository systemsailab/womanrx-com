"use client";

import { useMemo, useState } from "react";
import { C, sans, mono, label as labelStyle, PAGE_X, MAX_W } from "@/lib/design";
import type { Product, Category } from "@/lib/shop/types";
import { cartEnabled } from "@/lib/shop/catalog";
import { ShopProductCard } from "./ShopProductCard";

type FormatKey = "all" | "shop" | "glp1" | "research";
const FORMATS: { key: FormatKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "shop", label: "Shippable now" },
  { key: "glp1", label: "GLP-1" },
  { key: "research", label: "Research" },
];

export function ShopCatalog({ products, categories }: { products: Product[]; categories: Category[] }) {
  const [cat, setCat] = useState<string>("all");
  const [format, setFormat] = useState<FormatKey>("all");

  const usedCats = useMemo(() => {
    const present = new Set(products.map((p) => p.categorySlug));
    return categories.filter((c) => present.has(c.slug));
  }, [products, categories]);

  const filtered = useMemo(() => {
    return products
      .filter((p) => (cat === "all" ? true : p.categorySlug === cat))
      .filter((p) => {
        if (format === "all") return true;
        if (format === "glp1") return p.isGlp1;
        if (format === "shop") return cartEnabled(p);
        if (format === "research") return !p.isGlp1 && !cartEnabled(p);
        return true;
      })
      .sort((a, b) => Number(b.bestseller) - Number(a.bestseller) || Number(b.featured) - Number(a.featured));
  }, [products, cat, format]);

  return (
    <section style={{ maxWidth: MAX_W, margin: "0 auto", padding: `0 ${PAGE_X} 96px` }}>
      {/* format toggles */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
        {FORMATS.map((f) => {
          const active = format === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setFormat(f.key)}
              style={{
                cursor: "pointer",
                border: `1px solid ${active ? C.brand : C.line}`,
                background: active ? C.brand : "transparent",
                color: active ? C.white : C.text,
                borderRadius: 999,
                padding: "8px 16px",
                ...sans({ fontSize: 13, fontWeight: 600 }),
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* category chips */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        <CatChip active={cat === "all"} onClick={() => setCat("all")}>
          All compounds
        </CatChip>
        {usedCats.map((c) => (
          <CatChip key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>
            {c.name}
          </CatChip>
        ))}
      </div>

      <p style={{ ...labelStyle(C.mute), marginBottom: 16 }}>
        {filtered.length} {filtered.length === 1 ? "product" : "products"}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 18,
        }}
      >
        {filtered.map((p) => (
          <ShopProductCard key={p.slug} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={sans({ fontSize: 15, color: C.mute, padding: "48px 0", textAlign: "center" })}>
          No products match that filter.
        </p>
      )}
    </section>
  );
}

function CatChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        cursor: "pointer",
        border: "none",
        background: "transparent",
        ...mono({
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: active ? C.brand : C.mute,
        }),
        borderBottom: `2px solid ${active ? C.brand : "transparent"}`,
        padding: "4px 2px",
      }}
    >
      {children}
    </button>
  );
}
