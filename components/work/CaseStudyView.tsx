"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { animateCaseStudy } from "@/animations/caseStudy";
import { useExperience } from "@/components/providers/ExperienceProvider";
import ImageReveal from "@/components/reveal/ImageReveal";
import WorkCover from "@/components/work/WorkCover";
import CaseStudyCarousel from "@/components/work/CaseStudyCarousel";
import MagneticButton from "@/components/buttons/MagneticButton";
import type {
  CaseStudy,
  CaseStudyAtAGlance,
  CaseStudyFrame,
  CaseStudyOutcome,
  DeepCaseStudy,
} from "@/case-studies";
import { isDeepCaseStudy } from "@/case-studies";
import { track, trackFunnel } from "@/lib/analytics";
import { useCaseStudyScrollDepth } from "@/hooks/useCaseStudyScrollDepth";

function frameSurface(src: string) {
  const crowley = src.includes("/work/crowley/");
  const portraitPhoto = src.endsWith(".jpg");
  const diagram = src.endsWith(".svg");
  const aspect = src.includes("/work/crowley/gallery-02")
    ? "aspect-[40/21]"
    : crowley
      ? "aspect-[3/2]"
      : portraitPhoto
        ? "aspect-[3/4]"
        : src.endsWith(".png") || src.endsWith(".webp")
          ? "aspect-[16/10]"
          : "aspect-[3/2]";

  return {
    className: portraitPhoto
      ? `relative mx-auto ${aspect} w-full max-w-xl bg-surface-dim`
      : `relative ${aspect} w-full bg-surface-dim`,
    objectFit: (crowley || diagram || portraitPhoto ? "contain" : "cover") as
      | "contain"
      | "cover",
    parallax: crowley || diagram ? 0 : 0.06,
  };
}

function resolveFrames(study: CaseStudy): CaseStudyFrame[] {
  if ("frames" in study && study.frames?.length) return study.frames;
  return (study.gallery ?? []).map((src) => ({ src, caption: "" }));
}

function ChapterLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono-label text-green" data-case-chapter>
      {children}
    </p>
  );
}

function Prose({
  children,
  className = "",
  chapter = false,
}: {
  children: React.ReactNode;
  className?: string;
  chapter?: boolean;
}) {
  return (
    <p
      className={`text-base leading-relaxed sm:text-lg ${className}`}
      data-case-chapter={chapter ? true : undefined}
    >
      {children}
    </p>
  );
}

function NumberedRail({ steps }: { steps: string[] }) {
  if (!steps.length) return null;
  return (
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
  );
}

