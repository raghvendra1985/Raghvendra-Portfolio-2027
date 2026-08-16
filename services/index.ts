export type Service = {
  index: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  stack: string[];
  problem: string;
  help: string[];
  engagement: string;
  outputs: string[];
  cta: string;
  intent: "strategy" | "ai" | "workshop" | "hiring";
};

export const services: Service[] = [
  {
    index: "01",
    slug: "product-leadership",
    title: "Product Leadership",
    summary: "Strategy, product direction, decision systems and cross-functional alignment.",
    description:
      "Strategy, product direction, decision systems and cross-functional alignment.",
    stack: ["Strategy", "Product direction", "Decision systems", "Cross-functional alignment"],
    problem:
      "The product has momentum, but strategy, UX, and delivery are not making the same decisions.",
    help: [
      "Product strategy and direction",
      "Decision systems across design, product, and engineering",
      "Prioritised roadmaps that a team can actually run",
      "Cross-functional alignment without extra process theatre",
    ],
    engagement: "Selected leadership and advisory collaborations.",
    outputs: [
      "Product strategy",
      "Decision principles",
      "Prioritised roadmap",
      "Experience architecture",
    ],
    cta: "Discuss this problem",
    intent: "strategy",
  },
  {
    index: "02",
    slug: "systems-designops",
    title: "Systems & DesignOps",
    summary: "Design systems, operating models, critique systems and team practices.",
    description:
      "Design systems, operating models, critique systems and team practices.",
    stack: ["Design systems", "Operating models", "Critique systems", "Team practices"],
    problem:
      "The team ships, but quality, critique, and the design system do not scale with the product.",
    help: [
      "Design system direction",
      "Operating models for design",
      "Critique and review systems",
      "Team practices that survive a hiring wave",
    ],
    engagement: "System work inside live product teams.",
    outputs: [
      "Design system direction",
      "Operating model",
      "Critique system",
      "Practice notes a team can keep",
    ],
    cta: "Discuss this problem",
    intent: "strategy",
  },
  {
    index: "03",
    slug: "ai-product-building",
    title: "AI Product Building",
    summary:
      "AI-native products, workflows, prototypes and trust-centered interaction models.",
    description:
      "AI-native products, workflows, prototypes and trust-centered interaction models.",
    stack: ["AI-native products", "Workflows", "Prototypes", "Trust-centered interaction"],
    problem:
      "Your AI product has strong technology but unclear workflows, UX, trust, or product scope.",
    help: [
      "Product scope for AI features",
      "Workflows and human/AI handoffs",
      "Trust-centered interaction models",
      "Prototype direction you can test",
    ],
    engagement: "Focused product-shaping work for AI products.",
    outputs: [
      "Product architecture",
      "User flows",
      "Prototype direction",
      "Trust and judgment boundaries",
      "Experiment plan",
    ],
    cta: "Discuss this problem",
    intent: "ai",
  },
  {
    index: "04",
    slug: "advisory-teaching",
    title: "Advisory & Teaching",
    summary: "Workshops, mentoring, curriculum and design leadership development.",
    description: "Workshops, mentoring, curriculum and design leadership development.",
    stack: ["Workshops", "Mentoring", "Curriculum", "Leadership development"],
    problem:
      "The team needs a shared language for product, critique, or AI — not another slide deck.",
    help: [
      "Workshops and team sessions",
      "Design leadership development",
      "Curriculum and critique practice",
      "Mentoring for senior ICs and leads",
    ],
    engagement: "Workshops, sessions, and teaching — including multi-week formats where the work requires it.",
    outputs: [
      "Workshop structure",
      "Shared principles",
      "Practice exercises",
      "Follow-through notes",
    ],
    cta: "Start a project",
    intent: "workshop",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export const problemRoutes = [
  {
    id: "ai",
    label: "I need help shaping an AI product",
    href: "/contact?intent=ai",
    service: "ai-product-building",
  },
  {
    id: "strategy",
    label: "I need product strategy",
    href: "/contact?intent=strategy",
    service: "product-leadership",
  },
  {
    id: "system",
    label: "I need a scalable design system",
    href: "/contact?intent=strategy",
    service: "systems-designops",
  },
  {
    id: "designops",
    label: "I need DesignOps support",
    href: "/contact?intent=strategy",
    service: "systems-designops",
  },
  {
    id: "workshop",
    label: "I need a workshop or team session",
    href: "/contact?intent=workshop",
    service: "advisory-teaching",
  },
] as const;
