"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/reveal/PageHero";
import SectionReveal from "@/components/reveal/SectionReveal";
import ImageReveal from "@/components/reveal/ImageReveal";
import MagneticButton from "@/components/buttons/MagneticButton";
import {
  studioPage,
  studioTopics,
  type StudioResource,
  type StudioTopic,
} from "@/studio";
import { amazonProductUrl } from "@/lib/site";

type LibraryView = "list" | "grid";

function resourceKey(item: StudioResource) {
  return `${item.shelf}-${item.title}`;
}

function useResourceLinks(item: StudioResource) {
  const amazonHref = item.amazonAsin ? amazonProductUrl(item.amazonAsin) : undefined;
  const buyHref = amazonHref ?? (item.buyLabel ? item.href : undefined);
  const buyLabel = item.buyLabel ?? (amazonHref ? "Buy on Amazon" : undefined);
  const imageRel = amazonHref ? "sponsored noopener noreferrer" : "noreferrer";
  return { amazonHref, buyHref, buyLabel, imageRel };
}

function ResourceMedia({
  item,
  layout,
  href,
  rel,
  label,
}: {
  item: StudioResource;
  layout: LibraryView;
  href?: string;
  rel: string;
  label?: string;
}) {
  const image = item.image ? (
    <Image
      src={item.image}
      alt={item.imageAlt ?? item.title}
      width={layout === "grid" ? 560 : 280}
      height={layout === "grid" ? 747 : 373}
      unoptimized
      className={
        layout === "grid"
          ? "library-cover h-auto w-full bg-surface-dim"
          : "library-cover h-auto w-[88px] shrink-0 bg-surface-dim sm:w-[112px] lg:w-[140px]"
      }
    />
  ) : (
    <div
      className={
        layout === "grid"
          ? "library-cover flex aspect-[3/4] w-full items-end bg-navy p-4"
          : "library-cover flex h-[117px] w-[88px] shrink-0 items-end bg-navy p-3 sm:h-[149px] sm:w-[112px] lg:h-[187px] lg:w-[140px]"
      }
      aria-hidden="true"
    >
      <p className="font-mono-label text-[11px] text-mist">{item.shelf}</p>
    </div>
  );

  if (!href) return image;

  return (
    <a
      href={href}
      className="shrink-0"
      data-cursor="Open"
      target="_blank"
      rel={rel}
      aria-label={label ? `${label}: ${item.title}` : item.title}
    >
      {image}
    </a>
  );
}

function ResourceActions({
  item,
  amazonHref,
  buyHref,
  buyLabel,
}: {
  item: StudioResource;
  amazonHref?: string;
  buyHref?: string;
  buyLabel?: string;
}) {
  return (
    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
      {item.href && !item.buyLabel ? (
        item.href.startsWith("http") ? (
          <a
            href={item.href}
            className="inline-flex min-h-11 items-center font-mono-label text-navy"
            data-cursor="Open"
            target="_blank"
            rel="noreferrer"
          >
            Open →
          </a>
        ) : (
          <Link
            href={item.href}
            className="inline-flex min-h-11 items-center font-mono-label text-navy"
            data-cursor="Open"
          >
            Read note →
          </Link>
        )
      ) : null}
      {buyHref ? (
        <a
          href={buyHref}
          className="inline-flex min-h-11 items-center font-mono-label text-navy"
          data-cursor="Open"
          target="_blank"
          rel={amazonHref ? "sponsored noopener noreferrer" : "noreferrer"}
        >
          {buyLabel} →
        </a>
      ) : null}
    </div>
  );
}

function ResourceCard({
  item,
  layout,
  inView,
}: {
  item: StudioResource;
  layout: LibraryView;
  inView: boolean;
}) {
  const { amazonHref, buyHref, buyLabel, imageRel } = useResourceLinks(item);
  const meta = `${item.shelf} · ${item.topic}${item.current ? " · Currently reading" : ""}`;
  const copy = (
    <div className={layout === "grid" ? "mt-4 min-w-0" : "min-w-0 flex-1"}>
      <p className="font-mono-label text-[11px] text-gold">{meta}</p>
      <h3 className="mt-3 font-display text-xl sm:text-2xl">{item.title}</h3>
      <p className="mt-1 text-sm text-green">{item.creator}</p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">{item.note}</p>
      <ResourceActions
        item={item}
        amazonHref={amazonHref}
        buyHref={buyHref}
        buyLabel={buyLabel}
      />
    </div>
  );

  return (
    <article
      data-library-item={resourceKey(item)}
      data-in-view={inView ? "true" : "false"}
      className={
        layout === "grid"
          ? "border-t pt-6"
          : "flex items-start gap-5 border-t py-8 sm:gap-8"
      }
    >
      <ResourceMedia
        item={item}
        layout={layout}
        href={buyHref}
        rel={imageRel}
        label={buyLabel}
      />
      {copy}
    </article>
  );
}

