/**
 * WomanRx.com — v5 Ecommerce design system.
 *
 * Direction: this is a shop, not a magazine. The reference set is
 * Hims weight-loss, Ro weight-loss, TrimRx, Henry Meds, Eden — not Aesop.
 *
 * Color: bright cream / pure white surfaces, ink text, single saturated
 * deep-teal accent for CTAs. Teal differentiates from Hims peach,
 * Ro lime, TrimRx navy-yellow.
 *
 * Type: sans-serif display (Inter Display 600/700) for headlines.
 * Fraunces becomes a small italic accent only, not load-bearing.
 * JetBrains Mono only for dose, price, SKU, cert IDs.
 *
 * Rules:
 *   - Real product photography on white. Catalog grids.
 *   - Sticky CTA always visible.
 *   - Per-product chips (Rx / FDA Approved / New / High dose).
 *   - "From $X/mo" pricing visible on every product card.
 *   - Anchor nav under hero (Compounds / How it works / Pricing / Safety).
 */

export const C = {
  // Foundation
  paper: "#FDFAF2",         // warm white background (slightly off true white)
  paper2: "#F5EFE0",        // alt section bg
  paper3: "#EBE3D0",        // accent paper
  white: "#FFFFFF",         // pure white for product card surfaces

  // Text
  text: "#0E0E0C",          // warm carbon black
  text2: "#3F3C36",
  mute: "#6E6A60",
  line: "rgba(14, 14, 12, 0.10)",
  lineStrong: "rgba(14, 14, 12, 0.22)",

  // Ink panels (dark hero / footer)
  ink: "#0E0E0C",
  ink2: "#161613",
  ink3: "#1F1F1B",
  inkLine: "rgba(244, 241, 236, 0.10)",
  inkLineStrong: "rgba(244, 241, 236, 0.22)",
  bone: "#FDFAF2",
  bone2: "rgba(253, 250, 242, 0.72)",
  bone3: "rgba(253, 250, 242, 0.50)",
  bone4: "rgba(253, 250, 242, 0.32)",

  // BRAND ACCENT — deep teal pharmaceutical
  brand: "#0E4F4F",         // primary CTA + brand mark
  brandDeep: "#063535",
  brandLight: "#A8C9C9",
  brandSoft: "rgba(14, 79, 79, 0.08)",
  brandTint: "#E5EDED",

  // Color-coded products (kept for visual differentiation in catalog)
  forest: "#2D4A3A",
  forestDeep: "#1E3429",
  forestLight: "#B8D4C2",
  terracotta: "#9B5240",
  terracottaDeep: "#6F3A2C",
  terracottaLight: "#E4C0B0",

  // Accent (used surgically on price strikethrough + brand mark)
  accent: "#0E4F4F",       // now teal not oxblood
  accentDeep: "#063535",
  accentLight: "#A8C9C9",

  // Status
  danger: "#A8341E",
  success: "#0F7B3D",
  warn: "#D6A038",
  yellow: "#F5C842",       // promo bar background
} as const;

export const FONT = {
  display: '"Inter", "Söhne", system-ui, -apple-system, sans-serif',
  serif: '"Fraunces", "Times New Roman", Georgia, serif',
  sans: '"Inter", system-ui, -apple-system, sans-serif',
  mono: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, "SF Mono", monospace',
} as const;

export const RADIUS = {
  none: "0",
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  pill: "999px",
} as const;

/** Big sans-display (Inter 600/700) — primary headline type. */
export const display = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: FONT.display,
  fontWeight: 600,
  letterSpacing: "-0.022em",
  ...extra,
});

/** Sans body — Inter regular/medium. */
export const sans = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: FONT.sans,
  letterSpacing: "-0.002em",
  ...extra,
});

/** Italic serif accent — Fraunces, used sparingly on accent words only. */
export const serif = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: FONT.serif,
  fontOpticalSizing: "auto",
  letterSpacing: "-0.012em",
  fontWeight: 400,
  fontStyle: "italic",
  ...extra,
});

/** Mono for dose, price, cert ID. */
export const mono = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: FONT.mono,
  letterSpacing: "0",
  fontFeatureSettings: '"tnum" 1, "zero" 1',
  ...extra,
});

/** Editorial uppercase label. Mono, tracked wide. */
export const label = (color: string = C.mute): React.CSSProperties => ({
  ...mono({
    fontSize: 10.5,
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color,
  }),
});

/** Chip style — Rx, New, FDA Approved. */
export const chip = (color: string, bg: string): React.CSSProperties => ({
  ...mono({
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color,
  }),
  display: "inline-flex",
  alignItems: "center",
  background: bg,
  padding: "5px 9px",
  borderRadius: 999,
  lineHeight: 1,
});

export const PAGE_X = "clamp(20px, 4vw, 64px)";
export const SECTION_Y = "clamp(72px, 9vw, 128px)";
export const MAX_W = 1340;
export const MAX_W_PROSE = 720;
