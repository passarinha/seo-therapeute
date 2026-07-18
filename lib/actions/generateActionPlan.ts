import type { TherapistProfile, ReviewMetric, Competitor, ActionImpact } from "@/lib/supabase/types";
import type { ScoreResult } from "@/lib/scoring";
import { summarizeCompetitors } from "@/lib/seo/competitorInsights";
import { findSpecialtyEntry } from "@/lib/seo/specialtyCatalog";
import { getDirectoriesForCategory } from "@/lib/seo/directories";
import { getReferralSources } from "@/lib/seo/referralSources";

export interface ActionCandidate {
  title: string;
  category: string;
  description: string;
  impact_estimate: ActionImpact;
}

const REVIEW_REQUEST_TEMPLATE = `Récupérez d'abord votre lien d'avis direct : sur business.google.com, ouvrez votre fiche, cliquez sur "Demander des avis" pour obtenir un lien court à partager.

Exemple de message SMS/WhatsApp (court) :
"Bonjour [Prénom], j'espère que notre séance vous a été utile. Auriez-vous 2 minutes pour laisser un avis sur ma fiche Google ? [votre lien] Merci beaucoup ! [Votre prénom]"

Exemple d'email (plus détaillé) :
Objet : Votre avis compte pour moi
"Bonjour [Prénom],
J'espère que vous allez bien depuis notre dernière séance. Si vous avez apprécié nos échanges, cela m'aiderait beaucoup que vous preniez quelques minutes pour partager votre expérience sur ma fiche Google : [votre lien]
Votre avis aide d'autres personnes à trouver de l'aide plus facilement.
Merci pour votre confiance,
[Votre nom]"

Exemple à dire à l'oral en fin de séance :
"Si vous avez trouvé cette séance utile, un avis Google m'aiderait beaucoup à me faire connaître — je peux vous envoyer le lien par SMS si vous voulez."

Astuce : envoyez ces demandes à 3-5 patients par mois plutôt qu'en une seule fois, pour un flux d'avis régulier et naturel aux yeux de Google.`;

const SERVICE_PAGE_TEMPLATE = `Structure à suivre pour chaque page service, avec un exemple concret à adapter à votre pratique :

1. Titre (H1) — reprend le mot-clé :
"Psychologue spécialisé en anxiété à Lyon"

2. Introduction (2-3 phrases) :
"Vous ressentez une anxiété qui perturbe votre quotidien ? En tant que psychologue à Lyon spécialisé dans la prise en charge de l'anxiété, je vous accompagne vers un mieux-être durable."

3. Déroulement de la consultation :
"La première séance dure 1h et permet de faire le point sur votre situation. Les séances suivantes (45 min) s'appuient sur des techniques adaptées à vos besoins."

4. Réponses aux questions fréquentes : tarifs, remboursement, télétransmission, durée du suivi.

5. Appel à l'action final, bien visible :
"Prenez rendez-vous en ligne dès maintenant" (avec le lien de réservation).

Pas de site pour l'instant ? Cette même structure fonctionne très bien sur une simple page Google Sites gratuite ou sur une fiche annuaire complète (voir action dédiée).`;

const GBP_OPTIMIZATION_TEMPLATE = `Sur business.google.com, voici des exemples concrets à adapter :

Description de la fiche (750 caractères max), exemple :
"Cabinet de [spécialité] à [ville], j'accompagne mes patients sur [votre positionnement, ex: l'anxiété, la confiance en soi]. Consultations en cabinet et en téléconsultation. Prise de rendez-vous en ligne ou par téléphone."

Photos à ajouter en priorité : façade/entrée du cabinet, salle d'attente, salle de consultation, une photo professionnelle de vous.

Catégorie principale : vérifiez qu'elle correspond exactement à votre métier (ex: "Psychologue" plutôt qu'un intitulé générique) — cela influence directement les recherches qui vous font apparaître.

Publications (posts) : publiez une fois par mois un post court, par exemple "Nouveaux créneaux disponibles cette semaine" ou "Le saviez-vous ? [un conseil lié à votre spécialité]" — cela signale à Google une fiche active.`;

