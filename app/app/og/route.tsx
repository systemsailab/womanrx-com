/**
 * Per-article OG image generator. Returns a 1200x630 branded PNG with the
 * article title + topic + WomanRx.com byline. Cached by Vercel forever per
 * (topic, slug) combo.
 *
 * Usage: <meta property="og:image" content="https://womanrx.com/og?topic=X&slug=Y" />
 */
import { ImageResponse } from "next/og";
import { getArticle } from "@/lib/content";

export const runtime = "nodejs"; // needs fs access via getArticle
export const dynamic = "force-static";
export const revalidate = false;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const topic = url.searchParams.get("topic") || "";
  const slug = url.searchParams.get("slug") || "";

  let title = "WomanRx.com";
  let subtitle = "Evidence-based hormone, peptide, and GLP-1 medicine";
  if (topic && slug) {
    const a = getArticle(topic, slug);
    if (a) {
      title = a.title;
      subtitle = `WomanRx.com Medical Team · Last reviewed ${a.lastReviewed}`;
    }
  }
  const fontSize = title.length > 80 ? 48 : title.length > 50 ? 56 : 68;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #065f46 0%, #0f766e 100%)",
          padding: "70px",
          fontFamily: "system-ui",
          color: "white",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "white",
              color: "#065f46",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            H
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em" }}>
            WomanRx.com
          </div>
        </div>

        <div
          style={{
            fontSize,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            maxWidth: 1060,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "rgba(255,255,255,0.85)",
            fontSize: 22,
          }}
        >
          <div>{subtitle}</div>
          <div>womanrx.com</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
