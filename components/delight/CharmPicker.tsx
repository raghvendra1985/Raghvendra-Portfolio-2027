"use client";

import { useEffect, useState } from "react";
import CharmMark from "@/components/delight/CharmMark";
import { useCharmState } from "@/components/delight/useCharmState";
import {
  CHARMS,
  DARUMA_LABELS,
  EMOJI_SET,
  getCharmArt,
  normalizeEmoji,
  requestCharmRitual,
  type CharmSet,
} from "@/lib/charms";
import { track } from "@/lib/analytics";

function ritualKind(id: (typeof CHARMS)[number]["id"]) {
  if (id === "emoji") return "emoji";
  if (id === "horseshoe") return "flick";
  if (id === "daruma") return "daruma";
  if (id === "drishti") return "drishti";
  return undefined;
}

const GROUPS: { set: CharmSet; label: string }[] = [
  { set: "studio", label: "Studio" },
  { set: "world", label: "World" },
];

export default function CharmPicker({
  onHang,
  tone = "navy",
  credit = true,
}: {
  onHang?: () => void;
  tone?: "navy" | "mist";
  credit?: boolean;
}) {
  const { state, ready, update } = useCharmState();
  const [pickingEmoji, setPickingEmoji] = useState(false);
  const [draftEmoji, setDraftEmoji] = useState(state.emoji);
  const onMist = tone === "mist";

  useEffect(() => {
    setDraftEmoji(state.emoji);
  }, [state.emoji]);

  if (!ready) return null;

  function hang(id: (typeof CHARMS)[number]["id"]) {
    update({ id, hidden: false });
    track("charm_hung", { id });
    onHang?.();
  }

  function ritual(id: (typeof CHARMS)[number]["id"]) {
    if (id === "emoji") {
      setPickingEmoji((open) => !open);
      return;
    }
    update({ id, hidden: false });
    track("charm_hung", { id });
    requestCharmRitual();
    onHang?.();
  }

  function hangEmoji() {
    const emoji = draftEmoji.trim() ? normalizeEmoji(draftEmoji) : state.emoji;
    update({ id: "emoji", hidden: false, emoji });
    track("charm_hung", { id: "emoji" });
    setPickingEmoji(false);
    onHang?.();
  }

  function toggleHidden() {
    if (state.hidden) {
      update({ hidden: false });
      track("charm_hung", { id: state.id });
      onHang?.();
      return;
    }
    update({ hidden: true });
    track("charm_hidden", { id: state.id });
  }

  return (
    <div className="charm-gallery flex flex-col gap-8">
      {GROUPS.map((group) => (
        <div key={group.set}>
          <p
            className={`font-mono-label uppercase tracking-[0.14em] ${
              onMist ? "text-ink-soft" : "text-mist/70"
            }`}
          >
            {group.label}
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {CHARMS.filter((charm) => charm.set === group.set).map((charm) => {
              const selected = !state.hidden && state.id === charm.id;
              const isEmoji = charm.id === "emoji";
              return (
                <li key={charm.id} className={`charm-card ${selected ? "selected" : ""}`}>
                  <button
                    type="button"
                    className="select-charm"
                    data-select-charm={charm.slug}
                    aria-label={`Hang the ${charm.name}`}
                    aria-pressed={selected}
                    onClick={() => hang(charm.id)}
                  />
                  <div className="pointer-events-none relative flex flex-1 flex-col items-center px-[18px] pb-2 pt-2.5">
                    <div className="mb-1.5 flex h-[148px] items-center justify-center">
                      <div className="charm-plate">
                        {getCharmArt(charm.id).src ? (
                          <img src={getCharmArt(charm.id).src} alt="" />
                        ) : (
                          <CharmMark
                            id={charm.id}
                            emoji={state.emoji}
                            daruma={state.daruma}
                            drishti={state.drishti}
                            className="h-20 w-20"
                          />
                        )}
                      </div>
                    </div>
                    <p className="charm-name">{charm.name}</p>
                    <p className="origin mt-1.5 mb-3">{charm.origin}</p>
                    <p className="description mb-4">{charm.story}</p>
                  </div>
                  <button
                    type="button"
                    className="ritual-btn relative z-[2] mx-auto mb-5"
                    data-ritual={charm.slug}
                    data-kind={ritualKind(charm.id)}
                    aria-expanded={isEmoji ? pickingEmoji : undefined}
                    onClick={() => ritual(charm.id)}
                  >
                    {charm.id === "daruma" ? DARUMA_LABELS[state.daruma] : charm.ritualLabel}
                  </button>
                  {isEmoji && pickingEmoji ? (
                    <div className="emoji-editor relative z-[2] mx-auto mb-5 flex flex-col items-center gap-2">
                      <div className="emoji-editor-bar">
                        <input
                          id="emoji-input"
                          type="text"
                          inputMode="text"
                          autoComplete="off"
                          placeholder="Paste one"
                          maxLength={32}
                          aria-label="Type or paste any emoji to hang it"
                          value={draftEmoji}
                          onChange={(event) => setDraftEmoji(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              hangEmoji();
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="emoji-done"
                          id="emoji-done"
                          aria-label="Use this emoji"
                          onClick={hangEmoji}
                        >
                          <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                            <path
                              d="m5 10.4 3.1 3.1L15.5 6"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="flex flex-wrap justify-center gap-1">
                        {EMOJI_SET.map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            aria-label={`Hang ${preset}`}
                            className={`inline-flex h-8 w-8 items-center justify-center text-base ${
                              draftEmoji === preset ? "outline outline-1 outline-[var(--gold)]" : ""
                            }`}
                            onClick={() => {
                              setDraftEmoji(preset);
                              update({ id: "emoji", hidden: false, emoji: preset });
                              track("charm_hung", { id: "emoji" });
                            }}
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <button
        type="button"
        onClick={toggleHidden}
        className={`inline-flex min-h-11 items-center font-mono-label ${
          onMist ? "text-ink-soft hover:text-navy" : "text-mist/80 hover:text-gold"
        }`}
      >
        {state.hidden ? "Hang it" : "Put it away"}
      </button>
      {credit ? (
        <p
          className={`font-mono-label ${
            onMist ? "text-ink-soft/80" : "text-mist/50"
          }`}
        >
          Special thanks to Karthik Mahadevan for the hanging-charm idea.
        </p>
      ) : null}
    </div>
  );
}
