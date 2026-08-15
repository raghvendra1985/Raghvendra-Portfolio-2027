import { retrieve } from "./retrieve";
import {
  matchSuggestedQuestion,
  nextQuestionsFor,
  suggestedQuestions,
} from "./suggested";
import type {
  ConciergeAnswer,
  ConciergeEvidence,
  ConciergeMode,
  ConciergeSource,
  RankedEntry,
} from "./types";

const NO_RESULT =
  "I don't have enough published evidence to answer that confidently.";

function evidenceLabel(entry: RankedEntry): string {
  switch (entry.source) {
    case "work":
      return `You can see this in ${entry.title.split(" — ")[0]} →`;
    case "framework":
      return `Read the ${entry.title} →`;
    case "knowledge":
      return `Read the note →`;
    case "system":
      return entry.slug === "system" ? "Explore Founder OS →" : `Explore ${entry.title} →`;
    case "about":
      return "About Raghvendra →";
    case "experience":
      return `See experience →`;
    case "services":
      return `See ${entry.title} →`;
    default:
      return "Open →";
  }
}

function toEvidence(entry: RankedEntry): ConciergeEvidence {
  return {
    label: evidenceLabel(entry),
    title: entry.title,
    url: entry.url,
    source: entry.source,
  };
}

function directAnswer(query: string, results: RankedEntry[], intentId?: string): string {
  const titles = results.slice(0, 3).map((r) => {
    if (r.source === "work") return r.title.split(" — ")[0];
    return r.title;
  });

  switch (intentId) {
    case "strongest-product":
      return `The strongest published product work is in the primary flagships — especially ${titles.slice(0, 3).join(", ")}.`;
    case "ai-products-built":
      return `Published AI product work includes ${titles.slice(0, 3).join(", ")}. Trust and judgment boundaries are covered in the AI Trust Stack.`;
    case "fintech":
      return `Fintech evidence spans EQTY, NYE Money at Rapipay, and related financial product work.`;
    case "design-systems":
      return `Design systems are treated as operating infrastructure — DesignOps, critique standards, and visible decision paths.`;
    case "leadership":
      return `Leadership evidence covers Design Lead work, enterprise architecture, critique systems, and Founder OS decision practice.`;
    case "founder-products":
      return `Founder-led products in the portfolio include GWK Ghostwriter, Growing With Kid, Bolo Buddy, and 2886 — held inside Founder OS.`;
    case "ai-in-design":
      return `AI is used as product craft: trust surfaces, human judgment boundaries, and AI Blueprint engagements — not as theatre.`;
    case "teach":
      return `Teaching is part of the practice: IIAD curriculum, workshops, and notes on teaching design through decisions.`;
    case "frameworks":
      return `Published frameworks include Decision Stack, Critique System, AI Trust Stack, Product Operating Model, Visible Learning Loop, and Product Filter.`;
    case "why-hire":
      return `Hire for product leadership, systems thinking, and AI product craft — evidenced in flagship work, career eras, and Founder OS.`;
    default:
      break;
  }

  const q = query.toLowerCase();
  if (q.includes("ai")) {
    return `AI product experience shows up in ${titles.slice(0, 3).join(", ")} — with methods in Knowledge and Founder OS.`;
  }
  if (q.includes("fintech") || q.includes("finance")) {
    return `Fintech experience is documented in ${titles.slice(0, 3).join(", ")}.`;
  }
  if (q.includes("teach") || q.includes("speak")) {
    return `Teaching and speaking evidence includes ${titles.slice(0, 3).join(", ")}.`;
  }
  if (q.includes("hire") || q.includes("leadership")) {
    return `Relevant leadership and hiring evidence includes ${titles.slice(0, 3).join(", ")}.`;
  }

  if (results.length === 1) {
    return `The strongest published match is ${titles[0]}.`;
  }

  return `Here’s the published evidence that matches: ${titles.join("; ")}.`;
}

/**
 * Deterministic response composer.
 * Future sprint can replace this function with an LLM layer over the same retrieve() results.
 */
export function composeResponse(
  query: string,
  mode: ConciergeMode = "hiring",
): ConciergeAnswer {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      answer: "Ask a specific question about work, AI, leadership, teaching, or frameworks.",
      evidence: [],
      related: [],
      nextQuestions: suggestedQuestions.slice(0, 2).map((q) => q.label),
      noResult: false,
    };
  }

  const suggested = matchSuggestedQuestion(trimmed);
  const searchQuery = suggested?.query ?? trimmed;
  const preferIds = suggested?.preferIds ?? [];
  const effectiveMode = suggested?.modeHint ?? mode;

  const results = retrieve(searchQuery, {
    mode: effectiveMode,
    preferIds,
    limit: 8,
    threshold: preferIds.length ? 1.5 : 2.5,
  });

  if (!results.length) {
    return {
      answer: NO_RESULT,
      evidence: [],
      related: [],
      nextQuestions: nextQuestionsFor(suggested?.id),
      noResult: true,
    };
  }

  const ordered = [...results].sort((a, b) => {
    const rank = (entry: RankedEntry) => {
      if (entry.source === "work" && entry.type === "case-study") return 0;
      if (entry.source === "framework") return 1;
      if (entry.source === "knowledge") return 2;
      if (entry.source === "system") return 3;
      return 4;
    };
    return rank(a) - rank(b);
  });

  const evidence = ordered.slice(0, 4).map(toEvidence);
  const related = ordered.slice(4, 7).map(toEvidence);

  return {
    answer: directAnswer(trimmed, ordered, suggested?.id),
    evidence,
    related,
    nextQuestions: nextQuestionsFor(suggested?.id),
    noResult: false,
  };
}

export function evidenceSourceLabel(source: ConciergeSource) {
  switch (source) {
    case "work":
      return "Work";
    case "knowledge":
      return "Knowledge";
    case "framework":
      return "Framework";
    case "system":
      return "Founder OS";
    case "about":
      return "About";
    case "experience":
      return "Experience";
    case "services":
      return "Services";
    default:
      return source;
  }
}
