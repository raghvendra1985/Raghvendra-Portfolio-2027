import type { ConciergeMode } from "./types";

export type SuggestedQuestion = {
  id: string;
  label: string;
  query: string;
  preferIds: string[];
  modeHint?: ConciergeMode;
};

/** Featured hiring trio — keep in sync with `featuredWork` / homepage. */
const FEATURED_WORK = ["work:nye", "work:crowley", "work:gwk-ghostwriter"] as const;

export const openingQuestions: SuggestedQuestion[] = [
  {
    id: "product-leadership",
    label: "Which projects show product leadership?",
    query:
      "product direction product leadership Rapipay Crowley Ghostwriter Sagacito contribution group featured evidence",
    preferIds: [
      ...FEATURED_WORK,
      "work:eqty",
      "work:sagacito",
      "experience:leadership-arc",
    ],
    modeHint: "hiring",
  },
  {
    id: "ai-products-built",
    label: "What is his experience with AI products?",
    query:
      "AI and founder products GWK Ghostwriter Bolo Buddy Growing With Kid Urban Prakriti contribution",
    preferIds: [
      "work:gwk-ghostwriter",
      "work:bolo-buddy",
      "work:growing-with-kid",
      "work:urban-prakriti",
      "knowledge:ai-products-earn-trust",
      "framework:ai-trust-stack",
    ],
    modeHint: "hiring",
  },
  {
    id: "enterprise-systems",
    label: "Has he worked on complex enterprise systems?",
    query:
      "complex systems enterprise leadership Verizon Crowley Shuttl Hempel Rapipay contribution group",
    preferIds: [
      "work:crowley",
      "work:nye",
      "work:shuttl",
      "work:hempel",
      "work:verizon",
      "experience:leadership-arc",
    ],
    modeHint: "hiring",
  },
  {
    id: "designops-approach",
    label: "How does he approach DesignOps?",
    query: "DesignOps operating model critique system design leadership",
    preferIds: [
      "services:systems-designops",
      "knowledge:critique-system",
      "knowledge:operating-model-invisible",
    ],
    modeHint: "project",
  },
  {
    id: "advisory-availability",
    label: "Is he available for advisory work?",
    query: "available advisory leadership workshops selected opportunities",
    preferIds: ["about:overview", "services:advisory-teaching", "services:product-leadership"],
    modeHint: "hiring",
  },
];

export const suggestedQuestions: SuggestedQuestion[] = [
  ...openingQuestions,
  {
    id: "strongest-product",
    label: "Show me your strongest product work",
    query: "strongest product work flagship Rapipay Crowley GWK Ghostwriter featured",
    preferIds: [...FEATURED_WORK, "work:eqty"],
    modeHint: "hiring",
  },
  {
    id: "fintech",
    label: "Show me fintech experience",
    query: "fintech financial Rapipay NYE EQTY Strike currency",
    preferIds: [
      "work:nye",
      "work:eqty",
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
      "work:nye",
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
    query:
      "founder products as practice GWK Ghostwriter Growing With Kid Bolo Buddy System methodology contribution",
    preferIds: [
      "work:gwk-ghostwriter",
      "work:growing-with-kid",
      "work:bolo-buddy",
      "work:2886",
      "system:products",
      "system:practice",
      "system:focus",
    ],
    modeHint: "hiring",
  },
  {
    id: "system-methodology",
    label: "How does his System / operating practice work?",
    query:
      "System methodology how I think decide operate product direction complex systems AI and founder products enterprise leadership",
    preferIds: [
      "system:identity",
      "system:practice",
      "system:principles",
      "system:decisions",
      "system:products",
      "system:focus",
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
    id: "student-tools",
    label: "What tools do you make for design students?",
    query:
      "design student tools secret products design practice jury portfolio entrance prompts Design IQ",
    preferIds: [
      "products:shelf",
      "products:design-iq",
      "products:design-roulette",
      "products:jury-me",
      "products:portfolio-roast",
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
    query: "why hire product design leader systems AI leadership Rapipay Crowley Ghostwriter",
    preferIds: [
      "about:overview",
      ...FEATURED_WORK,
      "experience:leadership-arc",
      "system:principles",
      "system:focus",
    ],
    modeHint: "hiring",
  },
  {
    id: "start-here",
    label: "Where should I start?",
    query: "where should I start flagship Rapipay Crowley GWK Ghostwriter about",
    preferIds: [...FEATURED_WORK, "about:overview"],
    modeHint: "hiring",
  },
  {
    id: "about-who",
    label: "Who is Raghvendra?",
    query: "who are you about product design leader systems AI",
    preferIds: ["about:overview", "experience:founder", "experience:leadership-arc", "about:lead", "about:contact"],
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
    id: "eqty",
    label: "Show EQTY",
    query: "EQTY fintech operating model founding design partner",
    preferIds: ["work:eqty", "system:products", "system:focus"],
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
    label: "Show Rapipay / NYE Money",
    query: "NYE money Rapipay fintech payments",
    preferIds: ["work:nye", "work:eqty", "experience:leadership-arc"],
    modeHint: "hiring",
  },
  {
    id: "crowley",
    label: "Show Crowley Maritime",
    query: "Crowley Maritime freight quoting complex systems design system",
    preferIds: ["work:crowley", "experience:leadership-arc", "system:products"],
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
  if (normalized.includes("eqty")) {
    return suggestedQuestions.find((item) => item.id === "eqty");
  }
  if (normalized.includes("crowley") || normalized.includes("freight")) {
    return suggestedQuestions.find((item) => item.id === "crowley");
  }
  if (normalized.includes("nye") || normalized.includes("rapipay") || normalized.includes("money app")) {
    return suggestedQuestions.find((item) => item.id === "nye-money");
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
  if (
    normalized.includes("student tool") ||
    normalized.includes("design student") ||
    normalized.includes("secret product") ||
    normalized.includes("design iq")
  ) {
    return suggestedQuestions.find((item) => item.id === "student-tools");
  }
  if (
    normalized.includes("founder os") ||
    normalized.includes("operating system") ||
    normalized.includes("methodology") ||
    normalized.includes("how do you think") ||
    normalized.includes("how does his system") ||
    (normalized.includes("system") &&
      (normalized.includes("practice") ||
        normalized.includes("operate") ||
        normalized.includes("decide") ||
        normalized.includes("method")))
  ) {
    return suggestedQuestions.find((item) => item.id === "system-methodology");
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
