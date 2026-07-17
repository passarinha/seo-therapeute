import { computeDelta } from "@/lib/format/delta";

export function MetricComparisonCard({
  label,
  current,
  previous,
  lowerIsBetter = false,
}: {
  label: string;
  current: number;
  previous: number | undefined;
  lowerIsBetter?: boolean;
}) {
  const { deltaPct, trend, good } = computeDelta(current, previous, lowerIsBetter);

  const colorClass =
    good === null ? "text-slate-400" : good ? "text-emerald-600" : "text-red-600";
  const arrow = trend === "up" ? "▲" : trend === "down" ? "▼" : "→";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{current}</p>
      <p className={`mt-1 text-xs font-medium ${colorClass}`}>
        {deltaPct === null ? (
          previous == null ? (
            "Pas encore de mois précédent"
          ) : (
            `${arrow} nouveau`
          )
        ) : (
          `${arrow} ${Math.abs(deltaPct)}% vs mois dernier`
        )}
      </p>
    </div>
  );
}
