/**
 * Numbered Vancouver-style references. Inline citations in the body should
 * link to anchors here (#ref-1, #ref-2…). Each reference also appears as
 * a citation node in the JSON-LD graph.
 */
import type { ReactNode } from "react";
import type { Reference } from "@/lib/schema";

type ReferenceItem = Reference & {
  label?: string;
};

type Props = { refs?: Reference[]; items?: ReferenceItem[]; children?: ReactNode };

export function References({ refs, items, children }: Props) {
  const references = (refs || items) as ReferenceItem[] | undefined;
  return (
    <section aria-labelledby="references-heading" className="references-section">
      <h2 id="references-heading">
        References
      </h2>
      {children ? (
        <div>
          {children}
        </div>
      ) : references && references.length > 0 ? (
        <ol>
          {references.map((r, i) => (
            <li id={`ref-${i + 1}`} key={`${r.url}-${i}`}>
              {r.label ? (
                <span>{r.label} </span>
              ) : (
                <>
                  {r.authors && <span>{r.authors}. </span>}
                  {r.title && <span className="italic">{r.title}.</span>}
                  {r.journal && <span> {r.journal}.</span>}
                  {r.year && <span> {r.year}.</span>}{" "}
                </>
              )}
              {r.url && (
                <a href={r.url} rel="noopener" target="_blank">
                  {r.url}
                </a>
              )}
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
