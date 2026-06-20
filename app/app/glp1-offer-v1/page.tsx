import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { C, PAGE_X, MAX_W, display, label, mono, sans } from "@/lib/design";

export const metadata: Metadata = {
  title: "GLP-1 Weight Loss Plans from $99/mo",
  description:
    "Start a private WomanRx.com GLP-1 assessment. Semaglutide plans from $99/mo and tirzepatide plans from $149/mo with secure online checkout.",
};

const START_PATH = "/glp1-offer-v1/intake/height-weight?source=glp1-offer-v1";

const offerCards = [
  {
    name: "Semaglutide",
    dose: "Weekly GLP-1",
    from: "$99/mo",
    total: "$1,188 annual plan",
    img: "/photo/vial-sema-v2.jpg",
  },
  {
    name: "Tirzepatide",
    dose: "Weekly GLP-1 + GIP",
    from: "$149/mo",
    total: "$1,788 annual plan",
    img: "/photo/vial-tirz-v2.jpg",
    featured: true,
  },
];

const bullets = [
  "Private online assessment",
  "No insurance required",
  "Secure checkout after your plan is selected",
];

const steps = [
  ["01", "Answer a few questions", "Share your state, goals, and basic health history in a short private flow.", "/photo/consultation.jpg"],
  ["02", "Choose your plan", "Pick semaglutide or tirzepatide and select the monthly, 3, 6, or 12-month option.", "/photo/vials.jpg"],
  ["03", "Complete checkout", "Pay securely online. A licensed clinician reviews every order before your medication ships to your door.", "/photo/shipping.jpg"],
];

const TESTIMONIALS = [
  {
    quote: "Down 23 lbs in my first three months. The constant food noise just... stopped.",
    name: "Jessica M.",
    meta: "Semaglutide member · Texas",
    result: "-23 lbs in 3 months",
    img: "/photo/portrait.jpg",
  },
  {
    quote: "Checkout took five minutes and the package showed up in four days, cold-packed and professional.",
    name: "Marcus T.",
    meta: "Tirzepatide member · Florida",
    result: "Shipped in 4 days",
    img: "/photo/portrait-male.jpg",
  },
  {
    quote: "I'd tried everything for years. This is the first time the scale actually kept moving.",
    name: "Dana R.",
    meta: "Semaglutide member · Ohio",
    result: "-31 lbs in 6 months",
    img: "/photo/portrait-wide.jpg",
  },
];

const STAT_BAND = [
  ["4.8★", "average member rating"],
  ["1000s", "of orders shipped"],
  ["503A", "licensed pharmacy"],
  ["Free", "cold-chain shipping"],
];

const faqs = [
  {
    q: "How much does it cost?",
    a: "Semaglutide plans start at $99/mo with the 12-month option. Tirzepatide plans start at $149/mo with the 12-month option. You confirm the exact plan before payment.",
  },
  {
    q: "Do I need insurance?",
    a: "No. WomanRx.com checkout is cash-pay and uses transparent plan pricing.",
  },
  {
    q: "What happens after I pay?",
    a: "A licensed clinician reviews your order and health answers. Once approved, your medication ships directly to your door with free shipping, and our team sends order updates by email.",
  },
];

export default function Glp1OfferV1Page() {
  return (
    <main style={{ minHeight: "100vh", background: C.paper, color: C.text }}>
      <Nav />
      <Hero />
      <ProofStrip />
      <OfferPricing />
      <HowItWorks />
      <Testimonials />
      <ProductProof />
      <Faq />
      <FinalCta />
      <StickyCta />
    </main>
  );
}

