import { track as vercelTrack } from "@vercel/analytics";
import { getStoredUtm } from "./utm";

type Payload = Record<string, string | number | boolean | undefined | null>;

/**
 * Phase 1 hiring funnel — always use `trackFunnel` so `source` is required.
 * Expected contact sequence: contact_cta_click → contact_start → contact_submit
 */
export type FunnelEvent =
  | "hero_work_click"
  | "work_filter_use"
  | "case_study_open"
  | "case_study_view"
  | "case_study_depth_50"
  | "case_study_complete"
  | "resume_download"
  | "contact_cta_click"
  | "contact_start"
  | "contact_submit"
  | "contact_submit_failed";

export type FunnelPayload = Payload & {
  source: string;
};

/** Canonical Phase 1 funnel + existing product/commerce events. */
export type AnalyticsEvent =
  | FunnelEvent
  | "resume_requested"
  | "contact_form_failed"
  | "contact_cta_clicked"
  | "contact_intent_selected"
  | "concierge_question"
  | "concierge_open"
  | "concierge_result_click"
  | "concierge_no_result"
  | "concierge_voice_start"
  | "concierge_voice_result"
  | "concierge_speak"
  | "external_project_click"
  | "products_page_viewed"
  | "product_filter_selected"
  | "product_card_viewed"
  | "product_card_clicked"
  | "product_page_viewed"
  | "product_demo_started"
  | "buy_cta_clicked"
  | "checkout_started"
  | "checkout_opened"
  | "product_view"
  | "product_buy_click"
  | "payment_success"
  | "payment_failed"
  | "purchase_completed"
  | "library_view"
  | "library_item_selected"
  | "product_opened"
  | "product_downloaded"
  | "marketing_opt_in"
  | "charm_hung"
  | "charm_flicked"
  | "charm_ritual"
  | "charm_hidden"
  | "charm_switched"
  | "service_clicked"
  | "service_view"
  | "knowledge_article_clicked"
  | "hiring_path_clicked"
  | "problem_route_clicked"
  | "nav_clicked"
  /** @deprecated Prefer hero_work_click / case_study_open / external_project_click */
  | "project_clicked"
  /** @deprecated Prefer work_filter_use */
  | "work_toc_clicked"
  /** @deprecated Prefer case_study_open */
  | "enterprise_case_clicked"
  /** @deprecated Prefer concierge_question */
  | "concierge_query"
  /** @deprecated Prefer contact_start (form interaction) */
  | "contact_form_started"
  /** @deprecated Prefer contact_submit */
  | "contact_form_submitted";

/**
 * Dual-write: legacy name → canonical Phase 1 name.
 * `project_clicked` is NOT mapped to case_study_open — callers must choose.
 */
const LEGACY_TO_CANONICAL: Partial<Record<AnalyticsEvent, FunnelEvent | AnalyticsEvent>> = {
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
 * Keeps old dashboards receiving data while new names are primary.
 */
const CANONICAL_TO_LEGACY: Partial<Record<FunnelEvent, AnalyticsEvent>> = {
  work_filter_use: "work_toc_clicked",
  contact_cta_click: "contact_cta_clicked",
  contact_start: "contact_form_started",
  contact_submit: "contact_form_submitted",
  contact_submit_failed: "contact_form_failed",
};

const ENTRY_KEY = "analytics_entry_path";
const PREV_KEY = "analytics_previous_path";
const CURR_KEY = "analytics_current_path";

function currentPathname(): string {
  if (typeof window === "undefined") return "";
  return `${window.location.pathname}${window.location.hash || ""}`;
}

/** Keep SPA path history in sessionStorage. Call from a layout effect. */
export function noteAnalyticsPath(pathname: string) {
  if (typeof window === "undefined") return;
  try {
    const path = pathname || currentPathname();
    if (!sessionStorage.getItem(ENTRY_KEY)) {
      sessionStorage.setItem(ENTRY_KEY, path);
    }
    const current = sessionStorage.getItem(CURR_KEY);
    if (current && current !== path) {
      sessionStorage.setItem(PREV_KEY, current);
    }
    sessionStorage.setItem(CURR_KEY, path);
  } catch {
    /* private mode */
  }
}

function referrerDomainOnly(): string {
  if (typeof document === "undefined" || !document.referrer) return "";
  try {
    const url = new URL(document.referrer);
    if (url.origin === window.location.origin) return "";
    return url.hostname;
  } catch {
    return "";
  }
}

function pageContext(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const path = currentPathname();
  let entry_path = path;
  let previous_path = "";
  try {
    entry_path = sessionStorage.getItem(ENTRY_KEY) || path;
    previous_path = sessionStorage.getItem(PREV_KEY) || "";
    if (!sessionStorage.getItem(ENTRY_KEY)) {
      noteAnalyticsPath(path);
      entry_path = path;
    }
  } catch {
    /* private mode */
  }
  return {
    path,
    entry_path,
    previous_path,
    referrer_domain: referrerDomainOnly(),
  };
}

function emitRaw(event: string, payload: Payload) {
  const merged = { ...pageContext(), ...getStoredUtm(), ...payload };
  const properties: Record<string, string | number | boolean | null> = {};
  for (const [key, value] of Object.entries(merged)) {
    if (value !== undefined) properties[key] = value;
  }
  vercelTrack(event, properties);
  if (process.env.NODE_ENV === "development") {
    console.debug(`[analytics] ${event}`, merged);
  }
}

/**
 * Required-source funnel tracker for Phase 1 metrics.
 * Dual-writes the legacy pair when one exists for this release.
 */
export function trackFunnel(event: FunnelEvent, payload: FunnelPayload) {
  if (!payload.source) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[analytics] trackFunnel(${event}) missing source — dropped`);
    }
    return;
  }
  emitRaw(event, payload);
  const legacy = CANONICAL_TO_LEGACY[event];
  if (legacy && legacy !== event) {
    emitRaw(legacy, { ...payload, dual_of: event });
  }
}

/**
 * Site-wide analytics hook. Dual-writes legacy ↔ canonical for one release.
 * Always attaches UTMs + SPA path context. Does not send external URL paths.
 */
export function track(event: AnalyticsEvent, payload: Payload = {}) {
  emitRaw(event, payload);
  const canonical = LEGACY_TO_CANONICAL[event];
  if (canonical && canonical !== event) {
    emitRaw(canonical, { ...payload, legacy_event: event });
  }
}
