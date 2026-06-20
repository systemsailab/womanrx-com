#!/usr/bin/env node
/**
 * Pre-build: write a frontmatter-only manifest of all articles to
 * public/manifests/articles.json so the runtime function can list articles
 * without bundling 488MB of MDX bodies.
 *
 * Bodies are fetched on demand from GitHub raw (cached by Vercel forever).
 */
const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');

const CONTENT_ROOT = path.join(__dirname, '..', 'content');
const OUT_DIR = path.join(__dirname, '..', 'public', 'manifests');
const OUT = path.join(OUT_DIR, 'articles.json');
const VOCAB_OUT = path.join(OUT_DIR, 'link-vocab.json');
const IMAGES_OUT = path.join(OUT_DIR, 'article-images.json');
const DATA_ROOT = path.join(__dirname, '..', '..', 'content-engine', 'data');

if (!fs.existsSync(CONTENT_ROOT)) {
  console.error(`ERROR: content directory not found at ${CONTENT_ROOT}`);
  process.exit(1);
}

const articles = [];
const skipped = { hidden: 0, failed: 0, missingFrontmatter: 0, badSlug: 0 };
const topics = fs.readdirSync(CONTENT_ROOT).filter((t) => {
  try { return fs.statSync(path.join(CONTENT_ROOT, t)).isDirectory(); }
  catch { return false; }
});

for (const topic of topics) {
  const dir = path.join(CONTENT_ROOT, topic);
  for (const f of fs.readdirSync(dir)) {
    if (f.startsWith('.') || f.startsWith('._')) {
      skipped.hidden++;
      continue;
    }
    if (!f.endsWith('.mdx')) continue;
    if (f.endsWith('.FAILED.mdx')) {
      skipped.failed++;
      continue;
    }
    try {
      const fm = matter(fs.readFileSync(path.join(dir, f), 'utf-8'));
      const d = fm.data || {};
      const slug = f.replace(/\.mdx$/, '');
      if (/[A-Z_ ]/.test(slug) || slug.includes('/') || slug.includes('//')) {
        skipped.badSlug++;
        continue;
      }
      if (
        !d.title ||
        !d.description ||
        !d.datePublished ||
        !d.lastReviewed ||
        !d.authorSlug ||
        !d.reviewerSlug ||
        !Array.isArray(d.keywords) ||
        d.keywords.length === 0
      ) {
        skipped.missingFrontmatter++;
        continue;
      }
      // Strip out heavy fields — manifest is for listing, not rendering
      articles.push({
        topic,
        slug,
        title: d.title,
        description: d.description,
        datePublished: d.datePublished,
        dateModified: d.dateModified,
        lastReviewed: d.lastReviewed,
        authorSlug: d.authorSlug,
        reviewerSlug: d.reviewerSlug,
        about: d.about,
        keywords: d.keywords,
      });
    } catch (e) {
      console.warn(`  skipping ${topic}/${f}: ${e.message}`);
    }
  }
}

function readJson(name) {
  try {
    return JSON.parse(fs.readFileSync(path.join(DATA_ROOT, name), 'utf-8'));
  } catch {
    return [];
  }
}

function buildLinkVocab() {
  const out = [];
  const seen = new Set();
  const add = (term, url) => {
    if (!term || !url) return;
    const clean = String(term).trim();
    const key = clean.toLowerCase();
    if (clean.length < 3 || seen.has(key)) return;
    seen.add(key);
    out.push({ term: clean, url });
  };

  for (const d of readJson('drugs.json')) {
    add(d.name, `/${d.slug}`);
    if (d.generic && d.generic !== d.name) add(d.generic, `/${d.slug}`);
  }
  for (const c of readJson('conditions.json')) {
    const name = c.name || c.slug?.replace(/-/g, ' ');
    if (name) add(name, `/conditions-${c.slug}/diagnosis-algorithm`);
  }
  for (const l of readJson('biomarkers.json')) {
    add(l.name, `/labs-${l.slug}/what-it-measures`);
  }
  for (const c of readJson('drug_classes.json')) {
    add(c.name, `/classes-${c.slug}/class-overview-monograph`);
  }

  return out.sort((a, b) => b.term.length - a.term.length);
}

function hashIndex(key, n) {
  if (n <= 1) return 0;
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return hash % n;
}

