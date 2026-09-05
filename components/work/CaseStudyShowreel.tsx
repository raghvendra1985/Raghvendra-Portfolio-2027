"use client";

import { useEffect, useRef } from "react";
import { useExperience } from "@/components/providers/ExperienceProvider";
import type { CaseStudyShowreel } from "@/case-studies";

/**
 * Muted inline showreel strip. Respects prefers-reduced-motion (no autoplay).
 */
export default function CaseStudyShowreel({
  items,
  label = "Showreel",
}: {
  items: CaseStudyShowreel[];
  label?: string;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const { config } = useExperience();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const videos = Array.from(root.querySelectorAll<HTMLVideoElement>("video"));

    if (config.reducedMotion) {
      videos.forEach((video) => {
        video.pause();
        video.removeAttribute("autoplay");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
            void video.play().catch(() => {
              /* autoplay may be blocked — controls remain */
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0.45] },
    );

    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, [config.reducedMotion, items]);

  if (!items.length) return null;

  return (
    <section
      ref={rootRef}
      className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20"
      aria-label={label}
    >
      <p className="font-mono-label text-green" data-case-chapter>
        {label}
      </p>
      <ul className="mt-10 grid gap-10 md:grid-cols-2">
        {items.map((item) => (
          <li key={item.src} data-case-gallery>
            <figure>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-dim">
                <video
                  className="h-full w-full object-contain"
                  src={item.src}
                  poster={item.poster}
                  muted
                  playsInline
                  loop
                  controls
                  preload="metadata"
                  aria-label={item.caption}
                />
              </div>
              {item.caption ? (
                <figcaption className="mt-4 max-w-xl text-lg leading-snug text-navy">
                  {item.caption}
                </figcaption>
              ) : null}
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
