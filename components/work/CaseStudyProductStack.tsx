"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { crossfadeWorkVisual } from "@/animations/caseStudy";
import { useExperience } from "@/components/providers/ExperienceProvider";
import type { CaseStudyFrame } from "@/case-studies";
import { gsap, ScrollTrigger, createScope } from "@/animations/motion";

/**
 * Sticky product stack: one visual panel crossfades as caption rows scroll.
 * Stack-scroll language (Framer-inspired): paced rows, strong index, depth peek.
 */
export default function CaseStudyProductStack({
  frames,
  client,
  label = "Product",
}: {
  frames: CaseStudyFrame[];
  client: string;
  label?: string;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const { config } = useExperience();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !frames.length) return;

    const ctx = createScope(root, () => {
      const rows = Array.from(root.querySelectorAll<HTMLElement>("[data-stack-row]"));
      const progress = root.querySelector<HTMLElement>("[data-stack-progress]");

      if (progress) {
        gsap.set(progress, { scaleX: 1 / frames.length });
      }

      rows.forEach((row, index) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 55%",
          end: "bottom 55%",
          onEnter: () => {
            setActive(index);
            if (progress) {
              gsap.to(progress, {
                scaleX: (index + 1) / frames.length,
                duration: config.reducedMotion ? 0 : 0.35,
                overwrite: "auto",
              });
            }
          },
          onEnterBack: () => {
            setActive(index);
            if (progress) {
              gsap.to(progress, {
                scaleX: (index + 1) / frames.length,
                duration: config.reducedMotion ? 0 : 0.35,
                overwrite: "auto",
              });
            }
          },
        });
      });
    });

    return () => ctx.revert();
  }, [config.reducedMotion, frames.length]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const visuals = Array.from(root.querySelectorAll<HTMLElement>("[data-stack-visual]"));
    crossfadeWorkVisual(visuals, active, config);
  }, [active, config]);

  if (!frames.length) return null;

  const total = String(frames.length).padStart(2, "0");

  return (
    <section
      ref={rootRef}
      className="mx-auto max-w-[1440px] min-w-0 px-[var(--page-pad)] pb-20"
      aria-label={`${client} product frames`}
    >
      <p className="font-mono-label text-green" data-case-chapter>
        {label}
      </p>

      {/* Mobile / tablet: sequential card panels */}
      <ul className="mt-10 space-y-12 md:space-y-16 lg:hidden">
        {frames.map((frame, index) => (
          <li key={`mobile-${frame.src}`} data-case-gallery className="min-w-0">
            <article className="overflow-hidden bg-surface-dim">
              <div className="relative mx-auto aspect-[3/4] w-full max-w-xl md:max-w-2xl">
                <FrameMedia
                  src={frame.src}
                  alt={`${client} — product ${index + 1}`}
                  priority={index === 0}
                />
              </div>
              <div className="border-t border-line bg-mist px-4 py-6 sm:px-6">
                <p className="font-display text-[length:var(--text-h3)] font-medium leading-none tracking-[var(--tracking-h3)] text-navy">
                  {String(index + 1).padStart(2, "0")}
                </p>
                {frame.caption ? (
                  <p className="mt-4 max-w-3xl type-lead text-navy">{frame.caption}</p>
                ) : null}
              </div>
            </article>
          </li>
        ))}
      </ul>

      {/* Desktop sticky stack */}
      <div className="relative mt-10 hidden min-w-0 lg:grid lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
        <div className="sticky top-[calc(var(--nav-height)+0.75rem)] self-start">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-dim">
            {frames.map((frame, index) => {
              const behind = index !== active;
              return (
                <div
                  key={`visual-${frame.src}`}
                  data-stack-visual
                  className={`absolute inset-0 origin-center transition-transform duration-500 ease-out ${
                    behind ? "scale-[0.96] translate-y-3" : "scale-100 translate-y-0"
                  }`}
                  aria-hidden={behind}
                >
                  <FrameMedia
                    src={frame.src}
                    alt=""
                    priority={index === 0}
                    decorative
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-between gap-4">
            <p
              className="font-display text-[length:var(--text-h3)] font-medium leading-none tracking-[var(--tracking-h3)] text-navy"
              aria-live="polite"
            >
              {String(active + 1).padStart(2, "0")}
              <span className="font-mono-label ml-2 text-ink-soft">/ {total}</span>
            </p>
            <div className="h-px flex-1 bg-line">
              <div
                data-stack-progress
                className="h-px origin-left scale-x-0 bg-gold"
              />
            </div>
          </div>
          <p className="sr-only" aria-live="polite">
            {frames[active]?.caption}
          </p>
        </div>

        <ul className="flex min-w-0 flex-col" data-stack-list>
          {frames.map((frame, index) => (
            <li
              key={`row-${frame.src}`}
              data-stack-row
              className={`min-h-[min(42vh,22rem)] border-t border-line py-12 transition-opacity duration-300 xl:py-14 ${
                index === active ? "opacity-100" : "opacity-45"
              }`}
            >
              <p className="font-display text-[length:var(--text-h3)] font-medium leading-none tracking-[var(--tracking-h3)] text-navy">
                {String(index + 1).padStart(2, "0")}
              </p>
              {frame.caption ? (
                <p className="mt-4 max-w-xl type-lead text-navy">{frame.caption}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FrameMedia({
  src,
  alt,
  priority = false,
  decorative = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  decorative?: boolean;
}) {
  const isGif = src.endsWith(".gif");
  return (
    <Image
      src={src}
      alt={decorative ? "" : alt}
      fill
      priority={priority}
      sizes="(max-width: 1024px) 100vw, 40vw"
      unoptimized={isGif}
      className="object-contain object-center"
    />
  );
}
