import { NextRequest, NextResponse } from "next/server";
import { CSV_SCHEMAS } from "@/lib/csv/schemas";
import { buildCsvTemplate } from "@/lib/csv/parse";

export async function GET(request: NextRequest) {
  const entity = request.nextUrl.searchParams.get("entity") ?? "";
  const schema = CSV_SCHEMAS[entity];

  if (!schema) {
    return NextResponse.json({ error: "Entité inconnue" }, { status: 400 });
  }

  const csv = buildCsvTemplate(schema);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${entity}_template.csv"`,
    },
  });
}
