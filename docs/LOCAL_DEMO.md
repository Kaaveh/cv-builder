# Local Demo Guide

> For testers who want to run the MVP locally without deploying anything.

## What this MVP does

CV Builder is a privacy-first CV evaluator. You give it a resume (and
optionally a job description). It scores the resume across six dimensions and
surfaces the most impactful issues to fix:

1. **Shipped Evidence** — does the CV show shipped work?
2. **Quantified Impact** — are outcomes measured (numbers, percentages,
   scale)?
3. **Tooling Visibility** — are the right tools named for the role?
4. **ATS Compatibility** — will applicant tracking systems parse it cleanly?
5. **Keyword Match** — when a JD is provided, does the CV mention the role's
   keywords?
6. **Public Proof** — does the CV link to verifiable work (GitHub, blog,
   portfolio)?

You get:

- An overall score from 0 to 5
- A bar for each dimension
- A list of issues with severity, the why, and a concrete fix
- A list of strengths you can lean into in the interview
- An ATS verdict (compatible or blockers detected)
- The detected role archetype (e.g. Backend Engineer, AI Product Manager)

## What this MVP does NOT do (yet)

- **It does not generate a CV.** No rewriting, no tailoring, no autofill.
- **It does not parse PDFs.** Paste plain text or Markdown. Upload `.txt` or
  `.md` only.
- **It does not have a hosted version.** You run it locally.
- **It does not store anything on a server.** Results live in your browser's
  `localStorage` only.
- **It does not cover every role.** Eight archetypes are built-in (Backend
  Engineer, AI Engineer, AI Product Manager, Frontend Engineer, QA, DevOps,
  Data Engineer, plus a default). If your role isn't there, the detector
  falls back to Backend Engineer.

