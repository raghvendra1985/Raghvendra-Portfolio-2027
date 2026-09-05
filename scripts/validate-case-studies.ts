/**
 * Build-time validation for case-study narrative shapes.
 * Fails if required fields are missing, CONFIRM comments leak, or verification
 * content would be treated as public (checked via sources pattern elsewhere).
 *
 * Run: node --import tsx scripts/validate-case-studies.ts
 * Or:  npx tsx scripts/validate-case-studies.ts
 */

import {
  caseStudies,
  featuredWork,
  isCompactCaseStudy,
  isDeepCaseStudy,
  isSupportingCaseStudy,
  type CaseStudy,
} from "../case-studies";

const errors: string[] = [];

function fail(slug: string, message: string) {
  errors.push(`${slug}: ${message}`);
}

function assertNonEmpty(slug: string, label: string, value: unknown) {
  if (typeof value !== "string" || !value.trim()) {
    fail(slug, `missing ${label}`);
  }
}

function assertStringArray(slug: string, label: string, value: unknown, min = 1) {
  if (!Array.isArray(value) || value.length < min || value.some((v) => typeof v !== "string" || !v.trim())) {
    fail(slug, `${label} must be a non-empty string array (min ${min})`);
  }
}

function validateDeep(study: CaseStudy) {
  if (!isDeepCaseStudy(study)) return;
  const s = study;
  for (const key of [
    "situation",
    "people",
    "apparentProblem",
    "underlyingProblem",
    "wouldChangeNow",
  ] as const) {
    assertNonEmpty(s.slug, key, s[key]);
  }
  if (!s.mandate) fail(s.slug, "missing mandate");
  else {
    for (const key of [
      "owned",
      "others",
      "decisionMaker",
      "team",
      "authority",
      "deliveryConstraints",
    ] as const) {
      assertNonEmpty(s.slug, `mandate.${key}`, s.mandate[key]);
    }
  }
  assertStringArray(s.slug, "constraints", s.constraints, 1);
  if (!s.decision) fail(s.slug, "missing decision");
  else {
    for (const key of ["situation", "evidence", "tradeoff", "choice", "result"] as const) {
      assertNonEmpty(s.slug, `decision.${key}`, s.decision[key]);
    }
    if (!s.decision.options?.length) fail(s.slug, "decision.options required");
  }
  assertStringArray(s.slug, "systemChangeSteps", s.systemChangeSteps, 1);
  if (!s.iteration?.length) fail(s.slug, "iteration required");
  if (!s.outcomes?.length) fail(s.slug, "outcomes required");
  else {
    for (const o of s.outcomes) {
      if (!o.level) fail(s.slug, `outcome "${o.title}" missing level`);
      if (!o.confidence) fail(s.slug, `outcome "${o.title}" missing confidence`);
    }
  }
  if (!s.frames?.length) fail(s.slug, "frames required");
  if (!s.atAGlance) fail(s.slug, "atAGlance required");
  else {
    for (const key of ["user", "problem", "mandate", "decision", "result"] as const) {
      assertNonEmpty(s.slug, `atAGlance.${key}`, s.atAGlance[key]);
    }
  }
}

function validateSupporting(study: CaseStudy) {
  if (!isSupportingCaseStudy(study)) return;
  const s = study;
  assertNonEmpty(s.slug, "situation", s.situation);
  assertNonEmpty(s.slug, "wouldChangeNow", s.wouldChangeNow);
  if (!s.mandate) fail(s.slug, "missing mandate");
  if (!s.decision) fail(s.slug, "missing decision");
  assertStringArray(s.slug, "systemChangeSteps", s.systemChangeSteps, 1);
  if (!s.outcomes?.length) fail(s.slug, "outcomes required");
  else {
    for (const o of s.outcomes) {
      if (!o.level) fail(s.slug, `outcome "${o.title}" missing level`);
      if (!o.confidence) fail(s.slug, `outcome "${o.title}" missing confidence`);
    }
  }
  if (!s.frames?.length) fail(s.slug, "frames required");
}

function validateCompact(study: CaseStudy) {
  if (!isCompactCaseStudy(study)) return;
  const s = study;
  assertNonEmpty(s.slug, "situation", s.situation);
  assertNonEmpty(s.slug, "audience", s.audience);
  assertNonEmpty(s.slug, "designObjective", s.designObjective);
  assertStringArray(s.slug, "decisions", s.decisions, 1);
  if (!s.frames?.length) fail(s.slug, "frames required");
  if (!s.outcomes?.length) fail(s.slug, "outcomes required");
}

function assertNoConfirmLeak(study: CaseStudy) {
  // Exclude internal verification notes — they may say "Confirm …".
  const { verification: _verification, ...publicFields } = study;
  void _verification;
  if (/CONFIRM/.test(JSON.stringify(publicFields))) {
    fail(study.slug, "CONFIRM marker still present in public case-study fields");
  }
}

const expectedFeatured = ["nye", "crowley", "gwk-ghostwriter"];
const actualFeatured = featuredWork.map((s) => s.slug);
if (actualFeatured.join(",") !== expectedFeatured.join(",")) {
  errors.push(
    `featuredWork order must be ${expectedFeatured.join(" → ")}, got ${actualFeatured.join(" → ")}`,
  );
}

for (const study of caseStudies) {
  assertNoConfirmLeak(study);
  if (study.tier !== "flagship") continue;
  validateDeep(study);
  validateSupporting(study);
  validateCompact(study);
}

if (errors.length) {
  console.error("Case study validation failed:\n");
  for (const error of errors) console.error(`  • ${error}`);
  process.exit(1);
}

console.log(
  `Validated ${caseStudies.length} case studies (${featuredWork.length} featured). OK.`,
);
