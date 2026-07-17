import type { TherapistProfile } from "@/lib/supabase/types";
import { findSpecialtyEntry } from "./specialtyCatalog";

export type StarterKeywordInput = Pick<TherapistProfile, "specialty" | "positioning" | "city">;

export interface StarterKeyword {
  keyword: string;
  location: string | null;
}

/**
 * Génère 2 mots-clés de démarrage à partir de la spécialité (et du positionnement
 * s'il est renseigné), pour donner immédiatement 2 groupes d'annonces d'exemple
 * dans l'onglet Google Ads, sans que le thérapeute n'ait rien à saisir.
 */
export function generateStarterKeywords(therapist: StarterKeywordInput): StarterKeyword[] {
  const specialty = therapist.specialty?.trim();
  if (!specialty) return [];

  const city = therapist.city?.trim() || null;
  const suffix = city ? ` ${city}` : "";
  const entry = findSpecialtyEntry(specialty);
  const secondaryAngle = therapist.positioning?.trim() || entry?.needs[0];

  const starters: StarterKeyword[] = [{ keyword: `${specialty}${suffix}`, location: city }];

  starters.push(
    secondaryAngle
      ? { keyword: `${specialty} ${secondaryAngle}${suffix}`, location: city }
      : { keyword: `cabinet de ${specialty}${suffix}`, location: city }
  );

  return starters;
}
