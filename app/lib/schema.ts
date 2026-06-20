/**
 * JSON-LD schema generators for WomanRx.com medical content.
 *
 * Every article emits a single <script type="application/ld+json"> graph
 * containing: MedicalWebPage + (Drug | MedicalCondition | MedicalProcedure)
 * + Person author + Physician reviewer + FAQPage + BreadcrumbList +
 * ImageObject (for the hero/featured image).
 *
 * Reference: schema.org/docs/meddocs.html
 */

import { Author, getAuthor } from "./authors";

export type SchemaContext = "https://schema.org";

export type Reference = {
  /** Vancouver-style reference */
  title: string;
  authors?: string;
  journal?: string;
  year?: number;
  url: string; // PubMed / DOI / FDA / guideline URL
};

export type FAQ = { question: string; answer: string };

export type DrugAbout = {
  kind: "drug";
  name: string; // semaglutide
  brandNames?: string[]; // Wegovy, Ozempic
  drugClass?: string;
  activeIngredient?: string;
  dosageForm?: string;
  administrationRoute?: string;
  prescriptionStatus?: "PrescriptionOnly" | "OTC";
  indication?: string;
  doseSchedule?: { value: string; unit: string; frequency: string; population?: string };
  warning?: string;
};

export type ConditionAbout = { kind: "condition"; name: string; alternateName?: string[]; possibleTreatment?: string[] };

export type ProcedureAbout = { kind: "procedure"; name: string; bodyLocation?: string; followup?: string };

export type About = DrugAbout | ConditionAbout | ProcedureAbout;

export type ArticleSchemaInput = {
  url: string;                 // absolute canonical
  title: string;
  headline?: string;
  description: string;
  datePublished: string;       // ISO with offset
  dateModified: string;        // ISO with offset
  lastReviewed: string;        // ISO date (yyyy-mm-dd)
  authorSlug: string;          // -> authors registry
  reviewerSlug: string;        // -> authors registry (Physician)
  heroImage?: { url: string; width: number; height: number; alt: string; caption?: string };
  about?: About;
  faqs?: FAQ[];
  references?: Reference[];
  breadcrumbs?: { name: string; url: string }[]; // includes self at the end
  specialty?: string;          // schema.org medical specialty enum url
};

const ORG_ID = "https://womanrx.com/#organization";

export const WOMANRX_ORGANIZATION = {
  "@type": "MedicalOrganization",
  "@id": ORG_ID,
  name: "WomanRx.com",
  url: "https://womanrx.com",
  logo: "https://womanrx.com/logo.png",
};

function personNode(a: Author) {
  const credentials = (a.credentials || []).map((c) => ({
    "@type": "EducationalOccupationalCredential",
    credentialCategory: c.category,
    recognizedBy: c.recognizedBy ? { "@type": "Organization", name: c.recognizedBy } : undefined,
    name: c.name,
  }));
  return {
    "@type": a.role === "physician" ? "Physician" : "Person",
    "@id": `https://womanrx.com/authors/${a.slug}#person`,
    name: a.name,
    honorificSuffix: a.honorificSuffix,
    jobTitle: a.jobTitle,
    url: `https://womanrx.com/authors/${a.slug}`,
    image: a.imageUrl,
    worksFor: { "@id": ORG_ID },
    alumniOf: a.alumniOf,
    medicalSpecialty: a.medicalSpecialty,
    hasCredential: credentials,
    sameAs: a.sameAs.filter(Boolean).length ? a.sameAs.filter(Boolean) : undefined,
  };
}

