const REFERRAL_SOURCES: Record<string, string[]> = {
  coach_de_vie: ["services RH d'entreprises", "cabinets de recrutement", "associations de reconversion professionnelle"],
  coach_independant: ["services RH d'entreprises", "réseaux d'entrepreneurs", "associations professionnelles"],
  mediateur_familial: ["avocats en droit de la famille", "notaires", "associations familiales"],
  conseiller_conjugal: ["médecins généralistes", "associations familiales", "centres de planification"],
  naturopathe: ["pharmaciens", "coachs sportifs", "salles de sport", "diététiciens"],
  reflexologue: ["kinésithérapeutes", "ostéopathes", "salles de sport"],
  acupuncteur: ["médecins généralistes", "rhumatologues", "centres anti-douleur"],
  praticien_mtc: ["médecins généralistes", "acupuncteurs", "centres de bien-être"],
  massotherapeute: ["kinésithérapeutes", "ostéopathes", "salles de sport", "clubs sportifs"],
  psychologue: ["médecins généralistes", "psychiatres", "infirmières et médecine scolaires"],
  psychiatre: ["médecins généralistes", "psychologues", "services d'urgence"],
  psychotherapeute: ["médecins généralistes", "psychiatres", "psychologues"],
  psychanalyste: ["médecins généralistes", "autres psychanalystes pour supervision croisée"],
  therapeute_tcc: ["médecins généralistes", "psychiatres"],
  therapeute_act: ["médecins généralistes", "psychiatres", "médecins de la douleur"],
  therapeute_emdr: ["psychiatres", "médecins généralistes", "associations de victimes"],
  therapeute_ifs: ["médecins généralistes", "psychiatres"],
  therapeute_systemique: ["médecins généralistes", "avocats en droit de la famille", "écoles"],
  therapeute_humaniste: ["médecins généralistes", "coachs de vie"],
  gestalt_therapeute: ["médecins généralistes", "psychiatres"],
  therapeute_schemas: ["psychiatres", "médecins généralistes"],
  hypnotherapeute: ["médecins généralistes", "tabacologues", "centres anti-douleur", "sages-femmes"],
  sophrologue: ["sages-femmes (préparation à l'accouchement)", "médecins du sommeil", "kinésithérapeutes"],
  art_therapeute: ["écoles", "pédopsychiatres", "établissements médico-sociaux (EHPAD, IME)"],
  musicotherapeute: ["établissements médico-sociaux", "pédopsychiatres", "centres de rééducation"],
  psychomotricien: ["pédiatres", "écoles", "médecins de rééducation"],
  ergotherapeute: ["médecins de rééducation", "pédiatres", "gériatres"],
  sexologue: ["gynécologues", "urologues", "sages-femmes", "médecins généralistes"],
  neuropsychologue: ["neurologues", "gériatres", "médecins généralistes"],
};

const DEFAULT_SOURCES = ["médecins généralistes", "autres professionnels de santé de votre secteur"];

export function getReferralSources(specialtyId: string | undefined): string[] {
  if (!specialtyId) return DEFAULT_SOURCES;
  return REFERRAL_SOURCES[specialtyId] ?? DEFAULT_SOURCES;
}
