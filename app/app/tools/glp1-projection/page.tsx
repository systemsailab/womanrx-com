import type { Metadata } from "next";
import Link from "next/link";
import { ArticleMediaHeader } from "@/components/ArticleMediaHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Glp1Projector } from "@/components/calculators/Glp1Projector";

export const metadata: Metadata = {
  title: "GLP-1 Weight Loss Projection Calculator | WomanRx.com",
  description:
    "Project expected weight loss on Wegovy, Zepbound, Mounjaro, or Saxenda based on published trial data (STEP-1, SURMOUNT-1, SCALE). Free interactive tool reviewed by the WomanRx.com Medical Team.",
  alternates: { canonical: "https://womanrx.com/tools/glp1-projection" },
};

const APP_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "GLP-1 Weight Loss Projection Calculator",
  url: "https://womanrx.com/tools/glp1-projection",
  applicationCategory: "MedicalApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  about: { "@type": "MedicalCondition", name: "Obesity" },
  publisher: { "@id": "https://womanrx.com/#organization", "@type": "MedicalOrganization", name: "WomanRx.com" },
  isAccessibleForFree: true,
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />
      <header className="mb-8">
        <Breadcrumbs
          items={[
            { name: "Home", url: "https://womanrx.com/" },
            { name: "Tools", url: "https://womanrx.com/tools/glp1-projection" },
            { name: "GLP-1 Projection", url: "https://womanrx.com/tools/glp1-projection" },
          ]}
        />
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          GLP-1 Weight Loss Projection Calculator
        </h1>
        <p className="mt-3 text-slate-700">
          Estimate expected weight loss on a GLP-1 weight-loss medication based on the
          published clinical trial that established its efficacy. Adjusts for BMI category
          based on subgroup data. Educational tool, not a substitute for individual
          medical advice.
        </p>
        <ArticleMediaHeader topic="glp-1" slug="glp1-projection" title="GLP-1 Weight Loss Projection Calculator" />
      </header>

      <Glp1Projector />

      <section className="prose prose-slate mt-10 max-w-none">
        <h2>What this tool calculates</h2>
        <p>
          For each medication, the projection anchors to the mean weight loss observed in the
          pivotal randomized controlled trial at the trial-defined endpoint. For semaglutide
          2.4 mg, that is 14.9% mean body-weight loss at week 68 in{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/33567185/" target="_blank" rel="noopener">STEP-1 (Wilding et al., NEJM 2021)</a>.
          For tirzepatide 15 mg, it is 20.9% mean loss at week 72 in{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/35658024/" target="_blank" rel="noopener">SURMOUNT-1 (Jastreboff et al., NEJM 2022)</a>.
          A modest BMI-category factor is applied because higher starting BMI was associated
          with slightly larger relative weight loss in pre-specified subgroup analyses.
        </p>

        <h2>What this tool does not predict</h2>
        <p>
          Individual response is highly variable. Roughly one-third of patients in STEP-1
          lost more than 20% body weight; another third lost between 5% and 10%; a minority
          lost less than 5%. Side-effect tolerance, dose escalation pace, adherence, and
          baseline metabolic profile all materially affect outcome. Discontinuation is
          followed by substantial weight regain (STEP-1 extension data: ~two-thirds of the
          loss regained within 1 year of stopping).
        </p>

        <h2>Methods note</h2>
        <p>
          The week-by-week projection assumes a linear ramp to the trial-defined peak. Real
          trial curves are slightly concave (faster early loss, plateau by month 9-12), but
          the linear approximation is well within the trial's reported variance for
          patient-level counseling purposes.
        </p>
      </section>

      <p className="mt-8 text-sm text-slate-500">
        Last medically reviewed{" "}
        <time dateTime="2026-05-23">May 23, 2026</time>{" "}
        by the WomanRx.com Medical Team.
      </p>
      <nav className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-emerald-800" aria-label="Related WomanRx.com resources">
        <Link href="/glp-1">GLP-1 library</Link>
        <Link href="/semaglutide">Compounded semaglutide</Link>
        <Link href="/tirzepatide">Compounded tirzepatide</Link>
        <Link href="/blog">Clinical guides</Link>
      </nav>
    </main>
  );
}
