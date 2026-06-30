"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { C, sans, mono, PAGE_X } from "@/lib/design";
import { PromoBar } from "./PromoBar";
import { CartButton } from "./shop/CartButton";
import { BrandLogo } from "./BrandLogo";
import { PEPTIDES_LIVE } from "@/lib/shop/config";

const TREATMENTS = [
  { href: "/glp-1", name: "Weight & GLP-1", desc: "Semaglutide & tirzepatide, dosed for women", tag: "From $99" },
  { href: "/hrt", name: "Hormones & HRT", desc: "Perimenopause & menopause, met with science", tag: "HRT" },
  { href: "/peptides", name: "Peptide therapy", desc: "Energy, recovery & cellular repair", tag: "Peptides" },
  { href: "/blog", name: "Skin & longevity", desc: "Look as ageless as you intend to feel", tag: "Library" },
];

const LINKS = [
  { href: "#treatments", label: "Treatments", dropdown: true },
  { href: "#how", label: "How it works" },
  { href: "/blog", label: "The Journal" },
  { href: "#reviews", label: "Stories" },
  { href: "/faq", label: "FAQ" },
];

export function SiteNav({ tone = "ink" }: { tone?: "ink" | "bone" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isInk = tone === "ink";
  const textColor = isInk ? C.text : C.bone;
  const linkClass = isInk ? "nav-link" : "nav-link nav-link-bone";

  return (
    <>
      <PromoBar />
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: isInk ? C.paper : C.ink,
          borderBottom: scrolled ? `1px solid ${isInk ? C.line : C.inkLine}` : "1px solid transparent",
          transition: "border-color 0.25s ease",
          color: textColor,
        }}
      >
        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: `14px ${PAGE_X}`,
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            alignItems: "center",
            gap: 24,
          }}
        >
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
            <BrandLogo tone={tone} size={21} />
          </Link>

          <nav
            aria-label="Primary"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 32,
            }}
            className="hide-on-mobile"
          >
            {LINKS.map((l) =>
              l.dropdown ? (
                <div
                  key={l.href}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setShopOpen(true)}
                  onMouseLeave={() => setShopOpen(false)}
                >
                  <button
                    className={linkClass}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "8px 0",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {l.label}
                    <span style={{ fontSize: 10, marginTop: 2 }}>▾</span>
                  </button>
                  {shopOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: C.white,
                        border: `1px solid ${C.line}`,
                        borderRadius: 14,
                        padding: 12,
                        width: 360,
                        boxShadow: "0 26px 70px -28px rgba(42, 35, 32, 0.28)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                      }}
                    >
                      {TREATMENTS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr auto",
                            padding: "12px 14px",
                            borderRadius: 10,
                            textDecoration: "none",
                            transition: "background 0.15s",
                            alignItems: "center",
                            gap: 12,
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = C.brandSoft)}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          <div>
                            <div style={sans({ fontSize: 15, fontWeight: 600, color: C.text })}>
                              {item.name}
                            </div>
                            <div style={sans({ fontSize: 12.5, color: C.mute, marginTop: 2 })}>
                              {item.desc}
                            </div>
                          </div>
                          <div style={mono({ fontSize: 10.5, fontWeight: 600, color: C.brand, letterSpacing: "0.1em", textTransform: "uppercase" })}>
                            {item.tag}
                          </div>
                        </Link>
                      ))}
                      <Link
                        href="/blog"
                        style={{
                          padding: "11px 14px",
                          marginTop: 4,
                          borderTop: `1px solid ${C.line}`,
                          ...sans({ fontSize: 13, fontWeight: 600, color: C.brand }),
                          textDecoration: "none",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        Browse the full library
                        <span>→</span>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link key={l.href} href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              )
            )}
          </nav>

          <div
            style={{ display: "flex", alignItems: "center", gap: 14 }}
            className="hide-on-mobile"
          >
            {PEPTIDES_LIVE ? <CartButton tone={tone} /> : null}
            <a
              href="https://member.womanrx.com/"
              target="_blank"
              rel="noopener"
              className={linkClass}
            >
              Sign in
            </a>
            <Link href="/weight-loss-intake" className="btn-brand" style={{ padding: "11px 22px", fontSize: 13.5 }}>
              Start your visit
              <span style={mono({ fontSize: 12 })}>→</span>
            </Link>
          </div>

          <button
            aria-label="Open menu"
            onClick={() => setOpen((o) => !o)}
            className="show-on-mobile"
            style={{
              background: "transparent",
              border: `1px solid ${C.lineStrong}`,
              padding: "9px 16px",
              borderRadius: 999,
              cursor: "pointer",
              display: "none",
              color: textColor,
              ...sans({ fontSize: 13, fontWeight: 600 }),
            }}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {open && (
          <div
            style={{
              borderTop: `1px solid ${isInk ? C.line : C.inkLine}`,
              background: isInk ? C.paper : C.ink,
              padding: `24px ${PAGE_X} 32px`,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            {TREATMENTS.map((t) => (
              <Link key={t.href} href={t.href} className={linkClass} onClick={() => setOpen(false)}>
                {t.name}
              </Link>
            ))}
            <Link href="/blog" className={linkClass} onClick={() => setOpen(false)}>
              The Journal
            </Link>
            <Link href="/faq" className={linkClass} onClick={() => setOpen(false)}>
              FAQ
            </Link>
            <a
              href="https://member.womanrx.com/"
              target="_blank"
              rel="noopener"
              className={linkClass}
            >
              Sign in
            </a>
            <Link
              href="/weight-loss-intake"
              className="btn-brand"
              onClick={() => setOpen(false)}
              style={{ justifyContent: "center", marginTop: 8 }}
            >
              Start your visit <span>→</span>
            </Link>
          </div>
        )}

        <style jsx>{`
          @media (max-width: 900px) {
            .hide-on-mobile { display: none !important; }
            .show-on-mobile { display: inline-flex !important; }
          }
        `}</style>
      </header>
    </>
  );
}
