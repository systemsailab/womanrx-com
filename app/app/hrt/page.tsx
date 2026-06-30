import type { Metadata } from "next";
import { PillarPage, type PillarConfig } from "@/lib/pillars";

export const dynamic = "force-static";
export const revalidate = false;

const config: PillarConfig = {
  slug: "hrt",
  title: "HRT and Hormone Medicine",
  description:
    "Clinically reviewed guidance on menopause hormone therapy, estradiol, progesterone, testosterone replacement therapy, thyroid treatment, monitoring labs, contraindications, and safety.",
  topicPatterns: [/hrt/i, /trt/i, /testosterone/i, /estradiol/i, /progesterone/i, /menopause/i, /thyroid/i, /armour-thyroid/i, /levothyroxine/i, /liothyronine/i],
  priorityTerms: /estradiol|progesterone|testosterone|menopause|thyroid|trt|hrt/i,
  sections: [
    { title: "Women's HRT", description: "Estradiol, progesterone, menopause symptoms, vaginal estrogen, contraindications, and clinical monitoring.", pattern: /womens-hrt|estradiol|progesterone|menopause|vaginal-estradiol/i, exclude: /access|coverage|cost|copay|insurance|medicare|medicaid|patient-assistance|manufacturer/i },
    { title: "Men's TRT", description: "Testosterone replacement, enclomiphene, prostate safety, cardiovascular evidence, dosing, access, and monitoring.", pattern: /mens-trt|testosterone|androgel|traverse|hypogonadism/i, exclude: /access|coverage|cost|copay|insurance|medicare|medicaid|patient-assistance|manufacturer/i },
    { title: "Thyroid and Labs", description: "TSH, free T4, free T3, Armour Thyroid, levothyroxine, liothyronine, and thyroid-related symptom workups.", pattern: /thyroid|tsh|free-t4|free-t3|levothyroxine|liothyronine|armour/i },
  ],
};

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: "https://womenrx.com/hrt" },
};

export default function Page() {
  return <PillarPage config={config} />;
}
