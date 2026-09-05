import type { ConciergeEvent } from "./types";
import {
  sanitizeAnalyticsPayload,
  track,
  trackFunnel,
  type FunnelPayload,
  type NonFunnelEvent,
} from "@/lib/analytics";

type Payload = Record<string, string | number | boolean | undefined | null>;

/**
 * Concierge events share the site-wide tracker.
 * Always attaches `source`. Strips free-text query/transcript/form fields.
 * `concierge_query` is dual-written as funnel `concierge_question`.
 */
export function trackConcierge(event: ConciergeEvent, payload: Payload = {}) {
  const safe = sanitizeAnalyticsPayload(payload);
  const source =
    typeof safe.source === "string" && safe.source ? safe.source : "concierge";
  const withSource = { ...safe, source };

  if (event === "concierge_query") {
    trackFunnel("concierge_question", withSource as FunnelPayload);
    return;
  }

  track(event as NonFunnelEvent, withSource);
}
