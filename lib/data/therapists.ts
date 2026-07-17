import { createClient } from "@/lib/supabase/server";
import type { TherapistProfile } from "@/lib/supabase/types";

export async function listTherapists(): Promise<TherapistProfile[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("therapist_profile")
    .select("*")
    .order("cabinet_name", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getTherapist(id: string): Promise<TherapistProfile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("therapist_profile")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function listDistinctCitiesAndSpecialties() {
  const therapists = await listTherapists();
  const cities = Array.from(new Set(therapists.map((t) => t.city).filter(Boolean))) as string[];
  const specialties = Array.from(
    new Set(therapists.map((t) => t.specialty).filter(Boolean))
  ) as string[];
  return { cities, specialties };
}
