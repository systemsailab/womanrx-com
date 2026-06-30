import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AnalyticsEvents } from "@/components/AnalyticsEvents";
import { CartProvider } from "@/components/shop/CartProvider";
import { CartDrawer } from "@/components/shop/CartDrawer";
import "./globals.css";

const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalOrganization",
      "@id": "https://womenrx.com/#organization",
      name: "WomenRx",
      url: "https://womenrx.com",
      email: "support@womanrx.com",
      medicalSpecialty: [
        "Endocrinology",
        "Obesity Medicine",
        "Clinical Pharmacology",
        "Menopause Care",
        "Hormone Therapy",
      ],
      contactPoint: {
        "@type": "ContactPoint",
          contactType: "customer support",
        email: "support@womanrx.com",
        areaServed: "US",
        availableLanguage: "en",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://womenrx.com/#website",
      url: "https://womenrx.com",
      name: "WomenRx",
      publisher: { "@id": "https://womenrx.com/#organization" },
      inLanguage: "en-US",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://womenrx.com"),
  verification: {
    google: "yquMEXOidB0_igGz29dMRTebQgQMIxJlCZY1k4pzihg",
  },
  title: {
    default: "WomenRx | Hormones, GLP-1 & Peptides for Women",
    template: "%s | WomenRx",
  },
  description:
    "Physician-guided GLP-1, peptide, and hormone care, designed for a woman's body and the years ahead. One trusted home for getting older and feeling younger. No insurance required.",
  openGraph: {
    title: "WomenRx | Hormones, GLP-1 & Peptides for Women",
    description:
      "GLP-1, peptides, and hormone care, designed for a woman's body. One trusted home for getting older and feeling younger. No insurance required.",
    type: "website",
    url: "https://womenrx.com",
    siteName: "WomenRx",
  },
  twitter: {
    card: "summary_large_image",
    title: "WomenRx | Hormones, GLP-1 & Peptides for Women",
    description:
      "GLP-1, peptides, and hormone care, designed for women. One trusted home for feeling ageless.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph) }}
        />
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
        <AnalyticsEvents />
        <GoogleAnalytics gaId="G-BGZ10WGW9F" />
      </body>
    </html>
  );
}
