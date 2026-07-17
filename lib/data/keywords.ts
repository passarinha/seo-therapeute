import { createClient } from "@/lib/supabase/server";
import type { Keyword, Priority, ItemStatus } from "@/lib/supabase/types";

export interface KeywordFilters {
  priority?: string;
  status?: string;
  location?: string;
}

export async function listKeywords(
  therapistId: string,
  filters: KeywordFilters = {}
): Promise<Keyword[]> {
  const supabase = await createClient();
  let query = supabase
    .from("keyword")
    .select("*")
    .eq("therapist_id", therapistId)
    .order("priority", { ascending: false })
    .order("updated_at", { ascending: false });

  if (filters.priority) query = query.eq("priority", filters.priority as Priority);
  if (filters.status) query = query.eq("status", filters.status as ItemStatus);
  if (filters.location) query = query.eq("location", filters.location);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getKeyword(id: string): Promise<Keyword | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("keyword").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}
