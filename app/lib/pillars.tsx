import Link from "next/link";
import { ArticleExplorer, type ExplorerArticle } from "@/components/ArticleExplorer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleMediaHeader } from "@/components/ArticleMediaHeader";
import { getAllArticles, type ArticleMeta } from "@/lib/content";

const BASE = "https://womenrx.com";

type PillarSection = { title: string; pattern: RegExp; exclude?: RegExp; description?: string };

type PillarConfig = {
  slug: string;
  title: string;
  description: string;
  topicPatterns: RegExp[];
  priorityTerms: RegExp;
  sections: PillarSection[];
};

function articleUrl(a: ArticleMeta) {
  return `/${a.topic}/${a.slug}`;
}

function decorateArticle(a: ArticleMeta, sections: PillarSection[]): ExplorerArticle {
  const haystack = `${a.topic} ${a.slug} ${a.title} ${a.keywords?.join(" ") || ""}`;
  const categories = sections
    .filter((section) => section.pattern.test(haystack) && !section.exclude?.test(haystack))
    .map((section) => section.title);
  return {
    title: a.title,
    description: a.description,
    url: articleUrl(a),
    topic: a.topic,
    lastReviewed: a.lastReviewed,
    keywords: a.keywords,
    categories: categories.length ? categories : ["General"],
  };
}

function pickSectionArticles(articles: ArticleMeta[], section: PillarSection, max = 5) {
  return articles
    .filter((a) => {
      const haystack = `${a.topic} ${a.slug} ${a.title} ${a.keywords?.join(" ") || ""}`;
      return section.pattern.test(haystack) && !section.exclude?.test(haystack);
    })
    .slice(0, max);
}

function topicCount(articles: ArticleMeta[]) {
  return new Set(articles.map((a) => a.topic)).size;
}

function latestReview(articles: ArticleMeta[]) {
  return articles.reduce((latest, article) => {
    if (!article.lastReviewed) return latest;
    return article.lastReviewed > latest ? article.lastReviewed : latest;
  }, "");
}

export function buildPillarGraph(config: PillarConfig, articles: ArticleMeta[]) {
  const canonical = `${BASE}/${config.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: config.title,
        description: config.description,
        isPartOf: { "@id": `${BASE}/#website` },
        publisher: { "@id": `${BASE}/#organization` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: articles.length,
          itemListElement: articles.slice(0, 100).map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${BASE}${articleUrl(a)}`,
            name: a.title,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
          { "@type": "ListItem", position: 2, name: config.title, item: canonical },
        ],
      },
    ],
  };
}

export function PillarPage({ config }: { config: PillarConfig }) {
  const all = getAllArticles();
  const articles = all
    .filter((a) => config.topicPatterns.some((p) => p.test(`${a.topic} ${a.slug} ${a.title}`)))
    .sort((a, b) => {
      const ap = config.priorityTerms.test(`${a.topic} ${a.slug} ${a.title}`) ? 1 : 0;
      const bp = config.priorityTerms.test(`${b.topic} ${b.slug} ${b.title}`) ? 1 : 0;
      return bp - ap || (b.lastReviewed || "").localeCompare(a.lastReviewed || "");
    });
  const graph = buildPillarGraph(config, articles);
  const decorated = articles.map((a) => decorateArticle(a, config.sections));
  const featured = articles.slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      <main className="content-hub">
        <section className="content-hero">
          <div className="content-hero-inner">
            <Breadcrumbs
              items={[
                { name: "Home", url: `${BASE}/` },
                { name: config.title, url: `${BASE}/${config.slug}` },
              ]}
            />
            <p className="content-eyebrow">WomanRx.com Clinical Library</p>
            <h1>{config.title}</h1>
            <p className="content-hero-copy">{config.description}</p>
            <ArticleMediaHeader topic={config.slug} slug={config.slug} title={config.title} />
            <div className="content-stats" aria-label="Library statistics">
              <div>
                <strong>{articles.length.toLocaleString()}</strong>
                <span>reviewed articles</span>
              </div>
              <div>
                <strong>{topicCount(articles).toLocaleString()}</strong>
                <span>topic clusters</span>
              </div>
              <div>
                <strong>{latestReview(articles) || "Current"}</strong>
                <span>latest review</span>
              </div>
            </div>
          </div>
        </section>

        <section className="content-featured" aria-label="Featured clinical reviews">
          <div className="content-section-head">
            <p className="content-eyebrow">Start Here</p>
            <h2>High-intent clinical paths</h2>
          </div>
          <div className="content-featured-grid">
            {featured.map((article, index) => (
              <article className={index === 0 ? "content-feature-card is-primary" : "content-feature-card"} key={`${article.topic}/${article.slug}`}>
                <Link href={articleUrl(article)}>
                  <span>{decorateArticle(article, config.sections).categories?.[0] || "Clinical review"}</span>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="content-pathways" aria-label="Clinical pathways">
          <div className="content-section-head">
            <p className="content-eyebrow">Organization</p>
            <h2>Browse by clinical intent</h2>
          </div>
          <div className="content-pathway-grid">
            {config.sections.map((section) => {
              const matches = pickSectionArticles(articles, section, 5);
              return (
                <section key={section.title} className="content-pathway">
                  <h3>{section.title}</h3>
                  {section.description ? <p>{section.description}</p> : null}
                  <ul>
                    {matches.map((a) => (
                      <li key={`${a.topic}/${a.slug}`}>
                        <Link href={articleUrl(a)}>{a.title}</Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </section>

        <ArticleExplorer
          articles={decorated}
          sections={config.sections.map(({ title, description }) => ({ title, description }))}
          heading={`${config.title} explorer`}
        />
      </main>
    </>
  );
}

export type { PillarConfig };
