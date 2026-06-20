import { type ArticleMeta, getAllArticles } from "@/lib/content";

const LEGACY_ARTICLE_ALIASES: Record<string, string> = {
  "[top-commercial-article-slug]": "/blog/best-compounded-semaglutide-telehealth-2026",
  "best-compounded-semaglutide-telehealth-providers": "/blog/compounded-semaglutide-providers",
  "compounded-glp-1-telehealth-providers": "/blog/best-compounded-semaglutide-telehealth-2026",
  "compounded-semaglutide": "/semaglutide",
  "compounded-semaglutide-complete-guide": "/semaglutide",
  "compounded-semaglutide-diet": "/blog/semaglutide-diet-food",
  "compounded-semaglutide-dosing": "/blog/compounded-semaglutide-dosing-protocols",
  "compounded-semaglutide-side-effects": "/blog/compounded-semaglutide-side-effects-safety",
  "compounded-semaglutide-telehealth-providers": "/blog/best-compounded-semaglutide-telehealth-2026",
  "compounded-semaglutide-vs-ozempic": "/blog/compounded-semaglutide-vs-ozempic-wegovy",
  "compounded-semaglutide-review": "/blog/lavender-sky-health-semaglutide",
  "compounded-semaglutide-reviews": "/blog/hims-compounded-semaglutide-review",
  "eden-semaglutide": "/blog/eden-semaglutide-review",
  "guides/compounded-semaglutide-complete-guide": "/semaglutide",
  "henry-meds-semaglutide": "/blog/henry-meds-semaglutide-review",
  "hims-compounded-semaglutide-review": "/blog/hims-compounded-semaglutide-review",
  "noom-semaglutide-reviews": "/blog/mochi-health-semaglutide-review",
  "ro-semaglutide-reviews": "/blog/ro-semaglutide-review",
  "semaglutide-drops-reviews": "/blog/ivim-health-semaglutide",
  "semaglutide-reviews": "/blog/best-compounded-semaglutide-telehealth-2026",
  "weight-watchers-compounded-semaglutide": "/blog/is-hims-semaglutide-legit",
  "weight-watchers-semaglutide": "/blog/henry-meds-semaglutide-review",
  "ww-semaglutide-reviews": "/blog/shedrx-skinny-rx-semaglutide",
};

function normalizeSlug(value: string) {
  return decodeURIComponent(value)
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "")
    .replace(/\.html?$/g, "");
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function canonicalPath(article: ArticleMeta) {
  return `/${article.topic}/${article.slug}`;
}

function newestFirst(a: ArticleMeta, b: ArticleMeta) {
  return (
    (b.dateModified || b.lastReviewed || b.datePublished || "").localeCompare(
      a.dateModified || a.lastReviewed || a.datePublished || ""
    )
  );
}

function uniqueNewestMatch(matches: ArticleMeta[]) {
  const paths = Array.from(new Set(matches.map(canonicalPath)));
  if (paths.length !== 1) return null;
  return canonicalPath(matches.sort(newestFirst)[0]);
}

export function resolveLegacyArticlePath(slug: string) {
  const normalized = normalizeSlug(slug);
  if (!normalized) return null;

  const alias = LEGACY_ARTICLE_ALIASES[normalized];
  if (alias) return alias;

  const articles = getAllArticles();
  const exactSlug = uniqueNewestMatch(articles.filter((article) => article.slug === normalized));
  if (exactSlug) return exactSlug;

  const titleSlug = uniqueNewestMatch(articles.filter((article) => slugify(article.title) === normalized));
  if (titleSlug) return titleSlug;

  const topicPrefixed = uniqueNewestMatch(
    articles.filter((article) => `${article.topic}-${article.slug}` === normalized)
  );
  if (topicPrefixed) return topicPrefixed;

  return null;
}
