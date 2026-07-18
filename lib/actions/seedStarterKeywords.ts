import { createClient } from "@/lib/supabase/server";
import { generateStarterKeywords, type StarterKeywordInput } from "@/lib/seo/starterKeywords";
import type { Keyword } from "@/lib/supabase/types";

/**
 * Insère directement les mots-clés de démarrage, sans vérifier au préalable si
 * le cabinet en a déjà — à n'utiliser que lorsque l'appelant sait déjà que la
 * liste est vide (évite une requête de comptage redondante).
 */
export async function insertStarterKeywords(
  therapistId: string,
  therapist: StarterKeywordInput
): Promise<Keyword[]> {
  if (!therapist.specialty) return [];

  const starters = generateStarterKeywords(therapist);
  if (starters.length === 0) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("keyword")
    .insert(
      starters.map((s) => ({
        therapist_id: therapistId,
        keyword: s.keyword,
        location: s.location,
        priority: "medium" as const,
        status: "todo" as const,
      }))
    )
    .select("*");

  if (error) throw error;
  return data ?? [];
}

/**
 * Insère 2 mots-clés de démarrage (basés sur la spécialité/positionnement) si le
 * cabinet n'a encore aucun mot-clé — donne immédiatement 2 groupes d'annonces
 * d'exemple dans l'onglet Google Ads plutôt qu'un onglet vide. Fait sa propre
 * vérification : à utiliser uniquement quand on ne connaît pas déjà l'état
 * actuel des mots-clés (sinon préférer insertStarterKeywords directement).
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

  await insertStarterKeywords(therapistId, therapist);
}
