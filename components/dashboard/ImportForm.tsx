"use client";

import { useActionState, useState } from "react";
import { CSV_SCHEMAS, type CsvEntityKey } from "@/lib/csv/schemas";
import type { ImportState } from "@/app/(dashboard)/therapists/[id]/import/actions";
import { Button } from "@/components/ui/Button";

const initialState: ImportState = { errors: [], successCount: 0, attempted: false };

export function ImportForm({
  action,
}: {
  action: (prevState: ImportState, formData: FormData) => Promise<ImportState>;
}) {
  const [entity, setEntity] = useState<CsvEntityKey>("keyword");
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="entity" className="block text-sm font-medium text-slate-700">
          Type de données
        </label>
        <select
          id="entity"
          value={entity}
          onChange={(e) => setEntity(e.target.value as CsvEntityKey)}
          className="mt-1 block w-full max-w-sm rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        >
          {Object.entries(CSV_SCHEMAS).map(([key, schema]) => (
            <option key={key} value={key}>
              {schema.label}
            </option>
          ))}
        </select>
        <a
          href={`/api/csv/template?entity=${entity}`}
          className="mt-2 inline-block text-sm text-slate-500 underline hover:text-slate-900"
        >
          Télécharger le modèle CSV pour ce type
        </a>
      </div>

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="entity" value={entity} />
        <div>
          <label htmlFor="csv_file" className="block text-sm font-medium text-slate-700">
            Fichier CSV
          </label>
          <input
            id="csv_file"
            name="csv_file"
            type="file"
            accept=".csv,text/csv"
            required
            className="mt-1 block w-full max-w-sm text-sm text-slate-700"
          />
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? "Import en cours..." : "Importer"}
        </Button>
      </form>

      {state.attempted && (
        <div className="space-y-2">
          {state.successCount > 0 && (
            <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {state.successCount} ligne(s) importée(s) avec succès.
            </p>
          )}
          {state.errors.length > 0 && (
            <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              <p className="font-medium">{state.errors.length} problème(s) rencontré(s) :</p>
              <ul className="mt-1 list-disc pl-5">
                {state.errors.slice(0, 20).map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
