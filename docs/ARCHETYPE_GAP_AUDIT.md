# Archetype Gap Audit

> A snapshot of where role archetypes actually live in CV Builder today,
> where planning sources say they should live, and what's missing.
>
> **This audit does not implement new archetypes.** It produces a report
> and a small set of high-priority issues for follow-up PRs.

## Audit metadata

| Item | Value |
| --- | --- |
| Audit date | 2026-07-02 |
| Repository | [TechImmigrants/cv-builder](https://github.com/TechImmigrants/cv-builder) |
| Branch reviewed | `main` @ `4e43a3c` (post-PR #89 contributor recognition) |
| Scope | role archetypes — keywords, weights, verbs, anti-patterns, wiring |

## TL;DR — the duplicate registry problem

There are **two parallel archetype registries** in the codebase today,
on two different schemas, and they are **not in sync**:

| Registry | Lives in | Type | Archetypes | Consumers |
| --- | --- | --- | --- | --- |
| **`core` registry** (older) | `packages/core/src/archetypes/index.ts` | `RoleArchetype` (plain TS interface in `packages/core/src/types.ts`) | **7** | CLI (`packages/cli/src/cli.ts`), Web UI (`apps/web-ui/src/app/results/page.tsx`, `apps/web-ui/src/app/components/EvaluateForm.tsx`), the live `evaluate()` function |
| **`intelligence` registry** (newer) | `packages/intelligence/src/archetypes/index.ts` | `Archetype` (Zod schema `packages/schemas/src/archetype.ts`, with required `version` field) | **3** | Prompt pack (`packages/prompts/src/index.ts`), skill (`.claude/skills/cv-evaluation/`), eval harness (`packages/eval/src/__tests__/fixtures.test.ts`) |

Concretely:

- A user who runs `pnpm --filter @cv-builder/cli start archetypes` sees
  the 7 archetypes from the `core` registry.
- The same user opens the web UI, pastes a CV, and gets a result whose
  `result.archetype.name` comes from the **same 7 from the `core`
  registry** (the result is a `core`-typed `EvaluationResult`).
- But the prompt pack (`renderScorePrompt({ archetype })`) requires an
  `Archetype` *with a `version` string* — the new schema. The eval
  fixtures (`pm-strong` → `product-manager`, `swe-strong` →
  `software-engineer`, `data-ml-strong` → `data-ml-engineer`) only
  pass against the `intelligence` registry. They do **not** exercise
  the live evaluator.
- The rubric the prompts emit is the 6-dimension one from
  `packages/intelligence/src/rubric.ts` — but the live evaluator
  re-implements its own 6-dimension scoring in
  `packages/core/src/evaluator/index.ts`, with the same dimension keys
  but different shape (`EvaluationDimension` vs the prompt-side
  scoring model). The two are not aligned by Zod.

**Implication:** the thing the user sees and the thing the prompts and
eval fixtures target are **two different systems**. README and the
release status doc claim "8 role archetypes" — neither registry actually
has 8 (see *Corrected count* below).

**What this audit does *not* do:** merge the two registries. That's a
deliberate refactor with downstream effects on types, prompts, the skill,
and the eval fixtures. The audit recommends a focused consolidation PR
for follow-up; we don't attempt it here.

## Corrected count

The docs claim "8 role archetypes" in three places:

- [`README.md`](https://github.com/TechImmigrants/cv-builder/blob/main/README.md)
  line 184 — "8 role archetypes" (roadmap checkbox, v0.1).
- [`README.md`](https://github.com/TechImmigrants/cv-builder/blob/main/README.md)
  lines 165–175 — list of 8 archetypes (which includes a "Machine
  Learning Engineer" line).
- [`docs/MVP_RELEASE_STATUS.md`](https://github.com/TechImmigrants/cv-builder/blob/main/docs/MVP_RELEASE_STATUS.md)
  line 21 — "6 dimensions, 8 archetypes, deterministic."
- [`docs/PR_CLEANUP_HANDOFF.md`](https://github.com/TechImmigrants/cv-builder/blob/main/docs/PR_CLEANUP_HANDOFF.md)
  line 111 — "rubric v1 + 8 archetypes."

The actual situation:

- `core` registry (live): **7** archetypes. No `ml-engineer`, no
  `product-manager` (only `ai-product-manager`).
- `intelligence` registry (prompts + eval fixtures): **3** archetypes.

This PR fixes the README's "8 role archetypes" claim and the list to
match the live `core` registry (7). The deeper problem — the two
registries being out of sync — is filed as a follow-up issue and
**not** fixed by this PR.

## Implemented archetypes

| ID | Display name | Defined in `core`? | Defined in `intelligence`? | Used by live evaluator? | Visible in CLI `--archetypes`? | Visible in Web UI results? | Has keywords | Has eval weights | Has action verbs | Has anti-patterns | Tests exist | Notes |
|---|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|---|---|
| `ai-product-manager` | AI Product Manager | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | partial (eval fixtures don't cover it) | Lives only in `core`. |
| `ai-engineer` | AI Engineer | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | partial | Lives only in `core`. |
| `backend-engineer` | Backend Engineer | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | partial | Lives only in `core`. Default fallback in `core.detectArchetype()`. |
| `frontend-engineer` | Frontend Engineer | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | partial | Lives only in `core`. |
| `qa-test-engineer` | QA / Test Engineer | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | partial | Closes issue #5 (PR #28). |
| `devops-sre` | DevOps / SRE | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | partial | Lives only in `core`. |
| `data-engineer` | Data Engineer | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | partial | Lives only in `core`. |
| `software-engineer` | Software Engineer | ❌ | ✅ | ❌ (eval fixtures only) | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ (eval fixture `swe-strong`) | Lives only in `intelligence`. Not exposed in the live CLI/Web UI. |
| `product-manager` | Product Manager | ❌ | ✅ | ❌ (eval fixtures only) | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ (eval fixture `pm-strong`) | Lives only in `intelligence`. **Plain PM detection is broken in the live system** — see *Highest-priority gap* below. |
| `data-ml-engineer` | Data & ML Engineer | ❌ | ✅ | ❌ (eval fixtures only) | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ (eval fixture `data-ml-strong`) | Lives only in `intelligence`. Different id from `core.data-engineer`. |

**Notes on the table:**

- "Visible in CLI `--archetypes`?" — verified by reading
  `packages/cli/src/cli.ts` line 105 (`handleListArchetypes`),
  which calls `listArchetypes` from `@cv-builder/core`.
- "Visible in Web UI results?" — verified by reading
  `apps/web-ui/src/app/results/page.tsx` line 80 (`result.archetype.name`),
  where `result` is the `EvaluationResult` returned by
  `evaluate()` from `@cv-builder/core`.
- "Tests exist?" — `packages/eval` exercises only the 3
  `intelligence` archetypes via fixture names; no tests currently
  cover the `core` archetypes (issue #15 — `[Core] Add unit tests
  for archetype detection` — is open).
- "Has eval weights" — both registries carry a 6-key weight map;
  the keys (`shippedEvidence`, `quantifiedImpact`,
  `toolingVisibility`, `atsCompatibility`, `keywordMatch`,
  `publicProof`) match the 6 dimensions in
  `packages/intelligence/src/rubric.ts`. The mappings are
  per-archetype, not identical.

## Intended archetypes (from issues / docs / scripts)

| Intended archetype | Source reference | Status | Notes |
|---|---|---|---|
| AI Product Manager | PR #84 (merged), issue #82 | ✅ Implemented in `core` as `ai-product-manager` | `intelligence` has only `product-manager`, not `ai-product-manager`. |
| AI Engineer | Issue #81, PR #69 (rubric v1 base) | ✅ Implemented in `core` as `ai-engineer` | `intelligence` has `software-engineer` (broader) but not `ai-engineer`. |
| QA / Test Engineer | Issue #5 (closed), PR #28 | ✅ Implemented in `core` as `qa-test-engineer` | |
| Machine Learning Engineer | Issue #3 | ❌ Missing | Closest existing: `intelligence.data-ml-engineer` (and `core.ai-engineer`). No plain `ml-engineer` (scikit-learn, classical ML) anywhere. |
| Mobile Engineer (iOS/Android) | Issue #1 | ❌ Missing | From `scripts/create-issues.sh` seed list. |
| Security Engineer | Issue #2 | ❌ Missing | From `scripts/create-issues.sh` seed list. |
| Full-Stack Engineer | Issue #4 | ❌ Missing | From `scripts/create-issues.sh` seed list. |
| Technical Program Manager | Issue #6 | ❌ Missing | From `scripts/create-issues.sh` seed list. |
| UX/UI Designer | Issue #7 | ❌ Missing | From `scripts/create-issues.sh` seed list. Designers are portfolio-heavy; would warrant higher `publicProof` weight. |
| Cloud Architect | Issue #8 | ❌ Missing | From `scripts/create-issues.sh` seed list. |
| Data Scientist / Analytics Engineer | Issue #40 | ❌ Missing | |
| Engineering Manager | Issue #41 | ❌ Missing | |
| Product Designer / UX Researcher | Issue #42 | ❌ Missing | |
| **Product Manager** *(plain, non-AI)* | **NEW — created by this audit (issue #90, see footer)** | ❌ Missing from `core` | `intelligence` has it. **This is the biggest live-system gap — see below.** |
| Classic ML Engineer | `scripts/create-issues.sh` line 47 | ❌ Missing | Same as issue #3. |
| Data Analyst / Business Analyst | Community baseline (see *Community needs* below) | ❌ Missing | Partial coverage via `core.data-engineer` and issue #40. |
| Project Manager / Scrum Master | Community baseline | ❌ Missing | Adjacent to TPM (issue #6) and Engineering Manager (issue #41). |
| Blockchain / Web3 Engineer | `docs/ISSUES_SEED.md` line 17 | ❌ Missing, **lower priority** | Narrow tech-stack; small demand in core Tech Immigrants audience. |
| Game Developer | `docs/ISSUES_SEED.md` line 18 | ❌ Missing, **lower priority** | Same. |

## Community needs baseline

The Tech Immigrants community baseline (see task description for the
provided list) maps to current state as follows:

| Baseline archetype | In `core`? | In `intelligence`? | Status | Priority |
|---|---|---|---|---|
| Backend Engineer | ✅ | ❌ | ✅ Implemented and wired | — |
| Frontend Engineer | ✅ | ❌ | ✅ Implemented and wired | — |
| Full-stack Engineer | ❌ | ❌ | ❌ Missing — open issue #4 | **High** |
| Software Engineer / Generalist | ❌ | ✅ (`software-engineer`) | ⚠️ Implemented but not in live path | Medium |
| Data Engineer | ✅ (`data-engineer`) | ✅ (`data-ml-engineer`) | ⚠️ Two variants, divergent IDs | — |
| Data Analyst / Business Analyst | ❌ | ❌ | ❌ Missing | High |
| Data / ML Engineer | ❌ | ✅ (`data-ml-engineer`) | ⚠️ Implemented but not in live path | Medium |
| AI Engineer | ✅ | ❌ | ✅ Implemented and wired | — |
| Product Manager | ❌ | ✅ (`product-manager`) | ⚠️ Implemented but not in live path | **Highest (see below)** |
| AI Product Manager | ✅ (`ai-product-manager`) | ❌ | ✅ Implemented and wired | — |
| QA / Test Engineer | ✅ | ❌ | ✅ Implemented and wired | — |
| DevOps / SRE | ✅ | ❌ | ✅ Implemented and wired | — |
| UX / Product Designer | ❌ | ❌ | ❌ Missing — open issues #7, #42 | **High** |
| Project Manager / Scrum Master | ❌ | ❌ | ❌ Missing — adjacent to issue #6 (#41) | Medium |

## Highest-priority gap: plain Product Manager detection is broken in the live system

The `core` registry (the one CLI and Web UI use) ships an
`ai-product-manager` archetype but **no plain `product-manager`**. If a
user applies to a non-AI product role, here is what happens:

1. `core.detectArchetype(cv, jd?)` counts keyword matches.
2. A plain PM CV that mentions "roadmap", "OKRs", "jira", "stakeholders",
   "discovery", "A/B test" — none of those are in `ai-product-manager`'s
   keyword set (which only fires on `llm`, `gpt`, `rag`,
   `embeddings`, etc.).
3. With no other strong signal, `core.detectArchetype` falls back to
   `backend-engineer` (its `DEFAULT_ARCHETYPE`).
4. The user sees "Detected archetype: Backend Engineer" and a
   `backend-engineer`-weighted dimension profile for what is actually
   a PM resume.

Meanwhile `intelligence.detectArchetype` *would* correctly classify the
same CV as `product-manager`, but no live surface (CLI, Web UI,
prompt-rendered score) reaches that code path.

**Conclusion:** plain-PM detection is currently degraded in the
public-facing evaluation surfaces. A PR that adds a non-AI `product-manager`
archetype to the `core` registry — with a `core.detectArchetype` that
prefers it when AI-PM keywords don't fire — would close this gap.

## Gap table (consolidated)

| # | Gap | Severity | Effort | Notes |
|---|---|---|---|---|
| 1 | `core` registry missing plain `product-manager`; live detector fallback to `backend-engineer` for non-AI PM CVs | **High** | Small–Medium | Filed as issue #90. New `core` archetype + small `detectArchetype` priority tweak. |
| 2 | Duplicate archetype registries (`core` vs `intelligence`) with divergent schemas | **High** (architectural) | Medium–Large | Filed as follow-up issue (consolidation). Affects types, prompts, eval fixtures, skill. NOT done in this PR. |
| 3 | `intelligence` registry has only 3 archetypes; V1 scope targets 3–5 | Low | Small | Add Full-stack Engineer and UX/UI Designer into `intelligence` too if/when the consolidation happens. |
| 4 | 11 existing open archetype issues (Mobile, Security, ML, Full-Stack, TPM, UX, Cloud, Data Scientist, Engineering Manager, Product Designer, AI Engineer, AI PM) have no owner | Medium | Various | All already filed. Community can pick via `good first issue`. |
| 5 | `scripts/create-issues.sh` mentions an `ml-engineer` (classical ML) and a `cloud-architect` archetype | Low | Various | Issue #3 already covers ML; #8 covers Cloud Architect. |
| 6 | README/MVP_RELEASE_STATUS/PR_CLEANUP_HANDOFF say "8 archetypes"; core has 7, intelligence has 3 | Low | **Done in this PR** | README corrected to 7. Other docs left for a follow-up doc-consistency PR. |

## Recommended priority order for follow-up PRs

1. **Add plain `product-manager` to `core`** — small, scoped, fixes the
   live detection for non-AI PMs. Issue: follow-up to #90 (when
   created, see footer).
2. **Consolidate the two registries** — make `core`'s detect / evaluator
   consume `intelligence`'s `Archetype` directly (or vice-versa). This
   is the architectural fix; removes `RoleArchetype` and uses the Zod
   `Archetype` everywhere. Out of scope for this audit.
3. **Address open archetype issues by priority & domain expertise** —
   `Mobile`, `Security`, `Full-Stack`, `UX`, `Cloud Architect`,
   `Engineering Manager` are the ones most in demand for the Tech
   Immigrants audience. Each becomes one PR, each uses the
   `.github/ISSUE_TEMPLATE/new_archetype.md` template.
4. **Update `MVP_RELEASE_STATUS.md` and `PR_CLEANUP_HANDOFF.md`** to
   match the corrected count (separate doc-consistency PR).
5. **Add unit tests for `core.detectArchetype`** — addresses the
   open issue #15. Catches regressions as new archetypes land.

## Risks of adding too many archetypes too early

- **Detection confusion.** With many overlapping keyword sets
  (e.g., `frontend-engineer` vs `full-stack-engineer` vs
  `software-engineer`), detection can flip-flop based on small
  wording changes. The existing `core.detectArchetype` is a simple
  count-match; more archetypes means more ties and more fallback to
  `backend-engineer`.
- **Maintenance drag.** Every archetype adds keywords, weights, and
  verbs someone has to keep aligned with hiring reality. A pragmatic
  ceiling is probably 12–15 archetypes total (per the v0.2 roadmap
  goal of "15+") — go beyond that only with golden-fixture coverage.
- **Prompt drift.** Each archetype that flows through the prompt pack
  needs its keywords exposed and tested. Currently the prompts
  hydrate from `intelligence`'s `Archetype`; adding to `core` without
  also touching `intelligence` (or vice versa) widens the divergence.
- **Type churn.** Adding to `core`'s `RoleArchetype` without
  consolidating types means a future consolidation has more surface
  to migrate. Adding to `intelligence`'s `Archetype` first (so it
  already has the `version` field) reduces that surface.

## Recommended *single* next implementation PR

A focused PR that:

1. Adds a non-AI `product-manager` archetype to `packages/core/src/archetypes/index.ts`
   using the same shape as the existing 7 entries (no `version` field,
   matching `RoleArchetype`).
2. Tweaks `core.detectArchetype` so that `product-manager` is preferred
   over `ai-product-manager` when AI keywords are absent (i.e., a tie-breaker
   that respects role-family over AI-sub-role).
3. Adds a golden fixture to `packages/eval/fixtures/` for the PM case
   (the existing `pm-strong` fixture targets `intelligence`, so this
   PR either adds a parallel `core` fixture, or the consolidation
   PR retroactively covers it).
4. Adds a short paragraph to this audit document marking the gap as
   closed.

This is small, scoped, doesn't touch the type system, doesn't refactor
the two registries, and improves the most-degraded detection path.

## Verification done for this audit

- Read both registries end-to-end (`packages/core/src/archetypes/index.ts`,
  `packages/intelligence/src/archetypes/index.ts` plus the three files
  it imports).
- Read both detector implementations
  (`packages/intelligence/src/detect.ts`,
  `core`'s `detectArchetype` is co-located in
  `packages/core/src/archetypes/index.ts`).
- Read the live evaluator
  (`packages/core/src/evaluator/index.ts`) and the CLI consumer
  (`packages/cli/src/cli.ts`) and the Web UI consumer
  (`apps/web-ui/src/app/results/page.tsx`).
- Read `packages/schemas/src/archetype.ts` and
  `packages/core/src/types.ts` to compare `RoleArchetype` vs
  `Archetype`.
- Cross-checked open archetype issues via `gh issue list --label archetype`.
- Compared against the planning docs (`docs/V1_SCOPE.md`,
  `docs/PHASE-1.md`, `docs/ARCHITECTURE.md`).
- Confirmed the seed script (`scripts/create-issues.sh`) and issue
  seed doc (`docs/ISSUES_SEED.md`) for the intended-but-not-shipped list.

## What was NOT done (deliberately)

- **No code changes to the registries.** This PR does not add or remove
  archetypes.
- **No type consolidation.** `RoleArchetype` (plain TS) and
  `Archetype` (Zod) are left as-is for the upcoming consolidation PR.
- **No edits to `apps/web-ui` or `packages/cli`.** Their consume-paths
  are verified, not changed.
- **No new evaluation rules.** Out of scope.
- **No touching of PR #37 or PR #78.** Unchanged.

---

*Generated 2026-07-02. Verified against `main` @ `4e43a3c` (post-PR
#89 contributor recognition). The number of issues created by this
audit is described in the PR body, not here, to keep this doc a
snapshot of the audit itself rather than the work it produced.*
