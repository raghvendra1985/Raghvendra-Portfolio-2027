import { caseStudies, type CaseStudy } from "@/case-studies";
import { site } from "@/lib/site";

export const leadershipHero = {
  name: "Raghvendra",
  headline: "Intelligent products. Systems and alignment that make them hold.",
  roleLine:
    "Open to Head of Design, Associate Director and Principal roles — fintech, enterprise and AI-native products",
  availabilityLine: site.statusDetail,
  primary: { label: "View selected work", href: "#work" },
  secondary: { label: "Start a conversation", href: "/contact" },
} as const;

/** Homepage hero plate — replace still/video after Grok generation. */
export const homeHeroMedia = {
  still: "/assets/system-objects/home-hero.png",
  webm: "/assets/system-objects/home-hero.webm",
  mp4: "/assets/system-objects/home-hero.mp4",
} as const;

export const leadershipImpact = {
  eyebrow: "Selected impact",
  title: "Evidence a hiring conversation can verify.",
  items: [
    {
      term: "11",
      detail:
        "people led across UX design, research, content, motion and marketing at Rapipay; 9 of them hired by me",
    },
    {
      term: "3",
      detail: "platforms shipped in 14 months: NYE Money on web, iOS, Android",
    },
    {
      term: "−30%",
      detail: "design lead time at NYE, measured as Jira cycle time",
    },
    {
      term: "0→1",
      detail: "founding designer at EQTY, a modular fintech operating system",
    },
    {
      term: "2",
      detail:
        "enterprise systems as Staff UX Consultant at Nagarro: Verizon, Crowley Maritime",
    },
    {
      term: "500+",
      detail: "designers taught and mentored · Associate Professor, IIAD",
    },
  ],
} as const;

export type LeadershipWorkLayout = "image-led" | "copy-led" | "wide";

export type LeadershipWorkEntry = {
  slug: "nye-team" | "nye" | "crowley";
  kind: string;
  title: string;
  capabilities: readonly string[];
  /** Verified outcome only — must match published case-study copy. */
  outcome: string;
  /**
   * Homepage stack copy broken into short paragraphs for readability.
   * Challenge/outcome labels are added in the UI — do not prefix here.
   */
  stackChallenge: readonly string[];
  stackOutcome: readonly string[];
  layout: LeadershipWorkLayout;
};

/** Same featured trio as `/work`: NYE org → NYE product → Crowley. */
export const leadershipWorkMeta: readonly LeadershipWorkEntry[] = [
  {
    slug: "nye-team",
    kind: "Design leadership",
    title:
      "Building the NYE design org: nine hires, one design language, three platforms",
    capabilities: ["Design leadership", "DesignOps", "Fintech"],
    outcome:
      "Built the NYE design function from zero — nine hires, one design language, and a −30% design lead time — to ship on three platforms in fourteen months.",
    stackChallenge: [
      "Built the NYE design function from zero — nine hires, one design language, and a −30% design lead time — to ship on three platforms in fourteen months.",
    ],
    stackOutcome: [
      "11 led · 9 hired · NYE Money on web, iOS and Android · design lead time −30%.",
    ],
    layout: "image-led",
  },
  {
    slug: "nye",
    kind: "Enterprise leadership",
    title: "Rapipay — financial access designed around trust",
    capabilities: ["UX leadership", "Fintech", "Organisational alignment"],
    outcome:
      "Led UX for NYE Money at Rapipay — live consumer finance product on web and stores; portfolio screens document the engagement’s shared-grammar design approach.",
    stackChallenge: [
      "Senior Manager UX for NYE Money at Rapipay — leading the consumer experience at organisational scale.",
      "Coverage across wallet, UPI, partner banking, and investments.",
    ],
    stackOutcome: [
      "NYE Money is live on web, iOS, and Android.",
      "Portfolio screens document the shared-grammar design approach; less duplicated design is intended only.",
    ],
    layout: "copy-led",
  },
  {
    slug: "crowley",
    kind: "Complex systems",
    title: "Crowley Maritime — product quality through system and alignment",
    capabilities: ["Enterprise systems", "Cross-functional alignment", "Design governance"],
    outcome:
      "Nagarro client work: experience architecture for a guided origin-to-cargo-to-contact quote flow, documented in portfolio artifacts with Crowley product partners.",
    stackChallenge: [
      "A guided quote flow that replaced a dense legacy form — origin to cargo to contact.",
      "Aligned with rate-engine and customs constraints.",
    ],
    stackOutcome: [
      "Portfolio documents the three-step quote design from the engagement.",
      "Design-system documentation contributed with partners; longevity unpublished.",
    ],
    layout: "wide",
  },
] as const;

