export type FocusItem = {
  name: string;
  role: string;
  status: string;
  href?: string;
};

export type ProductItem = {
  name: string;
  kind: string;
  summary: string;
  href?: string;
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

export type KnowledgeLinkItem = {
  slug: string;
  note: string;
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
  principles: { title: string; body: string }[];
  decisions: DecisionEntry[];
  experiments: ExperimentItem[];
  knowledge: KnowledgeLinkItem[];
  teaching: TeachingItem[];
  roadmap: { now: RoadmapItem[]; next: RoadmapItem[]; later: RoadmapItem[] };
  archive: ArchiveItem[];
};

export const founderOs: FounderOs = {
  identity: {
    name: "Raghvendra Singh",
    positioning: "Product Design Leader | Systems Thinker | AI Product Builder",
    deck: "This is how I think, build, decide, learn, and operate.",
  },
  dashboard: [
    {
      id: "focus",
      label: "Current Focus",
      summary: "EQTY, Growing With Kid, Bolo Buddy, and teaching — the workstreams that set the week.",
    },
    {
      id: "products",
      label: "Active Products",
      summary: "Founder products and the fintech OS partnership, held as one practice.",
    },
    {
      id: "experiments",
      label: "Current Experiments",
      summary: "Hypotheses in motion — audio-first stories, constraint as editor, modular finance.",
    },
    {
      id: "teaching",
      label: "Teaching",
      summary: "Curriculum, workshops, and mentoring as a way to test what actually works.",
    },
    {
      id: "archive",
      label: "Advisory",
      summary: "Enterprise systems and client work that still inform how the OS runs.",
    },
    {
      id: "knowledge",
      label: "Writing",
      summary: "Notes on decisions, trust, operating models, and building with less.",
    },
  ],
  focus: [
    {
      name: "EQTY",
      role: "Founding design partner",
      status: "Shaping a modular fintech operating system — trust, workflow, architecture.",
      href: "/work/eqty",
    },
    {
      name: "Growing With Kid",
      role: "Founder / product builder",
      status: "A parenting community that says one thing well — fewer features, sharper jobs.",
      href: "/work/growing-with-kid",
    },
    {
      name: "Bolo Buddy",
      role: "Cofounder",
      status: "Audio-first, screen-free stories in languages that feel like home.",
      href: "/work/bolo-buddy",
    },
    {
      name: "Teaching",
      role: "Associate Professor, IIAD",
      status: "Design education as a capability — decisions, not decoration.",
    },
  ],
  products: [
    {
      name: "Growing With Kid",
      kind: "Community product",
      summary:
        "Newsletter, guides, and community for Indian parents. Constraint is the editor: one audience, one promise.",
      href: "/work/growing-with-kid",
    },
    {
      name: "Bolo Buddy",
      kind: "AI product",
      summary:
        "Culturally rooted bedtime stories — Hindi, English, Hinglish, Tamil — built for children, not scaled down from adults.",
      href: "/work/bolo-buddy",
    },
    {
      name: "EQTY",
      kind: "Fintech OS",
      summary:
        "Founding design partnership. Experience architecture sits inside the operating system, not after it.",
      href: "/work/eqty",
    },
    {
      name: "Urban Prakriti",
      kind: "Founder experiment",
      summary:
        "A health brand built as a founder — positioning, identity, and D2C for city residents. Still running, still teaching how a venture stays honest.",
      href: "/work/urban-prakriti",
    },
  ],
  principles: [
    {
      title: "Start with evidence",
      body: "A screen is only the surface. The review starts with the decision the user must make, and what could make that decision fail.",
    },
    {
      title: "Make thinking visible",
      body: "Products fail when the operating model stays invisible. Write the decision, the trade-off, and the lesson where the team can see them.",
    },
    {
      title: "Build systems, not dependencies",
      body: "If the work cannot run without you in the room, it is not a system. It is a bottleneck. The deliverable is the system that generates the artefacts.",
    },
    {
      title: "Ship useful versions early",
      body: "The smallest thing that answers who it is for, what they must decide, and what would make them stop trusting you.",
    },
    {
      title: "Teach what works",
      body: "Teaching is not a second identity. It is how the practice is tested — students and teams as the fastest feedback loop.",
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
        "The classroom is a feedback loop for the practice. Teaching is a capability of the OS, not a separate identity.",
    },
  ],
  knowledge: [
    {
      slug: "stop-designing-screens",
      note: "The review that starts with the decision, not the layout.",
    },
    {
      slug: "critique-system",
      note: "A team needs a critique system, not more meetings.",
    },
    {
      slug: "ai-products-earn-trust",
      note: "Trust is a product surface — source, uncertainty, undo.",
    },
    {
      slug: "operating-model-invisible",
      note: "Make the path of decisions visible or politics fills the gap.",
    },
    {
      slug: "teaching-design-through-decisions",
      note: "The critique is the curriculum.",
    },
    {
      slug: "building-growing-with-kid",
      note: "Constraint as editor. Founder work is still product work.",
    },
  ],
  teaching: [
    {
      title: "Curriculum as a sprint",
      context: "IIAD · industrial design and AI in practice",
      body: "Each module is a sprint. Deliverables are held to a production bar. Students learn to narrate trade-offs: what they cut, what they kept, and what evidence moved the call.",
    },
    {
      title: "Workshops as research",
      context: "Teams and classrooms",
      body: "Workshops are not performances. They map friction, rank it, and leave a system behind — the same motion as enterprise advisory, used on a syllabus.",
    },
    {
      title: "Mentoring as operating model",
      context: "Juniors and founders",
      body: "If someone cannot apply the bar without you in the room, the OS has a dependency. Mentoring is how that dependency is designed out.",
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
        title: "Knowledge as a hub",
        body: "Expand the notes when a principle has been tested — not as a content calendar.",
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
      body: "Verizon, Crowley, Sagacito, Shuttl, Hempel — systems that had to last. Still on /work.",
      href: "/work",
    },
    {
      label: "Founder work",
      body: "Urban Prakriti and the ventures that taught how a brand stays honest at a small scale.",
      href: "/work/urban-prakriti",
    },
    {
      label: "Earlier web and MVPs",
      body: "Archive cards on /work — Tannins, OMF, Udbodhan, Strike, and the rest. Career depth, not the current headline.",
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
  { id: "products", index: "03", title: "Products" },
  { id: "principles", index: "04", title: "Operating Principles" },
  { id: "decisions", index: "05", title: "Decision Log" },
  { id: "experiments", index: "06", title: "Experiments" },
  { id: "knowledge", index: "07", title: "Knowledge" },
  { id: "teaching", index: "08", title: "Teaching" },
  { id: "roadmap", index: "09", title: "Roadmap" },
  { id: "archive", index: "10", title: "Archive" },
] as const;
