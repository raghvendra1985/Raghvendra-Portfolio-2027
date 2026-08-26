"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import SectionReveal from "@/components/reveal/SectionReveal";
import ImageReveal from "@/components/reveal/ImageReveal";
import LibraryLane from "@/components/studio/LibraryLane";
import StudioHover from "@/components/studio/StudioHover";
import { animateHero } from "@/animations/hero";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { companionPhotos, studioPage } from "@/studio";

const tileReveal = { stagger: 0.045, translate: 24 };

/** Prefer lived ride photos over Strava screenshots for the scatter. */
const CADENCE_SCATTER = [
  "/assets/studio/rides/01.jpg",
  "/assets/studio/rides/05.jpg",
  "/assets/studio/rides/03.jpg",
  "/assets/studio/rides/04.jpg",
  "/assets/studio/rides/07.jpg",
] as const;

const scatterClass = [
  "col-span-3 row-span-3",
  "col-span-3 row-span-2",
  "col-span-2 row-span-2",
  "col-span-2 row-span-2",
  "col-span-2 row-span-2",
] as const;

function Cover({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div data-studio-cover className="h-full w-full">
        {children}
      </div>
    </div>
  );
}

function StudioHero() {
  const rootRef = useRef<HTMLElement>(null);
  const { config, pageReady } = useExperience();
  const desk = studioPage.rooms[0];

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
      className="mx-auto grid max-w-[1440px] items-end gap-10 px-[var(--page-pad)] pb-14 pt-32 sm:pt-40 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12"
    >
      <div>
        <p data-hero-copy className="font-mono-label text-gold">
          Studio
        </p>
        <h1 data-hero-headline className="mt-3.5 max-w-[32rem] type-h1 text-navy">
          {studioPage.heroTitle}
        </h1>
        {/*
          Body stays outside data-hero-copy on purpose: animateHero fades
          [data-hero-copy] with GSAP autoAlpha (opacity + visibility:hidden),
          which briefly drops the node from the accessibility tree. Keep the
          thesis readable from first paint; only the label/photo take the
          entrance fade. Failsafe in animations/hero.ts is 1400ms.
        */}
        <p className="mt-5 max-w-[28rem] text-sm leading-relaxed text-ink-soft sm:text-base">
          {studioPage.heroDescription} {studioPage.ritual}
        </p>
      </div>
      {desk ? (
        <div data-hero-copy>
          <StudioHover lift={false}>
            <Cover>
              <ImageReveal
                src={desk.src}
                alt={desk.alt}
                className="aspect-[4/5] w-full bg-surface-dim"
                sizes="(min-width: 1024px) 40vw, 100vw"
                parallax={0.03}
                priority
              />
            </Cover>
          </StudioHover>
        </div>
      ) : null}
    </header>
  );
}

