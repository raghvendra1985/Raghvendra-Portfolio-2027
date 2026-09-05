"use client";

import { useCallback, useEffect, useState } from "react";
import {
  curatedPayload,
  type NowPlayingPayload,
} from "@/lib/now-playing-shared";
import { useConcierge } from "@/components/concierge/ConciergeProvider";
import { useExperience } from "@/components/providers/ExperienceProvider";

const DISMISS_KEY = "rs-now-playing-dismissed";

function MusicNoteIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="currentColor"
      height={18}
      width={18}
      aria-hidden
    >
      <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2z" />
      <path d="M9 3v10H8V3h1z" fillRule="evenodd" />
      <path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5V2.82z" />
    </svg>
  );
}

function Equalizer({ active }: { active: boolean }) {
  return (
    <div className="flex h-8 items-end justify-center gap-0.5" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={`w-0.5 rounded-sm bg-green ${
            active
              ? "h-2 motion-safe:animate-[now-playing-bar_1s_ease-in-out_infinite]"
              : "h-2"
          }`}
          style={active ? { animationDelay: `${i * 0.15}s` } : undefined}
        />
      ))}
    </div>
  );
}

export default function NowPlayingFloat() {
  const { open: conciergeOpen } = useConcierge();
  const { config, pageReady } = useExperience();
  const [payload, setPayload] = useState<NowPlayingPayload | null>(null);
  const [dismissed, setDismissed] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      setDismissed(false);
    }
    setReady(true);
  }, []);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/now-playing", { cache: "no-store" });
      if (!res.ok) throw new Error("now_playing_http");
      const json = (await res.json()) as NowPlayingPayload;
      setPayload(json);
    } catch {
      setPayload(curatedPayload());
    }
  }, []);

  useEffect(() => {
    if (!pageReady || dismissed) return;
    void load();
    const id = window.setInterval(() => void load(), 45_000);
    return () => window.clearInterval(id);
  }, [pageReady, dismissed, load]);

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    setDismissed(true);
  };

  if (!ready || dismissed || conciergeOpen || !payload) return null;

  const { track, isPlaying, source } = payload;
  const label = isPlaying ? "Now playing" : "In rotation";

  return (
    <aside
      className="fixed bottom-[max(5.5rem,calc(env(safe-area-inset-bottom)+4.75rem))] left-[max(1rem,env(safe-area-inset-left))] z-[54] h-[254px] w-[190px] overflow-hidden rounded-[10px] border border-white/40 bg-mist/70 shadow-[0_8px_32px_rgba(11,24,73,0.12)] backdrop-blur-md lg:bottom-[max(1.5rem,env(safe-area-inset-bottom))]"
      aria-label={`${label}: ${track.title} by ${track.artist}`}
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[10px]"
        aria-hidden
      >
        <span
          className={`absolute h-14 w-14 rounded-full bg-gold/35 blur-md ${
            config.reducedMotion
              ? "left-4 top-8"
              : "left-4 top-8 motion-safe:animate-[now-playing-orb-a_8s_ease-in-out_infinite]"
          }`}
        />
        <span
          className={`absolute h-14 w-14 rounded-full bg-green/30 blur-md ${
            config.reducedMotion
              ? "bottom-10 right-6"
              : "bottom-10 right-6 motion-safe:animate-[now-playing-orb-b_8s_ease-in-out_infinite]"
          }`}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col px-3 pb-3 pt-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full border border-navy/15 px-2.5 py-0.5 font-mono-label text-[9px] text-navy/70">
            Music
          </span>
          <button
            type="button"
            onClick={dismiss}
            className="inline-flex min-h-8 min-w-8 items-center justify-center rounded-full font-mono-label text-[10px] text-navy/55 hover:text-navy"
            aria-label="Dismiss music card"
          >
            ✕
          </button>
        </div>

        {track.url ? (
          <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto mt-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-navy/10"
            data-cursor="Open"
            aria-label={`Open ${track.title} on Spotify`}
          >
            {track.albumArtUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={track.albumArtUrl}
                alt=""
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            ) : (
              <MusicNoteIcon className="text-navy/55" />
            )}
          </a>
        ) : (
          <div className="mx-auto mt-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-navy/10">
            {track.albumArtUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={track.albumArtUrl}
                alt=""
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            ) : (
              <MusicNoteIcon className="text-navy/55" />
            )}
          </div>
        )}

        <p className="mt-3 truncate text-center font-sans text-[12px] font-medium leading-snug text-navy">
          {track.title}
        </p>
        <p className="mt-1 truncate text-center font-mono-label text-[9px] text-navy/60">
          {track.artist}
        </p>

        <div className="mt-auto flex flex-col items-center gap-2 pt-3">
          <Equalizer active={isPlaying && !config.reducedMotion} />
          <p className="font-mono-label text-[9px] text-navy/50">
            {label}
            {source === "spotify" && isPlaying ? " · Spotify" : ""}
          </p>
        </div>
      </div>
    </aside>
  );
}
