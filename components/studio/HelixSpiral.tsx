"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { useExperience } from "@/components/providers/ExperienceProvider";
import type { StudioCoverSlide } from "@/studio";

function mod(value: number, n: number) {
  return ((value % n) + n) % n;
}

function wrappedOffset(index: number, progress: number, count: number) {
  const raw = index - progress;
  const half = count / 2;
  return mod(raw + half, count) - half;
}

const AUTO_ROTATE_SPEED = 0.18;
const IDLE_MS = 900;

export default function HelixSpiral({ items }: { items: StudioCoverSlide[] }) {
  const { config } = useExperience();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2 });
  const [engaged, setEngaged] = useState(false);

  const count = Math.max(items.length, 1);
  const [displayProgress, setDisplayProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const velocityRef = useRef(0);
  const draggingRef = useRef(false);
  const pointerRef = useRef({ x: 0, t: 0 });
  const lastInteractionRef = useRef(0);
  const lastTimeRef = useRef(0);
  const smoothedRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const radius = config.isMobile ? 150 : 240;
  const verticalGap = config.isMobile ? 28 : 42;
  const itemWidth = config.isMobile ? 132 : 190;
  const itemHeight = config.isMobile ? 176 : 250;
  const perspective = 1400;
  const focusScale = 1.2;
  const depthFalloff = 3;
  const depthBlur = config.reducedMotion ? 0 : 6;
  const arcSpan = 360;
  const accent = "#e4b028";

  const markEngaged = useCallback((value: boolean) => {
    setEngaged(value);
  }, []);

  useEffect(() => {
    if (config.reducedMotion) return;
    if (!isInView) return;
    lastTimeRef.current = performance.now();

    function tick(time: number) {
      const dt = Math.min(0.05, Math.max(0, (time - lastTimeRef.current) / 1000));
      lastTimeRef.current = time;
      if (!draggingRef.current) {
        if (Math.abs(velocityRef.current) > 8e-4) {
          targetProgressRef.current += velocityRef.current * dt * 60;
          velocityRef.current *= Math.pow(0.92, dt * 60);
        } else {
          velocityRef.current = 0;
          if (time - lastInteractionRef.current > IDLE_MS) {
            targetProgressRef.current += AUTO_ROTATE_SPEED * dt;
          }
        }
      }
      smoothedRef.current += (targetProgressRef.current - smoothedRef.current) * Math.min(1, dt * 6);
      setDisplayProgress(smoothedRef.current);
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [config.reducedMotion, isInView]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || config.reducedMotion || !engaged) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      targetProgressRef.current += event.deltaY * 0.004;
      velocityRef.current = 0;
      lastInteractionRef.current = performance.now();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [config.reducedMotion, engaged]);

  const focusIndex = useCallback(
    (index: number) => {
      const cur = targetProgressRef.current;
      const wrapped = wrappedOffset(index, cur, count);
      targetProgressRef.current = cur + wrapped;
      velocityRef.current = 0;
      lastInteractionRef.current = performance.now();
    },
    [count],
  );

  const handlePointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    draggingRef.current = true;
    velocityRef.current = 0;
    pointerRef.current = { x: event.clientX, t: performance.now() };
    lastInteractionRef.current = performance.now();
  }, []);

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const now = performance.now();
    const dx = event.clientX - pointerRef.current.x;
    const dt = Math.max(1, now - pointerRef.current.t);
    const delta = -dx * 0.012;
    targetProgressRef.current += delta;
    velocityRef.current = (delta / dt) * 16;
    pointerRef.current = { x: event.clientX, t: now };
    lastInteractionRef.current = now;
  }, []);

  const handlePointerUp = useCallback((event: PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    lastInteractionRef.current = performance.now();
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* already released */
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const nearest = Math.round(mod(targetProgressRef.current, count));
      if (event.key === "ArrowRight") {
        event.preventDefault();
        focusIndex(mod(nearest + 1, count));
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        focusIndex(mod(nearest - 1, count));
      }
    },
    [count, focusIndex],
  );

  if (!items.length) return null;

  if (config.reducedMotion) {
    return (
      <ul className="grid gap-3 px-[var(--page-pad)] py-16 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.src} className="overflow-hidden border border-line">
            <div className="relative aspect-[3/4] bg-navy">
              <Image src={item.src} alt={item.alt} fill sizes="30vw" className="object-cover" />
            </div>
            <p className="px-3 py-2 font-mono-label text-mist">{item.title}</p>
          </li>
        ))}
      </ul>
    );
  }

  const angleStep = arcSpan / count;
  const fadeMask =
    "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)";

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Studio covers"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerEnter={() => markEngaged(true)}
      onPointerLeave={(event) => {
        if (event.currentTarget.contains(document.activeElement)) return;
        markEngaged(false);
      }}
      onFocus={() => markEngaged(true)}
      onBlur={(event) => {
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
        markEngaged(false);
      }}
      className="helix-spiral relative h-[min(72vh,720px)] min-h-[480px] w-full overflow-hidden bg-navy pt-14 outline-none"
      style={{
        perspective,
        perspectiveOrigin: "50% 50%",
        touchAction: "none",
        cursor: "grab",
        WebkitMaskImage: fadeMask,
        maskImage: fadeMask,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 42%, ${accent}33, transparent 62%)`,
          mixBlendMode: "screen",
        }}
      />
      <div className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transformStyle: "flat" }}>
        {items.map((item, index) => {
          const wrapped = wrappedOffset(index, displayProgress, count);
          const angle = wrapped * angleStep;
          const angleRad = (angle * Math.PI) / 180;
          const x = Math.sin(angleRad) * radius;
          const z = Math.cos(angleRad) * radius - radius;
          const y = wrapped * verticalGap;
          const tilt = Math.max(-35, Math.min(35, -angle * 0.55));
          const distance = Math.abs(wrapped);
          const scale = Math.max(0.35, focusScale - (distance * (focusScale - 0.5)) / depthFalloff);
          const opacity = Math.max(0.08, 1 - (distance * 0.9) / depthFalloff);
          const zIndex = Math.round(1000 - distance * 10);
          const isFocused = distance < 0.5;
          const blur = Math.min(depthBlur, (distance / depthFalloff) * depthBlur);

          return (
            <button
              key={item.src}
              type="button"
              onClick={() => focusIndex(index)}
              className="absolute left-0 top-0 overflow-hidden text-left"
              style={{
                width: itemWidth,
                height: itemHeight,
                zIndex,
                transform: `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateY(${tilt.toFixed(2)}deg) scale(${scale.toFixed(3)})`,
                opacity,
                filter: blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : undefined,
                background: "color-mix(in srgb, var(--navy) 90%, white)",
                boxShadow: isFocused ? `0 0 0 1.5px ${accent}` : "none",
                willChange: "transform, opacity, filter",
              }}
            >
              <span className="relative block h-[78%] w-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </span>
              <span
                className="block px-3 py-2 font-mono-label text-mist"
                style={{ opacity: isFocused ? 1 : 0.6 }}
              >
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
