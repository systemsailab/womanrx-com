"use client";

/**
 * WomenRX.com — "Warm editorial-luxe" home.
 *
 * A home for women's longevity medicine: GLP-1, peptides, hormones & HRT, and
 * skin & longevity, across every season of a woman's life. Clinical trust spine
 * (licensed 503A pharmacy, board-certified clinicians, LegitScript) wrapped in
 * an editorial brand. No fabricated member counts or outcomes — honest trust
 * signals only. The arch is the ownable motif.
 */

import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBottomCTA } from "@/components/StickyBottomCTA";
import { ProductCatalogCard, type CatalogProduct } from "@/components/ProductCatalogCard";
import { C, display, serif, sans, mono, label, chip, PAGE_X, MAX_W } from "@/lib/design";
import { HomeFAQ } from "./_home/HomeFAQ";

export default function WomanRxHome() {
  return (
    <>
      <SiteNav tone="ink" />
      <Hero />
      <TickerStrip />
      <CategoryLanes />
      <BrandPromise />
      <FeaturedCatalog />
      <HowItWorks />
      <Pharmacy />
      <Stories />
      <Journal />
      <Contraindications />
      <HomeFAQ />
      <TrustStrip />
      <ClosingCTA />
      <SiteFooter />
      <StickyBottomCTA />
    </>
  );
}

