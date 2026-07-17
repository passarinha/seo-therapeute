import { getMonthlyMetrics } from "@/lib/data/metrics";
import { MetricsForm } from "@/components/dashboard/MetricsForm";
import { upsertMonthlyMetrics, deleteMonthlyMetrics } from "../actions";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default async function EditMetricsPage({
  params,
}: {
  params: Promise<{ id: string; period: string }>;
}) {
  const { id, period } = await params;
  const { seo, gbp, review, conversion } = await getMonthlyMetrics(id, period);
  const action = upsertMonthlyMetrics.bind(null, id);
  const deleteAction = deleteMonthlyMetrics.bind(null, id, period);

  return (
    <div className="max-w-3xl space-y-6">
      <Card>
        <MetricsForm
          action={action}
          periodDate={period}
          seo={seo}
          gbp={gbp}
          review={review}
          conversion={conversion}
          submitLabel="Enregistrer"
          lockPeriod
        />
      </Card>
      <form action={deleteAction}>
        <Button type="submit" variant="danger">
          Supprimer les données de ce mois
        </Button>
      </form>
    </div>
  );
}
