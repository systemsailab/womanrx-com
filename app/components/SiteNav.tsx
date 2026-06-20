"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { C, sans, mono, label, FONT, PAGE_X } from "@/lib/design";
import { PromoBar } from "./PromoBar";
import { CartButton } from "./shop/CartButton";
import { BrandLogo } from "./BrandLogo";
import { PEPTIDES_LIVE } from "@/lib/shop/config";

const SHOP_ITEMS = [
  { href: "/tirzepatide", name: "Compounded Tirzepatide", desc: "Dual-incretin · weekly", price: "$149/mo" },
  { href: "/semaglutide", name: "Compounded Semaglutide", desc: "GLP-1 · weekly", price: "$99/mo" },
];

const LINKS = [
  { href: "#shop", label: "Shop", dropdown: true },
  { href: "#how", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#reviews", label: "Reviews" },
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
                        borderRadius: 12,
                        padding: 12,
                        width: 340,
                        boxShadow: "0 20px 60px -20px rgba(14, 14, 12, 0.18)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                      }}
                    >
                      {SHOP_ITEMS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr auto",
                            padding: "12px 14px",
                            borderRadius: 8,
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
                          <div style={mono({ fontSize: 12.5, fontWeight: 500, color: C.brand })}>
                            {item.price}
                          </div>
                        </Link>
                      ))}
                      {PEPTIDES_LIVE ? (
                      <Link
                        href="/shop"
                        style={{
                          padding: "10px 14px",
                          marginTop: 4,
                          borderTop: `1px solid ${C.line}`,
                          ...sans({ fontSize: 13, fontWeight: 600, color: C.brand }),
                          textDecoration: "none",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        See all compounds
                        <span>→</span>
                      </Link>
                      ) : null}
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
              Take the quiz
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
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
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
              Take the quiz <span>→</span>
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
