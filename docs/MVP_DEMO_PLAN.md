# MVP Demo Plan

> Goal: prepare the current CV Builder for a simple public demo.
> Source: post-merge `main` at `6170aef`. PRs #37 and #78 not in scope.

## What currently works

### Web UI (`apps/web-ui/`)

- Home page renders at `/` with two textareas (CV + JD), each accepting paste
  or `.txt`/`.md` file upload (PDF is gated with an alert — not yet
  implemented).
- An "Evaluate" button calls `evaluate()` from `@cv-builder/core` directly in
  the browser, persists the result to `localStorage`, then routes to
  `/results`.
- `/results` renders the overall score, the strengths list, and the per-
  dimension bars.
- Dark/light theme toggle in the header (default: dark).
- `pnpm dev` boots Next.js locally; `pnpm --filter @cv-builder/web build`
  produces a static export.

### CLI (`packages/cli/`)

- `cv-builder evaluate <cv-file> [--jd <jd-file>] [--format <text|json>]`
  reads files, runs the evaluator, prints a colored score + dimensions +
  strengths + issues + ATS verdict.
- `cv-builder archetypes` lists all role archetypes.
- `cv-builder help` shows usage.
- `cv-builder evaluate --format json` emits machine-readable output (used by
  `packages/eval/` harness).

### Evaluator (`packages/core/`)

- 6-dimension rubric: Shipped Evidence, Quantified Impact, Tooling Visibility,
  ATS Compatibility, Keyword Match, Public Proof.
- 4 rule add-ons (word count, date format, education-first layout, outdated
  tech).
- Auto-detects archetype from CV content; falls back to Backend Engineer.
- Returns `issues[]` with severity (critical/major/minor), `strengths[]`, and
  `atsCompatible` boolean.

### Eval harness (`packages/eval/`)

- 5 golden fixtures: `data-ml-strong`, `pm-strong`, `swe-strong`,
  `swe-weak-table`, `swe-with-jd` — each with a `resume.md` (and some with a
  `jd.md`) and an `expected.json` capturing the expected score / archetype /
  issues.
- `pnpm --filter @cv-builder/eval test` runs all 21 fixture assertions.

## How to run the demo locally

### Prereqs

- Node 22+ (matches the GitHub Actions workflow)
- pnpm 9.15+ (`npm install -g pnpm@9.15.0`)

### One-time setup

```bash
git clone https://github.com/TechImmigrants/cv-builder
cd cv-builder
pnpm install
```

### Web UI demo

```bash
pnpm dev   # starts Next.js at http://localhost:3000
```

Open the URL. The home page shows two textareas. Paste a CV into the left
textarea (or click "Drag & Drop" to upload a `.txt` / `.md`). Optionally paste
a job description on the right. Click "Evaluate". The results page shows the
overall score, dimension bars, and strengths.

To demo with a known-good fixture, copy the contents of
`packages/eval/fixtures/swe-strong/resume.md` into the CV textarea.

### CLI demo

```bash
pnpm --filter @cv-builder/cli build

node packages/cli/dist/cli.js evaluate packages/eval/fixtures/swe-strong/resume.md
node packages/cli/dist/cli.js evaluate packages/eval/fixtures/swe-weak-table/resume.md
node packages/cli/dist/cli.js evaluate packages/eval/fixtures/swe-with-jd/resume.md --jd packages/eval/fixtures/swe-with-jd/jd.md
node packages/cli/dist/cli.js evaluate packages/eval/fixtures/swe-strong/resume.md --format json | less
node packages/cli/dist/cli.js archetypes
node packages/cli/dist/cli.js help
```

Smoke test results on `swe-strong` (run from this branch): `Score 2.3/5,
Archetype Backend Engineer, ATS ✓ Yes`. On `swe-weak-table`: `Score 1.4/5,
ATS ✗ No`. The contrast demonstrates that the evaluator produces different
outputs for different inputs.

### Eval harness demo

```bash
pnpm --filter @cv-builder/eval test   # 21 tests
```

## Current limitations

### A. Misleading marketing copy on the home page

