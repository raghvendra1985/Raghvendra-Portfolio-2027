---
name: Raghvendra Singh Portfolio
description: Authored editorial portfolio for a product design leader — navy, mist, green, and gold.
colors:
  navy: "#0B1849"
  green: "#124D1C"
  gold: "#E4B028"
  mist: "#FFFFFF"
  paper: "#F5F4F0"
  paper-edge: "#D9D9D5"
  ink: "#0B1849"
  ink-soft: "#2A3860"
  focus: "#E4B028"
typography:
  display:
    fontFamily: "Libre Baskerville, Georgia, Times New Roman, serif"
    fontSize: "clamp(2.75rem, 2rem + 3.2vw, 7.5rem)"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Libre Baskerville, Georgia, Times New Roman, serif"
    fontSize: "clamp(2.25rem, 1.85rem + 1.55vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Libre Baskerville, Georgia, Times New Roman, serif"
    fontSize: "clamp(2rem, 1.7rem + 1.35vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "-0.04em"
  h3:
    fontFamily: "Libre Baskerville, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.75rem, 1.5rem + 0.95vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "-0.04em"
  h4:
    fontFamily: "Libre Baskerville, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.5rem, 1.35rem + 0.55vw, 2rem)"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Figtree, system-ui, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
  label:
    fontFamily: "Figtree, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.06em"
rounded:
  none: "0px"
  charm: "8px"
spacing:
  page-pad: "clamp(1.5rem, 4.5vw, 4.5rem)"
  section-lg: "5rem"
  section-md: "3rem"
  card-gap: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.mist}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
    typography: "{typography.label}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.navy}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
    typography: "{typography.label}"
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.navy}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
    typography: "{typography.label}"
  work-card:
    backgroundColor: "transparent"
    textColor: "{colors.navy}"
    rounded: "{rounded.none}"
    padding: "0"
---

# Design System: Raghvendra Singh Portfolio

## 1. Overview

**Creative North Star: "The Systems Atelier"**

An authored Swiss-editorial portfolio that behaves like a modern digital product. Large display type, quiet surfaces, and a narrow colour set (navy, mist, green, gold) carry leadership credibility without SaaS chrome. Cultural rootedness lives in the charm corridor and working symbols; motion is physical and shared through `animations/` — never page-local theatre.

The system rejects cream-as-personality, purple-glow kits, dashboard shells, and generic “premium” restyles. Frozen surfaces (Homepage, About, Contact, Work Index, System, Notes, featured case-study interiors, nav, footer, Ask, charms, tokens) are the identity source of truth. Open surface now: Studio — life and environment around the work, not a second About or Work index. A future System layout reopen (all eleven modules, presentation-only) is parked in `.impeccable/briefs/system-layout-all-modules.md`; do not ship a four-module partial.

**Key Characteristics:**

- Mist body, navy ink, green for progress cues, gold for focus and featured signals
- Libre Baskerville display + Figtree body/UI; uppercase tracked labels in Figtree (not a second mono face for chrome)
- Square corners on interactive chrome; radius reserved for charm objects
- Page pad and 1440 max width; charm corridor reserved on desktop
- Motion only via shared animation modules; reduced-motion alternatives required

## 2. Colors

A restrained four-colour brand on mist ground. Accents stay scarce so gold and green retain meaning.

