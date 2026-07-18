"use client";

import { useActionState, useState } from "react";
import { requestInviteLink, type InviteAuthState } from "@/app/(auth)/invite/[token]/actions";

const initialState: InviteAuthState = { error: null };

export function InviteAuthForm({ token }: { token: string }) {
  const requestAction = requestInviteLink.bind(null, token);
  const [email, setEmail] = useState("");
  const [state, formAction, pending] = useActionState(requestAction, initialState);

  const sent = !state.error && state.message === "sent";

  if (sent) {
    return (
      <p className="mt-4 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
        Un lien de connexion a été envoyé à <strong>{email}</strong>. Ouvrez votre boîte mail et
        cliquez dessus pour accéder au cabinet — aucun mot de passe à créer.
      </p>
    );
  }

  return (
    <form action={formAction} className="mt-4 space-y-3 text-left">
      <div>
        <label htmlFor="invite-email" className="block text-sm font-medium text-slate-700">
          Votre email
        </label>
        <input
          id="invite-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
      </div>
      {state.error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
      >
        {pending ? "Envoi..." : "Recevoir le lien de connexion par email"}
      </button>
    </form>
  );
}
