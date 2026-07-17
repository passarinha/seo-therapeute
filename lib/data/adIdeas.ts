import { createClient } from "@/lib/supabase/server";
import { generateAdIdeas } from "@/lib/ads/generateAdIdeas";
import type { AdIdea, Keyword, TherapistProfile } from "@/lib/supabase/types";

export async function listAdIdeas(keywordId: string): Promise<AdIdea[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ad_idea")
    .select("*")
    .eq("keyword_id", keywordId)
    .order("position", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

/**
 * Génère et persiste les 5 annonces de départ pour un mot-clé s'il n'en a
 * encore aucune — elles deviennent ensuite éditables et supprimables comme
 * n'importe quelle donnée saisie manuellement.
 */
export async function seedAdIdeasForKeyword(
  therapist: TherapistProfile,
  keyword: Keyword
): Promise<AdIdea[]> {
  const existing = await listAdIdeas(keyword.id);
  if (existing.length > 0) return existing;

  const generated = generateAdIdeas(therapist, keyword);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ad_idea")
    .insert(
      generated.ads.map((ad, i) => ({
        therapist_id: therapist.id,
        keyword_id: keyword.id,
        headline: ad.headline.text,
        description: ad.description.text,
        position: i,
      }))
    )
    .select("*");

  if (error) throw error;
  return data ?? [];
}
