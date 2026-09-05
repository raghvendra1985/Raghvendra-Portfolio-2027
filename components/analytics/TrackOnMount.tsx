"use client";

import { useEffect } from "react";
import {
  isFunnelEvent,
  track,
  trackFunnel,
  type FunnelEvent,
  type FunnelPayload,
  type NonFunnelEvent,
} from "@/lib/analytics";

type Payload = Record<string, string | number | boolean | undefined | null>;

type Props =
  | { event: FunnelEvent; payload: FunnelPayload }
  | { event: NonFunnelEvent; payload?: Payload };

export default function TrackOnMount({ event, payload }: Props) {
  useEffect(() => {
    if (isFunnelEvent(event)) {
      trackFunnel(event, payload as FunnelPayload);
      return;
    }
    track(event, payload);
  }, [event, payload]);

  return null;
}
