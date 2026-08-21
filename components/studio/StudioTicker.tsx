"use client";

import { useEffect, useRef } from "react";
import { animateStudioTicker } from "@/animations/studio";
import { useExperience } from "@/components/providers/ExperienceProvider";

export default function StudioTicker({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { config } = useExperience();
  const row = items.filter(Boolean);

  useEffect(() => {
    const root = ref.current;
    if (!root || row.length < 2) return;
    const ctx = animateStudioTicker(root, config);
    return () => ctx.revert();
  }, [config, row.length]);

  if (!row.length) return null;

  return (
    <div
      ref={ref}
      className="studio-ticker overflow-hidden border-y border-line py-4"
      role="region"
      aria-label="Studio topics"
      tabIndex={0}
    >
      <div data-studio-ticker-track className="flex w-max whitespace-nowrap">
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
