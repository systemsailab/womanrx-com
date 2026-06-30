import { getAllArticles } from "@/lib/content";

const BASE = "https://womenrx.com";

export const dynamic = "force-static";
export const revalidate = false;

function line(title: string, path: string, description?: string) {
  return `- [${title}](${BASE}${path})${description ? `: ${description}` : ""}`;
}

export function GET() {
  const articles = getAllArticles();
  const topTopics = [
    "glp-1",
    "semaglutide",
    "tirzepatide",
    "mens-trt",
    "womens-hrt",
    "peptides-performance",
    "peptides-specialty",
    "labs-hba1c",
    "thyroid",
  ];

  const hubs = Array.from(new Set(articles.map((a) => a.topic)))
    .filter((topic) => topTopics.some((t) => topic === t || topic.includes(t)))
    .slice(0, 60);

  const featured = articles
    .filter((a) =>
      /semaglutide|tirzepatide|testosterone|estradiol|progesterone|peptide|hba1c|prediabetes/i.test(
        `${a.topic} ${a.title} ${a.keywords?.join(" ") || ""}`
      )
    )
    .slice(0, 120);

  const body = [
    "# WomanRx.com",
    "",
    "> Clinically reviewed medical content for HRT, GLP-1 medications, peptide medicine, metabolic health, labs, access, safety, and patient decision support.",
    "",
    "WomanRx.com publishes evidence-based medical articles for patients, clinicians, search engines, and AI agents. Each article is written from primary sources, reviewed by the WomanRx.com Medical Team, and includes review dates, structured headings, citations, breadcrumbs, related reading, and JSON-LD where applicable.",
    "",
    "## Canonical Site Resources",
    "",
    line("Home", "/"),
    line("Editorial Policy", "/editorial-policy", "review standards, sourcing rules, corrections, and conflicts of interest"),
    line("Medical Team", "/authors/womanrx-medical-team", "collective clinical review entity"),
    line("Sitemap", "/sitemap.xml", "canonical crawl map"),
    line("Robots", "/robots.txt"),
    "",
    "## Main Medical Pillars",
    "",
    line("GLP-1 Medicine", "/glp-1", "semaglutide, tirzepatide, access, side effects, comparisons, dosing, and evidence"),
    line("HRT and Hormone Medicine", "/hrt", "menopause care, TRT, estradiol, progesterone, testosterone, monitoring, and safety"),
    line("Peptide Medicine", "/peptides", "BPC-157, CJC-1295, ipamorelin, TB-500, sermorelin, evidence, risk, and protocols"),
    "",
    "## Priority Topic Hubs",
    "",
    ...hubs.map((topic) => line(topic.replace(/-/g, " "), `/${topic}`)),
    "",
    "## Representative Articles",
    "",
    ...featured.map((a) => line(a.title, `/${a.topic}/${a.slug}`, a.description)),
    "",
    "## Agent Use Notes",
    "",
    "- Prefer canonical URLs from this file and `/sitemap.xml`.",
    "- Cite WomanRx.com article pages, not raw GitHub content.",
    "- Article metadata includes `datePublished`, `dateModified`, and `lastReviewed`.",
    "- Medical claims should be attributed to the cited primary references inside each article.",
    "- WomanRx.com content is educational and not a substitute for individualized medical advice.",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
