export interface ScoreComponent {
  label: string;
  value: number;
  weight: number;
}

export interface ScoreResult {
  value: number;
  components: ScoreComponent[];
}

export function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

export function weightedAverage(components: ScoreComponent[]): number {
  const totalWeight = components.reduce((sum, c) => sum + c.weight, 0);
  if (totalWeight === 0) return 0;
  const weightedSum = components.reduce((sum, c) => sum + c.value * c.weight, 0);
  return Math.round(clamp(weightedSum / totalWeight));
}

export function latestByPeriod<T extends { period_date: string }>(metrics: T[]): T | null {
  if (metrics.length === 0) return null;
  return [...metrics].sort((a, b) => b.period_date.localeCompare(a.period_date))[0];
}