/* ══════════════════ 01 — HERO ══════════════════ */
function Hero() {
  return (
    <section style={{ background: C.paper, padding: `clamp(40px, 5vw, 72px) ${PAGE_X} clamp(56px, 7vw, 92px)` }}>
      <div
        style={{
          maxWidth: MAX_W,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.18fr 0.82fr",
          gap: "clamp(32px, 5vw, 76px)",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* LEFT — copy */}
        <div>
          <div style={{ ...label(C.brandDeep), marginBottom: 22 }}>For every season of you</div>

          <h1
            style={display({
              fontSize: "clamp(46px, 6.6vw, 92px)",
              fontWeight: 440,
              lineHeight: 0.97,
              letterSpacing: "-0.02em",
              color: C.text,
            })}
          >
            You&rsquo;re not aging.
            <br />
            You&rsquo;re{" "}
            <span style={serif({ fontStyle: "italic", color: C.brand, fontWeight: 450 })}>becoming.</span>
          </h1>

          <p
            style={sans({
              fontSize: "clamp(17px, 1.5vw, 20px)",
              lineHeight: 1.6,
              color: C.text2,
              marginTop: 26,
              maxWidth: 520,
            })}
          >
            Physician-guided GLP-1, peptide, and hormone care, built around a
            woman&rsquo;s body and the years ahead. One trusted home for getting
            older and feeling younger.
          </p>

          <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/weight-loss-intake" className="btn-brand" style={{ padding: "16px 30px", fontSize: 15 }}>
              Take the 3-minute quiz
              <span style={mono({ fontSize: 13 })}>→</span>
            </Link>
            <Link href="#treatments" className="btn-ghost" style={{ padding: "15px 26px", fontSize: 15 }}>
              Explore treatments
            </Link>
          </div>

          {/* Honest trust row — no fabricated counts */}
          <div style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <span className="stars" style={{ fontSize: 15, color: C.gold }}>★★★★★</span>
            <span style={sans({ fontSize: 13.5, color: C.text2 })}>
              Loved by women rewriting what getting older feels like
            </span>
            <a
              href="https://www.legitscript.com/websites/?checker_keywords=womanrx.com"
              target="_blank"
              rel="noopener"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "6px 12px",
                background: C.brandTint,
                border: `1px solid ${C.brandLight}`,
                borderRadius: 999,
                textDecoration: "none",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.brand} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
              <span style={sans({ fontSize: 12, color: C.brandDeep, fontWeight: 600 })}>LegitScript certified</span>
            </a>
          </div>
        </div>

        {/* RIGHT — the arch */}
        <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
          <ArchHero />
          <div
            style={{
              position: "absolute",
              bottom: 22,
              left: "50%",
              transform: "translateX(-50%)",
              background: C.white,
              padding: "10px 16px",
              borderRadius: 999,
              boxShadow: "0 14px 36px -16px rgba(42,35,32,0.22)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 999, background: C.sage, display: "inline-block" }} />
            <span style={sans({ fontSize: 12.5, fontWeight: 600, color: C.text })}>
              Physician-guided · Ships in 24&ndash;48h
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ArchHero() {
  return (
    <svg width="100%" viewBox="0 0 360 470" style={{ maxWidth: 400 }} role="img" aria-label="An arched window framing a champagne dawn with botanical line work — the WomenRx motif.">
      <defs>
        <linearGradient id="wrx-dawn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E6C2B2" />
          <stop offset="0.42" stopColor="#EBD3BC" />
          <stop offset="1" stopColor="#F4E7D3" />
        </linearGradient>
        <clipPath id="wrx-arch">
          <path d="M28,452 L28,178 A152,152 0 0 1 332,178 L332,452 Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#wrx-arch)">
        <rect x="28" y="26" width="304" height="426" fill="url(#wrx-dawn)" />
        <circle cx="180" cy="206" r="64" fill="#E7BE7E" />
        <circle cx="180" cy="206" r="92" fill="none" stroke="#C2A268" strokeWidth="1" opacity="0.55" />
        <circle cx="180" cy="206" r="118" fill="none" stroke="#C2A268" strokeWidth="1" opacity="0.35" />
        <path d="M28,452 C110,392 250,392 332,452" fill="#B0685A" opacity="0.92" />
        <path d="M150,452 C150,392 120,360 96,348 M150,408 C128,402 116,386 112,372 M150,420 C172,410 184,392 188,378" fill="none" stroke="#566049" strokeWidth="2" strokeLinecap="round" />
        <path d="M214,452 C214,398 238,368 262,356 M214,414 C236,406 248,390 252,376" fill="none" stroke="#566049" strokeWidth="2" strokeLinecap="round" />
      </g>
      <path d="M28,452 L28,178 A152,152 0 0 1 332,178 L332,452" fill="none" stroke="#B79155" strokeWidth="2" />
    </svg>
  );
}

/* ══════════════════ 02 — TICKER STRIP ══════════════════ */
function TickerStrip() {
  const items = [
    "Dispensed by licensed U.S. pharmacies",
    "Board-certified clinicians",
    "HIPAA-private",
    "No insurance needed",
    "Free, discreet shipping",
    "Cancel anytime",
  ];
  return (
    <section
      style={{
        background: C.brandTint,
        borderTop: `1px solid ${C.line}`,
        borderBottom: `1px solid ${C.line}`,
        padding: `18px ${PAGE_X}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: MAX_W,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: 40,
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {items.map((it) => (
          <span
            key={it}
            style={{ display: "inline-flex", alignItems: "center", gap: 9, ...sans({ fontSize: 13, color: C.brandDeep, fontWeight: 600 }) }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.brand} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            {it}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════ 03 — CATEGORY LANES ══════════════════ */
function LaneIcon({ name, color }: { name: string; color: string }) {
  const common = { width: 30, height: 30, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "droplet") return (<svg {...common}><path d="M12 3s6.5 7 6.5 11a6.5 6.5 0 0 1-13 0C5.5 10 12 3 12 3z" /></svg>);
  if (name === "atom") return (<svg {...common}><circle cx="12" cy="12" r="2" /><ellipse cx="12" cy="12" rx="10" ry="4.2" /><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" /></svg>);
  if (name === "bloom") return (<svg {...common}><path d="M12 11C9.5 8.6 9.5 4.8 12 3.2C14.5 4.8 14.5 8.6 12 11Z" /><path d="M12 11C9.5 8.6 9.5 4.8 12 3.2C14.5 4.8 14.5 8.6 12 11Z" transform="rotate(90 12 12)" /><path d="M12 11C9.5 8.6 9.5 4.8 12 3.2C14.5 4.8 14.5 8.6 12 11Z" transform="rotate(180 12 12)" /><path d="M12 11C9.5 8.6 9.5 4.8 12 3.2C14.5 4.8 14.5 8.6 12 11Z" transform="rotate(270 12 12)" /><circle cx="12" cy="12" r="1.6" /></svg>);
  return (<svg {...common}><path d="M12 2l1.8 7.2L21 11l-7.2 1.8L12 20l-1.8-7.2L3 11l7.2-1.8z" /></svg>);
}

function CategoryLanes() {
  const lanes = [
    { href: "/glp-1", icon: "droplet", tint: "#EBD3C9", ink: C.brandDeep, title: "Weight & GLP-1", body: "Semaglutide and tirzepatide, dosed for a woman's body." },
    { href: "/peptides", icon: "atom", tint: "#E5E0CF", ink: C.sageDeep, title: "Peptide therapy", body: "Energy, recovery, and cellular repair." },
    { href: "/hrt", icon: "bloom", tint: "#EFE0C8", ink: C.goldDeep, title: "Hormones & HRT", body: "Perimenopause and menopause, met with science." },
    { href: "/blog", icon: "spark", tint: "#E9D8CE", ink: C.brandDeep, title: "Skin & longevity", body: "Look as ageless as you intend to feel." },
  ];
  return (
    <section id="treatments" style={{ background: C.paper, padding: `clamp(64px, 8vw, 112px) ${PAGE_X} clamp(40px, 5vw, 64px)` }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={label(C.sageDeep)}>Care across every chapter</div>
          <h2
            style={display({
              fontSize: "clamp(34px, 4.6vw, 58px)",
              fontWeight: 450,
              lineHeight: 1.02,
              letterSpacing: "-0.018em",
              color: C.text,
              marginTop: 14,
            })}
          >
            Medicine, made for{" "}
            <span style={serif({ fontStyle: "italic", color: C.brand })}>her.</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }} className="lanes-grid">
          {lanes.map((l) => (
            <Link key={l.href} href={l.href} className="arch-card" style={{ display: "block", textDecoration: "none" }}>
              <div className="arch-top" style={{ height: 118, background: l.tint, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LaneIcon name={l.icon} color={l.ink} />
              </div>
              <div style={{ padding: "18px 20px 22px" }}>
                <h3 style={display({ fontSize: 21, fontWeight: 500, color: C.text, lineHeight: 1.15 })}>{l.title}</h3>
                <p style={sans({ fontSize: 13.5, color: C.text2, marginTop: 7, lineHeight: 1.55 })}>{l.body}</p>
                <div style={{ marginTop: 14, ...label(l.ink) }}>Explore →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) { .lanes-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 540px) { .lanes-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ══════════════════ 04 — BRAND PROMISE ══════════════════ */
function BrandPromise() {
  return (
    <section style={{ background: C.ink, color: C.bone, padding: `clamp(64px, 8vw, 120px) ${PAGE_X}`, textAlign: "center" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={label(C.gold)}>The WomenRx promise</div>
        <p
          style={serif({
            fontSize: "clamp(26px, 3.4vw, 42px)",
            lineHeight: 1.3,
            color: C.bone,
            marginTop: 18,
            fontStyle: "italic",
            fontWeight: 400,
          })}
        >
          &ldquo;Ageless isn&rsquo;t younger. It&rsquo;s a woman who feels fully
          herself in every decade, and has the science to back her.&rdquo;
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginTop: 32 }}>
          {["Evidence first", "Women only", "A real community", "Care that lasts"].map((t) => (
            <span
              key={t}
              style={{
                border: `1px solid ${C.inkLineStrong}`,
                borderRadius: 999,
                padding: "9px 18px",
                ...sans({ fontSize: 13, color: C.bone2, fontWeight: 500 }),
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ 05 — FEATURED CATALOG ══════════════════ */
const PRODUCTS: CatalogProduct[] = [
  {
    href: "/tirzepatide",
    name: "Compounded Tirzepatide",
    subtitle: "Once-weekly injection · Dual-incretin",
    photo: "/photo/vial-tirz-v2.jpg",
    chips: [
      { label: "Rx", tone: "rx" },
      { label: "Most chosen", tone: "advanced" },
    ],
    fromPrice: "$149",
    fromPeriod: "/mo",
    shortDesc: "Dual-incretin therapy. Average 21% body-weight loss at 72 weeks in the pivotal phase-3 trial. Compounded at a licensed 503A pharmacy.",
    highlight: "Most chosen",
  },
  {
    href: "/semaglutide",
    name: "Compounded Semaglutide",
    subtitle: "Once-weekly injection · GLP-1",
    photo: "/photo/vial-sema-v2.jpg",
    chips: [
      { label: "Rx", tone: "rx" },
      { label: "Most affordable", tone: "fda" },
    ],
    fromPrice: "$99",
    fromPeriod: "/mo",
    shortDesc: "The most-studied GLP-1 compound. Average 15% body-weight loss at 68 weeks in the STEP-1 trial. Compounded at a licensed 503A pharmacy.",
  },
];

function FeaturedCatalog() {
  return (
    <section id="shop" style={{ background: C.paper2, padding: `clamp(64px, 8vw, 112px) ${PAGE_X}` }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={label(C.brand)}>Where most women begin</div>
          <h2
            style={display({
              fontSize: "clamp(32px, 4.4vw, 54px)",
              fontWeight: 450,
              lineHeight: 1.04,
              letterSpacing: "-0.018em",
              color: C.text,
              marginTop: 14,
            })}
          >
            Two compounds.{" "}
            <span style={serif({ fontStyle: "italic", color: C.brand })}>One honest price.</span>
          </h2>
          <p style={sans({ fontSize: 16.5, color: C.text2, marginTop: 14, maxWidth: 660, margin: "14px auto 0", lineHeight: 1.6 })}>
            Prescribed by an independent U.S. board-certified clinician and filled
            by a licensed Section 503A compounding pharmacy. Cancel anytime.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, maxWidth: 980, margin: "0 auto" }} className="catalog-grid">
          {PRODUCTS.map((p) => (
            <ProductCatalogCard key={p.href} p={p} />
          ))}
        </div>

        <p style={sans({ fontSize: 11.5, color: C.mute, marginTop: 26, maxWidth: 980, margin: "26px auto 0", lineHeight: 1.6, textAlign: "center" })}>
          Compounded medications are not reviewed or approved by the FDA but are
          prepared by licensed compounding pharmacies in compliance with Section
          503A of the Federal Food, Drug, and Cosmetic Act. Prescription required
          from a licensed provider. Wegovy&reg; and Ozempic&reg; are registered
          trademarks of Novo Nordisk&reg;. Mounjaro&reg; and Zepbound&reg; are
          registered trademarks of Eli Lilly and Company&reg;. WomenRx is not
          affiliated with these companies.
        </p>
      </div>
      <style>{`@media (max-width: 760px) { .catalog-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ══════════════════ 06 — HOW IT WORKS ══════════════════ */
function HowItWorks() {
  const steps = [
    { n: "1", title: "Tell us about you", body: "Answer a short, confidential health assessment built around a woman's body. We screen for eligibility before a clinician is involved.", cta: "About 3 minutes" },
    { n: "2", title: "A clinician reviews", body: "An independent U.S. board-certified clinician reviews your file, usually within 24 hours, and prescribes only if it's right for you.", cta: "Response in 24 hours" },
    { n: "3", title: "Care arrives, discreetly", body: "A licensed 503A pharmacy prepares your prescription and ships it free, in plain packaging. Your care team stays with you after.", cta: "Free, discreet shipping" },
  ];
  return (
    <section id="how" style={{ background: C.paper, padding: `clamp(64px, 8vw, 112px) ${PAGE_X}` }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}>
          <div style={label(C.brand)}>How it works</div>
          <h2 style={display({ fontSize: "clamp(32px, 4.4vw, 54px)", fontWeight: 450, lineHeight: 1.04, letterSpacing: "-0.018em", color: C.text, marginTop: 14 })}>
            Care in{" "}
            <span style={serif({ fontStyle: "italic", color: C.brand })}>three steps.</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="steps-grid">
          {steps.map((s) => (
            <div key={s.n} style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column" }}>
              <div style={{ width: 44, height: 44, borderRadius: 999, background: C.brand, color: C.bone, display: "inline-flex", alignItems: "center", justifyContent: "center", ...serif({ fontSize: 20, fontStyle: "normal", fontWeight: 500 }) }}>
                {s.n}
              </div>
              <h3 style={display({ fontSize: 22, fontWeight: 500, color: C.text, marginTop: 22, lineHeight: 1.2 })}>{s.title}</h3>
              <p style={sans({ fontSize: 14.5, color: C.text2, lineHeight: 1.65, marginTop: 10, flex: 1 })}>{s.body}</p>
              <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1px solid ${C.line}`, ...label(C.brand) }}>{s.cta}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, display: "flex", justifyContent: "center" }}>
          <Link href="/weight-loss-intake" className="btn-brand" style={{ padding: "15px 30px", fontSize: 15 }}>
            Take the quiz <span style={mono({ fontSize: 13 })}>→</span>
          </Link>
        </div>
      </div>
      <style>{`@media (max-width: 880px) { .steps-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ══════════════════ 07 — PHARMACY ══════════════════ */
function Pharmacy() {
  return (
    <section style={{ position: "relative" }}>
      <div className="pharmacy-hero-media" style={{ position: "relative", aspectRatio: "16/9", minHeight: 460, maxHeight: 700, overflow: "hidden" }}>
        <Image src="/photo/pharmacy.jpg" alt="Sterile 503A compounding suite" fill sizes="100vw" style={{ objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(110deg, rgba(37,30,26,0.78) 0%, rgba(37,30,26,0.40) 52%, rgba(37,30,26,0.08) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: `0 ${PAGE_X}`, width: "100%" }}>
            <div style={{ maxWidth: 560, color: C.bone }}>
              <div style={label("rgba(247,240,229,0.72)")}>The pharmacy</div>
              <h2 style={display({ fontSize: "clamp(30px, 4.4vw, 56px)", fontWeight: 440, lineHeight: 1.04, letterSpacing: "-0.018em", color: C.bone, marginTop: 16 })}>
                Compounded by a real{" "}
                <span style={serif({ fontStyle: "italic", color: C.brandLight })}>503A pharmacy.</span>
              </h2>
              <p style={sans({ fontSize: 17, lineHeight: 1.6, color: "rgba(247,240,229,0.86)", marginTop: 20, maxWidth: 480 })}>
                A licensed 503A pharmacy compounds every WomenRx prescription under
                Section 503A and USP-797 sterile standards. Lot-tracked from bench
                to your door.
              </p>
              <dl style={{ marginTop: 28, display: "grid", gridTemplateColumns: "auto 1fr", gap: "10px 28px", alignItems: "baseline" }}>
                <dt style={label("rgba(247,240,229,0.55)")}>Compliance</dt>
                <dd style={sans({ fontSize: 14, color: C.bone })}>Section 503A · USP-797</dd>
                <dt style={label("rgba(247,240,229,0.55)")}>LegitScript</dt>
                <dd style={sans({ fontSize: 14, color: C.bone })}>Cert. 50087439</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .pharmacy-hero-media { aspect-ratio: auto !important; min-height: 560px !important; } }
        @media (max-width: 520px) { .pharmacy-hero-media { min-height: 620px !important; } }
      `}</style>
    </section>
  );
}

/* ══════════════════ 08 — STORIES ══════════════════ */
function Stories() {
  const stories = [
    { name: "On perimenopause", body: "Someone finally connected the dots between my sleep, my mood, and my hormones, instead of telling me it was just stress." },
    { name: "On feeling seen", body: "The intake was built for a woman's body. For the first time the questions actually matched what I was living through." },
    { name: "On the long game", body: "It isn't a crash plan. It's care that adjusts as I change, with a clinician who answers and a community that gets it." },
  ];
  return (
    <section id="reviews" style={{ background: C.paper, padding: `clamp(64px, 8vw, 112px) ${PAGE_X}` }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div style={{ marginBottom: 44, maxWidth: 720 }}>
          <div style={label(C.brand)}>In her words</div>
          <h2 style={display({ fontSize: "clamp(32px, 4.4vw, 54px)", fontWeight: 450, lineHeight: 1.04, letterSpacing: "-0.018em", color: C.text, marginTop: 14 })}>
            A home, not a{" "}
            <span style={serif({ fontStyle: "italic", color: C.brand })}>transaction.</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="stories-grid">
          {stories.map((r) => (
            <div key={r.name} style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 16, padding: "26px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
              <span className="stars" style={{ fontSize: 14, color: C.gold }}>★★★★★</span>
              <p style={serif({ fontStyle: "italic", fontSize: 18, color: C.text, lineHeight: 1.55, fontWeight: 400 })}>&ldquo;{r.body}&rdquo;</p>
              <div style={{ marginTop: "auto", paddingTop: 12, borderTop: `1px solid ${C.line}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={sans({ fontSize: 13, fontWeight: 600, color: C.text })}>{r.name}</span>
                <span style={chip(C.brandDeep, C.brandSoft)}>Member voice</span>
              </div>
            </div>
          ))}
        </div>

        <p style={sans({ fontSize: 11.5, color: C.mute, marginTop: 20, lineHeight: 1.6, maxWidth: 980 })}>
          Reflections shown above are illustrative of the WomenRx care experience
          and are not testimonials of specific medical outcomes. Individual results
          vary. Compounded medications are not FDA-approved.
        </p>
      </div>
      <style>{`
        @media (max-width: 1024px) { .stories-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .stories-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ══════════════════ 09 — JOURNAL ══════════════════ */
function Journal() {
  const posts = [
    { href: "/hrt", tag: "Hormones", color: C.brand, title: "What every woman should know before perimenopause", read: "7 min read" },
    { href: "/glp-1", tag: "GLP-1", color: C.sageDeep, title: "Why women lose weight differently, and what to do about it", read: "6 min read" },
    { href: "/peptides", tag: "Longevity", color: C.goldDeep, title: "The peptide guide for energy, recovery, and ageless skin", read: "9 min read" },
  ];
  return (
    <section style={{ background: C.paper2, padding: `clamp(64px, 8vw, 112px) ${PAGE_X}` }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
          <div style={{ maxWidth: 640 }}>
            <div style={label(C.sageDeep)}>The Journal</div>
            <h2 style={display({ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 450, lineHeight: 1.05, letterSpacing: "-0.018em", color: C.text, marginTop: 12 })}>
              The most trusted word on{" "}
              <span style={serif({ fontStyle: "italic", color: C.brand })}>women&rsquo;s longevity.</span>
            </h2>
          </div>
          <Link href="/blog" style={{ ...label(C.brand), textDecoration: "none" }}>All articles →</Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }} className="journal-grid">
          {posts.map((p) => (
            <Link key={p.title} href={p.href} style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 16, padding: "24px 22px 26px", textDecoration: "none", display: "block" }}>
              <div style={{ borderTop: `2px solid ${p.color}`, paddingTop: 14 }}>
                <div style={label(p.color)}>{p.tag}</div>
                <h3 style={display({ fontSize: 21, fontWeight: 500, color: C.text, marginTop: 8, lineHeight: 1.22 })}>{p.title}</h3>
                <div style={{ marginTop: 14, ...sans({ fontSize: 12.5, color: C.mute }) }}>{p.read}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .journal-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ══════════════════ 10 — CONTRAINDICATIONS ══════════════════ */
function Contraindications() {
  const items = [
    "Personal or family history of medullary thyroid carcinoma",
    "Multiple Endocrine Neoplasia syndrome type 2 (MEN-2)",
    "History of severe pancreatitis",
    "Currently pregnant, planning to become pregnant, or breastfeeding",
    "Severe gastrointestinal disease (gastroparesis, severe IBD)",
    "Under 18 years of age",
  ];
  return (
    <section id="safety" style={{ background: C.paper, padding: `clamp(64px, 8vw, 112px) ${PAGE_X}` }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "clamp(32px, 5vw, 72px)" }} className="contra-grid">
          <div>
            <div style={label(C.danger)}>Important safety</div>
            <h2 style={display({ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 450, lineHeight: 1.06, letterSpacing: "-0.016em", color: C.text, marginTop: 14 })}>
              When this is{" "}
              <span style={serif({ fontStyle: "italic", color: C.danger })}>not for you.</span>
            </h2>
            <p style={sans({ fontSize: 15.5, color: C.text2, marginTop: 16, maxWidth: 440, lineHeight: 1.6 })}>
              GLP-1 medications have real contraindications per the FDA label. We
              publish them here, before the consultation, because honesty is part
              of the care.
            </p>
          </div>
          <ul style={{ listStyle: "none", borderTop: `1px solid ${C.line}` }}>
            {items.map((it, i) => (
              <li key={it} style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: 20, padding: "20px 0", borderBottom: `1px solid ${C.line}`, alignItems: "baseline" }}>
                <span style={mono({ fontSize: 12, color: C.danger, fontWeight: 600, letterSpacing: "0.08em" })}>{String(i + 1).padStart(2, "0")}</span>
                <span style={sans({ fontSize: 15.5, color: C.text, lineHeight: 1.5 })}>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style>{`@media (max-width: 960px) { .contra-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ══════════════════ 11 — TRUST STRIP ══════════════════ */
function TrustStrip() {
  return (
    <section className="trust-strip" style={{ padding: `36px ${PAGE_X}` }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 24, alignItems: "center" }} className="trust-grid">
        <a
          href="https://www.legitscript.com/websites/?checker_keywords=womanrx.com"
          target="_blank"
          rel="noopener"
          title="Verify LegitScript Approval for www.womanrx.com"
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textDecoration: "none" }}
        >
          <img src="https://static.legitscript.com/seals/50087439.png" alt="LegitScript Approved" width={50} height={54} />
          <span style={mono({ fontSize: 10, color: C.mute, letterSpacing: "0.14em", textTransform: "uppercase" })}>Cert 50087439</span>
        </a>
        {[
          { label: "HIPAA", note: "Private" },
          { label: "HSA · FSA", note: "Eligible" },
          { label: "Women", note: "Only" },
          { label: "Free", note: "Discreet shipping" },
          { label: "503A", note: "Compounded" },
        ].map((b) => (
          <div key={b.label} style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center", textAlign: "center" }}>
            <div style={display({ fontSize: 17, fontWeight: 500, color: C.text })}>{b.label}</div>
            <div style={mono({ fontSize: 10.5, color: C.mute, letterSpacing: "0.14em", textTransform: "uppercase" })}>{b.note}</div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 880px) { .trust-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 480px) { .trust-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  );
}

/* ══════════════════ 12 — CLOSING CTA ══════════════════ */
function ClosingCTA() {
  return (
    <section style={{ background: C.ink, color: C.bone, padding: `clamp(72px, 10vw, 144px) ${PAGE_X}`, textAlign: "center" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <div style={label("rgba(247,240,229,0.55)")}>Begin</div>
        <h2 style={display({ fontSize: "clamp(40px, 6vw, 84px)", fontWeight: 440, lineHeight: 0.99, letterSpacing: "-0.02em", color: C.bone, marginTop: 16 })}>
          Meet the woman{" "}
          <span style={serif({ fontStyle: "italic", color: C.brandLight })}>you&rsquo;re becoming.</span>
        </h2>
        <p style={sans({ fontSize: 17, color: "rgba(247,240,229,0.8)", marginTop: 22, maxWidth: 600, margin: "22px auto 0", lineHeight: 1.6 })}>
          The assessment is free. There&rsquo;s no charge until a licensed
          clinician reviews your file and writes a prescription.
        </p>
        <div style={{ marginTop: 36, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/weight-loss-intake" className="btn-brand" style={{ padding: "16px 32px", fontSize: 15 }}>
            Take the 3-minute quiz
            <span style={mono({ fontSize: 13 })}>→</span>
          </Link>
          <Link href="#treatments" className="btn-outline-bone" style={{ padding: "15px 30px", fontSize: 15 }}>
            Explore treatments
          </Link>
        </div>
      </div>
    </section>
  );
}
