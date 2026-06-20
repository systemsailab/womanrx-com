import Link from "next/link";
import { C, sans, mono } from "@/lib/design";

/**
 * Conversion CTA injected into every medical article (server component).
 * Routes informational SEO readers into the GLP-1 offer funnel (/glp1-offer-v1).
 * Two variants: a compact "inline" card placed high in the article, and a
 * larger "end" block after the body.
 */
export function ArticleOfferCTA({ variant = "inline" }: { variant?: "inline" | "end" }) {
  const isEnd = variant === "end";
  return (
    <aside
      style={{
        margin: isEnd ? "40px 0 8px" : "28px 0",
        borderRadius: 16,
        border: `1px solid ${C.brand}`,
        background: isEnd ? C.ink : C.brandSoft,
        padding: isEnd ? "clamp(24px, 4vw, 36px)" : "clamp(18px, 3vw, 24px)",
      }}
      aria-label="Start a GLP-1 weight loss assessment"
    >
      <div style={mono({ fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", color: isEnd ? "rgba(253,250,242,0.6)" : C.brand, fontWeight: 800 })}>
        GLP-1 Weight Loss · From $99/mo
      </div>
      <p style={sans({ marginTop: 10, fontSize: isEnd ? "clamp(22px, 3vw, 30px)" : "clamp(18px, 2.4vw, 23px)", fontWeight: 850, lineHeight: 1.15, color: isEnd ? C.bone : C.text })}>
        {isEnd
          ? "Ready to start? See your personalized GLP-1 plan in 2 minutes."
          : "Want to see if GLP-1 treatment is right for you?"}
      </p>
      <p style={sans({ marginTop: 10, fontSize: 14.5, lineHeight: 1.55, color: isEnd ? C.bone2 : C.text2, fontWeight: 500, maxWidth: 620 })}>
        Take a private 2-minute assessment and get compounded semaglutide or tirzepatide, prescribed online by a licensed clinician and shipped free. No insurance required.
      </p>
      <Link
        href="/glp1-offer-v1"
        className={isEnd ? "btn-paper" : "btn-brand"}
        style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 24px", fontSize: 15.5, color: isEnd ? C.brand : C.bone, textDecoration: "none" }}
      >
        <span style={{ color: isEnd ? C.brand : C.bone }}>Start my free assessment</span>
        <span style={mono({ fontSize: 13, color: isEnd ? C.brand : C.bone })}>→</span>
      </Link>
      {isEnd && (
        <div style={{ marginTop: 16, display: "flex", gap: 16, flexWrap: "wrap", ...mono({ fontSize: 10.5, color: "rgba(253,250,242,0.55)", textTransform: "uppercase", letterSpacing: "0.05em" }) }}>
          <span>★ 4.8 member rating</span>
          <span>Licensed clinicians</span>
          <span>Free shipping</span>
          <span>No insurance needed</span>
        </div>
      )}
    </aside>
  );
}
