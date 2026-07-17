import { Card, CardTitle } from "@/components/ui/Card";
import { quickAddKeyword } from "@/app/(dashboard)/therapists/[id]/keywords/actions";

export function KeywordSuggestions({
  therapistId,
  suggestions,
  location,
}: {
  therapistId: string;
  suggestions: string[];
  location?: string | null;
}) {
  if (suggestions.length === 0) return null;

  return (
    <Card>
      <CardTitle>Suggestions pour vous</CardTitle>
      <p className="mt-1 text-sm text-slate-500">
        Générées à partir de votre spécialité et votre ville. Cliquez pour ajouter.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <form key={s} action={quickAddKeyword.bind(null, therapistId)}>
            <input type="hidden" name="keyword" value={s} />
            <input type="hidden" name="location" value={location ?? ""} />
            <button
              type="submit"
              className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:border-slate-400 hover:bg-slate-50"
            >
              + {s}
            </button>
          </form>
        ))}
      </div>
    </Card>
  );
}
