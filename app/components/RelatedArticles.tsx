/**
 * RelatedArticles — server component that selects 6 related articles based
 * on (1) same topic, (2) keyword overlap, (3) recency. Renders at the
 * bottom of every article so crawlers (and readers) follow into the
 * topical cluster.
 */
import Link from "next/link";
import { getAllArticles, type ArticleMeta } from "@/lib/content";

type Props = {
  currentTopic: string;
  currentSlug: string;
  currentKeywords?: string[];
  max?: number;
};

function scoreArticle(target: ArticleMeta, currentTopic: string, currentKw: Set<string>): number {
  let s = 0;
  if (target.topic === currentTopic) s += 10;
  if (target.keywords) {
    for (const k of target.keywords) if (currentKw.has(k.toLowerCase())) s += 2;
  }
  // recency bump if last 90 days
  const reviewed = target.lastReviewed ? new Date(target.lastReviewed).getTime() : 0;
  if (Date.now() - reviewed < 90 * 24 * 60 * 60 * 1000) s += 1;
  return s;
}

export function RelatedArticles({ currentTopic, currentSlug, currentKeywords = [], max = 6 }: Props) {
  const all = getAllArticles();
  const kwSet = new Set(currentKeywords.map((k) => k.toLowerCase()));
  const candidates = all
    .filter((a) => !(a.topic === currentTopic && a.slug === currentSlug))
    .map((a) => ({ a, score: scoreArticle(a, currentTopic, kwSet) }))
    .filter(({ score }) => score > 0)
    .sort((x, y) => y.score - x.score)
    .slice(0, max);
  if (candidates.length === 0) return null;
  return (
    <aside aria-label="Related articles" className="related-articles">
      <div className="related-articles-head">
        <span>Next in this cluster</span>
        <h2>Related reading</h2>
      </div>
      <ul>
        {candidates.map(({ a }) => (
          <li key={`${a.topic}/${a.slug}`}>
            <Link href={`/${a.topic}/${a.slug}`}>
              <span>{a.topic.split("-").slice(0, 2).join(" ")}</span>
              <h3>{a.title}</h3>
              <p>{a.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
