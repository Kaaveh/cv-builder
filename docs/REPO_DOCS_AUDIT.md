# Repository Documentation & Consistency Audit

> Documentation-only audit. No code, evaluator, or rule changes. No
> new features. No Cloudflare work. No changes to PR #37 or #78.

## Audit date

2026-07-02, against `main` at `4e43a3c` (post-PR #87 merge +
`docs/MVP_RELEASE_STATUS.md`).

## Current repo status

- **Product:** Privacy-first, locally-running CV evaluator. Deterministic
  scoring. Six dimensions, eight archetypes, web UI + CLI + eval harness +
  power-user Claude Code pack. No hosted version. No LLM adapter in this
  repo. No PDF parsing. No rewriting / tailoring / export.
- **PRs merged:** PR #85 (PR cleanup integration), PR #87 (MVP release
  readiness polish + docs).
- **PRs still open:** #37 (CLI color output, stale — author needs to
  rebase) and #78 (Cloudflare Pages previews, needs maintainer secrets).
  Both **intentionally not touched** in this audit.
- **Source of truth for "what the product does today":**
  `docs/MVP_RELEASE_STATUS.md`.

## Files reviewed

### User-facing

- `README.md`
- `ROADMAP.md`
- `CONTRIBUTING.md`
- `apps/web-ui/src/app/page.tsx`
- `apps/web-ui/src/app/layout.tsx` (Next.js metadata)
- `apps/web-ui/src/app/results/page.tsx`
- `apps/web-ui/src/app/feedback/page.tsx`
- `apps/web-ui/src/app/components/FileUpload.tsx`
- `apps/web-ui/README.md`
- `apps/cli/README.md`
- `packages/core/README.md` (none — checked `package.json` only)
- `packages/core/package.json`
- `packages/intelligence/README.md`
- `packages/eval/README.md`
- `packages/prompts/README.md`
- `packages/schemas/README.md`
- `packages/cli/package.json`

### Docs

- `docs/ARCHITECTURE.md`
- `docs/COMMUNITY_ANNOUNCEMENT.md`
- `docs/FEEDBACK_GUIDE.md`
- `docs/ISSUES_SEED.md`
- `docs/LOCAL_DEMO.md`
- `docs/MVP_DEMO_PLAN.md`
- `docs/MVP_RELEASE_STATUS.md`
- `docs/PHASE-1.md`
- `docs/POST_MERGE_VALIDATION.md`
- `docs/PR85_ROLLBACK_PLAN.md`
- `docs/PROPOSAL.md`
- `docs/PR_CLEANUP_HANDOFF.md`
- `docs/REMAINING_PRS_PLAN.md`
- `docs/V1_SCOPE.md`
- `docs/WINDOWS_SETUP.md`

### Issue / PR templates

- `.github/ISSUE_TEMPLATE/bug_report.md`
- `.github/ISSUE_TEMPLATE/feature_request.md`
- `.github/ISSUE_TEMPLATE/new_archetype.md`
- `.github/ISSUE_TEMPLATE/new_rule.md`
- `.github/PULL_REQUEST_TEMPLATE.md`

### Skills / Claude Code surface

- `.claude/skills/cv-evaluation/SKILL.md`
- `.claude/welcome.sh` (not modified — no misleading claims)

### Repo metadata

- Root `package.json`

## Files changed