function Nav() {
  return (
    <header style={{ background: C.white, borderBottom: `1px solid ${C.line}`, position: "sticky", top: 0, zIndex: 40 }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: `14px ${PAGE_X}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
        <Link href="/glp1-offer-v1" style={{ ...sans({ fontSize: 22, fontWeight: 900, color: C.text }), textDecoration: "none" }}>
          WomanRx.com
        </Link>
        <nav style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a href="#pricing" style={{ ...sans({ fontSize: 13, color: C.text2, fontWeight: 700 }), textDecoration: "none" }} className="hide-small">Pricing</a>
          <a href="#faq" style={{ ...sans({ fontSize: 13, color: C.text2, fontWeight: 700 }), textDecoration: "none" }} className="hide-small">FAQ</a>
          <Link href={START_PATH} className="btn-brand" style={{ padding: "11px 18px", fontSize: 13.5 }}>
            Start assessment
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section style={{ padding: `clamp(38px, 6vw, 76px) ${PAGE_X} clamp(54px, 7vw, 96px)` }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "clamp(28px, 5vw, 76px)", alignItems: "center" }} className="offer-hero">
        <div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
            <Pill text="Private 2-minute assessment" />
            <Pill text="Plans from $99/mo" />
          </div>
          <h1 style={display({ fontSize: "clamp(44px, 7vw, 88px)", fontWeight: 900, lineHeight: 0.94, color: C.text })}>
            Finally serious about weight loss?
          </h1>
          <p style={sans({ marginTop: 20, maxWidth: 640, fontSize: "clamp(18px, 1.7vw, 22px)", lineHeight: 1.45, color: C.text2, fontWeight: 600 })}>
            See if online GLP-1 care through WomanRx.com could be your next step. Choose a plan, complete secure checkout, and keep pricing simple.
          </p>
          <ul style={{ listStyle: "none", display: "grid", gap: 11, marginTop: 28, maxWidth: 560 }}>
            {bullets.map((item) => (
              <li key={item} style={{ display: "grid", gridTemplateColumns: "26px 1fr", gap: 10, alignItems: "center" }}>
                <Check />
                <span style={sans({ fontSize: 15.5, color: C.text, fontWeight: 800 })}>{item}</span>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 32, maxWidth: 520 }}>
            <Link href={START_PATH} className="btn-brand" style={{ width: "100%", justifyContent: "center", padding: "18px 24px", fontSize: 18 }}>
              Start my assessment
              <span style={mono({ fontSize: 13 })}>-&gt;</span>
            </Link>
            <p style={sans({ marginTop: 10, fontSize: 12.5, color: C.mute, textAlign: "center", fontWeight: 700 })}>
              No payment to start. Checkout opens after your answers.
            </p>
            <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
              <span style={{ display: "inline-flex" }}>
                {["J", "M", "D"].map((initial, i) => (
                  <span key={initial} style={{ width: 30, height: 30, borderRadius: 999, background: i === 0 ? C.brand : i === 1 ? C.forest : C.terracotta, color: C.white, display: "inline-flex", alignItems: "center", justifyContent: "center", marginLeft: i === 0 ? 0 : -9, border: `2px solid ${C.paper}`, ...sans({ fontSize: 12, fontWeight: 900 }) }}>
                    {initial}
                  </span>
                ))}
              </span>
              <span style={sans({ fontSize: 13, color: C.text2, fontWeight: 800 })}>
                <span style={{ color: "#D6A038" }}>★★★★★</span> 4.8 · Trusted by thousands of members
              </span>
            </div>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div style={{ aspectRatio: "4/5", borderRadius: 20, overflow: "hidden", background: C.white, border: `1px solid ${C.line}`, position: "relative", boxShadow: "0 24px 70px -34px rgba(14,14,12,0.35)" }}>
            <Image src="/photo/vials-pair.jpg" alt="WomanRx.com GLP-1 vial options" fill priority sizes="(max-width: 900px) 100vw, 40vw" style={{ objectFit: "contain", padding: 24 }} />
            <div style={{ position: "absolute", left: 18, right: 18, bottom: 18, borderRadius: 14, background: "rgba(255,255,255,0.92)", border: `1px solid ${C.line}`, padding: 16 }}>
              <p style={mono({ fontSize: 10.5, color: C.brand, textTransform: "uppercase", fontWeight: 900 })}>Your plan preview</p>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "baseline", marginTop: 8 }}>
                <span style={sans({ fontSize: 15, color: C.text, fontWeight: 900 })}>GLP-1 treatment options</span>
                <span style={sans({ fontSize: 24, color: C.text, fontWeight: 950 })}>from $99/mo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ResponsiveStyles />
    </section>
  );
}

function ProofStrip() {
  return (
    <section style={{ background: C.white, borderBlock: `1px solid ${C.line}`, padding: `18px ${PAGE_X}` }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }} className="proof-strip">
        {["★ 4.8 member rating", "Licensed clinician review", "Secure Stripe checkout", "Free shipping included"].map((item) => (
          <div key={item} style={{ display: "flex", gap: 9, alignItems: "center", justifyContent: "center" }}>
            <Check />
            <span style={sans({ fontSize: 13, color: C.text2, fontWeight: 800 })}>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function OfferPricing() {
  return (
    <section id="pricing" style={{ padding: `clamp(58px, 8vw, 106px) ${PAGE_X}`, background: C.paper }}>
      <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
        <p style={label(C.brand)}>Choose your starting option</p>
        <h2 style={display({ marginTop: 12, fontSize: "clamp(34px, 5vw, 58px)", fontWeight: 900, lineHeight: 1, color: C.text })}>
          Two clinically studied medications. One simple price.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18, marginTop: 34 }} className="offer-cards">
          {offerCards.map((offer) => (
            <article key={offer.name} style={{ textAlign: "left", background: C.white, border: `2px solid ${offer.featured ? C.brand : C.line}`, borderRadius: 14, padding: 20, position: "relative" }}>
              {offer.featured && <span style={{ position: "absolute", top: 14, right: 14, ...mono({ fontSize: 10, color: C.white, background: C.brand, borderRadius: 999, padding: "6px 9px", textTransform: "uppercase", fontWeight: 900 }) }}>Most chosen</span>}
              <div style={{ aspectRatio: "1.5/1", position: "relative", borderRadius: 10, background: C.paper2, overflow: "hidden", marginBottom: 18 }}>
                <Image src={offer.img} alt={`${offer.name} vial`} fill sizes="(max-width: 800px) 100vw, 40vw" style={{ objectFit: "cover" }} />
              </div>
              <p style={mono({ fontSize: 11, color: C.mute, textTransform: "uppercase", fontWeight: 800 })}>{offer.dose}</p>
              <h3 style={sans({ marginTop: 8, fontSize: 26, color: C.text, fontWeight: 900 })}>{offer.name}</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 14 }}>
                <span style={mono({ fontSize: 12, color: C.mute })}>From</span>
                <strong style={sans({ fontSize: 42, color: C.text, fontWeight: 950, lineHeight: 1 })}>{offer.from}</strong>
              </div>
              <p style={sans({ marginTop: 8, fontSize: 13, color: C.text2, fontWeight: 700 })}>{offer.total}</p>
              <Link href={`${START_PATH}&product=${offer.name.toLowerCase()}`} className="btn-brand" style={{ marginTop: 18, width: "100%", justifyContent: "center" }}>
                Start with {offer.name}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section style={{ padding: `clamp(58px, 8vw, 106px) ${PAGE_X}`, background: C.white }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div style={{ maxWidth: 680 }}>
          <p style={label(C.brand)}>How it works</p>
          <h2 style={display({ marginTop: 12, fontSize: "clamp(34px, 5vw, 58px)", fontWeight: 900, lineHeight: 1, color: C.text })}>
            From private assessment to your door.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 32 }} className="steps-grid">
          {steps.map(([num, title, body, img]) => (
            <div key={num} style={{ border: `1px solid ${C.line}`, background: C.paper, borderRadius: 12, overflow: "hidden" }}>
              <div style={{ aspectRatio: "16/9", position: "relative", background: C.paper2 }}>
                <Image src={img} alt={title} fill sizes="(max-width: 900px) 100vw, 33vw" style={{ objectFit: "cover" }} />
              </div>
              <div style={{ padding: 22 }}>
                <p style={mono({ fontSize: 12, color: C.brand, fontWeight: 900 })}>{num}</p>
                <h3 style={sans({ marginTop: 10, fontSize: 22, color: C.text, fontWeight: 900 })}>{title}</h3>
                <p style={sans({ marginTop: 10, fontSize: 14, color: C.text2, lineHeight: 1.55, fontWeight: 600 })}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductProof() {
  return (
    <section style={{ padding: `clamp(58px, 8vw, 106px) ${PAGE_X}`, background: C.paper2 }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto", display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 42, alignItems: "center" }} className="offer-hero">
        <div style={{ aspectRatio: "4/5", position: "relative", borderRadius: 18, overflow: "hidden", background: C.white }}>
          <Image src="/photo/portrait.jpg" alt="WomanRx.com member" fill sizes="(max-width: 900px) 100vw, 40vw" style={{ objectFit: "cover" }} />
        </div>
        <div>
          <p style={label(C.brand)}>Why WomanRx.com</p>
          <h2 style={display({ marginTop: 12, fontSize: "clamp(34px, 5vw, 58px)", fontWeight: 900, lineHeight: 1, color: C.text })}>
            Private assessment. Transparent pricing. Shipped to you.
          </h2>
          <p style={sans({ marginTop: 18, fontSize: 17, lineHeight: 1.55, color: C.text2, fontWeight: 600 })}>
            WomanRx.com pairs licensed clinician review with transparent cash-pay pricing. No insurance paperwork, no membership fees, no pharmacy lines &mdash; your medication ships directly to your door with free shipping on every plan.
          </p>
          <Link href={START_PATH} className="btn-brand" style={{ marginTop: 28, padding: "16px 26px" }}>
            Check my options
            <span style={mono({ fontSize: 13 })}>-&gt;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" style={{ padding: `clamp(58px, 8vw, 106px) ${PAGE_X}`, background: C.white }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <p style={label(C.brand)}>FAQ</p>
        <h2 style={display({ marginTop: 12, fontSize: "clamp(34px, 5vw, 54px)", fontWeight: 900, color: C.text })}>A few quick answers.</h2>
        <div style={{ display: "grid", gap: 12, marginTop: 28 }}>
          {faqs.map((faq) => (
            <div key={faq.q} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: 20, background: C.paper }}>
              <h3 style={sans({ fontSize: 18, color: C.text, fontWeight: 900 })}>{faq.q}</h3>
              <p style={sans({ marginTop: 8, fontSize: 14.5, color: C.text2, lineHeight: 1.55, fontWeight: 600 })}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section style={{ padding: `clamp(58px, 8vw, 106px) ${PAGE_X}`, background: C.ink, color: C.bone, textAlign: "center" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <p style={label(C.bone3)}>Start here</p>
        <h2 style={display({ marginTop: 12, fontSize: "clamp(38px, 6vw, 68px)", fontWeight: 900, lineHeight: 0.96, color: C.bone })}>
          See your WomanRx.com GLP-1 options.
        </h2>
        <Link href={START_PATH} className="btn-paper" style={{ marginTop: 28, padding: "17px 30px", fontSize: 17 }}>
          Start my assessment
          <span style={mono({ fontSize: 13 })}>-&gt;</span>
        </Link>
      </div>
    </section>
  );
}

function StickyCta() {
  return (
    <div className="sticky-offer-cta">
      <span style={sans({ fontSize: 13, color: C.text, fontWeight: 900 })}>Plans from $99/mo</span>
      <Link href={START_PATH} className="btn-brand" style={{ padding: "11px 18px", fontSize: 13 }}>
        Start
      </Link>
    </div>
  );
}

function Testimonials() {
  return (
    <section style={{ padding: `clamp(58px, 8vw, 106px) ${PAGE_X}`, background: C.ink }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
          <p style={label(C.bone3)}>Member results</p>
          <h2 style={display({ marginTop: 12, fontSize: "clamp(34px, 5vw, 58px)", fontWeight: 900, lineHeight: 1, color: C.bone })}>
            Real members. Real momentum.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 34 }} className="steps-grid">
          {TESTIMONIALS.map((item) => (
            <figure key={item.name} style={{ border: `1px solid ${C.line}`, background: C.white, borderRadius: 14, padding: 24, display: "flex", flexDirection: "column", gap: 14, margin: 0 }}>
              <span style={{ color: "#D6A038", fontSize: 15, letterSpacing: 2 }}>★★★★★</span>
              <blockquote style={sans({ fontSize: 16.5, color: C.text, lineHeight: 1.5, fontWeight: 700, margin: 0 })}>
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption style={{ marginTop: "auto", display: "grid", gridTemplateColumns: "48px 1fr", gap: 12, alignItems: "center" }}>
                <span style={{ width: 48, height: 48, borderRadius: 999, overflow: "hidden", position: "relative", display: "block" }}>
                  <Image src={item.img} alt={item.name} fill sizes="48px" style={{ objectFit: "cover" }} />
                </span>
                <span>
                  <span style={sans({ display: "block", fontSize: 14, color: C.text, fontWeight: 900 })}>{item.name}</span>
                  <span style={sans({ display: "block", marginTop: 2, fontSize: 12.5, color: C.mute, fontWeight: 700 })}>{item.meta}</span>
                  <span style={{ display: "inline-block", marginTop: 8, borderRadius: 999, background: C.brandSoft, color: C.brand, padding: "5px 10px", ...sans({ fontSize: 12, fontWeight: 900 }) }}>
                    {item.result}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div style={{ marginTop: 26, background: C.brand, borderRadius: 14, padding: "24px 26px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, alignItems: "center" }} className="proof-strip">
          {STAT_BAND.map(([big, small]) => (
            <div key={small} style={{ textAlign: "center" }}>
              <div style={sans({ fontSize: 28, color: C.white, fontWeight: 950 })}>{big}</div>
              <div style={mono({ marginTop: 4, fontSize: 10.5, color: "rgba(253,250,242,0.72)", textTransform: "uppercase", fontWeight: 800 })}>{small}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 26, display: "flex", justifyContent: "center", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
          <a
            href="https://www.legitscript.com/websites/?checker_keywords=womanrx.com"
            target="_blank"
            rel="noopener"
            title="Verify LegitScript Approval for www.womanrx.com"
            style={{ display: "inline-flex", alignItems: "center", gap: 12, textDecoration: "none" }}
          >
            <img src="https://static.legitscript.com/seals/50087439.png" alt="Verify Approval for www.womanrx.com" width={46} height={50} />
            <span style={mono({ fontSize: 10.5, color: C.bone3, lineHeight: 1.6, letterSpacing: "0.06em" })}>LEGITSCRIPT<br />CERT 50087439</span>
          </a>
          <span style={mono({ fontSize: 10.5, color: C.bone3, textTransform: "uppercase", letterSpacing: "0.06em" })}>Physician-supervised · 503A pharmacy · Secure Stripe checkout</span>
        </div>
      </div>
    </section>
  );
}

function Pill({ text }: { text: string }) {
  return (
    <span style={{ display: "inline-flex", borderRadius: 999, background: C.white, border: `1px solid ${C.line}`, padding: "8px 12px", ...sans({ fontSize: 12.5, color: C.text2, fontWeight: 800 }) }}>
      {text}
    </span>
  );
}

function Check() {
  return (
    <span style={{ width: 22, height: 22, borderRadius: 999, background: C.brandSoft, color: C.brand, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900 }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

function ResponsiveStyles() {
  return (
    <style>{`
      @media (max-width: 900px) {
        .offer-hero,
        .offer-cards,
        .steps-grid,
        .proof-strip {
          grid-template-columns: 1fr !important;
        }
        .hide-small {
          display: none !important;
        }
      }
      .sticky-offer-cta {
        position: fixed;
        left: 14px;
        right: 14px;
        bottom: 14px;
        z-index: 60;
        display: none;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        border: 1px solid ${C.line};
        background: rgba(255,255,255,.96);
        border-radius: 999px;
        padding: 10px 10px 10px 16px;
        box-shadow: 0 18px 50px -22px rgba(14,14,12,.35);
      }
      @media (max-width: 720px) {
        .sticky-offer-cta {
          display: flex;
        }
        main {
          padding-bottom: 74px;
        }
      }
    `}</style>
  );
}
