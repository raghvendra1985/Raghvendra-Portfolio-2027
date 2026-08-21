export type ProductDecision = {
  id: string;
  product: string;
  decision: string;
  why: string;
  current: string;
  optionA: string;
  optionB: string;
  recommendation: string;
  severity: "review" | "optional";
};

export const productDecisions: ProductDecision[] = [
  {
    id: "jury-sessions",
    product: "Jury Me",
    decision: "Should Jury Me remember previous sessions?",
    why: "A student who returns tomorrow currently starts at question one with no record of what they already rehearsed.",
    current: "Question index lives in React state. Refreshing the page resets the bank.",
    optionA: "Keep it stateless. Rehearsal is the point; history is optional.",
    optionB: "Persist last index (localStorage or account session) so they can continue.",
    recommendation: "Leave stateless until a student asks for continue. Do not build a progress dashboard speculatively.",
    severity: "review",
  },
  {
    id: "roast-export",
    product: "Portfolio Roast",
    decision: "Should Portfolio Roast allow students to export feedback?",
    why: "The punch list is the artefact they would take into a rewrite. Today it exists only on screen.",
    current: "Checkbox state is in memory. No copy, PDF, or download.",
    optionA: "Keep it on-screen. The student can screenshot or type.",
    optionB: "Add a plain-text copy or print stylesheet for the selected wounds.",
    recommendation: "A copy button is the smallest honest export. Do not add a designed PDF until the roast language is approved.",
    severity: "review",
  },
  {
    id: "brief-save",
    product: "Brief Me",
    decision: "Should Brief Me save generated briefs?",
    why: "The brief is the thing they would paste into a case study. Losing it on another device is friction.",
    current: "localStorage key sp-brief-me stores place / user / stakes on this browser only. Not tied to the account.",
    optionA: "Keep device-local save. It already survives refresh.",
    optionB: "Save to the account (student_product_sessions already exists in Supabase) so library restores the last brief.",
    recommendation: "Device-local is enough for an MVP. Account save is only worth it after the brief output itself is deepened.",
    severity: "review",
  },
  {
    id: "iq-history",
    product: "Design IQ",
    decision: "Should Design IQ show historical scores?",
    why: "Retaking the same eight questions will often return the same of four types. A history chart would overclaim.",
    current: "No history. Public page can encode the last type in ?result=.",
    optionA: "Keep a single current result. No history.",
    optionB: "Store each completion and show past types.",
    recommendation: "Do not add history. Four static types are not a longitudinal instrument.",
    severity: "review",
  },
  {
    id: "gym-save",
    product: "Idea Gym",
    decision: "Should Idea Gym save idea sets?",
    why: "The product scores quantity of making, not a stored list of ideas. Capture would change the product.",
    current: "Active set and countdown are in memory. Nothing is written.",
    optionA: "Keep it ephemeral. When the timer ends, the set is over.",
    optionB: "Let the student jot ideas into the app and save them.",
    recommendation: "Keep ephemeral. Saving turns a gym into a notebook, which is a different product.",
    severity: "review",
  },
  {
    id: "crit-favourites",
    product: "Crit Card",
    decision: "Should Crit Card allow favourites?",
    why: "Twenty cards cycle. A favourite would pin a question that keeps applying to one project.",
    current: "Index increments and wraps. No pin, no shuffle seed.",
    optionA: "Keep draw-again only.",
    optionB: "Allow pinning one card.",
    recommendation: "Optional later. Not a sales blocker. The product is one card at a time, not a saved deck.",
    severity: "optional",
  },
  {
    id: "roulette-history",
    product: "Design Roulette / Sketch Roulette",
    decision: "Should the spinners remember past draws?",
    why: "Students sometimes want to return to a challenge they did not capture.",
    current: "Seed is component state. A refresh is a new spin.",
    optionA: "Keep one live draw.",
    optionB: "Show the last N spins.",
    recommendation: "Not required for the core promise. Screenshot or a notebook is enough.",
    severity: "optional",
  },
];
