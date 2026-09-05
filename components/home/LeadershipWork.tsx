"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TrackedLink, TrackedMagneticButton } from "@/components/analytics/TrackedCta";
import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import { crossfadeWorkVisual } from "@/animations/caseStudy";
import { createScope, gsap, ScrollTrigger } from "@/animations/motion";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { track } from "@/lib/analytics";
import {
  getLeadershipProjects,
  leadershipWork,
  type LeadershipProject,
} from "@/home/leadership-home";
import { homeMarks } from "@/visual-language/marks";

function ProjectCover({
  project,
  priority = false,
  decorative = false,
  className = "",
}: {
  project: LeadershipProject;
  priority?: boolean;
  decorative?: boolean;
  className?: string;
}) {
  const scrollableFrame =
    "frames" in project.study
      ? project.study.frames.find((frame) => frame.scrollable)
      : undefined;
  const src = scrollableFrame?.src ?? project.study.cover;
  const scrollable = Boolean(scrollableFrame);
  const isSvg = Boolean(src?.endsWith(".svg"));

  return (
    <div
      className={`relative bg-navy ${
        scrollable ? "overflow-y-auto overscroll-contain" : "overflow-hidden"
      } ${className}`}
      data-work-cover-scroll={scrollable ? "true" : undefined}
      tabIndex={scrollable && !decorative ? 0 : undefined}
      aria-label={
        scrollable && !decorative
          ? `${project.title} — scroll to view full landing page`
          : undefined
      }
    >
      {src ? (
        scrollable ? (
          <Image
            src={src}
            alt={decorative ? "" : project.title}
            width={1200}
            height={6400}
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="h-auto w-full"
          />
        ) : (
          <Image
            src={src}
            alt={decorative ? "" : project.title}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 45vw"
            unoptimized={isSvg}
            className={
              isSvg ? "object-contain object-center p-6" : "object-cover object-center"
            }
          />
        )
      ) : (
        <div className="absolute inset-0 bg-surface-dim" aria-hidden="true" />
      )}
    </div>
  );
}

