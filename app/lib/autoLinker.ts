/**
 * In-body auto-linker. Wraps the first occurrence of known drug, condition,
 * and lab names with markdown links to their canonical WomanRx.com pages.
 *
 * Runs at article-render time (cached after first hit via ISR), so cost
 * amortizes to zero.
 *
 * Safe by construction:
 *   - skips JSX-tag content (anything between < and > on a line)
 *   - skips lines starting with whitespace then ` ``` ` (code fence)
 *   - skips lines that look like Markdown headings (# / ## / ###)
 *   - skips lines that already contain a `]( ... )` for the same term
 *   - only links the first occurrence of any term per article
 */

import fs from "node:fs";
import path from "node:path";

type Entry = { term: string; url: string };

let _vocabCache: Entry[] | null = null;

function loadVocab(): Entry[] {
  if (_vocabCache) return _vocabCache || [];
  try {
    const manifestPath = path.join(process.cwd(), "public", "manifests", "link-vocab.json");
    _vocabCache = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  } catch {
    _vocabCache = [];
  }
  return _vocabCache || [];
}

/**
 * Apply auto-links to an MDX source string. First occurrence of each known
 * term is wrapped in a Markdown link. Skips JSX/code/headings/existing-links.
 */
export function applyAutoLinks(source: string, currentTopic: string): string {
  const vocab = loadVocab();
  if (vocab.length === 0) return source;

  const lines = source.split("\n");
  const usedTerms = new Set<string>();
  // Skip terms whose URL matches the current page (don't self-link)
  const skipUrl = `/${currentTopic}`;

  // Pre-build per-line skip mask: lines that are JSX-only, code, headings, or
  // fully inside a JSX tag block.
  let inCodeFence = false;
  const linkableMask: boolean[] = lines.map((line) => {
    const t = line.trim();
    if (t.startsWith("```")) {
      inCodeFence = !inCodeFence;
      return false;
    }
    if (inCodeFence) return false;
    if (t.startsWith("#")) return false; // markdown heading
    if (t.startsWith("|")) return false; // table row — skip to avoid breaking pipes
    // very loose: lines starting with < and ending with > on same line = JSX
    if (/^<[A-Z][^>]*>$/.test(t) || /^<\/[A-Z][^>]*>$/.test(t)) return false;
    return true;
  });

  for (let i = 0; i < lines.length; i++) {
    if (!linkableMask[i]) continue;
    let line = lines[i];
    // Skip lines that already have many links — leave alone
    if ((line.match(/\]\(/g) || []).length > 3) continue;

    for (const { term, url } of vocab) {
      if (usedTerms.has(term.toLowerCase())) continue;
      if (url.startsWith(skipUrl + "/") || url === skipUrl) continue;
      // Word-boundary, case-insensitive, but only if not already inside [...]() or <...>
      const re = new RegExp(`\\b(${escapeRegex(term)})\\b`, "i");
      const m = re.exec(line);
      if (!m) continue;
      const idx = m.index;
      // Skip if inside an existing [..](..) link
      if (isInsideLink(line, idx)) continue;
      // Skip if inside a JSX tag opener
      if (isInsideTag(line, idx)) continue;
      const matched = m[1];
      line = line.slice(0, idx) + `[${matched}](${url})` + line.slice(idx + matched.length);
      usedTerms.add(term.toLowerCase());
    }
    lines[i] = line;
  }

  return lines.join("\n");
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isInsideLink(line: string, idx: number): boolean {
  // Walk left from idx: if we hit a `[` before a `]`, we're inside link text
  const left = line.slice(0, idx);
  const lastOpen = left.lastIndexOf("[");
  const lastClose = left.lastIndexOf("]");
  if (lastOpen > lastClose) return true;
  // Also check if we're inside the URL part: look for `](` to our left, `)` not yet
  const lastParen = left.lastIndexOf("](");
  const lastCloseParen = left.lastIndexOf(")");
  if (lastParen > lastCloseParen) return true;
  return false;
}

function isInsideTag(line: string, idx: number): boolean {
  const left = line.slice(0, idx);
  const lastLt = left.lastIndexOf("<");
  const lastGt = left.lastIndexOf(">");
  return lastLt > lastGt;
}
