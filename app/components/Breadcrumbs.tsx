import Link from "next/link";

export function Breadcrumbs({
  items,
  hideCurrent = false,
}: {
  items: { name: string; url: string }[];
  hideCurrent?: boolean;
}) {
  const visibleItems = hideCurrent ? items.slice(0, -1) : items;
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <ol>
        {visibleItems.map((c, i) => {
          const last = i === visibleItems.length - 1;
          return (
            <li key={c.url}>
              {last && !hideCurrent ? (
                <span aria-current="page">{c.name}</span>
              ) : (
                <Link href={c.url}>{c.name}</Link>
              )}
              {!last && <span aria-hidden>›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
