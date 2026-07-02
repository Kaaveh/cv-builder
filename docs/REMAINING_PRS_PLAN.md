# Remaining PRs — Maintainer Action Plan

> Inspects PR #78 (Cloudflare) and PR #37 (color output) after PR #85 merged.
> Sourced from `gh pr view`, `gh pr diff`, and test merges against the
> post-merge `main` at `5b59014`.

> **Status note — historical document.** This is the action plan for
> PR #37 (CLI color) and PR #78 (Cloudflare Pages previews) drafted
> immediately after PR #85 merged. The factual state of those two PRs as
> of today is the same — both remain OPEN and are intentionally
> untouched. For the **current** product status and what's still tracked
> as out-of-scope (hosted deployment, CLI cosmetic enhancements), read
> [`docs/MVP_RELEASE_STATUS.md`](./MVP_RELEASE_STATUS.md).

## TL;DR

| PR  | Title                                 | State       | Verdict                                                                    | Handled by                |
| --- | ------------------------------------- | ----------- | -------------------------------------------------------------------------- | ------------------------- |
| 78  | ci: Cloudflare Pages previews         | CONFLICTING | Rebaseable (only `pnpm-lock.yaml` conflicts, semantically a clean merge). Needs `CLOUDFLARE_*` secrets. | Maintainer + Sam (author) |
| 37  | feat(cli): add color output           | Conflicts   | Rebaseable. Useful but stale — based on a pre-`--format` refactor version of `cli.ts`. | Maintainer + riddhij-7 (author) |

## PR #78 — ci: Cloudflare Pages previews

### State

- PR: https://github.com/techimmigrants/cv-builder/pull/78
- Author: Sam (`Isusami`)
- Branch: `ci/cloudflare-pages-preview`
- State: `CONFLICTING` (only `pnpm-lock.yaml`)
- CI: CodeRabbit ✅ · `deploy` ❌ (expected, no secrets) · `lint-and-test` ✅
- Additions / deletions: 975 / 2
- 5 commits, last updated 2026-07-02 12:51 UTC

### What the PR does

1. Adds `.github/workflows/deploy-web-ui.yml` (63 lines):
   - `push` to `main` and PRs touching `apps/web-ui/**` or the workflow itself
   - Concurrency group `deploy-web-ui-${{ github.ref }}` with `cancel-in-progress: true`
   - `if: github.event_name != 'pull_request' || github.event.pull_request.head.repo.full_name == github.repository` (fork guard — fork PRs skip the job)
   - `permissions: contents: read, pull-requests: write`
   - Steps: `pnpm install --frozen-lockfile`, `pnpm build` from `apps/web-ui`, `cloudflare/wrangler-action@v3` deploy to project `cv-builder-web`, sticky PR comment with preview URL
2. Adds `wrangler@^3.90.0` to `apps/web-ui/devDependencies` (so `pnpm install` hoists it correctly — the `wrangler-action` tries to `pnpm add wrangler` to the root in a monorepo, which fails)
3. Adds `output: "export"` to `apps/web-ui/next.config.ts` so `pnpm build` produces `apps/web-ui/out/` that Pages can serve directly
4. Adds "Deployment" section to root `README.md` and "Previews" section to `apps/web-ui/README.md` with the secret names + locations

### Conflicts against current main

Test merge of `refs/pull/78/head` into `main`:

```text
Auto-merging README.md
Auto-merging apps/web-ui/README.md
Auto-merging pnpm-lock.yaml
CONFLICT (content): Merge conflict in pnpm-lock.yaml
Automatic merge failed
```

- `pnpm-lock.yaml`: only this is conflicted. Resolution: regenerate via `pnpm install` after merging source files.
- All other files auto-merge cleanly.

### Required GitHub secrets

| Secret | Where to get it | Notes |
| ------ | --------------- | ----- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → My Profile → API Tokens → Create Token → "Edit Cloudflare Pages" template → scope to `cv-builder-web` project | Token, not API key |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → Workers & Pages → right sidebar | 32-char hex |

### One-time setup before first deploy

1. Create the Cloudflare Pages project once:
   ```bash
   wrangler pages project create cv-builder-web
   ```
   Or via the Cloudflare dashboard (Workers & Pages → Create application → Pages → Connect to Git is **not** required — deployment will happen via the action).
2. Add the two secrets at `https://github.com/TechImmigrants/cv-builder/settings/secrets/actions` (repo admin only).

### Validation that can run without secrets

These all work in fork PRs (where secrets are masked) and on `main` once secrets exist:

```bash
pnpm install --frozen-lockfile
pnpm --filter @cv-builder/web build       # produces apps/web-ui/out/
ls apps/web-ui/out/                        # confirms static export
pnpm lint
```

The `deploy` step requires both secrets and will fail loudly with a clear "missing secret" / "project not found" message — failing open is the desired behavior for this PR.

### Security controls already in the PR

- `pull_request` (not `pull_request_target`) — secrets not exposed to fork PRs
- Fork guard via `if:` condition (forked PRs skip the job entirely)
- `persist-credentials: false` on `actions/checkout@v4` (zizmor `artipacked` mitigation)
- Minimal `permissions:` block
- `pnpm install --frozen-lockfile` (fails loudly on postinstall-hook tampering)

