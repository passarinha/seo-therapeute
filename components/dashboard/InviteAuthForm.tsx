"use client";

import { useActionState, useState } from "react";
import {
  requestInviteCode,
  verifyInviteCode,
  type InviteAuthState,
} from "@/app/(auth)/invite/[token]/actions";

const initialState: InviteAuthState = { error: null };

export function InviteAuthForm({ token }: { token: string }) {
  const requestAction = requestInviteCode.bind(null, token);
  const verifyAction = verifyInviteCode.bind(null, token);

  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [requestState, requestFormAction, requestPending] = useActionState(
    requestAction,
    initialState
  );
  const [verifyState, verifyFormAction, verifyPending] = useActionState(
    verifyAction,
    initialState
  );
  const [prevRequestState, setPrevRequestState] = useState(requestState);

  if (requestState !== prevRequestState) {
    setPrevRequestState(requestState);
    if (!requestState.error && requestState.message === "sent") {
      setStep("code");
    }
  }

  if (step === "email") {
    return (
      <form action={requestFormAction} className="mt-4 space-y-3 text-left">
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
        {requestState.error && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {requestState.error}
          </p>
        )}
        <button
          type="submit"
          disabled={requestPending}
          className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {requestPending ? "Envoi..." : "Recevoir mon code par email"}
        </button>
      </form>
    );
  }

  return (
    <form action={verifyFormAction} className="mt-4 space-y-3 text-left">
      <input type="hidden" name="email" value={email} />
      <p className="text-sm text-slate-600">
        Un code à 6 chiffres a été envoyé à <strong>{email}</strong>.
      </p>
      <div>
        <label htmlFor="invite-code" className="block text-sm font-medium text-slate-700">
          Code reçu par email
        </label>
        <input
          id="invite-code"
          name="code"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          required
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-center text-lg tracking-[0.3em] shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
      </div>
      {verifyState.error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{verifyState.error}</p>
      )}
      <button
        type="submit"
        disabled={verifyPending}
        className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
      >
        {verifyPending ? "Vérification..." : "Valider et accéder au cabinet"}
      </button>
      <button
        type="button"
        onClick={() => setStep("email")}
        className="w-full text-center text-sm text-slate-500 hover:text-slate-700"
      >
        Changer d&apos;email ou redemander un code
      </button>
    </form>
  );
}
