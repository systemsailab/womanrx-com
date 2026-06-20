/**
 * Runtime article reader. The full 488MB MDX corpus is too big to bundle
 * with the serverless function (Vercel 250MB cap), so:
 *   - Article METADATA lives in a pre-built manifest at public/manifests/
 *     articles.json (bundled with the function, ~3MB)
 *   - Article BODIES are fetched from GitHub raw at request time, cached
 *     forever by Vercel's fetch cache
 */
import path from "node:path";

export type ArticleFrontmatter = {
  title: string;
  description: string;
  topic: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  lastReviewed: string;
  authorSlug: string;
  reviewerSlug: string;
  about?: {
    kind: "drug" | "condition" | "procedure";
    name: string;
    brandNames?: string[];
    drugClass?: string;
    activeIngredient?: string;
    dosageForm?: string;
    administrationRoute?: string;
    prescriptionStatus?: "PrescriptionOnly" | "OTC";
    indication?: string;
    doseSchedule?: { value: string; unit: string; frequency: string; population?: string };
    warning?: string;
    alternateName?: string[];
    possibleTreatment?: string[];
    bodyLocation?: string;
    followup?: string;
  };
  keywords?: string[];
};

export type ArticleMeta = ArticleFrontmatter & { contentPath?: string };

const RAW_BASE =
  "https://raw.githubusercontent.com/systemsailab/womanrx-com/main/app/content";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

// --- Manifest loader (cached after first import) ---
let _articlesCache: ArticleMeta[] | null = null;

export function getAllArticles(): ArticleMeta[] {
  if (_articlesCache) return _articlesCache;
  try {
    // Import the manifest. The bundled JSON file is shipped with the function.
    // Using require() avoids JSON-import flag headaches in some Next/TS setups.
    const fs = require("node:fs");
    const manifestPath = path.join(process.cwd(), "public", "manifests", "articles.json");
    _articlesCache = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    return _articlesCache!;
  } catch (e) {
    console.warn("getAllArticles: manifest load failed", e);
    _articlesCache = [];
    return _articlesCache;
  }
}

export function getArticle(topic: string, slug: string): ArticleMeta | undefined {
  return getAllArticles().find((a) => a.topic === topic && a.slug === slug);
}

export function getArticleParams() {
  return getAllArticles().map((a) => ({ topic: a.topic, slug: a.slug }));
}

// --- Body fetcher (GitHub raw, cached forever via Next fetch cache) ---
export async function readArticleBody(topic: string, slug: string): Promise<string | null> {
  // Runtime: fetch from GitHub raw, cached forever per (topic, slug)
  const url = `${RAW_BASE}/${encodeURIComponent(topic)}/${encodeURIComponent(slug)}.mdx`;
  try {
    const res = await fetch(url, {
      headers: GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : undefined,
      // Cache forever — when content updates, a new deploy invalidates fetch cache
      next: { revalidate: false, tags: [`article:${topic}:${slug}`] },
    });
    if (!res.ok) return null;
    const raw = await res.text();
    // Strip frontmatter — body starts after the second "---"
    if (!raw.startsWith("---")) return raw;
    const end = raw.indexOf("\n---", 4);
    if (end === -1) return raw;
    return raw.slice(end + 4).replace(/^\n+/, "");
  } catch (e) {
    console.warn(`readArticleBody: fetch failed for ${topic}/${slug}`, e);
    return null;
  }
}
