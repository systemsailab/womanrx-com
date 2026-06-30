import { permanentRedirect, redirect } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { MedicalArticle } from "@/components/MedicalArticle";
import { TLDR } from "@/components/TLDR";
import { AtAGlance } from "@/components/AtAGlance";
import { FAQAccordionMDX, FAQ } from "@/components/MDXFaq";
import { References } from "@/components/References";
import { getArticle, readArticleBody } from "@/lib/content";
import { getArticleImage } from "@/lib/articleImages";
import { RelatedArticles } from "@/components/RelatedArticles";
import { applyAutoLinks } from "@/lib/autoLinker";
import { resolveLegacyArticlePath } from "@/lib/legacyArticleRedirects";

// ISR: render on demand, cache permanently. Articles compile from disk via
// next-mdx-remote (MDX-as-data — no Turbopack bundling of 18,500 files).
// New articles ship via git commit → Vercel auto-deploy → fresh cache.
export const dynamic = "force-static";
export const dynamicParams = true;
export const revalidate = false;

export function generateStaticParams() {
  return [];
}

// Components available inside the MDX body. Mirrors mdx-components.tsx.
const mdxComponents = {
  TLDR,
  AtAGlance,
  FAQAccordion: FAQAccordionMDX,
  FAQ,
  References,
  h2: (props: any) => (
    <h2 {...props} className="article-h2" />
  ),
  h3: (props: any) => (
    <h3 {...props} className="article-h3" />
  ),
  p: (props: any) => (
    <p {...props} className="article-p" />
  ),
  ul: (props: any) => (
    <ul {...props} className="article-list" />
  ),
  ol: (props: any) => (
    <ol {...props} className="article-list article-list-ordered" />
  ),
  a: (props: any) => (
    <a
      {...props}
      className="article-link"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener" : undefined}
    />
  ),
  table: (props: any) => (
    <div className="article-table-wrap">
      <table {...props} className="article-table" />
    </div>
  ),
  th: (props: any) => (
    <th
      {...props}
      className="article-th"
    />
  ),
  td: (props: any) => (
    <td
      {...props}
      className="article-td"
    />
  ),
  blockquote: (props: any) => (
    <blockquote
      {...props}
      className="article-quote"
    />
  ),
};

function ogImage(topic: string, slug: string) {
  const image = getArticleImage(topic, slug);
  if (image) return image;
  return {
    url: `https://womenrx.com/og?topic=${encodeURIComponent(topic)}&slug=${encodeURIComponent(slug)}`,
    width: 1200,
    height: 630,
    alt: "WomanRx.com",
  };
}

function extractFaqs(source: string) {
  const faqs: { question: string; answer: string }[] = [];

  for (const match of source.matchAll(/<FAQ\s+question="([^"]+)">\s*([\s\S]*?)\s*<\/FAQ>/g)) {
    faqs.push({
      question: decodeEntities(match[1]),
      answer: stripMdx(match[2]),
    });
  }

  for (const match of source.matchAll(/<FAQ\s+q="([^"]+)"\s+a="([^"]+)"\s*\/>/g)) {
    faqs.push({
      question: decodeEntities(match[1]),
      answer: decodeEntities(match[2]),
    });
  }

  return faqs.slice(0, 12);
}

