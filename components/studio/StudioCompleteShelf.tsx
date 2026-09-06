"use client";

import { CompleteShelfLandingPage } from "@designcodeio/threeui/components/CompleteShelfLandingPage";
import "@designcodeio/threeui/style.css";
import { useExperience } from "@/components/providers/ExperienceProvider";

/**
 * Studio Library stage — exact ThreeUI CompleteShelfLandingPage
 * (canonical HTML at /landing-pages/complete-shelf-v2.html).
 */
export default function StudioCompleteShelf() {
  const { config, pageReady } = useExperience();
  const allowMotion = pageReady && !config.reducedMotion;

  return (
    <div
      className="shader-frame studio-complete-shelf"
      aria-label="Working Volumes bookshelf"
    >
      {allowMotion ? (
        <CompleteShelfLandingPage
          headingFont="iowan-old-style"
          bodyFont="inter"
          headingWeight="400"
          bodyWeight="400"
          primaryColor="#c87046"
          headingSize={60}
          bodySize={12}
          headingLetterSpacing={-0.055}
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center px-[var(--page-pad)]"
          role="img"
          aria-label="Working Volumes — Seven Tools for Making"
        >
          <p className="max-w-md text-center text-sm leading-relaxed text-[#f4eee6]/90">
            Working Volumes — a Seven Tools bookshelf. Motion is reduced in this
            session, so the interactive shelf stays paused.
          </p>
        </div>
      )}
    </div>
  );
}
