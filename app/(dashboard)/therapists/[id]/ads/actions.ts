"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getTherapist } from "@/lib/data/therapists";
import { getKeyword } from "@/lib/data/keywords";
import { listAdIdeas } from "@/lib/data/adIdeas";
import { suggestAnotherAdVariant } from "@/lib/ads/generateAdIdeas";

export async function updateAdIdea(id: string, therapistId: string, formData: FormData) {
  const headline = String(formData.get("headline") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  if (!headline || !description) return;

  const supabase = await createClient();
  const { error } = await supabase
    .from("ad_idea")
    .update({ headline, description, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw error;

  revalidatePath(`/therapists/${therapistId}/ads`);
}

export async function deleteAdIdea(id: string, therapistId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("ad_idea").delete().eq("id", id);
  if (error) throw error;

  revalidatePath(`/therapists/${therapistId}/ads`);
}

export async function addSuggestedAdIdea(keywordId: string, therapistId: string) {
  const [therapist, keyword, existing] = await Promise.all([
    getTherapist(therapistId),
    getKeyword(keywordId),
    listAdIdeas(keywordId),
  ]);
  if (!therapist || !keyword) return;

  const variant = suggestAnotherAdVariant(therapist, keyword, existing.length);

  const supabase = await createClient();
  const { error } = await supabase.from("ad_idea").insert({
    therapist_id: therapistId,
    keyword_id: keywordId,
    headline: variant.headline,
    description: variant.description,
    position: existing.length,
  });

  if (error) throw error;

  revalidatePath(`/therapists/${therapistId}/ads`);
}
