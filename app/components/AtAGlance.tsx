/**
 * At-a-glance fact table. Each row is one extractable fact — the AI search
 * fan-out picks these up cleanly because they're self-contained.
 */
import type { ReactNode } from "react";

export type AtAGlanceItem = { label: string; value: string };

type Props = { items?: AtAGlanceItem[]; children?: ReactNode };

export function AtAGlance({ items, children }: Props) {
  return (
    <section aria-label="At a glance" className="at-a-glance">
      <h2>At a glance</h2>
      {items && items.length > 0 ? (
        <dl>
          {items.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <div className="at-a-glance-body">
          {children}
        </div>
      )}
    </section>
  );
}
