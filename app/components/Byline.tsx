import Link from "next/link";
import { getAuthor } from "@/lib/authors";

type Props = {
  authorSlug: string;
  reviewerSlug: string;
  datePublished: Date;
  dateModified: Date;
  lastReviewed: Date;
};

function fmt(d: Date) {
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function Byline({ authorSlug, reviewerSlug, datePublished, dateModified, lastReviewed }: Props) {
  const author = getAuthor(authorSlug);
  const reviewer = getAuthor(reviewerSlug);
  if (!author || !reviewer) return null;
  const sameReviewer = author.slug === reviewer.slug;

  return (
    <div className="article-byline">
      <div className="article-byline-people">
        <span>
          By{" "}
          <Link href={`/authors/${author.slug}`} rel="author">
            {author.name}
            {author.honorificSuffix ? `, ${author.honorificSuffix}` : ""}
          </Link>
        </span>
        {!sameReviewer && (
          <>
            <span className="article-byline-separator" aria-hidden="true"> · </span>
            <span>
              Medically reviewed by{" "}
              <Link href={`/authors/${reviewer.slug}`}>
                {reviewer.name}
                {reviewer.honorificSuffix ? `, ${reviewer.honorificSuffix}` : ""}
              </Link>
            </span>
          </>
        )}
      </div>
      <div className="article-byline-dates">
        <span>
          Published <time dateTime={datePublished.toISOString()}>{fmt(datePublished)}</time>
        </span>
        <span className="article-byline-separator" aria-hidden="true"> · </span>
        <span>
          Updated <time dateTime={dateModified.toISOString()}>{fmt(dateModified)}</time>
        </span>
        <span className="article-byline-separator" aria-hidden="true"> · </span>
        <span>
          Last reviewed <time dateTime={lastReviewed.toISOString()}>{fmt(lastReviewed)}</time>
        </span>
      </div>
    </div>
  );
}
