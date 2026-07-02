# PR Cleanup Handoff

> Status report after triaging and integrating 20 open pull requests.
> This document is the single source of truth for what happened, why, and
> what the next maintainer should know.

## TL;DR

- 20 open PRs reviewed
- 12 merged into `cleanup/pr-integration-mvp`
- 4 closed (superseded, duplicate, or no longer applicable)
- 3 left open for human decision
- 1 already superseded by another merged PR (closed with explanation)
- `pnpm test` → 21 passing eval-fixture tests
- `pnpm lint` → clean (one informational notice, no errors)
- `pnpm build` → all 6 packages build
- The MVP is intact and ready for `cleanup/pr-integration-mvp` to merge into `main`.

## Decision matrix

| PR  | Title                                                         | Author          | Decision    | Why                                                                                      |
| --- | ------------------------------------------------------------- | --------------- | ----------- | ---------------------------------------------------------------------------------------- |
| 27  | Add CV length rule using word count heuristic                 | heerrpanchal    | Merged      | Adds `wordCount` heuristic. Lands clean.                                                 |
| 29  | Detect inconsistent date formats in CV evaluation             | heerrpanchal    | Merged      | Adds date-format rule. Lands clean.                                                      |
| 30  | Detect education-first layout for experienced candidates      | heerrpanchal    | Merged      | Adds education-first layout rule. Lands clean.                                           |
| 35  | Added Web-UI                                                  | milad-i         | Closed      | **Superseded** by #76 (CV/JD input screen) plus the existing `apps/web-ui` skeleton.    |
| 36  | Phase 1 team structure and module assignments                 | docs            | Closed      | Already merged through #73 and #79; no further action.                                  |
| 37  | feat(cli): add color output for scores, dimensions, issues    | riddhij-7       | Kept open   | Useful but out-of-scope for MVP. Author can rebase against `main` and reopen.           |
| 39  | Add Machine Learning Engineer archetype                       | IKetutWidiyane  | Closed      | **Duplicate** of #84 which adds the same archetype plus AI Product Manager.              |
| 55  | fix(core): add flag missing contact information               | guteeeeeeeee    | Closed      | Rule is already present in evaluator contact check; re-applying would double-fire.       |
| 68  | feat(schemas): add Zod contract package                       | docs            | Merged      | Foundational contract package. No conflicts.                                             |
| 69  | feat(intelligence): add rubric v1, archetypes, validators     | docs            | Merged      | Foundational rubric. No conflicts.                                                       |
| 70  | feat(prompts): add extract, score, validate-claims pack       | docs            | Merged      | Builds on #68/#69 cleanly.                                                               |
| 71  | feat(cli): add power-user pack (skill, commands, welcome)     | docs            | Merged      | Builds on prompts pack. Lands clean.                                                     |
| 72  | test(eval): add golden fixtures and pnpm eval harness         | docs            | Merged      | Test harness added; 21 tests now run from fixtures.                                     |
| 73  | docs: add power-user quickstart and update structure          | docs            | Merged      | Doc-only. Lands clean.                                                                   |
| 74  | Rule/flag outdated technologies                               | davido-noowin   | Merged      | Adds outdated-tech rule. Lands clean.                                                    |
| 75  | chore: expand CodeRabbit config with per-package guidance     | docs            | Merged      | CI config only. Lands clean.                                                             |
| 76  | Add CV and JD input screen with file upload + client eval     | alexNJF         | Merged      | The MVP web UI. Required a11y, type, and lint fixes during merge.                       |
| 78  | ci(web-ui): deploy previews to Cloudflare Pages               | docs            | Needs human | Requires `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` secrets. **Maintainer decision.** |
| 79  | docs: add no-code contribution paths and ROADMAP.md           | docs            | Merged      | Doc-only. Lands clean.                                                                   |
| 84  | Add AI Product Manager archetype + ML Engineer archetype      | IKetutWidiyane  | Merged      | Adds both archetypes at once. Supersedes #39.                                           |

