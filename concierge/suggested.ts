import type { ConciergeMode } from "./types";

export type SuggestedQuestion = {
  id: string;
  label: string;
  query: string;
  preferIds: string[];
  modeHint?: ConciergeMode;
};

export const suggestedQuestions: SuggestedQuestion[] = [
  {
    id: "strongest-product",
    label: "Show me your strongest product work",
    query: "strongest product work flagship EQTY GWK Ghostwriter Growing With Kid Bolo Buddy",
    preferIds: ["work:eqty", "work:gwk-ghostwriter", "work:growing-with-kid", "work:bolo-buddy"],
    modeHint: "hiring",
  },
  {
    id: "ai-products-built",
    label: "What AI products have you built?",
    query: "AI products built GWK Ghostwriter Bolo Buddy EQTY Sagacito Ethiqly AI Trust Stack",
    preferIds: [
      "work:gwk-ghostwriter",
      "work:bolo-buddy",
      "work:eqty",
      "work:sagacito",
      "work:ethiqly",
      "framework:ai-trust-stack",
      "knowledge:ai-products-earn-trust",
      "system:products",
    ],
    modeHint: "hiring",
  },
  {
    id: "fintech",
    label: "Show me fintech experience",
    query: "fintech financial EQTY NYE Rapipay Strike currency",
    preferIds: [
      "work:eqty",
      "work:nye",
      "experience:leadership-arc",
      "work:strike",
      "work:smart-currency-exchange",
      "system:products",
    ],
    modeHint: "hiring",
  },
  {
    id: "design-systems",
    label: "How do you approach design systems?",
    query: "design systems DesignOps operating model critique system infrastructure",
    preferIds: [
      "services:systems-designops",
      "services:product-leadership",
      "knowledge:operating-model-invisible",
      "framework:product-operating-model",
      "knowledge:critique-system",
      "about:belief:02",
    ],
    modeHint: "project",
  },
  {
    id: "leadership",
    label: "What leadership experience do you have?",
    query: "leadership design lead product leadership critique system experience",
    preferIds: [
      "experience:leadership-arc",
      "experience:ux-lead-arc",
      "knowledge:critique-system",
      "system:principles",
      "system:decisions",
      "about:overview",
    ],
    modeHint: "hiring",
  },
  {
    id: "founder-products",
    label: "Show founder-led products",
    query: "founder products GWK Ghostwriter Growing With Kid Bolo Buddy 2886 Founder OS",
    preferIds: [
      "work:gwk-ghostwriter",
      "work:growing-with-kid",
      "work:bolo-buddy",
      "work:2886",
      "system:products",
      "system:focus",
      "knowledge:building-growing-with-kid",
    ],
    modeHint: "hiring",
  },
  {
    id: "ai-in-design",
    label: "How do you use AI in product design?",
    query: "AI in product design trust judgment AI Blueprint AI Trust Stack",
    preferIds: [
      "services:ai-product-building",
      "framework:ai-trust-stack",
      "knowledge:ai-products-earn-trust",
      "about:belief:03",
      "work:gwk-ghostwriter",
      "work:bolo-buddy",
      "work:eqty",
    ],
    modeHint: "project",
  },
  {
    id: "teach",
    label: "What do you teach?",
    query: "teach teaching IIAD curriculum workshops learning decisions",
    preferIds: [
      "system:teaching",
      "experience:founder",
      "knowledge:teaching-design-through-decisions",
      "framework:visible-learning-loop",
    ],
    modeHint: "speaking",
  },
  {
    id: "frameworks",
    label: "Show relevant frameworks",
    query: "frameworks Decision Stack Critique System AI Trust Stack Product Filter",
    preferIds: [
      "framework:decision-stack",
      "framework:critique-system",
      "framework:ai-trust-stack",
      "framework:product-operating-model",
      "framework:visible-learning-loop",
      "framework:product-filter",
    ],
    modeHint: "project",
  },
  {
    id: "why-hire",
    label: "Why should I hire you?",
    query: "why hire product design leader systems AI leadership experience",
    preferIds: [
      "about:overview",
      "work:eqty",
      "work:bolo-buddy",
      "experience:leadership-arc",
      "system:principles",
      "system:focus",
    ],
    modeHint: "hiring",
  },
  {
    id: "start-here",
    label: "Where should I start?",
    query: "where should I start flagship EQTY GWK Ghostwriter Growing With Kid Bolo Buddy about",
    preferIds: [
      "work:eqty",
      "work:gwk-ghostwriter",
      "work:growing-with-kid",
      "work:bolo-buddy",
      "about:overview",
    ],
    modeHint: "hiring",
  },
  {
    id: "about-who",
    label: "Who is Raghvendra?",
    query: "who are you about product design leader systems AI",
    preferIds: ["about:overview", "experience:leadership-arc", "system:identity", "about:contact"],
    modeHint: "hiring",
  },
  {
    id: "availability",
    label: "Are you available to work together?",
    query: "available availability contact hire open opportunities email",
    preferIds: ["about:contact", "about:overview", "services:product-leadership"],
    modeHint: "hiring",
  },
  {
    id: "parenting-gwk",
    label: "Show Growing With Kid",
    query: "kids parenting children Growing With Kid GWK community",
    preferIds: ["work:growing-with-kid", "knowledge:building-growing-with-kid", "system:products"],
    modeHint: "hiring",
  },
  {
    id: "ghostwriter",
    label: "What is GWK Ghostwriter?",
    query: "ghostwriter GWK Ghostwriter AI writing product",
    preferIds: ["work:gwk-ghostwriter", "system:products", "system:focus"],
    modeHint: "hiring",
  },
  {
    id: "nye-money",
    label: "Show NYE Money / Rapipay",
    query: "NYE money Rapipay fintech payments",
    preferIds: ["work:nye", "work:eqty", "experience:leadership-arc"],
    modeHint: "hiring",
  },
  {
    id: "resume",
    label: "Where is your experience / CV?",
    query: "resume CV curriculum vitae experience career about",
    preferIds: [
      "about:overview",
      "experience:leadership-arc",
      "experience:ux-lead-arc",
      "experience:founder",
      "about:contact",
    ],
    modeHint: "hiring",
  },
];