function classifyImageBucket(article) {
  const explicit = [article.topic, article.slug, article.title].join(' ').toLowerCase();
  const text = [
    article.topic,
    article.slug,
    article.title,
    article.description,
    ...(article.keywords || []),
  ].join(' ').toLowerCase();
  if (/access|coverage|cost|insurance|medicare|medicaid|copay|coupon|patient assistance|va coverage/.test(text)) return 'access';
  if (/side effect|side-effect|safety|warning|risk|pregnancy|renal|hepatic|contraindication|adverse/.test(explicit)) return 'safety';
  if (/hba1c|ldl|hdl|cmp|cbc|apob|egfr|lab|biomarker/.test(text)) return 'labs';
  if (/thyroid|tsh|levothyroxine|liothyronine|armour/.test(text)) return 'thyroid';
  if (/glp|semaglutide|tirzepatide|ozempic|wegovy|mounjaro|zepbound|rybelsus|saxenda/.test(text)) return 'glp';
  if (/hrt|trt|testosterone|androgel|estradiol|progesterone|menopause|enclomiphene/.test(text)) return 'hrt';
  if (/peptide|bpc|cjc|ipamorelin|sermorelin|tesamorelin|tb-500|ghk|aod-9604/.test(text)) return 'peptides';
  if (/heart|cardio|blood pressure|cholesterol|statin|eliquis|lipitor/.test(text)) return 'cardio';
  if (/skin|hair|dermatology|acne|dupixent|tretinoin/.test(text)) return 'skin';
  if (/sleep|insomnia|zolpidem|trazodone|suvorexant/.test(text)) return 'sleep';
  if (/bone|osteoporosis|prolia|denosumab|alendronate/.test(text)) return 'bone';
  if (/adhd|adderall|vyvanse|ritalin|modafinil|cognition/.test(text)) return 'cognition';
  if (/sexual|viagra|cialis|sildenafil|tadalafil/.test(text)) return 'sexual';
  return 'general';
}

function imageAlt(article, bucket) {
  if (bucket === 'access') return `Prescription access and medication affordability image for ${article.title}`;
  if (bucket === 'glp') return `GLP-1 medication and metabolic health image for ${article.title}`;
  if (bucket === 'hrt') return `Hormone therapy clinical care image for ${article.title}`;
  if (bucket === 'peptides') return `Peptide medicine laboratory image for ${article.title}`;
  if (bucket === 'labs') return `Medical lab testing image for ${article.title}`;
  if (bucket === 'safety') return `Medication safety clinical consultation image for ${article.title}`;
  return `Clinical medical image for ${article.topic.replace(/-/g, ' ')}: ${article.title}`;
}

function syncArticleImages(articleList) {
  if (!fs.existsSync(IMAGES_OUT)) return { status: 'missing', count: 0 };
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(IMAGES_OUT, 'utf-8'));
  } catch {
    return { status: 'invalid', count: 0 };
  }

  const pools = {};
  for (const image of Object.values(manifest)) {
    const bucket = image.bucket || 'general';
    pools[bucket] ||= [];
    if (!pools[bucket].some((entry) => entry.url === image.url)) pools[bucket].push(image);
  }
  const fallback = pools.general || Object.values(pools).find((pool) => pool.length) || [];
  let added = 0;
  for (const article of articleList) {
    const key = `${article.topic}/${article.slug}`;
    if (manifest[key]) continue;
    const bucket = classifyImageBucket(article);
    const pool = pools[bucket] || fallback;
    if (!pool.length) continue;
    const source = pool[hashIndex(key, pool.length)];
    manifest[key] = {
      ...source,
      alt: imageAlt(article, bucket),
      bucket,
    };
    added++;
  }
  fs.writeFileSync(IMAGES_OUT, JSON.stringify(manifest));
  return { status: 'synced', count: Object.keys(manifest).length, added };
}

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(articles));
const vocab = buildLinkVocab();
fs.writeFileSync(VOCAB_OUT, JSON.stringify(vocab));
const imageSync = syncArticleImages(articles);
console.log(`  wrote ${articles.length.toLocaleString()} article entries → ${OUT}`);
console.log(`  manifest size: ${(fs.statSync(OUT).size / 1024 / 1024).toFixed(2)} MB`);
console.log(`  wrote ${vocab.length.toLocaleString()} internal-link terms → ${VOCAB_OUT}`);
if (imageSync.status === 'synced') {
  console.log(`  synced ${imageSync.count.toLocaleString()} article image assignments (+${imageSync.added || 0}) → ${IMAGES_OUT}`);
} else {
  console.log(`  article image sync skipped: ${imageSync.status}`);
}
console.log(`  skipped: ${JSON.stringify(skipped)}`);
