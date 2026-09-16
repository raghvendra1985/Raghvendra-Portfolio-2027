import { site } from "@/lib/site";

export const approachPage = {
  title: "Approach",
  description:
    "How I operate as a senior product designer: Frame → Design → Build → Validate. Decision-making, systems thinking, collaboration, and execution.",
  heroEyebrow: "Approach",
  heroTitle: "How I work as a senior product designer.",
  heroDescription:
    "I move across problem, strategy, UX, prototype, working product, and validation. Builder capability means turning product decisions into working software — not collecting AI tools.",
  workflow: ["Frame", "Design", "Build", "Validate"] as const,
  howIWork: {
    eyebrow: "How I work",
    title: "Frame → Design → Build → Validate",
    intro:
      "An operating model for consequential product problems — not a generic design-process diagram.",
    stages: [
      {
        title: "Frame",
        tagline: "Clarify the problem",
        body: "Make the problem, constraints, and decision space visible so teams can move through ambiguity without waiting for a brief that never arrives.",
      },
      {
        title: "Design",
        tagline: "Shape the system",
        body: "Architecture, interaction, and experience language that product, engineering, and operations can share — before pixels become politics.",
      },
      {
        title: "Build",
        tagline: "Make it real",
        body: "Functional prototypes, MVPs, and production interfaces. AI-assisted development raises fidelity so decisions get tested as software, not slide decks.",
      },
      {
        title: "Validate",
        tagline: "Learn under constraint",
        body: "Evidence from users, operations, and shipping. Adjust the bet. Protect quality. Stay accountable to what actually works.",
      },
    ],
  },
  aiPractice: {
    eyebrow: "AI-native product practice",
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
  },
  principles: {
    eyebrow: "Product principles",
    title: "Principles for intelligent products",
    items: [
      "Design for intent, not only navigation.",
      "Use AI where it creates meaningful value.",
      "Design expected, uncertain, and failed states.",
      "Match system autonomy to consequence.",
      "Build calibrated trust.",
      "Evaluate behaviour continuously after launch.",
    ],
  },
  leadership: {
    eyebrow: "Leadership",
    title: "Direction without distance.",
    intro:
      "My role changes with the organisation’s needs. I can set direction, create alignment, and remain close enough to the work to protect the quality of execution.",
    behaviors: [
      {
        title: "Make decisions legible",
        body: "Situation, options, evidence, trade-off, and choice — so teams can critique the thinking, not only the UI.",
      },
      {
        title: "Build critique into the system",
        body: "Quality should not depend on one leader reviewing every screen.",
      },
      {
        title: "Stay close to the work",
        body: "Leadership is not distance from execution. It is responsibility for the conditions in which execution succeeds.",
      },
    ],
  },
  close: {
    title: "See the evidence.",
    primary: { label: "View selected work", href: "/work" },
    secondary: { label: "Work with me", href: "/contact" },
  },
  positioning: site.positioning,
} as const;