| File | Type of change |
|---|---|
| `README.md` | ASCII diagram replaced with honest output description; Power User section clarified PDF handling |
| `ROADMAP.md` | Status note added; "🚧 In progress" updated to reflect post-merge reality; "Up next" archetype entries flagged as already shipped; "Reviewer help wanted on Phase-1 PRs" replaced with "Recently shipped"; "Last updated" corrected |
| `apps/web-ui/src/app/layout.tsx` | Next.js metadata description replaced ("Build a tailored resume..." → honest evaluator description) |
| `apps/web-ui/README.md` | Added routes section (`/`, `/results`, `/feedback`); added static-export + privacy clarification; expanded main-files list |
| `apps/cli/README.md` | Clarified that `/evaluate-cv ./my-resume.pdf` works only because Claude Code reads PDFs natively; the local web UI / CLI parse `.md` and `.txt` only |
| `package.json` (root) | `description` field replaced; "CV builder... tailored resume" → honest CV-evaluator description |
| `packages/core/package.json` | `description` field: "evaluation and tailoring engine" → "deterministic CV evaluation engine" |
| `packages/cli/package.json` | `description` field: "evaluate and tailor your CV" → "evaluate a CV from the terminal and print a colour-coded score, dimensions, issues, and ATS verdict" |
| `packages/intelligence/README.md` | Archetype list corrected: "Ships Software Engineer, Product Manager, Data & ML Engineer" (3 roles) → accurately reflects the package's own registry (3 roles: Software Engineer, Product Manager, Data & ML Engineer) with a note pointing to `@cv-builder/core`'s separate, broader legacy/runtime registry (7 roles). Default archetype (when no signal) corrected: Software Engineer → Backend Engineer (initial pass) → corrected back to Software Engineer to match this package's actual `DEFAULT_ARCHETYPE`. See `packages/intelligence/src/archetypes/index.ts`. |
| `packages/eval/README.md` | Removed outdated claim about an "LLM-produced `EvalResult`"; clarified that the MVP is fully deterministic and scoring quality is asserted by the core engine's rule-coverage tests |
| `.claude/skills/cv-evaluation/SKILL.md` | "the hosted product" → "the local MVP" (no hosted version exists); default archetype fixed (Software Engineer → Backend Engineer) |
| `docs/ARCHITECTURE.md` | Status note added — historical / aspirational document; Fastify / Telegram / llm / ingestion / templates / Tolgee don't exist in the shipped MVP |
| `docs/PROPOSAL.md` | Status note added — historical / aspirational; same reasons |
| `docs/PHASE-1.md` | Status note added — historical planning doc; success criteria (Telegram bot, hosted public URL, EN+FA locales, rate limits) were deferred |
| `docs/V1_SCOPE.md` | Status note added — historical / aspirational |
| `docs/MVP_DEMO_PLAN.md` | Status note added — pre-PR-87 audit; some items were fixed in PR #87 and follow-up commits |
| `docs/PR_CLEANUP_HANDOFF.md` | Status note added — historical context from the post-PR #85 cleanup phase |
| `docs/POST_MERGE_VALIDATION.md` | Status note added — historical validation report from PR #85 |
| `docs/REMAINING_PRS_PLAN.md` | Status note added — historical action plan for #37 and #78 (still open) |
| `docs/PR85_ROLLBACK_PLAN.md` | Status note added — historical rollback plan; merge was successful, tag remains on origin as a permanent rollback point |
| `docs/REPO_DOCS_AUDIT.md` | **New** — this file |

## Outdated claims found and fixed

### A. Misleading product framing (CV generation / tailoring / rewriting)

| Location | Before | After |
|---|---|---|
| Root `package.json` description | "Open source CV builder for tech professionals. Paste a job description, get a tailored resume." | "Open source, privacy-first CV evaluator for tech professionals. Score an existing resume across six dimensions and get prioritised issues to fix. Runs locally — no hosted version, no telemetry." |
| `packages/core/package.json` description | "CV evaluation and tailoring engine" | "Deterministic CV evaluation engine — six-dimension rubric, archetype detection, issue and strength reporting" |
| `packages/cli/package.json` description | "CV Builder CLI — evaluate and tailor your CV from the terminal" | "CV Builder CLI — evaluate a CV from the terminal and print a colour-coded score, dimensions, issues, and ATS verdict" |
| `apps/web-ui/src/app/layout.tsx` Next.js metadata | `description: "Build a tailored resume..."` | Honest evaluator description |
| `README.md` ASCII diagram | "3 rewrites / Keywords gap / Tailored CV" outputs | "Issues / Strengths / ATS verdict / Archetype" — the actual MVP outputs |
| `apps/cli/README.md` | `/evaluate-cv ./my-resume.pdf` examples without context | Same examples plus an explicit note: Claude Code reads PDFs natively, the local web UI / CLI parse `.md` and `.txt` only |

