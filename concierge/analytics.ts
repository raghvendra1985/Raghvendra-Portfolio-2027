import type { ConciergeEvent } from "./types";
import { track } from "@/lib/analytics";

type Payload = Record<string, string | number | boolean | undefined | null>;

/** Never forward free-text queries, transcripts, or form-like fields. */
const SENSITIVE_KEYS = new Set(["query", "transcript", "name", "email", "message"]);

/**
 * Concierge events share the site-wide tracker.
 * Swap the provider in `lib/analytics.ts` without changing call sites.
 */
export function trackConcierge(event: ConciergeEvent, payload: Payload = {}) {
  const safe: Payload = {};
  for (const [key, value] of Object.entries(payload)) {
    if (SENSITIVE_KEYS.has(key)) continue;
    safe[key] = value;
  }
  track(event, safe);
}
