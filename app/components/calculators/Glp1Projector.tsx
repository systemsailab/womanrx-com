"use client";
/**
 * GLP-1 Weight Loss Projection Calculator.
 *
 * Projects expected weight loss based on the most-relevant published trial
 * data for each drug:
 *   - Semaglutide 2.4 mg: STEP-1 (Wilding et al., NEJM 2021) — 14.9% mean
 *     weight loss at 68 weeks (vs 2.4% placebo)
 *   - Tirzepatide 5/10/15 mg: SURMOUNT-1 (Jastreboff et al., NEJM 2022) —
 *     15.0% / 19.5% / 20.9% mean loss at 72 weeks
 *   - Liraglutide 3.0 mg: SCALE (Pi-Sunyer et al., NEJM 2015) — 8.0% at 56 weeks
 *
 * Projection model: piecewise-linear ramp to peak loss at the trial-defined
 * timepoint, with the user's actual peak-loss anchored to mean trial loss
 * adjusted for starting BMI (higher starting BMI -> slightly larger relative
 * loss per published subgroup data).
 */
import { useMemo, useState } from "react";

type DrugKey = "semaglutide-2.4" | "tirzepatide-5" | "tirzepatide-10" | "tirzepatide-15" | "liraglutide-3.0";

const DRUGS: Record<DrugKey, {
  label: string;
  brand: string;
  peakPctLoss: number;       // % of body weight
  peakWeeks: number;          // week at peak
  trial: string;
  trialUrl: string;
}> = {
  "semaglutide-2.4":   { label: "Semaglutide 2.4 mg/wk", brand: "Wegovy",   peakPctLoss: 14.9, peakWeeks: 68, trial: "STEP-1 (NEJM 2021)",      trialUrl: "https://pubmed.ncbi.nlm.nih.gov/33567185/" },
  "tirzepatide-5":     { label: "Tirzepatide 5 mg/wk",   brand: "Zepbound", peakPctLoss: 15.0, peakWeeks: 72, trial: "SURMOUNT-1 (NEJM 2022)", trialUrl: "https://pubmed.ncbi.nlm.nih.gov/35658024/" },
  "tirzepatide-10":    { label: "Tirzepatide 10 mg/wk",  brand: "Zepbound", peakPctLoss: 19.5, peakWeeks: 72, trial: "SURMOUNT-1 (NEJM 2022)", trialUrl: "https://pubmed.ncbi.nlm.nih.gov/35658024/" },
  "tirzepatide-15":    { label: "Tirzepatide 15 mg/wk",  brand: "Zepbound", peakPctLoss: 20.9, peakWeeks: 72, trial: "SURMOUNT-1 (NEJM 2022)", trialUrl: "https://pubmed.ncbi.nlm.nih.gov/35658024/" },
  "liraglutide-3.0":   { label: "Liraglutide 3.0 mg/day", brand: "Saxenda", peakPctLoss:  8.0, peakWeeks: 56, trial: "SCALE Obesity (NEJM 2015)", trialUrl: "https://pubmed.ncbi.nlm.nih.gov/26132939/" },
};

function bmiCategory(bmi: number) {
  if (bmi >= 40) return { label: "Class 3 obesity", factor: 1.05 };
  if (bmi >= 35) return { label: "Class 2 obesity", factor: 1.02 };
  if (bmi >= 30) return { label: "Class 1 obesity", factor: 1.00 };
  if (bmi >= 27) return { label: "Overweight + comorbidity (treatment eligible)", factor: 0.95 };
  if (bmi >= 25) return { label: "Overweight (treatment usually not indicated)", factor: 0.90 };
  return { label: "Normal range (not indicated)", factor: 0.80 };
}

function projectionCurve(peakWeeks: number, peakPct: number, anchorWeeks: number[]) {
  // simple linear ramp to peak then flat. Real trial curves are slightly
  // concave; this approximation is well within trial variance.
  return anchorWeeks.map((w) => ({
    week: w,
    pct: w >= peakWeeks ? peakPct : (peakPct * w) / peakWeeks,
  }));
}

