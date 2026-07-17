import { notFound } from "next/navigation";
import { getKeyword } from "@/lib/data/keywords";
import { KeywordForm } from "@/components/dashboard/KeywordForm";
import { updateKeyword, deleteKeyword } from "../actions";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default async function EditKeywordPage({
  params,
}: {
  params: Promise<{ id: string; keywordId: string }>;
}) {
  const { id, keywordId } = await params;
  const keyword = await getKeyword(keywordId);
  if (!keyword || keyword.therapist_id !== id) notFound();

  const updateWithId = updateKeyword.bind(null, keywordId, id);
  const deleteWithId = deleteKeyword.bind(null, keywordId, id);

  return (
    <div className="max-w-2xl space-y-6">
      <Card>
        <KeywordForm action={updateWithId} keyword={keyword} submitLabel="Enregistrer" />
      </Card>
      <form action={deleteWithId}>
        <Button type="submit" variant="danger">
          Supprimer ce mot-clé
        </Button>
      </form>
    </div>
  );
}
