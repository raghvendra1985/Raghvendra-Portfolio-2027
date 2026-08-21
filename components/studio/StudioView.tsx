"use client";

import Link from "next/link";
import PageHero from "@/components/reveal/PageHero";
import SectionReveal from "@/components/reveal/SectionReveal";
import ImageReveal from "@/components/reveal/ImageReveal";
import MagneticButton from "@/components/buttons/MagneticButton";
import LibraryShelf from "@/components/studio/LibraryShelf";
import ObjectStillLife from "@/components/studio/ObjectStillLife";
import HelixSpiral from "@/components/studio/HelixSpiral";
import StudioTicker from "@/components/studio/StudioTicker";
import StudioCard from "@/components/studio/StudioCard";
import StudioStage from "@/components/studio/StudioStage";
import { companionPhotos, studioCoverSlides, studioPage, studioTopics } from "@/studio";

function OptionalPhotos({
  images,
  sizes,
}: {
  images: { src: string; alt: string }[];
  sizes: string;
}) {
  if (!images.length) return null;
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
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
  const { habitat, motion, objects, resources, ritual, teaching } = studioPage;
  const covers = studioCoverSlides();
  const tickerItems = Array.from(
    new Set([
      ...studioTopics.filter((topic) => topic !== "All"),
      ...habitat.companions.map((companion) => companion.kind),
      ...objects.map((object) => object.use),
    ]),
  );

  return (
    <>
      <PageHero
        index="03"
        label="Studio"
        title={studioPage.heroTitle}
        description={studioPage.heroDescription}
      />

      <StudioTicker items={tickerItems} />

      <SectionReveal className="mx-auto max-w-[1440px] px-[var(--page-pad)] py-20">
        <div className="relative max-w-3xl">
          <StudioCard>
            <p className="font-mono-label text-ink-soft" data-reveal-item>
              A week
            </p>
            <p
              data-reveal-item
              className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg"
            >
              {ritual}
            </p>
          </StudioCard>
          <StudioCard offset className="relative z-[1] mt-6">
            <p data-reveal-item className="text-sm leading-relaxed text-ink-soft">
              {habitat.dedication}
            </p>
          </StudioCard>
        </div>
      </SectionReveal>

      {covers.length ? (
        <SectionReveal className="border-y border-line">
          <StudioStage label="Studio covers">
            <HelixSpiral items={covers} />
          </StudioStage>
        </SectionReveal>
      ) : null}

      {studioPage.rooms.map((room) => (
        <SectionReveal key={room.src} className="border-b border-line">
          <StudioStage label={room.title}>
            <div className="pt-14" data-reveal-item>
              <ImageReveal
                src={room.src}
                alt={room.alt}
                className="aspect-[4/3] w-full bg-navy md:aspect-[16/10]"
                sizes="100vw"
                parallax={0.03}
              />
            </div>
          </StudioStage>
        </SectionReveal>
      ))}

      <SectionReveal
        id="library"
        className="scroll-mt-28 px-[var(--page-pad)] py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="border border-line bg-paper p-6 sm:p-10">
            <h2 className="type-statement" data-reveal-item>
              Library
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft" data-reveal-item>
              A working shelf — books, essays, podcasts, and a few objects that changed how I work
              or live. Replace as the shelf changes.
            </p>
            <p className="mt-3 max-w-xl font-mono-label text-ink-soft" data-reveal-item>
              Book links to Amazon are affiliate links. I earn from qualifying purchases.
            </p>
            <LibraryShelf resources={resources} />
          </div>
        </div>
      </SectionReveal>

      <SectionReveal
        id="habitat"
        className="scroll-mt-28 border-t border-line bg-surface-dim px-[var(--page-pad)] py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <h2 className="type-h2" data-reveal-item>
            {habitat.title}
          </h2>
          <p
            data-reveal-item
            className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft"
          >
            {habitat.body}
          </p>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {habitat.companions.map((companion) => {
              const photos = companionPhotos(companion);
              return (
                <li key={companion.kind} data-reveal-item>
                  <StudioCard className="h-full">
                    {photos.length ? (
                      <div
                        className={`mb-5 grid gap-2 ${photos.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
                      >
                        {photos.map((photo) => (
                          <ImageReveal
                            key={photo.src}
                            src={photo.src}
                            alt={photo.alt}
                            className={
                              photos.length > 1 ? "aspect-square bg-mist" : "aspect-[16/10] bg-mist"
                            }
                            sizes="(min-width: 640px) 22vw, 45vw"
                            parallax={0.03}
                          />
                        ))}
                      </div>
                    ) : null}
                    <p className="font-mono-label text-green">{companion.kind}</p>
                    {companion.name ? (
                      <h3 className="mt-2 type-h3">{companion.name}</h3>
                    ) : null}
                    <p className="mt-3 text-sm leading-relaxed text-navy">{companion.line}</p>
                  </StudioCard>
                </li>
              );
            })}
          </ul>

          <StudioCard className="mt-8" data-reveal-item>
            <p className="font-mono-label text-ink-soft">Garden</p>
            <ul className="mt-4 max-w-xl space-y-2 text-sm leading-relaxed text-ink-soft">
              {habitat.plants.map((plant) => (
                <li key={plant}>{plant}</li>
              ))}
            </ul>
            <OptionalPhotos
              images={habitat.images}
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            />
          </StudioCard>
        </div>
      </SectionReveal>

      <SectionReveal
        id="motion"
        className="scroll-mt-28 border-t border-line px-[var(--page-pad)] py-24"
      >
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-2 lg:items-end">
          <div data-reveal-item>
            <h2 className="type-h2">{motion.title}</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">
              {motion.body}
            </p>
          </div>
          <StudioCard data-reveal-item className="min-h-[220px]">
            <OptionalPhotos images={motion.images} sizes="(min-width: 1024px) 40vw, 100vw" />
          </StudioCard>
        </div>
      </SectionReveal>

      <SectionReveal
        id="objects"
        className="scroll-mt-28 border-t border-line px-[var(--page-pad)] py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <h2 className="type-h2" data-reveal-item>
            Objects
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft" data-reveal-item>
            What stays on the table, in the kit, or by the plants. Not a store.
          </p>
          <ul className="mt-12">
            {objects.map((object, index) => (
              <li
                key={object.name}
                data-reveal-item
                className="grid gap-6 border-t border-line py-10 md:grid-cols-[72px_200px_1fr]"
              >
                <p className="font-mono-label text-gold">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <p className="font-mono-label text-ink-soft">{object.use}</p>
                  {object.illustration ? (
                    <ObjectStillLife kind={object.illustration} />
                  ) : object.image ? (
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
                  <h3 className="type-h3">{object.name}</h3>
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
            <p className="font-mono-label text-ink-soft">{teaching.title}</p>
            <h2 className="mt-3 max-w-lg type-h3">{teaching.body}</h2>
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
          className="flex flex-col items-start justify-between gap-8 border border-line bg-paper p-6 sm:flex-row sm:items-end sm:p-10"
        >
          <div>
            <p className="font-mono-label text-ink-soft">Work with Singh</p>
            <h2 className="mt-3 max-w-lg type-h3">
              The studio is personal. The work is still available.
            </h2>
          </div>
          <MagneticButton href="/contact">Initiate inquiry</MagneticButton>
        </div>
      </SectionReveal>
    </>
  );
}
