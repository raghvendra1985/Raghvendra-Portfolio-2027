import { retrieve } from "./retrieve";
import {
  inferModeFromQuery,
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
      return entry.slug === "system" ? "Explore System →" : `Explore ${entry.title} →`;
    case "about":
      return entry.slug === "contact" ? "Open contact →" : "About Raghvendra →";
    case "experience":
      return `See experience →`;
    case "services":
      return `See ${entry.title} →`;
    case "products":
      return entry.slug === "products" ? "Open Studio tools →" : `Open ${entry.title} →`;
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

function listTitles(results: RankedEntry[], count = 3) {
  return results.slice(0, count).map((r) => {
    if (r.source === "work") return r.title.split(" — ")[0];
    return r.title;
  });
}

function joinTitles(titles: string[]) {
  if (titles.length <= 1) return titles[0] ?? "";
  if (titles.length === 2) return `${titles[0]} and ${titles[1]}`;
  return `${titles.slice(0, -1).join(", ")}, and ${titles[titles.length - 1]}`;
}

function directAnswer(
  query: string,
  results: RankedEntry[],
  intentId?: string,
  closest?: boolean,
): string {
  const titles = listTitles(results);
  const named = joinTitles(titles);

  if (closest) {
    return `I don’t have a precise match for that wording. Closest published matches: ${named}. Ask a follow-up to narrow it.`;
  }

  switch (intentId) {
    case "strongest-product":
      return `Start with the flagships — ${named}. Each one shows a different scale of product problem.`;
    case "ai-products-built":
      return `Published AI product work includes ${named}. Trust and judgment boundaries live in the AI Trust Stack.`;
    case "fintech":
      return `Fintech evidence starts with UX leadership for NYE Money at Rapipay, with EQTY as supporting founding design partnership.`;
    case "design-systems":
      return `Design systems are treated as operating infrastructure — DesignOps, critique standards, and visible decision paths.`;
    case "leadership":
      return `Leadership evidence covers Design Lead work, enterprise architecture, critique systems, and System decision practice.`;
    case "founder-products":
      return `Founder products are held as practice on System — small products that test the operating system under real constraints — with published evidence on Work.`;
    case "ai-in-design":
      return `AI is used as product craft: trust surfaces, human judgment boundaries, and AI Blueprint engagements — not as theatre.`;
    case "teach":
      return `Teaching is part of the practice: IIAD curriculum, workshops, and notes on teaching design through decisions.`;
    case "frameworks":
      return `Published frameworks include Decision Stack, Critique System, AI Trust Stack, Product Operating Model, Visible Learning Loop, and Product Filter.`;
    case "why-hire":
      return `Hire for product leadership evidenced in the featured trio — Rapipay, Crowley, and Ghostwriter — plus career eras on About and the methodology on System.`;
    case "system-methodology":
      return `System is the methodology page — how to think, decide, build, learn, and operate. Work proves contribution across Product direction, Complex systems, AI and founder products, Enterprise leadership, and Brand and web work.`;
    case "start-here":
      return `Start with ${named} — Rapipay, Crowley, and Ghostwriter. Then ask about AI, fintech, or leadership if you want a narrower path.`;
    case "about-who":
      return `Raghvendra is a product design leader whose work moved from visual craft and industrial constraints through digital products and organisational decisions, into founder work and teaching. About holds the five chapters.`;
    case "availability":
      return `Open to selected product leadership, advisory, and collaborations. Contact is the next step if the work looks like a fit.`;
    case "parenting-gwk":
      return `Growing With Kid is the parenting community product — one clear job for parents, shipped as a live founder product.`;
    case "eqty":
      return `EQTY is a founding design partnership: a shared operating model so trust, ledger operations, and workflow could extend as one system instead of three separate products.`;
    case "ghostwriter":
      return `GWK Ghostwriter is a shipped research-to-post writing studio with long-term memory, voice rules, and source material — not a prompt box. The case study holds the published evidence.`;
    case "nye-money":
      return `Led UX for NYE Money at Rapipay, unifying wallet, UPI, partner banking, and investments into one consumer system adopted across the product organisation.`;
    case "resume":
      return `The published career path is on About — twenty years across visual, industrial, product, and organisational design, with 14+ years leading digital products and UX systems. Read the five chapters, or request a résumé from Contact.`;
    default:
      break;
  }

  const q = query.toLowerCase();
  if (q.includes("ai")) {
    return `AI product experience shows up in ${named} — with methods on System and field notes on Notes.`;
  }
  if (q.includes("fintech") || q.includes("finance")) {
    return `Fintech experience is documented in ${named}.`;
  }
  if (q.includes("teach") || q.includes("speak")) {
    return `Teaching and speaking evidence includes ${named}.`;
  }
  if (q.includes("hire") || q.includes("leadership")) {
    return `Relevant leadership and hiring evidence includes ${named}.`;
  }

  if (results.length === 1) {
    return `The strongest published match is ${titles[0]}. Open it, or ask a follow-up.`;
  }

  return `${named} are the published matches. Open one, or ask a follow-up to go narrower.`;
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
      nextQuestions: suggestedQuestions.slice(0, 3).map((q) => q.label),
      noResult: false,
    };
  }

  const suggested = matchSuggestedQuestion(trimmed);
  const searchQuery = suggested?.query ?? trimmed;
  const preferIds = suggested?.preferIds ?? [];
  const effectiveMode = suggested?.modeHint ?? inferModeFromQuery(trimmed) ?? mode;

  let closest = false;
  let results = retrieve(searchQuery, {
    mode: effectiveMode,
    preferIds,
    limit: 8,
    threshold: preferIds.length ? 1.5 : 1.2,
  });

  if (!results.length) {
    closest = true;
    results = retrieve(searchQuery, {
      mode: effectiveMode,
      preferIds,
      limit: 3,
      threshold: 0,
    });
  }

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
    answer: directAnswer(trimmed, ordered, suggested?.id, closest),
    evidence,
    related,
    nextQuestions: nextQuestionsFor(suggested?.id, 3),
    noResult: false,
    closest,
  };
}

export function evidenceSourceLabel(source: ConciergeSource) {
  switch (source) {
    case "work":
      return "Work";
    case "knowledge":
      return "Notes";
    case "framework":
      return "Notes";
    case "system":
      return "System";
    case "about":
      return "About";
    case "experience":
      return "Experience";
    case "services":
      return "Services";
    case "products":
      return "Studio tools";
    default:
      return source;
  }
}
