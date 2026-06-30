/**
 * WomenRX.com — "Warm editorial-luxe" women's longevity brand system.
 *
 * Direction: a home, not a pharmacy aisle. The reference set is editorial
 * beauty and wellness luxury (a doctor you adore meets a fashion masthead),
 * grafted onto a real clinical-trust spine. Covers GLP-1, peptides, HRT, and
 * longevity for women across every season of life.
 *
 * Color: warm bone surfaces, deep warm ink, a signature clay/rosewood brand
 * voice, champagne gold for luxe accents, sage for the quiet health note.
 *
 * Type: Fraunces (high-contrast editorial serif) is load-bearing for display.
 * Hanken Grotesk carries body and UI. JetBrains Mono is reserved for dose,
 * price, SKU, and cert IDs — a small note of clinical precision.
 *
 * Motif: the arch — a doorway, a window, a sanctuary. The ownable shape.
 */

export const C = {
  // Foundation — warm bone, not stark white
  paper: "#F7F0E5",         // warm bone background
  paper2: "#EFE6D8",        // alt section bg
  paper3: "#E7DBCB",        // accent paper
  white: "#FFFFFF",         // crisp white for product card surfaces + photos

  // Text — warm ink
  text: "#2A2320",          // warm espresso-black
  text2: "#5A4F46",
  mute: "#8A7E70",
  line: "rgba(42, 35, 32, 0.10)",
  lineStrong: "rgba(42, 35, 32, 0.20)",

  // Ink panels (dark hero / footer) — deep warm espresso, never cold
  ink: "#251E1A",
  ink2: "#2E2620",
  ink3: "#38302A",
  inkLine: "rgba(247, 240, 229, 0.12)",
  inkLineStrong: "rgba(247, 240, 229, 0.24)",
  bone: "#F7F0E5",
  bone2: "rgba(247, 240, 229, 0.74)",
  bone3: "rgba(247, 240, 229, 0.52)",
  bone4: "rgba(247, 240, 229, 0.34)",

  // BRAND ACCENT — clay / rosewood (the brand's voice)
  brand: "#B0685A",         // primary CTA + brand mark
  brandDeep: "#8A4A3D",
  brandLight: "#E4B9AC",    // light clay for on-dark accents
  brandSoft: "rgba(176, 104, 90, 0.09)",
  brandTint: "#F0E2DA",     // clay tint surface

  // Signature accents — champagne gold + sage
  gold: "#C2A268",
  goldDeep: "#9A7E48",
  goldTint: "#F1E6D0",
  sage: "#7E8B73",
  sageDeep: "#566049",
  sageTint: "#E5EADD",
  blush: "#EAD3C8",
  clay: "#B0685A",
  clayDeep: "#8A4A3D",

  // Color-coded lanes (visual differentiation across treatment categories)
  forest: "#5E6B50",        // sage family — peptides
  forestDeep: "#434B39",
  forestLight: "#C7D0BA",
  terracotta: "#A85B4C",    // clay family — hormones
  terracottaDeep: "#7E4034",
  terracottaLight: "#E6C4B6",

  // Accent (used surgically on price strikethrough + brand mark)
  accent: "#B0685A",
  accentDeep: "#8A4A3D",
  accentLight: "#E4B9AC",

  // Status
  danger: "#A8341E",
  success: "#3F7A55",
  warn: "#C99A3E",
  yellow: "#D9B877",        // champagne — promo / stars
} as const;

export const FONT = {
  display: '"Fraunces", Georgia, "Times New Roman", serif',
  serif: '"Fraunces", Georgia, serif',
  sans: '"Hanken Grotesk", system-ui, -apple-system, sans-serif',
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

/** Editorial display serif — Fraunces, the load-bearing headline type. */
export const display = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: FONT.display,
  fontOpticalSizing: "auto",
  fontWeight: 450,
  letterSpacing: "-0.014em",
  ...extra,
});

/** Sans body — Hanken Grotesk regular/medium. */
export const sans = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: FONT.sans,
  letterSpacing: "0",
  ...extra,
});

/** Italic serif accent — Fraunces, used on accent words and pull quotes. */
export const serif = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: FONT.serif,
  fontOpticalSizing: "auto",
  letterSpacing: "-0.01em",
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

/** Editorial eyebrow label. Mono, tracked wide — a clinical-precision note. */
export const label = (color: string = C.mute): React.CSSProperties => ({
  ...mono({
    fontSize: 10.5,
    fontWeight: 500,
    letterSpacing: "0.2em",
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
