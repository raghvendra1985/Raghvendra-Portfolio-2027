"use client";

import { useMemo, useState } from "react";
import DesignIqDemo from "@/components/products/DesignIqDemo";
import EmptyState from "@/components/product-app/EmptyState";
import FeedbackWidget from "@/components/product-app/FeedbackWidget";
import InputPanel from "@/components/product-app/InputPanel";
import OutputPanel from "@/components/product-app/OutputPanel";
import ProductAppShell from "@/components/product-app/ProductAppShell";
import ProductHeader from "@/components/product-app/ProductHeader";
import ProgressIndicator from "@/components/product-app/ProgressIndicator";
import SaveState from "@/components/product-app/SaveState";
import UpgradeNotice from "@/components/product-app/UpgradeNotice";
import MagneticButton from "@/components/buttons/MagneticButton";
import { track } from "@/lib/analytics";
import type { Product } from "@/products";
import { dares, defenceLines, detectiveCases, entrancePaper, gymSets, juryQuestions, portfolioGaps, roastLenses, critCards } from "@/products/runtime/sets";
import { designPrompts } from "@/products/runtime/prompts";
import { spinTriple } from "@/products/runtime/wheels";

const field =
  "mt-2 min-h-12 w-full border border-navy/20 bg-mist px-4 py-3 text-base text-navy";

function ToolFooter({ product }: { product: Product }) {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
      <UpgradeNotice slug={product.slug} />
      <FeedbackWidget productName={product.name} />
    </div>
  );
}

function DesignDareApp() {
  const [index, setIndex] = useState(0);
  const [defence, setDefence] = useState(Object.fromEntries(defenceLines.map((line) => [line, ""])));
  const dare = dares[index % dares.length];
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      <InputPanel title="Dare">
        <ProgressIndicator current={index + 1} total={dares.length} label="Card" />
        <p className="mt-4 font-display text-3xl">{dare.title}</p>
        <p className="mt-3 text-sm text-ink-soft">{dare.constraint}</p>
        <p className="mt-4 text-base leading-relaxed">{dare.make}</p>
        <button
          type="button"
          className="mt-6 inline-flex min-h-11 font-mono-label text-[11px] hover:text-gold"
          onClick={() => setIndex((value) => value + 1)}
        >
          Draw another dare
        </button>
      </InputPanel>
      <OutputPanel title="Defence — five lines">
        {defenceLines.map((line) => (
          <label key={line} className="mt-4 block">
            <span className="font-mono-label text-[11px] text-mist/50">{line}</span>
            <textarea
              className="mt-2 min-h-16 w-full border border-mist/20 bg-navy px-3 py-2 text-mist"
              value={defence[line]}
              onChange={(event) => setDefence((current) => ({ ...current, [line]: event.target.value }))}
            />
          </label>
        ))}
        <SaveState storageKey="sp-design-dare" value={{ index, defence }} />
      </OutputPanel>
    </div>
  );
}

function SpinnerApp({
  product,
  mode,
}: {
  product: Product;
  mode: "challenge" | "sketch";
}) {
  const [seed, setSeed] = useState(1);
  const spin = useMemo(() => spinTriple(seed * 97), [seed]);
  const line =
    mode === "sketch"
      ? `Object: ${spin.object}. User: ${spin.user}. Constraint: ${spin.constraint}. Draw.`
      : `Challenge: a ${spin.domain} for ${spin.user}. Constraint: ${spin.constraint}. Time: 40 minutes.`;
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      <InputPanel title={mode === "sketch" ? "Wheels" : "Spinner"}>
        <p className="text-sm text-ink-soft">One challenge. Not a menu.</p>
        <button
          type="button"
          className="mt-6 inline-flex min-h-11 items-center border border-navy px-4 font-mono-label text-[11px]"
          onClick={() => {
            track("product_opened", { slug: product.slug, action: "spin" });
            setSeed((value) => value + 1);
          }}
        >
          Spin
        </button>
      </InputPanel>
      <OutputPanel title="Your draw">
        <p className="font-display text-2xl leading-snug">{line}</p>
        <p className="mt-6 font-mono-label text-[11px] text-mist/50">Ten minutes. Pencil. Start.</p>
      </OutputPanel>
    </div>
  );
}

