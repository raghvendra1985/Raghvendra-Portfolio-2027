export type FocusItem = {
  name: string;
  role: string;
  status: string;
  href?: string;
};

export type ProductItem = {
  name: string;
  /** Operating question or constraint the product puts on the practice. */
  tests: string;
  summary: string;
  href?: string;
};

export type PracticeMapItem = {
  group: string;
  method: string;
  examples: { label: string; href: string }[];
};

export type DecisionEntry = {
  id: string;
  date: string;
  decision: string;
  context: string;
  tradeOff: string;
  outcome: string;
  lesson: string;
};

export type ExperimentItem = {
  id: string;
  hypothesis: string;
  status: "Live" | "Testing" | "Paused" | "Learning";
  testing: string;
  learning: string;
};

export type TeachingItem = {
  title: string;
  context: string;
  body: string;
};

export type RoadmapItem = {
  title: string;
  body: string;
};

export type ArchiveItem = {
  label: string;
  body: string;
  href: string;
};

export type WritingHub = {
  intro: string;
  href: string;
  cta: string;
};

export type DashboardItem = {
  id: string;
  label: string;
  summary: string;
};

export type FounderOs = {
  identity: { name: string; positioning: string; deck: string };
  dashboard: DashboardItem[];
  focus: FocusItem[];
  products: ProductItem[];
  practiceMap: PracticeMapItem[];
  principles: { title: string; body: string }[];
  decisions: DecisionEntry[];
  experiments: ExperimentItem[];
  writing: WritingHub;
  teaching: TeachingItem[];
  roadmap: { now: RoadmapItem[]; next: RoadmapItem[]; later: RoadmapItem[] };
  archive: ArchiveItem[];
};

