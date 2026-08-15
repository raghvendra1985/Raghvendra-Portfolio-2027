"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { animateCaseStudy } from "@/animations/caseStudy";
import { useExperience } from "@/components/providers/ExperienceProvider";
import ImageReveal from "@/components/reveal/ImageReveal";
import WorkCover from "@/components/work/WorkCover";
import MagneticButton from "@/components/buttons/MagneticButton";
import type { CaseStudy } from "@/case-studies";

export default function CaseStudyView({
  study,
  next,
}: {
  study: CaseStudy;
  next: CaseStudy;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { config } = useExperience();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = animateCaseStudy(root, config);
    return () => ctx.revert();
  }, [config, study.slug]);

  const steps = study.approachSteps ?? [];
  const outcomes = study.outcomes ?? [];
  const gallery = study.gallery ?? [];
  const liveLinks =
    study.links?.length
      ? study.links
      : study.href
        ? [{ label: "Visit live site", href: study.href }]
        : [];

  return (
    <div ref={rootRef}>
      <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-12 pt-32 sm:pt-40">
        <Link href="/work" className="font-mono-label text-[11px] text-ink-soft">
          ← All selected work
        </Link>
        <p className="mt-8 font-mono-label text-[11px] text-gold">
          {study.category}
        </p>
        <p className="mt-3 font-mono-label text-[11px] text-ink-soft">{study.client}</p>
        <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.05] sm:text-6xl">
          {study.title}
        </h1>
        {liveLinks.length ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {liveLinks.map((link) => (
              <MagneticButton
                key={link.href}
                href={link.href}
                variant="secondary"
                cursor="Live"
              >
                {link.label}
              </MagneticButton>
            ))}
          </div>
        ) : null}
        <dl
          data-case-chapter
          className="mt-10 grid gap-6 border-t border-line pt-6 sm:grid-cols-3"
        >
          <div>
            <dt className="font-mono-label text-[11px] text-ink-soft">Role</dt>
            <dd className="mt-2 text-sm">{study.role}</dd>
          </div>
          <div>
            <dt className="font-mono-label text-[11px] text-ink-soft">Timeline</dt>
            <dd className="mt-2 text-sm">{study.timeline}</dd>
          </div>
          <div>
            <dt className="font-mono-label text-[11px] text-ink-soft">Engagement</dt>
            <dd className="mt-2 text-sm">{study.engagement}</dd>
          </div>
        </dl>
      </section>

      <div data-case-hero data-shared-image-target className="relative h-[420px] sm:h-[520px]">
        <ImageReveal
          className="h-full w-full"
          src={study.cover}
          alt={`${study.client} — ${study.title}`}
          priority
          sizes="100vw"
        >
          <WorkCover study={study} className="h-full min-h-[420px] sm:min-h-[520px]" />
        </ImageReveal>
      </div>

      <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] py-20">
        <article data-case-chapter className="max-w-3xl">
          <p className="font-mono-label text-[11px] text-green">Challenge</p>
          <p className="mt-4 text-lg leading-relaxed">{study.challenge}</p>
        </article>
      </section>

      {steps.length ? (
        <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
          <p className="font-mono-label text-[11px] text-green" data-case-chapter>
            Approach
          </p>
          <ol className="mt-8 space-y-8">
            {steps.map((step, index) => (
              <li
                key={step}
                data-case-step
                className="grid gap-4 border-t border-line pt-6 md:grid-cols-[80px_minmax(0,720px)]"
              >
                <span className="font-mono-label text-[11px] text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-relaxed sm:text-lg">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {outcomes.length ? (
        <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
          <p className="font-mono-label text-[11px] text-green" data-case-chapter>
            Outcome
          </p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {outcomes.map((outcome) => (
              <article
                key={outcome.title}
                data-case-chapter
                className="border-t-2 border-navy pt-4"
              >
                <h2 className="font-display text-xl">{outcome.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{outcome.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {gallery.length ? (
        <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
          <p className="font-mono-label text-[11px] text-ink-soft" data-case-chapter>
            Frames
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {gallery.map((src, index) => (
              <div key={src} data-case-gallery>
                <ImageReveal
                  className={`relative ${
                    src.endsWith(".jpg")
                      ? "aspect-[3/4]"
                      : src.endsWith(".png") || src.endsWith(".webp")
                        ? "aspect-[16/10]"
                        : "aspect-[3/2]"
                  }`}
                  src={src}
                  alt={`${study.client} diagram ${index + 1}`}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  parallax={0.06}
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section
        data-case-next
        className="border-t border-line px-[var(--page-pad)] py-20"
      >
        <div className="mx-auto flex max-w-[1440px] flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono-label text-[11px] text-ink-soft">Have a similar challenge?</p>
            <h2 className="mt-3 max-w-lg font-display text-3xl sm:text-4xl">
              Start a conversation.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <MagneticButton href="/contact">Start a conversation</MagneticButton>
            <MagneticButton href={`/work/${next.slug}`} variant="secondary" cursor="Next">
              Next case study
            </MagneticButton>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-[1440px] font-mono-label text-[11px] text-ink-soft">
          Next — {next.client}: {next.title}
        </p>
      </section>
    </div>
  );
}
