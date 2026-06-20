import type { Metadata } from "next";
import Link from "next/link";
import { permanentRedirect, redirect } from "next/navigation";
import { PEPTIDES_LIVE } from "@/lib/shop/config";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ShopImage } from "@/components/shop/ShopImage";
import { ShopBuyBox } from "@/components/shop/ShopBuyBox";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { products, getProductBySlug, getProductsByCategory } from "@/lib/shop/products";
import { getTierOptions } from "@/lib/shop/tiers";
import { cartEnabled, funnelHref } from "@/lib/shop/catalog";
import { C, display, sans, mono, serif, PAGE_X, MAX_W, RADIUS } from "@/lib/design";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export function generateStaticParams() {
  return PEPTIDES_LIVE ? products.map((p) => ({ slug: p.slug })) : [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return {};
  const desc =
    p.tagline ||
    `${p.name} from WomanRx. Compounded by a US-licensed pharmacy, provider reviewed, real pricing shown up front.`;
  return {
    title: p.name,
    description: desc,
    alternates: { canonical: `https://womanrx.com/shop/${p.slug}` },
  };
}

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!PEPTIDES_LIVE) redirect("/glp1-offer-v1");
  const product = getProductBySlug(slug);
  if (!product) permanentRedirect("/shop");

  const tiers = getTierOptions(product.slug);
  const buyable = cartEnabled(product);

  const related = getProductsByCategory(product.categorySlug)
    .filter((p) => p.slug !== product.slug && cartEnabled(p))
    .slice(0, 4);

  return (
    <>
      <SiteNav />
      <main style={{ background: C.paper }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: `28px ${PAGE_X} 0` }}>
          <nav style={{ ...mono({ fontSize: 11, color: C.mute, letterSpacing: "0.06em" }) }}>
            <Link href="/shop" style={{ color: C.mute, textDecoration: "none" }}>
              Shop
            </Link>
            <span style={{ margin: "0 8px" }}>/</span>
            <span style={{ color: C.text2 }}>{product.category}</span>
          </nav>
        </div>

        {/* hero: media + buy column */}
        <section
          style={{
            maxWidth: MAX_W,
            margin: "0 auto",
            padding: `28px ${PAGE_X} 56px`,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: "clamp(24px, 4vw, 56px)",
            alignItems: "start",
          }}
          className="hrx-pdp-grid"
        >
          {/* left: media + specs */}
          <div style={{ position: "sticky", top: 90 }} className="hrx-pdp-media">
            <div style={{ border: `1px solid ${C.line}`, borderRadius: RADIUS.lg, overflow: "hidden", background: C.white }}>
              <ShopImage src={product.image} alt={product.name} />
            </div>
            <dl
              style={{
                marginTop: 16,
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 1,
                background: C.line,
                border: `1px solid ${C.line}`,
                borderRadius: RADIUS.md,
                overflow: "hidden",
              }}
            >
              {[
                ["Concentration", product.concentration],
                ["Purity", product.purity],
                ["Unit", product.unit],
                ["Category", product.category],
              ]
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k} style={{ background: C.white, padding: "12px 14px" }}>
                    <dt style={{ ...mono({ fontSize: 9.5, color: C.mute, letterSpacing: "0.14em" }), textTransform: "uppercase" }}>
                      {k}
                    </dt>
                    <dd style={mono({ fontSize: 13.5, color: C.text, margin: "4px 0 0" })}>{v}</dd>
                  </div>
                ))}
            </dl>
          </div>

          {/* right: title + purchase / branch */}
          <div>
            <p style={{ ...mono({ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", color: C.brand }), textTransform: "uppercase" }}>
              {product.category}
            </p>
            <h1 style={display({ fontSize: "clamp(30px, 4vw, 46px)", color: C.text, lineHeight: 1.06, marginTop: 12 })}>
              {product.name}
            </h1>
            {product.tagline && (
              <p style={sans({ fontSize: "clamp(15px, 1.7vw, 18px)", color: C.text2, lineHeight: 1.5, marginTop: 14 })}>
                {product.tagline}
              </p>
            )}

            <div style={{ marginTop: 26 }}>
              {product.isGlp1 ? (
                <BranchGlp1 slug={product.slug} />
              ) : buyable ? (
                <ShopBuyBox product={product} tiers={tiers} />
              ) : (
                <BranchResearch />
              )}
            </div>
          </div>
        </section>

        {/* about / benefits / science — render only when copy exists (Phase 5 fills these) */}
        {(product.longDescription || product.benefits.length > 0 || product.scienceNotes) && (
          <section style={{ background: C.white, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
            <div
              style={{
                maxWidth: 820,
                margin: "0 auto",
                padding: `clamp(48px, 7vw, 88px) ${PAGE_X}`,
                display: "flex",
                flexDirection: "column",
                gap: 28,
              }}
            >
              {product.longDescription && (
                <div>
                  <h2 style={display({ fontSize: 24, color: C.text })}>
                    About <span style={serif({ color: C.brand })}>{product.name}</span>
                  </h2>
                  <p style={sans({ fontSize: 16, color: C.text2, lineHeight: 1.7, marginTop: 14, whiteSpace: "pre-line" })}>
                    {product.longDescription}
                  </p>
                </div>
              )}
              {product.benefits.length > 0 && (
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
                  {product.benefits.map((b, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, ...sans({ fontSize: 15, color: C.text2, lineHeight: 1.5 }) }}>
                      <span style={{ color: C.brand, marginTop: 2 }}>✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {product.scienceNotes && (
                <div style={{ background: C.paper2, borderRadius: RADIUS.md, padding: "18px 20px" }}>
                  <p style={{ ...mono({ fontSize: 10, letterSpacing: "0.14em", color: C.mute }), textTransform: "uppercase" }}>
                    Evidence notes
                  </p>
                  <p style={sans({ fontSize: 14, color: C.text2, lineHeight: 1.6, marginTop: 8 })}>{product.scienceNotes}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* cross-sell */}
        {related.length > 0 && (
          <section style={{ maxWidth: MAX_W, margin: "0 auto", padding: `clamp(48px, 6vw, 80px) ${PAGE_X}` }}>
            <h2 style={display({ fontSize: 22, color: C.text, marginBottom: 20 })}>Pairs well with</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 18 }}>
              {related.map((p) => (
                <ShopProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* compliance */}
        <div style={{ maxWidth: 820, margin: "0 auto", padding: `0 ${PAGE_X} 64px` }}>
          <p style={sans({ fontSize: 12, color: C.mute, lineHeight: 1.6 })}>
            Compounded medications are prepared by a US-licensed pharmacy and are not reviewed by the FDA for safety or
            effectiveness. Products are dispensed only after a licensed provider determines they are appropriate.
            Information here is educational and is not a substitute for medical advice.
          </p>
        </div>
      </main>
      <SiteFooter />

      <style>{`
        @media (max-width: 880px) {
          .hrx-pdp-grid { grid-template-columns: 1fr !important; }
          .hrx-pdp-media { position: static !important; }
        }
      `}</style>
    </>
  );
}

function BranchGlp1({ slug }: { slug: string }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: RADIUS.lg, padding: "24px" }}>
      <p style={sans({ fontSize: 15, color: C.text2, lineHeight: 1.6 })}>
        This is a prescription GLP-1 therapy. Start a short medical assessment and a licensed provider will determine
        whether it is right for you, then build your plan and pricing.
      </p>
      <Link href={funnelHref(slug, "pdp")} className="btn-brand" style={{ marginTop: 18, width: "100%", justifyContent: "center", padding: "15px" }}>
        Start your assessment →
      </Link>
      <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "flex", flexDirection: "column", gap: 7 }}>
        {["No charge to complete the assessment", "US-licensed providers", "Cancel anytime"].map((t) => (
          <li key={t} style={{ display: "flex", gap: 8, ...sans({ fontSize: 12.5, color: C.text2 }) }}>
            <span style={{ color: C.brand }}>✓</span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BranchResearch() {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: RADIUS.lg, padding: "24px" }}>
      <p style={{ ...mono({ fontSize: 10, letterSpacing: "0.14em", color: C.mute }), textTransform: "uppercase" }}>
        Research profile
      </p>
      <p style={sans({ fontSize: 15, color: C.text2, lineHeight: 1.6, marginTop: 10 })}>
        This compound is provided for research and education and is not currently available to purchase. Explore the
        clinical library to learn how it is studied.
      </p>
      <Link href="/peptides" className="btn-outline" style={{ marginTop: 18, width: "100%", justifyContent: "center", padding: "13px" }}>
        Read the peptide library →
      </Link>
    </div>
  );
}
