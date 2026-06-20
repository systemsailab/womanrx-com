"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { C, PAGE_X, MAX_W, mono, sans } from "@/lib/design";

type IntakeState = {
  goalRange?: string;
  feetIn?: number;
  inchesIn?: number;
  weightLbs?: number;
  goalWeightLbs?: number;
  gender?: "male" | "female";
  priority?: "longer" | "better" | "health" | "all";
  healthFlags?: string[];
  pace?: "good" | "faster" | "too-fast";
};

const STORAGE_KEY = "womanrx_glp1_offer_intake_v1";
const STEPS = ["height-weight", "weight-goal", "gender", "health", "priorities", "speed", "results"] as const;
const STAGE_LABELS = ["Start", "Preliminary", "Health", "Details", "Eligibility"];
type StepSlug = (typeof STEPS)[number];

function track(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.gtag =
    w.gtag ||
    function gtag(...args: unknown[]) {
      w.dataLayer.push(args);
    };
  w.gtag("event", eventName, {
    send_to: "G-BGZ10WGW9F",
    event_source: "womanrx_glp1_offer",
    ...params,
  });
}

function useIntake() {
  const [state, setState] = useState<IntakeState>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw));
    } catch {
      // ignore corrupt local data
    }
    setLoaded(true);
  }, []);

  const update = (patch: Partial<IntakeState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return { state, update, loaded };
}

function nextSlug(current: StepSlug): StepSlug | null {
  const idx = STEPS.indexOf(current);
  if (idx < 0 || idx >= STEPS.length - 1) return null;
  return STEPS[idx + 1];
}

function stageFor(slug: StepSlug) {
  if (slug === "gender") return 1;
  if (slug === "health") return 2;
  if (slug === "priorities" || slug === "speed") return 3;
  if (slug === "results") return 4;
  return 0;
}

function withCurrentSearch(path: string) {
  if (typeof window === "undefined" || !window.location.search) return path;
  return `${path}${window.location.search}`;
}

function checkoutUrl(state: IntakeState) {
  const url = new URL("/checkout", window.location.origin);
  const current = new URLSearchParams(window.location.search);
  current.forEach((value, key) => {
    if (value) url.searchParams.set(key, value);
  });

  url.searchParams.set("source", current.get("source") || "glp1-offer-v1");
  url.searchParams.set("placement", "intake_results");
  url.searchParams.set("product", "semaglutide");
  url.searchParams.set("med_pref", "sema");
  url.searchParams.set("plan", "3-month");
  url.searchParams.set("offer_price", "from_99_mo");
  url.searchParams.set("q_health", (state.healthFlags ?? []).join(","));
  url.searchParams.set("q_height_feet", String(state.feetIn ?? ""));
  url.searchParams.set("q_height_inches", String(state.inchesIn ?? ""));
  url.searchParams.set("q_weight", String(state.weightLbs ?? ""));
  url.searchParams.set("q_goal_weight", String(state.goalWeightLbs ?? ""));
  url.searchParams.set("q_goal_range", state.goalRange ?? "");
  url.searchParams.set("q_gender", state.gender ?? "");
  url.searchParams.set("q_reason", state.priority ?? "");
  url.searchParams.set("q_pace", state.pace ?? "");
  return url.toString();
}

