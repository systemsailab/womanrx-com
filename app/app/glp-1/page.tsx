import type { Metadata } from "next";
import { PillarPage, type PillarConfig } from "@/lib/pillars";

export const dynamic = "force-static";
export const revalidate = false;

const config: PillarConfig = {
  slug: "glp-1",
  title: "GLP-1 Medicine",
  description:
    "Evidence-based guidance on semaglutide, tirzepatide, GLP-1 access, insurance coverage, side effects, dosing, weight-loss outcomes, diabetes care, and real-world safety.",
  topicPatterns: [/glp/i, /semaglutide/i, /tirzepatide/i, /ozempic/i, /wegovy/i, /mounjaro/i, /zepbound/i, /rybelsus/i, /saxenda/i, /liraglutide/i],
  priorityTerms: /semaglutide|tirzepatide|ozempic|wegovy|mounjaro|zepbound/i,
  sections: [
    { title: "Core GLP-1 Drugs", description: "Semaglutide, tirzepatide, oral GLP-1s, branded options, compounded-equivalent explainers, and clinical comparisons.", pattern: /semaglutide|tirzepatide|ozempic|wegovy|mounjaro|zepbound|rybelsus/i, exclude: /access|coverage|cost|copay|coupon|insurance|medicare|medicaid|patient-assistance|va-coverage|manufacturer/i },
    { title: "Access and Coverage", description: "Insurance, state access, Medicare, Medicaid, copay programs, out-of-pocket cost, and pharmacy logistics.", pattern: /access|coverage|cost|insurance|medicare|medicaid|aetna|cigna|blue-cross/i },
    { title: "Side Effects and Safety", description: "GI effects, gallbladder risk, pancreatitis signals, discontinuation, switching, monitoring, and when to call a clinician.", pattern: /side-effects|nausea|vomiting|diarrhea|constipation|gallbladder|pancreatitis/i },
  ],
};

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: "https://womenrx.com/glp-1" },
};

export default function Page() {
  return <PillarPage config={config} />;
}
