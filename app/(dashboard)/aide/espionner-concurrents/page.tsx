const SECTIONS = [
  { id: "outils", label: "Les outils gratuits de veille" },
  { id: "google-ads", label: "1. Google Ads : les publicités concurrentes" },
  { id: "meta-ads", label: "2. Facebook et Instagram" },
  { id: "linkedin-ads", label: "3. LinkedIn : publicités professionnelles" },
  { id: "tiktok", label: "4. TikTok : contenus et tendances" },
  { id: "youtube", label: "5. YouTube : stratégies de contenu" },
  { id: "google-maps", label: "6. Google Maps : concurrents locaux" },
  { id: "recherche-google", label: "7. Recherche Google classique" },
  { id: "google-trends", label: "8. Google Trends" },
  { id: "answerthepublic", label: "9. AnswerThePublic" },
  { id: "tableau-analyse", label: "10. Méthode d'analyse concurrentielle" },
  { id: "signaux-forts", label: "11. Les signaux forts à surveiller" },
  { id: "checklist", label: "12. Checklist mensuelle de veille" },
  { id: "stack", label: "Le stack gratuit idéal" },
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

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-blue-700 underline"
    >
      {children}
    </a>
  );
}

function ToolLink({ name, href, description }: { name: string; href: string; description: string }) {
  return (
    <li className="flex flex-col gap-0.5">
      <ExternalLink href={href}>{name}</ExternalLink>
      <span className="text-xs text-slate-500">{description}</span>
    </li>
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

export default function EspionnerConcurrentsGuidePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">Espionner ses concurrents</h1>
        <p className="mt-1 text-sm text-slate-500">
          Guide pour espionner gratuitement les publicités et contenus des thérapeutes concurrents.
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
            L&apos;objectif est d&apos;analyser ce que font les autres professionnels pour
            comprendre :
          </P>
          <UL>
            <li>leurs messages marketing ;</li>
            <li>leurs offres ;</li>
            <li>leurs angles d&apos;acquisition ;</li>
            <li>leurs contenus ;</li>
            <li>leurs tunnels de conversion ;</li>
            <li>leurs positionnements.</li>
          </UL>
          <P>L&apos;objectif n&apos;est pas de copier, mais de comprendre ce qui attire l&apos;attention du marché.</P>

          <section>
            <H2 id="outils">Les outils gratuits de veille</H2>
            <ul className="mt-3 space-y-3">
              <ToolLink
                name="Google Ads Transparency Center"
                href="https://adstransparency.google.com/"
                description="Voir les publicités Google actives d'un annonceur (Search, Display, YouTube)."
              />
              <ToolLink
                name="Meta Ad Library"
                href="https://www.facebook.com/ads/library/"
                description="Voir les publicités actives sur Facebook, Instagram, Messenger et Audience Network."
              />
              <ToolLink
                name="LinkedIn Ad Library"
                href="https://www.linkedin.com/ad-library/"
                description="Voir les publicités actives sur LinkedIn."
              />
              <ToolLink
                name="TikTok Creative Center"
                href="https://ads.tiktok.com/business/creativecenter/"
                description="Tendances vidéos, formats et hooks qui fonctionnent sur TikTok."
              />
              <ToolLink
                name="Google Trends"
                href="https://trends.google.com/trends/"
                description="Comparer l'intérêt de recherche entre plusieurs sujets dans le temps."
              />
              <ToolLink
                name="AnswerThePublic"
                href="https://answerthepublic.com/"
                description="Voir les questions posées par les internautes autour d'un mot-clé."
              />
              <ToolLink
                name="Google Maps"
                href="https://www.google.com/maps"
                description="Analyser les fiches et avis des cabinets concurrents locaux."
              />
              <ToolLink
                name="Google Alerts"
                href="https://www.google.com/alerts"
                description="Recevoir une alerte dès qu'un concurrent ou un sujet est mentionné sur le web."
              />
            </ul>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="google-ads">1. Google Ads : voir les publicités des concurrents</H2>
            <P>
              ⭐ <ExternalLink href="https://adstransparency.google.com/">Google Ads Transparency Center</ExternalLink> (gratuit) permet de rechercher un annonceur et voir ses publicités actives.
            </P>
            <P>Tu peux observer :</P>
            <UL>
              <li>annonces Google Search ;</li>
              <li>annonces Display ;</li>
              <li>annonces YouTube ;</li>
              <li>dates de diffusion ;</li>
              <li>pays ciblés ;</li>
              <li>variantes d&apos;annonces.</li>
            </UL>

            <H3>Comment l&apos;utiliser pour un thérapeute</H3>
            <P>Recherche : nom du cabinet, nom du thérapeute, site internet, marque. Puis note :</P>
            <Table
              head={["Élément", "Analyse"]}
              rows={[
                ["Titre", "Quelle promesse attire ?"],
                ["Description", "Quels arguments reviennent ?"],
                ["Mots utilisés", "Quel vocabulaire utilise le marché ?"],
                ["Appel à l'action", "RDV, appel gratuit, bilan ?"],
                ["Page d'arrivée", "Quelle expérience proposée ?"],
              ]}
            />
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="meta-ads">2. Facebook et Instagram : voir les publicités concurrentes</H2>
            <P>
              ⭐ <ExternalLink href="https://www.facebook.com/ads/library/">Meta Ads Library</ExternalLink> (gratuit) permet de voir les publicités diffusées sur Facebook, Instagram, Messenger et Audience Network.
            </P>

            <H3>Recherches utiles</H3>
            <P>Par métier :</P>
            <UL>
              <li>psychologue</li>
              <li>naturopathe</li>
              <li>sophrologue</li>
              <li>hypnothérapeute</li>
              <li>coach bien-être</li>
              <li>thérapeute</li>
              <li>développement personnel</li>
            </UL>
            <P>Par problématique :</P>
            <UL>
              <li>anxiété</li>
              <li>stress</li>
              <li>burn-out</li>
              <li>sommeil</li>
              <li>confiance en soi</li>
              <li>couple</li>
              <li>traumatisme</li>
            </UL>

            <H3>Ce qu&apos;il faut analyser</H3>
            <P>Le visuel. Questions :</P>
            <UL>
              <li>Est-ce un visage humain ?</li>
              <li>Une photo du cabinet ?</li>
              <li>Une citation ?</li>
              <li>Une vidéo ?</li>
              <li>Un avant/après ?</li>
            </UL>
            <P>Le texte. Identifier : la douleur utilisée, la promesse, la cible, l&apos;appel à l&apos;action.</P>
            <P>Exemple de publicité :</P>
            <Quote>&quot;Vous êtes épuisé(e) malgré vos nuits de sommeil ?&quot;</Quote>
            <P>Analyse :</P>
            <UL>
              <li>Cible : fatigue chronique.</li>
              <li>Douleur : épuisement.</li>
              <li>Angle : incompréhension du problème.</li>
              <li>Promesse : retrouver de l&apos;énergie.</li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="linkedin-ads">3. LinkedIn : analyser les publicités professionnelles</H2>
            <P>
              ⭐ <ExternalLink href="https://www.linkedin.com/ad-library/">LinkedIn Ads Library</ExternalLink> (gratuit). Pertinent pour :
            </P>
            <UL>
              <li>thérapeutes en entreprise ;</li>
              <li>coachs ;</li>
              <li>QVT ;</li>
              <li>prévention santé ;</li>
              <li>formations.</li>
            </UL>
            <P>À observer : messages destinés aux entreprises, vocabulaire RH, offres B2B, formats utilisés.</P>
            <P>Exemples d&apos;angles :</P>
            <UL>
              <li>prévention du burn-out ;</li>
              <li>qualité de vie au travail ;</li>
              <li>gestion du stress des équipes.</li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="tiktok">4. TikTok : analyser les contenus publicitaires et tendances</H2>
            <P>
              ⭐ <ExternalLink href="https://ads.tiktok.com/business/creativecenter/">TikTok Creative Center</ExternalLink> (gratuit) permet d&apos;observer : tendances vidéos, formats, hooks, styles créatifs.
            </P>
            <P>Pour un thérapeute, analyse surtout les 3 premières secondes. C&apos;est le facteur clé. Exemples :</P>
            <UL>
              <li>&quot;Si vous faites ça quand vous êtes stressé...&quot;</li>
              <li>&quot;Personne ne vous explique pourquoi...&quot;</li>
              <li>&quot;Voici pourquoi vous n&apos;arrivez pas à...&quot;</li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="youtube">5. YouTube : espionner les stratégies de contenu</H2>
            <P>YouTube est souvent plus intéressant que les publicités pour les thérapeutes.</P>
            <H3>Méthode gratuite</H3>
            <P>Recherche :</P>
            <UL>
              <li>&quot;psychologue anxiété&quot;</li>
              <li>&quot;naturopathe fatigue&quot;</li>
              <li>&quot;coach confiance en soi&quot;</li>
              <li>&quot;hypnose sommeil&quot;</li>
            </UL>
            <P>Analyse : titres, miniatures, durée, nombre de vues, commentaires.</P>
            <H3>Indicateur très intéressant</H3>
            <P>Une vidéo ancienne avec beaucoup de vues signifie souvent :</P>
            <UL>
              <li>sujet recherché ;</li>
              <li>problème récurrent ;</li>
              <li>bon angle marketing.</li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="google-maps">6. Google Maps : espionner les concurrents locaux</H2>
            <P>Très important pour les thérapeutes.</P>
            <P>
              Recherche sur <ExternalLink href="https://www.google.com/maps">Google Maps</ExternalLink> :
            </P>
            <UL>
              <li>psychologue + ville ;</li>
              <li>naturopathe + ville ;</li>
              <li>sophrologue + ville.</li>
            </UL>

            <H3>La fiche Google</H3>
            <P>Analyse : nom utilisé, catégorie, nombre d&apos;avis, fréquence des avis, photos, description, services.</P>

            <H3>Les avis clients</H3>
            <P>C&apos;est une mine d&apos;informations. Lis les avis et note ce dont parlent les patients :</P>
            <UL>
              <li>quoi ?</li>
              <li>quelle transformation ?</li>
              <li>quel problème initial ?</li>
              <li>quel bénéfice ?</li>
            </UL>
            <P>Exemple d&apos;avis :</P>
            <Quote>&quot;Je dormais très mal depuis plusieurs mois et après quelques séances...&quot;</Quote>
            <P>Tu découvres un argument marketing réel.</P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="recherche-google">7. Recherche Google classique</H2>
            <P>Méthode simple, tape :</P>
            <UL>
              <li>&quot;meilleur psychologue [ville]&quot;</li>
              <li>&quot;thérapie anxiété [ville]&quot;</li>
              <li>&quot;coach burn-out [ville]&quot;</li>
            </UL>
            <P>Observe : les premiers résultats, les titres, les pages proposées, les questions associées.</P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="google-trends">8. Google Trends (gratuit)</H2>
            <P>
              <ExternalLink href="https://trends.google.com/trends/">Google Trends</ExternalLink> permet de comparer l&apos;intérêt des sujets. Exemples à comparer :
            </P>
            <UL>
              <li>anxiété</li>
              <li>stress</li>
              <li>burn-out</li>
              <li>confiance en soi</li>
              <li>méditation</li>
            </UL>
            <P>Utile pour choisir les thèmes de contenu.</P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="answerthepublic">9. AnswerThePublic (version gratuite limitée)</H2>
            <P>
              <ExternalLink href="https://answerthepublic.com/">AnswerThePublic</ExternalLink> permet de voir les questions posées autour d&apos;un sujet.
            </P>
            <P>Exemple avec le mot-clé &quot;anxiété&quot; :</P>
            <UL>
              <li>comment calmer une crise d&apos;anxiété ?</li>
              <li>pourquoi je suis anxieux le matin ?</li>
              <li>comment aider quelqu&apos;un d&apos;anxieux ?</li>
            </UL>
            <P>Excellent pour créer : articles, vidéos, podcasts, FAQ.</P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="tableau-analyse">10. La méthode gratuite d&apos;analyse concurrentielle</H2>
            <P>Créer un tableau :</P>
            <Table
              head={["Concurrent", "Canal", "Cible", "Problème", "Promesse", "Offre", "Idée à améliorer"]}
              rows={[
                [
                  "Cabinet A",
                  "Instagram",
                  "Femmes 40 ans",
                  "Stress",
                  "Retrouver son calme",
                  "Séances",
                  "Créer une spécialisation",
                ],
                [
                  "Cabinet B",
                  "Google Ads",
                  "Entrepreneurs",
                  "Burn-out",
                  "Reprendre contrôle",
                  "Coaching",
                  "Ajouter une méthode",
                ],
                [
                  "Cabinet C",
                  "YouTube",
                  "Adultes",
                  "Anxiété",
                  "Comprendre son cerveau",
                  "Vidéos",
                  "Faire plus pédagogique",
                ],
              ]}
            />
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="signaux-forts">11. Les &quot;signaux forts&quot; à surveiller</H2>
            <H3>Une publicité qui dure longtemps</H3>
            <P>Souvent un bon signal. Si une publicité semble active depuis plusieurs mois :</P>
            <UL>
              <li>l&apos;offre fonctionne probablement ;</li>
              <li>le coût d&apos;acquisition est peut-être acceptable.</li>
            </UL>

            <H3>Un contenu qui revient souvent</H3>
            <P>Si plusieurs concurrents parlent du même sujet, c&apos;est probablement une demande forte.</P>

            <H3>Des mots répétés</H3>
            <P>Exemples :</P>
            <UL>
              <li>&quot;retrouver&quot;</li>
              <li>&quot;libérer&quot;</li>
              <li>&quot;transformer&quot;</li>
              <li>&quot;accompagnement personnalisé&quot;</li>
              <li>&quot;méthode&quot;</li>
              <li>&quot;première séance&quot;</li>
            </UL>
            <P>Cela révèle le langage du marché.</P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="checklist">12. Checklist mensuelle gratuite de veille</H2>
            <P>Chaque mois :</P>
            <H3>Google Ads</H3>
            <UL>
              <li>☐ Vérifier 5 concurrents</li>
              <li>☐ Noter leurs promesses</li>
              <li>☐ Identifier leurs offres</li>
            </UL>
            <H3>Meta</H3>
            <UL>
              <li>☐ Regarder les nouvelles publicités</li>
              <li>☐ Capturer les meilleurs visuels</li>
              <li>☐ Noter les accroches</li>
            </UL>
            <H3>TikTok</H3>
            <UL>
              <li>☐ Identifier les hooks populaires</li>
              <li>☐ Observer les formats</li>
            </UL>
            <H3>YouTube</H3>
            <UL>
              <li>☐ Trouver les vidéos les plus vues</li>
              <li>☐ Analyser titres et miniatures</li>
            </UL>
            <H3>Google Maps</H3>
            <UL>
              <li>☐ Observer les nouveaux concurrents</li>
              <li>☐ Lire les nouveaux avis</li>
              <li>☐ Identifier les attentes clients</li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="stack">Le &quot;stack&quot; gratuit idéal pour un thérapeute</H2>
            <Table
              head={["Besoin", "Outil gratuit"]}
              rows={[
                ["Publicités Google", "Google Ads Transparency Center"],
                ["Publicités Facebook/Instagram", "Meta Ads Library"],
                ["Publicités LinkedIn", "LinkedIn Ads Library"],
                ["Tendances TikTok", "TikTok Creative Center"],
                ["Tendances recherche", "Google Trends"],
                ["Questions utilisateurs", "AnswerThePublic"],
                ["Analyse locale", "Google Maps"],
                ["Vidéos concurrentes", "YouTube"],
                ["Veille web", "Google Alerts"],
              ]}
            />
            <P>
              Avec uniquement ces outils gratuits, tu peux déjà construire une veille marketing
              professionnelle et comprendre :
            </P>
            <UL>
              <li>comment les thérapeutes se positionnent ;</li>
              <li>quels messages attirent ;</li>
              <li>quelles niches sont saturées ;</li>
              <li>quelles opportunités sont encore libres.</li>
            </UL>
          </section>
        </article>
      </div>
    </div>
  );
}
