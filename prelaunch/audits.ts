import { commerceMode } from "@/lib/commerce/config";
import { formatInr, products, type Product } from "@/products";
import { productMatrix, type ProductMatrixRow } from "@/products/matrix";
import { designIqQuestions, designIqResults } from "@/products/design-iq";
import { designPrompts } from "@/products/runtime/prompts";
import {
  critCards,
  dares,
  detectiveCases,
  entrancePaper,
  gymSets,
  juryQuestions,
  portfolioGaps,
  roastLenses,
} from "@/products/runtime/sets";
import { constraints, domains, objects, users } from "@/products/runtime/wheels";

export type BuildClass =
  | "FULLY BUILT"
  | "FUNCTIONAL MVP"
  | "PROTOTYPE"
  | "CONTENT BLOCKED"
  | "INFRASTRUCTURE ONLY";

export type EngineKind = "static" | "rule-based" | "randomised" | "algorithmic" | "AI-generated";

export type Recommendation = "SELL" | "REVIEW BEFORE SELLING" | "IMPROVE BEFORE SELLING" | "HOLD";

export type ProductAudit = {
  slug: string;
  productId: string;
  name: string;
  price: number;
  priceLabel: string;
  catalogueStatus: Product["status"];
  releaseReadiness: ProductMatrixRow["releaseReadiness"];
  deliveryType: Product["deliveryType"];
  toolRoute: string | null;
  contentStatus: string;
  commerceStatus: string;
  engine: EngineKind;
  engineDetail: string;
  ai: false;
  usesAiCopy: false;
  build: BuildClass;
  studentInput: string;
  output: string;
  repeatability: string;
  payment: string;
  entitlement: string;
  needsRaghvendra: string;
  recommendation: Recommendation;
  whatIsThis: string;
  studentProblem: string;
  interaction: string;
  typicalSession: string;
  whyPay: string;
  deadEnds: string[];
  outputsGeneric: boolean;
  outputsHardCoded: boolean;
  meaningfulVariation: boolean;
  savesAnything: string;
  needsAi: boolean;
  pretendsAi: boolean;
  needsExternalApis: boolean;
  salesPromiseMatch: string;
  intervention: string[];
  matrixBlockers: string[];
};

function wheelCombos() {
  return domains.length * users.length * constraints.length;
}

function sketchCombos() {
  return objects.length * users.length * constraints.length;
}

function commerceLabel(product: Product) {
  const mode = commerceMode();
  if (product.status !== "live") return "Coming soon · Notify me";
  if (mode === "live") return "Live checkout";
  if (mode === "test") return "Razorpay TEST";
  return "WhatsApp";
}

function paymentLabel(product: Product) {
  if (product.status !== "live") return "Not for sale yet";
  const mode = commerceMode();
  if (mode === "live" || mode === "test") return mode === "live" ? "Razorpay live" : "Razorpay TEST";
  return "WhatsApp";
}

const iqTypeCount = Object.keys(designIqResults).length;

const auditsBySlug: Record<
  string,
  Omit<
    ProductAudit,
    | "slug"
    | "productId"
    | "name"
    | "price"
    | "priceLabel"
    | "catalogueStatus"
    | "releaseReadiness"
    | "deliveryType"
    | "toolRoute"
    | "commerceStatus"
    | "payment"
    | "entitlement"
    | "matrixBlockers"
  >
