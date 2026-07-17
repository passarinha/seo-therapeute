import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { createKeywordsBulk } from "@/app/(dashboard)/therapists/[id]/keywords/actions";

export function KeywordBulkAddForm({ therapistId }: { therapistId: string }) {
  return (
    <Card>
      <details>
        <summary className="cursor-pointer text-sm font-semibold text-slate-900">
          Ajouter plusieurs mots-clés d&apos;un coup
        </summary>
        <div className="mt-3">
          <p className="text-sm text-slate-500">Un mot-clé par ligne.</p>
          <form action={createKeywordsBulk.bind(null, therapistId)} className="mt-2 space-y-3">
            <textarea
              name="bulk_keywords"
              rows={5}
              placeholder={"psychologue Lyon 6\nthérapie de couple visio\nsophrologue périnatalité"}
              className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            />
            <Button type="submit" variant="secondary">
              Ajouter tout
            </Button>
          </form>
        </div>
      </details>
    </Card>
  );
}
