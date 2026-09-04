"use client";

import { useEffect, useRef } from "react";
import type { ParticlesSwarm } from "@/components/home/ParticlesSwarm";

type Props = {
  isMobile: boolean;
  onReady?: () => void;
  onFail?: () => void;
};

/**
 * Mounts ParticlesSwarm as a full-bleed absolute layer.
 * Dynamic-imports three + swarm so the hero still SSR-renders without WebGL.
 */
export default function HeroParticles({ isMobile, onReady, onFail }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let swarm: ParticlesSwarm | null = null;

    void (async () => {
      try {
        const { ParticlesSwarm: Swarm } = await import("@/components/home/ParticlesSwarm");
        if (cancelled || !hostRef.current) return;
        swarm = new Swarm(hostRef.current, {
          count: isMobile ? 2400 : 7000,
          sphereSegments: isMobile ? 6 : 12,
          dprCap: isMobile ? 1.5 : 1.75,
        });
        if (cancelled) {
          swarm.dispose();
          return;
        }
        onReady?.();
      } catch {
        if (!cancelled) onFail?.();
      }
    })();

    return () => {
      cancelled = true;
      swarm?.dispose();
      swarm = null;
    };
  }, [isMobile, onReady, onFail]);

  return (
    <div
      ref={hostRef}
      className="absolute inset-0 overflow-hidden"
      aria-hidden
    />
  );
}
