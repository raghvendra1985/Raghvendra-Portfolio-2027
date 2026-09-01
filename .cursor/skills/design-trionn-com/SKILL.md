---
name: design-trionn-com
description: Design system extracted from TRIONN (https://trionn.com/). Use when building UI that should match this brand's visual identity — dark cinematic chrome, Familjen headings, Neue Haas body, grayscale plus #888888 accent.
triggers:
  - "TRIONN"
  - "trionn-com"
  - "design like TRIONN"
  - "TRIONN風"
source: https://trionn.com/
extractedAt: 2026-09-01T15:25:43.231Z
tags: ["dark", "soft", "monochrome", "bold-typography", "monospace", "sans-serif"]
---

# Design System Inspired by TRIONN

> Auto-extracted from `https://trionn.com/` on 2026-09-01

## Scope on this repository

This skill is **TRIONN's identity**, not the live portfolio.

raghvendrasingh.com chrome is frozen in [`DESIGN.md`](../../../DESIGN.md) and [`styles/tokens.css`](../../../styles/tokens.css): navy `#0B1849`, mist `#EBEDE3`, green `#124D1C`, gold `#E4B028`, Bricolage Grotesque + Manrope, square buttons.

Do **not** remap those tokens, restyle Homepage / About / Work / System / nav / footer, or load Familjen/Neue Haas on the public site unless the user explicitly asks to restyle the portfolio to TRIONN.

Use this skill when the user asks to design *like TRIONN*, to prototype a TRIONN-adjacent surface, or to compare motion/type against that reference.

## 1. Visual Theme & Atmosphere

Refined dark mode with muted tones — cinematic and premium.

The hero section leads with "Designed to".

**Key Characteristics:**

- familjen as the heading font (custom web font loaded via @font-face)
- neueHaas as the body font for all running text
- Heading weight 400, letter-spacing -5.4px
- Dark background (`#040508`) as the primary canvas
- Primary accent `#888888` used for CTAs and brand highlights
- Moderate border-radius (7.2px) — balanced and professional
- Tags: dark, soft, monochrome, bold-typography, monospace, sans-serif

## 2. Color Palette & Roles

### Primary

- **Primary Accent** (`#888888`) · `--color-primary`: Brand color, CTA backgrounds, link text, interactive highlights.
- **Secondary Accent** (`#aaaaaa`) · `--color-secondary`: Secondary brand, hover states, complementary highlights.
- **Background** (`#040508`) · `--color-bg`: Page background, primary canvas.
- **Background Secondary** (`#ffffff`) · `--color-bg-secondary`: Cards, surfaces, alternating sections.

### Text

- **Text Primary** (`#d8d8d8`) · `--color-text`: Headings and body text.
- **Text Secondary** (`#434343`) · `--color-text-secondary`: Muted text, captions, placeholders.

### Borders & Surfaces

- **Border** (`#d2d2d2`) · `--color-border`: Dividers, outlines, input borders.

### Full Extracted Palette

| # | Hex | CSS Variable | Role | Area | Contrast |
|---|---|---|---|---|---|
| 1 | `#d2d2d2` | `--palette-1` | block | large | text-dark |
| 2 | `#ffffff` | `--palette-2` | section | large | text-dark |
| 3 | `#272727` | `--palette-3` | block | large | text-light |
| 4 | `#e6e4e2` | `--palette-4` | block | large | text-dark |
| 5 | `#2f3135` | `--palette-5` | block | large | text-light |
| 6 | `#434343` | `--palette-6` | badge | small | text-light |

## 3. Typography Rules

- **Heading Font:** `familjen` (web font). On the open web, **Familjen Grotesk** (Google Fonts) is the licensed stand-in when the proprietary face is unavailable.
- **Body Font:** `neueHaas` (web font). Neue Haas Grotesk is commercial — fallback stack: `"Neue Haas Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif`. Do not pretend Inter/Manrope *are* Neue Haas; name the fallback.

### Type Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| H1 | familjen | 90px | 400 | 81px | -5.4px |
| H2 | familjen | 85.5072px | 400 | 81px | -5.13043px |
| H3 | familjen | 32.4px | 400 | 32.4px | -1.296px |
| Body | neueHaas | 16.2px | 400 | normal | normal |
| Small | familjen | 12.6px | 400 | 12.6px | -0.252px |
| Code | neueHaas | 14.4px | 400 | normal | normal |

Scale ~80% below 640px. Prefer `clamp()` rather than locking 90px on mobile.

### Type Scale

| Token | Size | Suggested Usage |
|---|---|---|
| Display | `131.962px` | headings |
| H1 | `90px` | headings |
| H2 | `85.5072px` | headings |
| H3 | `50.4px` | headings |
| H4 | `32.4px` | headings |
| Body L | `27px` | body / supporting text |
| Body | `18px` | body / supporting text |
| Small | `16.2px` | body / supporting text |
| XS | `15.3072px` | body / supporting text |
| Caption | `14.4px` | body / supporting text |

## 4. Component Stylings

### Primary Button

```css
.btn-primary {
  background: #ffffff;
  color: #d8d8d8;
  border-radius: 9999px;
  padding: 5.4px 14.4px;
  font-size: 15.3072px;
  font-weight: 400;
  border: 1px solid rgb(255, 255, 255);
  cursor: pointer;
}
```

Extracted primary is white-on-white-ish — verify contrast on the real TRIONN CTA before shipping. Prefer white fill on `#040508` with ink `#434343` or `#040508` if the live button reads dark-on-light.

### Ghost Button

```css
.btn-ghost {
  background: transparent;
  color: #d8d8d8;
  border-radius: 0px;
  padding: 0px 0px;
  font-size: 12.6px;
  font-weight: 400;
  border: none;
  cursor: pointer;
}
```

### Ghost Button 2

```css
.btn-ghost-2 {
  background: transparent;
  color: #434343;
  border-radius: 0px;
  padding: 0px 0px;
  font-size: 12.6px;
  font-weight: 400;
  border: none;
  cursor: pointer;
}
```

### Outline Button

```css
.btn-outline {
  background: transparent;
  color: #434343;
  border-radius: 7.2px;
  padding: 10.8px 14.4px;
  font-size: 16.2px;
  font-weight: 400;
  border: 1px solid oklab(0.382876 0.0000174642 0.0000076592 / 0.15);
  cursor: pointer;
}
```

### Filled Button

```css
.btn-filled {
  background: #e6e4e2;
  color: #434343;
  border-radius: 7.2px;
  padding: 14.4px 36px;
  font-size: 12.6px;
  font-weight: 400;
  border: 1px solid rgb(39, 39, 39);
  cursor: pointer;
}
```

### Card

```css
.card {
  background: #272727;
  border-radius: 7.2px;
  padding: 0px;
}
```

## 5. Layout Principles

- **Base spacing unit:** `36px` — use multiples (72px, 108px, 144px, etc.)

### Spacing Scale (extracted from real elements)

| Token | Value | Role |
|---|---|---|
| spacing-1 | `36px` | card |
| spacing-2 | `14.4px` | element |
| spacing-3 | `5.4px` | element |
| spacing-4 | `21.6px` | element |
| spacing-5 | `72px` | section |
| spacing-6 | `57.6px` | card |
| spacing-7 | `135px` | section |
| spacing-8 | `108px` | section |

### Border Radius Scale

| Token | Value | Element |
|---|---|---|
| radius-button | `7.2px` | button |
| radius-pill | `9999px` | primary CTA |
| radius-subtle | `3.6px` / `2px` | subtle |

## 6. Depth & Elevation

No prominent box-shadows detected. Use flat surfaces with borders or background color changes for depth.

## 7. Do's and Don'ts

### Do

- Use `#040508` as the primary background color
- Use `familjen` for all headings and `neueHaas` for body text
- Use `#888888` as the single dominant accent/CTA color
- Maintain `36px` as the base spacing unit — all gaps should be multiples
- Keep the overall feel dark — use dark surfaces throughout
- Make headlines large and quiet (weight 400) — typography is the hero
- Stick to grayscale + `#888888` accent — avoid color overload
- Touch targets: minimum 44×44px on mobile

### Don't

- Don't use colors outside the extracted palette without justification
- Don't substitute familjen/neueHaas with generic alternatives *silently* — if licensed faces are missing, document the fallback
- Don't use irregular spacing — stick to the 36px grid
- Don't introduce bright white surfaces as the *default* canvas — they break the dark palette (alternating sections may still use `#ffffff` / `#e6e4e2`)
- Don't add additional saturated colors beyond the primary accent (`#007aff` in `--swiper-theme-color` is a third-party default, not brand)
- Don't use pure black (`#000000`) for text — use `#d8d8d8` on dark, `#434343` on light
- Don't add decorative badges, ribbons, banners, or ornaments the source site does not use
- Don't invent UI patterns the source site doesn't have

## 8. Responsive Behavior

| Breakpoint | Width | Notes |
|---|---|---|
| Mobile | < 640px | Single column, stack sections, reduce font sizes ~80% |
| Tablet | 640–1024px | 2-column where appropriate, maintain spacing ratios |
| Desktop | 1024–1440px | Full layout as designed |
| Wide | > 1440px | Max-width container, center content |

- Maintain 36px base unit across breakpoints — only scale multipliers

## 9. Agent Prompt Guide

### Quick Color Reference

```
Background:  #040508
Text:        #d8d8d8
Accent:      #888888
Secondary:   #aaaaaa
Border:      #d2d2d2
```

### Example Prompts

1. "Build a hero section with a `#040508` background, `familjen` heading in `#d8d8d8`, and a `#888888` CTA button with 9999px radius."
2. "Create a pricing card using background `#ffffff`, border `#d2d2d2`, `neueHaas` for text, and 108px padding."
3. "Design a navigation bar — `#040508` background, `#d8d8d8` links, `#888888` for active state."
4. "Build a feature grid with 3 columns, 108px gap, each card using the card component style."
5. "Create a footer with `#ffffff` background, `#d8d8d8` text, and 72px padding."

### Iteration Guide

1. Start with layout structure (sections, grid, spacing)
2. Apply colors from the palette — background first, then text, then accents
3. Set typography — font families, sizes from the type scale, weights
4. Add components — buttons, cards, inputs using the specs above
5. Apply border-radius consistently across all elements
6. Check responsive behavior — test mobile and tablet layouts
7. Final pass — verify all colors match, spacing is consistent, fonts are correct

## 10. CSS Custom Properties

> 21 custom properties extracted from `:root` / `html` stylesheets.

### Color Variables

| Variable | Value |
|---|---|
| `--pl-black` | `#000` |
| `--pl-white` | `#fff` |
| `--pl-panel-gray` | `#c8c8c8` |
| `--pl-line-gray` | `#434343` |
| `--bg` | `#040508` |
| `--white` | `#fff` |
| `--ink-soft` | `#0a0a0a8c` |
| `--glass-line` | `#ffffff2e` |
| `--ts-color-bg` | `#040508` |
| `--ts-color-hint` | `#d8d8d8bf` |
| `--ts-color-name` | `#c8c8c8` |
| `--ts-color-role` | `#d8d8d880` |
| `--ts-color-scan-id` | `#d8d8d8bf` |
| `--ts-color-detected` | `#d8d8d8eb` |
| `--swiper-theme-color` | `#007aff` |

### Spacing Variables

| Variable | Value |
|---|---|
| `--size` | `320` |
| `--swiper-navigation-size` | `44px` |

### Other Variables

| Variable | Value |
|---|---|
| `--pl-corner-plus-offset` | `calc(-6px - 6.5px)` |
| `--pl-mono` | `"Space Mono", monospace` |
| `--pl-display` | `"Bebas Neue", sans-serif` |
| `--ease-soft` | `cubic-bezier(.22, 1, .36, 1)` |

`--pl-display: Bebas Neue` appears in a parallel track on the source site. Prefer **familjen** for headings unless the user asks for the condensed display lane.

## 11. Motion

- Easing: `--ease-soft: cubic-bezier(.22, 1, .36, 1)`
- Keep motion on transform/opacity. No bounce, glow, particles, or perpetual loops.
- On this portfolio, still route motion through `animations/` — do not add page-local theatre even on a TRIONN-inspired prototype.
