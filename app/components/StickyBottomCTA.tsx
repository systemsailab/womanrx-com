"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { C, sans, mono } from "@/lib/design";

/**
 * Always-visible quiz CTA bar at the bottom of the viewport.
 * Hides on the intake page (no point showing it there).
 * Mirrors the Hims "Start losing weight →" sticky bottom pattern.
 */
export function StickyBottomCTA({ hideOnPath }: { hideOnPath?: string }) {
  const [shown, setShown] = useState(false);
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(window.location.pathname);
    const onScroll = () => setShown(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hideOnPath && path.startsWith(hideOnPath)) return null;
  if (path === "/glp1-offer-v1" || path === "/weight-loss-intake/") return null;

  return (
    <div className={`sticky-bottom-cta ${shown ? "" : "sticky-bottom-cta-hidden"}`}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span
          style={{
            ...mono({
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(253, 250, 242, 0.6)",
            }),
          }}
        >
          From
        </span>
        <span style={sans({ fontSize: 15, fontWeight: 600, color: C.bone })}>
          $99/mo
        </span>
        <span style={mono({ fontSize: 11, color: "rgba(253, 250, 242, 0.6)" })}>·</span>
        <span style={sans({ fontSize: 13.5, color: C.bone2, display: "none" })} className="show-on-md">
          Real Rx. Real pharmacy. Cancel anytime.
        </span>
      </div>
      <Link
        href="/glp1-offer-v1"
        style={{
          background: "#0E4F4F",
          color: "#FDFAF2",
          padding: "12px 22px",
          borderRadius: 999,
          ...sans({ fontSize: 13.5, fontWeight: 600 }),
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          textDecoration: "none",
          transition: "background 0.18s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#063535")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#0E4F4F")}
      >
        Take the quiz <span style={mono({ fontSize: 12 })}>→</span>
      </Link>
      <style jsx>{`
        @media (min-width: 720px) {
          :global(.show-on-md) {
            display: inline !important;
          }
        }
      `}</style>
    </div>
  );
}
