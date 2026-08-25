"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { animateSelectedWork, crossfadeWorkVisual } from "@/animations/caseStudy";
import { animateParallax } from "@/animations/parallax";
import { useExperience } from "@/components/providers/ExperienceProvider";
import WorkCard from "@/components/work/WorkCard";
import { TrackedLink } from "@/components/analytics/TrackedCta";
import { track } from "@/lib/analytics";
import type { CaseStudy } from "@/case-studies";
import { homeWork, homeWorkCards } from "@/home/copy";

function StudyCover({
  study,
  title,
  priority = false,
  className = "",
}: {
  study: CaseStudy;
  title: string;
  priority?: boolean;
  className?: string;
}) {
  const src = study.cover;
  if (!src) {
    return <div className={`bg-surface-dim ${className}`} aria-hidden="true" />;
  }

  return (
    <div className={`relative overflow-hidden bg-navy ${className}`} data-shared-image>
      <Image
        src={src}
        alt={`${study.client} — ${title}`}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 55vw"
        unoptimized={src.endsWith(".svg")}
        className="object-contain object-center"
      />
    </div>
  );
}

export default function SelectedWork({ studies }: { studies: CaseStudy[] }) {
  const rootRef = useRef<HTMLElement>(null);
  const pausedRef = useRef(false);
  const { config } = useExperience();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = animateSelectedWork(root, config, {
      onIndex: (index) => {
        if (pausedRef.current) return;
        setActive(index);
      },
      isPaused: () => pausedRef.current,
    });
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
    const clipVisuals = Array.from(root.querySelectorAll<HTMLElement>("[data-work-clip-visual]"));
    crossfadeWorkVisual(visuals, active, config);
    if (clipVisuals.length) crossfadeWorkVisual(clipVisuals, active, config);
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

  const total = String(studies.length).padStart(2, "0");

  return (
    <section
      ref={rootRef}
      id="work"
      data-charm-dense="true"
      data-charm-rest="true"
      className="scroll-mt-[var(--hash-offset)] mx-auto max-w-[1440px] px-[var(--page-pad)] py-16 sm:py-20"
      aria-labelledby="selected-work-heading"
      aria-describedby="selected-work-keys"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <p id="selected-work-keys" className="sr-only">
        Use arrow keys to move between projects.
      </p>
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono-label text-navy/80">{homeWork.index}</p>
          <h2 id="selected-work-heading" className="mt-4 type-h2">
            {homeWork.title}
          </h2>
        </div>
        <TrackedLink
          href="/work"
          className="inline-flex min-h-11 shrink-0 items-center font-mono-label text-navy"
          data-cursor="View"
          event="project_clicked"
          payload={{ from: "home_all" }}
        >
          {homeWork.all} →
        </TrackedLink>
      </div>

      <div className="relative mt-12" data-work-clip-root>
        <div
          data-work-slides
          className="pointer-events-none absolute inset-0 z-[4] hidden grid-cols-4 items-center gap-4 lg:grid"
          aria-hidden="true"
        >
          {studies.map((study, index) => {
            const copy = homeWorkCards[study.slug];
            return (
              <div
                key={`slide-${study.slug}`}
                data-work-slide={index === 0 ? "current" : "true"}
                className={`overflow-hidden ${index === 0 ? "invisible" : ""}`}
              >
                <StudyCover
                  study={study}
                  title={copy?.title ?? study.title}
                  className="aspect-[4/5] w-full"
                />
              </div>
            );
          })}
        </div>

        <div
          data-work-clip
          className="pointer-events-none absolute inset-0 z-[5] hidden overflow-hidden lg:block"
          aria-hidden="true"
          style={{ clipPath: "inset(0% 0% 0% 0%)" }}
        >
          <div data-work-clip-img className="relative h-full w-full">
            {studies.map((study, index) => {
              const copy = homeWorkCards[study.slug];
              return (
                <div key={`clip-${study.slug}`} data-work-clip-visual className="absolute inset-0">
                  <StudyCover
                    study={study}
                    title={copy?.title ?? study.title}
                    priority={index === 0}
                    className="h-full w-full"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative hidden min-h-[70vh] lg:block">
            <div className="sticky top-24 overflow-hidden">
              <div data-work-clip-target className="relative aspect-[4/5]">
                <div data-parallax="0.08" className="absolute inset-0">
                  {studies.map((study, index) => {
                    const copy = homeWorkCards[study.slug];
                    return (
                      <div
                        key={study.slug}
                        data-work-visual
                        className="absolute inset-0"
                        aria-hidden={index !== active}
                      >
                        <StudyCover
                          study={study}
                          title={copy?.title ?? study.title}
                          priority={index === 0}
                          className="h-full w-full"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="font-mono-label text-ink-soft" aria-live="polite">
                  {String(active + 1).padStart(2, "0")} / {total}
                </p>
                <div className="h-px flex-1 bg-line">
                  <div data-work-progress className="h-px origin-left scale-x-0 bg-gold" />
                </div>
              </div>
              <p className="sr-only" aria-live="polite">
                {homeWorkCards[studies[active]?.slug ?? ""]?.client}:{" "}
                {homeWorkCards[studies[active]?.slug ?? ""]?.title}
              </p>
            </div>
          </div>

          <ul
            className="flex flex-col"
            data-work-list
            onPointerEnter={() => {
              pausedRef.current = true;
            }}
            onPointerLeave={() => {
              pausedRef.current = false;
            }}
          >
            {studies.map((study, index) => {
              const copy = homeWorkCards[study.slug];
              if (!copy) return null;
              return (
                <li key={study.slug}>
                  <WorkCard>
                    <Link
                      href={`/work/${study.slug}`}
                      data-work-row
                      data-cursor="View"
                      onClick={() => track("project_clicked", { slug: study.slug, from: "home" })}
                      className={`block border-t border-line py-8 ${
                        index === active
                          ? "opacity-100"
                          : "opacity-80 lg:opacity-60 lg:hover:opacity-100"
                      }`}
                      aria-current={index === active ? "true" : undefined}
                      onFocus={() => setActive(index)}
                      onMouseEnter={() => setActive(index)}
                    >
                      <div className="lg:hidden">
                        <div className="mb-6 overflow-hidden">
                          <div data-work-cover>
                            <StudyCover
                              study={study}
                              title={copy.title}
                              className="aspect-[4/5] min-h-[220px] w-full"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="font-mono-label text-ink-soft">{copy.client}</p>
                        <p className="font-mono-label text-ink-soft lg:hidden">
                          {String(index + 1).padStart(2, "0")} / {total}
                        </p>
                      </div>
                      <h3 className="mt-3 type-h3">{copy.title}</h3>
                      <p className="mt-2 font-mono-label text-ink-soft">
                        {copy.role} · {copy.year}
                      </p>
                      <p className="mt-3 font-mono-label text-navy">{copy.tags.join(" · ")}</p>
                      <p className="mt-4 max-w-[65ch] type-body text-ink">{copy.problem}</p>
                      <p className="mt-3 max-w-[65ch] type-body text-ink">{copy.result}</p>
                      <p className="mt-5 font-mono-label text-navy">View case study →</p>
                    </Link>
                  </WorkCard>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
