# MVP Release Status

> Snapshot of where the CV Builder community MVP is as of the
> post-PR #87 merge on `main`. Keep this file honest. If a section says
> "ready", it has been validated end-to-end on a clean clone.

**Last validated:** 2026-07-02, against `main` at `7a27bbb`
(PR #87 — Prepare CV Builder MVP for community testing).

---

## Current status

The community MVP is **ready for community testing on local machines
only**. The web UI, CLI, eval harness, and golden fixtures all build and
pass tests on a fresh clone. Hosted deployment is intentionally out of
scope for this MVP.

| Surface | Status | Notes |
|---|---|---|
| Core evaluation engine | Ready | 6 dimensions, 7 archetypes, deterministic |
| CLI evaluator | Ready | `pnpm --filter @cv-builder/cli build` then run from `packages/cli/dist/` |
| Web UI (paste + score) | Ready | Static export, `/`, `/results`, `/feedback` |
| Eval harness + fixtures | Ready | 5 golden fixtures under `packages/eval/fixtures/` |
| Documentation | Ready | `LOCAL_DEMO.md`, `FEEDBACK_GUIDE.md`, `COMMUNITY_ANNOUNCEMENT.md` |
| PDF text extraction | **Not ready** | Friendly inline message instead |
| Hosted deployment | **Not ready** | Local demo only |
| LLM-enhanced rewrite mode | **Not ready** | Roadmap v0.2 |

---

## Validation results (post-merge)

Validated on `main` after PR #87 was merged (`7a27bbb`).

| Command | Result |
|---|---|
| `pnpm test` | 12 / 12 turbo tasks successful (5 prompt tests + 21 core + 21 eval + fixtures) |
| `pnpm lint` | 0 errors. Single `info` is the pre-existing `biome.json` `linter.recommended` deprecation — unrelated to this MVP |
| `pnpm build` | 6 / 6 packages built. Web export emits `/`, `/_not-found`, `/feedback`, `/results` as static |

### Web build emits

- `/` — paste a CV (and optional JD), click Evaluate
- `/results` — score, dimensions, archetype, ATS verdict, issues, strengths
- `/feedback` — community feedback guide with anonymization checklist

---

## Local demo instructions

Full guide: [docs/LOCAL_DEMO.md](./LOCAL_DEMO.md). Quick version:

```bash
git clone https://github.com/TechImmigrants/cv-builder
cd cv-builder
pnpm install
pnpm dev                       # web UI at http://localhost:3000

# CLI (separate terminal)
pnpm --filter @cv-builder/cli build
node packages/cli/dist/cli.js evaluate ./your-cv.md
node packages/cli/dist/cli.js evaluate ./your-cv.md --jd ./job.md
node packages/cli/dist/cli.js archetypes
```

Prerequisites: **Node.js 20 or newer** (matches `package.json`),
**pnpm 9.15 or newer**, **git**.

Results in the web UI are stored in your browser's `localStorage` only
under the key `evaluation-result`. They survive a page reload but not a
browser-data clear. No server round-trip happens at any point.

---

## What is ready

- **Score an existing resume** in the web UI or CLI
- **6 evaluation dimensions:** Shipped Evidence, Quantified Impact,
  Tooling Visibility, ATS Compatibility, Keyword Match, Public Proof
- **7 role archetypes** with role-specific weights:
  AI Product Manager, AI Engineer, Backend Engineer,
  Frontend Engineer, QA, DevOps, Data Engineer
- **Issue list with severity** (`critical` / `major` / `minor`) and a
  concrete `fix` per issue
- **Strengths list** to lean into in the interview
- **ATS verdict** (compatible or blockers detected)
- **File upload** for `.txt` and `.md`; PDF shows a friendly inline
  message instead of crashing
- **Feedback guide** at `/feedback` with an anonymization checklist
- **Eval harness** to catch regressions: `pnpm eval`
- **Localized-ready code** (no strings hard-coded where they shouldn't be)

---

## What is **not** ready

- **It does not generate, tailor, or rewrite a CV.** No autofill, no
  bullet rewriter, no keyword suggestions. It scores what you give it.
- **No PDF parsing.** Paste plain text or Markdown; drop a `.txt` or
  `.md` file. PDFs get a friendly inline message.
- **No hosted version.** The web app runs at `http://localhost:3000`
  after `pnpm dev`. There is no public URL.
- **No telemetry, no analytics, no cookies.** We have no server-side
  log of your CV.
- **Seven archetypes only.** If your role isn't covered, the detector
  falls back to Backend Engineer. Use the **New archetype** issue
  template to suggest more. See
  [`docs/ARCHETYPE_GAP_AUDIT.md`](./ARCHETYPE_GAP_AUDIT.md) for the
  full picture (including a parallel registry that powers the prompt
  pack).
- **Keyword Match is English-first.** Non-English CVs may score oddly
  on that dimension. Documented in `LOCAL_DEMO.md`.

---

## Caveat — local only

**This MVP runs on your machine.** Nothing is uploaded from the web UI
or the CLI. There is no hosted version, no account, and no server log
of your CV. A hosted version is on the roadmap (v0.3) and will ship
with a documented privacy posture. Don't trust a hosted version that
doesn't tell you what it does with your data.

If you find a hosted deployment URL claiming to be CV Builder before
we announce one, treat it as unofficial.

---

## Privacy

- Web UI runs entirely in your browser via `@cv-builder/core`.
- CLI reads files locally and prints to stdout.
- Results live in browser `localStorage` only.
- No telemetry, no analytics, no cookies.
- See `README.md` → **Privacy** and `docs/FEEDBACK_GUIDE.md` for the
  full privacy promise and anonymization guidance before posting
  examples in GitHub issues.

---

## Feedback

Read [docs/FEEDBACK_GUIDE.md](./FEEDBACK_GUIDE.md) **before** opening
an issue. It explains:

- Where to send feedback (GitHub issue, `feedback` label)
- What to include and what **not** to include (do not paste your real
  CV)
- How to anonymize a CV in under two minutes
- Five questions that help us prioritize

GitHub issues are public. Anonymize first.

---

## Announcement

Ready-to-post community announcements (Persian short + long, English
short, posting checklist) live at
[docs/COMMUNITY_ANNOUNCEMENT.md](./COMMUNITY_ANNOUNCEMENT.md).
Pick the version that fits the channel and personalize the closing
line.

---

## Open follow-ups (out of scope for this MVP)

These PRs are **intentionally left open** until the maintainer decides
next steps:

- **PR #37** — `feat(cli): add color output for scores, dimensions,
  and issues`. Real semantic conflict with current CLI; left for the
  author to rebase.
- **PR #78** — `ci(web-ui): deploy previews to Cloudflare Pages`.
  Requires Cloudflare account + secrets; tracked separately.
- **Cloudflare deployment** — not started. No credentials, no
  resources, no worktrees created.

Do not start these without explicit maintainer approval.

---

## How to verify this status

```bash
git checkout main
git pull
pnpm install
pnpm test && pnpm lint && pnpm build
```

If all three commands succeed and `docs/LOCAL_DEMO.md` matches this
file's claim about features, the MVP is healthy.