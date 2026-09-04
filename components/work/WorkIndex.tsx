"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { animateSection } from "@/animations/sections";
import { useExperience } from "@/components/providers/ExperienceProvider";
import ImageReveal from "@/components/reveal/ImageReveal";
import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import WorkCard from "@/components/work/WorkCard";
import WorkCover from "@/components/work/WorkCover";
import { trackFunnel } from "@/lib/analytics";
import { workGroupMarks } from "@/visual-language/marks";
import {
  contributionGroupLabels,
  contributionGroups,
  featuredWork,
  getArchiveWork,
  getRemainingWorkByGroup,
  type CaseStudy,
  type ContributionGroup,
} from "@/case-studies";

function evidenceCta(study: CaseStudy) {
  if (study.tier === "flagship") return "Read case study →";
  if (study.href) return "Visit site →";
  return null;
}

function CardBody({
  study,
  featured = false,
  compact = false,
}: {
  study: CaseStudy;
  featured?: boolean;
  compact?: boolean;
}) {
  const coverAspect =
    study.slug === "crowley"
      ? "aspect-[4/5] min-h-[200px]"
      : featured
        ? "aspect-[16/10] min-h-[220px] lg:min-h-[280px]"
        : compact
          ? "aspect-[4/3] min-h-[160px]"
          : "aspect-[3/2] min-h-[200px]";
  const cta = evidenceCta(study);

  const copy = (
    <>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono-label text-ink-soft">
        {featured ? <span className="text-gold">Featured</span> : null}
        {featured && study.featuredDesignation ? (
          <span>{study.featuredDesignation}</span>
        ) : null}
        <span>{study.evidence}</span>
      </div>

      <p className={`mt-3 font-mono-label ${featured ? "text-base" : "text-sm"} text-ink-soft`}>
        {study.client}
      </p>
      <h3 className={`mt-2 text-navy ${featured ? "type-h2" : compact ? "type-h3 text-lg" : "type-h3"}`}>
        {study.title}
      </h3>

      <dl className="mt-4 grid grid-cols-2 gap-3 font-mono-label text-ink-soft">
        {study.role ? (
          <div>
            <dt className="text-ink-soft/70">Role</dt>
            <dd className="mt-1 text-ink">{study.role}</dd>
          </div>
        ) : null}
        <div>
          <dt className="text-ink-soft/70">Year</dt>
          <dd className="mt-1 text-ink">{study.year}</dd>
        </div>
      </dl>

      <p
        className={`mt-4 leading-relaxed text-ink-soft ${
          compact ? "text-sm line-clamp-2" : featured ? "text-base" : "text-sm"
        }`}
      >
        {study.contribution}
      </p>

      {cta ? (
        <p className="mt-4 inline-flex min-h-11 items-center font-mono-label text-green">{cta}</p>
      ) : null}
    </>
  );

  const cover = study.cover ? (
    <div data-work-cover className="overflow-hidden">
      <ImageReveal
        key={study.cover}
        className={`relative ${coverAspect}${study.slug === "crowley" ? " bg-surface-dim" : ""}`}
        src={study.cover}
        alt={`${study.client} cover`}
        sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
        objectFit={study.slug === "crowley" ? "contain" : "cover"}
        parallax={study.slug === "crowley" ? 0 : 0.12}
      >
        <WorkCover study={study} className="h-full" />
      </ImageReveal>
    </div>
  ) : null;

  if (featured) {
    return (
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        {cover}
        <div>{copy}</div>
      </div>
    );
  }

  return (
    <>
      {cover}
      <div className={cover ? "mt-4" : ""}>{copy}</div>
    </>
  );
}

