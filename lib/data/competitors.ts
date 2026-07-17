import { createClient } from "@/lib/supabase/server";
import type { Competitor } from "@/lib/supabase/types";

export type CompetitorSort = "reviews" | "rating" | "name";

export async function listCompetitors(
  therapistId: string,
  sort: CompetitorSort = "reviews"
): Promise<Competitor[]> {
  const supabase = await createClient();
  let query = supabase.from("competitor").select("*").eq("therapist_id", therapistId);

  if (sort === "rating") {
    query = query.order("avg_rating", { ascending: false });
  } else if (sort === "name") {
    query = query.order("name", { ascending: true });
  } else {
    query = query.order("review_count", { ascending: false });
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getCompetitor(id: string): Promise<Competitor | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("competitor").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}
