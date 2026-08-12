import type { ConciergeEvent } from "./types";

type Payload = Record<string, string | number | boolean | undefined | null>;

/**
 * Analytics readiness hooks. No provider in Sprint 5.
 * Swap this body later without changing call sites.
 */
export function trackConcierge(event: ConciergeEvent, payload: Payload = {}) {
  if (process.env.NODE_ENV === "development") {
    console.debug(`[concierge] ${event}`, payload);
  }
}
