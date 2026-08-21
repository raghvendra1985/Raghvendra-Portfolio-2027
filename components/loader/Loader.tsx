"use client";

import { useEffect, useRef } from "react";
import { animateLoader, markVisited } from "@/animations/loader";
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

    const failsafe = window.setTimeout(() => {
      if (cancelled) return;
      markVisited();
      markPageReady();
      finishLoader();
    }, 2000);

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
      timeline?.kill();
    };
  }, [config.reducedMotion, config.isMobile, markPageReady, finishLoader]);

  return (
    <div
      ref={rootRef}
      data-loader-root
      className="fixed inset-0 z-[90] flex items-center justify-center bg-navy text-mist"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-6">
        <p
          data-loader-wordmark
          className="type-h1"
        >
          Raghvendra Singh
        </p>
        <span
          data-loader-rule
          className="h-px w-40 origin-left bg-gold"
          aria-hidden="true"
        />
        <span className="font-mono-label text-mist/50">
          Portfolio V8
        </span>
      </div>
    </div>
  );
}
