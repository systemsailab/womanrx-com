#!/usr/bin/env python3
"""Generate local AI hero images for HealthRX.com article archetypes.

These are intentionally text-free, label-free editorial medical images that
can be reused across thousands of pages by article bucket without depending on
third-party hotlinked photos that may contain visible packaging text.
"""
from __future__ import annotations

import base64
import json
import os
import sys
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT_DIR = ROOT / "app" / "public" / "media" / "article-heroes"
MASTER_ENV = Path("/root/projects/MASTER_ENV_AND_ACCESS")

PROMPTS = {
    "access": "A premium editorial healthcare hero photograph for a medical article about prescription access and medication affordability: pharmacist hands a plain unlabeled medicine bag and a blank insurance-style card to a patient across a clean pharmacy counter, warm natural light, shallow depth of field, modern clinical setting, no readable text, no labels, no logos, no brand names, no watermark, no packaging text.",
    "glp": "A premium editorial healthcare hero photograph for a medical article about GLP-1 therapy: an unlabeled injection pen beside a healthy meal planning notebook and a glucose meter on a clean clinic desk, soft daylight, sophisticated medical lifestyle photography, no readable text, no labels, no logos, no brand names, no watermark.",
    "hrt": "A premium editorial healthcare hero photograph for a medical article about hormone therapy: clinician and patient reviewing an unlabeled hormone care plan on a tablet in a calm consultation room, subtle medication patch and plain vial on the desk, soft warm clinical lighting, no readable text, no labels, no logos, no brand names, no watermark.",
    "peptides": "A premium editorial healthcare hero photograph for a medical article about peptide medicine: sterile laboratory bench with unlabeled vials, syringe without needle emphasis, and gloved clinician hand under soft lab lighting, high-end scientific editorial style, no readable text, no labels, no logos, no brand names, no watermark.",
    "thyroid": "A premium editorial healthcare hero photograph for a medical article about thyroid care: clinician gently palpating a patient's neck during thyroid exam, clean exam room, lab vial and ultrasound probe out of focus on side table, soft natural clinical light, no readable text, no labels, no logos, no brand names, no watermark.",
    "labs": "A premium editorial healthcare hero photograph for a medical article about lab testing: close-up of unlabeled blood sample tubes in a modern laboratory rack with a clinician reviewing results on a blurred tablet, crisp clean light, no readable text, no labels, no logos, no brand names, no watermark.",
    "safety": "A premium editorial healthcare hero photograph for a medical article about medication safety: clinician reviewing plain unlabeled medication bottles with a patient in a consultation room, attentive serious tone, warm clinical light, no readable text, no labels, no logos, no brand names, no watermark.",
    "cardio": "A premium editorial healthcare hero photograph for a medical article about cardiovascular medication and heart health: clinician checking blood pressure with a stethoscope and unlabeled medication bottle nearby, calm modern clinic, no readable text, no labels, no logos, no brand names, no watermark.",
    "skin": "A premium editorial healthcare hero photograph for a medical article about dermatology and prescription skincare: dermatologist examining skin with clean unlabeled cream tube and mirror on a clinical counter, refined natural light, no readable text, no labels, no logos, no brand names, no watermark.",
    "sleep": "A premium editorial healthcare hero photograph for a medical article about sleep medicine: bedside scene with plain unlabeled medication bottle, sleep tracker, and calm evening light, clinical yet warm editorial style, no readable text, no labels, no logos, no brand names, no watermark.",
    "bone": "A premium editorial healthcare hero photograph for a medical article about bone health and osteoporosis medication: clinician showing a patient a neutral bone model beside an unlabeled medication vial in a bright exam room, no readable text, no labels, no logos, no brand names, no watermark.",
    "cognition": "A premium editorial healthcare hero photograph for a medical article about cognition and ADHD medication: clinician consultation desk with a simple brain model, plain unlabeled medicine bottle, and notebook with blank pages, no readable text, no labels, no logos, no brand names, no watermark.",
    "sexual": "A premium editorial healthcare hero photograph for a medical article about sexual health prescriptions: private doctor consultation with plain unlabeled medicine packaging on a clean desk, respectful clinical tone, warm natural light, no readable text, no labels, no logos, no brand names, no watermark.",
    "general": "A premium editorial healthcare hero photograph for a medical article: clinician and patient consultation with plain unlabeled medicine bottle and clean modern clinic background, warm natural light, no readable text, no labels, no logos, no brand names, no watermark.",
}


def load_env_key(name: str) -> str:
    if os.environ.get(name):
        return os.environ[name]
    if MASTER_ENV.exists():
        for line in MASTER_ENV.read_text().splitlines():
            if line.startswith(f"{name}="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    return ""


def generate_one(api_key: str, bucket: str, prompt: str) -> bytes:
    payload = json.dumps(
        {
            "model": os.environ.get("HRX_IMAGE_MODEL", "gpt-image-1"),
            "prompt": prompt,
            "size": os.environ.get("HRX_IMAGE_SIZE", "1536x1024"),
            "quality": os.environ.get("HRX_IMAGE_QUALITY", "high"),
            "n": 1,
        }
    ).encode("utf-8")
    req = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=payload,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=180) as res:
        data = json.loads(res.read().decode("utf-8"))
    b64 = data["data"][0]["b64_json"]
    return base64.b64decode(b64)


def main() -> int:
    api_key = load_env_key("OPENAI_API_KEY")
    if not api_key:
        print("OPENAI_API_KEY not found", file=sys.stderr)
        return 2
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    buckets = sys.argv[1:] or list(PROMPTS)
    for bucket in buckets:
        if bucket not in PROMPTS:
            print(f"unknown bucket: {bucket}", file=sys.stderr)
            return 3
        out = OUT_DIR / f"{bucket}.png"
        if out.exists() and os.environ.get("HRX_FORCE_IMAGE_REGEN") != "1":
            print(f"skip existing {out}")
            continue
        print(f"generating {bucket} -> {out}", flush=True)
        image = generate_one(api_key, bucket, PROMPTS[bucket])
        out.write_bytes(image)
        time.sleep(1)
    return 0


if __name__ == "__main__":
    sys.exit(main())
