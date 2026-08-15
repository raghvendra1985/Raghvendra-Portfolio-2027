export const studioTopics = [
  "All",
  "Design",
  "Productivity",
  "Self-awareness",
  "AI",
  "Build & product",
  "Lifestyle & fashion",
  "Tech & workspace",
] as const;

export type StudioTopic = (typeof studioTopics)[number];
export type StudioShelf = "Book" | "Article" | "Podcast" | "Tool";

export type StudioResource = {
  title: string;
  creator: string;
  shelf: StudioShelf;
  topic: Exclude<StudioTopic, "All">;
  note: string;
  href?: string;
  current?: boolean;
  image?: string;
  imageAlt?: string;
  amazonAsin?: string;
  buyLabel?: string;
};

export type StudioCompanion = {
  kind: string;
  line: string;
};

export type StudioObject = {
  name: string;
  use: string;
  note: string;
  image?: string;
  imageAlt?: string;
};

export type StudioPage = {
  title: string;
  description: string;
  heroTitle: string;
  heroDescription: string;
  ritual: string;
  teaching: { title: string; body: string; href: string; cta: string };
  habitat: {
    title: string;
    body: string;
    dedication: string;
    companions: StudioCompanion[];
    plants: string[];
    images: { src: string; alt: string }[];
  };
  motion: {
    title: string;
    body: string;
    images: { src: string; alt: string }[];
  };
  objects: StudioObject[];
  resources: StudioResource[];
};

