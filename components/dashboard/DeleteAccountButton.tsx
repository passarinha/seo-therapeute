"use client";

import { deleteCollaboratorAccount } from "@/app/(dashboard)/therapists/actions";

export function DeleteAccountButton({
  collaboratorId,
  therapistId,
}: {
  collaboratorId: string;
  therapistId: string;
}) {
  const action = deleteCollaboratorAccount.bind(null, collaboratorId, therapistId);

  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (
          !window.confirm(
            "Supprimer définitivement le compte de connexion de ce thérapeute (et toutes ses données) ? Cette action est irréversible."
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <button type="submit" className="text-xs font-medium text-red-600 hover:underline">
        Supprimer le compte
      </button>
    </form>
  );
}
