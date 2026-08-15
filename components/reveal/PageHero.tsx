"use client";

import { useEffect, useRef } from "react";
import { animateHero } from "@/animations/hero";
import { useExperience } from "@/components/providers/ExperienceProvider";

export default function PageHero({
  index,
  label,
  title,
  description,
}: {
  index: string;
  label: string;
  title: string;
  description: string;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const { config, pageReady } = useExperience();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !pageReady) return;
    let cancelled = false;
    let heroCtx: { revert: () => void } | undefined;

    animateHero(root, config, { drift: false }).then((ctx) => {
      if (cancelled) {
        ctx.revert();
        return;
      }
      heroCtx = ctx;
    });

    return () => {
      cancelled = true;
      heroCtx?.revert();
    };
  }, [config, pageReady]);

  return (
    <header
      ref={rootRef}
      className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-16 pt-32 sm:pt-40"
    >
      <p data-hero-copy className="font-mono-label text-[11px] text-ink-soft">
        {index} / {label}
      </p>
      <h1
        data-hero-headline
        className="mt-6 max-w-4xl font-display text-[clamp(2rem,7vw,3.75rem)] leading-[1.12] text-navy lg:text-6xl lg:leading-[1.05]"
      >
        {title}
      </h1>
      <p
        data-hero-copy
        className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg"
      >
        {description}
      </p>
    </header>
  );
}
