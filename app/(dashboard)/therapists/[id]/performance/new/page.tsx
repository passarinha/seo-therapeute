import { MetricsForm } from "@/components/dashboard/MetricsForm";
import { upsertMonthlyMetrics } from "../actions";

function firstOfCurrentMonth() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().slice(0, 10);
}

export default async function NewMetricsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const action = upsertMonthlyMetrics.bind(null, id);

  return (
    <div className="max-w-3xl">
      <h2 className="text-base font-semibold text-slate-900">Saisir les métriques d&apos;un mois</h2>
      <p className="mt-1 text-sm text-slate-500">
        Recopie les chiffres depuis Search Console et Google Business Profile pour ce mois.
      </p>
      <div className="mt-6">
        <MetricsForm action={action} periodDate={firstOfCurrentMonth()} submitLabel="Enregistrer" />
      </div>
    </div>
  );
}
