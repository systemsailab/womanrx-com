/**
 * FAQ section using native <details>/<summary> so it renders without JS.
 * The accompanying FAQPage schema is emitted from MedicalArticle's graph.
 * Questions and answers MUST be fully visible per Google's FAQ-schema rule.
 */
import type { FAQ } from "@/lib/schema";

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  return (
    <section aria-labelledby="faq-heading" className="article-faq">
      <h2 id="faq-heading">
        Frequently asked questions
      </h2>
      <div>
        {faqs.map((q) => (
          <details
            key={q.question}
          >
            <summary>
              <span>›</span>
              {q.question}
            </summary>
            <div>{q.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
