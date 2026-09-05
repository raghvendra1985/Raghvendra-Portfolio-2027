export type {
  WorkCategory,
  WorkTier,
  WorkLane,
  ContributionGroup,
  WorkEvidence,
  NarrativeDepth,
  CaseStudyOutcome,
  EvidencedOutcome,
  CaseStudyMandate,
  CaseStudyDecision,
  CaseStudyFrame,
  CaseStudyShowreel,
  CaseStudyAtAGlance,
  CaseStudyVerification,
  CaseStudy,
  DeepCaseStudy,
  SupportingCaseStudy,
  CompactCaseStudy,
  LightweightCaseStudy,
  FlagshipCaseStudy,
} from "./types";

export {
  isDeepCaseStudy,
  isSupportingCaseStudy,
  isCompactCaseStudy,
  isFlagshipCaseStudy,
} from "./types";

import type {
  ContributionGroup,
  WorkEvidence,
  WorkCategory,
  WorkLane,
  CaseStudy,
  DeepCaseStudy,
  SupportingCaseStudy,
  CompactCaseStudy,
  LightweightCaseStudy,
} from "./types";

type IndexMetaKeys =
  | "contributionGroup"
  | "contribution"
  | "evidence"
  | "featuredDesignation"
  | "indexCompact";

type CaseStudyRecord =
  | Omit<DeepCaseStudy, IndexMetaKeys>
  | Omit<SupportingCaseStudy, IndexMetaKeys>
  | Omit<CompactCaseStudy, IndexMetaKeys>
  | Omit<LightweightCaseStudy, IndexMetaKeys>;

export const contributionGroups: Exclude<ContributionGroup, "archive">[] = [
  "product-direction",
  "complex-systems",
  "ai-founder",
  "enterprise-leadership",
  "brand-and-web",
];

export const contributionGroupLabels: Record<ContributionGroup, string> = {
  "product-direction": "Product direction",
  "complex-systems": "Complex systems",
  "ai-founder": "AI and founder products",
  "enterprise-leadership": "Enterprise leadership",
  "brand-and-web": "Brand and web work",
  archive: "Archive",
};

type WorkIndexMeta = {
  contributionGroup: ContributionGroup;
  contribution: string;
  evidence: WorkEvidence;
  featuredDesignation?: string;
  indexCompact?: boolean;
};

/** Index-only fields. Featured three are omitted from remaining-work sections via `featuredWork`. */
const workIndexBySlug: Record<string, WorkIndexMeta> = {
  eqty: {
    contributionGroup: "product-direction",
    contribution:
      "Mapped one operator workflow from fragmented trust, ledger, and approval layers into a shared fintech operating model.",
    evidence: "CASE STUDY",
  },
  "gwk-ghostwriter": {
    contributionGroup: "ai-founder",
    contribution:
      "Replaced a prompt-box writing habit with a memory-backed research-to-post studio that keeps voice and sources under human approval.",
    evidence: "CASE STUDY",
    featuredDesignation: "AI product building",
  },
  nye: {
    contributionGroup: "enterprise-leadership",
    contribution:
      "Aligned wallet, UPI, banking, and investment teams around one consumer grammar so NYE stopped shipping as four products in one app.",
    evidence: "CASE STUDY",
    featuredDesignation: "Leadership and organisational influence",
  },
  sagacito: {
    contributionGroup: "product-direction",
    contribution:
      "Made AI pricing recommend rather than decide — with approval guardrails sales teams could trust when inventory data was weak.",
    evidence: "CASE STUDY",
  },
  viralops: {
    contributionGroup: "brand-and-web",
    contribution:
      "Protected dual-product scope and documented design decisions through an incomplete engagement without letting ambiguity erase the work.",
    evidence: "CASE STUDY",
  },
  "pacific-design-house": {
    contributionGroup: "brand-and-web",
    contribution:
      "Made manufacturing capacity and ethical credentials scannable for international buyers, not buried under lookbook chrome.",
    evidence: "CASE STUDY",
  },
  "2886": {
    contributionGroup: "brand-and-web",
    contribution:
      "Structured an artisan fashion site so craft technique and modern cut share one commercial journey.",
    evidence: "CASE STUDY",
  },
  shuttl: {
    contributionGroup: "complex-systems",
    contribution:
      "Solved congested-corridor boarding with data-over-sound check-in after QR, GPS, Wi-Fi, and cellular approaches failed in the field.",
    evidence: "CASE STUDY",
  },
  hempel: {
    contributionGroup: "complex-systems",
    contribution:
      "Turned procurement workshop friction into a scored roadmap that informed MyHempel’s first digital features.",
    evidence: "CASE STUDY",
  },
  obzrv: {
    contributionGroup: "complex-systems",
    contribution:
      "Shipped a Gulf F&B analytics MVP in under three months to test whether operators would trust live market data over spreadsheets.",
    evidence: "CASE STUDY",
  },
  "growing-with-kid": {
    contributionGroup: "ai-founder",
    contribution:
      "Built for parents stuck in a recurring evening decision — what to trust tonight — before adding software surface area.",
    evidence: "CASE STUDY",
    indexCompact: true,
  },
  "bolo-buddy": {
    contributionGroup: "ai-founder",
    contribution:
      "Designed an audio-first bedtime product with language and safety constraints Indian families could trust screen-free.",
    evidence: "CASE STUDY",
    indexCompact: true,
  },
  "urban-prakriti": {
    contributionGroup: "ai-founder",
    contribution:
      "Chose transparent sourcing and city-resident trust over commodity price competition for a plant-based D2C brand.",
    evidence: "CASE STUDY",
  },
  ethiqly: {
    contributionGroup: "archive",
    contribution:
      "Prototyped rubric-based AI writing support for literature classrooms with Classroom and Schoology hooks.",
    evidence: "ARCHIVE",
  },
  verizon: {
    contributionGroup: "enterprise-leadership",
    contribution:
      "Designed out-of-band LTE deployment and a central portal so signage could ship without waiting on site Wi-Fi approvals.",
    evidence: "CASE STUDY",
  },
  crowley: {
    contributionGroup: "complex-systems",
    contribution:
      "Collapsed a ~20-field freight quote into a three-step wizard that still satisfied rate-engine and customs constraints.",
    evidence: "CASE STUDY",
    featuredDesignation: "Complex systems",
  },
  tannins: {
    contributionGroup: "archive",
    contribution: "Web presence spanning B2B tannin solutions and consumer wine.",
    evidence: "ARCHIVE",
  },
  omf: {
    contributionGroup: "archive",
    contribution: "Sleep-retail site redesign prepared as a client pitch.",
    evidence: "ARCHIVE",
  },
  udbodhan: {
    contributionGroup: "archive",
    contribution: "Web work for India’s oldest continuously published Bengali magazine.",
    evidence: "ARCHIVE",
  },
  strike: {
    contributionGroup: "archive",
    contribution: "Freelance MVP for subscription stock-market analytics.",
    evidence: "ARCHIVE",
  },
  "smart-currency-exchange": {
    contributionGroup: "archive",
    contribution: "Freelance MVP for live currency conversion and selection.",
    evidence: "ARCHIVE",
  },
};

export const workCategories: Array<"All" | WorkCategory> = [
  "All",
  "Enterprise Systems",
  "SaaS Products",
  "Founder & Ventures",
  "Web Design",
  "Freelance MVPs",
];

export const workAudiences = [
  "All",
  "Enterprise",
  "Startup",
  "Founder",
  "AI",
  "Product",
  "Systems",
] as const;

export type WorkAudience = (typeof workAudiences)[number];

export function matchesWorkAudience(study: CaseStudy, audience: WorkAudience) {
  if (audience === "All") return true;
  const tags = study.tags.join(" ").toLowerCase();
  const haystack = `${study.category} ${study.industry} ${study.summary} ${tags}`.toLowerCase();
  if (audience === "Enterprise") {
    return study.lane === "enterprise" || study.category === "Enterprise Systems";
  }
  if (audience === "Startup") {
    return study.category === "SaaS Products" || study.lane === "founder";
  }
  if (audience === "Founder") {
    return (
      study.lane === "founder" ||
      study.category === "Founder & Ventures" ||
      ["eqty", "gwk-ghostwriter", "growing-with-kid", "bolo-buddy"].includes(study.slug)
    );
  }
  if (audience === "AI") {
    return haystack.includes("ai");
  }
  if (audience === "Product") {
    return study.tags.includes("Product") || study.category === "SaaS Products";
  }
  return (
    study.category === "Enterprise Systems" ||
    tags.includes("ops") ||
    haystack.includes("system")
  );
}

export const workLanes: WorkLane[] = ["primary", "enterprise", "founder", "archive"];

export const laneLabels: Record<WorkLane, string> = {
  primary: "Primary",
  enterprise: "Enterprise Experience",
  founder: "Founder Work",
  archive: "Archive",
};

