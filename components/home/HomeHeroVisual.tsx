"use client";

import Image from "next/image";
import { homeHeroMedia } from "@/home/leadership-home";

/**
 * Hero foreground plate — still image only.
 * Live motion lives on the full-section particle background in HomeHero.
 */
export default function HomeHeroVisual() {
  return (
    <div
      data-hero-visual
      data-hero-drift
      className="relative mx-auto w-full max-w-[min(100%,22rem)] aspect-[16/10] overflow-hidden bg-transparent sm:max-w-[26rem] lg:mx-0 lg:aspect-square lg:max-w-none lg:justify-self-end"
    >
      <Image
        src={homeHeroMedia.still}
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 42vw, (min-width: 640px) 50vw, 88vw"
        className="object-contain object-center opacity-90"
        aria-hidden
      />
    </div>
  );
}
