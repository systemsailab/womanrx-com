import path from "node:path";

export type ArticleImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
  provider?: string;
  credit?: string;
  creditUrl?: string;
};

let _imageCache: Record<string, ArticleImage> | null = null;

function loadImageManifest() {
  if (_imageCache) return _imageCache;
  try {
    const fs = require("node:fs");
    const manifestPath = path.join(process.cwd(), "public", "manifests", "article-images.json");
    _imageCache = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  } catch {
    _imageCache = {};
  }
  return _imageCache || {};
}

export function getArticleImage(topic: string, slug: string): ArticleImage | undefined {
  return loadImageManifest()[`${topic}/${slug}`];
}
