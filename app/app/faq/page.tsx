"use client";

import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { C, serif, sans, label, PAGE_X, MAX_W } from "@/lib/design";

const SECTIONS = [
  {
    label: "About WomanRx.com",
    items: [
      { q: "What is WomanRx.com?", a: "WomanRx.com is a compounding apothecary for GLP-1 weight management. We connect patients with independent US-licensed clinicians and a licensed Section 503A compounding pharmacy. We do not employ doctors and we do not own a pharmacy." },
      { q: "What is the WomanRx.com process?", a: "Begin the consultation, respond to a brief set of medical questions, and a licensed provider will review your file within approximately 24 hours. If a prescription is clinically appropriate, your medication ships overnight from a licensed 503A pharmacy." },
      { q: "How much does WomanRx.com cost?", a: "Semaglutide plans start at $99/mo with the annual option. Tirzepatide plans start at $149/mo with the annual option. The price you see at checkout is the price billed. No insurance required." },
    ],
  },
  {
    label: "Insurance, providers & pharmacy",
    items: [
      { q: "Can I use my health insurance?", a: "We do not accept insurance. Access should not depend on insurers and our transparent cash price is typically lower than what you would pay with insurance." },
      { q: "Is it legal to prescribe medications online?", a: "Yes. Each provider is licensed to prescribe and treat patients in the state where you live." },
      { q: "Can I use my local pharmacy?", a: "Yes. Your provider can send the prescription to a pharmacy of your choosing, though our affiliated 503A pharmacy offers the lowest price." },
      { q: "Which pharmacy fills my prescription?", a: "A US-licensed 503A compounding pharmacy. Hours: Monday–Friday 08:00–17:00 EST." },
      { q: "Who is your provider network?", a: "MD Integrations (mdintegrations.com). Independent US-licensed clinicians licensed in your state." },
      { q: "When will I be charged for my medication?", a: "You pay securely at checkout for the treatment option you select." },
      { q: "Is my information safe?", a: "Yes. We take your information seriously and operate under HIPAA. See our Privacy Policy and HIPAA Notice for full details." },
      { q: "How old do I have to be to use WomanRx.com?", a: "We treat patients 18 years of age and older. Patients under 18 should consult a local primary care physician." },
      { q: "If I'm having an emergency, what should I do?", a: "Call 9-1-1. WomanRx.com is not an emergency service." },
      { q: "Why do I need to submit a photo ID and a picture of myself?", a: "State regulations require that our medical providers verify the identity of the patient they are treating." },
    ],
  },
  {
    label: "Ordering & delivery",
    items: [
      { q: "Where does WomanRx.com offer service?", a: "All 50 US states." },
      { q: "Do I need to sign for my order?", a: "No. Your medication ships via Rush No-Contact delivery. No signature required." },
      { q: "How do I change my credit card?", a: "Log in to your account and update your payment method at any time." },
      { q: "What if I have a problem with my order or my account?", a: "Use the Contact form on this site to open a ticket. We respond within one business day." },
      { q: "How long will it take to get my medication?", a: "Provider feedback typically within 24 hours, then pharmacy processing and overnight shipment." },
      { q: "How can I change my shipping address?", a: "Log in and update your shipping address at any time before your order ships." },
    ],
  },
  {
    label: "Cancellation & returns",
    items: [
      { q: "How do I cancel?", a: "Log in to your WomanRx.com account and cancel in a single click. We refund any unshipped dose. No phone calls, no friction." },
      { q: "Can I return my medication once I receive it?", a: "No. Federal and State law do not allow medication returns after dispensing. All sales are final once shipped. Contact support with specific concerns." },
    ],
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SECTIONS.flatMap((s) =>
    s.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  ),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <SiteNav tone="ink" />
      <PageHero
        tone="paper"
        eyebrow="Questions · 01"
        title={
          <>
            Everything to ask,
            <br />
            <em style={{ fontStyle: "italic", color: C.accent }}>
              before you begin.
            </em>
          </>
        }
        lede="If your question is not below, our patient-care team responds within one business day at support@womanrx.com."
      />

      <section style={{ background: C.paper, padding: `clamp(64px, 9vw, 112px) ${PAGE_X} clamp(96px, 12vw, 160px)` }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          {SECTIONS.map((section, i) => (
            <FaqSection key={section.label} section={section} index={i + 1} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

function FaqSection({
  section,
  index,
}: {
  section: typeof SECTIONS[number];
  index: number;
}) {
  return (
    <div style={{ marginBottom: 96 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: 64,
          alignItems: "start",
        }}
        className="faq-section-grid"
      >
        <div style={{ position: "sticky", top: 100 }}>
          <div style={label(C.mute)}>Section · 0{index}</div>
          <h2
            style={serif({
              fontSize: 30,
              fontWeight: 400,
              color: C.text,
              marginTop: 16,
              letterSpacing: "-0.018em",
              lineHeight: 1.2,
            })}
          >
            {section.label}
          </h2>
        </div>

        <div>
          {section.items.map((item, i) => (
            <FaqRow key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .faq-section-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </div>
  );
}

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        className="faq-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <span className="faq-toggle" aria-hidden>
          {open ? "−" : "+"}
        </span>
      </button>
      <div
        className="faq-body"
        style={{
          maxHeight: open ? 600 : 0,
          opacity: open ? 1 : 0,
          transition: "max-height 0.4s ease, opacity 0.3s ease",
        }}
      >
        {a}
      </div>
    </div>
  );
}
