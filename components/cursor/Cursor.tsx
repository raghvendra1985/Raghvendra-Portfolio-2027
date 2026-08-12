"use client";

import { useEffect, useRef } from "react";
import { animateCursor } from "@/animations/cursor";
import { useExperience } from "@/components/providers/ExperienceProvider";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const { config } = useExperience();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    return animateCursor(node, config);
  }, [config]);

  return (
    <div
      ref={ref}
      data-cursor-root
      data-state="idle"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-3 w-3 rounded-full bg-navy mix-blend-multiply md:block data-[state=active]:bg-gold"
      aria-hidden="true"
    >
      <span
        data-cursor-label
        className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap font-mono-label text-[9px] text-navy"
      />
    </div>
  );
}
