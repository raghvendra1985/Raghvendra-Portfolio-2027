export const contactPage = {
  title: "Contact",
  description:
    "Hire me, build with me, or invite me to teach. Principal / Staff Product Design · Remote / Hybrid.",
  heroTitle: "Let’s talk.",
  heroDescription:
    "Three ways in: hire me for Principal / Staff Product Design, build with me on a product engagement, or invite me to teach.",
  heroVideo:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_051048_5ef213b5-26db-4da8-b604-7ef823760b6b.mp4",
  intentPrompt: "How should we start?",
  intentRequired: "Choose a path.",
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
