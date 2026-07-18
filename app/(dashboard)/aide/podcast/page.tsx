import Link from "next/link";

const SECTIONS = [
  { id: "role-strategique", label: "1. Le rôle stratégique du podcast" },
  { id: "positionnement", label: "2. Le positionnement idéal" },
  { id: "podcast-hybride", label: "3. Le podcast hybride" },
  { id: "format", label: "4. Le format qui fonctionne le mieux" },
  { id: "croissance", label: "5. Le podcast réseau" },
  { id: "invites", label: "6. La stratégie invités" },
  { id: "message-invitation", label: "7. Le message d'invitation" },
  { id: "seo-youtube-podcast", label: "8. Optimisation SEO YouTube + Podcast" },
  { id: "transcript", label: "9. Le transcript : l'or caché" },
  { id: "donnees-structurees", label: "10. Les données structurées" },
  { id: "calendrier", label: "11. Le calendrier idéal" },
  { id: "outils", label: "12. Les outils recommandés" },
  { id: "erreurs", label: "13. Les erreurs à éviter" },
  { id: "strategie-niche", label: "14. Stratégie pour ton positionnement" },
  { id: "hebergeurs", label: "Les meilleurs hébergeurs gratuits" },
  { id: "ecosysteme", label: "L'écosystème à construire" },
  { id: "geo-strategie", label: "La stratégie GEO (IA)" },
  { id: "structure-page-episode", label: "Structure d'une page épisode" },
  { id: "outils-gratuits", label: "Outils gratuits complémentaires" },
  { id: "choix-final", label: "Mon choix pour une autorité long terme" },
];

function TableOfContents() {
  return (
    <nav aria-label="Sommaire">
      <p className="px-3 text-xs font-medium uppercase tracking-wide text-slate-400">Sommaire</p>
      <ul className="mt-1 space-y-0.5">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="block rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-6 text-base font-semibold text-slate-900">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-4 text-sm font-semibold text-slate-900">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-sm text-slate-600">{children}</p>;
}

function UL({ children }: { children: React.ReactNode }) {
  return <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">{children}</ul>;
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm italic text-slate-700">
      {children}
    </p>
  );
}

