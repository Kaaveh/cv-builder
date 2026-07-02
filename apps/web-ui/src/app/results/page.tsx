"use client";

import type { EvaluationResult } from "@cv-builder/core";
import { useEffect, useState } from "react";
import { ScoreCard } from "../components/ScoreCard";
import { getEvaluationResult } from "../lib/evaluation-storage";

export default function ResultsPage() {
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getEvaluationResult();

    setResult(data as EvaluationResult | null);
    setLoading(false);
  }, []);

  if (loading) {
    return <main className="p-8">Loading...</main>;
  }

  if (!result) {
    return <main className="p-8">No evaluation found</main>;
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-8 text-4xl font-bold">Evaluation Results</h1>

      <ScoreCard score={result.score} />

      <section className="mt-8 rounded-2xl border p-6">
        <h2 className="mb-4 text-xl font-semibold">Strengths</h2>

        <ul className="space-y-2">
          {result.strengths.map((strength: string) => (
            <li key={strength}>• {strength}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8 rounded-2xl border p-6">
        <h2 className="mb-4 text-xl font-semibold">Dimensions</h2>

        {result.dimensions.map((dimension) => (
          <div key={dimension.name} className="mb-3 rounded-xl border p-4">
            <div className="flex justify-between">
              <span>{dimension.name}</span>

              <span>
                {dimension.score}/{dimension.maxScore}
              </span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
