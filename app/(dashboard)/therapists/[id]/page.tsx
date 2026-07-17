import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getTherapist } from "@/lib/data/therapists";
import { listCollaborators } from "@/lib/data/collaborators";
import { createClient } from "@/lib/supabase/server";
import { TherapistForm } from "@/components/dashboard/TherapistForm";
import { updateTherapist, deleteTherapist, createInvite, revokeCollaborator } from "../actions";
import { Card } from "@/components/ui/Card";
import { Button, LinkButton } from "@/components/ui/Button";
import { CopyLinkField } from "@/components/dashboard/CopyLinkField";

export default async function TherapistDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const therapist = await getTherapist(id);
  if (!therapist) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isOwner = user?.id === therapist.user_id;

  const updateWithId = updateTherapist.bind(null, id);
  const deleteWithId = deleteTherapist.bind(null, id);
  const createInviteWithId = createInvite.bind(null, id);

  const collaborators = isOwner ? await listCollaborators(id) : [];
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

      {isOwner && (
        <Card>
          <h2 className="text-sm font-semibold text-slate-900">Partager l&apos;accès</h2>
          <p className="mt-1 text-sm text-slate-500">
            Donnez à ce thérapeute un accès complet à ce cabinet (lecture et modification), sur son
            propre compte. Aucun email n&apos;est envoyé : partagez le lien vous-même.
          </p>

          <div className="mt-4 space-y-4">
            {inviteUrl ? (
              <div>
                <p className="text-xs font-medium text-slate-500">Lien d&apos;invitation en attente</p>
                <div className="mt-1">
                  <CopyLinkField value={inviteUrl} />
                </div>
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
                      className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-sm"
                    >
                      <span className="text-slate-700">{c.email ?? "Compte inconnu"}</span>
                      <form action={revokeCollaborator.bind(null, c.id, id)}>
                        <Button type="submit" variant="ghost">
                          Révoquer
                        </Button>
                      </form>
                    </li>
                  ))}
                  {pendingInvite && (
                    <li className="flex items-center justify-between rounded-md border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-500">
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
    </div>
  );
}
