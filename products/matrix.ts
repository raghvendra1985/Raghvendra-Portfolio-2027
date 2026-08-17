import { products, type DeliveryType, type Product } from "./index";
import { designPrompts } from "./runtime/prompts";
import {
  critCards,
  dares,
  detectiveCases,
  entrancePaper,
  gymSets,
  juryQuestions,
  portfolioGaps,
  roastLenses,
} from "./runtime/sets";
import { constraints, domains, objects, users } from "./runtime/wheels";

export type LiveRequirement = {
  id: string;
  label: string;
  met: boolean;
};

export type ProductMatrixRow = {
  slug: string;
  name: string;
  status: Product["status"];
  deliveryType: DeliveryType;
  studentReceives: string;
  mustContain: string[];
  requirements: LiveRequirement[];
  /** Content + pack gates only. Commerce keys are platform-wide, not per product. */
  canSwitchToLive: boolean;
};

function req(id: string, label: string, met: boolean): LiveRequirement {
  return { id, label, met };
}

function wheelCombos() {
  return domains.length * users.length * constraints.length;
}

function sketchCombos() {
  return objects.length * users.length * constraints.length;
}

export function productMatrix(): ProductMatrixRow[] {
  const bySlug = Object.fromEntries(products.map((product) => [product.slug, product]));

  const rows: Array<Omit<ProductMatrixRow, "status" | "deliveryType" | "name" | "canSwitchToLive">> = [
    {
      slug: "design-dare",
      studentReceives: "A timed dare, a made artefact, and a five-line defence. Hybrid: app + downloadable deck/template.",
      mustContain: [
        "Full dare deck in the entitled app (not the public preview card)",
        "Defence template: problem, choice, trade-off, evidence, ask",
        "Private pack at product-deliverables/design-dare/v1/pack.pdf",
      ],
      requirements: [
        req("deck", `Dare deck ≥ 24 (now ${dares.length})`, dares.length >= 24),
        req("defence", "Five-line defence template in the app", true),
        req("pack", "Private PDF pack uploaded", false),
      ],
    },
    {
      slug: "design-roulette",
      studentReceives: "One spun challenge: domain × user × constraint. App only.",
      mustContain: [
        "Spinner that returns one challenge, not a menu",
        "Combinations built for same-day making",
        "Entitled /tools/design-roulette",
      ],
      requirements: [
        req("wheels", `Challenge combinations ≥ 200 (now ${wheelCombos()})`, wheelCombos() >= 200),
        req("one", "One challenge per spin", true),
        req("route", "Entitled app route", true),
      ],
    },
    {
      slug: "jury-me",
      studentReceives: "Timed jury rehearsal. Answer first, then a stronger angle.",
      mustContain: [
        "Question bank from actual review shape",
        "Timed rehearsal without an audience",
        "Sample angle only after the student has tried",
      ],
      requirements: [
        req("bank", `Question bank ≥ 12 (now ${juryQuestions.length})`, juryQuestions.length >= 12),
        req("reveal", "Reveal waits until after an attempt", true),
        req("route", "Entitled app route", true),
      ],
    },
    {
      slug: "brief-me",
      studentReceives: "A one-page brief: job-to-be-done, constraint, success test.",
      mustContain: [
        "Inputs for context, user, and stakes",
        "A written brief the student can paste into a case study",
        "Entitled /tools/brief-me",
      ],
      requirements: [
        req("builder", "Brief builder with three inputs", true),
        req("output", "One-page problem statement output", true),
        req("route", "Entitled app route", true),
      ],
    },
    {
      slug: "design-iq",
      studentReceives: "Eight choices, a named way of seeing, one practice instruction.",
      mustContain: [
        "Full eight-question diagnostic behind entitlement",
        "Named result + practice line",
        "Public product page stays a short preview",
      ],
      requirements: [
        req("eight", "Eight-question diagnostic", true),
        req("result", "Named result and practice instruction", true),
        req("preview", "Public page limited to a preview", true),
      ],
    },
    {
      slug: "portfolio-roast",
      studentReceives: "A punch list against one case study — wounds, not vibes.",
      mustContain: [
        "Roast checklist for one project",
        "Specific fails: no decision, no constraint, no user, no ending",
        "Rewrite language the student can use that night",
      ],
      requirements: [
        req("lenses", `Roast lenses ≥ 8 (now ${roastLenses.length})`, roastLenses.length >= 8),
        req("list", "Punch list output", true),
        req("route", "Entitled app route", true),
      ],
    },
    {
      slug: "idea-gym",
      studentReceives: "Timed creative sets. Quantity first. Stop when the timer stops.",
      mustContain: [
        "Sessions at 12, 20, and 40 minutes",
        "Reps that build range, not a masterpiece",
        "Entitled /tools/idea-gym",
      ],
      requirements: [
        req("durations", "12 / 20 / 40 minute sets present", gymSets.some((set) => set.minutes === 12) && gymSets.some((set) => set.minutes === 20) && gymSets.some((set) => set.minutes === 40)),
        req("sets", `Sets ≥ 6 (now ${gymSets.length})`, gymSets.length >= 6),
        req("route", "Entitled app route", true),
      ],
    },
    {
      slug: "design-detective",
      studentReceives: "A case file: place, artefact, friction, then the crime.",
      mustContain: [
        "Field cases with a notepad structure",
        "Evidence before a proposal",
        "Entitled /tools/design-detective",
      ],
      requirements: [
        req("cases", `Field cases ≥ 6 (now ${detectiveCases.length})`, detectiveCases.length >= 6),
        req("crime", "Crime / mismatch write-up per case", true),
        req("route", "Entitled app route", true),
      ],
    },
    {
      slug: "sketch-roulette",
      studentReceives: "Object × user × constraint. One line. Draw.",
      mustContain: [
        "Three wheels that stay drawable",
        "A single prompt per spin",
        "Entitled /tools/sketch-roulette",
      ],
      requirements: [
        req("wheels", `Drawable combinations ≥ 200 (now ${sketchCombos()})`, sketchCombos() >= 200),
        req("line", "One-line draw prompt", true),
        req("route", "Entitled app route", true),
      ],
    },
    {
      slug: "design-entrance-simulator",
      studentReceives: "One timed sitting: observation, making, defence, then a debrief. Hybrid.",
      mustContain: [
        "Working countdown that cannot be paused",
        "Paper with observation, drawing, reasoning",
        "Mark scheme / debrief after submit",
        "Private paper PDF in product-deliverables/design-entrance-simulator/v1/",
      ],
      requirements: [
        req("parts", `Paper has 3 parts (now ${entrancePaper.parts.length})`, entrancePaper.parts.length >= 3),
        req("clock", "Real countdown (not start/submit only)", false),
        req("debrief", "Debrief / mark scheme after submit", entrancePaper.markScheme.length >= 3),
        req("pack", "Private paper PDF uploaded", false),
      ],
    },
    {
      slug: "what-should-i-design",
      studentReceives: "A gap read: what to make next, and what to stop.",
      mustContain: [
        "Portfolio audit that names missing proof",
        "One next project and one to stop",
        "Entitled /tools/what-should-i-design",
      ],
      requirements: [
        req("gaps", `Gap paths ≥ 5 (now ${portfolioGaps.length})`, portfolioGaps.length >= 5),
        req("next-stop", "Next project + stop instruction", true),
        req("route", "Entitled app route", true),
      ],
    },
    {
      slug: "crit-card",
      studentReceives: "One critique question at a time, against the work on the desk.",
      mustContain: [
        "A deck of critique questions",
        "One card at a time — no hiding in a list",
        "Entitled /tools/crit-card",
      ],
      requirements: [
        req("deck", `Cards ≥ 20 (now ${critCards.length})`, critCards.length >= 20),
        req("one", "One card at a time", true),
        req("route", "Entitled app route", true),
      ],
    },
    {
      slug: "100-design-prompts",
      studentReceives: "One hundred prompts, usable out of order. Hybrid: browse + download.",
      mustContain: [
        "Exactly 100 prompts in the entitled app",
        "Search / pick by number",
        "Private pack at product-deliverables/100-design-prompts/v1/pack.pdf",
      ],
      requirements: [
        req("hundred", `100 prompts (now ${designPrompts.length})`, designPrompts.length === 100),
        req("browse", "In-app list the student can return to", true),
        req("pack", "Private PDF pack uploaded", false),
      ],
    },
  ];

  return rows.map((row) => {
    const product = bySlug[row.slug];
    if (!product) throw new Error(`Matrix slug missing from catalog: ${row.slug}`);
    return {
      ...row,
      name: product.name,
      status: product.status,
      deliveryType: product.deliveryType,
      canSwitchToLive: row.requirements.every((item) => item.met),
    };
  });
}

export function liveSwitchBlockers(slug: string) {
  const row = productMatrix().find((item) => item.slug === slug);
  if (!row) return [`Unknown product ${slug}`];
  return row.requirements.filter((item) => !item.met).map((item) => item.label);
}
