"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  animateCharm,
  CHARM_SIZE,
  playCharmRitual,
  showCharmCaption,
  STRING_LENGTH,
} from "@/animations/charm";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { useConcierge } from "@/components/concierge/ConciergeProvider";
import { useCharmState } from "@/components/delight/useCharmState";
import {
  CHARM_RITUAL_EVENT,
  DARUMA_LABELS,
  getCharm,
  getCharmArt,
  nextCharmId,
  nextDaruma,
  nextDrishti,
  nextEmoji,
  requestCharmFlick,
  type CharmBeadKind,
} from "@/lib/charms";
import { clampHangX } from "@/lib/charm-storage";
import { track } from "@/lib/analytics";

function useMenuOpen() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const nav = document.querySelector("[data-nav]");
    if (!nav) return;
    const update = () => setOpen(nav.getAttribute("data-menu-open") === "true");
    update();
    const observer = new MutationObserver(update);
    observer.observe(nav, { attributes: true, attributeFilter: ["data-menu-open"] });
    return () => observer.disconnect();
  }, []);

  return open;
}

function GlassBead({ kind, size }: { kind: CharmBeadKind; size: number }) {
  const half = size / 2;
  return (
    <>
      <circle r={half} fill={`url(#charm-g-${kind})`} />
      <circle r={half} fill={`url(#charm-rim-${kind})`} />
      <ellipse
        cx={(-0.17 * size).toFixed(2)}
        cy={(-0.23 * size).toFixed(2)}
        rx={(0.135 * size).toFixed(2)}
        ry={(0.1 * size).toFixed(2)}
        fill="rgba(255,255,255,0.85)"
      />
    </>
  );
}