function stripMdx(value: string) {
  return decodeEntities(
    value
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function decodeEntities(value: string) {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripLeadingMarkdownTitle(source: string, title: string) {
  const normalizedTitle = title.trim().replace(/\s+/g, " ");
  return source.replace(/^#\s+(.+?)\s*\n+/, (match, heading) => {
    const normalizedHeading = String(heading).trim().replace(/\s+/g, " ");
    return normalizedHeading === normalizedTitle ? "" : match;
  });
}

function headingId(text: string) {
  return stripMdx(text)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "section";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function openTagMatches(source: string, pattern: RegExp) {
  return [...source.matchAll(pattern)].filter((match) => !/\/\s*>$/.test(match[0]));
}

function closeDanglingContainer(source: string, tag: string, closeAtEnd = false) {
  let body = source;
  const openPattern = new RegExp(`<${tag}(\\s[^>]*)?>`, "g");
  const closePattern = new RegExp(`</${tag}>`, "g");

  while (openTagMatches(body, openPattern).length > (body.match(closePattern)?.length || 0)) {
    const openMatch = openTagMatches(body, openPattern).at(-1);
    if (!openMatch || openMatch.index === undefined) break;

    const afterOpen = openMatch.index + openMatch[0].length;
    const nextSection = closeAtEnd ? -1 : body.indexOf("\n## ", afterOpen);
    const nextReferences = closeAtEnd ? -1 : body.indexOf("\n<References>", afterOpen);
    const candidates = [nextSection, nextReferences].filter((index) => index > afterOpen);
    const insertAt = candidates.length ? Math.min(...candidates) : body.length;
    body = `${body.slice(0, insertAt).trimEnd()}\n</${tag}>\n${body.slice(insertAt).replace(/^\n+/, "")}`;
  }

  return body;
}

function normalizeMdxContainers(source: string) {
  return ["TLDR", "AtAGlance", "FAQAccordion"].reduce(
    (body, tag) => closeDanglingContainer(body, tag),
    closeDanglingContainer(source, "References", true)
  );
}

function prepareHeadings(source: string) {
  const seen = new Map<string, number>();
  const toc: { id: string; text: string }[] = [];
  let inFence = false;

  const body = source
    .split("\n")
    .map((line) => {
      if (/^\s*```/.test(line)) inFence = !inFence;
      if (inFence) return line;

      const match = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);
      if (!match) return line;

      const level = match[1].length;
      const text = stripMdx(match[2]);
      const base = headingId(text);
      const next = (seen.get(base) || 0) + 1;
      seen.set(base, next);
      const id = next === 1 ? base : `${base}-${next}`;

      if (level === 2 && toc.length < 12) toc.push({ id, text });
      const tag = level === 2 ? "h2" : "h3";
      const className = level === 2 ? "article-h2" : "article-h3";
      return `<${tag} id="${id}" className="${className}">${escapeHtml(text)}</${tag}>`;
    })
    .join("\n");

  return { body, toc };
}

function topicLabel(topic: string) {
  const acronyms = new Set(["glp", "hrt", "trt", "fda", "hba1c", "ldl", "hdl", "tsh", "masld", "pcos"]);
  return topic
    .split("-")
    .map((word) => (acronyms.has(word.toLowerCase()) ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string; slug: string }>;
}) {
  const { topic, slug } = await params;
  const a = getArticle(topic, slug);
  if (!a) return {};
  const canonical = `https://womenrx.com/${a.topic}/${a.slug}`;
  // Trim description to <=160 chars (Google SERP cutoff) on a word boundary.
  const desc = (() => {
    const raw = a.description || "";
    if (raw.length <= 160) return raw;
    const cut = raw.slice(0, 157);
    const lastSpace = cut.lastIndexOf(" ");
    return (lastSpace > 120 ? cut.slice(0, lastSpace) : cut).replace(/[,.;:!?-]+$/, "") + "…";
  })();
  return {
    title: a.title,
    description: desc,
    keywords: a.keywords,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: a.title,
      description: desc,
      url: canonical,
      siteName: "WomanRx.com",
      publishedTime: a.datePublished,
      modifiedTime: a.dateModified || a.datePublished,
      images: [ogImage(a.topic, a.slug)],
      authors: ["WomanRx.com Medical Team"],
    },
    twitter: {
      card: "summary_large_image",
      title: a.title,
      description: desc,
      images: [ogImage(a.topic, a.slug).url],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ topic: string; slug: string }>;
}) {
  const { topic, slug } = await params;
  const a = getArticle(topic, slug);
  if (!a) {
    const path = resolveLegacyArticlePath(`${topic}/${slug}`);
    if (path) permanentRedirect(path);
    permanentRedirect("/");
  }
  const heroImage = getArticleImage(a.topic, a.slug);
  const rawBody = await readArticleBody(topic, slug);
  if (!rawBody) redirect("/");
  const normalizedBody = normalizeMdxContainers(rawBody);
  const faqs = extractFaqs(normalizedBody);
  const prepared = prepareHeadings(stripLeadingMarkdownTitle(normalizedBody, a.title));
  const body = applyAutoLinks(prepared.body, topic);

  // Compile MDX from disk at request time. No bundler involvement → no
  // 18,500-file OOM. Vercel caches per route forever (revalidate=false).
  const { content } = await compileMDX({
    source: body,
    components: mdxComponents,
    options: { parseFrontmatter: false },
  });

  const canonical = `https://womenrx.com/${a.topic}/${a.slug}`;
  return (
    <MedicalArticle
      url={canonical}
      title={a.title}
      description={a.description}
      datePublished={a.datePublished}
      dateModified={a.dateModified || a.datePublished}
      lastReviewed={a.lastReviewed}
      authorSlug={a.authorSlug}
      reviewerSlug={a.reviewerSlug}
      heroImage={heroImage}
      about={a.about as any}
      faqs={faqs}
      toc={prepared.toc}
      breadcrumbs={[
        { name: "Home", url: "https://womenrx.com/" },
        { name: topicLabel(a.topic), url: `https://womenrx.com/${a.topic}` },
        { name: a.title, url: canonical },
      ]}
    >
      {content}
      <RelatedArticles
        currentTopic={a.topic}
        currentSlug={a.slug}
        currentKeywords={a.keywords}
      />
    </MedicalArticle>
  );
}
