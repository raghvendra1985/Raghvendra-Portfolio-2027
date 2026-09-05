/**
 * Pure Phase 1 analytics helpers — shared by runtime tracker and tests.
 * Keep this module free of browser/Vercel side effects.
 */

export type AnalyticsPayload = Record<
  string,
  string | number | boolean | undefined | null
>;

export const FUNNEL_EVENTS = [
  "hero_work_click",
  "work_filter_use",
  "case_study_open",
  "case_study_view",
  "case_study_depth_50",
  "case_study_complete",
  "resume_download",
  "contact_cta_click",
  "contact_start",
  "contact_submit",
  "contact_submit_failed",
  "concierge_question",
  "external_project_click",
] as const;

export type FunnelEventName = (typeof FUNNEL_EVENTS)[number];

export const FUNNEL_EVENT_SET: ReadonlySet<string> = new Set(FUNNEL_EVENTS);

export function isFunnelEvent(event: string): event is FunnelEventName {
  return FUNNEL_EVENT_SET.has(event);
}

/**
 * Dual-write: legacy name → canonical Phase 1 name.
 * `project_clicked` is NOT mapped to case_study_open — callers must choose.
 */
export const LEGACY_TO_CANONICAL: Readonly<Record<string, FunnelEventName | string>> = {
  work_toc_clicked: "work_filter_use",
  enterprise_case_clicked: "case_study_open",
  concierge_query: "concierge_question",
  contact_form_started: "contact_start",
  contact_form_submitted: "contact_submit",
  contact_cta_clicked: "contact_cta_click",
  contact_form_failed: "contact_submit_failed",
};

/**
 * Dual-write: canonical funnel → legacy name (temporary, one release).
 * Includes case_study_open → project_clicked in this direction only.
 */
export const CANONICAL_TO_LEGACY: Readonly<Record<string, string>> = {
  work_filter_use: "work_toc_clicked",
  case_study_open: "project_clicked",
  contact_cta_click: "contact_cta_clicked",
  contact_start: "contact_form_started",
  contact_submit: "contact_form_submitted",
  contact_submit_failed: "contact_form_failed",
  concierge_question: "concierge_query",
};

/** Sensitive keys never forwarded from concierge (or form-like dumps). */
export const SENSITIVE_ANALYTICS_KEYS = [
  "query",
  "transcript",
  "name",
  "email",
  "message",
] as const;

export function sanitizeAnalyticsPayload(
  payload: AnalyticsPayload,
): AnalyticsPayload {
  const safe: AnalyticsPayload = {};
  for (const [key, value] of Object.entries(payload)) {
    if ((SENSITIVE_ANALYTICS_KEYS as readonly string[]).includes(key)) continue;
    safe[key] = value;
  }
  return safe;
}

/**
 * Case-study scroll progress. Returns 0 when the document is not scrollable
 * so short pages do not auto-fire depth/complete.
 */
export function caseStudyScrollProgress(
  scrollHeight: number,
  innerHeight: number,
  scrollY: number,
): number {
  const scrollable = scrollHeight - innerHeight;
  if (scrollable <= 0) return 0;
  return scrollY / scrollable;
}

export type PlannedEmission = {
  event: string;
  payload: AnalyticsPayload;
};

/**
 * Plan emissions for trackFunnel (canonical + optional legacy dual-write).
 * Drops the event when `source` is missing.
 */
export function planFunnelEmissions(
  event: FunnelEventName,
  payload: AnalyticsPayload & { source?: string },
): PlannedEmission[] {
  if (!payload.source) return [];
  const out: PlannedEmission[] = [{ event, payload: { ...payload } }];
  const legacy = CANONICAL_TO_LEGACY[event];
  if (legacy && legacy !== event) {
    out.push({ event: legacy, payload: { ...payload, dual_of: event } });
  }
  return out;
}

/**
 * Plan emissions for generic track() (legacy + optional canonical dual-write).
 * Never treats the input as a FunnelEvent primary. When dual-writing to a
 * funnel name, requires `source` on the payload.
 */
export function planTrackEmissions(
  event: string,
  payload: AnalyticsPayload = {},
): PlannedEmission[] {
  if (isFunnelEvent(event)) {
    return [];
  }
  const out: PlannedEmission[] = [{ event, payload: { ...payload } }];
  const canonical = LEGACY_TO_CANONICAL[event];
  if (canonical && canonical !== event) {
    if (isFunnelEvent(canonical) && !payload.source) {
      return out;
    }
    out.push({
      event: canonical,
      payload: { ...payload, legacy_event: event },
    });
  }
  return out;
}
