import { caseStudies, type CaseStudy } from "@/case-studies";
import { site } from "@/lib/site";

export const leadershipHero = {
  name: "Raghvendra",
  headline: "Intelligent products. Systems and alignment that make them hold.",
  roleLine: "Product Design · AI Experience · Strategy · Leadership",
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
      term: "20 years in design",
      detail: `${site.experienceLine}. Craft, product, systems, and leadership in one arc—not a sequence of disconnected jobs.`,
    },
    {
      term: "Rapipay / NYE Money",
      detail:
        "Wallet, UPI, partner banking, and investments unified into one consumer system, adopted across the product organisation and shipped on web, iOS, and Android.",
    },
    {
      term: "Crowley Maritime",
      detail:
        "A dense, ~20-field quoting form became a three-step flow. The design system introduced in that engagement is the system the platform still runs on.",
    },
    {
      term: "500+ designers taught",
      detail:
        "Classrooms, workshops, and mentoring as a way to build shared language, critique, and capability—not a side identity.",
    },
  ],
} as const;

export type LeadershipWorkLayout = "image-led" | "copy-led" | "wide";

export type LeadershipWorkEntry = {
  slug: "bolo-buddy" | "nye" | "crowley";
  kind: string;
  title: string;
  capabilities: readonly string[];
  /** Verified outcome only — must match published case-study copy. */
  outcome: string;
  layout: LeadershipWorkLayout;
};

export const leadershipWorkMeta: readonly LeadershipWorkEntry[] = [
  {
    slug: "bolo-buddy",
    kind: "Zero-to-one",
    title: "Bolo Buddy — voice-first AI storytelling for children",
    capabilities: ["AI experience", "Product direction", "Founder execution"],
    outcome:
      "Bolo Buddy remains operational and building a community of Indian parents seeking culturally rooted, screen-free content.",
    layout: "image-led",
  },
  {
    slug: "nye",
    kind: "Complex system",
    title: "Rapipay — financial access designed around trust",
    capabilities: ["UX leadership", "Fintech", "Organisational alignment"],
    outcome:
      "Led UX for NYE Money at Rapipay, unifying wallet, UPI, partner banking, and investments into one consumer system adopted across the product organisation.",
    layout: "copy-led",
  },
  {
    slug: "crowley",
    kind: "Leadership at scale",
    title: "Crowley Maritime — product quality through system and alignment",
    capabilities: ["Enterprise systems", "Cross-functional alignment", "Design governance"],
    outcome:
      "Replaced a dense legacy freight-quote form with a guided origin-to-cargo-to-contact flow, and introduced the design system this platform still runs on.",
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
    "Zero-to-one judgement, trust in a complex financial system, and leadership that leaves a system behind. Each project links to the published case study.",
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
  stages: [
    {
      title: "Frame",
      body: "Make the problem, constraints, and decision space visible so teams can move through ambiguity without waiting for a brief that never arrives.",
    },
    {
      title: "Align",
      body: "Bring product, design, engineering, operations, and executives onto one experience language so the interface and the operating reality stay compatible.",
    },
    {
      title: "Enable",
      body: "Build critique, shared language, and enough structure that quality does not depend on one person reviewing every screen.",
    },
    {
      title: "Deliver",
      body: "Stay close to execution: protect craft, catch failure modes, and ship. Leadership is responsibility for the conditions in which the work succeeds.",
    },
  ],
} as const;

export const leadershipTestimonial = {
  eyebrow: "Leadership testimonial",
  quote: "[ADD TESTIMONIAL ABOUT JUDGMENT, INFLUENCE, OR LEADERSHIP]",
  attribution: "[ADD NAME · ROLE · ORGANISATION]",
  note: "A verified quote has not been published yet. This space stays empty of invention.",
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
  body: "I’m interested in senior and leadership opportunities where design can shape product direction, intelligent experiences, and organisational capability.",
  primary: { label: "Start a conversation", href: "/contact" },
  secondary: { label: "View résumé", href: site.resumeHref },
} as const;

export const leadershipFooter = {
  blurb:
    "Designing intelligent products, and the systems and alignment that make them successful.",
} as const;
