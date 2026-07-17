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

const REVIEW_REQUEST_TEMPLATE = `Récupérez votre lien d'avis direct : sur votre fiche Google Business Profile (business.google.com), cliquez sur "Demander des avis" pour obtenir un lien court à partager.

Envoyez ensuite ce message (SMS, email ou WhatsApp) à vos patients des 2-3 derniers mois :

"Bonjour [Prénom], j'espère que nos séances vous sont utiles. Si vous le souhaitez, cela m'aiderait beaucoup que vous preniez 2 minutes pour laisser un avis sur ma fiche Google : [votre lien d'avis]. Merci beaucoup, [Votre nom]"

Envoyez cette demande à 3-5 patients par mois plutôt qu'en une seule fois, pour un flux d'avis régulier et naturel aux yeux de Google.`;

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
      description:
        "Sur business.google.com : ajoutez au moins 10 photos récentes (cabinet, salle d'attente, vous en consultation), complétez la description en mentionnant votre spécialité et votre ville, vérifiez que la catégorie principale correspond bien à votre activité, et renseignez vos horaires précisément. Ce sont les éléments les plus consultés avant une prise de contact.",
    });
  }

  if (scores.visibility.value < 50) {
    candidates.push({
      title: "Créer ou améliorer les pages services ciblant les mots-clés prioritaires",
      category: "content",
      impact_estimate: "high",
      description:
        "Pour vos 3 mots-clés les plus prioritaires (onglet Mots-clés), créez une page ou section dédiée qui : reprend le mot-clé dans le titre et le premier paragraphe, explique concrètement le déroulement d'une consultation, répond aux questions fréquentes (tarifs, remboursement, durée), et se termine par un lien de prise de rendez-vous clair. Pas de site ? Une page Google Sites gratuite ou une fiche complète sur un annuaire (voir action dédiée) peut suffire pour démarrer.",
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

  if (scores.trust.value < 60) {
    candidates.push({
      title: "Renforcer les signaux de confiance",
      category: "trust",
      impact_estimate: "high",
      description:
        "Sur votre site et votre fiche Google : affichez vos diplômes/certifications (et numéro ADELI/RPPS si applicable), mettez en avant 2-3 témoignages ou avis, indiquez votre nombre d'années d'expérience, et ajoutez une vraie photo professionnelle de vous (pas un logo). Ces éléments rassurent un patient qui ne vous connaît pas encore avant qu'il ne prenne contact.",
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

  if (!therapist.website_url) {
    candidates.push({
      title: "Créer un site web ou une page de présentation",
      category: "content",
      impact_estimate: "high",
      description:
        "Pas besoin d'un site complexe pour démarrer : une seule page présentant votre spécialité, votre ville, vos tarifs et un lien de prise de rendez-vous suffit. Google Sites (gratuit), Wix, ou une fiche complète sur un annuaire professionnel (voir action dédiée ci-dessous) sont de bons premiers pas.",
    });
  }

  const competitorSummary = summarizeCompetitors(competitors);
  if (competitorSummary.avgReviewCount != null) {
    const yours = latestReview?.review_count ?? 0;
    if (yours < competitorSummary.avgReviewCount) {
      candidates.push({
        title: `Combler l'écart d'avis avec vos concurrents (moyenne ${competitorSummary.avgReviewCount} vs vos ${yours})`,
        category: "competitors",
        impact_estimate: competitorSummary.avgReviewCount - yours > 15 ? "high" : "medium",
        description:
          "Voir l'action \"Demander de nouveaux avis aux patients récents\" ci-dessus pour la démarche et le message prêt à envoyer. L'écart se comble progressivement en visant 3 à 5 nouvelles demandes par mois plutôt qu'une campagne unique.",
      });
    }
  }
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
