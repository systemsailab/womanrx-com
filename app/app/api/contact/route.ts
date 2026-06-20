import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const FROM = "WomanRx.com <support@womanrx.com>";
const TO = process.env.CONTACT_NOTIFY_EMAIL || "emailwilldeane@gmail.com";

const esc = (s: string) =>
  s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] as string));

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, error: "email_not_configured" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const name = String(body.name || "").trim().slice(0, 200);
  const email = String(body.email || "").trim().slice(0, 200);
  const subject = String(body.subject || "").trim().slice(0, 200);
  const message = String(body.message || "").trim().slice(0, 5000);
  const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

  if (!name || !emailOk || !message) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const html =
    `<h2 style="font-family:sans-serif">New contact message — WomanRx.com</h2>` +
    `<p><strong>Name:</strong> ${esc(name)}</p>` +
    `<p><strong>Email:</strong> ${esc(email)}</p>` +
    `<p><strong>Subject:</strong> ${esc(subject || "(none)")}</p>` +
    `<p><strong>Message:</strong></p>` +
    `<p style="white-space:pre-wrap">${esc(message)}</p>`;

  // 1) Notify the team (primary — must succeed)
  const teamRes = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `New WomanRx contact: ${subject || "Message"}`,
      html,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
    }),
  });

  if (!teamRes.ok) {
    const detail = await teamRes.text().catch(() => "");
    return NextResponse.json(
      { ok: false, error: "send_failed", detail: detail.slice(0, 300) },
      { status: 502 },
    );
  }

  // 2) Confirmation to the submitter (best-effort, non-fatal)
  try {
    await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [email],
        subject: "We received your message — WomanRx.com",
        text:
          `Hi ${name},\n\n` +
          `Thanks for reaching out to WomanRx.com. Our patient-care team will respond within one business day.\n\n` +
          `For your records, here is what you sent:\n"${message}"\n\n` +
          `— The WomanRx.com team`,
      }),
    });
  } catch {
    /* ignore confirmation failures */
  }

  return NextResponse.json({ ok: true });
}
