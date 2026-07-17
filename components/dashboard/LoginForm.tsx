"use client";

import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn, signUp, type AuthFormState } from "@/app/(auth)/login/actions";

const initialState: AuthFormState = { error: null };

export function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "";
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [signInState, signInAction, signInPending] = useActionState(signIn, initialState);
  const [signUpState, signUpAction, signUpPending] = useActionState(signUp, initialState);

  const state = mode === "signin" ? signInState : signUpState;
  const action = mode === "signin" ? signInAction : signUpAction;
  const pending = mode === "signin" ? signInPending : signUpPending;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">SEO Local Therapist Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          {mode === "signin" ? "Connectez-vous à votre compte" : "Créez votre compte"}
        </p>
        {redirectTo && (
          <p className="mt-2 rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-700">
            Connectez-vous ou créez un compte pour accéder à l&apos;invitation.
          </p>
        )}

        <form action={action} className="mt-6 space-y-4">
          <input type="hidden" name="redirect" value={redirectTo} />
          {mode === "signup" && (
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-slate-700">
                Nom complet
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                autoComplete="name"
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            />
          </div>

          {state.error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
          )}
          {state.message && (
            <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {pending ? "..." : mode === "signin" ? "Se connecter" : "Créer le compte"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 w-full text-center text-sm text-slate-500 hover:text-slate-700"
        >
          {mode === "signin"
            ? "Pas encore de compte ? Créer un compte"
            : "Déjà un compte ? Se connecter"}
        </button>
      </div>
    </div>
  );
}
