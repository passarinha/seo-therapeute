import type { TherapistProfile } from "@/lib/supabase/types";

export function suggestKeywords(
  therapist: TherapistProfile,
  existingKeywords: string[] = []
): string[] {
  const specialty = therapist.specialty?.trim();
  const city = therapist.city?.trim();
  const targetArea = therapist.target_area?.trim();

  if (!specialty) return [];

  const places = Array.from(new Set([city, targetArea].filter(Boolean))) as string[];

  const templates: string[] = [];
  for (const place of places.length > 0 ? places : [""]) {
    const suffix = place ? ` ${place}` : "";
    templates.push(
      `${specialty}${suffix}`,
      `cabinet de ${specialty}${suffix}`,
      `meilleur ${specialty}${suffix}`,
      `${specialty} pas cher${suffix}`,
      `${specialty} remboursé${suffix}`,
      `consultation ${specialty}${suffix}`,
      `${specialty} avis${suffix}`
    );
  }
  templates.push(`${specialty} en ligne`, `${specialty} à domicile`, `${specialty} téléconsultation`);

  const existingLower = new Set(existingKeywords.map((k) => k.trim().toLowerCase()));
  const seen = new Set<string>();
  const suggestions: string[] = [];

  for (const t of templates) {
    const key = t.toLowerCase();
    if (existingLower.has(key) || seen.has(key)) continue;
    seen.add(key);
    suggestions.push(t);
  }

  return suggestions.slice(0, 10);
}
