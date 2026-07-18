"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminEmail } from "@/lib/auth/admin";
import { syncActionPlan } from "@/lib/actions/syncActionPlan";
import { seedStarterKeywordsIfNeeded } from "@/lib/actions/seedStarterKeywords";

function fieldsFromForm(formData: FormData) {
  return {
    cabinet_name: String(formData.get("cabinet_name") ?? ""),
    therapist_name: String(formData.get("therapist_name") ?? "") || null,
    specialty: String(formData.get("specialty") ?? "") || null,
    positioning: String(formData.get("positioning") ?? "") || null,
    city: String(formData.get("city") ?? "") || null,
    target_area: String(formData.get("target_area") ?? "") || null,
    address: String(formData.get("address") ?? "") || null,
    website_url: String(formData.get("website_url") ?? "") || null,
    gbp_url: String(formData.get("gbp_url") ?? "") || null,
    booking_url: String(formData.get("booking_url") ?? "") || null,
    phone: String(formData.get("phone") ?? "") || null,
    email: String(formData.get("email") ?? "") || null,
  };
}

export async function createTherapist(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const id = crypto.randomUUID();
  const fields = fieldsFromForm(formData);
  const { error } = await supabase
    .from("therapist_profile")
    .insert({ id, ...fields, user_id: user.id });

  if (error) throw error;

  await seedStarterKeywordsIfNeeded(id, fields);

  revalidatePath("/therapists");
  redirect(`/therapists/${id}`);
}

export async function updateTherapist(id: string, formData: FormData) {
  const supabase = await createClient();
  const fields = fieldsFromForm(formData);

  const { error } = await supabase
    .from("therapist_profile")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw error;

  await seedStarterKeywordsIfNeeded(id, fields);

  revalidatePath(`/therapists/${id}`);
  revalidatePath("/therapists");
  after(() => syncActionPlan(id));
}

export async function deleteTherapist(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("therapist_profile").delete().eq("id", id);
  if (error) throw error;

  revalidatePath("/therapists");
  redirect("/therapists");
}

export async function createInvite(therapistId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: pending, error: pendingError } = await supabase
    .from("therapist_collaborator")
    .select("id")
    .eq("therapist_id", therapistId)
    .is("user_id", null)
    .maybeSingle();

  if (pendingError) throw pendingError;

  if (!pending) {
    const { error } = await supabase
      .from("therapist_collaborator")
      .insert({ therapist_id: therapistId, invited_by: user.id });
    if (error) throw error;
  }

  revalidatePath(`/therapists/${therapistId}`);
}

export async function revokeCollaborator(collaboratorId: string, therapistId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("therapist_collaborator").delete().eq("id", collaboratorId);
  if (error) throw error;

  revalidatePath(`/therapists/${therapistId}`);
}

export async function deleteCollaboratorAccount(collaboratorId: string, therapistId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminEmail(user?.email)) {
    throw new Error("Action réservée à l'administrateur.");
  }

  const { data: collaborator, error: fetchError } = await supabase
    .from("therapist_collaborator")
    .select("user_id")
    .eq("id", collaboratorId)
    .single();

  if (fetchError) throw fetchError;

  if (collaborator?.user_id) {
    const adminClient = createAdminClient();
    const { error: deleteUserError } = await adminClient.auth.admin.deleteUser(
      collaborator.user_id
    );
    if (deleteUserError) throw deleteUserError;
  } else {
    const { error } = await supabase.from("therapist_collaborator").delete().eq("id", collaboratorId);
    if (error) throw error;
  }

  revalidatePath(`/therapists/${therapistId}`);
}
