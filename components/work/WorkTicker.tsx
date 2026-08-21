"use client";

import { useEffect, useRef } from "react";
import { animateWorkTicker } from "@/animations/work";
import { useExperience } from "@/components/providers/ExperienceProvider";

export default function WorkTicker({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { config } = useExperience();
  const row = items.filter(Boolean);

  useEffect(() => {
    const root = ref.current;
    if (!root || row.length < 2) return;
    const ctx = animateWorkTicker(root, config);
    return () => ctx.revert();
  }, [config, row.length]);

  if (!row.length) return null;

  return (
    <div
      ref={ref}
      className="mt-8 overflow-hidden py-3"
      role="region"
      aria-label="Work lanes"
      tabIndex={0}
    >
      <div data-work-ticker-track className="flex w-max whitespace-nowrap">
        <TickerRow items={row} />
        {config.reducedMotion ? null : <TickerRow items={row} hidden />}
      </div>
    </div>
  );
}

function TickerRow({ items, hidden }: { items: string[]; hidden?: boolean }) {
  return (
    <p className="flex shrink-0 gap-10 pr-10 font-mono-label text-navy" aria-hidden={hidden || undefined}>
      {items.map((item, index) => (
        <span key={`${item}-${index}`}>{item}</span>
      ))}
    </p>
  );
}
