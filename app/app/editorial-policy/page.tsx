import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Editorial Policy and Medical Review",
  description:
    "WomanRx.com editorial standards for clinically reviewed medical content, sourcing, corrections, conflicts of interest, author credentials, and update cadence.",
  alternates: { canonical: "https://womanrx.com/editorial-policy" },
};

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://womanrx.com/editorial-policy#webpage",
      url: "https://womanrx.com/editorial-policy",
      name: "WomanRx.com Editorial Policy and Medical Review",
      description: metadata.description,
      isPartOf: { "@id": "https://womanrx.com/#website" },
      publisher: { "@id": "https://womanrx.com/#organization" },
      reviewedBy: { "@id": "https://womanrx.com/authors/womanrx-medical-team#person" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://womanrx.com/" },
        { "@type": "ListItem", position: 2, name: "Editorial Policy", item: "https://womanrx.com/editorial-policy" },
      ],
    },
  ],
};

export default function EditorialPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      <Breadcrumbs
        items={[
          { name: "Home", url: "https://womanrx.com/" },
          { name: "Editorial Policy", url: "https://womanrx.com/editorial-policy" },
        ]}
      />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950">
        Editorial Policy and Medical Review
      </h1>
      <p className="mt-4 text-lg leading-8 text-slate-700">
        WomanRx.com publishes medical content for patients and clinicians making decisions about GLP-1 medications, hormone therapy, peptide medicine, labs, safety, access, and treatment logistics. Our standard is simple: claims must be clear enough for a patient, specific enough for a clinician, and traceable enough for an auditor.
      </p>

      <section className="mt-10 space-y-8">
        <Policy title="Clinical Review">
          Every medical article is reviewed by the WomanRx.com Medical Team before publication. Review checks include indication accuracy, contraindications, dosing language, risk framing, citation quality, and whether the article distinguishes approved uses from off-label or investigational use.
        </Policy>
        <Policy title="Sources">
          We prioritize FDA labels, PubMed-indexed clinical trials, major society guidelines, prescribing information, clinical trial registries, and government or academic sources. Commercial sources may be used for pricing or access context, but not as the basis for medical claims.
        </Policy>
        <Policy title="Freshness">
          Each article displays a last-reviewed date. Content is re-reviewed when major labels, guidelines, safety communications, or pivotal trials change the clinical interpretation. High-risk medication and safety pages are prioritized for faster review.
        </Policy>
        <Policy title="Conflicts and Commercial Separation">
          Editorial content is educational. It does not guarantee prescription approval, medical eligibility, insurance coverage, or dispensing. Commercial product pages and editorial medical articles are treated as separate surfaces with different review expectations.
        </Policy>
        <Policy title="Corrections">
          If an error is identified, WomanRx.com corrects the page, updates the modified date when the correction is material, and prioritizes safety-related corrections first. Readers can report issues at support@womanrx.com.
        </Policy>
      </section>
    </main>
  );
}

function Policy({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
      <p className="mt-2 leading-7 text-slate-700">{children}</p>
    </section>
  );
}
