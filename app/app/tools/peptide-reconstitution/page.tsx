import type { Metadata } from "next";
import Link from "next/link";
import { ArticleMediaHeader } from "@/components/ArticleMediaHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PeptideReconstitution } from "@/components/calculators/PeptideReconstitution";

export const metadata: Metadata = {
  title: "Peptide Reconstitution Calculator (BAC Water Math) | WomanRx.com",
  description:
    "Calculate exact insulin-syringe units for any peptide dose given vial mass and bacteriostatic water volume. Eliminates the most common reconstitution math errors.",
  alternates: { canonical: "https://womenrx.com/tools/peptide-reconstitution" },
};

const APP_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Peptide Reconstitution Calculator",
  url: "https://womenrx.com/tools/peptide-reconstitution",
  applicationCategory: "MedicalApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": "https://womenrx.com/#organization", "@type": "MedicalOrganization", name: "WomanRx.com" },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />
      <header className="mb-8">
        <Breadcrumbs
          items={[
            { name: "Home", url: "https://womenrx.com/" },
            { name: "Tools", url: "https://womenrx.com/tools/peptide-reconstitution" },
            { name: "Peptide Reconstitution", url: "https://womenrx.com/tools/peptide-reconstitution" },
          ]}
        />
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          Peptide Reconstitution Calculator
        </h1>
        <p className="mt-3 text-slate-700">
          The reliable way to translate a peptide dose into the exact number of units on
          your insulin syringe, accounting for vial mass, reconstitution volume, and
          syringe capacity.
        </p>
        <ArticleMediaHeader topic="peptides" slug="peptide-reconstitution" title="Peptide Reconstitution Calculator" />
      </header>

      <PeptideReconstitution />

      <section className="prose prose-slate mt-10 max-w-none">
        <h2>How the math works</h2>
        <p>
          A typical peptide vial (e.g., 5 mg BPC-157) reconstituted with 2 mL of bacteriostatic
          water yields 2,500 mcg/mL. On a U100 insulin syringe (100 units = 1 mL), that
          equals 25 mcg per unit. For a 250 mcg dose, draw 10 units. The calculator above
          handles any vial / water / dose / syringe combination.
        </p>
        <h2>Practical pointers</h2>
        <ul>
          <li>Reconstitute with bacteriostatic water (0.9% benzyl alcohol) for any vial intended for multiple doses; sterile water is single-use only.</li>
          <li>After reconstitution, refrigerate at 2–8°C; most peptides are stable for 28 days reconstituted.</li>
          <li>If your calculated units exceed the syringe capacity, add more BAC water to dilute (e.g., go from 2 mL to 3 mL of BAC water).</li>
          <li>Air shipment of unreconstituted (lyophilized) peptides is generally acceptable at controlled room temperature for &lt;72 hours; reconstituted vials require cold-chain.</li>
        </ul>
      </section>

      <p className="mt-8 text-sm text-slate-500">
        Educational tool. Confirm dosing with your prescriber and pharmacy. Last medically reviewed{" "}
        <time dateTime="2026-05-23">May 23, 2026</time>{" "}
        by the WomanRx.com Medical Team.
      </p>
      <nav className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-emerald-800" aria-label="Related WomanRx.com resources">
        <Link href="/peptides">Peptide medicine library</Link>
        <Link href="/glp-1-questions/what-are-peptides-types-benefits-uses-in-medicine">What are peptides?</Link>
        <Link href="/blog">Clinical guides</Link>
      </nav>
    </main>
  );
}
