import type { Metadata } from "next";
import Link from "next/link";
import { ArticleMediaHeader } from "@/components/ArticleMediaHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FreeTestosteroneCalculator } from "@/components/calculators/FreeTestosteroneCalculator";

export const metadata: Metadata = {
  title: "Free Testosterone Calculator (Vermeulen Method) | WomanRx.com",
  description:
    "Calculate free and bioavailable testosterone from total T, SHBG, and albumin using the Vermeulen equation. Free clinical tool reviewed by the WomanRx.com Medical Team.",
  alternates: { canonical: "https://womenrx.com/tools/free-testosterone" },
};

const APP_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Testosterone Calculator",
  url: "https://womenrx.com/tools/free-testosterone",
  applicationCategory: "MedicalApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  about: { "@type": "MedicalCondition", name: "Male hypogonadism" },
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
            { name: "Tools", url: "https://womenrx.com/tools/free-testosterone" },
            { name: "Free Testosterone", url: "https://womenrx.com/tools/free-testosterone" },
          ]}
        />
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          Free Testosterone Calculator (Vermeulen Method)
        </h1>
        <p className="mt-3 text-slate-700">
          Calculate free and bioavailable testosterone from total T, SHBG, and albumin using
          the Vermeulen equation, the most widely-cited indirect method, validated against
          equilibrium dialysis.
        </p>
        <ArticleMediaHeader topic="hrt" slug="free-testosterone" title="Free Testosterone Calculator" />
      </header>

      <FreeTestosteroneCalculator />

      <section className="prose prose-slate mt-10 max-w-none">
        <h2>Why free testosterone matters more than total</h2>
        <p>
          Only ~2% of circulating testosterone is freely bioavailable. The remainder is
          either tightly bound to SHBG (sex hormone-binding globulin) and biologically inert,
          or loosely bound to albumin and bioavailable. Men with normal total T but high SHBG
          can be functionally hypogonadal, while men with low total T and low SHBG may have
          normal free T. The Endocrine Society explicitly recommends calculated free T when
          SHBG abnormalities are suspected.
        </p>

        <h2>The Vermeulen equation</h2>
        <p>
          Vermeulen, Verdonck, and Kaufman (J Clin Endocrinol Metab 1999) compared simple
          calculation methods against equilibrium dialysis and found the law-of-mass-action
          formulation using SHBG and albumin matched the reference method within ~10%. It
          uses two affinity constants: K(T-SHBG) ≈ 1.0×10⁹ L/mol and K(T-Albumin) ≈
          3.6×10⁴ L/mol. The calculation here uses those constants and a default albumin of
          43 g/L when an actual value is not entered.
        </p>

        <h2>Interpretation thresholds</h2>
        <p>
          Reference ranges vary by lab. A commonly-cited threshold for biochemical
          hypogonadism is free T below 50–65 pg/mL alongside total T &lt;264–300 ng/dL and
          consistent symptoms. Use clinical judgment in combination with ≥2 morning measurements.
        </p>

        <h2>Source</h2>
        <p>
          Vermeulen A, Verdonck L, Kaufman JM.{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/10523012/" target="_blank" rel="noopener">
            A critical evaluation of simple methods for the estimation of free testosterone in serum.
          </a>{" "}
          J Clin Endocrinol Metab. 1999;84(10):3666-72.
        </p>
      </section>

      <p className="mt-8 text-sm text-slate-500">
        Last medically reviewed{" "}
        <time dateTime="2026-05-23">May 23, 2026</time>{" "}
        by the WomanRx.com Medical Team.
      </p>
      <nav className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-emerald-800" aria-label="Related WomanRx.com resources">
        <Link href="/hrt">HRT and hormone medicine</Link>
        <Link href="/mens-trt">Men's TRT articles</Link>
        <Link href="/blog">Clinical guides</Link>
      </nav>
    </main>
  );
}
