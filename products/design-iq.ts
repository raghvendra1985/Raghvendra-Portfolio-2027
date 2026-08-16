export type DesignIqTypeId = "systems" | "craft" | "critique" | "narrative";

export type DesignIqResult = {
  id: DesignIqTypeId;
  name: string;
  kicker: string;
  body: string;
  practice: string;
};

export type DesignIqOption = {
  label: string;
  type: DesignIqTypeId;
};

export type DesignIqQuestion = {
  id: string;
  prompt: string;
  options: DesignIqOption[];
};

export const designIqResults: Record<DesignIqTypeId, DesignIqResult> = {
  systems: {
    id: "systems",
    name: "The Systems Mind",
    kicker: "You see the machine before the surface.",
    body: "You start with how parts depend on each other. Screens arrive late, and that is not a flaw — it is your order of operations. You stall when nobody will name the rules.",
    practice: "This week: pick one object you use daily. Map the system around it before you draw anything. Then draw once.",
  },
  craft: {
    id: "craft",
    name: "The Craft Mind",
    kicker: "You trust the hand more than the speech.",
    body: "You understand a problem by making. Talking about it feels like stalling. You stall when the brief stays abstract and nobody will let you prototype.",
    practice: "This week: invert it once. Write the decision in four lines before the first sketch. Then make.",
  },
  critique: {
    id: "critique",
    name: "The Critique Mind",
    kicker: "You see the hole in the argument first.",
    body: "You notice what is missing, fake, or unearned. That is a gift in a jury and a trap in a first draft. You stall when the work is not yet solid enough to interrogate.",
    practice: "This week: make an ugly complete version before you critique. Interrogate the second pass, not the blank page.",
  },
  narrative: {
    id: "narrative",
    name: "The Narrative Mind",
    kicker: "You need the story before the system will sit still.",
    body: "You design through people, scenes, and stakes. Tools without a protagonist bore you. You stall when the user is ‘everyone’ and the conflict is missing.",
    practice: "This week: write the scene of failure first. Name who is in the room. Then design the object that would have helped.",
  },
};

export const designIqQuestions: DesignIqQuestion[] = [
  {
    id: "q1",
    prompt: "A brief lands. What do you do first?",
    options: [
      { label: "List the moving parts and who owns them.", type: "systems" },
      { label: "Sketch anything just to have a thing in the world.", type: "craft" },
      { label: "Ask what claim this work is trying to make.", type: "critique" },
      { label: "Find the person who will actually suffer the problem.", type: "narrative" },
    ],
  },
  {
    id: "q2",
    prompt: "Your work is stuck. Which stuck is it?",
    options: [
      { label: "The logic does not close. Something is unaccounted for.", type: "systems" },
      { label: "I have not made enough. The page is still talk.", type: "craft" },
      { label: "I do not believe the argument yet.", type: "critique" },
      { label: "I cannot see the scene. It is still a category.", type: "narrative" },
    ],
  },
  {
    id: "q3",
    prompt: "In a critique, you are most useful when you…",
    options: [
      { label: "Point at the dependency nobody mapped.", type: "systems" },
      { label: "Ask to see a rougher, more honest version.", type: "craft" },
      { label: "Name the claim that is not earned.", type: "critique" },
      { label: "Ask who this is actually for, in a room, on a day.", type: "narrative" },
    ],
  },
  {
    id: "q4",
    prompt: "You open a case study you admire. What do you steal?",
    options: [
      { label: "The operating model. How the pieces lock.", type: "systems" },
      { label: "The making. How far they pushed the artefact.", type: "craft" },
      { label: "The judgement. What they refused to include.", type: "critique" },
      { label: "The stakes. Why anyone should care.", type: "narrative" },
    ],
  },
  {
    id: "q5",
    prompt: "A teammate wants to add a feature. Your gut says…",
    options: [
      { label: "Where does this live in the system, and what does it break?", type: "systems" },
      { label: "Can we try it in an hour before we debate it?", type: "craft" },
      { label: "What problem does this pretend to solve?", type: "critique" },
      { label: "Whose day gets better, specifically?", type: "narrative" },
    ],
  },
  {
    id: "q6",
    prompt: "You have 40 minutes. What would feel like real work?",
    options: [
      { label: "A map of the flow, even if it is ugly.", type: "systems" },
      { label: "A made object, even if the thinking is incomplete.", type: "craft" },
      { label: "A paragraph that names the real problem.", type: "critique" },
      { label: "A short scene of the user failing.", type: "narrative" },
    ],
  },
  {
    id: "q7",
    prompt: "What do you distrust on sight?",
    options: [
      { label: "Pretty screens with no model underneath.", type: "systems" },
      { label: "Decks that talk about making without showing the making.", type: "craft" },
      { label: "Process that never makes a decision.", type: "critique" },
      { label: "Users described as demographics.", type: "narrative" },
    ],
  },
  {
    id: "q8",
    prompt: "If a jury asked ‘what is this really about?’, you would reach for…",
    options: [
      { label: "The structure. How it holds.", type: "systems" },
      { label: "The artefact. Look at this.", type: "craft" },
      { label: "The cut. Here is what I refused.", type: "critique" },
      { label: "The person. Here is who this is for.", type: "narrative" },
    ],
  },
];

export function isDesignIqType(value: string | null): value is DesignIqTypeId {
  return Boolean(value && value in designIqResults);
}

export function scoreDesignIq(answers: DesignIqTypeId[]) {
  const tallies: Record<DesignIqTypeId, number> = {
    systems: 0,
    craft: 0,
    critique: 0,
    narrative: 0,
  };
  for (const answer of answers) tallies[answer] += 1;

  const ranked = (Object.keys(tallies) as DesignIqTypeId[]).sort((a, b) => {
    if (tallies[b] !== tallies[a]) return tallies[b] - tallies[a];
    return answers.lastIndexOf(b) - answers.lastIndexOf(a);
  });

  return designIqResults[ranked[0]];
}
