export const contactPage = {
  title: "Contact",
  description:
    "Seeking full-time Design Manager or Senior Design Manager roles. Delhi NCR hybrid preferred; open to remote from India. Also open to selected advisory and workshop inquiries.",
  heroTitle: "Let’s find the structure inside the problem.",
  heroDescription:
    "Seeking full-time Design Manager or Senior Design Manager roles. Delhi NCR hybrid preferred; open to remote from India. Also open to selected advisory and workshop inquiries.",
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
  hiring: "Role, team, and what you need a Design Manager or Senior Design Manager to own.",
  advisory: "The product or system, and the decision you’re stuck on.",
  workshop: "Who it’s for, and what should be different afterwards.",
  other: "What you’re trying to solve.",
};
