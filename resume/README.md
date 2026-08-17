# Recruiter resume

Single source of truth for the downloadable PDF.

## Source

- `resume-data.ts` — structured content (roles, dates, bullets, education, tools)
- `ResumeDocument.tsx` — A4 layout for `@react-pdf/renderer`
- `RESUME_DATA_GAPS.md` — facts not verified in the portfolio repository

Do not maintain a second copy of resume prose in the app. Contact fields import from `lib/site.ts`.

## Generate

```bash
npm run resume:pdf
```

Writes `public/raghvendra-singh-resume.pdf`.

`npm run build` runs this first so production always ships the generated file.

## Rules

- Maximum 2 pages, A4, selectable text, clickable URLs
- No headshot, skill bars, icons, or infographic layout
- Employer vs client/project work must stay distinct
- Do not add Porsche, metrics, or employers that are not in this repo
