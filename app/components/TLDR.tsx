/**
 * 40-60 word direct-answer box for AI Overview extraction.
 * Sits above the fold immediately after the byline.
 */
export function TLDR({ text }: { text?: string }) {
  if (!text) return null;
  const wc = text.trim().split(/\s+/).length;
  if (process.env.NODE_ENV !== "production" && (wc < 30 || wc > 80)) {
    // soft guardrail — the AI-extractor sweet spot is 40-60 words
    console.warn(`TLDR is ${wc} words; target 40-60.`);
  }
  return (
    <aside
      aria-label="Quick answer"
      className="quick-answer"
    >
      <p>
        <span>Quick answer.</span> {text}
      </p>
    </aside>
  );
}
