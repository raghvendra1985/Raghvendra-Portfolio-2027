export type Service = {
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
  href: string;
  related: { label: string; href: string };
  intent: "ai-product" | "designops" | "workshop" | "hiring";
};

export const services: Service[] = [
  {
    slug: "product-leadership",
    title: "Product direction",
    summary:
      "Strategy, product direction, and decision systems that help product, design and engineering make consistent calls.",
    description:
      "Strategy, product direction, and decision systems that help product, design and engineering make consistent calls.",
    stack: ["Strategy", "Product direction", "Cross-functional alignment"],
    problem:
      "Your product has momentum, but priorities, experience, and delivery are not making the same decisions.",
    help: [
      "Product strategy and direction",
      "Decision systems that help product, design and engineering make consistent calls",
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
    href: "/contact?intent=advisory",
    related: { label: "EQTY", href: "/work/eqty" },
    intent: "ai-product",
  },
  {
    slug: "systems-designops",
    title: "Complex systems",
    summary: "Experience architecture, design systems, and operating models for products that have to scale.",
    description:
      "Experience architecture, design systems, and operating models for products that have to scale.",
    stack: ["Experience architecture", "Design systems", "Operating models"],
    problem:
      "Your workflows, platform, or service have become difficult to understand, operate, or scale.",
    help: [
      "Design system direction",
      "Operating models for design",
      "Experience architecture for complex workflows",
      "Team practices that survive a hiring wave",
    ],
    engagement: "System work inside live product teams.",
    outputs: [
      "Design system direction",
      "Operating model",
      "Experience architecture",
      "Practice notes a team can keep",
    ],
    cta: "Discuss this problem",
    href: "/contact?intent=advisory",
    related: { label: "Rapipay / Crowley", href: "/work/nye" },
    intent: "designops",
  },
  {
    slug: "ai-product-building",
    title: "AI product building",
    summary:
      "AI-native products, workflows, prototypes and trust-centered interaction models.",
    description:
      "AI-native products, workflows, prototypes and trust-centered interaction models.",
    stack: ["AI-native products", "Prototyping", "Trust and interaction"],
    problem:
      "The technology is promising, but the product still needs clear workflows, scope, trust, and human control.",
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
    href: "/contact?intent=advisory",
    related: { label: "GWK Ghostwriter", href: "/work/gwk-ghostwriter" },
    intent: "ai-product",
  },
  {
    slug: "advisory-teaching",
    title: "Design leadership",
    summary: "Critique, decision systems, hiring support, and a shared product language.",
    description: "Critique, decision systems, hiring support, and a shared product language.",
    stack: ["Leadership", "DesignOps", "Workshops", "Mentoring"],
    problem:
      "The team needs stronger critique, decision systems, hiring support, or a shared product language.",
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
    cta: "Start a conversation",
    href: "/contact?intent=workshop",
    related: { label: "View experience", href: "/about#experience" },
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
    href: "/contact?intent=advisory",
    service: "ai-product-building",
  },
  {
    id: "strategy",
    label: "I need product strategy",
    href: "/contact?intent=advisory",
    service: "product-leadership",
  },
  {
    id: "system",
    label: "I need a scalable design system",
    href: "/contact?intent=advisory",
    service: "systems-designops",
  },
  {
    id: "designops",
    label: "I need DesignOps support",
    href: "/contact?intent=advisory",
    service: "systems-designops",
  },
  {
    id: "workshop",
    label: "I need a workshop or team session",
    href: "/contact?intent=workshop",
    service: "advisory-teaching",
  },
] as const;
