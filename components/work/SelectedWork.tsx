"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animateSelectedWork, crossfadeWorkVisual } from "@/animations/caseStudy";
import { animateParallax } from "@/animations/parallax";
import { useExperience } from "@/components/providers/ExperienceProvider";
import WorkCover from "@/components/work/WorkCover";
import type { CaseStudy } from "@/case-studies";

export default function SelectedWork({ studies }: { studies: CaseStudy[] }) {
  const rootRef = useRef<HTMLElement>(null);
  const { config } = useExperience();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = animateSelectedWork(root, config, { onIndex: setActive });
    const parallax = animateParallax(root, config);
    return () => {
      ctx.revert();
      parallax.revert();
    };
  }, [config, studies]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const visuals = Array.from(root.querySelectorAll<HTMLElement>("[data-work-visual]"));
    crossfadeWorkVisual(visuals, active, config);
  }, [active, config]);

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      setActive((value) => Math.min(studies.length - 1, value + 1));
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      setActive((value) => Math.max(0, value - 1));
    }
  }

  return (
    <section
      ref={rootRef}
      className="mx-auto max-w-[1440px] px-[var(--page-pad)] py-24"
      aria-labelledby="selected-work-heading"
      aria-describedby="selected-work-keys"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <p id="selected-work-keys" className="sr-only">
        Use arrow keys to move between projects.
      </p>
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="font-mono-label text-[11px] text-ink-soft">05 / Selected work</p>
          <h2 id="selected-work-heading" className="mt-4 font-display text-3xl sm:text-5xl">
            Current work, then the systems behind it.
          </h2>
        </div>
        <Link href="/work" className="font-mono-label text-[11px] text-navy" data-cursor="View">
          All work →
        </Link>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative hidden min-h-[70vh] lg:block">
          <div className="sticky top-24 overflow-hidden">
            <div className="relative aspect-[4/5]">
              <div data-parallax="0.08" className="absolute inset-0">
                {studies.map((study, index) => (
                  <div
                    key={study.slug}
                    data-work-visual
                    className="absolute inset-0"
                    aria-hidden={index !== active}
                  >
                    <WorkCover study={study} className="h-full" />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 h-px bg-line">
              <div
                data-work-progress
                className="h-px origin-left scale-x-0 bg-gold"
              />
            </div>
            <p className="sr-only" aria-live="polite">
              {studies[active]?.client}: {studies[active]?.title}
            </p>
          </div>
        </div>

        <ul className="flex flex-col">
          {studies.map((study, index) => (
            <li key={study.slug}>
              <Link
                href={`/work/${study.slug}`}
                data-work-row
                data-cursor="View"
                className={`block border-t border-line py-8 ${
                  index === active ? "opacity-100" : "opacity-55 hover:opacity-100"
                }`}
                aria-current={index === active ? "true" : undefined}
                onFocus={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
              >
                <div className="lg:hidden">
                  <WorkCover study={study} className="mb-6 min-h-[220px]" />
                </div>
                <p className="font-mono-label text-[11px] text-ink-soft">
                  {study.index} / {study.year}
                </p>
                <h3 className="mt-3 font-display text-2xl sm:text-3xl">{study.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{study.client}</p>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
                  {study.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
