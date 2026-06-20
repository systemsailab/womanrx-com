"use client";

/**
 * Interactive cost projection. Renders on a light paper surface.
 * Drag the slider for your starting weight, watch the projected month-12
 * weight and the annual cost difference between WomanRx.com and brand-name.
 *
 * Inspired by Ro's hero calculator — the highest-converting element in
 * the GLP-1 category.
 */

import { useState, useMemo } from "react";
import { C, serif, sans, mono, label } from "@/lib/design";

const HRX_TIRZ_MO = 149;
const HRX_SEMA_MO = 99;
const BRAND_TIRZ_MO = 650;
const BRAND_SEMA_MO = 650;

const TIRZ_LOSS_PCT_12MO = 0.16;
const SEMA_LOSS_PCT_12MO = 0.115;

function fmtUSD(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function CostCalculator() {
  const [weight, setWeight] = useState(220);

  const calc = useMemo(() => {
    const tirzLoss = Math.round(weight * TIRZ_LOSS_PCT_12MO);
    const semaLoss = Math.round(weight * SEMA_LOSS_PCT_12MO);
    return {
      tirzLoss,
      semaLoss,
      tirzFinal: weight - tirzLoss,
      semaFinal: weight - semaLoss,
      hrxTirzAnnual: HRX_TIRZ_MO * 12,
      hrxSemaAnnual: HRX_SEMA_MO * 12,
      brandTirzAnnual: BRAND_TIRZ_MO * 12,
      brandSemaAnnual: BRAND_SEMA_MO * 12,
    };
  }, [weight]);

  return (
    <div
      style={{
        background: C.paper2,
        border: `1px solid ${C.line}`,
        padding: "36px 36px 40px",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          paddingBottom: 24,
          borderBottom: `1px solid ${C.line}`,
        }}
      >
        <span style={label(C.mute)}>Twelve-month projection</span>
        <span style={mono({ fontSize: 10.5, color: C.mute, letterSpacing: "0.16em" })}>
          STEP-1 · SURMOUNT-1
        </span>
      </div>

      <div style={{ marginTop: 32 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 16,
          }}
        >
          <span style={label(C.mute)}>Current weight</span>
          <span
            style={serif({
              fontSize: 32,
              fontWeight: 300,
              color: C.text,
              letterSpacing: "-0.02em",
            })}
          >
            {weight}
            <span style={mono({ fontSize: 13, color: C.mute, marginLeft: 6 })}>lb</span>
          </span>
        </div>
        <input
          type="range"
          className="apoth-range"
          min={140}
          max={400}
          step={1}
          value={weight}
          onChange={(e) => setWeight(parseInt(e.target.value, 10))}
          aria-label="Current weight in pounds"
        />
        <div
          style={{
            ...mono({ fontSize: 10, color: C.mute, letterSpacing: "0.14em" }),
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <span>140</span>
          <span>270</span>
          <span>400</span>
        </div>
      </div>

      <div style={{ marginTop: 36, display: "flex", flexDirection: "column" }}>
        <ProjectionRow
          name="Tirzepatide"
          descriptor="dual-incretin"
          loss={calc.tirzLoss}
          finalWeight={calc.tirzFinal}
          hrxAnnual={calc.hrxTirzAnnual}
          brandAnnual={calc.brandTirzAnnual}
          recommended
        />
        <ProjectionRow
          name="Semaglutide"
          descriptor="weekly GLP-1"
          loss={calc.semaLoss}
          finalWeight={calc.semaFinal}
          hrxAnnual={calc.hrxSemaAnnual}
          brandAnnual={calc.brandSemaAnnual}
        />
      </div>

      <p
        style={sans({
          fontSize: 11.5,
          color: C.mute,
          marginTop: 28,
          lineHeight: 1.6,
        })}
      >
        Projections reference average 12-month weight loss in pivotal
        phase-3 trials (STEP-1 for semaglutide, SURMOUNT-1 for tirzepatide).
        Individual results vary. Compounded medications are not FDA-approved.
        Brand-name reference prices reflect 2026 manufacturer cash rates
        (Wegovy®/Zepbound®).
      </p>
    </div>
  );
}

function ProjectionRow({
  name,
  descriptor,
  loss,
  finalWeight,
  hrxAnnual,
  brandAnnual,
  recommended,
}: {
  name: string;
  descriptor: string;
  loss: number;
  finalWeight: number;
  hrxAnnual: number;
  brandAnnual: number;
  recommended?: boolean;
}) {
  return (
    <div
      style={{
        padding: "24px 0",
        borderTop: `1px solid ${C.line}`,
        display: "grid",
        gridTemplateColumns: "1.3fr 1fr 1fr",
        gap: 24,
        alignItems: "baseline",
      }}
      className="proj-row"
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <span
            style={serif({
              fontSize: 22,
              fontWeight: 400,
              color: C.text,
              letterSpacing: "-0.012em",
            })}
          >
            {name}
          </span>
          {recommended && (
            <span
              style={mono({
                fontSize: 9.5,
                color: C.accent,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                border: `1px solid ${C.accent}`,
                padding: "3px 7px",
              })}
            >
              Advanced
            </span>
          )}
        </div>
        <div
          style={serif({
            fontSize: 14,
            fontStyle: "italic",
            color: C.mute,
            marginTop: 4,
          })}
        >
          {descriptor}
        </div>
      </div>

      <div>
        <div style={label(C.mute)}>Goal weight</div>
        <div
          style={serif({
            fontSize: 26,
            fontWeight: 300,
            color: C.text,
            marginTop: 6,
            letterSpacing: "-0.02em",
          })}
        >
          {finalWeight}
          <span style={mono({ fontSize: 12, color: C.mute, marginLeft: 4 })}>lb</span>
        </div>
        <div style={mono({ fontSize: 11, color: C.accent, marginTop: 4, letterSpacing: "0.06em" })}>
          −{loss} lb · 12 mo
        </div>
      </div>

      <div>
        <div style={label(C.mute)}>Annual</div>
        <div
          style={serif({
            fontSize: 26,
            fontWeight: 300,
            color: C.text,
            marginTop: 6,
            letterSpacing: "-0.02em",
          })}
        >
          {fmtUSD(hrxAnnual)}
        </div>
        <div style={mono({ fontSize: 11, color: C.mute, marginTop: 4, letterSpacing: "0.06em" })}>
          vs {fmtUSD(brandAnnual)} brand
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .proj-row { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </div>
  );
}
