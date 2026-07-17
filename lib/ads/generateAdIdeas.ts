import type { TherapistProfile, Keyword } from "@/lib/supabase/types";
import { findSpecialtyEntry } from "@/lib/seo/specialtyCatalog";

export const HEADLINE_LIMIT = 30;
export const DESCRIPTION_LIMIT = 90;

export interface AdLine {
  text: string;
  length: number;
  ok: boolean;
  shortened: boolean;
}

export interface AdVariant {
  headline: AdLine;
  description: AdLine;
}

export interface AdIdeas {
  ads: AdVariant[];
}

function shortenToLimit(text: string, limit: number): string {
  if (text.length <= limit) return text;
  const truncated = text.slice(0, limit);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > limit * 0.5) {
    return truncated.slice(0, lastSpace).trimEnd();
  }
  return truncated.trimEnd();
}

function toLine(text: string, limit: number): AdLine {
  const shortened = shortenToLimit(text, limit);
  return {
    text: shortened,
    length: shortened.length,
    ok: shortened.length <= limit,
    shortened: shortened !== text,
  };
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function generateAdIdeas(therapist: TherapistProfile, keyword: Keyword): AdIdeas {
  const specialty = therapist.specialty || "thérapeute";
  const city = keyword.location || therapist.city || "";
  const cabinetName = therapist.cabinet_name;
  const therapistName = therapist.therapist_name || specialty;
  const cta = therapist.booking_url ? "Réservez en ligne" : "Appelez maintenant";
  const entry = findSpecialtyEntry(therapist.specialty);
  const need = therapist.positioning?.trim() || entry?.needs[0];

  const headlineTemplates = [
    city ? `${capitalize(specialty)} à ${city}` : capitalize(specialty),
    `${cabinetName} - ${therapist.booking_url ? "RDV en ligne" : "Appelez-nous"}`,
    capitalize(keyword.keyword),
    need ? `Aide pour ${need}` : `Consultation ${specialty}`,
    city ? `${city} : ${specialty} dispo` : `${specialty} disponible`,
  ];

  const descriptionTemplates = [
    `Prenez rendez-vous avec ${therapistName}${city ? ` à ${city}` : ""}. ${cta}.`,
    `Cabinet ${cabinetName} : ${specialty}. Consultations${city ? ` à ${city}` : ""}. ${cta}.`,
    entry || need
      ? `${entry ? capitalize(entry.approach) : capitalize(specialty)}${need ? `, notamment pour ${need}` : ""}. ${cta}.`
      : `${capitalize(specialty)} à l'écoute de vos besoins. ${cta} dès aujourd'hui.`,
  ];

  const headlines = headlineTemplates.map((t) => toLine(t, HEADLINE_LIMIT));
  const descriptions = descriptionTemplates.map((t) => toLine(t, DESCRIPTION_LIMIT));

  const ads: AdVariant[] = headlines.map((headline, i) => ({
    headline,
    description: descriptions[i % descriptions.length],
  }));

  return { ads };
}
