export type FrameworkId =
  | "decision-stack"
  | "critique-system"
  | "ai-trust-stack"
  | "product-operating-model"
  | "visible-learning-loop"
  | "product-filter";

export type FrameworkStep = {
  index: string;
  title: string;
  body: string;
};

export type KnowledgeFramework = {
  id: FrameworkId;
  title: string;
  deck: string;
  steps: FrameworkStep[];
};

export const knowledgeFrameworks: KnowledgeFramework[] = [
  {
    id: "decision-stack",
    title: "Decision Stack",
    deck: "Work the decision, not the layout. The screen usually becomes simpler.",
    steps: [
      { index: "01", title: "Decision", body: "What must the user decide here?" },
      { index: "02", title: "Information", body: "What do they need to know to decide well?" },
      { index: "03", title: "Confidence", body: "What doubt could block the call?" },
      { index: "04", title: "Action", body: "What is the next honest move?" },
      { index: "05", title: "Outcome", body: "How will they know it worked — or failed?" },
    ],
  },
  {
    id: "critique-system",
    title: "Critique System",
    deck: "Quality visible before the review starts. Opinion with a meeting link is not a craft system.",
    steps: [
      { index: "01", title: "Quality bar", body: "A written standard juniors can apply without a principal in the room." },
      { index: "02", title: "Decision log", body: "What was chosen, what was cut, and why." },
      { index: "03", title: "Named owner", body: "Someone accountable for the call, not the calendar." },
      { index: "04", title: "Taste vs risk", body: "A format that separates preference from harm." },
    ],
  },
  {
    id: "ai-trust-stack",
    title: "AI Trust Stack",
    deck: "Fluency is not competence. Trust is a product surface.",
    steps: [
      { index: "01", title: "Useful", body: "Does the output help the job, or only sound intelligent?" },
      { index: "02", title: "Understandable", body: "Can the user tell what the system did?" },
      { index: "03", title: "Correct enough", body: "Show uncertainty. Do not hide the miss." },
      { index: "04", title: "Controllable", body: "Source, undo, and a human sign-off where judgment must stay human." },
    ],
  },
  {
    id: "product-operating-model",
    title: "Product Operating Model",
    deck: "Products fail when nobody can see who decides, when, and with what evidence.",
    steps: [
      { index: "01", title: "Decision rights", body: "Who decides, and who is consulted." },
      { index: "02", title: "Intake", body: "How work enters the system." },
      { index: "03", title: "Queue", body: "What is in motion, and what is waiting." },
      { index: "04", title: "Evidence", body: "What moved the call." },
      { index: "05", title: "After", body: "What happens when the decision is wrong." },
    ],
  },
  {
    id: "visible-learning-loop",
    title: "Visible Learning Loop",
    deck: "Students improve faster when they can explain why they made a choice.",
    steps: [
      { index: "01", title: "Sprint", body: "A module with a production bar, not a tool tutorial." },
      { index: "02", title: "Make", body: "Deliver the work under constraint." },
      { index: "03", title: "Narrate", body: "What they cut, what they kept, what evidence moved the call." },
      { index: "04", title: "Critique", body: "The critique is the curriculum." },
    ],
  },
  {
    id: "product-filter",
    title: "Product Filter",
    deck: "Ship the smallest thing that answers three questions. Constraint is the editor.",
    steps: [
      { index: "01", title: "Who", body: "Who is this for?" },
      { index: "02", title: "Decide", body: "What must they decide?" },
      { index: "03", title: "Trust", body: "What would make them stop trusting you?" },
    ],
  },
];

export function getFramework(id: FrameworkId) {
  return knowledgeFrameworks.find((framework) => framework.id === id);
}