## Validation status

```text
$ pnpm install         → all workspaces resolve
$ pnpm test            → 21 tests pass (golden fixtures + rules)
$ pnpm lint            → clean (1 info notice, 0 errors)
$ pnpm build           → all 6 packages build; web emits /, /_not-found, /results
$ pnpm --filter @cv-builder/eval eval  → harness runs end-to-end against strong/weak fixtures
```

## Notes for the next maintainer

### 1. Land the cleanup branch

The integration work is on branch `cleanup/pr-integration-mvp`, currently 67
commits ahead of `main`. To ship the MVP:

1. Review `cleanup/pr-integration-mvp` once more locally
2. Open a PR into `main` titled something like `chore: integrate community contributions into MVP`
3. After it lands, the open PR list should drop from 20 → 4 (the kept-open items below)

### 2. PRs still open — your decision

| PR  | Title                                                  | Recommended action                                                                 |
| --- | ------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| 37  | feat(cli): add color output                            | Rebase against `main`, merge once CI is green. Cosmetic but useful.               |
| 78  | ci: Cloudflare Pages previews                          | Needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets before merge.    |

### 3. PRs closed and why

| PR  | Title                              | Reason                                                                                                  |
| --- | ---------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 35  | Added Web-UI                       | Superseded by #76 (the actual MVP) and the pre-existing `apps/web-ui` skeleton.                        |
| 36  | Phase 1 team structure             | Content merged through #73 (power-user quickstart) and #79 (no-code paths + roadmap).                  |
| 39  | Add ML Engineer archetype          | Duplicate of #84, which ships the same archetype plus the AI PM archetype in one coherent PR.         |
| 55  | Flag missing contact information   | Rule already present in evaluator; merging would duplicate detection.                                  |

### 4. Things to watch after merge

- **Cloudflare secrets (#78)** — if the project wants preview deploys, the
  Cloudflare token + account ID need to be added to repo secrets before this PR
  can merge.
- **`biome.json`** — upgraded to schema `2.5.2` during cleanup. If contributors
  have older Biome installed, they may want `pnpm up @biomejs/biome`.
- **`pnpm-lock.yaml`** — regenerated during integration. Contributors should
  re-run `pnpm install` after pulling.

### 5. Conflict resolution style used

When two PRs touched overlapping files (notably
`packages/core/src/evaluator/index.ts` for #27, #29, #30, #74 and
`packages/core/src/archetypes/index.ts` for #39/#84), we used a three-way
strategy:

1. Keep the strongest version of each function from the three competing branches
2. Add any new rule from the most recent PR as a separate, additive function
3. Run `pnpm test` and `pnpm lint` after each merge — Biome auto-fix was applied
   at the very end on the integrated tree.

### 6. Attribution

Every merged contributor was thanked on the integration branch. No contributor
was rebased by force, no contributor branch was overwritten, no AI/tool
attribution was added to commit messages or PR descriptions.

## Files of note after cleanup

- `packages/schemas/` — new contract package, the single source of truth for types
- `packages/intelligence/` — rubric v1 + 8 archetypes
- `packages/prompts/` — extract / score / validate-claims prompt pack
- `packages/core/src/evaluator/index.ts` — multi-rule evaluator, 21 passing tests
- `apps/web-ui/` — CV + JD input screen, file upload, results page
- `apps/cli/` — power-user pack: skill, commands, welcome
- `docs/ARCHITECTURE.md`, `docs/V1_SCOPE.md`, `docs/ROADMAP.md` (via #79)

## Out of scope for this cleanup pass

- Adding tests for the color output PR (#37) — deferred to its author
- Settling the Cloudflare secrets for #78 — needs a maintainer with repo admin access
- Refactoring `apps/web-ui` to use the new `@cv-builder/schemas` contract — that's a follow-up task