const caseStudyRecords: CaseStudyRecord[] = [
  {
    index: "01",
    slug: "eqty",
    client: "EQTY",
    title: "A modular fintech operating system, from strategy to architecture",
    summary:
      "Founding design partnership for a modular fintech OS — trust, workflows, and clarity across complex financial systems.",
    year: "2026",
    category: "SaaS Products",
    industry: "Fintech · AI",
    tags: ["Product", "AI", "Fintech"],
    tone: "navy",
    tier: "flagship",
    lane: "primary",
    role: "Founding Design Partner",
    timeline: "Ongoing",
    engagement: "Product strategy and experience architecture",
    narrativeDepth: "supporting",
    cover: "/assets/work/eqty/cover.svg",
    gallery: [
      "/assets/work/eqty/gallery-01.svg",
      "/assets/work/eqty/gallery-02.svg",
      "/assets/work/eqty/gallery-03.svg",
    ],
    situation:
      "An operator moving money under load had to jump between trust cues, ledger actions, and approval workflow as if they were three products. EQTY needed one operating model that could extend to new financial modules. Existing separation of layers made every new surface reinvent permissions, money states, and language.",
    mandate: {
      owned:
        "Product strategy partnership, experience architecture, and the shared module model for how money, people, and decisions move.",
      others:
        "Founders and product own commercial prioritisation. Engineering owns ledger and infrastructure constraints.",
      decisionMaker: "Founding team — design partners inside architecture decisions, not a late visual pass.",
      team: "Founding design partner with the product and engineering founding group.",
      authority: "Co-owned experience architecture inside the founding partnership.",
      deliveryConstraints:
        "High-trust financial work cannot bury operators in complexity, and the OS must grow without a redesign each quarter.",
    },
    decision: {
      situation:
        "Decide whether trust, ledger, and workflow stay separate product layers or become one operator model with shared entities and states.",
      options: [
        {
          name: "Three product surfaces with shared branding",
          rejectedBecause:
            "Would keep duplicate onboarding, permissions, and money-state language — the original fracture.",
        },
        {
          name: "One monolithic screen for all financial work",
          rejectedBecause:
            "Would overload operators and block modular extension when a new financial surface joins the OS.",
        },
        {
          name: "Shared operating model: entities, permissions, money states, approval rules as one system",
        },
      ],
      evidence:
        "Early mapping showed the same people and money states reappearing across trust, ledger, and workflow with inconsistent language. Separate layers forced operators to reconstruct the system mentally under load.",
      tradeoff:
        "A shared model slows shipping a single module in isolation — but prevents three products that cannot share approvals or trust later.",
      choice:
        "Design one module set for how money, people, and decisions move, with trust visible in the interface and workflows tuned for clarity under load.",
      result:
        "New financial surfaces can join the OS without fracturing the operator experience. Directional while the product is still in founding build.",
    },
    systemChangeSteps: [
      "Mapped the fragmented starting point: trust, ledger operations, and workflow as separate layers.",
      "Proposed shared entities — people, permissions, money states, approval rules — as the spine every module attaches to.",
      "Designed operator workflows with fewer dead ends and language that matches how finance teams work.",
      "Kept the visual system quiet so hierarchy and structure can carry growth without seasonal redesign.",
    ],
    outcomes: [
      {
        title: "Organisational: one model",
        body: "Trust, ledger, and workflow extend as one system instead of three separate products.",
        level: "organisational",
        confidence: "directional",
      },
      {
        title: "Operational: partnership in decisions",
        body: "Experience architecture decided with product, not applied after modules locked.",
        level: "operational",
        confidence: "observed",
      },
      {
        title: "Organisational: extensible OS",
        body: "Future modules attach to the same entities and states rather than inventing a parallel stack.",
        level: "organisational",
        confidence: "directional",
      },
    ],
    frames: [
      {
        src: "/assets/work/eqty/gallery-01.svg",
        caption:
          "Operating model view: money, people, and decisions as one module set — the change from three separate layers.",
      },
      {
        src: "/assets/work/eqty/gallery-02.svg",
        caption:
          "Operator workflow under load: clearer states and fewer dead ends where trust has to be visible, not decorative.",
      },
      {
        src: "/assets/work/eqty/gallery-03.svg",
        caption:
          "Quiet system structure: hierarchy that can take a future module without fracturing the operator grammar.",
      },
    ],
    wouldChangeNow:
      "Publish one end-to-end operator scenario with before/after entity maps as the primary hiring-manager evidence, and keep abstract OS language only as captions on that workflow.",
  },
  {
    index: "02",
    slug: "nye",
    client: "Rapipay",
    title: "A financial super app — payments, banking, and investments in one system",
    summary:
      "Senior Manager UX for NYE Money at Rapipay — leading the consumer experience at organisational scale across wallet, UPI, partner banking, and investments.",
    year: "2022",
    category: "SaaS Products",
    industry: "Fintech · Payments",
    tags: ["Enterprise", "Fintech", "Mobile"],
    tone: "navy",
    tier: "flagship",
    lane: "enterprise",
    role: "Senior Manager UX",
    timeline: "2022",
    engagement: "UX leadership at organisational scale",
    narrativeDepth: "deep",
    href: "https://nye.money/",
    links: [
      { label: "Visit live site", href: "https://nye.money/" },
      {
        label: "App Store",
        href: "https://apps.apple.com/in/app/nye-money/id1662431820",
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.rapipay.nye",
      },
    ],
    cover: "/assets/work/nye/cover.png",
    productStackCount: 9,
    mediaLayout: "default",
    showreelFeaturedCount: 3,
    gallery: [
      "/assets/work/nye/landing.png",
      "/assets/work/nye/gallery-01.jpg",
      "/assets/work/nye/gallery-02.jpg",
      "/assets/work/nye/gallery-03.jpg",
      "/assets/work/nye/gallery-04.jpg",
      "/assets/work/nye/gallery-05.jpg",
      "/assets/work/nye/gallery-06.jpg",
      "/assets/work/nye/gallery-07.jpg",
      "/assets/work/nye/gallery-08.jpg",
      "/assets/work/nye/motion/loading-y-outline.gif",
      "/assets/work/nye/motion/success-tick.gif",
      "/assets/work/nye/motion/wireframes/medium-fidelity.gif",
      "/assets/work/nye/motion/wireframes/concept-01.gif",
      "/assets/work/nye/motion/wireframes/concept-02.gif",
      "/assets/work/nye/motion/wireframes/concept-03.gif",
      "/assets/work/nye/motion/wireframes/concept-04.gif",
      "/assets/work/nye/motion/wireframes/concept-06.gif",
      "/assets/work/nye/motion/wireframes/concept-08.gif",
      "/assets/work/nye/process-discovery.jpg",
      "/assets/work/nye/process-weekly-planning.jpg",
      "/assets/work/nye/process-ux-thematic-01.jpg",
      "/assets/work/nye/process-ux-thematic-02.jpg",
      "/assets/work/nye/process-ux-thematic-03.jpg",
      "/assets/work/nye/process-stakeholder-discussion.jpg",
      "/assets/work/nye/process-lifestyle-01.jpg",
      "/assets/work/nye/process-reward-recognition.jpg",
      "/assets/work/nye/process-success-stories.jpg",
    ],
    designSystem: [
      {
        src: "/assets/work/nye/design-system/color.png",
        caption: "Color",
        width: 2000,
        height: 1080,
      },
      {
        src: "/assets/work/nye/design-system/buttons.png",
        caption: "Buttons",
        width: 2000,
        height: 1080,
      },
      {
        src: "/assets/work/nye/design-system/iconography.png",
        caption: "Iconography",
        width: 2000,
        height: 1080,
      },
      {
        src: "/assets/work/nye/design-system/component.png",
        caption: "Components",
        width: 2000,
        height: 1080,
      },
      {
        src: "/assets/work/nye/design-system/grid.png",
        caption: "Grid",
        width: 2000,
        height: 1080,
      },
      {
        src: "/assets/work/nye/design-system/illustration.png",
        caption: "Illustration",
        width: 2000,
        height: 1080,
      },
      {
        src: "/assets/work/nye/design-system/guiding-principles.png",
        caption: "Guiding principles",
        width: 2000,
        height: 1080,
      },
      {
        src: "/assets/work/nye/design-system/process/internal-design-structure.png",
        caption: "Internal design structure",
        width: 2000,
        height: 1080,
      },
    ],
    showreel: [
      {
        src: "/assets/work/nye/video/cover-page.mp4",
        poster: "/assets/work/nye/cover.png",
        caption: "Cover page motion — multi-device product surface.",
      },
      {
        src: "/assets/work/nye/video/showreel-mobile-02.mp4",
        poster: "/assets/work/nye/gallery-01.jpg",
        caption: "Mobile showreel — core money journeys.",
      },
      {
        src: "/assets/work/nye/video/showreel-mobile-04.mp4",
        poster: "/assets/work/nye/gallery-02.jpg",
        caption: "Mobile showreel — secondary flows and states.",
      },
      {
        src: "/assets/work/nye/video/showreel-grid-mobile.mp4",
        poster: "/assets/work/nye/gallery-03.jpg",
        caption: "Grid showreel — product surfaces in parallel.",
      },
      {
        src: "/assets/work/nye/video/animated-web-screens.mp4",
        poster: "/assets/work/nye/cover.png",
        caption: "Animated web screens.",
      },
      {
        src: "/assets/work/nye/video/phone-initial-funding.mp4",
        poster: "/assets/work/nye/gallery-04.jpg",
        caption: "Phone screens — initial funding journey.",
      },
    ],
    situation:
      "A consumer trying to spend, move, save, and invest inside NYE had to learn separate product structures for UPI, prepaid cards, partner banking, and investments. The business needed one everyday money app. Internally, each product team used different onboarding patterns, terminology, states, and compliance flows — which increased design duplication and made NYE feel like several products inside one shell.",
    people:
      "Primary users were everyday money consumers on iOS, Android, and web. Stakeholders included product squads for wallet, UPI, banking, and investments; compliance and risk; engineering platforms; and leadership accountable for a single consumer brand.",
    apparentProblem:
      "Leadership saw a packaging problem: ship more fintech modules into one app shell and call it a super app.",
    underlyingProblem:
      "The organisation lacked a shared experience language. Without common patterns for money states, onboarding recovery, and trust cues, every squad reinvented flows — and compliance reviews multiplied because usability and regulation were negotiated separately each time.",
    mandate: {
      owned:
        "UX leadership for the consumer experience language across wallet, UPI, partner banking, and investments — core journeys, shared patterns, and cross-squad alignment.",
      others:
        "Product owned roadmap prioritisation per line. Engineering owned platform and payment-rail constraints. Compliance and risk owned regulatory gates (including PCI DSS / ISO framing).",
      decisionMaker:
        "Product leadership made release calls; compliance could block patterns that failed regulatory review.",
      team:
        "Senior Manager UX working across multiple product squads rather than a single feature team.",
      authority:
        "Organisational UX leadership — set patterns and review journeys for adoption across teams, without owning every squad’s backlog.",
      deliveryConstraints:
        "Live rails (UPI, prepaid/NCMC, partner banking, investments) could not pause while the grammar was rewritten; security and compliance signals had to stay visible at money moments.",
    },
    constraints: [
      "Multiple product teams shipping in parallel with different vocabularies and onboarding states.",
      "Regulatory and security requirements that could not be deferred to fine print.",
      "Partner banking onboarding (Jana Savings / Current) needed recoverable unfinished states, not dead-end abandonment.",
      "Investments (digital gold, mutual fund baskets) had to join the same grammar without feeling like a bolted-on second brand.",
    ],
    decision: {
      situation:
        "Compliance wanted dense disclosure and hard stops at money moments. Product and UX needed journeys consumers could finish without abandoning account opening or payments.",
      options: [
        {
          name: "Keep product-line-specific patterns and only align visual chrome",
          rejectedBecause:
            "Would preserve duplication: each squad would still invent onboarding, empty states, and trust cues independently.",
        },
        {
          name: "Force a single rigid template for every money moment",
          rejectedBecause:
            "Would fight rail-specific constraints (UPI vs account opening vs investments) and create compliance exceptions that shattered the template anyway.",
        },
        {
          name: "Shared grammar with progress-led onboarding and trust cues at decision points",
        },
      ],
      evidence:
        "Cross-squad reviews showed repeated redesign of the same money states. Banking onboarding abandonment risked unfinished KYC unless progress was recoverable. Compliance reviews repeatedly flagged trust cues that lived too far from the action.",
      tradeoff:
        "A shared language slows a single squad’s local invention — but removes duplicated work and gives compliance one pattern to review instead of four.",
      choice:
        "Establish one consumer operating layer — spend, move, save, invest — with progress-led banking onboarding, payment journeys (Scan & Pay, UPI, Autopay, requests) in one mental model, and biometric / PIN / compliance signals held next to the money decision.",
      result:
        "Wallet, UPI, prepaid/NCMC, partner banking, and investments shipped under one product grammar. Directional evidence: reduced pattern duplication across teams and a live super-app surface on web and stores.",
    },
    systemChangeSteps: [
      "Set the experience language and worked it through the product organisation rather than a single squad.",
      "Framed NYE as an everyday money layer with security and compliance visible in the journey, not only in legal copy.",
      "Unified payment journeys — Scan & Pay, UPI transfer, Autopay, payment requests — with prepaid and NCMC in the same mental model.",
      "Structured Jana Savings and Current onboarding as progress-led, recoverable journeys.",
      "Brought digital gold and mutual fund baskets into the same app grammar so growth products did not read as a second brand.",
    ],
    iteration: [
      {
        title: "Compliance vs. finishable journeys",
        body: "Early banking flows treated KYC as a single cliff. Progress-led states were negotiated so unfinished opening stayed recoverable without removing required checks.",
      },
      {
        title: "Investments as grammar, not bolt-on",
        body: "First investment surfaces risked looking like a separate product. Shared navigation, states, and trust cues pulled them back into NYE’s money model.",
      },
      {
        title: "Remaining limitation",
        body: "Organisational adoption is never finished — new rails still need review against the grammar, and squad velocity can drift without ongoing critique.",
      },
    ],
    outcomes: [
      {
        title: "Organisational: one grammar",
        body: "Wallet, UPI, partner banking, and investments share structure instead of splintering into separate app experiences.",
        level: "organisational",
        confidence: "directional",
      },
      {
        title: "Business: live consumer product",
        body: "NYE ships on web, iOS, and Android as Rapipay’s consumer finance product.",
        level: "business",
        confidence: "observed",
      },
      {
        title: "Organisational: less duplicated design",
        body: "Shared language reduced reinvented onboarding and money-state patterns across product teams — directional, not a counted ticket metric.",
        level: "organisational",
        confidence: "directional",
      },
    ],
    frames: [
      {
        src: "/assets/work/nye/landing.png",
        scrollable: true,
        caption:
          "Marketing landing as the consumer entry: NYE frames everyday money — spend, move, save, invest — before the app shell takes over.",
      },
      {
        src: "/assets/work/nye/gallery-01.jpg",
        caption:
          "Home as a money operating layer: spend, move, save, and invest share one entry model instead of four product hubs.",
      },
      {
        src: "/assets/work/nye/gallery-02.jpg",
        caption:
          "Payment journey: Scan & Pay / UPI patterns keep prepaid and request states in the same mental model consumers already use for money movement.",
      },
      {
        src: "/assets/work/nye/gallery-03.jpg",
        caption:
          "Wallet and card states: prepaid and NCMC held as money instruments, not isolated feature islands.",
      },
      {
        src: "/assets/work/nye/gallery-04.jpg",
        caption:
          "Banking onboarding: progress-led account opening so unfinished KYC stays recoverable — compliance stays in the flow without a dead end.",
      },
      {
        src: "/assets/work/nye/gallery-05.jpg",
        caption:
          "Partner banking detail: savings and current account language matches the rest of NYE rather than a bank microsite.",
      },
      {
        src: "/assets/work/nye/gallery-06.jpg",
        caption:
          "Investments in the same grammar: digital gold vault reads as a money surface, not a bolted-on brand.",
      },
      {
        src: "/assets/work/nye/gallery-07.jpg",
        caption:
          "Mutual fund baskets: growth products reuse navigation and trust cues from payments and banking.",
      },
      {
        src: "/assets/work/nye/gallery-08.jpg",
        caption:
          "Trust at the decision: biometric unlock, PIN recovery, and compliance signals sit next to money moments where users choose to continue.",
      },
      {
        src: "/assets/work/nye/motion/loading-y-outline.gif",
        kind: "gif",
        caption:
          "Loading mark: Y outline motion used while money states resolve.",
      },
      {
        src: "/assets/work/nye/motion/success-tick.gif",
        kind: "gif",
        caption:
          "Success confirmation: shared completion cue across money journeys.",
      },
      {
        src: "/assets/work/nye/motion/wireframes/medium-fidelity.gif",
        kind: "gif",
        caption: "Medium-fidelity website mockup — early web structure for NYE.",
      },
      {
        src: "/assets/work/nye/motion/wireframes/concept-01.gif",
        kind: "gif",
        caption: "Website concept 01 — exploratory layout motion.",
      },
      {
        src: "/assets/work/nye/motion/wireframes/concept-02.gif",
        kind: "gif",
        caption: "Website concept 02 — exploratory layout motion.",
      },
      {
        src: "/assets/work/nye/motion/wireframes/concept-03.gif",
        kind: "gif",
        caption: "Website concept 03 — exploratory layout motion.",
      },
      {
        src: "/assets/work/nye/motion/wireframes/concept-04.gif",
        kind: "gif",
        caption: "Website concept 04 — exploratory layout motion.",
      },
      {
        src: "/assets/work/nye/motion/wireframes/concept-06.gif",
        kind: "gif",
        caption: "Website concept 06 — exploratory layout motion.",
      },
      {
        src: "/assets/work/nye/motion/wireframes/concept-08.gif",
        kind: "gif",
        caption: "Website concept 08 — exploratory layout motion.",
      },
      {
        src: "/assets/work/nye/process-discovery.jpg",
        caption:
          "Discovery work: framing the problem space before squads lock patterns into product lines.",
      },
      {
        src: "/assets/work/nye/process-weekly-planning.jpg",
        caption:
          "Weekly planning: keeping cross-squad design work visible and sequenced.",
      },
      {
        src: "/assets/work/nye/process-ux-thematic-01.jpg",
        caption:
          "UX research thematic analysis: clustering findings into shared language for money journeys.",
      },
      {
        src: "/assets/work/nye/process-ux-thematic-02.jpg",
        caption:
          "Thematic analysis continued: turning research notes into patterns teams can adopt.",
      },
      {
        src: "/assets/work/nye/process-ux-thematic-03.jpg",
        caption:
          "Thematic analysis board: evidence kept visible while grammar decisions are made.",
      },
      {
        src: "/assets/work/nye/process-stakeholder-discussion.jpg",
        caption:
          "Stakeholder discussion: aligning product, compliance, and UX on finishable journeys.",
      },
      {
        src: "/assets/work/nye/process-lifestyle-01.jpg",
        caption:
          "Team at work: the operating context around the consumer money app.",
      },
      {
        src: "/assets/work/nye/process-reward-recognition.jpg",
        caption:
          "Reward and recognition: how the design organisation marked progress and contribution.",
      },
      {
        src: "/assets/work/nye/process-success-stories.jpg",
        caption:
          "Success stories: capturing organisational wins alongside the live product surface.",
      },
    ],
    wouldChangeNow:
      "I would publish a living pattern inventory with owners per squad earlier, and track adoption with concrete examples of retired duplicate flows — so leadership evidence is organisational as well as product-live.",
    atAGlance: {
      user: "Everyday money consumers across wallet, UPI, banking, and investments",
      problem: "Four product grammars inside one app — duplicated onboarding and trust patterns",
      mandate: "UX leadership for a shared consumer experience language across squads",
      decision: "Shared grammar with progress-led onboarding over product-line silos or one rigid template",
      result: "Live super app on web and stores; directional reduction in duplicated design across teams",
    },
    verification: {
      status: "needs-confirmation",
      notes: [
        "Confirm exact team composition and headcount during the Rapipay engagement.",
        "Confirm which compliance-vs-usability conflict was the decisive example.",
        "Confirm directional adoption claims with any non-confidential organisational evidence.",
      ],
    },
  },
  {
    index: "03",
    slug: "growing-with-kid",
    client: "Growing With Kid",
    title: "A parenting community built around one clear job",
    summary:
      "A content and community product for Indian parents — fewer features, sharper jobs, no theatre.",
    year: "2020",
    category: "Founder & Ventures",
    industry: "Family · Community",
    tags: ["Founder", "Community", "Content"],
    tone: "green",
    tier: "flagship",
    lane: "primary",
    role: "Founder / product builder",
    timeline: "2020–present",
    engagement: "Founder venture",
    narrativeDepth: "compact",
    href: "https://www.growingwithkid.com",
    cover: "/assets/work/growing-with-kid/cover.svg",
    gallery: [
      "/assets/work/growing-with-kid/gallery-01.svg",
      "/assets/work/growing-with-kid/gallery-02.svg",
      "/assets/work/growing-with-kid/gallery-03.svg",
    ],
    situation:
      "Urban Indian parents facing a recurring evening decision — what advice to trust tonight — were drowning in fragmented feeds and app theatre. Existing content failed because it optimised for volume, not a clear job.",
    audience:
      "Primary: Indian parents (especially early-childhood years) who want depth over noise when making a daily parenting call.",
    designObjective:
      "Help parents think clearly in one recurring moment — not collect more content. Ship newsletter and community before software surface area.",
    decisions: [
      "Define one job: clearer thinking for a recurring decision, not a feature catalogue of “parenting tools.”",
      "Lead with newsletter and community hub — essays, guides, conversations — after software-first experiments felt like theatre without trust.",
      "Keep the product small on purpose: one voice, one audience, one promise, so trust can compound; failed assumption was that more modules would equal more retention.",
    ],
    frames: [
      {
        src: "/assets/work/growing-with-kid/gallery-01.svg",
        caption:
          "Community and editorial as the product: the job is clearer thinking, not another feed.",
      },
      {
        src: "/assets/work/growing-with-kid/gallery-02.svg",
        caption:
          "Guides and sessions around real family questions — constraint as editor, not a generic education funnel.",
      },
      {
        src: "/assets/work/growing-with-kid/gallery-03.svg",
        caption:
          "Small surface on purpose: traction signals are trust and return to the same voice, not feature count.",
      },
    ],
    outcomes: [
      {
        title: "Live community product",
        body: "Growing With Kid remains a working space for parents who want depth over noise.",
        level: "business",
        confidence: "observed",
      },
      {
        title: "Constraint as quality",
        body: "Fewer features forced sharper jobs — community and newsletter before software sprawl.",
        level: "operational",
        confidence: "directional",
      },
    ],
  },
  {
    index: "04",
    slug: "gwk-ghostwriter",
    client: "GWK Ghostwriter",
    title: "A personal AI LinkedIn studio — memory, voice, and a research-to-post workflow",
    summary:
      "An AI content engine built for Growing With Kid: LinkedIn posts in a personal voice, using long-term memory, source material, idea scoring, calendar, and analytics. Open the product.",
    year: "2026",
    category: "Founder & Ventures",
    industry: "AI · Content",
    tags: ["Founder", "AI", "Content"],
    tone: "gold",
    tier: "flagship",
    lane: "primary",
    role: "Founder / product builder",
    timeline: "2026",
    engagement: "Founder product",
    narrativeDepth: "deep",
    href: "/prototypes/gwk-ghostwriter/app.html",
    links: [
      { label: "Open product", href: "/prototypes/gwk-ghostwriter/app.html" },
      { label: "View landing", href: "/prototypes/gwk-ghostwriter/landing.html" },
    ],
    cover: "/assets/work/gwk-ghostwriter/cover.png",
    productStackCount: 9,
    mediaLayout: "default",
    gallery: [
      "/assets/work/gwk-ghostwriter/landing.png",
      "/assets/work/gwk-ghostwriter/dashboard.png",
      "/assets/work/gwk-ghostwriter/new-post.png",
      "/assets/work/gwk-ghostwriter/ideas-bank.png",
      "/assets/work/gwk-ghostwriter/knowledge.png",
      "/assets/work/gwk-ghostwriter/memory.png",
      "/assets/work/gwk-ghostwriter/voice.png",
      "/assets/work/gwk-ghostwriter/calendar.png",
      "/assets/work/gwk-ghostwriter/analytics.png",
    ],
    situation:
      "As Growing With Kid’s founder, I needed LinkedIn posts that sounded like me — grounded in source material I trusted — without rebuilding voice from a blank prompt every session. Generic AI tools forgot preferences, drifted tone, and treated research as disposable chat. The business need was a repeatable research-to-post workflow I would actually run.",
    people:
      "Primary user: myself as founder-operator publishing for Growing With Kid. Secondary: the same studio grammar intended to extend to Bolo Buddy and client tools without becoming a generic content mill.",
    apparentProblem:
      "“I need better prompts” — as if quality lived in wording the model once correctly.",
    underlyingProblem:
      "Voice, beliefs, sources, and what worked last time were not system state. Without memory, scoring, and human approval boundaries, the tool optimised for fluent text that still failed the job: posts I could stand behind.",
    mandate: {
      owned:
        "Product definition, experience architecture, memory model, voice rules, research-to-post workflow, and the live prototype surfaces.",
      others:
        "No separate product/engineering org — founder-built. Model providers supply generation; I own when drafts may publish.",
      decisionMaker: "Founder — final call on what ships and what the model is allowed to remember.",
      team: "Solo founder / product builder.",
      authority: "Full product authority inside the venture.",
      deliveryConstraints:
        "Had to ship a runnable studio, not a deck — including landing conversion — while keeping human approval before anything public.",
    },
    constraints: [
      "Generic chat UIs erase session context and encourage voice drift.",
      "Source material must stay attributable — research cannot silently invent.",
      "Publishing requires human approval; the model recommends, the founder decides.",
      "Studio grammar should extend to sibling products without becoming a prompt marketplace.",
    ],
    decision: {
      situation:
        "Build either a smarter prompt box or a system that remembers voice, sources, and feedback across sessions.",
      options: [
        {
          name: "Prompt-centric chat with saved snippets",
          rejectedBecause:
            "Still treats every draft as a new conversation. Voice rules and sources stay outside the product’s memory.",
        },
        {
          name: "Fully autonomous posting from calendar",
          rejectedBecause:
            "Removes the human approval boundary. Brand and factual risk too high for a founder voice product.",
        },
        {
          name: "Memory-backed studio with research → score → draft → preview → schedule",
        },
      ],
      evidence:
        "Running LinkedIn drafts in generic tools produced fluent posts that still drifted tone and ignored prior feedback. Source chats were hard to reuse. The job failed at continuity, not at sentence quality.",
      tradeoff:
        "A full studio costs more surface area (dashboard, editor, knowledge, analytics) than a chat widget — but only a system with memory can stop voice drift.",
      choice:
        "Ship a personal LinkedIn studio where preferences, style, feedback, and topics persist; ideas are scored from sources; drafts preview as LinkedIn; scheduling and analytics close the loop — always with human approval before publish.",
      result:
        "A workflow I can run: research to post with long-term memory and voice rules. Observed: live prototype and landing path; usage quality is directional while the product is still founder-operated.",
    },
    systemChangeSteps: [
      "Replaced the blank-prompt habit with a dashboard, post editor with live LinkedIn preview, ideas, calendar, knowledge base, memory, analytics, and voice profile.",
      "Made memory core — preferences, style, feedback, and topics persist so the next draft already knows the rules.",
      "Connected research to post: score ideas from source material, draft, preview, schedule, then read performance back into the studio.",
      "Kept human approval as a hard boundary — the model never publishes alone.",
      "Wrote the landing page as the product’s own conversion path, not a separate moodboard.",
    ],
    iteration: [
      {
        title: "Voice drift in early drafts",
        body: "Without a durable voice profile, drafts sounded “AI-helpful.” Explicit beliefs and style rules in memory reduced drift more than longer prompts.",
      },
      {
        title: "Source handling",
        body: "Knowledge-base material had to stay inspectable. Silent synthesis was rejected in favour of scored ideas tied to sources the founder can open.",
      },
      {
        title: "What still fails",
        body: "Memory can overfit recent feedback. Forgetting and re-weighting what to remember remains an open product question.",
      },
    ],
    outcomes: [
      {
        title: "Operational: runnable workflow",
        body: "Research-to-post loop with memory, voice rules, and source material a founder can operate end to end.",
        level: "operational",
        confidence: "observed",
      },
      {
        title: "Organisational: voice as system",
        body: "Writing rules and sources live in memory and knowledge — not in a one-off prompt.",
        level: "organisational",
        confidence: "observed",
      },
      {
        title: "Business: pattern that can extend",
        body: "Same studio grammar can serve Growing With Kid, Bolo Buddy, and client tools without becoming a generic mill — directional until those extensions ship.",
        level: "business",
        confidence: "directional",
      },
    ],
    frames: [
      {
        src: "/assets/work/gwk-ghostwriter/landing.png",
        scrollable: true,
        caption:
          "Landing as the product’s conversion path — not a separate moodboard from the studio itself.",
      },
      {
        src: "/assets/work/gwk-ghostwriter/dashboard.png",
        caption:
          "Dashboard as the job, not a chat log: ideas, calendar, and status replace “paste a prompt and hope.”",
      },
      {
        src: "/assets/work/gwk-ghostwriter/new-post.png",
        caption:
          "Editor with live LinkedIn preview: see the post as it will ship before human approval.",
      },
      {
        src: "/assets/work/gwk-ghostwriter/ideas-bank.png",
        caption:
          "Ideas bank: score and queue draft angles from source material instead of starting from a blank prompt.",
      },
      {
        src: "/assets/work/gwk-ghostwriter/knowledge.png",
        caption:
          "Knowledge and sources: research stays inspectable so drafts pull from material you trust, not silent invention.",
      },
      {
        src: "/assets/work/gwk-ghostwriter/memory.png",
        caption:
          "Long-term memory: preferences, feedback, and topics persist across sessions — the constraint that beats prompt theatre.",
      },
      {
        src: "/assets/work/gwk-ghostwriter/voice.png",
        caption:
          "Voice profile: beliefs and style rules live as system state so drafts stop drifting into generic AI-helpful tone.",
      },
      {
        src: "/assets/work/gwk-ghostwriter/calendar.png",
        caption:
          "Calendar closes the research-to-post loop: schedule drafts while keeping publish under human approval.",
      },
      {
        src: "/assets/work/gwk-ghostwriter/analytics.png",
        caption:
          "Analytics feed performance back into the studio so “what worked” becomes system state, not a forgotten impression.",
      },
    ],
    wouldChangeNow:
      "I would instrument before/after draft acceptance rates against a fixed voice rubric earlier, and define explicit forget rules so memory does not quietly become a junk drawer of every past preference.",
    atAGlance: {
      user: "Founder-operator publishing LinkedIn for Growing With Kid",
      problem: "Generic AI forgot voice, sources, and what worked — drafts drifted every session",
      mandate: "Full product ownership of memory model, voice rules, and research-to-post workflow",
      decision: "Memory-backed studio with human approval over prompt chat or autonomous posting",
      result: "Runnable research-to-post prototype with persistent voice and source handling",
    },
    verification: {
      status: "needs-confirmation",
      notes: [
        "Confirm early usage or quality evidence beyond founder-operated observation.",
        "Confirm which voice-drift examples are publishable.",
      ],
    },
  },
  {
    index: "05",
    slug: "bolo-buddy",
    client: "Bolo Buddy",
    title: "Culturally rooted bedtime stories for Indian children",
    summary:
      "An AI-powered, audio-first storytelling companion creating culturally rooted stories for Indian children.",
    year: "2023",
    category: "Founder & Ventures",
    industry: "AI · Children’s products",
    tags: ["Founder", "AI", "Family"],
    tone: "navy",
    tier: "flagship",
    lane: "primary",
    role: "Cofounder",
    timeline: "1.5+ years, ongoing",
    engagement: "Founder venture",
    narrativeDepth: "compact",
    href: "https://www.bolobuddy.in",
    cover: "/assets/work/bolo-buddy/cover.svg",
    gallery: [
      "/assets/work/bolo-buddy/gallery-01.svg",
      "/assets/work/bolo-buddy/gallery-02.svg",
      "/assets/work/bolo-buddy/gallery-03.svg",
    ],
    situation:
      "Indian parents wanting screen-free bedtime stories in Hindi, English, Hinglish, or Tamil found Western, screen-heavy, or culturally thin alternatives. Bolo Buddy had to earn trust on language, safety, and audio-first delivery — not become another kids’ video feed.",
    audience:
      "Primary: Indian parents of young children seeking culturally rooted, screen-free bedtime. Children hear stories; parents control language, voice, and boundaries.",
    designObjective:
      "Audio-first storytelling with cultural quality controls, parent controls, and a clear refusal to become screen-first entertainment. ₹299 subscription treated as an assumption to validate, not proven traction.",
    decisions: [
      "Audio-first and screen-free by design — text or narrated audio, mood-based categories — after parents rejected screen-dependent Western bedtime apps.",
      "Language selection across Hindi, English, Hinglish, and Tamil with cultural grounding in mythology and contemporary life; human voice narration (including family-recorded voice) over generic TTS as the trust cue.",
      "Child-safety and parent controls as product constraints: Bolo Buddy deliberately refuses to become open-ended chat, infinite video, or unsupervised generative play.",
    ],
    frames: [
      {
        src: "/assets/work/bolo-buddy/gallery-01.svg",
        caption:
          "Bedtime job: culturally rooted stories for Indian families — the problem Western screen apps do not solve.",
      },
      {
        src: "/assets/work/bolo-buddy/gallery-02.svg",
        caption:
          "Audio-first delivery: narration and language choice over screen time — constraint that shapes the whole product.",
      },
      {
        src: "/assets/work/bolo-buddy/gallery-03.svg",
        caption:
          "Family voice and parent control: trust surfaces sit with the adult, not in unbounded child chat.",
      },
    ],
    outcomes: [
      {
        title: "Active platform",
        body: "Bolo Buddy remains operational for Indian parents seeking culturally rooted, screen-free content.",
        level: "business",
        confidence: "observed",
      },
      {
        title: "Clear refusals",
        body: "Product boundaries — not chat toy, not video feed — are part of the design, not afterthoughts.",
        level: "organisational",
        confidence: "directional",
      },
    ],
    verification: {
      status: "needs-confirmation",
      notes: [
        "Confirm specific parent/child test protocols before claiming research depth.",
        "Confirm ₹299 subscription assumption vs any validation results.",
      ],
    },
  },
  {
    index: "06",
    slug: "2886",
    client: "2886",
    title: "Craft technique, modern cut",
    summary:
      "Artisan-led fashion brand named after the founder’s ancestral weaving village — traditional craft with minimal modern design.",
    year: "2016",
    category: "Web Design",
    industry: "Fashion · Craft",
    tags: ["Web Design", "Brand"],
    tone: "navy",
    tier: "flagship",
    lane: "primary",
    role: "Designer",
    timeline: "Project engagement",
    engagement: "Brand and web",
    narrativeDepth: "compact",
    href: "https://www.2886.in",
    cover: "/assets/work/2886/cover.svg",
    gallery: [
      "/assets/work/2886/gallery-01.svg",
      "/assets/work/2886/gallery-02.svg",
      "/assets/work/2886/gallery-03.svg",
    ],
    situation:
      "2886 needed a commercial web presence that held artisan technique and a modern cut in one journey — named after the founder’s ancestral weaving village — without reading as a souvenir site or a generic lookbook.",
    audience:
      "Buyers and customers who care about making and cut — not heritage kitsch or campaign-led fashion chrome.",
    designObjective:
      "Information architecture and customer journey that let cloth, cut, and making lead; quiet page types that take new collections without seasonal redesign.",
    decisions: [
      "Lead with village, craft, and contemporary silhouette rather than a catalogue-first grid.",
      "Few page types and restrained navigation so photography and type carry the commercial story.",
      "Treat the web as an extension of the atelier — detail-focused, not campaign theatre.",
    ],
    frames: [
      {
        src: "/assets/work/2886/gallery-01.svg",
        caption: "IA that holds craft and cut together — commercial goal without souvenir framing.",
      },
      {
        src: "/assets/work/2886/gallery-02.svg",
        caption: "Quiet page system: garments lead; chrome does not compete.",
      },
      {
        src: "/assets/work/2886/gallery-03.svg",
        caption: "Collection-ready structure chosen so new drops do not force a redesign.",
      },
    ],
    outcomes: [
      {
        title: "Craft on the web",
        body: "Traditional technique and modern design share one register instead of splitting heritage from product.",
        level: "organisational",
        confidence: "observed",
      },
      {
        title: "Durable frame",
        body: "Minimal structure that can take new collections without a redesign each season.",
        level: "operational",
        confidence: "directional",
      },
    ],
  },
  {
    index: "07",
    slug: "pacific-design-house",
    client: "Pacific Design House",
    title: "Ethical garment manufacturing, on the web",
    summary:
      "Site for a New Delhi / Jaipur design, sourcing, and manufacturing house — 70,000+ garments a month, SEDEX-certified.",
    year: "2016",
    category: "Web Design",
    industry: "Fashion · Manufacturing",
    tags: ["Web Design", "Brand"],
    tone: "mist",
    tier: "flagship",
    lane: "primary",
    role: "Designer",
    timeline: "Project engagement",
    engagement: "Brand and web",
    narrativeDepth: "compact",
    href: "https://www.pacificdesignhouse.com",
    cover: "/assets/work/pacific-design-house/cover.svg",
    gallery: [
      "/assets/work/pacific-design-house/gallery-01.svg",
      "/assets/work/pacific-design-house/gallery-02.svg",
      "/assets/work/pacific-design-house/gallery-03.svg",
    ],
    situation:
      "Pacific Design House — New Delhi / Jaipur design, sourcing, and ethical manufacturing — needed a buyer-facing site where capacity, workforce, and certification were part of the offer, not a CSR footnote under lookbooks.",
    audience:
      "International buyers who evaluate making, SEDEX credentials, and place (Delhi / Jaipur) alongside design.",
    designObjective:
      "Scannable structure for process, credentials, and collections without turning the site into a brochure or a pure fashion template.",
    decisions: [
      "Frame design plus manufacturing in one narrative: sourcing, factory, and ethics with the garments.",
      "Give certification, workforce, and place clear IA so buyers can scan without hunting.",
      "Keep the visual system calm so photography of making and cloth does the commercial work.",
    ],
    frames: [
      {
        src: "/assets/work/pacific-design-house/gallery-01.svg",
        caption: "Buyer offer: capacity and ethics sit with design — not buried under lookbook chrome.",
      },
      {
        src: "/assets/work/pacific-design-house/gallery-02.svg",
        caption: "Process pages: studio-to-floor journey without CSR theatre.",
      },
      {
        src: "/assets/work/pacific-design-house/gallery-03.svg",
        caption: "Credentials and place scannable for international buyers (SEDEX, Delhi / Jaipur).",
      },
    ],
    outcomes: [
      {
        title: "Buyer-facing house",
        body: "Manufacturing capacity and ethical practice read as part of the design offer.",
        level: "organisational",
        confidence: "observed",
      },
      {
        title: "Working-studio system",
        body: "Structure holds collections, credentials, and exhibitions without a new identity each season.",
        level: "operational",
        confidence: "directional",
      },
    ],
  },
  {
    index: "08",
    slug: "viralops",
    client: "Viralops",
    title: "Dual-product web redesign under ambiguous scope",
    summary:
      "Website redesign for a hospitality and cinema tech platform — scope protected and decisions documented through an incomplete engagement.",
    year: "2018",
    category: "Web Design",
    industry: "Hospitality · Cinema tech",
    tags: ["Web", "Freelance", "Brand"],
    tone: "navy",
    tier: "flagship",
    lane: "primary",
    role: "Freelance / independent designer",
    timeline: "3–6 months",
    engagement: "Freelance project",
    narrativeDepth: "compact",
    cover: "/assets/work/viralops/cover.svg",
    gallery: [
      "/assets/work/viralops/gallery-01.svg",
      "/assets/work/viralops/gallery-02.svg",
      "/assets/work/viralops/gallery-03.svg",
    ],
    situation:
      "Viralops needed one site that could carry two offerings — VServe-ProTecht for luxury hotel guest engagement and VServe-Cinemas for theater concessions — for operators worldwide. Stakeholder feedback and review cadence were ambiguous; the design job was to protect scope and leave decisions documented even if launch paused.",
    audience:
      "Hotel and venue operators evaluating hospitality and cinema tech; founder Mrigank as primary stakeholder.",
    designObjective:
      "Complete a dual-product redesign that reflects positioning for both lines, documents decisions, and remains recoverable when the engagement stops short of launch.",
    decisions: [
      "Discovery with the founder to lock dual-product positioning before expanding page inventory.",
      "Incorporate the first stakeholder feedback round into a full redesign while freezing scope against endless reopenings.",
      "Deliver documented design decisions as the artefact of record when further iteration and launch paused — learning: ambiguity is managed with written decisions, not blame for delay.",
    ],
    frames: [
      {
        src: "/assets/work/viralops/gallery-01.svg",
        caption: "Dual-product framing: hospitality and cinema tech share one site without collapsing into one vague pitch.",
      },
      {
        src: "/assets/work/viralops/gallery-02.svg",
        caption: "Redesign after first feedback: scope protected so review cycles could not silently rewrite the brief.",
      },
      {
        src: "/assets/work/viralops/gallery-03.svg",
        caption: "Decision documentation as outcome: work remains usable if the engagement resumes.",
      },
    ],
    outcomes: [
      {
        title: "Design delivered",
        body: "Full redesign reflecting stakeholder feedback through the first review cycle.",
        level: "operational",
        confidence: "observed",
      },
      {
        title: "Ambiguity managed",
        body: "Scope and decisions documented when the engagement paused before further iteration or launch — without centering client delay as the story.",
        level: "organisational",
        confidence: "directional",
      },
    ],
  },
  {
    index: "09",
    slug: "verizon",
    client: "Verizon",
    title: "Turnkey digital signage across distributed locations",
    summary:
      "A compact media-player architecture and cloud portal for campaign playback across retail, transit, and campus screens — without depending on site Wi-Fi.",
    year: "2021",
    category: "Enterprise Systems",
    industry: "Telecom · Digital signage",
    tags: ["Enterprise", "Signage", "Advisory"],
    tone: "green",
    tier: "flagship",
    lane: "enterprise",
    role: "Staff Design Consultant",
    timeline: "6 months",
    engagement: "IC level",
    narrativeDepth: "compact",
    cover: "/assets/work/verizon/cover.svg",
    gallery: [
      "/assets/work/verizon/gallery-01.svg",
      "/assets/work/verizon/gallery-02.svg",
      "/assets/work/verizon/gallery-03.svg",
    ],
    situation:
      "Operators needed dynamic multimedia across retail, transit, and campus screens without waiting on each site’s Wi-Fi or IT approval. Existing deployment models stalled on local network dependency. The design job was the out-of-band kit + central portal experience — not inventing the entire telecom stack.",
    audience:
      "Campaign operators and field teams deploying media players; enterprise buyers evaluating turnkey signage without site IT friction.",
    designObjective:
      "Clarify what already existed vs what I designed: HDMI media-player kit with embedded LTE, independent wireless campaign stream, and a cloud portal for alerts, scheduling, reboots, and screenshots.",
    decisions: [
      "Design the deployment model around a compact player + LTE kit so activation bypasses corporate Wi-Fi approvals — the decision that removed the main field friction.",
      "Run campaign data on an out-of-band wireless path outside reseller IT, protecting internal bandwidth.",
      "Central portal for scheduling, health alerts, remote reboot, and screenshot verification — operational command without truck rolls for every content swap.",
    ],
    frames: [
      {
        src: "/assets/work/verizon/gallery-01.svg",
        caption:
          "Kit architecture: HDMI player + LTE — what I designed for deployment friction, on top of hardware/connectivity partners.",
      },
      {
        src: "/assets/work/verizon/gallery-02.svg",
        caption:
          "Out-of-band stream: campaign data outside site Wi-Fi — the constraint that made distributed locations shipable.",
      },
      {
        src: "/assets/work/verizon/gallery-03.svg",
        caption:
          "Cloud portal: schedule, alert, reboot, screenshot — operators verify playback without on-site network dependency.",
      },
    ],
    outcomes: [
      {
        title: "Operational: frictionless deploy",
        body: "Players activate via pre-configured LTE without waiting on site Wi-Fi approvals.",
        level: "operational",
        confidence: "observed",
      },
      {
        title: "Operational: centralized command",
        body: "Nationwide displays managed from one portal with remote health and screenshot verification.",
        level: "operational",
        confidence: "directional",
      },
    ],
  },
  {
    index: "10",
    slug: "crowley",
    client: "Crowley Maritime",
    title: "Unifying freight quoting across a fragmented supply chain",
    summary:
      "A guided quote flow that replaced a dense legacy form — origin to cargo to contact — aligned with rate-engine and customs constraints.",
    year: "2023",
    category: "Enterprise Systems",
    industry: "Maritime · Logistics",
    tags: ["Enterprise", "Ops", "B2B"],
    tone: "navy",
    tier: "flagship",
    lane: "enterprise",
    role: "Staff Design Consultant",
    timeline: "1 year",
    engagement: "Advisory",
    narrativeDepth: "deep",
    href: "https://www.crowley.com/logistics/route/",
    links: [
      { label: "Visit live site", href: "https://www.crowley.com/logistics/route/" },
      {
        label: "Sign in to C Sight",
        href: "https://csight.crowley.com/crowley/s/find-a-route",
      },
    ],
    cover: "/assets/work/crowley/cover.webp",
    productStackCount: 5,
    mediaLayout: "default",
    gallery: [
      "/assets/work/crowley/landing.png",
      "/assets/work/crowley/gallery-01.webp",
      "/assets/work/crowley/gallery-02.webp",
      "/assets/work/crowley/gallery-03.webp",
      "/assets/work/crowley/gallery-04.webp",
    ],
    designSystem: [
      {
        src: "/assets/work/crowley/design-system-cover.png",
        caption: "Design system",
        width: 1400,
        height: 900,
      },
      {
        src: "/assets/work/crowley/colors-documentation.png",
        caption: "Colors",
        width: 1400,
        height: 1090,
      },
      {
        src: "/assets/work/crowley/grid-system-documentation.png",
        caption: "Grid system",
        width: 1400,
        height: 900,
      },
      {
        src: "/assets/work/crowley/iconography-docs.png",
        caption: "Iconography",
        width: 1400,
        height: 900,
      },
      {
        src: "/assets/work/crowley/components-documentation.png",
        caption: "Components",
        width: 1400,
        height: 900,
      },
      {
        src: "/assets/work/crowley/symbols-documentation.png",
        caption: "Symbols",
        width: 1400,
        height: 1356,
      },
    ],
    situation:
      "A freight buyer trying to price an ocean-to-door move had to reconcile trucking, port, and customs broker inputs before Crowley could return a usable quote. Ops needed one upfront price across ocean, rail, and land. The legacy surface was a dense ~20-field spreadsheet-style form that could not satisfy both speed and compliance.",
    people:
      "Primary users were international shippers and Crowley quote operators. Stakeholders included product managers owning prioritisation, engineering owning the rate engine and APIs, and compliance owning customs and regulatory data requirements.",
    apparentProblem:
      "The team believed the quote experience was “too complex” and needed a cleaner UI on top of the same field set.",
    underlyingProblem:
      "Quoting was not one form — it was a fragmented operating model. Route, cargo, schedule, and customs data lived in different handoffs. Rate-engine fields and customs requirements could not be dropped; they could only be sequenced so shippers answered the right question at the right moment.",
    mandate: {
      owned:
        "Experience architecture for the quote wizard, progressive disclosure of cargo and contact steps, and design-system direction adopted with the Crowley product team.",
      others:
        "Product owned prioritisation and release sequencing. Engineering defined rate-engine and API field constraints. Compliance reviewed customs and regulatory data collection.",
      decisionMaker:
        "Product made final scope calls; compliance could block a step that omitted required regulatory fields.",
      team:
        "Staff design consultant embedded with product, engineering, and compliance stakeholders across a year-long advisory engagement.",
      authority:
        "Advisory authority over experience architecture and system patterns — not headcount ownership of the Crowley design org.",
      deliveryConstraints:
        "Had to ship against a live rate engine, existing cargo data structures, and customs rules that could not be redesigned away.",
    },
    constraints: [
      "Rate-engine APIs required specific geographic, dimension, and schedule inputs before a price could return.",
      "Customs clearance data had to enter the flow early enough that illegal or incomplete routes failed before sales support.",
      "Legacy operators were trained on spreadsheet-dense forms; a complete rewrite risked rejection if it hid required fields.",
      "Quote output needed to connect into downstream warehousing, tracking, and delivery — not act as a standalone calculator.",
    ],
    decision: {
      situation:
        "We had to replace a ~20-field legacy form without losing rate-engine or customs fidelity, while making the quote usable for shippers who were not maritime specialists.",
      options: [
        {
          name: "Reskin the one-page form",
          rejectedBecause:
            "Visual cleanup would not reduce cognitive load or change the order of dependent fields. Rate and customs errors would still surface late.",
        },
        {
          name: "Keep a spreadsheet-adjacent multi-column layout",
          rejectedBecause:
            "Familiar to internal operators, but reinforced the fragmented mental model for external shippers and blocked mobile/use outside ops desks.",
        },
        {
          name: "Three-step progressive disclosure (route → cargo → contact)",
        },
      ],
      evidence:
        "Field mapping with engineering showed many fields were only valid after route and load type were known. Compliance confirmed customs constraints belonged with route selection, not as a post-quote legal review.",
      tradeoff:
        "Progressive disclosure adds steps and risks abandonment if each step feels empty — but it lets validation and smart defaults run where they belong, and keeps required complexity from appearing all at once.",
      choice:
        "Ship a guided three-step wizard: origin and destination first, then cargo readiness and load type, then contact — with rate generation after the system has enough structured input.",
      result:
        "Reduced a roughly 20-field form into three progressive steps while keeping rate-engine and customs requirements inside the flow. What could not be simplified stayed: maritime weight/dimension semantics and regulatory fields that engineering and compliance still required.",
    },
    systemChangeSteps: [
      "Mapped the fragmented quote path — trucking, port, broker, and Crowley ops inputs — into one route-first sequence instead of a flat field dump.",
      "Aligned front-end fields with rate-engine constraints so geographic data, cargo dimensions, and schedule only asked for what the API could price.",
      "Embedded customs and regulatory collection into route selection so compliance failures happened before a misleading quote reached the shipper.",
      "Structured cargo details around readiness date and load type (FCL, LCL, breakbulk, vehicle) with inline validation and smart defaults.",
      "Connected quote output into downstream execution rather than leaving pricing as a dead-end calculator.",
      "Partnered on the design system the platform continued to use after the engagement — contributing patterns and documentation that product and engineering could adopt, not sole ownership of Crowley’s entire visual language.",
    ],
    iteration: [
      {
        title: "Legacy density vs. progressive steps",
        body: "Early drafts still asked for too much on step one. Stakeholder reviews pushed cargo and contact later once it was clear the rate engine could not price without route and load type first.",
      },
      {
        title: "What stayed hard",
        body: "Maritime metrics and customs inputs could not become “simple.” The win was sequencing and validation, not pretending freight quoting was a consumer checkout.",
      },
      {
        title: "Design-system adoption",
        body: "System documentation (colour, grid, iconography, components) was introduced with product partners so the wizard and later surfaces shared one language. Longevity beyond the engagement reflects continued team ownership, not a one-person maintainership claim.",
      },
    ],
    outcomes: [
      {
        title: "Operational: three-step quote",
        body: "Collapsed a dense legacy form into a guided route → cargo → contact flow with per-step validation.",
        level: "operational",
        confidence: "observed",
      },
      {
        title: "Organisational: shared structures",
        body: "Unified cargo and container data structures with Product so weight and dimension metrics read as scannable interface elements, not spreadsheet columns.",
        level: "organisational",
        confidence: "directional",
      },
      {
        title: "Organisational: system patterns",
        body: "Contributed design-system direction the platform continued to run on after the advisory year, adopted with Crowley product and engineering partners.",
        level: "organisational",
        confidence: "directional",
      },
    ],
    frames: [
      {
        src: "/assets/work/crowley/landing.png",
        scrollable: true,
        caption:
          "Marketing landing as the commercial entry: Crowley frames logistics capability before the quote wizard takes the operational handoff.",
      },
      {
        src: "/assets/work/crowley/gallery-01.webp",
        caption:
          "Route-first step: origin and destination become the entry point so trucking, port, and network choices stop competing as a flat field list. Selected because rate and customs logic depend on geography before cargo detail.",
      },
      {
        src: "/assets/work/crowley/gallery-02.webp",
        caption:
          "Cargo step after route is known: readiness date and load type replace asking every maritime metric up front. Constraint: the rate engine only prices once load type is set.",
      },
      {
        src: "/assets/work/crowley/gallery-03.webp",
        caption:
          "Contact and rate handoff: shippers leave with a structured estimate instead of a support ticket. What users can now do — request a quote without reconstructing the spreadsheet mentally.",
      },
      {
        src: "/assets/work/crowley/gallery-04.webp",
        caption:
          "Downstream connection: quoting feeds execution language rather than ending as a calculator. Pattern chosen so Crowley keeps one source of truth from price to move.",
      },
    ],
    wouldChangeNow:
      "I would document the fragmented before-state as an explicit operator journey map earlier in the engagement, and I would instrument step abandonment by field type so product could see which customs or dimension prompts still create friction in production.",
    atAGlance: {
      user: "International shippers and Crowley quote operators",
      problem: "A ~20-field spreadsheet-style quote split across trucking, ports, and brokers",
      mandate: "Experience architecture for the wizard and design-system direction with product partners",
      decision: "Three-step progressive disclosure over a reskin or spreadsheet-adjacent layout",
      result: "Guided route → cargo → contact flow that still satisfies rate-engine and customs constraints",
    },
    verification: {
      status: "needs-confirmation",
      notes: [
        "Confirm any usability or A/B evidence that preferred progressive disclosure.",
        "Confirm exact ownership wording for design-system adoption vs sole authorship.",
        "Confirm production validation or instrumentation evidence if publishable.",
      ],
    },
  },
  {
    index: "11",
    slug: "sagacito",
    client: "Sagacito",
    title: "An AI-driven revenue suite for perishable media inventory",
    summary:
      "Ymax, Pgov, and RevX designed as one pre-sales-to-revenue pipeline for print, TV, and digital inventory.",
    year: "2020",
    category: "SaaS Products",
    industry: "Media · Revenue systems",
    tags: ["SaaS", "AI", "Pricing"],
    tone: "gold",
    tier: "flagship",
    lane: "enterprise",
    role: "Lead Designer",
    timeline: "2+ years",
    engagement: "Full-time employment",
    narrativeDepth: "supporting",
    cover: "/assets/work/sagacito/cover.svg",
    gallery: [
      "/assets/work/sagacito/gallery-01.svg",
      "/assets/work/sagacito/gallery-02.svg",
      "/assets/work/sagacito/gallery-03.svg",
    ],
    situation:
      "A media sales rep pricing perishable inventory — airtime and page space — used manual discounts and disconnected pre-sales tools, leaking margin in seasonal spikes. Houses needed higher yield without blocking deals. Existing workflows could not both recommend a price and stop harmful discounting when data quality was weak.",
    mandate: {
      owned:
        "Experience design for Ymax pricing, proposal/product-mix flows, Pgov approval guardrails, and RevX signals into the revenue pipeline.",
      others:
        "Product owned roadmap. Data/ML owned model inputs. Sales leadership owned commercial policy for overrides.",
      decisionMaker: "Product and sales leadership on discount policy; design owned how recommendation vs decision appeared in the UI.",
      team: "Lead designer with product, engineering, and data partners across Ymax, Pgov, and RevX.",
      authority: "Lead design ownership of the suite’s UX — not sole ownership of pricing algorithms.",
      deliveryConstraints:
        "Print, TV, and digital inventory units differed; weak audience data could not silently invent confident prices.",
    },
    decision: {
      situation:
        "Decide whether AI pricing auto-commits a rate or recommends a price with explicit override and approval paths when confidence is low.",
      options: [
        {
          name: "Fully autonomous price write-back",
          rejectedBecause:
            "Sales would reject a black box, and weak data could lock harmful rates into live inventory.",
        },
        {
          name: "Manual pricing with AI as a hidden report",
          rejectedBecause:
            "Would leave discount leakage untouched — the original revenue problem.",
        },
        {
          name: "Recommend with confidence, human override, Pgov guardrails on non-compliant discounts",
        },
      ],
      evidence:
        "Sales behaviour showed margin loss from discretionary discounts during spikes. Model confidence varied with audience and seasonality data quality — the interface had to show recommendation vs decision clearly.",
      tradeoff:
        "Human override preserves trust but reintroduces discount risk — so Pgov auto-approves compliant deals and escalates heavy discounts instead of hiding the AI.",
      choice:
        "Ymax recommends the highest acceptable price from inventory, seasonality, and audience signals; reps can override; Pgov escalates non-compliant or heavily discounted proposals.",
      result:
        "Pre-sales-to-revenue pipeline adopted by major Indian media houses (company-context clients). Pricing stayed explainable under weak data instead of silently decisive.",
    },
    systemChangeSteps: [
      "Designed Ymax to surface recommended price against inventory constraints, seasonality, and audience data — with confidence visible enough that weak data did not look certain.",
      "Automated proposal and product-mix bundling so reps could meet campaign needs without defaulting to blanket discounts.",
      "Built Pgov approval-guardrail workflow: auto-approve compliant deals, escalate harmful discounting.",
      "Unified TV seconds and print centimetres into a blended portfolio model, and wired RevX prospecting signals into Ymax.",
    ],
    outcomes: [
      {
        title: "Business: client adoption",
        body: "Implemented by major Indian media conglomerates including Hindustan Times, Ananda Bazar Patrika, and PVR Cinemas.",
        level: "business",
        confidence: "company-metric",
      },
      {
        title: "Organisational: one pipeline",
        body: "Ymax, Pgov, and RevX function as one connected pre-sales-to-revenue system rather than three tools.",
        level: "organisational",
        confidence: "observed",
      },
      {
        title: "Operational: recommend ≠ decide",
        body: "Sales see AI pricing as a recommendation with override and approval paths when data quality is weak.",
        level: "operational",
        confidence: "directional",
      },
    ],
    frames: [
      {
        src: "/assets/work/sagacito/gallery-01.svg",
        caption:
          "Pricing recommendation: inventory and seasonality shape a suggested rate — the system advises; the rep still owns the commercial call.",
      },
      {
        src: "/assets/work/sagacito/gallery-02.svg",
        caption:
          "Proposal and mix: premium slots bundled with lower-demand inventory so campaign needs do not force blanket discounting.",
      },
      {
        src: "/assets/work/sagacito/gallery-03.svg",
        caption:
          "Pgov guardrails: compliant deals pass; heavy discounts escalate — the constraint that keeps AI from harming yield.",
      },
    ],
    wouldChangeNow:
      "I would show one priced deal end-to-end with weak-data and strong-data variants side by side, so hiring managers see exactly how confidence and overrides behave.",
  },
  {
    index: "12",
    slug: "shuttl",
    client: "Shuttl",
    title: "An end-to-end design system for urban mobility at scale",
    summary:
      "Rider, driver, and corporate surfaces on one system — including data-over-sound check-in for congested corridors.",
    year: "2019",
    category: "Enterprise Systems",
    industry: "Mobility · Product design",
    tags: ["Mobility", "Systems", "Field research"],
    tone: "mist",
    tier: "flagship",
    lane: "enterprise",
    role: "Staff Design Consultant",
    timeline: "3+ years",
    engagement: "IC level",
    narrativeDepth: "supporting",
    cover: "/assets/work/shuttl/cover.svg",
    gallery: [
      "/assets/work/shuttl/gallery-01.svg",
      "/assets/work/shuttl/gallery-02.svg",
      "/assets/work/shuttl/gallery-03.svg",
    ],
    situation:
      "A rider boarding a Shuttl bus in a congested corridor needed proof of check-in without reliable Wi-Fi or cellular, while drivers needed a fast confirmation that did not create privacy or noise failures. Ops needed accurate ridership. QR, GPS geofence, Wi-Fi, and cellular approaches failed under real corridor conditions.",
    mandate: {
      owned:
        "Product design for rider, driver, and corporate surfaces; design-system foundation; data-over-sound check-in experience and failure states.",
      others:
        "Product owned roadmap. Engineering owned audio/data protocol feasibility. Operations owned field rollout.",
      decisionMaker: "Product on shipping check-in method; engineering on technical viability.",
      team: "Staff design consultant with product, engineering, and ops across B2C and B2B lines.",
      authority: "IC-level design ownership of system patterns and the check-in journey.",
      deliveryConstraints:
        "Noise, privacy, device diversity, and intermittent connectivity in Delhi-NCR-style corridors.",
    },
    decision: {
      situation:
        "Choose a boarding check-in method that works when QR scanning, GPS geofencing, Wi-Fi, and cellular handshakes fail in crowded stops.",
      options: [
        {
          name: "QR scan at boarding",
          rejectedBecause:
            "Failed under queue pressure, damaged codes, and riders without a ready camera flow — slowed boarding.",
        },
        {
          name: "GPS / geofence auto check-in",
          rejectedBecause:
            "Unreliable in dense corridors and multi-bus stops; false positives and missed boardings.",
        },
        {
          name: "Wi-Fi or cellular handshake with the bus",
          rejectedBecause:
            "Congested networks and carrier dead zones made connectivity the failure mode, not the rider.",
        },
        {
          name: "Data-over-sound check-in — privacy-preserving, network-agnostic",
        },
      ],
      evidence:
        "Field observation of boarding showed network-dependent methods collapsing at peak. Drivers needed a confirmation that did not depend on the rider’s data plan.",
      tradeoff:
        "Audio data transfer introduces new failure states (noise, volume, device mic) — but removes dependence on corridor connectivity that the product could not control.",
      choice:
        "Ship automated data-over-sound passenger check-in with explicit failure recovery, alongside a design system holding rider, driver, and corporate surfaces.",
      result:
        "Check-in and live tracking became core differentiators. Company-context scale (1M+ daily riders, 80+ corporates) describes Shuttl’s platform, not a personal KPI.",
    },
    systemChangeSteps: [
      "Documented why QR, GPS, Wi-Fi, and cellular failed for riders and drivers in congested stops.",
      "Designed data-over-sound check-in with failure states and recovery instead of a happy-path-only demo.",
      "Built live tracking across B2C and B2B so riders and fleet managers shared operational truth.",
      "Scaled the design system through payroll integration, tiered pricing, and fleet optimisation without fracturing language.",
    ],
    outcomes: [
      {
        title: "Operational: check-in that works offline-ish",
        body: "Data-over-sound boarding confirmation without depending on Wi-Fi or cellular at the stop.",
        level: "operational",
        confidence: "observed",
      },
      {
        title: "Company context: platform scale",
        body: "Design system held rider, driver, and corporate surfaces on a platform that served 1M+ daily riders and 80+ enterprise clients.",
        level: "business",
        confidence: "company-metric",
      },
      {
        title: "Organisational: durable practice",
        body: "Years of staff-level work established patterns that could scale across consumer and enterprise lines.",
        level: "organisational",
        confidence: "directional",
      },
    ],
    frames: [
      {
        src: "/assets/work/shuttl/gallery-01.svg",
        caption:
          "Rider surface: booking and boarding in one system language — check-in designed for corridor failure, not lab connectivity.",
      },
      {
        src: "/assets/work/shuttl/gallery-02.svg",
        caption:
          "Data-over-sound check-in: network-agnostic confirmation after QR/GPS/Wi-Fi/cellular approaches failed in the field.",
      },
      {
        src: "/assets/work/shuttl/gallery-03.svg",
        caption:
          "Corporate and driver ops: live tracking and fleet views share the same system so B2B and B2C do not diverge.",
      },
    ],
    wouldChangeNow:
      "Lead the case with the check-in failure matrix and field notes as the spine, and keep the design-system overview as supporting context rather than the headline.",
  },
  {
    index: "13",
    slug: "hempel",
    client: "Hempel",
    title: "Workshop insights into digitized coatings procurement",
    summary:
      "A three-month advisory that ranked procurement friction by ROI and informed MyHempel’s core feature set.",
    year: "2022",
    category: "Enterprise Systems",
    industry: "Industrial · Procurement",
    tags: ["Advisory", "Workshops", "B2B"],
    tone: "green",
    tier: "flagship",
    lane: "enterprise",
    role: "Staff Design Consultant",
    timeline: "3 months",
    engagement: "Advisory — UX workshop facilitation",
    narrativeDepth: "supporting",
    cover: "/assets/work/hempel/cover.svg",
    gallery: [
      "/assets/work/hempel/gallery-01.svg",
      "/assets/work/hempel/gallery-02.svg",
      "/assets/work/hempel/gallery-03.svg",
    ],
    situation:
      "A B2B coatings buyer trying to order industrial or marine product still depended on offline, manual procurement — no digital order management, documentation access, or selector. Hempel needed a digitisation roadmap, not a feature wishlist. Three months of advisory had to turn workshop friction into sequenced product work.",
    mandate: {
      owned:
        "Workshop facilitation, end-to-end friction mapping, ROI-ranked roadmap synthesis, and handoff into MyHempel priorities.",
      others:
        "Hempel stakeholders owned domain truth and commercial priorities. Internal product owned eventual build.",
      decisionMaker: "Hempel product leadership on what entered the roadmap.",
      team: "Staff design consultant facilitating stakeholder workshops.",
      authority: "Advisory — recommendations, not delivery ownership of MyHempel engineering.",
      deliveryConstraints: "Three-month window; offline-to-digital transition; industrial/marine compliance documentation.",
    },
    decision: {
      situation:
        "Stakeholders surfaced many pains. The decision was how to score and sequence them so the roadmap was not a flat brainstorm list.",
      options: [
        {
          name: "Equal-weight feature backlog from every workshop sticky",
          rejectedBecause:
            "Would produce a catalogue without commercial sequencing — easy to ignore.",
        },
        {
          name: "Only digitise order placement",
          rejectedBecause:
            "Ignored discovery, field use, fulfillment opacity, and compliance docs — the frictions that blocked trust in a portal.",
        },
        {
          name: "Score friction by customer pain × ROI, then sequence four core areas",
        },
      ],
      evidence:
        "Workshop maps of the manual procurement journey showed repeated pain at technical discovery, mobile/field use, staggered fulfillment visibility, and disconnected compliance documentation.",
      tradeoff:
        "Ranking drops some stakeholder favourites — necessary so MyHempel could start with order management, documentation, and a smart coating selector instead of boiling the ocean.",
      choice:
        "Publish an ROI-ranked roadmap: rigid technical product discovery, field/mobile usability, opaque staggered fulfillment, and disconnected compliance documentation as the highest-leverage set.",
      result:
        "Recommendations informed MyHempel’s core feature set. Directional link from workshop to product — not a claim of sole authorship of the live portal.",
    },
    systemChangeSteps: [
      "Facilitated workshops mapping the manual procurement process end to end.",
      "Built a friction map and scored areas by customer pain and ROI rather than volume of complaints alone.",
      "Compared a before (offline, opaque) and after (sequenced digital priorities) roadmap view for stakeholders.",
      "Handed off priorities that map to order management, instant documentation, and the smart coating system selector.",
    ],
    outcomes: [
      {
        title: "Organisational: ranked roadmap",
        body: "Friction sequenced against customer pain and ROI instead of a flat feature checklist.",
        level: "organisational",
        confidence: "observed",
      },
      {
        title: "Business: informed MyHempel",
        body: "Workshop priorities map onto MyHempel’s core digitisation features today.",
        level: "business",
        confidence: "directional",
      },
      {
        title: "Operational: high-leverage advisory",
        body: "Three months produced foundational direction without pretending to ship the full platform in-session.",
        level: "operational",
        confidence: "observed",
      },
    ],
    frames: [
      {
        src: "/assets/work/hempel/gallery-01.svg",
        caption:
          "Workshop evidence: manual procurement mapped end to end so friction was visible as a system, not anecdotes.",
      },
      {
        src: "/assets/work/hempel/gallery-02.svg",
        caption:
          "Friction map: four highest-ROI areas — discovery, field use, fulfillment opacity, compliance docs.",
      },
      {
        src: "/assets/work/hempel/gallery-03.svg",
        caption:
          "Roadmap after scoring: order management, documentation, and coating selector sequenced for MyHempel — not an equal wishlist.",
      },
    ],
    wouldChangeNow:
      "Include the scoring criteria table (pain × ROI) as a first-class artefact on the page so the prioritisation logic is inspectable, not just asserted.",
  },
  {
    index: "14",
    slug: "urban-prakriti",
    client: "Urban Prakriti",
    title: "A health brand for city residents, built as a founder",
    summary:
      "Positioning, identity, and D2C e-commerce for plant-based superfoods with transparent sourcing.",
    year: "2022",
    category: "Founder & Ventures",
    industry: "Health · E-commerce",
    tags: ["Founder", "Brand", "D2C"],
    tone: "mist",
    tier: "flagship",
    lane: "founder",
    role: "Cofounder",
    timeline: "3+ years, ongoing, part-time",
    engagement: "Founder venture",
    narrativeDepth: "compact",
    cover: "/assets/work/urban-prakriti/cover.svg",
    gallery: [
      "/assets/work/urban-prakriti/gallery-01.svg",
      "/assets/work/urban-prakriti/gallery-02.svg",
      "/assets/work/urban-prakriti/gallery-03.svg",
    ],
    situation:
      "City residents seeking plant-based superfoods faced commoditized shelves with opaque sourcing. Competing on price alone would erase the trust job. The founder tradeoff was transparent sourcing and education vs. race-to-bottom pricing.",
    audience:
      "Urban Indian consumers wanting non-GMO, gluten-free, vegan-friendly products with clear sourcing — not anonymous commodity packs.",
    designObjective:
      "Position for wellness and transparency, build identity and D2C, acquire through wellness communities — evidence of customer trust over price claims.",
    decisions: [
      "Refuse commodity price competition; lead with transparent sourcing and ingredient education.",
      "Visual identity around prakriti — clean and human-centered rather than clinical or discount-led.",
      "D2C with sourcing visible on site and packaging; acquire via wellness communities — experiments that chased price traffic were deprioritised.",
    ],
    frames: [
      {
        src: "/assets/work/urban-prakriti/gallery-01.svg",
        caption: "Positioning for city residents: trust and sourcing over commodity price.",
      },
      {
        src: "/assets/work/urban-prakriti/gallery-02.svg",
        caption: "Identity and packaging: prakriti cues that make sourcing feel inspectable.",
      },
      {
        src: "/assets/work/urban-prakriti/gallery-03.svg",
        caption: "D2C and community: acquisition where trust compounds, not price ads alone.",
      },
    ],
    outcomes: [
      {
        title: "Active venture",
        body: "Urban Prakriti remains operational in health and wellness with ongoing customer relationships.",
        level: "business",
        confidence: "observed",
      },
      {
        title: "Tradeoff held",
        body: "Transparent brand stance instead of price-led commodity positioning.",
        level: "organisational",
        confidence: "directional",
      },
    ],
  },
  {
    index: "15",
    slug: "obzrv",
    client: "Obzrv",
    title: "A real-time F&B analytics MVP for the Gulf",
    summary:
      "A working dashboard MVP for restaurants, cloud kitchens, brands, and distributors tracking live market activity.",
    year: "2021",
    category: "Freelance MVPs",
    industry: "F&B · Analytics",
    tags: ["MVP", "Dashboards", "Freelance"],
    tone: "gold",
    tier: "flagship",
    lane: "archive",
    role: "Freelance designer",
    timeline: "Under 3 months",
    engagement: "Freelance project",
    narrativeDepth: "compact",
    cover: "/assets/work/obzrv/cover.svg",
    gallery: [
      "/assets/work/obzrv/gallery-01.svg",
      "/assets/work/obzrv/gallery-02.svg",
      "/assets/work/obzrv/gallery-03.svg",
    ],
    situation:
      "Gulf F&B operators — restaurants, cloud kitchens, brands, distributors — tracked market activity and competitive pricing in spreadsheets. They needed a fast MVP to test whether live ingestion and a simple dashboard would replace manual collection. Viability meant operators would use the flow, not a slide claim of “validated demand.”",
    audience:
      "F&B operators and distributors in the Gulf who need live market and pricing visibility.",
    designObjective:
      "Ship a deployable dashboard MVP in under three months: ingest, filter by business type, surface trends — prove the data model before scale.",
    decisions: [
      "Cut scope to real-time ingestion, competitive pricing tracking, and one dashboard — not a full analytics platform.",
      "Design filters by business type so the same MVP speaks to restaurants and distributors without separate products.",
      "Treat “validated demand” as: stakeholders could run the core flow on working UI within the timeline — directional proof, not a published conversion study.",
    ],
    frames: [
      {
        src: "/assets/work/obzrv/gallery-01.svg",
        caption: "MVP dashboard: live market activity instead of spreadsheet collection.",
      },
      {
        src: "/assets/work/obzrv/gallery-02.svg",
        caption: "Filters by business type: one model tested with multiple operator roles.",
      },
      {
        src: "/assets/work/obzrv/gallery-03.svg",
        caption: "Trend surfaces: highest-value features under a three-month constraint.",
      },
    ],
    outcomes: [
      {
        title: "Working MVP",
        body: "Delivered in under three months so operators could exercise the core data flow.",
        level: "operational",
        confidence: "observed",
      },
      {
        title: "Directional viability",
        body: "Proved the concept was runnable for Gulf F&B — not a claim of scaled product-market fit.",
        level: "business",
        confidence: "directional",
      },
    ],
    verification: {
      status: "needs-confirmation",
      notes: [
        "Confirm who tested the MVP and what changed after first sessions.",
      ],
    },
  },
  {
    index: "16",
    slug: "tannins",
    client: "Tannins",
    title: "Crafting quality tannin solutions",
    summary:
      "Web design for a wine business spanning B2B tannin solutions for winemakers and imported wine for consumers.",
    year: "2017",
    category: "Web Design",
    industry: "Wine · Web",
    tags: ["Web Design"],
    tone: "gold",
    tier: "lightweight",
    lane: "archive",
  },
  {
    index: "17",
    slug: "omf",
    client: "OMF",
    title: "Sleep retail, redesigned for a pitch",
    summary:
      "Site redesign for OMF Australia, a sleep and bedroom specialist with 50+ stores — prepared as a client pitch.",
    year: "2018",
    category: "Web Design",
    industry: "Retail · Sleep",
    tags: ["Web Design"],
    tone: "green",
    tier: "lightweight",
    lane: "archive",
  },
  {
    index: "18",
    slug: "udbodhan",
    client: "Udbodhan",
    title: "India’s oldest continuously published Bengali magazine",
    summary:
      "Web work for the historic spiritual publishing house tied to Ramakrishna Math and Mission, Kolkata, founded by Swami Vivekananda in 1899.",
    year: "2015",
    category: "Web Design",
    industry: "Publishing · Culture",
    tags: ["Web Design"],
    tone: "mist",
    tier: "lightweight",
    lane: "archive",
  },
  {
    index: "19",
    slug: "strike",
    client: "Strike",
    title: "Market analytics for retail investors",
    summary:
      "Freelance MVP for a subscription stock-market analytics platform — scanners, heatmaps, multi-timeframe charting.",
    year: "2020",
    category: "Freelance MVPs",
    industry: "Fintech · MVP",
    tags: ["MVP", "Freelance"],
    tone: "gold",
    tier: "lightweight",
    lane: "archive",
    href: "https://strike.money",
  },
  {
    index: "20",
    slug: "ethiqly",
    client: "Ethiqly",
    title: "AI writing support for literature classrooms",
    summary:
      "Freelance MVP — rubric-based grading and student brainstorming with Google Classroom and Schoology integration.",
    year: "2021",
    category: "Freelance MVPs",
    industry: "Education · AI",
    tags: ["MVP", "Education"],
    tone: "navy",
    tier: "lightweight",
    lane: "archive",
  },
  {
    index: "21",
    slug: "smart-currency-exchange",
    client: "Smart Currency Exchange",
    title: "Live conversion, simple selection",
    summary:
      "Freelance MVP — live currency conversion with API-based rates and a responsive selection UI.",
    year: "2019",
    category: "Freelance MVPs",
    industry: "Fintech · Utility",
    tags: ["MVP", "Freelance"],
    tone: "green",
    tier: "lightweight",
    lane: "archive",
  },
];

