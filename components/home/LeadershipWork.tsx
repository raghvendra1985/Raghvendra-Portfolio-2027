import Image from "next/image";
import { TrackedLink, TrackedMagneticButton } from "@/components/analytics/TrackedCta";
import SectionReveal from "@/components/reveal/SectionReveal";
import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import {
  getLeadershipProjects,
  leadershipWork,
  type LeadershipProject,
} from "@/home/leadership-home";
import { homeMarks } from "@/visual-language/marks";

function ProjectFigure({
  project,
  priority = false,
  className,
}: {
  project: LeadershipProject;
  priority?: boolean;
  className?: string;
}) {
  const src = project.study.cover;
  const isSvg = Boolean(src?.endsWith(".svg"));

  return (
    <figure className={className}>
      <div className="relative aspect-[4/3] overflow-hidden border border-line bg-navy sm:aspect-[16/10]">
        {src ? (
          <Image
            src={src}
            alt={project.title}
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes="(max-width: 1024px) 100vw, 55vw"
            unoptimized={isSvg}
            className={isSvg ? "object-contain object-center p-4" : "object-cover object-center"}
          />
        ) : (
          <div className="absolute inset-0 bg-surface-dim" aria-hidden="true" />
        )}
      </div>
    </figure>
  );
}

function ProjectCopy({ project }: { project: LeadershipProject }) {
  return (
    <div className="flex min-w-0 flex-col">
      <p className="font-mono-label text-green">{project.kind}</p>
      <h3 className="mt-3 max-w-xl type-h3">{project.title}</h3>
      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="font-mono-label text-navy/70">Role</dt>
          <dd className="mt-1 type-body text-ink">{project.role}</dd>
        </div>
        <div>
          <dt className="font-mono-label text-navy/70">Scope</dt>
          <dd className="mt-1 type-body text-ink">{project.scope}</dd>
        </div>
      </dl>
      <p className="mt-6 max-w-[62ch] type-body text-ink">
        <span className="font-medium text-navy">Challenge. </span>
        {project.challenge}
      </p>
      <p className="mt-4 max-w-[62ch] type-body text-ink">
        <span className="font-medium text-navy">Outcome. </span>
        {project.outcome}
      </p>
      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Capabilities">
        {project.capabilities.map((tag) => (
          <li
            key={tag}
            className="border border-line px-3 py-1.5 font-mono-label text-navy/80"
          >
            {tag}
          </li>
        ))}
      </ul>
      <TrackedLink
        href={project.href}
        className="mt-8 inline-flex min-h-11 items-center font-mono-label text-navy hover:text-green"
        data-cursor="Open"
        event="project_clicked"
        payload={{ from: "home_leadership_work", slug: project.slug }}
      >
        Read case study →
      </TrackedLink>
    </div>
  );
}

export default function LeadershipWork() {
  const projects = getLeadershipProjects();

  return (
    <SectionReveal
      id="work"
      className="scroll-mt-[var(--hash-offset)] border-t border-line px-[var(--page-pad)] py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <div
          className="flex w-full flex-col gap-4 md:flex-row md:items-end md:justify-between"
          data-reveal-item
        >
          <div className="flex max-w-3xl items-start gap-4">
            <SystemObjectMark
              src={homeMarks.work.src}
              motion={homeMarks.work.motion}
              surface={homeMarks.work.surface}
            />
            <div>
              <p className="font-mono-label text-navy/80">{leadershipWork.eyebrow}</p>
              <h2 className="mt-4 type-h2">{leadershipWork.title}</h2>
              <p className="mt-4 max-w-[62ch] type-body text-ink-soft">{leadershipWork.intro}</p>
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

        <div className="mt-10 space-y-12 sm:mt-16 lg:space-y-24">
          {projects.map((project, index) => {
            const isWide = project.layout === "wide";
            const isCopyLed = project.layout === "copy-led";

            return (
              <article
                key={project.slug}
                id={project.slug === "crowley" ? "enterprise" : undefined}
                data-reveal-item
                className={
                  isWide
                    ? "grid gap-6 border border-line bg-paper p-4 sm:p-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-12 lg:p-10"
                    : isCopyLed
                      ? "grid items-center gap-6 rounded-none bg-surface-dim p-4 sm:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 lg:p-10"
                      : "grid items-center gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14"
                }
              >
                <ProjectFigure
                  project={project}
                  priority={index === 0}
                  className={isCopyLed ? "lg:order-2" : undefined}
                />
                <ProjectCopy project={project} />
              </article>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
}
