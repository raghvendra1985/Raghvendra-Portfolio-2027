"use client";

import TeamLanyardRail from "@/components/ui/team-lanyard-rail";
import type { LanyardMember } from "@/components/ui/team-lanyard-rail";

/**
 * Customized Lanyard Showcase for Raghvendra's Paid Masterclasses & Workshops on the Knowledge Hub
 */
export const KNOWLEDGE_PAID_PRODUCTS: LanyardMember[] = [
  {
    id: "ai-workflow",
    name: "AI Workflow Kit",
    role: "Production Prompt Engineering & Autonomous Workflows",
    team: "Masterclass · ₹2,499 / $49",
    tone: 1,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80",
    bio: "End-to-end framework to integrate LLMs, autonomous agents, and deterministic code without creating brittle AI slop.",
    tags: ["Autonomous Workflows", "AI Strategy", "Templates"],
    links: [
      { label: "Checkout", href: "/resources/ai-workflow-starter-kit/" },
      { label: "Syllabus", href: "/resources/ai-workflow-starter-kit/#curriculum" }
    ],
  },
  {
    id: "design-thinking",
    name: "Design Thinking Studio",
    role: "Problem Framing & Decision Architecture",
    team: "Live Cohort · ₹1,999 / $39",
    tone: 2,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&auto=format&fit=crop&q=80",
    bio: "Learn how to structure complex cross-functional discovery, identify genuine problems, and align multi-stakeholder roadmaps.",
    tags: ["Discovery", "Systems Framing", "Executive Alignment"],
    links: [
      { label: "Join Cohort", href: "/resources/design-thinking-workshop/" },
      { label: "Preview", href: "/resources/design-thinking-workshop/#overview" }
    ],
  },
  {
    id: "concept-design",
    name: "Concept Design Lab",
    role: "Rapid Prototyping & High-Fidelity Validation",
    team: "Masterclass · ₹2,199 / $45",
    tone: 3,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&auto=format&fit=crop&q=80",
    bio: "Move from abstract problem statements to validated, testable product interfaces in days instead of months.",
    tags: ["0-to-1 Product", "Figma", "Interactive Prototyping"],
    links: [
      { label: "Get Access", href: "/resources/concept-design-workshop/" },
      { label: "Case Studies", href: "/work/" }
    ],
  },
  {
    id: "ux-ui-portfolio",
    name: "Staff Portfolio Kit",
    role: "High-Converting Case Studies & Leadership Storytelling",
    team: "Masterclass · ₹2,999 / $59",
    tone: 4,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    bio: "Proven storytelling templates that showcase accountable trade-offs, measurable business ROI, and systems leadership to hiring executives.",
    tags: ["Staff / Principal IC", "Recruiter Signal", "CV Templates"],
    links: [
      { label: "Unlock Kit", href: "/resources/portfolio-development-workshop/" },
      { label: "Reviews", href: "/resources/portfolio-development-workshop/#reviews" }
    ],
  },
  {
    id: "game-design",
    name: "Advanced Game Design",
    role: "Engagement Loops, Economy Balancing & Agency",
    team: "Elective · ₹2,499 / $49",
    tone: 5,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&auto=format&fit=crop&q=80",
    bio: "Advanced game loops, behavioral psychology, reward schedules, and player agency techniques adapted from DTU Master's curriculum.",
    tags: ["Behavioral Design", "Economy Systems", "Gamification"],
    links: [
      { label: "Enroll Now", href: "/resources/game-design-workshop/" },
      { label: "Curriculum", href: "/resources/game-design-workshop/#syllabus" }
    ],
  },
  {
    id: "data-viz",
    name: "Data Visualisation",
    role: "Quantitative Reasoning & Information Architecture",
    team: "Workshop · ₹1,899 / $39",
    tone: 1,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80",
    bio: "Transform dense financial, telemetry, and tabular datasets into actionable, beautiful interfaces that executives comprehend at a glance.",
    tags: ["Fintech UX", "Telemetry UI", "Dashboards"],
    links: [
      { label: "Access Course", href: "/resources/data-visualisation-workshop/" },
      { label: "Overview", href: "/resources/data-visualisation-workshop/#details" }
    ],
  }
];

export default function PaidProductsLanyardShowcase({ autoplay = true }: { autoplay?: boolean }) {
  return (
    <div data-lanyard-showcase className="flex w-full items-center justify-center bg-background text-foreground py-12">
      <TeamLanyardRail
        items={KNOWLEDGE_PAID_PRODUCTS}
        eyebrow="Premium Masterclasses · Interactive Rail"
        heading="Tactical Design Knowledge You Can Inspect & Unlock."
        caption="Brush along the rail to inspect each masterclass. Click to flip and review the syllabus, deliverables, and enroll."
        autoplay={autoplay}
        labels={{
          flip: "Click or press Enter to flip for syllabus & enrollment",
          back: "Click again or press Esc to return",
          show: "Product"
        }}
        action={
          <div className="flex items-center gap-3 mt-2">
            <a
              href="#catalogue"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background shadow-sm transition hover:opacity-90"
            >
              Browse Full Catalogue ↓
            </a>
            <a
              href="mailto:hello@raghvendrasingh.com?subject=Team%20Licenses%20for%20Workshops"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted"
            >
              Team & Institutional Inquiries ↗
            </a>
          </div>
        }
      />
    </div>
  );
}