export const caseStudies: CaseStudy[] = caseStudyRecords.map((study) => {
  const meta = workIndexBySlug[study.slug];
  if (!meta) throw new Error(`Missing work index meta: ${study.slug}`);
  return { ...study, ...meta };
});

export const flagshipStudies = caseStudies.filter((study) => study.tier === "flagship");

export const primaryStudies = caseStudies.filter((study) => study.lane === "primary");

const featuredSlugs = ["nye", "crowley", "gwk-ghostwriter"] as const;

export const featuredWork = featuredSlugs.map((slug) => {
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) throw new Error(`Missing featured study: ${slug}`);
  return study;
});

const featuredSlugSet = new Set<string>(featuredSlugs);

export function isFeaturedStudy(slug: string) {
  return featuredSlugSet.has(slug);
}

/** Recruiter-weight order within each remaining-work group. */
const remainingOrderByGroup: Record<Exclude<ContributionGroup, "archive">, string[]> = {
  "product-direction": ["eqty", "sagacito"],
  "complex-systems": ["shuttl", "hempel", "obzrv"],
  "ai-founder": ["urban-prakriti", "growing-with-kid", "bolo-buddy"],
  "enterprise-leadership": ["verizon"],
  "brand-and-web": ["viralops", "pacific-design-house", "2886"],
};

