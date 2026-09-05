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
  /** Sampled from the cover (books) or the object face (tabs/tags). */
  spineColor: string;
  spineInk: string;
  spineLabel: string;
};

export function resourceKey(item: StudioResource) {
  return `${item.shelf}-${item.title}`;
}

export const topicFace: Record<
  Exclude<StudioTopic, "All">,
  { face: string; ink: string }
> = {
  Design: { face: "#0b1849", ink: "#ebede3" },
  Productivity: { face: "#3d4a6b", ink: "#ebede3" },
  "Self-awareness": { face: "#3f5344", ink: "#ebede3" },
  AI: { face: "#161616", ink: "#ebede3" },
  "Build & product": { face: "#124d1c", ink: "#ebede3" },
  "Lifestyle & fashion": { face: "#c4b8a4", ink: "#0b1849" },
  "Tech & workspace": { face: "#8a8478", ink: "#0b1849" },
};

function hashTitle(title: string) {
  let hash = 0;
  for (let i = 0; i < title.length; i += 1) {
    hash = (hash * 31 + title.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function libraryMetrics(item: StudioResource) {
  const hash = hashTitle(item.title);
  const tilt = ((hash % 9) - 4) * 0.7;
  if (item.shelf === "Book") {
    return { width: 26 + (hash % 10), height: 198 + (hash % 42), rotate: tilt };
  }
  if (item.shelf === "Article") {
    return { width: 13 + (hash % 4), height: 150 + (hash % 26), rotate: tilt * 0.8 };
  }
  if (item.shelf === "Podcast") {
    return { width: 20 + (hash % 8), height: 168 + (hash % 30), rotate: tilt };
  }
  return { width: 92 + (hash % 18), height: 58 + (hash % 10), rotate: tilt * 0.5 };
}

export type StudioCompanion = {
  kind: string;
  name?: string;
  line: string;
  image?: string;
  imageAlt?: string;
  images?: { src: string; alt: string }[];
};

export function companionPhotos(companion: StudioCompanion) {
  if (companion.images?.length) return companion.images;
  if (companion.image) {
    return [{ src: companion.image, alt: companion.imageAlt ?? companion.kind }];
  }
  return [];
}

export type StudioObjectIllustration = "notebook" | "desk" | "bike" | "can";

export type StudioObject = {
  name: string;
  use: string;
  note: string;
  illustration?: StudioObjectIllustration;
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
  rooms: { src: string; alt: string; title: string }[];
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
    body: "Teaching design and AI is not a side lecture. It is another place to test methods, frameworks, and judgment — the same questions as a critique, with different stakes. Workshop reflections live on Teaching; the writing continues on Notes.",
    href: "/teaching",
    cta: "What students say →",
  },
  habitat: {
    title: "Things I keep alive",
    body: "A dog, a cat, fish, birds, and a small garden on the balcony and the outside strip. Care is a daily cadence, not a weekend project. It is the same muscle as product work: notice, adjust, do not abandon the living system.",
    dedication:
      "This household also includes my parents. They are not a gallery. They are why the house is a house.",
    companions: [
      {
        kind: "Dog",
        name: "Bingo",
        line: "The one who decides when the day actually starts.",
        image: "/assets/studio/pets/bingo.jpg",
        imageAlt: "Bingo, a tricolour beagle puppy in mid-stride.",
      },
      {
        kind: "Cat",
        name: "Ocean",
        line: "Independent operations. Supervises the desk.",
        images: [
          {
            src: "/assets/studio/pets/ocean.jpg",
            alt: "Ocean, a white long-haired cat on the tiled floor.",
          },
          {
            src: "/assets/studio/pets/ocean-2.jpg",
            alt: "Ocean on her back, being scratched under the chin.",
          },
        ],
      },
      { kind: "Fish", line: "A quiet tank. Water quality is a product spec." },
      { kind: "Birds", line: "Sound in the apartment when the city is loud." },
    ],
    plants: [
      "Balcony herbs and greens",
      "A few flowering pots that have to survive Faridabad summers",
      "Outside-strip plants that get the leftover attention after the ride",
    ],
    // Add files under public/assets/studio/ then list { src, alt } here.
    // No stock photos.
    images: [],
  },
  motion: {
    title: "Cadence, not trophies",
    body: "I cycle because it clears the queue in my head before I design anything. Sport is the same idea at a different intensity: a body that is not only sitting in Figma. No Strava theatre here — just a bike, a route, and the habit of going out.",
    images: [
      {
        src: "/assets/studio/rides/01.jpg",
        alt: "After a ride, standing next to a Giant Talon mountain bike with helmet in hand.",
      },
      {
        src: "/assets/studio/rides/02.jpg",
        alt: "Strava map of a morning ride in Faridabad: 12.62 km in 48 minutes.",
      },
      {
        src: "/assets/studio/rides/05.jpg",
        alt: "Portrait in a blue cycling jersey after a ride.",
      },
      {
        src: "/assets/studio/rides/04.jpg",
        alt: "Ride of 25.35 km in 1 hour 13 minutes.",
      },
      {
        src: "/assets/studio/rides/03.jpg",
        alt: "Weekly cycling targets complete: 50.48 km.",
      },
      {
        src: "/assets/studio/rides/06.jpg",
        alt: "Weekly cycling start: 25.18 km in 1 hour 10 minutes.",
      },
      {
        src: "/assets/studio/rides/07.jpg",
        alt: "Weekly cycling complete: 32.71 km in 1 hour 38 minutes.",
      },
    ],
  },
  rooms: [
    {
      src: "/assets/studio/desktop.jpg",
      alt: "Corner standing desk with dual screens, boom microphone, yellow open shelves, and a motorcycle helmet.",
      title: "Desktop",
    },
    {
      src: "/assets/studio/wall.jpg",
      alt: "Pegboard and whiteboard on the studio wall, with a ukulele, tools, and handwritten goals.",
      title: "Wall",
    },
  ],
  objects: [
    {
      name: "Notebook and pens",
      use: "Analog",
      note: "Decisions get written before they get slides. The sketchbook is the first system, not a prop.",
      illustration: "notebook",
    },
    {
      name: "Desk machines",
      use: "Workspace",
      note: "One primary machine for making. Secondary screens only when the work actually needs them.",
      illustration: "desk",
    },
    {
      name: "Bike",
      use: "Motion",
      note: "The commute that is not a commute. Kit stays simple so leaving the house is not a project.",
      illustration: "bike",
    },
    {
      name: "Watering can",
      use: "Garden",
      note: "The most honest tool in the house. If it is dry, the system failed.",
      illustration: "can",
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
      spineColor: "#f0c400",
      spineInk: "#0b1849",
      spineLabel: "Everyday Things",
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
      spineColor: "#f4f1ea",
      spineInk: "#0b1849",
      spineLabel: "Systems",
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
      spineColor: "#e8d5b5",
      spineInk: "#0b1849",
      spineLabel: "Timeless Way",
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
      spineColor: "#f7f5f0",
      spineInk: "#0b1849",
      spineLabel: "Deep Work",
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
      spineColor: "#1e6fa8",
      spineInk: "#ebede3",
      spineLabel: "4000 Weeks",
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
      spineColor: "#111111",
      spineInk: "#ebede3",
      spineLabel: "Illusion",
    },
    {
      title: "Stop designing screens. Start designing decisions.",
      creator: "Raghvendra Singh",
      shelf: "Article",
      topic: "Design",
      note: "My own field note — the library should include the argument I actually use at work.",
      href: "/knowledge/stop-designing-screens",
      spineColor: "#ebede3",
      spineInk: "#0b1849",
      spineLabel: "Decisions",
    },
    {
      title: "A design team does not need more meetings. It needs a critique system.",
      creator: "Raghvendra Singh",
      shelf: "Article",
      topic: "Build & product",
      note: "How judgment becomes a practice, not a calendar event.",
      href: "/knowledge/critique-system",
      spineColor: "#d9d9d5",
      spineInk: "#0b1849",
      spineLabel: "Critique",
    },
    {
      title: "AI products do not earn trust by sounding intelligent.",
      creator: "Raghvendra Singh",
      shelf: "Article",
      topic: "AI",
      note: "Trust is a product surface. This is the public version of that argument.",
      href: "/knowledge/ai-products-earn-trust",
      spineColor: "#e8e4dc",
      spineInk: "#0b1849",
      spineLabel: "Trust",
    },
    {
      title: "How to Do Great Work",
      creator: "Paul Graham",
      shelf: "Article",
      topic: "Productivity",
      note: "A long essay I return to when the work gets noisy. Curiosity over performance.",
      href: "https://www.paulgraham.com/greatwork.html",
      spineColor: "#f5f4f0",
      spineInk: "#0b1849",
      spineLabel: "Great Work",
    },
    {
      title: "99% Invisible",
      creator: "Roman Mars",
      shelf: "Podcast",
      topic: "Design",
      note: "The show that treats infrastructure as a story. Listening while watering plants is allowed.",
      href: "https://99percentinvisible.org/",
      spineColor: "#0b1849",
      spineInk: "#ebede3",
      spineLabel: "99PI",
    },
    {
      title: "Lenny's Podcast",
      creator: "Lenny Rachitsky",
      shelf: "Podcast",
      topic: "Build & product",
      note: "Practitioners talking about the actual job, not the slide version of it.",
      href: "https://www.lennysnewsletter.com/podcast",
      spineColor: "#124d1c",
      spineInk: "#ebede3",
      spineLabel: "Lenny",
    },
    {
      title: "On Being",
      creator: "Krista Tippett",
      shelf: "Podcast",
      topic: "Self-awareness",
      note: "Slower conversations. Useful on a long ride when the week has been only delivery.",
      href: "https://onbeing.org/",
      spineColor: "#3f5344",
      spineInk: "#ebede3",
      spineLabel: "On Being",
    },
    {
      title: "Practical AI",
      creator: "Changelog",
      shelf: "Podcast",
      topic: "AI",
      note: "Keeps the AI conversation in the realm of what can actually be shipped.",
      href: "https://changelog.com/practicalai",
      spineColor: "#161616",
      spineInk: "#ebede3",
      spineLabel: "Practical AI",
    },
    {
      title: "Muji notebooks",
      creator: "Muji",
      shelf: "Tool",
      topic: "Lifestyle & fashion",
      note: "Grid, no theatre. The same reason the site uses a Swiss page.",
      spineColor: "#c4b8a4",
      spineInk: "#0b1849",
      spineLabel: "Muji",
    },
    {
      title: "A quiet mechanical keyboard",
      creator: "Desk",
      shelf: "Tool",
      topic: "Tech & workspace",
      note: "If the tool is loud, the thinking gets loud. Prefer keys that disappear.",
      spineColor: "#8a8478",
      spineInk: "#0b1849",
      spineLabel: "Keys",
    },
    {
      title: "Bicycle lights and a simple lock",
      creator: "Kit",
      shelf: "Tool",
      topic: "Tech & workspace",
      note: "The unglamorous stack that makes the ride happen on a work morning.",
      spineColor: "#8a8478",
      spineInk: "#0b1849",
      spineLabel: "Ride kit",
    },
    {
      title: "Good indoor shoes, one decent jacket",
      creator: "Wardrobe",
      shelf: "Tool",
      topic: "Lifestyle & fashion",
      note: "Fewer pieces, better materials. Fashion as maintenance, not a feed.",
      spineColor: "#c4b8a4",
      spineInk: "#0b1849",
      spineLabel: "Wardrobe",
    },
  ],
};