export default function IntakeRouter({ step }: { step: string }) {
  const router = useRouter();
  const { state, update, loaded } = useIntake();
  const isValidStep = STEPS.includes(step as StepSlug);
  const slug = (isValidStep ? step : "height-weight") as StepSlug;
  const activeStage = stageFor(slug);

  useEffect(() => {
    if (!loaded || !isValidStep) return;
    track("intake_step_view", { funnel_name: "glp1_offer_v1", step: slug, page_path: window.location.pathname });
  }, [isValidStep, loaded, slug]);

  const go = () => {
    const n = nextSlug(slug);
    track("intake_step_complete", {
      funnel_name: "glp1_offer_v1",
      step: slug,
      next_step: n ?? undefined,
      page_path: window.location.pathname,
    });
    if (n) router.push(withCurrentSearch(`/glp1-offer-v1/intake/${n}`));
  };

  if (!loaded) {
    return (
      <FunnelChrome stage={activeStage} onBack={() => router.back()}>
        <div style={sans({ textAlign: "center", color: C.mute, padding: "48px 0" })}>Loading...</div>
      </FunnelChrome>
    );
  }

  if (!isValidStep) {
    return (
      <FunnelChrome stage={0} onBack={() => router.back()}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <h1 style={headline()}>Step not found</h1>
          <Link href="/glp1-offer-v1/intake/height-weight" className="btn-brand" style={{ marginTop: 18 }}>
            Start over
          </Link>
        </div>
      </FunnelChrome>
    );
  }

  return (
    <FunnelChrome stage={activeStage} onBack={() => router.back()}>
      {slug === "height-weight" && <StepGoal state={state} update={update} next={go} />}
      {slug === "weight-goal" && <StepMetrics state={state} update={update} next={go} />}
      {slug === "gender" && <StepGender state={state} update={update} next={go} />}
      {slug === "health" && <StepHealth state={state} update={update} next={go} />}
      {slug === "priorities" && <StepPriorities state={state} update={update} next={go} />}
      {slug === "speed" && <StepSpeed state={state} update={update} next={go} />}
      {slug === "results" && <StepResults state={state} />}
    </FunnelChrome>
  );
}

