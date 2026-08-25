"use client";

import { useId, useState } from "react";
import CharmMark from "@/components/delight/CharmMark";
import CharmPicker from "@/components/delight/CharmPicker";
import SectionReveal from "@/components/reveal/SectionReveal";
import { useCharmState } from "@/components/delight/useCharmState";
import { getCharm, getCharmArt, type CharmId } from "@/lib/charms";
import { track } from "@/lib/analytics";
import { compactCharmPrinciples, homeCharms } from "@/home/copy";

function CharmThumb({ id, size }: { id: CharmId; size: number }) {
  const art = getCharmArt(id);
  const [frameW, frameH] = art.frame;
  if (art.src) {
    return (
      <img
        src={art.src}
        alt=""
        width={frameW}
        height={frameH}
        className="max-h-full max-w-full object-contain"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span className="block shrink-0" style={{ width: size, height: size }}>
      <CharmMark id={id} className="h-full w-full" />
    </span>
  );
}

export default function CompactCharmPicker() {
  const { state, ready, update } = useCharmState();
  const [openCatalog, setOpenCatalog] = useState(false);
  const liveId = useId();
  const selected = getCharm(state.id);

  if (!ready) {
    return (
      <SectionReveal charmRest className="border-t border-line px-[var(--page-pad)] py-20">
        <div className="mx-auto max-w-[1440px]" aria-busy="true">
          <div className="max-w-2xl">
            <p className="font-mono-label text-navy/80">{homeCharms.eyebrow}</p>
            <h2 className="mt-4 type-h2">{homeCharms.title}</h2>
          </div>
          <div className="mt-10 grid min-h-[13rem] gap-3 sm:grid-cols-2 lg:grid-cols-4" />
        </div>
      </SectionReveal>
    );
  }

  function hang(id: CharmId) {
    update({ id, hidden: false });
    track("charm_hung", { id });
  }

  function toggleHidden() {
    if (state.hidden) {
      update({ hidden: false });
      track("charm_hung", { id: state.id });
      return;
    }
    update({ hidden: true });
    track("charm_hidden", { id: state.id });
  }

  return (
    <SectionReveal charmRest className="border-t border-line px-[var(--page-pad)] py-20">
      <div className="mx-auto max-w-[1440px]">
        <div data-reveal-item className="max-w-2xl">
          <p className="font-mono-label text-navy/80">{homeCharms.eyebrow}</p>
          <h2 className="mt-4 type-h2">{homeCharms.title}</h2>
        </div>

        <div
          id={liveId}
          className="sr-only"
          aria-live="polite"
        >
          {state.hidden
            ? "Charm put away."
            : `${selected.name} selected. ${compactCharmPrinciples.find((item) => item.id === selected.id)?.principle ?? selected.story}`}
        </div>

        <div className="lg:hidden" data-reveal-item>
          {!state.hidden ? (
            <div className="mt-8 flex items-center gap-4 border border-line bg-paper px-4 py-3">
              <div className="flex h-12 w-12 items-center justify-center">
                <CharmThumb id={state.id} size={40} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-mono-label text-navy/80">Accompanying charm</p>
                <p className="type-body text-navy">{selected.name}</p>
              </div>
              <button
                type="button"
                onClick={toggleHidden}
                aria-label={`${homeCharms.hide}: ${selected.name}`}
                className="inline-flex min-h-11 shrink-0 items-center font-mono-label text-navy"
              >
                {homeCharms.hide}
              </button>
            </div>
          ) : null}
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-reveal-item>
          {compactCharmPrinciples.map((item) => {
            const charm = getCharm(item.id);
            const isSelected = !state.hidden && state.id === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={`Hang ${charm.name}: ${item.principle}`}
                  onClick={() => hang(item.id)}
                  className={`flex min-h-11 w-full items-center gap-4 border px-4 py-4 text-left ${
                    isSelected ? "border-navy bg-paper" : "border-line bg-transparent hover:border-navy"
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center">
                    <CharmThumb id={item.id} size={32} />
                  </span>
                  <span>
                    <span className="block font-mono-label text-navy">{charm.name}</span>
                    <span className="mt-1 block type-body text-navy/80">{item.principle}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-6" data-reveal-item>
          <button
            type="button"
            className="inline-flex min-h-11 items-center font-mono-label text-navy"
            aria-expanded={openCatalog}
            onClick={() => setOpenCatalog((value) => !value)}
          >
            {homeCharms.explore} {openCatalog ? "−" : "→"}
          </button>
          <button
            type="button"
            onClick={toggleHidden}
            className="inline-flex min-h-11 items-center font-mono-label text-navy hover:text-green"
          >
            {state.hidden ? homeCharms.restore : homeCharms.hide}
          </button>
        </div>

        {openCatalog ? (
          <div className="mt-12 border-t border-line pt-10" data-reveal-item>
            <CharmPicker tone="mist" credit />
          </div>
        ) : null}
      </div>
    </SectionReveal>
  );
}
