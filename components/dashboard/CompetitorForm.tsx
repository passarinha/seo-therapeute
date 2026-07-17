import { Field, TextAreaField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import type { Competitor } from "@/lib/supabase/types";

export function CompetitorForm({
  action,
  competitor,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  competitor?: Competitor;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="URL du site du concurrent"
          name="website_url"
          type="url"
          defaultValue={competitor?.website_url}
          required
          placeholder="https://..."
        />
        <Field label="Ville" name="city" defaultValue={competitor?.city} />
        <Field label="Nombre d'avis" name="review_count" type="number" defaultValue={competitor?.review_count} />
        <Field label="Note moyenne" name="avg_rating" type="number" defaultValue={competitor?.avg_rating} placeholder="ex: 4.5" />
      </div>

      <details className="rounded-md border border-slate-200 p-3">
        <summary className="cursor-pointer text-sm font-medium text-slate-600">
          Plus de détails (optionnel)
        </summary>
        <div className="mt-3 space-y-4">
          <Field
            label="Nom (facultatif — déduit du site sinon)"
            name="name"
            defaultValue={competitor?.name}
          />
          <Field label="Type d'offre" name="offer_type" defaultValue={competitor?.offer_type} />
          <TextAreaField label="Différenciation" name="differentiation" defaultValue={competitor?.differentiation} />
          <TextAreaField label="Opportunité à exploiter" name="opportunity" defaultValue={competitor?.opportunity} />
        </div>
      </details>

      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
