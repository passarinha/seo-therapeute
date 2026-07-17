import Link from "next/link";
import { listTherapists } from "@/lib/data/therapists";
import { listKeywords } from "@/lib/data/keywords";
import { listCompetitors } from "@/lib/data/competitors";
import {
  listSeoMetrics,
  listGbpMetrics,
  listReviewMetrics,
  listConversionMetrics,
} from "@/lib/data/metrics";
import { listActionItems, sortActionsByImpact } from "@/lib/data/action-items";
import {
  computeVisibilityScore,
  computeTrustScore,
  computeConversionScore,
  computeOpportunityScore,
} from "@/lib/scoring";
import { Card, CardTitle } from "@/components/ui/Card";
import { ScoreGauge } from "@/components/dashboard/ScoreGauge";
import { TherapistSelector } from "@/components/dashboard/TherapistSelector";
import { TrendChart } from "@/components/charts/TrendChart";
import { Badge, priorityColor, priorityLabel, statusColor, statusLabel } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { InfoPanel } from "@/components/ui/InfoPanel";

function sixMonthsAgo() {
  const d = new Date();
  d.setMonth(d.getMonth() - 6);
  return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().slice(0, 10);
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ therapist?: string }>;
}) {
  const therapists = await listTherapists();

  if (therapists.length === 0) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <Card>
          <h1 className="text-lg font-semibold text-slate-900">
            Sachez enfin si vos patients vous trouvent sur Google
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            En 2 minutes par mois, cet outil vous montre :
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
            <li>si votre cabinet apparaît quand un patient cherche un thérapeute près de chez lui,</li>
            <li>si votre fiche donne assez confiance pour être contactée,</li>
            <li>et si tout ça se traduit vraiment en prises de rendez-vous.</li>
          </ul>
          <p className="mt-3 text-sm text-slate-600">
            Créez votre première fiche cabinet pour voir apparaître votre dashboard.
          </p>
          <LinkButton href="/therapists/new" className="mt-4">
            + Créer mon cabinet
          </LinkButton>
        </Card>
      </div>
    );
  }

  const { therapist: therapistParam } = await searchParams;
  const selected = therapists.find((t) => t.id === therapistParam) ?? therapists[0];

  const [seoMetrics, gbpMetrics, reviewMetrics, conversionMetrics, keywords, competitors, actionItems] =
    await Promise.all([
      listSeoMetrics(selected.id, { from: sixMonthsAgo() }),
      listGbpMetrics(selected.id, { from: sixMonthsAgo() }),
      listReviewMetrics(selected.id),
      listConversionMetrics(selected.id),
      listKeywords(selected.id),
      listCompetitors(selected.id),
      listActionItems(selected.id),
    ]);

  const visibilityScore = computeVisibilityScore(seoMetrics, keywords);
  const trustScore = computeTrustScore(reviewMetrics);
  const conversionScore = computeConversionScore(conversionMetrics, gbpMetrics);

  const alerts = [
    { label: "Visibilité", value: visibilityScore.value, href: `/therapists/${selected.id}/keywords` },
    { label: "Confiance", value: trustScore.value, href: `/therapists/${selected.id}/performance` },
    { label: "Conversion", value: conversionScore.value, href: `/therapists/${selected.id}/performance` },
  ]
    .filter((a) => a.value < 50)
    .sort((a, b) => a.value - b.value);

  const topKeywords = keywords
    .map((k) => ({ keyword: k, opportunity: computeOpportunityScore(k, competitors) }))
    .sort((a, b) => b.opportunity.value - a.opportunity.value)
    .slice(0, 5);

  const topCompetitors = [...competitors]
    .sort((a, b) => (b.review_count ?? 0) - (a.review_count ?? 0))
    .slice(0, 3);

  const topActions = sortActionsByImpact(actionItems.filter((a) => a.status !== "done")).slice(0, 3);

  const hasProfileLinks = Boolean(selected.website_url && selected.gbp_url);
  const hasKeywords = keywords.length > 0;
  const hasMetrics = seoMetrics.length > 0 || gbpMetrics.length > 0;
  const onboardingSteps = [
    {
      done: hasProfileLinks,
      label: "Compléter la fiche cabinet (site web + lien Google Business Profile)",
      href: `/therapists/${selected.id}`,
    },
    {
      done: hasKeywords,
      label: "Ajouter vos premiers mots-clés (les recherches que font vos patients)",
      href: `/therapists/${selected.id}/keywords/new`,
    },
    {
      done: hasMetrics,
      label: "Saisir vos premières métriques (Search Console + Google Business Profile)",
      href: `/therapists/${selected.id}/performance/new`,
    },
  ];
  const onboardingIncomplete = onboardingSteps.some((s) => !s.done);

  const trendData = seoMetrics.map((m) => {
    const gbp = gbpMetrics.find((g) => g.period_date === m.period_date);
    return {
      period_date: m.period_date,
      impressions: m.impressions,
      clicks: m.clicks,
      profile_views: gbp?.profile_views ?? 0,
    };
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">Vue globale</h1>
          <p className="mt-1 text-sm text-slate-500">{selected.cabinet_name}</p>
        </div>
        <div className="flex items-center gap-2">
          <TherapistSelector therapists={therapists} selectedId={selected.id} />
          <LinkButton href={`/api/export/pdf?therapist=${selected.id}`} variant="secondary">
            Exporter en PDF
          </LinkButton>
        </div>
      </div>

      {onboardingIncomplete && (
        <InfoPanel title="3 étapes pour que vos scores prennent tout leur sens">
          <ul className="mt-1 space-y-1.5">
            {onboardingSteps.map((step) => (
              <li key={step.label} className="flex items-start gap-2">
                <span aria-hidden>{step.done ? "✅" : "⬜"}</span>
                {step.done ? (
                  <span className={step.done ? "text-slate-400 line-through" : ""}>{step.label}</span>
                ) : (
                  <Link href={step.href}>{step.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </InfoPanel>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ScoreGauge label="Visibilité" score={visibilityScore} />
        <ScoreGauge label="Confiance" score={trustScore} />
        <ScoreGauge label="Conversion" score={conversionScore} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardTitle>Évolution (6 derniers mois)</CardTitle>
          <div className="mt-3">
            <TrendChart
              data={trendData}
              lines={[
                { key: "impressions", label: "Impressions", color: "#0f172a" },
                { key: "clicks", label: "Clics", color: "#2563eb" },
                { key: "profile_views", label: "Vues du profil GBP", color: "#059669" },
              ]}
            />
          </div>
        </Card>

        <Card>
          <CardTitle>Alertes prioritaires</CardTitle>
          <div className="mt-3 space-y-2">
            {alerts.length === 0 ? (
              <p className="text-sm text-slate-500">Aucune alerte majeure pour le moment.</p>
            ) : (
              alerts.map((a) => (
                <Link
                  key={a.label}
                  href={a.href}
                  className="flex items-center justify-between rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 hover:bg-red-100"
                >
                  <span>Score {a.label} bas</span>
                  <span className="font-semibold">{a.value}</span>
                </Link>
              ))
            )}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <CardTitle>Top mots-clés (opportunité)</CardTitle>
          <ul className="mt-3 space-y-2">
            {topKeywords.length === 0 && <p className="text-sm text-slate-500">Aucun mot-clé pour l&apos;instant.</p>}
            {topKeywords.map(({ keyword, opportunity }) => (
              <li key={keyword.id}>
                <Link
                  href={`/therapists/${selected.id}/keywords/${keyword.id}`}
                  className="flex items-center justify-between rounded-md px-2 py-1 text-sm hover:bg-slate-50"
                >
                  <span className="text-slate-700">{keyword.keyword}</span>
                  <span className="font-medium text-slate-900">{opportunity.value}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardTitle>Top concurrents</CardTitle>
          <ul className="mt-3 space-y-2">
            {topCompetitors.length === 0 && <p className="text-sm text-slate-500">Aucun concurrent pour l&apos;instant.</p>}
            {topCompetitors.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/therapists/${selected.id}/competitors/${c.id}`}
                  className="flex items-center justify-between rounded-md px-2 py-1 text-sm hover:bg-slate-50"
                >
                  <span className="text-slate-700">{c.name}</span>
                  <span className="text-slate-500">{c.review_count ?? 0} avis · {c.avg_rating ?? "—"}★</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardTitle>Actions prioritaires</CardTitle>
          <ul className="mt-3 space-y-2">
            {topActions.length === 0 && (
              <p className="text-sm text-slate-500">
                Aucune action en attente.{" "}
                <Link href={`/therapists/${selected.id}/actions`} className="underline">
                  Voir le plan d&apos;action
                </Link>
                .
              </p>
            )}
            {topActions.map((a) => (
              <li key={a.id} className="flex items-center justify-between rounded-md px-2 py-1 text-sm">
                <span className="text-slate-700">{a.title}</span>
                <div className="flex items-center gap-2">
                  <Badge color={priorityColor(a.impact_estimate)}>{priorityLabel(a.impact_estimate)}</Badge>
                  <Badge color={statusColor(a.status)}>{statusLabel(a.status)}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
