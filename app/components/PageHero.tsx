import { C, serif, mono, label, PAGE_X, MAX_W } from "@/lib/design";

/**
 * PageHero — variants for ink (dark hero) and paper (cream hero).
 * Defaults to "ink" because most interior pages still use the dark editorial
 * hero. Pass tone="paper" for marketing pages (about, faq, contact) in v4.
 */
export function PageHero({
  eyebrow: e,
  title,
  lede,
  meta,
  tone = "ink",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  meta?: string;
  tone?: "ink" | "paper";
}) {
  const isInk = tone === "ink";
  const bg = isInk ? C.ink : C.paper;
  const text = isInk ? C.bone : C.text;
  const text2 = isInk ? C.bone2 : C.text2;
  const text3 = isInk ? C.bone3 : C.mute;
  const text4 = isInk ? C.bone4 : C.mute;
  const lineColor = isInk ? C.inkLine : C.line;

  return (
    <section
      style={{
        background: bg,
        color: text,
        padding: `clamp(64px, 9vw, 112px) ${PAGE_X} clamp(56px, 7vw, 80px)`,
        borderBottom: `1px solid ${lineColor}`,
        position: "relative",
      }}
    >
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div style={label(text3)}>{e}</div>
        <h1
          style={serif({
            fontSize: "clamp(48px, 7vw, 108px)",
            fontWeight: 300,
            lineHeight: 0.96,
            letterSpacing: "-0.03em",
            color: text,
            marginTop: 24,
            maxWidth: 960,
          })}
        >
          {title}
        </h1>
        {lede && (
          <p
            style={serif({
              fontSize: "clamp(19px, 1.7vw, 24px)",
              lineHeight: 1.5,
              color: text2,
              marginTop: 32,
              maxWidth: 760,
              fontWeight: 300,
            })}
          >
            {lede}
          </p>
        )}
        {meta && (
          <p
            style={{
              ...mono({
                fontSize: 11,
                color: text4,
                marginTop: 36,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }),
            }}
          >
            {meta}
          </p>
        )}
      </div>
    </section>
  );
}