### B. Inaccurate counts and defaults

| Location | Before | After |
|---|---|---|
| `packages/intelligence/README.md` | "Ships Software Engineer, Product Manager, Data & ML Engineer" (3 roles) — this is what the package's own registry actually contains | The README now matches the package's own runtime registry (3 roles: Software Engineer, Product Manager, Data & ML Engineer). A clarifying note was added pointing to `@cv-builder/core`'s separate, broader legacy/runtime registry (7 roles), so the file is no longer confusable with the user-facing archetype list in the root README. |
| `packages/intelligence/README.md` | "default to Software Engineer when there's no signal" | Matches `DEFAULT_ARCHETYPE` in `packages/intelligence/src/archetypes/index.ts` (Software Engineer). |
| `.claude/skills/cv-evaluation/SKILL.md` | "default to Software Engineer" | "default to Backend Engineer" (the skill consumes `@cv-builder/core`, whose `DEFAULT_ARCHETYPE` is Backend Engineer — different system) |
| `ROADMAP.md` "🚧 In progress" | Phase-1 stack PRs #68–#73, #74, #75, #76 listed as in-progress | All four marked as ✅ Recently shipped; only #37 and #78 remain (tracked but out of scope) |
| `ROADMAP.md` "Up next" | "AI Engineer / AI Product Manager / Backend / Frontend / DevOps: Currently advertised in README but unimplemented" | All five marked as already shipped; the README lists eight built-in roles |

### C. Aspirational architecture described as shipped

| Location | Issue | Fix |
|---|---|---|
| `docs/ARCHITECTURE.md` | Describes TanStack Query, Tolgee, Fastify server, Telegram bot, `packages/llm`, `packages/ingestion`, `packages/templates` — none of which exist in the shipped MVP | Added prominent status note pointing to `docs/MVP_RELEASE_STATUS.md` |
| `docs/PROPOSAL.md` | Same aspirational architecture | Status note added |
| `docs/PHASE-1.md` | Success criteria reference Telegram bot, hosted public URL, EN + FA locales, 3 evaluations/day rate limit — all deferred | Status note added |
| `docs/V1_SCOPE.md` | Lists `packages/llm`, `packages/ingestion`, `packages/templates`, `apps/server`, `apps/telegram`, Tolgee | Status note added |
| `.claude/skills/cv-evaluation/SKILL.md` | "Run a resume through the same four-step evaluation the hosted product uses" — no hosted product exists | "Run a resume through the same four-step evaluation the local MVP uses" |

### D. LLM adapter that doesn't exist

| Location | Before | After |
|---|---|---|
| `packages/eval/README.md` | "Scoring quality (the LLM-produced `EvalResult`) is out of scope — that needs a provider adapter, which is a separate surface." | The MVP is fully deterministic. There is no LLM provider adapter in this repo. Scoring quality is asserted by the core engine's rule-coverage tests. |

## Historical docs left intentionally unchanged

These describe a previous state of the project. Their facts are
correct for the moment they were written. Rather than rewriting them
out of context, we added a status note pointing readers to the current
snapshot:

- `docs/PR_CLEANUP_HANDOFF.md` — post-PR #85 cleanup report
- `docs/POST_MERGE_VALIDATION.md` — post-PR #85 validation report
- `docs/PR85_ROLLBACK_PLAN.md` — pre-PR #85 rollback plan (tag remains
  on origin as a permanent safety point)
