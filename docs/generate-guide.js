const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ShadingType,
  BorderStyle,
  PageBreak,
  LevelFormat,
} = require("docx");
const fs = require("fs");

const NAVY = "0f172a";
const BLUE = "2563eb";
const GRAY = "64748b";
const LIGHT = "f1f5f9";

function h1(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 } });
}
function h2(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 150 } });
}
function h3(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_3, spacing: { before: 200, after: 100 } });
}
function p(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, ...opts })],
    spacing: { after: 160 },
  });
}
function bullet(text, level = 0) {
  return new Paragraph({
    text,
    numbering: { reference: "main-bullets", level },
    spacing: { after: 80 },
  });
}
function numbered(text, level = 0) {
  return new Paragraph({
    text,
    numbering: { reference: "main-numbers", level },
    spacing: { after: 80 },
  });
}
function boldLine(label, rest) {
  return new Paragraph({
    children: [
      new TextRun({ text: label, bold: true }),
      new TextRun({ text: rest }),
    ],
    spacing: { after: 120 },
  });
}

function cell(text, opts = {}) {
  return new TableCell({
    width: { size: opts.width ?? 3000, type: WidthType.DXA },
    shading: opts.header ? { type: ShadingType.CLEAR, fill: NAVY } : undefined,
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            bold: !!opts.header,
            color: opts.header ? "FFFFFF" : undefined,
          }),
        ],
      }),
    ],
  });
}