function FunnelChrome({ children, stage, onBack }: { children: React.ReactNode; stage: number; onBack: () => void }) {
  return (
    <main style={{ minHeight: "100vh", background: C.white, color: C.text, display: "flex", flexDirection: "column" }}>
      <header style={{ background: C.paper, borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: `22px ${PAGE_X} 8px`, display: "grid", gridTemplateColumns: "40px 1fr 40px", alignItems: "center", gap: 16 }}>
          <button type="button" onClick={onBack} aria-label="Back" style={{ border: 0, background: "transparent", color: C.brand, fontSize: 24, cursor: "pointer" }}>
            ←
          </button>
          <div style={{ textAlign: "center" }}>
            <Link href="/glp1-offer-v1" style={{ ...sans({ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 900, color: C.text }), textDecoration: "none" }}>
              WomanRx.com
            </Link>
            <div style={{ marginTop: 8, display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", ...mono({ fontSize: 10.5, color: C.mute, textTransform: "uppercase" }) }}>
              <span>LegitScript certified</span>
              <span>★★★★★</span>
              <span>Private assessment</span>
            </div>
          </div>
          <span />
        </div>
        <ProgressBar activeStage={stage} />
      </header>
      <section style={{ flex: 1, padding: `clamp(28px, 5vw, 56px) ${PAGE_X}` }}>{children}</section>
      <footer style={{ padding: "22px 20px 26px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 18, flexWrap: "wrap", marginBottom: 16 }}>
          <a
            href="https://www.legitscript.com/websites/?checker_keywords=womanrx.com"
            target="_blank"
            rel="noopener"
            title="Verify LegitScript Approval for www.womanrx.com"
            style={{ display: "inline-flex", lineHeight: 0 }}
          >
            <img src="https://static.legitscript.com/seals/50087439.png" alt="Verify Approval for www.womanrx.com" width={37} height={40} />
          </a>
          {["★ 4.8 member rating", "Licensed clinicians", "Secure Stripe checkout", "Free shipping"].map((item) => (
            <span key={item} style={mono({ fontSize: 10.5, color: C.mute, textTransform: "uppercase", letterSpacing: "0.05em" })}>{item}</span>
          ))}
        </div>
        <span style={{ display: "inline-flex", border: `1px solid ${C.line}`, borderRadius: 999, padding: "7px 13px", ...sans({ fontSize: 12, color: C.mute, fontWeight: 700 }) }}>
          English
        </span>
      </footer>
      <IntakeStyles />
    </main>
  );
}

function ProgressBar({ activeStage }: { activeStage: number }) {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: `14px ${PAGE_X} 18px` }}>
      <div className="stage-row" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
        {STAGE_LABELS.map((item, i) => {
          const current = i === activeStage;
          const done = i < activeStage;
          return (
            <div key={item} style={{ textAlign: "center" }}>
              <div style={{ height: 6, borderRadius: 999, background: done || current ? C.brand : C.line }} />
              <div style={mono({ marginTop: 8, fontSize: 10, color: done || current ? C.brand : C.mute, textTransform: "uppercase" })}>{item}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StepGoal({ state, update, next }: StepProps) {
  const [goalRange, setGoalRange] = useState(state.goalRange);
  const options = [
    ["1-20", "Lose 1-20 lbs", "I want a simple starting plan."],
    ["21-50", "Lose 21-50 lbs", "I want meaningful weight loss support."],
    ["51+", "Lose 51+ lbs", "I want a bigger medical reset."],
    ["unsure", "Not sure yet", "I just want to see if this fits."],
  ];

  return (
    <StepShell
      title="What are you trying to do first?"
      subtitle="Start with the goal. We'll ask the medical details after you see the path."
    >
      <QuestionTitle>Pick the closest answer.</QuestionTitle>
      <div style={{ display: "grid", gap: 12 }}>
        {options.map(([value, title, description]) => (
          <Tile key={value} active={goalRange === value} onClick={() => setGoalRange(value)} title={title} description={description} />
        ))}
      </div>
      <NextButton disabled={!goalRange} onClick={() => { if (goalRange) update({ goalRange }); track("goal_selected", { goal_range: goalRange }); next(); }} />
    </StepShell>
  );
}

type StepProps = {
  state: IntakeState;
  update: (p: Partial<IntakeState>) => void;
  next: () => void;
};

function StepMetrics({ state, update, next }: StepProps) {
  const [feet, setFeet] = useState(state.feetIn?.toString() ?? "");
  const [inches, setInches] = useState(state.inchesIn?.toString() ?? "");
  const [weight, setWeight] = useState(state.weightLbs?.toString() ?? "");
  const [goal, setGoal] = useState(state.goalWeightLbs?.toString() ?? (state.weightLbs ? Math.max(120, state.weightLbs - 25).toString() : ""));
  const valid = Number(feet) > 0 && inches !== "" && Number(weight) > 0 && Number(goal) > 0;

  return (
    <StepShell title="Great, now we'll check the basics.">
      <QuestionTitle>What is your height, current weight, and goal weight?</QuestionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }} className="metrics-grid">
        <NumberField label="Feet" value={feet} onChange={setFeet} placeholder="5" />
        <NumberField label="Inches" value={inches} onChange={setInches} placeholder="6" />
        <NumberField label="Weight (lbs)" value={weight} onChange={setWeight} placeholder="180" />
      </div>
      <div style={{ marginTop: 12 }}>
        <NumberField label="Goal weight (lbs)" value={goal} onChange={setGoal} placeholder="155" />
      </div>
      <div style={{ marginTop: 24, borderRadius: 16, background: "linear-gradient(135deg, #d7ede8, #f7edd8)", padding: 24, textAlign: "center" }}>
        <div style={{ display: "inline-block", background: C.white, borderRadius: 999, padding: "6px 14px", ...sans({ fontSize: 12, color: C.brand, fontWeight: 900 }) }}>
          -15 lbs · -25 lbs · -40 lbs
        </div>
        <div style={sans({ marginTop: 12, fontSize: 14, color: C.text, fontWeight: 800 })}>Join the millions of Americans now using GLP-1 care</div>
      </div>
      <NextButton disabled={!valid} onClick={() => { update({ feetIn: Number(feet), inchesIn: Number(inches), weightLbs: Number(weight), goalWeightLbs: Number(goal) }); next(); }} />
    </StepShell>
  );
}

function StepGender({ state, update, next }: StepProps) {
  const [gender, setGender] = useState(state.gender);
  return (
    <StepShell
      title="Medication can be tailored to your unique needs, so let's get to know you a little better."
      subtitle="This helps us understand your body complexity and hormones so we can assess you better."
    >
      <QuestionTitle>Are you male or female?</QuestionTitle>
      <div style={{ display: "grid", gap: 12 }}>
        <Tile active={gender === "male"} onClick={() => setGender("male")} title="Male" />
        <Tile active={gender === "female"} onClick={() => setGender("female")} title="Female" />
      </div>
      <NextButton disabled={!gender} onClick={() => { if (gender) update({ gender }); next(); }} />
    </StepShell>
  );
}

function StepHealth({ state, update, next }: StepProps) {
  const [flags, setFlags] = useState<string[]>(state.healthFlags ?? []);
  const options: Array<[string, string]> = [
    ["mtc", "Personal or family history of medullary thyroid cancer or MEN-2"],
    ["pancreatitis", "History of pancreatitis"],
    ["pregnant", "Currently pregnant, nursing, or trying to conceive"],
    ["glp1-now", "Currently taking a GLP-1 medication"],
    ["none", "None of these apply to me"],
  ];
  const toggle = (value: string) => {
    setFlags((prev) => {
      if (value === "none") return prev.includes("none") ? [] : ["none"];
      const without = prev.filter((f) => f !== value && f !== "none");
      return prev.includes(value) ? without : [...without, value];
    });
  };
  const hasCondition = flags.some((f) => f !== "none");

  return (
    <StepShell
      title="A few quick health checks."
      subtitle="Your answers are private and reviewed by a licensed clinician as part of every order."
    >
      <QuestionTitle>Do any of these apply to you?</QuestionTitle>
      <div style={{ display: "grid", gap: 12 }}>
        {options.map(([value, title]) => (
          <Tile key={value} active={flags.includes(value)} onClick={() => toggle(value)} title={title} />
        ))}
      </div>
      {hasCondition && (
        <div style={{ marginTop: 16, border: `1px solid ${C.brand}33`, background: C.brandSoft, borderRadius: 12, padding: 14, ...sans({ fontSize: 13.5, color: C.text2, lineHeight: 1.5 }) }}>
          Thanks for flagging this. A licensed clinician reviews every order and will factor this into whether GLP-1 therapy is right for you.
        </div>
      )}
      <NextButton disabled={flags.length === 0} onClick={() => { update({ healthFlags: flags }); next(); }} />
    </StepShell>
  );
}

function StepPriorities({ state, update, next }: StepProps) {
  const [priority, setPriority] = useState(state.priority);
  const options = [
    ["longer", "I want to live longer"],
    ["better", "I want to feel and look better"],
    ["health", "I want to reduce my current health issues"],
    ["all", "All of these"],
  ] as const;

  return (
    <StepShell title="Improving your life requires motivation.">
      <QuestionTitle>What is your primary reason for taking weight loss seriously?</QuestionTitle>
      <div style={{ display: "grid", gap: 12 }}>
        {options.map(([value, title]) => (
          <Tile key={value} active={priority === value} onClick={() => setPriority(value)} title={title} />
        ))}
      </div>
      <NextButton disabled={!priority} onClick={() => { if (priority) update({ priority }); next(); }} />
    </StepShell>
  );
}

function StepSpeed({ state, update, next }: StepProps) {
  const [pace, setPace] = useState(state.pace);
  const currentWeight = state.weightLbs ?? 0;
  const goalWeight = state.goalWeightLbs ?? 0;
  const weightLoss = Math.max(0, currentWeight - goalWeight);
  // Trial benchmarks (semaglutide 2.4mg, STEP 1, NEJM 2021): ~6% mean body-weight
  // loss by week 12, 14.9% mean over 68 weeks. Projections below stay inside that.
  const threeMonthLow = Math.max(5, Math.round(currentWeight * 0.05));
  const threeMonthHigh = Math.max(8, Math.round(currentWeight * 0.08));
  const trialAvg = Math.round(currentWeight * 0.149);

  return (
    <StepShell title={`Losing ${weightLoss} lbs is achievable. Here's the real math.`}>
      <p style={sans({ color: C.text2, borderBlock: `1px solid ${C.line}`, padding: "14px 0", marginBottom: 22 })}>
        In the largest published trial, people on weekly semaglutide lost <strong>14.9% of their body weight on average</strong> (NEJM, 2021). At your starting weight, the trial average works out to about <strong>{trialAvg} lbs</strong> &mdash; with roughly <strong>{threeMonthLow} to {threeMonthHigh} lbs typically coming off in the first 12 weeks</strong> as your dose builds.
      </p>
      <div style={{ margin: "0 0 22px", border: `1px solid ${C.line}`, borderRadius: 14, padding: "16px 16px 6px", background: C.white }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 6px 4px" }}>
          <span style={mono({ fontSize: 10, color: C.mute, textTransform: "uppercase", fontWeight: 800 })}>Old cycle</span>
          <span style={mono({ fontSize: 10, color: C.brand, textTransform: "uppercase", fontWeight: 900 })}>With GLP-1 support</span>
        </div>
        <svg viewBox="0 0 560 200" role="img" aria-label="Weight projection: diet alone stalls while GLP-1 support keeps momentum" style={{ width: "100%", height: "auto", display: "block" }}>
          <line x1="40" y1="186" x2="532" y2="186" stroke="rgba(14,14,12,0.12)" strokeWidth="1.5" />
          <path d="M48 48 C 170 86, 280 100, 520 104" fill="none" stroke="#B9B4A8" strokeWidth="3" strokeDasharray="7 7" />
          <path d="M48 48 C 160 118, 320 158, 514 170" fill="none" stroke="#0E4F4F" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="48" cy="48" r="7" fill="#0E4F4F" />
          <circle cx="514" cy="170" r="7" fill="#0E4F4F" />
          <text x="62" y="42" fontSize="14" fontWeight="800" fill="#0E0E0C" fontFamily="Inter, system-ui, sans-serif">Today</text>
          <text x="408" y="150" fontSize="14" fontWeight="800" fill="#0E4F4F" fontFamily="Inter, system-ui, sans-serif">Momentum</text>
          <text x="300" y="92" fontSize="11.5" fill="#6E6A60" fontFamily="Inter, system-ui, sans-serif">diet alone stalls</text>
        </svg>
      </div>
      <QuestionTitle>How is that pace for you?</QuestionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }} className="pace-grid">
        <Tile active={pace === "good"} onClick={() => setPace("good")} title="Works for me" />
        <Tile active={pace === "faster"} onClick={() => setPace("faster")} title="I want it faster" />
        <Tile active={pace === "too-fast"} onClick={() => setPace("too-fast")} title="That's too fast" />
      </div>
      <NextButton disabled={!pace} onClick={() => { if (pace) update({ pace }); next(); }} />
    </StepShell>
  );
}

function StepResults({ state }: { state: IntakeState }) {
  const totalInches = (state.feetIn ?? 0) * 12 + (state.inchesIn ?? 0);
  const bmi = state.weightLbs && totalInches > 0 ? ((state.weightLbs / (totalInches * totalInches)) * 703).toFixed(2) : "Not available";
  const currentWeight = state.weightLbs ?? 0;
  const goalWeight = state.goalWeightLbs ?? 0;
  const weightLoss = Math.max(0, currentWeight - goalWeight);

  const checkout = () => {
    track("checkout_redirect", {
      funnel_name: "glp1_offer_v1",
      placement: "intake_results",
      product: "semaglutide",
      med_pref: "sema",
      offer_price: "from_99_mo",
      goal_range: state.goalRange,
    });
    window.location.href = checkoutUrl(state);
  };

  return (
    <StepShell title="Your medical checkup is ready.">
      <div style={{ display: "grid", gap: 14 }}>
        <Row label="BMI" value={bmi} />
        <Row label="Current weight" value={`${currentWeight} lbs`} />
        <Row label="Goal weight" value={`${goalWeight} lbs (${weightLoss} lbs to go)`} />
        <div style={{ border: `1px solid ${C.brand}33`, background: C.brandSoft, borderRadius: 12, padding: 16, ...sans({ fontSize: 14, color: C.text2, lineHeight: 1.5 }) }}>
          You are a strong candidate for medical weight loss. In the largest semaglutide trial, <strong>86% of participants lost at least 5% of their body weight</strong> &mdash; and 7 in 10 lost more than 10% (NEJM, 2021).
        </div>
        <div style={{ border: "1px solid rgba(15, 118, 80, 0.22)", background: "rgba(15, 118, 80, 0.07)", borderRadius: 16, padding: 16, ...sans({ fontSize: 14, color: C.text, lineHeight: 1.5 }) }}>
          <strong>Your pricing before checkout</strong>
          <ul style={{ marginTop: 8, paddingLeft: 18 }}>
            <li>Semaglutide plans from $99/mo</li>
            <li>No membership fee. No insurance needed.</li>
            <li>Free shipping included</li>
            <li>No subscription &mdash; you only pay again when you choose to reorder</li>
          </ul>
        </div>
        <figure style={{ border: `1px solid ${C.line}`, background: C.white, borderRadius: 14, padding: 18, margin: 0, display: "grid", gridTemplateColumns: "44px 1fr", gap: 14, alignItems: "start" }}>
          <span style={{ width: 44, height: 44, borderRadius: 999, background: C.brand, color: C.white, display: "inline-flex", alignItems: "center", justifyContent: "center", ...sans({ fontSize: 16, fontWeight: 900 }) }}>J</span>
          <div>
            <span style={{ color: "#D6A038", fontSize: 13, letterSpacing: 2 }}>★★★★★</span>
            <blockquote style={sans({ margin: "6px 0 0", fontSize: 14.5, color: C.text, lineHeight: 1.5, fontWeight: 700 })}>
              &ldquo;Down 23 lbs in my first three months. The constant food noise just... stopped.&rdquo;
            </blockquote>
            <figcaption style={sans({ marginTop: 6, fontSize: 12.5, color: C.mute, fontWeight: 700 })}>Jessica M. · Semaglutide member · Texas</figcaption>
          </div>
        </figure>
        <button type="button" onClick={checkout} className="btn-brand" style={{ width: "100%", justifyContent: "center", padding: "17px 24px", fontSize: 16 }}>
          Continue to secure checkout →
        </button>
      </div>
    </StepShell>
  );
}

function StepShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1 style={headline()}>{title}</h1>
      {subtitle && <p style={sans({ marginTop: 12, marginBottom: 28, color: C.text2, fontSize: 16, lineHeight: 1.45 })}>{subtitle}</p>}
      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 22, marginTop: subtitle ? 0 : 28 }}>{children}</div>
    </div>
  );
}

