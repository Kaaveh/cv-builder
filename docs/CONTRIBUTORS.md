# Contributors

> CV Builder is **community-built**. Every merged contribution — code, docs,
> rules, archetypes, tests, research, design feedback, issue triage, and
> honest reviews — came from someone who chose to spend their time on it.
> This page is a **thank-you**, not a leaderboard.
>
> If you contributed and you don't see your name, or if something is wrong,
> please open an issue or a PR correcting this file. We update it as part
> of every release.
>
> Snapshot stats: see [`docs/CONTRIBUTION_SNAPSHOT.md`](./CONTRIBUTION_SNAPSHOT.md).
>
> Last refreshed: 2026-07-02, against `main` at `4b4bb03` (post-PR #87 MVP
> release + PR #88 docs audit + PR #92 archetype gap audit).

---

## Maintainers

The people currently responsible for the project's direction, releases,
and community health.

- **[@SaharPak](https://github.com/SaharPak)** — *Sahar Pakseresht.* Project
  lead and product owner. Owns the MVP scope, the roadmap, the release
  process, and the public docs. Author of the no-code contribution guide,
  the MVP demo plan, the post-merge validation reports, the MVP release
  status doc, the docs-consistency audit (PR #88), and the role-archetype
  gap audit (PR #92).

---

## Code contributors

The people who wrote the production code that runs today. Listed in the
order they merged their first meaningful PR — not by line count or PR count.

### Foundation stack — the layers underneath every surface

- **[@amirbahador-hub](https://github.com/amirbahador-hub)** — *AmirBahador
  Bahadori.* Built the foundational packages that power the MVP:
  `@cv-builder/schemas` (Zod contract, PR #68), `@cv-builder/intelligence`
  (rubric v1, archetypes, validators — PR #69), `@cv-builder/prompts`
  (extract / score / validate-claims prompt pack — PR #70), the power-user
  Claude Code skill (PR #71), and the `@cv-builder/eval` golden-fixture
  harness (PR #72). Also wrote the power-user quickstart in `apps/cli/`
  and the project structure doc (PR #73). Nine merged PRs and the bulk of
  the evaluator's first working tree.

### Web UI

- **[@alexNJF](https://github.com/alexNJF)** — Authored the CV + JD
  input screen with file upload and client-side evaluation (PR #76), which
  became the MVP web UI shipped in PR #85. Also authored the dark / light
  mode toggle (PR #58). Several of the underlying commits in those PRs
  were authored by `a.hakimi` (see the attribution note at the bottom).

- **`a.hakimi`** *(local git author name, no public GitHub link;
  13 commits on `main`)* — Authored most of the underlying implementation
  for the dark / light theme system (next-themes integration, Header,
  ThemeToggle, theme-aware styles) and the CV/JD input form that landed
  via PRs #58 and #76. We couldn't link these commits to a public GitHub
  account from the local git author metadata; if this is you, please open
  an issue and we'll add a real profile link.

- **[@rfatideh](https://github.com/rfatideh)** — *Reza Fatideh.* Initialised
  the web project structure (PR #56).

### Rules — small engines that add up

- **[@heerrpanchal](https://github.com/heerrpanchal)** — *Heer Panchal.*
  Authored three rules in close succession: CV length via word-count
  heuristic (PR #27), inconsistent date-format detection (PR #29), and
  education-first layout detection (PR #30). Together these are some of
  the highest-value universal rules in the evaluator.

- **[@davido-noowin](https://github.com/davido-noowin)** — *David Nguyen.*
  Authored the outdated-technologies rule (PR #74), with the supporting
  regex work in `packages/core/src/rules/`. Also handled the biome format --write . formatting pass during integration.

### Archetypes — the role-specific scoring configuration

- **[@IKetutWidiyane](https://github.com/IKetutWidiyane)** — *Ketut
  Widiyane.* Authored the AI Product Manager archetype (PR #84) and the
  Machine Learning Engineer archetype (which closed PR #39 as a
  duplicate). Two of the seven roles the MVP ships with.

- **[@Mohammadreza-Sarvari](https://github.com/Mohammadreza-Sarvari)** —
  *Mohammadreza Sarvari.* Authored the QA / Test Engineer archetype
  (PR #28), one of the seven shipped roles.

### CLI

- **[@nanookclaw](https://github.com/nanookclaw)** — *Nanook.* Authored the
  `--format json` flag for the CLI evaluator (PR #38). The eval harness
  relies on this for its golden-fixture assertions.

- **[@riddhij-7](https://github.com/riddhij-7)** — *Open contribution.*
  Authored `feat(cli): add color output for scores, dimensions, and issues`
  (PR #37). Currently open and intentionally not merged yet; the CLI was
  refactored after the PR opened, so the author needs to rebase before
  it can land. Either way — thank you for the contribution.

### Infrastructure

- **[@Isusami](https://github.com/Isusami)** — *Sam.* Authored
  `ci(web-ui): deploy previews to Cloudflare Pages` (PR #78). Currently
  open and intentionally not merged; the project does not yet have a
  hosted deployment. When the maintainer provisions the Cloudflare
  account and secrets, this PR will land.

---

## Docs and roadmap contributors

- **[@SaharPak](https://github.com/SaharPak)** — *Sahar Pakseresht.* The
  no-code contribution guide and `ROADMAP.md` (PR #79), the MVP demo
  plan, the post-merge validation report, the PR #85 rollback plan, the
  remaining-PRs plan, the MVP release status doc, the docs-consistency
  audit (PR #88), and the role-archetype gap audit (PR #92).

- **[@amirbahador-hub](https://github.com/amirbahador-hub)** — Power-user
  quickstart and project structure documentation (PR #73).

- **[@ded-furby](https://github.com/ded-furby)** — *Windows contributor
  setup guide* (PR #54). The repo's only first-class Windows onboarding
  doc; an important inclusion for non-macOS / non-Linux contributors.

- **[@milad-i](https://github.com/milad-i)** — *Early Web UI scaffolding.*
  PR #35 was closed during the cleanup phase as superseded by PR #76, but
  it informed the eventual MVP shape. Thank you for the early work.

---

## Testing / QA contributors

There aren't dedicated QA contributors yet (most testing has shipped
alongside the rules and the eval harness). The people who built the
test infrastructure are:

- **[@amirbahador-hub](https://github.com/amirbahador-hub)** —
  `@cv-builder/eval` golden-fixture harness (PR #72). Five fixture
  scenarios (`swe-strong`, `swe-weak-table`, `swe-with-jd`, `pm-strong`,
  `data-ml-strong`) that catch regressions in archetype detection and
  ATS verdict.
- **[@heerrpanchal](https://github.com/heerrpanchal)** — Each rule
  shipped with its own test coverage.
- **[@SaharPak](https://github.com/SaharPak)** — Integration cleanup that
  brought the rule tests and the eval fixtures into the same suite
  (PR #85).

If you want to contribute on the QA axis specifically, the
[`good first issue`](https://github.com/TechImmigrants/cv-builder/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
list has rule-test additions and fixture expansions.

---

## Product and community feedback contributors

People who shaped what the MVP became through issues, design feedback,
and review. The issue tracker is the main surface here.

- **The community members who opened and triaged GitHub issues.** This
  is the largest contribution surface by far and the easiest to
  under-count. Issues filed against the MVP during the public-testing
  phase directly shaped the polish PR #87 (home page copy, results page,
  file upload behaviour, empty states, scoring colour thresholds, etc.).
- **The community reviewers who commented on drafts.** Thank you for
  reading carefully and pushing back when the copy was wrong.
- **The anonymous contributors who tested the binary locally and
  reported what worked and what didn't.** Without you, the polish
  priorities would have been guesses.

If you want to contribute at this layer — and the project's docs
[CONTRIBUTING.md](../CONTRIBUTING.md) calls it out as one of the
highest-leverage ways to help — pick an open issue, read it carefully,
and write a thoughtful comment. That's it.

---

## Special thanks

- **CodeRabbit** — automated PR review. Caught several real issues
  before merge (defensive localStorage parsing in
  `apps/web-ui/src/app/results/page.tsx`, schema/doc drift in
  `docs/LOCAL_DEMO.md`, and the React-state vs imperative-DOM choice
  in `apps/web-ui/src/app/components/FileUpload.tsx`).
- **The Tech Immigrants community** — for hosting this project and for
  being the reason it exists. Specifically the `#feedback` channel,
  which is the project's primary community surface.
- **cvroast.dev** — the original deployed product this project
  rebuilt on a proper architecture. The MVP's rubric is informed by
  what worked in production there.

---

## Attribution caveats

A few things we want to be transparent about:

1. **Commit counts are imperfect.** `git shortlog` and the GitHub
   contributors API disagree in places because some commits land via
   merge commits (which credit the merger, not the original author) and
   some PRs have multiple local git author names that don't link back to
   a single GitHub account.
2. **PR count ≠ contribution size.** A 5-line rule and a 500-line
   foundation package both count as one merged PR. We deliberately do
   not rank by either.
3. **Counts do not capture review, discussion, product thinking, or
   community support.** Reading a draft and pushing back on a design
   call, triaging an issue, answering a question in `#feedback`, or
   helping a newcomer install pnpm all shape the project but don't show
   up as merged PRs or commits. They're why the *Product and community
   feedback contributors* section above is not quantified.
4. **`a.hakimi` is anonymous in our data.** Several dark-mode and
   CV/JD input commits on `main` are authored by `a.hakimi` (local git
   author name, no resolvable GitHub username). The web UI work is
   credited to `alexNJF` (the PR author), but a meaningful chunk of the
   underlying implementation came from `a.hakimi`.
5. **Cleanup Bot** appears in commit history. It's a local git author
   name used during the post-PR #85 integration pass to batch-attribute
   cleanup commits; it is not a human contributor and is excluded from
   recognition.
6. **Issue-only contributors are real contributors.** They are harder
   to credit individually because the project is small enough that most
   issues are filed by the maintainer during seeding. As community
   testing begins, we'll add named issue contributors here.
7. **If we missed you, please tell us.** Open a PR correcting this
   file. We'll merge it.

---

## How to add yourself

If you contributed something the project should know about:

1. Open a PR against `main` titled `docs: add <your-handle> to
   CONTRIBUTORS`.
2. Add yourself under the appropriate section. Use the same format as
   the existing entries: handle, real name (if you want), one-line
   contribution summary, link to PR(s).
3. If you want a snapshot update too, run the recipe in
   [`docs/CONTRIBUTION_SNAPSHOT.md`](./CONTRIBUTION_SNAPSHOT.md) and
   refresh the numbers in the same PR.

This file is intentionally easy to contribute to — it's a doc, not a
tax form. Keep it warm.