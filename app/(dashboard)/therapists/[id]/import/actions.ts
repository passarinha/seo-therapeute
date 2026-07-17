"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { CSV_SCHEMAS, type CsvEntityKey } from "@/lib/csv/schemas";
import { parseCsv } from "@/lib/csv/parse";

export interface ImportState {
  errors: string[];
  successCount: number;
  attempted: boolean;
}

export async function importCsv(
  therapistId: string,
  _prevState: ImportState,
  formData: FormData
): Promise<ImportState> {
  const entity = String(formData.get("entity") ?? "") as CsvEntityKey;
  const file = formData.get("csv_file") as File | null;

  const schema = CSV_SCHEMAS[entity];
  if (!schema) {
    return { errors: ["Type de données invalide."], successCount: 0, attempted: true };
  }
  if (!file || file.size === 0) {
    return { errors: ["Aucun fichier sélectionné."], successCount: 0, attempted: true };
  }

  const text = await file.text();
  const { validRows, errors } = parseCsv(text, schema);

  if (validRows.length === 0) {
    return { errors: errors.length ? errors : ["Aucune ligne valide dans le fichier."], successCount: 0, attempted: true };
  }

  const rowsWithTherapist = validRows.map((row) => ({ ...row, therapist_id: therapistId }));

  const supabase = await createClient();
  const query = supabase.from(schema.table);

  const { error } = schema.conflictKey
    ? // @ts-expect-error -- rows are pre-validated per schema.columns, dynamic table name prevents static typing here
      await query.upsert(rowsWithTherapist, { onConflict: schema.conflictKey })
    : // @ts-expect-error -- rows are pre-validated per schema.columns, dynamic table name prevents static typing here
      await query.insert(rowsWithTherapist);

  if (error) {
    return { errors: [...errors, `Erreur base de données: ${error.message}`], successCount: 0, attempted: true };
  }

  revalidatePath(`/therapists/${therapistId}`);

  return { errors, successCount: rowsWithTherapist.length, attempted: true };
}
