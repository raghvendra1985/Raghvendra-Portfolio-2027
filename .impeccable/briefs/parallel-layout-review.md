# Parallel HQ layout review

**Status:** Closed review. Frames loan shipped 2026-08-28 on case-study interiors only.  
**Date:** 2026-08-28  
**References:** [parallelhq.com](https://www.parallelhq.com/), [Services](https://www.parallelhq.com/services), [Inhouse](https://www.parallelhq.com/work/inhouse), [About](https://www.parallelhq.com/about)  
**This site:** Home (`app/page.tsx`), Practice (`#practice` / `PracticeLanes.tsx` / `services/index.ts`), case-study interiors (`CaseStudyView.tsx`)

Freeze stays closed: Homepage, Work index, featured interiors, About (except the already-shipped hero), nav, footer, Ask, charms, `styles/tokens.css`. Do not treat Parallel as a restyle brief.

## Verdict

Parallel HQ is a **studio conversion site**. This site is a **personal hiring brief**.

Parallel’s first screen is a poster: three words (“Win on Taste”), one supporting line, an abstract graphic, a pill “Book a call.” White ground, black ink, serif display, rounded chrome, centered wordmark. Work is a stack of full-bleed product stills with one thesis and two proof stats. Services is a capability menu. Case studies are agency essays that end in a client quote and “Talk to Us.”

This site’s first screen is a recruiter scan: name, a full-sentence headline, kicker, lead, two square CTAs. Mist / navy / gold / green. Charms. Selected work is contribution + problem/result, not a metric billboard. Practice is four **problems**, each tied to related work and Contact. Case studies open with Role / Timeline / Engagement, then Layout 219, numbered “What I did,” outcomes, frames.

**Keep this system.** Parallel’s composure (large type, sparse chrome, proof on the card) is already here. Do not take the agency IA: pills, Book a call, testimonials, FAQs, numbered capability lists, cream/white-as-personality.

Service analogue on this site is homepage Practice — not `/products` and not a new `/services` page.

## Home vs parallelhq.com

| Beat | Parallel | This site |
|---|---|---|
| First viewport | Poster: 3-word claim + graphic + Book a call | Document: name + thesis + kicker + lead + Work / About |
| Work | Full-bleed still + one line + 2 stats (Raised $350M, 10x) | `SelectedWork` sticky swap: client, role, year, problem, result |
| After work | Numbered 01–05 services, testimonials, FAQ | Thesis, charms, About polaroid, Practice, enterprise, hiring, notes, tools, contact |

**What Parallel does well:** one job per viewport; work cards are billboards you can scan at 60mph; proof is a number, not a paragraph.

**What this site already does better for the actual user:** a recruiter can name the person, the claim, and the next click in three seconds. Parallel’s home does not introduce a person; it sells a studio.

**Do not copy:** 3-word hero, pill CTAs, centered logo, monochrome palette, testimonial carousel, FAQ accordion, “Partner with Parallel.” Those fight DESIGN.md (square chrome, scarce gold/green, Bricolage + Manrope) and the primary job in PRODUCT.md.

## Practice vs parallelhq.com/services

Parallel Services: manifesto headline, quote ticker, industry marquee, four chapters (Design / Research / AI / Innovation) with capability lists, Talk to Us, FAQ.

This site’s Practice (`homePractice` + `services/index.ts`): “Where I can help.” A 2×2 of problem cards — title, problem sentence, stack, related work, CTA into Contact.

**Keep Practice as problems, not a studio menu.** Parallel’s page is exactly the brochure PRODUCT.md tells founders not to confuse this site with. Numbered 01–05 capability rows would flatten Product direction / Complex systems / AI building / Design leadership into a vendor catalog.

**Safe observation only:** Parallel’s chapters are long and one-job. These cards are already one-job. The related-work link is the stronger hiring move; Parallel cannot do that without NDAs.

## Case study vs parallelhq.com/work/inhouse

Parallel Inhouse: title + subtitle, Industry / Stage / Deliverables, Visit Website, then Vision / Challenge / Solution essays, large device mockups with captions, founder quote, Talk to Us.

This site (`CaseStudyView.tsx`): back link, category, client, title, live links, Role / Timeline / Engagement, Relume Layout 219 (cover | challenge), numbered “What I did,” outcome grid, frames, conversation CTA, Related / Different / Back.

**This is the right case-study for a design leader.** Role and timeline are what hiring managers verify. The honesty note on company-scale figures is correct. Parallel’s quote is social proof for buying a studio; do not invent testimonials.

**Composition Parallel wins on:** stills at chapter scale with one caption sentence. Shipped on case-study Frames only (`CaseStudyView`): stacked billboard stills, caption from the matching published `approachSteps` sentence. Do not restyle Homepage or Work index to match. Outcome titles stay the one-line proof on that same interior.

## About (linked, out of primary scope)

Parallel About is a studio manifesto + founder quote + four values + impact logos. This site’s About is a career spine. Do not convert About into values-and-quote. The polaroid hero already did the one visual reopen.

## Anti-clone list

- Pill / rounded chrome, black-on-white identity, serif swap
- Book a call as the primary action
- Testimonials or FAQs without real published quotes
- Numbered capability menu or a new `/services` route
- Replacing numbered approach steps with agency Vision / Challenge / Solution
- Restyling Homepage Selected Work into Parallel’s metric billboards

## Later loans (single-surface reopen only)

Shipped: billboard Frames + tighter outcome titles on `/work/[slug]` only. Homepage and Work index stay frozen. Do not take pills, Book a call, testimonials, or metric billboards on Home.
