"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type ExplorerArticle = {
  title: string;
  description: string;
  url: string;
  topic: string;
  lastReviewed: string;
  keywords?: string[];
  categories?: string[];
};

export type ExplorerSection = {
  title: string;
  description?: string;
};

type SortMode = "featured" | "newest" | "title";

export function ArticleExplorer({
  articles,
  sections = [],
  heading = "Clinical library",
}: {
  articles: ExplorerArticle[];
  sections?: ExplorerSection[];
  heading?: string;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");
  const [sort, setSort] = useState<SortMode>("featured");

  const filters = useMemo(() => {
    const seen = new Set<string>(["All"]);
    for (const section of sections) seen.add(section.title);
    for (const article of articles) {
      for (const category of article.categories || []) seen.add(category);
    }
    return Array.from(seen);
  }, [articles, sections]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = articles.filter((article) => {
      const inCategory = active === "All" || article.categories?.includes(active);
      if (!inCategory) return false;
      if (!q) return true;
      return `${article.title} ${article.description} ${article.topic} ${article.keywords?.join(" ") || ""}`
        .toLowerCase()
        .includes(q);
    });

    return [...list].sort((a, b) => {
      if (sort === "newest") return (b.lastReviewed || "").localeCompare(a.lastReviewed || "");
      if (sort === "title") return a.title.localeCompare(b.title);
      return 0;
    });
  }, [active, articles, query, sort]);

  return (
    <section className="content-explorer" aria-labelledby="content-explorer-heading">
      <div className="content-explorer-head">
        <div>
          <p className="content-eyebrow">Explore</p>
          <h2 id="content-explorer-heading">{heading}</h2>
        </div>
        <p>
          Showing <strong>{filtered.length.toLocaleString()}</strong> of{" "}
          <strong>{articles.length.toLocaleString()}</strong> clinical reviews.
        </p>
      </div>

      <div className="content-toolbar">
        <label className="content-search">
          <span>Search this library</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by drug, symptom, insurer, lab, or question"
          />
        </label>
        <label className="content-sort">
          <span>Sort</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as SortMode)}>
            <option value="featured">Featured</option>
            <option value="newest">Newest reviewed</option>
            <option value="title">A to Z</option>
          </select>
        </label>
      </div>

      <div className="content-filters" aria-label="Library filters">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={filter === active ? "is-active" : undefined}
            onClick={() => setActive(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="content-article-grid">
        {filtered.slice(0, 60).map((article) => (
          <article className="content-article-card" key={article.url}>
            <Link href={article.url}>
              <div className="content-card-meta">
                <span>{article.categories?.[0] || labelFromTopic(article.topic)}</span>
                <time dateTime={article.lastReviewed}>{article.lastReviewed}</time>
              </div>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <span className="content-card-link">Read clinical review</span>
            </Link>
          </article>
        ))}
      </div>

      {filtered.length > 60 ? (
        <p className="content-result-note">
          Showing the first 60 matches. Use search or filters to narrow the library.
        </p>
      ) : null}
    </section>
  );
}

function labelFromTopic(topic: string) {
  return topic
    .split("-")
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
