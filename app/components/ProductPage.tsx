/**
 * Shared editorial product detail page in the v4 cream-paper identity.
 * Used by /tirzepatide and /semaglutide.
 *
 * Pattern:
 *   - Ink (dark) hero with the compound name in massive serif, the price
 *     box, a real product photograph, and key trial stats
 *   - Cream content sections below: mechanism, dose ladder, outcomes,
 *     risks, who-for, citations
 */

import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { C, serif, sans, mono, label, PAGE_X, MAX_W } from "@/lib/design";

export type ProductSpec = {
  tag: string;
  name: string;
  descriptor: string;
  volume: string;
  first: string;
  recurring: string;
  daily: string;             // "$/day" reframe — signature move
  brandDaily: string;        // "$/day" for the brand alternative
  bandColor: string;         // forest or terracotta
  bandColorDeep: string;
  bandColorLight: string;
  brand: string;             // "Wegovy" or "Zepbound"
  photo: string;
  intro: string;
  mechanism: string;
  doseLadder: { week: string; dose: string; note?: string }[];
  outcomes: { stat: string; label: string; cite: string }[];
  sideEffects: { common: string[]; serious: string[] };
  whoFor: string[];
  whoNot: string[];
  citations: { name: string; href: string }[];
};

export function ProductPage({ p }: { p: ProductSpec }) {
  return (
    <>
      <SiteNav tone="bone" />

      {/* HERO — dark editorial */}
      <section
        style={{
          background: C.ink,
          color: C.bone,
          padding: `clamp(56px, 8vw, 96px) ${PAGE_X} clamp(80px, 10vw, 128px)`,
          borderBottom: `1px solid ${C.inkLine}`,
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: MAX_W,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px, 6vw, 96px)",
            alignItems: "center",
          }}
          className="prod-hero-grid"
        >
          <div>
            <div style={label(C.bone3)}>{p.tag}</div>

            <h1
              style={serif({
                fontSize: "clamp(64px, 9vw, 144px)",
                fontWeight: 300,
                lineHeight: 0.94,
                letterSpacing: "-0.032em",
                color: C.bone,
                marginTop: 24,
              })}
            >
              {p.name}
            </h1>

            <p
              style={serif({
                fontSize: "clamp(20px, 1.8vw, 26px)",
                fontStyle: "italic",
                color: C.bone2,
                marginTop: 24,
                fontWeight: 300,
                lineHeight: 1.4,
              })}
            >
              {p.descriptor}
            </p>

            <p
              style={mono({
                fontSize: 12,
                color: C.bone4,
                marginTop: 24,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              })}
            >
              {p.volume}
            </p>

            {/* Price block — with daily reframe (signature move) */}
            <div
              style={{
                marginTop: 48,
                paddingTop: 32,
                borderTop: `1px solid ${C.inkLine}`,
                display: "flex",
                alignItems: "baseline",
                gap: 40,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div style={label(C.bone4)}>From</div>
                <div
                  style={serif({
                    fontSize: 56,
                    fontWeight: 300,
                    color: C.bone,
                    letterSpacing: "-0.028em",
                    marginTop: 8,
                    lineHeight: 1,
                  })}
                >
                  <span style={mono({ fontSize: 18, color: C.bone3, marginRight: 6, fontWeight: 400 })}>$</span>
                  {p.first}
                </div>
                <div style={mono({ fontSize: 12, color: C.bone3, marginTop: 12, letterSpacing: "0.06em" })}>
                  ≈ {p.daily} / day
                </div>
              </div>
              <div style={{ paddingLeft: 40, borderLeft: `1px solid ${C.inkLine}` }}>
                <div style={label(C.bone4)}>Brand-name {p.brand} cash</div>
                <div
                  style={serif({
                    fontSize: 32,
                    fontWeight: 300,
                    color: C.bone3,
                    letterSpacing: "-0.02em",
                    marginTop: 8,
                    lineHeight: 1,
                    textDecoration: "line-through",
                    textDecorationColor: C.accent,
                  })}
                >
                  <span style={mono({ fontSize: 14, color: C.bone4, marginRight: 4 })}>$</span>
                  1,349
                </div>
                <div style={mono({ fontSize: 12, color: C.bone3, marginTop: 12, letterSpacing: "0.06em" })}>
                  {p.brandDaily} / day
                </div>
              </div>
            </div>

            <div style={{ marginTop: 40, display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="/weight-loss-intake/" className="btn-paper">
                Begin consultation
                <span style={mono({ fontSize: 12 })}>→</span>
              </Link>
              <Link href="/faq" className="btn-outline-bone">
                Common questions
              </Link>
            </div>
          </div>

          {/* Photograph */}
          <div
            className="photo-frame"
            style={{
              aspectRatio: "4/5",
              position: "relative",
              background: p.bandColor,
            }}
          >
            <Image
              src={p.photo}
              alt={`A modern medical injector pen, ${p.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <span style={label("rgba(244, 241, 236, 0.75)")}>Fig. 01 · {p.name}</span>
              <span style={mono({ fontSize: 10.5, color: "rgba(244, 241, 236, 0.65)", letterSpacing: "0.16em" })}>
                LOT 50087439
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section style={{ background: C.paper2, padding: `clamp(72px, 9vw, 120px) ${PAGE_X}` }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <p
            style={serif({
              fontSize: "clamp(24px, 2.4vw, 34px)",
              lineHeight: 1.45,
              color: C.text,
              fontWeight: 300,
              fontStyle: "italic",
            })}
          >
            {p.intro}
          </p>
        </div>
      </section>

      {/* MECHANISM */}
      <section style={{ background: C.paper, padding: `clamp(96px, 12vw, 160px) ${PAGE_X}` }}>
        <Two
          left={{ eyebrow: "Mechanism · 02", title: "How it works in the body" }}
          right={p.mechanism}
        />
      </section>

      {/* DOSE LADDER */}
      <section style={{ background: C.paper2, padding: `clamp(96px, 12vw, 160px) ${PAGE_X}` }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <div style={label(C.mute)}>Titration · 03</div>
            <h2
              style={{
                ...sans({
                  fontSize: "clamp(36px, 4.4vw, 60px)",
                  fontWeight: 600,
                  lineHeight: 1.04,
                  letterSpacing: "-0.026em",
                  color: C.text,
                  marginTop: 18,
                }),
              }}
            >
              The dose ladder.
            </h2>
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              borderTop: `1px solid ${C.line}`,
            }}
          >
            <thead>
              <tr>
                <Th>Week</Th>
                <Th>Dose</Th>
                <Th>Note</Th>
              </tr>
            </thead>
            <tbody>
              {p.doseLadder.map((d) => (
                <tr key={d.week} style={{ borderBottom: `1px solid ${C.line}` }}>
                  <Td>
                    <span
                      style={mono({
                        fontSize: 13,
                        color: C.mute,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      })}
                    >
                      {d.week}
                    </span>
                  </Td>
                  <Td>
                    <span
                      style={serif({
                        fontSize: 22,
                        fontWeight: 400,
                        color: C.text,
                        letterSpacing: "-0.014em",
                      })}
                    >
                      {d.dose}
                    </span>
                  </Td>
                  <Td>
                    <span style={sans({ fontSize: 14, color: C.text2, lineHeight: 1.5 })}>
                      {d.note ?? "—"}
                    </span>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* OUTCOMES */}
      <section style={{ background: C.paper, padding: `clamp(96px, 12vw, 160px) ${PAGE_X}` }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, marginBottom: 64 }}>
            <div style={label(C.mute)}>Documented · 04</div>
            <h2
              style={{
                ...sans({
                  fontSize: "clamp(36px, 4.4vw, 60px)",
                  fontWeight: 600,
                  lineHeight: 1.04,
                  letterSpacing: "-0.026em",
                  color: C.text,
                  marginTop: 18,
                }),
              }}
            >
              What the trials show.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${p.outcomes.length}, 1fr)`,
              gap: 1,
              background: C.line,
              border: `1px solid ${C.line}`,
            }}
            className="outcomes-grid"
          >
            {p.outcomes.map((o) => (
              <div key={o.label} style={{ background: C.paper, padding: "44px 32px" }}>
                <div
                  style={serif({
                    fontSize: "clamp(56px, 6vw, 96px)",
                    fontWeight: 300,
                    color: p.bandColor,
                    letterSpacing: "-0.032em",
                    lineHeight: 1,
                  })}
                >
                  {o.stat}
                </div>
                <div
                  style={serif({
                    fontSize: 17,
                    fontStyle: "italic",
                    color: C.text,
                    marginTop: 24,
                    fontWeight: 400,
                    lineHeight: 1.4,
                  })}
                >
                  {o.label}
                </div>
                <div style={label(C.mute)}>{o.cite}</div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 880px) {
            .outcomes-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* SIDE EFFECTS + WHO FOR */}
      <section style={{ background: C.paper2, padding: `clamp(96px, 12vw, 160px) ${PAGE_X}` }}>
        <div
          style={{
            maxWidth: MAX_W,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px, 5vw, 72px)",
          }}
          className="risks-grid"
        >
          <div>
            <div style={label(C.mute)}>Risks · 05</div>
            <h3
              style={serif({
                fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.018em",
                color: C.text,
                marginTop: 18,
              })}
            >
              Side effects, honestly.
            </h3>

            <h4 style={{ ...label(C.mute), marginTop: 32 }}>Common</h4>
            <ul style={{ listStyle: "none", marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              {p.sideEffects.common.map((s) => (
                <li key={s} style={sans({ fontSize: 14.5, color: C.text2, lineHeight: 1.6 })}>
                  · {s}
                </li>
              ))}
            </ul>

            <h4 style={{ ...label(C.accent), marginTop: 24 }}>Serious</h4>
            <ul style={{ listStyle: "none", marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              {p.sideEffects.serious.map((s) => (
                <li key={s} style={sans({ fontSize: 14.5, color: C.text2, lineHeight: 1.6 })}>
                  · {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div style={label(C.mute)}>Fit · 06</div>
            <h3
              style={serif({
                fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.018em",
                color: C.text,
                marginTop: 18,
              })}
            >
              Who it's for. Who it isn't.
            </h3>

            <h4 style={{ ...label(C.mute), marginTop: 32 }}>Suitable for</h4>
            <ul style={{ listStyle: "none", marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              {p.whoFor.map((s) => (
                <li key={s} style={sans({ fontSize: 14.5, color: C.text2, lineHeight: 1.6 })}>
                  · {s}
                </li>
              ))}
            </ul>

            <h4 style={{ ...label(C.accent), marginTop: 24 }}>Not suitable for</h4>
            <ul style={{ listStyle: "none", marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              {p.whoNot.map((s) => (
                <li key={s} style={sans({ fontSize: 14.5, color: C.text2, lineHeight: 1.6 })}>
                  · {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <style>{`
          @media (max-width: 880px) {
            .risks-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* CITATIONS + CTA */}
      <section style={{ background: C.paper, padding: `clamp(96px, 12vw, 160px) ${PAGE_X}` }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          <div style={{ maxWidth: 720 }}>
            <div style={label(C.mute)}>Citations · 07</div>
            <h3
              style={serif({
                fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.018em",
                color: C.text,
                marginTop: 18,
              })}
            >
              The published evidence.
            </h3>
          </div>

          <ol style={{ listStyle: "none", marginTop: 40, borderTop: `1px solid ${C.line}` }}>
            {p.citations.map((c, i) => (
              <li
                key={c.name}
                style={{
                  borderBottom: `1px solid ${C.line}`,
                  padding: "20px 0",
                  display: "grid",
                  gridTemplateColumns: "60px 1fr",
                  gap: 24,
                  alignItems: "baseline",
                }}
              >
                <span
                  style={mono({
                    fontSize: 12,
                    color: C.mute,
                    letterSpacing: "0.12em",
                  })}
                >
                  0{i + 1}
                </span>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener"
                  style={{
                    ...serif({
                      fontSize: 18,
                      color: C.text,
                      fontWeight: 400,
                      letterSpacing: "-0.012em",
                    }),
                    borderBottom: `1px solid ${C.lineStrong}`,
                    paddingBottom: 4,
                  }}
                >
                  {c.name}
                </a>
              </li>
            ))}
          </ol>

          <div style={{ marginTop: 64, textAlign: "center" }}>
            <Link
              href="/weight-loss-intake/"
              className="btn-ink"
              style={{ padding: "20px 40px", fontSize: 13 }}
            >
              Begin consultation
              <span style={mono({ fontSize: 13, marginLeft: 4 })}>→</span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />

      <style>{`
        @media (max-width: 1024px) {
          .prod-hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

function Two({
  left,
  right,
}: {
  left: { eyebrow: string; title: string };
  right: string;
}) {
  return (
    <div
      style={{
        maxWidth: MAX_W,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1.4fr",
        gap: "clamp(40px, 6vw, 88px)",
      }}
      className="two-grid"
    >
      <div>
        <div style={label(C.mute)}>{left.eyebrow}</div>
        <h2
          style={{
            ...sans({
              fontSize: "clamp(36px, 4.4vw, 60px)",
              fontWeight: 600,
              lineHeight: 1.04,
              letterSpacing: "-0.026em",
              color: C.text,
              marginTop: 18,
            }),
          }}
        >
          {left.title}
        </h2>
      </div>
      <p
        style={serif({
          fontSize: "clamp(18px, 1.6vw, 22px)",
          color: C.text2,
          fontWeight: 300,
          lineHeight: 1.6,
        })}
      >
        {right}
      </p>

      <style>{`
        @media (max-width: 880px) {
          .two-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      style={{
        textAlign: "left",
        padding: "20px 16px",
        borderBottom: `1px solid ${C.line}`,
        ...label(C.mute),
      }}
    >
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td style={{ padding: "22px 16px", verticalAlign: "baseline" }}>{children}</td>;
}
