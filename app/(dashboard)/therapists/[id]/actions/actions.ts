"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { syncActionPlan } from "@/lib/actions/syncActionPlan";
import type { ItemStatus } from "@/lib/supabase/types";

export async function regenerateActionPlan(therapistId: string) {
  await syncActionPlan(therapistId);
}

export async function createActionItem(therapistId: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("action_item").insert({
    therapist_id: therapistId,
    title: String(formData.get("title") ?? ""),
    category: String(formData.get("category") ?? "") || null,
    impact_estimate: String(formData.get("impact_estimate") ?? "medium") as "low" | "medium" | "high",
  });
  if (error) throw error;

  revalidatePath(`/therapists/${therapistId}/actions`);
}

export async function updateActionStatus(id: string, therapistId: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("action_item")
    .update({ status: status as ItemStatus })
    .eq("id", id);
  if (error) throw error;

  revalidatePath(`/therapists/${therapistId}/actions`);
}

export async function deleteActionItem(id: string, therapistId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("action_item").delete().eq("id", id);
  if (error) throw error;

  revalidatePath(`/therapists/${therapistId}/actions`);
}
