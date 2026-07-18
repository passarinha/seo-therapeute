"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { syncActionPlan } from "@/lib/actions/syncActionPlan";

function deriveNameFromUrl(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function fieldsFromForm(formData: FormData) {
  const reviewCount = formData.get("review_count");
  const avgRating = formData.get("avg_rating");
  const websiteUrl = String(formData.get("website_url") ?? "").trim() || null;
  const nameInput = String(formData.get("name") ?? "").trim();
  const name = nameInput || (websiteUrl ? deriveNameFromUrl(websiteUrl) : "Concurrent");

  return {
    name,
    website_url: websiteUrl,
    city: String(formData.get("city") ?? "") || null,
    review_count: reviewCount ? Number(reviewCount) : null,
    avg_rating: avgRating ? Number(avgRating) : null,
    offer_type: String(formData.get("offer_type") ?? "") || null,
    differentiation: String(formData.get("differentiation") ?? "") || null,
    opportunity: String(formData.get("opportunity") ?? "") || null,
  };
}

export async function createCompetitor(therapistId: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("competitor")
    .insert({ ...fieldsFromForm(formData), therapist_id: therapistId });

  if (error) throw error;

  revalidatePath(`/therapists/${therapistId}/competitors`);
  after(() => syncActionPlan(therapistId));
  redirect(`/therapists/${therapistId}/competitors`);
}

export async function updateCompetitor(id: string, therapistId: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("competitor")
    .update({ ...fieldsFromForm(formData), updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw error;

  revalidatePath(`/therapists/${therapistId}/competitors`);
  after(() => syncActionPlan(therapistId));
  redirect(`/therapists/${therapistId}/competitors`);
}

export async function deleteCompetitor(id: string, therapistId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("competitor").delete().eq("id", id);
  if (error) throw error;

  revalidatePath(`/therapists/${therapistId}/competitors`);
  redirect(`/therapists/${therapistId}/competitors`);
}
