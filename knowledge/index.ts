import {
  getFramework,
  knowledgeFrameworks,
  type FrameworkId,
} from "./frameworks";

export type { FrameworkId, FrameworkStep, KnowledgeFramework } from "./frameworks";
export { getFramework, knowledgeFrameworks };

export type KnowledgeCategory =
  | "Product"
  | "Leadership"
  | "AI"
  | "Systems"
  | "Learning"
  | "Founder";

/** Editorial format for the Notes index. Not every shelf must appear. */
export type NoteFormat = "field-note" | "framework" | "essay";

export const noteFormatLabels: Record<NoteFormat, string> = {
  "field-note": "Field notes",
  framework: "Frameworks in use",
  essay: "Essays",
};

export type NoteEvidenceLink = {
  href: string;
  label: string;
};

export type KnowledgeSection = {
  id: string;
  kicker: string;
  title: string;
  paragraphs: string[];
  pullquote?: string;
  list?: string[];
  figure?: {
    src: string;
    alt: string;
    fit: "contain" | "cover";
  };
  honestNote?: string;
};

export type KnowledgeArticle = {
  index: string;
  slug: string;
  title: string;
  deck: string;
  /** Topic label shown in metadata (not used as a filter). */
  category: KnowledgeCategory;
  format: NoteFormat;
  readMinutes: number;
  /** 1 = primary featured, 2 = secondary. Omit if not featured. */
  featuredRank?: 1 | 2;
  /** ISO date only when the real publication date is known. Never invent. */
  publishedAt?: string;
  cover: string;
  coverAlt: string;
  coverFit: "contain" | "cover";
  framework?: FrameworkId;
  takeaway: string;
  relatedSlugs: string[];
  sections: KnowledgeSection[];
  /** Optional System method link when genuinely supported. */
  systemLink?: NoteEvidenceLink;
  /** Optional Work evidence link when genuinely supported. */
  workLink?: NoteEvidenceLink;
};

export const knowledgeCategories: Array<"All" | KnowledgeCategory> = [
  "All",
  "Product",
  "Leadership",
  "AI",
  "Systems",
  "Learning",
  "Founder",
];

