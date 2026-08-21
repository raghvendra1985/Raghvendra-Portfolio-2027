"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { animateSelectedWork, crossfadeWorkVisual } from "@/animations/caseStudy";
import { animateParallax } from "@/animations/parallax";
import { useExperience } from "@/components/providers/ExperienceProvider";
import WorkCard from "@/components/work/WorkCard";
import WorkTicker from "@/components/work/WorkTicker";
import { track } from "@/lib/analytics";
import { workAudiences, type CaseStudy } from "@/case-studies";

function StudyCover({
  study,
  priority = false,
  className = "",
}: {
  study: CaseStudy;
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
        alt={`${study.client} — ${study.title}`}
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
      className="mx-auto max-w-[1440px] px-[var(--page-pad)] py-16 sm:py-20"
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
          <p className="font-mono-label text-ink-soft">01 / Selected work</p>
          <h2
            id="selected-work-heading"
            className="mt-4 type-h2"
          >
            Current / founder work
          </h2>
        </div>
        <Link
          href="/work"
          className="inline-flex min-h-11 shrink-0 items-center font-mono-label text-navy"
          data-cursor="View"
        >
          All work →
        </Link>
      </div>

      <WorkTicker items={workAudiences.filter((audience) => audience !== "All")} />

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
                    <StudyCover study={study} priority={index === 0} className="h-full w-full" />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 h-px bg-line">
              <div data-work-progress className="h-px origin-left scale-x-0 bg-gold" />
            </div>
            <p className="sr-only" aria-live="polite">
              {studies[active]?.client}: {studies[active]?.title}
            </p>
          </div>
        </div>

        <ul className="flex flex-col">
          {studies.map((study, index) => (
            <li key={study.slug}>
              <WorkCard>
              <Link
                href={`/work/${study.slug}`}
                data-work-row
                data-cursor="View"
                onClick={() => track("project_clicked", { slug: study.slug, from: "home" })}
                className={`block border-t border-line py-8 ${
                  index === active ? "opacity-100" : "opacity-80 hover:opacity-100 lg:opacity-55 lg:hover:opacity-100"
                }`}
                aria-current={index === active ? "true" : undefined}
                onFocus={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
              >
                <div className="lg:hidden">
                  <div className="mb-6 overflow-hidden">
                    <div data-work-cover>
                      <StudyCover study={study} className="aspect-[4/5] min-h-[220px] w-full" />
                    </div>
                  </div>
                </div>
                <p className="font-mono-label text-ink-soft">
                  {study.index} / {study.year}
                </p>
                <h3 className="mt-3 type-h3">{study.title}</h3>
                <p className="mt-2 text-base text-navy">
                  {study.client}
                  {study.role ? (
                    <span className="text-ink-soft"> · {study.role}</span>
                  ) : null}
                </p>
                <p className="mt-3 max-w-md text-base leading-relaxed text-ink-soft">
                  {study.summary}
                </p>
                <p className="mt-4 font-mono-label text-navy">View case study →</p>
              </Link>
              </WorkCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
