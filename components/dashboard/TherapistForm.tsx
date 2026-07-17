import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { SPECIALTY_CATALOG } from "@/lib/seo/specialtyCatalog";
import type { TherapistProfile } from "@/lib/supabase/types";

export function TherapistForm({
  action,
  therapist,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  therapist?: TherapistProfile;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nom du cabinet" name="cabinet_name" defaultValue={therapist?.cabinet_name} required />
        <Field label="Nom du thérapeute" name="therapist_name" defaultValue={therapist?.therapist_name} />

        <div className="space-y-4 sm:col-span-2">
          <div>
            <Field
              label="Spécialité"
              name="specialty"
              defaultValue={therapist?.specialty}
              list="specialty-options"
              placeholder="ex: Hypnothérapeute"
            />
            <datalist id="specialty-options">
              {SPECIALTY_CATALOG.map((entry) => (
                <option key={entry.id} value={entry.label} />
              ))}
            </datalist>
          </div>
          <Field
            label="Positionnement / expertise"
            name="positioning"
            defaultValue={therapist?.positioning}
            placeholder="ex: burn-out, troubles du sommeil, périnatalité..."
          />
        </div>

        <Field label="Ville" name="city" defaultValue={therapist?.city} />
        <Field label="Zone géographique ciblée" name="target_area" defaultValue={therapist?.target_area} />
        <Field label="Adresse" name="address" defaultValue={therapist?.address} />
        <Field label="Site web" name="website_url" type="url" defaultValue={therapist?.website_url} />
        <Field label="Lien Google Business Profile" name="gbp_url" type="url" defaultValue={therapist?.gbp_url} />
        <Field label="Lien de réservation" name="booking_url" type="url" defaultValue={therapist?.booking_url} />
        <Field label="Téléphone" name="phone" type="tel" defaultValue={therapist?.phone} />
        <Field label="Email" name="email" type="email" defaultValue={therapist?.email} />
      </div>

      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
