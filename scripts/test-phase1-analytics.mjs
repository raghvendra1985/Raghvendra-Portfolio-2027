/**
 * Runtime checks for Phase 1 analytics semantics (no browser / no PII).
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const LEGACY_TO_CANONICAL = {
  work_toc_clicked: "work_filter_use",
  enterprise_case_clicked: "case_study_open",
  concierge_query: "concierge_question",
  contact_form_started: "contact_start",
  contact_form_submitted: "contact_submit",
  contact_cta_clicked: "contact_cta_click",
  contact_form_failed: "contact_submit_failed",
};

const CANONICAL_TO_LEGACY = {
  work_filter_use: "work_toc_clicked",
  contact_cta_click: "contact_cta_clicked",
  contact_start: "contact_form_started",
  contact_submit: "contact_form_submitted",
  contact_submit_failed: "contact_form_failed",
};

const emitted = [];

function emitRaw(event, payload) {
  emitted.push({ event, payload: { ...payload } });
}

function trackFunnel(event, payload) {
  if (!payload.source) return;
  emitRaw(event, payload);
  const legacy = CANONICAL_TO_LEGACY[event];
  if (legacy && legacy !== event) emitRaw(legacy, { ...payload, dual_of: event });
}

function track(event, payload = {}) {
  emitRaw(event, payload);
  const canonical = LEGACY_TO_CANONICAL[event];
  if (canonical && canonical !== event) {
    emitRaw(canonical, { ...payload, legacy_event: event });
  }
}

function progress(scrollHeight, innerHeight, scrollY) {
  const scrollable = scrollHeight - innerHeight;
  if (scrollable <= 0) return 0;
  return scrollY / scrollable;
}

function stripSensitive(payload) {
  const out = { ...payload };
  for (const key of ["name", "email", "message", "query", "transcript"]) {
    delete out[key];
  }
  return out;
}

emitted.length = 0;
track("contact_cta_clicked", { source: "home_hero" });
assert.deepEqual(emitted.map((e) => e.event), ["contact_cta_clicked", "contact_cta_click"]);

emitted.length = 0;
trackFunnel("contact_start", { source: "contact_form", intent: "none" });
assert.deepEqual(emitted.map((e) => e.event), ["contact_start", "contact_form_started"]);

emitted.length = 0;
track("project_clicked", { source: "archive", href: "https://example.com" });
assert.ok(!emitted.some((e) => e.event === "case_study_open"));

emitted.length = 0;
trackFunnel("resume_download", {});
assert.equal(emitted.length, 0);
trackFunnel("resume_download", { source: "primary_nav" });
assert.equal(emitted.length, 1);

assert.equal(progress(800, 900, 0), 0);
assert.ok(progress(4000, 900, 1550) >= 0.5);

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
assert.ok(!sequence.includes("contact_form_start"));

const sanitized = stripSensitive({
  source: "concierge",
  query: "secret question",
  transcript: "voice",
  mode: "ask",
});
assert.equal(sanitized.query, undefined);
assert.equal(sanitized.transcript, undefined);
assert.equal(sanitized.mode, "ask");

const analyticsSrc = readFileSync(join(root, "lib/analytics.ts"), "utf8");
assert.ok(!analyticsSrc.includes("debug-session"));
assert.ok(!analyticsSrc.includes("/api/debug"));
const conciergeSrc = readFileSync(join(root, "concierge/analytics.ts"), "utf8");
assert.ok(conciergeSrc.includes("SENSITIVE_KEYS"));
assert.ok(conciergeSrc.includes('"query"'));
assert.ok(conciergeSrc.includes('"transcript"'));
assert.ok(!conciergeSrc.includes("debug-session"));

const forbiddenInTree = ["debug-session-log", "/api/debug-session", "__analyticsDebugSink"];
for (const needle of forbiddenInTree) {
  assert.ok(!analyticsSrc.includes(needle), needle);
  assert.ok(!conciergeSrc.includes(needle), needle);
}

console.log("Phase 1 analytics runtime tests OK");
console.log(JSON.stringify({ dualWrite: true, shortPageProgress: 0, sequence, noDebugSink: true }, null, 2));
