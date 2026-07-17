import type { SeoMetric, Keyword } from "@/lib/supabase/types";
import { clamp, weightedAverage, latestByPeriod, type ScoreResult } from "./types";

export function computeVisibilityScore(
  seoMetrics: SeoMetric[],
  keywords: Keyword[]
): ScoreResult {
  const latest = latestByPeriod(seoMetrics);

  const positionValue = latest ? clamp(100 - (latest.avg_position - 1) * 5) : 0;
  const impressionsValue = latest ? clamp((latest.impressions / 500) * 100) : 0;
  const ctrValue = latest ? clamp((latest.ctr / 5) * 100) : 0;

  const rankedKeywords = keywords.filter((k) => k.current_position != null);
  const top3Count = rankedKeywords.filter((k) => (k.current_position ?? 999) <= 3).length;
  const top3Value = rankedKeywords.length > 0 ? clamp((top3Count / rankedKeywords.length) * 100) : 0;

  const components = [
    { label: "Position moyenne", value: Math.round(positionValue), weight: 35 },
    { label: "Impressions", value: Math.round(impressionsValue), weight: 20 },
    { label: "CTR", value: Math.round(ctrValue), weight: 20 },
    { label: "% mots-clés en top 3", value: Math.round(top3Value), weight: 25 },
  ];

  return { value: weightedAverage(components), components };
}