export type LeadershipProject = LeadershipWorkEntry & {
  study: CaseStudy;
  href: string;
  challenge: string;
  role: string;
  scope: string;
};

function requireStudy(slug: string): CaseStudy {
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) throw new Error(`Missing leadership homepage study: ${slug}`);
  return study;
}

export function getLeadershipProjects(): LeadershipProject[] {
  return leadershipWorkMeta.map((entry) => {
    const study = requireStudy(entry.slug);
    const role = study.role ?? "Product design";
    const timeline = study.timeline ?? study.year;
    const engagement = study.engagement ?? study.category;
    return {
      ...entry,
      study,
      href: `/work/${study.slug}`,
      challenge: study.challenge ?? study.summary,
      role,
      scope: `${engagement} · ${timeline}`,
    };
  });
}

export const leadershipWork = {
  eyebrow: "Selected work",
  title: "Three kinds of impact hiring teams actually need.",
  intro:
    "Design org building in fintech, product direction at organisational scale, and complex workflow systems. Each project links to the published case study.",
  all: { label: "View all work", href: "/work" },
} as const;

export const leadershipAi = {
  id: "approach",
  eyebrow: "Approach",
  title: "Designing for an AI-native world",
  intro:
    "AI is changing more than the speed of design. It is changing what we design, how products behave, and where design responsibility ends.",
  shifts: [
    {
      title: "From specialist to orchestrator",
      body: "The work is no longer only screens. It is framing the problem, sequencing judgement, and helping product, engineering, and operations act as one system.",
    },
    {
      title: "From AI as a tool to AI as a material",
      body: "Models change product behaviour: what is offered, what is withheld, how trust is earned, and what happens when the system is wrong. That is design material, not a plugin.",
    },
    {
      title: "From deterministic flows to probabilistic experiences",
      body: "Intelligent products must be designed for expected, uncertain, and failed states. Recovery, explanation, and human override are part of the product, not afterthoughts.",
    },
  ],
} as const;

export const leadershipPrinciples = {
  eyebrow: "Principles",
  title: "Principles for intelligent products",
  items: [
    "Design for intent, not only navigation.",
    "Use AI where it creates meaningful value.",
    "Design expected, uncertain, and failed states.",
    "Match system autonomy to consequence.",
    "Build calibrated trust.",
    "Evaluate behaviour continuously after launch.",
  ],
} as const;

