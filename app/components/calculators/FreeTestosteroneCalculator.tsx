"use client";
/**
 * Free Testosterone Calculator (Vermeulen et al. method).
 *
 * Uses the Vermeulen calculation, which estimates free T from total T,
 * SHBG, and albumin. This is the most widely-cited indirect method,
 * validated against the equilibrium-dialysis reference method.
 *
 * Reference: Vermeulen A, Verdonck L, Kaufman JM. A critical evaluation
 * of simple methods for the estimation of free testosterone in serum.
 * J Clin Endocrinol Metab. 1999;84(10):3666-72.
 * https://pubmed.ncbi.nlm.nih.gov/10523012/
 */
import { useMemo, useState } from "react";

// Vermeulen constants
const KT  = 1.0e9;     // testosterone-SHBG affinity (L/mol)
const KAT = 3.6e4;     // testosterone-albumin affinity (L/mol)

function nmolToNg(nmol: number) { return nmol * 28.84; } // T: 1 nmol/L = 28.84 ng/dL
function ngToNmol(ng: number) { return ng / 28.84; }

function calcFreeT(totalT_nmolL: number, shbg_nmolL: number, albumin_gL: number) {
  // convert albumin g/L -> mol/L (albumin MW ~66500)
  const albMol = albumin_gL / 66500;
  const N = KAT * albMol + 1;
  const a = N * KT;
  const b = N + KT * (shbg_nmolL * 1e-9 - totalT_nmolL * 1e-9);
  const c = -totalT_nmolL * 1e-9;
  const freeT_M = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
  const freeT_nmolL = freeT_M * 1e9;
  const bioT_nmolL = freeT_nmolL * N;  // free + albumin-bound
  return { freeT_nmolL, bioT_nmolL };
}

function interpret(freeT_pgmL: number) {
  if (freeT_pgmL >= 80)  return { label: "Normal (upper)", color: "text-emerald-700" };
  if (freeT_pgmL >= 50)  return { label: "Normal (mid)",   color: "text-emerald-700" };
  if (freeT_pgmL >= 30)  return { label: "Low normal",      color: "text-amber-700" };
  return { label: "Below reference range (likely hypogonadal range)", color: "text-rose-700" };
}

export function FreeTestosteroneCalculator() {
  const [totalUnit, setTotalUnit] = useState<"ng/dL" | "nmol/L">("ng/dL");
  const [total, setTotal] = useState(500);
  const [shbg, setShbg] = useState(30);   // nmol/L
  const [albumin, setAlbumin] = useState(43); // g/L

  const result = useMemo(() => {
    const totalNmol = totalUnit === "ng/dL" ? ngToNmol(total) : total;
    const { freeT_nmolL, bioT_nmolL } = calcFreeT(totalNmol, shbg, albumin);
    // pg/mL = nmol/L × 288.42 for testosterone
    const freeT_pgmL = freeT_nmolL * 288.42;
    const bioT_ngdL = nmolToNg(bioT_nmolL);
    const pctFree = (freeT_nmolL / totalNmol) * 100;
    return { totalNmol, freeT_nmolL, freeT_pgmL, bioT_ngdL, pctFree };
  }, [total, totalUnit, shbg, albumin]);

  const interp = interpret(result.freeT_pgmL);

  return (
    <div className="not-prose rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Total testosterone</span>
          <div className="flex gap-2">
            <input type="number" min={0} value={total}
              onChange={(e) => setTotal(Math.max(0, +e.target.value || 0))}
              className="flex-1 rounded-md border border-slate-300 px-3 py-2" />
            <select value={totalUnit} onChange={(e) => setTotalUnit(e.target.value as any)}
              className="rounded-md border border-slate-300 bg-white px-3 py-2">
              <option value="ng/dL">ng/dL</option>
              <option value="nmol/L">nmol/L</option>
            </select>
          </div>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">SHBG (nmol/L)</span>
          <input type="number" min={0} value={shbg}
            onChange={(e) => setShbg(Math.max(0, +e.target.value || 0))}
            className="rounded-md border border-slate-300 px-3 py-2" />
        </label>
        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-sm font-medium text-slate-700">Albumin (g/L) — default 43 if unknown</span>
          <input type="number" min={0} value={albumin}
            onChange={(e) => setAlbumin(Math.max(0, +e.target.value || 0))}
            className="rounded-md border border-slate-300 px-3 py-2" />
        </label>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <dt className="text-slate-500">Free testosterone</dt>
        <dd className={`font-medium ${interp.color}`}>
          {result.freeT_pgmL.toFixed(1)} pg/mL ({result.freeT_nmolL.toFixed(3)} nmol/L)
        </dd>
        <dt className="text-slate-500">Bioavailable testosterone</dt>
        <dd className="font-medium text-slate-900">{result.bioT_ngdL.toFixed(0)} ng/dL</dd>
        <dt className="text-slate-500">Free fraction</dt>
        <dd className="font-medium text-slate-900">{result.pctFree.toFixed(2)}%</dd>
        <dt className="text-slate-500">Interpretation</dt>
        <dd className={`font-medium ${interp.color}`}>{interp.label}</dd>
      </dl>

      <p className="mt-4 text-xs text-slate-500">
        Calculated using the Vermeulen equation. Reference ranges vary by lab and assay; correlate with clinical symptoms and morning collection (≥2 measurements) for hypogonadism diagnosis.
      </p>
    </div>
  );
}
