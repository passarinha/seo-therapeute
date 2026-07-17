import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getTherapist } from "@/lib/data/therapists";
import { listKeywords } from "@/lib/data/keywords";
import { listCompetitors } from "@/lib/data/competitors";
import { listSeoMetrics, listReviewMetrics, listConversionMetrics, listGbpMetrics } from "@/lib/data/metrics";
import { listActionItems } from "@/lib/data/action-items";
import { computeVisibilityScore, computeTrustScore, computeConversionScore, latestByPeriod } from "@/lib/scoring";
import { generateActionPlan } from "./generateActionPlan";

/**
 * Recalcule les scores et complète le plan d'action avec les nouvelles recommandations
 * pertinentes (sans dupliquer celles déjà présentes). Appelé automatiquement après toute
 * saisie qui peut faire bouger les scores (métriques, concurrents, fiche cabinet) — le
 * plan d'action reste à jour sans action manuelle de l'utilisateur.
 */
export async function syncActionPlan(therapistId: string) {
  const therapist = await getTherapist(therapistId);
  if (!therapist) return;

  const [seoMetrics, gbpMetrics, reviewMetrics, conversionMetrics, keywords, competitors, existingActions] =
    await Promise.all([
      listSeoMetrics(therapistId),
      listGbpMetrics(therapistId),
      listReviewMetrics(therapistId),
      listConversionMetrics(therapistId),
      listKeywords(therapistId),
      listCompetitors(therapistId),
      listActionItems(therapistId),
    ]);

  const scores = {
    visibility: computeVisibilityScore(seoMetrics, keywords),
    trust: computeTrustScore(reviewMetrics),
    conversion: computeConversionScore(conversionMetrics, gbpMetrics),
  };

  const candidates = generateActionPlan(therapist, scores, latestByPeriod(reviewMetrics), competitors);
  const existingTitles = new Set(existingActions.map((a) => a.title));
  const newCandidates = candidates.filter((c) => !existingTitles.has(c.title));

  if (newCandidates.length > 0) {
    const supabase = await createClient();
    const { error } = await supabase
      .from("action_item")
      .insert(newCandidates.map((c) => ({ ...c, therapist_id: therapistId })));
    if (error) throw error;
  }

  revalidatePath(`/therapists/${therapistId}/actions`);
  revalidatePath("/");
}
