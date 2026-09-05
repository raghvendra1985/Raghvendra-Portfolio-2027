"use client";

import Image from "next/image";
import type { CaseStudyFrame } from "@/case-studies";

/** Compact wireframe GIF grid used after product stack / editorial motion. */
export default function CaseStudyWireframesGrid({
  frames,
  client,
}: {
  frames: CaseStudyFrame[];
  client: string;
}) {
  if (!frames.length) return null;

  return (
    <section
      className="mx-auto max-w-[1440px] min-w-0 px-[var(--page-pad)] pb-20"
      data-case-editorial="wireframes"
      aria-label={`${client} wireframes`}
    >
      <p className="font-mono-label text-green" data-case-chapter>
        Wireframes
      </p>
      <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {frames.map((frame, index) => (
          <li key={frame.src} data-case-gallery className="min-w-0">
            <figure>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-dim">
                <Image
                  src={frame.src}
                  alt={
                    frame.caption
                      ? `${client} — ${frame.caption}`
                      : `${client} — wireframe ${index + 1}`
                  }
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-contain object-center"
                />
              </div>
              {frame.caption ? (
                <figcaption className="mt-3 type-small text-navy">{frame.caption}</figcaption>
              ) : null}
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function isWireframeFrame(frame: CaseStudyFrame) {
  return frame.src.includes("/wireframes/");
}

export function isMotionGifFrame(frame: CaseStudyFrame) {
  const isGif = frame.src.endsWith(".gif") || frame.kind === "gif";
  return isGif && !isWireframeFrame(frame);
}
