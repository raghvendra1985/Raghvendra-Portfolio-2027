export type TeachingTestimonial = {
  heading: string;
  quote: string;
  /** Omit for the anonymous participant. */
  name?: string;
  role: string;
  /** Optional portrait under public/assets/testimonials. */
  image?: {
    src: string;
    alt: string;
  };
};

export type TeachingHeroSlide = {
  src: string;
  alt: string;
  venue: string;
  caption: string;
  width: number;
  height: number;
};

export type TeachingPage = {
  title: string;
  description: string;
  heroLabel: string;
  heroTitle: string;
  heroDescription: string;
  heroVenuesLabel: string;
  heroVenues: string[];
  heroGalleryLabel: string;
  heroGallery: TeachingHeroSlide[];
  sectionEyebrow: string;
  sectionTitle: string;
  sectionIntro: string;
  testimonials: TeachingTestimonial[];
  sourceNote: string;
};

export const teachingPage: TeachingPage = {
  title: "Teaching",
  description:
    "UX workshops, classrooms, and mentoring — facilitation across design schools, with reflections from students on learning, questioning, and applying design.",
  heroLabel: "Teaching / Facilitation",
  heroTitle: "Workshops where critique becomes a shared practice.",
  heroDescription:
    "I facilitate UX and concept-development sessions in design classrooms — helping students question the problem, build shared language, and apply judgment under real constraints. Recruiters evaluating teaching or workshop facilitation can see the rooms, the venues, and what students took away.",
  heroVenuesLabel: "Recent rooms",
  heroVenues: [
    "NIFT Delhi",
    "DTU",
    "NID Kurukshetra",
    "IIAD",
    "WUD",
    "Ambedkar University",
    "Chitkara University",
    "GenAI · Bangalore",
  ],
  heroGalleryLabel: "Workshop scenes",
  heroGallery: [
    {
      src: "/assets/testimonials/workshop-scenes/nift-delhi-06.jpg",
      alt: "UX workshop facilitation at NIFT Delhi",
      venue: "NIFT Delhi",
      caption: "UX workshop — facilitation in the room",
      width: 1920,
      height: 1440,
    },
    {
      src: "/assets/testimonials/workshop-scenes/wud-figma-01.jpg",
      alt: "Figma workshop at WUD",
      venue: "WUD",
      caption: "Figma workshop — toolcraft in session",
      width: 1920,
      height: 1081,
    },
    {
      src: "/assets/testimonials/workshop-scenes/dtu-mdes-02.jpg",
      alt: "M.Des UX workshop facilitation at DTU",
      venue: "DTU · M.Des",
      caption: "M.Des cohort — facilitated exercise",
      width: 1920,
      height: 1440,
    },
    {
      src: "/assets/testimonials/workshop-scenes/nid-openelective-02.jpg",
      alt: "Open elective workshop at NID Kurukshetra",
      venue: "NID Kurukshetra",
      caption: "Open elective — critique and making",
      width: 1920,
      height: 1440,
    },
    {
      src: "/assets/testimonials/workshop-scenes/ambedkar-figma-01.jpg",
      alt: "Figma workshop at Ambedkar University",
      venue: "Ambedkar University",
      caption: "Figma workshop — hands-on facilitation",
      width: 1920,
      height: 1440,
    },
    {
      src: "/assets/testimonials/workshop-scenes/genai-bangalore-01.jpg",
      alt: "GenAI workshop in Bangalore",
      venue: "GenAI · Bangalore",
      caption: "GenAI workshop — exploring new tools",
      width: 1920,
      height: 1440,
    },
    {
      src: "/assets/testimonials/workshop-scenes/chitkara-01.jpg",
      alt: "Workshop session at Chitkara University",
      venue: "Chitkara University",
      caption: "Classroom facilitation",
      width: 1920,
      height: 1440,
    },
    {
      src: "/assets/testimonials/workshop-scenes/iiad-classroom-ugcd-01.jpg",
      alt: "UGCD classroom session at IIAD",
      venue: "IIAD · UGCD",
      caption: "Undergraduate communication design classroom",
      width: 1920,
      height: 1440,
    },
    {
      src: "/assets/testimonials/workshop-scenes/nid-form-01.jpg",
      alt: "Form workshop at NID Kurukshetra",
      venue: "NID Kurukshetra",
      caption: "Form workshop — material thinking",
      width: 1920,
      height: 1440,
    },
    {
      src: "/assets/testimonials/workshop-scenes/wud-blender-01.jpg",
      alt: "Blender workshop at WUD",
      venue: "WUD",
      caption: "Blender workshop — 3D in the room",
      width: 1920,
      height: 1440,
    },
    {
      src: "/assets/testimonials/workshop-scenes/digital-awareness-01.jpg",
      alt: "Digital awareness workshop for craft entrepreneurs",
      venue: "Craft entrepreneurs",
      caption: "Digital awareness for craft entrepreneurs",
      width: 1920,
      height: 1440,
    },
    {
      src: "/assets/testimonials/workshop-scenes/dtu-01.jpg",
      alt: "UX workshop session at DTU",
      venue: "DTU",
      caption: "UX workshop — DTU classroom",
      width: 1920,
      height: 1440,
    },
    {
      src: "/assets/testimonials/workshop-scenes/ambedkar-selfawareness-01.jpg",
      alt: "Self-awareness workshop at Ambedkar University",
      venue: "Ambedkar University",
      caption: "Self-awareness workshop",
      width: 1920,
      height: 1440,
    },
    {
      src: "/assets/testimonials/workshop-scenes/nid-kurukshetra-01.jpg",
      alt: "Concept development workshop at NID Kurukshetra",
      venue: "NID Kurukshetra",
      caption: "Concept development workshop",
      width: 1920,
      height: 1080,
    },
    {
      src: "/assets/testimonials/workshop-scenes/iiad-2025-02.jpg",
      alt: "Closing session with IIAD 2025 batch",
      venue: "IIAD",
      caption: "IIAD 2025 batch — closing session",
      width: 1920,
      height: 1440,
    },
    {
      src: "/assets/testimonials/workshop-scenes/chitkara-02.jpg",
      alt: "Students collaborating at Chitkara University workshop",
      venue: "Chitkara University",
      caption: "Collaboration around the brief",
      width: 1920,
      height: 1440,
    },
    {
      src: "/assets/testimonials/workshop-scenes/genai-bangalore-02.jpg",
      alt: "GenAI workshop discussion in Bangalore",
      venue: "GenAI · Bangalore",
      caption: "Discussion during GenAI session",
      width: 1920,
      height: 1440,
    },
    {
      src: "/assets/testimonials/workshop-scenes/iiad-farewell-05.jpg",
      alt: "IIAD 2026 batch farewell session",
      venue: "IIAD",
      caption: "IIAD 2026 batch — cohort moment",
      width: 1920,
      height: 1440,
    },
    {
      src: "/assets/testimonials/workshop-scenes/nift-delhi-03.jpg",
      alt: "Group discussion during a UX workshop at NIFT Delhi",
      venue: "NIFT Delhi",
      caption: "Peer discussion during a live session",
      width: 1280,
      height: 960,
    },
    {
      src: "/assets/testimonials/workshop-scenes/nid-openelective-01.jpg",
      alt: "Open elective workshop boards at NID Kurukshetra",
      venue: "NID Kurukshetra",
      caption: "Open elective — boards and shared language",
      width: 1920,
      height: 1079,
    },
  ],
  sectionEyebrow: "Student reflections",
  sectionTitle: "What students say",
  sectionIntro:
    "Reflections on learning, questioning, and applying design through my UX workshops.",
  testimonials: [
    {
      heading: "Learning to question the problem",
      quote:
        "His approach pushed me to not just design solutions, but to question whether I was solving the right problems. The collaborative sessions, especially ideation, allowed me to explore different perspectives and apply user-centered thinking more effectively.",
      name: "Rani Arora",
      role: "UX workshop participant",
      image: {
        src: "/assets/testimonials/Testimonials_RaniArora.png",
        alt: "Portrait of Rani Arora",
      },
    },
    {
      heading: "Finding direction through feedback",
      quote:
        "The feedback loops, both in groups and one-on-one, helped me find direction whenever I felt stuck.",
      name: "Vrinda Bakshi",
      role: "UX workshop participant",
      image: {
        src: "/assets/testimonials/Testimonials_VrindaBakshi.png",
        alt: "Portrait of Vrinda Bakshi",
      },
    },
    {
      heading: "Applying design to a real challenge",
      quote:
        "I worked on a month-long design project with Raghvendra Sir which gave me hands-on experience in applying design thinking to real-world challenges. Through constant feedback and peer discussions, I developed a sustainability-focused project aimed at protecting bees by involving children as stewards. It helped me strengthen my research, ideation, and user-centered design skills.",
      name: "Sejal Gupta",
      role: "UX workshop participant",
      image: {
        src: "/assets/testimonials/Testimonials_SejalgGupta.png",
        alt: "Portrait of Sejal Gupta",
      },
    },
    {
      heading: "Learning from each other",
      quote:
        "Every session felt like an open conversation where everyone could pitch in. It helped me learn not just from the instructor but also from my peers, giving me a broader perspective on design.",
      name: "Ansh Sakhuja",
      role: "UX workshop participant",
      image: {
        src: "/assets/testimonials/Testimonials_AnshSakhuja.png",
        alt: "Portrait of Ansh Sakhuja",
      },
    },
    {
      heading: "Looking beyond screens",
      quote:
        "This workshop helped me step out of my comfort zone. UX/UI design isn’t always about creating designs for screens; it’s about understanding users and solving problems no matter the medium.",
      name: "Pranab Sharma",
      role: "UX workshop participant",
      image: {
        src: "/assets/testimonials/Testimonials_PranabSharma.png",
        alt: "Portrait of Pranab Sharma",
      },
    },
    {
      heading: "Experimenting with purpose",
      quote:
        "The session encouraged me to experiment with design and explore beyond traditional patterns. Your guidance helped me find new approaches while always keeping the user journey at the center.",
      role: "Anonymous UX workshop participant",
    },
  ],
  sourceNote:
    "Excerpts from UX workshop feedback collected in June 2025. Shared with participants’ permission.",
};
