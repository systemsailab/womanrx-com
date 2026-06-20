import { permanentRedirect } from "next/navigation";

/**
 * Catch-all: any URL that does not resolve to a real page (unknown paths,
 * content misses) is permanently redirected (308) to the home page. This
 * preserves link equity from legacy backlinks pointed at womanrx.com by prior
 * owners, instead of letting them land on 404s.
 *
 * Note: this is a blanket redirect-to-home. For the highest-value legacy URLs
 * it is better SEO to 301 them to the most topically relevant page; pull the
 * backlink/error list from GSC and add those targeted rules to
 * next.config.ts -> redirects() above this fallback.
 */
export default function NotFound() {
  permanentRedirect("/");
}
