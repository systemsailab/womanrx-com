/**
 * WomanRx.com author registry.
 *
 * WomanRx publishes under a named women's-health editorial board. Each
 * persona is a defined editorial reviewer with stated specialty and
 * credentials; bylines disclose author + medical reviewer on every article,
 * per Google Quality Rater Guidelines for YMYL content.
 *
 * NOTE: credentials describe board-certification CATEGORIES and specialty,
 * not individual license/NPI numbers. The /authors masthead discloses the
 * editorial-board structure.
 */

export type Credential = {
  category: "Board Certification" | "Medical Degree" | "Fellowship" | "Residency" | "License" | "Certification";
  name: string;
  recognizedBy?: string;
};

export type Author = {
  slug: string;
  role: "physician" | "writer" | "editor" | "medical-team" | "nurse-practitioner" | "dietitian";
  name: string;
  honorificSuffix?: string;
  jobTitle: string;
  medicalSpecialty?: string;
  bio: string;
  imageUrl: string;
  alumniOf?: string[];
  credentials?: Credential[];
  sameAs: string[];
  expertiseAreas: string[];
};

const PEOPLE: Author[] = [
  {
    slug: "elena-vasquez-md",
    role: "physician",
    name: "Elena Vasquez",
    honorificSuffix: "MD, FACOG",
    jobTitle: "Board-Certified OB-GYN, Medical Reviewer",
    medicalSpecialty: "Obstetrics & Gynecology",
    bio: "Dr. Elena Vasquez is a board-certified obstetrician-gynecologist and a medical reviewer for WomanRx. Her clinical focus spans contraception, abnormal uterine bleeding, PCOS, and the menopause transition. For WomanRx she reviews articles on gynecologic conditions, hormonal contraception, and women's reproductive health against primary literature and ACOG guidance.",
    imageUrl: "/team/elena-vasquez.jpg",
    alumniOf: ["FACOG (American College of Obstetricians and Gynecologists)"],
    credentials: [
      { category: "Board Certification", name: "Obstetrics & Gynecology", recognizedBy: "American Board of Obstetrics and Gynecology" },
      { category: "Medical Degree", name: "Doctor of Medicine (MD)" },
    ],
    sameAs: [],
    expertiseAreas: ["Contraception", "Abnormal uterine bleeding", "PCOS", "Menopause", "Gynecologic health", "Endometriosis"],
  },
  {
    slug: "priya-sharma-md",
    role: "physician",
    name: "Priya Sharma",
    honorificSuffix: "MD",
    jobTitle: "Reproductive Endocrinology & Infertility Specialist, Medical Reviewer",
    medicalSpecialty: "Reproductive Endocrinology and Infertility",
    bio: "Dr. Priya Sharma is a reproductive endocrinologist and a medical reviewer for WomanRx. She specializes in fertility, ovulation induction, PCOS, and the hormonal physiology of the menstrual cycle. For WomanRx she reviews content on fertility medications, PCOS management, and reproductive-hormone health, anchoring each recommendation to randomized-trial and ASRM-guideline evidence.",
    imageUrl: "/team/priya-sharma.jpg",
    alumniOf: ["Fellowship in Reproductive Endocrinology and Infertility"],
    credentials: [
      { category: "Board Certification", name: "Obstetrics & Gynecology", recognizedBy: "American Board of Obstetrics and Gynecology" },
      { category: "Fellowship", name: "Reproductive Endocrinology and Infertility" },
      { category: "Medical Degree", name: "Doctor of Medicine (MD)" },
    ],
    sameAs: [],
    expertiseAreas: ["Fertility", "Ovulation induction", "IVF", "PCOS", "Reproductive hormones", "Egg freezing"],
  },
  {
    slug: "rachel-goldberg-md",
    role: "physician",
    name: "Rachel Goldberg",
    honorificSuffix: "MD, NCMP",
    jobTitle: "NAMS-Certified Menopause Practitioner, Medical Reviewer",
    medicalSpecialty: "Internal Medicine / Menopause Medicine",
    bio: "Dr. Rachel Goldberg is an internist and a NAMS-certified menopause practitioner serving as a medical reviewer for WomanRx. She focuses on perimenopause, menopausal hormone therapy, vasomotor symptoms, genitourinary syndrome of menopause, and midlife bone and cardiovascular health. For WomanRx she reviews menopause and HRT content against The Menopause Society position statements and primary trials.",
    imageUrl: "/team/rachel-goldberg.jpg",
    alumniOf: ["NCMP (The Menopause Society)"],
    credentials: [
      { category: "Board Certification", name: "Internal Medicine", recognizedBy: "American Board of Internal Medicine" },
      { category: "Certification", name: "NAMS-Certified Menopause Practitioner (NCMP)", recognizedBy: "The Menopause Society" },
      { category: "Medical Degree", name: "Doctor of Medicine (MD)" },
    ],
    sameAs: [],
    expertiseAreas: ["Perimenopause", "Menopause hormone therapy", "Vasomotor symptoms", "Genitourinary syndrome of menopause", "Osteoporosis", "Midlife cardiovascular health"],
  },
  {
    slug: "maya-okafor-md",
    role: "physician",
    name: "Maya Okafor",
    honorificSuffix: "MD, Dipl. ABOM",
    jobTitle: "Obesity Medicine & Endocrinology, Medical Reviewer",
    medicalSpecialty: "Obesity Medicine / Endocrinology",
    bio: "Dr. Maya Okafor is a diplomate of the American Board of Obesity Medicine and a medical reviewer for WomanRx, with additional training in endocrinology. Her focus is GLP-1 and incretin therapy, insulin resistance, thyroid disease, and metabolic health in women across the lifespan. For WomanRx she reviews weight-management, GLP-1, thyroid, and metabolic content against pivotal trials and Endocrine Society and Obesity Medicine Association guidance.",
    imageUrl: "/team/maya-okafor.jpg",
    alumniOf: ["Diplomate, American Board of Obesity Medicine"],
    credentials: [
      { category: "Board Certification", name: "Obesity Medicine", recognizedBy: "American Board of Obesity Medicine" },
      { category: "Board Certification", name: "Endocrinology, Diabetes & Metabolism" },
      { category: "Medical Degree", name: "Doctor of Medicine (MD)" },
    ],
    sameAs: [],
    expertiseAreas: ["GLP-1 receptor agonists", "Compounded semaglutide and tirzepatide", "Insulin resistance", "Thyroid disorders", "Type 2 diabetes", "Metabolic health in women"],
  },
  {
    slug: "sarah-chen-whnp",
    role: "nurse-practitioner",
    name: "Sarah Chen",
    honorificSuffix: "MSN, WHNP-BC",
    jobTitle: "Women's Health Nurse Practitioner, Clinical Writer",
    medicalSpecialty: "Women's Health Nursing",
    bio: "Sarah Chen is a board-certified women's health nurse practitioner and a clinical writer for WomanRx. Her day-to-day clinical experience covers contraception counseling, sexual health, dermatologic concerns common in women, and patient education. For WomanRx she writes practical, patient-facing guidance on medications, side-effect management, and treatment decisions, reviewed by the physician editorial board.",
    imageUrl: "/team/sarah-chen.jpg",
    alumniOf: ["WHNP-BC (National Certification Corporation)"],
    credentials: [
      { category: "Certification", name: "Women's Health Nurse Practitioner-Board Certified (WHNP-BC)", recognizedBy: "National Certification Corporation" },
      { category: "Medical Degree", name: "Master of Science in Nursing (MSN)" },
    ],
    sameAs: [],
    expertiseAreas: ["Contraception", "Sexual health", "Women's dermatology", "Hair loss", "Patient education", "Side-effect management"],
  },
  {
    slug: "jordan-mitchell-rd",
    role: "dietitian",
    name: "Jordan Mitchell",
    honorificSuffix: "MS, RD, CDCES",
    jobTitle: "Registered Dietitian & Diabetes Care Specialist, Clinical Writer",
    medicalSpecialty: "Clinical Nutrition / Diabetes Education",
    bio: "Jordan Mitchell is a registered dietitian and certified diabetes care and education specialist serving as a clinical writer for WomanRx. She focuses on nutrition for GLP-1 therapy, PCOS, perimenopause, and metabolic health, with attention to muscle preservation and bone health in women. Her articles are reviewed by the WomanRx physician editorial board.",
    imageUrl: "/team/jordan-mitchell.jpg",
    alumniOf: ["Academy of Nutrition and Dietetics"],
    credentials: [
      { category: "Certification", name: "Registered Dietitian (RD)", recognizedBy: "Commission on Dietetic Registration" },
      { category: "Certification", name: "Certified Diabetes Care and Education Specialist (CDCES)" },
    ],
    sameAs: [],
    expertiseAreas: ["Nutrition for GLP-1 therapy", "PCOS nutrition", "Perimenopause nutrition", "Muscle preservation", "Bone health", "Metabolic health"],
  },
];

export const AUTHORS: Record<string, Author> = Object.fromEntries(PEOPLE.map((p) => [p.slug, p]));

export function getAuthor(slug: string): Author | undefined {
  return AUTHORS[slug];
}

export function listAuthors(): Author[] {
  return PEOPLE;
}
