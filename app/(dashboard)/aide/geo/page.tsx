const SECTIONS = [
  { id: "optimisations-site", label: "1. Optimisations indispensables sur ton site" },
  { id: "donnees-structurees", label: "2. Les données structurées indispensables" },
  { id: "facteurs-positionnement", label: "3. Les facteurs de positionnement dans les IA" },
  { id: "checklist-geo", label: "4. Checklist GEO thérapeutes" },
  { id: "outils", label: "5. Les outils recommandés" },
  { id: "difference", label: "Ce qui fera vraiment la différence" },
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

function H4({ children }: { children: React.ReactNode }) {
  return <h4 className="mt-3 text-sm font-medium text-slate-800">{children}</h4>;
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

function CodeList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1">
      {items.map((item) => (
        <li key={item}>
          <code className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">{item}</code>
        </li>
      ))}
    </ul>
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

export default function GeoGuidePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">
          Optimisation référencement GEO
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          GEO (Generative Engine Optimization) : comment devenir une référence pour les IA
          (ChatGPT, Gemini, Claude, Perplexity...) sur votre spécialité.
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
            Aujourd&apos;hui, les IA ne se contentent plus d&apos;indexer des pages : elles évaluent
            la qualité de l&apos;information, sa cohérence, son niveau d&apos;autorité et sa
            capacité à répondre à une intention. Voici une démarche structurée autour de 5 piliers.
          </P>

          <section>
            <H2 id="optimisations-site">1. Les optimisations indispensables sur ton site</H2>

            <H3>A. Clarifier immédiatement ton expertise</H3>
            <P>En moins de 5 secondes, une IA (et un visiteur) doit comprendre :</P>
            <UL>
              <li>Qui es-tu ?</li>
              <li>Qui aides-tu ?</li>
              <li>Quel problème résous-tu ?</li>
              <li>Quelle est ta méthode ?</li>
              <li>Quel résultat recherches-tu ?</li>
            </UL>
            <P>Par exemple :</P>
            <Quote>
              J&apos;aide les thérapeutes à développer un réseau de prescripteurs grâce à une
              méthode de développement relationnel éthique.
            </Quote>
            <P>
              Évite les formulations vagues comme &quot;révéler votre potentiel&quot; ou
              &quot;accompagner votre réussite&quot;.
            </P>

            <H3>B. Créer une architecture &quot;par intention&quot;</H3>
            <P>
              Au lieu de présenter uniquement tes prestations, organise ton site selon les questions
              que se posent tes prospects. Exemples :
            </P>
            <CodeList
              items={[
                "/reseau-prescripteurs-psychologue",
                "/reseau-prescripteurs-naturopathe",
                "/reseau-prescripteurs-sophrologue",
                "/reseau-prescripteurs-reflexologue",
                "/reseau-prescripteurs-coach",
                "/reseau-prescripteurs-osteopathe",
              ]}
            />
            <P>Chaque page cible une profession et ses enjeux spécifiques.</P>

            <H3>C. Ajouter des pages comparatives</H3>
            <P>Les IA apprécient les contenus qui aident à choisir. Exemples :</P>
            <UL>
              <li>Réseau de prescripteurs ou publicité ?</li>
              <li>Google Ads ou bouche-à-oreille ?</li>
              <li>Instagram ou réseau professionnel ?</li>
              <li>LinkedIn est-il utile pour un thérapeute ?</li>
              <li>Réseau local ou référencement Google ?</li>
            </UL>

            <H3>D. Ajouter une FAQ très riche</H3>
            <P>Une bonne FAQ comprend souvent entre 30 et 100 questions. Exemples :</P>
            <UL>
              <li>Comment trouver ses premiers prescripteurs ?</li>
              <li>Comment contacter un médecin ?</li>
              <li>Comment présenter son activité ?</li>
              <li>Les pharmaciens recommandent-ils des thérapeutes ?</li>
              <li>Peut-on demander des recommandations ?</li>
              <li>Quelle différence entre prescription médicale et recommandation ?</li>
            </UL>

            <H3>E. Ajouter des études de cas</H3>
            <P>Les IA aiment les situations concrètes. Exemple :</P>
            <FlowSteps
              steps={[
                "Sophrologue",
                "6 mois d'installation",
                "0 prescripteur",
                "Méthode appliquée",
                "25 partenaires rencontrés",
                "12 recommandations régulières",
              ]}
            />
            <P>L&apos;anonymisation est essentielle.</P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="donnees-structurees">2. Les données structurées indispensables</H2>
            <P>À minima :</P>
            <UL>
              <li>✅ Person</li>
              <li>✅ Organization</li>
              <li>✅ Service</li>
              <li>✅ FAQ</li>
              <li>✅ Article</li>
              <li>✅ Breadcrumb</li>
            </UL>
            <P>Je recommande aussi :</P>
            <UL>
              <li>WebSite</li>
              <li>WebPage</li>
              <li>ImageObject</li>
              <li>VideoObject</li>
              <li>BlogPosting</li>
              <li>Event</li>
              <li>Course</li>
              <li>Offer</li>
              <li>Review</li>
              <li>LocalBusiness (si tu reçois en cabinet)</li>
              <li>ContactPoint</li>
              <li>SearchAction (pour le moteur de recherche interne, si tu en as un)</li>
            </UL>
            <P>
              Pour chaque service, utilise un balisage Service distinct décrivant l&apos;objectif,
              le public, les modalités et les informations pratiques.
            </P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="facteurs-positionnement">3. Les facteurs de positionnement dans les IA</H2>
            <P>
              Contrairement à Google, il n&apos;existe pas de liste officielle. En pratique,
              plusieurs facteurs semblent favoriser la visibilité.
            </P>

            <H3>Identité</H3>
            <UL>
              <li>Positionnement clair.</li>
              <li>Cohérence du vocabulaire.</li>
              <li>Même titre partout.</li>
              <li>Même biographie sur les principaux profils.</li>
            </UL>

            <H3>Autorité</H3>
            <UL>
              <li>Site ancien (sans être une condition indispensable).</li>
              <li>Qualité du contenu.</li>
              <li>Citations par d&apos;autres sites.</li>
              <li>Interviews.</li>
              <li>Podcasts.</li>
              <li>Livres.</li>
              <li>Conférences.</li>
              <li>Articles invités.</li>
              <li>Présence dans des annuaires professionnels reconnus.</li>
            </UL>

            <H3>Expertise</H3>
            <UL>
              <li>Contenus approfondis.</li>
              <li>Réponses précises.</li>
              <li>Cas réels.</li>
              <li>Explications pédagogiques.</li>
              <li>Définitions claires.</li>
              <li>Comparatifs.</li>
              <li>FAQ détaillées.</li>
            </UL>

            <H3>Technique</H3>
            <UL>
              <li>Site rapide.</li>
              <li>Mobile.</li>
              <li>HTTPS.</li>
              <li>Bon maillage interne.</li>
              <li>Sitemap XML.</li>
              <li>Robots.txt correctement configuré.</li>
              <li>Données structurées Schema.org.</li>
              <li>Titres et métadonnées cohérents.</li>
              <li>Images avec texte alternatif pertinent.</li>
            </UL>

            <H3>Confiance</H3>
            <P>
              Pour les sujets liés à la santé, les IA accordent une attention particulière à la
              fiabilité.
            </P>
            <UL>
              <li>Diplômes.</li>
              <li>Expérience.</li>
              <li>Certifications.</li>
              <li>Mentions légales.</li>
              <li>Politique de confidentialité.</li>
              <li>Coordonnées complètes.</li>
              <li>Témoignages authentiques.</li>
              <li>Présentation des limites de tes accompagnements.</li>
              <li>Sources fiables lorsque tu abordes des sujets de santé.</li>
            </UL>

            <H3>Compréhension</H3>
            <P>Chaque page doit répondre à une seule question principale. Par exemple :</P>
            <Quote>Comment développer un réseau de prescripteurs lorsqu&apos;on est naturopathe ?</Quote>
            <P>Toute la page développe cette réponse.</P>

            <H3>Entités</H3>
            <P>Les IA fonctionnent avec des relations entre concepts. Créer des liens explicites entre :</P>
            <FlowSteps
              steps={["Profession", "Patient idéal", "Problème", "Méthode", "Résultat", "Outils", "Prescripteurs"]}
            />
            <P>Par exemple :</P>
            <FlowSteps
              steps={["Naturopathe", "Fatigue chronique", "Médecins généralistes", "Pharmaciens", "Ostéopathes"]}
            />
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="checklist-geo">4. Checklist GEO spécifique aux thérapeutes</H2>

            <H4>Positionnement</H4>
            <UL>
              <li>Une seule spécialité clairement affichée.</li>
              <li>Une seule promesse principale.</li>
              <li>Public cible identifié.</li>
              <li>Méthode expliquée.</li>
              <li>Valeurs explicites.</li>
            </UL>

            <H4>Site</H4>
            <UL>
              <li>Une page par profession accompagnée.</li>
              <li>Une page par problématique.</li>
              <li>Une page par service.</li>
              <li>Une page FAQ.</li>
              <li>Une page &quot;À propos&quot; détaillée.</li>
              <li>Une page &quot;Méthode&quot;.</li>
              <li>Une page &quot;Ressources&quot;.</li>
              <li>Des liens internes pertinents entre ces pages.</li>
            </UL>

            <H4>Contenus</H4>
            <UL>
              <li>Guides complets.</li>
              <li>Comparatifs.</li>
              <li>Cas pratiques.</li>
              <li>Glossaire.</li>
              <li>Définitions.</li>
              <li>Interviews.</li>
              <li>Podcasts.</li>
              <li>Vidéos.</li>
              <li>Témoignages.</li>
              <li>Études de cas.</li>
            </UL>

            <H4>Autorité</H4>
            <UL>
              <li>Profil LinkedIn complet.</li>
              <li>Google Business Profile (si pertinent).</li>
              <li>Interventions.</li>
              <li>Presse.</li>
              <li>Podcasts.</li>
              <li>Livres blancs.</li>
              <li>Newsletter.</li>
              <li>Citations sur d&apos;autres sites.</li>
            </UL>

            <H4>Crédibilité</H4>
            <UL>
              <li>Diplômes affichés.</li>
              <li>Expérience.</li>
              <li>Certifications.</li>
              <li>Méthodologie.</li>
              <li>Limites de l&apos;accompagnement.</li>
              <li>Sources fiables lorsque nécessaire.</li>
              <li>Dates de mise à jour des contenus.</li>
            </UL>

            <H4>Technique</H4>
            <UL>
              <li>Sitemap.</li>
              <li>HTTPS.</li>
              <li>Performance.</li>
              <li>Schema.org.</li>
              <li>Fil d&apos;Ariane.</li>
              <li>Images optimisées.</li>
              <li>Accessibilité.</li>
              <li>URLs courtes et explicites.</li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="outils">5. Les outils que je recommande</H2>

            <H3>Pour le SEO et la technique</H3>
            <UL>
              <li>
                <strong>Google Search Console</strong> : indispensable pour suivre les performances
                dans Google.
              </li>
              <li>
                <strong>Google Analytics 4</strong> : analyser les comportements des visiteurs.
              </li>
              <li>
                <strong>Screaming Frog SEO Spider</strong> : auditer la structure du site, les liens
                et les métadonnées.
              </li>
              <li>
                <strong>Schema Markup Validator</strong> : vérifier le balisage Schema.org.
              </li>
              <li>
                <strong>Rich Results Test</strong> : tester les données structurées reconnues par
                Google.
              </li>
              <li>
                <strong>PageSpeed Insights</strong> : mesurer les performances et les Core Web
                Vitals.
              </li>
            </UL>

            <H3>Pour la recherche de contenu</H3>
            <UL>
              <li>
                <strong>Google Trends</strong> : identifier les sujets recherchés.
              </li>
              <li>
                <strong>AnswerThePublic</strong> ou <strong>AlsoAsked</strong> : découvrir les
                questions que se posent les internautes.
              </li>
              <li>
                <strong>Semrush</strong> ou <strong>Ahrefs</strong> : recherche de mots-clés, analyse
                concurrentielle et opportunités éditoriales.
              </li>
            </UL>

            <H3>Pour le GEO</H3>
            <P>
              Le GEO est encore émergent, il n&apos;existe donc pas d&apos;outil universel. En
              revanche, tu peux mettre en place un processus :
            </P>
            <UL>
              <li>
                Tester régulièrement des requêtes sur plusieurs IA (ChatGPT, Gemini, Claude,
                Perplexity, Copilot, Mistral) pour voir quelles sources elles mobilisent.
              </li>
              <li>
                Vérifier que tes contenus sont facilement explorables (pas de blocage inutile dans
                le fichier robots.txt, pages accessibles, structure claire).
              </li>
              <li>
                Suivre les mentions de ton nom ou de ta marque avec des outils de veille comme
                Google Alerts ou Mention.
              </li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="difference">Ce qui fera vraiment la différence</H2>
            <P>
              Le plus gros levier n&apos;est pas simplement d&apos;ajouter des données structurées
              ou d&apos;améliorer le SEO. C&apos;est de construire la base de connaissances la plus
              complète sur le développement d&apos;un réseau de prescripteurs pour les thérapeutes.
            </P>
            <P>Si ton site devient la référence qui explique :</P>
            <UL>
              <li>quels prescripteurs cibler selon chaque profession ;</li>
              <li>comment les approcher ;</li>
              <li>quelles erreurs éviter ;</li>
              <li>quels scripts utiliser ;</li>
              <li>quels indicateurs suivre ;</li>
              <li>
                comment adapter la stratégie selon le métier (psychologue, naturopathe, sophrologue,
                réflexologue, etc.) ;
              </li>
            </UL>
            <P>
              alors tu crées une ressource unique. Les IA recherchent justement ce type de contenus
              riches, cohérents et spécialisés pour répondre aux questions des utilisateurs.
              C&apos;est une stratégie beaucoup plus durable qu&apos;une simple optimisation
              technique.
            </P>
          </section>
        </article>
      </div>
    </div>
  );
}