function MandateBlock({ study }: { study: CaseStudy }) {
  if (!("mandate" in study) || !study.mandate) return null;
  const m = study.mandate;
  const rows: { label: string; value: string }[] = [
    { label: "I owned", value: m.owned },
    { label: "Others owned", value: m.others },
    { label: "Final decisions", value: m.decisionMaker },
    { label: "Team", value: m.team },
    { label: "Authority", value: m.authority },
    { label: "Delivery constraints", value: m.deliveryConstraints },
  ];
  return (
    <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
      <ChapterLabel>My mandate</ChapterLabel>
      <dl className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label} data-case-chapter>
            <dt className="font-mono-label text-ink-soft">{row.label}</dt>
            <dd className="mt-2 text-base leading-relaxed">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function AtAGlanceBlock({ glance }: { glance: CaseStudyAtAGlance }) {
  const rows = [
    { label: "User", value: glance.user },
    { label: "Problem", value: glance.problem },
    { label: "My mandate", value: glance.mandate },
    { label: "Hard decision", value: glance.decision },
    { label: "Result", value: glance.result },
  ];
  return (
    <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
      <ChapterLabel>At a glance</ChapterLabel>
      <dl className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-5">
        {rows.map((row) => (
          <div key={row.label} data-case-chapter>
            <dt className="font-mono-label text-ink-soft">{row.label}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-navy sm:text-base">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function DecisionBlock({ study }: { study: CaseStudy }) {
  if (!("decision" in study) || !study.decision) return null;
  const d = study.decision;
  return (
    <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
      <ChapterLabel>Critical decision</ChapterLabel>
      <div className="mt-8 max-w-3xl space-y-8" data-case-chapter>
        <div>
          <p className="font-mono-label text-ink-soft">Situation</p>
          <Prose className="mt-2">{d.situation}</Prose>
        </div>
        <div>
          <p className="font-mono-label text-ink-soft">Options considered</p>
          <ul className="mt-3 space-y-4">
            {d.options.map((option) => (
              <li key={option.name} className="border-t border-line pt-4">
                <p className="text-base font-medium text-navy sm:text-lg">{option.name}</p>
                {option.rejectedBecause ? (
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {option.rejectedBecause}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono-label text-ink-soft">Evidence</p>
          <Prose className="mt-2">{d.evidence}</Prose>
        </div>
        <div>
          <p className="font-mono-label text-ink-soft">Tradeoff</p>
          <Prose className="mt-2">{d.tradeoff}</Prose>
        </div>
        <div>
          <p className="font-mono-label text-ink-soft">Final choice</p>
          <Prose className="mt-2">{d.choice}</Prose>
        </div>
        <div>
          <p className="font-mono-label text-ink-soft">Result</p>
          <Prose className="mt-2">{d.result}</Prose>
        </div>
      </div>
    </section>
  );
}

function OutcomesBlock({ outcomes }: { outcomes: CaseStudyOutcome[] }) {
  if (!outcomes.length) return null;
  const showFootnote = outcomes.some((o) => o.confidence === "company-metric");
  return (
    <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
      <ChapterLabel>Outcome</ChapterLabel>
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {outcomes.map((outcome) => (
          <article
            key={outcome.title}
            data-case-chapter
            className="border-t-2 border-navy pt-5"
          >
            {outcome.level ? (
              <p className="font-mono-label text-ink-soft capitalize">{outcome.level}</p>
            ) : null}
            <h2
              className={`max-w-[22ch] type-h3 text-navy ${outcome.level ? "mt-2" : ""}`}
            >
              {outcome.title}
            </h2>
            <p className="mt-3 max-w-[36rem] text-sm leading-snug text-ink-soft">
              {outcome.body}
            </p>
          </article>
        ))}
      </div>
      {showFootnote ? (
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-soft">
          Scale figures describe the operating context. Personal contributions are stated
          separately.
        </p>
      ) : null}
    </section>
  );
}

function FramesBlock({ study }: { study: CaseStudy }) {
  const frames = resolveFrames(study);
  if (!frames.length) return null;
  return (
    <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
      <ChapterLabel>Frames</ChapterLabel>
      <ul className="mt-10 space-y-16 sm:space-y-20">
        {frames.map((frame, index) => {
          const surface = frameSurface(frame.src);
          return (
            <li key={frame.src} data-case-gallery>
              <figure>
                <ImageReveal
                  className={surface.className}
                  src={frame.src}
                  alt={`${study.client} — frame ${index + 1}`}
                  sizes={
                    frame.src.endsWith(".jpg")
                      ? "(min-width: 640px) 36rem, 100vw"
                      : "100vw"
                  }
                  objectFit={surface.objectFit}
                  parallax={surface.parallax}
                />
                {frame.caption ? (
                  <figcaption className="mt-4 max-w-3xl text-lg leading-snug text-navy">
                    {frame.caption}
                  </figcaption>
                ) : null}
              </figure>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function DeepBody({ study }: { study: DeepCaseStudy }) {
  const steps = study.systemChangeSteps;
  const outcomes = study.outcomes;
  return (
    <>
      <AtAGlanceBlock glance={study.atAGlance} />
      {study.people ? (
        <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
          <ChapterLabel>People affected</ChapterLabel>
          <Prose className="mt-4 max-w-3xl" chapter>
            {study.people}
          </Prose>
        </section>
      ) : null}

      {study.apparentProblem ? (
        <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
          <ChapterLabel>The apparent problem</ChapterLabel>
          <Prose className="mt-4 max-w-3xl" chapter>
            {study.apparentProblem}
          </Prose>
        </section>
      ) : null}

      {study.underlyingProblem ? (
        <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
          <ChapterLabel>The problem underneath</ChapterLabel>
          <Prose className="mt-4 max-w-3xl" chapter>
            {study.underlyingProblem}
          </Prose>
        </section>
      ) : null}

      <MandateBlock study={study} />

      {study.constraints?.length ? (
        <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
          <ChapterLabel>Constraints</ChapterLabel>
          <ul className="mt-8 space-y-4" data-case-chapter>
            {study.constraints.map((item) => (
              <li key={item} className="border-t border-line pt-4 text-base leading-relaxed sm:text-lg">
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <DecisionBlock study={study} />

      {steps.length ? (
        <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
          <ChapterLabel>How the system changed</ChapterLabel>
          <NumberedRail steps={steps} />
        </section>
      ) : null}

      {study.iteration?.length ? (
        <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
          <ChapterLabel>Validation and iteration</ChapterLabel>
          <ul className="mt-8 space-y-8">
            {study.iteration.map((item) => (
              <li key={item.title} data-case-chapter className="border-t border-line pt-6">
                <h2 className="type-h3 text-navy">{item.title}</h2>
                <Prose className="mt-3 max-w-3xl text-ink-soft">{item.body}</Prose>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <OutcomesBlock outcomes={outcomes} />
      <FramesBlock study={study} />

      {study.wouldChangeNow ? (
        <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
          <ChapterLabel>What I would change now</ChapterLabel>
          <Prose className="mt-4 max-w-3xl" chapter>
            {study.wouldChangeNow}
          </Prose>
        </section>
      ) : null}
    </>
  );
}

function SupportingBody({ study }: { study: CaseStudy }) {
  if (!("systemChangeSteps" in study) || !study.systemChangeSteps) return null;
  const steps = study.systemChangeSteps;
  const outcomes = "outcomes" in study && study.outcomes ? study.outcomes : [];
  return (
    <>
      <MandateBlock study={study} />
      <DecisionBlock study={study} />
      {steps.length ? (
        <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
          <ChapterLabel>How the system changed</ChapterLabel>
          <NumberedRail steps={steps} />
        </section>
      ) : null}
      <OutcomesBlock outcomes={outcomes} />
      <FramesBlock study={study} />
      {"wouldChangeNow" in study && study.wouldChangeNow ? (
        <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
          <ChapterLabel>What I would change now</ChapterLabel>
          <Prose className="mt-4 max-w-3xl" chapter>
            {study.wouldChangeNow}
          </Prose>
        </section>
      ) : null}
    </>
  );
}

function CompactBody({ study }: { study: CaseStudy }) {
  const outcomes = "outcomes" in study && study.outcomes ? study.outcomes : [];
  const decisions = "decisions" in study && study.decisions ? study.decisions : [];
  return (
    <>
      {"audience" in study && study.audience ? (
        <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
          <ChapterLabel>Audience</ChapterLabel>
          <Prose className="mt-4 max-w-3xl" chapter>
            {study.audience}
          </Prose>
        </section>
      ) : null}

      {"designObjective" in study && study.designObjective ? (
        <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
          <ChapterLabel>Design objective</ChapterLabel>
          <Prose className="mt-4 max-w-3xl" chapter>
            {study.designObjective}
          </Prose>
        </section>
      ) : null}

      {decisions.length ? (
        <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
          <ChapterLabel>Three decisions</ChapterLabel>
          <NumberedRail steps={decisions} />
        </section>
      ) : null}

      <FramesBlock study={study} />
      <OutcomesBlock outcomes={outcomes} />
    </>
  );
}

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

  useCaseStudyScrollDepth(study.slug);

  useEffect(() => {
    trackFunnel("case_study_view", { slug: study.slug, source: "case_study_page" });
  }, [study.slug]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = animateCaseStudy(root, config);
    return () => ctx.revert();
  }, [config, study.slug]);

  const designSystem = study.designSystem ?? [];
  const depth = study.narrativeDepth ?? "supporting";
  const situation =
    ("situation" in study && study.situation) || study.challenge || "";
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
        <p className="mt-8 font-mono-label text-gold">{study.category}</p>
        <p className="mt-3 font-mono-label text-ink-soft">{study.client}</p>
        <h1 className="mt-6 max-w-4xl type-h1">{study.title}</h1>
        {liveLinks.length ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {liveLinks.map((link) => (
              <MagneticButton
                key={link.href}
                href={link.href}
                variant="secondary"
                cursor="Live"
                onClick={() => {
                  let host = "";
                  try {
                    host = new URL(link.href).hostname;
                  } catch {
                    host = "invalid";
                  }
                  track("external_project_click", {
                    slug: study.slug,
                    host,
                    source: "case_live_link",
                    label: link.label,
                  });
                }}
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
            <p className="font-mono-label text-green">
              {depth === "compact" ? "Context" : "Situation"}
            </p>
            <p className="mt-4 text-lg leading-relaxed">{situation}</p>
          </article>
        </div>
      </section>

      {depth === "deep" && isDeepCaseStudy(study) ? <DeepBody study={study} /> : null}
      {depth === "supporting" ? <SupportingBody study={study} /> : null}
      {depth === "compact" ? <CompactBody study={study} /> : null}

      {designSystem.length ? (
        <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
          <ChapterLabel>Design system</ChapterLabel>
          <div className="mt-10" data-case-system>
            <CaseStudyCarousel
              label={`${study.client} design system`}
              slides={designSystem}
            />
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
            <h2 className="mt-3 max-w-lg type-h2">Start a conversation.</h2>
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
                <p className="font-mono-label text-ink-soft">Different kind of work</p>
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
