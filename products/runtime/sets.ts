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
  {
    prompt: "What did you cut, and who lost because of that cut?",
    angle: "If nobody lost, you kept two products. Name the person who now has a worse morning.",
  },
  {
    prompt: "Where is the user in the first thirty seconds?",
    angle: "If the first frame is a mood, the user is still off-stage. Put them in the room before the screens.",
  },
  {
    prompt: "What would still be true if the screens were ugly?",
    angle: "The operating rule should survive a greyscale printout. If it dies, you designed a look.",
  },
  {
    prompt: "Which decision would you defend to a hostile panel?",
    angle: "Pick the decision you are least proud of. Defend that one. The pretty one does not need you.",
  },
  {
    prompt: "What evidence is not a quote from a friend?",
    angle: "A roommate quote is not evidence. A missed train, a swapped token, a guard's workaround is.",
  },
  {
    prompt: "If this shipped Monday, what breaks first?",
    angle: "Name the first hour of failure, not the vision. Who is holding the bag at 9am.",
  },
  {
    prompt: "Who is this elegant for, and who pays for that elegance?",
    angle: "Elegance that needs English, a charged phone, and two free hands is elegance for you.",
  },
  {
    prompt: "What did you refuse to include?",
    angle: "The refuse list is the brief. If you included everything, you did not decide.",
  },
  {
    prompt: "How do you know the problem is real?",
    angle: "Where did you stand when this went wrong? If you cannot point, you invented it.",
  },
  {
    prompt: "What is the operating model, not the moodboard?",
    angle: "Moodboards are not a model. Who does what, with which object, when it is busy.",
  },
  {
    prompt: "Where did you stop researching and start deciding?",
    angle: "The last useful observation has a time. After that you were hiding.",
  },
  {
    prompt: "What would a first-year misunderstand in this case study?",
    angle: "Read it as if you have four minutes and no jargon. The first unexplained acronym is the fail.",
  },
];

export const roastLenses = [
  {
    wound: "The problem appears after the screens.",
    rewrite: "Open on the conflict. A recruiter who bounces at slide two should still know what was at stake.",
  },
  {
    wound: "Every project looks like the same person had no opinion.",
    rewrite: "Name one decision you would defend if the rest of the deck disappeared.",
  },
  {
    wound: "No constraint is named, so no decision can be judged.",
    rewrite: "Put the nasty constraint in sentence one. Without it, the work is a costume.",
  },
  {
    wound: "The user is a demographic, not a person in a room.",
    rewrite: "Write one person, one hour, one workaround. Age bands are not users.",
  },
  {
    wound: "The ending is a thank-you slide.",
    rewrite: "End on what shipped, what broke, and what you would cut next. Gratitude is not a conclusion.",
  },
  {
    wound: "Process is listed. Judgement is missing.",
    rewrite: "Keep one process artefact. Replace the rest with the moment you chose A over B.",
  },
  {
    wound: "The conflict is hidden until slide 11.",
    rewrite: "Move the fight to the first screen. If it only appears late, it was decoration.",
  },
  {
    wound: "There is no cut. Everything was kept.",
    rewrite: "List ten things you would remove. Remove three on the page tonight.",
  },
  {
    wound: "The case study starts with tools, not stakes.",
    rewrite: "Figma is not the opening. Start with who was failing before you opened a file.",
  },
  {
    wound: "Beauty is doing the work that argument should do.",
    rewrite: "Print it greyscale. If the argument dies, rewrite the first paragraph before you restyle.",
  },
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
