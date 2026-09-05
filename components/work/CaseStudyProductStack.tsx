"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { crossfadeWorkVisual } from "@/animations/caseStudy";
import { useExperience } from "@/components/providers/ExperienceProvider";
import type { CaseStudyFrame } from "@/case-studies";
import { gsap, ScrollTrigger, createScope } from "@/animations/motion";

/**
 * Sticky product stack: one visual panel crossfades as caption rows scroll.
 * Mirrors SelectedWork sticky swap — not Relume multi-card sticky traps.
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
      className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20"
      aria-label={`${client} product frames`}
    >
      <p className="font-mono-label text-green" data-case-chapter>
        {label}
      </p>

      {/* Mobile / reduced-motion: sequential frames */}
      <ul className="mt-10 space-y-16 lg:hidden">
        {frames.map((frame, index) => (
          <li key={`mobile-${frame.src}`} data-case-gallery>
            <figure>
              <div className="relative mx-auto aspect-[3/4] w-full max-w-xl overflow-hidden bg-surface-dim">
                <FrameMedia
                  src={frame.src}
                  alt={`${client} — product ${index + 1}`}
                  priority={index === 0}
                />
              </div>
              {frame.caption ? (
                <figcaption className="mt-4 max-w-3xl text-lg leading-snug text-navy">
                  {frame.caption}
                </figcaption>
              ) : null}
            </figure>
          </li>
        ))}
      </ul>

      {/* Desktop sticky stack */}
      <div className="relative mt-10 hidden lg:grid lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
        <div className="sticky top-24 self-start">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-dim">
            {frames.map((frame, index) => (
              <div
                key={`visual-${frame.src}`}
                data-stack-visual
                className="absolute inset-0"
                aria-hidden={index !== active}
              >
                <FrameMedia
                  src={frame.src}
                  alt=""
                  priority={index === 0}
                  decorative
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="font-mono-label text-ink-soft" aria-live="polite">
              {String(active + 1).padStart(2, "0")} / {total}
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

        <ul className="flex flex-col" data-stack-list>
          {frames.map((frame, index) => (
            <li
              key={`row-${frame.src}`}
              data-stack-row
              className={`border-t border-line py-10 transition-opacity duration-300 ${
                index === active ? "opacity-100" : "opacity-45"
              }`}
            >
              <p className="font-mono-label text-ink-soft">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 max-w-xl text-lg leading-snug text-navy sm:text-xl">
                {frame.caption}
              </p>
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