export default function StudioView() {
  const { habitat, motion, objects, resources, teaching } = studioPage;
  const photoCompanions = habitat.companions.filter(
    (companion) => companionPhotos(companion).length > 0,
  );
  const textCompanions = habitat.companions.filter(
    (companion) => companionPhotos(companion).length === 0,
  );
  const gardenLine = habitat.plants.join(". ");
  const cadenceImages = CADENCE_SCATTER.map((src) =>
    motion.images.find((image) => image.src === src),
  ).filter((image): image is (typeof motion.images)[number] => Boolean(image));

  return (
    <>
      <StudioHero />

      <SectionReveal className="border-t border-line px-[var(--page-pad)] py-16 sm:py-20">
        <blockquote className="mx-auto max-w-xl text-center" data-reveal-item>
          <p className="type-h3 text-navy">“{habitat.dedication}”</p>
          <footer className="mt-3.5 text-sm text-ink-soft">— on who else lives here</footer>
        </blockquote>
      </SectionReveal>

      <SectionReveal className="border-t border-line px-[var(--page-pad)] py-16 sm:py-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-5 lg:grid-cols-[7fr_5fr] lg:items-start">
            {studioPage.rooms[0] ? (
              <figure data-reveal-item>
                <StudioHover lift={false}>
                  <Cover>
                    <ImageReveal
                      src={studioPage.rooms[0].src}
                      alt={studioPage.rooms[0].alt}
                      className="aspect-[5/4] w-full bg-surface-dim"
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      parallax={0.03}
                    />
                  </Cover>
                </StudioHover>
              </figure>
            ) : null}
            {studioPage.rooms[1] ? (
              <figure data-reveal-item className="lg:mt-16">
                <StudioHover lift={false}>
                  <Cover>
                    <ImageReveal
                      src={studioPage.rooms[1].src}
                      alt={studioPage.rooms[1].alt}
                      className="aspect-[4/5] w-full bg-surface-dim"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      parallax={0.03}
                    />
                  </Cover>
                </StudioHover>
              </figure>
            ) : null}
          </div>
          <p
            data-reveal-item
            className="mt-4 max-w-[38ch] text-sm leading-relaxed text-ink-soft"
          >
            Desk. Wall. The pegboard holds tools and a ukulele; the whiteboard holds goals that are
            allowed to be wrong for a while.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal
        id="library"
        className="scroll-mt-28 border-t border-line px-[var(--page-pad)] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-7 flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <h2 className="type-h2" data-reveal-item>
                Library
              </h2>
              <p
                data-reveal-item
                className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-soft"
              >
                A working shelf — books, essays, podcasts, and a few objects that changed how I work
                or live. Replace as the shelf changes.
              </p>
              <p className="mt-2 font-mono-label text-ink-soft" data-reveal-item>
                Book links to Amazon are affiliate links. I earn from qualifying purchases.
              </p>
            </div>
            <p className="font-mono-label text-ink-soft" data-reveal-item>
              Hover or focus a cover for the note
            </p>
          </div>
          <div data-reveal-item>
            <LibraryLane resources={resources} />
          </div>
        </div>
      </SectionReveal>

      <SectionReveal
        id="habitat"
        className="scroll-mt-28 border-t border-line bg-surface-dim px-[var(--page-pad)] py-16 sm:py-24"
        options={tileReveal}
      >
        <div className="mx-auto max-w-[1440px]">
          <h2 className="type-h2" data-reveal-item>
            {habitat.title}
          </h2>
          <p
            data-reveal-item
            className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft"
          >
            {habitat.body}
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr_1fr]">
            {photoCompanions.map((companion) => {
              const photos = companionPhotos(companion);
              const lead = photos[0];
              return (
                <article key={companion.kind} data-reveal-item>
                  {lead ? (
                    <Cover className="mb-3">
                      <ImageReveal
                        src={lead.src}
                        alt={lead.alt}
                        className="aspect-[3/4] bg-mist"
                        sizes="(min-width: 1024px) 28vw, 90vw"
                        parallax={0.03}
                      />
                    </Cover>
                  ) : null}
                  <h3 className="type-h3">{companion.name ?? companion.kind}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{companion.line}</p>
                </article>
              );
            })}

            <div data-reveal-item>
              {textCompanions.map((companion) => (
                <div
                  key={companion.kind}
                  className="border-t border-line py-4 first:border-t-0 first:pt-0"
                >
                  <h3 className="type-h3">{companion.kind}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{companion.line}</p>
                </div>
              ))}
              <div className="border-t border-line py-4">
                <h3 className="type-h3">Garden</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{gardenLine}.</p>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal
        id="motion"
        className="scroll-mt-28 border-t border-line px-[var(--page-pad)] py-16 sm:py-24"
        options={tileReveal}
      >
        <div className="mx-auto max-w-[1440px]">
          <div data-reveal-item className="mb-8 max-w-xl">
            <h2 className="type-h2">{motion.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft sm:text-base">
              {motion.body}
            </p>
          </div>

          {cadenceImages.length ? (
            <div
              data-reveal-item
              className="grid auto-rows-[90px] grid-cols-2 gap-3.5 sm:grid-cols-6"
            >
              {cadenceImages.map((image, index) => (
                <div
                  key={image.src}
                  className={`overflow-hidden bg-surface-dim ${scatterClass[index] ?? "col-span-2 row-span-2"} ${
                    index === 0
                      ? "max-sm:col-span-2 max-sm:row-span-2"
                      : "max-sm:col-span-1 max-sm:row-span-1"
                  }`}
                >
                  <Cover className="h-full">
                    <ImageReveal
                      src={image.src}
                      alt={image.alt}
                      className="h-full min-h-[120px] w-full"
                      sizes="(min-width: 640px) 30vw, 50vw"
                      parallax={0.02}
                    />
                  </Cover>
                </div>
              ))}
            </div>
          ) : null}

          <p
            data-reveal-item
            className="mt-5 max-w-xl text-sm italic leading-relaxed text-ink-soft"
          >
            A dozen kilometres before a call, most weeks. The map matters less than the habit of
            leaving the house.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal
        id="objects"
        className="scroll-mt-28 border-t border-line px-[var(--page-pad)] py-16 sm:py-24"
        options={tileReveal}
      >
        <div className="mx-auto max-w-[1440px]">
          <h2 className="type-h2" data-reveal-item>
            Objects
          </h2>
          <ul className="mt-6 max-w-xl">
            {objects.map((object, index) => (
              <li
                key={object.name}
                data-reveal-item
                className="flex gap-4 border-t border-line py-4 first:border-t-0"
              >
                <span className="w-6 shrink-0 font-display text-sm font-semibold text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="type-h3">{object.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{object.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </SectionReveal>

      <SectionReveal className="border-t border-line px-[var(--page-pad)] py-16 text-center sm:py-20">
        <div className="mx-auto max-w-xl" data-reveal-item>
          <p className="text-sm leading-relaxed text-ink-soft sm:text-base">{teaching.body}</p>
          <Link
            href={teaching.href}
            className="mt-3.5 inline-flex min-h-11 items-center font-mono-label text-green underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            data-cursor="Open"
          >
            {teaching.cta}
          </Link>
        </div>
      </SectionReveal>
    </>
  );
}
