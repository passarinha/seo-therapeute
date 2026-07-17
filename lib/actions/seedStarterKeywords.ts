import { createClient } from "@/lib/supabase/server";
import { generateStarterKeywords, type StarterKeywordInput } from "@/lib/seo/starterKeywords";

/**
 * Insère 2 mots-clés de démarrage (basés sur la spécialité/positionnement) si le
 * cabinet n'a encore aucun mot-clé — donne immédiatement 2 groupes d'annonces
 * d'exemple dans l'onglet Google Ads plutôt qu'un onglet vide.
 */
export async function seedStarterKeywordsIfNeeded(
  therapistId: string,
  therapist: StarterKeywordInput
) {
  if (!therapist.specialty) return;

  const supabase = await createClient();
  const { count, error: countError } = await supabase
    .from("keyword")
    .select("id", { count: "exact", head: true })
    .eq("therapist_id", therapistId);

  if (countError) throw countError;
  if (count && count > 0) return;

  const starters = generateStarterKeywords(therapist);
  if (starters.length === 0) return;

  const { error } = await supabase.from("keyword").insert(
    starters.map((s) => ({
      therapist_id: therapistId,
      keyword: s.keyword,
      location: s.location,
      priority: "medium" as const,
      status: "todo" as const,
    }))
  );
  if (error) throw error;
}
