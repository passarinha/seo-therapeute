import type { Keyword, Competitor } from "@/lib/supabase/types";
import { clamp, weightedAverage, type ScoreResult } from "./types";

export function computeOpportunityScore(keyword: Keyword, competitors: Competitor[]): ScoreResult {
  const volumeValue = keyword.volume_estimate != null ? clamp((keyword.volume_estimate / 300) * 100) : 0;
  const difficultyValue = keyword.difficulty != null ? clamp(100 - keyword.difficulty) : 50;

  const competitorPositions = competitors
    .map((c) => c.keyword_positions?.[keyword.keyword])
    .filter((p): p is number => typeof p === "number");
  const bestCompetitorPosition =
    competitorPositions.length > 0 ? Math.min(...competitorPositions) : null;

  let gapValue: number;
  if (keyword.current_position == null) {
    gapValue = 80;
  } else if (bestCompetitorPosition == null) {
    gapValue = 50;
  } else {
    gapValue = clamp((keyword.current_position - bestCompetitorPosition) * 5 + 50);
  }

  const components = [
    { label: "Volume de recherche", value: Math.round(volumeValue), weight: 35 },
    { label: "Facilité (inverse difficulté)", value: Math.round(difficultyValue), weight: 35 },
    { label: "Écart avec les concurrents", value: Math.round(gapValue), weight: 30 },
  ];

  return { value: weightedAverage(components), components };
}
