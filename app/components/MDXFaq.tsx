/** MDX-friendly FAQ. Use as:
 *    <FAQAccordionMDX>
 *      <FAQ q="..." a="..." />
 *      <FAQ q="..." a="..." />
 *    </FAQAccordionMDX>
 *
 * Each FAQ child renders a <details>/<summary> item with the same styling
 * as the array-prop FAQAccordion. We render the FAQs from children so the
 * writer can author them as JSX in MDX.
 */
import type { ReactNode } from "react";

type FAQItem = {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
};

export function FAQAccordionMDX({ children, items }: { children?: ReactNode; items?: FAQItem[] }) {
  return (
    <section aria-labelledby="faq-heading" className="article-faq">
      <h2 id="faq-heading">Frequently asked questions</h2>
      <div>
        {children}
        {items?.map((item, index) => (
          <FAQ
            key={`${item.question || item.q}-${index}`}
            q={item.question || item.q || ""}
            a={item.answer || item.a || ""}
          />
        ))}
      </div>
    </section>
  );
}

export function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <details>
      <summary>
        <span>›</span>
        {q}
      </summary>
      <div>{a}</div>
    </details>
  );
}
