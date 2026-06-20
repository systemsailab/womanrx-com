import { ArticleExplorer, type ExplorerArticle } from "@/components/ArticleExplorer";
import { ArticleMediaHeader } from "@/components/ArticleMediaHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getAllArticles } from "@/lib/content";

export const dynamic = "force-static";
export const revalidate = false;

const BASE = "https://womanrx.com";

export const metadata = {
  title: "WomanRx.com Blog | Clinical Guides on GLP-1, HRT, Peptides, and Labs",
  description:
    "Browse the latest WomanRx.com clinical articles on GLP-1 medicine, hormone therapy, peptides, labs, costs, coverage, side effects, and dosing.",
  alternates: { canonical: `${BASE}/blog` },
  openGraph: {
    type: "website",
    title: "WomanRx.com Blog",
    description:
      "Clinically reviewed guides on GLP-1 medicine, hormone therapy, peptides, labs, costs, coverage, side effects, and dosing.",
    url: `${BASE}/blog`,
    siteName: "WomanRx.com",
  },
};

function articleCategory(slug: string, title: string, topic: string) {
  const text = `${topic} ${slug} ${title}`.toLowerCase();
  if (/glp|semaglutide|tirzepatide|ozempic|wegovy|mounjaro|zepbound|rybelsus|saxenda/.test(text)) return "GLP-1";
  if (/hrt|trt|testosterone|estradiol|progesterone|menopause|androgel|enclomiphene/.test(text)) return "HRT";
  if (/peptide|bpc|cjc|ipamorelin|sermorelin|tesamorelin|tb-500|ghk|aod-9604|mots-c/.test(text)) return "Peptides";
  if (/lab|hba1c|ldl|hdl|cmp|cbc|apob|egfr|tsh|free-t4|free-t3/.test(text)) return "Labs";
  if (/cost|copay|coverage|insurance|medicare|medicaid|aetna|cigna|blue-cross|va-coverage|access/.test(text)) return "Access";
  if (/side-effect|safety|warning|contraindication|risk|pregnancy|renal|hepatic|geriatric|adolescent/.test(text)) return "Safety";
  if (/dose|dosing|titration|missed-dose|schedule|monitoring/.test(text)) return "Dosing";
  if (/vs|compare|switching|alternative/.test(text)) return "Comparisons";
  return "Clinical Guides";
}

function toExplorerArticle(a: ReturnType<typeof getAllArticles>[number]): ExplorerArticle {
  return {
    title: a.title,
    description: a.description,
    url: `/${a.topic}/${a.slug}`,
    topic: a.topic,
    lastReviewed: a.lastReviewed,
    keywords: a.keywords,
    categories: [articleCategory(a.slug, a.title, a.topic)],
  };
}

export default function BlogPage() {
  const allArticles = getAllArticles();
  const articles = [...allArticles]
    .sort((a, b) => (b.lastReviewed || b.dateModified || "").localeCompare(a.lastReviewed || a.dateModified || ""))
    .slice(0, 900);

  const featured = articles.slice(0, 3);
  const latestReview = articles[0]?.lastReviewed || "Current";
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${BASE}/blog`,
        url: `${BASE}/blog`,
        name: "WomanRx.com Blog",
        description: "Clinically reviewed WomanRx.com articles and guides.",
        isPartOf: { "@id": `${BASE}/#website` },
        publisher: { "@id": `${BASE}/#organization` },
        blogPost: featured.map((article) => ({
          "@type": "BlogPosting",
          headline: article.title,
          url: `${BASE}/${article.topic}/${article.slug}`,
          dateModified: article.dateModified || article.lastReviewed,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <main className="content-hub blog-index">
        <section className="content-hero is-compact">
          <div className="content-hero-inner">
            <Breadcrumbs
              items={[
                { name: "Home", url: `${BASE}/` },
                { name: "Blog", url: `${BASE}/blog` },
              ]}
            />
            <p className="content-eyebrow">WomanRx.com Blog</p>
            <h1>Clinical guides, organized for real decisions</h1>
            <p className="content-hero-copy">
              Search the latest WomanRx.com articles on GLP-1 medicine, hormone therapy, peptides, labs, costs, coverage, side effects, and dosing.
            </p>
            <ArticleMediaHeader topic="clinical" slug="blog" title="Clinical guides, organized for real decisions" />
            <div className="content-stats" aria-label="Blog statistics">
              <div>
                <strong>{allArticles.length.toLocaleString()}</strong>
                <span>clinical articles</span>
              </div>
              <div>
                <strong>8</strong>
                <span>core categories</span>
              </div>
              <div>
                <strong>{latestReview}</strong>
                <span>latest review</span>
              </div>
            </div>
          </div>
        </section>

        <ArticleExplorer
          articles={articles.map(toExplorerArticle)}
          heading="Latest clinical articles"
        />
      </main>
    </>
  );
}
