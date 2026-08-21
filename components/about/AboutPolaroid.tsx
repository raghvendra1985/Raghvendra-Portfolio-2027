"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import ImageReveal from "@/components/reveal/ImageReveal";
import { animateAboutPolaroid } from "@/animations/about";
import { useExperience } from "@/components/providers/ExperienceProvider";

export default function AboutPolaroid({
  src,
  alt = "",
  hello = false,
  label,
  href,
  idle = false,
  rotate = 0,
  priority = false,
  sizes = "320px",
  children,
}: {
  src?: string;
  alt?: string;
  hello?: boolean;
  label?: string;
  href?: string;
  idle?: boolean;
  rotate?: number;
  priority?: boolean;
  sizes?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { config } = useExperience();

  useEffect(() => {
    const root = ref.current;
    if (!root || !idle) return;
    const ctx = animateAboutPolaroid(root, config);
    return () => ctx.revert();
  }, [config, idle]);

  const frame = (
    <div
      ref={ref}
      data-about-polaroid
      className="about-polaroid relative bg-paper"
      style={{ rotate: idle ? "-1.6deg" : `${rotate}deg` }}
    >
      {src ? (
        <ImageReveal
          src={src}
          alt={alt}
          className="aspect-square w-full"
          sizes={sizes}
          objectFit="cover"
          parallax={idle ? 0 : 0.04}
          priority={priority}
        />
      ) : (
        <div className="flex aspect-[4/5] w-full items-end bg-mist px-4 pb-5">
          {label ? <p className="font-mono-label text-navy">{label}</p> : children}
        </div>
      )}
      {hello ? (
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-8 left-1/2 font-display text-4xl italic text-gold sm:text-5xl"
          style={{ rotate: "-12deg", translate: "-50% 0" }}
        >
          hello.
        </span>
      ) : null}
      {src && label ? (
        <p className="px-2 pb-3 pt-3 text-center font-mono-label text-navy">{label}</p>
      ) : null}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block" data-cursor="Open">
        {frame}
      </Link>
    );
  }

  return frame;
}
