import Link from "next/link";
import { Header } from "../components/layout/Header";

export default function FeedbackPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <Header />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          Feedback Guide
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Tell us what worked and what didn't.
        </h1>

        <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
          This MVP is the first cut. Real-world feedback is the only thing that gets us to
          a useful tool. Skim this page before you open an issue so your feedback lands in
          the right place.
        </p>

        <section className="mt-12 space-y-10">
          <article>
            <h2 className="text-xl font-semibold">Where to send feedback</h2>

            <ul className="mt-3 list-disc space-y-2 pl-6 text-zinc-700 dark:text-zinc-300">
              <li>
                Open a{" "}
                <a
                  className="underline underline-offset-4"
                  href="https://github.com/TechImmigrants/cv-builder/issues/new"
                  rel="noreferrer"
                  target="_blank"
                >
                  new GitHub issue
                </a>{" "}
                with the <code>feedback</code> label.
              </li>
              <li>
                Use the{" "}
                <code className="rounded bg-zinc-200 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                  feedback
                </code>{" "}
                channel in the Tech Immigrants community.
              </li>
              <li>
                If something is broken, use a{" "}
                <a
                  className="underline underline-offset-4"
                  href="https://github.com/TechImmigrants/cv-builder/issues/new/choose"
                  rel="noreferrer"
                  target="_blank"
                >
                  bug report
                </a>{" "}
                instead.
              </li>
            </ul>
          </article>

          <article>
            <h2 className="text-xl font-semibold">What to include</h2>

            <ul className="mt-3 list-disc space-y-2 pl-6 text-zinc-700 dark:text-zinc-300">
              <li>What you were testing (web UI, CLI, eval harness).</li>
              <li>What you expected vs. what happened.</li>
              <li>The role or archetype you were aiming for.</li>
              <li>Your browser / OS / Node version (for web UI / CLI bugs).</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-amber-300 bg-amber-50 p-6 dark:border-amber-700 dark:bg-amber-950/30">
            <h2 className="text-lg font-semibold text-amber-900 dark:text-amber-200">
              ⚠ Privacy: don't paste your real CV
            </h2>

            <p className="mt-3 text-sm leading-7 text-amber-900 dark:text-amber-200">
              GitHub issues are public. Before sharing an example,{" "}
              <strong>anonymize it</strong>:
            </p>

            <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-amber-900 dark:text-amber-200">
              <li>Replace your name with "Candidate A".</li>
              <li>Replace company names with "Company X".</li>
              <li>Remove phone, address, and email.</li>
              <li>Keep the bullet structure and metrics — that's what we need to see.</li>
            </ul>

            <p className="mt-3 text-sm leading-7 text-amber-900 dark:text-amber-200">
              If you accidentally paste a real CV, edit or delete the comment immediately.
              We can't un-share what you post on GitHub.
            </p>
          </article>

          <article>
            <h2 className="text-xl font-semibold">Sample anonymized feedback</h2>

            <pre className="mt-3 overflow-x-auto rounded-xl bg-zinc-900 p-4 text-xs leading-6 text-zinc-100">
              {`Browser: Chrome 124 on macOS 14
What I tried: A 1-page SWE CV against a Python backend JD
Result: Score 2.1/5
Surprise: Keyword Match scored 5/5 but Tooling Visibility scored 1/5,
even though I named every tool in the CV. The two should agree.
Anonymized snippet:
  - "Built Candidate A service in Company X serving 50M requests/day"
  - "Migrated Postgres to a sharded cluster, scaling writes 5x"
Suggestion: weight Tooling Visibility by exact JD keywords, not just
archetype keywords.`}
            </pre>
          </article>

          <article>
            <h2 className="text-xl font-semibold">Five questions that help</h2>

            <ol className="mt-3 list-decimal space-y-2 pl-6 text-zinc-700 dark:text-zinc-300">
              <li>Was the feedback useful?</li>
              <li>Was the score understandable?</li>
              <li>What was missing from the result?</li>
              <li>Would you trust this for your own CV today?</li>
              <li>What role or archetype should we support next?</li>
            </ol>
          </article>
        </section>

        <div className="mt-16 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-xl bg-black px-6 py-3 text-white hover:bg-zinc-800"
          >
            ← Back to evaluator
          </Link>

          <a
            href="https://github.com/TechImmigrants/cv-builder/issues/new"
            className="rounded-xl border border-zinc-300 px-6 py-3 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            rel="noreferrer"
            target="_blank"
          >
            Open a feedback issue ↗
          </a>
        </div>
      </main>
    </div>
  );
}