export const founderOs: FounderOs = {
  identity: {
    name: "Raghvendra Singh",
    positioning:
      "An operating system for turning ambiguity into decisions, experiments, and published evidence.",
    deck: "This is how I think, build, decide, learn, and operate.",
  },
  dashboard: [
    {
      id: "focus",
      label: "Current Focus",
      summary: "The workstreams that set the week — and the published cases behind them.",
    },
    {
      id: "practice",
      label: "Method to evidence",
      summary:
        "Four contribution groups from Work — each with a working method and one or two published examples.",
    },
    {
      id: "products",
      label: "Products as practice",
      summary:
        "Small products are where the operating system meets real constraints—users, scope, trust, and shipping.",
    },
    {
      id: "decisions",
      label: "Decision Log",
      summary: "Trade-offs that stayed — context, cut, outcome, lesson.",
    },
    {
      id: "experiments",
      label: "Experiments",
      summary: "Hypotheses in motion: audio-first stories, constraint as editor, modular finance.",
    },
    {
      id: "knowledge",
      label: "Writing and field notes",
      summary: "Notes on decisions, trust, and operating models — browse on Notes, not here.",
    },
    {
      id: "archive",
      label: "Archive",
      summary: "Enterprise systems and earlier work that still inform how the OS runs.",
    },
  ],
  focus: [
    {
      name: "EQTY",
      role: "Founding design partner",
      status: "This week’s question: can trust, ledger, and workflow extend as one system — not three products?",
      href: "/work/eqty",
    },
    {
      name: "Growing With Kid",
      role: "Founder / product builder",
      status: "This week’s question: what stays if the product must say one job well?",
      href: "/work/growing-with-kid",
    },
    {
      name: "Bolo Buddy",
      role: "Cofounder",
      status: "This week’s question: will families trust a bedtime product that is audio-first and culturally specific?",
      href: "/work/bolo-buddy",
    },
    {
      name: "Teaching",
      role: "Associate Professor, IIAD",
      status: "This week’s check: can students narrate the trade-off without a principal in the room?",
    },
  ],
  products: [
    {
      name: "GWK Ghostwriter",
      tests: "Can a founder run research-to-post with memory and voice rules — without a content team?",
      summary:
        "Shipped workflow becomes the test: long-term memory, source material, and a voice that holds under deadline.",
      href: "/work/gwk-ghostwriter",
    },
    {
      name: "Growing With Kid",
      tests: "What survives when constraint edits the product — one audience, one promise?",
      summary:
        "Newsletter and community before a feature catalogue. The OS learns to cut theatre and keep the job.",
      href: "/work/growing-with-kid",
    },
    {
      name: "Bolo Buddy",
      tests: "Will trust hold when the interface disappears at bedtime?",
      summary:
        "Audio-first, screen-free stories in languages that feel like home. Distribution is harder; the practice is clearer.",
      href: "/work/bolo-buddy",
    },
    {
      name: "EQTY",
      tests: "Can experience architecture live inside the operating system — not after the marketing site?",
      summary:
        "Modules, states, and operator language before a campaign surface. The partnership tests whether quiet hierarchy scales.",
      href: "/work/eqty",
    },
    {
      name: "Urban Prakriti",
      tests: "Can a small brand stay honest when scale pressure asks for louder claims?",
      summary:
        "Positioning and D2C for city residents. Still running — still teaching how a venture refuses commodity noise.",
      href: "/work/urban-prakriti",
    },
  ],
  practiceMap: [
    {
      group: "Product direction",
      method:
        "Share one operating model across surfaces so new work joins the system instead of restarting the product.",
      examples: [
        { label: "EQTY", href: "/work/eqty" },
        { label: "Sagacito", href: "/work/sagacito" },
      ],
    },
    {
      group: "Complex systems",
      method:
        "Treat platforms as shared infrastructure — patterns, states, and handoffs that survive team turnover.",
      examples: [
        { label: "Shuttl", href: "/work/shuttl" },
        { label: "Hempel", href: "/work/hempel" },
      ],
    },
    {
      group: "AI and founder products",
      method:
        "Ship the smallest useful version under real users; let constraint and trust edit the feature list.",
      examples: [
        { label: "GWK Ghostwriter", href: "/work/gwk-ghostwriter" },
        { label: "Bolo Buddy", href: "/work/bolo-buddy" },
      ],
    },
    {
      group: "Enterprise leadership",
      method:
        "Align product, design, and operations on one decision path when the organisation is the constraint.",
      examples: [
        { label: "Rapipay", href: "/work/nye" },
        { label: "Verizon", href: "/work/verizon" },
      ],
    },
  ],
  principles: [
    {
      title: "Start with evidence",
      body: "A screen is only the surface. The review starts with the decision the user must make, and what could make that decision fail.",
    },
    {
      title: "Make thinking visible",
      body: "Write the decision, the trade-off, and the lesson where the team can see them — or politics fills the gap.",
    },
    {
      title: "Build systems, not dependencies",
      body: "If the work cannot run without you in the room, it is not a system. The deliverable is what generates the artefacts.",
    },
    {
      title: "Ship useful versions early",
      body: "The smallest thing that answers who it is for, what they must decide, and what would make them stop trusting you.",
    },
    {
      title: "Teach what works",
      body: "Students and teams are the fastest feedback loop. Teaching checks whether the bar travels without you.",
    },
  ],
  decisions: [
    {
      id: "audio-first",
      date: "Bolo Buddy",
      decision: "Build bedtime stories as audio-first and screen-free, not as another kids’ app.",
      context:
        "Indian parents wanted culturally rooted stories. Existing platforms were Western-focused, screen-dependent, or mass-produced without cultural personalization.",
      tradeOff:
        "Less visual theatre. Harder distribution in an app-store world that rewards screens. More work on voice, language, and trust.",
      outcome:
        "The product is defined by listening, not by a feed. Family voice-narration became a core idea rather than a feature bolted on.",
      lesson:
        "Children deserve tools built for them. Scaling an adult product down would have been faster and wrong.",
    },
    {
      id: "constraint-editor",
      date: "Growing With Kid",
      decision: "Let constraint edit the product — one job, not a catalogue of parenting features.",
      context:
        "Parenting advice is fragmented and overwhelming. A full app stack would have looked more ‘complete’ and said less.",
      tradeOff:
        "Fewer surfaces to market. No theatre of process. The product has to be useful in a newsletter and a conversation first.",
      outcome:
        "The community product stayed small on purpose: essays, guides, programs — one voice, one audience, one promise.",
      lesson:
        "When the budget cannot buy another layer of process, the product has to say one thing well. That is still product work.",
    },
    {
      id: "os-not-screens",
      date: "EQTY",
      decision: "Join as founding design partner and treat experience architecture as part of the operating system.",
      context:
        "Financial products fail when trust, workflow, and business architecture are designed as separate layers.",
      tradeOff:
        "Slower visible UI. More time in modules, states, and operator language before a marketing surface exists.",
      outcome:
        "The work is structured as a modular OS — how money, people, and decisions move — so new surfaces can join without a redesign each quarter.",
      lesson:
        "High-trust financial work is a workflow and language problem. The visual system stays quiet so the architecture can carry the product.",
    },
    {
      id: "teach-decisions",
      date: "IIAD",
      decision: "Teach design through decisions and production-bar critiques, not decoration.",
      context:
        "Studio traditions still reward polish. Practice now asks for systems, AI literacy, and the ability to defend a choice under constraint.",
      tradeOff:
        "Less time on tool fluency as the headline. More discomfort in the room when a student cannot narrate the trade-off.",
      outcome:
        "Modules run as sprints. The critique is the curriculum: what they cut, what they kept, and what evidence moved the call.",
      lesson:
        "If juniors cannot apply the bar without a principal in the room, it is not a system. Teaching is how the operating model is checked.",
    },
  ],
  experiments: [
    {
      id: "voice-bedtime",
      hypothesis: "Parents will trust a bedtime product more if it is audio-first and culturally specific.",
      status: "Live",
      testing: "Screen-free stories, mood categories, and family voice-narration on Bolo Buddy.",
      learning:
        "The hard problem is trust and language, not another illustrated feed. The interface should disappear at bedtime.",
    },
    {
      id: "small-community",
      hypothesis: "A parenting product with fewer features will be clearer than a full education stack.",
      status: "Live",
      testing: "Growing With Kid as newsletter and community before a feature catalogue.",
      learning:
        "Constraint forced sharper jobs. The same decision stack as any product: who, what they must decide, what breaks trust.",
    },
    {
      id: "modular-finance",
      hypothesis: "A fintech OS holds trust better when design partners the modules, not the marketing site.",
      status: "Testing",
      testing: "EQTY experience architecture inside workflow, states, and operator language.",
      learning:
        "Still in motion. The bet is that quiet hierarchy scales further than a campaign layer on a weak system.",
    },
    {
      id: "critique-as-curriculum",
      hypothesis: "Students improve faster when they must narrate trade-offs, not only present polish.",
      status: "Learning",
      testing: "IIAD modules as sprints with a production bar and visible decision rights.",
      learning:
        "The classroom is a feedback loop for the practice. Teaching is how the operating model is checked.",
    },
  ],
  writing: {
    intro:
      "Field notes on decisions, trust, critique, and building with less. System points to Notes — it does not browse the articles here.",
    href: "/knowledge",
    cta: "Open Notes →",
  },
  teaching: [
    {
      title: "Curriculum as a sprint",
      context: "IIAD · industrial design and AI in practice",
      body: "Each module is a sprint with a production bar. Deliverables must answer: what was cut, what was kept, and what evidence moved the call.",
    },
    {
      title: "Workshops as research",
      context: "Teams and classrooms",
      body: "Map friction, rank it, leave a system behind — the same motion as enterprise advisory, used on a syllabus.",
    },
    {
      title: "Mentoring as operating model",
      context: "Juniors and founders",
      body: "If someone cannot apply the bar without you in the room, the OS still has a dependency. Mentoring designs that dependency out.",
    },
  ],
  roadmap: {
    now: [
      {
        title: "EQTY architecture",
        body: "Keep experience architecture inside the fintech OS — modules, states, operator language.",
      },
      {
        title: "Founder products",
        body: "Grow Growing With Kid and Bolo Buddy as small, honest products. No theatre of scale.",
      },
      {
        title: "Teaching loop",
        body: "Run the studio as a decision practice. Write what works back into the OS.",
      },
    ],
    next: [
      {
        title: "Visible decision log",
        body: "Keep this log public and current so the operating model does not go invisible again.",
      },
      {
        title: "Writing and field notes",
        body: "Expand Notes when a principle has been tested — not as a content calendar.",
      },
    ],
    later: [
      {
        title: "AI concierge",
        body: "A way to ask how the practice works — after the OS and the writing are stable enough to answer honestly.",
      },
      {
        title: "Deeper product rooms",
        body: "Dedicated surfaces for each founder product when they have more to show than a case study.",
      },
    ],
  },
  archive: [
    {
      label: "Enterprise experience",
      body: "Verizon, Crowley, Sagacito, Shuttl, Hempel — systems that had to last. Still on Work.",
      href: "/work",
    },
    {
      label: "Founder work",
      body: "Urban Prakriti and the ventures that taught how a brand stays honest at a small scale.",
      href: "/work/urban-prakriti",
    },
    {
      label: "Earlier web and MVPs",
      body: "Archive on Work — Tannins, OMF, Udbodhan, Strike, and the rest. Career depth, not the current headline.",
      href: "/work",
    },
    {
      label: "About",
      body: "Beliefs, teaching post, and the longer arc — architecture, logic, humanism.",
      href: "/about",
    },
  ],
};

export const osModules = [
  { id: "dashboard", index: "01", title: "Dashboard" },
  { id: "focus", index: "02", title: "Current Focus" },
  { id: "practice", index: "03", title: "Method to evidence" },
  { id: "products", index: "04", title: "Products as practice" },
  { id: "principles", index: "05", title: "Operating Principles" },
  { id: "decisions", index: "06", title: "Decision Log" },
  { id: "experiments", index: "07", title: "Experiments" },
  { id: "knowledge", index: "08", title: "Writing and field notes" },
  { id: "teaching", index: "09", title: "Teaching" },
  { id: "roadmap", index: "10", title: "Roadmap" },
  { id: "archive", index: "11", title: "Archive" },
] as const;