export function formatNoteMeta(article: KnowledgeArticle) {
  const parts = [article.category, `${article.readMinutes} min`];
  if (article.publishedAt) {
    const formatted = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(article.publishedAt));
    parts.push(formatted);
  }
  return parts.join(" · ");
}

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    index: "01",
    slug: "stop-designing-screens",
    title: "Stop designing screens. Start designing decisions.",
    deck: "Most design problems are not screen problems. They are decision problems wearing a visual disguise.",
    category: "Product",
    format: "framework",
    readMinutes: 8,
    featuredRank: 1,
    cover: "/assets/knowledge/stop-designing-screens/cover.svg",
    coverAlt: "Editorial diagram of a decision stack: decision, information, confidence, action, outcome.",
    coverFit: "contain",
    framework: "decision-stack",
    takeaway:
      "Pick one important screen. Write the decision. List the doubts. Remove anything that does not help.",
    relatedSlugs: ["operating-model-invisible", "critique-system"],
    systemLink: {
      href: "/system#practice",
      label: "Method to evidence",
    },
    sections: [
      {
        id: "s1",
        kicker: "01",
        title: "The thing I need you to stop doing",
        paragraphs: [
          "Open any design review and watch what happens. Someone asks whether the button should move. Someone else asks whether the card needs more contrast. Then the room spends twenty minutes discussing spacing while the real product decision remains untouched.",
          "Visual decisions feel safe because they are concrete. The harder questions are not. The user does not arrive to admire an interface. They arrive because they need to decide something, understand something, avoid a mistake, or complete a task.",
        ],
        pullquote: "A polished screen can hide a weak decision. It usually does.",
      },
      {
        id: "s2",
        kicker: "02",
        title: "A screen is only the surface",
        paragraphs: [
          "Imagine a lending product. The team says users are dropping before accepting an offer. The first instinct is to redesign the offer card. The card may not be the problem. The user may not understand total repayment, trust the fee, or know which tenure is safer.",
          "Work the decision stack — decision, information, confidence, action, outcome — and the screen usually becomes simpler. That is not less design. It is finally designing the right thing.",
        ],
        figure: {
          src: "/assets/knowledge/stop-designing-screens/figure.svg",
          alt: "Five-step decision stack drawn as a vertical editorial diagram.",
          fit: "contain",
        },
      },
      {
        id: "s3",
        kicker: "03",
        title: "The question that changes the review",
        paragraphs: [
          "Replace “Does this screen look right?” with “What decision is the user making here, and what could make that decision fail?”",
          "The room changes immediately. Product starts talking about risk. Engineering exposes missing data. Research brings evidence. Design stops defending pixels and starts shaping the decision.",
        ],
      },
      {
        id: "s4",
        kicker: "04",
        title: "What to do on Monday",
        paragraphs: ["Pick one important screen and run it through the decision, not the layout."],
        list: [
          "Write the decision the user must make.",
          "List every doubt that could block it.",
          "Mark which doubts the interface answers.",
          "Remove anything that does not help.",
        ],
        honestNote:
          "This is a method, not a metric. I have not attached conversion numbers to the lending example. The point is the question you ask in the room.",
      },
    ],
  },
  {
    index: "02",
    slug: "critique-system",
    title: "A design team does not need more meetings. It needs a critique system.",
    deck: "More review time does not create better work. Clear standards, visible decisions, and useful feedback do.",
    category: "Leadership",
    format: "framework",
    readMinutes: 9,
    cover: "/assets/knowledge/critique-system/cover.svg",
    coverAlt: "Editorial diagram of a critique system: bar, log, owner, risk.",
    coverFit: "contain",
    framework: "critique-system",
    takeaway:
      "Write the quality bar so a junior can apply it. If they cannot, you do not have a system.",
    relatedSlugs: ["teaching-design-through-decisions", "stop-designing-screens"],
    systemLink: {
      href: "/system#teaching",
      label: "Teaching",
    },
    sections: [
      {
        id: "s1",
        kicker: "01",
        title: "Meetings are not a craft system",
        paragraphs: [
          "When quality slips, the default response is another review. The calendar fills. The work does not get clearer. Critique without a standard is just opinion with a meeting link.",
        ],
        pullquote: "A critique system makes quality visible before the review starts.",
      },
      {
        id: "s2",
        kicker: "02",
        title: "What a system actually contains",
        paragraphs: [
          "A written quality bar. A decision log. A named owner. A format that separates taste from risk. Teams that have these four things spend less time arguing and more time shipping.",
        ],
        figure: {
          src: "/assets/knowledge/critique-system/figure.svg",
          alt: "Four parts of a critique system as numbered editorial frames.",
          fit: "contain",
        },
      },
      {
        id: "s3",
        kicker: "03",
        title: "Make the standard usable",
        paragraphs: [
          "If juniors cannot apply the bar without a principal in the room, it is not a system. It is a bottleneck wearing a framework’s clothing.",
        ],
        honestNote:
          "I am describing the shape of the system, not claiming a team transformed overnight. The test is whether the bar works when you are not in the room.",
      },
    ],
  },
  {
    index: "03",
    slug: "ai-products-earn-trust",
    title: "AI products do not earn trust by sounding intelligent.",
    deck: "They earn trust by being useful, understandable, correct enough, and easy to control.",
    category: "AI",
    format: "framework",
    readMinutes: 10,
    cover: "/assets/knowledge/ai-products-earn-trust/cover.svg",
    coverAlt: "Editorial diagram of an AI trust stack: useful, understandable, correct, controllable.",
    coverFit: "contain",
    framework: "ai-trust-stack",
    takeaway:
      "Map where the model may act alone, where it must ask, and where a human signs. That map is the product.",
    relatedSlugs: ["stop-designing-screens", "building-growing-with-kid"],
    workLink: {
      href: "/work/gwk-ghostwriter",
      label: "GWK Ghostwriter",
    },
    sections: [
      {
        id: "s1",
        kicker: "01",
        title: "Fluency is not competence",
        paragraphs: [
          "A model that speaks well can still be wrong, opaque, or impossible to override. Users forgive a quiet tool. They do not forgive a confident one that cannot be checked.",
        ],
        pullquote: "The question is never “can AI do this?” The question is “which judgment should remain human?”",
      },
      {
        id: "s2",
        kicker: "02",
        title: "Trust is a product surface",
        paragraphs: [
          "Show the source. Show the uncertainty. Show the undo. If the user cannot tell what the system did, they will stop using it the first time it fails in public.",
        ],
        figure: {
          src: "/assets/knowledge/ai-products-earn-trust/figure.svg",
          alt: "Trust surfaces: source, uncertainty, and undo as three editorial frames.",
          fit: "contain",
        },
      },
      {
        id: "s3",
        kicker: "03",
        title: "Design the boundary, not the magic",
        paragraphs: [
          "Map where the model may act alone, where it must ask, and where a human signs. That map is the product. The interface is how you make the map legible.",
        ],
        honestNote:
          "No model benchmarks here. The claim is about product surfaces — source, uncertainty, undo — not about a particular model’s accuracy.",
      },
    ],
  },
  {
    index: "04",
    slug: "operating-model-invisible",
    title: "Products fail when the operating model stays invisible.",
    deck: "Teams do not need perfect process. They need a shared view of how decisions get made.",
    category: "Systems",
    format: "framework",
    readMinutes: 8,
    cover: "/assets/knowledge/operating-model-invisible/cover.svg",
    coverAlt: "Editorial diagram of a visible operating model: rights, intake, queue, evidence.",
    coverFit: "contain",
    framework: "product-operating-model",
    takeaway:
      "Write the decision rights. Publish the intake. Show the queue. Politics has less room when the path is visible.",
    relatedSlugs: ["critique-system", "stop-designing-screens"],
    systemLink: {
      href: "/system#principles",
      label: "Operating Principles",
    },
    sections: [
      {
        id: "s1",
        kicker: "01",
        title: "The work behind the work",
        paragraphs: [
          "Most product failures are not idea failures. They are coordination failures. Nobody can see who decides, when, with what evidence, and what happens when the decision is wrong.",
        ],
      },
      {
        id: "s2",
        kicker: "02",
        title: "Make the path visible",
        paragraphs: [
          "Write the decision rights. Publish the intake. Show the queue. When the operating model is visible, politics has less room to hide.",
        ],
        pullquote: "Systems are the deliverable, not artefacts.",
        figure: {
          src: "/assets/knowledge/operating-model-invisible/figure.svg",
          alt: "Operating model path from intake to after-the-call, drawn as a horizontal sequence.",
          fit: "contain",
        },
        honestNote:
          "This is an operating observation, not a before-and-after case. Visibility is the intervention. The numbers belong to the team that runs it.",
      },
    ],
  },
  {
    index: "05",
    slug: "teaching-design-through-decisions",
    title: "Teaching design through decisions, not decoration.",
    deck: "Students improve faster when they can explain why they made a choice, not just show what they made.",
    category: "Learning",
    format: "field-note",
    readMinutes: 7,
    cover: "/assets/knowledge/teaching-design-through-decisions/cover.svg",
    coverAlt: "Editorial diagram of a visible learning loop: sprint, make, narrate, critique.",
    coverFit: "contain",
    framework: "visible-learning-loop",
    takeaway:
      "Run the module as a sprint. Hold a production bar. Make the trade-off the thing students must say out loud.",
    relatedSlugs: ["critique-system", "building-growing-with-kid"],
    systemLink: {
      href: "/system#teaching",
      label: "Teaching",
    },
    sections: [
      {
        id: "s1",
        kicker: "01",
        title: "Studio traditions are lagging industry",
        paragraphs: [
          "Design education still rewards polish. Industry now asks for systems, AI literacy, and the ability to defend a decision under constraint. The classroom has to catch up without becoming a tool tutorial.",
        ],
      },
      {
        id: "s2",
        kicker: "02",
        title: "The critique is the curriculum",
        paragraphs: [
          "Each module is a sprint. Deliverables are held to a production bar. Students learn to narrate tradeoffs: what they cut, what they kept, and what evidence moved the call.",
        ],
        figure: {
          src: "/assets/knowledge/teaching-design-through-decisions/figure.svg",
          alt: "Learning loop as four editorial steps around a critique.",
          fit: "contain",
        },
        honestNote:
          "Teaching is a capability of the practice, not a separate identity. I am not publishing student scores. The test is whether they can narrate the trade-off.",
      },
    ],
  },
  {
    index: "06",
    slug: "building-growing-with-kid",
    title: "Building Growing With Kid with less money than most teams spend on tools.",
    deck: "Constraints did not make the work easier. They forced the product to become clearer.",
    category: "Founder",
    format: "essay",
    readMinutes: 11,
    featuredRank: 2,
    cover: "/assets/knowledge/building-growing-with-kid/cover.svg",
    coverAlt: "Editorial diagram of a three-question product filter: who, decide, trust.",
    coverFit: "contain",
    framework: "product-filter",
    takeaway:
      "Who is this for. What must they decide. What would make them stop trusting you. Ship the smallest thing that answers those three.",
    relatedSlugs: ["stop-designing-screens", "ai-products-earn-trust"],
    workLink: {
      href: "/work/growing-with-kid",
      label: "Growing With Kid",
    },
    sections: [
      {
        id: "s1",
        kicker: "01",
        title: "Constraint as editor",
        paragraphs: [
          "When the budget cannot buy another layer of process, the product has to say one thing well. Growing With Kid was built that way — fewer features, sharper jobs, no theatre.",
        ],
        pullquote: "Children deserve tools built for them, not adult products scaled down.",
      },
      {
        id: "s2",
        kicker: "02",
        title: "Founder work is still product work",
        paragraphs: [
          "The same decision stack applies. Who is this for. What must they decide. What would make them stop trusting you. Ship the smallest thing that answers those three.",
        ],
        figure: {
          src: "/assets/knowledge/building-growing-with-kid/figure.svg",
          alt: "Product filter as three stacked questions.",
          fit: "contain",
        },
        honestNote:
          "No subscriber counts, no revenue. The note is about the filter we used, not a growth story.",
      },
    ],
  },
];

