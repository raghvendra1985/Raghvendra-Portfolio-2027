export type ProductCopy = {
  problem: string;
  howItWorks: string[];
  exampleOutput: string;
  whatYouGet: string[];
  demoNote: string;
  whoFor?: string;
};

export const productCopy: Record<string, ProductCopy> = {
  "design-dare": {
    problem:
      "Most student work stalls in research theatre. Moodboards grow. The point of view never arrives. A jury can smell that in thirty seconds.",
    howItWorks: [
      "You draw a dare: a constraint, a user, and a timebox.",
      "You make one thing that can be shown — not a process wall.",
      "You write the defence in five lines: problem, choice, trade-off, evidence, ask.",
    ],
    exampleOutput:
      "A 45-minute dare: redesign the hostel mess token for one anxious first-year. Deliverable: one screen, one sentence of intent, one risk you accepted.",
    whatYouGet: [
      "A deck of dares that refuse vague ‘redesign the app’ briefs.",
      "A defence template you can reuse in juries and reviews.",
      "A one-time purchase. No sequence. No membership.",
    ],
    demoNote: "Preview a dare card. The full deck unlocks after purchase.",
  },
  "design-roulette": {
    problem:
      "Blank-page panic is usually a missing constraint. Without one, students either copy Dribbble or wait for inspiration that does not work on a deadline.",
    howItWorks: [
      "Spin for a domain, a user, and a nasty constraint.",
      "You get one challenge. Not a menu.",
      "Make something small enough to finish the same day.",
    ],
    exampleOutput:
      "Challenge: a pharmacy queue ticket for a parent who cannot read English. Constraint: no colour. Time: 40 minutes.",
    whatYouGet: [
      "A spinner with combinations built for design practice, not party games.",
      "Challenges you can screenshot and start immediately.",
      "Buy once. Spin whenever you are stuck.",
    ],
    demoNote: "A sample spin. The live wheel ships with the full challenge set.",
  },
  "jury-me": {
    problem:
      "Students prepare slides. Juries ask about decisions. The gap is where people freeze — not because they cannot design, but because they never rehearsed the questions.",
    howItWorks: [
      "You pick the kind of project you are defending.",
      "The tool throws jury questions in the order a panel actually uses them.",
      "You answer out loud against a clock. Then you see what a stronger answer sounds like.",
    ],
    exampleOutput:
      "Question 04 of 12: ‘What did you cut, and who lost because of that cut?’ You have 90 seconds. A sample answer sits behind a reveal — after you have tried.",
    whatYouGet: [
      "A bank of jury questions from reviews, not from motivational posters.",
      "Timed rehearsal. No audience required.",
      "One-time access. Use it the week before every panel.",
    ],
    demoNote: "Preview one jury question. The full rehearsal sits behind purchase.",
  },
  "brief-me": {
    problem:
      "Portfolios collapse when the brief was ‘I wanted to try glassmorphism.’ Beautiful screens cannot rescue a problem nobody had.",
    howItWorks: [
      "You answer a few tight questions about context, user, and stakes.",
      "The tool writes a brief with a job-to-be-done, a constraint, and a success test.",
      "You take that brief into studio or self-initiated work.",
    ],
    exampleOutput:
      "Brief: Reduce missed doses for a 70-year-old who shares a phone with her daughter. Constraint: works in a two-bar network. Success: she can complete the task without asking for help.",
    whatYouGet: [
      "A brief builder that refuses vanity projects.",
      "A one-page problem statement you can paste into a case study.",
      "Buy once. Write as many briefs as you need.",
    ],
    demoNote: "A sample brief. The builder unlocks after purchase.",
  },
  "design-iq": {
    problem:
      "Students borrow other people’s process diagrams and then wonder why the work feels fake. You cannot copy a brain. You can learn how yours actually moves.",
    howItWorks: [
      "Eight short choices. No personality-test theatre.",
      "You get a named way of seeing — how you tend to start, stall, and decide.",
      "You get one practice instruction. Not a career horoscope.",
    ],
    exampleOutput:
      "Result: The Critique Mind. You see the hole in the argument before you see the layout. Practice: make first, then interrogate — invert your usual order for one week.",
    whatYouGet: [
      "A diagnostic you can finish in a few minutes.",
      "A result plate you can save or share.",
      "A one-time purchase. Take it once. Keep the name.",
    ],
    demoNote: "This is the live diagnostic. Your result is the product.",
  },
  "portfolio-roast": {
    problem:
      "Most portfolios are not weak because of Figma skill. They are weak because the story hides, the problem is fake, or every project looks like the same person had no opinion.",
    howItWorks: [
      "You walk a roast checklist against one case study.",
      "Each fail is a specific wound: no decision, no constraint, no user, no ending.",
      "You leave with a punch list, not a vibe.",
    ],
    exampleOutput:
      "Roast note: Project 02 opens on screens. The problem appears on slide 11. A recruiter never reached slide 11. Move the conflict to sentence one.",
    whatYouGet: [
      "A roast structure used in actual reviews.",
      "Language you can put in a rewrite tonight.",
      "Buy once. Roast every project you ship this year.",
    ],
    demoNote: "Preview one roast lens. The full checklist unlocks after purchase.",
  },
  "idea-gym": {
    problem:
      "Creativity rusts in the same three project types. Students wait for a ‘good idea’ instead of putting the mind through sets, like any other muscle.",
    howItWorks: [
      "Pick a session length: 12, 20, or 40 minutes.",
      "You get a set of reps — quantity first, taste later.",
      "You stop when the timer stops. That is the point.",
    ],
    exampleOutput:
      "Set 03: twelve ways to wait. Not twelve apps. Twelve conditions of waiting. Sketch thumbnails only. No UI chrome.",
    whatYouGet: [
      "Timed sessions built for range, not for Instagram process clips.",
      "Reps you can do on a bus or between classes.",
      "One-time purchase. Return whenever the work has gone thin.",
    ],
    demoNote: "A sample set. The gym floor unlocks after purchase.",
  },
  "design-detective": {
    problem:
      "Students ‘do research’ by collecting quotes. Detection is slower: what is the object doing, who is improvising around it, what rule is being broken in plain sight?",
    howItWorks: [
      "You get a case: a place, an artefact, a friction.",
      "You collect evidence with a fixed set of questions.",
      "You write the crime — the mismatch between intended use and actual use.",
    ],
    exampleOutput:
      "Case: the college ID turnstile at 8:40am. Evidence: bags on the floor, one person holding two cards, the guard waving people through. Crime: the system assumes one body, one card, no luggage.",
    whatYouGet: [
      "Field cases and a notepad structure.",
      "Practice in seeing before proposing.",
      "Buy once. Take it on site visits.",
    ],
    demoNote: "Preview one case file. The full docket unlocks after purchase.",
  },
  "sketch-roulette": {
    problem:
      "Sketchbooks die when the prompt is ‘draw anything.’ Three constraints make a hand move. Decoration can wait.",
    howItWorks: [
      "Spin object, user, and constraint.",
      "You get one line: draw this, for them, under that rule.",
      "Ten minutes. Pencil. No type, no colour unless the wheel says so.",
    ],
    exampleOutput:
      "Object: umbrella. User: a security guard on a night shift. Constraint: one continuous line. Draw.",
    whatYouGet: [
      "Three wheels with combinations that stay drawable.",
      "A rule card so you cannot negotiate with yourself.",
      "Buy once. Spin whenever the book is empty.",
    ],
    demoNote: "A sample draw. The full wheels unlock after purchase.",
  },
  "design-entrance-simulator": {
    problem:
      "Entrance tests punish hesitation. Students who only polish portfolio pieces are unprepared for the clock, the odd prompt, and the paper that does not care about their Figma file.",
    howItWorks: [
      "You sit a timed paper at home. Same shape as a design test: observation, drawing, reasoning.",
      "You cannot pause the clock. That is the practice.",
      "After submission, you get a mark scheme and a calm debrief — not a rank.",
    ],
    exampleOutput:
      "Paper 01, 90 minutes. Part A: draw the journey of a raindrop on a bus window. Part B: design a token for a queue you have actually stood in. Part C: defend one cut.",
    whatYouGet: [
      "A full timed simulator. One sitting, taken seriously.",
      "A debrief that teaches how the paper is read.",
      "Buy once. Sit it before the real date.",
    ],
    demoNote: "Preview one prompt from the paper. The timed sitting unlocks after purchase.",
  },
  "what-should-i-design": {
    problem:
      "The next project is often chosen by trend, not by a hole in the portfolio. Then every case study tells the same story in a new skin.",
    howItWorks: [
      "You audit what your portfolio already proves.",
      "The tool names the missing proof: craft, systems, service, argument, constraint.",
      "You leave with one project worth doing next — and one to stop doing.",
    ],
    exampleOutput:
      "Gap: you have screens, no operations. Next project: a back-of-house tool for a real place you can visit. Stop: another meditation app.",
    whatYouGet: [
      "A decision path, not a random idea generator.",
      "A project brief stub you can take into Brief Me later — still a separate product.",
      "Buy once. Use it at the start of every semester.",
    ],
    demoNote: "A sample gap read. The full decision path unlocks after purchase.",
  },
  "crit-card": {
    problem:
      "Stuck projects do not need more reference. They need a question that makes the current decision look undercooked.",
    howItWorks: [
      "You draw one card.",
      "You answer it against the work on the desk. Not in the abstract.",
      "If the answer is thin, the work is thin. Fix that, then draw again.",
    ],
    exampleOutput:
      "Card: ‘Who is this elegant for, and who pays for that elegance?’ If you cannot name both people, the composition is not finished.",
    whatYouGet: [
      "A deck of questions used in actual critiques.",
      "One card at a time so you cannot hide in a list.",
      "Buy once. Keep it next to the desk.",
    ],
    demoNote: "Preview one card. The deck unlocks after purchase.",
  },
  "100-design-prompts": {
    problem:
      "Prompt lists online are either jokes or Silicon Valley homework. Students need reasons to start that fit a sketchbook, a studio, or a two-hour window.",
    howItWorks: [
      "Open the list. Pick by number, mood, or constraint.",
      "Each prompt is one job. No seven-day challenge attached.",
      "Finish or abandon. The next prompt does not care.",
    ],
    exampleOutput:
      "Prompt 47: Design the receipt for a transaction that should have been a conversation. One page. No brand.",
    whatYouGet: [
      "One hundred prompts. Usable out of order.",
      "A mix of drawing, systems, service, and argument.",
      "Buy once. Return when the page is blank.",
    ],
    demoNote: "Preview five prompts. The hundred unlock after purchase.",
  },
};

export function getProductCopy(slug: string) {
  return productCopy[slug];
}
