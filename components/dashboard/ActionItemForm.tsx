import { Field, SelectField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function ActionItemForm({ action }: { action: (formData: FormData) => void }) {
  return (
    <form action={action} className="flex flex-wrap items-end gap-3">
      <div className="min-w-[240px] flex-1">
        <Field label="Nouvelle action" name="title" required placeholder="ex: Ajouter des photos au profil GBP" />
      </div>
      <div className="w-40">
        <Field label="Catégorie" name="category" placeholder="ex: contenu" />
      </div>
      <div className="w-36">
        <SelectField
          label="Impact"
          name="impact_estimate"
          defaultValue="medium"
          options={[
            { value: "high", label: "Haute" },
            { value: "medium", label: "Moyenne" },
            { value: "low", label: "Basse" },
          ]}
        />
      </div>
      <Button type="submit">Ajouter</Button>
    </form>
  );
}
