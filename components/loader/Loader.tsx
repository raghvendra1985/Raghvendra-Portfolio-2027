"use client";

import { useEffect, useRef } from "react";
import { animateLoader } from "@/animations/loader";
import { useExperience } from "@/components/providers/ExperienceProvider";

export default function Loader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { config, markPageReady, finishLoader } = useExperience();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let cancelled = false;
    const navigation = document.querySelector<HTMLElement>("[data-nav]");

    const timeline = animateLoader(root, config, {
      navigation,
      onPhase: (phase) => {
        if (cancelled) return;
        if (phase === "hero") markPageReady();
        if (phase === "ready") finishLoader();
      },
    });

    return () => {
      cancelled = true;
      timeline?.kill();
    };
  }, [config, markPageReady, finishLoader]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-navy text-mist"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-6">
        <p
          data-loader-wordmark
          className="font-display text-4xl tracking-tight sm:text-5xl"
        >
          Raghvendra Singh
        </p>
        <span
          data-loader-rule
          className="h-px w-40 origin-left bg-gold"
          aria-hidden="true"
        />
        <span className="font-mono-label text-[11px] text-mist/50">
          Portfolio V8
        </span>
      </div>
    </div>
  );
}
