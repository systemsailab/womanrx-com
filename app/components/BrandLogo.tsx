import { C, FONT } from "@/lib/design";

/**
 * WomenRX wordmark + seal — "Warm editorial-luxe" direction.
 * A clay Rx seal (Fraunces italic) paired with the "WomenRx" wordmark set in
 * Fraunces, the brand's editorial display serif. "Women" is warm ink; "Rx" is
 * an italic clay accent — the monogram in the seal echoes it.
 * tone="ink" for light surfaces, tone="bone" for dark surfaces.
 */
export function BrandLogo({ tone = "ink", size = 21 }: { tone?: "ink" | "bone"; size?: number }) {
  const text = tone === "ink" ? C.text : C.bone;
  const rxColor = tone === "ink" ? C.brand : C.brandLight;
  const seal = Math.round(size * 1.62);
  const sealBg = tone === "ink" ? C.brand : C.bone;
  const sealInk = tone === "ink" ? C.bone : C.brand;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: Math.round(size * 0.42) }}>
      <span
        aria-hidden="true"
        style={{
          width: seal,
          height: seal,
          borderRadius: "50%",
          background: sealBg,
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
            fontWeight: 500,
            fontSize: Math.round(seal * 0.5),
            color: sealInk,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            paddingRight: 1,
          }}
        >
          R<span style={{ fontSize: Math.round(seal * 0.38) }}>x</span>
        </span>
      </span>
      <span
        style={{
          fontFamily: FONT.serif,
          fontWeight: 500,
          fontSize: Math.round(size * 1.18),
          letterSpacing: "-0.014em",
          color: text,
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        Women
        <span style={{ fontStyle: "italic", color: rxColor }}>Rx</span>
      </span>
    </span>
  );
}
