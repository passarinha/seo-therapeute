import { listActionItems, sortActionsByImpact } from "@/lib/data/action-items";
import { Card, CardTitle } from "@/components/ui/Card";
import { Badge, priorityColor, priorityLabel } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ActionItemForm } from "@/components/dashboard/ActionItemForm";
import { ActionStatusSelect } from "@/components/dashboard/ActionStatusSelect";
import { regenerateActionPlan, createActionItem, deleteActionItem } from "./actions";

export default async function ActionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const actionItems = sortActionsByImpact(await listActionItems(id));

  const regenerate = regenerateActionPlan.bind(null, id);
  const createWithId = createActionItem.bind(null, id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Plan d&apos;action</h2>
          <p className="mt-1 text-sm text-slate-500">
            Actions priorisées à fort impact local, mises à jour automatiquement dès que vous
            saisissez des métriques, ajoutez un concurrent ou modifiez la fiche cabinet.
          </p>
        </div>
        <form action={regenerate}>
          <Button type="submit" variant="secondary">
            Actualiser maintenant
          </Button>
        </form>
      </div>

      <Card>
        <CardTitle>Ajouter une action manuelle</CardTitle>
        <div className="mt-3">
          <ActionItemForm action={createWithId} />
        </div>
      </Card>

      <div className="space-y-2">
        {actionItems.length === 0 && (
          <Card>
            <p className="text-sm text-slate-500">
              Aucune action pour l&apos;instant. Clique sur &quot;Actualiser maintenant&quot; pour
              obtenir des recommandations, ou saisis tes métriques du mois.
            </p>
          </Card>
        )}
        {actionItems.map((a) => {
          const deleteWithId = deleteActionItem.bind(null, a.id, id);
          return (
            <Card key={a.id}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900">{a.title}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge color={priorityColor(a.impact_estimate)}>Impact {priorityLabel(a.impact_estimate)}</Badge>
                  <ActionStatusSelect actionId={a.id} therapistId={id} status={a.status} />
                  <form action={deleteWithId}>
                    <Button type="submit" variant="ghost">
                      Supprimer
                    </Button>
                  </form>
                </div>
              </div>
              {a.description && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs font-medium text-blue-700">
                    Comment faire ?
                  </summary>
                  <p className="mt-2 whitespace-pre-line text-sm text-slate-600">{a.description}</p>
                </details>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
