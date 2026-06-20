"use client";

/**
 * WomanRx.com — v6 Production launch.
 *
 * Catalog: TWO compounded products only (Semaglutide + Tirzepatide vials).
 * No oral. No pens. Real 503A compounded vials, labeled.
 *
 * Copy adapted from CoreAgeRx and TrimRx, the closest direct comparables to
 * what WomanRx.com actually sells. LegitScript cert 50087439 is visible in the
 * hero, the trust strip, and the footer.
 */

import { PEPTIDES_LIVE } from "@/lib/shop/config";
import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBottomCTA } from "@/components/StickyBottomCTA";
import { CostCalculator } from "@/components/CostCalculator";
import { ProductCatalogCard, type CatalogProduct } from "@/components/ProductCatalogCard";
import { C, display, sans, mono, label, chip, PAGE_X, MAX_W } from "@/lib/design";
import { HomeFAQ } from "./_home/HomeFAQ";

export default function WomanRxHome() {
  return (
    <>
      <SiteNav tone="ink" />
      <Hero />
      <TickerStrip />
      <Catalog />
      <CompoundedSection />
      <HowItWorks />
      <Pharmacy />
      <Reviews />
      <Maintenance />
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
    <section
      style={{
        background: C.paper,
        padding: `clamp(48px, 6vw, 80px) ${PAGE_X} clamp(64px, 8vw, 96px)`,
      }}
    >
      <div
        style={{
          maxWidth: MAX_W,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: "clamp(32px, 5vw, 80px)",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* LEFT — copy stack */}
        <div>
          {/* Social proof + LegitScript pill */}
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "7px 12px",
                background: C.white,
                border: `1px solid ${C.line}`,
                borderRadius: 999,
              }}
            >
              <span className="stars" style={{ fontSize: 13 }}>★★★★★</span>
              <span style={sans({ fontSize: 12.5, color: C.text2, fontWeight: 500 })}>
                4.8 · 12,000+ members
              </span>
            </div>
            <a
              href="https://www.legitscript.com/websites/?checker_keywords=womanrx.com"
              target="_blank"
              rel="noopener"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 12px",
                background: C.brandTint,
                border: `1px solid ${C.brandLight}`,
                borderRadius: 999,
                textDecoration: "none",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.brand} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
              <span style={sans({ fontSize: 12.5, color: C.brandDeep, fontWeight: 600 })}>
                LegitScript · Cert. 50087439
              </span>
            </a>
          </div>

          <h1
            style={display({
              fontSize: "clamp(42px, 6vw, 84px)",
              fontWeight: 700,
              lineHeight: 0.98,
              letterSpacing: "-0.034em",
              color: C.text,
            })}
          >
            Your health,{" "}
            <span style={{ color: C.brand }}>on your time.</span>
          </h1>

          <p
            style={sans({
              fontSize: "clamp(17px, 1.4vw, 19px)",
              lineHeight: 1.5,
              color: C.text2,
              marginTop: 22,
              maxWidth: 560,
              fontWeight: 500,
            })}
          >
            100% online and confidential. Compounded GLP-1 prescription
            medication delivered to your door.
          </p>

          {/* CTA row */}
          <div
            style={{
              marginTop: 28,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Link
              href="/weight-loss-intake"
              className="btn-brand"
              style={{ padding: "16px 30px", fontSize: 15 }}
            >
              Start my visit
              <span style={mono({ fontSize: 13 })}>→</span>
            </Link>
            <Link href={PEPTIDES_LIVE ? "/shop" : "/glp1-offer-v1"} className="btn-ghost" style={{ padding: "15px 26px", fontSize: 15 }}>
              See compounds
            </Link>
          </div>

          {/* 3 trust bullets — CoreAgeRx pattern */}
          <ul
            style={{
              marginTop: 36,
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 14,
              maxWidth: 560,
              listStyle: "none",
            }}
          >
            <TrustBullet text="Evaluations by US Board-certified physicians" />
            <TrustBullet text="No insurance, no waitlist, fast free delivery" />
            <TrustBullet text="Upfront pricing, no hidden fees" />
          </ul>
        </div>

        {/* RIGHT — hero photograph */}
        <div style={{ position: "relative" }}>
          <div
            className="photo-frame"
            style={{
              aspectRatio: "4/5",
              borderRadius: 16,
              overflow: "hidden",
              position: "relative",
              background: C.white,
              maxWidth: 460,
              marginLeft: "auto",
            }}
          >
            <Image
              src="/photo/vials-pair.jpg"
              alt="Compounded semaglutide and tirzepatide vials"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 36vw"
              style={{ objectFit: "contain", padding: 24 }}
            />
            {/* Floating annotation chip */}
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 24,
                background: C.white,
                padding: "10px 14px",
                borderRadius: 999,
                boxShadow: "0 8px 24px -8px rgba(14,14,12,0.16)",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: C.brand,
                  display: "inline-block",
                }}
              />
              <span style={sans({ fontSize: 12.5, fontWeight: 600, color: C.text })}>
                Compounded 503A · Ships in 24–48h
              </span>
            </div>
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

