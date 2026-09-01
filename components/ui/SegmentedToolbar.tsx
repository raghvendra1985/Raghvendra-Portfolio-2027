"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animateSegmentedIndicator } from "@/animations/buttons";
import { useExperience } from "@/components/providers/ExperienceProvider";

export default function SegmentedToolbar({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { config } = useExperience();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = animateSegmentedIndicator(root, config);
    return () => ctx.revert();
  }, [config]);

  return (
    <div
      ref={ref}
      className="relative isolate flex flex-wrap gap-2"
      role="toolbar"
      aria-label={label}
    >
      <span
        data-segment-thumb
        className="pointer-events-none absolute z-0 bg-navy"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