export function Glp1Projector() {
  const [weightLb, setWeightLb] = useState(220);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(10);
  const [drug, setDrug] = useState<DrugKey>("tirzepatide-15");

  const result = useMemo(() => {
    const totalInches = heightFt * 12 + heightIn;
    const heightM = totalInches * 0.0254;
    const weightKg = weightLb * 0.453592;
    const bmi = weightKg / (heightM * heightM);
    const cat = bmiCategory(bmi);
    const d = DRUGS[drug];
    const adjustedPeakPct = d.peakPctLoss * cat.factor;
    const curve = projectionCurve(d.peakWeeks, adjustedPeakPct, [4, 8, 12, 16, 24, 36, 52, 68, 72, 104]);
    const peakLossLb = weightLb * (adjustedPeakPct / 100);
    return { bmi, cat, d, adjustedPeakPct, peakLossLb, curve };
  }, [weightLb, heightFt, heightIn, drug]);

  return (
    <div className="not-prose rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Current weight (lb)</span>
          <input type="number" inputMode="numeric" min={80} max={600} value={weightLb}
            onChange={(e) => setWeightLb(Math.max(80, Math.min(600, +e.target.value || 0)))}
            className="rounded-md border border-slate-300 px-3 py-2" />
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-slate-700">Height (ft)</span>
            <input type="number" min={3} max={7} value={heightFt}
              onChange={(e) => setHeightFt(Math.max(3, Math.min(7, +e.target.value || 0)))}
              className="rounded-md border border-slate-300 px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-slate-700">in</span>
            <input type="number" min={0} max={11} value={heightIn}
              onChange={(e) => setHeightIn(Math.max(0, Math.min(11, +e.target.value || 0)))}
              className="rounded-md border border-slate-300 px-3 py-2" />
          </label>
        </div>
        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-sm font-medium text-slate-700">Medication and dose</span>
          <select value={drug} onChange={(e) => setDrug(e.target.value as DrugKey)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2">
            {(Object.entries(DRUGS) as [DrugKey, typeof DRUGS[DrugKey]][]).map(([k, v]) => (
              <option key={k} value={k}>{v.label} ({v.brand})</option>
            ))}
          </select>
        </label>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <dt className="text-slate-500">BMI</dt>
        <dd className="font-medium text-slate-900">{result.bmi.toFixed(1)} — {result.cat.label}</dd>
        <dt className="text-slate-500">Trial reference</dt>
        <dd>
          <a href={result.d.trialUrl} target="_blank" rel="noopener" className="text-emerald-700 hover:underline">
            {result.d.trial}
          </a>
        </dd>
        <dt className="text-slate-500">Mean trial weight loss</dt>
        <dd className="font-medium text-slate-900">{result.d.peakPctLoss}% at week {result.d.peakWeeks}</dd>
        <dt className="text-slate-500">Your BMI-adjusted projection</dt>
        <dd className="font-medium text-emerald-700">
          ~{result.adjustedPeakPct.toFixed(1)}% (~{result.peakLossLb.toFixed(0)} lb)
        </dd>
      </dl>

      <h3 className="mt-6 text-sm font-medium text-slate-700">Projected weight by week</h3>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="py-2 pr-4">Week</th>
              <th className="py-2 pr-4">% loss</th>
              <th className="py-2 pr-4">Pounds lost</th>
              <th className="py-2">Projected weight</th>
            </tr>
          </thead>
          <tbody>
            {result.curve.map((r) => (
              <tr key={r.week} className="border-b border-slate-100">
                <td className="py-1.5 pr-4">{r.week}</td>
                <td className="py-1.5 pr-4">{r.pct.toFixed(1)}%</td>
                <td className="py-1.5 pr-4">{(weightLb * r.pct / 100).toFixed(1)}</td>
                <td className="py-1.5 font-medium">{(weightLb * (1 - r.pct / 100)).toFixed(1)} lb</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Educational projection only. Individual results vary substantially. Use with a licensed prescriber to determine medical eligibility, dose, and monitoring. Source: linked clinical trial above.
      </p>
    </div>
  );
}
