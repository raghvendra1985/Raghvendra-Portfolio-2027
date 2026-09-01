export type SystemObjectSurface = "mist" | "paper";
export type MotionMeaning = "assemble" | "connect" | "reveal" | "align" | "resolve";

export type SystemObjectMark = {
  src: string;
  surface: SystemObjectSurface;
  motion: MotionMeaning;
};

export const workGroupMarks: Record<
  "product-direction" | "complex-systems" | "ai-founder" | "enterprise-leadership",
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
};

export const homeMarks = {
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
} as const satisfies Record<string, SystemObjectMark>;

export const systemMarks = {
  dashboard: {
    src: "/assets/system-objects/system-dashboard.png",
    surface: "mist",
    motion: "reveal",
  },
  practice: {
    src: "/assets/system-objects/system-practice.png",
    surface: "mist",
    motion: "connect",
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

export const studioMark: SystemObjectMark = {
  src: "/assets/system-objects/studio.png",
  surface: "mist",
  motion: "assemble",
};
