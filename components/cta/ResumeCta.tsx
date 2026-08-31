"use client";

import MagneticButton from "@/components/buttons/MagneticButton";
import { track } from "@/lib/analytics";
import { site } from "@/lib/site";

export type ResumeDownloadSource =
  | "home_hero"
  | "home_recruiter"
  | "primary_nav"
  | "about"
  | "contact"
  | "mobile_nav"
  | "footer";

export default function ResumeCta({
  variant = "secondary",
  size = "md",
  appearance = "button",
  source,
  onNavigate,
  className,
  label: labelOverride,
}: {
  variant?: "primary" | "secondary" | "gold";
  size?: "sm" | "md";
  appearance?: "button" | "text";
  source: ResumeDownloadSource;
  onNavigate?: () => void;
  className?: string;
  label?: string;
}) {
  const downloading = Boolean(site.resumeHref);
  const href = site.resumeHref ?? "/contact?intent=hiring";
  const label =
    labelOverride ?? (downloading ? "Download résumé" : "Request résumé");
  const accessible = downloading ? "Download résumé, PDF, 2 pages" : "Request résumé";

  const onTrack = () => {
    if (downloading) {
      track("resume_download", { source });
    } else {
      track("resume_requested", { source });
    }
    onNavigate?.();
  };

  if (appearance === "text") {
    if (downloading) {
      return (
        <a
          href={href}
          onClick={onTrack}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={accessible}
          title="PDF · 2 pages"
          data-cursor="View"
          className={
            className ??
            "inline-flex min-h-11 items-center font-mono-label text-mist/80 hover:text-gold"
          }
        >
          {label}
          <span className="sr-only"> PDF · 2 pages</span>
        </a>
      );
    }

    return (
      <a
        href={href}
        onClick={onTrack}
        aria-label={accessible}
        data-cursor="Open"
        className={
          className ??
          "inline-flex min-h-11 items-center font-mono-label text-mist/80 hover:text-gold"
        }
      >
        {label}
      </a>
    );
  }

  if (downloading) {
    return (
      <MagneticButton
        href={href}
        variant={variant}
        size={size}
        cursor="View"
        ariaLabel={accessible}
        onClick={onTrack}
        className={className}
      >
        {label}
        <span className="sr-only"> PDF · 2 pages</span>
      </MagneticButton>
    );
  }

  return (
    <MagneticButton
      href={href}
      variant={variant}
      size={size}
      cursor="Open"
      ariaLabel={accessible}
      onClick={onTrack}
      className={className}
    >
      {label}
    </MagneticButton>
  );
}
