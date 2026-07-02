"use client";

import type { EvaluationResult } from "@cv-builder/core";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "../components/layout/Header";
import { ScoreCard } from "../components/ScoreCard";
import { getEvaluationResult } from "../lib/evaluation-storage";

const SEVERITY_STYLES = {
  critical: "border-red-500 bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-200",
  major:
    "border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
  minor: "border-zinc-400 bg-zinc-50 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200",
} as const;

export default function ResultsPage() {
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getEvaluationResult();
    setResult(data as EvaluationResult | null);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
        <Header />

        <main className="mx-auto w-full max-w-5xl flex-1 p-8">
          <p className="text-zinc-600 dark:text-zinc-400">Loading your evaluation…</p>
        </main>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
        <Header />

        <main className="mx-auto w-full max-w-3xl flex-1 p-8">
          <h1 className="mb-4 text-3xl font-bold">No evaluation found</h1>

          <p className="text-zinc-700 dark:text-zinc-300">
            It looks like you landed on this page directly. Run a CV through the evaluator
            first — your last result is stored in this browser only.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-xl bg-black px-6 py-3 text-white hover:bg-zinc-800"
          >
            ← Back to evaluator
          </Link>
        </main>
      </div>
    );
  }

  const issues = result.issues ?? [];
  const strengths = result.strengths ?? [];
  const dimensions = result.dimensions ?? [];

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <Header />

      <main className="mx-auto w-full max-w-5xl flex-1 p-8">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">Evaluation Results</h1>

            {result.archetype && (
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Detected archetype:{" "}
                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  {result.archetype.name ?? result.archetype.id ?? "Unknown"}
                </span>
              </p>
            )}
          </div>

          <Link
            href="/"
            className="rounded-xl border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            Evaluate another CV
          </Link>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <ScoreCard score={result.score} />
          </div>

          <div className="rounded-2xl border p-6 md:col-span-2">
            <h2 className="text-xl font-semibold">ATS readiness</h2>

            <p
              className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                result.atsCompatible
                  ? "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-200"
              }`}
            >
              {result.atsCompatible ? "✓ ATS compatible" : "✗ ATS blockers detected"}
            </p>

            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              {result.atsCompatible
                ? "No tables, no smart quotes — applicant tracking systems should parse this CV cleanly."
                : "Your CV contains formatting (tables or smart quotes) that many ATS tools can't parse. Plain text or Markdown works best."}
            </p>
          </div>
        </div>

        <section className="mt-8 rounded-2xl border p-6">
          <h2 className="mb-4 text-xl font-semibold">Dimensions</h2>

          <div className="space-y-4">
            {dimensions.map((dimension) => {
              const ratio =
                dimension.maxScore > 0
                  ? Math.max(0, Math.min(1, dimension.score / dimension.maxScore))
                  : 0;
              const widthPct = `${ratio * 100}%`;

              return (
                <div key={dimension.name}>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{dimension.name}</span>

                    <span className="text-zinc-600 dark:text-zinc-400">
                      {dimension.score}/{dimension.maxScore}
                    </span>
                  </div>

                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-zinc-900 dark:bg-zinc-100"
                      style={{ width: widthPct }}
                    />
                  </div>

                  {dimension.feedback && (
                    <p className="mt-1 text-xs text-zinc-500">{dimension.feedback}</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {issues.length > 0 && (
          <section className="mt-8 rounded-2xl border p-6">
            <h2 className="mb-4 text-xl font-semibold">
              Issues to fix ({issues.length})
            </h2>

            <ul className="space-y-3">
              {issues.map((issue) => {
                const style =
                  SEVERITY_STYLES[issue.severity as keyof typeof SEVERITY_STYLES] ??
                  SEVERITY_STYLES.minor;

                return (
                  <li
                    key={`${issue.element}-${issue.why}`}
                    className={`rounded-xl border-l-4 p-4 ${style}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{issue.element}</span>

                      <span className="text-xs uppercase tracking-wide opacity-75">
                        {issue.severity}
                      </span>
                    </div>

                    <p className="mt-1 text-sm">{issue.why}</p>

                    <p className="mt-2 text-sm">
                      <span className="font-medium">Fix:</span> {issue.fix}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <section className="mt-8 rounded-2xl border p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Strengths{strengths.length > 0 && ` (${strengths.length})`}
          </h2>

          {strengths.length === 0 ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              No specific strengths detected yet. As your CV adds quantified outcomes,
              public links, and shipped work, more bullets will appear here.
            </p>
          ) : (
            <ul className="space-y-2">
              {strengths.map((strength: string) => (
                <li key={strength} className="text-sm">
                  ✓ {strength}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-8 rounded-3xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
            Was this useful?
          </h3>

          <p className="mt-2">
            This is the first community MVP. Feedback shapes what we build next. See the{" "}
            <Link
              href="/feedback"
              className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              feedback guide
            </Link>{" "}
            for what to share and how to share it without exposing your CV.
          </p>
        </section>
      </main>
    </div>
  );
}
