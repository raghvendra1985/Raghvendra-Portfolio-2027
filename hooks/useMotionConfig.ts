"use client";

import { useEffect, useState } from "react";
import { getMotionConfig, type MotionConfig } from "@/animations/motion";

export function useMotionConfig() {
  const [config, setConfig] = useState<MotionConfig>({
    reducedMotion: false,
    isMobile: false,
    parallaxScale: 1,
  });

  useEffect(() => {
    const update = () => setConfig(getMotionConfig());
    update();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 768px)");
    reduced.addEventListener("change", update);
    mobile.addEventListener("change", update);
    return () => {
      reduced.removeEventListener("change", update);
      mobile.removeEventListener("change", update);
    };
  }, []);

  return config;
}