function FlowSteps({ steps }: { steps: string[] }) {
  return (
    <div className="mt-3 flex flex-col items-start gap-1">
      {steps.map((step, i) => (
        <div key={step}>
          <span className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700">
            {step}
          </span>
          {i < steps.length - 1 && <div className="py-0.5 pl-3 text-slate-400">↓</div>}
        </div>
      ))}
    </div>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
            {head.map((h) => (
              <th key={h} className="py-2 pr-4">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-slate-600">
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-slate-100 align-top">
              {row.map((cell, j) => (
                <td key={j} className={`py-2 pr-4 ${j === 0 ? "font-medium text-slate-900" : ""}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PodcastGuidePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      <div>
        <Link href="/aide" className="text-xs font-medium text-blue-700 hover:underline">
          ← Retour à Aide
        </Link>
        <h1 className="mt-2 text-lg font-semibold text-slate-900">Podcast</h1>
        <p className="mt-1 text-sm text-slate-500">
          Le podcast est particulièrement puissant dans les métiers de l&apos;accompagnement parce
          qu&apos;il crée un actif rare : la confiance avant le premier contact.
        </p>
      </div>

      <details className="rounded-xl border border-slate-200 bg-white p-3 lg:hidden">
        <summary className="cursor-pointer text-sm font-medium text-slate-900">Sommaire</summary>
        <div className="mt-2">
          <TableOfContents />
        </div>
      </details>

      <div className="lg:flex lg:items-start lg:gap-8">
        <aside className="hidden shrink-0 lg:sticky lg:top-6 lg:block lg:w-64">
          <div className="rounded-xl border border-slate-200 bg-white py-3">
            <TableOfContents />
          </div>
        </aside>

        <article className="min-w-0 flex-1 space-y-8">
          <P>
            Un patient/client choisit rarement un thérapeute uniquement pour ses compétences
            techniques. Il choisit aussi :
          </P>
          <UL>
            <li>sa façon d&apos;expliquer ;</li>
            <li>son énergie ;</li>
            <li>ses valeurs ;</li>
            <li>sa vision de l&apos;accompagnement ;</li>
            <li>le sentiment de sécurité qu&apos;il ressent en l&apos;écoutant.</li>
          </UL>
          <P>Le podcast est donc un excellent outil de pré-qualification émotionnelle.</P>

          <section>
            <H2 id="role-strategique">1. Le rôle stratégique du podcast pour un thérapeute</H2>
            <P>Un podcast peut servir 5 objectifs :</P>
            <Table
              head={["Objectif", "Impact"]}
              rows={[
                ["Développer la confiance", "La personne apprend à te connaître avant une séance"],
                ["Renforcer ton expertise", "Tu deviens une référence sur un sujet"],
                ["Être visible dans les IA", "Tu crées des contenus riches, transcrits et citables"],
                ["Développer un réseau", "Les invités deviennent des partenaires"],
                ["Créer des opportunités", "Conférences, collaborations, recommandations"],
              ]}
            />
            <P>
              Le podcast n&apos;est pas seulement un canal de communication : c&apos;est un outil de
              réseau et d&apos;autorité.
            </P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="positionnement">2. Le positionnement idéal d&apos;un podcast thérapeute</H2>
            <P>L&apos;erreur fréquente :</P>
            <Quote>❌ &quot;Podcast bien-être et développement personnel&quot; — Trop large.</Quote>
            <P>Il faut une promesse claire. Formule :</P>
            <Quote>
              &quot;Le podcast qui aide [public] à comprendre [problème] grâce à [approche].&quot;
            </Quote>
            <P>Exemples :</P>
            <UL>
              <li>
                <strong>Psychologue</strong> — &quot;Comprendre son cerveau pour mieux gérer ses
                émotions.&quot;
              </li>
              <li>
                <strong>Thérapeute trauma</strong> — &quot;Comprendre les blessures invisibles qui
                influencent nos relations.&quot;
              </li>
              <li>
                <strong>Naturopathe</strong> — &quot;Retrouver son énergie grâce à une meilleure
                compréhension du corps.&quot;
              </li>
              <li>
                <strong>Coach de thérapeutes</strong> — &quot;Le podcast qui aide les thérapeutes
                indépendants à développer un cabinet durable sans dépendre des réseaux
                sociaux.&quot;
              </li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="podcast-hybride">3. La stratégie la plus efficace : le podcast hybride</H2>
            <P>Je ne recommande pas un podcast uniquement audio.</P>
            <H3>Podcast vidéo + audio</H3>
            <P>Tu enregistres :</P>
            <UL>
              <li>vidéo YouTube ;</li>
              <li>audio Spotify ;</li>
              <li>Apple Podcasts ;</li>
              <li>Deezer ;</li>
              <li>extraits Shorts/Reels/TikTok ;</li>
              <li>articles de blog ;</li>
              <li>newsletter.</li>
            </UL>
            <P>Une heure d&apos;enregistrement peut devenir :</P>
            <Quote>
              1 épisode complet YouTube + 1 épisode podcast audio + 5 Shorts + 1 article SEO + 10
              posts LinkedIn + une newsletter
            </Quote>
            <P>C&apos;est une stratégie de multiplication de contenu.</P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="format">4. Le format qui fonctionne le mieux pour un thérapeute</H2>
            <H3>Format principal : interview d&apos;experts</H3>
            <P>Durée : 45-60 minutes. Pourquoi ? Parce que l&apos;invité apporte :</P>
            <UL>
              <li>son audience ;</li>
              <li>sa crédibilité ;</li>
              <li>son réseau.</li>
            </UL>
            <P>Invités possibles :</P>
            <UL>
              <li>psychologues ;</li>
              <li>médecins ;</li>
              <li>chercheurs ;</li>
              <li>autres thérapeutes ;</li>
              <li>auteurs ;</li>
              <li>coachs ;</li>
              <li>associations ;</li>
              <li>entrepreneurs du bien-être.</li>
            </UL>

            <H3>Format secondaire : épisode solo</H3>
            <P>Durée : 10-20 minutes. Sujet : une question précise. Exemples :</P>
            <UL>
              <li>Pourquoi répétons-nous les mêmes schémas relationnels ?</li>
              <li>Comment reconnaître une relation toxique ?</li>
              <li>Pourquoi notre corps garde certaines tensions ?</li>
              <li>Pourquoi consulter un thérapeute ?</li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="croissance">5. Le meilleur modèle de croissance : le podcast réseau</H2>
            <P>Pour un thérapeute, je privilégierais :</P>
            <UL>
              <li>70% interviews</li>
              <li>20% réponses aux questions fréquentes</li>
              <li>10% histoire personnelle / vision</li>
            </UL>
            <P>Pourquoi ? Parce que chaque invité devient un potentiel :</P>
            <UL>
              <li>prescripteur ;</li>
              <li>partenaire ;</li>
              <li>relais ;</li>
              <li>recommandation.</li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="invites">6. La stratégie invités (très importante)</H2>
            <P>Ne cherche pas uniquement des célébrités. Cherche des personnes :</P>
            <UL>
              <li>compétentes ;</li>
              <li>accessibles ;</li>
              <li>complémentaires ;</li>
              <li>qui parlent à ton audience.</li>
            </UL>
            <P>Exemple pour un psychologue, invités :</P>
            <UL>
              <li>psychiatre ;</li>
              <li>coach sportif ;</li>
              <li>nutritionniste ;</li>
              <li>professeur de yoga ;</li>
              <li>médecin du sommeil ;</li>
              <li>sophrologue.</li>
            </UL>
            <P>Tu construis un écosystème.</P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="message-invitation">7. Le message d&apos;invitation efficace</H2>
            <P>Ne dis pas :</P>
            <Quote>&quot;Bonjour, voulez-vous venir dans mon podcast ?&quot; — Trop centré sur toi.</Quote>
            <P>Dis plutôt :</P>
            <Quote>
              &quot;Je crée une série d&apos;épisodes autour de [thème]. Votre expertise sur [sujet]
              pourrait aider les personnes qui cherchent à mieux comprendre [problème].&quot;
            </Quote>
            <P>Tu proposes une mise en valeur.</P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="seo-youtube-podcast">8. Optimisation SEO YouTube + Podcast</H2>
            <P>Chaque épisode doit être pensé comme une page SEO.</P>
            <P>Mauvais titre :</P>
            <Quote>&quot;Interview de Sophie Martin&quot; — Personne ne cherche ça.</Quote>
            <P>Bon titre :</P>
            <Quote>
              &quot;Pourquoi nous répétons les mêmes schémas amoureux ? | Interview Sophie
              Martin&quot;
            </Quote>

            <H3>Structure description</H3>
            <P>Première ligne : la réponse au problème. Exemple :</P>
            <Quote>
              Pourquoi certaines personnes revivent-elles toujours les mêmes relations difficiles ?
            </Quote>
            <P>Puis :</P>
            <UL>
              <li>présentation de l&apos;invité ;</li>
              <li>points abordés ;</li>
              <li>liens ;</li>
              <li>ressources.</li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="transcript">9. Le transcript : l&apos;or caché</H2>
            <P>Chaque épisode doit être transformé en texte. Pourquoi ? Parce que :</P>
            <UL>
              <li>Google comprend mieux ;</li>
              <li>les IA peuvent analyser ;</li>
              <li>tu peux créer des articles.</li>
            </UL>
            <P>Workflow :</P>
            <FlowSteps
              steps={[
                "Podcast enregistré",
                "Transcription automatique",
                "Nettoyage",
                "Article SEO",
                "FAQ",
                "Posts LinkedIn",
              ]}
            />
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="donnees-structurees">10. Les données structurées à prévoir</H2>
            <P>Pour ton site, ajouter :</P>
            <UL>
              <li>
                <strong>PodcastSeries</strong> — pour la série.
              </li>
              <li>
                <strong>PodcastEpisode</strong> — pour chaque épisode, avec titre, description,
                date, invité, durée, image, URL audio/vidéo.
              </li>
            </UL>
            <P>Ajouter aussi :</P>
            <UL>
              <li>Person (toi)</li>
              <li>Person (invités)</li>
              <li>Organization</li>
              <li>Article (pour les retranscriptions)</li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="calendrier">11. Le calendrier idéal</H2>
            <H3>Phase 1 : lancement (3 mois)</H3>
            <P>Objectif : créer la bibliothèque. Rythme :</P>
            <UL>
              <li>1 épisode/semaine</li>
              <li>12 épisodes minimum</li>
            </UL>
            <P>Ne juge pas les résultats avant 20-30 épisodes.</P>

            <H3>Phase 2 : croissance (mois 4-12)</H3>
            <UL>
              <li>1 épisode/semaine</li>
              <li>3 Shorts par épisode</li>
              <li>newsletter</li>
              <li>partenariats invités</li>
            </UL>

            <H3>Phase 3 : autorité</H3>
            <P>Créer :</P>
            <UL>
              <li>événements ;</li>
              <li>conférences ;</li>
              <li>livres blancs ;</li>
              <li>guides.</li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="outils">12. Les outils recommandés</H2>
            <H3>Enregistrement</H3>
            <UL>
              <li>Riverside</li>
              <li>Zencastr</li>
              <li>StreamYard</li>
              <li>Zoom (simple)</li>
            </UL>
            <H3>Montage</H3>
            <UL>
              <li>Descript (excellent pour podcasts)</li>
              <li>CapCut</li>
              <li>Adobe Podcast Enhance</li>
            </UL>
            <H3>Hébergement audio</H3>
            <UL>
              <li>Ausha (très utilisé en France)</li>
              <li>Acast</li>
              <li>Spotify for Podcasters</li>
            </UL>
            <H3>Vidéo</H3>
            <UL>
              <li>YouTube Studio</li>
            </UL>
            <H3>Transcription</H3>
            <UL>
              <li>Whisper</li>
              <li>Descript</li>
              <li>Notta</li>
            </UL>
            <H3>Organisation invités</H3>
            <UL>
              <li>Calendly</li>
              <li>Notion</li>
              <li>Airtable</li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="erreurs">13. Les erreurs à éviter</H2>
            <UL>
              <li>❌ Faire un podcast trop généraliste.</li>
              <li>❌ Inviter uniquement des personnes connues.</li>
              <li>❌ Ne pas préparer les questions.</li>
              <li>❌ Faire 1h de conversation sans structure.</li>
              <li>❌ Ne pas transformer le contenu.</li>
              <li>❌ Ne pas mettre de lien vers ton site.</li>
              <li>❌ Ne pas créer de page dédiée sur ton site.</li>
              <li>❌ Arrêter après 5 épisodes.</li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="strategie-niche">
              14. La stratégie que je recommanderais spécifiquement pour ton positionnement
            </H2>
            <P>
              Comme tu sembles travailler autour du développement d&apos;activité des thérapeutes et
              du réseau de prescripteurs, je créerais un podcast de niche :
            </P>
            <P>Nom possible :</P>
            <Quote>&quot;Les thérapeutes qui réussissent&quot; ou &quot;Le cabinet thérapeutique durable&quot;</Quote>
            <P>Promesse :</P>
            <Quote>
              Les stratégies, histoires et méthodes des professionnels qui développent une activité
              thérapeutique solide sans perdre leur éthique.
            </Quote>
            <P>Invités :</P>
            <UL>
              <li>thérapeutes installés ;</li>
              <li>médecins ouverts aux approches complémentaires ;</li>
              <li>experts communication santé ;</li>
              <li>spécialistes du référencement ;</li>
              <li>créateurs de cabinets.</li>
            </UL>
            <P>Chaque épisode pourrait devenir un contenu GEO très fort :</P>
            <UL>
              <li>&quot;Comment un naturopathe développe son réseau local ?&quot;</li>
              <li>&quot;Comment un psychologue obtient des recommandations ?&quot;</li>
              <li>&quot;Comment créer un cabinet rentable sans publicité agressive ?&quot;</li>
            </UL>
            <P>
              C&apos;est exactement le type de contenu que les IA pourront associer à ton expertise.
            </P>
            <Quote>
              Mon conseil stratégique : ne pense pas &quot;podcast pour avoir des auditeurs&quot;,
              pense &quot;podcast comme machine à créer de l&apos;autorité, du réseau et des contenus
              réutilisables&quot;. Pour un thérapeute, c&apos;est probablement l&apos;un des
              meilleurs leviers long terme.
            </Quote>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="hebergeurs">Les meilleurs hébergeurs podcast gratuits</H2>
            <P>
              Un hébergeur de podcast ne sert pas seulement à &quot;mettre un fichier audio en
              ligne&quot;. Il crée ton flux RSS, indispensable pour distribuer ton podcast sur
              Spotify, Apple Podcasts, Deezer, Amazon Music, etc.
            </P>
            <Table
              head={["Plateforme", "Gratuit ?", "Points forts", "Limites", "Idéal pour"]}
              rows={[
                [
                  "Spotify for Podcasters",
                  "✅ Oui",
                  "Simple, distribution automatique, statistiques, intégration Spotify, enregistrement possible",
                  "Moins orienté site web/podcast professionnel avancé",
                  "Débuter rapidement",
                ],
                [
                  "Acast",
                  "✅ Offre gratuite",
                  "Interface professionnelle, distribution large, statistiques",
                  "Limites sur certaines fonctionnalités avancées",
                  "Créateurs sérieux qui veulent évoluer",
                ],
                [
                  "RedCircle",
                  "✅ Oui",
                  "Bon pour les créateurs indépendants, monétisation possible",
                  "Interface moins connue en France",
                  "Podcasts indépendants",
                ],
                [
                  "Podbean",
                  "✅ Offre gratuite",
                  "Simple, ancien acteur du marché, application mobile",
                  "Stockage et fonctionnalités limitées en gratuit",
                  "Débutants",
                ],
                [
                  "Buzzsprout",
                  "⚠️ Essai gratuit / limité",
                  "Très simple, excellent accompagnement débutant",
                  "Gratuit limité dans le temps",
                  "Tester avant de passer au payant",
                ],
                [
                  "Spreaker",
                  "✅ Offre gratuite",
                  "Live, création audio, communauté",
                  "Limites sur durée et stockage",
                  "Podcasts avec émissions en direct",
                ],
                [
                  "iVoox",
                  "✅ Offre gratuite",
                  "Forte présence hispanophone/francophone",
                  "Moins utilisé par certains publics",
                  "Public international",
                ],
              ]}
            />

            <H3>Mon classement pour un thérapeute</H3>
            <P>🥇 Option 1 : Spotify for Podcasters (le plus simple)</P>
            <P>Je le choisirais si tu démarres. Avantages :</P>
            <UL>
              <li>gratuit ;</li>
              <li>rapide ;</li>
              <li>distribution facile ;</li>
              <li>statistiques ;</li>
              <li>gestion depuis mobile ;</li>
              <li>possibilité de publier des épisodes vidéo selon les options disponibles.</li>
            </UL>
            <P>Idéal pour lancer un podcast sans technique et tester ton concept.</P>

            <P>🥈 Option 2 : Acast (plus professionnel)</P>
            <P>Très intéressant si ton objectif est de construire une marque, développer une audience, avoir une vraie présence podcast. Avantages :</P>
            <UL>
              <li>aspect professionnel ;</li>
              <li>bonnes statistiques ;</li>
              <li>outils créateurs.</li>
            </UL>

            <P>🥉 Option 3 : Podbean</P>
            <P>Bon compromis : simple, fiable, adapté aux débutants.</P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="ecosysteme">L&apos;écosystème à construire</H2>
            <P>Je ne dépendrais pas uniquement d&apos;un hébergeur. Je créerais un écosystème :</P>
            <FlowSteps
              steps={[
                "Site internet",
                "Page Podcast dédiée",
                "Hébergement podcast",
                "Spotify / Apple Podcasts / Deezer / Amazon Music / YouTube",
                "Articles SEO",
                "Newsletter",
                "Réseaux sociaux",
              ]}
            />
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="geo-strategie">La stratégie GEO (IA) importante</H2>
            <P>
              Pour être mieux compris par les IA, ne laisse pas ton podcast uniquement sur Spotify.
              Crée une page sur ton site pour chaque épisode. Exemple de titre :
            </P>
            <Quote>Comment un psychologue développe son réseau de prescripteurs ?</Quote>
            <P>Sur la page :</P>
            <UL>
              <li>lecteur audio intégré ;</li>
              <li>résumé de l&apos;épisode ;</li>
              <li>transcription complète ;</li>
              <li>points clés ;</li>
              <li>questions/réponses ;</li>
              <li>présentation de l&apos;invité ;</li>
              <li>liens vers les ressources.</li>
            </UL>
            <P>Cette page devient une véritable source indexable par Google et les IA.</P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="structure-page-episode">Structure idéale d&apos;une page épisode</H2>
            <UL>
              <li>
                <strong>H1</strong> — le titre de l&apos;épisode.
              </li>
              <li>
                <strong>Introduction</strong> — 150-300 mots.
              </li>
              <li>
                <strong>Invité</strong> — nom, métier, expertise, site.
              </li>
              <li>
                <strong>Ce que vous allez apprendre</strong> — 5 à 10 points.
              </li>
              <li>
                <strong>Transcription</strong> — texte complet.
              </li>
              <li>
                <strong>FAQ</strong> — exemple : &quot;Comment développer son cabinet quand on
                débute ?&quot;
              </li>
              <li>
                <strong>Liens</strong> — site invité, réseaux sociaux, prise de rendez-vous.
              </li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="outils-gratuits">Outils gratuits complémentaires</H2>
            <H3>Enregistrement</H3>
            <UL>
              <li>Riverside (version gratuite limitée)</li>
              <li>Zoom</li>
              <li>Google Meet</li>
              <li>OBS Studio</li>
            </UL>
            <H3>Montage</H3>
            <UL>
              <li>Audacity (gratuit)</li>
              <li>CapCut</li>
              <li>Descript (version limitée)</li>
            </UL>
            <H3>Nettoyage audio</H3>
            <UL>
              <li>Adobe Podcast Enhance (gratuit avec limites)</li>
            </UL>
            <H3>Création visuelle</H3>
            <UL>
              <li>Canva (miniatures, couverture)</li>
            </UL>
            <H3>Transcription</H3>
            <UL>
              <li>Whisper (via outils compatibles)</li>
              <li>Notta (version gratuite limitée)</li>
              <li>YouTube automatique si vidéo publiée</li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="choix-final">
              Mon choix pour un thérapeute qui veut construire une autorité long terme
            </H2>
            <H3>Départ (0-6 mois)</H3>
            <UL>
              <li>Spotify for Podcasters</li>
              <li>YouTube</li>
              <li>Site avec pages épisodes</li>
            </UL>
            <H3>Quand l&apos;audience grandit</H3>
            <UL>
              <li>Acast ou hébergeur premium</li>
              <li>newsletter</li>
              <li>communauté</li>
              <li>partenariats invités</li>
            </UL>
            <P>
              Le plus important n&apos;est pas l&apos;hébergeur : c&apos;est de transformer chaque
              épisode en actif SEO + GEO + réseau professionnel. C&apos;est là que le podcast devient
              un véritable levier de développement d&apos;activité.
            </P>
          </section>
        </article>
      </div>
    </div>
  );
}
