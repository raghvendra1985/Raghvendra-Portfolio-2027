"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useExperience } from "@/components/providers/ExperienceProvider";

export type CaseStudySlide = {
  src: string;
  caption: string;
  width: number;
  height: number;
};

export default function CaseStudyCarousel({
  label,
  slides,
}: {
  label: string;
  slides: CaseStudySlide[];
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
          .filter((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.6)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const next = nodes.indexOf(visible.target);
        if (next >= 0) setIndex(next);
      },
      { root: scroller, threshold: [0.6] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [slides]);

  if (!total) return null;

  return (
    <div
      data-case-carousel
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
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <figure
            key={slide.src}
            className="w-full shrink-0 snap-start"
            aria-hidden={i !== index}
          >
            <Image
              src={slide.src}
              alt={`${label} — ${slide.caption}`}
              width={slide.width}
              height={slide.height}
              className="h-auto w-full bg-surface-dim"
              sizes="(min-width: 1440px) 1440px, 100vw"
              priority={i === 0}
            />
            <figcaption className="mt-4 max-w-3xl text-lg leading-snug text-navy">
              {slide.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono-label text-ink-soft" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous sheet"
            onClick={() => go(index - 1)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center border border-navy/30 font-mono-label text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next sheet"
            onClick={() => go(index + 1)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center border border-navy/30 font-mono-label text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            →
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label={`${label} sheets`}>
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show ${slide.caption}`}
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
