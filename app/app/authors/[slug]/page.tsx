import { permanentRedirect } from "next/navigation";
import Image from "next/image";
import { getAuthor, listAuthors } from "@/lib/authors";

export function generateStaticParams() {
  return listAuthors().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getAuthor(slug);
  if (!a) return {};
  return {
    title: a.name.includes("WomanRx") ? a.name : `${a.name} | WomanRx.com Medical Team`,
    description: a.bio.slice(0, 160),
    alternates: { canonical: `https://womenrx.com/authors/${a.slug}` },
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getAuthor(slug);
  if (!a) permanentRedirect("/");

  const personSchema = {
    "@context": "https://schema.org",
    "@type": a.role === "physician" ? "Physician" : "Person",
    name: a.name,
    honorificSuffix: a.honorificSuffix,
    jobTitle: a.jobTitle,
    url: `https://womenrx.com/authors/${a.slug}`,
    image: a.imageUrl,
    medicalSpecialty: a.medicalSpecialty,
    worksFor: { "@type": "MedicalOrganization", "@id": "https://womenrx.com/#organization", name: "WomanRx.com" },
    alumniOf: a.alumniOf,
    hasCredential: (a.credentials || []).map((c) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: c.category,
      name: c.name,
      recognizedBy: c.recognizedBy ? { "@type": "Organization", name: c.recognizedBy } : undefined,
    })),
    sameAs: a.sameAs.filter(Boolean),
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <header className="flex items-start gap-6">
        {a.imageUrl && (
          <Image src={a.imageUrl} alt={a.name} width={120} height={120} className="rounded-full border border-slate-200" />
        )}
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">
            {a.name}{a.honorificSuffix ? `, ${a.honorificSuffix}` : ""}
          </h1>
          <p className="mt-1 text-slate-600">{a.jobTitle}</p>
        </div>
      </header>

      <section className="mt-8">
        <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500">About</h2>
        <p className="mt-2 text-slate-800 leading-relaxed">{a.bio}</p>
      </section>

      {a.credentials && a.credentials.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500">Credentials</h2>
          <ul className="mt-2 list-disc pl-6 space-y-1 text-slate-800">
            {a.credentials.map((c) => (
              <li key={`${c.category}-${c.name}`}>
                <span className="font-medium">{c.name}</span>
                {c.recognizedBy ? <span className="text-slate-600"> — {c.recognizedBy}</span> : null}
              </li>
            ))}
          </ul>
        </section>
      )}

      {a.expertiseAreas.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500">Areas of expertise</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {a.expertiseAreas.map((e) => (
              <li key={e} className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-800 border border-emerald-200">{e}</li>
            ))}
          </ul>
        </section>
      )}

      {a.sameAs.filter(Boolean).length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500">Verified profiles</h2>
          <ul className="mt-2 flex flex-col gap-1">
            {a.sameAs.filter(Boolean).map((url) => (
              <li key={url}>
                <a href={url} rel="me noopener" target="_blank" className="text-emerald-700 hover:underline break-all">{url}</a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
        <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500">Editorial methodology</h2>
        <p className="mt-2">
          Every article authored or reviewed by the WomanRx.com medical team is drafted from primary sources (peer-reviewed RCTs, FDA labels, society guidelines), reviewed against current clinical practice, and re-reviewed by a second board-certified clinician before publication. We update content within 30 days of any major guideline change. Conflicts of interest are disclosed on the methodology page.
        </p>
      </section>
    </main>
  );
}
