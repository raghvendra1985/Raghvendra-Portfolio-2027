---
name: design-charliehills-ai
description: Design system extracted from About Charlie Hills (https://charliehills.ai/about). Use when building UI that should match this brand's visual identity.
triggers:
  - "About Charlie Hills"
  - "charliehills-ai"
  - "design like About Charlie Hills"
  - "About Charlie Hills風"
source: https://charliehills.ai/about
extractedAt: 2026-11-01T05:19:59.061Z
tags: ["light", "rounded", "colorful", "bold-typography", "sans-serif"]
---
# Design System Inspired by About Charlie Hills

> Auto-extracted from `https://charliehills.ai/about` on 2026-11-01

## 1. Visual Theme & Atmosphere

Friendly, approachable design with rounded shapes and generous whitespace.

The hero section leads with "About Charlie Hills" followed by "WHO IS CHARLIE HILLS?I’m Charlie Hills, an AI content creator in London. I write MarTech AI, a weekl".

**Key Characteristics:**
- SF Pro Display as the heading font
- Space Grotesk as the body font for all running text
- Heading weight 600, letter-spacing -2.112px
- Light/white background (#ffffff) as the primary canvas
- Primary accent `#0071e3` used for CTAs and brand highlights
- 5 shadow level(s) detected — tinted shadows
- Rounded corners (28px+) creating a friendly, approachable feel
- Tags: light, rounded, colorful, bold-typography, sans-serif

## 2. Color Palette & Roles

### Primary
- **Primary Accent** (`#0071e3`) · `--color-primary`: Brand color, CTA backgrounds, link text, interactive highlights.
- **Secondary Accent** (`#3366ff`) · `--color-secondary`: Secondary brand, hover states, complementary highlights.
- **Background** (`#ffffff`) · `--color-bg`: Page background, primary canvas.
- **Background Secondary** (`#f5f5f7`) · `--color-bg-secondary`: Cards, surfaces, alternating sections.

### Text
- **Text Primary** (`#ffffff`) · `--color-text`: Headings and body text.
- **Text Secondary** (`#666666`) · `--color-text-secondary`: Muted text, captions, placeholders.

### Borders & Surfaces
- **Border** (`#f5f5f7`) · `--color-border`: Dividers, outlines, input borders.

### Full Extracted Palette

| # | Hex | CSS Variable | Role | Area | Contrast |
|---|---|---|---|---|---|
| 1 | `#ffffff` | `--palette-1` | block | large | text-dark |
| 2 | `#f5f5f7` | `--palette-2` | section | large | text-dark |
| 3 | `#0071e3` | `--palette-3` | button | small | text-light |
| 4 | `#3366ff` | `--palette-4` | button | small | text-light |
| 5 | `#12805c` | `--palette-5` | badge | small | text-light |
| 6 | `#8a3fc7` | `--palette-6` | badge | small | text-light |
| 7 | `#0066cc` | `--palette-7` | text-accent | small | text-light |

## 3. Typography Rules

- **Heading Font:** `SF Pro Display`, sans-serif
- **Body Font:** `Space Grotesk` (web font)

### Type Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| H1 | SF Pro Display | 96px | 600 | 86.4px | -2.112px |
| H2 | SF Pro Display | 80px | 600 | 80px | -1.76px |
| H3 | SF Pro Display | 21px | 600 | 31.5px | -0.462px |
| Body | SF Pro Text | 12px | 600 | 18px | 2.16px |
| Code | SF Pro Text | 16px | 400 | 24px | normal |

### Type Scale

| Token | Size | Suggested Usage |
|---|---|---|
| Display | `96px` | headings |
| H1 | `80px` | headings |
| H2 | `40px` | headings |
| H3 | `26px` | headings |
| H4 | `22px` | headings |
| Body L | `21px` | body / supporting text |
| Body | `19px` | body / supporting text |
| Small | `17px` | body / supporting text |
| XS | `16px` | body / supporting text |
| Caption | `15px` | body / supporting text |

## 4. Component Stylings

### Primary Button

```css
.btn-primary {
  background: #3366ff;
  color: #1d1d1f;
  border-radius: 50px;
  padding: 0px 0px;
  font-size: 16px;
  font-weight: 400;
  border: none;
  cursor: pointer;
}
```

## 5. Layout Principles

- **Base spacing unit:** `24px` — use multiples (48px, 72px, 96px, etc.)

### Spacing Scale (extracted from real elements)

| Token | Value | Role |
|---|---|---|
| spacing-1 | `24px` | card |
| spacing-2 | `12px` | element |
| spacing-3 | `20px` | element |
| spacing-4 | `28px` | card |
| spacing-5 | `9px` | element |
| spacing-6 | `16px` | element |
| spacing-7 | `8px` | element |
| spacing-8 | `10px` | element |

### Border Radius Scale

| Token | Value | Element |
|---|---|---|
| radius-card | `28px` | card |
| radius-card | `50px` | card |
| radius-card | `24px` | card |

## 6. Depth & Elevation

| Level | Shadow | Usage |
|---|---|---|
| High | `rgba(0, 0, 0, 0.08) 8px 8px 16px 0px` | Modals, floating elements |
| Low | `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0...` | Cards, subtle elevation |
| Low | `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0...` | Cards, subtle elevation |
| Low | `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0...` | Cards, subtle elevation |
| Low | `rgba(255, 255, 255, 0.35) 0px 1px 0px 0px inset` | Cards, subtle elevation |


## 7. Do's and Don'ts

### Do
- Use `#ffffff` as the primary background color
- Use `SF Pro Display` for all headings and `Space Grotesk` for body text
- Use `#0071e3` as the single dominant accent/CTA color
- Maintain `24px` as the base spacing unit — all gaps should be multiples
- Use rounded corners (`28px`+) consistently for all interactive elements
- Make headlines large and bold — typography is the hero element
- Embrace bold color combinations — playful energy is the point
- Apply the shadow system for elevation — use the extracted shadow values
- Use weight 600 for headings to match the brand's typographic voice

### Don't
- Don't use colors outside the extracted palette without justification
- Don't substitute SF Pro Display/Space Grotesk with generic alternatives
- Don't use irregular spacing — stick to 24px grid
- Don't use dark/black backgrounds — this is a light-themed design
- Don't use sharp corners — they feel hostile in this rounded design language
- Don't use pure black (#000000) for text — use `#ffffff` instead
- Don't add decorative elements not present in the original design — no badges, ribbons, banners, or ornaments unless the source site uses them
- Don't invent UI patterns the source site doesn't have — if the original has no NEW badge, don't add one just because a red is in the palette

## 8. Responsive Behavior

| Breakpoint | Width | Notes |
|---|---|---|
| Mobile | < 640px | Single column, stack sections, reduce font sizes ~80% |
| Tablet | 640–1024px | 2-column where appropriate, maintain spacing ratios |
| Desktop | 1024–1440px | Full layout as designed |
| Wide | > 1440px | Max-width container, center content |

- Touch targets: minimum 44×44px on mobile
- Maintain 24px base unit across breakpoints — only scale multipliers

## 9. Agent Prompt Guide

### Quick Color Reference

```
Background:  #ffffff
Text:        #ffffff
Accent:      #0071e3
Secondary:   #3366ff
Border:      #f5f5f7
```

### Example Prompts

1. "Build a hero section with a `#ffffff` background, `SF Pro Display` heading in `#ffffff`, and a `#0071e3` CTA button with 50px radius."
2. "Create a pricing card using background `#f5f5f7`, border `#f5f5f7`, `Space Grotesk` for text, and 72px padding."
3. "Design a navigation bar — `#ffffff` background, `#ffffff` links, `#0071e3` for active state."
4. "Build a feature grid with 3 columns, 72px gap, each card using the card component style."
5. "Create a footer with `#ffffff` background, `#ffffff` text, and 48px padding."

### Iteration Guide

1. Start with layout structure (sections, grid, spacing)
2. Apply colors from the palette — background first, then text, then accents
3. Set typography — font families, sizes from the type scale, weights
4. Add components — buttons, cards, inputs using the specs above
5. Apply border-radius consistently across all elements
6. Add shadows for depth — use the extracted shadow values, not defaults
7. Check responsive behavior — test mobile and tablet layouts
8. Final pass — verify all colors match, spacing is consistent, fonts are correct