export const leadershipLead = {
  eyebrow: "How I lead",
  title: "An operating model, not a services menu.",
  intro:
    "My role changes with the organisation’s needs. I can set direction, create alignment, and remain close enough to the work to protect the quality of execution.",
  frameworkImage: {
    src: "/assets/system-objects/home-lead-framework.png",
    alt: "How I lead diagram: Frame, Align, Enable, and Deliver in a cycle with feedback and learning.",
    width: 1254,
    height: 1254,
  },
  loopLabel: "Feedback & learning",
  stages: [
    {
      id: "frame",
      title: "Frame",
      tagline: "Clarify the problem",
      body: "Make the problem, constraints, and decision space visible so teams can move through ambiguity without waiting for a brief that never arrives.",
      /** Hotspot on the isometric diagram — percentages of the square artboard. */
      hotspot: { top: "4%", left: "4%", width: "44%", height: "44%" },
    },
    {
      id: "align",
      title: "Align",
      tagline: "Create shared direction",
      body: "Bring product, design, engineering, operations, and executives onto one experience language so the interface and the operating reality stay compatible.",
      hotspot: { top: "4%", left: "52%", width: "44%", height: "44%" },
    },
    {
      id: "enable",
      title: "Enable",
      tagline: "Build team ownership",
      body: "Build critique, shared language, and enough structure that quality does not depend on one person reviewing every screen.",
      hotspot: { top: "52%", left: "52%", width: "44%", height: "44%" },
    },
    {
      id: "deliver",
      title: "Deliver",
      tagline: "Protect quality. Ship.",
      body: "Stay close to execution: protect craft, catch failure modes, and ship. Leadership is responsibility for the conditions in which the work succeeds.",
      hotspot: { top: "52%", left: "4%", width: "44%", height: "44%" },
    },
  ],
} as const;

export type LeadershipTestimonialItem = {
  quote: string;
  attribution: string;
  source: string;
};

export const leadershipTestimonials = {
  eyebrow: "What colleagues say",
  items: [
    {
      quote:
        "Raghvendra helped build a multi-disciplinary team comprising UX designers, UX researchers, animation designers, visual designers, and content researchers. He played an instrumental role in setting up a design system, which helped us replicate design decisions at scale. Raghvendra is passionate about setting up and following a UX process in his team. He has strong experience setting up UX vision and strategy and showing the business value of UX design.",
      attribution:
        "Sumit Adlakha · Sr. Director of Engineering, Innovaccer · my manager at Rapipay, where we built the NYE Money team together",
      source: "LinkedIn recommendation · May 2023 · managed Raghvendra directly",
    },
    {
      quote:
        "Raghvendra did great work with UX designs for our products targeted at media sales teams. He had interesting and unique ideas and always added a fresh perspective to the design thinking.",
      attribution: "Meeta Sachdev · Co-Founder · Sagacito Technologies",
      source: "LinkedIn recommendation · May 2023",
    },
    {
      quote:
        "Raghvendra is one of the finest UX designers who goes beyond his job duties to ensure rich user experience. His focus is to give seamless user experience, for which he does extensive user study. I have not seen anyone who has the ability to get into user shoes so easily. His designs are rich and new. He also takes care of technical details while doing the UX. Over this he has great attitude—exceptionally friendly. One of the best persons to work with.",
      attribution: "Piyush Rajesh Gupta · Founder · The Brain Point",
      source: "LinkedIn recommendation · May 2019 · worked on the same team",
    },
  ] satisfies readonly LeadershipTestimonialItem[],
} as const;

export const leadershipAbout = {
  eyebrow: "About",
  title: "Twenty years across products, organisations, and classrooms.",
  body: "I began in design craft, then moved into strategy, systems, leadership, and education—without leaving the work. Founder products keep me close to execution. Teaching more than 500 designers sharpened how I explain decisions and run critique. Today those threads sit in one practice: useful products, aligned teams, and intelligent experiences that can be trusted.",
  cta: "More about me",
  href: "/about",
  image: {
    src: "/assets/about/raghvendra-singh.png",
    alt: "Raghvendra Singh",
  },
} as const;

export const leadershipClose = {
  id: "hire",
  title: "Have a consequential product problem to solve?",
  body: "Open to Head of Design, Associate Director and Principal roles — fintech, enterprise and AI-native products. Delhi NCR hybrid preferred · remote from India considered.",
  primary: { label: "Start a conversation", href: "/contact" },
  secondary: { label: "Download résumé", href: site.resumeHref },
} as const;

export const leadershipFooter = {
  blurb:
    "Designing intelligent products, and the systems and alignment that make them successful.",
} as const;