export function matchSuggestedQuestion(query: string) {
  const normalized = query.trim().toLowerCase();
  const exact = suggestedQuestions.find(
    (item) =>
      item.label.toLowerCase() === normalized ||
      item.query.toLowerCase() === normalized ||
      item.id === normalized,
  );
  if (exact) return exact;

  // Soft intent matching for free-typed recruiter queries
  if (
    (normalized.includes("ai product") ||
      (normalized.includes("ai") &&
        (normalized.includes("experience") ||
          normalized.includes("built") ||
          normalized.includes("work")))) &&
    !normalized.includes("design system")
  ) {
    return suggestedQuestions.find((item) => item.id === "ai-products-built");
  }
  if (normalized.includes("fintech") || normalized.includes("financial")) {
    return suggestedQuestions.find((item) => item.id === "fintech");
  }
  if (normalized.includes("design system") || normalized.includes("designops")) {
    return suggestedQuestions.find((item) => item.id === "design-systems");
  }
  if (normalized.includes("framework")) {
    return suggestedQuestions.find((item) => item.id === "frameworks");
  }
  if (normalized.includes("teach") || normalized.includes("speak") || normalized.includes("iiad")) {
    return suggestedQuestions.find((item) => item.id === "teach");
  }
  if (normalized.includes("founder")) {
    return suggestedQuestions.find((item) => item.id === "founder-products");
  }
  if (normalized.includes("hire") || normalized.includes("why should")) {
    return suggestedQuestions.find((item) => item.id === "why-hire");
  }
  if (normalized.includes("leadership")) {
    return suggestedQuestions.find((item) => item.id === "leadership");
  }
  if (
    normalized.includes("available") ||
    normalized.includes("availability") ||
    normalized.includes("open to") ||
    normalized.includes("contact") ||
    normalized.includes("email") ||
    normalized.includes("work together")
  ) {
    return suggestedQuestions.find((item) => item.id === "availability");
  }
  if (
    normalized.includes("who are you") ||
    normalized.includes("who is") ||
    normalized.includes("about you") ||
    normalized === "about"
  ) {
    return suggestedQuestions.find((item) => item.id === "about-who");
  }
  if (
    normalized.includes("resume") ||
    normalized.includes("cv") ||
    normalized.includes("curriculum")
  ) {
    return suggestedQuestions.find((item) => item.id === "resume");
  }
  if (normalized.includes("ghostwriter")) {
    return suggestedQuestions.find((item) => item.id === "ghostwriter");
  }
  if (
    (normalized.includes("kid") ||
      normalized.includes("parent") ||
      normalized.includes("gwk")) &&
    !normalized.includes("ghost")
  ) {
    return suggestedQuestions.find((item) => item.id === "parenting-gwk");
  }
  if (normalized.includes("nye") || normalized.includes("rapipay") || normalized.includes("money app")) {
    return suggestedQuestions.find((item) => item.id === "nye-money");
  }
  if (
    normalized.includes("where should i start") ||
    normalized.includes("start here") ||
    normalized.includes("getting started")
  ) {
    return suggestedQuestions.find((item) => item.id === "start-here");
  }
  if (
    normalized.includes("strongest") ||
    (normalized.includes("product work") && !normalized.includes("ai"))
  ) {
    return suggestedQuestions.find((item) => item.id === "strongest-product");
  }

  return undefined;
}

export function inferModeFromQuery(query: string): ConciergeMode {
  const suggested = matchSuggestedQuestion(query);
  if (suggested?.modeHint) return suggested.modeHint;
  const q = query.toLowerCase();
  if (/teach|speak|workshop|iiad|curriculum/.test(q)) return "speaking";
  if (/advisory|designops|design system|project|engagement/.test(q)) return "project";
  return "hiring";
}

export function nextQuestionsFor(currentId?: string, limit = 2) {
  return suggestedQuestions
    .filter((item) => item.id !== currentId)
    .slice(0, limit)
    .map((item) => item.label);
}