export default function HangingCharm() {
  const { config, pageReady } = useExperience();
  const { open: conciergeOpen } = useConcierge();
  const menuOpen = useMenuOpen();
  const { state, ready, update } = useCharmState();
  const worldRef = useRef<SVGGElement>(null);
  const stringRef = useRef<SVGPathElement>(null);
  const beadsGroupRef = useRef<SVGGElement>(null);
  const visualRef = useRef<SVGGElement>(null);
  const markRef = useRef<SVGGElement>(null);
  const charmRef = useRef<HTMLButtonElement>(null);
  const captionRef = useRef<HTMLSpanElement>(null);
  const captionTextRef = useRef<HTMLSpanElement>(null);
  const switcherRef = useRef<HTMLDivElement>(null);
  const hangXRef = useRef(state.hangX);
  const idRef = useRef(state.id);
  const emojiRef = useRef(state.emoji);
  const darumaRef = useRef(state.daruma);
  const drishtiRef = useRef(state.drishti);

  hangXRef.current = state.hangX;
  idRef.current = state.id;
  emojiRef.current = state.emoji;
  darumaRef.current = state.daruma;
  drishtiRef.current = state.drishti;

  const pathname = usePathname();
  const covered = !pageReady || conciergeOpen || menuOpen;
  const hidden = !ready || state.hidden;
  const coveredRef = useRef(covered);
  const pathReady = useRef(false);
  coveredRef.current = covered;
  const art = getCharmArt(state.id);

  function switchCharm(step: number) {
    const id = nextCharmId(idRef.current, step);
    update({ id, hidden: false });
    track("charm_switched", { id, from: idRef.current });
  }

  function playRitual() {
    const id = idRef.current;
    const mark = markRef.current;
    const caption = captionTextRef.current;
    const copy = getCharm(id);
    let captionText = copy.ritual;
    if (id === "emoji") {
      update({ emoji: nextEmoji(emojiRef.current) });
    }
    if (id === "horseshoe") {
      requestCharmFlick();
    }
    if (id === "daruma") {
      captionText = DARUMA_LABELS[darumaRef.current];
      update({ daruma: nextDaruma(darumaRef.current) });
    }
    if (id === "drishti") {
      update({ drishti: nextDrishti(drishtiRef.current) });
    }
    if (mark) playCharmRitual(mark, id, config.reducedMotion);
    if (caption) showCharmCaption(caption, captionText, config.reducedMotion);
    track("charm_ritual", { id });
  }

  useEffect(() => {
    const onRequest = () => playRitual();
    window.addEventListener(CHARM_RITUAL_EVENT, onRequest);
    return () => window.removeEventListener(CHARM_RITUAL_EVENT, onRequest);
  }, [config.reducedMotion, update]);

  useEffect(() => {
    if (!pathReady.current) {
      pathReady.current = true;
      return;
    }
    if (hidden || coveredRef.current) return;
    requestCharmFlick();
  }, [pathname, hidden]);

  useEffect(() => {
    const node = charmRef.current;
    const visual = visualRef.current;
    const world = worldRef.current;
    const stringEl = stringRef.current;
    const beads = beadsGroupRef.current;
    if (!node || !visual || !world || !stringEl || !beads || hidden) return;

    return animateCharm(
      {
        charm: node,
        visual,
        world,
        string: stringEl,
        beads,
        caption: captionRef.current ?? undefined,
        switcher: switcherRef.current ?? undefined,
      },
      {
        config,
        getHangX: () => hangXRef.current,
        getArt: () => getCharmArt(idRef.current),
        setHangX: (value) => {
          hangXRef.current = value;
          update({ hangX: value });
        },
        paused: () => coveredRef.current,
        applyHangX: (value) => {
          hangXRef.current = value;
        },
        onFlick: () => {
          track("charm_flicked", { id: idRef.current });
        },
        onSwitch: (step) => switchCharm(step),
        onRitual: () => playRitual(),
      },
    );
  }, [hidden, config, update]);

  if (hidden) return null;

  const restX =
    clampHangX(state.hangX) * (typeof window === "undefined" ? 1280 : window.innerWidth);
  const [frameW, frameH] = art.frame;
  const imageY = -art.attach * frameH;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[86] ${covered ? "opacity-0" : ""}`}
      aria-hidden={covered}
    >
      <svg className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="charm-rope" gradientUnits="userSpaceOnUse" x1="0" y1="-30" x2="0" y2="170">
            <stop offset="0" stopColor="#b8945a" />
            <stop offset="1" stopColor="#8c6b38" />
          </linearGradient>
          <linearGradient id="charm-cordtail" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9e7a45" />
            <stop offset="1" stopColor="#8c6b38" />
          </linearGradient>
          {(
            [
              ["gold", "#ffe685", "#e4b028", "#8a6410", "rgba(255,217,102,0.45)"],
              ["navy", "#6b8ce0", "#0b1849", "#050918", "rgba(128,166,255,0.45)"],
              ["mist", "#ffffff", "#ebede3", "#9ea1ad", "rgba(255,255,255,0.35)"],
              ["faience", "#9ef0e3", "#29a69e", "#084f54", "rgba(140,242,230,0.45)"],
              ["red", "#ff7a66", "#9f1239", "#5c0b20", "rgba(255,115,89,0.45)"],
            ] as const
          ).map(([kind, light, mid, dark]) => (
            <radialGradient key={`g-${kind}`} id={`charm-g-${kind}`} cx="0.37" cy="0.30" r="0.75">
              <stop offset="0" stopColor={light} />
              <stop offset="0.55" stopColor={mid} />
              <stop offset="1" stopColor={dark} />
            </radialGradient>
          ))}
          {(
            [
              ["gold", "rgba(255,217,102,0.45)"],
              ["navy", "rgba(128,166,255,0.45)"],
              ["mist", "rgba(255,255,255,0.35)"],
              ["faience", "rgba(140,242,230,0.45)"],
              ["red", "rgba(255,115,89,0.45)"],
            ] as const
          ).map(([kind, rim]) => (
            <linearGradient key={`r-${kind}`} id={`charm-rim-${kind}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0.72" stopColor={rim} stopOpacity="0" />
              <stop offset="0.97" stopColor={rim} />
            </linearGradient>
          ))}
          <filter id="charm-hang-shadow" x="-40%" y="-20%" width="180%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="2.2" floodColor="#0b1849" floodOpacity="0.28" />
          </filter>
        </defs>
        <g ref={worldRef}>
          <path
            ref={stringRef}
            d={`M ${restX} 0 L ${restX} ${STRING_LENGTH}`}
            fill="none"
            stroke="url(#charm-rope)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g ref={beadsGroupRef}>
            <g className="charm-bead">
              <GlassBead kind={art.beads.small} size={7} />
            </g>
            <g className="charm-bead">
              <GlassBead kind={art.beads.big} size={art.beads.bigSize} />
            </g>
            <g className="charm-bead">
              <GlassBead kind={art.beads.small} size={7} />
            </g>
          </g>
          <g ref={visualRef} filter="url(#charm-hang-shadow)">
            <g ref={markRef}>
              {state.id === "emoji" || !art.src ? (
                <>
                  <rect x="-1" y="0" width="2" height={art.hangOffset + 6} fill="url(#charm-cordtail)" />
                  <text
                    x="0"
                    y={art.hangOffset}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="58"
                  >
                    {state.emoji}
                  </text>
                </>
              ) : (
                <image
                  href={art.src}
                  x={-frameW / 2}
                  y={imageY}
                  width={frameW}
                  height={frameH}
                  preserveAspectRatio="xMidYMin meet"
                />
              )}
            </g>
          </g>
        </g>
      </svg>
      <button
        ref={charmRef}
        id="charm-grab"
        type="button"
        tabIndex={covered ? -1 : 0}
        disabled={covered}
        aria-label="Grab the charm, drag it, flick it, or slide it along the top edge"
        className="pointer-events-auto absolute left-0 top-0 cursor-grab touch-none select-none rounded-full bg-transparent p-0 active:cursor-grabbing"
        style={{
          height: CHARM_SIZE,
          width: CHARM_SIZE,
          transform: `translate(${restX - CHARM_SIZE / 2}px, ${STRING_LENGTH}px)`,
        }}
      />
      <span
        ref={captionRef}
        className="absolute left-0 top-0 whitespace-nowrap font-mono-label text-[9px] text-navy"
      >
        <span ref={captionTextRef} className="opacity-0" />
      </span>
      <div ref={switcherRef} className="pointer-events-auto absolute left-0 top-0 flex gap-1">
        <button
          type="button"
          tabIndex={covered ? -1 : 0}
          disabled={covered}
          aria-label="Previous charm"
          onClick={() => switchCharm(-1)}
          className="flex h-7 w-7 items-center justify-center font-mono-label text-navy/50 hover:text-gold"
        >
          ←
        </button>
        <button
          type="button"
          tabIndex={covered ? -1 : 0}
          disabled={covered}
          aria-label="Next charm"
          onClick={() => switchCharm(1)}
          className="flex h-7 w-7 items-center justify-center font-mono-label text-navy/50 hover:text-gold"
        >
          →
        </button>
      </div>
    </div>
  );
}
