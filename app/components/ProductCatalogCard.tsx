import Image from "next/image";
import Link from "next/link";
import { C, sans, mono, label, chip, RADIUS } from "@/lib/design";

export type CatalogProduct = {
  href: string;
  name: string;
  subtitle: string;          // "Once-weekly injection" etc.
  photo: string;
  photoObjectPosition?: string; // CSS object-position string for selective cropping
  chips: { label: string; tone: "rx" | "new" | "fda" | "advanced" }[];
  fromPrice: string;          // "$249"
  fromPeriod: string;         // optional suffix
  highlight?: string;         // "Most chosen" — optional small ribbon
  shortDesc: string;
};

/** Hims/Ro-style ecommerce product tile for the home catalog grid. */
export function ProductCatalogCard({ p }: { p: CatalogProduct }) {
  return (
    <article className="product-card">
      {/* Chips row */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
        {p.chips.map((c) => {
          let bg: string = C.brandSoft;
          let color: string = C.brand;
          if (c.tone === "rx") {
            bg = "#F5EFE0";
            color = C.text;
          } else if (c.tone === "new") {
            bg = "#0E4F4F";
            color = "#FDFAF2";
          } else if (c.tone === "fda") {
            bg = "#E5EDED";
            color = C.brandDeep;
          } else if (c.tone === "advanced") {
            bg = "#FAE4D3";
            color = "#6F3A2C";
          }
          return (
            <span key={c.label} style={chip(color, bg)}>
              {c.label}
            </span>
          );
        })}
      </div>

      {/* Photograph — large square */}
      <div
        style={{
          aspectRatio: "1/1",
          position: "relative",
          background: C.paper2,
          borderRadius: RADIUS.md,
          overflow: "hidden",
          marginBottom: 24,
        }}
      >
        <Image
          src={p.photo}
          alt={p.name}
          fill
          sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 25vw"
          style={{
            objectFit: "cover",
            objectPosition: p.photoObjectPosition ?? "center",
          }}
        />
      </div>

      {/* Name + subtitle */}
      <div style={{ flex: 1 }}>
        <h3
          style={sans({
            fontSize: 22,
            fontWeight: 700,
            color: C.text,
            letterSpacing: "-0.012em",
            lineHeight: 1.15,
          })}
        >
          {p.name}
        </h3>
        <p style={sans({ fontSize: 13.5, color: C.mute, marginTop: 6, lineHeight: 1.5 })}>
          {p.subtitle}
        </p>
        <p style={sans({ fontSize: 14, color: C.text2, marginTop: 14, lineHeight: 1.6 })}>
          {p.shortDesc}
        </p>
      </div>

      {/* Price */}
      <div
        style={{
          marginTop: 22,
          paddingTop: 18,
          borderTop: `1px solid ${C.line}`,
          display: "flex",
          alignItems: "baseline",
          gap: 6,
        }}
      >
        <span style={mono({ fontSize: 12, color: C.mute })}>From</span>
        <span
          style={sans({
            fontSize: 28,
            fontWeight: 700,
            color: C.text,
            letterSpacing: "-0.018em",
          })}
        >
          {p.fromPrice}
        </span>
        <span style={sans({ fontSize: 13, color: C.mute })}>{p.fromPeriod}</span>
      </div>
      <p style={sans({ fontSize: 11.5, color: C.mute, marginTop: 4 })}>
        Plan options · secure checkout
      </p>

      {/* CTAs */}
      <div style={{ marginTop: 18, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Link
          href="/weight-loss-intake"
          className="btn-brand"
          style={{ flex: 1, padding: "12px 16px", fontSize: 13.5, minWidth: 120, justifyContent: "center" }}
        >
          Get started
        </Link>
        <Link
          href={p.href}
          className="btn-ghost"
          style={{ flex: 1, padding: "11px 16px", fontSize: 13.5, minWidth: 120, justifyContent: "center" }}
        >
          View details
        </Link>
      </div>

      {/* Safety link */}
      <Link
        href={`${p.href}#risks`}
        style={{
          marginTop: 14,
          ...sans({ fontSize: 12, color: C.mute }),
          textDecoration: "underline",
          textUnderlineOffset: 3,
          textAlign: "center",
        }}
      >
        Important safety information
      </Link>
    </article>
  );
}
