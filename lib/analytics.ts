import { track as vercelTrack } from "@vercel/analytics";
import { getStoredUtm } from "./utm";

type Payload = Record<string, string | number | boolean | undefined | null>;

export type AnalyticsEvent =
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
  | "concierge_open"
  | "concierge_query"
  | "concierge_result_click"
  | "concierge_no_result"
  | "concierge_voice_start"
  | "concierge_voice_result"
  | "concierge_speak"
  | "charm_hung"
  | "charm_flicked"
  | "charm_ritual"
  | "charm_hidden"
  | "charm_switched"
  | "resume_download"
  | "resume_requested"
  | "project_clicked"
  | "enterprise_case_clicked"
  | "service_clicked"
  | "service_view"
  | "contact_cta_clicked"
  | "contact_intent_selected"
  | "contact_form_submitted"
  | "knowledge_article_clicked"
  | "hiring_path_clicked"
  | "problem_route_clicked"
  | "nav_clicked";

/**
 * Site-wide analytics hook. Sinks to Vercel Analytics and logs in development.
 * Always attaches stored UTMs. Does not send PII.
 */
export function track(event: AnalyticsEvent, payload: Payload = {}) {
  const merged = { ...getStoredUtm(), ...payload };
  const properties: Record<string, string | number | boolean | null> = {};
  for (const [key, value] of Object.entries(merged)) {
    if (value !== undefined) properties[key] = value;
  }
  vercelTrack(event, properties);
  if (process.env.NODE_ENV === "development") {
    console.debug(`[analytics] ${event}`, merged);
  }
}