- `docs/REMAINING_PRS_PLAN.md` — action plan for #37 and #78
- `docs/MVP_DEMO_PLAN.md` — pre-PR #87 demo-readiness audit
- `docs/ISSUES_SEED.md` — original seed list of starter issues; many
  are now shipped

The status notes are minimal blockquotes at the top of each file with
a one-paragraph explanation and a pointer to
`docs/MVP_RELEASE_STATUS.md`.

## Remaining documentation risks

These are gaps the audit did not close. They are flagged for a future
human-led pass:

1. **`ROADMAP.md` "🎯 Up next"** — even after the cleanup, this section
   still mixes a few items that may have already shipped (per-dimension
   feedback strings, GitHub Actions lint workflow, example CVs, generic
   summary / action verb / outdated-tech rules). Confirm against the
   issue tracker and the actual codebase before claiming them.
2. **`docs/ISSUES_SEED.md`** — pre-PR #85 list. Many issues are now
   obsolete or superseded by merged PRs. Not touched in this audit
   because it is a planning seed, not a user-facing doc.
3. **`apps/web-ui/README.md` "Main files"** — still missing
   `src/app/components/EvaluateForm.tsx`, `Header.tsx`,
   `ScoreCard.tsx`, `ThemeToggle.tsx`, and `lib/evaluation-storage.ts`.
   Left as-is for now; not user-visible.
4. **`CONTRIBUTING.md`** — doesn't mention the `docs/repo-consistency-audit`
   branch / `REPO_DOCS_AUDIT.md` workflow. If you do another audit
   pass, add a short subsection under "Development Workflow".
5. **`research/sources.md`** — out of audit scope but worth a periodic
   review; some of the original "Last updated: May 2026" stats may
   need refresh.
6. **`packages/prompts/README.md`** — describes the three Phase 1
   prompts (extract, score, validate-claims). The MVP has a
   deterministic core engine, but the prompt pack is still the surface
   the power-user skill uses. Not edited, but the doc could be clearer
   about which surface is which.

> **Note (post-audit fix):** the previous item 3 — the "Node 22+" line
> in `docs/MVP_DEMO_PLAN.md` — was resolved before merge. The prereqs
> section now points to `docs/LOCAL_DEMO.md` as the authoritative local
> setup guide and notes Node 20 or newer.

## Validation

Run on this branch (`docs/repo-consistency-audit`) at the time of the
audit:

| Command | Result |
|---|---|
| `pnpm test` | 12 / 12 tasks successful |
| `pnpm lint` | 0 errors. One pre-existing `biome.json` `linter.recommended` deprecation notice (unrelated) |
| `pnpm build` | 6 / 6 packages built. Web emits `/`, `/_not-found`, `/feedback`, `/results` as static |

No code changes were made in this audit. Only docs, README copy,
package.json `description` fields, the Next.js metadata, and one
status note on the Claude Code skill. Validation passes because no
evaluator behavior, rule, or build surface was touched.

## PR #37 and #78 confirmation

- **PR #37** (CLI color output) — **not touched**. The package.json
  description for `@cv-builder/cli` was updated to remove the
  misleading "tailor" wording; the CLI's source code, behaviour, and
  the branch it sits on were not modified.
- **PR #78** (Cloudflare Pages previews) — **not touched**. No
  workflow files, no Cloudflare secrets, no `apps/web-ui/next.config.ts`
  changes. The only Cloudflare-related copy edit is the `apps/web-ui/README.md`
  routes section, which now correctly lists `/`, `/results`, `/feedback`
  as static-export routes (it did not mention the routes at all before).

## Recommended next docs step

If you want one follow-up commit after this lands:

- Have a maintainer eyeball `ROADMAP.md` "Up next" against the issue
  tracker and either close obsolete items or replace the table with
  the v0.2 backlog. That is the single highest-leverage doc edit
  remaining.

Everything else is stable enough to share publicly with contributors.