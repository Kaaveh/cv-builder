# Roadmap

This file tracks **what we're actively working on right now** and **what's
open for grabs**. For the **vision** (v0.1, v0.2, v0.3), see the
[README Roadmap section](README.md#roadmap). This file is the **current state**
— what maintainers and contributors are doing this week and next.

> **Status note — partially stale.** As of the post-PR #87 release, all v0.1
> MVP sprint items have shipped on `main` (see
> [`docs/MVP_RELEASE_STATUS.md`](docs/MVP_RELEASE_STATUS.md) for the
> current MVP snapshot). The "🚧 In progress" list below was last
> refreshed before that release; the items labelled as open have either
> merged already or are no longer accurate. Treat this file as a planning
> draft for the **next** sprint, not a description of today's state.
> Before picking up an item, search the issue tracker — it may already
> be shipped.
>
> *Last refreshed: 2026-06-22. Next refresh: after the next planning
> call.*

## How to read this

- 🚧 **In progress** — assigned, being worked on, has an ETA. Don't pick up
  unless you coordinate with the assignee.
- 🎯 **Up next** — open for grabs. Comment "I'll take this" on the linked
  issue to claim it. Every item here is sized for one PR.
- 🅿️ **Parked** — explicitly deprioritized for now. Pick up only after
  discussion with a maintainer.

**If you're a new contributor, start in 🎯 Up next.** Every item there has
an acceptance bar reachable in a single sitting (1–4 hours).

---

## 🚧 In progress

| Item | Owner | ETA | Notes |
|---|---|---|---|
| **CI: web UI deploy previews to Cloudflare Pages** — PR [#78](https://github.com/TechImmigrants/cv-builder/pull/78) | unassigned | TBD | Path-filtered workflow. Requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repo secrets. Tracked but out of this audit's scope. |
| **CLI: color output** — PR [#37](https://github.com/TechImmigrants/cv-builder/pull/37) | unassigned | TBD | Author needs to rebase against post-merge `main`; CLI was refactored after PR #37 opened. Tracked but out of this audit's scope. |

> ### ✅ Recently shipped (post-merge on `main`)
>
> Phase-1 stack (PRs [#68](https://github.com/TechImmigrants/cv-builder/pull/68)–[#73](https://github.com/TechImmigrants/cv-builder/pull/73)),
> CV/JD input screen (PR [#76](https://github.com/TechImmigrants/cv-builder/pull/76)),
> CodeRabbit config expansion (PR [#75](https://github.com/TechImmigrants/cv-builder/pull/75)),
> outdated-technology rule (PR [#74](https://github.com/TechImmigrants/cv-builder/pull/74)),
> no-code contribution paths and the MVP demo polish (PR [#85](https://github.com/TechImmigrants/cv-builder/pull/85),
> PR [#87](https://github.com/TechImmigrants/cv-builder/pull/87)).
> Full validation in [`docs/MVP_RELEASE_STATUS.md`](docs/MVP_RELEASE_STATUS.md).

---

## 🎯 Up next — open for grabs

These have linked issues, explicit acceptance criteria, and a one-PR-sized
scope. **Comment "I'll take this" on the issue to claim.**

| Item | Effort | Issue | Notes |
|---|---|---|---|
| Add integration test for full evaluation pipeline | M (2–4 h) | [#51](https://github.com/TechImmigrants/cv-builder/issues/51) | `help wanted`, `core`. End-to-end test of `evaluate()`. |
| Add GitHub Actions workflow for lint + tests | S (1–2 h) | [#46](https://github.com/TechImmigrants/cv-builder/issues/46) | `help wanted`, `core`. May already partially exist — check `.github/workflows/` first. |
| Convert `types.ts` to Zod schemas | M | [#47](https://github.com/TechImmigrants/cv-builder/issues/47) | `enhancement`, `core`. |
| Add example test CVs for local development | S (30–60 min) | [#50](https://github.com/TechImmigrants/cv-builder/issues/50) | `good first issue`. Author 2–3 fictional CVs + 1 JD. |
| Rule: flag generic summary / objective section | S | [#45](https://github.com/TechImmigrants/cv-builder/issues/45) | `good first issue`, `rules`. |
| Rule: detect missing action verbs in bullet points | S | [#52](https://github.com/TechImmigrants/cv-builder/issues/52) | `good first issue`, `rules`. |
| Rule: flag outdated technologies | S | [#53](https://github.com/TechImmigrants/cv-builder/issues/53) | `good first issue`, `rules`. **PR #74 already in flight — check before starting.** |
| Add per-dimension feedback strings to evaluator | S | [#48](https://github.com/TechImmigrants/cv-builder/issues/48) | `enhancement`, `core`. |
| Fix: flag missing contact information | S | [#55](https://github.com/TechImmigrants/cv-builder/pull/55) | `core`. PR already open — needs review. |
| New archetype: **AI Engineer** | M | (open issue) | **Already shipped** as of the MVP — see README "Supported Role Archetypes". Use the [New Archetype template](.github/ISSUE_TEMPLATE/new_archetype.md) to suggest more roles. |
| New archetype: **AI Product Manager** | M | (open issue) | **Already shipped** as of the MVP — see README "Supported Role Archetypes". |
| New archetypes: Backend / Frontend / DevOps / QA / Data Engineer | M each | (open issue) | **Already shipped** as of the MVP. README lists eight built-in roles. |
| Land CONTRIBUTING.md "no-code" section | S | (open issue) | The draft this file came from. |
| Write `docs/faq.md` ("I got a bad score, what now?") | S | (open issue) | |
| Write `docs/cli-troubleshooting.md` | S | (open issue) | |
| Write `docs/evaluation-glossary.md` | S | (open issue) | |

---

## 🅿️ Parked

| Item | Why parked | When to revisit |
|---|---|---|
| PDF export | Real effort; needs design decisions (template engine, fonts, ATS-safe output). | After Phase-1 merge + web UI MVP. |
| VS Code / Cursor extension | Significant scope; needs stable core API first. | After PDF export and at least 8 archetypes shipped. |
| Self-hosted deployment guide | Requires production stability first. | After v0.2 lands. |
| LLM-enhanced mode (rewrite suggestions) | Cost implications and prompt-design work. | After core scoring is stable. |
| Side-by-side tailoring editor | Needs mature web UI. | After web UI MVP ships. |
| Localization (multiple languages) — beyond README | Translation tooling, RTL support, glossary. | After first 3 README translations land. |
| Before/after examples library | Needs curation and editorial review. | After core scoring is stable. |

---

## How to influence this roadmap

- **Pick up an item from 🎯 Up next** — comment "I'll take this" on the issue.
- **Suggest new items** — open an issue with the relevant label.
- **Push a 🅿️ Parked item** — if you think something should be un-parked,
  open an issue with the `roadmap` label and the rationale.
- **Help with the v0.2 backlog** — that's where the meaningful contributor
  work lives now that v0.1 has shipped.

---

*Last updated: 2026-07-02 (post-MVP release). The previous "Last updated"
date of 2026-06-22 predates the MVP release and is no longer accurate.*