/** Continue-with links from Notes into System (not a second article shelf). */
export const notesSystemLinks = [
  {
    href: "/system",
    label: "System",
    note: "How the practice turns ambiguity into decisions, experiments, and published evidence.",
  },
  {
    href: "/system#practice",
    label: "Method to evidence",
    note: "The path from question to published work.",
  },
  {
    href: "/system#decisions",
    label: "Decision Log",
    note: "Process and trade-offs. No invented results.",
  },
  {
    href: "/system#products",
    label: "Products as practice",
    note: "Where the operating system meets real constraints.",
  },
] as const;

/** @deprecated Prefer notesSystemLinks — kept for any lingering imports. */
export const founderOsLinks = notesSystemLinks;

export const featuredPrimaryArticle =
  knowledgeArticles.find((article) => article.featuredRank === 1) ?? knowledgeArticles[0];

export const featuredSecondaryArticle = knowledgeArticles.find(
  (article) => article.featuredRank === 2,
);

/** @deprecated Prefer featuredPrimaryArticle. */
export const featuredArticle = featuredPrimaryArticle;

export const noteFormatOrder: NoteFormat[] = ["framework", "field-note", "essay"];

export function getArticlesByFormat(format: NoteFormat) {
  return knowledgeArticles.filter((article) => article.format === format);
}

