import type { ReactNode } from "react";
import Image from "next/image";

type Stat = {
  value: string;
  label: string;
  note?: string;
};

export function StatBlock({
  stats,
  className = "",
}: {
  stats: readonly Stat[];
  className?: string;
}) {
  return (
    <ul
      className={`grid gap-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {stats.map((stat) => (
        <li key={`${stat.value}-${stat.label}`}>
          <p className="type-h2 text-navy">{stat.value}</p>
          <p className="mt-2 font-mono-label text-[11px] text-navy/70">
            {stat.label}
          </p>
          {stat.note ? (
            <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-ink-soft">
              {stat.note}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function InsightBlock({
  observation,
  insight,
  response,
  className = "",
}: {
  observation: string;
  insight: string;
  response: string;
  className?: string;
}) {
  const rows = [
    { label: "Observation", body: observation },
    { label: "Insight", body: insight },
    { label: "Response", body: response },
  ] as const;

  return (
    <div
      className={`grid gap-6 border border-line bg-surface p-6 sm:grid-cols-3 sm:gap-0 sm:p-0 ${className}`}
    >
      {rows.map((row, index) => (
        <div
          key={row.label}
          className={`sm:p-6 ${index > 0 ? "sm:border-l sm:border-line" : ""}`}
        >
          <p className="font-mono-label text-[11px] text-navy/60">{row.label}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{row.body}</p>
        </div>
      ))}
    </div>
  );
}

export function ChapterNumber({
  number,
  label,
}: {
  number: string;
  label?: string;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-mono-label text-[11px] text-navy/55">{number}</span>
      {label ? (
        <span className="font-mono-label text-[11px] text-navy/80">{label}</span>
      ) : null}
    </div>
  );
}

export function EditorialStatement({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`max-w-[36ch] type-h2 text-navy ${className}`}>{children}</p>
  );
}

export function DefinitionBlock({
  term,
  body,
  className = "",
}: {
  term: string;
  body: string;
  className?: string;
}) {
  return (
    <div className={`border-l-2 border-navy pl-5 ${className}`}>
      <p className="font-mono-label text-[11px] text-navy/60">Definition</p>
      <h3 className="mt-2 type-h3 text-navy">{term}</h3>
      <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-ink-soft">
        {body}
      </p>
    </div>
  );
}

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export function InterfaceGallery({
  images,
  className = "",
}: {
  images: readonly GalleryImage[];
  className?: string;
}) {
  if (!images.length) return null;
  return (
    <ul className={`grid gap-8 sm:grid-cols-2 ${className}`}>
      {images.map((image) => (
        <li key={image.src}>
          <figure>
            <div className="relative aspect-[16/10] overflow-hidden bg-surface">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {image.caption ? (
              <figcaption className="mt-3 max-w-[48ch] text-sm leading-relaxed text-ink-soft">
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        </li>
      ))}
    </ul>
  );
}

export function ScreenSequence({
  screens,
  className = "",
  aspect = "portrait",
}: {
  screens: readonly GalleryImage[];
  className?: string;
  aspect?: "portrait" | "landscape";
}) {
  if (!screens.length) return null;
  const ratio = aspect === "landscape" ? "aspect-[16/10]" : "aspect-[9/16]";
  return (
    <ol className={`flex gap-4 overflow-x-auto pb-2 ${className}`}>
      {screens.map((screen, index) => (
        <li
          key={screen.src}
          className={`shrink-0 ${aspect === "landscape" ? "w-[min(78vw,320px)]" : "w-[min(72vw,280px)]"}`}
        >
          <p className="font-mono-label text-[11px] text-navy/55">
            {String(index + 1).padStart(2, "0")}
          </p>
          <div className={`relative mt-2 overflow-hidden bg-surface ${ratio}`}>
            <Image
              src={screen.src}
              alt={screen.alt}
              fill
              className="object-cover"
              sizes={aspect === "landscape" ? "320px" : "280px"}
            />
          </div>
          {screen.caption ? (
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {screen.caption}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function BeforeAfter({
  before,
  after,
  className = "",
}: {
  before: GalleryImage;
  after: GalleryImage;
  className?: string;
}) {
  return (
    <div className={`grid gap-6 sm:grid-cols-2 ${className}`}>
      {[
        { label: "Before", image: before },
        { label: "After", image: after },
      ].map((column) => (
        <figure key={column.label}>
          <p className="font-mono-label text-[11px] text-navy/60">{column.label}</p>
          <div className="relative mt-2 aspect-[16/10] overflow-hidden bg-surface">
            <Image
              src={column.image.src}
              alt={column.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {column.image.caption ? (
            <figcaption className="mt-3 text-sm leading-relaxed text-ink-soft">
              {column.image.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
