"use client";

import { useEffect, useRef } from "react";
import PageHero from "@/components/reveal/PageHero";
import SectionReveal from "@/components/reveal/SectionReveal";
import MagneticButton from "@/components/buttons/MagneticButton";
import ResumeCta from "@/components/cta/ResumeCta";
import AboutCard from "@/components/about/AboutCard";
import AboutPolaroid from "@/components/about/AboutPolaroid";
import { animateAboutStat } from "@/animations/about";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { aboutPage } from "@/about";

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
      {value}
    </p>
  );
}

const BEAT_ROTATE = [-3.5, 2.4, -1.8, 3.2];

export default function AboutView() {
  return (
    <>
      <PageHero
        index="02"
        label="About"
        title={aboutPage.heroTitle}
        description={aboutPage.heroDescription}
      />

      <SectionReveal className="mx-auto grid max-w-[1440px] gap-10 px-[var(--page-pad)] pb-16 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-end lg:gap-16">
        <div data-reveal-item className="max-w-[320px]">
          <AboutPolaroid
            src="/assets/about/raghvendra-singh.png"
            alt="Raghvendra Singh"
            hello
            idle
            priority
            sizes="(max-width: 1024px) 80vw, 320px"
          />
          <div className="mt-6 ml-auto w-[58%] max-w-[180px]">
            <AboutPolaroid
              src="/assets/studio/desktop.jpg"
              alt="A desk in Raghvendra’s studio"
              idle
              sizes="180px"
            />
          </div>
        </div>
        <div data-reveal-item className="max-w-xl">
          <p className="type-h3 text-navy">
            Product Design Leader · Systems Thinker · AI Product Builder
          </p>
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto grid max-w-[1440px] gap-4 px-[var(--page-pad)] pb-20 md:grid-cols-3 md:gap-6">
        {aboutPage.stats.map((stat) => (
          <div key={stat.label} data-reveal-item>
            <AboutCard>
              <AboutStatValue value={stat.value} />
              <p className="mt-2 font-mono-label text-ink-soft">{stat.label}</p>
            </AboutCard>
          </div>
        ))}
      </SectionReveal>

      <SectionReveal className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
        <h2 className="type-h2" data-reveal-item>
          How the work is organised.
        </h2>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {aboutPage.chapters.map((chapter, index) => (
            <li
              key={chapter.title}
              data-reveal-item
              className={index % 2 === 1 ? "lg:mt-10" : undefined}
            >
              <AboutCard>
                <p className="font-mono-label text-green">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 type-h3">{chapter.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{chapter.body}</p>
              </AboutCard>
            </li>
          ))}
        </ol>
      </SectionReveal>

      <SectionReveal
        id="beliefs"
        className="scroll-mt-28 border-t border-line bg-surface-dim px-[var(--page-pad)] py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <h2 className="type-h2" data-reveal-item>
            What I believe
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {aboutPage.beliefs.map((belief) => (
              <div key={belief.index} data-reveal-item>
                <AboutCard>
                  <p className="font-mono-label text-green">{belief.index}</p>
                  <h3 className="mt-3 type-h3">{belief.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {belief.description}
                  </p>
                </AboutCard>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal
        id="experience"
        className="scroll-mt-[var(--hash-offset)] mx-auto max-w-[1440px] px-[var(--page-pad)] py-24"
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
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
                      {era.description}
                    </p>
                  </div>
                </div>
              </AboutCard>
            </li>
          ))}
        </ol>
      </SectionReveal>

      <SectionReveal
        id="studio"
        className="scroll-mt-28 border-t border-line bg-surface-dim px-[var(--page-pad)] py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <p className="font-mono-label text-ink-soft" data-reveal-item>
            Also
          </p>
          <p data-reveal-item className="mt-4 max-w-2xl type-h3">
            {aboutPage.glimpse.body}
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {aboutPage.glimpse.beats.map((beat, index) => (
              <li key={beat} data-reveal-item>
                <AboutPolaroid
                  label={beat}
                  href={aboutPage.glimpse.href}
                  rotate={BEAT_ROTATE[index] ?? 0}
                />
              </li>
            ))}
          </ul>
          <div className="mt-10" data-reveal-item>
            <MagneticButton href={aboutPage.glimpse.href} variant="secondary" cursor="Open">
              {aboutPage.glimpse.cta}
            </MagneticButton>
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
            <h2 className="mt-3 max-w-lg type-h3">
              Product design leadership, with evidence attached.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
              {aboutPage.heroTitle.replace(/\.$/, "")}.
            </p>
          </div>
          <div data-cta-row className="flex w-full flex-col gap-3 sm:w-auto">
            <ResumeCta className="w-full justify-center sm:w-auto" source="about" />
            <MagneticButton href="/work" variant="secondary" cursor="View" className="w-full justify-center sm:w-auto">
              View Selected Work
            </MagneticButton>
            <MagneticButton href="/contact" variant="secondary" className="w-full justify-center sm:w-auto">
              Contact
            </MagneticButton>
          </div>
        </div>
      </SectionReveal>
    </>
  );
}
