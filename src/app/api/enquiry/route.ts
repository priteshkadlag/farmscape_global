import { ACCEPTED_UPLOADS, MAX_UPLOAD_BYTES, enquirySchema, type Enquiry } from "@/lib/enquiry";

/**
 * Receives contact and quote-request submissions.
 *
 * Delivery (configure one in the environment — see README):
 *   ENQUIRY_WEBHOOK_URL   POSTs multipart form data (fields + attachment) to any
 *                         webhook (Zapier, Make, n8n, a CRM, a Google Apps Script…)
 *   RESEND_API_KEY        Sends an email via Resend to ENQUIRY_TO_EMAIL from
 *                         ENQUIRY_FROM_EMAIL (a verified sender).
 * Without either, submissions are logged in development and rejected in
 * production so enquiries are never silently lost.
 */

const MIN_FILL_MS = 3000;
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT.max;
}

const json = (status: number, body: { ok: boolean; message?: string; errors?: Record<string, string[]> }) => Response.json(body, { status });

function summary(e: Enquiry) {
  const rows: [string, string | undefined][] = [
    ["Type", e.kind === "quote" ? "Quote request" : "General enquiry"],
    ["Name", e.name],
    ["Email", e.email],
    ["Phone", e.phone],
    ["Company", e.company],
    ["Project location", e.projectLocation],
    ["Service required", e.service],
    ["Project type", e.projectType],
    ["Estimated timeline", e.timeline],
  ];
  return rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nMessage:\n${e.message}`;
}

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function deliver(e: Enquiry, file: File | null) {
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (webhook) {
    const fd = new FormData();
    Object.entries(e).forEach(([k, v]) => {
      if (k !== "website" && k !== "startedAt") fd.append(k, String(v ?? ""));
    });
    fd.append("submittedAt", new Date().toISOString());
    if (file) fd.append("attachment", file, file.name);
    const res = await fetch(webhook, { method: "POST", body: fd });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const to = process.env.ENQUIRY_TO_EMAIL;
    const from = process.env.ENQUIRY_FROM_EMAIL;
    if (!to || !from) throw new Error("ENQUIRY_TO_EMAIL and ENQUIRY_FROM_EMAIL must be set");
    const text = summary(e);
    const attachments = file ? [{ filename: file.name, content: Buffer.from(await file.arrayBuffer()).toString("base64") }] : undefined;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        reply_to: e.email,
        subject: `${e.kind === "quote" ? "Quote request" : "Website enquiry"} — ${e.name}`,
        text,
        html: `<pre style="font-family:system-ui,sans-serif;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
        attachments,
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[enquiry] No delivery configured — logging submission:\n" + summary(e) + (file ? `\nAttachment: ${file.name} (${file.size} bytes)` : ""));
    return;
  }
  throw new Error("No enquiry delivery method configured");
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return json(429, { ok: false, message: "Too many submissions. Please wait a few minutes and try again." });

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json(400, { ok: false, message: "Invalid submission." });
  }

  const raw = Object.fromEntries([...form.entries()].filter(([, v]) => typeof v === "string")) as Record<string, string>;
  const parsed = enquirySchema.safeParse({ ...raw, consent: raw.consent === "true", startedAt: Number(raw.startedAt) });
  if (!parsed.success) {
    const errors: Record<string, string[]> = {};
    parsed.error.issues.forEach((i) => {
      const key = String(i.path[0] ?? "form");
      (errors[key] ??= []).push(i.message);
    });
    return json(422, { ok: false, message: "Please correct the highlighted fields.", errors });
  }

  const data = parsed.data;
  // Spam traps: filled honeypot or impossibly fast submission → pretend success.
  if (data.website || !data.startedAt || Date.now() - data.startedAt < MIN_FILL_MS) {
    return json(200, { ok: true });
  }

  const attachment = form.get("attachment");
  const file = attachment instanceof File && attachment.size > 0 ? attachment : null;
  if (file) {
    const ext = "." + (file.name.split(".").pop() ?? "").toLowerCase();
    if (!ACCEPTED_UPLOADS.includes(ext)) return json(422, { ok: false, message: "Unsupported attachment type." });
    if (file.size > MAX_UPLOAD_BYTES) return json(413, { ok: false, message: "Attachment is larger than 10 MB." });
  }

  try {
    await deliver(data, file);
  } catch (err) {
    console.error("[enquiry] delivery failed", err);
    return json(502, { ok: false, message: "We couldn’t send your message right now." });
  }
  return json(200, { ok: true });
}
