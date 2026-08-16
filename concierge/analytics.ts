import type { ConciergeEvent } from "./types";
import { track } from "@/lib/analytics";

type Payload = Record<string, string | number | boolean | undefined | null>;

/**
 * Concierge events share the site-wide tracker.
 * Swap the provider in `lib/analytics.ts` without changing call sites.
 */
export function trackConcierge(event: ConciergeEvent, payload: Payload = {}) {
  track(event, payload);
}