/** Remaining work on the index — excludes featured three; archive is separate. */
export function getRemainingWorkByGroup(group: Exclude<ContributionGroup, "archive">) {
  const order = remainingOrderByGroup[group];
  const rank = new Map(order.map((slug, index) => [slug, index]));
  return caseStudies
    .filter((study) => study.contributionGroup === group && !featuredSlugSet.has(study.slug))
    .sort((a, b) => (rank.get(a.slug) ?? 99) - (rank.get(b.slug) ?? 99));
}

export function getArchiveWork() {
  return caseStudies.filter((study) => study.contributionGroup === "archive");
}

/** Published enterprise studies for homepage credibility. Porsche is not in the case-study set. */
const enterpriseLeadershipSlugs = ["verizon", "nye", "crowley"] as const;

export const enterpriseLeadership = enterpriseLeadershipSlugs.map((slug) => {
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) throw new Error(`Missing enterprise study: ${slug}`);
  return study;
});

export function getCaseStudy(slug: string) {
  return flagshipStudies.find((study) => study.slug === slug);
}

export function getNextCaseStudy(slug: string) {
  const rest = flagshipStudies.filter((study) => study.lane !== "primary");
  const sequence = [...primaryStudies, ...rest];
  const index = sequence.findIndex((study) => study.slug === slug);
  if (index < 0) return sequence[0];
  return sequence[(index + 1) % sequence.length];
}