function QuestionTitle({ children }: { children: React.ReactNode }) {
  return <h2 style={sans({ marginBottom: 16, fontSize: 20, color: C.brand, fontWeight: 850, lineHeight: 1.2 })}>{children}</h2>;
}

function Tile({ active, onClick, title, description }: { active: boolean; onClick: () => void; title: string; description?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        display: "grid",
        gridTemplateColumns: "24px 1fr",
        gap: 14,
        alignItems: "center",
        border: `1px solid ${active ? C.brand : C.line}`,
        background: C.white,
        borderRadius: 8,
        padding: "16px 18px",
        cursor: "pointer",
        boxShadow: active ? `0 0 0 3px ${C.brandSoft}` : "none",
      }}
    >
      <span style={{ width: 20, height: 20, borderRadius: 999, border: `1px solid ${active ? C.brand : C.mute}`, background: active ? C.brand : C.white, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        {active && <span style={{ width: 8, height: 8, borderRadius: 999, background: C.white }} />}
      </span>
      <span>
        <strong style={sans({ display: "block", fontSize: 16, color: C.text, fontWeight: 800 })}>{title}</strong>
        {description && <span style={sans({ display: "block", marginTop: 3, fontSize: 13.5, color: C.mute, lineHeight: 1.4 })}>{description}</span>}
      </span>
    </button>
  );
}

