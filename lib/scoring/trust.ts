import type { ReviewMetric } from "@/lib/supabase/types";
import { clamp, weightedAverage, latestByPeriod, type ScoreResult } from "./types";

export function computeTrustScore(reviewMetrics: ReviewMetric[]): ScoreResult {
  const latest = latestByPeriod(reviewMetrics);

  const reviewCountValue = latest ? clamp((latest.review_count / 50) * 100) : 0;
  const avgRatingValue = latest ? clamp((latest.avg_rating / 5) * 100) : 0;
  const freshnessValue = latest ? clamp(100 - latest.freshness_days / 3) : 0;
  const responseRateValue = latest ? clamp(latest.response_rate) : 0;
  const napValue = latest ? (latest.nap_consistency ? 100 : 40) : 0;
  const contactPageValue = latest ? clamp(latest.contact_page_quality) : 0;

  const components = [
    { label: "Nombre d'avis", value: Math.round(reviewCountValue), weight: 20 },
    { label: "Note moyenne", value: Math.round(avgRatingValue), weight: 25 },
    { label: "Fraîcheur des avis", value: Math.round(freshnessValue), weight: 15 },
    { label: "Taux de réponse", value: Math.round(responseRateValue), weight: 15 },
    { label: "Cohérence NAP", value: Math.round(napValue), weight: 10 },
    { label: "Qualité page contact", value: Math.round(contactPageValue), weight: 15 },
  ];

  return { value: weightedAverage(components), components };
}
