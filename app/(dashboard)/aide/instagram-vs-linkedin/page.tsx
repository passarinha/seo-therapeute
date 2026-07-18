const SECTIONS = [
  { id: "comparatif", label: "Instagram vs LinkedIn : le comparatif" },
  { id: "instagram", label: "1. Instagram : créer une relation de confiance" },
  { id: "linkedin", label: "2. LinkedIn : sous-estimé pour les thérapeutes" },
  { id: "strategie-deux", label: "3. Utiliser les deux intelligemment" },
  { id: "frequence", label: "4. Fréquence réaliste" },
  { id: "optimisation-profil", label: "5. Optimisation du profil" },
  { id: "geo-impact", label: "6. Impact sur le GEO (IA)" },
  { id: "prescripteurs", label: "7. Développer un réseau de prescripteurs" },
  { id: "strategie-globale", label: "La stratégie globale recommandée" },
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
  badLabel = "Mauvais",
  bad,
  goodLabel = "Bon",
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

function PriorityList({ items }: { items: string[] }) {
  return (
    <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-600">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
}

export default function InstagramVsLinkedInGuidePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">Instagram vs LinkedIn</h1>
        <p className="mt-1 text-sm text-slate-500">
          Les deux peuvent être très intéressants pour un thérapeute, mais ils ne jouent pas le même
          rôle. Le choix dépend du type de thérapeute, de la clientèle recherchée et de
          l&apos;objectif (patients directs, prescripteurs, notoriété, partenariats).
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
            L&apos;erreur fréquente est de vouloir &quot;être présent partout&quot;. Une stratégie
            efficace consiste plutôt à choisir le bon canal pour le bon objectif.
          </P>

          <section>
            <H2 id="comparatif">Instagram vs LinkedIn pour un thérapeute</H2>
            <Table
              head={["", "Instagram", "LinkedIn"]}
              rows={[
                [
                  "Objectif principal",
                  "Créer une relation émotionnelle avec des futurs patients",
                  "Développer une autorité professionnelle et un réseau de prescripteurs",
                ],
                ["Audience", "Grand public, particuliers", "Professionnels, entreprises, experts"],
                [
                  "Type de confiance créée",
                  "\"J'aime son approche, je me reconnais\"",
                  "\"Cette personne est compétente, je peux la recommander\"",
                ],
                ["Type de contenu", "Vulgarisation, conseils, coulisses", "Expertise, analyses, collaborations"],
                ["Conversion", "Prise de rendez-vous", "Recommandations, partenariats, interventions"],
                ["Temps nécessaire", "Élevé (régularité visuelle)", "Plus faible mais demande de la qualité"],
                [
                  "Pertinent pour",
                  "Psychologues, sophrologues, coachs, naturopathes, bien-être",
                  "Thérapeutes voulant développer un réseau professionnel",
                ],
              ]}
            />
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="instagram">1. Instagram : excellent pour créer une relation de confiance</H2>
            <P>
              Instagram fonctionne très bien pour les métiers où la personne choisit son thérapeute
              en fonction du feeling. Le futur patient se demande :
            </P>
            <UL>
              <li>Est-ce que cette personne me comprend ?</li>
              <li>Est-ce que je me sens en sécurité ?</li>
              <li>Est-ce que sa manière de parler me correspond ?</li>
            </UL>
            <P>Instagram répond très bien à ces questions.</P>

            <H3>1. Contenu éducatif (70%)</H3>
            <P>Objectif : être trouvé et sauvegardé. Exemples :</P>
            <UL>
              <li>&quot;5 signes que votre stress devient chronique&quot;</li>
              <li>&quot;Pourquoi vous répétez toujours les mêmes schémas relationnels&quot;</li>
              <li>&quot;3 erreurs qui entretiennent l&apos;anxiété&quot;</li>
              <li>&quot;Ce que votre corps essaie peut-être de vous dire&quot;</li>
            </UL>
            <P>Formats : carrousels, reels courts, infographies.</P>

            <H3>2. Contenu relationnel (20%)</H3>
            <P>Objectif : créer de la confiance. Exemples :</P>
            <UL>
              <li>Pourquoi j&apos;ai choisi ce métier.</li>
              <li>Ma vision de l&apos;accompagnement.</li>
              <li>Ce qui se passe lors d&apos;une première séance.</li>
              <li>Une journée dans mon cabinet.</li>
              <li>Mes valeurs.</li>
            </UL>

            <H3>3. Contenu preuve (10%)</H3>
            <P>Objectif : rassurer. Exemples :</P>
            <UL>
              <li>formations ;</li>
              <li>conférences ;</li>
              <li>livres lus ;</li>
              <li>interventions ;</li>
              <li>témoignages (avec autorisation).</li>
            </UL>

            <H3>Ce qui marche moins bien sur Instagram</H3>
            <UL>
              <li>❌ Poster uniquement des citations inspirantes (ex. &quot;Aime-toi et tout ira mieux.&quot; — peu différenciant).</li>
              <li>❌ Faire uniquement de la promotion (&quot;Prenez rendez-vous avec moi.&quot; — les utilisateurs ne viennent pas sur Instagram pour acheter).</li>
            </UL>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="linkedin">2. LinkedIn : sous-estimé pour les thérapeutes</H2>
            <P>LinkedIn est souvent plus intéressant que Instagram pour :</P>
            <UL>
              <li>développer un réseau de prescripteurs ;</li>
              <li>obtenir des recommandations ;</li>
              <li>travailler avec des entreprises ;</li>
              <li>créer des partenariats.</li>
            </UL>
            <P>Particulièrement intéressant pour :</P>
            <UL>
              <li>psychologues du travail ;</li>
              <li>coachs ;</li>
              <li>thérapeutes en entreprise ;</li>
              <li>sophrologues QVT ;</li>
              <li>consultants ;</li>
              <li>formateurs.</li>
            </UL>

            <H3>1. Expertise métier</H3>
            <P>Exemples :</P>
            <Quote>
              &quot;Pourquoi les thérapeutes ont du mal à développer leur cabinet sans perdre leur
              éthique.&quot;
            </Quote>
            <Quote>&quot;Les 5 erreurs que je vois chez les professionnels de l&apos;accompagnement.&quot;</Quote>

            <H3>2. Retour d&apos;expérience</H3>
            <P>Très puissant :</P>
            <Quote>&quot;Après 10 ans d&apos;accompagnement, voici ce que j&apos;ai compris sur...&quot;</Quote>

            <H3>3. Réflexions professionnelles</H3>
            <Quote>
              &quot;Un thérapeute n&apos;a pas seulement besoin de compétences cliniques. Il doit
              aussi savoir créer un environnement de confiance.&quot;
            </Quote>

            <H3>4. Réseau</H3>
            <P>Identifier : médecins, psychologues, entrepreneurs, RH, associations, professionnels complémentaires.</P>
            <P>Puis interagir régulièrement.</P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="strategie-deux">3. La stratégie idéale : utiliser les deux intelligemment</H2>
            <P>Je ferais :</P>
            <H3>Instagram = attirer les personnes</H3>
            <P>Contenus : émotions, problèmes, pédagogie, relation.</P>
            <H3>LinkedIn = créer l&apos;écosystème</H3>
            <P>Contenus : expertise, collaborations, réseau, recommandations.</P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="frequence">4. Fréquence réaliste</H2>
            <P>Pour un thérapeute seul :</P>
            <H3>Instagram</H3>
            <P>Minimum :</P>
            <UL>
              <li>3 publications/semaine</li>
              <li>2-3 stories/semaine</li>
              <li>1 reel/semaine</li>
            </UL>
            <H3>LinkedIn</H3>
            <P>Minimum :</P>
            <UL>
              <li>2 publications/semaine</li>
              <li>10-15 commentaires pertinents/semaine sur d&apos;autres publications</li>
            </UL>
            <P>Le commentaire est souvent plus puissant que publier seul.</P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="optimisation-profil">5. Optimisation du profil</H2>

            <H3>Instagram — Bio</H3>
            <Compare
              bad="Thérapeute passionnée 🌸 Bien-être ✨"
              good="Psychologue spécialisée anxiété | J'aide les adultes à retrouver calme et confiance | Consultations Paris & visio"
            />
            <P>Ajouter : lien prise de rendez-vous, site, localisation, spécialité.</P>

            <H3>LinkedIn — Titre</H3>
            <Compare
              bad="Thérapeute | Accompagnement | Bien-être"
              good="Psychologue spécialisée anxiété | J'accompagne les adultes à sortir du stress chronique | Paris & visio"
            />

            <H3>Section &quot;À propos&quot;</H3>
            <P>Inclure : qui tu aides, problèmes traités, méthode, approche, philosophie.</P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="geo-impact">6. Impact sur le GEO (IA)</H2>
            <P>Oui, ces réseaux peuvent aider indirectement. Les IA cherchent des signaux de crédibilité :</P>
            <UL>
              <li>cohérence du nom ;</li>
              <li>expertise répétée ;</li>
              <li>publications ;</li>
              <li>collaborations ;</li>
              <li>mentions.</li>
            </UL>
            <P>
              Un thérapeute qui existe sur site web, LinkedIn, YouTube, podcast et Instagram avec le
              même positionnement est beaucoup plus facile à comprendre.
            </P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="prescripteurs">7. Si ton objectif est le développement d&apos;un réseau de prescripteurs</H2>
            <P>
              Dans ce cas (accompagnement des thérapeutes pour développer leur activité), je
              mettrais la priorité :
            </P>
            <PriorityList
              items={[
                "LinkedIn ⭐⭐⭐⭐⭐ — pour contacter thérapeutes installés, réseaux professionnels, partenaires, experts santé.",
                "Podcast ⭐⭐⭐⭐⭐ — pour créer des relations avec des invités.",
                "YouTube ⭐⭐⭐⭐ — pour construire l'autorité.",
                "Instagram ⭐⭐⭐ — pour la visibilité et la confiance.",
              ]}
            />
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="strategie-globale">La stratégie globale que je recommanderais à un thérapeute aujourd&apos;hui</H2>
            <FlowSteps
              steps={[
                "Site web (base de confiance)",
                "Google Business Profile (local)",
                "YouTube + Podcast (autorité)",
                "LinkedIn (prescripteurs)",
                "Instagram (relation)",
                "Newsletter (fidélisation)",
              ]}
            />
            <P>
              Le piège est de chercher des abonnés. Pour un thérapeute, 1000 personnes qui te font
              confiance valent souvent mieux que 50 000 abonnés peu qualifiés.
            </P>
          </section>
        </article>
      </div>
    </div>
  );
}
