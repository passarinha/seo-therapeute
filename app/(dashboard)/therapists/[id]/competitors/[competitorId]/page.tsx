import { notFound } from "next/navigation";
import { getCompetitor } from "@/lib/data/competitors";
import { CompetitorForm } from "@/components/dashboard/CompetitorForm";
import { updateCompetitor, deleteCompetitor } from "../actions";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default async function EditCompetitorPage({
  params,
}: {
  params: Promise<{ id: string; competitorId: string }>;
}) {
  const { id, competitorId } = await params;
  const competitor = await getCompetitor(competitorId);
  if (!competitor || competitor.therapist_id !== id) notFound();

  const updateWithId = updateCompetitor.bind(null, competitorId, id);
  const deleteWithId = deleteCompetitor.bind(null, competitorId, id);

  return (
    <div className="max-w-2xl space-y-6">
      <Card>
        <CompetitorForm action={updateWithId} competitor={competitor} submitLabel="Enregistrer" />
      </Card>
      <form action={deleteWithId}>
        <Button type="submit" variant="danger">
          Supprimer ce concurrent
        </Button>
      </form>
    </div>
  );
}
