import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  experimental: {
    mdxRs: true,
  },
  async redirects() {
    return [
      // Exact aliases for malformed live PBN backlink hrefs published in May 2026.
      {
        source: "/guides/compounded-semaglutide/guides/compounded-semaglutide/guides/compounded-semaglutide",
        destination: "/semaglutide",
        permanent: true,
      },
      {
        source: "/blog/semaglutide-vs-ozempic/blog/semaglutide-vs-ozempic/blog/semaglutide-vs-ozempic",
        destination: "/blog/semaglutide-vs-ozempic",
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);
