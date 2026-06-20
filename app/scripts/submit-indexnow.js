#!/usr/bin/env node
const fs = require("node:fs");

const BASE = "https://healthrx.com";
const KEY = "9740d925e8c32efd1062256ca1de18ad";
const KEY_LOCATION = `${BASE}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const manifest = JSON.parse(fs.readFileSync("public/manifests/articles.json", "utf8"));

const staticRoutes = [
  "/",
  "/about",
  "/faq",
  "/contact-us",
  "/editorial-policy",
  "/glp-1",
  "/hrt",
  "/peptides",
  "/semaglutide",
  "/tirzepatide",
  "/weight-loss-intake",
  "/llms.txt",
  "/sitemap.xml",
];
const topicRoutes = [...new Set(manifest.map((a) => `/${a.topic}`))];
const articleRoutes = manifest.map((a) => `/${a.topic}/${a.slug}`);
const urls = [...staticRoutes, ...topicRoutes, ...articleRoutes].map((p) => `${BASE}${p}`);

async function submitBatch(urlList) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: "healthrx.com",
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });
  console.log(`${res.status} ${res.statusText}: ${urlList.length} urls`);
  if (!res.ok && res.status !== 202) {
    console.log(await res.text());
  }
}

(async () => {
  for (let i = 0; i < urls.length; i += 10000) {
    await submitBatch(urls.slice(i, i + 10000));
  }
})();
