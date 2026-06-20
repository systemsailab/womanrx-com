import type { Metadata } from "next";
import { ProductPage, type ProductSpec } from "@/components/ProductPage";
import { C } from "@/lib/design";

export const metadata: Metadata = {
  title: "Semaglutide · The Foundation Compound",
  description:
    "A weekly GLP-1 receptor agonist, compounded under Section 503A. Documented 14.9% average weight loss at 68 weeks in STEP-1. From $99/mo.",
};

const SPEC: ProductSpec = {
  tag: "Foundation · No. 01",
  name: "Compounded Semaglutide",
  descriptor: "a once-weekly GLP-1 receptor agonist",
  volume: "0.25 MG → 2.4 MG · 4-week vial supply",
  first: "99/mo",
  recurring: "99/mo",
  daily: "$3.30",
  brandDaily: "$45",
  bandColor: C.forest,
  bandColorDeep: C.forestDeep,
  bandColorLight: C.forestLight,
  brand: "Wegovy",
  photo: "/photo/vial-sema.jpg",
  intro:
    "Semaglutide is the first GLP-1 weight-management compound to enter wide clinical use. It is the active molecule in branded Wegovy® and Ozempic®. The WomanRx.com preparation is compounded by a licensed pharmacy under Section 503A on a valid, patient-specific prescription.",
  mechanism:
    "Semaglutide is a long-acting synthetic analog of human GLP-1, the gut hormone released after a meal. By binding to the GLP-1 receptor, it slows gastric emptying, amplifies the body's satiety signaling in the hypothalamus, and improves glucose-dependent insulin secretion. The result is reduced appetite, quieter food noise, and gradual sustained weight loss.",
  doseLadder: [
    { week: "Weeks 01–04", dose: "0.25 mg / week", note: "Initiation. Lowest dose, designed to acclimate the gut." },
    { week: "Weeks 05–08", dose: "0.5 mg / week", note: "First dose escalation. Most appetite changes start here." },
    { week: "Weeks 09–12", dose: "1.0 mg / week", note: "Provider check-in. Re-evaluate tolerance and response." },
    { week: "Weeks 13–16", dose: "1.7 mg / week", note: "Therapeutic dose for many patients." },
    { week: "Weeks 17+", dose: "2.4 mg / week", note: "Maintenance dose, only if tolerated and clinically appropriate." },
  ],
  outcomes: [
    { stat: "14.9%", label: "average body-weight loss at 68 weeks", cite: "STEP-1, NEJM 2021" },
    { stat: "86%", label: "of participants lost ≥5% body weight", cite: "STEP-1, NEJM 2021" },
    { stat: "32%", label: "reduction in major adverse cardiovascular events (SELECT)", cite: "SELECT, NEJM 2023" },
  ],
  sideEffects: {
    common: [
      "Nausea (most common during titration)",
      "Diarrhea or constipation",
      "Decreased appetite (the therapeutic effect)",
      "Mild headache, fatigue",
      "Burping, indigestion",
    ],
    serious: [
      "Pancreatitis (rare)",
      "Gallbladder disease",
      "Hypoglycemia (especially with other diabetes medications)",
      "Possible thyroid C-cell tumors (animal studies in rats; relevance to humans unknown)",
    ],
  },
  whoFor: [
    "Adults with BMI ≥ 30, or BMI ≥ 27 with a weight-related condition",
    "Patients new to GLP-1 therapy",
    "Patients seeking the most studied compound in the category",
  ],
  whoNot: [
    "Personal or family history of medullary thyroid carcinoma",
    "Multiple Endocrine Neoplasia syndrome type 2 (MEN-2)",
    "History of severe pancreatitis",
    "Pregnant or breastfeeding",
    "Severe gastrointestinal disease",
  ],
  citations: [
    { name: "Wilding et al. — Once-weekly semaglutide in adults with overweight or obesity (STEP-1) — NEJM 2021", href: "https://www.nejm.org/doi/full/10.1056/NEJMoa2032183" },
    { name: "Davies et al. — STEP-2: semaglutide in adults with type 2 diabetes — Lancet 2021", href: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(21)00213-0/fulltext" },
    { name: "Lincoff et al. — SELECT trial: semaglutide and cardiovascular outcomes in obesity — NEJM 2023", href: "https://www.nejm.org/doi/full/10.1056/NEJMoa2307563" },
    { name: "FDA Prescribing Information — Wegovy / Ozempic (semaglutide)", href: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/215256s000lbl.pdf" },
  ],
};

export default function SemaglutidePage() {
  return <ProductPage p={SPEC} />;
}
