"use client";

import { animateScreening } from "@/animations/productStory";
import StoryStage from "./StoryStage";

const juryCards = [
  { id: "cut", label: "04 / 12", body: "What did you cut, and who lost because of that cut?" },
  { id: "who", label: "01 / 12", body: "Who is this for, in one sentence?" },
  { id: "not", label: "07 / 12", body: "What did you not design?" },
  { id: "evidence", label: "11 / 12", body: "Where is the evidence?" },
];

const roastCards = [
  { id: "screens", label: "Wound 01", body: "Project opens on screens." },
  { id: "slide", label: "Wound 02", body: "The problem appears on slide 11." },
  { id: "constraint", label: "Wound 03", body: "No constraint named." },
  { id: "opinion", label: "Wound 04", body: "Every project holds the same opinion." },
];

export default function ScreeningPreview({
  variant,
}: {
  variant: "jury" | "roast";
}) {
  const cards = variant === "jury" ? juryCards : roastCards;
  const primary = cards[0];
  const rest = cards.slice(1);

  return (
    <StoryStage play={animateScreening} replayLabel="Replay screening">
      <div className="relative min-h-[22rem] bg-mist p-5 text-navy sm:p-8">
        <p className="font-mono-label text-ink-soft">
          {variant === "jury" ? "Jury rehearsal" : "Roast checklist"}
        </p>
        <div className="relative mt-6 grid gap-3 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <article
            data-story-card
            data-story-primary
            className="border border-line bg-paper p-5"
          >
            <p className="font-mono-label text-gold">{primary.label}</p>
            <p className="mt-3 type-h3">{primary.body}</p>
            {variant === "jury" ? (
              <p className="mt-4 font-mono-label text-ink-soft">90 seconds. Answer out loud.</p>
            ) : (
              <p className="mt-4 font-mono-label text-ink-soft">Move the conflict to sentence one.</p>
            )}
          </article>
          <div className="relative min-h-[10rem]">
            {rest.map((card, index) => (
              <article
                key={card.id}
                data-story-card
                data-story-stack
                className="absolute inset-x-0 border border-line bg-paper p-4"
                style={{ top: index * 12 }}
              >
                <p className="font-mono-label text-ink-soft">{card.label}</p>
                <p className="mt-2 text-sm leading-relaxed">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
        <span
          data-story-node
          className="mt-8 inline-block size-3 bg-[#ED642F]"
          aria-hidden="true"
        />
      </div>
    </StoryStage>
  );
}
