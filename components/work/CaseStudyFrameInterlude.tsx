"use client";

import Image from "next/image";
import ImageReveal from "@/components/reveal/ImageReveal";
import type { CaseStudyFrame } from "@/case-studies";

function isPortraitProduct(src: string) {
  return (
    src.endsWith(".gif") ||
    (src.endsWith(".jpg") && src.includes("/gallery-"))
  );
}

/**
 * 1–2 product frames placed beside a narrative beat (Option A interludes).
 */
export default function CaseStudyFrameInterlude({
  frames,
  client,
  slot,
}: {
  frames: CaseStudyFrame[];
  client: string;
  /** Debug / analytics slot id */
  slot: string;
}) {
  if (!frames.length) return null;

  return (
    <section
      className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20"
      data-case-interlude={slot}
      aria-label={`${client} — ${slot}`}
    >
      <ul
        className={`mt-2 grid gap-10 ${
          frames.length > 1 ? "sm:grid-cols-2" : "max-w-xl"
        }`}
      >
        {frames.map((frame, index) => {
          const portrait = isPortraitProduct(frame.src);
          return (
            <li key={frame.src} data-case-gallery>
              <figure>
                <ImageReveal
                  className={
                    portrait
                      ? "relative mx-auto aspect-[3/4] w-full max-w-md bg-surface-dim"
                      : "relative aspect-[16/10] w-full bg-surface-dim"
                  }
                  src={frame.src}
                  alt={`${client} — ${slot} ${index + 1}`}
                  sizes={
                    portrait
                      ? "(min-width: 640px) 24rem, 100vw"
                      : "(min-width: 1024px) 40vw, 100vw"
                  }
                  objectFit="contain"
                  parallax={0.04}
                />
                {frame.caption ? (
                  <figcaption className="mt-4 max-w-xl text-base leading-snug text-navy sm:text-lg">
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

/**
 * Balanced 2-col evidence grid (process photos or remaining product).
 */
export function CaseStudyMediaGrid({
  frames,
  client,
  label,
  slot,
}: {
  frames: CaseStudyFrame[];
  client: string;
  label: string;
  slot: string;
}) {
  if (!frames.length) return null;

  return (
    <section
      className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20"
      data-case-media-grid={slot}
      aria-label={`${client} — ${label}`}
    >
      <p className="font-mono-label text-green" data-case-chapter>
        {label}
      </p>
      <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:gap-12">
        {frames.map((frame, index) => {
          const portrait = isPortraitProduct(frame.src);
          return (
            <li key={frame.src} data-case-gallery>
              <figure>
                <div
                  className={
                    portrait
                      ? "relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden bg-surface-dim"
                      : "relative aspect-[16/10] w-full overflow-hidden bg-surface-dim"
                  }
                >
                  <Image
                    src={frame.src}
                    alt={`${client} — ${label} ${index + 1}`}
                    fill
                    sizes={
                      portrait
                        ? "(min-width: 640px) 24rem, 100vw"
                        : "(min-width: 1024px) 45vw, 100vw"
                    }
                    unoptimized={frame.src.endsWith(".gif")}
                    className="object-contain object-center"
                  />
                </div>
                {frame.caption ? (
                  <figcaption className="mt-4 max-w-xl text-base leading-snug text-navy sm:text-lg">
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
