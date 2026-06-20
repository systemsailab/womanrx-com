import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { C, display, sans, mono, PAGE_X } from "@/lib/design";
import { redirect } from "next/navigation";
import { PEPTIDES_LIVE } from "@/lib/shop/config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Peptide Checkout",
  robots: { index: false, follow: false },
};

// PARKED: peptide payment completion is intentionally not wired yet. The cart is
// fully functional up to here; this page is a holding step until the peptide
// gateway + WomanRx WLMD fulfillment IDs are connected.
export default function ShopCheckoutParked() {
  if (!PEPTIDES_LIVE) redirect("/glp1-offer-v1");
  return (
    <>
      <SiteNav />
      <main
        style={{
          background: C.paper,
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: `64px ${PAGE_X}`,
        }}
      >
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <p style={{ ...mono({ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", color: C.brand }), textTransform: "uppercase" }}>
            Almost there
          </p>
          <h1 style={display({ fontSize: 30, color: C.text, marginTop: 12, lineHeight: 1.15 })}>
            Peptide checkout is opening soon
          </h1>
          <p style={sans({ fontSize: 15.5, color: C.text2, lineHeight: 1.6, marginTop: 14 })}>
            Your selections are saved in your cart. Peptide ordering goes live shortly. In the meantime you can start a
            GLP-1 assessment or keep browsing the catalog.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24, flexWrap: "wrap" }}>
            <Link href="/weight-loss-intake" className="btn-brand" style={{ padding: "12px 22px" }}>
              Start GLP-1 assessment →
            </Link>
            <Link href="/shop" className="btn-outline" style={{ padding: "12px 22px" }}>
              Back to catalog
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