### Primary
- **Deep Decision Navy** (#0B1849): Ink, display type, primary buttons, featured pressed states. The voice of the site.
- **Workshop Mist** (#EBEDE3): Body background and soft surfaces. Cool-neutral, not cream-as-brand.

### Secondary
- **Practice Green** (#124D1C): Continuity, CTAs on work cards (“Read case study”), positive system status.
- **Focus Gold** (#E4B028): Focus rings, Featured markers, magnetic-button fill reveals, high-attention moments ≤10% of any screen.

### Neutral
- **Paper** (#F5F4F0) / **Paper Edge** (#D9D9D5): Charm and object materials only — not a second page background strategy.
- **Ink Soft**: Navy mixed toward mist (~78–82%) for secondary prose and labels. Never washed pure gray on mist.

### Named Rules
**The Scarce Accent Rule.** Gold and green earn their place as signal, not decoration. Do not invent new brand hues for a single page.

**The Token Freeze Rule.** Do not restyle navy / mist / green / gold / typography scales to chase a new aesthetic lane. Refine application, not identity.

## 3. Typography

**Display Font:** Libre Baskerville (Google Fonts via `next/font`, Georgia / Times New Roman fallback)  
**Body Font:** Figtree  
**Label Font:** Figtree uppercase tracked (`font-mono-label`) — Space Mono is reserved for product runtime / code, not site chrome.

**Character:** Display is quiet and large (weight 400), not shouty. Labels are operational and uppercase. Body stays readable at editorial length (prefer ≤75ch for long prose). Hierarchy is size within one serif face — not a second display family.

### Hierarchy
- **Display / Hero** (`type-hero` / `type-display-xl`, fluid up to 120px / 7.5rem, line-height 1.3, tracking -0.04em): Homepage and major page openings.
- **Headline** (`type-h1`, up to 60px / 3.75rem): Page heroes and case-study titles.
- **Title** (`type-h2`, up to 56px / 3.5rem): Section titles; featured work cards may use `type-h2`.
- **Subtitle** (`type-h3`, up to 44px / 2.75rem) / **H4** (`type-h4`, up to 32px / 2rem): Card and nested headings — Libre Baskerville 400, same as larger levels.
- **Body** (`type-body` 20px / 1.25rem, line-height 1.4; `type-lead` up to 24px): Supporting sentences and contribution lines.
- **Label** (`font-mono-label` / `font-section-label` / `type-caption` 14px): Evidence types, roles, section names. Section labels are stronger weight than field labels.

### Named Rules
**The One Display Face Rule.** Do not introduce a second display family for Work or elsewhere. Hierarchy is size and weight, not a new font. All heading levels use Libre Baskerville at weight 400.

## 4. Elevation

Depth is mostly tonal (mist → surface-dim → navy) and hairline rules (`--line` / `--line-strong`). Shadows exist for charm / paper objects (`--object-shadow`, `--object-shadow-lift`), not as default card chrome on Work or Homepage.

### Shadow Vocabulary
- **Object rest** (`0 4px 16px` navy 10%): Charm and paper objects at rest.
- **Object lift** (`0 12px 28px` navy 16%): Interactive lift on those objects only.

### Named Rules
**The Flat Index Rule.** Work index cards stay borderless and shadowless unless interaction truly requires a container. Prefer type, media, and spacing over card chrome.

## 5. Components

### Buttons
- **Shape:** Square (0 radius); mono-label uppercase; min height 44–48px.
- **Primary:** Navy fill, mist text; gold fill reveal on hover via magnetic animation.
- **Secondary:** Transparent, navy hairline border.
- **Gold:** Gold fill, navy text — rare emphasis.
- **Focus:** Gold outline, 2px offset.

### Work cards / containers
- **Corner Style:** Square.
- **Background:** Transparent on mist; no nested cards.
- **Border:** None by default; archive rows use top hairline.
- **Facts:** Role, year, contribution, and evidence type visible without hover.

### Inputs / fields (Contact — frozen)
- Hairline borders, mist/paper surfaces, gold focus. Do not restyle as part of Work passes.

### Navigation / chrome (frozen)
- Wordmark, primary links, Menu secondary destinations, Ask trigger, charm corridor. Preserve behaviour and density.

### Named Rules
**The Shared Motion Rule.** Buttons, reveals, and page heroes call `animations/`. Do not invent page-local timelines for Work polish.

## 6. Do's and Don'ts

### Do
- Keep Rapipay, Crowley, and Ghostwriter as the dominant featured three on `/work` and the homepage.
- Group remaining work by contribution; one primary group per project.
- Show role, year, contribution, evidence type on every substantive card.
- Prefer related / different-kind / back-to-index continuation over chronological next.
- Verify desktop and stacked mobile in the same polish pass.

### Don't
- Redesign Homepage, About, Contact, Work Index (`/work`), System (`/system`), featured interiors, nav, footer, Ask, charms, or tokens.
- Reintroduce audience filters unless critique proves scanning fails without them.
- Duplicate projects across Featured and contribution groups.
- Hide critical facts behind hover.
- Replace authored personality with generic premium SaaS styling, cream body, or purple glow.

## 7. Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-08-28 | Parallel HQ is a reference for composure, not a restyle. See `.impeccable/briefs/parallel-layout-review.md`. | Agency conversion IA (pills, Book a call, testimonials, capability menus) fights the hiring-brief job and the freeze. |
| 2026-08-28 | Case-study Frames: billboard still + one caption; outcome title is the one-line proof. Homepage and Work index unchanged. | Single-surface Parallel composition loan. Captions reuse published approach steps — no new claims. |
