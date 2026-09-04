"use client";

import { useEffect, useRef } from "react";
import SectionReveal from "@/components/reveal/SectionReveal";
import ResumeCta from "@/components/cta/ResumeCta";
import AboutCard from "@/components/about/AboutCard";
import AboutEvidenceLink from "@/components/about/AboutEvidenceLink";
import AboutPolaroid from "@/components/about/AboutPolaroid";
import AboutTimeline from "@/components/about/AboutTimeline";
import { TrackedMagneticButton } from "@/components/analytics/TrackedCta";
import { animateAboutStat } from "@/animations/about";
import { animateHero } from "@/animations/hero";
import { useExperience } from "@/components/providers/ExperienceProvider";
import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import { aboutPage } from "@/about";
import { pageMarks } from "@/visual-language/marks";

function AboutStatValue({ value }: { value: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { config } = useExperience();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = animateAboutStat(root, config, value);
    return () => ctx.revert();
  }, [config, value]);

  return (
    <p ref={ref} className="type-h2">
      <span className="sr-only">{value}</span>
      <span data-about-stat-visual aria-hidden="true">
        {value}
      </span>
    </p>
  );
}

const BEAT_ROTATE = [-3.5, 2.4, -1.8];
const primaryBeliefs = aboutPage.beliefs.filter((belief) => belief.weight === "primary");
const supportingBeliefs = aboutPage.beliefs.filter((belief) => belief.weight === "supporting");

function AboutHero() {
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
      className="mx-auto grid max-w-[1440px] items-end gap-10 px-[var(--page-pad)] pb-16 pt-32 sm:pt-40 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] lg:gap-16"
    >
      <div>
        <div className="flex items-center gap-4">
          <span data-hero-visual>
            <SystemObjectMark
              src={pageMarks.about.src}
              motion={pageMarks.about.motion}
              surface={pageMarks.about.surface}
            />
          </span>
          <p data-hero-copy className="font-mono-label text-gold">
            {aboutPage.heroEyebrow}
          </p>
        </div>
        <h1 data-hero-headline className="mt-3.5 max-w-[22rem] type-h1 text-navy lg:max-w-[26rem]">
          {aboutPage.heroTitle}
        </h1>
      </div>
      <div data-hero-copy className="relative min-h-0 pb-4 lg:min-h-[28rem] lg:pb-8">
        <div className="relative z-[1] w-full max-w-[28rem] lg:mt-10 lg:w-[68%] lg:max-w-none">
          <AboutPolaroid
            src="/assets/about/raghvendra-singh.png"
            alt="Raghvendra Singh"
            hello
            idle
            priority
            sizes="(max-width: 1024px) 90vw, 38vw"
          />
        </div>
        <div className="relative z-[2] mt-[-8%] ml-auto w-[62%] max-w-[240px] lg:absolute lg:top-[22%] lg:right-0 lg:mt-0 lg:w-[44%] lg:max-w-none">
          <AboutPolaroid
            src="/assets/studio/desktop.jpg"
            alt={aboutPage.workspaceCaption}
            rotate={2.8}
            sizes="(max-width: 1024px) 50vw, 20vw"
          />
        </div>
      </div>
    </header>
  );
}

