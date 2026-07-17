import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import type { SeoMetric, GbpMetric, ReviewMetric, ConversionMetric } from "@/lib/supabase/types";

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      {hint && <p className="mt-0.5 text-xs text-slate-400">{hint}</p>}
      <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3">{children}</div>
    </div>
  );
}

export function MetricsForm({
  action,
  periodDate,
  seo,
  gbp,
  review,
  conversion,
  submitLabel,
  lockPeriod,
}: {
  action: (formData: FormData) => void;
  periodDate?: string;
  seo?: SeoMetric | null;
  gbp?: GbpMetric | null;
  review?: ReviewMetric | null;
  conversion?: ConversionMetric | null;
  submitLabel: string;
  lockPeriod?: boolean;
}) {
  return (
    <form action={action} className="space-y-8">
      {lockPeriod ? (
        <div>
          <span className="block text-sm font-medium text-slate-700">Mois</span>
          <p className="mt-1 text-sm text-slate-900">{periodDate}</p>
          <input type="hidden" name="period_date" value={periodDate} />
        </div>
      ) : (
        <Field
          label="Mois (premier jour du mois)"
          name="period_date"
          type="date"
          defaultValue={periodDate}
          required
        />
      )}

      <Section
        title="Search Console"
        hint="Où trouver ces chiffres : search.google.com/search-console → rapport « Performances »"
      >
        <Field label="Impressions" name="seo_impressions" type="number" defaultValue={seo?.impressions} />
        <Field label="Clics" name="seo_clicks" type="number" defaultValue={seo?.clicks} />
        <Field label="CTR (%)" name="seo_ctr" type="number" defaultValue={seo?.ctr} />
        <Field label="Position moyenne" name="seo_avg_position" type="number" defaultValue={seo?.avg_position} />
      </Section>

      <Section
        title="Google Business Profile"
        hint="Où trouver ces chiffres : business.google.com → votre fiche → onglet « Performances »"
      >
        <Field label="Vues du profil" name="gbp_profile_views" type="number" defaultValue={gbp?.profile_views} />
        <Field label="Appels" name="gbp_calls" type="number" defaultValue={gbp?.calls} />
        <Field label="Demandes d'itinéraire" name="gbp_direction_requests" type="number" defaultValue={gbp?.direction_requests} />
        <Field label="Clics site" name="gbp_website_clicks" type="number" defaultValue={gbp?.website_clicks} />
        <Field label="Messages" name="gbp_messages" type="number" defaultValue={gbp?.messages} />
        <Field label="Réservations" name="gbp_bookings" type="number" defaultValue={gbp?.bookings} />
      </Section>

      <Section
        title="Confiance (avis)"
        hint="Où trouver ces chiffres : visibles sur votre fiche Google Business Profile, à côté du nom de l'établissement"
      >
        <Field label="Nombre d'avis" name="review_count" type="number" defaultValue={review?.review_count} />
        <Field label="Note moyenne" name="review_avg_rating" type="number" defaultValue={review?.avg_rating} />
        <Field label="Fraîcheur (jours)" name="review_freshness_days" type="number" defaultValue={review?.freshness_days} />
        <Field label="Taux de réponse (%)" name="review_response_rate" type="number" defaultValue={review?.response_rate} />
        <Field label="Qualité page contact (0-100)" name="review_contact_page_quality" type="number" defaultValue={review?.contact_page_quality} />
        <label className="flex items-center gap-2 self-end pb-2 text-sm text-slate-700">
          <input
            type="checkbox"
            name="review_nap_consistency"
            defaultChecked={review?.nap_consistency ?? true}
            className="rounded border-slate-300"
          />
          Cohérence NAP (nom/adresse/téléphone)
        </label>
      </Section>

      <Section
        title="Conversion"
        hint="Où trouver ces chiffres : votre outil de réservation en ligne et l'onglet « Performances » de Google Business Profile"
      >
        <Field label="Clics réservation" name="conv_booking_clicks" type="number" defaultValue={conversion?.booking_clicks} />
        <Field label="Clics téléphone" name="conv_phone_clicks" type="number" defaultValue={conversion?.phone_clicks} />
        <Field label="Formulaires envoyés" name="conv_form_submissions" type="number" defaultValue={conversion?.form_submissions} />
        <Field label="Messages reçus" name="conv_messages_received" type="number" defaultValue={conversion?.messages_received} />
      </Section>

      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
