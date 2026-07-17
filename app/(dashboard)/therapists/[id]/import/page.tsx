import { ImportForm } from "@/components/dashboard/ImportForm";
import { importCsv } from "./actions";

export default async function ImportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const action = importCsv.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h2 className="text-base font-semibold text-slate-900">Import CSV</h2>
      <p className="mt-1 text-sm text-slate-500">
        Importe en une fois des mots-clés, des concurrents ou des métriques mensuelles.
        Télécharge le modèle correspondant, remplis-le, puis importe-le.
      </p>
      <div className="mt-6">
        <ImportForm action={action} />
      </div>
    </div>
  );
}
