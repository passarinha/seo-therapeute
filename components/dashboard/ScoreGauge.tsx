"use client";

import { useState } from "react";
import type { ScoreResult } from "@/lib/scoring";

function scoreColor(value: number) {
  if (value >= 70) return "text-emerald-600 border-emerald-200 bg-emerald-50";
  if (value >= 40) return "text-amber-600 border-amber-200 bg-amber-50";
  return "text-red-600 border-red-200 bg-red-50";
}

export function ScoreGauge({ label, score }: { label: string; score: ScoreResult }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-xl border p-4 ${scoreColor(score.value)}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left"
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-wide opacity-70">{label}</p>
          <p className="text-3xl font-semibold">{score.value}</p>
        </div>
        <span className="text-xs underline opacity-70">{open ? "Masquer" : "Détail"}</span>
      </button>

      {open && (
        <ul className="mt-3 space-y-1 border-t border-current/20 pt-3 text-xs">
          {score.components.map((c) => (
            <li key={c.label} className="flex items-center justify-between opacity-90">
              <span>{c.label}</span>
              <span className="font-medium">
                {c.value} <span className="opacity-60">(poids {c.weight}%)</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
