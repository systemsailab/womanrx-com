import type { Metadata } from "next";
import { ProductPage, type ProductSpec } from "@/components/ProductPage";
import { C } from "@/lib/design";

export const metadata: Metadata = {
  title: "Tirzepatide · The Advanced Compound",
  description:
    "A dual-incretin (GLP-1 + GIP) weekly injection, compounded under Section 503A. Documented 20.9% average weight loss at 72 weeks in SURMOUNT-1. From $149/mo.",
};

const SPEC: ProductSpec = {
  tag: "Advanced · No. 02",
  name: "Compounded Tirzepatide",
  descriptor: "a dual-incretin once-weekly injection",
  volume: "2.5 MG → 15 MG · 4-week vial supply",
  first: "149/mo",
  recurring: "149/mo",
  daily: "$4.97",
  brandDaily: "$45",
  bandColor: C.terracotta,
  bandColorDeep: C.terracottaDeep,
  bandColorLight: C.terracottaLight,
  brand: "Zepbound",
  photo: "/photo/vial-tirz.jpg",
  intro:
    "Tirzepatide is the most effective pharmacological weight-management compound ever to clear a phase-3 trial. It engages two appetite hormones — GLP-1 and GIP — rather than one, producing larger and more durable weight loss than any single-agonist GLP-1.",
  mechanism:
    "Tirzepatide is a synthetic peptide that simultaneously activates two receptors: GLP-1 (glucagon-like peptide-1) and GIP (glucose-dependent insulinotropic polypeptide). The combined agonism slows gastric emptying, suppresses appetite via central pathways in the hypothalamus, improves insulin sensitivity, and reduces food noise. The dual mechanism is what produces the larger weight-loss effect compared with single-receptor GLP-1s like semaglutide.",
  doseLadder: [
    { week: "Weeks 01–04", dose: "2.5 mg / week", note: "Initiation. Most people feel nothing or mild nausea." },
    { week: "Weeks 05–08", dose: "5.0 mg / week", note: "Appetite suppression becomes noticeable." },
    { week: "Weeks 09–12", dose: "7.5 mg / week", note: "First provider check-in. Re-evaluate fit." },
    { week: "Weeks 13–16", dose: "10.0 mg / week", note: "Most patients hold here as the working dose." },
    { week: "Weeks 17+", dose: "12.5–15 mg / week", note: "Therapeutic maximum, only if tolerated and clinically appropriate." },
  ],
  outcomes: [
    { stat: "20.9%", label: "average body-weight loss at 72 weeks (15 mg cohort)", cite: "SURMOUNT-1, NEJM 2022" },
    { stat: "57%", label: "of participants achieved ≥20% body-weight loss", cite: "SURMOUNT-1, NEJM 2022" },
    { stat: "94%", label: "reduction in progression from pre-diabetes to type-2 diabetes", cite: "SURMOUNT-1 sub-analysis" },
  ],
  sideEffects: {
    common: [
      "Nausea (most common during titration)",
      "Constipation",
      "Diarrhea",
      "Decreased appetite (the therapeutic effect)",
      "Fatigue, mild headache",
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
    "Patients who have not responded to lifestyle changes alone",
    "Patients seeking the most effective available compound",
  ],
  whoNot: [
    "Personal or family history of medullary thyroid carcinoma",
    "Multiple Endocrine Neoplasia syndrome type 2 (MEN-2)",
    "History of severe pancreatitis",
    "Pregnant or breastfeeding",
    "Severe gastrointestinal disease",
  ],
  citations: [
    { name: "Jastreboff et al. — Tirzepatide once weekly for the treatment of obesity (SURMOUNT-1) — NEJM 2022", href: "https://www.nejm.org/doi/full/10.1056/NEJMoa2206038" },
    { name: "Garvey et al. — Tirzepatide once weekly for chronic weight management (SURMOUNT-2) — Lancet 2023", href: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(23)01200-X/fulltext" },
    { name: "Wadden et al. — SURMOUNT-3: tirzepatide after intensive lifestyle intervention — Nature Medicine 2023", href: "https://www.nature.com/articles/s41591-023-02597-w" },
    { name: "FDA Prescribing Information — Mounjaro / Zepbound (tirzepatide)", href: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/217806s000lbl.pdf" },
  ],
};

export default function TirzepatidePage() {
  return <ProductPage p={SPEC} />;
}