function pickRelatedStudy(study: CaseStudy): CaseStudy | undefined {
  const sameGroup = flagshipStudies.filter(
    (item) => item.contributionGroup === study.contributionGroup && item.slug !== study.slug,
  );
  const order =
    study.contributionGroup === "archive"
      ? []
      : remainingOrderByGroup[study.contributionGroup as Exclude<ContributionGroup, "archive">];
  const rank = new Map(order.map((slug, index) => [slug, index]));
  const sorted = [...sameGroup].sort(
    (a, b) => (rank.get(a.slug) ?? 50) - (rank.get(b.slug) ?? 50),
  );
  // Prefer contribution peers outside Featured so enterprise/AI narratives stay true.
  const nonFeaturedSame = sorted.filter((item) => !featuredSlugSet.has(item.slug));
  if (nonFeaturedSame.length) return nonFeaturedSame[0];
  if (sorted.length) return sorted[0];
  if (featuredSlugSet.has(study.slug)) {
    return featuredWork.find((item) => item.slug !== study.slug);
  }
  return undefined;
}

function pickDifferentStudy(study: CaseStudy, related?: CaseStudy): CaseStudy | undefined {
  const avoid = new Set([study.slug, related?.slug].filter(Boolean) as string[]);
  const differentGroup = flagshipStudies.find(
    (item) => item.contributionGroup !== study.contributionGroup && !avoid.has(item.slug),
  );
  if (differentGroup) return differentGroup;
  return flagshipStudies.find((item) => !avoid.has(item.slug));
}

export type CaseStudyContinuation = {
  related?: CaseStudy;
  different?: CaseStudy;
};

export function getCaseStudyContinuation(slug: string): CaseStudyContinuation {
  const study = getCaseStudy(slug);
  if (!study) return {};
  const related = pickRelatedStudy(study);
  const different = pickDifferentStudy(study, related);
  return { related, different };
}