function aboutNode(about: About) {
  if (about.kind === "drug") {
    return {
      "@type": "Drug",
      "@id": `#${slugify(about.name)}`,
      name: about.name,
      nonProprietaryName: about.name,
      alternateName: about.brandNames,
      drugClass: about.drugClass ? { "@type": "DrugClass", name: about.drugClass } : undefined,
      activeIngredient: about.activeIngredient,
      dosageForm: about.dosageForm,
      administrationRoute: about.administrationRoute,
      prescriptionStatus: about.prescriptionStatus,
      indication: about.indication
        ? { "@type": "ApprovedIndication", name: about.indication }
        : undefined,
      doseSchedule: about.doseSchedule
        ? {
            "@type": "RecommendedDoseSchedule",
            doseValue: about.doseSchedule.value,
            doseUnit: about.doseSchedule.unit,
            frequency: about.doseSchedule.frequency,
            targetPopulation: about.doseSchedule.population,
          }
        : undefined,
      warning: about.warning,
    };
  }
  if (about.kind === "condition") {
    return {
      "@type": "MedicalCondition",
      "@id": `#${slugify(about.name)}`,
      name: about.name,
      alternateName: about.alternateName,
      possibleTreatment: about.possibleTreatment?.map((n) => ({ "@type": "MedicalTherapy", name: n })),
    };
  }
  return {
    "@type": "MedicalProcedure",
    "@id": `#${slugify(about.name)}`,
    name: about.name,
    bodyLocation: about.bodyLocation,
    followup: about.followup,
  };
}

function faqNode(faqs: FAQ[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

function breadcrumbNode(crumbs: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

function imageNode(img: NonNullable<ArticleSchemaInput["heroImage"]>) {
  return {
    "@type": "ImageObject",
    "@id": `${img.url}#image`,
    contentUrl: img.url,
    url: img.url,
    width: img.width,
    height: img.height,
    caption: img.caption || img.alt,
    creditText: "WomanRx.com Clinical",
    creator: { "@id": ORG_ID },
  };
}

function refNode(r: Reference) {
  return {
    "@type": "ScholarlyArticle",
    name: r.title,
    author: r.authors,
    datePublished: r.year ? String(r.year) : undefined,
    isPartOf: r.journal ? { "@type": "Periodical", name: r.journal } : undefined,
    url: r.url,
  };
}

export function buildArticleGraph(input: ArticleSchemaInput) {
  const author = getAuthor(input.authorSlug);
  const reviewer = getAuthor(input.reviewerSlug);
  if (!author || !reviewer) throw new Error(`Unknown author/reviewer: ${input.authorSlug}/${input.reviewerSlug}`);

  const webpage = {
    "@type": "MedicalWebPage",
    "@id": `${input.url}#webpage`,
    url: input.url,
    name: input.title,
    headline: input.headline || input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    lastReviewed: input.lastReviewed,
    audience: { "@type": "MedicalAudience", audienceType: "Patient" },
    specialty: input.specialty,
    inLanguage: "en-US",
    mainContentOfPage: { "@type": "WebPageElement", cssSelector: "article" },
    about: input.about ? { "@id": `#${slugify(getAboutName(input.about))}` } : undefined,
    author: { "@id": `https://womanrx.com/authors/${input.authorSlug}#person` },
    reviewedBy: { "@id": `https://womanrx.com/authors/${input.reviewerSlug}#person` },
    publisher: { "@id": ORG_ID },
    primaryImageOfPage: input.heroImage ? { "@id": `${input.heroImage.url}#image` } : undefined,
    citation: input.references?.map(refNode),
  };

  const graph: object[] = [
    webpage,
    personNode(author),
    WOMANRX_ORGANIZATION,
  ];
  if (reviewer.slug !== author.slug) graph.push(personNode(reviewer));
  if (input.about) graph.push(aboutNode(input.about));
  if (input.heroImage) graph.push(imageNode(input.heroImage));
  if (input.faqs && input.faqs.length) graph.push(faqNode(input.faqs));
  if (input.breadcrumbs && input.breadcrumbs.length) graph.push(breadcrumbNode(input.breadcrumbs));

  return { "@context": "https://schema.org", "@graph": stripUndefined(graph) };
}

/** Drop undefined keys recursively — JSON-LD validators dislike them. */
function stripUndefined<T>(v: T): T {
  if (Array.isArray(v)) return v.map(stripUndefined).filter((x) => x !== undefined) as unknown as T;
  if (v && typeof v === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
      if (val === undefined) continue;
      const cleaned = stripUndefined(val);
      if (cleaned !== undefined && (typeof cleaned !== "object" || Array.isArray(cleaned) || Object.keys(cleaned as object).length)) {
        out[k] = cleaned;
      }
    }
    return out as T;
  }
  return v;
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function getAboutName(a: About) {
  return a.name;
}
