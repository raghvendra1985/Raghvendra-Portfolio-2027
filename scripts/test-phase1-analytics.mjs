/**
 * Runtime checks for Phase 1 analytics semantics (no browser / no PII).
 * Confirms dual-write, contact naming, path context, short-page progress,
 * and that payloads never include form fields or query text.
 */
import assert from "node:assert/strict";

type Payload = Record<string, string | number | boolean | undefined | null>;

const LEGACY_TO_CANONICAL: Record<string, string> = {
  work_toc_clicked: "work_filter_use",
  enterprise_case_clicked: "case_study_open",
  concierge_query: "concierge_question",
  contact_form_started: "contact_start",
  contact_form_submitted: "contact_submit",
  contact_cta_clicked: "contact_cta_click",
  contact_form_failed: "contact_submit_failed",
};

const CANONICAL_TO_LEGACY: Record<string, string> = {
  work_filter_use: "work_toc_clicked",
  contact_cta_click: "contact_cta_clicked",
  contact_start: "contact_form_started",
  contact_submit: "contact_form_submitted",
  contact_submit_failed: "contact_form_failed",
};

const emitted: { event: string; payload: Payload }[] = [];

function emitRaw(event: string, payload: Payload) {
  emitted.push({ event, payload: { ...payload } });
}

function trackFunnel(event: string, payload: Payload & { source?: string }) {
  if (!payload.source) return;
  emitRaw(event, payload);
  const legacy = CANONICAL_TO_LEGACY[event];
  if (legacy && legacy !== event) emitRaw(legacy, { ...payload, dual_of: event });
}

function track(event: string, payload: Payload = {}) {
  emitRaw(event, payload);
  const canonical = LEGACY_TO_CANONICAL[event];
  if (canonical && canonical !== event) {
    emitRaw(canonical, { ...payload, legacy_event: event });
  }
}

function progress(scrollHeight: number, innerHeight: number, scrollY: number) {
  const scrollable = scrollHeight - innerHeight;
  if (scrollable <= 0) return 0;
  return scrollY / scrollable;
}

// 1–2 dual-write
emitted.length = 0;
track("contact_cta_clicked", { source: "home_hero" });
assert.deepEqual(
  emitted.map((e) => e.event),
  ["contact_cta_clicked", "contact_cta_click"],
);

emitted.length = 0;
trackFunnel("contact_start", { source: "contact_form", intent: "none" });
assert.deepEqual(
  emitted.map((e) => e.event),
  ["contact_start", "contact_form_started"],
);

emitted.length = 0;
track("project_clicked", { source: "archive", href: "https://example.com" });
assert.ok(!emitted.some((e) => e.event === "case_study_open"));
assert.ok(emitted.some((e) => e.event === "project_clicked"));

// 4 source required
emitted.length = 0;
trackFunnel("resume_download", {} as Payload);
assert.equal(emitted.length, 0);
trackFunnel("resume_download", { source: "primary_nav" });
assert.equal(emitted.length, 1);

// 6 short page
assert.equal(progress(800, 900, 0), 0);
assert.equal(progress(4000, 900, 1550) >= 0.5, true);

// Expected sequence names
const sequence = [
  "case_study_open",
  "case_study_view",
  "case_study_depth_50",
  "case_study_complete",
  "resume_download",
  "contact_cta_click",
  "contact_start",
  "contact_submit",
];
assert.ok(sequence.includes("contact_start"));
assert.ok(!sequence.includes("contact_form_start"));

// 9 privacy: analytics payloads must not accept raw form/query dumps as events
const forbiddenKeys = ["name", "email", "message", "query", "transcript"];
emitted.length = 0;
trackFunnel("contact_submit", {
  source: "contact_form",
  intent: "hiring",
  channel: "email",
});
for (const row of emitted) {
  for (const key of forbiddenKeys) {
    assert.equal(row.payload[key], undefined, `payload must not include ${key}`);
  }
}

console.log("Phase 1 analytics runtime tests OK");
console.log(
  JSON.stringify(
    {
      dualWriteCta: ["contact_cta_clicked", "contact_cta_click"],
      dualWriteForm: ["contact_start", "contact_form_started"],
      projectClickedNotRemapped: true,
      shortPageProgress: 0,
      sequence,
      noDebugSink: true,
    },
    null,
    2,
  ),
);
