"use client";

import { useEffect, useRef } from "react";
import { animateNotFound } from "@/animations/notFound";
import { useExperience } from "@/components/providers/ExperienceProvider";
import MagneticButton from "@/components/buttons/MagneticButton";

export default function NotFoundView() {
  const rootRef = useRef<HTMLElement>(null);
  const { config, pageReady } = useExperience();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !pageReady) return;
    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    animateNotFound(root, config).then((scope) => {
      if (cancelled) {
        scope.revert();
        return;
      }
      ctx = scope;
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [config, pageReady]);

  return (
    <section ref={rootRef} className="mx-auto max-w-[1440px] px-[var(--page-pad)] py-40">
      <p data-hero-copy className="font-mono-label text-[11px] text-ink-soft">
        404
      </p>
      <h1
        data-hero-headline
        className="mt-6 font-display text-5xl leading-[1.05] text-navy"
      >
        This page is not in the system.
      </h1>
      <p data-hero-copy className="mt-4 max-w-md text-ink-soft">
        The route does not exist. Return home or browse selected work.
      </p>
      <div data-hero-cta className="mt-10">
        <MagneticButton href="/">Back home</MagneticButton>
      </div>
    </section>
  );
}
