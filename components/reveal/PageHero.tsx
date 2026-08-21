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
      <p data-hero-copy className="font-mono-label text-ink-soft">
        {index} / {label}
      </p>
      <h1
        data-hero-headline
        className="mt-6 max-w-4xl type-h1 text-navy"
      >
        {title}
      </h1>
      <p
        data-hero-copy
        className="mt-6 max-w-xl type-lead text-ink-soft"
      >
        {description}
      </p>
    </header>
  );
}