If any of the above is what you came looking for, see the [Roadmap](../ROADMAP.md)
or open a [feedback issue](https://github.com/TechImmigrants/cv-builder/issues/new).

## How to install

### Prerequisites

- **Node.js 20 or newer** (matches `package.json`)
- **pnpm 9.15 or newer** (`npm install -g pnpm@9.15.0`)
- **git**

### One-time setup

```bash
git clone https://github.com/TechImmigrants/cv-builder
cd cv-builder
pnpm install
```

`pnpm install` resolves all 9 workspaces and downloads dev dependencies
(Next.js, Vitest, Biome, TypeScript). Takes about 30–60 seconds.

## How to run the web UI

```bash
pnpm dev
```

This boots Next.js at **http://localhost:3000**. Open it in your browser.

The home page shows two textareas:

- **CV** — paste your resume. Plain text or Markdown.
- **Job Description** — optional. Paste the JD here to activate the Keyword
  Match dimension.

Click **Evaluate**. The evaluator runs in your browser (no server roundtrip).
The results page shows your score, dimension breakdown, issues, and
strengths. Click **Evaluate another CV** to start over.

### File upload

Below each textarea is a drag-and-drop area. You can drop a `.txt` or `.md`
file and it will load the content into the textarea. PDF upload is not yet
supported — the UI now shows a friendly inline message instead of throwing
an alert.

## How to run the CLI evaluation

The CLI is a thin wrapper around the same evaluator. Useful for batch testing
or for piping output into other tools.

```bash
# Build the CLI once
pnpm --filter @cv-builder/cli build

# Score a CV
node packages/cli/dist/cli.js evaluate /path/to/your-cv.md

# Score against a JD
node packages/cli/dist/cli.js evaluate /path/to/your-cv.md --jd /path/to/jd.md

# Machine-readable JSON output
node packages/cli/dist/cli.js evaluate /path/to/your-cv.md --format json

# List the archetypes the evaluator can detect
node packages/cli/dist/cli.js archetypes

# Help
node packages/cli/dist/cli.js help
```

The CLI uses the same color-coded scoring the web UI uses. Use `--format json`
to pipe into `jq` or other tools.

## Sample CV to test with

The repo ships five golden fixtures under `packages/eval/fixtures/`. To demo
with a known-good CV:

```bash
cat packages/eval/fixtures/swe-strong/resume.md
```

To demo with a weak CV (tables, no metrics):

```bash
cat packages/eval/fixtures/swe-weak-table/resume.md
```

Or copy one into the web UI's CV textarea and click Evaluate.

## Expected result shape

The evaluator returns this shape:

```ts
type EvaluationResult = {
  score: number;               // 0–5, weighted average across dimensions
  dimensions: Array<{          // 6 dimensions, score/maxScore/weight/feedback
    name: string;
    score: number;             // 0–5
    maxScore: number;          // always 5 today
    weight: number;            // archetype-specific, sums to ~1.0
    feedback: string;          // optional human-readable note
  }>;
  strengths: string[];         // bullet points to lean into in the interview
  issues: Array<{              // things to fix, severity-ordered
    element: string;           // the rule name (e.g. "Excessive CV length")
    why: string;               // 1-sentence reasoning
    fix: string;               // concrete suggested fix
    severity: "critical" | "major" | "minor";
  }>;
  archetype: {                 // detected role, used to weight dimensions
    id: string;
    name: string;
  };
  atsCompatible: boolean;      // false if tables or smart quotes detected
  rewrites: Rewrite[];         // current evaluator output
};
```

A typical score breakdown looks like:

```text
CV Score: 2.3/5
Archetype: Backend Engineer

Dimensions:
  Shipped Evidence    █░░░░ 1/5
  Quantified Impact   ██░░░ 2/5
  Tooling Visibility  ██░░░ 2/5
  ATS Compatibility   █████ 5/5
  Keyword Match       ███░░ 3/5
  Public Proof        ██░░░ 2/5

Strengths:
  ✓ Uses quantified metrics
  ✓ Links to public code

ATS Compatible: ✓ Yes
```

A weak CV scores lower on the same dimensions, and typically shows ATS
incompatibility plus 1–3 issues (e.g. "Excessive CV length", "Inconsistent
date formats", "Outdated tool without modern stack").

## Running the test suite

```bash
pnpm test                # all packages
pnpm --filter @cv-builder/core test   # 21 evaluator + rules tests
pnpm --filter @cv-builder/eval test   # 21 fixture-driven tests
pnpm lint                # biome check, expect 0 errors
pnpm build               # all 6 packages build
```

If all five commands pass, the MVP is healthy.

## Troubleshooting

### `pnpm install` complains about lockfile

The lockfile is `pnpm-lock.yaml`. If you've switched pnpm versions you may
need:

```bash
pnpm install --no-frozen-lockfile
```

Don't commit the regenerated lockfile unless the change is intentional.

### `pnpm dev` fails with "Cannot find module"

Run `pnpm install` again. If that doesn't help, `rm -rf node_modules && pnpm install`.

### Web UI loads but Evaluate returns 0 dimensions or NaN

Check the browser console. Common causes:

- The CV is empty (the form rejects empty CVs with an alert)
- The CV has unsupported characters that crash the parser (very rare;
  `TextStats` shows char/word counts so you can confirm the textarea is
  populated)

### CLI says "Cannot find module @cv-builder/core"

The CLI uses workspace dependencies. Make sure you ran `pnpm install` from
the repo root, not from inside `packages/cli/`.

### Lint reports errors

Run `pnpm format` to auto-fix formatting. If real lint
errors remain (not formatting), read the message — they're usually about
unused imports or non-null assertions.

### Build fails on the web UI

Check that `apps/web-ui/out/` is writable. If you have an old `out/` from a
previous build, delete it.

## Privacy reminders

- **The web UI does not upload anything.** Everything runs in your browser.
- **The CLI does not upload anything.** It reads files locally and prints to
  stdout.
- **Do not paste your real CV into GitHub issues.** GitHub issues are public.
  Anonymize first — see [FEEDBACK_GUIDE.md](FEEDBACK_GUIDE.md).
- **Results in the web UI live in `localStorage`.** Clearing browser data
  wipes them. There is no cloud sync.

## What to test

If you want to help, here are a few high-value things to try:

1. **Run the same CV twice with different JDs.** Does the Keyword Match
   score change? Does the archetype stay the same?
2. **Try a CV in your native language.** The keyword detector is
   English-first; non-English CVs may give odd scores.
3. **Drag a `.txt` of your own CV.** Does the file upload work? Does the
   score feel right?
4. **Drag a PDF.** You should see a friendly inline message instead of an
   alert.
5. **Refresh the page after evaluating.** Does the result survive a reload?
   (It should — it's in `localStorage`.)
6. **Open `/results` directly in the URL bar.** Do you see the empty state
   with a back link?

Report what you find at
https://github.com/TechImmigrants/cv-builder/issues/new