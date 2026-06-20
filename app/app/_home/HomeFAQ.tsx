"use client";

import { useState } from "react";
import Link from "next/link";
import { C, serif, sans, label, PAGE_X } from "@/lib/design";

const FAQS = [
  {
    q: "Is compounded semaglutide the same as Wegovy or Ozempic?",
    a: "It is the same active molecule, prepared by a licensed 503A compounding pharmacy rather than a brand manufacturer. Compounded medications are not FDA-approved and are not the same product as the branded versions. Your provider can explain the trade-offs and decide whether the compounded protocol is clinically appropriate for you.",
  },
  {
    q: "How quickly does the medication ship?",
    a: "After a licensed provider reviews your file and writes a prescription, your medication ships from a licensed 503A pharmacy within 24-48 hours. Overnight carrier. Rush No-Contact delivery. No signature required.",
  },
  {
    q: "What happens if I want to cancel?",
    a: "Cancel from your account in a single click. We refund any unshipped dose. We never block a cancellation behind a phone call or require you to wait out a prepaid period.",
  },
  {
    q: "Why is the price so much lower than Wegovy?",
    a: "Compounded medications skip the brand manufacturer markup and the insurance billing layer. The price reflects the compound, the pharmacy preparation, the provider consult, the shipping, and the platform. Nothing else is added.",
  },
  {
    q: "Who actually writes my prescription?",
    a: "An independent, US-licensed clinician through the MD Integrations provider network. They are licensed in your state. They make every clinical decision. WomanRx.com does not employ them and does not influence the prescribing decision.",
  },
];

export function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section
      style={{
        background: C.paper,
        padding: `clamp(96px, 12vw, 160px) ${PAGE_X}`,
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ marginBottom: 56 }}>
          <div style={label(C.mute)}>Questions · 09</div>
          <h2
            style={{
              ...sans({
                fontSize: "clamp(40px, 5.4vw, 72px)",
                fontWeight: 600,
                lineHeight: 0.98,
                letterSpacing: "-0.028em",
                color: C.text,
                marginTop: 20,
              }),
            }}
          >
            What people ask{" "}
            <em
              style={{
                fontFamily: '"Fraunces", serif',
                fontStyle: "italic",
                fontWeight: 400,
                color: C.accent,
              }}
            >
              before they begin.
            </em>
          </h2>
        </div>

        <div>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="faq-item">
                <button
                  className="faq-trigger"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span>{f.q}</span>
                  <span className="faq-toggle" aria-hidden>
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div
                  className="faq-body"
                  style={{
                    maxHeight: isOpen ? 600 : 0,
                    opacity: isOpen ? 1 : 0,
                    transition: "max-height 0.4s ease, opacity 0.3s ease",
                  }}
                >
                  {f.a}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 40, display: "flex", justifyContent: "center" }}>
          <Link href="/faq" className="serif-link">
            Read every question
          </Link>
        </div>
      </div>
    </section>
  );
}
