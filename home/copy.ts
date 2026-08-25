export const homeHero = {
  name: "Raghvendra Singh",
  headline: "I turn complex ideas into useful products, systems, and teams.",
  kicker: "Product design leader · Systems thinker · Hands-on builder",
  lead:
    "For twenty years, I’ve helped founders and organisations move from ambiguity to shared direction—and from direction to products that work.",
  primary: { label: "View selected work", href: "#work" },
  secondary: { label: "Explore my experience", href: "/about#experience" },
} as const;

export const homeThesis = {
  eyebrow: "The thread behind the work",
  statement: "The interface is rarely the whole problem.",
  body:
    "Over time, my work moved from designing screens to designing the decisions, systems, and conditions that help good products emerge. That same instinct guides my leadership, founder work, teaching, and writing.",
} as const;

export const homeCharms = {
  eyebrow: "Choose a working principle",
  title: "Pick a charm to accompany you through the portfolio.",
  explore: "Explore all charms",
  hide: "Put it away",
  restore: "Hang it",
  live: "Selected charm",
} as const;

export const compactCharmPrinciples = [
  { id: "period" as const, principle: "Decisions and shipping" },
  { id: "pencil" as const, principle: "Craft" },
  { id: "eye" as const, principle: "Critique" },
  { id: "drishti" as const, principle: "Honesty and first impressions" },
];

export const homeAbout = {
  index: "02 / About",
  title: "Twenty years across products, organisations, and classrooms.",
  body:
    "I began as a hands-on designer, then moved deeper into product strategy, complex systems, and team leadership. Building founder-led products kept me close to the craft; teaching clarified how I communicate it. Today, I bring those perspectives together to help ambitious teams build with greater clarity.",
  cta: "More about me",
  href: "/about",
} as const;

export const homeWork = {
  index: "01 / Work",
  title: "Selected work",
  all: "View all work",
} as const;

export type HomeWorkCard = {
  client: string;
  title: string;
  role: string;
  year: string;
  tags: string[];
  problem: string;
  result: string;
};

export const homeWorkCards: Record<string, HomeWorkCard> = {
  eqty: {
    client: "EQTY",
    title: "Designing the operating model for a modular fintech platform",
    role: "Founding Design Partner",
    year: "2026",
    tags: ["Product strategy", "Architecture", "UX systems"],
    problem:
      "Trust, ledger operations, and workflow were being designed as separate layers instead of one operating system.",
    result:
      "Created a shared product framework connecting trust, ledger operations, workflows, and platform extensibility.",
  },
  "gwk-ghostwriter": {
    client: "GWK Ghostwriter",
    title: "Building an AI writing studio that remembers voice, not just prompts",
    role: "Founder / product builder",
    year: "2026",
    tags: ["AI products", "Prototyping", "Trust and interaction"],
    problem: "Generic writing tools produce generic content because they have no memory of voice, sources, or what actually worked.",
    result:
      "Shipped a research-to-post workflow with long-term memory, voice rules, and source material a founder can actually run.",
  },
  nye: {
    client: "Rapipay",
    title: "Leading the experience of a financial super app at organisational scale",
    role: "Senior Manager UX",
    year: "2022",
    tags: ["Product leadership", "Fintech", "Mobile"],
    problem:
      "Payments, banking, and investments were splitting into disconnected features instead of one everyday money product.",
    result:
      "Unified wallet, UPI, partner banking, and investments into a single consumer system adopted across the product organisation.",
  },
};

export const homePractice = {
  index: "03 / Practice",
  title: "Where I can help.",
} as const;

export const homeEnterprise = {
  eyebrow: "Enterprise",
  title: "Designing at organisational scale.",
  body:
    "Product leadership and hands-on systems work across financial services, telecommunications, and supply-chain operations.",
} as const;

export const homeEnterpriseCards: Record<
  string,
  { client: string; title: string; role: string; result: string }
> = {
  verizon: {
    client: "Verizon",
    title: "Scaling turnkey digital signage across distributed locations",
    role: "Staff Design Consultant",
    result:
      "Created a deployment and campaign model that bypasses site Wi-Fi and centralizes playback across retail, transit, and campus screens.",
  },
  nye: {
    client: "Rapipay",
    title: "Unifying payments, banking, and investments into one consumer system",
    role: "Senior Manager UX",
    result:
      "Established a shared product language for wallet, UPI, banking, and investments inside a live financial super app.",
  },
  crowley: {
    client: "Crowley Maritime",
    title: "Unifying freight quoting across a fragmented supply chain",
    role: "Staff Design Consultant",
    result:
      "Created a shared workflow connecting pricing, operations, and customer quoting across previously fragmented systems.",
  },
};

export const homeHiring = {
  eyebrow: "Hiring",
  title: "Looking for product design leadership?",
  body:
    "I work across product strategy, complex systems, AI products, DesignOps, and hands-on execution—bringing senior direction without losing contact with the work.",
  primary: { label: "View experience", href: "/about#experience" },
} as const;

export const homeKnowledge = {
  index: "04 / Knowledge",
  title: "Ideas made useful.",
  all: "All notes",
  read: "Read note",
} as const;

export const homeTools = {
  eyebrow: "Studio tools",
  title: "Small tools for designers learning to think beyond the screen.",
  body:
    "Practical exercises for briefs, critique, judgment, and portfolio development. Buy once. Use when needed.",
  slugs: ["design-dare", "design-iq", "portfolio-roast"] as const,
  explore: "Explore all tools",
} as const;

export const homeContact = {
  index: "05 / Contact",
  title: "Clarity is product infrastructure. Let’s build it.",
  body:
    "Available for senior product design roles, design leadership, advisory engagements, workshops, and selected product collaborations.",
  cta: "Start a conversation",
  href: "/contact",
} as const;

export const homeFooter = {
  blurb: "Making complex ideas useful across products, systems, and teams.",
} as const;
