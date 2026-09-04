"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useExperience } from "@/components/providers/ExperienceProvider";
import HeroParticles from "@/components/home/HeroParticles";
import { homeHeroMedia } from "@/home/leadership-home";

/**
 * Hero visual plate: live particle swarm when motion is allowed,
 * still image for reduced motion / WebGL failure / before mount.
 */
export default function HomeHeroVisual() {
  const { config, pageReady } = useExperience();
  const allowMotion = pageReady && !config.reducedMotion;
  const [swarmLive, setSwarmLive] = useState(false);
  const [swarmFailed, setSwarmFailed] = useState(false);

  const onReady = useCallback(() => setSwarmLive(true), []);
  const onFail = useCallback(() => {
    setSwarmFailed(true);
    setSwarmLive(false);
  }, []);

  const showStill = !allowMotion || swarmFailed || !swarmLive;

  return (
    <div
      data-hero-visual
      data-hero-drift
      className="relative mx-auto w-full max-w-[min(100%,22rem)] aspect-[16/10] overflow-hidden bg-mist sm:max-w-[26rem] lg:mx-0 lg:aspect-square lg:max-w-none lg:justify-self-end"
    >
      <Image
        src={homeHeroMedia.still}
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 42vw, (min-width: 640px) 50vw, 88vw"
        className={`object-contain object-center transition-opacity duration-500 ${
          showStill ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      />
      {allowMotion && !swarmFailed ? (
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            swarmLive ? "opacity-100" : "opacity-0"
          }`}
        >
          <HeroParticles
            isMobile={config.isMobile}
            onReady={onReady}
            onFail={onFail}
          />
        </div>
      ) : null}
    </div>
  );
}
