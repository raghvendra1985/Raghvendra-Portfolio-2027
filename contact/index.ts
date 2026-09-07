export const contactPage = {
  title: "Contact",
  description:
    "Open to Head of Design, Associate Director and Principal roles — fintech, enterprise and AI-native products. Delhi NCR hybrid preferred · remote from India considered.",
  heroTitle: "Let’s find the structure inside the problem.",
  heroDescription:
    "Open to Head of Design, Associate Director and Principal roles — fintech, enterprise and AI-native products. Delhi NCR hybrid preferred · remote from India considered.",
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
    "Role, team, and what you need a Head of Design, Associate Director or Principal to own.",
  advisory: "The product or system, and the decision you’re stuck on.",
  workshop: "Who it’s for, and what should be different afterwards.",
  other: "What you’re trying to solve.",
};