> = {
  "design-roulette": {
    contentStatus: `Complete · ${wheelCombos()} combinations`,
    engine: "randomised",
    engineDetail: `Randomised wheels. Domain × user × constraint (${domains.length} × ${users.length} × ${constraints.length} = ${wheelCombos()}).`,
    ai: false,
    usesAiCopy: false,
    build: "FULLY BUILT",
    studentInput: "Spin",
    output: "One challenge: domain × user × constraint. 40-minute line in the prompt.",
    repeatability: `${wheelCombos()} combinations`,
    needsRaghvendra: "Confirm whether a spinner is worth charging for at the listed price.",
    recommendation: "REVIEW BEFORE SELLING",
    whatIsThis: "A three-wheel spinner that returns one design challenge instead of a menu.",
    studentProblem: "A blank page, or a moodboard posing as a brief.",
    interaction: "Tap Spin. One line appears. The app does not generate a solution.",
    typicalSession: "Spin, then make from the one-line prompt. The UI also says “Ten minutes. Pencil. Start.” No session history.",
    whyPay: "512 constrained challenges without inventing a problem. The product is the constraint, not a generated design.",
    deadEnds: [],
    outputsGeneric: true,
    outputsHardCoded: false,
    meaningfulVariation: true,
    savesAnything: "Nothing. Seed lives in component state.",
    needsAi: false,
    pretendsAi: false,
    needsExternalApis: false,
    salesPromiseMatch: "Sales copy promises a constraint spinner. The entitled app is that spinner.",
    intervention: ["Owner review of whether ₹199 for a randomised spinner should stay on sale."],
  },
  "design-iq": {
    contentStatus: `Complete · ${designIqQuestions.length} questions, ${iqTypeCount} result types`,
    engine: "rule-based",
    engineDetail: `Rule-based scorer. ${designIqQuestions.length} forced-choice questions tallied into ${iqTypeCount} static types (systems, craft, critique, narrative).`,
    ai: false,
    usesAiCopy: false,
    build: "FUNCTIONAL MVP",
    studentInput: "Eight multiple-choice answers",
    output: "A named type, a kicker, a body paragraph, and one practice instruction.",
    repeatability: `${iqTypeCount} result types. Same questions every time.`,
    needsRaghvendra: "Confirm the “Design IQ” name and whether four static types are enough to charge for.",
    recommendation: "REVIEW BEFORE SELLING",
    whatIsThis: "A short diagnostic that maps eight answers onto one of four written types.",
    studentProblem: "Not knowing how they tend to see, decide, and make.",
    interaction: "Answer eight questions. A majority tally picks a stored result card.",
    typicalSession: `${designIqQuestions.length} questions, then a shareable result URL on the public page. No score history.`,
    whyPay: "A named way of seeing plus one practice line. It is not an intelligence test and not a model.",
    deadEnds: ["Public page is a two-question preview; the full eight sit behind entitlement."],
    outputsGeneric: true,
    outputsHardCoded: true,
    meaningfulVariation: false,
    savesAnything: "Result can be encoded in the URL on the public preview. No account history.",
    needsAi: false,
    pretendsAi: false,
    needsExternalApis: false,
    salesPromiseMatch: "Copy promises a diagnostic that names how the student tends to see. Implementation matches. It does not measure IQ.",
    intervention: [
      "Already live — do not unpublish.",
      "HOLD SALES only if the four static types feel too thin to charge for; that is an owner call.",
    ],
  },
  "jury-me": {
    contentStatus: `Complete · ${juryQuestions.length} questions`,
    engine: "rule-based",
    engineDetail: `Rule-based question bank. ${juryQuestions.length} prompts, each with a stored stronger angle. 90-second countdown.`,
    ai: false,
    usesAiCopy: false,
    build: "FUNCTIONAL MVP",
    studentInput: "Speak an answer out loud, then reveal",
    output: "Question-specific stronger angle from the bank",
    repeatability: `${juryQuestions.length} questions, cycling`,
    needsRaghvendra: "Decide whether sessions should persist. Approve critique language as-is.",
    recommendation: "REVIEW BEFORE SELLING",
    whatIsThis: "A timed jury rehearsal: one question, ninety seconds, then a sample angle.",
    studentProblem: "Freezing when a real panel asks what the work is actually about.",
    interaction: "Read the prompt, speak, optionally reveal the stored angle, then next question.",
    typicalSession: "90 seconds per question. Bank of 12. No save.",
    whyPay: "Rehearsal pressure plus a sharper angle after the student has tried — not a generated critique of their deck.",
    deadEnds: ["Reveal is optional; skipping it still advances. Nothing stores the spoken answer."],
    outputsGeneric: false,
    outputsHardCoded: true,
    meaningfulVariation: true,
    savesAnything: "Nothing. Index is React state.",
    needsAi: false,
    pretendsAi: false,
    needsExternalApis: false,
    salesPromiseMatch: "Copy promises rehearsal for questions that show up in a jury. The bank is authored, not generated from the student’s work.",
    intervention: ["Owner review of the 12 angles.", "Decision: remember previous sessions?"],
  },
  "brief-me": {
    contentStatus: "Complete · three inputs, one template sentence",
    engine: "rule-based",
    engineDetail:
      "Template string. Output is: “Brief: {stakes} for {user} in {context}. Constraint: works without a perfect network. Success: they can complete the task without asking for help.”",
    ai: false,
    usesAiCopy: false,
    build: "FUNCTIONAL MVP",
    studentInput: "Place, user, stakes",
    output: "One interpolated sentence plus a hardcoded network constraint and success test",
    repeatability: "Unlimited input; output shape is always the same sentence",
    needsRaghvendra: "Decide if a fill-in-the-blank sentence is enough to sell as a brief builder. Optional: save / export.",
    recommendation: "IMPROVE BEFORE SELLING",
    whatIsThis: "Three fields that assemble a one-sentence brief with a fixed constraint.",
    studentProblem: "Vague passion projects with no problem, user, or success test.",
    interaction: "Type place, user, and stakes. The brief appears when all three have text.",
    typicalSession: "Fill three fields. No timer. localStorage key sp-brief-me keeps the last inputs on this browser.",
    whyPay: "Forces a problem statement. The constraint and success line do not change with the input.",
    deadEnds: ["Empty fields produce no brief.", "No download."],
    outputsGeneric: true,
    outputsHardCoded: true,
    meaningfulVariation: false,
    savesAnything: "localStorage (sp-brief-me) on this device only.",
    needsAi: false,
    pretendsAi: false,
    needsExternalApis: false,
    salesPromiseMatch: "Copy says “brief builder” and “generate a sharper project brief.” Implementation is a template, not generation.",
    intervention: ["Improve the brief depth before charging, or accept the template honestly in the sales copy."],
  },
  "portfolio-roast": {
    contentStatus: `Complete · ${roastLenses.length} lenses`,
    engine: "static",
    engineDetail: `Static critique lenses + user checkboxes. ${roastLenses.length} wound/rewrite pairs. No file upload, no page reading.`,
    ai: false,
    usesAiCopy: false,
    build: "FUNCTIONAL MVP",
    studentInput: "Tick the wounds recognised in one case study",
    output: "Punch list of selected wounds and stored rewrites",
    repeatability: `${roastLenses.length} lenses. Same language every time.`,
    needsRaghvendra: "Approve roast language. Decide whether students can export the punch list.",
    recommendation: "REVIEW BEFORE SELLING",
    whatIsThis: "A self-serve roast checklist for one case study.",
    studentProblem: "A portfolio that looks finished but hides the problem, the user, or the cut.",
    interaction: "Walk one case study, tick matching wounds, read the rewrite list.",
    typicalSession: "One project, ten checkboxes. No timer. No save.",
    whyPay: "Specific fails and rewrite lines the student can use that night. The tool does not see their portfolio.",
    deadEnds: ["Nothing happens until a box is ticked.", "No export."],
    outputsGeneric: false,
    outputsHardCoded: true,
    meaningfulVariation: false,
    savesAnything: "Nothing.",
    needsAi: false,
    pretendsAi: false,
    needsExternalApis: false,
    salesPromiseMatch: "Copy says it finds holes recruiters notice. Implementation finds holes the student ticks. It does not inspect a URL or PDF.",
    intervention: ["Owner approval of critique language.", "Decision: export punch list?"],
  },
  "idea-gym": {
    contentStatus: `Complete · ${gymSets.length} sets (12 / 20 / 40 min)`,
    engine: "static",
    engineDetail: `Static timed sets. ${gymSets.length} authored briefs. Countdown cannot be paused.`,
    ai: false,
    usesAiCopy: false,
    build: "FUNCTIONAL MVP",
    studentInput: "Pick a set length",
    output: "A titled brief and a running countdown",
    repeatability: `${gymSets.length} sets`,
    needsRaghvendra: "Decide whether idea sets should save.",
    recommendation: "REVIEW BEFORE SELLING",
    whatIsThis: "Timed creative reps. Quantity first. The clock stops the set.",
    studentProblem: "Waiting for a masterpiece instead of building range.",
    interaction: "Choose 12, 20, or 40 minutes. Read the brief. Work until the timer hits zero.",
    typicalSession: "One set at 12, 20, or 40 minutes. No pause. No capture of what the student made.",
    whyPay: "A clock and a constraint. Not an idea generator.",
    deadEnds: ["No place to store sketches or lists inside the app."],
    outputsGeneric: false,
    outputsHardCoded: true,
    meaningfulVariation: true,
    savesAnything: "Nothing.",
    needsAi: false,
    pretendsAi: false,
    needsExternalApis: false,
    salesPromiseMatch: "Copy promises short creative sets. The entitled app is those six sets plus a countdown.",
    intervention: ["Decision: save idea sets?"],
  },
  "sketch-roulette": {
    contentStatus: `Complete · ${sketchCombos()} combinations`,
    engine: "randomised",
    engineDetail: `Randomised wheels. Object × user × constraint (${objects.length} × ${users.length} × ${constraints.length} = ${sketchCombos()}).`,
    ai: false,
    usesAiCopy: false,
    build: "FULLY BUILT",
    studentInput: "Spin",
    output: "One draw line: object, user, constraint",
    repeatability: `${sketchCombos()} combinations`,
    needsRaghvendra: "Nothing required for the core loop.",
    recommendation: "REVIEW BEFORE SELLING",
    whatIsThis: "A three-wheel sketch prompt. Draw before decorating.",
    studentProblem: "Decorating instead of drawing a constrained object.",
    interaction: "Tap Spin. Draw the object for that user under that constraint.",
    typicalSession: "Spin, then draw. The UI says ten minutes. No save.",
    whyPay: "A drawable constraint instead of “sketch anything.” Same engine family as Design Roulette, different wheels.",
    deadEnds: [],
    outputsGeneric: true,
    outputsHardCoded: false,
    meaningfulVariation: true,
    savesAnything: "Nothing.",
    needsAi: false,
    pretendsAi: false,
    needsExternalApis: false,
    salesPromiseMatch: "Copy promises object × user × constraint. The app returns that line.",
    intervention: [],
  },
  "what-should-i-design": {
    contentStatus: `Complete · ${portfolioGaps.length} gap paths`,
    engine: "static",
    engineDetail: `Static gap paths. ${portfolioGaps.length} labels, each with a next project and a stop instruction.`,
    ai: false,
    usesAiCopy: false,
    build: "FUNCTIONAL MVP",
    studentInput: "Name the missing proof in the portfolio",
    output: "One next project and one thing to stop making",
    repeatability: `${portfolioGaps.length} paths`,
    needsRaghvendra: "Nothing required for the current five paths.",
    recommendation: "REVIEW BEFORE SELLING",
    whatIsThis: "A decision tool that maps a portfolio gap to a next project and a stop list.",
    studentProblem: "Another generic case study that does not prove anything new.",
    interaction: "Tap the missing proof. Read Next and Stop.",
    typicalSession: "One choice, two sentences. No timer. No save.",
    whyPay: "A next project that can carry a portfolio, plus an explicit stop. Not a generator of unique briefs.",
    deadEnds: ["Five paths only. No custom gap."],
    outputsGeneric: false,
    outputsHardCoded: true,
    meaningfulVariation: true,
    savesAnything: "Nothing.",
    needsAi: false,
    pretendsAi: false,
    needsExternalApis: false,
    salesPromiseMatch: "Copy promises a next portfolio-worthy project. Implementation is five authored gap paths.",
    intervention: [],
  },
  "crit-card": {
    contentStatus: `Complete · ${critCards.length} cards`,
    engine: "static",
    engineDetail: `Static deck. ${critCards.length} critique questions, one card at a time.`,
    ai: false,
    usesAiCopy: false,
    build: "FULLY BUILT",
    studentInput: "Draw again",
    output: "One critique question",
    repeatability: `${critCards.length} cards, cycling`,
    needsRaghvendra: "Decision: allow favourites?",
    recommendation: "REVIEW BEFORE SELLING",
    whatIsThis: "One sharp question at a time, against the work on the desk.",
    studentProblem: "A project that has gone quiet, or a critique that stays vague.",
    interaction: "Read the card. Draw again for the next question.",
    typicalSession: "Draw, apply to the work, draw again. No timer. No favourites.",
    whyPay: "A constrained critique prompt instead of a list of twenty questions on one screen.",
    deadEnds: ["Deck loops. No shuffle seed shown."],
    outputsGeneric: false,
    outputsHardCoded: true,
    meaningfulVariation: true,
    savesAnything: "Nothing.",
    needsAi: false,
    pretendsAi: false,
    needsExternalApis: false,
    salesPromiseMatch: "Copy promises one question at a time. The app shows one card from a 20-question deck.",
    intervention: ["Decision: favourites?"],
  },
  "design-dare": {
    contentStatus: `Incomplete · ${dares.length}/24 dare cards. Private PDF pack missing.`,
    engine: "static",
    engineDetail: `Static dare deck. ${dares.length} cards plus a five-line defence template. No app countdown.`,
    ai: false,
    usesAiCopy: false,
    build: "CONTENT BLOCKED",
    studentInput: "Make the artefact, fill five defence lines",
    output: "A dare, a made thing (off-screen), and a five-line defence in the app",
    repeatability: `${dares.length} cards (target 24)`,
    needsRaghvendra: `Write ${Math.max(0, 24 - dares.length)} more dare cards. Upload private PDF pack.`,
    recommendation: "HOLD",
    whatIsThis: "A dare that asks for a point of view, a made artefact, and a defence.",
    studentProblem: "Thinking without making, or making without an argument.",
    interaction: "Read the dare, make off-screen, type problem / choice / trade-off / evidence / ask, next dare.",
    typicalSession: "Some cards mention minutes in the copy. The app has no countdown. Inputs save to localStorage (sp-design-dare).",
    whyPay: "Not ready to charge. Deck is short of the 24-card gate and the hybrid PDF is missing.",
    deadEnds: ["PDF download will fail until the pack is uploaded.", `${Math.max(0, 24 - dares.length)} cards still missing.`],
    outputsGeneric: false,
    outputsHardCoded: true,
    meaningfulVariation: true,
    savesAnything: "localStorage (sp-design-dare).",
    needsAi: false,
    pretendsAi: false,
    needsExternalApis: false,
    salesPromiseMatch: "Copy promises think / make / defend. The app supports that loop, but the promised deck size and PDF are not there.",
    intervention: [
      `Complete ${Math.max(0, 24 - dares.length)} Design Dare cards.`,
      "Upload private PDF at product-deliverables/design-dare/v1/pack.pdf.",
    ],
  },
  "design-detective": {
    contentStatus: `Incomplete · ${detectiveCases.length}/6 field cases`,
    engine: "static",
    engineDetail: `Static case files. ${detectiveCases.length} of 6 required. Place, artefact, friction, crime.`,
    ai: false,
    usesAiCopy: false,
    build: "CONTENT BLOCKED",
    studentInput: "Read the file, write the mismatch in their own words (off-screen)",
    output: "The stored “crime” line for that case",
    repeatability: `${detectiveCases.length} cases (target 6)`,
    needsRaghvendra: `Write ${Math.max(0, 6 - detectiveCases.length)} more field cases.`,
    recommendation: "HOLD",
    whatIsThis: "Observation drills: a place, an artefact, the friction, then the mismatch.",
    studentProblem: "Looking without collecting evidence.",
    interaction: "Read the case file, then the crime. Next case. The student writes elsewhere.",
    typicalSession: "One case at a time. No timer. No in-app notepad beyond the instruction to write.",
    whyPay: "Not ready. Two field cases are still missing.",
    deadEnds: [`${Math.max(0, 6 - detectiveCases.length)} cases missing.`, "No in-app capture of the student’s write-up."],
    outputsGeneric: false,
    outputsHardCoded: true,
    meaningfulVariation: true,
    savesAnything: "Nothing.",
    needsAi: false,
    pretendsAi: false,
    needsExternalApis: false,
    salesPromiseMatch: "Copy promises observation drills. Four authored cases exist; the release gate needs six.",
    intervention: [`Write ${Math.max(0, 6 - detectiveCases.length)} Design Detective field cases.`],
  },
  "design-entrance-simulator": {
    contentStatus: `Incomplete · ${entrancePaper.parts.length} paper parts. Real countdown missing. Private paper PDF missing.`,
    engine: "static",
    engineDetail:
      "Static three-part paper (observation, making, defence) plus a mark scheme. Start / Submit only — no running countdown in ProductRuntime.",
    ai: false,
    usesAiCopy: false,
    build: "CONTENT BLOCKED",
    studentInput: "Sit the paper off-screen, then submit",
    output: "A debrief mark scheme, not a rank",
    repeatability: "One paper. The copy says sit once; the app does not enforce once.",
    needsRaghvendra: "A working unpausable countdown. Upload the private paper PDF.",
    recommendation: "HOLD",
    whatIsThis: "An entrance-style sitting: observation, making, defence, then a debrief.",
    studentProblem: "Walking into a design test without having sat one under time.",
    interaction: "Start the sitting, read three parts, submit, read the mark scheme. There is no clock in the current implementation.",
    typicalSession: "The copy claims 90 minutes. Implementation has no countdown. Do not invent a timed session.",
    whyPay: "Not ready. A timed paper without a clock is not the product on the sales page.",
    deadEnds: ["No countdown.", "PDF missing.", "Submit does not store answers."],
    outputsGeneric: false,
    outputsHardCoded: true,
    meaningfulVariation: false,
    savesAnything: "Nothing.",
    needsAi: false,
    pretendsAi: false,
    needsExternalApis: false,
    salesPromiseMatch: "Copy promises a timed entrance-style paper. Parts and debrief exist. The timer and PDF do not.",
    intervention: [
      "Implement a real unpausable countdown.",
      "Upload private paper PDF at product-deliverables/design-entrance-simulator/v1/.",
    ],
  },
  "100-design-prompts": {
    contentStatus: `App list complete · ${designPrompts.length}/100 prompts. Private PDF pack missing.`,
    engine: "static",
    engineDetail: `Static list. ${designPrompts.length} prompts with search. Hybrid delivery requires a PDF pack that is not uploaded.`,
    ai: false,
    usesAiCopy: false,
    build: "CONTENT BLOCKED",
    studentInput: "Search by number, mood, or constraint",
    output: "The matching prompt text",
    repeatability: "100 prompts, reusable, no sequence",
    needsRaghvendra: "Upload private PDF pack.",
    recommendation: "HOLD",
    whatIsThis: "One hundred prompts. No curriculum. Use the one you need.",
    studentProblem: "Staring at a blank page.",
    interaction: "Filter the list. Read a prompt. Make elsewhere.",
    typicalSession: "Browse or search. No timer. No save of which prompt was used.",
    whyPay: "The in-app hundred exists. Hybrid delivery is blocked until the PDF pack is uploaded. Do not sell a download that 404s.",
    deadEnds: ["Download route will fail without product-deliverables/100-design-prompts/v1/pack.pdf."],
    outputsGeneric: false,
    outputsHardCoded: true,
    meaningfulVariation: true,
    savesAnything: "Nothing.",
    needsAi: false,
    pretendsAi: false,
    needsExternalApis: false,
    salesPromiseMatch: "Copy promises 100 prompts. The entitled app has 100. The promised downloadable pack does not.",
    intervention: ["Upload private PDF at product-deliverables/100-design-prompts/v1/pack.pdf."],
  },
};

export function productAudits(): ProductAudit[] {
  const matrix = Object.fromEntries(productMatrix().map((row) => [row.slug, row]));
  return products.map((product) => {
    const row = matrix[product.slug];
    const audit = auditsBySlug[product.slug];
    if (!audit) {
      throw new Error(`Missing prelaunch audit for ${product.slug}`);
    }
    return {
      ...audit,
      slug: product.slug,
      productId: product.id,
      name: product.name,
      price: product.price,
      priceLabel: formatInr(product.price),
      catalogueStatus: product.status,
      releaseReadiness: row?.releaseReadiness ?? "content-blocked",
      deliveryType: product.deliveryType,
      toolRoute: product.appPath ?? null,
      commerceStatus: commerceLabel(product),
      payment: paymentLabel(product),
      entitlement: product.deliveryType === "download" ? "Library download" : "Protected tool route",
      matrixBlockers: row?.blockers ?? [],
    };
  });
}

export function getProductAudit(slug: string) {
  return productAudits().find((item) => item.slug === slug);
}