export const studioPage: StudioPage = {
  title: "Studio",
  description:
    "How I live, read, and keep things — books, habitat, cycling, and the objects on the desk.",
  heroTitle: "A designed environment, not a second résumé.",
  heroDescription:
    "Work is systems. Home is also systems: animals, a balcony garden, a bike, and a shelf that keeps changing what I notice. This is the room around the work.",
  ritual:
    "Faridabad mornings start outside when they can — water the balcony, a short ride, then a reading block before the first call. The rest of the week is remote product work; the garden and the animals are the operating system that is not on a laptop.",
  teaching: {
    title: "The classroom is a lab",
    body: "Teaching design and AI is not a side lecture. It is another place to test methods, frameworks, and judgment — the same questions as a critique, with different stakes. The notes live on Knowledge.",
    href: "/knowledge",
    cta: "Read the notes →",
  },
  habitat: {
    title: "Things I keep alive",
    body: "A dog, a cat, fish, birds, and a small garden on the balcony and the outside strip. Care is a daily cadence, not a weekend project. It is the same muscle as product work: notice, adjust, do not abandon the living system.",
    dedication:
      "This household also includes my parents. They are not a gallery. They are why the house is a house.",
    companions: [
      { kind: "Dog", line: "The one who decides when the day actually starts." },
      { kind: "Cat", line: "Independent operations. Supervises the desk." },
      { kind: "Fish", line: "A quiet tank. Water quality is a product spec." },
      { kind: "Birds", line: "Sound in the apartment when the city is loud." },
    ],
    plants: [
      "Balcony herbs and greens",
      "A few flowering pots that have to survive Faridabad summers",
      "Outside-strip plants that get the leftover attention after the ride",
    ],
    // Add files under public/assets/studio/ then list { src, alt } here. No stock photos.
    images: [],
  },
  motion: {
    title: "Cadence, not trophies",
    body: "I cycle because it clears the queue in my head before I design anything. Sport is the same idea at a different intensity: a body that is not only sitting in Figma. No Strava theatre here — just a bike, a route, and the habit of going out.",
    images: [],
  },
  objects: [
    {
      name: "Notebook and pens",
      use: "Analog",
      note: "Decisions get written before they get slides. The sketchbook is the first system, not a prop.",
    },
    {
      name: "Desk machines",
      use: "Workspace",
      note: "One primary machine for making. Secondary screens only when the work actually needs them.",
    },
    {
      name: "Bike",
      use: "Motion",
      note: "The commute that is not a commute. Kit stays simple so leaving the house is not a project.",
    },
    {
      name: "Watering can",
      use: "Garden",
      note: "The most honest tool in the house. If it is dry, the system failed.",
    },
  ],
  resources: [
    {
      title: "The Design of Everyday Things",
      creator: "Don Norman",
      shelf: "Book",
      topic: "Design",
      note: "Still the cleanest argument that the interface is a model of human error, not decoration.",
      image: "/assets/studio/books/design-of-everyday-things.png",
      imageAlt: "The Design of Everyday Things by Don Norman — yellow revised edition with the teapot.",
      amazonAsin: "0465050654",
    },
    {
      title: "Thinking in Systems",
      creator: "Donella Meadows",
      shelf: "Book",
      topic: "Build & product",
      note: "The book I hand people who want more screens. Leverage points beat more artefacts.",
      image: "/assets/studio/books/thinking-in-systems.png",
      imageAlt: "Thinking in Systems: A Primer by Donella Meadows — white cover with a rainbow slinky.",
      amazonAsin: "1603580557",
    },
    {
      title: "The Timeless Way of Building",
      creator: "Christopher Alexander",
      shelf: "Book",
      topic: "Design",
      note: "Pattern language as a way of seeing. Useful far beyond architecture.",
      image: "/assets/studio/books/timeless-way-of-building.png",
      imageAlt: "The Timeless Way of Building by Christopher Alexander — cream hardcover with a red circular drawing.",
      amazonAsin: "0195024028",
    },
    {
      title: "Deep Work",
      creator: "Cal Newport",
      shelf: "Book",
      topic: "Productivity",
      current: true,
      note: "Not a productivity hack shelf. A reminder that attention is the scarce material.",
      image: "/assets/studio/books/deep-work.png",
      imageAlt: "Deep Work by Cal Newport — white cover with a desk lamp and a cone of yellow light.",
      amazonAsin: "0349413681",
    },
    {
      title: "Four Thousand Weeks",
      creator: "Oliver Burkeman",
      shelf: "Book",
      topic: "Self-awareness",
      note: "Finite time, without the optimisation theatre. Keeps the garden and the job in one life.",
      image: "/assets/studio/books/four-thousand-weeks.png",
      imageAlt: "Four Thousand Weeks by Oliver Burkeman — landscape cover with a lakeside bench.",
      amazonAsin: "1784704008",
    },
    {
      title: "The Intelligence Illusion",
      creator: "Baldur Bjarnason",
      shelf: "Book",
      topic: "AI",
      note: "A useful counterweight when AI products start sounding more intelligent than they are.",
      image: "/assets/studio/books/intelligence-illusion.png",
      imageAlt: "The Intelligence Illusion, Second Edition — black cover with a wireframe head.",
      href: "https://illusion.baldurbjarnason.com/",
      buyLabel: "Buy from the author",
    },
    {
      title: "Stop designing screens. Start designing decisions.",
      creator: "Raghvendra Singh",
      shelf: "Article",
      topic: "Design",
      note: "My own field note — the library should include the argument I actually use at work.",
      href: "/knowledge/stop-designing-screens",
    },
    {
      title: "A design team does not need more meetings. It needs a critique system.",
      creator: "Raghvendra Singh",
      shelf: "Article",
      topic: "Build & product",
      note: "How judgment becomes a practice, not a calendar event.",
      href: "/knowledge/critique-system",
    },
    {
      title: "AI products do not earn trust by sounding intelligent.",
      creator: "Raghvendra Singh",
      shelf: "Article",
      topic: "AI",
      note: "Trust is a product surface. This is the public version of that argument.",
      href: "/knowledge/ai-products-earn-trust",
    },
    {
      title: "How to Do Great Work",
      creator: "Paul Graham",
      shelf: "Article",
      topic: "Productivity",
      note: "A long essay I return to when the work gets noisy. Curiosity over performance.",
      href: "https://www.paulgraham.com/greatwork.html",
    },
    {
      title: "99% Invisible",
      creator: "Roman Mars",
      shelf: "Podcast",
      topic: "Design",
      note: "The show that treats infrastructure as a story. Listening while watering plants is allowed.",
      href: "https://99percentinvisible.org/",
    },
    {
      title: "Lenny's Podcast",
      creator: "Lenny Rachitsky",
      shelf: "Podcast",
      topic: "Build & product",
      note: "Practitioners talking about the actual job, not the slide version of it.",
      href: "https://www.lennysnewsletter.com/podcast",
    },
    {
      title: "On Being",
      creator: "Krista Tippett",
      shelf: "Podcast",
      topic: "Self-awareness",
      note: "Slower conversations. Useful on a long ride when the week has been only delivery.",
      href: "https://onbeing.org/",
    },
    {
      title: "Practical AI",
      creator: "Changelog",
      shelf: "Podcast",
      topic: "AI",
      note: "Keeps the AI conversation in the realm of what can actually be shipped.",
      href: "https://changelog.com/practicalai",
    },
    {
      title: "Muji notebooks",
      creator: "Muji",
      shelf: "Tool",
      topic: "Lifestyle & fashion",
      note: "Grid, no theatre. The same reason the site uses a Swiss page.",
    },
    {
      title: "A quiet mechanical keyboard",
      creator: "Desk",
      shelf: "Tool",
      topic: "Tech & workspace",
      note: "If the tool is loud, the thinking gets loud. Prefer keys that disappear.",
    },
    {
      title: "Bicycle lights and a simple lock",
      creator: "Kit",
      shelf: "Tool",
      topic: "Tech & workspace",
      note: "The unglamorous stack that makes the ride happen on a work morning.",
    },
    {
      title: "Good indoor shoes, one decent jacket",
      creator: "Wardrobe",
      shelf: "Tool",
      topic: "Lifestyle & fashion",
      note: "Fewer pieces, better materials. Fashion as maintenance, not a feed.",
    },
  ],
};
