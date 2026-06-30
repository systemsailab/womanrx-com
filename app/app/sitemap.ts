import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/content";

const BASE = "https://womenrx.com";

export const dynamic = "force-static";
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  // Static marketing + legal routes
  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/blog",
    "/about",
    "/faq",
    "/contact-us",
    "/editorial-policy",
    "/glp-1",
    "/hrt",
    "/peptides",
    "/semaglutide",
    "/tirzepatide",
    "/weight-loss-intake",
    "/tools/free-testosterone",
    "/tools/glp1-projection",
    "/tools/peptide-reconstitution",
    "/authors/womanrx-medical-team",
    "/privacy",
    "/terms",
    "/hipaa",
    "/ccpa",
    "/sms-terms-and-conditions",
    "/returns-refund-policy",
  ].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date(),
    changeFrequency: p === "/" ? "weekly" : "monthly",
    priority: p === "/" ? 1.0 : 0.7,
  }));

  // All articles + their topic hubs
  const articles = getAllArticles();
  const topics = Array.from(new Set(articles.map((a) => a.topic)));

  const hubRoutes: MetadataRoute.Sitemap = topics.map((t) => ({
    url: `${BASE}/${t}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/${a.topic}/${a.slug}`,
    lastModified: new Date(a.dateModified || a.datePublished || a.lastReviewed || Date.now()),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return Array.from(
    new Map(
      [...staticRoutes, ...hubRoutes, ...articleRoutes].map((entry) => [
        entry.url,
        entry,
      ])
    ).values()
  );
}
