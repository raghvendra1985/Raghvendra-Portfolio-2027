"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import SectionReveal from "@/components/reveal/SectionReveal";
import TeachingHeroCarousel from "@/components/teaching/TeachingHeroCarousel";
import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import { animateHero } from "@/animations/hero";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { teachingPage } from "@/teaching";
import { systemMarks } from "@/visual-language/marks";

function TeachingHero() {
  const rootRef = useRef<HTMLElement>(null);
  const { config, pageReady } = useExperience();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !pageReady) return;
    let cancelled = false;
    let heroCtx: { revert: () => void } | undefined;

    animateHero(root, config, { drift: false }).then((ctx) => {
      if (cancelled) {
        ctx.revert();
        return;
      }
      heroCtx = ctx;
    });

    return () => {
      cancelled = true;
      heroCtx?.revert();
    };
  }, [config, pageReady]);

  return (
    <header
      ref={rootRef}
      className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-14 pt-32 sm:pb-16 sm:pt-40"
    >
      <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <div>
          <div className="flex items-center gap-4">
            <span data-hero-visual>
              <SystemObjectMark
                src={systemMarks.teaching.src}
                motion={systemMarks.teaching.motion}
                surface={systemMarks.teaching.surface}
              />
            </span>
            <p data-hero-copy className="font-mono-label text-gold">
              {teachingPage.heroLabel}
            </p>
          </div>
          <h1
            data-hero-headline
            className="mt-4 max-w-[28rem] type-h1 text-navy lg:max-w-[34rem]"
          >
            {teachingPage.heroTitle}
          </h1>
          <p
            data-hero-copy
            className="mt-6 max-w-[46ch] type-lead text-ink-soft"
          >
            {teachingPage.heroDescription}
          </p>
        </div>
        <div data-hero-copy className="border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          <p className="font-mono-label text-ink-soft">
            {teachingPage.heroVenuesLabel}
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-5">
            {teachingPage.heroVenues.map((venue) => (
              <li key={venue.name} className="flex min-h-11 items-center gap-3.5">
                {venue.logo ? (
                  <span className="relative flex h-11 w-28 shrink-0 items-center justify-center overflow-hidden border border-line bg-paper px-2">
                    <Image
                      src={venue.logo.src}
                      alt=""
                      width={venue.logo.width}
                      height={venue.logo.height}
                      className="max-h-8 w-auto max-w-full object-contain"
                    />
                  </span>
                ) : null}
                <span className="font-mono-label text-navy">{venue.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div data-hero-visual className="mt-10 min-w-0 sm:mt-12 lg:mt-14">
        <TeachingHeroCarousel
          label={teachingPage.heroGalleryLabel}
          slides={teachingPage.heroGallery}
        />
      </div>
    </header>
  );
}

export default function TeachingView() {
  const { testimonials, sourceNote } = teachingPage;

  return (
    <>
      <TeachingHero />

      <SectionReveal
        id="what-students-say"
        className="scroll-mt-[var(--hash-offset)] border-t border-line px-[var(--page-pad)] py-14 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <p className="font-mono-label text-navy/80" data-reveal-item>
            {teachingPage.sectionEyebrow}
          </p>
          <h2 className="mt-4 max-w-3xl type-h2" data-reveal-item>
            {teachingPage.sectionTitle}
          </h2>
          <p
            data-reveal-item
            className="mt-4 max-w-[62ch] type-body text-ink-soft"
          >
            {teachingPage.sectionIntro}
          </p>

          <ul className="mt-10 grid grid-cols-1 items-stretch gap-6 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <li key={item.heading} data-reveal-item className="min-w-0">
                <article className="flex h-full flex-col border border-line bg-paper p-6 sm:p-8">
                  <h3 className="type-h3 text-navy">{item.heading}</h3>
                  <blockquote className="mt-5 flex flex-1 flex-col">
                    <p className="font-serif text-[1.125rem] leading-relaxed text-navy sm:text-[1.25rem] sm:leading-snug">
                      “{item.quote}”
                    </p>
                    <footer className="mt-8">
                      <cite className="not-italic">
                        <span className="flex items-start gap-3">
                          {item.image ? (
                            <span className="relative mt-0.5 block size-14 shrink-0 overflow-hidden bg-surface-dim sm:size-16">
                              <Image
                                src={item.image.src}
                                alt={item.image.alt}
                                fill
                                sizes="64px"
                                className="object-cover object-center"
                              />
                            </span>
                          ) : null}
                          <span className="min-w-0">
                            {item.name ? (
                              <>
                                <span className="block font-mono-label text-navy/80">
                                  {item.name}
                                </span>
                                <span className="mt-1 block font-mono-label text-ink-soft">
                                  {item.role}
                                </span>
                              </>
                            ) : (
                              <span className="block font-mono-label text-navy/80">
                                {item.role}
                              </span>
                            )}
                          </span>
                        </span>
                      </cite>
                    </footer>
                  </blockquote>
                </article>
              </li>
            ))}
          </ul>

          <p
            data-reveal-item
            className="mt-10 max-w-[62ch] font-mono-label text-ink-soft sm:mt-12"
          >
            {sourceNote}
          </p>
        </div>
      </SectionReveal>
    </>
  );
}
