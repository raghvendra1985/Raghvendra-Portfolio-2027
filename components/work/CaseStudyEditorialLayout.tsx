"use client";

import Image from "next/image";
import ImageReveal from "@/components/reveal/ImageReveal";
import { CaseStudyMediaGrid } from "@/components/work/CaseStudyFrameInterlude";
import type { CaseStudyFrame } from "@/case-studies";

function isGifFrame(frame: CaseStudyFrame) {
  return frame.src.endsWith(".gif") || frame.kind === "gif";
}

/**
 * Option B — Editorial alternate:
 * Full-width alternating image/caption rows for product phones,
 * compact GIF accent strip, then 2-col process grid.
 */
export default function CaseStudyEditorialLayout({
  product,
  process,
  client,
}: {
  product: CaseStudyFrame[];
  process: CaseStudyFrame[];
  client: string;
}) {
  const phones = product.filter((frame) => !isGifFrame(frame));
  const motion = product.filter(isGifFrame);

  return (
    <>
      {phones.length ? (
        <section
          className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20"
          data-case-editorial="product"
          aria-label={`${client} product`}
        >
          <p className="font-mono-label text-green" data-case-chapter>
            Product
          </p>
          <ul className="mt-10 space-y-16 sm:space-y-20">
            {phones.map((frame, index) => {
              const imageLeft = index % 2 === 0;
              return (
                <li key={frame.src} data-case-gallery>
                  <figure
                    className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                      imageLeft ? "" : "lg:[&>*:first-child]:order-2"
                    }`}
                  >
                    <ImageReveal
                      className="relative mx-auto aspect-[3/4] w-full max-w-md bg-surface-dim lg:mx-0 lg:max-w-none"
                      src={frame.src}
                      alt={`${client} — product ${index + 1}`}
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      objectFit="contain"
                      parallax={0.05}
                    />
                    <figcaption className="max-w-xl">
                      <p className="font-mono-label text-ink-soft">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      {frame.caption ? (
                        <p className="mt-3 text-lg leading-snug text-navy sm:text-xl">
                          {frame.caption}
                        </p>
                      ) : null}
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {motion.length ? (
        <section
          className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20"
          data-case-editorial="motion"
          aria-label={`${client} motion`}
        >
          <p className="font-mono-label text-green" data-case-chapter>
            Motion
          </p>
          <ul className="mt-8 flex flex-wrap items-end justify-start gap-8 sm:gap-10">
            {motion.map((frame, index) => (
              <li key={frame.src} data-case-gallery className="w-[7.5rem] sm:w-36">
                <figure>
                  <div className="relative aspect-square w-full overflow-hidden bg-surface-dim">
                    <Image
                      src={frame.src}
                      alt={
                        frame.caption
                          ? `${client} — ${frame.caption}`
                          : `${client} — motion ${index + 1}`
                      }
                      fill
                      unoptimized
                      sizes="9rem"
                      className="object-contain object-center"
                    />
                  </div>
                  {frame.caption ? (
                    <figcaption className="mt-3 text-sm leading-snug text-ink-soft">
                      {frame.caption}
                    </figcaption>
                  ) : null}
                </figure>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <CaseStudyMediaGrid
        frames={process}
        client={client}
        label="Process"
        slot="process"
      />
    </>
  );
}
