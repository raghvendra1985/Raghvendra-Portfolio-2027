"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { animateSection } from "@/animations/sections";
import { DURATION, EASE, gsap } from "@/animations/motion";
import { useExperience } from "@/components/providers/ExperienceProvider";
import ImageReveal from "@/components/reveal/ImageReveal";
import WorkCover from "@/components/work/WorkCover";
import {
  caseStudies,
  laneLabels,
  workCategories,
  workLanes,
  type CaseStudy,
  type WorkCategory,
  type WorkLane,
} from "@/case-studies";

function Card({ study }: { study: CaseStudy }) {
  const media = (
    <ImageReveal
      className="relative aspect-[4/5]"
      src={study.cover}
      alt={`${study.client} cover`}
      sizes="(min-width: 768px) 50vw, 100vw"
    >
      <WorkCover study={study} className="h-full min-h-[280px]" />
    </ImageReveal>
  );

  const body = (
    <>
      {media}
      <p className="mt-4 font-mono-label text-[11px] text-ink-soft">
        {study.index} / {laneLabels[study.lane]} / {study.category}
      </p>
      <h2 className="mt-2 font-display text-2xl">{study.title}</h2>
      <p className="mt-2 text-sm text-ink-soft">{study.client}</p>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{study.summary}</p>
      <p className="mt-4 font-mono-label text-[11px] text-green">
        {study.tier === "flagship"
          ? "Read case study →"
          : study.href
            ? "Visit site →"
            : "Selected work"}
      </p>
    </>
  );

  if (study.tier === "flagship") {
    return (
      <Link href={`/work/${study.slug}`} data-cursor="View" className="group block">
        {body}
      </Link>
    );
  }

  if (study.href) {
    return (
      <a
        href={study.href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="Live"
        className="group block"
      >
        {body}
      </a>
    );
  }

  return <article className="block">{body}</article>;
}

function StudyGrid({ studies }: { studies: CaseStudy[] }) {
  return (
    <ul className="mt-8 grid gap-10 md:grid-cols-2">
      {studies.map((study) => (
        <li key={study.slug} data-reveal-item>
          <Card study={study} />
        </li>
      ))}
    </ul>
  );
}

export default function WorkIndex() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { config } = useExperience();
  const [filter, setFilter] = useState<"All" | WorkCategory>("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? caseStudies
        : caseStudies.filter((study) => study.category === filter),
    [filter],
  );

  const grouped = useMemo(() => {
    const byLane = new Map<WorkLane, CaseStudy[]>();
    for (const lane of workLanes) byLane.set(lane, []);
    for (const study of visible) byLane.get(study.lane)?.push(study);
    return workLanes
      .map((lane) => ({ lane, studies: byLane.get(lane) ?? [] }))
      .filter((group) => group.studies.length > 0);
  }, [visible]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // Initial mount only — filter changes use a light opacity stagger below.
    const ctx = animateSection(root, config);
    return () => ctx.revert();
  }, [config]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || filter === "All") return;
    const items = root.querySelectorAll("[data-reveal-item]");
    if (!items.length || config.reducedMotion) return;
    gsap.fromTo(
      items,
      { autoAlpha: 0, y: 10 },
      {
        autoAlpha: 1,
        y: 0,
        duration: DURATION.sm,
        stagger: 0.03,
        ease: EASE,
        overwrite: "auto",
      },
    );
  }, [filter, config.reducedMotion]);

  return (
    <div ref={rootRef} className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24">
      <div
        className="flex flex-wrap gap-2"
        role="toolbar"
        aria-label="Filter selected work"
      >
        {workCategories.map((category) => {
          const pressed = filter === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={pressed}
              onClick={() => setFilter(category)}
              className={`min-h-11 border px-4 py-2 font-mono-label ${
                pressed
                  ? "border-navy bg-navy text-mist"
                  : "border-line text-ink-soft hover:border-navy hover:text-navy"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {filter === "All" ? (
        <div className="mt-12 space-y-20">
          {grouped.map((group) => (
            <section key={group.lane} aria-labelledby={`lane-${group.lane}`}>
              <h2
                id={`lane-${group.lane}`}
                className="font-mono-label text-[11px] text-ink-soft"
              >
                {laneLabels[group.lane]}
              </h2>
              <StudyGrid studies={group.studies} />
            </section>
          ))}
        </div>
      ) : visible.length ? (
        <div className="mt-12">
          <StudyGrid studies={visible} />
        </div>
      ) : (
        <p className="mt-12 max-w-md text-sm text-ink-soft" role="status">
          No published work in this category yet.
        </p>
      )}
    </div>
  );
}
