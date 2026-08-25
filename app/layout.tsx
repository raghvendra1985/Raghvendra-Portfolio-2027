import type { Metadata } from "next";
import localFont from "next/font/local";
import { Manrope, Newsreader, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "@/styles/globals.css";
import ExperienceProvider from "@/components/providers/ExperienceProvider";
import { site } from "@/lib/site";
import { jsonLdScript, personJsonLd } from "@/lib/seo";

const display = localFont({
  src: "../Bricolage_Grotesque/BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf",
  variable: "--font-display",
  display: "swap",
  weight: "200 800",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  adjustFontFallback: true,
});

const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
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
  alternates: { canonical: "/" },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: site.title,
    description: site.description,
  },
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
      className={`${display.variable} ${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(!sessionStorage.getItem("rs-v8-visited")&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("is-loading");setTimeout(function(){document.documentElement.classList.remove("is-loading");document.documentElement.classList.add("motion-ready");try{sessionStorage.setItem("rs-v8-visited","1")}catch(e){}},2500)}}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(personJsonLd()) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-mist text-navy">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ExperienceProvider>{children}</ExperienceProvider>
        <Analytics />
      </body>
    </html>
  );
}
