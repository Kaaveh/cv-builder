# Feedback Guide

> How to send useful feedback without exposing your CV.

GitHub issues are public. Before you open one, read this page so your
feedback lands in the right place and doesn't leak personal information.

## Where to send feedback

- **General feedback:** open a GitHub issue with the `feedback` label.
- **Bug reports:** use the **Bug report** issue template (it asks the right
  questions).
- **Feature requests:** use the **Feature request** issue template.
- **New archetype / role:** use the **New archetype** issue template.
- **New rule:** use the **New rule** issue template.

Links:

- New issue: https://github.com/TechImmigrants/cv-builder/issues/new
- Templates: https://github.com/TechImmigrants/cv-builder/issues/new/choose

## What to include

For feedback that helps us improve:

- **What you were testing** (web UI, CLI, eval harness)
- **What you expected vs. what happened**
- **The role or archetype you were aiming for**
- **Your browser / OS / Node version** for web UI / CLI bugs

For bug reports, the template will ask for additional details (reproduction
steps, expected vs. actual output).

## What NOT to include

This is the most important section. **Do not paste your full CV into a GitHub
issue.**

Why:

- GitHub issues are public. They show up in search engines.
- Your CV contains your name, your work history, contact details, sometimes
  your address and phone number.
- Once posted, the only way to remove it is to edit or delete the comment —
  but anyone who saw it can save a copy.
- Your current / past employers can find it.

## How to anonymize a CV before sharing

Before you paste anything, do this:

1. **Replace your name** with `Candidate A`.
2. **Replace company names** with `Company X`, `Company Y`, etc.
3. **Remove phone numbers, addresses, and emails.**
4. **Keep the bullet structure and the metrics.** That's what we need to
   see to improve the evaluator. A line like
   `"Migrated Postgres to a sharded cluster, scaling writes 5x"` is exactly
   what we want — there's no PII in it.

## Sample anonymized feedback

```text
Browser: Chrome 124 on macOS 14
What I tried: A 1-page SWE CV against a Python backend JD
Result: Score 2.1/5
Surprise: Keyword Match scored 5/5 but Tooling Visibility scored 1/5,
even though I named every tool in the CV. The two should agree.
Anonymized snippet:
  - "Built Candidate A service in Company X serving 50M requests/day"
  - "Migrated Postgres to a sharded cluster, scaling writes 5x"
Suggestion: weight Tooling Visibility by exact JD keywords, not just
archetype keywords.
```

This is the shape we want — concrete observation, anonymized evidence,
actionable suggestion. We can act on this without ever seeing who you are.

## If you accidentally paste your real CV

Edit or delete the comment immediately. Then:

1. Open the comment, click the three-dot menu, choose **Edit** or **Delete**.
2. If a screenshot of the issue has already been taken (e.g. shared in
   Discord), let us know in the issue and we'll add a pinned note saying it
   should be ignored.

We can't un-share what gets posted on GitHub, so please anonymize **before**
you post.

## Five questions that help

If you only have two minutes, answer these in any order:

1. Was the feedback useful?
2. Was the score understandable?
3. What was missing from the result?
4. Would you trust this for your own CV today?
5. What role or archetype should we support next?

The first four help us judge what to invest in next. The fifth helps us
prioritize the archetype backlog.

## Other ways to give feedback

- **Tech Immigrants community:** the `#feedback` channel in the Tech Immigrants community.
- **Code review:** if you're a developer, the easiest way to influence the
  product is to open a PR. See [CONTRIBUTING.md](../CONTRIBUTING.md).
- **Email:** if GitHub feels too public, ping a maintainer through the
  community channels first to find a private path.

## Privacy promise

This MVP runs entirely in your browser for the web UI, and entirely on your
machine for the CLI. We have no server-side log of your CV. We have no
telemetry. We have no analytics.

When a hosted version eventually lands, the privacy posture will be
documented before launch. Don't trust a hosted version that doesn't tell
you what it does with your data.