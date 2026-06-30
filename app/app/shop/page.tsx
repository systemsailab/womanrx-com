import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ShopCatalog } from "@/components/shop/ShopCatalog";
import { products, categories } from "@/lib/shop/products";
import { C, display, sans, serif, PAGE_X, MAX_W } from "@/lib/design";
import { redirect } from "next/navigation";
import { PEPTIDES_LIVE } from "@/lib/shop/config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Compound Catalog",
  description:
    "Browse compounded peptides and GLP-1 therapy from a US-licensed pharmacy. Real pricing shown up front, provider reviewed, shipped discreetly.",
  alternates: { canonical: "https://womenrx.com/shop" },
};

export default function ShopPage() {
  if (!PEPTIDES_LIVE) redirect("/glp1-offer-v1");
  return (
    <>
      <SiteNav />
      <main style={{ background: C.paper, minHeight: "70vh" }}>
        <header style={{ maxWidth: MAX_W, margin: "0 auto", padding: `clamp(48px, 7vw, 96px) ${PAGE_X} 40px` }}>
          <p style={{ ...sans({ fontSize: 12.5, fontWeight: 600, letterSpacing: "0.16em", color: C.brand }), textTransform: "uppercase" }}>
            The catalog
          </p>
          <h1 style={display({ fontSize: "clamp(34px, 5vw, 56px)", color: C.text, lineHeight: 1.05, marginTop: 14, maxWidth: 760 })}>
            Compounded peptides and GLP-1 care, priced{" "}
            <span style={serif({ fontSize: "1.02em", color: C.brand })}>in the open</span>
          </h1>
          <p style={sans({ fontSize: "clamp(15px, 1.6vw, 18px)", color: C.text2, lineHeight: 1.55, marginTop: 18, maxWidth: 620 })}>
            Every compound here is dispensed by a US-licensed pharmacy and reviewed by a licensed provider. Browse by
            goal, see the real price before you start, and add what fits your protocol.
          </p>
        </header>
        <ShopCatalog products={products} categories={categories} />
      </main>
      <SiteFooter />
    </>
  );
}
