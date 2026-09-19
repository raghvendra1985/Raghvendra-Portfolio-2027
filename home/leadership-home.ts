import { caseStudies, type CaseStudy } from "@/case-studies";
import { site } from "@/lib/site";

export const leadershipHero = {
  name: "Raghvendra",
  headline: "Product designer who builds.",
  supportLine:
    "I design complex digital products, build working software, and help teams turn ambiguous problems into useful systems.",
  roleLine: "Principal / Staff Product Design · Remote / Hybrid",
  availabilityLine: site.statusDetail,
  primary: { label: "View selected work", href: "#work" },
  secondary: { label: "About me", href: "/about" },
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
  title: "Substantial product problems.",
  intro:
    "Design org building in fintech, product direction at organisational scale, and complex workflow systems.",
  all: { label: "View all work", href: "/work" },
} as const;

export const leadershipCapabilities = {
  id: "capabilities",
  eyebrow: "Capabilities",
  title: "Design. Build. Lead.",
  intro:
    "Grouped practices — not a skill cloud. Product design stays primary.",
  groups: [
    {
      title: "Design",
      items: [
        "Product strategy",
        "UX",
        "Interaction design",
        "Design systems",
        "Research",
        "Complex workflows",
      ],
    },
    {
      title: "Build",
      items: [
        "AI-assisted development",
        "Rapid prototyping",
        "Frontend implementation",
        "AI products",
        "0→1 building",
      ],
    },
    {
      title: "Lead",
      items: [
        "Product direction",
        "Design leadership",
        "Cross-functional collaboration",
        "Teaching",
        "Workshops",
      ],
    },
  ],
} as const;

export const leadershipBuilder = {
  id: "builder",
  eyebrow: "Build",
  title: "From idea to working product.",
  body: "I use AI-assisted development to move from product thinking to working software — testing ideas earlier and shipping independent products.",
  workflow: ["Idea", "Design", "Build", "Ship"] as const,
  toolsLabel: "Working toolkit",
  tools: ["Figma", "ChatGPT", "Cursor", "GitHub", "Vercel"] as const,
  cta: { label: "Explore Build", href: "/build" },
} as const;

export const leadershipBuilderProof = {
  id: "builder-proof",
  eyebrow: "Builder proof",
  title: "Making things real.",
  intro: "Concise builder stories — what I noticed, built, and shipped.",
  cta: { label: "All builder work", href: "/build" },
  items: [
    {
      label: "Idea → Working AI Product",
      title: "GWK Ghostwriter",
      conceived:
        "A personal AI LinkedIn studio so founders and operators can draft in their own voice.",
      built:
        "Product framing, UX, and a working AI writing experience I designed and shipped.",
      shipped: "Live prototype and landing experience for the Ghostwriter product.",
      href: "/work/gwk-ghostwriter",
      imageSlug: "gwk-ghostwriter" as const,
    },
    {
      label: "Concept → AI Storytelling Experience",
      title: "Bolo Buddy",
      conceived:
        "Culturally rooted bedtime stories for children — audio-first, not an adult app scaled down.",
      built:
        "Concept, product design, and the storytelling experience as a founder-built product.",
      shipped: "Live product at bolobuddy.in.",
      href: "/work/bolo-buddy",
      imageSlug: "bolo-buddy" as const,
    },
    {
      label: "Community → Working Product",
      title: "Growing With Kid",
      conceived:
        "Parents stuck in a recurring evening decision — what advice to trust tonight.",
      built:
        "Founder-built community and editorial product before software sprawl.",
      shipped: "Live at growingwithkid.com.",
      href: "/work/growing-with-kid",
      imageSlug: "growing-with-kid" as const,
    },
  ],
} as const;

export const leadershipTeachPreview = {
  id: "teach-preview",
  eyebrow: "Teach",
  title: "Teach what you practice.",
  body: "Workshops and modules grounded in active product design — AI for designers, product thinking, design systems, and accessibility.",
  venues: ["NIFT Delhi", "IIAD", "NID Kurukshetra", "DTU", "Outskill"],
  cta: { label: "Explore Teach", href: "/teaching" },
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
  image?: {
    src: string;
    alt: string;
  };
};