function StudyLink({
  study,
  featured = false,
  compact = false,
  group,
}: {
  study: CaseStudy;
  featured?: boolean;
  compact?: boolean;
  group?: ContributionGroup;
}) {
  const body = <CardBody study={study} featured={featured} compact={compact} />;
  const from = featured ? "work-featured" : "work-group";
  const payload = {
    slug: study.slug,
    from,
    ...(group ? { group } : {}),
    ...(featured && study.featuredDesignation
      ? { designation: study.featuredDesignation }
      : {}),
  };

  if (study.tier === "flagship") {
    return (
      <WorkCard>
        <Link
          href={`/work/${study.slug}`}
          data-cursor="View"
          className="group block"
          onClick={() =>
            trackFunnel("case_study_open", { ...payload, source: featured ? "work_featured" : "work_group" })
          }
        >
          {body}
        </Link>
      </WorkCard>
    );
  }

  if (study.href) {
    return (
      <WorkCard>
        <a
          href={study.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="Live"
          className="group block"
          onClick={() => {
            let host = "";
            try {
              host = study.href ? new URL(study.href).hostname : "";
            } catch {
              host = "invalid";
            }
            trackFunnel("external_project_click", {
              ...payload,
              source: featured ? "work_featured" : "work_group",
              host,
            });
          }}
        >
          {body}
        </a>
      </WorkCard>
    );
  }

  return (
    <WorkCard>
      <article className="block">{body}</article>
    </WorkCard>
  );
}

function ArchiveRow({ study }: { study: CaseStudy }) {
  const inner = (
    <>
      <span className="font-mono-label text-ink-soft">{study.year}</span>
      <span className="font-medium text-navy">{study.client}</span>
      <span className="text-ink-soft">{study.title}</span>
      <span className="font-mono-label text-ink-soft">{study.evidence}</span>
    </>
  );

  const className =
    "grid gap-2 border-t border-line py-4 sm:grid-cols-[4rem_minmax(0,12rem)_minmax(0,1fr)_6rem] sm:items-baseline sm:gap-4";

  if (study.tier === "flagship") {
    return (
      <li>
        <Link
          href={`/work/${study.slug}`}
          className={`${className} hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold`}
          data-cursor="View"
          onClick={() =>
            trackFunnel("case_study_open", {
              slug: study.slug,
              from: "work-archive",
              group: "archive",
              source: "work_archive",
            })
          }
        >
          {inner}
        </Link>
      </li>
    );
  }

  if (study.href) {
    return (
      <li>
        <a
          href={study.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${className} text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold`}
          data-cursor="Live"
          onClick={() => {
            let host = "";
            try {
              host = study.href ? new URL(study.href).hostname : "";
            } catch {
              host = "invalid";
            }
            trackFunnel("external_project_click", {
              slug: study.slug,
              from: "work-archive",
              group: "archive",
              source: "work_archive",
              host,
            });
          }}
        >
          {inner}
        </a>
      </li>
    );
  }

  return (
    <li className={`${className} text-ink-soft`} aria-label={`${study.client}: archive entry`}>
      {inner}
    </li>
  );
}

function GroupNav({
  groups,
}: {
  groups: { id: Exclude<ContributionGroup, "archive">; label: string }[];
}) {
  if (!groups.length) return null;

  function onTocClick(target: string) {
    trackFunnel("work_filter_use", { target, source: "work_toc" });
  }

  return (
    <nav className="mt-12 border-t border-line pt-8" aria-label="Work by contribution">
      <p className="font-mono-label text-ink-soft">Browse by contribution</p>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
        {groups.map((group) => (
          <li key={group.id}>
            <a
              href={`#group-${group.id}`}
              onClick={() => onTocClick(group.id)}
              className="inline-flex min-h-11 items-center font-mono-label text-navy underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {group.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#archive"
            onClick={() => onTocClick("archive")}
            className="inline-flex min-h-11 items-center font-mono-label text-ink-soft underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Archive
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default function WorkIndex() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { config } = useExperience();
  const archive = getArchiveWork();
  const populatedGroups = contributionGroups
    .map((group) => ({
      id: group,
      label: contributionGroupLabels[group],
      studies: getRemainingWorkByGroup(group),
    }))
    .filter((group) => group.studies.length > 0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = animateSection(root, config, { stagger: 0.045, translate: 24 });
    return () => ctx.revert();
  }, [config]);

  return (
    <div ref={rootRef} className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24">
      <section aria-labelledby="featured-evidence-heading" data-reveal-item>
        <h2 id="featured-evidence-heading" className="font-section-label text-navy">
          Featured evidence
        </h2>
        <ul className="mt-8 space-y-16 lg:space-y-24">
          {featuredWork.map((study) => (
            <li key={study.slug} data-reveal-item>
              <StudyLink study={study} featured />
            </li>
          ))}
        </ul>
      </section>

      <GroupNav groups={populatedGroups.map(({ id, label }) => ({ id, label }))} />

      <div className="mt-16 space-y-20">
        {populatedGroups.map(({ id, label, studies }) => {
          const compact = studies.filter((study) => study.indexCompact);
          const full = studies.filter((study) => !study.indexCompact);

          return (
            <section
              key={id}
              id={`group-${id}`}
              className="scroll-mt-[var(--hash-offset)]"
              aria-labelledby={`heading-${id}`}
              data-reveal-item
            >
              <div className="flex items-center gap-4">
                <SystemObjectMark
                  src={workGroupMarks[id].src}
                  motion={workGroupMarks[id].motion}
                  surface={workGroupMarks[id].surface}
                />
                <h2 id={`heading-${id}`} className="font-section-label text-navy">
                  {label}
                </h2>
              </div>

              {full.length ? (
                <ul className="mt-8 grid gap-10 md:grid-cols-2">
                  {full.map((study) => (
                    <li key={study.slug} data-reveal-item>
                      <StudyLink study={study} group={id} />
                    </li>
                  ))}
                </ul>
              ) : null}

              {compact.length ? (
                <ul className={`grid gap-8 sm:grid-cols-2 ${full.length ? "mt-10" : "mt-8"}`}>
                  {compact.map((study) => (
                    <li key={study.slug} data-reveal-item>
                      <StudyLink study={study} compact group={id} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          );
        })}
      </div>

      {archive.length ? (
        <section
          id="archive"
          className="mt-24 scroll-mt-[var(--hash-offset)]"
          aria-labelledby="archive-heading"
          data-reveal-item
        >
          <h2 id="archive-heading" className="font-section-label text-navy">
            Archive
          </h2>
          <p className="mt-3 max-w-lg text-sm text-ink-soft">
            Earlier web and MVP work kept reachable without competing with the contribution groups
            above.
          </p>
          <ul className="mt-8">
            {archive.map((study) => (
              <ArchiveRow key={study.slug} study={study} />
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
