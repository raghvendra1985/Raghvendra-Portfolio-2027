import { buildConciergeIndex } from "./sources";
import type { ConciergeMode, RankedEntry } from "./types";

const STOPWORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "to",
  "of",
  "in",
  "on",
  "for",
  "with",
  "your",
  "you",
  "me",
  "my",
  "i",
  "is",
  "are",
  "do",
  "how",
  "what",
  "why",
  "show",
  "tell",
  "about",
  "have",
  "has",
  "been",
  "that",
  "this",
  "from",
  "into",
  "should",
]);

const MODE_BOOSTS: Record<ConciergeMode, Partial<Record<string, number>>> = {
  hiring: {
    work: 1.35,
    knowledge: 1.15,
    system: 1.2,
    experience: 1.25,
    about: 1.1,
    framework: 1.05,
    services: 0.9,
  },
  project: {
    work: 1.25,
    services: 1.4,
    framework: 1.2,
    knowledge: 1.1,
    system: 1.05,
    about: 0.95,
    experience: 0.95,
  },
  speaking: {
    experience: 1.4,
    system: 1.25,
    knowledge: 1.2,
    about: 1.15,
    framework: 1.1,
    work: 0.95,
    services: 1.05,
  },
};

const MODE_TOPIC_BOOSTS: Record<ConciergeMode, string[]> = {
  hiring: [
    "leadership",
    "product",
    "ai",
    "systems",
    "flagship",
    "fintech",
    "founder",
    "case-study",
  ],
  project: [
    "strategy",
    "design systems",
    "ai",
    "services",
    "ux",
    "ui",
    "workshop",
    "advisory",
    "governance",
  ],
  speaking: [
    "teaching",
    "iiad",
    "learning",
    "workshop",
    "speaking",
    "curriculum",
    "mentoring",
  ],
};

export function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s+-]/gu, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));
}

const QUERY_ALIASES: [string, string][] = [
  ["kids", "growing with kid gwk parenting"],
  ["kid", "growing with kid gwk"],
  ["parenting", "growing with kid gwk"],
  ["parents", "growing with kid"],
  ["ghostwriter", "gwk ghostwriter ai writing"],
  ["money", "fintech nye eqty rapipay"],
  ["payments", "nye rapipay fintech"],
  ["resume", "about experience leadership career"],
  ["cv", "about experience career"],
  ["available", "contact hire open opportunities"],
  ["availability", "contact hire"],
  ["hire me", "why hire leadership about"],
  ["who are you", "about raghvendra product design leader"],
  ["start", "flagship eqty ghostwriter bolo buddy"],
];

export function expandQuery(query: string): string {
  const q = query.toLowerCase();
  const extra: string[] = [];
  for (const [needle, aliases] of QUERY_ALIASES) {
    if (q.includes(needle)) extra.push(aliases);
  }
  return extra.length ? `${query} ${extra.join(" ")}` : query;
}

function fieldScore(haystack: string, tokens: string[], weight: number) {
  if (!haystack || !tokens.length) return 0;
  const text = haystack.toLowerCase();
  let score = 0;
  for (const token of tokens) {
    if (text.includes(token)) score += weight;
    else if (token.length > 4 && text.includes(token.slice(0, -1))) score += weight * 0.5;
  }
  return score;
}

export type RetrieveOptions = {
  mode?: ConciergeMode;
  limit?: number;
  preferIds?: string[];
  threshold?: number;
};

export function retrieve(query: string, options: RetrieveOptions = {}): RankedEntry[] {
  const {
    mode = "hiring",
    limit = 8,
    preferIds = [],
    threshold = 1.2,
  } = options;

  const tokens = tokenize(expandQuery(query));
  if (!tokens.length && !preferIds.length) return [];

  const index = buildConciergeIndex();
  const prefer = new Set(preferIds);
  const topicBoosts = MODE_TOPIC_BOOSTS[mode];
  const sourceBoost = MODE_BOOSTS[mode];

  const ranked: RankedEntry[] = index.map((entry) => {
    let score = 0;
    score += fieldScore(entry.title, tokens, 4.5);
    score += fieldScore(entry.topics.join(" "), tokens, 3.5);
    score += fieldScore(entry.summary, tokens, 2.5);
    score += fieldScore(entry.type, tokens, 2);
    score += fieldScore(entry.source, tokens, 1.5);
    score += fieldScore(entry.content, tokens, 1);
    score += fieldScore(entry.slug.replace(/-/g, " "), tokens, 2);

    for (const topic of topicBoosts) {
      if (entry.topics.join(" ").toLowerCase().includes(topic) || entry.content.toLowerCase().includes(topic)) {
        score *= 1.08;
      }
    }

    score *= sourceBoost[entry.source] ?? 1;

    if (prefer.has(entry.id)) score += 12;

    // Phrase-ish boosts for common recruiter intents
    const q = query.toLowerCase();
    if (q.includes("ai") && /ai|trust|bolo|eqty|blueprint|ghostwriter/.test(`${entry.title} ${entry.topics.join(" ")}`.toLowerCase())) {
      score += 3;
    }
    if (q.includes("fintech") && /fintech|eqty|nye|rapipay|currency|strike/.test(`${entry.title} ${entry.topics.join(" ")}`.toLowerCase())) {
      score += 3;
    }
    if ((q.includes("founder") || q.includes("venture")) && /founder|growing|bolo|2886|ghostwriter/.test(`${entry.title} ${entry.topics.join(" ")}`.toLowerCase())) {
      score += 2.5;
    }
    if ((q.includes("teach") || q.includes("speak") || q.includes("iiad")) && /teach|iiad|learning|workshop/.test(`${entry.title} ${entry.topics.join(" ")} ${entry.content}`.toLowerCase())) {
      score += 3;
    }
    if (q.includes("hire") || q.includes("why should") || q.includes("leadership")) {
      if (entry.source === "about" || entry.source === "experience" || entry.type === "case-study") score += 2;
    }
    if (q.includes("design system") || q.includes("systems")) {
      if (/system|designops|operating|critique|infrastructure/.test(`${entry.title} ${entry.topics.join(" ")}`.toLowerCase())) {
        score += 2.5;
      }
    }
    if (q.includes("framework")) {
      if (entry.source === "framework") score += 4;
    }

    return { ...entry, score };
  });

  return ranked
    .filter((entry) => entry.score >= threshold || prefer.has(entry.id))
    .sort((a, b) => {
      const preferDelta =
        (prefer.has(b.id) ? 1 : 0) - (prefer.has(a.id) ? 1 : 0);
      if (preferDelta !== 0) {
        const ai = preferIds.indexOf(a.id);
        const bi = preferIds.indexOf(b.id);
        if (ai >= 0 && bi >= 0) return ai - bi;
        return preferDelta;
      }
      return b.score - a.score;
    })
    .slice(0, limit);
}
