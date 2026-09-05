export type SystemObjectSurface = "mist" | "paper" | "navy";
export type MotionMeaning = "assemble" | "connect" | "reveal" | "align" | "resolve";

export type SystemObjectMark = {
  src: string;
  surface: SystemObjectSurface;
  motion: MotionMeaning;
};

export const workGroupMarks: Record<
  | "product-direction"
  | "complex-systems"
  | "ai-founder"
  | "enterprise-leadership"
  | "brand-and-web",
  SystemObjectMark
> = {
  "product-direction": {
    src: "/assets/work/groups/product-direction.png",
    surface: "mist",
    motion: "align",
  },
  "complex-systems": {
    src: "/assets/work/groups/complex-systems.png",
    surface: "mist",
    motion: "connect",
  },
  "ai-founder": {
    src: "/assets/work/groups/ai-founder.png",
    surface: "mist",
    motion: "assemble",
  },
  "enterprise-leadership": {
    src: "/assets/work/groups/enterprise-leadership.png",
    surface: "mist",
    motion: "connect",
  },
  "brand-and-web": {
    src: "/assets/work/groups/brand-and-web.png",
    surface: "mist",
    motion: "reveal",
  },
};

export const pageMarks = {
  home: {
    src: "/assets/system-objects/home-hero.png",
    surface: "mist",
    motion: "assemble",
  },
  system: {
    src: "/assets/system-objects/page-system.png",
    surface: "mist",
    motion: "reveal",
  },
  work: {
    src: "/assets/system-objects/home-work.png",
    surface: "mist",
    motion: "align",
  },
  about: {
    src: "/assets/system-objects/page-about.png",
    surface: "mist",
    motion: "reveal",
  },
  notes: {
    src: "/assets/system-objects/page-notes.png",
    surface: "mist",
    motion: "reveal",
  },
  products: {
    src: "/assets/system-objects/page-products.png",
    surface: "mist",
    motion: "assemble",
  },
  contact: {
    src: "/assets/system-objects/page-contact.png",
    surface: "mist",
    motion: "connect",
  },
  studio: {
    src: "/assets/system-objects/studio.png",
    surface: "mist",
    motion: "assemble",
  },
} as const satisfies Record<string, SystemObjectMark>;

export const homeMarks = {
  hero: {
    src: "/assets/system-objects/home-hero.png",
    surface: "mist",
    motion: "assemble",
  },
  impact: {
    src: "/assets/system-objects/home-impact.png",
    surface: "paper",
    motion: "reveal",
  },
  work: {
    src: "/assets/system-objects/home-work.png",
    surface: "mist",
    motion: "align",
  },
  approach: {
    src: "/assets/system-objects/home-approach.png",
    surface: "navy",
    motion: "assemble",
  },
  principles: {
    src: "/assets/system-objects/home-principles.png",
    surface: "mist",
    motion: "align",
  },
  lead: {
    src: "/assets/system-objects/home-lead.png",
    surface: "paper",
    motion: "resolve",
  },
  about: {
    src: "/assets/system-objects/home-about.png",
    surface: "mist",
    motion: "reveal",
  },
  close: {
    src: "/assets/system-objects/home-close.png",
    surface: "navy",
    motion: "connect",
  },
} as const satisfies Record<string, SystemObjectMark>;

export const systemMarks = {
  dashboard: {
    src: "/assets/system-objects/system-dashboard.png",
    surface: "mist",
    motion: "reveal",
  },
  focus: {
    src: "/assets/system-objects/system-focus.png",
    surface: "mist",
    motion: "align",
  },
  practice: {
    src: "/assets/system-objects/system-practice.png",
    surface: "mist",
    motion: "connect",
  },
  products: {
    src: "/assets/system-objects/system-products.png",
    surface: "mist",
    motion: "assemble",
  },
  principles: {
    src: "/assets/system-objects/system-principles.png",
    surface: "mist",
    motion: "align",
  },
  decisions: {
    src: "/assets/system-objects/system-decisions.png",
    surface: "mist",
    motion: "resolve",
  },
  experiments: {
    src: "/assets/system-objects/system-experiments.png",
    surface: "mist",
    motion: "assemble",
  },
  knowledge: {
    src: "/assets/system-objects/system-knowledge.png",
    surface: "mist",
    motion: "reveal",
  },
  teaching: {
    src: "/assets/system-objects/system-teaching.png",
    surface: "mist",
    motion: "align",
  },
  roadmap: {
    src: "/assets/system-objects/system-roadmap.png",
    surface: "mist",
    motion: "connect",
  },
  archive: {
    src: "/assets/system-objects/system-archive.png",
    surface: "mist",
    motion: "resolve",
  },
} as const satisfies Record<string, SystemObjectMark>;

export const noteFormatMarks = {
  "field-note": {
    src: "/assets/system-objects/notes-field-note.png",
    surface: "mist",
    motion: "reveal",
  },
  framework: {
    src: "/assets/system-objects/notes-framework.png",
    surface: "mist",
    motion: "align",
  },
  essay: {
    src: "/assets/system-objects/notes-essay.png",
    surface: "mist",
    motion: "reveal",
  },
} as const satisfies Record<string, SystemObjectMark>;

export const studioMark = pageMarks.studio;
