import Link from "next/link";

const SECTIONS = [
  { id: "nom-fiche", label: "1. Le nom de la fiche" },
  { id: "nom-utile", label: "2. Quel nom est vraiment utile ?" },
  { id: "description", label: "3. La description parfaite" },
  { id: "erreurs-frequentes", label: "4. Les erreurs les plus fréquentes" },
  { id: "pratiques-efficaces", label: "5. Pratiques efficaces" },
  { id: "concurrents", label: "6. Espionner ses concurrents" },
  { id: "photos", label: "7. Les photos qui donnent envie de cliquer" },
  { id: "avis", label: "8. Récolter des avis rapidement" },
  { id: "avis-negatif", label: "9. Répondre à un avis négatif" },
  { id: "outils", label: "10. Les outils utiles" },
  { id: "difference", label: "Ce qui fait vraiment la différence" },
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

export default function GbpGuidePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      <div>
        <Link href="/aide" className="text-xs font-medium text-blue-700 hover:underline">
          ← Retour à Aide
        </Link>
        <h1 className="mt-2 text-lg font-semibold text-slate-900">
          Optimisation de ma fiche Google
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Le guide Google Business Profile (GBP) pour les thérapeutes.
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
          <section>
            <H2 id="nom-fiche">1. Le nom de la fiche : le plus gros facteur de suspension</H2>
            <H3>✅ Ce que Google autorise</H3>
            <P>Le nom doit correspondre au nom réel utilisé dans le monde réel.</P>
            <P>Exemples :</P>
            <UL>
              <li>Cabinet Équilibre</li>
              <li>Marie Dupont</li>
              <li>Cabinet de Sophrologie Harmonie</li>
              <li>Centre Horizon</li>
            </UL>
            <P>Si ton enseigne officielle est :</P>
            <Quote>Cabinet Horizon</Quote>
            <P>Ta fiche doit s&apos;appeler :</P>
            <Quote>Cabinet Horizon</Quote>

            <H3>❌ Ce qui est interdit</H3>
            <P>Ajouter des mots-clés. Exemples :</P>
            <UL>
              <li>❌ Sophrologue Paris Anxiété</li>
              <li>❌ Meilleur psychologue Lyon</li>
              <li>❌ Cabinet EMDR Burn-out</li>
              <li>❌ Naturopathe Stress Fatigue Paris</li>
            </UL>
            <P>
              Même si beaucoup le font, Google peut modifier automatiquement le nom ou suspendre la
              fiche.
            </P>

            <H3>Peut-on ajouter sa profession ?</H3>
            <P>
              Oui, si elle fait réellement partie du nom de l&apos;entreprise et qu&apos;elle
              apparaît de manière cohérente sur la façade, le site, les documents officiels ou les
              réseaux sociaux.
            </P>
            <P>Exemple :</P>
            <Quote>Cabinet Horizon – Sophrologie</Quote>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="nom-utile">2. Quel nom est vraiment utile ?</H2>
            <P>Le plus mémorisable est souvent :</P>
            <Quote>Nom de marque + activité</Quote>
            <P>Exemples :</P>
            <UL>
              <li>Cabinet Horizon</li>
              <li>Marie Martin Psychologue</li>
              <li>Cabinet Harmonie</li>
              <li>Centre Thérapie Positive</li>
            </UL>
            <P>L&apos;objectif est d&apos;être identifiable, pas de &quot;bourrer&quot; le nom de mots-clés.</P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="description">3. La description parfaite</H2>
            <P>
              La description ne fait pas &quot;monter&quot; directement le classement, mais elle
              aide Google à comprendre ton activité et peut améliorer le taux de clic.
            </P>
            <P>Structure recommandée :</P>

            <H3>Premier paragraphe</H3>
            <P>Qui tu aides.</P>
            <Quote>
              J&apos;accompagne les thérapeutes indépendants dans le développement de leur réseau de
              prescripteurs afin de développer leur activité de manière durable.
            </Quote>

            <H3>Deuxième paragraphe</H3>
            <P>Méthode.</P>
            <Quote>
              J&apos;interviens grâce à une méthode basée sur le développement relationnel, les
              partenariats professionnels et une communication éthique.
            </Quote>

            <H3>Troisième paragraphe</H3>
            <P>Services.</P>
            <UL>
              <li>audit</li>
              <li>accompagnement</li>
              <li>formation</li>
              <li>coaching</li>
              <li>conférences</li>
            </UL>

            <H3>Dernier paragraphe</H3>
            <P>Zone géographique.</P>
            <UL>
              <li>Cabinet</li>
              <li>Visio</li>
            </UL>

            <P>Évite les listes de mots-clés ou les promesses excessives.</P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="erreurs-frequentes">4. Les erreurs les plus fréquentes</H2>
            <UL>
              <li>❌ Nom optimisé artificiellement.</li>
              <li>❌ Acheter des avis.</li>
              <li>❌ Demander uniquement des avis 5 étoiles.</li>
              <li>❌ Ne jamais répondre.</li>
              <li>❌ Catégorie mal choisie.</li>
              <li>❌ Photos de mauvaise qualité.</li>
              <li>❌ Horaires faux.</li>
              <li>❌ Adresse inexacte.</li>
              <li>❌ Fiche abandonnée pendant des mois.</li>
              <li>❌ Utiliser un numéro de téléphone différent de celui du site.</li>
              <li>
                ❌ Informations incohérentes entre le site, les annuaires et la fiche (nom, adresse,
                téléphone).
              </li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="pratiques-efficaces">5. Quelques pratiques efficaces (sans enfreindre les règles)</H2>
            <H3>Publier régulièrement</H3>
            <P>Une publication par semaine est un bon rythme :</P>
            <UL>
              <li>conseils ;</li>
              <li>nouveautés ;</li>
              <li>événements ;</li>
              <li>articles ;</li>
              <li>ateliers.</li>
            </UL>
            <P>Cela montre que la fiche est active.</P>

            <H3>Ajouter des questions/réponses</H3>
            <P>Renseigne les questions fréquentes directement sur la fiche.</P>
            <P>Exemples :</P>
            <UL>
              <li>Travaillez-vous en visio ?</li>
              <li>Prenez-vous de nouveaux clients ?</li>
              <li>Comment prendre rendez-vous ?</li>
            </UL>

            <H3>Remplir tous les champs</H3>
            <P>Très souvent oubliés :</P>
            <UL>
              <li>services ;</li>
              <li>produits (si pertinents) ;</li>
              <li>horaires spéciaux ;</li>
              <li>attributs ;</li>
              <li>zones desservies.</li>
            </UL>
            <P>Une fiche complète est généralement plus performante.</P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="concurrents">6. Espionner ses concurrents</H2>
            <P>Il s&apos;agit plutôt d&apos;analyser leurs pratiques.</P>
            <P>Regarde :</P>
            <UL>
              <li>leur catégorie principale ;</li>
              <li>les catégories secondaires ;</li>
              <li>le nombre d&apos;avis ;</li>
              <li>la fréquence des nouveaux avis ;</li>
              <li>les mots employés dans les avis ;</li>
              <li>les photos publiées ;</li>
              <li>les publications ;</li>
              <li>les questions/réponses ;</li>
              <li>les services renseignés.</li>
            </UL>
            <P>Pose-toi ensuite les questions :</P>
            <UL>
              <li>Que font-ils mieux que moi ?</li>
              <li>Qu&apos;est-ce qui manque ?</li>
              <li>Comment puis-je proposer une information plus claire ou plus utile ?</li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="photos">7. Les photos qui donnent envie de cliquer</H2>
            <P>
              Les thérapeutes publient souvent des photos très similaires (bureau vide, bougie,
              galets...). Pour se démarquer, montre des images qui créent de la confiance.
            </P>

            <H3>Les indispensables</H3>
            <UL>
              <li>Portrait professionnel souriant.</li>
              <li>Photo du cabinet (extérieur).</li>
              <li>Salle de consultation.</li>
              <li>Accueil.</li>
              <li>Parking ou accès.</li>
              <li>Salle d&apos;attente.</li>
              <li>Façade (si elle existe).</li>
            </UL>

            <H3>Les plus performantes</H3>
            <UL>
              <li>Photo en situation d&apos;échange (sans patient identifiable).</li>
              <li>Photo lors d&apos;une conférence ou d&apos;un atelier.</li>
              <li>Séance de groupe (avec autorisation).</li>
              <li>Équipe, si tu n&apos;es pas seul.</li>
              <li>Avant/après d&apos;un aménagement du cabinet (si pertinent).</li>
            </UL>

            <H3>À éviter</H3>
            <UL>
              <li>Images générées par IA qui donnent une impression artificielle.</li>
              <li>Photos très sombres.</li>
              <li>Images floues.</li>
              <li>Trop de banques d&apos;images.</li>
              <li>Texte incrusté partout.</li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="avis">8. Récolter des avis rapidement</H2>
            <P>La meilleure méthode est simple : demander au bon moment.</P>
            <P>Moments propices :</P>
            <UL>
              <li>juste après une séance où la personne exprime sa satisfaction ;</li>
              <li>à la fin d&apos;un accompagnement ;</li>
              <li>après un atelier ou une formation.</li>
            </UL>
            <P>Facilite la démarche :</P>
            <UL>
              <li>un QR code au cabinet ;</li>
              <li>un lien court vers la fiche ;</li>
              <li>un e-mail ou SMS de remerciement avec le lien.</li>
            </UL>
            <P>
              Tu peux aussi suggérer des thèmes sans dicter le contenu, par exemple : ce que la
              personne a apprécié dans l&apos;accompagnement, ce qui l&apos;a aidée ou ce qu&apos;elle
              dirait à quelqu&apos;un qui hésite.
            </P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="avis-negatif">9. Répondre à un avis négatif</H2>
            <P>Objectifs :</P>
            <UL>
              <li>montrer ton professionnalisme ;</li>
              <li>rassurer les futurs lecteurs.</li>
            </UL>
            <P>Structure :</P>
            <UL>
              <li>remercier ;</li>
              <li>reconnaître le ressenti ;</li>
              <li>apporter un contexte si nécessaire (sans révéler d&apos;informations confidentielles) ;</li>
              <li>proposer de poursuivre l&apos;échange en privé.</li>
            </UL>
            <P>Exemple :</P>
            <Quote>
              Merci d&apos;avoir pris le temps de partager votre retour. Je suis désolé que votre
              expérience n&apos;ait pas répondu à vos attentes. Chaque accompagnement est unique et
              je m&apos;efforce d&apos;offrir un suivi adapté à chaque personne. Si vous le
              souhaitez, je serais heureux d&apos;échanger avec vous directement afin de mieux
              comprendre votre situation et voir comment y répondre.
            </Quote>
            <P>À éviter absolument :</P>
            <UL>
              <li>répondre sous le coup de l&apos;émotion ;</li>
              <li>révéler des informations sur la personne ;</li>
              <li>contester agressivement son témoignage.</li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="outils">10. Les outils utiles</H2>
            <P>Sans connaître précisément ceux que tu utilises, voici ceux que je recommande et leur rôle :</P>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                    <th className="py-2 pr-4">Outil</th>
                    <th className="py-2 pr-4">Utilité</th>
                    <th className="py-2">Paramétrage conseillé</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  {[
                    {
                      tool: "Google Business Profile",
                      use: "Gestion de la fiche",
                      setup:
                        "Compléter tous les champs, activer les notifications, mettre à jour les horaires et publier régulièrement.",
                    },
                    {
                      tool: "Google Search Console",
                      use: "Suivi SEO",
                      setup: "Vérifier la propriété, envoyer le sitemap XML, surveiller les erreurs d'indexation.",
                    },
                    {
                      tool: "Google Analytics 4",
                      use: "Analyse des visites",
                      setup:
                        "Configurer les événements importants (prise de contact, clic téléphone, formulaire, réservation).",
                    },
                    {
                      tool: "PageSpeed Insights",
                      use: "Performance",
                      setup: "Corriger les principaux problèmes signalés sur mobile et ordinateur.",
                    },
                    {
                      tool: "Rich Results Test",
                      use: "Données structurées",
                      setup: "Tester chaque page importante après ajout ou modification du balisage Schema.org.",
                    },
                    {
                      tool: "Schema Markup Validator",
                      use: "Validation Schema.org",
                      setup: "Vérifier que les données structurées sont valides et cohérentes.",
                    },
                    {
                      tool: "Screaming Frog SEO Spider",
                      use: "Audit technique",
                      setup: "Contrôler les liens cassés, les balises de titre, les descriptions et les redirections.",
                    },
                  ].map((row) => (
                    <tr key={row.tool} className="border-b border-slate-100 align-top">
                      <td className="py-2 pr-4 font-medium text-slate-900">{row.tool}</td>
                      <td className="py-2 pr-4">{row.use}</td>
                      <td className="py-2">{row.setup}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="difference">Ce qui fait réellement la différence</H2>
            <P>
              Pour un thérapeute, une excellente fiche Google n&apos;est pas seulement celle qui est
              optimisée : c&apos;est celle qui inspire confiance au premier coup d&apos;œil.
            </P>
            <P>
              Avant même de lire les avis, un futur patient doit pouvoir répondre à ces questions :
            </P>
            <UL>
              <li>Qui est ce professionnel ?</li>
              <li>Est-il qualifié ?</li>
              <li>Dans quels cas peut-il m&apos;aider ?</li>
              <li>Comment se déroule une consultation ?</li>
              <li>Où se situe le cabinet ?</li>
              <li>Puis-je lui faire confiance ?</li>
            </UL>
            <P>
              Une fiche complète, cohérente avec le site web, régulièrement mise à jour, illustrée
              par des photos authentiques et alimentée par des avis sincères sera généralement plus
              performante sur le long terme qu&apos;une fiche cherchant à exploiter des
              &quot;hacks&quot; contraires aux règles de Google.
            </P>
          </section>
        </article>
      </div>
    </div>
  );
}
