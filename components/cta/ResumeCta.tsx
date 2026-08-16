"use client";

import Link from "next/link";
import MagneticButton from "@/components/buttons/MagneticButton";
import { track } from "@/lib/analytics";
import { site } from "@/lib/site";

export default function ResumeCta({
  variant = "secondary",
  size = "md",
  appearance = "button",
  onNavigate,
  className,
}: {
  variant?: "primary" | "secondary" | "gold";
  size?: "sm" | "md";
  appearance?: "button" | "text";
  onNavigate?: () => void;
  className?: string;
}) {
  const href = site.resumeHref ?? "/contact?intent=hiring";
  const label = site.resumeHref ? "Download Resume" : "Request resume";
  const onTrack = () => {
    track(site.resumeHref ? "resume_download" : "resume_requested");
    onNavigate?.();
  };

  if (appearance === "text") {
    return (
      <Link
        href={href}
        onClick={onTrack}
        data-cursor="Open"
        className={
          className ??
          "inline-flex min-h-11 items-center font-mono-label text-[11px] text-mist/80 hover:text-gold"
        }
      >
        {label}
      </Link>
    );
  }

  if (site.resumeHref) {
    return (
      <MagneticButton
        href={site.resumeHref}
        variant={variant}
        size={size}
        cursor="View"
        download
        onClick={onTrack}
        className={className}
      >
        {label}
      </MagneticButton>
    );
  }

  return (
    <MagneticButton
      href={href}
      variant={variant}
      size={size}
      cursor="Open"
      onClick={onTrack}
      className={className}
    >
      {label}
    </MagneticButton>
  );
}
