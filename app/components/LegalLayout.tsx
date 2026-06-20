import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { PageHero } from "./PageHero";
import { C, PAGE_X, MAX_W_PROSE } from "@/lib/design";

/**
 * Legal/policy page wrapper.
 * Pattern: bone-tone sticky nav over dark PageHero → cream prose article → dark footer.
 * The bone-tone nav keeps text legible over the dark hero panel.
 */
export function LegalLayout({
  eyebrow,
  title,
  effective,
  children,
}: {
  eyebrow: string;
  title: string;
  effective?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteNav tone="bone" />
      <PageHero eyebrow={eyebrow} title={title} meta={effective} />
      <article
        style={{
          background: C.paper,
          padding: `clamp(56px, 7vw, 88px) ${PAGE_X} clamp(80px, 11vw, 144px)`,
        }}
      >
        <div className="prose" style={{ maxWidth: MAX_W_PROSE, margin: "0 auto" }}>
          {children}
        </div>
      </article>
      <SiteFooter />
    </>
  );
}
