"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { homeHeroMedia } from "@/home/leadership-home";

export default function HomeHeroVisual() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { config, pageReady } = useExperience();
  const [videoActive, setVideoActive] = useState(false);
  const allowVideo = !config.reducedMotion;

  useEffect(() => {
    if (!pageReady || !allowVideo) return;
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const tryPlay = async () => {
      if (cancelled) return;
      try {
        await video.play();
        if (!cancelled) setVideoActive(true);
      } catch {
        setVideoActive(false);
      }
    };

    const onCanPlay = () => void tryPlay();
    const onEnded = () => {
      video.pause();
    };
    const onError = () => {
      setVideoActive(false);
    };

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      void tryPlay();
    }

    return () => {
      cancelled = true;
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
    };
  }, [pageReady, allowVideo]);

  return (
    <div
      data-hero-visual
      data-hero-drift
      className="relative mx-auto w-full max-w-[min(100%,22rem)] aspect-[16/10] bg-mist sm:max-w-[26rem] lg:mx-0 lg:aspect-square lg:max-w-none lg:justify-self-end"
    >
      <Image
        src={homeHeroMedia.still}
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 42vw, (min-width: 640px) 50vw, 88vw"
        className={`object-contain object-center transition-opacity duration-300 ${
          videoActive ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden
      />
      {allowVideo ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-contain object-center transition-opacity duration-300 ${
            videoActive ? "opacity-100" : "opacity-0"
          }`}
          poster={homeHeroMedia.still}
          muted
          playsInline
          preload="metadata"
          aria-hidden
        >
          <source src={homeHeroMedia.webm} type="video/webm" />
          <source src={homeHeroMedia.mp4} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
