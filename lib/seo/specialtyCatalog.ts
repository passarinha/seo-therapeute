export interface SpecialtyEntry {
  id: string;
  label: string;
  category: "bien_etre" | "sante_mentale";
  approach: string;
  needs: string[];
}

export const SPECIALTY_CATALOG: SpecialtyEntry[] = [
  // Bien-être & coaching
  {
    id: "coach_de_vie",
    label: "Coach de vie",
    category: "bien_etre",
    approach: "coaching par questionnement et plan d'action",
    needs: ["reconversion professionnelle", "confiance en soi", "organisation", "prise de décision"],
  },
  {
    id: "coach_independant",
    label: "Coach indépendant",
    category: "bien_etre",
    approach: "coaching personnalisé selon votre domaine",
    needs: ["développement de compétences", "atteinte d'objectifs", "coaching professionnel"],
  },
  {
    id: "mediateur_familial",
    label: "Médiateur familial",
    category: "bien_etre",
    approach: "médiation par entretiens structurés",
    needs: ["séparation", "divorce", "conflits familiaux", "succession", "médiation parentale"],
  },
  {
    id: "conseiller_conjugal",
    label: "Conseiller conjugal",
    category: "bien_etre",
    approach: "entretiens de couple et outils de communication",
    needs: ["crise de couple", "communication dans le couple", "préparation au mariage"],
  },
  {
    id: "naturopathe",
    label: "Naturopathe",
    category: "bien_etre",
    approach: "hygiène de vie et conseils naturels",
    needs: ["fatigue chronique", "hygiène de vie", "gestion du stress", "rééquilibrage alimentaire"],
  },
  {
    id: "reflexologue",
    label: "Réflexologue",
    category: "bien_etre",
    approach: "pressions sur les pieds, mains ou visage",
    needs: ["stress", "relaxation", "tensions musculaires"],
  },
  {
    id: "acupuncteur",
    label: "Acupuncteur",
    category: "bien_etre",
    approach: "stimulation de points d'acupuncture",
    needs: ["douleurs chroniques", "migraines", "nausées", "stress"],
  },
  {
    id: "praticien_mtc",
    label: "Praticien en médecine traditionnelle chinoise",
    category: "bien_etre",
    approach: "médecine traditionnelle chinoise (acupuncture, diététique, Qi Gong)",
    needs: ["équilibre énergétique", "qi gong", "diététique chinoise", "bien-être global"],
  },
  {
    id: "massotherapeute",
    label: "Massothérapeute",
    category: "bien_etre",
    approach: "massage relaxant, sportif ou thérapeutique",
    needs: ["massage relaxant", "tensions musculaires", "récupération sportive"],
  },

  // Santé mentale & psychothérapie
  {
    id: "psychologue",
    label: "Psychologue",
    category: "sante_mentale",
    approach: "évaluation et psychothérapie",
    needs: ["anxiété", "dépression", "stress", "difficultés relationnelles"],
  },
  {
    id: "psychiatre",
    label: "Psychiatre",
    category: "sante_mentale",
    approach: "suivi médical psychiatrique",
    needs: ["troubles psychiatriques", "dépression sévère", "troubles bipolaires"],
  },
  {
    id: "psychotherapeute",
    label: "Psychothérapeute",
    category: "sante_mentale",
    approach: "accompagnement psychologique au long cours",
    needs: ["mal-être", "soutien psychologique", "accompagnement psychologique"],
  },
  {
    id: "psychanalyste",
    label: "Psychanalyste",
    category: "sante_mentale",
    approach: "psychanalyse",
    needs: ["compréhension de soi", "conflits inconscients", "psychanalyse"],
  },
  {
    id: "therapeute_tcc",
    label: "Thérapeute TCC",
    category: "sante_mentale",
    approach: "thérapie cognitivo-comportementale",
    needs: ["anxiété", "phobies", "TOC", "dépression"],
  },
  {
    id: "therapeute_act",
    label: "Thérapeute ACT",
    category: "sante_mentale",
    approach: "acceptation et engagement (ACT)",
    needs: ["stress", "anxiété", "douleur chronique"],
  },
  {
    id: "therapeute_emdr",
    label: "Thérapeute EMDR",
    category: "sante_mentale",
    approach: "désensibilisation par mouvements oculaires (EMDR)",
    needs: ["traumatisme", "PTSD", "stress post-traumatique", "souvenirs difficiles"],
  },
  {
    id: "therapeute_ifs",
    label: "Thérapeute IFS",
    category: "sante_mentale",
    approach: "Internal Family Systems (travail sur les parts de soi)",
    needs: ["traumatisme", "estime de soi", "conflits internes"],
  },
  {
    id: "therapeute_systemique",
    label: "Thérapeute systémique",
    category: "sante_mentale",
    approach: "thérapie systémique de couple et famille",
    needs: ["conflits familiaux", "thérapie de couple", "thérapie familiale"],
  },
  {
    id: "therapeute_humaniste",
    label: "Thérapeute humaniste",
    category: "sante_mentale",
    approach: "approche centrée sur la personne",
    needs: ["estime de soi", "quête de sens", "développement personnel"],
  },
  {
    id: "gestalt_therapeute",
    label: "Gestalt-thérapeute",
    category: "sante_mentale",
    approach: "gestalt-thérapie (vécu dans l'instant présent)",
    needs: ["émotions", "relations", "développement personnel"],
  },
  {
    id: "therapeute_schemas",
    label: "Thérapeute en thérapie des schémas",
    category: "sante_mentale",
    approach: "thérapie des schémas",
    needs: ["schémas de vie", "difficultés relationnelles récurrentes", "traumatismes"],
  },
  {
    id: "hypnotherapeute",
    label: "Hypnothérapeute",
    category: "sante_mentale",
    approach: "hypnose thérapeutique",
    needs: ["anxiété", "phobies", "addictions", "arrêt du tabac", "gestion de la douleur"],
  },
  {
    id: "sophrologue",
    label: "Sophrologue",
    category: "sante_mentale",
    approach: "relaxation, respiration et visualisation",
    needs: ["stress", "sommeil", "préparation mentale", "gestion des émotions"],
  },
  {
    id: "art_therapeute",
    label: "Art-thérapeute",
    category: "sante_mentale",
    approach: "expression par la création artistique",
    needs: ["difficultés émotionnelles", "traumatismes", "expression créative"],
  },
  {
    id: "musicotherapeute",
    label: "Musicothérapeute",
    category: "sante_mentale",
    approach: "musicothérapie",
    needs: ["rééducation", "émotions", "troubles neurologiques"],
  },
  {
    id: "psychomotricien",
    label: "Psychomotricien",
    category: "sante_mentale",
    approach: "travail sur le lien corps-esprit",
    needs: ["développement de l'enfant", "coordination", "troubles neurodéveloppementaux"],
  },
  {
    id: "ergotherapeute",
    label: "Ergothérapeute",
    category: "sante_mentale",
    approach: "amélioration de l'autonomie au quotidien",
    needs: ["handicap", "rééducation", "autonomie au quotidien"],
  },
  {
    id: "sexologue",
    label: "Sexologue",
    category: "sante_mentale",
    approach: "thérapie sexuelle et de couple",
    needs: ["troubles du désir", "douleurs sexuelles", "communication de couple"],
  },
  {
    id: "neuropsychologue",
    label: "Neuropsychologue",
    category: "sante_mentale",
    approach: "évaluation du fonctionnement cognitif",
    needs: ["troubles de la mémoire", "troubles de l'attention", "TDAH"],
  },
];

export function findSpecialtyEntry(specialty: string | null | undefined): SpecialtyEntry | undefined {
  if (!specialty) return undefined;
  const normalized = specialty.trim().toLowerCase();
  return SPECIALTY_CATALOG.find(
    (e) => e.label.toLowerCase() === normalized || e.id === normalized
  );
}
