/**
 * Runtime checks for Phase 1 analytics — imports production helpers.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  caseStudyScrollProgress,
  CANONICAL_TO_LEGACY,
  isFunnelEvent,
  LEGACY_TO_CANONICAL,
  planFunnelEmissions,
  planTrackEmissions,
  sanitizeAnalyticsPayload,
} from "../lib/analytics-core";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Dual-write via production planners
assert.deepEqual(
  planTrackEmissions("contact_cta_clicked", { source: "home_hero" }).map((e) => e.event),
  ["contact_cta_clicked", "contact_cta_click"],
);

assert.deepEqual(
  planFunnelEmissions("contact_start", { source: "contact_form", intent: "none" }).map(
    (e) => e.event,
  ),
  ["contact_start", "contact_form_started"],
);

assert.deepEqual(
  planFunnelEmissions("case_study_open", { source: "home_leadership_work", slug: "nye" }).map(
    (e) => e.event,
  ),
  ["case_study_open", "project_clicked"],
);

// project_clicked must NOT map to case_study_open
assert.equal(LEGACY_TO_CANONICAL.project_clicked, undefined);
assert.deepEqual(
  planTrackEmissions("project_clicked", { source: "archive" }).map((e) => e.event),
  ["project_clicked"],
);

// Funnel events rejected by planTrackEmissions
assert.equal(planTrackEmissions("case_study_open", { source: "x" }).length, 0);
assert.ok(isFunnelEvent("concierge_question"));
assert.ok(isFunnelEvent("external_project_click"));

// Source required
assert.equal(planFunnelEmissions("resume_download", {}).length, 0);
assert.equal(planFunnelEmissions("resume_download", { source: "primary_nav" }).length, 1);

// Legacy → funnel without source: legacy only
assert.deepEqual(
  planTrackEmissions("contact_cta_clicked", { from: "home" }).map((e) => e.event),
  ["contact_cta_clicked"],
);

// Concierge dual-write
assert.equal(CANONICAL_TO_LEGACY.concierge_question, "concierge_query");
assert.deepEqual(
  planFunnelEmissions("concierge_question", { source: "concierge", mode: "hiring" }).map(
    (e) => e.event,
  ),
  ["concierge_question", "concierge_query"],
);

// Scroll progress from production helper
assert.equal(caseStudyScrollProgress(800, 900, 0), 0);
assert.ok(caseStudyScrollProgress(4000, 900, 1550) >= 0.5);

// Privacy
const sanitized = sanitizeAnalyticsPayload({
  source: "concierge",
  query: "secret",
  transcript: "voice",
  mode: "ask",
});
assert.equal(sanitized.query, undefined);
assert.equal(sanitized.transcript, undefined);
assert.equal(sanitized.mode, "ask");
assert.equal(sanitized.source, "concierge");

const analyticsSrc = readFileSync(join(root, "lib/analytics.ts"), "utf8");
const coreSrc = readFileSync(join(root, "lib/analytics-core.ts"), "utf8");
const conciergeSrc = readFileSync(join(root, "concierge/analytics.ts"), "utf8");
assert.ok(!analyticsSrc.includes("debug-session"));
assert.ok(conciergeSrc.includes("sanitizeAnalyticsPayload"));
assert.ok(conciergeSrc.includes("trackFunnel"));
assert.ok(coreSrc.includes("case_study_open"));

const leadership = readFileSync(join(root, "components/home/LeadershipWork.tsx"), "utf8");
assert.ok(leadership.includes('event="case_study_open"'));
assert.ok(!leadership.includes('event="project_clicked"'));

console.log("Phase 1 analytics runtime tests OK");
console.log(
  JSON.stringify(
    {
      importsProductionHelpers: true,
      dualWriteCaseOpenToProjectClicked: true,
      projectClickedNotRemapped: true,
      shortPageProgress: 0,
      conciergeQuestionIsFunnel: true,
      noDebugSink: true,
    },
    null,
    2,
  ),
);