function JuryApp() {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const question = juryQuestions[index];
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      <InputPanel title="Rehearsal">
        <ProgressIndicator current={index + 1} total={juryQuestions.length} label="Question" />
        <p className="mt-6 font-display text-3xl leading-snug">{question}</p>
        <p className="mt-4 font-mono-label text-[11px] text-ink-soft">90 seconds. Answer out loud.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" className="min-h-11 border border-navy px-4 font-mono-label text-[11px]" onClick={() => setRevealed(true)}>
            Reveal a stronger angle
          </button>
          <button
            type="button"
            className="min-h-11 px-4 font-mono-label text-[11px]"
            onClick={() => {
              setIndex((value) => (value + 1) % juryQuestions.length);
              setRevealed(false);
            }}
          >
            Next question
          </button>
        </div>
      </InputPanel>
      <OutputPanel title="After you have tried">
        {revealed ? (
          <p className="text-lg leading-relaxed">
            Name the cut, the loser, and the evidence. If you cannot name a loser, you have not decided.
          </p>
        ) : (
          <p className="text-mist/60">The sample angle waits until you have spoken.</p>
        )}
      </OutputPanel>
    </div>
  );
}

function BriefApp() {
  const [context, setContext] = useState("");
  const [user, setUser] = useState("");
  const [stakes, setStakes] = useState("");
  const brief =
    context && user && stakes
      ? `Brief: ${stakes} for ${user} in ${context}. Constraint: works without a perfect network. Success: they can complete the task without asking for help.`
      : "";
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      <InputPanel title="Context">
        <label className="block">
          Place
          <input className={field} value={context} onChange={(event) => setContext(event.target.value)} />
        </label>
        <label className="mt-4 block">
          User
          <input className={field} value={user} onChange={(event) => setUser(event.target.value)} />
        </label>
        <label className="mt-4 block">
          Stakes
          <input className={field} value={stakes} onChange={(event) => setStakes(event.target.value)} />
        </label>
      </InputPanel>
      <OutputPanel title="Brief">
        {brief ? <p className="text-lg leading-relaxed">{brief}</p> : <p className="text-mist/60">Answer the three questions.</p>}
        <SaveState storageKey="sp-brief-me" value={{ context, user, stakes }} />
      </OutputPanel>
    </div>
  );
}

function RoastApp() {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const wounds = roastLenses.filter((lens) => checks[lens]);
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      <InputPanel title="Walk one case study">
        {roastLenses.map((lens) => (
          <label key={lens} className="mt-3 flex items-start gap-3 text-sm leading-relaxed">
            <input
              type="checkbox"
              checked={Boolean(checks[lens])}
              onChange={(event) => setChecks((current) => ({ ...current, [lens]: event.target.checked }))}
            />
            {lens}
          </label>
        ))}
      </InputPanel>
      <OutputPanel title="Punch list">
        {wounds.length ? (
          <ul className="space-y-3">
            {wounds.map((wound) => (
              <li key={wound}>{wound} Move the conflict to sentence one if a recruiter would bounce.</li>
            ))}
          </ul>
        ) : (
          <p className="text-mist/60">Tick the wounds you recognise.</p>
        )}
      </OutputPanel>
    </div>
  );
}

function GymApp() {
  const [active, setActive] = useState<(typeof gymSets)[number] | null>(null);
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      <InputPanel title="Session length">
        <div className="flex flex-wrap gap-3">
          {gymSets.map((set) => (
            <button
              key={set.title}
              type="button"
              onClick={() => setActive(set)}
              className="min-h-11 border border-navy px-4 font-mono-label text-[11px]"
            >
              {set.minutes} min · {set.title}
            </button>
          ))}
        </div>
      </InputPanel>
      <OutputPanel title="Set">
        {active ? (
          <>
            <p className="font-display text-2xl">{active.title}</p>
            <p className="mt-4 text-lg leading-relaxed">{active.brief}</p>
            <p className="mt-6 font-mono-label text-[11px] text-mist/50">Stop when the timer stops.</p>
          </>
        ) : (
          <p className="text-mist/60">Pick a set.</p>
        )}
      </OutputPanel>
    </div>
  );
}

function DetectiveApp() {
  const [index, setIndex] = useState(0);
  const file = detectiveCases[index];
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      <InputPanel title="Case file">
        <p className="font-display text-3xl">{file.place}</p>
        <p className="mt-4 text-sm text-ink-soft">Artefact: {file.artefact}</p>
        <p className="mt-4 leading-relaxed">{file.friction}</p>
        <button type="button" className="mt-6 min-h-11 font-mono-label text-[11px]" onClick={() => setIndex((value) => (value + 1) % detectiveCases.length)}>
          Next case
        </button>
      </InputPanel>
      <OutputPanel title="The crime">
        <p className="text-lg leading-relaxed">{file.crime}</p>
        <p className="mt-6 text-sm text-mist/60">Now write the mismatch in your own words before you propose a fix.</p>
      </OutputPanel>
    </div>
  );
}

