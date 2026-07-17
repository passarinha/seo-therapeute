import { listKeywords } from "@/lib/data/keywords";
import { getTherapist } from "@/lib/data/therapists";
import { suggestKeywords } from "@/lib/seo/suggestKeywords";
import { Table, type Column } from "@/components/ui/Table";
import { Filters } from "@/components/ui/Filters";
import { LinkButton } from "@/components/ui/Button";
import { KeywordSuggestions } from "@/components/dashboard/KeywordSuggestions";
import { KeywordBulkAddForm } from "@/components/dashboard/KeywordBulkAddForm";
import { KeywordPrioritySelect, KeywordStatusSelect } from "@/components/dashboard/KeywordInlineSelects";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import type { Keyword } from "@/lib/supabase/types";
import { deleteKeyword } from "./actions";

export default async function KeywordsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ priority?: string; status?: string }>;
}) {
  const { id } = await params;
  const { priority, status } = await searchParams;
  const [keywords, therapist] = await Promise.all([
    listKeywords(id, { priority, status }),
    getTherapist(id),
  ]);

  const allKeywords = priority || status ? await listKeywords(id) : keywords;
  const suggestions = therapist ? suggestKeywords(therapist, allKeywords.map((k) => k.keyword)) : [];

  const columns: Column<Keyword>[] = [
    {
      key: "keyword",
      label: "Mot-clé",
      render: (k) => (
        <Link href={`/therapists/${id}/keywords/${k.id}`} className="font-medium text-slate-900 hover:underline">
          {k.keyword}
        </Link>
      ),
    },
    { key: "location", label: "Localisation" },
    { key: "current_position", label: "Position" },
    {
      key: "priority",
      label: "Priorité",
      render: (k) => <KeywordPrioritySelect keywordId={k.id} therapistId={id} priority={k.priority} />,
    },
    {
      key: "status",
      label: "Statut",
      render: (k) => <KeywordStatusSelect keywordId={k.id} therapistId={id} status={k.status} />,
    },
  ];

  return (
    <div className="space-y-4">
      <KeywordSuggestions therapistId={id} suggestions={suggestions} location={therapist?.city} />
      <KeywordBulkAddForm therapistId={id} />

      <div className="flex items-center justify-between">
        <Filters
          fields={[
            {
              param: "priority",
              label: "Priorité",
              options: [
                { value: "high", label: "Haute" },
                { value: "medium", label: "Moyenne" },
                { value: "low", label: "Basse" },
              ],
            },
            {
              param: "status",
              label: "Statut",
              options: [
                { value: "todo", label: "À faire" },
                { value: "in_progress", label: "En cours" },
                { value: "done", label: "Fait" },
              ],
            },
          ]}
        />
        <div className="flex items-center gap-2">
          <LinkButton href={`/api/export/csv?therapist=${id}&entity=keyword`} variant="secondary">
            Exporter CSV
          </LinkButton>
          <LinkButton href={`/therapists/${id}/keywords/new`}>+ Mot-clé détaillé</LinkButton>
        </div>
      </div>

      <p className="text-xs text-slate-400">
        Priorité : sur quoi se concentrer en premier. Statut : où vous en êtes (à faire, en cours,
        fait) sur le travail de ce mot-clé.
      </p>

      <Table
        columns={columns}
        rows={keywords}
        emptyMessage="Aucun mot-clé pour l'instant."
        rowActions={(k) => (
          <form action={deleteKeyword.bind(null, k.id, id)}>
            <Button type="submit" variant="ghost">
              Supprimer
            </Button>
          </form>
        )}
      />
    </div>
  );
}
