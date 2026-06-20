import { C, FONT } from "@/lib/design";

/**
 * HealthRx wordmark + logomark — "Editorial Serif" direction.
 * A solid teal Rx seal (Fraunces italic) paired with the "HealthRx.com"
 * wordmark set in Fraunces, the site's display serif. The "Rx" is an
 * italic brand-teal accent; ".com" is a quiet sans tail.
 * tone="ink" for light surfaces, tone="bone" for dark surfaces.
 */
export function BrandLogo({ tone = "ink", size = 21 }: { tone?: "ink" | "bone"; size?: number }) {
  const text = tone === "ink" ? C.text : C.bone;
  const dim = tone === "ink" ? C.mute : "rgba(253,250,242,0.55)";
  const rxColor = tone === "ink" ? C.brand : C.brandLight;
  const tile = Math.round(size * 1.5);
  const tileBg = tone === "ink" ? C.brand : C.bone;
  const tileInk = tone === "ink" ? C.bone : C.brand;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: Math.round(size * 0.4) }}>
      <span
        aria-hidden="true"
        style={{
          width: tile,
          height: tile,
          borderRadius: Math.round(tile * 0.3),
          background: tileBg,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: FONT.serif,
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: Math.round(tile * 0.54),
            color: tileInk,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          R<span style={{ fontSize: Math.round(tile * 0.4) }}>x</span>
        </span>
      </span>
      <span
        style={{
          fontFamily: FONT.serif,
          fontWeight: 600,
          fontSize: Math.round(size * 1.06),
          letterSpacing: "-0.012em",
          color: text,
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        Health
        <span style={{ fontStyle: "italic", color: rxColor }}>Rx</span>
        <span
          style={{
            fontFamily: FONT.sans,
            fontWeight: 500,
            color: dim,
            fontSize: Math.round(size * 0.62),
            letterSpacing: "0.01em",
          }}
        >
          .com
        </span>
      </span>
    </span>
  );
}
