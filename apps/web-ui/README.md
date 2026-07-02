# CV Builder Web

This package contains the Next.js web app for **CV Builder** — a privacy-first
local-only CV evaluator. The web UI runs the deterministic evaluator
(`@cv-builder/core`) entirely in the browser; nothing is sent to a server.

This is the **community MVP**: it scores an existing resume, it does not
generate, tailor, or rewrite one. PDF parsing, hosted deployment, and rewrite
suggestions are out of scope for this surface and tracked on the roadmap.

## Routes (static export)

- `/` — paste a CV (and optional JD), click Evaluate
- `/results` — score, per-dimension bars, archetype, ATS verdict, issues, strengths
- `/feedback` — community feedback guide with an anonymisation checklist

## Local development

From `packages/web`, run:

```bash
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command      | Purpose                    |
| ------------ | -------------------------- |
| `pnpm dev`   | Start the local dev server |
| `pnpm build` | Build the production app (static export) |
| `pnpm start` | Run the production build   |
| `pnpm lint`  | Run lint checks            |

## Main files

- `src/app/layout.tsx` - app shell, theme provider, and metadata
- `src/app/page.tsx` - homepage (paste form)
- `src/app/results/page.tsx` - evaluation results view
- `src/app/feedback/page.tsx` - feedback guide
- `src/app/globals.css` - global styles
