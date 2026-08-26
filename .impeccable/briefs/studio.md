# Studio — open surface brief

**Status:** Open surface (in polish). System stays frozen; System layout deferred.  
**Route:** `/studio`  
**Code:** `app/studio/page.tsx`, `components/studio/*`, `studio/index.ts`  
**Layout reference:** [studio-layout-reference.html](./studio-layout-reference.html)

## Page job

Studio reveals the **life and environment around the work** — the room, companions, library, cadence, and objects that keep the practice human.

It is **not**:

- Another About page (career chapters, stats, hiring proof)
- Another Work / portfolio index (case studies, contribution groups)
- A services brochure

## Layout direction (from critique)

Live copy and photos. Each section gets a shape that matches what it holds — no repeated card grid:

| Section | Shape |
|---|---|
| Hero | Asymmetric text + desk photo |
| Dedication | Centered pull-quote |
| Rooms | Offset editorial pair (desk / wall) |
| Library | Horizontal working shelf; note on hover/focus |
| Things I keep alive | Mixed weight (photo leads + text-only companions) |
| Cadence | Loose photo scatter, not trophy grid |
| Objects | Plain numbered list |
| Teaching | Quiet bridge to Notes |

## Intentional drops (not silent omissions)

The layout reference was built from live content, so it never named these prior Studio chrome pieces. They are **dropped on purpose**, not forgotten:

- **HelixSpiral** — 3D cover reel of the same pet / room / ride assets. Redundant once hero, rooms, habitat, and cadence each give those photos a job.
- **StudioTicker** — topic/kind marquee. Ambient chrome that reads as dashboard noise against the “one shape per section” direction.
- **Contact CTA card** — services brochure move; teaching bridge to Notes is the only exit.

Components remain in the repo unused for now; delete in a later cleanup if Studio stays this shape.

## Hero copy / a11y note

`animateHero` fades `[data-hero-copy]` with GSAP `autoAlpha` (sets `visibility: hidden` during the entrance). An early a11y snapshot that “missed” the hero body was that invisible window, not missing markup. Studio keeps the thesis paragraph **off** `data-hero-copy` so it stays in the tree from first paint; label + desk photo still take the fade. Shared `animations/hero.ts` also has a 1400ms failsafe reveal.

## Guardrails

- Preserve brand tokens and type (mist / navy / green / gold; Bricolage + Manrope).
- One job per section; avoid card sprawl that reads as a dashboard.
- Real photos and objects over abstract decoration where assets exist.
- Do not invent biography or claims that About / Work already own.
- Do not reopen frozen Homepage, About, Work, System, Notes, Contact, nav, footer, Ask chrome, or tokens for Studio polish.
- Visitor language: **Notes** (not Knowledge) for the teaching bridge.

## Success

A visitor who already believes the work can still feel the person and place behind it — enough atmosphere to trust the practice is lived, without a second résumé.