const checklistTable = new Table({
  columnWidths: [2200, 6800],
  width: { size: 9000, type: WidthType.DXA },
  rows: [
    new TableRow({
      children: [
        cell("Fréquence", { header: true, width: 2200 }),
        cell("Action", { header: true, width: 6800 }),
      ],
    }),
    new TableRow({
      children: [
        cell("Chaque mois", { width: 2200 }),
        cell(
          "Saisir les métriques du mois précédent (Search Console + Google Business Profile) dans l'onglet Performance.",
          { width: 6800 }
        ),
      ],
    }),
    new TableRow({
      children: [
        cell("Chaque mois", { width: 2200 }),
        cell(
          "Regarder le tableau de bord : vérifier les 3 scores et traiter les alertes en rouge en priorité.",
          { width: 6800 }
        ),
      ],
    }),
    new TableRow({
      children: [
        cell("Chaque mois", { width: 2200 }),
        cell(
          "Cliquer sur \"Régénérer à partir des scores\" dans le Plan d'action, puis traiter 1 à 3 actions à impact \"Haute\".",
          { width: 6800 }
        ),
      ],
    }),
    new TableRow({
      children: [
        cell("Chaque mois", { width: 2200 }),
        cell(
          "Vérifier la position actuelle des 3 à 5 mots-clés prioritaires et mettre à jour la fiche si besoin.",
          { width: 6800 }
        ),
      ],
    }),
    new TableRow({
      children: [
        cell("Chaque trimestre", { width: 2200 }),
        cell(
          "Revoir la liste des concurrents : en ajouter de nouveaux repérés sur Google, mettre à jour avis/notes des existants.",
          { width: 6800 }
        ),
      ],
    }),
    new TableRow({
      children: [
        cell("Chaque trimestre", { width: 2200 }),
        cell(
          "Relire la liste des mots-clés : ajouter de nouvelles idées, archiver ceux qui ne sont plus pertinents.",
          { width: 6800 }
        ),
      ],
    }),
  ],
});

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "main-bullets",
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 420, hanging: 260 } } } },
          { level: 1, format: LevelFormat.BULLET, text: "◦", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 840, hanging: 260 } } } },
        ],
      },
      {
        reference: "main-numbers",
        levels: [
          { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 420, hanging: 260 } } } },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: { size: { width: 11906, height: 16838 } }, // A4
      },
      children: [
        // Title page
        new Paragraph({ text: "", spacing: { before: 1600 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Guide d'utilisation", bold: true, size: 56, color: NAVY }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 400 },
          children: [
            new TextRun({ text: "SEO Local Therapist Dashboard", bold: true, size: 32, color: BLUE }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "Comment améliorer votre visibilité locale sur Google, mois après mois",
              size: 24,
              color: GRAY,
              italics: true,
            }),
          ],
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // Section 1
        h1("1. À quoi sert cet outil"),
        p(
          "Ce dashboard vous aide à répondre à trois questions simples, mois après mois :"
        ),
        bullet("Est-ce que les patients me trouvent sur Google ? (Visibilité)"),
        bullet("Est-ce qu'ils me font confiance une fois qu'ils sont tombés sur ma fiche ? (Confiance)"),
        bullet("Est-ce que cette visibilité se transforme en prises de rendez-vous ? (Conversion)"),
        p(
          "Chaque mois, vous saisissez quelques chiffres (issus de Google Search Console et de votre fiche Google Business Profile), et l'outil calcule automatiquement 3 scores sur 100, vous alerte quand quelque chose ne va pas, et vous propose un plan d'action priorisé."
        ),
        p(
          "Ce guide vous explique en particulier comment utiliser les deux modules les plus stratégiques : les mots-clés et les concurrents."
        ),

        // Section 2
        h1("2. Premiers pas"),
        h2("2.1 Se connecter"),
        p(
          "Rendez-vous sur l'adresse fournie par votre consultant SEO, cliquez sur \"Créer un compte\" la première fois, renseignez votre email et un mot de passe, puis confirmez votre adresse via l'email reçu."
        ),
        h2("2.2 Remplir votre fiche cabinet"),
        p("Une fois connecté, créez votre cabinet et renseignez notamment :"),
        bullet("Site web — l'adresse de votre site s'il existe."),
        bullet(
          "Lien Google Business Profile — l'adresse de votre fiche Google (visible en cliquant sur \"Partager\" depuis votre fiche dans Google Maps, ou depuis google.com/business)."
        ),
        bullet(
          "Lien de réservation — l'adresse de votre outil de prise de rendez-vous en ligne, si vous en avez un."
        ),
        bullet("Spécialité, ville, zone géographique ciblée — utilisés pour vous situer et filtrer vos données."),
        p(
          "Ces informations ne sont pas juste administratives : l'absence de lien Google Business Profile ou de lien de réservation déclenche automatiquement une recommandation dans votre plan d'action, car ce sont des leviers de conversion importants."
        ),

        // Section 3
        h1("3. Le tableau de bord : comprendre vos 3 scores"),
        p(
          "La page d'accueil (Vue globale) affiche vos 3 scores sous forme de pastilles colorées :"
        ),
        bullet("Vert (≥ 70) : point fort, rien d'urgent à faire."),
        bullet("Orange (40 à 69) : à surveiller, des actions peuvent aider."),
        bullet("Rouge (< 40) : point faible prioritaire."),
        p(
          "Cliquez sur \"Détail\" sous chaque score pour voir exactement de quoi il est composé (par exemple, le score Confiance dépend du nombre d'avis, de la note moyenne, de leur fraîcheur, de votre taux de réponse, etc.). Rien n'est une boîte noire : chaque composant a un poids affiché en pourcentage."
        ),
        p(
          "En dessous, vous trouvez : un graphique d'évolution sur 6 mois, vos alertes prioritaires, vos meilleurs mots-clés (par opportunité), vos concurrents les plus établis, et vos actions les plus urgentes."
        ),

        // Section 4 - KEYWORDS
        h1("4. Le workflow Mots-clés"),
        h2("4.1 Qu'est-ce qu'un \"mot-clé\" dans cet outil ?"),
        p(
          "Un mot-clé, c'est simplement une phrase qu'un patient potentiel tape dans Google pour vous trouver. Par exemple : \"psychologue Lyon 6\", \"thérapie de couple en visio\", \"sophrologue périnatalité Bordeaux\". Chaque mot-clé que vous suivez représente une opportunité de visibilité que vous pouvez travailler."
        ),
        h2("4.2 Comment trouver de bons mots-clés"),
        numbered("Pensez comme un patient : listez les symptômes, situations ou besoins qui vous amènent des consultations (\"anxiété\", \"burn-out\", \"deuil\", \"thérapie de couple\"), combinés à votre spécialité et votre ville."),
        numbered("Utilisez l'auto-complétion Google : tapez le début d'une recherche (\"psychologue à\") dans Google et notez les suggestions proposées."),
        numbered("Regardez la section \"Autres questions posées\" et \"Recherches associées\" en bas des résultats Google pour une recherche liée à votre activité."),
        numbered("Si vous avez déjà un site relié à Search Console, ouvrez le rapport \"Performances\" : il liste les requêtes qui vous amènent déjà des clics ou des impressions — ce sont d'excellents mots-clés à suivre en priorité."),
        numbered("Regardez les pages \"services\" de vos concurrents (voir section 5) : les intitulés qu'ils utilisent vous donnent des idées de formulation."),
        h2("4.3 Comment remplir une fiche mot-clé"),
        boldLine("Mot-clé : ", "la phrase exacte, telle qu'un patient la taperait (ex: \"thérapeute de couple Nantes\")."),
        boldLine("Intention de recherche : ", "à quel besoin répond cette recherche — \"informationnelle\" (la personne cherche à comprendre, ex: \"qu'est-ce que la sophrologie\"), \"transactionnelle\" (la personne veut prendre rendez-vous, ex: \"psychologue Nantes rendez-vous\"), ou \"navigationnelle\" (la personne cherche votre cabinet précis par son nom)."),
        boldLine("Localisation associée : ", "la ville ou le quartier visé par ce mot-clé, si pertinent."),
        boldLine("Volume estimé : ", "une estimation du nombre de recherches mensuelles. Sans outil payant, vous pouvez utiliser Google Keyword Planner (gratuit avec un compte Google Ads) ou simplement estimer \"faible / moyen / fort\" en comparant plusieurs mots-clés entre eux."),
        boldLine("Difficulté : ", "de 0 (facile) à 100 (très concurrentiel). Regardez combien de cabinets bien établis (beaucoup d'avis, site pro) apparaissent déjà sur ce mot-clé : plus il y en a, plus la difficulté est haute."),
        boldLine("Position actuelle : ", "votre position dans les résultats Google pour ce mot-clé. Vérifiez-la en recherchant le mot-clé en navigation privée (pour éviter que Google personnalise les résultats), ou via le rapport Performances de Search Console."),
        boldLine("URL ciblée : ", "la page de votre site qui doit répondre à cette recherche (page d'accueil, page service, page ville)."),
        boldLine("Priorité : ", "Haute / Moyenne / Basse — à définir selon le volume, la difficulté et l'importance de ce service pour votre activité."),
        boldLine("Statut : ", "\"À faire\" (pas encore travaillé), \"En cours\" (vous optimisez la page ou créez du contenu), \"Fait\" (page publiée et optimisée)."),
        h2("4.4 Comment prioriser"),
        p(
          "Concentrez-vous sur les mots-clés avec un bon compromis volume/difficulté : un volume correct, une difficulté raisonnable, et si possible une position déjà proche de la première page (11 à 20) — ce sont les \"quick wins\", les plus rapides à faire progresser."
        ),
        h2("4.5 Rituel mensuel"),
        p(
          "Une fois par mois, revérifiez la position de vos 3 à 5 mots-clés prioritaires et ajustez leur statut. Le tableau de bord vous propose automatiquement vos meilleures opportunités du moment."
        ),

        // Section 5 - COMPETITORS
        h1("5. Le workflow Concurrents"),
        h2("5.1 Qui est un \"concurrent\" ici ?"),
        p(
          "Ce sont les autres cabinets, thérapeutes ou plateformes qui apparaissent sur Google quand un patient tape vos mots-clés cibles — en particulier ceux visibles dans le \"pack local\" (le bloc avec la carte Google Maps et 3 établissements) et dans les tout premiers résultats organiques."
        ),
        h2("5.2 Comment les identifier"),
        numbered("Ouvrez une navigation privée et recherchez vos 2-3 mots-clés les plus importants (ex: \"psychologue + votre ville\")."),
        numbered("Notez les 3 établissements qui apparaissent dans le pack local Google Maps."),
        numbered("Notez également les 3 premiers résultats organiques (liens classiques sous le pack local)."),
        numbered("Répétez pour vos autres mots-clés prioritaires : les mêmes noms reviennent souvent, ce sont vos concurrents directs."),
        h2("5.3 Comment remplir une fiche concurrent"),
        boldLine("Nom, ville : ", "identification du cabinet ou du praticien concurrent."),
        boldLine("Nombre d'avis, note moyenne : ", "visibles directement sur leur fiche Google (cliquez sur leur nom dans les résultats ou dans Maps)."),
        boldLine("Type d'offre : ", "leur positionnement (ex: \"thérapies brèves\", \"TCC\", \"téléconsultation uniquement\", \"cabinet de groupe pluridisciplinaire\")."),
        boldLine("Différenciation : ", "ce qui les rend visibles ou attractifs (beaucoup d'avis récents, horaires élargis, site web très complet, présence sur les réseaux sociaux...)."),
        boldLine("Opportunité à exploiter : ", "un point faible que vous pouvez utiliser à votre avantage — par exemple \"pas de créneaux en soirée\", \"aucun avis depuis 1 an\", \"pas de prise de rendez-vous en ligne\", \"site web absent ou obsolète\"."),
        h2("5.4 À quoi ça sert concrètement"),
        p(
          "Ces informations alimentent le score d'opportunité de vos mots-clés : un mot-clé avec un bon volume de recherche, une difficulté raisonnable, et des concurrents fragiles sur ce mot-clé précis est une priorité évidente. Elles nourrissent aussi vos idées d'actions concrètes (ex: si un concurrent n'a aucun avis récent, \"Demander de nouveaux avis\" devient d'autant plus payant pour vous)."
        ),
        h2("5.5 Rituel trimestriel"),
        p(
          "Revoyez votre liste de concurrents tous les trimestres : de nouveaux cabinets ouvrent, d'autres changent d'offre ou gagnent des avis. Une liste à jour rend vos priorités plus fiables."
        ),

        // Section 6 - metrics
        h1("6. Saisir les métriques mensuelles"),
        p(
          "Chaque mois, dans l'onglet Performance, saisissez les chiffres du mois précédent."
        ),
        h2("6.1 Depuis Google Search Console"),
        p(
          "Si votre site est relié à Search Console (search.google.com/search-console), ouvrez le rapport \"Performances sur les résultats de recherche\" : vous y trouverez les impressions, les clics, le CTR et la position moyenne pour la période choisie."
        ),
        h2("6.2 Depuis Google Business Profile"),
        p(
          "Sur votre fiche (business.google.com ou l'application Google Business Profile), ouvrez l'onglet \"Performances\" : vous y trouverez les vues du profil, les appels, les demandes d'itinéraire, les clics vers le site, les messages et les réservations."
        ),
        h2("6.3 Avis et confiance"),
        p(
          "Le nombre d'avis et la note moyenne sont visibles sur votre fiche Google. Le taux de réponse et la fraîcheur des avis sont à estimer vous-même (avez-vous répondu à la majorité de vos avis récents ? Votre dernier avis date-t-il de plusieurs mois ?)."
        ),
        h2("6.4 Conversion"),
        p(
          "Les clics vers la réservation, les clics téléphone, les formulaires envoyés et les messages reçus proviennent de votre outil de prise de rendez-vous en ligne (si vous en avez un) et de votre fiche Google Business Profile."
        ),

        // Section 7 - action plan
        h1("7. Le plan d'action"),
        p(
          "Cliquez sur \"Régénérer à partir des scores\" pour que l'outil propose automatiquement des actions concrètes en fonction de vos points faibles actuels (ex: \"Demander de nouveaux avis\", \"Ajouter des FAQ locales\", \"Renseigner le lien Google Business Profile\"). Vous pouvez aussi ajouter vos propres actions manuellement, et faire évoluer leur statut : À faire → En cours → Fait."
        ),
        p(
          "Chaque action affiche un niveau d'impact estimé (Haute / Moyenne / Basse) pour vous aider à choisir sur quoi vous concentrer en premier."
        ),

        // Section 8 - import/export
        h1("8. Import et export"),
        p(
          "Si vous avez déjà beaucoup de mots-clés, concurrents ou plusieurs mois de métriques à saisir, utilisez l'import CSV (onglet Import) : téléchargez le modèle, remplissez-le dans un tableur (Excel, Google Sheets), puis importez-le en une fois. Vous pouvez à tout moment exporter vos données en CSV, ou exporter un résumé de votre dashboard en PDF pour le partager ou l'archiver."
        ),

        // Section 9 - routine
        h1("9. Routine recommandée"),
        p("Voici le rythme conseillé pour tirer parti de l'outil sans y passer des heures :"),
        new Paragraph({ text: "", spacing: { after: 100 } }),
        checklistTable,
        new Paragraph({ text: "", spacing: { after: 200 } }),
        p(
          "En suivant cette routine simple, vos scores et votre plan d'action resteront à jour, et vous saurez toujours concrètement sur quoi agir pour améliorer votre visibilité locale.",
          { italics: true, color: GRAY }
        ),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(__dirname + "/Guide-utilisation-SEO-Local-Therapist-Dashboard.docx", buffer);
  console.log("Written.");
});
