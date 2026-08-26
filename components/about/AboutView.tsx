"use client";

import { useEffect, useRef } from "react";
import SectionReveal from "@/components/reveal/SectionReveal";
import ResumeCta from "@/components/cta/ResumeCta";
import AboutCard from "@/components/about/AboutCard";
import AboutPolaroid from "@/components/about/AboutPolaroid";
import { TrackedLink, TrackedMagneticButton } from "@/components/analytics/TrackedCta";
import { animateAboutStat } from "@/animations/about";
import { animateHero } from "@/animations/hero";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { aboutPage, type EvidenceLink } from "@/about";
import type { AnalyticsEvent } from "@/lib/analytics";

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

function evidenceTracking(href: string): {
  event: AnalyticsEvent;
  payload: Record<string, string>;
} {
  if (href.startsWith("/work/")) {
    return {
      event: "project_clicked",
      payload: { from: "about", slug: href.replace("/work/", "") },
    };
  }
  if (href.startsWith("/knowledge/")) {
    return {
      event: "knowledge_article_clicked",
      payload: { slug: href.replace("/knowledge/", ""), surface: "about" },
    };
  }
  return { event: "nav_clicked", payload: { from: "about", dest: href } };
}

function EvidenceLinkText({ evidence }: { evidence: EvidenceLink }) {
  const tracking = evidenceTracking(evidence.href);
  return (
    <TrackedLink
      href={evidence.href}
      className="mt-4 inline-flex font-mono-label text-green"
      data-cursor="Open"
      event={tracking.event}
      payload={tracking.payload}
    >
      {evidence.label} →
    </TrackedLink>
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
      className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-16 pt-32 sm:pt-40"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:items-end lg:gap-16">
        <div>
          <p data-hero-copy className="font-mono-label text-ink-soft">
            02 / {aboutPage.heroEyebrow}
          </p>
          <h1 data-hero-headline className="mt-6 max-w-4xl type-h1 text-navy">
            {aboutPage.heroTitle}
          </h1>
          <p data-hero-copy className="mt-6 max-w-xl type-lead text-ink-soft">
            {aboutPage.heroDescription}
          </p>
        </div>
        <div data-hero-copy className="max-w-[320px]">
          <AboutPolaroid
            src="/assets/about/raghvendra-singh.png"
            alt="Raghvendra Singh"
            hello
            idle
            priority
            sizes="(max-width: 1024px) 80vw, 320px"
          />
          <div className="mt-6 ml-auto w-[72%] max-w-[228px]">
            <AboutPolaroid
              src="/assets/studio/desktop.jpg"
              alt={aboutPage.workspaceCaption}
              idle
              sizes="228px"
            />
            <p className="mt-3 text-xs leading-relaxed text-ink-soft">
              {aboutPage.workspaceCaption}
            </p>
          </div>
          <p className="mt-6 type-h3 text-navy">{aboutPage.identity}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{aboutPage.location}</p>
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
          <div key={stat.unit} data-reveal-item>
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

      <SectionReveal
        id="experience"
        className="scroll-mt-[var(--hash-offset)] mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24"
      >
        <h2 className="type-h2" data-reveal-item>
          Five chapters. One direction.
        </h2>
        <ol className="mt-12 space-y-4">
          {aboutPage.timeline.map((era, index) => (
            <li key={era.id} id={era.id} data-reveal-item className="scroll-mt-[var(--hash-offset)]">
              <AboutCard>
                <div className="grid gap-4 md:grid-cols-[48px_160px_1fr]">
                  <p className="font-mono-label text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="font-mono-label text-ink-soft">{era.range}</p>
                  <div>
                    <h3 className="type-h3">{era.role}</h3>
                    <p className="mt-1 text-sm text-green">{era.org}</p>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
                      {era.context}
                    </p>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
                      {era.owned}
                    </p>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-navy">
                      {era.learned}
                    </p>
                    {era.evidence ? <EvidenceLinkText evidence={era.evidence} /> : null}
                  </div>
                </div>
              </AboutCard>
            </li>
          ))}
        </ol>
      </SectionReveal>

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
            <EvidenceLinkText evidence={aboutPage.leadCritique} />
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
                  <EvidenceLinkText evidence={belief.evidence} />
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
                  <EvidenceLinkText evidence={belief.evidence} />
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
          <EvidenceLinkText evidence={aboutPage.teachingEvidence} />
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
              event="contact_cta_clicked"
              payload={{ from: "about" }}
            >
              {aboutPage.hiringPrimary.label}
            </TrackedMagneticButton>
            <ResumeCta className="w-full justify-center sm:w-auto" source="about" />
            <TrackedMagneticButton
              href={aboutPage.hiringWork.href}
              variant="secondary"
              cursor="View"
              className="w-full justify-center sm:w-auto"
              event="nav_clicked"
              payload={{ from: "about", dest: "/work" }}
            >
              {aboutPage.hiringWork.label}
            </TrackedMagneticButton>
          </div>
        </div>
      </SectionReveal>
    </>
  );
}
