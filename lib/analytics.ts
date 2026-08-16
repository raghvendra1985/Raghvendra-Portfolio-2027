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
  | "purchase_completed"
  | "concierge_open"
  | "concierge_query"
  | "concierge_result_click"
  | "concierge_no_result"
  | "concierge_voice_start"
  | "concierge_voice_result"
  | "concierge_speak";

/**
 * Site-wide analytics hook. No provider yet — swap this body later
 * without changing call sites. Always attaches stored UTMs.
 */
export function track(event: AnalyticsEvent, payload: Payload = {}) {
  const merged = { ...getStoredUtm(), ...payload };
  if (process.env.NODE_ENV === "development") {
    console.debug(`[analytics] ${event}`, merged);
  }
}
