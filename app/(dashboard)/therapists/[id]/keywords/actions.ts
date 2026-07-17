"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Priority, ItemStatus } from "@/lib/supabase/types";

function fieldsFromForm(formData: FormData) {
  const volume = formData.get("volume_estimate");
  const difficulty = formData.get("difficulty");
  const position = formData.get("current_position");

  return {
    keyword: String(formData.get("keyword") ?? ""),
    search_intent: String(formData.get("search_intent") ?? "") || null,
    location: String(formData.get("location") ?? "") || null,
    volume_estimate: volume ? Number(volume) : null,
    difficulty: difficulty ? Number(difficulty) : null,
    current_position: position ? Number(position) : null,
    target_url: String(formData.get("target_url") ?? "") || null,
    priority: (String(formData.get("priority") ?? "medium")) as Priority,
    status: (String(formData.get("status") ?? "todo")) as ItemStatus,
  };
}

export async function createKeyword(therapistId: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("keyword")
    .insert({ ...fieldsFromForm(formData), therapist_id: therapistId });

  if (error) throw error;

  revalidatePath(`/therapists/${therapistId}/keywords`);
  redirect(`/therapists/${therapistId}/keywords`);
}

export async function updateKeyword(id: string, therapistId: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("keyword")
    .update({ ...fieldsFromForm(formData), updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw error;

  revalidatePath(`/therapists/${therapistId}/keywords`);
  redirect(`/therapists/${therapistId}/keywords`);
}

export async function deleteKeyword(id: string, therapistId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("keyword").delete().eq("id", id);
  if (error) throw error;

  revalidatePath(`/therapists/${therapistId}/keywords`);
  redirect(`/therapists/${therapistId}/keywords`);
}

export async function quickAddKeyword(therapistId: string, formData: FormData) {
  const keywordText = String(formData.get("keyword") ?? "").trim();
  if (!keywordText) return;
  const location = String(formData.get("location") ?? "") || null;

  const supabase = await createClient();
  const { error } = await supabase.from("keyword").insert({
    therapist_id: therapistId,
    keyword: keywordText,
    location,
    priority: "medium",
    status: "todo",
  });
  if (error) throw error;

  revalidatePath(`/therapists/${therapistId}/keywords`);
}

export async function createKeywordsBulk(therapistId: string, formData: FormData) {
  const raw = String(formData.get("bulk_keywords") ?? "");
  const seen = new Set<string>();
  const lines: string[] = [];
  for (const l of raw.split("\n").map((l) => l.trim()).filter(Boolean)) {
    const key = l.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    lines.push(l);
  }
  if (lines.length === 0) return;

  const supabase = await createClient();
  const { data: existing, error: existingError } = await supabase
    .from("keyword")
    .select("keyword")
    .eq("therapist_id", therapistId);
  if (existingError) throw existingError;

  const existingLower = new Set((existing ?? []).map((k) => k.keyword.toLowerCase()));
  const newKeywords = lines.filter((l) => !existingLower.has(l.toLowerCase()));
  if (newKeywords.length === 0) return;

  const { error } = await supabase.from("keyword").insert(
    newKeywords.map((keywordText) => ({
      therapist_id: therapistId,
      keyword: keywordText,
      priority: "medium" as Priority,
      status: "todo" as ItemStatus,
    }))
  );
  if (error) throw error;

  revalidatePath(`/therapists/${therapistId}/keywords`);
}

export async function updateKeywordPriority(id: string, therapistId: string, priority: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("keyword")
    .update({ priority: priority as Priority, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;

  revalidatePath(`/therapists/${therapistId}/keywords`);
}

export async function updateKeywordStatus(id: string, therapistId: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("keyword")
    .update({ status: status as ItemStatus, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;

  revalidatePath(`/therapists/${therapistId}/keywords`);
}