function OptionalPhotos({
  images,
  sizes,
}: {
  images: { src: string; alt: string }[];
  sizes: string;
}) {
  if (!images.length) return null;
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image) => (
        <ImageReveal
          key={image.src}
          src={image.src}
          alt={image.alt}
          className="aspect-[16/10] bg-surface-dim"
          sizes={sizes}
          parallax={0.04}
        />
      ))}
    </div>
  );
}

export default function StudioView() {
  const [filter, setFilter] = useState<StudioTopic>("All");
  const [view, setView] = useState<LibraryView>("list");
  const [inViewKey, setInViewKey] = useState<string | null>(null);
  const shelfRef = useRef<HTMLDivElement>(null);
  const { habitat, motion, objects, resources, ritual, teaching } = studioPage;

  const list = useMemo(
    () =>
      filter === "All" ? resources : resources.filter((item) => item.topic === filter),
    [filter, resources],
  );

  useEffect(() => {
    const root = shelfRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-library-item]"));
    const ratios = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target, entry.intersectionRatio);
        }
        let best: Element | null = null;
        let bestRatio = 0;
        for (const [el, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = el;
          }
        }
        const next =
          best && bestRatio > 0.12 ? best.getAttribute("data-library-item") : null;
        setInViewKey(next);
      },
      {
        threshold: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 1],
        rootMargin: "-28% 0px -48% 0px",
      },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [filter, view, list.length]);

  return (
    <>
      <PageHero
        index="03"
        label="Studio"
        title={studioPage.heroTitle}
        description={studioPage.heroDescription}
      />

      <SectionReveal className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
        <p className="font-mono-label text-[11px] text-ink-soft" data-reveal-item>
          A week
        </p>
        <p
          data-reveal-item
          className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg"
        >
          {ritual}
        </p>
      </SectionReveal>

      <SectionReveal
        id="library"
        className="scroll-mt-28 border-t border-line px-[var(--page-pad)] py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <h2 className="font-display text-3xl sm:text-4xl" data-reveal-item>
            Library
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft" data-reveal-item>
            A working shelf — books, essays, podcasts, and a few objects that changed how I work
            or live. Replace as the shelf changes.
          </p>
          <p className="mt-3 max-w-xl font-mono-label text-[11px] text-ink-soft" data-reveal-item>
            Book links to Amazon are affiliate links. I earn from qualifying purchases.
          </p>

          <div
            className="mt-10 flex flex-wrap items-end justify-between gap-4"
            data-reveal-item
          >
            <div
              className="flex flex-wrap gap-2"
              role="toolbar"
              aria-label="Filter library by topic"
            >
              {studioTopics.map((topic) => {
                const pressed = filter === topic;
                return (
                  <button
                    key={topic}
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => setFilter(topic)}
                    className={`min-h-11 border px-4 py-2 font-mono-label ${
                      pressed
                        ? "border-navy bg-navy text-mist"
                        : "border-line text-ink-soft hover:border-navy hover:text-navy"
                    }`}
                  >
                    {topic}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2" role="toolbar" aria-label="Library layout">
              {(["list", "grid"] as const).map((mode) => {
                const pressed = view === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => setView(mode)}
                    className={`min-h-11 border px-4 py-2 font-mono-label ${
                      pressed
                        ? "border-navy bg-navy text-mist"
                        : "border-line text-ink-soft hover:border-navy hover:text-navy"
                    }`}
                  >
                    {mode === "list" ? "List" : "Grid"}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            ref={shelfRef}
            className={
              view === "grid"
                ? "mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
                : "mt-8"
            }
          >
            {list.length ? (
              list.map((item) => (
                <ResourceCard
                  key={resourceKey(item)}
                  item={item}
                  layout={view}
                  inView={inViewKey === resourceKey(item)}
                />
              ))
            ) : (
              <p className="border-t border-line py-8 text-sm text-ink-soft" role="status">
                Nothing on this shelf yet.
              </p>
            )}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal
        id="habitat"
        className="scroll-mt-28 border-t border-line bg-surface-dim px-[var(--page-pad)] py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <h2 className="font-display text-3xl sm:text-4xl" data-reveal-item>
            {habitat.title}
          </h2>
          <p
            data-reveal-item
            className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft"
          >
            {habitat.body}
          </p>
          <p
            data-reveal-item
            className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft"
          >
            {habitat.dedication}
          </p>

          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {habitat.companions.map((companion) => (
              <li key={companion.kind} data-reveal-item className="border-t-2 border-navy pt-4">
                <p className="font-mono-label text-[11px] text-green">{companion.kind}</p>
                <p className="mt-3 text-sm leading-relaxed text-navy">{companion.line}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12" data-reveal-item>
            <p className="font-mono-label text-[11px] text-ink-soft">Garden</p>
            <ul className="mt-4 max-w-xl space-y-2 text-sm leading-relaxed text-ink-soft">
              {habitat.plants.map((plant) => (
                <li key={plant}>{plant}</li>
              ))}
            </ul>
          </div>

          <OptionalPhotos
            images={habitat.images}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          />
        </div>
      </SectionReveal>

      <SectionReveal
        id="motion"
        className="scroll-mt-28 mx-auto max-w-[1440px] px-[var(--page-pad)] py-24"
      >
        <h2 className="font-display text-3xl sm:text-4xl" data-reveal-item>
          {motion.title}
        </h2>
        <p
          data-reveal-item
          className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft"
        >
          {motion.body}
        </p>
        <OptionalPhotos
          images={motion.images}
          sizes="(min-width: 1024px) 40vw, 100vw"
        />
      </SectionReveal>

      <SectionReveal
        id="objects"
        className="scroll-mt-28 border-t border-line px-[var(--page-pad)] py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <h2 className="font-display text-3xl sm:text-4xl" data-reveal-item>
            Objects
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft" data-reveal-item>
            What stays on the table, in the kit, or by the plants. Not a store.
          </p>
          <ul className="mt-12">
            {objects.map((object) => (
              <li
                key={object.name}
                data-reveal-item
                className="grid gap-4 border-t border-line py-8 md:grid-cols-[200px_1fr]"
              >
                <div>
                  <p className="font-mono-label text-[11px] text-ink-soft">{object.use}</p>
                  {object.image ? (
                    <ImageReveal
                      src={object.image}
                      alt={object.imageAlt ?? object.name}
                      className="mt-4 aspect-[16/10] max-w-[200px] bg-surface-dim"
                      sizes="200px"
                      parallax={0}
                    />
                  ) : null}
                </div>
                <div>
                  <h3 className="font-display text-2xl">{object.name}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
                    {object.note}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </SectionReveal>

      <SectionReveal className="border-t border-line bg-surface-dim px-[var(--page-pad)] py-24">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div data-reveal-item>
            <p className="font-mono-label text-[11px] text-ink-soft">{teaching.title}</p>
            <h2 className="mt-3 max-w-lg font-display text-2xl sm:text-3xl">{teaching.body}</h2>
          </div>
          <div data-reveal-item>
            <Link
              href={teaching.href}
              className="inline-flex min-h-11 items-center font-mono-label"
              data-cursor="Open"
            >
              {teaching.cta}
            </Link>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24">
        <div
          data-reveal-item
          className="flex flex-col items-start justify-between gap-8 border border-line p-6 sm:flex-row sm:items-end sm:p-10"
        >
          <div>
            <p className="font-mono-label text-[11px] text-ink-soft">Work with Singh</p>
            <h2 className="mt-3 max-w-lg font-display text-2xl sm:text-3xl">
              The studio is personal. The work is still available.
            </h2>
          </div>
          <MagneticButton href="/contact">Initiate inquiry</MagneticButton>
        </div>
      </SectionReveal>
    </>
  );
}
