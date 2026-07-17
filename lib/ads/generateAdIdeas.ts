import type { TherapistProfile, Keyword } from "@/lib/supabase/types";

export const HEADLINE_LIMIT = 30;
export const DESCRIPTION_LIMIT = 90;

export interface AdLine {
  text: string;
  length: number;
  ok: boolean;
}

export interface AdIdeas {
  headlines: AdLine[];
  descriptions: AdLine[];
}

function toLine(text: string, limit: number): AdLine {
  return { text, length: text.length, ok: text.length <= limit };
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

  const headlineTemplates = [
    city ? `${capitalize(specialty)} à ${city}` : capitalize(specialty),
    `${cabinetName} - ${therapist.booking_url ? "RDV en ligne" : "Appelez-nous"}`,
    capitalize(keyword.keyword),
    `Consultation ${specialty}`,
    city ? `${city} : ${specialty} dispo` : `${specialty} disponible`,
  ];

  const descriptionTemplates = [
    `Prenez rendez-vous avec ${therapistName}${city ? ` à ${city}` : ""}. ${cta}.`,
    `Cabinet ${cabinetName} : ${specialty}. Consultations${city ? ` à ${city}` : ""}. ${cta}.`,
    `${capitalize(specialty)} à l'écoute de vos besoins. ${cta} dès aujourd'hui.`,
  ];

  return {
    headlines: headlineTemplates.map((t) => toLine(t, HEADLINE_LIMIT)),
    descriptions: descriptionTemplates.map((t) => toLine(t, DESCRIPTION_LIMIT)),
  };
}
