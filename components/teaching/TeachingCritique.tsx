"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { animateMagneticButton } from "@/animations/buttons";
import { gsap, createScope } from "@/animations/motion";
import SectionReveal from "@/components/reveal/SectionReveal";
import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { teachingPractice } from "@/teaching";
import { systemMarks } from "@/visual-language/marks";

type Stage = (typeof teachingPractice.stages)[number];

export default function TeachingCritique() {
  const { config } = useExperience();
  const diagramRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<Stage["id"]>(
    teachingPractice.stages[0].id,
  );
  const [pinnedId, setPinnedId] = useState<Stage["id"] | null>(null);
  const labelId = useId();
  const currentId = pinnedId ?? activeId;
  const current =
    teachingPractice.stages.find((stage) => stage.id === currentId) ??
    teachingPractice.stages[0];

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const buttons = list.querySelectorAll<HTMLElement>("[data-critique-stage]");
    const cleanups = Array.from(buttons).map((button) =>
      animateMagneticButton(button, config),
    );
    return () => {
      cleanups.forEach((ctx) => ctx.revert());
    };
  }, [config]);

  useEffect(() => {
    const diagram = diagramRef.current;
    if (!diagram || config.reducedMotion) return;

    const ctx = createScope(diagram, () => {
      const media = diagram.querySelector<HTMLElement>("[data-critique-media]");
      if (media) {
        gsap.fromTo(
          media,
          { autoAlpha: 0, scale: 0.96, y: 18 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: diagram,
              start: "top 78%",
              once: true,
            },
          },
        );
      }

      const stages = teachingPractice.stages;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: diagram,
          start: "top 70%",
          once: true,
        },
      });

      stages.forEach((stage, index) => {
        tl.call(
          () => {
            setActiveId(stage.id);
          },
          undefined,
          index === 0 ? 0.35 : "+=0.55",
        );
      });

      tl.call(
        () => {
          setActiveId(stages[0].id);
        },
        undefined,
        "+=0.4",
      );
    });

    return () => {
      ctx.revert();
    };
  }, [config.reducedMotion]);

  const activate = (id: Stage["id"], pin = false) => {
    setActiveId(id);
    if (pin) setPinnedId(id);
  };

  return (
    <SectionReveal
      id="shared-critique"
      className="scroll-mt-[var(--hash-offset)] border-t border-line bg-paper px-[var(--page-pad)] py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-start gap-4" data-reveal-item>
          <SystemObjectMark
            src={systemMarks.teaching.src}
            motion={systemMarks.teaching.motion}
            surface={systemMarks.teaching.surface}
          />
          <div className="max-w-3xl">
            <p className="font-mono-label text-navy/80">{teachingPractice.eyebrow}</p>
            <h2 className="mt-4 type-h2">{teachingPractice.title}</h2>
            <p className="mt-6 max-w-[62ch] type-lead text-ink">{teachingPractice.intro}</p>
          </div>
        </div>

        <div
          className="mt-12 grid items-start gap-10 border-t border-line pt-10 sm:mt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pt-14"
          data-reveal-item
        >
          <div ref={diagramRef} className="relative mx-auto w-full max-w-[34rem] lg:mx-0">
            <div
              data-critique-media
              className="relative aspect-square overflow-hidden border border-line bg-mist"
            >
              <Image
                src={teachingPractice.frameworkImage.src}
                alt={teachingPractice.frameworkImage.alt}
                width={teachingPractice.frameworkImage.width}
                height={teachingPractice.frameworkImage.height}
                className="h-full w-full object-contain"
                sizes="(min-width: 1024px) 34rem, 90vw"
                priority={false}
              />

              {teachingPractice.stages.map((stage) => {
                const active = currentId === stage.id;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    data-critique-hotspot={stage.id}
                    data-cursor="View"
                    aria-label={`${stage.title}: ${stage.tagline}`}
                    aria-pressed={active}
                    className={`absolute rounded-sm border transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                      active
                        ? "border-gold/80 bg-gold/10 shadow-[0_0_0_1px_color-mix(in_srgb,var(--gold)_35%,transparent)]"
                        : "border-transparent bg-transparent hover:border-navy/20 hover:bg-navy/[0.03]"
                    }`}
                    style={{
                      top: stage.hotspot.top,
                      left: stage.hotspot.left,
                      width: stage.hotspot.width,
                      height: stage.hotspot.height,
                    }}
                    onPointerEnter={() => {
                      if (!pinnedId) setActiveId(stage.id);
                    }}
                    onFocus={() => activate(stage.id)}
                    onClick={() =>
                      setPinnedId((prev) => (prev === stage.id ? null : stage.id))
                    }
                  />
                );
              })}
            </div>
            <p className="mt-4 font-mono-label text-[12px] tracking-[0.06em] text-ink-soft">
              {teachingPractice.hintLabel} · hover or tap a stage
            </p>
          </div>

          <div ref={listRef} className="min-w-0">
            <p id={labelId} className="sr-only">
              Critique practice stages. Selecting a stage highlights it on the
              diagram.
            </p>
            <ol className="space-y-0 border-t border-line" aria-labelledby={labelId}>
              {teachingPractice.stages.map((stage, index) => {
                const active = currentId === stage.id;
                return (
                  <li key={stage.id} className="border-b border-line">
                    <button
                      type="button"
                      data-critique-stage
                      data-cursor="View"
                      aria-pressed={active}
                      className={`group relative isolate grid w-full grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3 gap-y-2 overflow-hidden py-7 text-left transition-colors sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-x-6 sm:py-8 ${
                        active ? "text-navy" : "text-ink-soft hover:text-navy"
                      }`}
                      onPointerEnter={() => {
                        if (!pinnedId) setActiveId(stage.id);
                      }}
                      onFocus={() => activate(stage.id)}
                      onClick={() =>
                        setPinnedId((prev) => (prev === stage.id ? null : stage.id))
                      }
                    >
                      <span
                        data-button-fill
                        className="pointer-events-none absolute inset-0 -z-10 origin-left bg-gold/15"
                        aria-hidden
                      />
                      <span
                        className={`font-mono-label ${
                          active ? "text-gold" : "text-navy/50 group-hover:text-navy/70"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="font-serif text-[1.5rem] leading-tight text-navy sm:text-[1.75rem] sm:leading-none">
                            {stage.title}
                          </span>
                          <span className="font-mono-label text-[12px] tracking-[0.04em] text-ink-soft">
                            {stage.tagline}
                          </span>
                        </span>
                        <span
                          className={`mt-3 block max-w-[58ch] type-body transition-opacity duration-300 ${
                            active ? "text-ink opacity-100" : "text-ink-soft opacity-80"
                          }`}
                        >
                          {stage.body}
                        </span>
                      </span>
                      <span data-button-arrow className="sr-only" aria-hidden>
                        →
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <p
              className="mt-8 max-w-[58ch] border-l-2 border-gold/70 pl-4 type-body text-ink"
              aria-live="polite"
            >
              <span className="font-mono-label text-[12px] tracking-[0.06em] text-gold">
                {String(
                  teachingPractice.stages.findIndex((stage) => stage.id === current.id) +
                    1,
                ).padStart(2, "0")}{" "}
                · {current.title}
              </span>
              <span className="mt-2 block text-ink-soft">{current.tagline}</span>
            </p>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
