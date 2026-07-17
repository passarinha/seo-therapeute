import { Field, SelectField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import type { Keyword } from "@/lib/supabase/types";

export function KeywordForm({
  action,
  keyword,
  defaultLocation,
  showStatus = true,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  keyword?: Keyword;
  defaultLocation?: string | null;
  showStatus?: boolean;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Mot-clé" name="keyword" defaultValue={keyword?.keyword} required placeholder="ex: psychologue Lyon 6" />
        <Field
          label="Localisation associée"
          name="location"
          defaultValue={keyword?.location ?? defaultLocation}
        />
        <SelectField
          label="Priorité"
          name="priority"
          defaultValue={keyword?.priority ?? "medium"}
          options={[
            { value: "high", label: "Haute" },
            { value: "medium", label: "Moyenne" },
            { value: "low", label: "Basse" },
          ]}
        />
        {showStatus && (
          <SelectField
            label="Statut"
            name="status"
            defaultValue={keyword?.status ?? "todo"}
            options={[
              { value: "todo", label: "À faire" },
              { value: "in_progress", label: "En cours" },
              { value: "done", label: "Fait" },
            ]}
          />
        )}
      </div>

      <details className="rounded-md border border-slate-200 p-3">
        <summary className="cursor-pointer text-sm font-medium text-slate-600">
          Plus de détails (optionnel — volume, difficulté, position...)
        </summary>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Intention de recherche" name="search_intent" defaultValue={keyword?.search_intent} placeholder="ex: prise de rendez-vous" />
          <Field label="URL ciblée" name="target_url" type="url" defaultValue={keyword?.target_url} />
          <Field label="Volume estimé" name="volume_estimate" type="number" defaultValue={keyword?.volume_estimate} />
          <Field label="Difficulté (0-100)" name="difficulty" type="number" defaultValue={keyword?.difficulty} />
          <Field label="Position actuelle" name="current_position" type="number" defaultValue={keyword?.current_position} />
        </div>
      </details>

      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
