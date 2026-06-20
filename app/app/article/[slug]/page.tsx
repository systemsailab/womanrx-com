import { permanentRedirect } from "next/navigation";
import { resolveLegacyArticlePath } from "@/lib/legacyArticleRedirects";

export const dynamic = "force-static";
export const dynamicParams = true;
export const revalidate = false;

export function generateStaticParams() {
  return [];
}

export default async function LegacyArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const path = resolveLegacyArticlePath(slug);

  if (!path) permanentRedirect("/");
  permanentRedirect(path);
}
