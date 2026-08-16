"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import MagneticButton from "@/components/buttons/MagneticButton";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type Payload = Record<string, string | number | boolean | undefined | null>;

export function TrackedMagneticButton({
  event,
  payload,
  onClick,
  ...props
}: ComponentProps<typeof MagneticButton> & {
  event: AnalyticsEvent;
  payload?: Payload;
}) {
  return (
    <MagneticButton
      {...props}
      onClick={() => {
        track(event, payload);
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
}: ComponentProps<typeof Link> & {
  event: AnalyticsEvent;
  payload?: Payload;
}) {
  return (
    <Link
      {...props}
      onClick={(eventObject) => {
        track(event, payload);
        onClick?.(eventObject);
      }}
    />
  );
}