function StackCopyBlock({
  label,
  paragraphs,
}: {
  label: string;
  paragraphs: readonly string[];
}) {
  return (
    <div className="mt-5 max-w-[48ch] space-y-2.5 text-left" data-work-stack-copy>
      {paragraphs.map((paragraph, i) => (
        <p key={`${label}-${i}`} className="type-body text-ink">
          {i === 0 ? (
            <span className="font-medium" data-work-stack-label>
              {label}.{" "}
            </span>
          ) : null}
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function ProjectStackCopy({
  project,
  index,
  total,
  showCta = true,
}: {
  project: LeadershipProject;
  index: number;
  total: string;
  showCta?: boolean;
}) {
  return (
    <div className="text-left">
      <p className="font-mono-label text-green">{project.kind}</p>
      <h3 className="mt-3 max-w-xl text-left type-stack-title text-navy">{project.title}</h3>
      <dl className="mt-5 grid gap-3 text-left sm:grid-cols-2">
        <div>
          <dt className="font-mono-label text-navy/60">Role</dt>
          <dd className="mt-1 type-body text-ink">{project.role}</dd>
        </div>
        <div>
          <dt className="font-mono-label text-navy/60">Scope</dt>
          <dd className="mt-1 type-body text-ink">{project.scope}</dd>
        </div>
      </dl>
      <StackCopyBlock label="Challenge" paragraphs={project.stackChallenge} />
      <StackCopyBlock label="Outcome" paragraphs={project.stackOutcome} />
      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Capabilities">
        {project.capabilities.map((tag) => (
          <li
            key={tag}
            className="border border-line px-3 py-1.5 font-mono-label text-navy/80"
          >
            {tag}
          </li>
        ))}
      </ul>
      {showCta ? (
        <TrackedLink
          href={project.href}
          className="mt-7 inline-flex min-h-11 items-center font-mono-label text-navy hover:text-green"
          data-cursor="Open"
          event="case_study_open"
          payload={{ source: "home_leadership_work", slug: project.slug }}
        >
          Read case study →
        </TrackedLink>
      ) : (
        <p className="mt-7 font-mono-label text-navy">Read case study →</p>
      )}
      <p className="sr-only">
        Project {String(index + 1).padStart(2, "0")} of {total}
      </p>
    </div>
  );
}

export default function LeadershipWork() {
  const projects = getLeadershipProjects();
  const rootRef = useRef<HTMLElement>(null);
  const { config } = useExperience();
  const [active, setActive] = useState(0);
  const total = String(projects.length).padStart(2, "0");

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !projects.length) return;

    const ctx = createScope(root, () => {
      const rows = Array.from(root.querySelectorAll<HTMLElement>("[data-work-stack-row]"));
      const progress = root.querySelector<HTMLElement>("[data-work-stack-progress]");

      if (progress) {
        gsap.set(progress, { scaleX: 1 / projects.length });
      }

      rows.forEach((row, index) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 55%",
          end: "bottom 55%",
          onEnter: () => {
            setActive(index);
            if (progress) {
              gsap.to(progress, {
                scaleX: (index + 1) / projects.length,
                duration: config.reducedMotion ? 0 : 0.35,
                overwrite: "auto",
              });
            }
          },
          onEnterBack: () => {
            setActive(index);
            if (progress) {
              gsap.to(progress, {
                scaleX: (index + 1) / projects.length,
                duration: config.reducedMotion ? 0 : 0.35,
                overwrite: "auto",
              });
            }
          },
        });
      });
    });

    return () => ctx.revert();
  }, [config.reducedMotion, projects.length]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const visuals = Array.from(
      root.querySelectorAll<HTMLElement>("[data-work-stack-visual]"),
    );
    crossfadeWorkVisual(visuals, active, config);
  }, [active, config]);

  const activeIsScrollableCover =
    "frames" in projects[active]?.study
      ? Boolean(projects[active]?.study.frames.some((frame) => frame.scrollable))
      : false;

  return (
    <section
      ref={rootRef}
      id="work"
      className="scroll-mt-[var(--hash-offset)] border-t border-line px-[var(--page-pad)] py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px] min-w-0">
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-3xl items-start gap-4">
            <SystemObjectMark
              src={homeMarks.work.src}
              motion={homeMarks.work.motion}
              surface={homeMarks.work.surface}
            />
            <div>
              <p className="font-mono-label text-navy/80">{leadershipWork.eyebrow}</p>
              <h2 className="mt-4 type-h2">{leadershipWork.title}</h2>
              <p className="mt-4 max-w-[62ch] type-body text-ink-soft">
                {leadershipWork.intro}
              </p>
            </div>
          </div>
          <TrackedMagneticButton
            href={leadershipWork.all.href}
            variant="secondary"
            cursor="Open"
            className="w-full justify-center md:w-auto"
            event="nav_clicked"
            payload={{ surface: "home_work", dest: "/work" }}
          >
            {leadershipWork.all.label}
          </TrackedMagneticButton>
        </div>

        {/* Mobile / tablet: sequential stack cards */}
        <ul className="mt-12 space-y-10 md:mt-16 md:space-y-14 lg:hidden">
          {projects.map((project, index) => (
            <li key={`mobile-${project.slug}`} className="min-w-0">
              <article
                className="overflow-hidden border border-line bg-mist"
              >
                <ProjectCover
                  project={project}
                  priority={index === 0}
                  className="aspect-[16/10] w-full"
                />
                <div className="border-t border-line bg-navy px-5 py-6 text-left text-mist sm:px-7 sm:py-8">
                  <p className="type-stack-index text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div className="mt-4 [&_.type-stack-title]:text-mist [&_.type-body]:text-mist/85 [&_.font-mono-label]:text-mist/70 [&_a]:text-gold [&_li]:border-mist/25 [&_li]:text-mist/80 [&_p.font-mono-label]:text-gold">
                    <ProjectStackCopy
                      project={project}
                      index={index}
                      total={total}
                    />
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* Desktop sticky stack */}
        <div className="relative mt-16 hidden min-w-0 lg:grid lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-14 xl:gap-16">
          <div className="sticky top-[calc(var(--nav-height)+0.75rem)] self-start">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-navy">
              {projects.map((project, index) => {
                const behind = index !== active;
                return (
                  <div
                    key={`visual-${project.slug}`}
                    data-work-stack-visual
                    className={`absolute inset-0 origin-center transition-transform duration-500 ease-out ${
                      behind
                        ? "pointer-events-none translate-y-3 scale-[0.96]"
                        : "translate-y-0 scale-100"
                    }`}
                    aria-hidden={behind}
                  >
                    <ProjectCover
                      project={project}
                      priority={index === 0}
                      decorative={behind}
                      className="h-full w-full"
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="type-stack-index text-navy" aria-live="polite">
                {String(active + 1).padStart(2, "0")}
                <span className="font-mono-label ml-2 text-ink-soft">/ {total}</span>
              </p>
              <div className="h-px flex-1 bg-line">
                <div
                  data-work-stack-progress
                  className="h-px origin-left scale-x-0 bg-gold"
                />
              </div>
            </div>
            {activeIsScrollableCover ? (
              <p className="mt-2 font-mono-label text-ink-soft">
                Scroll image to see full page
              </p>
            ) : null}
          </div>

          <ul className="flex min-w-0 flex-col" data-work-stack-list>
            {projects.map((project, index) => {
              const isActive = index === active;
              const panelTone =
                index % 2 === 0
                  ? "bg-navy text-mist [&_.type-stack-title]:text-mist [&_.type-body]:text-mist/85 [&_.font-mono-label]:text-mist/65 [&_p.font-mono-label]:text-gold [&_li]:border-mist/25 [&_li]:text-mist/80 [&_.type-stack-index]:text-gold"
                  : "bg-surface-dim text-navy";

              return (
                <li
                  key={`row-${project.slug}`}
                  data-work-stack-row
                  id={project.slug === "crowley" ? "enterprise" : undefined}
                  className={`min-h-[min(48vh,26rem)] transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-45"
                  }`}
                >
                  <Link
                    href={project.href}
                    data-cursor="Open"
                    onClick={() =>
                      track("case_study_open", {
                        slug: project.slug,
                        source: "home_leadership_work",
                      })
                    }
                    onFocus={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    className={`block min-h-[min(48vh,26rem)] px-8 py-10 text-left xl:px-10 xl:py-12 ${panelTone}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <p className="type-stack-index">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <div className="mt-5">
                      <ProjectStackCopy
                        project={project}
                        index={index}
                        total={total}
                        showCta={false}
                      />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
