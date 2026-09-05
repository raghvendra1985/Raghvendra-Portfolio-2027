import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { leadershipHero, leadershipImpact, homeHeroMedia } from "@/home/leadership-home";

export const heroDirectionCopy = {
  roleLine: leadershipHero.roleLine,
  A: {
    headline: "Intelligent products that hold.",
    proof: "20 years · 500+ designers taught",
  },
  B: {
    headline: "Systems that hold.",
  },
  C: {
    headline: "Intelligent products.",
    proof: "Evidence a hiring conversation can verify.",
  },
  D: {
    headline: leadershipHero.headline,
  },
} as const;

export const impactTerms = leadershipImpact.items.map((item) => item.term);

export function WireCtas() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Link
        href={leadershipHero.primary.href}
        className="inline-flex min-h-12 w-full items-center justify-center bg-navy px-6 py-3 font-mono-label text-[12px] text-mist sm:w-auto"
      >
        {leadershipHero.primary.label}
      </Link>
      <Link
        href={leadershipHero.secondary.href}
        className="inline-flex min-h-12 w-full items-center justify-center border border-navy/30 bg-transparent px-6 py-3 font-mono-label text-[12px] text-navy sm:w-auto"
      >
        {leadershipHero.secondary.label}
      </Link>
    </div>
  );
}

export function WireObject({
  label = "OBJECT / VIDEO",
  className = "",
  large = false,
  dashed = true,
  surface = "mist",
}: {
  label?: string;
  className?: string;
  large?: boolean;
  dashed?: boolean;
  surface?: "mist" | "paper" | "navy";
}) {
  const ground =
    surface === "paper" ? "bg-paper" : surface === "navy" ? "bg-navy" : "bg-mist";
  const border = dashed ? "border border-dashed border-line" : "border border-line";

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${border} ${ground} ${className}`}
      aria-hidden
    >
      <Image
        src={homeHeroMedia.still}
        alt=""
        fill
        sizes={large ? "(min-width: 1024px) 45vw, 90vw" : "96px"}
        className={`object-contain object-center ${large ? "opacity-90" : "opacity-80"}`}
      />
      <span
        className={`pointer-events-none absolute left-3 top-3 z-[1] font-mono-label ${
          surface === "navy" ? "text-mist/60" : "text-ink-soft"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export function DirectionSection({
  id,
  title,
  subtitle,
  children,
  notes,
}: {
  id: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  notes: readonly string[];
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line">
      <div className="border-b border-line bg-paper px-[var(--page-pad)] py-4">
        <p className="font-mono-label text-gold">{title}</p>
        <p className="mt-1 text-sm text-ink-soft">{subtitle}</p>
      </div>
      <div className="relative bg-mist">{children}</div>
      <ul className="border-t border-line bg-surface-dim px-[var(--page-pad)] py-5">
        {notes.map((note) => (
          <li key={note} className="max-w-3xl text-sm leading-relaxed text-ink-soft">
            — {note}
          </li>
        ))}
      </ul>
    </section>
  );
}
