"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function acceptInvite(token: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("accept_invite", { p_token: token });

  if (error || !data) {
    redirect(`/invite/${token}?error=1`);
  }

  redirect(`/therapists/${data}`);
}

export type InviteAuthState = { error: string | null; message?: string | null };

export async function requestInviteCode(
  token: string,
  _prevState: InviteAuthState,
  formData: FormData
): Promise<InviteAuthState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return { error: "Merci de renseigner votre email." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: true },
  });

  if (error) {
    return { error: "Impossible d'envoyer le code. Vérifiez l'adresse email." };
  }

  return { error: null, message: "sent" };
}

export async function verifyInviteCode(
  token: string,
  _prevState: InviteAuthState,
  formData: FormData
): Promise<InviteAuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const code = String(formData.get("code") ?? "").trim();

  if (!email || !code) {
    return { error: "Merci de renseigner le code reçu par email." };
  }

  const supabase = await createClient();
  const { error: verifyError } = await supabase.auth.verifyOtp({
    email,
    token: code,
    type: "email",
  });

  if (verifyError) {
    return { error: "Code invalide ou expiré. Redemandez un nouveau code." };
  }

  const { data, error: acceptError } = await supabase.rpc("accept_invite", { p_token: token });

  if (acceptError || !data) {
    redirect(`/invite/${token}?error=1`);
  }

  redirect(`/therapists/${data}`);
}
