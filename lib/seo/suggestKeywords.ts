import type { TherapistProfile } from "@/lib/supabase/types";
import { findSpecialtyEntry } from "./specialtyCatalog";

export function suggestKeywords(
  therapist: TherapistProfile,
  existingKeywords: string[] = []
): string[] {
  const specialty = therapist.specialty?.trim();
  const city = therapist.city?.trim();
  const targetArea = therapist.target_area?.trim();

  if (!specialty) return [];

  const places = Array.from(new Set([city, targetArea].filter(Boolean))) as string[];
  const placeSuffixes = places.length > 0 ? places.map((p) => ` ${p}`) : [""];

  // Priorité aux besoins spécifiques au type de praticien (ex: "hypnothérapeute anxiété Lyon"),
  // bien plus précis et pertinent que les modèles génériques ci-dessous.
  const specialtyTemplates: string[] = [];
  const entry = findSpecialtyEntry(specialty);
  if (entry) {
    for (const need of entry.needs) {
      for (const suffix of placeSuffixes) {
        specialtyTemplates.push(`${specialty} ${need}${suffix}`);
      }
    }
  }

  const genericTemplates: string[] = [];
  for (const suffix of placeSuffixes) {
    genericTemplates.push(
      `${specialty}${suffix}`,
      `cabinet de ${specialty}${suffix}`,
      `meilleur ${specialty}${suffix}`,
      `${specialty} pas cher${suffix}`,
      `${specialty} remboursé${suffix}`,
      `consultation ${specialty}${suffix}`,
      `${specialty} avis${suffix}`
    );
  }
  genericTemplates.push(`${specialty} en ligne`, `${specialty} à domicile`, `${specialty} téléconsultation`);

  const existingLower = new Set(existingKeywords.map((k) => k.trim().toLowerCase()));
  const seen = new Set<string>();
  const suggestions: string[] = [];

  for (const t of [...specialtyTemplates, ...genericTemplates]) {
    const key = t.toLowerCase();
    if (existingLower.has(key) || seen.has(key)) continue;
    seen.add(key);
    suggestions.push(t);
  }

  return suggestions.slice(0, 10);
}
