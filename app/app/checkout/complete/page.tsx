import Link from "next/link";
import { C, mono, sans } from "@/lib/design";

export default function CheckoutCompletePage({ searchParams }: { searchParams: Promise<{ order_id?: string }> }) {
  void searchParams;
  return (
    <main style={{ minHeight: "100vh", background: C.paper, color: C.text, display: "grid", placeItems: "center", padding: 24 }}>
      <section style={{ maxWidth: 680, background: C.white, border: `1px solid ${C.line}`, borderRadius: 18, padding: "clamp(28px, 6vw, 54px)", textAlign: "center" }}>
        <p style={mono({ fontSize: 11, color: C.brand, textTransform: "uppercase" })}>Order received</p>
        <h1 style={sans({ marginTop: 18, fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 850, lineHeight: 1 })}>
          Thank you.
          <br />
          <span style={sans({ color: C.brand, fontWeight: 850 })}>WomanRx.com has your order.</span>
        </h1>
        <p style={sans({ marginTop: 22, fontSize: 17, lineHeight: 1.55, color: C.text2 })}>
          Your payment was accepted. Here is what happens next: a licensed clinician reviews your order (usually within one business day), the pharmacy prepares your medication, and it ships to your door with free shipping. Watch your email for updates at every step.
        </p>
        <div style={{ marginTop: 34, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <a href="https://member.womanrx.com/" target="_blank" rel="noopener" className="btn-brand">
            Open member portal
          </a>
          <Link href="/" className="btn-outline-ink">
            Return home
          </Link>
        </div>
      </section>
    </main>
  );
}
