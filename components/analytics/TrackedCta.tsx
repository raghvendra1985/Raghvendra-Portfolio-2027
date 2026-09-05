"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import MagneticButton from "@/components/buttons/MagneticButton";
import {
  isFunnelEvent,
  track,
  trackFunnel,
  type AnalyticsEvent,
  type FunnelEvent,
  type FunnelPayload,
  type NonFunnelEvent,
} from "@/lib/analytics";

type Payload = Record<string, string | number | boolean | undefined | null>;

type FunnelTracked = {
  event: FunnelEvent;
  payload: FunnelPayload;
};

type NonFunnelTracked = {
  event: NonFunnelEvent;
  payload?: Payload;
};

function emit(event: AnalyticsEvent, payload: Payload = {}) {
  if (isFunnelEvent(event)) {
    trackFunnel(event, payload as FunnelPayload);
    return;
  }
  track(event, payload);
}

export function TrackedMagneticButton({
  event,
  payload,
  onClick,
  ...props
}: ComponentProps<typeof MagneticButton> & (FunnelTracked | NonFunnelTracked)) {
  return (
    <MagneticButton
      {...props}
      onClick={() => {
        emit(event, payload);
        onClick?.();
      }}
    />
  );
}

export function TrackedLink({
  event,
  payload,
  onClick,
  ...props
}: ComponentProps<typeof Link> & (FunnelTracked | NonFunnelTracked)) {
  return (
    <Link
      {...props}
      onClick={(eventObject) => {
        emit(event, payload);
        onClick?.(eventObject);
      }}
    />
  );
}
