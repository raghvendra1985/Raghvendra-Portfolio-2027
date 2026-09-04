import { track as vercelTrack } from "@vercel/analytics";
import { getStoredUtm } from "./utm";

type Payload = Record<string, string | number | boolean | undefined | null>;

/** Canonical Phase 1 funnel + existing product/commerce events. */
export type AnalyticsEvent =
  | "hero_work_click"
  | "work_filter_use"
  | "case_study_open"
  | "case_study_depth_50"
  | "case_study_complete"
  | "resume_download"
  | "resume_requested"
  | "contact_start"
  | "contact_submit"
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
  /** @deprecated Prefer contact_start */
  | "contact_form_started"
  /** @deprecated Prefer contact_submit */
  | "contact_form_submitted";

const EVENT_ALIASES: Partial<Record<AnalyticsEvent, AnalyticsEvent>> = {
  project_clicked: "case_study_open",
  work_toc_clicked: "work_filter_use",
  enterprise_case_clicked: "case_study_open",
  concierge_query: "concierge_question",
  contact_form_started: "contact_start",
  contact_form_submitted: "contact_submit",
  contact_cta_clicked: "contact_start",
};

function pageContext(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const path = `${window.location.pathname}${window.location.hash || ""}`;
  let referrer = "";
  try {
    if (document.referrer) {
      const url = new URL(document.referrer);
      referrer = `${url.host}${url.pathname}`;
    }
  } catch {
    referrer = "";
  }
  return { path, referrer };
}

/**
 * Site-wide analytics hook. Sinks to Vercel Analytics and logs in development.
 * Always attaches stored UTMs, current path, and referrer. Does not send PII.
 * Deprecated event names are remapped to canonical funnel events.
 */
export function track(event: AnalyticsEvent, payload: Payload = {}) {
  const canonical = EVENT_ALIASES[event] ?? event;
  const merged = { ...pageContext(), ...getStoredUtm(), ...payload };
  if (canonical !== event) {
    merged.legacy_event = event;
  }
  const properties: Record<string, string | number | boolean | null> = {};
  for (const [key, value] of Object.entries(merged)) {
    if (value !== undefined) properties[key] = value;
  }
  vercelTrack(canonical, properties);
  if (process.env.NODE_ENV === "development") {
    console.debug(`[analytics] ${canonical}`, merged);
  }
}
