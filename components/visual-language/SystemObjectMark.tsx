"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animateSystemObject } from "@/animations/systemObject";
import { useExperience } from "@/components/providers/ExperienceProvider";
import type { MotionMeaning, SystemObjectSurface } from "@/visual-language/marks";

export default function SystemObjectMark({
  src,
  motion,
  surface = "mist",
  size = "md",
}: {
  src: string;
  motion: MotionMeaning;
  surface?: SystemObjectSurface;
  size?: "sm" | "md";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { config } = useExperience();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = animateSystemObject(root, config);
    return () => ctx.revert();
  }, [config, src]);

  const box = size === "sm" ? "size-16 sm:size-20" : "size-20 sm:size-24";
  const ground = surface === "paper" ? "bg-paper" : "bg-mist";

  return (
    <span
      ref={ref}
      data-system-object
      data-motion-meaning={motion}
      className={`inline-flex shrink-0 origin-center ${box} ${ground}`}
      aria-hidden="true"
    >
      <Image
        src={src}
        alt=""
        width={640}
        height={640}
        sizes={size === "sm" ? "80px" : "96px"}
        className="size-full"
      />
    </span>
  );
}
