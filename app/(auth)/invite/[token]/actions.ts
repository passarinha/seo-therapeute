"use server";

import { headers } from "next/headers";
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

export async function requestInviteLink(
  token: string,
  _prevState: InviteAuthState,
  formData: FormData
): Promise<InviteAuthState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return { error: "Merci de renseigner votre email." };
  }

  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = host?.startsWith("localhost") ? "http" : "https";
  const emailRedirectTo = `${protocol}://${host}/auth/callback?next=${encodeURIComponent(
    `/invite/${token}`
  )}`;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: true, emailRedirectTo },
  });

  if (error) {
    return { error: "Impossible d'envoyer le lien. Vérifiez l'adresse email." };
  }

  return { error: null, message: "sent" };
}
