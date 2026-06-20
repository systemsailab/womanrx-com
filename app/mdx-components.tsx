/**
 * Maps MDX tags + custom components used inside article MDX files to React
 * components. The writer prompt emits <TLDR>, <AtAGlance>, <FAQAccordion>,
 * <References> directly inside the MDX body.
 */
import type { MDXComponents } from "mdx/types";
import { TLDR } from "@/components/TLDR";
import { AtAGlance } from "@/components/AtAGlance";
import { FAQAccordionMDX as FAQAccordion, FAQ } from "@/components/MDXFaq";
import { References } from "@/components/References";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    TLDR,
    AtAGlance,
    FAQAccordion,
    FAQ,
    References,
    h2: (props) => <h2 {...props} className="text-2xl font-semibold mt-10 mb-3 text-slate-900" />,
    h3: (props) => <h3 {...props} className="text-xl font-semibold mt-8 mb-2 text-slate-900" />,
    p:  (props) => <p {...props} className="my-4 leading-relaxed text-slate-800" />,
    ul: (props) => <ul {...props} className="list-disc pl-6 my-4 space-y-1 text-slate-800" />,
    ol: (props) => <ol {...props} className="list-decimal pl-6 my-4 space-y-1 text-slate-800" />,
    a:  (props) => <a {...props} className="text-emerald-700 hover:underline" target={props.href?.startsWith("http") ? "_blank" : undefined} rel={props.href?.startsWith("http") ? "noopener" : undefined} />,
    table: (props) => <div className="overflow-x-auto"><table {...props} className="my-6 w-full border-collapse text-sm" /></div>,
    th: (props) => <th {...props} className="border border-slate-200 bg-slate-50 px-3 py-2 text-left font-medium text-slate-700" />,
    td: (props) => <td {...props} className="border border-slate-200 px-3 py-2 text-slate-800" />,
    blockquote: (props) => <blockquote {...props} className="border-l-4 border-slate-300 pl-4 italic text-slate-700 my-4" />,
  };
}
