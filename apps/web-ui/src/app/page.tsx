import Link from "next/link";
import { EvaluateForm } from "./components/EvaluateForm";
import { Header } from "./components/layout/Header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <Header />
      <main className="flex-1 px-6 py-16">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
          <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10 sm:p-12">
            <p className="text-sm font-medium uppercase tracking-[0.2em]">
              CV Builder · MVP
            </p>

            <div className="mt-4 max-w-3xl space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Score your resume against the role before you apply.
              </h1>

              <p className="text-lg leading-8">
                Paste your CV and an optional job description. CV Builder runs six quality
                checks — Shipped Evidence, Quantified Impact, Tooling Visibility, ATS
                Compatibility, Keyword Match, Public Proof — and shows you what to fix
                first. Everything runs in your browser; nothing is uploaded.
              </p>

              <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                This is a community MVP. It scores an existing resume — it does not
                generate, tailor, or rewrite one. Feedback and bug reports are welcome at
                the bottom of{" "}
                <Link
                  href="/results"
                  className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  a results page
                </Link>{" "}
                after you evaluate.
              </p>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
              <h2 className="text-lg font-semibold">1. Paste a CV</h2>

              <p className="mt-3 text-sm leading-7">
                Plain text or Markdown works best. Most real-world resumes can be pasted
                directly from your editor.
              </p>
            </article>

            <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
              <h2 className="text-lg font-semibold">
                2. Add a job description (optional)
              </h2>

              <p className="mt-3 text-sm leading-7">
                If you add a JD, the Keyword Match dimension becomes active and you get a
                focused score against that specific role.
              </p>
            </article>

            <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
              <h2 className="text-lg font-semibold">3. Read the result</h2>

              <p className="mt-3 text-sm leading-7">
                Overall score, per-dimension bars, the issues worth fixing first, and a
                list of strengths you can lean into in the interview.
              </p>
            </article>
          </section>

          <EvaluateForm />

          <section className="rounded-3xl border border-dashed border-zinc-300 p-8 dark:border-zinc-700">
            <h2 className="text-base font-semibold">Privacy</h2>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-700 dark:text-zinc-300">
              The web app runs entirely in your browser via{" "}
              <code className="rounded bg-zinc-200 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                @cv-builder/core
              </code>
              . Nothing is sent to a server. Local demo only — no telemetry, no analytics,
              no cookies. Do not paste real personal information (phone, address) into
              GitHub issues; see{" "}
              <Link
                href="/feedback"
                className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                feedback guide
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
