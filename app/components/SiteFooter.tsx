import Link from "next/link";
import { C, serif, sans, mono, label, PAGE_X } from "@/lib/design";
import { BrandLogo } from "./BrandLogo";

const PRODUCTS = [
  { href: "/tirzepatide", label: "Tirzepatide" },
  { href: "/semaglutide", label: "Semaglutide" },
];

const PLATFORM = [
  { href: "/about", label: "About" },
  { href: "/editorial-policy", label: "Editorial Policy" },
  { href: "/glp-1", label: "GLP-1 & Weight" },
  { href: "/hrt", label: "Hormones & HRT" },
  { href: "/peptides", label: "Peptides" },
  { href: "/faq", label: "Questions" },
  { href: "/contact-us", label: "Contact" },
  { href: "https://member.womanrx.com/", label: "Patient Portal" },
];

const LEGAL = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/returns-refund-policy", label: "Returns" },
  { href: "/hipaa", label: "HIPAA" },
  { href: "/ccpa", label: "CCPA" },
  { href: "/sms-terms-and-conditions", label: "SMS" },
];

export function SiteFooter() {
  return (
    <footer style={{ background: C.ink, color: C.bone, position: "relative" }}>
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: `clamp(96px, 11vw, 160px) ${PAGE_X} 48px`,
        }}
      >
        {/* Editorial closing line — big serif statement */}
        <div
          style={{
            paddingBottom: 64,
            borderBottom: `1px solid ${C.inkLine}`,
            maxWidth: 880,
          }}
        >
          <div style={label(C.bone4)}>WomenRx · Women's longevity medicine · Est. 2024</div>
          <p
            style={serif({
              fontSize: "clamp(28px, 3.4vw, 44px)",
              lineHeight: 1.15,
              color: C.bone,
              marginTop: 28,
              fontWeight: 300,
              letterSpacing: "-0.018em",
            })}
          >
            Care built around a woman's body, at every age. We dispense the
            prescription your provider writes. We don't <em style={{ fontStyle: "italic", color: C.accentLight }}>practice medicine</em>.
            We don't <em style={{ fontStyle: "italic", color: C.accentLight }}>own the doctor</em>.
            We don't <em style={{ fontStyle: "italic", color: C.accentLight }}>hide the price</em>.
          </p>
        </div>

        {/* Link columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1.4fr",
            gap: 48,
            paddingTop: 56,
            paddingBottom: 56,
            borderBottom: `1px solid ${C.inkLine}`,
          }}
          className="footer-cols"
        >
          <div>
            <div style={label(C.bone4)}>WomenRx</div>
            <address
              style={{
                ...sans({
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: C.bone2,
                  fontStyle: "normal",
                  marginTop: 18,
                }),
              }}
            >
              <BrandLogo tone="bone" size={19} />
              <br />
              <a
                className="footer-link"
                href="mailto:support@womanrx.com"
              >
                support@womanrx.com
              </a>
            </address>
          </div>

          <div>
            <div style={label(C.bone4)}>Treatments</div>
            <ul
              style={{
                listStyle: "none",
                marginTop: 18,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {PRODUCTS.map((l) => (
                <li key={l.href}>
                  <Link className="footer-link" href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div style={label(C.bone4)}>Platform</div>
            <ul
              style={{
                listStyle: "none",
                marginTop: 18,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {PLATFORM.map((l) =>
                l.href.startsWith("http") ? (
                  <li key={l.href}>
                    <a
                      className="footer-link"
                      href={l.href}
                      target="_blank"
                      rel="noopener"
                    >
                      {l.label}
                    </a>
                  </li>
                ) : (
                  <li key={l.href}>
                    <Link className="footer-link" href={l.href}>
                      {l.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <div style={label(C.bone4)}>Legal</div>
            <ul
              style={{
                listStyle: "none",
                marginTop: 18,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <Link className="footer-link" href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* LegitScript verification */}
          <div>
            <div style={label(C.bone4)}>Verified</div>
            <div
              style={{
                marginTop: 18,
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
              }}
            >
              <a
                href="https://www.legitscript.com/websites/?checker_keywords=womanrx.com"
                target="_blank"
                rel="noopener"
                title="Verify LegitScript Approval for www.womanrx.com"
                style={{ display: "inline-block", lineHeight: 0 }}
              >
                <img
                  src="https://static.legitscript.com/seals/50087439.png"
                  alt="Verify Approval for www.womanrx.com"
                  width={64}
                  height={70}
                />
              </a>
              <div style={mono({ fontSize: 10.5, color: C.bone3, lineHeight: 1.7, letterSpacing: "0.06em" })}>
                LEGITSCRIPT
                <br />
                CERT 50087439
                <br />
                503A · MD INTEGRATIONS
              </div>
            </div>
          </div>
        </div>

        {/* Compliance disclaimers — required, verbatim */}
        <div
          style={{
            paddingTop: 52,
            paddingBottom: 36,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            borderBottom: `1px solid ${C.inkLine}`,
          }}
          className="footer-disclaim-cols"
        >
          <DisclaimerBlock title="Platform">
            WomenRx operates as a marketplace platform that connects patients with
            independently licensed healthcare providers who deliver medical care through
            the WomenRx Patient Portal. WomenRx does not directly dispense medication
            or provide medical services; all clinical decisions are solely made by
            independent providers. Payment does not guarantee that a prescription will
            be issued or that medication will be dispensed.
          </DisclaimerBlock>

          <DisclaimerBlock title="Compounded medication">
            Compounded medications are not reviewed or approved by the U.S. Food and
            Drug Administration (FDA) for safety or efficacy. They are prepared by
            licensed compounding pharmacies in compliance with Section 503A of the
            Federal Food, Drug, and Cosmetic Act, based on a valid patient-specific
            prescription from a licensed healthcare provider.
          </DisclaimerBlock>

          <DisclaimerBlock title="Trademarks">
            Wegovy® and Ozempic® are exclusively manufactured and distributed by Novo
            Nordisk®. Mounjaro® and Zepbound® are exclusively manufactured and
            distributed by Eli Lilly and Company®. WomenRx is not affiliated with,
            endorsed by, or sponsored by any of these companies or their products.
          </DisclaimerBlock>

          <DisclaimerBlock title="Informational use">
            The information on this website is for general informational purposes only
            and is not intended as a substitute for personalized medical advice,
            diagnosis, or treatment. Always consult your licensed healthcare provider
            regarding any medical concerns.
          </DisclaimerBlock>
        </div>

        {/* Bottom rail */}
        <div
          style={{
            paddingTop: 36,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <span style={mono({ fontSize: 10.5, color: C.bone4, letterSpacing: "0.16em" })}>
            © {new Date().getFullYear()} WOMENRX
          </span>
          <span style={mono({ fontSize: 10.5, color: C.bone4, letterSpacing: "0.16em" })}>
            COMPOUNDED BY A LICENSED 503A PHARMACY
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .footer-cols { grid-template-columns: 1fr 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 760px) {
          .footer-cols { grid-template-columns: 1fr 1fr !important; }
          .footer-disclaim-cols { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

function DisclaimerBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div style={label(C.bone4)}>{title}</div>
      <p
        style={sans({
          fontSize: 12.5,
          lineHeight: 1.7,
          color: C.bone3,
          marginTop: 12,
        })}
      >
        {children}
      </p>
    </div>
  );
}
