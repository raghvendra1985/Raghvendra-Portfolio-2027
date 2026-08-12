export type Service = {
  index: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  stack: string[];
};

export const services: Service[] = [
  {
    index: "01",
    slug: "designops-360",
    title: "DesignOps 360",
    summary: "Governance and scale for design organisations past ad-hoc craft.",
    description:
      "Token architecture, component systems, and cross-team rituals for teams past the point where ad-hoc design can scale.",
    stack: ["Token architecture", "Governance rituals", "Component systems", "Role clarity"],
  },
  {
    index: "02",
    slug: "ai-blueprint",
    title: "AI Blueprint",
    summary: "Trust-critical UX for AI products in regulated contexts.",
    description:
      "UX frameworks for AI-powered experiences — trust boundaries, inclusion, and responsible deployment.",
    stack: ["Explainable AI patterns", "Trust-boundary mapping", "Inclusive research", "Human/AI judgment"],
  },
  {
    index: "03",
    slug: "strategy-sprint",
    title: "Strategy Sprint",
    summary: "From operational audit to architecture and roadmap.",
    description:
      "For products where the idea is right but execution needs structural clarity.",
    stack: ["Operational audit", "Constraint mapping", "Architecture", "8-week format"],
  },
  {
    index: "04",
    slug: "design-practice",
    title: "Design Practice",
    summary: "Hiring, craft, and multi-brand systems that outlast the engagement.",
    description:
      "Token systems, component libraries, and practice methodology for consultancies and global delivery teams.",
    stack: ["Hiring model", "Craft standards", "Multi-brand tokens", "Delivery rituals"],
  },
];
