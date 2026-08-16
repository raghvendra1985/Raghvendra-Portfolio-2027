"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { animateMagneticButton } from "@/animations/buttons";
import { useExperience } from "@/components/providers/ExperienceProvider";

type Variant = "primary" | "secondary" | "gold";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-mist hover:text-navy",
  secondary: "bg-transparent text-navy border border-navy/30",
  gold: "bg-gold text-navy",
};

const sizes: Record<Size, string> = {
  sm: "min-h-11 px-4 py-2.5 text-[12px]",
  md: "min-h-12 px-6 py-3 text-[12px]",
};

export default function MagneticButton({
  href,
  children,
  variant = "primary",
  size = "md",
  type,
  cursor = "Open",
  download,
  onClick,
  className: extraClassName = "",
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  type?: "button" | "submit";
  cursor?: string;
  download?: boolean | string;
  onClick?: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const { config } = useExperience();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const ctx = animateMagneticButton(node, config);
    return () => ctx.revert();
  }, [config]);

  const className = `relative isolate inline-flex items-center gap-3 overflow-hidden font-mono-label ${sizes[size]} ${variants[variant]} ${extraClassName}`;

  const inner = (
    <>
      <span
        data-button-fill
        className={`pointer-events-none absolute inset-0 -z-10 origin-left ${
          variant === "gold" ? "bg-mist" : "bg-gold"
        }`}
        aria-hidden="true"
      />
      <span className="relative">{children}</span>
      <span data-button-arrow className="relative" aria-hidden="true">
        →
      </span>
    </>
  );

  if (href) {
    const documentHref =
      href.endsWith(".html") || href.includes("/prototypes/") || href.endsWith(".pdf");
    const external =
      href.startsWith("http") || href.startsWith("mailto:") || documentHref;
    if (external) {
      return (
        <a
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={href}
          className={className}
          data-cursor={cursor}
          onClick={onClick}
          {...(download
            ? { download: typeof download === "string" ? download : true }
            : {})}
          {...(href.startsWith("http") || documentHref
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={className}
        data-cursor={cursor}
        onClick={onClick}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type ?? "button"}
      className={className}
      data-cursor={cursor}
      onClick={onClick}
    >
      {inner}
    </button>
  );
}
