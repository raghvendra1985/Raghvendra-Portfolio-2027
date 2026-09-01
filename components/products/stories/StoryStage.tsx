"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { useExperience } from "@/components/providers/ExperienceProvider";
import type { MotionConfig } from "@/animations";

export default function StoryStage({
  play,
  children,
  replayLabel = "Replay sequence",
}: {
  play: (root: HTMLElement, config: MotionConfig) => { revert: () => void };
  children: ReactNode;
  replayLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<{ revert: () => void } | null>(null);
  const { config } = useExperience();

  const run = useCallback(() => {
    const root = ref.current;
    if (!root) return;
    ctxRef.current?.revert();
    ctxRef.current = play(root, config);
  }, [config, play]);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting) && !ctxRef.current) {
          run();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
  }, [run]);

  return (
    <div>
      <div ref={ref}>{children}</div>
      <button
        type="button"
        className="mt-4 min-h-11 font-mono-label text-mist/70 hover:text-mist"
        onClick={run}
      >
        {replayLabel}
      </button>
    </div>
  );
}
