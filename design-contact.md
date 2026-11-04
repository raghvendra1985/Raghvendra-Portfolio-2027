# Design System Inspired by Charlie Hills

> Auto-extracted from `https://charliehills.ai/work-with-me` on 2026-11-01

## 1. Visual Theme & Atmosphere

Friendly, approachable design with rounded shapes and generous whitespace.

The hero section leads with "Work With Me" followed by "THE SHORT ANSWERPut your product in front of marketers and founders who use AI every day. Sponsor th".

**Key Characteristics:**
- SF Pro Display as the heading font
- Space Grotesk as the body font for all running text
- Heading weight 600, letter-spacing -2.112px
- Light/white background (#ffffff) as the primary canvas
- Primary accent `#0071e3` used for CTAs and brand highlights
- 2 shadow level(s) detected — tinted shadows
- Rounded corners (28px+) creating a friendly, approachable feel
- Tags: light, rounded, colorful, bold-typography, sans-serif

## 2. Color Palette & Roles

### Primary
- **Primary Accent** (`#0071e3`) · `--color-primary`: Brand color, CTA backgrounds, link text, interactive highlights.
- **Secondary Accent** (`#0066cc`) · `--color-secondary`: Secondary brand, hover states, complementary highlights.
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
| 3 | `#ececf0` | `--palette-3` | block | large | text-dark |
| 4 | `#0071e3` | `--palette-4` | button | medium | text-light |
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
| H2 | SF Pro Display | 40px | 600 | 44px | -0.88px |
| H3 | SF Pro Display | 22px | 600 | 27.5px | -0.484px |
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
  background: #ececf0;
  color: #1d1d1f;
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 17px;
  font-weight: 400;
  border: 1px solid rgba(0, 0, 0, 0.08);
  cursor: pointer;
}
```

### Filled Button

```css
.btn-filled {
  background: #0071e3;
  color: #ffffff;
  border-radius: 28px;
  padding: 9px 16px;
  font-size: 13px;
  font-weight: 700;
  border: 1px solid rgb(0, 113, 227);
  cursor: pointer;
}
```

### Filled Button 2

```css
.btn-filled-2 {
  background: #ffffff;
  color: #6e6e73;
  border-radius: 28px;
  padding: 9px 16px;
  font-size: 13px;
  font-weight: 700;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
```

### Pill Button

```css
.btn-pill {
  background: #0071e3;
  color: #ffffff;
  border-radius: 980px;
  padding: 16px 28px;
  font-size: 17px;
  font-weight: 400;
  border: none;
  cursor: pointer;
}
```

## 5. Layout Principles

- **Base spacing unit:** `12px` — use multiples (24px, 36px, 48px, etc.)

### Spacing Scale (extracted from real elements)

| Token | Value | Role |
|---|---|---|
| spacing-1 | `12px` | element |
| spacing-2 | `8px` | element |
| spacing-3 | `2px` | element |
| spacing-4 | `9px` | element |
| spacing-5 | `20px` | element |
| spacing-6 | `16px` | element |
| spacing-7 | `28px` | card |
| spacing-8 | `36px` | card |

### Border Radius Scale

| Token | Value | Element |
|---|---|---|
| radius-card | `28px` | card |
| radius-button | `12px` | button |

## 6. Depth & Elevation

| Level | Shadow | Usage |
|---|---|---|
| High | `rgba(0, 0, 0, 0.08) 8px 8px 16px 0px` | Modals, floating elements |
| Low | `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0...` | Cards, subtle elevation |


## 7. Do's and Don'ts

### Do
- Use `#ffffff` as the primary background color
- Use `SF Pro Display` for all headings and `Space Grotesk` for body text
- Use `#0071e3` as the single dominant accent/CTA color
- Maintain `12px` as the base spacing unit — all gaps should be multiples
- Use rounded corners (`28px`+) consistently for all interactive elements
- Make headlines large and bold — typography is the hero element
- Embrace bold color combinations — playful energy is the point
- Apply the shadow system for elevation — use the extracted shadow values
- Use weight 600 for headings to match the brand's typographic voice

### Don't
- Don't use colors outside the extracted palette without justification
- Don't substitute SF Pro Display/Space Grotesk with generic alternatives
- Don't use irregular spacing — stick to 12px grid
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
- Maintain 12px base unit across breakpoints — only scale multipliers

## 9. Agent Prompt Guide

### Quick Color Reference

```
Background:  #ffffff
Text:        #ffffff
Accent:      #0071e3
Secondary:   #0066cc
Border:      #f5f5f7
```

### Example Prompts

1. "Build a hero section with a `#ffffff` background, `SF Pro Display` heading in `#ffffff`, and a `#0071e3` CTA button with 12px radius."
2. "Create a pricing card using background `#f5f5f7`, border `#f5f5f7`, `Space Grotesk` for text, and 36px padding."
3. "Design a navigation bar — `#ffffff` background, `#ffffff` links, `#0071e3` for active state."
4. "Build a feature grid with 3 columns, 36px gap, each card using the card component style."
5. "Create a footer with `#ffffff` background, `#ffffff` text, and 24px padding."

### Iteration Guide

1. Start with layout structure (sections, grid, spacing)
2. Apply colors from the palette — background first, then text, then accents
3. Set typography — font families, sizes from the type scale, weights
4. Add components — buttons, cards, inputs using the specs above
5. Apply border-radius consistently across all elements
6. Add shadows for depth — use the extracted shadow values, not defaults
7. Check responsive behavior — test mobile and tablet layouts
8. Final pass — verify all colors match, spacing is consistent, fonts are correct
