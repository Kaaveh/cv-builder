# CV Builder

**Paste your CV and an optional job description. Get a 0–5 evaluation across six dimensions, with a prioritised list of issues and fixes.**

This is the **first community MVP**: it scores an existing resume, it does not generate, tailor, or rewrite one. An open source, privacy-first CV evaluator for tech professionals. Built by the [Tech Immigrants](https://youtube.com/c/TechImmigrants) community.

[![CI](https://github.com/TechImmigrants/cv-builder/actions/workflows/ci.yml/badge.svg)](https://github.com/TechImmigrants/cv-builder/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Why This Exists

Good CV tools are expensive. Many job seekers — especially immigrants, career changers, and people in countries with restricted internet — can't access them. We're building a free, open source alternative backed by real hiring research.

**What makes this different:**
- Scoring based on [250+ researched sources](research/sources.md) from FAANG recruiters, AI hiring managers, and industry experts
- Role-specific evaluation (not one-size-fits-all)
- Privacy-first: works offline, no data collection
- Transparent: every rule is auditable, every score is explainable

---

## How It Works

```
┌──────────┐     ┌──────────────┐     ┌──────────────┐
│  Your CV │ ──▶ │  CV Builder  │ ──▶ │ Score: 4.2/5 │
└──────────┘     │   Engine     │     │ Issues       │
┌──────────┐     │              │     │ Strengths    │
│    JD    │ ──▶ │  (6 scoring  │     │ ATS verdict  │
│(optional)│     │  dimensions) │     │ Archetype    │
└──────────┘     └──────────────┘     └──────────────┘
```

### Scoring Dimensions

| Dimension | What it measures |
|-----------|-----------------|
| Shipped Evidence | Real work in production, not theory |
| Quantified Impact | Numbers in every bullet (%, $, users) |
| Tooling Visibility | Specific tools named, matching the JD |
| ATS Compatibility | Will it parse correctly in applicant tracking systems? |
| Keyword Match | Terminology from the JD present in your CV |
| Public Proof | GitHub, blog, portfolio links that verify claims |

Weights vary by role type. An AI Engineer's CV is scored differently than a Product Manager's.

---

## Quick Start

### CLI (available now)

```bash
# Clone and build
git clone https://github.com/TechImmigrants/cv-builder.git
cd cv-builder
pnpm install
pnpm build

# Evaluate your CV
pnpm --filter @cv-builder/cli start evaluate ./my-cv.md

# Evaluate against a specific job description
pnpm --filter @cv-builder/cli start evaluate ./my-cv.md --jd ./job.md

# List available role archetypes
pnpm --filter @cv-builder/cli start archetypes
```

### Power User — run it with Claude Code

Clone the repo, open [Claude Code](https://claude.com/claude-code) at the root, and run `/evaluate-cv ./your-resume.md`. The evaluation runs entirely on your machine with your own agent — no server, no account, nothing leaves your computer. No build needed.

Claude Code can also read PDF and DOCX inputs natively, so `/evaluate-cv ./your-resume.pdf` works as long as the file is on your machine.

See [apps/cli/README.md](apps/cli/README.md) for the full guide.

### Web UI (MVP — local only)

```bash
pnpm dev   # boots at http://localhost:3000
```

A browser-based interface where you paste your CV and JD, get instant
feedback, and read the full dimension breakdown. No sign-up, no data leaves
your browser. PDF upload is not supported yet — use `.txt` or `.md`.

Full guide: [docs/LOCAL_DEMO.md](docs/LOCAL_DEMO.md).

---

## Privacy

- The web UI runs entirely in your browser. Nothing is sent to a server.
- The CLI reads files locally and prints to stdout. Nothing is uploaded.
- There is no telemetry, no analytics, no cookies.
- Results in the web UI are stored in your browser's `localStorage` only.

**Do not paste your real CV into GitHub issues.** Issues are public. Before
sharing an example, anonymize it first — see
[docs/FEEDBACK_GUIDE.md](docs/FEEDBACK_GUIDE.md).

---

## Architecture

```
packages/
├── schemas/       # Zod contract shared by every surface
├── intelligence/  # Rubric, archetypes, validators (the brain)
├── prompts/       # extract / score / validate-claims prompt pack
├── core/          # Deterministic evaluation engine
├── cli/           # Command-line interface
└── eval/          # Golden fixtures (pnpm eval)
apps/
├── cli/           # Power-user quickstart
└── web-ui/        # Browser UI (coming soon)
.claude/           # Claude Code skill + slash commands (power-user surface)
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full technical design.

---

## Contributing

We have **26 contributors** ready to build this together. Whether you're a first-time open source contributor or a senior engineer, there's work for you.

### Quick Start for Contributors

```bash
git clone https://github.com/TechImmigrants/cv-builder.git
cd cv-builder
pnpm install
pnpm build
pnpm test
```

### Where to Start

| Your skill | Start here |
|------------|-----------|
| TypeScript / Backend | `packages/intelligence/` — rubric, new archetypes, validators |
| React / Frontend | `apps/web-ui/` — build the UI from scratch |
| CLI / Node.js | `packages/cli/` — new commands, output formatting |
| Research / Writing | `research/` — find sources, validate rules |
| Design / UX | UI mockups, user flows, accessibility |
| DevOps / CI | `.github/workflows/` — testing, releases, automation |

### Issue Labels

- `good first issue` — Small, self-contained tasks perfect for newcomers
- `archetype` — Add a new role type (great for domain experts)
- `rules` — New CV evaluation rules
- `help wanted` — Needs community input
- `web-ui` — Frontend/design work
- `core` — Engine logic

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

---

## Deployment

The web UI (`apps/web-ui/`) is deployed to **Cloudflare Pages**. Every push to a
PR that changes `apps/web-ui/**` triggers the `Deploy web UI` workflow, which
builds a static export and posts a preview URL as a comment on the PR. Pushes
to `main` deploy to the production site.

### Required repo secrets

| Secret | Where to get it |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → My Profile → API Tokens → Create Token → use the "Edit Cloudflare Pages" template, scoped to the account and `cv-builder-cf-web` project |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → Workers & Pages → right sidebar |

The `cv-builder-cf-web` Cloudflare Pages project must exist before the first
deploy — create it once via the dashboard or
`wrangler pages project create cv-builder-cf-web`.

---

## Supported Role Archetypes

Currently built-in (the ones the CLI's `archetypes` command and the
web UI's results page expose — see
[`docs/ARCHETYPE_GAP_AUDIT.md`](docs/ARCHETYPE_GAP_AUDIT.md) for the
full picture, including the parallel registry that powers the prompt
pack):

- AI Product Manager
- AI Engineer
- Backend Engineer
- Frontend Engineer
- QA / Test Engineer
- DevOps / SRE
- Data Engineer
- Mobile Engineer

**Want to add your role?** Use the [New Archetype issue template](.github/ISSUE_TEMPLATE/new_archetype.md) and submit a PR. Each archetype needs 15+ keywords, evaluation weights, action verbs, and anti-patterns.

---

## Roadmap

### v0.1 (Current Sprint — MVP)
- [x] Core evaluation engine with 6 dimensions
- [x] 8 role archetypes
- [x] Universal anti-pattern detection
- [x] CLI: basic evaluate command
- [x] Web UI: paste and score screen (local demo)
- [x] Eval harness with golden fixtures
- [x] Localization-ready code structure (no strings in wrong place)
- [x] Privacy model: no telemetry, no upload
- [ ] Unit tests for scoring logic
- [ ] PDF text extraction

### v0.2
- [ ] LLM-enhanced mode (rewrite suggestions)
- [ ] PDF export
- [ ] 15+ role archetypes
- [ ] Keyword gap analysis with suggestions
- [ ] Localization (multiple languages)

### v0.3
- [ ] Side-by-side tailoring editor
- [ ] Before/after examples library
- [ ] VS Code / Cursor extension
- [ ] Self-hosted deployment guide

---

## Community

- Telegram Channel: [Tech Immigrants](https://t.me/TwitterImmigrant)
- Telegram Group: [Tech Immigrants](https://t.me/techimmigrants)
- YouTube: [Tech Immigrants](https://youtube.com/c/TechImmigrants)
- LinkedIn: [Tech Immigrants](https://www.linkedin.com/company/techimmigrants/)
- X: [@tech_immigrants](https://x.com/tech_immigrants)

---

## Contributors

CV Builder is **community-built**. Every merged contribution — code, docs,
rules, archetypes, tests, research, design feedback, issue triage, and
honest reviews — came from someone who chose to spend their time on it.

- **[Contributors](docs/CONTRIBUTORS.md)** — human-first recognition for
  everyone who has shaped the project so far.
- **[Contribution Snapshot](docs/CONTRIBUTION_SNAPSHOT.md)** — the
  numbers behind the recognition (as of 2026-07-02).
- **[GitHub contributors graph](https://github.com/TechImmigrants/cv-builder/graphs/contributors)** —
  the live view.

If you contributed and don't see your name, please open a PR correcting
[`docs/CONTRIBUTORS.md`](docs/CONTRIBUTORS.md) — the file is intentionally
easy to edit.

---

## Research

Our rules are backed by data, not vibes. See:
- [research/sources.md](research/sources.md) — All 250+ sources with citations
- [research/data/](research/data/) — Structured market data
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — Technical design decisions

---

## License

[MIT](LICENSE) — Use it, fork it, build on it. Free forever.