### Recommendation: handle after secrets are provisioned

1. Author (Sam) rebases against current `main` to clear the lockfile conflict
2. Maintainer verifies the rebase
3. Maintainer adds `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets **and** creates the `cv-builder-web` Cloudflare project
4. Author pushes the rebase; CI reruns; `deploy` step now succeeds (or fails cleanly with a real Cloudflare-side error)
5. Merge

If the secrets won't be provisioned soon, open a tracking issue:

```markdown
Title: Track Cloudflare Pages setup for PR #78
Labels: ci, infrastructure
Body:
- [ ] Provision `cv-builder-web` Cloudflare Pages project
- [ ] Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repo secrets
- [ ] Author rebase to clear pnpm-lock conflict
- [ ] Re-run CI to confirm deploy succeeds
- [ ] Merge
```

## PR #37 — feat(cli): add color output

### State

- PR: https://github.com/TechImmigrants/cv-builder/pull/37
- Author: riddhij-7
- Branch: `feat/cli-color-output`
- State: `MERGEABLE: UNKNOWN`
- CI: **none** (PR was opened before the current CI workflow ran on PRs without branch protection metadata)
- Additions / deletions: 59 / 25

### What the PR does

Adds `chalk`-based color output to `packages/cli/src/cli.ts`:

- `colorScore()`, `colorDimScore()`, `colorBar()` helpers — red < 3, yellow 3–4, green 4+
- Score, dimensions, archetype, strengths/issues/ATS sections all colored
- Strengths prefixed with green ✓, critical issues red ✗
- Adds `chalk` to `packages/cli/package.json` devDeps

### Conflicts against current main

Test merge of `refs/pull/37/head` into `main`:

```text
Auto-merging packages/cli/src/cli.ts
CONFLICT (content): Merge conflict in packages/cli/src/cli.ts
Auto-merging pnpm-lock.yaml
Automatic merge failed
```

- `packages/cli/package.json`: auto-merged cleanly (additive chalk dep)
- `packages/cli/src/cli.ts`: real semantic conflict. The CLI was refactored after PR #37 was opened — `args.indexOf("--jd")` is now `readOptionValue(args, "--jd")`, and `--format` validation was added. Author needs to rebase and place the chalk helpers in the current file shape.
- `pnpm-lock.yaml`: lockfile conflict (regenerable)

### Is the feature still useful?

Yes. The CLI is the privacy-first power-user surface (per `CLAUDE.md`). Color output makes the JSON-free path more readable. It's a clear improvement.

### Recommendation: ask the author to rebase

1. Author pulls latest `main`
2. Rebase `feat/cli-color-output` onto `main`
3. Resolve the `cli.ts` conflict: keep the new `readOptionValue` / `--format` flow; insert chalk helpers near the top of the file
4. Run `pnpm install` and commit the regenerated `pnpm-lock.yaml`
5. Push — CI should now pick up and run `lint-and-test (20)` and `lint-and-test (22)`
6. Maintainer merges once CI is green

### Suggested message to leave on PR #37

```markdown
Hi @riddhij-7 — the integration branch you saw before PR #85 has landed
(main is now at 5b59014). Your PR will conflict on packages/cli/src/cli.ts
and pnpm-lock.yaml, both expected.

Specifically, the CLI was refactored after your PR was opened:
- `args.indexOf("--jd")` is now `readOptionValue(args, "--jd")`
- A new `--format` flag with validation was added

To bring this home:
1. Rebase onto current main
2. Drop the color helpers (colorScore/colorDimScore/colorBar) at the top of
   cli.ts, just below `import chalk from "chalk"`
3. Apply them around the existing console.log calls without rewriting the
   --format / JSON branch
4. Regenerate pnpm-lock.yaml via pnpm install (we can do the regeneration on
   our side if you'd rather keep the diff minimal — just say the word)
5. Push — CI should run lint-and-test (20) and (22); once green, ready to
   merge

No code review feedback from me yet — the feature itself looks great. Happy
to merge once the rebase lands.
```

## Suggested ordering for the maintainer

If you want a low-risk, high-reward path:

1. **Open a tracking issue** for Cloudflare setup (PR #78). Even if no work happens immediately, the issue creates visibility.
2. **Comment on PR #37** with the rebase instructions above. Resolves on its own once author has bandwidth.
3. **Wait for #78's secrets** to be provisioned by whoever holds repo admin. Once they are, ping Sam to rebase and merge.

If you want a fast-finish path:

1. **Merge PR #37 first** — it's purely a UX improvement, has no external dependencies, and clears one of the two open items.
2. **Park PR #78** until Cloudflare is decided — the workflow is correct but useless without secrets.

## What I did NOT do

- Did not rebase either PR (modifies author branches)
- Did not push to either branch
- Did not close either PR
- Did not run `pnpm install` against the pre-lockfile-merge state for #78 (the lockfile rebase is the author's responsibility to keep their commit history clean)
- Did not create the Cloudflare Pages project — that requires account-level Cloudflare access

## Update to POST_MERGE_VALIDATION

The relevant addendum is at the top of this file. For consistency, the
relevant section of `docs/POST_MERGE_VALIDATION.md` is unchanged — this plan
exists as a follow-up document, not a replacement.
