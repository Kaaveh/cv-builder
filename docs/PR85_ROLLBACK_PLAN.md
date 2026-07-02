# PR #85 Rollback Plan

> **Status note — historical document.** This is the rollback plan drafted
> before PR #85 (the 14-PR MVP integration) merged into `main`. The merge
> was successful and permanent — every subsequent release-readiness check
> passed. The safety tag `pre-pr85-main-backup-20260702` remains on
> `origin` as a permanent rollback point. You do not need to act on this
> doc unless you spot a regression pointing to that merge.
>
> For the **current** product status, read
> [`docs/MVP_RELEASE_STATUS.md`](./MVP_RELEASE_STATUS.md).

## Pre-merge state captured

- Tag: `pre-pr85-main-backup-20260702`
- Tag SHA: `d13b34d14822bb80f92f60ffab119c80142a2463` (object on origin)
- Tagged commit (main HEAD at time of tag): `7c0fba6e7ef1f2b16e8f6c615368ad4d79606be4`
- Date: 2026-07-02
- PR: https://github.com/TechImmigrants/cv-builder/pull/85
- Head branch: `cleanup/pr-integration-mvp`
- Head SHA at tag creation: `a50e384fdbde910ab827a61928b23e9e3077ba24`

## Recommended merge method

**Create a merge commit** (NOT squash, NOT rebase).

Rationale:
1. Preserves the integrated commit history of all 14 contributor PRs.
2. Allows GitHub to auto-detect each ancestor PR as merged (their merge commits
   are present on the head branch).
3. Gives a single, identifiable merge commit that can be cleanly reverted.
4. Avoids rewriting history that contributors have already referenced.

## Rollback commands

Assume the merge is performed by Sahar (or whoever has merge rights) and
produces a merge commit on `main`. Let `M` = the merge commit SHA printed by
GitHub after the merge (visible at
`https://github.com/TechImmigrants/cv-builder/commits/main`).

### Option A — revert the merge commit (preferred)

This produces a new commit that undoes PR #85 while preserving history.
Safe to push, safe to re-revert later if needed.

```bash
# 1. Fetch latest main and confirm the merge commit exists
git fetch origin main
git log --oneline -5 origin/main
# Note: M = the topmost commit on origin/main after the merge

# 2. Revert the merge commit, keeping main's first parent (the previous main)
#    and undoing the PR #85 head.
git checkout main
git pull origin main
git revert -m 1 <M>
git push origin main
```

`-m 1` selects parent #1 (the previous `main`) as the "mainline" — i.e., the
changes being kept. PR #85's commits become the side branch and get undone.

After the revert, the contributor PRs will still show as merged on GitHub
(because the merge commits exist on the integration branch and are ancestors of
the revert commit). Open PRs #37 and #78 remain open.

### Option B — reset main to the backup tag (DESTRUCTIVE, last resort)

Only use this if `git revert` fails or you need the tree to look exactly like
pre-PR-85. This rewrites `main` history.

```bash
git fetch origin main
git checkout main
git reset --hard pre-pr85-main-backup-20260702
git push --force-with-lease origin main
```

Warnings:
- `--force-with-lease` refuses to overwrite if remote moved since you fetched.
  Use plain `--force` only if you are certain no one else has pushed.
- Anyone with a clone will need to rebase or reclone.
- Closes-for-the-PR-85 history will be lost on `main` (but the
  `cleanup/pr-integration-mvp` branch will still have it).

### Option C — restore from the backup tag onto a new branch

If you want to inspect the pre-merge state without touching `main`:

```bash
git fetch origin pre-pr85-main-backup-20260702
git checkout -b recovery/pre-pr85-main-backup-20260702 pre-pr85-main-backup-20260702
```

This is non-destructive and gives you a working branch at the exact pre-merge
state.

## Verification after rollback

After Option A or B, run:

```bash
pnpm install
pnpm test         # expect: 21/21 core, 21/21 eval, 5/5 prompts, 6/6 schemas, 10/10 intelligence
pnpm lint         # expect: clean (1 info, 0 errors)
pnpm build        # expect: 6/6 packages build
```

If any check fails after rollback, the safest move is to stop, open a new
recovery issue, and not retry the merge until the failure is understood.

## What's NOT covered by rollback

- PR #85 itself stays open after Option A (the revert only undoes the merge,
  not the PR).
- The 14 ancestor PRs still show as merged on GitHub because their merge
  commits remain on the `cleanup/pr-integration-mvp` branch.
- Contributors' branches on origin (e.g. `feature/eval-harness`,
  `docs/power-user-quickstart`) are not affected.
- The `pre-pr85-main-backup-20260702` tag persists on origin after rollback,
  so you can always cross-reference the pre-merge state.

## Don'ts

- Do NOT delete the safety tag before confirming the merge is permanent.
- Do NOT use `git reset --hard` on a branch other than `main` while rollback is
  in flight.
- Do NOT force-push without `--force-with-lease`; `--force` can clobber parallel
  work.
- Do NOT close PR #85 after reverting; leave it open until the root cause of
  any failure is understood.