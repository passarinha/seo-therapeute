import type { SpecialtyEntry } from "./specialtyCatalog";

export interface DirectoryEntry {
  name: string;
  url?: string;
  note: string;
}

const GENERAL: DirectoryEntry[] = [
  {
    name: "Doctolib",
    url: "https://www.doctolib.fr",
    note: "Prise de rendez-vous en ligne, très bien référencé sur Google — quasi incontournable.",
  },
  {
    name: "PagesJaunes",
    url: "https://www.pagesjaunes.fr",
    note: "Fiche gratuite, bon complément pour la visibilité locale.",
  },
];

const BY_CATEGORY: Record<SpecialtyEntry["category"], DirectoryEntry[]> = {
  bien_etre: [
    {
      name: "Medoucine",
      note: "Annuaire spécialisé médecines douces et bien-être — recherchez \"Medoucine\" pour trouver l'inscription.",
    },
    {
      name: "Malt",
      url: "https://www.malt.fr",
      note: "Utile si vous exercez aussi en tant qu'indépendant/coach freelance.",
    },
  ],
  sante_mentale: [
    {
      name: "Fédération ou ordre professionnel de votre spécialité",
      note: "La plupart proposent un annuaire public de leurs membres (ex: Fédération Française de Psychothérapie et Psychanalyse, ICF France pour les coachs certifiés, chambre syndicale de sophrologie) — renseignez-vous auprès du vôtre.",
    },
  ],
};

export function getDirectoriesForCategory(
  category: SpecialtyEntry["category"] | undefined
): DirectoryEntry[] {
  const list = [...GENERAL];
  if (category) list.push(...BY_CATEGORY[category]);
  return list;
}