function EntranceApp() {
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="mt-10 grid gap-6">
      {!started ? (
        <EmptyState title="Sit the paper." body="90 minutes. Observation, making, defence. You cannot pause the clock. That is the practice." />
      ) : null}
      {started && !submitted ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {entrancePaper.parts.map((part) => (
            <InputPanel key={part.id} title={`Part ${part.id} · ${part.title}`}>
              <p className="leading-relaxed">{part.prompt}</p>
            </InputPanel>
          ))}
        </div>
      ) : null}
      {submitted ? (
        <OutputPanel title="Debrief — not a rank">
          <ul className="space-y-3">
            {entrancePaper.markScheme.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </OutputPanel>
      ) : null}
      <div className="flex flex-wrap gap-3">
        {!started ? (
          <MagneticButton onClick={() => setStarted(true)}>Start the sitting</MagneticButton>
        ) : !submitted ? (
          <MagneticButton onClick={() => setSubmitted(true)}>Submit paper</MagneticButton>
        ) : null}
      </div>
    </div>
  );
}

function DecisionApp() {
  const [gap, setGap] = useState<(typeof portfolioGaps)[number] | null>(null);
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      <InputPanel title="What does the portfolio already prove?">
        {portfolioGaps.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setGap(item)}
            className="mt-3 block min-h-11 text-left font-mono-label text-[11px] hover:text-gold"
          >
            Missing: {item.label}
          </button>
        ))}
      </InputPanel>
      <OutputPanel title="Next / Stop">
        {gap ? (
          <>
            <p className="text-lg">Next project: {gap.next}</p>
            <p className="mt-4 text-mist/70">Stop: {gap.stop}</p>
          </>
        ) : (
          <p className="text-mist/60">Name the missing proof.</p>
        )}
      </OutputPanel>
    </div>
  );
}

function CritApp() {
  const [index, setIndex] = useState(0);
  return (
    <div className="mt-10">
      <OutputPanel title="One card">
        <p className="font-display text-3xl leading-snug">{critCards[index]}</p>
        <button type="button" className="mt-8 min-h-11 font-mono-label text-[11px] text-gold" onClick={() => setIndex((value) => (value + 1) % critCards.length)}>
          Draw again
        </button>
      </OutputPanel>
    </div>
  );
}

function PromptsApp() {
  const [query, setQuery] = useState("");
  const list = designPrompts
    .map((prompt, index) => ({ prompt, n: index + 1 }))
    .filter((item) => item.prompt.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="mt-10">
      <InputPanel title="Pick by number, mood, or constraint">
        <input className={field} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" />
      </InputPanel>
      <ol className="mt-8 space-y-4">
        {list.map((item) => (
          <li key={item.n} className="border-b border-line pb-4">
            <span className="font-mono-label text-[11px] text-green">{String(item.n).padStart(3, "0")}</span>
            <p className="mt-2 text-base leading-relaxed">{item.prompt}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function ProductRuntime({ product }: { product: Product }) {
  return (
    <ProductAppShell>
      <ProductHeader product={product} />
      {product.slug === "design-dare" ? <DesignDareApp /> : null}
      {product.slug === "design-roulette" ? <SpinnerApp product={product} mode="challenge" /> : null}
      {product.slug === "sketch-roulette" ? <SpinnerApp product={product} mode="sketch" /> : null}
      {product.slug === "jury-me" ? <JuryApp /> : null}
      {product.slug === "brief-me" ? <BriefApp /> : null}
      {product.slug === "design-iq" ? (
        <div className="mt-10">
          <DesignIqDemo />
        </div>
      ) : null}
      {product.slug === "portfolio-roast" ? <RoastApp /> : null}
      {product.slug === "idea-gym" ? <GymApp /> : null}
      {product.slug === "design-detective" ? <DetectiveApp /> : null}
      {product.slug === "design-entrance-simulator" ? <EntranceApp /> : null}
      {product.slug === "what-should-i-design" ? <DecisionApp /> : null}
      {product.slug === "crit-card" ? <CritApp /> : null}
      {product.slug === "100-design-prompts" ? <PromptsApp /> : null}
      <ToolFooter product={product} />
    </ProductAppShell>
  );
}
