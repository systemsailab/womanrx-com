const RESEND_ENDPOINT = "https://api.resend.com/emails";
const FROM = "WomanRx.com <support@womanrx.com>";
const ORDER_NOTIFY_EMAIL = process.env.ORDER_NOTIFY_EMAIL || "team@womanrx.com";

const esc = (s: string) =>
  s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] as string));

export type OrderNotification = {
  subject: string;
  heading: string;
  rows: Array<[string, string]>;
  note?: string;
};

export async function sendOrderNotification(input: OrderNotification): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("order notification skipped: RESEND_API_KEY not configured");
    return false;
  }

  const html =
    `<h2 style="font-family:sans-serif">${esc(input.heading)}</h2>` +
    `<table style="font-family:sans-serif;border-collapse:collapse">` +
    input.rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:4px 12px 4px 0;color:#555">${esc(label)}</td>` +
          `<td style="padding:4px 0"><strong>${esc(value)}</strong></td></tr>`,
      )
      .join("") +
    `</table>` +
    (input.note ? `<p style="font-family:sans-serif;color:#b00000">${esc(input.note)}</p>` : "");

  const text =
    `${input.heading}\n\n` +
    input.rows.map(([label, value]) => `${label}: ${value}`).join("\n") +
    (input.note ? `\n\n${input.note}` : "");

  const payload = JSON.stringify({
    from: FROM,
    to: [ORDER_NOTIFY_EMAIL],
    subject: input.subject,
    html,
    text,
  });

  // Two attempts: the webhook email and this one can land inside the same
  // Resend rate-limit window, and an order notification is too important to drop.
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(RESEND_ENDPOINT, {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: payload,
      });
      if (response.ok) return true;
      console.error("order notification failed", response.status, await response.text().catch(() => ""));
    } catch (error) {
      console.error("order notification failed", error);
    }
    if (attempt === 0) await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  return false;
}
