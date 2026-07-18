import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/supabase/session";
import type { TherapistCollaborator } from "@/lib/supabase/types";

export interface CollaboratorWithEmail extends TherapistCollaborator {
  email: string | null;
}

export async function listCollaborators(therapistId: string): Promise<CollaboratorWithEmail[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("therapist_collaborator")
    .select("*")
    .eq("therapist_id", therapistId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  if (!data || data.length === 0) return [];

  const userIds = data.map((c) => c.user_id).filter((id): id is string => Boolean(id));
  let emailByUserId = new Map<string, string>();

  if (userIds.length > 0) {
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, email")
      .in("id", userIds);
    if (profilesError) throw profilesError;
    emailByUserId = new Map((profiles ?? []).map((p) => [p.id, p.email]));
  }

  return data.map((c) => ({ ...c, email: c.user_id ? emailByUserId.get(c.user_id) ?? null : null }));
}

export async function getCurrentUserId(): Promise<string | null> {
  const user = await getCurrentUser();
  return user?.id ?? null;
}