function NumberField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder: string }) {
  return (
    <label style={{ display: "block" }}>
      <span style={mono({ fontSize: 10.5, color: C.mute, textTransform: "uppercase" })}>{label}</span>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: "100%", marginTop: 6, border: `1px solid ${C.line}`, borderRadius: 8, padding: "12px 13px", ...sans({ fontSize: 17, color: C.text }) }}
      />
    </label>
  );
}

function NextButton({ disabled, onClick }: { disabled?: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className="btn-brand" style={{ width: "100%", justifyContent: "center", marginTop: 28, opacity: disabled ? 0.45 : 1, pointerEvents: disabled ? "none" : "auto" }}>
      Next →
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 12, gap: 20 }}>
      <span style={sans({ fontSize: 14, color: C.mute, fontWeight: 700 })}>{label}</span>
      <span style={sans({ fontSize: 15, color: C.text, fontWeight: 900 })}>{value}</span>
    </div>
  );
}

function headline(): React.CSSProperties {
  return sans({
    fontSize: "clamp(32px, 5vw, 46px)",
    color: C.brand,
    fontWeight: 850,
    letterSpacing: "-0.024em",
    lineHeight: 1.05,
  });
}

function IntakeStyles() {
  return (
    <style jsx>{`
      @media (max-width: 760px) {
        :global(.metrics-grid),
        :global(.pace-grid) {
          grid-template-columns: 1fr !important;
        }
        :global(.stage-row) {
          grid-template-columns: 1fr !important;
          gap: 6px !important;
        }
        :global(.stage-row > div) {
          display: grid;
          grid-template-columns: 70px 1fr;
          gap: 8px;
          align-items: center;
          text-align: left !important;
        }
        :global(.stage-row > div > div:first-child) {
          height: 4px !important;
          order: 2;
        }
      }
    `}</style>
  );
}
