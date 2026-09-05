"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { crossfadeWorkVisual } from "@/animations/caseStudy";
import { useExperience } from "@/components/providers/ExperienceProvider";
import type { CaseStudyFrame } from "@/case-studies";
import { gsap, ScrollTrigger, createScope } from "@/animations/motion";

/**
 * Sticky product stack — Framer-visible stacked panels + sticky media.
 * Serif index, sans captions; navy / surface-dim alternating cards.
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

      {/* Mobile / tablet: solid stacked cards */}
      <ul className="mt-10 space-y-8 md:space-y-12 lg:hidden">
        {frames.map((frame, index) => {
          const navy = index % 2 === 0;
          return (
            <li key={`mobile-${frame.src}`} data-case-gallery className="min-w-0">
              <article
                className={`overflow-hidden ${
                  navy ? "bg-navy text-mist" : "border border-line bg-surface-dim text-navy"
                }`}
              >
                <div
                  className={`relative mx-auto aspect-[3/4] w-full max-w-xl md:max-w-2xl ${
                    frame.scrollable
                      ? "overflow-y-auto overscroll-contain"
                      : "overflow-hidden"
                  } ${navy ? "bg-navy/40" : "bg-mist"}`}
                >
                  <FrameMedia
                    src={frame.src}
                    alt={`${client} — product ${index + 1}`}
                    priority={index === 0}
                    scrollable={frame.scrollable}
                  />
                </div>
                <div
                  className={`px-5 py-6 sm:px-7 sm:py-8 ${
                    navy ? "border-t border-mist/15" : "border-t border-line"
                  }`}
                >
                  <p className={`type-stack-index ${navy ? "text-gold" : "text-navy"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  {frame.caption ? (
                    <p
                      className={`mt-4 max-w-3xl type-lead ${
                        navy ? "text-mist/90" : "text-navy"
                      }`}
                    >
                      {frame.caption}
                    </p>
                  ) : null}
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      {/* Desktop sticky stack + Framer-like panels */}
      <div className="relative mt-10 hidden min-w-0 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-12 xl:gap-16">
        <div className="sticky top-[calc(var(--nav-height)+0.75rem)] self-start">
          <div className="relative aspect-[3/4] w-full overflow-hidden border border-line bg-surface-dim">
            {frames.map((frame, index) => {
              const behind = index !== active;
              return (
                <div
                  key={`visual-${frame.src}`}
                  data-stack-visual
                  className={`absolute inset-0 origin-center transition-transform duration-500 ease-out ${
                    behind
                      ? "pointer-events-none translate-y-4 scale-[0.94]"
                      : "translate-y-0 scale-100"
                  }`}
                  aria-hidden={behind}
                >
                  <FrameMedia
                    src={frame.src}
                    alt=""
                    priority={index === 0}
                    decorative
                    scrollable={frame.scrollable}
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="type-stack-index text-navy" aria-live="polite">
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
          {frames[active]?.scrollable ? (
            <p className="mt-2 font-mono-label text-ink-soft">Scroll image to see full page</p>
          ) : null}
          <p className="sr-only" aria-live="polite">
            {frames[active]?.caption}
          </p>
        </div>

        <ul className="flex min-w-0 flex-col gap-0" data-stack-list>
          {frames.map((frame, index) => {
            const navy = index % 2 === 0;
            const isActive = index === active;
            return (
              <li
                key={`row-${frame.src}`}
                data-stack-row
                className={`min-h-[min(44vh,24rem)] transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-40"
                }`}
              >
                <div
                  className={`flex min-h-[min(44vh,24rem)] flex-col justify-center px-8 py-12 xl:px-10 xl:py-14 ${
                    navy
                      ? "bg-navy text-mist"
                      : "border border-line border-y-0 bg-surface-dim text-navy first:border-t last:border-b"
                  }`}
                >
                  <p className={`type-stack-index ${navy ? "text-gold" : "text-navy"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  {frame.caption ? (
                    <p
                      className={`mt-5 max-w-xl type-lead ${
                        navy ? "text-mist/90" : "text-navy"
                      }`}
                    >
                      {frame.caption}
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
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
  scrollable = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  decorative?: boolean;
  scrollable?: boolean;
}) {
  const isGif = src.endsWith(".gif");

  if (scrollable) {
    return (
      <div
        data-frame-scroll
        tabIndex={0}
        className="absolute inset-0 overflow-y-auto overscroll-contain"
        aria-label={
          decorative ? "Scrollable product frame" : `${alt} — scroll to view full page`
        }
      >
        <Image
          src={src}
          alt={decorative ? "" : alt}
          width={1200}
          height={6400}
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="h-auto w-full"
        />
      </div>
    );
  }

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
