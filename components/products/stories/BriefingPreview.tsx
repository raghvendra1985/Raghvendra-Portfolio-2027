"use client";

import { animateBriefing } from "@/animations/productStory";
import StoryStage from "./StoryStage";

const notes = [
  { id: "user", label: "User" },
  { id: "constraint", label: "Constraint" },
  { id: "success", label: "Success test" },
];

export default function BriefingPreview() {
  return (
    <StoryStage play={animateBriefing} replayLabel="Replay briefing">
      <div className="relative min-h-[22rem] overflow-hidden bg-mist p-5 text-navy sm:p-8">
        <p className="font-mono-label text-ink-soft">Daily brief</p>
        <div data-story-tabs className="relative mt-4 inline-flex gap-2">
          <span data-story-tab-thumb className="absolute inset-y-0 left-0 z-0 w-[7.5rem] bg-navy" aria-hidden="true" />
          <span data-story-tab className="relative z-10 min-h-11 px-4 py-2 font-mono-label text-mist">
            Morning
          </span>
          <span data-story-tab className="relative z-10 min-h-11 px-4 py-2 font-mono-label text-ink-soft">
            Afternoon
          </span>
        </div>

        <div className="relative mt-8 min-h-[12rem]">
          {notes.map((note, index) => (
            <article
              key={note.id}
              data-story-brief-card
              className="absolute border border-line bg-paper px-4 py-3 font-mono-label"
              style={{ left: index * 28, top: index * 18 }}
            >
              {note.label}
            </article>
          ))}

          <div data-story-reader className="relative border border-line bg-paper p-5">
            <div data-story-morning>
              <p className="font-mono-label text-gold">Morning</p>
              <p className="mt-3 text-sm leading-relaxed">
                Reduce missed doses for a 70-year-old who shares a phone with her daughter.
              </p>
            </div>
            <div data-story-afternoon className="absolute inset-0 bg-paper p-5">
              <p className="font-mono-label text-gold">Afternoon</p>
              <p className="mt-3 text-sm leading-relaxed">
                Constraint: two-bar network. Success: she completes the task without asking for help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </StoryStage>
  );
}