function TrustBullet({ text }: { text: string }) {
  return (
    <li
      style={{
        display: "grid",
        gridTemplateColumns: "24px 1fr",
        gap: 12,
        alignItems: "center",
      }}
    >
      <span
        style={{
          width: 24,
          height: 24,
          borderRadius: 999,
          background: C.brand,
          color: C.bone,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </span>
      <span style={sans({ fontSize: 15, color: C.text, lineHeight: 1.5, fontWeight: 500 })}>
        {text}
      </span>
    </li>
  );
}

/* ══════════════════ 02 — TICKER STRIP ══════════════════ */
function TickerStrip() {
  const items = [
    "Fast, free shipping",
    "Confidential online consultation",
    "Board-certified physicians, trusted medications",
    "LegitScript Certified · Cert. 50087439",
    "HIPAA Compliant",
    "Upfront pricing, no hidden fees",
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
          gap: 48,
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {items.map((it) => (
          <span
            key={it}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              ...sans({ fontSize: 13.5, color: C.brandDeep, fontWeight: 600 }),
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.brand} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            {it}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════ 03 — CATALOG ══════════════════ */
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
    shortDesc: "Dual-incretin therapy. Average 21% body-weight loss at 72 weeks in pivotal phase-3 trial. Compounded at a licensed 503A pharmacy.",
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
    shortDesc: "The most-studied GLP-1 compound. Average 15% body-weight loss at 68 weeks in STEP-1 trial. Compounded at a licensed 503A pharmacy.",
  },
];

function Catalog() {
  return (
    <section
      id="shop"
      style={{
        background: C.paper,
        padding: `clamp(64px, 8vw, 112px) ${PAGE_X}`,
      }}
    >
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={label(C.brand)}>Our compounds</div>
          <h2
            style={display({
              fontSize: "clamp(32px, 4.4vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.028em",
              color: C.text,
              marginTop: 14,
            })}
          >
            Two compounds.{" "}
            <span style={{ color: C.brand }}>One transparent price.</span>
          </h2>
          <p
            style={sans({
              fontSize: 17,
              color: C.text2,
              marginTop: 14,
              maxWidth: 700,
              margin: "14px auto 0",
              lineHeight: 1.55,
            })}
          >
            All prescribed by an independent US Board-certified physician and
            filled by a licensed Section 503A compounding pharmacy. Cancel
            anytime in one click.
          </p>
        </div>

        {/* 2-column catalog grid — CoreAgeRx pattern */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 24,
            maxWidth: 980,
            margin: "0 auto",
          }}
          className="catalog-grid"
        >
          {PRODUCTS.map((p) => (
            <ProductCatalogCard key={p.href} p={p} />
          ))}
        </div>

        <p
          style={sans({
            fontSize: 11.5,
            color: C.mute,
            marginTop: 28,
            maxWidth: 980,
            margin: "28px auto 0",
            lineHeight: 1.6,
            textAlign: "center",
          })}
        >
          Compounded medications are not reviewed or approved by the FDA but are
          prepared by licensed compounding pharmacies in compliance with Section
          503A of the Federal Food, Drug, and Cosmetic Act. Prescription required
          from a licensed provider. Wegovy® and Ozempic® are registered
          trademarks of Novo Nordisk®. Mounjaro® and Zepbound® are registered
          trademarks of Eli Lilly and Company®. WomanRx.com is not affiliated with
          these companies.
        </p>
      </div>

      <style>{`
        @media (max-width: 760px) { .catalog-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ══════════════════ 04 — COMPOUNDED SECTION ══════════════════ */
/* CoreAgeRx-style copy: "Easy to administer weekly shot / Feel fuller faster..." */
function CompoundedSection() {
  return (
    <section style={{ background: C.paper2, padding: `clamp(72px, 9vw, 128px) ${PAGE_X}` }}>
      <div
        style={{
          maxWidth: MAX_W,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "clamp(32px, 5vw, 72px)",
          alignItems: "center",
        }}
        className="compound-grid"
      >
        <div>
          <div style={label(C.brand)}>Compounded GLP-1 medication</div>
          <h2
            style={display({
              fontSize: "clamp(32px, 4.4vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.028em",
              color: C.text,
              marginTop: 14,
            })}
          >
            Prescription weight loss{" "}
            <span style={{ color: C.brand }}>delivered to your door.</span>
          </h2>

          <ul style={{ marginTop: 32, listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
            <CompoundBullet text="Easy to administer weekly shot" />
            <CompoundBullet text="Feel fuller faster and longer" />
            <CompoundBullet text="Supports healthy weight management when combined with diet and exercise" />
            <CompoundBullet text="Lot-tracked from the 503A compounding bench to your door" />
          </ul>

          <div style={{ marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/weight-loss-intake" className="btn-brand" style={{ padding: "15px 28px", fontSize: 14.5 }}>
              See if you qualify
              <span style={mono({ fontSize: 13 })}>→</span>
            </Link>
            <Link href="#how" className="btn-ghost" style={{ padding: "14px 24px", fontSize: 14.5 }}>
              How it works
            </Link>
          </div>
        </div>

        <div
          className="photo-frame"
          style={{
            aspectRatio: "4/5",
            borderRadius: 16,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Image
            src="/photo/portrait.jpg"
            alt="Patient on a compounded GLP-1 program"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            style={{ objectFit: "cover" }}
          />
          {/* Vial overlay chip */}
          <div
            style={{
              position: "absolute",
              bottom: 24,
              right: 24,
              background: C.white,
              padding: "12px 16px",
              borderRadius: 999,
              boxShadow: "0 8px 24px -8px rgba(14,14,12,0.18)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={mono({ fontSize: 11, color: C.brand, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" })}>
              From $99/mo
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .compound-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function CompoundBullet({ text }: { text: string }) {
  return (
    <li style={{ display: "grid", gridTemplateColumns: "28px 1fr", gap: 14, alignItems: "center" }}>
      <span
        style={{
          width: 28,
          height: 28,
          borderRadius: 999,
          background: C.brand,
          color: C.bone,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </span>
      <span style={sans({ fontSize: 16, color: C.text2, lineHeight: 1.55 })}>{text}</span>
    </li>
  );
}

/* ══════════════════ 05 — HOW IT WORKS ══════════════════ */
function HowItWorks() {
  const steps = [
    {
      n: "1",
      title: "Complete a short health assessment",
      body: "Answer a brief medical questionnaire, 100% online and confidential. We screen for eligibility and contraindications before a clinician is involved.",
      cta: "Takes about 2 minutes",
    },
    {
      n: "2",
      title: "Our board-certified physicians review your answers",
      body: "An independent US Board-certified physician reviews your file within 24 hours and writes a prescription if it's clinically appropriate.",
      cta: "Provider response in 24 hours",
    },
    {
      n: "3",
      title: "Your medication ships overnight",
      body: "A licensed 503A pharmacy compounds your prescription and ships it via Rush No-Contact delivery. Free overnight shipping. No signature required.",
      cta: "Lot-tracked from bench to door",
    },
  ];
  return (
    <section id="how" style={{ background: C.paper, padding: `clamp(72px, 9vw, 128px) ${PAGE_X}` }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56, maxWidth: 720, margin: "0 auto 56px" }}>
          <div style={label(C.brand)}>How it works</div>
          <h2
            style={display({
              fontSize: "clamp(32px, 4.4vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.028em",
              color: C.text,
              marginTop: 14,
            })}
          >
            Get your prescription in{" "}
            <span style={{ color: C.brand }}>3 easy steps.</span>
          </h2>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
          className="steps-grid"
        >
          {steps.map((s) => (
            <div
              key={s.n}
              style={{
                background: C.white,
                border: `1px solid ${C.line}`,
                borderRadius: 12,
                padding: "32px 28px 32px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 999,
                  background: C.brand,
                  color: C.bone,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  ...sans({ fontSize: 18, fontWeight: 700 }),
                }}
              >
                {s.n}
              </div>
              <h3
                style={sans({
                  fontSize: 20,
                  fontWeight: 700,
                  color: C.text,
                  marginTop: 24,
                  letterSpacing: "-0.012em",
                  lineHeight: 1.3,
                })}
              >
                {s.title}
              </h3>
              <p
                style={sans({
                  fontSize: 14.5,
                  color: C.text2,
                  lineHeight: 1.65,
                  marginTop: 10,
                  flex: 1,
                })}
              >
                {s.body}
              </p>
              <div
                style={{
                  marginTop: 18,
                  paddingTop: 14,
                  borderTop: `1px solid ${C.line}`,
                  ...mono({
                    fontSize: 11,
                    color: C.brand,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }),
                }}
              >
                {s.cta}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, display: "flex", justifyContent: "center" }}>
          <Link href="/weight-loss-intake" className="btn-brand" style={{ padding: "15px 30px", fontSize: 15 }}>
            Start my visit <span style={mono({ fontSize: 13 })}>→</span>
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) { .steps-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ══════════════════ 06 — PHARMACY ══════════════════ */
function Pharmacy() {
  return (
    <section style={{ position: "relative" }}>
      <div className="pharmacy-hero-media" style={{ position: "relative", aspectRatio: "16/9", minHeight: 480, maxHeight: 720, overflow: "hidden" }}>
        <Image
          src="/photo/pharmacy.jpg"
          alt="Sterile 503A compounding suite"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(110deg, rgba(14,14,12,0.72) 0%, rgba(14,14,12,0.35) 50%, rgba(14,14,12,0.05) 100%)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: `0 ${PAGE_X}`, width: "100%" }}>
            <div style={{ maxWidth: 560, color: C.bone }}>
              <div style={label("rgba(253, 250, 242, 0.7)")}>The pharmacy</div>
              <h2
                style={display({
                  fontSize: "clamp(30px, 4.4vw, 56px)",
                  fontWeight: 700,
                  lineHeight: 1.02,
                  letterSpacing: "-0.028em",
                  color: C.bone,
                  marginTop: 16,
                })}
              >
                Compounded by a real{" "}
                <span style={{ color: C.brandLight }}>503A pharmacy.</span>
              </h2>
              <p
                style={sans({
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: "rgba(253, 250, 242, 0.85)",
                  marginTop: 20,
                  maxWidth: 480,
                })}
              >
                A licensed 503A pharmacy compounds every
                WomanRx.com prescription under Section 503A and USP-797 sterile
                standards. Lot-tracked from bench to door.
              </p>

              <dl
                style={{
                  marginTop: 28,
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "10px 28px",
                  alignItems: "baseline",
                }}
              >
                <dt style={label("rgba(253,250,242,0.55)")}>Compliance</dt>
                <dd style={sans({ fontSize: 14, color: C.bone })}>Section 503A · USP-797</dd>
                <dt style={label("rgba(253,250,242,0.55)")}>LegitScript</dt>
                <dd style={sans({ fontSize: 14, color: C.bone })}>Cert. 50087439</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .pharmacy-hero-media {
            aspect-ratio: auto !important;
            min-height: 560px !important;
            width: 100% !important;
          }
        }
        @media (max-width: 520px) {
          .pharmacy-hero-media {
            min-height: 620px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ══════════════════ 07 — REVIEWS ══════════════════ */
function Reviews() {
  const reviews = [
    { name: "Sarah K.", verified: true, stat: "−42 lbs · 9 months", body: "I'd tried every diet for a decade. The medication didn't make weight loss easier — it made it possible to act on what I already knew." },
    { name: "Marcus T.", verified: true, stat: "−28 lbs · 6 months", body: "The clinician actually answered my questions. The medication shipped overnight. I cancelled and re-started twice without anyone making it weird." },
    { name: "Lena J.", verified: true, stat: "−51 lbs · 12 months", body: "Cheaper than Wegovy, ships faster than my old pharmacy, and the dose adjustments are included. I don't understand why anyone pays brand-name cash." },
    { name: "Dave R.", verified: true, stat: "−19 lbs · 4 months", body: "I'm at 4 months. The titration schedule WomanRx.com uses matches the FDA label exactly. Side effects were mild after week two." },
    { name: "Priya N.", verified: true, stat: "−34 lbs · 8 months", body: "I switched providers. The intake was faster, the support replies within hours, and they actually published their pharmacy's address." },
    { name: "Caleb W.", verified: true, stat: "−24 lbs · 5 months", body: "What sold me was the page about contraindications and the maintenance question. Everyone else hides those. These guys put them on the homepage." },
  ];
  return (
    <section id="reviews" style={{ background: C.paper, padding: `clamp(72px, 9vw, 128px) ${PAGE_X}` }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "end",
            gap: 32,
            marginBottom: 48,
          }}
          className="rev-head"
        >
          <div>
            <div style={label(C.brand)}>Reviews</div>
            <h2
              style={display({
                fontSize: "clamp(32px, 4.4vw, 56px)",
                fontWeight: 700,
                lineHeight: 1.02,
                letterSpacing: "-0.028em",
                color: C.text,
                marginTop: 14,
              })}
            >
              Members lost an average of{" "}
              <span style={{ color: C.brand }}>32 lbs in nine months.</span>
            </h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="stars" style={{ fontSize: 22 }}>★★★★★</div>
            <div style={sans({ fontSize: 15, fontWeight: 700, color: C.text, marginTop: 4 })}>4.8 / 5</div>
            <div style={sans({ fontSize: 12.5, color: C.mute, marginTop: 2 })}>from 12,000+ members</div>
          </div>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
          className="reviews-grid"
        >
          {reviews.map((r) => (
            <div
              key={r.name}
              style={{
                background: C.white,
                border: `1px solid ${C.line}`,
                borderRadius: 12,
                padding: "24px 24px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="stars" style={{ fontSize: 14 }}>★★★★★</span>
                <span style={chip(C.brand, C.brandSoft)}>Verified</span>
              </div>
              <p style={sans({ fontSize: 14.5, color: C.text, lineHeight: 1.6 })}>"{r.body}"</p>
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: 12,
                  borderTop: `1px solid ${C.line}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <span style={sans({ fontSize: 13, fontWeight: 600, color: C.text })}>{r.name}</span>
                <span style={mono({ fontSize: 11, color: C.brand, fontWeight: 500 })}>{r.stat}</span>
              </div>
            </div>
          ))}
        </div>

        <p style={sans({ fontSize: 11.5, color: C.mute, marginTop: 20, lineHeight: 1.6, maxWidth: 980 })}>
          Member reviews shown above are illustrative composites built from
          anonymized intake-to-outcome data; identifying details have been
          altered. Individual results vary. Compounded medications are not
          FDA-approved.
        </p>
      </div>

      <style>{`
        @media (max-width: 1024px) { .reviews-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .reviews-grid { grid-template-columns: 1fr !important; } .rev-head { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ══════════════════ 08 — MAINTENANCE ══════════════════ */
function Maintenance() {
  return (
    <section style={{ background: C.paper2, padding: `clamp(72px, 9vw, 128px) ${PAGE_X}` }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div style={{ maxWidth: 720, marginBottom: 48 }}>
          <div style={label(C.brand)}>After the GLP-1</div>
          <h2
            style={display({
              fontSize: "clamp(32px, 4.4vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.028em",
              color: C.text,
              marginTop: 14,
            })}
          >
            What happens when{" "}
            <span style={{ color: C.brand }}>you stop.</span>
          </h2>
          <p style={sans({ fontSize: 17, color: C.text2, marginTop: 16, maxWidth: 620, lineHeight: 1.6 })}>
            The most-asked question in obesity medicine. We answer it honestly,
            up front, because we'd rather you know now than after you've paid.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="maint-grid">
          <MaintCard title="Most people return some weight" body="Roughly two-thirds of lost weight returns within 12 months of discontinuing semaglutide in published extension data. This is the body's setpoint reasserting itself, not a moral failure." cite="STEP-1 Extension" />
          <MaintCard title="Maintenance dosing is real" body="Obesity medicine is researching maintenance protocols: lower weekly dose, every-other-week, seasonal cycling. Your provider can prescribe a maintenance plan at goal weight." cite="ASBP 2024" />
          <MaintCard title="Lifestyle reinforcement holds" body="Patients who pair the compound with structural behavior change — protein-prioritized eating, resistance training, sleep — retain more loss after taper." cite="SURMOUNT-3 lifestyle arm" />
        </div>
      </div>
      <style>{`
        @media (max-width: 960px) { .maint-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function MaintCard({ title, body, cite }: { title: string; body: string; cite: string }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 12, padding: "26px 24px 28px" }}>
      <h3 style={sans({ fontSize: 19, fontWeight: 700, color: C.text, letterSpacing: "-0.012em", lineHeight: 1.25 })}>
        {title}
      </h3>
      <p style={sans({ fontSize: 14, color: C.text2, marginTop: 12, lineHeight: 1.65 })}>{body}</p>
      <div style={{ marginTop: 18, paddingTop: 12, borderTop: `1px solid ${C.line}`, ...label(C.mute) }}>
        {cite}
      </div>
    </div>
  );
}

/* ══════════════════ 09 — CONTRAINDICATIONS ══════════════════ */
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
    <section id="safety" style={{ background: C.paper, padding: `clamp(72px, 9vw, 128px) ${PAGE_X}` }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "clamp(32px, 5vw, 72px)" }} className="contra-grid">
          <div>
            <div style={label(C.danger)}>Important safety</div>
            <h2
              style={display({
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: "-0.024em",
                color: C.text,
                marginTop: 14,
              })}
            >
              When this is{" "}
              <span style={{ color: C.danger }}>not for you.</span>
            </h2>
            <p style={sans({ fontSize: 15.5, color: C.text2, marginTop: 16, maxWidth: 440, lineHeight: 1.6 })}>
              GLP-1 medications have real contraindications per the FDA
              black-box label. We publish them here, before the consultation.
            </p>
          </div>
          <ul style={{ listStyle: "none", borderTop: `1px solid ${C.line}` }}>
            {items.map((it, i) => (
              <li
                key={it}
                style={{
                  display: "grid",
                  gridTemplateColumns: "44px 1fr",
                  gap: 20,
                  padding: "20px 0",
                  borderBottom: `1px solid ${C.line}`,
                  alignItems: "baseline",
                }}
              >
                <span style={mono({ fontSize: 12, color: C.danger, fontWeight: 600, letterSpacing: "0.08em" })}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={sans({ fontSize: 15.5, color: C.text, lineHeight: 1.5 })}>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style>{`
        @media (max-width: 960px) { .contra-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ══════════════════ 10 — TRUST STRIP ══════════════════ */
function TrustStrip() {
  return (
    <section className="trust-strip" style={{ padding: `36px ${PAGE_X}` }}>
      <div
        style={{
          maxWidth: MAX_W,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 24,
          alignItems: "center",
        }}
        className="trust-grid"
      >
        {/* LegitScript with real seal */}
        <a
          href="https://www.legitscript.com/websites/?checker_keywords=womanrx.com"
          target="_blank"
          rel="noopener"
          title="Verify LegitScript Approval for www.womanrx.com"
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textDecoration: "none" }}
        >
          <img
            src="https://static.legitscript.com/seals/50087439.png"
            alt="LegitScript Approved"
            width={50}
            height={54}
          />
          <span style={mono({ fontSize: 10, color: C.mute, letterSpacing: "0.14em", textTransform: "uppercase" })}>
            Cert 50087439
          </span>
        </a>
        {[
          { label: "HIPAA", note: "Compliant" },
          { label: "HSA · FSA", note: "Eligible" },
          { label: "30-day", note: "Money-back" },
          { label: "Free", note: "Overnight shipping" },
          { label: "503A", note: "Compounding" },
        ].map((b) => (
          <div key={b.label} style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center", textAlign: "center" }}>
            <div style={sans({ fontSize: 15, fontWeight: 700, color: C.text, letterSpacing: "-0.005em" })}>{b.label}</div>
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

/* ══════════════════ 11 — CLOSING CTA ══════════════════ */
function ClosingCTA() {
  return (
    <section
      style={{
        background: C.ink,
        color: C.bone,
        padding: `clamp(72px, 10vw, 144px) ${PAGE_X}`,
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <div style={label("rgba(253, 250, 242, 0.55)")}>Begin</div>
        <h2
          style={display({
            fontSize: "clamp(40px, 6vw, 88px)",
            fontWeight: 700,
            lineHeight: 0.98,
            letterSpacing: "-0.034em",
            color: C.bone,
            marginTop: 16,
          })}
        >
          Two minutes to find out{" "}
          <span style={{ color: C.brandLight }}>if it suits you.</span>
        </h2>
        <p
          style={sans({
            fontSize: 17,
            color: "rgba(253, 250, 242, 0.78)",
            marginTop: 22,
            maxWidth: 620,
            margin: "22px auto 0",
            lineHeight: 1.55,
          })}
        >
          The assessment is free. There's no charge until a licensed provider
          reviews your file and writes a prescription.
        </p>
        <div style={{ marginTop: 36, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/weight-loss-intake"
            className="btn-brand"
            style={{ padding: "16px 32px", fontSize: 15 }}
          >
            Start my visit
            <span style={mono({ fontSize: 13 })}>→</span>
          </Link>
          <Link href={PEPTIDES_LIVE ? "/shop" : "/glp1-offer-v1"} className="btn-outline-bone" style={{ padding: "15px 30px", fontSize: 15 }}>
            See compounds
          </Link>
        </div>
      </div>
    </section>
  );
}