export default function AboutView() {
  return (
    <>
      <AboutHero />

      <SectionReveal className="mx-auto grid max-w-[1440px] gap-4 px-[var(--page-pad)] pb-20 md:grid-cols-3 md:gap-6">
        {aboutPage.stats.map((stat) => (
          <div key={`${stat.value}-${stat.unit}`} data-reveal-item>
            <AboutCard>
              <div className="flex items-baseline gap-2">
                <AboutStatValue value={stat.value} />
                <p className="font-mono-label text-ink-soft">{stat.unit}</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{stat.label}</p>
            </AboutCard>
          </div>
        ))}
      </SectionReveal>

      <AboutTimeline />

      <SectionReveal
        id="lead"
        className="scroll-mt-[var(--hash-offset)] border-t border-line bg-surface-dim px-[var(--page-pad)] py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <p className="font-mono-label text-ink-soft" data-reveal-item>
            {aboutPage.leadTitle}
          </p>
          <h2 className="mt-4 max-w-2xl type-h2" data-reveal-item>
            {aboutPage.leadDeck}
          </h2>
          <p data-reveal-item className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-soft">
            {aboutPage.leadBody}
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {aboutPage.leadBehaviors.map((behavior) => (
              <li key={behavior.title} data-reveal-item>
                <p className="font-mono-label text-green">{behavior.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{behavior.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8" data-reveal-item>
            <AboutEvidenceLink evidence={aboutPage.leadCritique} />
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto max-w-[1440px] px-[var(--page-pad)] py-24">
        <h2 className="type-h2" data-reveal-item>
          How I work today.
        </h2>
        <p data-reveal-item className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-soft">
          {aboutPage.modesIntro}
        </p>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:gap-6">
          {aboutPage.modes.map((mode, index) => (
            <li key={mode.title} data-reveal-item>
              <AboutCard>
                <p className="font-mono-label text-green">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 type-h3">{mode.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{mode.body}</p>
              </AboutCard>
            </li>
          ))}
        </ol>
      </SectionReveal>

      <SectionReveal
        id="beliefs"
        className="scroll-mt-[var(--hash-offset)] border-t border-line bg-surface-dim px-[var(--page-pad)] py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <h2 className="type-h2" data-reveal-item>
            What I believe
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {primaryBeliefs.map((belief) => (
              <div key={belief.index} data-reveal-item>
                <AboutCard>
                  <p className="font-mono-label text-green">{belief.index}</p>
                  <h3 className="mt-3 type-h3">{belief.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {belief.description}
                  </p>
                  <AboutEvidenceLink evidence={belief.evidence} />
                </AboutCard>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:gap-6">
            {supportingBeliefs.map((belief) => (
              <div key={belief.index} data-reveal-item>
                <AboutCard className="p-5 sm:p-6">
                  <p className="font-mono-label text-green">{belief.index}</p>
                  <h3 className="mt-3 type-h3">{belief.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {belief.description}
                  </p>
                  <AboutEvidenceLink evidence={belief.evidence} />
                </AboutCard>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal
        id="teaching"
        className="scroll-mt-[var(--hash-offset)] mx-auto max-w-[1440px] px-[var(--page-pad)] py-24"
      >
        <p className="font-mono-label text-ink-soft" data-reveal-item>
          Teaching
        </p>
        <h2 className="mt-4 max-w-2xl type-h2" data-reveal-item>
          {aboutPage.teachingTitle}
        </h2>
        <p data-reveal-item className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-soft">
          {aboutPage.teachingBody}
        </p>
        <div className="mt-6" data-reveal-item>
          <AboutEvidenceLink evidence={aboutPage.teachingEvidence} />
        </div>
      </SectionReveal>

      <SectionReveal
        id="studio"
        className="scroll-mt-[var(--hash-offset)] border-t border-line bg-surface-dim px-[var(--page-pad)] py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <p className="font-mono-label text-ink-soft" data-reveal-item>
            Outside the work
          </p>
          <p data-reveal-item className="mt-4 max-w-2xl type-h3">
            {aboutPage.glimpse.body}
          </p>
          <p data-reveal-item className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
            {aboutPage.glimpse.note}
          </p>
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {aboutPage.glimpse.beats.map((beat, index) => (
              <li key={beat.label} data-reveal-item>
                <AboutPolaroid
                  src={beat.src}
                  alt={beat.alt}
                  label={beat.caption}
                  href={aboutPage.glimpse.href}
                  rotate={BEAT_ROTATE[index] ?? 0}
                  sizes="(max-width: 640px) 80vw, 320px"
                />
              </li>
            ))}
          </ul>
          <div className="mt-10" data-reveal-item>
            <TrackedMagneticButton
              href={aboutPage.glimpse.href}
              variant="secondary"
              cursor="Open"
              event="nav_clicked"
              payload={{ from: "about", dest: "/studio" }}
            >
              {aboutPage.glimpse.cta}
            </TrackedMagneticButton>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24">
        <div
          data-reveal-item
          className="flex flex-col items-start justify-between gap-8 border border-line bg-paper p-6 sm:flex-row sm:items-end sm:p-10"
        >
          <div>
            <p className="font-mono-label text-ink-soft">Hiring &amp; work</p>
            <h2 className="mt-3 max-w-lg type-h3">{aboutPage.hiringTitle}</h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
              {aboutPage.hiringBody}
            </p>
          </div>
          <div data-cta-row className="flex w-full flex-col gap-3 sm:w-auto">
            <TrackedMagneticButton
              href={aboutPage.hiringPrimary.href}
              variant="primary"
              className="w-full justify-center sm:w-auto"
              event="contact_start"
              payload={{ source: "about", channel: "cta" }}
            >
              {aboutPage.hiringPrimary.label}
            </TrackedMagneticButton>
            <ResumeCta className="w-full justify-center sm:w-auto" source="about" />
            <TrackedMagneticButton
              href={aboutPage.hiringWork.href}
              variant="secondary"
              cursor="View"
              className="w-full justify-center sm:w-auto"
              event="hero_work_click"
              payload={{ source: "about", dest: "/work" }}
            >
              {aboutPage.hiringWork.label}
            </TrackedMagneticButton>
          </div>
        </div>
      </SectionReveal>
    </>
  );
}
