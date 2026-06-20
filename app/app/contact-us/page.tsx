"use client";

import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { C, serif, sans, mono, label, PAGE_X, MAX_W } from "@/lib/design";

const CONTACTS = [
  { label: "Electronic", value: "support@womanrx.com", href: "mailto:support@womanrx.com" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  return (
    <>
      <SiteNav tone="ink" />
      <PageHero
        tone="paper"
        eyebrow="Contact · 01"
        title={
          <>
            We are{" "}
            <em style={{ fontStyle: "italic", color: C.accent }}>here to help.</em>
          </>
        }
        lede="Questions about your order, your account, or the program. Our patient-care team responds within one business day."
      />

      <section style={{ background: C.paper, padding: `clamp(72px, 9vw, 120px) ${PAGE_X} clamp(96px, 12vw, 160px)` }}>
        <div
          style={{
            maxWidth: MAX_W,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr",
            gap: "clamp(40px, 6vw, 88px)",
          }}
          className="contact-grid"
        >
          <div>
            <div style={label(C.mute)}>Direct channels · 02</div>
            <ul
              style={{
                listStyle: "none",
                marginTop: 32,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {CONTACTS.map((c) => (
                <li key={c.label} style={{ borderTop: `1px solid ${C.line}`, padding: "28px 0" }}>
                  <div style={label(C.mute)}>{c.label}</div>
                  {c.href ? (
                    <a
                      href={c.href}
                      style={{
                        ...serif({
                          fontSize: 24,
                          color: C.text,
                          fontWeight: 400,
                          letterSpacing: "-0.014em",
                        }),
                        marginTop: 10,
                        display: "inline-block",
                      }}
                    >
                      {c.value}
                    </a>
                  ) : (
                    <p
                      style={serif({
                        fontSize: 20,
                        color: C.text,
                        fontWeight: 400,
                        marginTop: 10,
                        lineHeight: 1.4,
                      })}
                    >
                      {c.value}
                    </p>
                  )}
                </li>
              ))}
              <li style={{ borderTop: `1px solid ${C.line}` }} />
            </ul>

            <div
              style={{
                marginTop: 36,
                padding: "28px",
                border: `1px solid ${C.accent}`,
                background: "rgba(139, 46, 46, 0.05)",
              }}
            >
              <div style={label(C.accent)}>If this is an emergency</div>
              <p
                style={serif({
                  fontSize: 18,
                  color: C.text,
                  marginTop: 12,
                  lineHeight: 1.5,
                  fontWeight: 400,
                })}
              >
                Please call <strong style={{ color: C.text }}>9-1-1</strong>{" "}
                immediately. WomanRx.com is not an emergency service and cannot respond to
                urgent medical issues.
              </p>
            </div>
          </div>

          <div
            style={{
              background: C.paper2,
              border: `1px solid ${C.line}`,
              padding: "48px 44px",
            }}
          >
            <div style={label(C.mute)}>Send a message · 03</div>
            <h2
              style={serif({
                fontSize: "clamp(28px, 3vw, 38px)",
                fontWeight: 400,
                color: C.text,
                marginTop: 18,
                letterSpacing: "-0.018em",
                lineHeight: 1.15,
              })}
            >
              Tell us how we can help.
            </h2>

            {sent ? (
              <div
                style={{
                  marginTop: 36,
                  paddingTop: 28,
                  borderTop: `1px solid ${C.line}`,
                }}
              >
                <div style={label(C.accent)}>Message received</div>
                <p
                  style={serif({
                    fontSize: 20,
                    color: C.text,
                    marginTop: 14,
                    lineHeight: 1.4,
                    fontWeight: 400,
                  })}
                >
                  We will respond within one business day at the email you provided.
                </p>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (sending) return;
                  setErr(null);
                  setSending(true);
                  const fd = new FormData(e.currentTarget);
                  try {
                    const res = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        name: fd.get("name"),
                        email: fd.get("email"),
                        subject: fd.get("subject"),
                        message: fd.get("message"),
                      }),
                    });
                    const data = await res.json().catch(() => ({}));
                    if (res.ok && data.ok) setSent(true);
                    else
                      setErr(
                        "We could not send your message. Please email support@womanrx.com directly.",
                      );
                  } catch {
                    setErr(
                      "Network error. Please email support@womanrx.com directly.",
                    );
                  } finally {
                    setSending(false);
                  }
                }}
                style={{
                  marginTop: 32,
                  display: "flex",
                  flexDirection: "column",
                  gap: 22,
                }}
              >
                <Field label="Full name" name="name" placeholder="Your full name" required />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
                <Field label="Subject" name="subject" placeholder="What is this about?" required />
                <Field label="Message" name="message" placeholder="Tell us more…" required textarea />
                <button
                  type="submit"
                  className="btn-ink"
                  disabled={sending}
                  style={{ marginTop: 12, justifyContent: "center", opacity: sending ? 0.6 : 1 }}
                >
                  {sending ? "Sending…" : "Send message"}
                  <span style={mono({ fontSize: 12 })}>→</span>
                </button>
                {err ? (
                  <p style={sans({ fontSize: 13, color: C.accent, marginTop: 2, lineHeight: 1.5 })}>
                    {err}
                  </p>
                ) : null}
                <p
                  style={sans({
                    fontSize: 12,
                    color: C.mute,
                    marginTop: 4,
                    lineHeight: 1.6,
                  })}
                >
                  By sending, you agree to our{" "}
                  <a
                    href="/privacy"
                    style={{
                      color: C.accent,
                      borderBottom: `1px solid ${C.accent}`,
                    }}
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="/terms"
                    style={{
                      color: C.accent,
                      borderBottom: `1px solid ${C.accent}`,
                    }}
                  >
                    Terms of Use
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />

      <style>{`
        @media (max-width: 920px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

function Field({
  label: lab,
  name,
  type = "text",
  placeholder,
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const baseStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    fontFamily: '"Inter", sans-serif',
    fontSize: 15,
    color: C.text,
    background: C.paper,
    border: `1px solid ${C.line}`,
    borderRadius: 0,
    outline: "none",
    transition: "border-color 0.18s",
  };

  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <span
        style={{
          ...mono({
            fontSize: 11,
            color: C.mute,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }),
        }}
      >
        {lab}
      </span>
      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          required={required}
          rows={5}
          style={{ ...baseStyle, resize: "vertical" }}
          onFocus={(e) => (e.target.style.borderColor = C.text)}
          onBlur={(e) => (e.target.style.borderColor = C.line)}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          style={baseStyle}
          onFocus={(e) => (e.target.style.borderColor = C.text)}
          onBlur={(e) => (e.target.style.borderColor = C.line)}
        />
      )}
    </label>
  );
}
