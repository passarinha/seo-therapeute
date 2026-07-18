const SECTIONS = [
  { id: "positionnement", label: "1. Le positionnement YouTube" },
  { id: "piliers-contenu", label: "2. Créer des piliers de contenu" },
  { id: "mots-cles", label: "3. Recherche de mots-clés YouTube" },
  { id: "optimiser-video", label: "4. Optimiser chaque vidéo" },
  { id: "signaux", label: "5. Les signaux que YouTube regarde" },
  { id: "structure-video", label: "6. Structure idéale d'une vidéo" },
  { id: "formats", label: "7. Les formats qui marchent" },
  { id: "geo-youtube", label: "8. Optimisation pour les IA (GEO)" },
  { id: "erreurs", label: "9. Les erreurs à éviter" },
  { id: "outils", label: "10. Outils recommandés" },
  { id: "checklist", label: "Checklist YouTube SEO" },
  { id: "strategie", label: "La stratégie la plus efficace" },
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

function Compare({
  badLabel = "Faible",
  bad,
  goodLabel = "Fort",
  good,
}: {
  badLabel?: string;
  bad: string;
  goodLabel?: string;
  good: string;
}) {
  return (
    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
      <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
        <span className="font-medium">❌ {badLabel} : </span>
        {bad}
      </p>
      <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
        <span className="font-medium">✅ {goodLabel} : </span>
        {good}
      </p>
    </div>
  );
}

export default function YoutubeGuidePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">SEO YouTube</h1>
        <p className="mt-1 text-sm text-slate-500">
          YouTube est le 2ᵉ moteur de recherche mondial, une source de confiance forte, et une
          source que les IA utilisent pour comprendre votre expertise.
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
            L&apos;objectif n&apos;est pas seulement d&apos;avoir des vues : c&apos;est de faire
            comprendre à YouTube et aux IA :
          </P>
          <Quote>
            &quot;Cette personne est une référence sur ce sujet précis pour ce public précis.&quot;
          </Quote>

          <section>
            <H2 id="positionnement">1. Le positionnement YouTube : l&apos;erreur numéro 1 des thérapeutes</H2>
            <P>La majorité des thérapeutes font :</P>
            <Quote>❌ &quot;Je parle de bien-être, de développement personnel et d&apos;émotions.&quot; — Trop large.</Quote>
            <P>Il faut créer une association forte :</P>
            <Quote>&quot;Cette chaîne aide [type de personne] à résoudre [problème] grâce à [approche].&quot;</Quote>
            <P>Exemples :</P>
            <UL>
              <li>
                <strong>Psychologue</strong> — J&apos;aide les personnes anxieuses à comprendre et
                réduire leur anxiété.
              </li>
              <li>
                <strong>Naturopathe</strong> — J&apos;aide les femmes actives à retrouver leur
                énergie grâce à l&apos;hygiène de vie naturelle.
              </li>
              <li>
                <strong>Coach</strong> — J&apos;aide les thérapeutes indépendants à développer leur
                cabinet sans publicité.
              </li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="piliers-contenu">2. Créer des &quot;piliers de contenu&quot;</H2>
            <P>
              YouTube comprend mieux une chaîne spécialisée qu&apos;une chaîne généraliste. Je
              recommande 5 piliers.
            </P>

            <H3>Pilier 1 : Les problèmes du patient</H3>
            <P>Objectif : capter les recherches. Exemples :</P>
            <UL>
              <li>Pourquoi je suis toujours anxieux ?</li>
              <li>Comment sortir d&apos;un burn-out ?</li>
              <li>Pourquoi je manque de confiance en moi ?</li>
              <li>Comment arrêter de trop penser ?</li>
            </UL>

            <H3>Pilier 2 : Les explications pédagogiques</H3>
            <P>Objectif : devenir une référence. Exemples :</P>
            <UL>
              <li>Qu&apos;est-ce que l&apos;EMDR ?</li>
              <li>Comment fonctionne l&apos;hypnose ?</li>
              <li>Quelle différence entre TCC et psychanalyse ?</li>
              <li>Pourquoi la respiration calme le stress ?</li>
            </UL>

            <H3>Pilier 3 : Les objections</H3>
            <P>Très puissant pour convertir. Exemples :</P>
            <UL>
              <li>Est-ce que consulter un psy veut dire que je suis faible ?</li>
              <li>Combien coûte une thérapie ?</li>
              <li>Combien de séances faut-il ?</li>
              <li>Est-ce que l&apos;EMDR fonctionne vraiment ?</li>
            </UL>

            <H3>Pilier 4 : La preuve d&apos;expertise</H3>
            <UL>
              <li>Mon approche thérapeutique expliquée.</li>
              <li>Les erreurs fréquentes de mes patients.</li>
              <li>Ce que j&apos;aurais aimé savoir avant de devenir thérapeute.</li>
              <li>Les questions qu&apos;on me pose chaque semaine.</li>
            </UL>

            <H3>Pilier 5 : La confiance</H3>
            <P>Le futur patient veut connaître la personne. Exemples :</P>
            <UL>
              <li>Pourquoi j&apos;ai choisi ce métier.</li>
              <li>Ma vision de la thérapie.</li>
              <li>Comment se passe une première séance.</li>
              <li>Ce qui est important pour moi dans l&apos;accompagnement.</li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="mots-cles">3. Recherche de mots-clés YouTube</H2>
            <P>Ne pars pas de ce que tu veux dire. Pars de ce que les gens recherchent.</P>
            <P>Outils :</P>
            <UL>
              <li>
                <strong>Gratuits</strong> — barre de recherche YouTube (suggestions automatiques),
                Google Trends, AnswerThePublic.
              </li>
              <li>
                <strong>Payants</strong> — VidIQ, TubeBuddy, Ahrefs, Semrush.
              </li>
            </UL>
            <P>Exemple : tu tapes &quot;anxiété&quot;, YouTube propose :</P>
            <UL>
              <li>anxiété comment la calmer</li>
              <li>anxiété symptômes</li>
              <li>anxiété au réveil</li>
              <li>anxiété sociale</li>
              <li>anxiété et sommeil</li>
            </UL>
            <P>Ce sont des sujets validés par la demande.</P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="optimiser-video">4. Optimiser chaque vidéo</H2>

            <H3>Le titre</H3>
            <P>Le titre doit contenir : le problème, la promesse, le mot-clé.</P>
            <Compare
              bad="Quelques conseils sur l'anxiété"
              good="5 techniques pour calmer une crise d'anxiété rapidement"
            />

            <H3>La miniature</H3>
            <P>Elle influence énormément le clic. Règles :</P>
            <UL>
              <li>1 idée seulement.</li>
              <li>Peu de texte (3-5 mots).</li>
              <li>Visage humain.</li>
              <li>Expression émotionnelle.</li>
              <li>Contraste fort.</li>
            </UL>
            <Compare
              bad="Les mécanismes psychologiques de l'anxiété"
              good="Pourquoi ton cerveau panique ?"
              badLabel="Éviter"
              goodLabel="Préférer"
            />

            <H3>Description YouTube</H3>
            <P>Les 200 premiers caractères sont essentiels. Structure :</P>
            <P>Ligne 1 : la réponse principale.</P>
            <Quote>
              Découvrez pourquoi votre cerveau déclenche de l&apos;anxiété et comment retrouver plus
              de calme.
            </Quote>
            <P>Puis : résumé, liens, prise de rendez-vous, site, réseaux.</P>

            <H3>Chapitres vidéo</H3>
            <P>Très important. Exemple :</P>
            <UL>
              <li>00:00 Introduction</li>
              <li>01:20 Pourquoi l&apos;anxiété apparaît</li>
              <li>04:30 Les erreurs fréquentes</li>
              <li>08:00 Les solutions</li>
              <li>12:00 Quand consulter</li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="signaux">5. Les signaux que YouTube regarde</H2>

            <H3>CTR (taux de clic)</H3>
            <P>Est-ce que les gens cliquent ? Amélioration : meilleurs titres, meilleures miniatures.</P>

            <H3>Temps de visionnage</H3>
            <P>
              Les gens restent-ils ? Amélioration : commencer directement par le problème, éviter les
              longues introductions.
            </P>
            <Compare
              badLabel="Mauvais"
              bad="Bonjour, bienvenue sur ma chaîne..."
              goodLabel="Bon"
              good="Si vous vous réveillez avec une boule au ventre chaque matin, cette vidéo est pour vous."
            />

            <H3>Engagement</H3>
            <P>Commentaires, likes, partages, abonnements.</P>

            <H3>Satisfaction</H3>
            <P>YouTube regarde aussi ce que les utilisateurs font après.</P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="structure-video">6. Structure idéale d&apos;une vidéo thérapeute</H2>
            <P>Durée recommandée : 8 à 20 minutes.</P>

            <H3>0-30 secondes : le hook</H3>
            <Quote>
              &quot;Si vous avez l&apos;impression de réfléchir constamment et de ne jamais réussir à
              arrêter votre mental, voici pourquoi.&quot;
            </Quote>

            <H3>30 secondes - 2 minutes</H3>
            <P>Explique : pourquoi le problème existe, pourquoi les conseils habituels échouent.</P>

            <H3>Partie centrale</H3>
            <P>Donne : explications, outils, exemples.</P>

            <H3>Fin</H3>
            <P>Appel à l&apos;action. Pas seulement :</P>
            <Quote>&quot;Abonnez-vous.&quot;</Quote>
            <P>Mais :</P>
            <Quote>
              &quot;Si vous vivez cette difficulté, vous pouvez retrouver plus d&apos;informations sur
              mon site.&quot;
            </Quote>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="formats">7. Les formats qui marchent très bien pour les thérapeutes</H2>

            <H3>Vidéos longues</H3>
            <P>Pour l&apos;autorité : 10-20 minutes.</P>

            <H3>Shorts</H3>
            <P>Pour la visibilité : 30-60 secondes. Exemples :</P>
            <UL>
              <li>&quot;3 signes que votre stress devient chronique.&quot;</li>
              <li>&quot;Une phrase qui aide en cas d&apos;anxiété.&quot;</li>
              <li>&quot;L&apos;erreur que font beaucoup de personnes anxieuses.&quot;</li>
            </UL>

            <H3>FAQ vidéo</H3>
            <P>Excellent pour le référencement. Exemples :</P>
            <UL>
              <li>&quot;Comment choisir son thérapeute ?&quot;</li>
              <li>&quot;Combien coûte une séance ?&quot;</li>
              <li>&quot;Est-ce que l&apos;hypnose fonctionne ?&quot;</li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="geo-youtube">8. Optimisation pour les IA (GEO YouTube)</H2>
            <P>Pour être repris par les IA, dans chaque vidéo, dire clairement :</P>
            <UL>
              <li>ton nom ;</li>
              <li>ton métier ;</li>
              <li>ta spécialité ;</li>
              <li>ta localisation si pertinent.</li>
            </UL>
            <Quote>
              &quot;Je suis Marie Dupont, psychologue spécialisée dans l&apos;accompagnement de
              l&apos;anxiété chez les adultes.&quot;
            </Quote>

            <H3>Description</H3>
            <P>Ajouter : biographie, expertise, domaines d&apos;intervention.</P>

            <H3>Transcription</H3>
            <P>Très important. YouTube génère une transcription. Donc :</P>
            <UL>
              <li>parle clairement ;</li>
              <li>utilise les mots importants naturellement ;</li>
              <li>réponds aux questions.</li>
            </UL>

            <H3>Créer des playlists thématiques</H3>
            <P>Exemple : playlist &quot;Comprendre l&apos;anxiété&quot;, avec les vidéos :</P>
            <UL>
              <li>symptômes ;</li>
              <li>causes ;</li>
              <li>solutions ;</li>
              <li>thérapie ;</li>
              <li>exercices.</li>
            </UL>
            <P>Cela crée une structure compréhensible.</P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="erreurs">9. Les erreurs à éviter</H2>
            <UL>
              <li>❌ Faire uniquement des vidéos de présentation.</li>
              <li>❌ Copier des tendances sans rapport avec ton expertise.</li>
              <li>❌ Parler de 20 sujets différents.</li>
              <li>❌ Mettre des titres trop vagues.</li>
              <li>❌ Faire des intros longues.</li>
              <li>❌ Acheter des vues.</li>
              <li>❌ Utiliser des mots-clés artificiellement.</li>
              <li>❌ Faire des promesses médicales.</li>
              <li>❌ Négliger les miniatures.</li>
              <li>❌ Ne jamais répondre aux commentaires.</li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="outils">10. Outils recommandés</H2>

            <H3>Recherche</H3>
            <UL>
              <li>
                <strong>VidIQ</strong> → analyse mots-clés YouTube.
              </li>
              <li>
                <strong>TubeBuddy</strong> → optimisation titres/tags.
              </li>
              <li>
                <strong>Google Trends</strong> → tendances.
              </li>
              <li>
                <strong>AnswerThePublic</strong> → questions.
              </li>
            </UL>

            <H3>Création</H3>
            <UL>
              <li>
                <strong>Canva</strong> → miniatures.
              </li>
              <li>
                <strong>CapCut</strong> → montage rapide.
              </li>
              <li>
                <strong>Descript</strong> → transcription et montage par texte.
              </li>
            </UL>

            <H3>Analyse</H3>
            <P>
              <strong>YouTube Studio</strong> (indispensable) : CTR, durée moyenne, sources de
              trafic, recherches utilisées.
            </P>

            <H3>SEO global</H3>
            <UL>
              <li>Google Search Console.</li>
              <li>Ahrefs / Semrush.</li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="checklist">Checklist YouTube SEO thérapeute</H2>
            <P>Avant publication :</P>
            <UL>
              <li>✅ Sujet recherché par les patients</li>
              <li>✅ Mot-clé principal identifié</li>
              <li>✅ Titre orienté problème</li>
              <li>✅ Miniature claire</li>
              <li>✅ Hook dans les 30 premières secondes</li>
              <li>✅ Description optimisée</li>
              <li>✅ Chapitres ajoutés</li>
              <li>✅ Sous-titres vérifiés</li>
              <li>✅ Playlist associée</li>
              <li>✅ Lien vers prise de rendez-vous</li>
              <li>✅ Appel à l&apos;action clair</li>
              <li>✅ Réponse aux commentaires prévue</li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="strategie">La stratégie la plus efficace pour un thérapeute aujourd&apos;hui</H2>
            <P>Je privilégierais :</P>
            <Quote>1 vidéo longue/semaine + 3 à 5 Shorts/semaine, pendant 6 mois.</Quote>
            <P>Avec une ligne éditoriale très claire :</P>
            <Quote>
              répondre aux 100 questions que tes futurs patients tapent dans Google et YouTube.
            </Quote>
            <P>C&apos;est cette bibliothèque de contenus qui construit progressivement :</P>
            <UL>
              <li>visibilité YouTube ;</li>
              <li>confiance ;</li>
              <li>référencement Google ;</li>
              <li>reconnaissance par les IA.</li>
            </UL>
          </section>
        </article>
      </div>
    </div>
  );
}
