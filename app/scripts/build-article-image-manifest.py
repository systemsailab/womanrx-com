#!/usr/bin/env python3
"""Assign a real hero image to every clean HealthRX.com article.

The app consumes public/manifests/article-images.json at runtime. This script
keeps images out of the repo/deploy bundle by storing remote licensed image
URLs and credit metadata instead of thousands of binary files.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
APP = ROOT / "app"
ARTICLES = APP / "public" / "manifests" / "articles.json"
OUT = APP / "public" / "manifests" / "article-images.json"
LOCAL_HERO_DIR = APP / "public" / "media" / "article-heroes"
MASTER_ENV = Path("/root/projects/MASTER_ENV_AND_ACCESS")

IMAGE_QUERIES = {
    "access": "pharmacist giving prescription patient pharmacy counter",
    "glp": "diabetes injection pen healthy nutrition",
    "hrt": "doctor consultation hormone therapy patient",
    "peptides": "laboratory scientist vial syringe",
    "thyroid": "doctor thyroid exam patient throat",
    "labs": "blood sample laboratory test tube",
    "safety": "doctor reviewing medication patient",
    "cardio": "heart health doctor consultation patient",
    "skin": "dermatology skincare medicine patient",
    "sleep": "sleep medicine doctor consultation patient",
    "bone": "bone health medical consultation patient",
    "cognition": "brain health doctor consultation patient",
    "sexual": "doctor consultation prescription medicine patient",
    "general": "doctor consultation prescription medicine patient",
}


def load_env_key(name: str) -> str:
    if os.environ.get(name):
        return os.environ[name]
    if MASTER_ENV.exists():
        for line in MASTER_ENV.read_text().splitlines():
            if line.startswith(f"{name}="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    return ""


def classify(article: dict[str, Any]) -> str:
    explicit = " ".join(
        [
            article.get("topic", ""),
            article.get("slug", ""),
            article.get("title", ""),
        ]
    ).lower()
    text = " ".join(
        [
            article.get("topic", ""),
            article.get("slug", ""),
            article.get("title", ""),
            article.get("description", ""),
            " ".join(article.get("keywords") or []),
        ]
    ).lower()
    if any(s in text for s in ["access", "coverage", "cost", "insurance", "medicare", "medicaid", "copay", "coupon", "patient assistance", "va coverage"]):
        return "access"
    if any(s in explicit for s in ["side effect", "side-effect", "safety", "warning", "risk", "pregnancy", "renal", "hepatic", "contraindication", "adverse"]):
        return "safety"
    if any(s in text for s in ["hba1c", "ldl", "hdl", "cmp", "cbc", "apob", "egfr", "lab", "biomarker"]):
        return "labs"
    if any(s in text for s in ["thyroid", "tsh", "levothyroxine", "liothyronine", "armour"]):
        return "thyroid"
    if any(s in text for s in ["glp", "semaglutide", "tirzepatide", "ozempic", "wegovy", "mounjaro", "zepbound", "rybelsus", "saxenda"]):
        return "glp"
    if any(s in text for s in ["hrt", "trt", "testosterone", "androgel", "estradiol", "progesterone", "menopause", "enclomiphene"]):
        return "hrt"
    if any(s in text for s in ["peptide", "bpc", "cjc", "ipamorelin", "sermorelin", "tesamorelin", "tb-500", "ghk", "aod-9604"]):
        return "peptides"
    if any(s in text for s in ["heart", "cardio", "blood pressure", "cholesterol", "statin", "eliquis", "lipitor"]):
        return "cardio"
    if any(s in text for s in ["skin", "hair", "dermatology", "acne", "dupixent", "tretinoin"]):
        return "skin"
    if any(s in text for s in ["sleep", "insomnia", "zolpidem", "trazodone", "suvorexant"]):
        return "sleep"
    if any(s in text for s in ["bone", "osteoporosis", "prolia", "denosumab", "alendronate"]):
        return "bone"
    if any(s in text for s in ["adhd", "adderall", "vyvanse", "ritalin", "modafinil", "cognition"]):
        return "cognition"
    if any(s in text for s in ["sexual", "viagra", "cialis", "sildenafil", "tadalafil"]):
        return "sexual"
    return "general"


def stable_index(key: str, n: int) -> int:
    if n <= 1:
        return 0
    digest = hashlib.sha256(key.encode("utf-8")).hexdigest()
    return int(digest[:12], 16) % n


def pexels_search(api_key: str, query: str, per_page: int) -> list[dict[str, Any]]:
    params = urllib.parse.urlencode({"query": query, "per_page": per_page, "orientation": "landscape"})
    req = urllib.request.Request(
        f"https://api.pexels.com/v1/search?{params}",
        headers={"Authorization": api_key, "User-Agent": "HealthRX.com image manifest builder"},
    )
    with urllib.request.urlopen(req, timeout=30) as res:
        payload = json.loads(res.read().decode("utf-8"))
    return payload.get("photos") or []


def article_alt(article: dict[str, Any], bucket: str) -> str:
    topic = article.get("topic", "").replace("-", " ")
    title = article.get("title", "")
    if bucket == "access":
        return f"Prescription access and medication affordability image for {title}"
    if bucket == "glp":
        return f"GLP-1 medication and metabolic health image for {title}"
    if bucket == "hrt":
        return f"Hormone therapy clinical care image for {title}"
    if bucket == "peptides":
        return f"Peptide medicine laboratory image for {title}"
    if bucket == "labs":
        return f"Medical lab testing image for {title}"
    if bucket == "safety":
        return f"Medication safety clinical consultation image for {title}"
    return f"Clinical medical image for {topic}: {title}"


def build(args: argparse.Namespace) -> int:
    articles = json.loads(ARTICLES.read_text())
    if args.limit:
        articles = articles[: args.limit]

    if args.source == "local-ai":
        manifest: dict[str, Any] = {}
        for article in articles:
            bucket = classify(article)
            image_file = LOCAL_HERO_DIR / f"{bucket}.png"
            if not image_file.exists():
                image_file = LOCAL_HERO_DIR / "general.png"
            if not image_file.exists():
                print(f"missing local AI hero for {bucket} and general", file=sys.stderr)
                return 4
            key = f"{article['topic']}/{article['slug']}"
            manifest[key] = {
                "url": f"/media/article-heroes/{image_file.name}",
                "width": 1536,
                "height": 1024,
                "alt": article_alt(article, bucket),
                "provider": "OpenAI",
                "credit": "HealthRX.com AI-generated clinical image",
                "bucket": bucket,
            }
        OUT.parent.mkdir(parents=True, exist_ok=True)
        OUT.write_text(json.dumps(manifest, separators=(",", ":")))
        print(f"wrote {len(manifest):,} local AI image assignments -> {OUT}")
        return 0

    api_key = load_env_key("PEXELS_API_KEY")
    if not api_key:
        print("PEXELS_API_KEY not found in env or MASTER_ENV_AND_ACCESS", file=sys.stderr)
        return 2

    pools: dict[str, list[dict[str, Any]]] = {}
    for bucket, query in IMAGE_QUERIES.items():
        try:
            photos = pexels_search(api_key, query, args.per_page)
            if not photos:
                raise RuntimeError("no photos returned")
            pools[bucket] = photos
            print(f"{bucket}: {len(photos)} photos for {query}", flush=True)
            time.sleep(args.sleep)
        except Exception as exc:
            print(f"warning: {bucket} search failed: {exc}", file=sys.stderr)
            pools[bucket] = pools.get("general", [])

    fallback = pools.get("general") or next((p for p in pools.values() if p), [])
    if not fallback:
        print("no usable photos returned", file=sys.stderr)
        return 3

    manifest: dict[str, Any] = {}
    for article in articles:
        bucket = classify(article)
        pool = pools.get(bucket) or fallback
        photo = pool[stable_index(f"{article['topic']}/{article['slug']}", len(pool))]
        src = photo.get("src") or {}
        url = src.get("large2x") or src.get("large") or src.get("original")
        if not url:
            continue
        key = f"{article['topic']}/{article['slug']}"
        manifest[key] = {
            "url": url,
            "width": int(photo.get("width") or 1200),
            "height": int(photo.get("height") or 800),
            "alt": article_alt(article, bucket),
            "provider": "Pexels",
            "credit": photo.get("photographer"),
            "creditUrl": photo.get("photographer_url"),
            "bucket": bucket,
        }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(manifest, separators=(",", ":")))
    print(f"wrote {len(manifest):,} image assignments -> {OUT}")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--per-page", type=int, default=80)
    parser.add_argument("--sleep", type=float, default=0.25)
    parser.add_argument("--source", choices=["local-ai", "pexels"], default="local-ai")
    return build(parser.parse_args())


if __name__ == "__main__":
    sys.exit(main())
