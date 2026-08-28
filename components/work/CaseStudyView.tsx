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
  related,
  different,
}: {
  study: CaseStudy;
  related?: CaseStudy;
  different?: CaseStudy;
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
        <Link href="/work" className="font-mono-label text-ink-soft">
          ← All selected work
        </Link>
        <p className="mt-8 font-mono-label text-gold">
          {study.category}
        </p>
        <p className="mt-3 font-mono-label text-ink-soft">{study.client}</p>
        <h1 className="mt-6 max-w-4xl type-h1">
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
            <dt className="font-mono-label text-ink-soft">Role</dt>
            <dd className="mt-2 text-sm">{study.role}</dd>
          </div>
          <div>
            <dt className="font-mono-label text-ink-soft">Timeline</dt>
            <dd className="mt-2 text-sm">{study.timeline}</dd>
          </div>
          <div>
            <dt className="font-mono-label text-ink-soft">Engagement</dt>
            <dd className="mt-2 text-sm">{study.engagement}</dd>
          </div>
        </dl>
      </section>

      <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div
            data-case-hero
            data-shared-image-target
            className={`relative min-h-[240px] lg:min-h-[420px] ${
              study.slug === "crowley" ? "aspect-[4/5]" : "aspect-[16/10]"
            }`}
          >
            <ImageReveal
              className={`h-full w-full ${study.slug === "crowley" ? "bg-surface-dim" : ""}`}
              src={study.cover}
              alt={`${study.client} — ${study.title}`}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              objectFit={study.slug === "crowley" ? "contain" : "cover"}
              parallax={study.slug === "crowley" ? 0 : 0.12}
            >
              <WorkCover study={study} className="h-full min-h-[240px] lg:min-h-[420px]" />
            </ImageReveal>
          </div>
          <article data-case-chapter>
            <p className="font-mono-label text-green">Company / product context</p>
            <p className="mt-4 text-lg leading-relaxed">{study.challenge}</p>
          </article>
        </div>
      </section>

      {steps.length ? (
        <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
          <p className="font-mono-label text-green" data-case-chapter>
            What I did
          </p>
          <ol className="mt-8 space-y-8">
            {steps.map((step, index) => (
              <li
                key={step}
                data-case-step
                className="grid gap-4 border-t border-line pt-6 md:grid-cols-[80px_minmax(0,720px)]"
              >
                <span className="font-mono-label text-gold">
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
          <p className="font-mono-label text-green" data-case-chapter>
            Outcome
          </p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {outcomes.map((outcome) => (
              <article
                key={outcome.title}
                data-case-chapter
                className="border-t-2 border-navy pt-4"
              >
                <h2 className="type-h3">{outcome.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{outcome.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-soft">
            Company-scale figures in this case study describe the product context. They are not
            personal performance metrics.
          </p>
        </section>
      ) : null}

      {gallery.length ? (
        <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
          <p className="font-mono-label text-ink-soft" data-case-chapter>
            Frames
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {gallery.map((src, index) => (
              <div key={src} data-case-gallery>
                <ImageReveal
                  className={`relative ${
                    src.includes("/work/crowley/gallery-02")
                      ? "aspect-[40/21] bg-surface-dim"
                      : src.includes("/work/crowley/")
                        ? "aspect-[3/2] bg-surface-dim"
                        : src.endsWith(".jpg")
                          ? "aspect-[3/4]"
                          : src.endsWith(".png") || src.endsWith(".webp")
                            ? "aspect-[16/10]"
                            : "aspect-[3/2]"
                  }`}
                  src={src}
                  alt={`${study.client} — frame ${index + 1}`}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  objectFit={src.includes("/work/crowley/") ? "contain" : "cover"}
                  parallax={src.includes("/work/crowley/") ? 0 : 0.06}
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
            <p className="font-mono-label text-ink-soft">Have a similar challenge?</p>
            <h2 className="mt-3 max-w-lg type-h2">
              Start a conversation.
            </h2>
          </div>
          <MagneticButton href="/contact">Start a conversation</MagneticButton>
        </div>

        <nav
          className="mx-auto mt-16 max-w-[1440px]"
          aria-label="Continue through selected work"
        >
          <p className="font-mono-label text-ink-soft">Continue</p>
          <ul className="mt-6 grid gap-8 md:grid-cols-3">
            {related ? (
              <li>
                <p className="font-mono-label text-ink-soft">Related project</p>
                <Link
                  href={`/work/${related.slug}`}
                  data-cursor="View"
                  className="mt-3 block group"
                >
                  <span className="font-mono-label text-ink-soft">{related.client}</span>
                  <span className="mt-2 block type-h3 text-navy group-hover:text-green">
                    {related.title}
                  </span>
                </Link>
              </li>
            ) : null}
            {different ? (
              <li>
                <p className="font-mono-label text-ink-soft">
                  Different kind of work
                </p>
                <Link
                  href={`/work/${different.slug}`}
                  data-cursor="View"
                  className="mt-3 block group"
                >
                  <span className="font-mono-label text-ink-soft">{different.client}</span>
                  <span className="mt-2 block type-h3 text-navy group-hover:text-green">
                    {different.title}
                  </span>
                </Link>
              </li>
            ) : null}
            <li>
              <p className="font-mono-label text-ink-soft">Back to all work</p>
              <Link href="/work" data-cursor="Open" className="mt-3 block group">
                <span className="mt-2 block type-h3 text-navy group-hover:text-green">
                  Selected work
                </span>
                <span className="mt-2 block font-mono-label text-green">View all →</span>
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </div>
  );
}
