---
name: frontend-work
description: Canonical Work index cards and case-study interiors for this portfolio. Use Relume Portfolio 23 for featured rows, Portfolio 1 for group cards, and Layout 219 for case-study openings — rebuilt in local tokens. Use when building or editing /work, work cards, case-study pages, Relume portfolio or feature layouts.
---

# Frontend work

When this portfolio needs project cards or a case-study opening, use these Relume patterns. Rebuild them locally. Do not paste Relume markup or install `@relume_io/relume-ui`.

Relume `preview?cid=` URLs 404 without login — do not depend on them.

| Surface | Pattern | Reference |
|---|---|---|
| Featured rows | Portfolio 23 | https://www.relume.ai/components/portfolio-23 |
| Group cards | Portfolio 1 | https://www.relume.ai/components/portfolio-1 |
| Case-study opening | Layout 219 | https://www.relume.ai/components/layout-219 |

## Where it lives

- Index: `/work` — [`components/work/WorkIndex.tsx`](components/work/WorkIndex.tsx)
- Interiors: `/work/[slug]` — [`components/work/CaseStudyView.tsx`](components/work/CaseStudyView.tsx)
- Data: `CaseStudy` in `case-studies/index.ts`

Do not invent photos or tag chips. Do not change homepage `SelectedWork`, Products, Studio, nav, or global tokens.

## Index layout

Keep the existing IA. Do not flatten featured + groups + archive into one grid.

1. **Featured evidence** (EQTY, GWK Ghostwriter, NYE): Portfolio 23. Full-width editorial row — cover beside copy on desktop, stacked on mobile. `type-h2`, 16/10 covers, Featured + designation + evidence.
2. **Contribution groups:** Portfolio 1. Two columns from `md`. Same fields: evidence, client, title, role/year, contribution, green text CTA. Compact cards are a quieter scale of the same card.
3. **Archive:** list rows, not cards.

**Flat Index Rule:** no Relume shadows, borders, or card chrome. Hover stays `animateWorkCard`.

Keep featured slugs and group hash ids for TOC / concierge.

## Case-study layout

**Opening:** Layout 219. Desktop is media | copy (cover + **Situation** / compact **Context**). Mobile stacks. Keep back link, title, live links, and Role / Timeline / Engagement above that split.

**Depth templates** (`narrativeDepth` on `CaseStudy`):

| Depth | Slugs (typical) | Body |
|---|---|---|
| `deep` | Crowley, Rapipay, GWK Ghostwriter | People → apparent/underlying problem → mandate → constraints → critical decision → system change → iteration → outcomes → frames → would change now |
| `supporting` | Shuttl, Sagacito, Hempel, EQTY | Mandate → one decision → system change → outcomes → frames → would change now |
| `compact` | Verizon, Obzrv, Growing With Kid, Bolo Buddy, Viralops, PDH, 2886, … | Audience → design objective → three decisions → frames → outcomes |

Keep: numbered system-change rail (`systemChangeSteps`), outcome grid with optional `level` / `confidence`, Frames with **independent** `frames[].caption` (never copy first sentence of steps), Crowley design-system carousel, Related / Different / Back.

Footnote only when an outcome has `confidence: "company-metric"`: “Scale figures describe the operating context. Personal contributions are stated separately.”

Do not tab chapters. Do not pin-stack steps. Do not hardcode a global disclaimer on every page.

## Visual rules

- Tokens: mist, navy, gold, green. `type-h2` / `type-h3`, `font-mono-label` for evidence and facts.
- CTAs: text links (`Read case study →`), min 44px. Not Relume buttons.
- Motion: existing `animateSection` / `animateWorkCard` / `animateCaseStudy` only. Honor reduced motion. No Relume scroll-hijack.

## Forbidden Relume variants

| Relume | Do not use |
|---|---|
| Layout 408 | Sticky stacked cards. Traps scroll. |
| Layout 348 | Sticky image swap. Homepage `SelectedWork` already owns that. |
| Layout 490 | Tabs hide process and outcomes. |
| Layout 515, 517 | Generic feature blocks. No gain. |
| Layout 518 | Multi-image gallery. Most Work covers are SVG, not photos. Runner-up for frames only. |
| Portfolio 22 | Tag + collage. Tags were removed on purpose. |
| Portfolio 4 (section or page) | Flattens featured + groups + archive. Runner-up for group cards only if Portfolio 1 feels too thin. |

## Do not

- Install Relume packages
- Bring back tag chips or audience filters
- Wrap archive rows in cards
- Restyle homepage SelectedWork to match these patterns
