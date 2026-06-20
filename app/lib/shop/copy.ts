// AUTO-GENERATED structural scaffold for the WomanRx shop. WomanRx-owned; no
// FormBlends dependency. Marketing copy is written fresh in the copy pass.

import type { Product } from "./types";

export type ProductCopy = Partial<
  Pick<Product, "tagline" | "description" | "longDescription" | "benefits" | "scienceNotes">
>;

// Hand-authored, WomanRx-voice product copy keyed by slug. Human voice, no
// fabricated statistics, no brand-drug equivalency, compounded framing. Merged
// over the structural scaffold in products.ts.
export const COPY: Record<string, ProductCopy> = {
  // ---------------- GLP-1 (assessment funnel) ----------------
  semaglutide: {
    tagline: "Once-weekly GLP-1 therapy for steady, supervised weight loss.",
    description:
      "Compounded semaglutide is a once-weekly GLP-1 medication prescribed and monitored by a licensed provider as part of a structured weight program.",
    longDescription:
      "Semaglutide works on the GLP-1 pathway your body already uses to manage appetite and blood sugar. Taken once a week, it helps many people feel full sooner, think about food less, and stay consistent with the habits that drive results. At WomanRx it is never sold on its own. A licensed provider reviews your history, confirms it is appropriate, and adjusts your dose over time so progress stays steady and side effects stay manageable.",
    benefits: [
      "Once-weekly dosing that fits a normal routine",
      "Provider-guided titration to ease common side effects",
      "Appetite support paired with real coaching, not just a vial",
      "Transparent monthly pricing with no insurance games",
    ],
    scienceNotes:
      "GLP-1 receptor agonists act on appetite regulation and gastric emptying. Dosing is individualized by your prescriber. Compounded semaglutide is prepared by a US-licensed pharmacy and is not FDA-approved.",
  },
  tirzepatide: {
    tagline: "Dual-incretin therapy for people who want a stronger metabolic lever.",
    description:
      "Compounded tirzepatide is a once-weekly dual GIP and GLP-1 medication, prescribed and monitored by a licensed provider.",
    longDescription:
      "Tirzepatide acts on two appetite and blood-sugar pathways at once, GIP and GLP-1, which is why many people reach for it when they want a stronger metabolic response. It is taken once a week and titrated slowly. As with everything here, a licensed provider decides whether it fits you, sets your starting dose, and steps it up at a pace your body tolerates.",
    benefits: [
      "Acts on two metabolic pathways, GIP and GLP-1",
      "Once-weekly injection with gradual dose increases",
      "Reviewed and adjusted by a licensed provider",
      "Flat monthly pricing, shown before you start",
    ],
    scienceNotes:
      "Dual GIP/GLP-1 receptor activity influences appetite and glucose handling. Dosing is individualized. Compounded tirzepatide is prepared by a US-licensed pharmacy and is not FDA-approved.",
  },

  // ---------------- Metabolic ----------------
  "aod-9604": {
    tagline: "A growth-hormone fragment studied for fat metabolism, without the GH side effects.",
    description:
      "AOD-9604 is a modified fragment of human growth hormone studied in the context of fat metabolism and body composition.",
    longDescription:
      "AOD-9604 is the tail end of the growth hormone molecule, the part associated with fat metabolism, isolated away from the parts that drive growth and blood-sugar effects. Research has looked at how it influences how fat cells release and store energy. People exploring body-composition protocols often ask about it because it targets a narrow mechanism rather than acting like full growth hormone.",
    benefits: [
      "Targets a fat-metabolism mechanism, not general growth",
      "Studied without the IGF-1 and glucose effects of full GH",
      "Often paired with metabolic and GLP-1 protocols",
      "Daily subcutaneous research dosing",
    ],
    scienceNotes:
      "AOD-9604 corresponds to the C-terminal fragment of human growth hormone (residues 176-191). Provided for research and education. Not FDA-approved.",
  },
  "mots-c": {
    tagline: "A mitochondrial-derived peptide studied for metabolism and endurance.",
    description:
      "MOTS-c is a short peptide encoded in mitochondrial DNA, studied for its role in energy metabolism and exercise capacity.",
    longDescription:
      "MOTS-c is unusual because it is encoded inside the mitochondria rather than the cell nucleus. Research has examined how it signals during exercise and how it interacts with the pathways that regulate insulin sensitivity and energy use. It draws interest from people focused on metabolic health and endurance.",
    benefits: [
      "Mitochondrial signaling peptide studied for metabolism",
      "Researched in the context of exercise and energy use",
      "Commonly explored alongside metabolic protocols",
    ],
    scienceNotes:
      "MOTS-c is a mitochondrial-derived peptide. Provided for research and education. Not FDA-approved.",
  },

  // ---------------- Recovery ----------------
  "bpc-157": {
    tagline: "The recovery peptide people ask about most, studied for soft-tissue repair.",
    description:
      "BPC-157 is a stable synthetic peptide widely studied in preclinical models of tendon, muscle, and gut tissue repair.",
    longDescription:
      "BPC-157 is derived from a protein found in gastric juice and is one of the most discussed peptides in the recovery space. Preclinical research has looked at how it supports the repair of tendon, ligament, muscle, and gut lining tissue, often by influencing blood-vessel formation and the signals that coordinate healing. People exploring stubborn nagging injuries tend to start their reading here.",
    benefits: [
      "Studied for tendon, ligament, and muscle repair",
      "Researched for gut-lining support",
      "Stable peptide suited to research protocols",
      "Pairs naturally with TB-500 in recovery stacks",
    ],
    scienceNotes:
      "BPC-157 is a synthetic pentadecapeptide derived from a gastric protein. Evidence is largely preclinical. Provided for research and education. Not FDA-approved.",
  },
  "bpc-157-tb-500-blend": {
    tagline: "The classic recovery pairing in one vial.",
    description:
      "A combined BPC-157 and TB-500 blend, the two peptides most often stacked together for tissue recovery research.",
    longDescription:
      "BPC-157 and TB-500 are the pairing people reach for first when they read about peptide recovery. BPC-157 is studied for localized tissue repair while TB-500 is studied for cell migration and flexibility across a wider area. Combining them in a single vial removes the guesswork of running two protocols at once.",
    benefits: [
      "Two complementary recovery peptides in one vial",
      "BPC-157 for localized repair, TB-500 for broader signaling",
      "Simplifies a two-peptide research protocol",
    ],
    scienceNotes:
      "Combines BPC-157 and Thymosin Beta-4 (TB-500). Evidence is largely preclinical. Provided for research and education. Not FDA-approved.",
  },

  // ---------------- Anti-aging ----------------
  epithalon: {
    tagline: "A short peptide studied for cellular aging and sleep rhythm.",
    description:
      "Epithalon is a four-amino-acid peptide researched for its effects on telomerase activity and circadian rhythm.",
    longDescription:
      "Epithalon is a small peptide that has been studied for decades in the context of cellular aging, with particular interest in how it interacts with telomerase and the body's daily rhythms. People exploring longevity protocols often run it in short cycles.",
    benefits: [
      "Studied for telomerase activity and cellular aging",
      "Researched in the context of sleep and circadian rhythm",
      "Typically run in short, spaced research cycles",
    ],
    scienceNotes:
      "Epithalon is a synthetic tetrapeptide (Ala-Glu-Asp-Gly). Provided for research and education. Not FDA-approved.",
  },
  "ghk-cu": {
    tagline: "A copper peptide studied for skin, hair, and tissue remodeling.",
    description:
      "GHK-Cu is a naturally occurring copper-binding peptide researched for skin repair, collagen, and hair support.",
    longDescription:
      "GHK-Cu is a copper-carrying peptide that occurs naturally in the body and declines with age. Research has examined its role in collagen production, wound repair, and the signals that keep skin and hair tissue organized. It shows up in both injectable research protocols and topical formulations.",
    benefits: [
      "Studied for collagen and skin remodeling",
      "Researched for hair-follicle support",
      "Copper-binding peptide with a wide research base",
    ],
    scienceNotes:
      "GHK-Cu is a naturally occurring copper tripeptide. Provided for research and education. Not FDA-approved.",
  },

  // ---------------- Immune ----------------
  "thymosin-alpha-1": {
    tagline: "An immune-signaling peptide studied for immune balance.",
    description:
      "Thymosin Alpha-1 is a peptide derived from the thymus, researched for its role in regulating immune response.",
    longDescription:
      "Thymosin Alpha-1 comes from the thymus, the gland that trains immune cells. Research has focused on how it helps coordinate and balance immune activity. It draws interest from people thinking about immune resilience and recovery.",
    benefits: [
      "Studied for immune-cell signaling and balance",
      "Derived from a naturally occurring thymic peptide",
      "Explored in immune-resilience protocols",
    ],
    scienceNotes:
      "Thymosin Alpha-1 is a 28-amino-acid thymic peptide. Provided for research and education. Not FDA-approved.",
  },
  "ll-37": {
    tagline: "An antimicrobial host-defense peptide studied for immune support.",
    description:
      "LL-37 is a naturally occurring host-defense peptide researched for its antimicrobial and immune-modulating roles.",
    longDescription:
      "LL-37 is part of the body's own first-line defense system. Research has looked at how it interacts with microbes and how it signals to the immune system. It is a focus for people reading about innate immunity.",
    benefits: [
      "Naturally occurring host-defense peptide",
      "Studied for antimicrobial and immune signaling",
      "Explored in innate-immunity research",
    ],
    scienceNotes:
      "LL-37 is the active fragment of the human cathelicidin peptide. Provided for research and education. Not FDA-approved.",
  },
  "glutathione-injectable": {
    tagline: "The body's master antioxidant, in an injectable research form.",
    description:
      "Glutathione is a naturally occurring antioxidant tripeptide studied for oxidative balance and detoxification pathways.",
    longDescription:
      "Glutathione is the antioxidant your cells rely on most to manage oxidative stress and support detoxification. Levels fall with age and stress, which is why injectable forms draw interest from people focused on recovery and skin clarity.",
    benefits: [
      "Central antioxidant in the body's defense system",
      "Studied for oxidative balance and detox pathways",
      "Injectable form for research protocols",
    ],
    scienceNotes:
      "Glutathione is a tripeptide of glutamate, cysteine, and glycine. Provided for research and education. Not FDA-approved.",
  },

  // ---------------- Sexual wellness ----------------
  "tadalafil-oxytocin-pt-141-nasal": {
    tagline: "A combined nasal protocol studied for desire, arousal, and connection.",
    description:
      "A nasal blend of tadalafil, oxytocin, and PT-141, three compounds studied across the physical and central drivers of sexual response.",
    longDescription:
      "This nasal blend brings together three different angles on sexual wellness. Tadalafil is studied for blood flow, PT-141 for central arousal signaling, and oxytocin for connection and bonding. Delivering them as a nasal protocol is a convenience-driven research approach.",
    benefits: [
      "Three complementary mechanisms in one nasal protocol",
      "Covers blood flow, central arousal, and bonding",
      "Convenient nasal delivery",
    ],
    scienceNotes:
      "Combines tadalafil, oxytocin, and PT-141 (bremelanotide). Provided for research and education. Not FDA-approved.",
  },
  gonadorelin: {
    tagline: "A signaling peptide studied for natural hormone production.",
    description:
      "Gonadorelin is a peptide form of GnRH researched for its role in supporting the body's own hormone signaling.",
    longDescription:
      "Gonadorelin mirrors GnRH, the upstream signal that tells the body to produce its own sex hormones. Research interest centers on supporting natural production rather than replacing it, which is why it appears in many hormone-support conversations.",
    benefits: [
      "Supports the body's own hormone-signaling axis",
      "Peptide analog of natural GnRH",
      "Studied in hormone-support protocols",
    ],
    scienceNotes:
      "Gonadorelin is a synthetic form of gonadotropin-releasing hormone. Provided for research and education. Not FDA-approved.",
  },

  // ---------------- Sleep / stress ----------------
  dsip: {
    tagline: "Delta sleep-inducing peptide, studied for deep sleep and stress recovery.",
    description:
      "DSIP is a naturally occurring peptide researched for its role in deep sleep and the body's stress response.",
    longDescription:
      "DSIP is named for the slow-wave, restorative phase of sleep it was first associated with. Research has explored how it relates to sleep architecture and to the hormones that govern stress. It draws interest from people whose recovery is limited by poor sleep.",
    benefits: [
      "Studied for deep, slow-wave sleep",
      "Researched in the context of stress recovery",
      "Naturally occurring neuropeptide",
    ],
    scienceNotes:
      "DSIP is a naturally occurring nonapeptide. Provided for research and education. Not FDA-approved.",
  },
  "selank-nasal": {
    tagline: "A calm-focus nasal peptide studied for anxiety and clarity.",
    description:
      "Selank is a peptide researched for its effects on anxiety, focus, and mood, delivered as a nasal spray.",
    longDescription:
      "Selank is studied for a steady, non-sedating sense of calm and for how it interacts with the systems behind anxiety and attention. The nasal format makes it simple to run as a daily research protocol.",
    benefits: [
      "Studied for calm without sedation",
      "Researched for focus and mood",
      "Convenient nasal delivery",
    ],
    scienceNotes:
      "Selank is a synthetic analog of the peptide tuftsin. Provided for research and education. Not FDA-approved.",
  },

  // ---------------- Growth ----------------
  tesamorelin: {
    tagline: "A growth-hormone-releasing peptide studied for body composition.",
    description:
      "Tesamorelin is a growth-hormone-releasing hormone analog researched for its effects on visceral fat and body composition.",
    longDescription:
      "Tesamorelin prompts the body to release its own growth hormone in natural pulses rather than supplying it directly. Research has focused on visceral fat and body composition, which is why it appears in metabolic and recomposition protocols.",
    benefits: [
      "Prompts the body's own growth-hormone pulses",
      "Studied for visceral fat and body composition",
      "Common anchor in recomposition protocols",
    ],
    scienceNotes:
      "Tesamorelin is a stabilized analog of growth-hormone-releasing hormone. Provided for research and education. Not FDA-approved.",
  },

  // ---------------- Cognitive ----------------
  "semax-nasal-spray": {
    tagline: "A focus and neuroprotection peptide, delivered nasally.",
    description:
      "Semax is a peptide researched for attention, memory, and neuroprotection, delivered as a nasal spray.",
    longDescription:
      "Semax is studied for mental clarity and for how it interacts with the brain's growth and signaling factors. People exploring cognitive protocols favor the nasal format for its simplicity.",
    benefits: [
      "Studied for attention and memory",
      "Researched for neuroprotective signaling",
      "Simple nasal delivery",
    ],
    scienceNotes:
      "Semax is a synthetic peptide derived from ACTH. Provided for research and education. Not FDA-approved.",
  },

  // ---------------- Bundles ----------------
  "bpc-157-kpv-tb-500-blend": {
    tagline: "A three-peptide recovery and gut-support blend.",
    description:
      "A blend of BPC-157, KPV, and TB-500, combining tissue repair, anti-inflammatory, and broad-signaling peptides.",
    longDescription:
      "This blend layers three angles on recovery. BPC-157 for localized repair, TB-500 for broader cell signaling, and KPV for its anti-inflammatory profile. It is built for people who want gut and tissue support without juggling three separate vials.",
    benefits: [
      "Three recovery peptides in one vial",
      "Pairs tissue repair with anti-inflammatory support",
      "Removes the work of running three protocols",
    ],
    scienceNotes:
      "Combines BPC-157, KPV, and TB-500. Evidence is largely preclinical. Provided for research and education. Not FDA-approved.",
  },
  "premium-recovery-quad-stack": {
    tagline: "Our most complete recovery blend, four peptides in one vial.",
    description:
      "A premium four-peptide blend of BPC-157, GHK-Cu, KPV, and TB-500 built for comprehensive recovery research.",
    longDescription:
      "This is the most complete recovery formulation we carry. It brings together BPC-157 for repair, TB-500 for broad signaling, GHK-Cu for tissue remodeling, and KPV for inflammation, so a full recovery protocol lives in a single vial. It is the bundle people choose when they want everything working together.",
    benefits: [
      "Four complementary recovery peptides in one vial",
      "Covers repair, remodeling, signaling, and inflammation",
      "The simplest way to run a complete recovery stack",
    ],
    scienceNotes:
      "Combines BPC-157, GHK-Cu, KPV, and TB-500. Evidence is largely preclinical. Provided for research and education. Not FDA-approved.",
  },
  "tesamorelin-ipamorelin-blend": {
    tagline: "A growth-hormone-axis blend for body composition research.",
    description:
      "A blend of tesamorelin and ipamorelin, pairing two peptides that prompt natural growth-hormone release.",
    longDescription:
      "Tesamorelin and ipamorelin approach the growth-hormone axis from two angles, which is why they are so often run together. The combination is studied in the context of body composition and recovery, in natural pulses rather than direct hormone supply.",
    benefits: [
      "Two growth-hormone-releasing peptides in one vial",
      "Studied for body composition and recovery",
      "Encourages natural, pulsed release",
    ],
    scienceNotes:
      "Combines tesamorelin and ipamorelin. Provided for research and education. Not FDA-approved.",
  },
  "ghk-cu-epithalon-blend": {
    tagline: "A longevity and skin blend pairing two well-studied peptides.",
    description:
      "A blend of GHK-Cu and epithalon, combining skin and tissue remodeling with cellular-aging research.",
    longDescription:
      "This blend pairs GHK-Cu, studied for skin and collagen, with epithalon, studied for cellular aging and rhythm. Together they make a tidy longevity-and-appearance protocol in one vial.",
    benefits: [
      "Pairs skin remodeling with cellular-aging research",
      "Two longevity-focused peptides in one vial",
      "Simple to run as a single protocol",
    ],
    scienceNotes:
      "Combines GHK-Cu and epithalon. Provided for research and education. Not FDA-approved.",
  },
  "mots-c-tesamorelin-blend": {
    tagline: "A metabolic and body-composition blend.",
    description:
      "A blend of MOTS-c and tesamorelin, pairing mitochondrial metabolism with growth-hormone-axis support.",
    longDescription:
      "MOTS-c is studied for mitochondrial metabolism and tesamorelin for the growth-hormone axis. Combined, they target metabolic health and body composition from two directions in a single vial.",
    benefits: [
      "Pairs mitochondrial metabolism with GH-axis support",
      "Studied for metabolic health and body composition",
      "Two mechanisms, one vial",
    ],
    scienceNotes:
      "Combines MOTS-c and tesamorelin. Provided for research and education. Not FDA-approved.",
  },
  "semax-selank-blend": {
    tagline: "Focus and calm together, in one nasal protocol.",
    description:
      "A blend of semax and selank, pairing the focus and the calm peptides most often run together.",
    longDescription:
      "Semax is studied for focus and clarity, selank for steady calm. People who run them together like the balance of alert without anxious, so this blend puts both into one nasal protocol.",
    benefits: [
      "Pairs focus with non-sedating calm",
      "Two complementary nootropic peptides",
      "One nasal protocol instead of two",
    ],
    scienceNotes:
      "Combines semax and selank. Provided for research and education. Not FDA-approved.",
  },
  "sleep-recovery-stack": {
    tagline: "A sleep and overnight-recovery blend.",
    description:
      "A blend built around deep sleep and the overnight repair window, for people whose recovery starts with rest.",
    longDescription:
      "Recovery is mostly built overnight, so this stack targets sleep quality and the repair processes that run while you rest. It is the choice for people whose progress is capped by poor sleep rather than effort.",
    benefits: [
      "Targets deep sleep and overnight repair",
      "Built for recovery that starts with rest",
      "One protocol for sleep and recovery together",
    ],
    scienceNotes:
      "A combination peptide formulation focused on sleep and recovery. Provided for research and education. Not FDA-approved.",
  },
};
