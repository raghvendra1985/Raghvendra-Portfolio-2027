import type { Metadata } from "next";
import { Gloock, Manrope, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "@/styles/globals.css";
import ExperienceProvider from "@/components/providers/ExperienceProvider";
import AnalyticsPathTracker from "@/components/analytics/AnalyticsPathTracker";
import { site } from "@/lib/site";
import { jsonLdScript, pageMetadataExtras, personJsonLd } from "@/lib/seo";

/** Display + editorial serif — Gloock ships as a single weight (400). */
const display = Gloock({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  adjustFontFallback: true,
});

const serif = Gloock({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  adjustFontFallback: true,
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  adjustFontFallback: true,
});

const mono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  ...pageMetadataExtras({
    title: site.title,
    description: site.description,
    path: "/",
    image: "/assets/about/raghvendra-singh.png",
  }),
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${serif.variable} ${mono.variable} motion-ready h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(personJsonLd()) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-mist text-navy">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ExperienceProvider>
          <AnalyticsPathTracker />
          {children}
        </ExperienceProvider>
        <Analytics />
      </body>
    </html>
  );
}
