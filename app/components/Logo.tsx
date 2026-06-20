import { C, FONT } from "@/lib/design";

/**
 * Editorial apothecary wordmark.
 * Inspired by Le Labo / Aesop — small, confident, no graphic mark beyond
 * a single typographic rule.
 */
export function Logo({ color = C.bone }: { color?: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        fontFamily: FONT.serif,
        fontWeight: 400,
        fontSize: 21,
        color,
        lineHeight: 1,
        letterSpacing: "-0.012em",
      }}
    >
      WomanRx.com
    </span>
  );
}

/**
 * Microscopic monogram for footer / favicon contexts.
 */
export function LogoMark({ color = C.bone }: { color?: string }) {
  return (
    <span
      style={{
        fontFamily: FONT.serif,
        fontWeight: 500,
        fontStyle: "italic",
        fontSize: 16,
        color,
        letterSpacing: "-0.02em",
      }}
    >
      Rx
    </span>
  );
}
