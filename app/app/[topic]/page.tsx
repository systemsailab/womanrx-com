import { permanentRedirect } from "next/navigation";
import { ArticleExplorer, type ExplorerArticle } from "@/components/ArticleExplorer";
import { ArticleMediaHeader } from "@/components/ArticleMediaHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getAllArticles } from "@/lib/content";

export const dynamic = "force-static";
export const dynamicParams = true;
export const revalidate = false;

// Hubs render on demand and cache permanently (same ISR pattern as articles).
// Build doesn't pre-generate any — would be 1,200+ pages each globbing all
// MDX files. First visit to each hub builds and caches; subsequent are instant.
export function generateStaticParams() {
  return [];
}

function humanize(slug: string): string {
  // glp-1 → GLP-1; oral-micronized-progesterone → Oral Micronized Progesterone;
  // labs-hba1c → Labs Hba1c → Labs HbA1c (special-case common acronyms below)
  const ACRONYMS = new Set(["glp", "trt", "hrt", "fda", "ada", "aace", "ed", "bph",
    "ndt", "shbg", "tsh", "hba1c", "ldl", "hdl", "cv", "cvd", "ascvd",
    "hfpef", "hfref", "ckd", "masld", "nash", "nafld", "psa", "us", "vat",
    "ogtt", "hpa", "rct", "mash", "ema", "mhra", "fhc", "fh", "ozempic",
    "mounjaro", "wegovy", "zepbound"]);
  return slug
    .split("-")
    .map((w) => (ACRONYMS.has(w.toLowerCase()) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

function topicLabel(topic: string): string {
  // Categories like "brands-hims" → "Hims", "labs-hba1c" → "HbA1c",
  // "celebrities-oprah-winfrey" → "Oprah Winfrey", "off-label-semaglutide" →
  // "Semaglutide (Off-label)". Otherwise use plain humanize.
  const m = topic.match(/^(brands|labs|symptoms|conditions|reviews|access|regulatory|interactions|how|off-label|side-effects|compare|celebrities|lifestyle|classes|hubs)-(.+)$/);
  if (m) {
    const [, prefix, rest] = m;
    const restLabel = humanize(rest);
    if (prefix === "brands") return restLabel;
    if (prefix === "labs") return `${restLabel} (Lab Test)`;
    if (prefix === "symptoms") return `${restLabel} (Symptom)`;
    if (prefix === "conditions") return `${restLabel} (Condition)`;
    if (prefix === "reviews") return `${restLabel} — Real Patient Reviews`;
    if (prefix === "access") return `${restLabel} — Access & Coverage`;
    if (prefix === "regulatory") return `${restLabel} — Regulatory History`;
    if (prefix === "interactions") return `${restLabel} — Drug Interactions`;
    if (prefix === "how") return `How ${restLabel.replace(" Affects", "")} Affects Labs`;
    if (prefix === "off-label") return `${restLabel} — Off-Label Uses`;
    if (prefix === "side-effects") return `${restLabel} — Side Effects`;
    if (prefix === "compare") return `${restLabel} — Head-to-Head Comparisons`;
    if (prefix === "celebrities") return `${restLabel} — Celebrity Protocol Analysis`;
    if (prefix === "lifestyle") return `${restLabel} — Lifestyle Protocols`;
    if (prefix === "classes") return `${restLabel} — Drug Class Monograph`;
    if (prefix === "hubs") return `${restLabel} Hub`;
  }
  return humanize(topic);
}

function articleCategory(slug: string, title: string) {
  const text = `${slug} ${title}`.toLowerCase();
  if (/cost|copay|coverage|insurance|medicare|medicaid|aetna|cigna|blue-cross|va-coverage|access/.test(text)) return "Access";
  if (/side-effect|safety|warning|contraindication|risk|pregnancy|renal|hepatic|geriatric|adolescent/.test(text)) return "Safety";
  if (/vs|compare|switching|alternative/.test(text)) return "Comparisons";
  if (/dose|dosing|titration|missed-dose|schedule|monitoring/.test(text)) return "Dosing & Monitoring";
  if (/review|real-world|satisfaction|efficacy-report|cost-report/.test(text)) return "Reviews & Outcomes";
  if (/question|how|why|what|does|can|is-/.test(text)) return "Questions";
  return "Clinical Reviews";
}

function toExplorerArticle(a: ReturnType<typeof getAllArticles>[number]): ExplorerArticle {
  return {
    title: a.title,
    description: a.description,
    url: `/${a.topic}/${a.slug}`,
    topic: a.topic,
    lastReviewed: a.lastReviewed,
    keywords: a.keywords,
    categories: [articleCategory(a.slug, a.title)],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const articles = getAllArticles().filter((a) => a.topic === topic);
  if (articles.length === 0) return {};
  const label = topicLabel(topic);
  const canonical = `https://womenrx.com/${topic}`;
  const description = `Explore ${articles.length} clinically-reviewed WomanRx.com articles on ${label}. Evidence-based, EEAT-verified guidance from the WomanRx.com Medical Team.`.slice(0, 160);
  return {
    title: `${label} | WomanRx.com`,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title: label,
      description,
      url: canonical,
      siteName: "WomanRx.com",
    },
  };
}

export default async function TopicHub({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const articles = getAllArticles()
    .filter((a) => a.topic === topic)
    .sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  if (articles.length === 0) permanentRedirect("/");

  const label = topicLabel(topic);
  const canonical = `https://womenrx.com/${topic}`;

  // CollectionPage JSON-LD with embedded ItemList
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": canonical,
        url: canonical,
        name: `${label} — WomanRx.com`,
        description: `${articles.length} clinically-reviewed articles on ${label}.`,
        isPartOf: { "@id": "https://womenrx.com/#website" },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: articles.length,
          itemListElement: articles.slice(0, 100).map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://womenrx.com/${a.topic}/${a.slug}`,
            name: a.title,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://womenrx.com/" },
          { "@type": "ListItem", position: 2, name: label, item: canonical },
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
      <main className="content-hub">
        <section className="content-hero is-compact">
          <div className="content-hero-inner">
            <Breadcrumbs
              items={[
                { name: "Home", url: "https://womenrx.com/" },
                { name: label, url: canonical },
              ]}
            />
            <p className="content-eyebrow">Topic Hub</p>
            <h1>{label}</h1>
            <p className="content-hero-copy">
              {articles.length.toLocaleString()} clinically reviewed articles, written and peer-reviewed by the WomanRx.com Medical Team.
            </p>
            <ArticleMediaHeader topic={topic} slug={topic} title={label} />
            <div className="content-stats" aria-label="Topic statistics">
              <div>
                <strong>{articles.length.toLocaleString()}</strong>
                <span>articles</span>
              </div>
              <div>
                <strong>{new Set(articles.flatMap((a) => a.keywords || [])).size.toLocaleString()}</strong>
                <span>keywords mapped</span>
              </div>
              <div>
                <strong>{articles[0]?.lastReviewed || "Current"}</strong>
                <span>latest review</span>
              </div>
            </div>
          </div>
        </section>

        <ArticleExplorer
          articles={articles.map(toExplorerArticle)}
          heading={`${label} library`}
        />
      </main>
    </>
  );
}