export const leadershipTestimonials = {
  eyebrow: "What colleagues say",
  items: [
    {
      quote:
        "I had the opportunity to work with Raghvendra when he hired me into the NYE design team at Rapipay. In less than a year, he grew it from scratch into a well-rounded design, research and content function. What stood out to me was his approach to critiques — the focus was always on the thinking behind a decision, rather than just the screen. Early alignment with Product and Engineering also helped us move faster and avoid unnecessary rework. He also supported the establishment of a strong design system, turning recurring challenges into reusable patterns rather than solving the same problems across individual screens. Most importantly, he listened. Some of the early structural decisions changed because the team challenged them and he was open to letting the better idea win. Working with him gave me valuable lessons in leadership, collaboration and creating an environment where people have the space to do their best work.",
      attribution:
        "Shubham Sachdeva · DVP — Digital Experience & Design, Bajaj Life · reported to Raghvendra on the NYE design team at Rapipay",
      source: "LinkedIn recommendation · September 2026 · reported to Raghvendra directly",
      image: {
        src: "/assets/testimonials/Testimonials_ShubhamSachdeva.jpg",
        alt: "Portrait of Shubham Sachdeva",
      },
    },
    {
      quote:
        "Raghvendra helped build a multi-disciplinary team comprising UX designers, UX researchers, animation designers, visual designers, and content researchers. He played an instrumental role in setting up a design system, which helped us replicate design decisions at scale. Raghvendra is passionate about setting up and following a UX process in his team. He has strong experience setting up UX vision and strategy and showing the business value of UX design.",
      attribution:
        "Sumit Adlakha · Sr. Director of Engineering, Innovaccer · my manager at Rapipay, where we built the NYE Money team together",
      source: "LinkedIn recommendation · May 2023 · managed Raghvendra directly",
      image: {
        src: "/assets/testimonials/Testimonials_SumitAdlakha.jpg",
        alt: "Portrait of Sumit Adlakha",
      },
    },
    {
      quote:
        "Raghvendra did great work with UX designs for our products targeted at media sales teams. He had interesting and unique ideas and always added a fresh perspective to the design thinking.",
      attribution: "Meeta Sachdev · Co-Founder · Sagacito Technologies",
      source: "LinkedIn recommendation · May 2023",
      image: {
        src: "/assets/testimonials/Testimonials_MeetaSachdev.jpg",
        alt: "Portrait of Meeta Sachdev",
      },
    },
    {
      quote:
        "Raghvendra is one of the finest UX designers who goes beyond his job duties to ensure rich user experience. His focus is to give seamless user experience, for which he does extensive user study. Have not seen anyone who has the ability to get into user shoes so easily. His designs are rich and new. He also takes care of technical details while doing the UX. Over this he has great attitude—exceptionally friendly. One of the best persons to work with. Will strongly recommend him if you are looking for an exceptional UX champ.",
      attribution: "Piyush Rajesh Gupta · Founder · The Brain Point",
      source: "LinkedIn recommendation · May 2019 · worked on the same team",
      image: {
        src: "/assets/testimonials/Testimonials_PiyushRajeshGupta.jpg",
        alt: "Portrait of Piyush Rajesh Gupta",
      },
    },
  ] satisfies readonly LeadershipTestimonialItem[],
} as const;

export const leadershipAbout = {
  eyebrow: "About",
  title: "Designer. Builder. Educator.",
  body: "Product design remains primary. Building and teaching deepen the same practice — framing problems, designing systems, and staying close enough to ship.",
  cta: "More about me",
  href: "/about",
  image: {
    src: "/assets/about/raghvendra-singh.png",
    alt: "Raghvendra Singh",
  },
} as const;

export const leadershipClose = {
  id: "hire",
  title: "Building something interesting?",
  body: "Available for selected Principal / Staff opportunities, product collaborations, and workshops.",
  paths: [
    {
      title: "Hire me",
      body: "Principal / Staff Product Design · Remote / Hybrid",
    },
    {
      title: "Build with me",
      body: "Product strategy · MVP · 0→1 · Product UX · Design systems",
    },
    {
      title: "Invite me",
      body: "Workshops · Visiting faculty · Industry sessions",
    },
  ],
  primary: { label: "Let's talk", href: "/contact" },
  secondary: { label: "Download résumé", href: site.resumeHref },
} as const;

export const leadershipFooter = {
  blurb: "Product designer who builds. Design · Build · Teach.",
} as const;
