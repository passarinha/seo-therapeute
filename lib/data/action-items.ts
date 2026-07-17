import { createClient } from "@/lib/supabase/server";
import type { ActionItem } from "@/lib/supabase/types";

export async function listActionItems(therapistId: string): Promise<ActionItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("action_item")
    .select("*")
    .eq("therapist_id", therapistId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

const IMPACT_ORDER: Record<string, number> = { high: 3, medium: 2, low: 1 };

export function sortActionsByImpact(items: ActionItem[]): ActionItem[] {
  return [...items].sort((a, b) => IMPACT_ORDER[b.impact_estimate] - IMPACT_ORDER[a.impact_estimate]);
}