export function generateActionPlan(
  therapist: TherapistProfile,
  scores: { visibility: ScoreResult; trust: ScoreResult; conversion: ScoreResult },
  latestReview: ReviewMetric | null,
  competitors: Competitor[] = []
): ActionCandidate[] {
  const candidates: ActionCandidate[] = [];
  const entry = findSpecialtyEntry(therapist.specialty);

  if (!therapist.gbp_url) {
    candidates.push({
      title: "Renseigner le lien de la fiche Google Business Profile",
      category: "gbp",
      impact_estimate: "high",
      description:
        "Allez sur business.google.com, connectez-vous (ou créez une fiche si vous n'en avez pas encore), puis cliquez sur \"Partager\" pour copier le lien de votre fiche. Collez ce lien dans le champ \"Lien Google Business Profile\" de votre fiche cabinet ici.",
    });
  } else if (scores.visibility.value < 60) {
    candidates.push({
      title: "Optimiser la fiche Google Business Profile",
      category: "gbp",
      impact_estimate: "high",
      description: GBP_OPTIMIZATION_TEMPLATE,
    });
  }

  if (scores.visibility.value < 50) {
    candidates.push({
      title: "Créer ou améliorer les pages services ciblant les mots-clés prioritaires",
      category: "content",
      impact_estimate: "high",
      description: SERVICE_PAGE_TEMPLATE,
    });
  } else if (scores.visibility.value < 70) {
    candidates.push({
      title: "Ajouter des FAQ locales sur les pages clés",
      category: "content",
      impact_estimate: "medium",
      description:
        "Ajoutez 4 à 6 questions/réponses en bas de votre page d'accueil ou de vos pages services, en reprenant les questions que vos patients posent réellement en premier contact (tarifs, remboursement, déroulement, durée, télétransmission). Cela répond directement aux recherches informationnelles et renforce votre référencement local.",
    });
  }

  if (!latestReview || latestReview.review_count < 20) {
    candidates.push({
      title: "Demander de nouveaux avis aux patients récents",
      category: "trust",
      impact_estimate: "medium",
      description: REVIEW_REQUEST_TEMPLATE,
    });
  }

  if (scores.conversion.value < 60) {
    candidates.push({
      title: "Améliorer l'expérience de prise de contact",
      category: "conversion",
      impact_estimate: "high",
      description:
        "Vérifiez que votre téléphone et votre lien de réservation sont visibles sans avoir à faire défiler la page d'accueil de votre site. Si la prise de rendez-vous passe par un formulaire, limitez-le à 3-4 champs (nom, téléphone, email, message). Pas d'outil de réservation en ligne ? Voir l'action dédiée ci-dessous.",
    });
  }

  if (!therapist.booking_url) {
    candidates.push({
      title: "Ajouter un lien de réservation en ligne",
      category: "conversion",
      impact_estimate: "medium",
      description:
        "Des outils permettent une prise de rendez-vous 24h/24 : Doctolib (payant mais très utilisé et bien référencé), Calendly (gratuit pour un usage simple), ou le système de réservation intégré à Google Business Profile si votre fiche le propose. Une fois configuré, ajoutez le lien dans le champ \"Lien de réservation\" de votre fiche cabinet.",
    });
  }

  const competitorSummary = summarizeCompetitors(competitors);
  if (competitorSummary.avgRating != null) {
    const yours = latestReview?.avg_rating ?? 0;
    if (yours > 0 && yours < competitorSummary.avgRating) {
      candidates.push({
        title: `Améliorer votre note moyenne pour dépasser vos concurrents (moyenne ${competitorSummary.avgRating}★ vs vos ${yours}★)`,
        category: "competitors",
        impact_estimate: "medium",
        description:
          "Répondez à tous vos avis récents, y compris les avis positifs (cela améliore votre profil aux yeux de Google et rassure les futurs patients). Face à un avis négatif, répondez calmement et proposez un échange en privé plutôt que d'argumenter publiquement.",
      });
    }
  }

  const directories = getDirectoriesForCategory(entry?.category);
  candidates.push({
    title: "S'inscrire sur les annuaires et plateformes adaptés à votre pratique",
    category: "visibility",
    impact_estimate: "medium",
    description:
      "Une présence sur plusieurs annuaires renforce votre visibilité et vos liens entrants (bon pour le référencement) :\n\n" +
      directories.map((d) => `• ${d.name}${d.url ? ` (${d.url})` : ""} — ${d.note}`).join("\n"),
  });

  const referralSources = getReferralSources(entry?.id);
  candidates.push({
    title: "Développer un réseau de prescripteurs",
    category: "network",
    impact_estimate: "medium",
    description:
      `Les professionnels suivants orientent souvent des patients vers votre type de pratique : ${referralSources.join(", ")}. ` +
      "Prenez contact avec quelques-uns près de chez vous (email de présentation, plaquette, ou rendez-vous rapide) pour vous faire connaître — beaucoup de prises de rendez-vous démarrent par une recommandation plutôt qu'une recherche Google.",
  });

  return candidates;
}
