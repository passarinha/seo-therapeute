import { CompetitorForm } from "@/components/dashboard/CompetitorForm";
import { createCompetitor } from "../actions";

export default async function NewCompetitorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const createWithId = createCompetitor.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h2 className="text-base font-semibold text-slate-900">Ajouter un concurrent</h2>
      <div className="mt-4">
        <CompetitorForm action={createWithId} submitLabel="Ajouter" />
      </div>
    </div>
  );
}
