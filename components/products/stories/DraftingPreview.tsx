"use client";

import { animateDrafting } from "@/animations/productStory";
import StoryStage from "./StoryStage";

const sources = ["Context", "User", "Stakes"];
const blocks = [
  "Reduce missed doses for a 70-year-old who shares a phone with her daughter.",
  "Constraint: works in a two-bar network.",
  "Success: she can complete the task without asking for help.",
];

export default function DraftingPreview() {
  return (
    <StoryStage play={animateDrafting} replayLabel="Replay drafting">
      <div className="bg-mist p-5 text-navy sm:p-8">
        <p className="font-mono-label text-ink-soft">Brief builder</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-3">
            {sources.map((label) => (
              <p
                key={label}
                data-story-source
                className="border border-line bg-paper px-4 py-3 font-mono-label"
              >
                {label}
              </p>
            ))}
          </div>
          <div data-story-composer className="border border-line bg-paper p-5">
            <p className="font-mono-label text-ink-soft">Draft</p>
            <div className="mt-4 space-y-3">
              {blocks.map((block) => (
                <p key={block} data-story-block className="text-sm leading-relaxed">
                  {block}
                </p>
              ))}
            </div>
            <p data-story-review className="mt-6 font-mono-label text-green">
              Review-ready
            </p>
            <p
              data-story-send
              className="mt-6 inline-flex min-h-11 items-center border border-navy px-4 font-mono-label"
            >
              Send
            </p>
          </div>
        </div>
      </div>
    </StoryStage>
  );
}
