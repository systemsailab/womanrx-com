import { permanentRedirect } from "next/navigation";
import { getArticle } from "@/lib/content";
import { resolveLegacyArticlePath } from "@/lib/legacyArticleRedirects";

export const dynamic = "force-static";
export const dynamicParams = true;
export const revalidate = false;

export function generateStaticParams() {
  return [];
}

export default async function LegacyArticlesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (getArticle("blog", slug)) permanentRedirect(`/blog/${slug}`);

  const path = resolveLegacyArticlePath(slug);

  if (!path) permanentRedirect("/");
  permanentRedirect(path);
}
