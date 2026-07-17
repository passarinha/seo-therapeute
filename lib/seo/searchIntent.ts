import type { Keyword, TherapistProfile } from "@/lib/supabase/types";

export type SearchIntent =
  | "urgence"
  | "prise_de_rdv"
  | "prix"
  | "comparaison"
  | "information"
  | "locale"
  | "generale";

export interface IntentResult {
  intent: SearchIntent;
  label: string;
  recommendation: string;
}

const INTENT_INFO: Record<SearchIntent, { label: string; recommendation: string }> = {
  urgence: {
    label: "Urgence",
    recommendation: "Mettez en avant un numéro de téléphone et votre disponibilité immédiate.",
  },
  prise_de_rdv: {
    label: "Prise de rendez-vous",
    recommendation: "Idéal pour une annonce Google Ads avec un lien de réservation en avant.",
  },
  prix: {
    label: "Recherche de prix",
    recommendation: "Mentionnez vos tarifs ou une prise en charge/remboursement si applicable.",
  },
  comparaison: {
    label: "Comparaison",
    recommendation: "Mettez en avant vos avis et ce qui vous différencie des autres cabinets.",
  },
  information: {
    label: "Informationnelle",
    recommendation: "Mieux adapté à une page de contenu qu'à une annonce payante.",
  },
  locale: {
    label: "Recherche locale",
    recommendation: "Optimisez votre fiche Google Business Profile pour cette recherche.",
  },
  generale: {
    label: "Générale",
    recommendation: "Ciblez avec une page service claire présentant votre offre.",
  },
};

const PATTERNS: { intent: SearchIntent; re: RegExp }[] = [
  { intent: "urgence", re: /urgence|urgent|immédiat|rapide|ce soir|maintenant/i },
  { intent: "prise_de_rdv", re: /rdv|rendez-vous|réserv|consultation en ligne/i },
  { intent: "prix", re: /prix|tarif|coût|cout|combien|rembours|pas cher/i },
  { intent: "comparaison", re: /meilleur|top\s|comparatif|avis|classement/i },
  { intent: "information", re: /qu'est-ce|c'est quoi|comment|pourquoi|définition|signe|symptôme/i },
];

export function classifyIntent(keyword: Keyword, therapist?: TherapistProfile | null): IntentResult {
  const text = keyword.keyword.toLowerCase();

  for (const { intent, re } of PATTERNS) {
    if (re.test(text)) {
      return { intent, ...INTENT_INFO[intent] };
    }
  }

  const city = (keyword.location || therapist?.city || "").toLowerCase().trim();
  if (
    (city && text.includes(city)) ||
    /près de moi|proche|quartier|à côté/i.test(text)
  ) {
    return { intent: "locale", ...INTENT_INFO.locale };
  }

  return { intent: "generale", ...INTENT_INFO.generale };
}
