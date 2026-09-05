/**
 * Case-study narrative types.
 * `verification` is internal only — never render or feed concierge retrieval.
 */

export type WorkCategory =
  | "Enterprise Systems"
  | "SaaS Products"
  | "Founder & Ventures"
  | "Web Design"
  | "Freelance MVPs";

export type WorkTier = "flagship" | "lightweight";

export type WorkLane = "primary" | "enterprise" | "founder" | "archive";

export type ContributionGroup =
  | "product-direction"
  | "complex-systems"
  | "ai-founder"
  | "enterprise-leadership"
  | "brand-and-web"
  | "archive";

export type WorkEvidence = "CASE STUDY" | "LIVE PRODUCT" | "SELECTED WORK" | "ARCHIVE";

export type NarrativeDepth = "deep" | "supporting" | "compact";

export type OutcomeLevel = "business" | "operational" | "organisational";

export type OutcomeConfidence = "company-metric" | "directional" | "estimate" | "observed";

export type CaseStudyOutcome = {
  title: string;
  body: string;
  level?: OutcomeLevel;
  confidence?: OutcomeConfidence;
};

/** Deep and supporting outcomes must declare evidence level. */
export type EvidencedOutcome = CaseStudyOutcome & {
  level: OutcomeLevel;
  confidence: OutcomeConfidence;
};

export type CaseStudyMandate = {
  owned: string;
  others: string;
  decisionMaker: string;
  team: string;
  authority: string;
  deliveryConstraints: string;
};

export type CaseStudyDecision = {
  situation: string;
  options: { name: string; rejectedBecause?: string }[];
  evidence: string;
  tradeoff: string;
  choice: string;
  result: string;
};

export type CaseStudyMediaKind = "image" | "gif" | "video";

export type CaseStudyFrame = {
  src: string;
  caption: string;
  /** Defaults to image. GIFs use unoptimized Next/Image; videos belong in showreel. */
  kind?: CaseStudyMediaKind;
  /**
   * Tall full-page captures (e.g. marketing landing) scroll inside the frame
   * container instead of shrinking with object-contain.
   */
  scrollable?: boolean;
};

export type CaseStudyShowreel = {
  src: string;
  caption: string;
  poster?: string;
};

export type CaseStudyAtAGlance = {
  user: string;
  problem: string;
  mandate: string;
  decision: string;
  result: string;
};

/** Internal fact-check notes. Never render publicly or index in concierge. */
export type CaseStudyVerification = {
  status: "verified" | "needs-confirmation";
  notes: string[];
};

export type CaseStudyDesignSystemSlide = {
  src: string;
  caption: string;
  width: number;
  height: number;
};

type CaseStudyShared = {
  index: string;
  slug: string;
  client: string;
  title: string;
  summary: string;
  year: string;
  category: WorkCategory;
  industry: string;
  tags: string[];
  tone: "navy" | "green" | "gold" | "mist";
  lane: WorkLane;
  contributionGroup: ContributionGroup;
  contribution: string;
  evidence: WorkEvidence;
  featuredDesignation?: string;
  indexCompact?: boolean;
  featured?: boolean;
  role?: string;
  timeline?: string;
  engagement?: string;
  /** @deprecated Prefer situation */
  challenge?: string;
  href?: string;
  links?: { label: string; href: string }[];
  cover?: string;
  /** @deprecated Prefer frames */
  gallery?: string[];
  designSystem?: CaseStudyDesignSystemSlide[];
  /** Curated product/motion videos — rendered as a muted showreel strip. */
  showreel?: CaseStudyShowreel[];
  /**
   * When set, the first N frames are treated as product (vs process).
   * Used by sticky stack OR narrative-interludes layouts.
   */
  productStackCount?: number;
  /**
   * How product/process media is placed relative to narrative.
   * - default: Frames block (or sticky stack when productStackCount is set)
   * - narrative-interludes: product pairs after Decision / System change
   * - editorial-alternate: story first, then L/R product pairs + motion strip + process grid
   */
  mediaLayout?: "default" | "narrative-interludes" | "editorial-alternate";
  /** Cap showreel videos shown (e.g. 3 featured). */
  showreelFeaturedCount?: number;
  verification?: CaseStudyVerification;
};

export type DeepCaseStudy = CaseStudyShared & {
  tier: "flagship";
  narrativeDepth: "deep";
  situation: string;
  people: string;
  apparentProblem: string;
  underlyingProblem: string;
  mandate: CaseStudyMandate;
  constraints: string[];
  decision: CaseStudyDecision;
  systemChangeSteps: string[];
  iteration: { title: string; body: string }[];
  outcomes: EvidencedOutcome[];
  frames: CaseStudyFrame[];
  wouldChangeNow: string;
  atAGlance: CaseStudyAtAGlance;
};

export type SupportingCaseStudy = CaseStudyShared & {
  tier: "flagship";
  narrativeDepth: "supporting";
  situation: string;
  mandate: CaseStudyMandate;
  decision: CaseStudyDecision;
  systemChangeSteps: string[];
  outcomes: EvidencedOutcome[];
  frames: CaseStudyFrame[];
  wouldChangeNow: string;
};

export type CompactCaseStudy = CaseStudyShared & {
  tier: "flagship";
  narrativeDepth: "compact";
  situation: string;
  audience: string;
  designObjective: string;
  decisions: string[];
  frames: CaseStudyFrame[];
  outcomes: CaseStudyOutcome[];
};

export type LightweightCaseStudy = CaseStudyShared & {
  tier: "lightweight";
  narrativeDepth?: never;
};

export type CaseStudy =
  | DeepCaseStudy
  | SupportingCaseStudy
  | CompactCaseStudy
  | LightweightCaseStudy;

export type FlagshipCaseStudy = DeepCaseStudy | SupportingCaseStudy | CompactCaseStudy;

export function isDeepCaseStudy(study: CaseStudy): study is DeepCaseStudy {
  return study.tier === "flagship" && study.narrativeDepth === "deep";
}

export function isSupportingCaseStudy(study: CaseStudy): study is SupportingCaseStudy {
  return study.tier === "flagship" && study.narrativeDepth === "supporting";
}

export function isCompactCaseStudy(study: CaseStudy): study is CompactCaseStudy {
  return study.tier === "flagship" && study.narrativeDepth === "compact";
}

export function isFlagshipCaseStudy(study: CaseStudy): study is FlagshipCaseStudy {
  return study.tier === "flagship";
}
