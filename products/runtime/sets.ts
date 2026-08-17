export const dares = [
  {
    title: "Mess token, first-year panic",
    constraint: "One anxious first-year. 45 minutes.",
    make: "Redesign the hostel mess token. One screen, one sentence of intent, one risk you accepted.",
  },
  {
    title: "Queue that pretends to be fair",
    constraint: "No colour. A parent who cannot read English.",
    make: "Design a pharmacy queue ticket that does not require literacy or a smartphone.",
  },
  {
    title: "The gate at 8:40",
    constraint: "One artefact. Evidence before opinion.",
    make: "Design a pass for the college ID turnstile that assumes bags, two cards, and a late student.",
  },
  {
    title: "Shared phone, missed dose",
    constraint: "Two-bar network. 70-year-old user.",
    make: "One screen that lets her complete the task without asking her daughter.",
  },
  {
    title: "Receipt that should have been a conversation",
    constraint: "One page. No brand.",
    make: "Design the receipt for a transaction that should have been a conversation.",
  },
  {
    title: "Night shift umbrella",
    constraint: "One continuous line. Security guard.",
    make: "Draw the object. Then write why this object fails him at 2am.",
  },
  {
    title: "Library that hides the fine",
    constraint: "Paper only. Four seconds to understand.",
    make: "Redesign the overdue slip so the student knows what to do, not just what they owe.",
  },
  {
    title: "Bus window raindrop",
    constraint: "Observation first. 20 minutes of looking.",
    make: "Draw the journey of a raindrop on a bus window, then design a token for a queue you have stood in.",
  },
];

export const defenceLines = [
  "Problem",
  "Choice",
  "Trade-off",
  "Evidence",
  "Ask",
];

export const juryQuestions = [
  "What did you cut, and who lost because of that cut?",
  "Where is the user in the first thirty seconds?",
  "What would still be true if the screens were ugly?",
  "Which decision would you defend to a hostile panel?",
  "What evidence is not a quote from a friend?",
  "If this shipped Monday, what breaks first?",
  "Who is this elegant for, and who pays for that elegance?",
  "What did you refuse to include?",
  "How do you know the problem is real?",
  "What is the operating model, not the moodboard?",
  "Where did you stop researching and start deciding?",
  "What would a first-year misunderstand in this case study?",
];

export const roastLenses = [
  "The problem appears after the screens.",
  "Every project looks like the same person had no opinion.",
  "No constraint is named, so no decision can be judged.",
  "The user is a demographic, not a person in a room.",
  "The ending is a thank-you slide.",
  "Process is listed. Judgement is missing.",
  "The conflict is hidden until slide 11.",
  "There is no cut. Everything was kept.",
  "The case study starts with tools, not stakes.",
  "Beauty is doing the work that argument should do.",
];

export const gymSets = [
  { minutes: 12, title: "Twelve ways to wait", brief: "Not twelve apps. Twelve conditions of waiting. Thumbnails only. No UI chrome." },
  { minutes: 20, title: "Objects that lie", brief: "Find eight objects that promise one job and do another. Sketch the lie." },
  { minutes: 40, title: "One street, three users", brief: "Walk or remember a street. Map it for a child, a vendor, and someone in a hurry." },
  { minutes: 12, title: "Ugly complete", brief: "Finish a thing badly. Completeness over taste." },
  { minutes: 20, title: "Cuts", brief: "Take any of your projects. List ten things you would remove. Remove three on paper." },
  { minutes: 40, title: "Service without screens", brief: "Design a service that never opens an app. Paper, people, objects." },
];

export const detectiveCases = [
  {
    place: "College ID turnstile at 8:40am",
    artefact: "The gate",
    friction: "Bags on the floor, one person holding two cards, the guard waving people through.",
    crime: "The system assumes one body, one card, no luggage.",
  },
  {
    place: "Pharmacy at noon",
    artefact: "Token display",
    friction: "Numbers jump. People ask each other. The pharmacist shouts names.",
    crime: "The queue is a performance, not a system.",
  },
  {
    place: "Hostel mess",
    artefact: "Meal token",
    friction: "Friends swap tokens. The scanner beeps at the wrong person.",
    crime: "Identity is treated as a barcode, not a social fact.",
  },
  {
    place: "Local train ladies coach",
    artefact: "The door",
    friction: "Boarding is a negotiation. Signage is after the fact.",
    crime: "The designed path is not the used path.",
  },
];

export const critCards = [
  "Who is this elegant for, and who pays for that elegance?",
  "What would a hostile jury ask in the first minute?",
  "If you deleted the prettiest screen, would the argument survive?",
  "Where is the constraint you are hiding from yourself?",
  "Name the person who fails if this ships.",
  "What did you keep because it was hard, not because it was right?",
  "Which slide exists only to look like process?",
  "What is the smallest artefact that proves the point?",
  "Who is improvising around this object in real life?",
  "What rule is being broken in plain sight?",
  "If the user cannot read, what remains?",
  "What would you cut if the jury had four minutes?",
  "Where is the evidence that is not a quote?",
  "What is fake about the problem statement?",
  "Which decision are you hoping nobody asks about?",
  "What would still be true on a two-bar network?",
  "Who loses when you choose this aesthetic?",
  "Is this a project or a costume of a project?",
  "What is the scene of failure?",
  "What would you make if you had tonight, not the semester?",
];

export const entrancePaper = {
  minutes: 90,
  parts: [
    {
      id: "A",
      title: "Observation",
      prompt: "Draw the journey of a raindrop on a bus window. Twenty minutes. No decoration.",
    },
    {
      id: "B",
      title: "Making",
      prompt: "Design a token for a queue you have actually stood in. One artefact. Name the constraint.",
    },
    {
      id: "C",
      title: "Defence",
      prompt: "Defend one cut. Five lines: problem, choice, trade-off, evidence, ask.",
    },
  ],
  markScheme: [
    "Observation is specific, not generic weather.",
    "The token could be used by someone who is late, carrying something, or cannot read English.",
    "The cut names who lost. A cut with no loser is not a cut.",
  ],
};

export const portfolioGaps = [
  { id: "craft", label: "Craft", next: "Make one artefact in the world this week. Photograph it. Write four lines.", stop: "Another UI restyle of an app you do not use." },
  { id: "systems", label: "Operations", next: "A back-of-house tool for a real place you can visit.", stop: "Another meditation app." },
  { id: "argument", label: "Argument", next: "A case that opens on conflict, not screens.", stop: "A process-wall with no decision." },
  { id: "service", label: "Service", next: "A service with almost no interface — paper, people, a counter.", stop: "A dashboard for a problem you cannot name." },
  { id: "constraint", label: "Constraint", next: "One project with a nasty, named constraint on slide one.", stop: "A project whose only constraint was time." },
];