`apps/web-ui/src/app/page.tsx` describes the product as:

> "Tailor your resume to the role without starting from scratch. … Paste a
> job description, highlight the experience that matters, and shape a
> cleaner CV for tech roles in a few quick steps."

The actual product is an **evaluator**, not a CV builder. Steps 2 ("Shape the
story") and 3 ("Export a focused CV") don't exist. A demo visitor reading the
home page will expect to interactively build a CV and won't get that.

Root file: `apps/web-ui/src/app/page.tsx` (lines 13–46). Also `apps/web-ui/src/app/layout.tsx`
metadata `description: "Build a tailored resume..."` (truncated in source).

### B. Results page is incomplete

`apps/web-ui/src/app/results/page.tsx` renders score, strengths, and
dimensions — but **not** the `issues` array (despite the schema producing it
and the CLI showing it). It also does not show ATS compatibility, the
detected archetype, the JD-derived Keyword Match reasoning, or the
dimension weights. Visually, the dimension bars are plain text — no colored
fill, no visual progress bar.

This makes the web UI demo noticeably weaker than the CLI demo for the same
input.

### C. PDF support is gated, not implemented

`FileUpload.tsx` accepts `.pdf` in the `accept` attribute but throws an alert
on selection:

> "PDF text extraction is not yet supported. Please use .txt or .md files."

A casual user who drags a real-world PDF CV will see this alert and may walk
away. Either implement PDF extraction or hide `.pdf` from the accept list
until it's ready.

### D. Empty-state UX for results page

`apps/web-ui/src/app/results/page.tsx` shows "No evaluation found" if the
user lands directly on `/results` without going through the form. There's no
back link to the home page and no CTA to start an evaluation.

### E. No loading skeleton, no progress signal during evaluation

`EvaluateForm.tsx` toggles the button text between "Evaluate" and
"Evaluating..." but provides no other feedback. The evaluate function is
synchronous in-browser, so this is fast — but a "Running checks…" toast or
spinner would feel more polished.

### F. `evaluate()` runs entirely in the browser

This is correct from a privacy standpoint (no data leaves the device), but it
means:
- No telemetry — you can't see how the demo is being used.
- No persistence beyond `localStorage` — refreshing or clearing browser data
  wipes the result.
- No shared state between sessions or devices.

For a public demo this is fine, but worth being explicit about.

### G. No tests for the web UI

`apps/web-ui/package.json` has `"test": "echo 'No tests yet'"`. The web UI
has zero automated tests. Any regression in the demo flow will be discovered
by hand. (Out of scope for "demo readiness" but worth noting.)

### H. README and CONTRIBUTING guide link to a stale structure

`README.md` mentions features and structure that predate the integration.
Specifically the section "Project layout" still describes the pre-#69
single-package layout. Not a blocker, but a fresh visitor will hit dead ends.

## 5 highest-priority fixes before public sharing

These are the changes that would most improve the demo. Each is small, scoped
to the web UI, and does not require schema or evaluator changes.

1. **Fix the home page copy** — replace "Tailor your resume" / "Shape the
   story" / "Export a focused CV" with accurate framing around the actual
   product: "Score your existing CV against a job description. Get a
   per-dimension breakdown and concrete fixes."
   - File: `apps/web-ui/src/app/page.tsx`
   - Estimated diff: ~25 lines
   - Risk: low (cosmetic)

2. **Render `issues[]` on the results page** — the schema produces them, the
   CLI shows them, the web UI silently drops them. Each issue needs:
   `element`, `severity` (color-coded), `why`, `fix`. This is the highest-
   value content gap.
   - File: `apps/web-ui/src/app/results/page.tsx`
   - Estimated diff: ~30 lines, plus a small "Issue" component
   - Risk: low

3. **Render ATS compatibility and detected archetype on results page** —
   these are top-level signals the user wants to see at a glance.
   - File: `apps/web-ui/src/app/results/page.tsx`
   - Estimated diff: ~10 lines
   - Risk: low

4. **Visual dimension bars** — replace the plain text `██░░░ 1/5` rendering
   with a styled progress bar in zinc tones (matching the existing dark-mode
   palette). Mirrors what the CLI does but in HTML/CSS.
   - File: `apps/web-ui/src/app/components/ScoreCard.tsx` and
     `apps/web-ui/src/app/results/page.tsx`
   - Estimated diff: ~20 lines
   - Risk: low

5. **Add a back-link CTA on `/results`** — if the user lands there without
   an evaluation, show "No evaluation yet — go back to the home page" with a
   link to `/`. This catches the "direct URL" case.
   - File: `apps/web-ui/src/app/results/page.tsx`
   - Estimated diff: ~10 lines
   - Risk: low

Total scope for a "demo polish" PR: **~95 lines** across 3 files. Easy to
review, easy to revert.

## Suggested demo script for Sahar

A 5-minute flow that exercises both surfaces and shows the evaluator's
discrimination.

### Pre-demo setup

- Terminal open in repo root, `pnpm dev` already running on
  http://localhost:3000
- Two terminals ready: one for the web UI, one for CLI
- Fixture files open in editor: `packages/eval/fixtures/swe-strong/resume.md`
  and `packages/eval/fixtures/swe-weak-table/resume.md`

### Demo flow (5 minutes)

**1. Intro (30 sec)**

> "CV Builder is a privacy-first CV evaluator. You paste your resume and
> optionally a job description; it scores the resume across six dimensions
> and surfaces the most impactful issues to fix. Nothing leaves your
> browser."

**2. Web UI — strong CV (90 sec)**

- Open http://localhost:3000
- Copy `packages/eval/fixtures/swe-strong/resume.md` content into the CV
  textarea
- (Optional) copy `packages/eval/fixtures/swe-with-jd/jd.md` into the JD
  textarea
- Click "Evaluate"
- Show: score, dimension breakdown, strengths

**3. Web UI — weak CV (90 sec)**

- Hit "back" / open the form again
- Replace the CV textarea with `packages/eval/fixtures/swe-weak-table/resume.md`
- Click "Evaluate"
- Show: lower score, ATS incompatibility, fewer strengths

**4. CLI contrast (60 sec)**

- Switch to terminal
- `node packages/cli/dist/cli.js evaluate packages/eval/fixtures/swe-weak-table/resume.md`
- Show the same input producing a much lower score via the CLI
- `--format json` to demonstrate the machine-readable output

**5. Privacy + closing (30 sec)**

> "The web UI runs the evaluator in your browser. There's no server. The CLI
> runs locally too — no API calls. The eval harness is what we use to test
> the evaluator against golden fixtures."

### What NOT to demo until the polish PR lands

- The "shape the story" / "export" flow implied by the home page copy
- PDF upload (alerts "not supported")
- Long-running evaluations (everything is synchronous in-browser)

## Validation status (re-run on current main)

| Command | Result |
| --- | --- |
| `pnpm install` | OK — "Lockfile is up to date" |
| `pnpm test` (turbo) | 12/12 tasks successful |
| `pnpm lint` | 0 errors, 1 informational notice |
| `pnpm build` | 6/6 packages build; web emits `/`, `/_not-found`, `/results` |
| CLI smoke (strong fixture) | Score 2.3/5, ATS ✓ Yes, 9 keyword matches |
| CLI smoke (weak fixture) | Score 1.4/5, ATS ✗ No, 4 keyword matches |

## Recommendations

- **Demo is local-only ready.** It cannot be shared publicly without
  deploying the web UI. That requires PR #78 (Cloudflare Pages) or a manual
  deploy.
- **The polish PR** (5 small changes above) should land before any demo
  recording is shared. It improves the home page copy, fills the results
  page, and makes the demo experience match what the CLI and schema actually
  deliver.
- **Do not deploy until the polish lands.** First impressions of "CV Builder
  is a CV builder" are hard to walk back.
- **Keep #37 and #78 out of scope for demo prep.** Both are useful but
  unrelated to local demo flow (#37 is CLI cosmetic; #78 is deployment).