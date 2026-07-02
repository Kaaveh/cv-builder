interface ScoreCardProps {
  score: number;
}

export function ScoreCard({ score }: ScoreCardProps) {
  const safeScore =
    typeof score === "number" && Number.isFinite(score) && score >= 0 ? score : 0;
  const percentage = Math.min(100, (safeScore / 5) * 100);

  return (
    <div className="rounded-2xl border p-6">
      <h2 className="text-xl font-semibold">Overall Score</h2>

      <p className="mt-4 text-5xl font-bold">{safeScore}</p>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-200">
        <div
          className="h-full bg-zinc-900"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}