export function getShelfArticles(format: NoteFormat) {
  const featuredSlugs = new Set(
    [featuredPrimaryArticle, featuredSecondaryArticle]
      .filter(Boolean)
      .map((article) => article!.slug),
  );
  return getArticlesByFormat(format).filter((article) => !featuredSlugs.has(article.slug));
}

export function getFrameworkArticle(id: FrameworkId) {
  return knowledgeArticles.find((article) => article.framework === id);
}

export function getArticle(slug: string) {
  return knowledgeArticles.find((article) => article.slug === slug);
}

export function getNextArticle(slug: string) {
  const index = knowledgeArticles.findIndex((article) => article.slug === slug);
  if (index < 0) return knowledgeArticles[0];
  return knowledgeArticles[(index + 1) % knowledgeArticles.length];
}

export function getPreviousArticle(slug: string) {
  const index = knowledgeArticles.findIndex((article) => article.slug === slug);
  if (index < 0) return knowledgeArticles[knowledgeArticles.length - 1];
  return knowledgeArticles[(index - 1 + knowledgeArticles.length) % knowledgeArticles.length];
}

export function getRelatedArticles(article: KnowledgeArticle) {
  return article.relatedSlugs
    .map((slug) => getArticle(slug))
    .filter((item): item is KnowledgeArticle => Boolean(item));
}
