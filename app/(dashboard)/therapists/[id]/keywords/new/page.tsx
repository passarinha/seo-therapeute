import { KeywordForm } from "@/components/dashboard/KeywordForm";
import { getTherapist } from "@/lib/data/therapists";
import { createKeyword } from "../actions";

export default async function NewKeywordPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const therapist = await getTherapist(id);
  const createWithId = createKeyword.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h2 className="text-base font-semibold text-slate-900">Ajouter un mot-clé détaillé</h2>
      <div className="mt-4">
        <KeywordForm
          action={createWithId}
          defaultLocation={therapist?.city}
          showStatus={false}
          submitLabel="Ajouter"
        />
      </div>
    </div>
  );
}
