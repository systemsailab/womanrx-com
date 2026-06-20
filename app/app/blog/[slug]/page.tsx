import { permanentRedirect } from "next/navigation";
import ArticlePage, { generateMetadata as generateArticleMetadata } from "@/app/[topic]/[slug]/page";
import { getArticle } from "@/lib/content";
import { resolveLegacyArticlePath } from "@/lib/legacyArticleRedirects";

export const dynamic = "force-static";
export const dynamicParams = true;
export const revalidate = false;

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (getArticle("blog", slug)) {
    return generateArticleMetadata({ params: Promise.resolve({ topic: "blog", slug }) });
  }
  return {};
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (getArticle("blog", slug)) {
    return ArticlePage({ params: Promise.resolve({ topic: "blog", slug }) });
  }

  const path = resolveLegacyArticlePath(slug);
  if (!path) permanentRedirect("/");
  permanentRedirect(path);
}
