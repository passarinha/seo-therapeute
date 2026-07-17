import Link from "next/link";
import { listCompetitors, type CompetitorSort } from "@/lib/data/competitors";
import { getTherapist } from "@/lib/data/therapists";
import { listReviewMetrics } from "@/lib/data/metrics";
import { latestByPeriod } from "@/lib/scoring";
import { summarizeCompetitors, generateDifferentiationTips } from "@/lib/seo/competitorInsights";
import { Table, type Column } from "@/components/ui/Table";
import { Card, CardTitle } from "@/components/ui/Card";
import { LinkButton, Button } from "@/components/ui/Button";
import { Filters } from "@/components/ui/Filters";
import type { Competitor } from "@/lib/supabase/types";
import { createActionItem } from "../actions/actions";

export default async function CompetitorsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sort?: CompetitorSort }>;
}) {
  const { id } = await params;
  const { sort } = await searchParams;

  const [competitors, therapist, reviewMetrics] = await Promise.all([
    listCompetitors(id, sort ?? "reviews"),
    getTherapist(id),
    listReviewMetrics(id),
  ]);

  const summary = summarizeCompetitors(competitors);
  const tips = therapist ? generateDifferentiationTips(therapist, competitors, latestByPeriod(reviewMetrics)) : [];
  const addToPlan = createActionItem.bind(null, id);

  const columns: Column<Competitor>[] = [
    {
      key: "name",
      label: "Concurrent",
      render: (c) => (
        <div>
          <Link href={`/therapists/${id}/competitors/${c.id}`} className="font-medium text-slate-900 hover:underline">
            {c.name}
          </Link>
          {c.website_url && (
            <a
              href={c.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs text-slate-400 hover:text-blue-700 hover:underline"
            >
              {c.website_url}
            </a>
          )}
        </div>
      ),
    },
    { key: "city", label: "Ville" },
    { key: "review_count", label: "Avis" },
    { key: "avg_rating", label: "Note" },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardTitle>Résumé</CardTitle>
        <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p className="text-xs text-slate-400">Concurrents suivis</p>
            <p className="text-xl font-semibold text-slate-900">{summary.count}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Avis en moyenne</p>
            <p className="text-xl font-semibold text-slate-900">{summary.avgReviewCount ?? "—"}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Note moyenne</p>
            <p className="text-xl font-semibold text-slate-900">{summary.avgRating ?? "—"}★</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Le plus établi</p>
            <p className="truncate text-xl font-semibold text-slate-900">{summary.strongest?.name ?? "—"}</p>
          </div>
        </div>
      </Card>

      {tips.length > 0 && (
        <Card>
          <CardTitle>Recommandations pour vous distinguer</CardTitle>
          <ul className="mt-3 space-y-3">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-center justify-between gap-4 rounded-md border border-slate-200 p-3">
                <div>
                  <p className="text-sm font-medium text-slate-900">{tip.title}</p>
                  <p className="mt-0.5 text-sm text-slate-500">{tip.detail}</p>
                </div>
                <form action={addToPlan}>
                  <input type="hidden" name="title" value={tip.title} />
                  <input type="hidden" name="category" value="competitors" />
                  <input type="hidden" name="impact_estimate" value="medium" />
                  <Button type="submit" variant="secondary" className="shrink-0">
                    + Plan d&apos;action
                  </Button>
                </form>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <div className="flex items-center justify-between">
        <Filters
          fields={[
            {
              param: "sort",
              label: "Trier par",
              options: [
                { value: "reviews", label: "Nombre d'avis" },
                { value: "rating", label: "Note" },
                { value: "name", label: "Nom" },
              ],
            },
          ]}
        />
        <div className="flex items-center gap-2">
          <LinkButton href={`/api/export/csv?therapist=${id}&entity=competitor`} variant="secondary">
            Exporter CSV
          </LinkButton>
          <LinkButton href={`/therapists/${id}/competitors/new`}>+ Ajouter un concurrent</LinkButton>
        </div>
      </div>

      <Table columns={columns} rows={competitors} emptyMessage="Aucun concurrent pour l'instant." />
    </div>
  );
}
