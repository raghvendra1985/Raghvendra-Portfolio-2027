"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { animateHero } from "@/animations/hero";
import SectionReveal from "@/components/reveal/SectionReveal";
import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { buildPage } from "@/build";
import { homeMarks } from "@/visual-language/marks";

export default function BuildView() {
  const heroRef = useRef<HTMLElement>(null);
  const { config, pageReady } = useExperience();

  useEffect(() => {
    const root = heroRef.current;
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
    <>
      <header
        ref={heroRef}
        className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-14 pt-32 sm:pb-16 sm:pt-40"
      >
        <div className="flex items-center gap-4">
          <span data-hero-visual>
            <SystemObjectMark
              src={homeMarks.work.src}
              motion={homeMarks.work.motion}
              surface={homeMarks.work.surface}
            />
          </span>
          <p data-hero-copy className="font-mono-label text-navy">
            {buildPage.heroEyebrow}
          </p>
        </div>
        <h1
          data-hero-headline
          className="mt-4 max-w-[20ch] type-h1 text-navy"
        >
          {buildPage.heroTitle}
        </h1>
        <p
          data-hero-copy
          className="mt-6 max-w-[54ch] type-body text-ink-soft"
        >
          {buildPage.heroDescription}
        </p>
      </header>

      <SectionReveal className="border-t border-line px-[var(--page-pad)] py-14 sm:py-20">
        <div className="mx-auto max-w-[1440px]" data-reveal-item>
          <p className="font-mono-label text-navy/70">Definition</p>
          <h2 className="mt-4 max-w-[28ch] type-h2">{buildPage.definition.term}</h2>
          <p className="mt-4 max-w-[52ch] type-body text-ink-soft">
            {buildPage.definition.body}
          </p>
        </div>
      </SectionReveal>

      <SectionReveal className="border-t border-line px-[var(--page-pad)] pb-20 sm:pb-28">
        <div className="mx-auto max-w-[1440px]">
          <ul className="space-y-0 border-t border-line">
            {buildPage.projects.map((project) => (
              <li
                key={project.slug}
                className="grid gap-8 border-b border-line py-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14"
                data-reveal-item
              >
                <Link
                  href={project.href}
                  className="group relative aspect-[16/10] overflow-hidden bg-surface"
                  aria-label={`${project.title} case study`}
                >
                  {project.cover ? (
                    <Image
                      src={project.cover}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                  ) : null}
                </Link>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h2 className="type-h3 text-navy">{project.title}</h2>
                    <span className="font-mono-label text-[11px] text-ink-soft">
                      {project.year}
                    </span>
                  </div>
                  <p className="mt-2 font-mono-label text-[11px] text-navy/60">
                    {project.role} · {project.status}
                  </p>
                  <dl className="mt-8 space-y-5">
                    {(
                      [
                        ["Problem", project.problem],
                        ["Build", project.build],
                        ["Stack", project.stack],
                        ["Learning", project.learning],
                      ] as const
                    )
                      .filter(([, value]) => !value.startsWith("[CONTENT REQUIRED]"))
                      .map(([label, value]) => (
                      <div key={label}>
                        <dt className="font-mono-label text-[11px] text-navy/55">
                          {label}
                        </dt>
                        <dd className="mt-1.5 max-w-[52ch] text-sm leading-relaxed text-ink-soft">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <Link
                    href={project.href}
                    className="mt-8 inline-flex min-h-11 items-center font-mono-label text-navy hover:underline"
                  >
                    Read case study →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </SectionReveal>

      <SectionReveal className="border-t border-line bg-navy px-[var(--page-pad)] py-16 text-mist sm:py-20">
        <div className="mx-auto max-w-[1440px]" data-reveal-item>
          <h2 className="max-w-[28ch] type-h2 text-mist">{buildPage.close.title}</h2>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={buildPage.close.primary.href}
              className="inline-flex min-h-11 items-center border border-mist/40 px-5 font-mono-label text-mist hover:bg-mist hover:text-navy"
            >
              {buildPage.close.primary.label}
            </Link>
            <Link
              href={buildPage.close.secondary.href}
              className="inline-flex min-h-11 items-center font-mono-label text-mist hover:underline"
            >
              {buildPage.close.secondary.label} →
            </Link>
          </div>
        </div>
      </SectionReveal>
    </>
  );
}
