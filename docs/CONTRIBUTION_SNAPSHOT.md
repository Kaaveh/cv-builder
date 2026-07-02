# Contribution Snapshot

> A generated-style snapshot of contributor activity for CV Builder, as of
> the date below. This is a **statistical view**, not a leaderboard.
> Numbers are imperfect and should be read with the caveats at the bottom.
>
> For human-first recognition, see [`docs/CONTRIBUTORS.md`](./CONTRIBUTORS.md).

## Snapshot metadata

| Item | Value |
| --- | --- |
| Date generated | 2026-07-02 |
| Repository | [TechImmigrants/cv-builder](https://github.com/TechImmigrants/cv-builder) |
| Branch reviewed | `main` |
| Commit hash | `4b4bb03` (post-PR #88 docs audit + PR #92 archetype gap audit) |
| Period covered | Project inception → 2026-07-02 |

## Merged pull requests

Pull requests reviewed for this snapshot via `gh pr list --state merged
--limit 100`.

| Metric | Value |
| --- | --- |
| Total merged PRs | 28 |
| Distinct merged-PR authors | 10 |
| Closed-not-merged PRs | 4 |
| Open PRs (intentionally untouched) | 3 (#37, #78, #89 at snapshot time) |

### Contributors by merged-PR count

Provided for context, **not** as a ranking.

| Rank | GitHub login | Merged PRs | Example areas |
|---|---|---:|---|
| 1 | `amirbahador-hub` | 9 | foundation stack (schemas, intelligence, prompts, eval harness, power-user pack) |
| 2 | `SaharPak` | 8 | MVP integration, MVP release polish, no-code paths, docs audit, archetype gap audit |
| 3 | `heerrpanchal` | 3 | universal rules (CV length, date format, education-first layout) |
| 4 | `alexNJF` | 2 | web UI input screen, dark / light mode |
| 5 | `IKetutWidiyane` | 1 | AI Product Manager + ML Engineer archetypes |
| 5 | `davido-noowin` | 1 | outdated-technologies rule |
| 5 | `rfatideh` | 1 | web project init |
| 5 | `ded-furby` | 1 | Windows setup guide |
| 5 | `nanookclaw` | 1 | CLI `--format json` |
| 5 | `Mohammadreza-Sarvari` | 1 | QA / Test Engineer archetype |

### Closed-not-merged PRs (still meaningful)

| GitHub login | Closed PR | Why closed |
|---|---|---|
| `guteeeeeeeee` | #55 — flag missing contact information | Rule already present in evaluator; merging would duplicate detection. |
| `IKetutWidiyane` | #39 — ML Engineer archetype | Subsumed by PR #84 (which adds the same archetype plus AI Product Manager). |
| `SaharPak` | #36 — Phase 1 team structure | Subsumed by PR #73 + PR #79 docs pass. |
| `milad-i` | #35 — Added Web-UI | Superseded by PR #76 + the existing `apps/web-ui` skeleton. |

These contributions are still recognised in [`docs/CONTRIBUTORS.md`](./CONTRIBUTORS.md).

### Open PRs

| GitHub login | PR | What it adds | Status |
|---|---|---|---|
| `riddhij-7` | #37 | CLI color output | Author needs to rebase against post-merge `main`; CLI was refactored after the PR opened. Intentionally untouched in this snapshot. |
| `Isusami` | #78 | Cloudflare Pages previews for the web UI | Requires `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` secrets; needs maintainer with repo admin access. Intentionally untouched. |
| `SaharPak` | #89 | Contributor recognition docs (this work) | Open at snapshot time. |

## Commits on `main`

Pulled from `git shortlog -sn` and the GitHub contributors API
(`/repos/TechImmigrants/cv-builder/contributors`). Numbers disagree by
source because the API counts only commits on the default branch and
merges them by GitHub account, while `git shortlog` counts commits on the
checked-out branch by raw author name.

### `git shortlog -sn --all`

| Commits | Author | Notes |
|---:|---|---|
| 30 | AmirBahador Bahadori | Foundation stack; same person as `amirbahador-hub` |
| 26 | Cleanup Bot | Local-only git author used during PR #85 integration. **Not a human contributor**; excluded from recognition. (GitHub API counts 22 on `main`; the extra 4 live on non-merged branches. `--all` includes everything reachable.) |
| 13 | a.hakimi | Dark mode / theme / input form work; see attribution caveat below |
| 11 | Sahar | Same person as `SaharPak` (different local author name) |
| 8 | SaharPak | Maintainer |
| 7 | amirbahador | Same person as `AmirBahador Bahadori` (different local author name) |
| 6 | Sam | Local name on the merge commit for dark-mode PR #58; not necessarily the same person as `Isusami` |
| 5 | David Nguyen | Same person as `davido-noowin` |
| 4 | Heer Panchal | Same person as `heerrpanchal` |
| 4 | Ketut Widiyane | Same person as `IKetutWidiyane` |
| 3 | IKetutWidiyane | |
| 3 | Sahar Pakseresht | Same person as `SaharPak` (different local author name) |
| 2 | Reza Fatideh | Same person as `rfatideh` |
| 2 | guteeeeeeeee | |
| 1 | Heer | Same person as `heerrpanchal` |
| 1 | Mohammadreza Sarvari | |
| 1 | Nanook | Same person as `nanookclaw` |
| 1 | ded-furby | |

### GitHub contributors API

Top contributors by commits linked to a public GitHub account on
`main`.

| GitHub login | Commits on `main` |
|---|---:|
| `SaharPak` | 18 |
| `amirbahador-hub` | 7 |
| `IKetutWidiyane` | 7 |
| `davido-noowin` | 5 |
| `rfatideh` | 2 |
| `heerrpanchal` | 1 |
| `nanookclaw` | 1 |
| `Isusami` | 1 |
| `ded-furby` | 1 |

Anonymous commits on `main` (no GitHub link):

| Author | Commits |
|---|---:|
| AmirBahador Bahadori | 30 |
| a.hakimi | 13 |
| Heer Panchal | 4 |
| Sahar Pakseresht | 3 |
| Cleanup Bot | 22 (excluded from recognition — see caveats) |
| Mohammadreza Sarvari | 1 |

## Notable contribution areas

| Area | Primary contributors |
|---|---|
| Zod contract (`packages/schemas`) | `amirbahador-hub` |
| Rubric, archetypes, validators (`packages/intelligence`) | `amirbahador-hub`, `IKetutWidiyane`, `Mohammadreza-Sarvari` |
| Prompt pack (`packages/prompts`) | `amirbahador-hub` |
| Power-user Claude Code skill (`apps/cli`) | `amirbahador-hub` |
| Core engine / rules (`packages/core`) | `heerrpanchal`, `davido-noowin` |
| Eval harness + golden fixtures (`packages/eval`) | `amirbahador-hub` |
| Web UI (`apps/web-ui`) | `alexNJF`, `a.hakimi` (anonymous commits), `rfatideh` |
| CLI (`packages/cli`) | `nanookclaw`, `riddhij-7` (open PR #37) |
| Windows onboarding docs | `ded-furby` |
| Docs / roadmap / MVP release | `SaharPak`, `amirbahador-hub` |
| Docs consistency audit | `SaharPak` (PR #88) |
| Archetype gap audit | `SaharPak` (PR #92) |
| Cloudflare Pages previews (open PR #78) | `Isusami` |

## Caveats — please read these before drawing conclusions

1. **Counts are imperfect.** `git shortlog` and the GitHub contributors
   API use different definitions of "contributor" and disagree in places.
   The numbers above are the best-effort combination of both.
2. **PR count ≠ contribution size.** A 5-line rule PR and a 500-line
   foundation PR both count as one. Do not infer effort from this
   table.
3. **Commit count ≠ contribution size.** Bulk reformatting, auto-generated
   dependency bumps, and a single careful bug fix can all show up as
   "one commit." Context matters; this table does not capture it.
4. **Anonymous committers are real people.** Several dark-mode and
   CV/JD input commits on `main` are authored by `a.hakimi` (local git
   author name) without a resolvable GitHub account. The work is real;
   the attribution is noisy.
5. **Local git author names vary.** The same person can appear under
   several names in `git shortlog` (e.g., `Sahar`, `SaharPak`,
   `Sahar Pakseresht`). This snapshot collapses them where the link is
   clear and flags the uncertainty otherwise.
6. **Issue-only contributors are not in these counts.** The issue
   tracker is a major contribution surface; this snapshot doesn't yet
   count it. As community testing begins we'll add a per-issue section
   here.
7. **Counts do not capture review, discussion, product thinking, or
   community support.** Reading a draft and pushing back on a design
   call, triaging an issue, answering a question in `#feedback`, or
   helping a newcomer install pnpm don't show up in this table. They
   are part of who built the project and are listed (without counts)
   in [`docs/CONTRIBUTORS.md`](./CONTRIBUTORS.md).
8. **Cleanup Bot** is excluded from recognition. It's a local git
   author name used during the post-PR #85 integration pass to
   batch-attribute cleanup commits; not a human contributor.
9. **The "open PR" column is intentionally shown** so it's clear that
   those contributors haven't been excluded — they're just awaiting
   either a rebase (#37) or secrets provisioning (#78). Both are
   listed in [`docs/CONTRIBUTORS.md`](./CONTRIBUTORS.md).

---

## How to refresh this snapshot

```bash
# From the repo root
git checkout main
git pull origin main

# Merged PRs by author
gh pr list --state merged --limit 200 \
  --json number,title,author,mergedAt,labels \
  | jq -r '.[] | [.author.login, .number, .title] | @tsv' \
  | sort

# Closed-not-merged PRs by author
gh pr list --state closed --limit 200 \
  --json number,title,author,mergedAt \
  | jq -r '.[] | select(.mergedAt == null) | [.author.login, .number, .title] | @tsv'

# Commits on main, grouped by author
git shortlog -sn main

# GitHub contributors (counts commits on default branch)
gh api repos/TechImmigrants/cv-builder/contributors?anon=true \
  | jq -r '.[] | "\(.contributions)\t\(.login // .name)"'

# Anonymous contributors
# Names only — emails from the contributors API are private contact
# information and should not be published in this repo.
gh api repos/TechImmigrants/cv-builder/contributors?anon=true \
  | jq -r '.[] | select(.type == "Anonymous") | "\(.contributions)\t\(.name)"'
```

Refresh the numbers in this file in the same PR that updates
[`docs/CONTRIBUTORS.md`](./CONTRIBUTORS.md).

---

*Generated 2026-07-02. Snapshot is automatic in spirit but hand-curated
for accuracy; numbers above were checked against both the GitHub API and
the local git history at the date noted.*