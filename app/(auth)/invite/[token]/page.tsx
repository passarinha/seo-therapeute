import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { acceptInvite } from "./actions";

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm text-center">
        {children}
      </div>
    </div>
  );
}

export default async function InvitePage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { token } = await params;
  const { error: errorParam } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Shell>
        <h1 className="text-lg font-semibold text-slate-900">Invitation à un cabinet</h1>
        <p className="mt-2 text-sm text-slate-600">
          Connectez-vous ou créez un compte pour accepter cette invitation.
        </p>
        <Link
          href={`/login?redirect=${encodeURIComponent(`/invite/${token}`)}`}
          className="mt-4 inline-block w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Se connecter / Créer un compte
        </Link>
      </Shell>
    );
  }

  const { data } = await supabase.rpc("get_invite_details", { p_token: token });
  const invite = data?.[0];

  if (!invite) {
    return (
      <Shell>
        <h1 className="text-lg font-semibold text-slate-900">Invitation introuvable</h1>
        <p className="mt-2 text-sm text-slate-600">
          Ce lien d&apos;invitation n&apos;existe pas ou n&apos;est plus valide.
        </p>
      </Shell>
    );
  }

  if (invite.accepted) {
    return (
      <Shell>
        <h1 className="text-lg font-semibold text-slate-900">Invitation déjà utilisée</h1>
        <p className="mt-2 text-sm text-slate-600">
          Cette invitation a déjà été acceptée. Si vous y avez déjà accès, retrouvez le cabinet
          depuis votre tableau de bord.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block w-full rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Aller au tableau de bord
        </Link>
      </Shell>
    );
  }

  const acceptWithToken = acceptInvite.bind(null, token);

  return (
    <Shell>
      <h1 className="text-lg font-semibold text-slate-900">Invitation à un cabinet</h1>
      <p className="mt-2 text-sm text-slate-600">
        Vous êtes invité(e) à accéder au cabinet <strong>{invite.cabinet_name}</strong> (lecture et
        modification).
      </p>
      {errorParam && (
        <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          Cette invitation est invalide ou a déjà été utilisée.
        </p>
      )}
      <form action={acceptWithToken} className="mt-4">
        <button
          type="submit"
          className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Accepter et accéder au cabinet
        </button>
      </form>
    </Shell>
  );
}
