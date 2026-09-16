"use client";

import { useEffect, useRef } from "react";
import { animateHero } from "@/animations/hero";
import { TrackedMagneticButton } from "@/components/analytics/TrackedCta";
import SectionReveal from "@/components/reveal/SectionReveal";
import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { approachPage } from "@/approach";
import { homeMarks, pageMarks } from "@/visual-language/marks";

export default function ApproachView() {
  const heroRef = useRef<HTMLElement>(null);
  const { config, pageReady } = useExperience();

  useEffect(() => {
    const root = heroRef.current;
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
    <>
      <header
        ref={heroRef}
        className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-14 pt-32 sm:pb-16 sm:pt-40"
      >
        <div className="flex items-center gap-4">
          <span data-hero-visual>
            <SystemObjectMark
              src={homeMarks.approach.src}
              motion={homeMarks.approach.motion}
              surface={homeMarks.approach.surface}
            />
          </span>
          <p data-hero-copy className="font-mono-label text-gold">
            {approachPage.heroEyebrow}
          </p>
        </div>
        <h1
          data-hero-headline
          className="mt-4 max-w-[22ch] type-h1 text-navy"
        >
          {approachPage.heroTitle}
        </h1>
        <p
          data-hero-copy
          className="mt-6 max-w-[58ch] type-lead text-ink-soft"
        >
          {approachPage.heroDescription}
        </p>
        <ol
          data-hero-copy
          className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-3"
          aria-label="Operating workflow"
        >
          {approachPage.workflow.map((step, index) => (
            <li key={step} className="flex items-center gap-2 sm:gap-3">
              <span className="font-serif text-[1.25rem] text-navy sm:text-[1.5rem]">
                {step}
              </span>
              {index < approachPage.workflow.length - 1 ? (
                <span className="font-mono-label text-navy/40" aria-hidden>
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </header>

      <SectionReveal className="border-t border-line px-[var(--page-pad)] py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <p className="font-mono-label text-navy/80" data-reveal-item>
            {approachPage.howIWork.eyebrow}
          </p>
          <h2 className="mt-4 max-w-3xl type-h2" data-reveal-item>
            {approachPage.howIWork.title}
          </h2>
          <p
            className="mt-4 max-w-[58ch] type-body text-ink-soft"
            data-reveal-item
          >
            {approachPage.howIWork.intro}
          </p>
          <div
            className="mt-12 grid gap-0 border-t border-line sm:grid-cols-2 lg:grid-cols-4"
            data-reveal-item
          >
            {approachPage.howIWork.stages.map((stage) => (
              <article
                key={stage.title}
                className="border-b border-line py-8 sm:px-6 sm:odd:pl-0 lg:border-b-0 lg:border-r lg:px-6 lg:py-10 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <h3 className="font-mono-label text-green">{stage.title}</h3>
                <p className="mt-3 font-serif text-[1.25rem] leading-snug text-navy">
                  {stage.tagline}
                </p>
                <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-ink-soft">
                  {stage.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="border-t border-line bg-navy px-[var(--page-pad)] py-14 text-mist sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-center gap-4" data-reveal-item>
            <SystemObjectMark
              src={homeMarks.approach.src}
              motion={homeMarks.approach.motion}
              surface="navy"
            />
            <div>
              <p className="font-mono-label text-mist/70">
                {approachPage.aiPractice.eyebrow}
              </p>
              <h2 className="mt-4 max-w-3xl type-h2 text-mist">
                {approachPage.aiPractice.title}
              </h2>
            </div>
          </div>
          <p
            className="mt-5 max-w-[58ch] type-lead text-mist/80"
            data-reveal-item
          >
            {approachPage.aiPractice.intro}
          </p>
          <ul className="mt-12 grid gap-8 lg:grid-cols-3" data-reveal-item>
            {approachPage.aiPractice.shifts.map((shift) => (
              <li key={shift.title} className="border-t border-mist/20 pt-6">
                <h3 className="type-h3 text-mist">{shift.title}</h3>
                <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-mist/75">
                  {shift.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </SectionReveal>

      <SectionReveal className="border-t border-line px-[var(--page-pad)] py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <p className="font-mono-label text-navy/80" data-reveal-item>
            {approachPage.principles.eyebrow}
          </p>
          <h2 className="mt-4 max-w-3xl type-h2" data-reveal-item>
            {approachPage.principles.title}
          </h2>
          <ol
            className="mt-12 grid gap-0 border-t border-line md:grid-cols-2"
            data-reveal-item
          >
            {approachPage.principles.items.map((item, index) => (
              <li
                key={item}
                className="flex gap-5 border-b border-line py-8 md:px-8 md:odd:border-r md:odd:pl-0 md:even:pr-0"
              >
                <span className="font-mono-label text-green">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="max-w-[40ch] font-serif text-[1.35rem] leading-snug text-navy sm:text-[1.5rem]">
                  {item}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </SectionReveal>

      <SectionReveal className="border-t border-line bg-paper px-[var(--page-pad)] py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-center gap-4" data-reveal-item>
            <SystemObjectMark
              src={pageMarks.about.src}
              motion={pageMarks.about.motion}
              surface="paper"
            />
            <div>
              <p className="font-mono-label text-navy/80">
                {approachPage.leadership.eyebrow}
              </p>
              <h2 className="mt-4 max-w-3xl type-h2">
                {approachPage.leadership.title}
              </h2>
            </div>
          </div>
          <p
            className="mt-5 max-w-[58ch] type-body text-ink-soft"
            data-reveal-item
          >
            {approachPage.leadership.intro}
          </p>
          <ul className="mt-12 grid gap-8 lg:grid-cols-3" data-reveal-item>
            {approachPage.leadership.behaviors.map((item) => (
              <li key={item.title} className="border-t border-line pt-6">
                <h3 className="type-h3 text-navy">{item.title}</h3>
                <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </SectionReveal>

      <SectionReveal className="border-t border-navy bg-navy px-[var(--page-pad)] py-14 text-mist sm:py-20">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-xl type-h2 text-mist" data-reveal-item>
            {approachPage.close.title}
          </h2>
          <div
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            data-reveal-item
          >
            <TrackedMagneticButton
              href={approachPage.close.primary.href}
              variant="gold"
              className="w-full justify-center sm:w-auto"
              event="nav_clicked"
              payload={{ surface: "approach_close", dest: "/work" }}
            >
              {approachPage.close.primary.label}
            </TrackedMagneticButton>
            <TrackedMagneticButton
              href={approachPage.close.secondary.href}
              variant="secondary"
              className="w-full justify-center !border-mist/40 !bg-transparent !text-mist sm:w-auto"
              event="contact_cta_click"
              payload={{ source: "approach_close", channel: "cta" }}
            >
              {approachPage.close.secondary.label}
            </TrackedMagneticButton>
          </div>
        </div>
      </SectionReveal>
    </>
  );
}
