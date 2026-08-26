import { NextResponse } from "next/server";
import { z } from "zod";
import { emailTo, isApprovedContactInbox, logContactMailConfigInvalid } from "@/lib/commerce/config";
import { sendContactInquiry } from "@/lib/commerce/email";
import { clientIp, contactRequestAllowed } from "@/lib/contact-rate-limit";
import {
  contactIntentLabel,
  contactTimelineLabel,
} from "@/lib/contact";

const GENERIC_FAIL = "The message did not send.";

const bodySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(160),
  organisation: z.string().trim().max(160).optional().default(""),
  intent: z.enum(["hiring", "advisory", "workshop", "other"]),
  message: z.string().trim().min(20).max(4000),
  timeline: z
    .enum(["soon", "this-quarter", "exploring", "unsure", ""])
    .optional()
    .default(""),
  source: z.string().trim().max(240).optional().default(""),
  website: z.string().optional().default(""),
});

function safeSource(value: string) {
  const trimmed = value.trim();
  if (!trimmed.startsWith("/")) return "";
  if (!/^\/[A-Za-z0-9/?=&_-]{0,239}$/.test(trimmed)) return "";
  return trimmed;
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Check the form and try again." }, { status: 400 });
  }

  const rate = await contactRequestAllowed(clientIp(request));
  if (rate === "limited") {
    return NextResponse.json({ error: "Please wait a moment and try again." }, { status: 429 });
  }
  if (rate === "unavailable") {
    console.error("contact_mail_rate_store_unavailable");
    return NextResponse.json({ error: GENERIC_FAIL }, { status: 503 });
  }

  if (parsed.data.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (!isApprovedContactInbox()) {
    logContactMailConfigInvalid();
    return NextResponse.json({ error: GENERIC_FAIL }, { status: 503 });
  }

  try {
    const result = await sendContactInquiry({
      to: emailTo(),
      name: parsed.data.name,
      email: parsed.data.email,
      organisation: parsed.data.organisation,
      intentId: parsed.data.intent,
      intentLabel: contactIntentLabel(parsed.data.intent),
      timeline: parsed.data.timeline ? contactTimelineLabel(parsed.data.timeline) : "",
      source: safeSource(parsed.data.source),
      message: parsed.data.message,
    });
    if (result.skipped || !result.id) {
      return NextResponse.json({ error: GENERIC_FAIL }, { status: 503 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: GENERIC_FAIL }, { status: 502 });
  }
}
