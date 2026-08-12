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
    query: "strongest product work flagship EQTY Growing With Kid Bolo Buddy",
    preferIds: ["work:eqty", "work:growing-with-kid", "work:bolo-buddy", "work:2886"],
    modeHint: "hiring",
  },
  {
    id: "ai-products-built",
    label: "What AI products have you built?",
    query: "AI products built Bolo Buddy EQTY Sagacito Ethiqly AI Trust Stack",
    preferIds: [
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
    query: "fintech financial EQTY Rapipay Strike currency",
    preferIds: [
      "work:eqty",
      "experience:rapipay",
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
      "services:designops-360",
      "services:design-practice",
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
      "experience:rapipay",
      "experience:enterprise",
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
    query: "founder products Growing With Kid Bolo Buddy 2886 Founder OS",
    preferIds: [
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
      "services:ai-blueprint",
      "framework:ai-trust-stack",
      "knowledge:ai-products-earn-trust",
      "about:belief:03",
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
      "experience:iiad",
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
      "experience:rapipay",
      "system:principles",
      "system:focus",
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
    normalized.includes("strongest") ||
    (normalized.includes("product work") && !normalized.includes("ai"))
  ) {
    return suggestedQuestions.find((item) => item.id === "strongest-product");
  }

  return undefined;
}

export function nextQuestionsFor(currentId?: string, limit = 2) {
  return suggestedQuestions
    .filter((item) => item.id !== currentId)
    .slice(0, limit)
    .map((item) => item.label);
}
