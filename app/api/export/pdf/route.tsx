import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase/server";
import { getTherapist } from "@/lib/data/therapists";
import { listKeywords } from "@/lib/data/keywords";
import { listCompetitors } from "@/lib/data/competitors";
import { listSeoMetrics, listReviewMetrics, listConversionMetrics, listGbpMetrics } from "@/lib/data/metrics";
import { listActionItems, sortActionsByImpact } from "@/lib/data/action-items";
import { computeVisibilityScore, computeTrustScore, computeConversionScore, computeOpportunityScore } from "@/lib/scoring";
import { DashboardReport } from "@/lib/pdf/DashboardReport";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(request: NextRequest) {
  const therapistId = request.nextUrl.searchParams.get("therapist") ?? "";

  if (!UUID_RE.test(therapistId)) {
    return NextResponse.json({ error: "Paramètre 'therapist' invalide" }, { status: 400 });
  }

  const therapist = await getTherapist(therapistId);

  if (!therapist) {
    return NextResponse.json({ error: "Cabinet introuvable" }, { status: 404 });
  }

  const [seoMetrics, gbpMetrics, reviewMetrics, conversionMetrics, keywords, competitors, actionItems] =
    await Promise.all([
      listSeoMetrics(therapistId),
      listGbpMetrics(therapistId),
      listReviewMetrics(therapistId),
      listConversionMetrics(therapistId),
      listKeywords(therapistId),
      listCompetitors(therapistId),
      listActionItems(therapistId),
    ]);

  const visibilityScore = computeVisibilityScore(seoMetrics, keywords);
  const trustScore = computeTrustScore(reviewMetrics);
  const conversionScore = computeConversionScore(conversionMetrics, gbpMetrics);

  const topKeywords = keywords
    .map((k) => ({ keyword: k, opportunity: computeOpportunityScore(k, competitors) }))
    .sort((a, b) => b.opportunity.value - a.opportunity.value)
    .slice(0, 5)
    .map((k) => k.keyword);

  const topCompetitors = [...competitors]
    .sort((a, b) => (b.review_count ?? 0) - (a.review_count ?? 0))
    .slice(0, 3);

  const topActions = sortActionsByImpact(actionItems.filter((a) => a.status !== "done")).slice(0, 3);

  const buffer = await renderToBuffer(
    <DashboardReport
      therapist={therapist}
      visibilityScore={visibilityScore}
      trustScore={trustScore}
      conversionScore={conversionScore}
      topKeywords={topKeywords}
      topCompetitors={topCompetitors}
      topActions={topActions}
      generatedAt={new Date().toLocaleDateString("fr-FR")}
    />
  );

  const supabase = await createClient();
  await supabase.from("report_export").insert({ therapist_id: therapistId, type: "pdf" });

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${therapist.cabinet_name.replace(/\s+/g, "_")}_dashboard.pdf"`,
    },
  });
}
