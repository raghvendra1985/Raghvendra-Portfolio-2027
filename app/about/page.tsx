import type { Metadata } from "next";
import PageHero from "@/components/reveal/PageHero";
import SectionReveal from "@/components/reveal/SectionReveal";
import ImageReveal from "@/components/reveal/ImageReveal";
import MagneticButton from "@/components/buttons/MagneticButton";
import { aboutPage } from "@/about";
import { pageMetadataExtras } from "@/lib/seo";

export const metadata: Metadata = {
  title: aboutPage.title,
  description: aboutPage.description,
  ...pageMetadataExtras({
    title: aboutPage.title,
    description: aboutPage.description,
    path: "/about",
  }),
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="02"
        label="About"
        title={aboutPage.heroTitle}
        description={aboutPage.heroDescription}
      />

      <SectionReveal className="mx-auto grid max-w-[1440px] gap-10 px-[var(--page-pad)] pb-16 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-end lg:gap-16">
        <div data-reveal-item>
          <ImageReveal
            src="/assets/about/raghvendra-singh.png"
            alt="Raghvendra Singh"
            className="aspect-square w-full max-w-[320px]"
            sizes="(max-width: 1024px) 80vw, 320px"
            objectFit="cover"
            parallax={0.06}
            priority
          />
        </div>
        <div data-reveal-item className="max-w-xl">
          <p className="font-display text-2xl leading-snug text-navy sm:text-3xl">
            Product Design Leader · Systems Thinker · AI Product Builder
          </p>
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto grid max-w-[1440px] gap-8 px-[var(--page-pad)] pb-20 sm:grid-cols-3">
        {aboutPage.stats.map((stat) => (
          <div key={stat.label} data-reveal-item className="border-t border-navy pt-4">
            <p className="font-display text-4xl">{stat.value}</p>
            <p className="mt-2 font-mono-label text-[11px] text-ink-soft">{stat.label}</p>
          </div>
        ))}
      </SectionReveal>

      <SectionReveal
        id="beliefs"
        className="scroll-mt-28 border-t border-line bg-surface-dim px-[var(--page-pad)] py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <h2 className="font-display text-3xl sm:text-4xl" data-reveal-item>
            What I believe
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {aboutPage.beliefs.map((belief) => (
              <article key={belief.index} data-reveal-item className="border-t-2 border-navy pt-4">
                <p className="font-mono-label text-[11px] text-green">{belief.index}</p>
                <h3 className="mt-3 font-display text-xl">{belief.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {belief.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal
        id="experience"
        className="scroll-mt-28 mx-auto max-w-[1440px] px-[var(--page-pad)] py-24"
      >
        <h2 className="font-display text-3xl sm:text-4xl" data-reveal-item>
          20 years · 5 chapters · 1 direction
        </h2>
        <ol className="mt-12">
          {aboutPage.timeline.map((era) => (
            <li
              key={era.id}
              id={era.id}
              data-reveal-item
              className="scroll-mt-28 grid gap-4 border-t border-line py-8 md:grid-cols-[200px_1fr]"
            >
              <p className="font-mono-label text-[11px] text-ink-soft">{era.range}</p>
              <div>
                <h3 className="font-display text-2xl">{era.role}</h3>
                <p className="mt-1 text-sm text-green">{era.org}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
                  {era.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </SectionReveal>

      <SectionReveal
        id="studio"
        className="scroll-mt-28 border-t border-line bg-surface-dim px-[var(--page-pad)] py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <p className="font-mono-label text-[11px] text-ink-soft" data-reveal-item>
            Also
          </p>
          <p
            data-reveal-item
            className="mt-4 max-w-2xl font-display text-2xl leading-snug sm:text-3xl"
          >
            {aboutPage.glimpse.body}
          </p>
          <p
            data-reveal-item
            className="mt-8 font-mono-label text-[11px] text-green"
          >
            {aboutPage.glimpse.beats.join(" · ")}
          </p>
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
          className="flex flex-col items-start justify-between gap-8 border border-line p-10 sm:flex-row sm:items-end"
        >
          <div>
            <p className="font-mono-label text-[11px] text-ink-soft">Work with Singh</p>
            <h2 className="mt-3 max-w-lg font-display text-2xl sm:text-3xl">
              20 years of design leadership, condensed into clear engagements.
            </h2>
          </div>
          <MagneticButton href="/contact">Initiate inquiry</MagneticButton>
        </div>
      </SectionReveal>
    </>
  );
}
