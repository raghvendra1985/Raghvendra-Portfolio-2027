"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

export default function TrackOnMount({
  event,
  payload,
}: {
  event: AnalyticsEvent;
  payload?: Record<string, string | number | boolean | undefined | null>;
}) {
  useEffect(() => {
    track(event, payload);
  }, [event, payload]);
  return null;
}
