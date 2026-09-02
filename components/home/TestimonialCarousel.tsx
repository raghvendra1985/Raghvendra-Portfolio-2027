"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useExperience } from "@/components/providers/ExperienceProvider";
import type { LeadershipTestimonialItem } from "@/home/leadership-home";

export default function TestimonialCarousel({
  items,
  label,
}: {
  items: readonly LeadershipTestimonialItem[];
  label: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { config } = useExperience();
  const [index, setIndex] = useState(0);
  const total = items.length;

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
  }, [items]);

  if (!total) return null;

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
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <figure
            key={item.attribution}
            className="w-full shrink-0 snap-start"
            aria-hidden={i !== index}
          >
            <blockquote className="border-2 border-white bg-paper px-4 py-8 sm:px-10 sm:py-10">
              <p className="font-serif text-[clamp(1.25rem,1.05rem+0.8vw,1.875rem)] leading-snug text-navy">
                {item.quote}
              </p>
              <figcaption className="mt-8">
                <cite className="not-italic">
                  <p className="font-mono-label text-navy/80">{item.attribution}</p>
                </cite>
                <p className="mt-2 font-mono-label text-ink-soft">{item.source}</p>
              </figcaption>
            </blockquote>
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
            aria-label="Previous testimonial"
            onClick={() => go(index - 1)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center border border-navy/30 font-mono-label text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(index + 1)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center border border-navy/30 font-mono-label text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            →
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label={`${label} slides`}>
        {items.map((item, i) => (
          <button
            key={item.attribution}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show testimonial from ${item.attribution.split(" · ")[0]}`}
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
