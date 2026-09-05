"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { animateImageReveal } from "@/animations/sections";
import { animateParallax } from "@/animations/parallax";
import { useExperience } from "@/components/providers/ExperienceProvider";

export default function ImageReveal({
  children,
  src,
  alt = "",
  priority = false,
  sizes = "100vw",
  className,
  parallax = 0.12,
  objectFit = "cover",
  objectPosition,
}: {
  children?: ReactNode;
  src?: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  parallax?: number;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { config, pageReady } = useExperience();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root || !pageReady) return;
    const reveal = animateImageReveal(root, config);
    const drift = animateParallax(root, config);
    return () => {
      reveal.revert();
      drift.revert();
    };
  }, [config, pageReady]);

  const isSvg = Boolean(src?.endsWith(".svg"));
  const isGif = Boolean(src?.endsWith(".gif"));

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden ${className ?? ""}`}
      data-image-reveal
      data-shared-image
    >
      <div data-image-media data-parallax={parallax} className="absolute inset-0">
        {src && !failed ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            unoptimized={isSvg || isGif}
            onError={() => setFailed(true)}
            className={
              objectFit === "contain"
                ? "object-contain object-center"
                : "object-cover object-center"
            }
            style={objectPosition ? { objectPosition } : undefined}
          />
        ) : children ? (
          children
        ) : (
          <div
            className="absolute inset-0 flex items-end bg-surface-dim p-4"
            role="img"
            aria-label={alt || "Image unavailable"}
          >
            {alt ? (
              <p className="font-mono-label text-ink-soft">{alt}</p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
