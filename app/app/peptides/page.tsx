import type { Metadata } from "next";
import { PillarPage, type PillarConfig } from "@/lib/pillars";

export const dynamic = "force-static";
export const revalidate = false;

const config: PillarConfig = {
  slug: "peptides",
  title: "Peptide Medicine",
  description:
    "Evidence-graded peptide medicine resources covering BPC-157, CJC-1295, ipamorelin, TB-500, sermorelin, tesamorelin, safety, access, monitoring, and protocol design.",
  topicPatterns: [/peptide/i, /bpc-157/i, /cjc-1295/i, /ipamorelin/i, /tb-500/i, /sermorelin/i, /tesamorelin/i, /ghk-cu/i, /aod-9604/i, /mots-c/i],
  priorityTerms: /bpc-157|cjc-1295|ipamorelin|tb-500|sermorelin|tesamorelin|peptide/i,
  sections: [
    { title: "Performance and Recovery", description: "BPC-157, TB-500, tendon recovery, post-surgical protocols, injury questions, and evidence tradeoffs.", pattern: /bpc-157|tb-500|recovery|tendinopathy|post-surgical|performance/i, exclude: /access|coverage|cost|copay|insurance|medicare|medicaid|patient-assistance|manufacturer/i },
    { title: "Growth Hormone Axis", description: "CJC-1295, ipamorelin, sermorelin, tesamorelin, MK-677, IGF-1 effects, and monitoring.", pattern: /cjc-1295|ipamorelin|sermorelin|tesamorelin|mk-677|growth-hormone/i, exclude: /access|coverage|cost|copay|insurance|medicare|medicaid|patient-assistance|manufacturer/i },
    { title: "Safety and Monitoring", description: "Drug interactions, renal and hepatic considerations, pregnancy, adverse effects, and clinical guardrails.", pattern: /safety|monitoring|side-effects|drug-drug|renal|hepatic|pregnancy/i },
  ],
};

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: "https://womenrx.com/peptides" },
};

export default function Page() {
  return <PillarPage config={config} />;
}
