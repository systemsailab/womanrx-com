/**
 * Canonical WomanRx.com medical article shell.
 *
 * Wraps every article in semantic HTML matching the 2026 AEO research playbook:
 *   <article itemtype=MedicalWebPage>
 *     <header>  h1 + byline + dates
 *     <TLDR>    40-60w direct answer (above the fold)
 *     <AtAGlance>  structured key facts (also above the fold)
 *     <nav>     table of contents
 *     <section> 134-167w extractable units per H2  (children)
 *     <FAQAccordion>  PAA-pulled questions with FAQPage schema
 *     <References>    numbered Vancouver-style citations
 *     <footer>  last-reviewed date + medical-disclaimer
 *
 * Injects the full JSON-LD graph as a single <script>.
 * Ships the page to render without client JS — Server Component only.
 */

import type { ReactNode } from "react";
import { buildArticleGraph, type ArticleSchemaInput, type FAQ, type Reference } from "@/lib/schema";
import { Byline } from "./Byline";
import { TLDR } from "./TLDR";
import { AtAGlance, type AtAGlanceItem } from "./AtAGlance";
import { References } from "./References";
import { Breadcrumbs } from "./Breadcrumbs";
import { ArticleMediaHeader } from "./ArticleMediaHeader";

export type MedicalArticleProps = ArticleSchemaInput & {
  /** Optional override; usually the TLDR is rendered inside the MDX body. */
  tldr?: string;
  atAGlance?: AtAGlanceItem[];
  toc?: { id: string; text: string }[];
  children: ReactNode; // the MDX body (includes its own <TLDR>, <FAQAccordion>, <References>)
  faqs?: FAQ[];
  references?: Reference[];
};

import { ArticleOfferCTA } from "@/components/ArticleOfferCTA";
import { StickyBottomCTA } from "@/components/StickyBottomCTA";

export function MedicalArticle(props: MedicalArticleProps) {
  const graph = buildArticleGraph(props);
  const pubDate = new Date(props.datePublished);
  const modDate = new Date(props.dateModified);
  const reviewDate = new Date(props.lastReviewed);
  const path = new URL(props.url).pathname.split("/").filter(Boolean);
  const topic = path[0] || "clinical";
  const slug = path[1] || props.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <>
      {/* The schema graph — exactly one per page. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <article
        itemScope
        itemType="https://schema.org/MedicalWebPage"
        className="prose medical-article"
      >
        {props.breadcrumbs && <Breadcrumbs items={props.breadcrumbs} hideCurrent />}

        <header className="medical-article-header">
          <h1>{props.title}</h1>
          <Byline
            authorSlug={props.authorSlug}
            reviewerSlug={props.reviewerSlug}
            datePublished={pubDate}
            dateModified={modDate}
            lastReviewed={reviewDate}
          />
          <ArticleMediaHeader
            topic={topic}
            slug={slug}
            title={props.title}
            image={props.heroImage}
          />
        </header>

        <div className={props.toc && props.toc.length > 0 ? "article-layout has-toc" : "article-layout"}>
          {props.toc && props.toc.length > 0 && (
            <aside className="article-sidebar">
              <nav aria-label="Table of contents" className="article-toc">
                <h2>On this page</h2>
                <ol>
                  {props.toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`}>{t.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}

          <div className="article-main">
            {props.tldr ? <TLDR text={props.tldr} /> : null}

            {props.atAGlance && props.atAGlance.length > 0 && (
              <AtAGlance items={props.atAGlance} />
            )}

            <ArticleOfferCTA variant="inline" />

            {props.children}

            <ArticleOfferCTA variant="end" />

            {props.references && props.references.length > 0 && (
              <References refs={props.references} />
            )}

            <footer className="medical-disclaimer">
              <p>
                Last medically reviewed{" "}
                <time dateTime={props.lastReviewed}>
                  {reviewDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </time>{" "}
                by the WomanRx.com Medical Team.
              </p>
              <p className="mt-2">
                This article is for educational purposes and is not a substitute for individual medical advice from a licensed clinician. Treatment decisions should be made with your prescriber based on your medical history.
              </p>
            </footer>
          </div>
        </div>
      </article>
      <StickyBottomCTA hideOnPath="/glp1-offer-v1" />
    </>
  );
}
