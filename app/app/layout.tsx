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
      "@id": "https://womanrx.com/#organization",
      name: "WomanRx.com",
      url: "https://womanrx.com",
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
      "@id": "https://womanrx.com/#website",
      url: "https://womanrx.com",
      name: "WomanRx.com",
      publisher: { "@id": "https://womanrx.com/#organization" },
      inLanguage: "en-US",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://womanrx.com"),
  verification: {
    google: "yquMEXOidB0_igGz29dMRTebQgQMIxJlCZY1k4pzihg",
  },
  title: {
    default: "WomanRx.com | Clinical Weight Loss, Prescribed With Rigor",
    template: "%s | WomanRx.com",
  },
  description:
    "Physician-prescribed compounded GLP-1 medications — semaglutide and tirzepatide — delivered to your door. One transparent price. No insurance required. LegitScript certified.",
  openGraph: {
    title: "WomanRx.com | Clinical Weight Loss, Prescribed With Rigor",
    description:
      "Physician-prescribed compounded GLP-1 medications delivered to your door. One transparent price. No insurance required.",
    type: "website",
    url: "https://womanrx.com",
    siteName: "WomanRx.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "WomanRx.com | Clinical Weight Loss, Prescribed With Rigor",
    description:
      "Physician-prescribed compounded GLP-1 medications delivered to your door. One transparent price.",
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
