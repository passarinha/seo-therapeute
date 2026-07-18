import Link from "next/link";
import { listSeoMetrics, listGbpMetrics } from "@/lib/data/metrics";
import { Card, CardTitle } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { Filters } from "@/components/ui/Filters";
import { Table, type Column } from "@/components/ui/Table";
import { InfoPanel } from "@/components/ui/InfoPanel";
import { MetricComparisonCard } from "@/components/dashboard/MetricComparisonCard";

export default async function PerformancePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string; to?: string }>;
}) {
  const { id } = await params;
  const { from, to } = await searchParams;

  const [seoMetricsAll, gbpMetricsAll, seoMetrics, gbpMetrics] = await Promise.all([
    listSeoMetrics(id),
    listGbpMetrics(id),
    listSeoMetrics(id, { from, to }),
    listGbpMetrics(id, { from, to }),
  ]);

  const latestSeo = seoMetricsAll.at(-1);
  const previousSeo = seoMetricsAll.at(-2);
  const latestGbp = gbpMetricsAll.at(-1);
  const previousGbp = gbpMetricsAll.at(-2);

  const gbpByPeriod = new Map(gbpMetrics.map((m) => [m.period_date, m]));
  const rows = seoMetrics.map((seo) => {
    const gbp = gbpByPeriod.get(seo.period_date);
    return { id: seo.period_date, period_date: seo.period_date, seo, gbp };
  });

  const columns: Column<(typeof rows)[number]>[] = [
    {
      key: "period_date",
      label: "Mois",
      render: (r) => (
        <Link href={`/therapists/${id}/performance/${r.period_date}`} className="font-medium text-slate-900 hover:underline">
          {r.period_date}
        </Link>
      ),
    },
    { key: "impressions", label: "Impressions", render: (r) => r.seo.impressions },
    { key: "clicks", label: "Clics", render: (r) => r.seo.clicks },
    { key: "avg_position", label: "Position moy.", render: (r) => r.seo.avg_position },
    { key: "profile_views", label: "Vues GBP", render: (r) => r.gbp?.profile_views ?? "—" },
    { key: "calls", label: "Appels", render: (r) => r.gbp?.calls ?? "—" },
    { key: "bookings", label: "Réservations", render: (r) => r.gbp?.bookings ?? "—" },
  ];

  return (
    <div className="space-y-6">
      <InfoPanel title="Pourquoi saisir ces chiffres ici plutôt que de rester sur Google ?">
        <p>
          Contrairement à un tableau Google Analytics brut, ces chiffres alimentent directement vos
          scores de visibilité/confiance/conversion et votre plan d&apos;action ci-dessous : vous
          n&apos;avez pas à interpréter les chiffres vous-même. Copiez-les depuis{" "}
          <a
            href="https://search.google.com/search-console/performance/search-analytics"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Search Console
          </a>{" "}
          et{" "}
          <a href="https://business.google.com/" target="_blank" rel="noopener noreferrer">
            Google Business Profile
          </a>{" "}
          — 2 minutes par mois. Détails sur la page <Link href="/aide">Aide</Link>.
        </p>
      </InfoPanel>

      <div className="flex flex-wrap items-center justify-end gap-2">
        <LinkButton href={`/api/export/csv?therapist=${id}&entity=seo_metric`} variant="secondary">
          Export SEO CSV
        </LinkButton>
        <LinkButton href={`/api/export/csv?therapist=${id}&entity=gbp_metric`} variant="secondary">
          Export GBP CSV
        </LinkButton>
        <LinkButton href={`/therapists/${id}/performance/new`}>+ Saisir un mois</LinkButton>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-slate-900">Ce mois vs le mois dernier</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <MetricComparisonCard
            label="Impressions"
            current={latestSeo?.impressions ?? 0}
            previous={previousSeo?.impressions}
          />
          <MetricComparisonCard
            label="Clics"
            current={latestSeo?.clicks ?? 0}
            previous={previousSeo?.clicks}
          />
          <MetricComparisonCard
            label="Position moyenne"
            current={latestSeo?.avg_position ?? 0}
            previous={previousSeo?.avg_position}
            lowerIsBetter
          />
          <MetricComparisonCard
            label="Vues du profil"
            current={latestGbp?.profile_views ?? 0}
            previous={previousGbp?.profile_views}
          />
          <MetricComparisonCard
            label="Réservations"
            current={latestGbp?.bookings ?? 0}
            previous={previousGbp?.bookings}
          />
        </div>
      </div>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle>Historique mensuel</CardTitle>
          <Filters
            fields={[
              {
                param: "from",
                label: "Depuis",
                options: buildMonthOptions(),
              },
            ]}
          />
        </div>
        <div className="mt-3">
          <Table columns={columns} rows={rows} emptyMessage="Aucune métrique saisie pour l'instant." />
        </div>
      </Card>
    </div>
  );
}

function buildMonthOptions() {
  const options = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const value = d.toISOString().slice(0, 10);
    options.push({ value, label: d.toLocaleDateString("fr-FR", { month: "long", year: "numeric" }) });
  }
  return options;
}
