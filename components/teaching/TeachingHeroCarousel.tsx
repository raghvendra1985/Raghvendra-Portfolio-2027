"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useExperience } from "@/components/providers/ExperienceProvider";
import type { TeachingHeroSlide } from "@/teaching";

export default function TeachingHeroCarousel({
  label,
  slides,
}: {
  label: string;
  slides: readonly TeachingHeroSlide[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { config } = useExperience();
  const [index, setIndex] = useState(0);
  const total = slides.length;

  const go = useCallback(
    (next: number) => {
      const i = (next + total) % total;
      const scroller = scrollerRef.current;
      const slide = scroller?.children[i] as HTMLElement | undefined;
      if (!scroller || !slide) return;
      const far =
        Math.abs(slide.offsetLeft - scroller.scrollLeft) >
        scroller.clientWidth * 1.25;
      scroller.scrollTo({
        left: slide.offsetLeft,
        behavior: config.reducedMotion || far ? "instant" : "smooth",
      });
      setIndex(i);
    },
    [config.reducedMotion, total],
  );

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const nodes = [...scroller.children];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.55)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const next = nodes.indexOf(visible.target);
        if (next >= 0) setIndex(next);
      },
      { root: scroller, threshold: [0.55] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [slides]);

  if (!total) return null;

  const active = slides[index];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(index + 1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(index - 1);
        }
      }}
      className="outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
    >
      <div
        ref={scrollerRef}
        data-lenis-prevent
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4"
      >
        {slides.map((slide, i) => (
          <figure
            key={slide.src}
            className="w-[min(92%,40rem)] shrink-0 snap-start sm:w-[min(85%,52rem)] lg:w-[min(78%,64rem)]"
            aria-hidden={i !== index}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-surface-dim">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(min-width: 1024px) 48rem, (min-width: 640px) 78vw, 88vw"
                className="object-cover object-center"
                priority={i === 0}
              />
            </div>
          </figure>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-5">
        <div className="min-w-0 max-w-xl">
          <p className="font-mono-label text-gold" aria-live="polite">
            {active?.venue}
          </p>
          <p className="mt-2 type-body text-navy">{active?.caption}</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="font-mono-label text-ink-soft" aria-live="polite">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous workshop scene"
              onClick={() => go(index - 1)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center border border-navy/30 font-mono-label text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next workshop scene"
              onClick={() => go(index + 1)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center border border-navy/30 font-mono-label text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        className="mt-4 flex flex-wrap gap-2"
        role="tablist"
        aria-label={`${label} scenes`}
      >
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show ${slide.venue}: ${slide.caption}`}
            onClick={() => go(i)}
            className={`h-3 min-w-11 border border-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
              i === index ? "bg-navy" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
