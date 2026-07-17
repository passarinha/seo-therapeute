import type { TherapistProfile, ReviewMetric, Competitor, ActionImpact } from "@/lib/supabase/types";
import type { ScoreResult } from "@/lib/scoring";
import { summarizeCompetitors } from "@/lib/seo/competitorInsights";

export interface ActionCandidate {
  title: string;
  category: string;
  impact_estimate: ActionImpact;
}

export function generateActionPlan(
  therapist: TherapistProfile,
  scores: { visibility: ScoreResult; trust: ScoreResult; conversion: ScoreResult },
  latestReview: ReviewMetric | null,
  competitors: Competitor[] = []
): ActionCandidate[] {
  const candidates: ActionCandidate[] = [];

  if (!therapist.gbp_url) {
    candidates.push({
      title: "Renseigner le lien de la fiche Google Business Profile",
      category: "gbp",
      impact_estimate: "high",
    });
  } else if (scores.visibility.value < 60) {
    candidates.push({
      title: "Optimiser la fiche Google Business Profile (photos, description, catégories)",
      category: "gbp",
      impact_estimate: "high",
    });
  }

  if (scores.visibility.value < 50) {
    candidates.push({
      title: "Créer ou améliorer les pages services ciblant les mots-clés prioritaires",
      category: "content",
      impact_estimate: "high",
    });
  } else if (scores.visibility.value < 70) {
    candidates.push({
      title: "Ajouter des FAQ locales sur les pages clés",
      category: "content",
      impact_estimate: "medium",
    });
  }

  if (scores.trust.value < 60) {
    candidates.push({
      title: "Renforcer les signaux de confiance (réassurance, preuves sociales)",
      category: "trust",
      impact_estimate: "high",
    });
  }

  if (!latestReview || latestReview.review_count < 20) {
    candidates.push({
      title: "Demander de nouveaux avis aux patients récents",
      category: "trust",
      impact_estimate: "medium",
    });
  }

  if (scores.conversion.value < 60) {
    candidates.push({
      title: "Améliorer l'expérience de prise de contact (RDV, téléphone, formulaire)",
      category: "conversion",
      impact_estimate: "high",
    });
  }

  if (!therapist.booking_url) {
    candidates.push({
      title: "Ajouter un lien de réservation en ligne",
      category: "conversion",
      impact_estimate: "medium",
    });
  }

  if (!therapist.website_url) {
    candidates.push({
      title: "Créer un site web ou une page de présentation",
      category: "content",
      impact_estimate: "high",
    });
  }

  const competitorSummary = summarizeCompetitors(competitors);
  if (competitorSummary.avgReviewCount != null) {
    const yours = latestReview?.review_count ?? 0;
    if (yours < competitorSummary.avgReviewCount) {
      candidates.push({
        title: `Combler l'écart d'avis avec vos concurrents (moyenne ${competitorSummary.avgReviewCount} vs vos ${yours})`,
        category: "competitors",
        impact_estimate: competitorSummary.avgReviewCount - yours > 15 ? "high" : "medium",
      });
    }
  }
  if (competitorSummary.avgRating != null) {
    const yours = latestReview?.avg_rating ?? 0;
    if (yours > 0 && yours < competitorSummary.avgRating) {
      candidates.push({
        title: `Améliorer votre note moyenne pour dépasser vos concurrents (moyenne ${competitorSummary.avgRating}★ vs vos ${yours}★)`,
        category: "competitors",
        impact_estimate: "medium",
      });
    }
  }

  return candidates;
}
