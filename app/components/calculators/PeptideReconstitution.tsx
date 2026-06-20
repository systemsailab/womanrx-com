"use client";
/**
 * Peptide Reconstitution Calculator.
 *
 * Calculates how many units (on an insulin syringe) to draw for a target
 * peptide dose, given the vial mass and bacteriostatic water volume used
 * to reconstitute. Solves the most common bedside math error for
 * peptide therapy.
 */
import { useMemo, useState } from "react";

export function PeptideReconstitution() {
  const [vialMass, setVialMass] = useState(5);       // mg per vial
  const [bacWater, setBacWater] = useState(2);       // mL BAC water added
  const [doseMass, setDoseMass] = useState(250);     // mcg target dose
  const [syringeSize, setSyringeSize] = useState<0.3 | 0.5 | 1>(0.5); // mL insulin syringe
  const [unitsPerML, setUnitsPerML] = useState(100); // U100 standard

  const result = useMemo(() => {
    const vialMcg = vialMass * 1000;
    const concentrationMcgPerML = vialMcg / bacWater;
    const concentrationMcgPerUnit = concentrationMcgPerML / unitsPerML;
    const unitsForDose = doseMass / concentrationMcgPerUnit;
    const mlForDose = doseMass / concentrationMcgPerML;
    const dosesPerVial = vialMcg / doseMass;
    const syringeMaxUnits = syringeSize * unitsPerML;
    const fitsInSyringe = unitsForDose <= syringeMaxUnits;
    return {
      concentrationMcgPerML, concentrationMcgPerUnit, unitsForDose,
      mlForDose, dosesPerVial, syringeMaxUnits, fitsInSyringe,
    };
  }, [vialMass, bacWater, doseMass, syringeSize, unitsPerML]);

  return (
    <div className="not-prose rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Vial mass (mg)</span>
          <input type="number" min={0.1} step={0.5} value={vialMass}
            onChange={(e) => setVialMass(Math.max(0.1, +e.target.value || 0.1))}
            className="rounded-md border border-slate-300 px-3 py-2" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Bacteriostatic water added (mL)</span>
          <input type="number" min={0.5} step={0.5} value={bacWater}
            onChange={(e) => setBacWater(Math.max(0.5, +e.target.value || 0.5))}
            className="rounded-md border border-slate-300 px-3 py-2" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Target dose (mcg)</span>
          <input type="number" min={1} value={doseMass}
            onChange={(e) => setDoseMass(Math.max(1, +e.target.value || 1))}
            className="rounded-md border border-slate-300 px-3 py-2" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Insulin syringe size</span>
          <select value={syringeSize} onChange={(e) => setSyringeSize(+e.target.value as any)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2">
            <option value={0.3}>0.3 mL (30 units max)</option>
            <option value={0.5}>0.5 mL (50 units max)</option>
            <option value={1}>1.0 mL (100 units max)</option>
          </select>
        </label>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <dt className="text-slate-500">Concentration after reconstitution</dt>
        <dd className="font-medium text-slate-900">
          {result.concentrationMcgPerML.toFixed(0)} mcg/mL ({result.concentrationMcgPerUnit.toFixed(2)} mcg/unit)
        </dd>
        <dt className="text-slate-500">Units to draw on syringe</dt>
        <dd className={`font-medium ${result.fitsInSyringe ? "text-emerald-700" : "text-rose-700"}`}>
          {result.unitsForDose.toFixed(1)} units {result.fitsInSyringe ? "" : "(exceeds syringe — adjust)"}
        </dd>
        <dt className="text-slate-500">Volume drawn</dt>
        <dd className="font-medium text-slate-900">{result.mlForDose.toFixed(3)} mL</dd>
        <dt className="text-slate-500">Doses per vial</dt>
        <dd className="font-medium text-slate-900">{result.dosesPerVial.toFixed(1)}</dd>
      </dl>

      <p className="mt-4 text-xs text-slate-500">
        Reconstituted peptides are typically stable refrigerated for 28 days post-reconstitution. Use bacteriostatic water (0.9% benzyl alcohol) for multi-dose vials; sterile water for single-use only. Confirm dose math with your prescriber before injection.
      </p>
    </div>
  );
}
