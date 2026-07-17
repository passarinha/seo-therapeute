export interface Delta {
  deltaPct: number | null;
  trend: "up" | "down" | "flat" | null;
  good: boolean | null;
}

export function computeDelta(
  current: number,
  previous: number | undefined | null,
  lowerIsBetter = false
): Delta {
  if (previous == null) {
    return { deltaPct: null, trend: null, good: null };
  }

  if (previous === 0) {
    if (current === 0) return { deltaPct: 0, trend: "flat", good: null };
    return { deltaPct: null, trend: current > 0 ? "up" : "down", good: !lowerIsBetter };
  }

  const deltaPct = Math.round(((current - previous) / Math.abs(previous)) * 100);
  const trend = deltaPct > 0 ? "up" : deltaPct < 0 ? "down" : "flat";
  const good = trend === "flat" ? null : lowerIsBetter ? trend === "down" : trend === "up";

  return { deltaPct, trend, good };
}
