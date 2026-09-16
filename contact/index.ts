export const contactPage = {
  title: "Contact",
  description:
    "Principal / Staff Product Designer · Remote / Hybrid. Product engagements and teaching workshops. Start a conversation.",
  heroTitle: "Let’s find the structure inside the problem.",
  heroDescription:
    "Principal / Staff Product Designer · Remote / Hybrid. Also open to product engagements and teaching workshops.",
  intentPrompt: "What would you like to discuss?",
  intentRequired: "Choose what you would like to discuss.",
  messageLabel: "What are you trying to solve?",
  organisationLabel: "Organisation",
  emailLabel: "Work email",
  timelineLabel: "Timeline",
  timelineOptional: "Optional",
  nextEyebrow: "What happens next",
  nextBody:
    "I read every serious inquiry personally. If the opportunity appears aligned, I’ll reply with the next useful step.",
  whatsappNote:
    "WhatsApp is for short, time-sensitive notes. Hiring and project briefs belong in the form.",
  confirmationTitle: "Message received.",
  confirmationBody:
    "Thank you. I’ll read this and reply if the opportunity looks like a fit.",
  submitLabel: "Send message",
  sendingLabel: "Sending…",
  retryLabel: "Try again",
  failBody:
    "The message did not send. Please try again, or email hello@raghvendrasingh.com.",
  rateLimitBody: "Please wait a moment and try again.",
} as const;

export const intentHints: Record<string, string> = {
  hiring:
    "Role, team, and what you need a Principal / Staff Product Designer to own.",
  advisory:
    "The product or system — 0→1, AI product design, MVP, Product UX, or design systems.",
  workshop: "Who it’s for, format, and what should be different afterwards.",
  other: "What you’re trying to solve.",
};
