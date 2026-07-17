import { NextRequest, NextResponse } from "next/server";
import Papa from "papaparse";
import { createClient } from "@/lib/supabase/server";
import { CSV_SCHEMAS } from "@/lib/csv/schemas";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(request: NextRequest) {
  const therapistId = request.nextUrl.searchParams.get("therapist") ?? "";
  const entity = request.nextUrl.searchParams.get("entity") ?? "";
  const schema = CSV_SCHEMAS[entity];

  if (!UUID_RE.test(therapistId) || !schema) {
    return NextResponse.json({ error: "Paramètres invalides" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from(schema.table)
    .select("*")
    .eq("therapist_id", therapistId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const csv = Papa.unparse(data ?? []);

  await supabase.from("report_export").insert({ therapist_id: therapistId, type: "csv" });

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${entity}_export.csv"`,
    },
  });
}
