import type { Competitor, TherapistProfile, ReviewMetric } from "@/lib/supabase/types";

export interface CompetitorSummary {
  count: number;
  avgReviewCount: number | null;
  avgRating: number | null;
  strongest: Competitor | null;
}

function average(values: number[]): number | null {
  if (values.length === 0) return null;
  return Math.round((values.reduce((s, v) => s + v, 0) / values.length) * 10) / 10;
}

export function summarizeCompetitors(competitors: Competitor[]): CompetitorSummary {
  const reviewCounts = competitors.map((c) => c.review_count).filter((v): v is number => v != null);
  const ratings = competitors.map((c) => c.avg_rating).filter((v): v is number => v != null);

  const strongest =
    competitors.length > 0
      ? [...competitors].sort((a, b) => (b.review_count ?? 0) - (a.review_count ?? 0))[0]
      : null;

  return {
    count: competitors.length,
    avgReviewCount: average(reviewCounts),
    avgRating: average(ratings),
    strongest,
  };
}

export interface DifferentiationTip {
  title: string;
  detail: string;
}

export function generateDifferentiationTips(
  therapist: TherapistProfile,
  competitors: Competitor[],
  latestReview: ReviewMetric | null
): DifferentiationTip[] {
  const tips: DifferentiationTip[] = [];
  const summary = summarizeCompetitors(competitors);

  if (summary.avgReviewCount != null) {
    const yours = latestReview?.review_count ?? 0;
    if (yours < summary.avgReviewCount) {
      tips.push({
        title: "Combler l'écart d'avis avec vos concurrents",
        detail: `Vos concurrents suivis ont en moyenne ${summary.avgReviewCount} avis, vous en avez ${yours}. Demandez à vos patients récents de laisser un avis.`,
      });
    }
  }

  if (summary.avgRating != null) {
    const yours = latestReview?.avg_rating ?? 0;
    if (yours > 0 && yours < summary.avgRating) {
      tips.push({
        title: "Améliorer votre note moyenne",
        detail: `La note moyenne de vos concurrents suivis est ${summary.avgRating}★, la vôtre est ${yours}★. Répondez aux avis récents et mettez en avant vos points forts.`,
      });
    }
  }

  for (const c of competitors) {
    if (c.opportunity && c.opportunity.trim()) {
      tips.push({
        title: `Opportunité repérée chez ${c.name}`,
        detail: c.opportunity.trim(),
      });
    }
  }

  return tips;
}
