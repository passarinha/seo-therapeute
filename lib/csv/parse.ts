import Papa from "papaparse";
import type { CsvEntitySchema } from "./schemas";

export interface ParsedCsvResult {
  validRows: Record<string, unknown>[];
  errors: string[];
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function coerceValue(raw: string | undefined, type: string): { value: unknown; error?: string } {
  const trimmed = (raw ?? "").trim();
  if (trimmed === "") return { value: null };

  switch (type) {
    case "number": {
      const n = Number(trimmed);
      if (Number.isNaN(n)) return { value: null, error: `valeur numérique invalide "${trimmed}"` };
      return { value: n };
    }
    case "boolean":
      return { value: ["true", "1", "oui", "yes"].includes(trimmed.toLowerCase()) };
    case "date":
      if (!DATE_RE.test(trimmed)) return { value: null, error: `date invalide "${trimmed}" (attendu AAAA-MM-JJ)` };
      return { value: trimmed };
    default:
      return { value: trimmed };
  }
}

export function parseCsv(text: string, schema: CsvEntitySchema): ParsedCsvResult {
  const parsed = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
  });

  const errors: string[] = [];
  parsed.errors.forEach((e) => errors.push(`Ligne ${e.row ?? "?"}: ${e.message}`));

  const validRows: Record<string, unknown>[] = [];

  parsed.data.forEach((rawRow, index) => {
    const rowNumber = index + 2; // header is row 1
    const row: Record<string, unknown> = {};
    let rowHasError = false;

    for (const col of schema.columns) {
      const cellRaw = rawRow[col.key];
      if ((cellRaw ?? "").trim() === "" && col.required) {
        errors.push(`Ligne ${rowNumber}: colonne "${col.key}" requise et vide`);
        rowHasError = true;
        continue;
      }

      const { value, error } = coerceValue(cellRaw, col.type);
      if (error) {
        errors.push(`Ligne ${rowNumber}: colonne "${col.key}" — ${error}`);
        rowHasError = true;
        continue;
      }

      row[col.key] = value ?? (col.default !== undefined ? col.default : null);
    }

    if (!rowHasError) validRows.push(row);
  });

  return { validRows, errors };
}

export function buildCsvTemplate(schema: CsvEntitySchema): string {
  const headers = schema.columns.map((c) => c.key);
  return Papa.unparse({ fields: headers, data: [] });
}
