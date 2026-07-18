import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getTherapist } from "@/lib/data/therapists";
import { listCollaborators } from "@/lib/data/collaborators";
import { getCurrentUser } from "@/lib/supabase/session";
import { isAdminEmail } from "@/lib/auth/admin";
import { TherapistForm } from "@/components/dashboard/TherapistForm";
import {
  updateTherapist,
  deleteTherapist,
  createInvite,
  regenerateInvite,
  revokeCollaborator,
} from "../actions";
import { Card } from "@/components/ui/Card";
import { Button, LinkButton } from "@/components/ui/Button";
import { CopyLinkField } from "@/components/dashboard/CopyLinkField";
import { DeleteAccountButton } from "@/components/dashboard/DeleteAccountButton";

export default async function TherapistDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const therapist = await getTherapist(id);
  if (!therapist) notFound();

  const user = await getCurrentUser();
  const isOwner = user?.id === therapist.user_id;
  const isAdmin = isAdminEmail(user?.email);
  const canManage = isOwner || isAdmin;

  const updateWithId = updateTherapist.bind(null, id);
  const deleteWithId = deleteTherapist.bind(null, id);
  const createInviteWithId = createInvite.bind(null, id);

  const collaborators = canManage ? await listCollaborators(id) : [];
  const pendingInvite = collaborators.find((c) => !c.accepted_at);
  const acceptedCollaborators = collaborators.filter((c) => c.accepted_at);

  let inviteUrl: string | null = null;
  if (pendingInvite) {
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = host?.startsWith("localhost") ? "http" : "https";
    inviteUrl = `${protocol}://${host}/invite/${pendingInvite.invite_token}`;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex justify-end">
        <LinkButton href={`/api/export/pdf?therapist=${id}`} variant="secondary">
          Exporter le dashboard en PDF
        </LinkButton>
      </div>

      <Card>
        <TherapistForm action={updateWithId} therapist={therapist} submitLabel="Enregistrer" />
      </Card>

      {canManage && (
        <Card>
          <h2 className="text-sm font-semibold text-slate-900">Partager l&apos;accès</h2>
          <p className="mt-1 text-sm text-slate-500">
            Donnez à ce thérapeute un accès complet à ce cabinet (lecture et modification), sur son
            propre compte. Aucun email n&apos;est envoyé : partagez le lien vous-même.
          </p>

          <div className="mt-4 space-y-4">
            {inviteUrl && pendingInvite ? (
              <div>
                <p className="text-xs font-medium text-slate-500">Lien d&apos;invitation en attente</p>
                <div className="mt-1">
                  <CopyLinkField value={inviteUrl} />
                </div>
                <form action={regenerateInvite.bind(null, id, pendingInvite.id)} className="mt-2">
                  <Button type="submit" variant="ghost">
                    Régénérer un nouveau lien
                  </Button>
                </form>
              </div>
            ) : (
              <form action={createInviteWithId}>
                <Button type="submit" variant="secondary">
                  Générer un lien d&apos;invitation
                </Button>
              </form>
            )}

            {collaborators.length > 0 && (
              <div>
                <p className="text-xs font-medium text-slate-500">Accès accordés</p>
                <ul className="mt-2 space-y-2">
                  {acceptedCollaborators.map((c) => (
                    <li
                      key={c.id}
                      className="flex flex-col gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm sm:flex-row sm:items-center sm:justify-between"
                    >
                      <span className="min-w-0 truncate text-slate-700">{c.email ?? "Compte inconnu"}</span>
                      <div className="flex items-center gap-3">
                        {isAdmin && (
                          <DeleteAccountButton collaboratorId={c.id} therapistId={id} />
                        )}
                        <form action={revokeCollaborator.bind(null, c.id, id)}>
                          <Button type="submit" variant="ghost">
                            Révoquer
                          </Button>
                        </form>
                      </div>
                    </li>
                  ))}
                  {pendingInvite && (
                    <li className="flex flex-col gap-2 rounded-md border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                      <span>Invitation en attente</span>
                      <form action={revokeCollaborator.bind(null, pendingInvite.id, id)}>
                        <Button type="submit" variant="ghost">
                          Annuler
                        </Button>
                      </form>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </Card>
      )}

      {canManage && (
        <Card className="border-red-200">
          <h2 className="text-sm font-semibold text-red-700">Zone de suppression</h2>
          <p className="mt-1 text-sm text-slate-500">
            Supprime définitivement cette fiche et toutes ses données associées (mots-clés,
            concurrents, métriques, plan d&apos;action).
          </p>
          <form action={deleteWithId} className="mt-3">
            <Button type="submit" variant="danger">
              Supprimer ce cabinet
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
