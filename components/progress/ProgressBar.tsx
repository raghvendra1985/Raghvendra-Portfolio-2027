"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { animateProgress } from "@/animations/parallax";
import { useExperience } from "@/components/providers/ExperienceProvider";

function modeForPath(pathname: string) {
  if (pathname.startsWith("/work/")) return "case-study";
  if (/^\/knowledge\/.+/.test(pathname)) return "article";
  if (pathname.startsWith("/knowledge")) return "knowledge";
  return "site";
}

export default function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { config } = useExperience();
  const mode = modeForPath(pathname);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    const ctx = animateProgress(bar, config);
    return () => ctx.revert();
  }, [config, pathname]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]"
      role="progressbar"
      aria-label={`${mode} reading progress`}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        ref={ref}
        data-progress={mode}
        className={`progress-bar h-full ${
          mode === "knowledge" || mode === "article" ? "bg-green" : "bg-gold"
        }`}
      />
    </div>
  );
}
