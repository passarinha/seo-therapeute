const SECTIONS = [
  { id: "comparatif", label: "Comparatif des réseaux sociaux" },
  { id: "tiktok", label: "1. TikTok pour un thérapeute" },
  { id: "snapchat", label: "2. Snapchat pour un thérapeute" },
  { id: "facebook", label: "3. Facebook pour un thérapeute" },
  { id: "strategie-par-type", label: "4. La stratégie par type de thérapeute" },
  { id: "cascade", label: "5. Le contenu en cascade" },
  { id: "geo-reseaux", label: "6. Priorité pour être visible dans les IA" },
  { id: "recommandation-globale", label: "Ma recommandation globale 2026" },
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

function PriorityList({ items }: { items: string[] }) {
  return (
    <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-600">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
}

export default function SocialMediaGuidePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">Réseaux sociaux</h1>
        <p className="mt-1 text-sm text-slate-500">
          Quel réseau choisir ? Il faut les évaluer non pas selon le nombre d&apos;utilisateurs, mais
          selon leur capacité à générer de la confiance, des demandes de rendez-vous, des
          recommandations et de l&apos;autorité professionnelle (utile aussi pour le GEO/IA).
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
            <H2 id="comparatif">Comparatif des réseaux sociaux pour un thérapeute</H2>
            <Table
              head={["Réseau", "Pertinence thérapeute", "Objectif principal", "Audience", "Mon avis stratégique"]}
              rows={[
                [
                  "LinkedIn",
                  "⭐⭐⭐⭐⭐",
                  "Prescripteurs, partenariats, entreprises",
                  "Professionnels",
                  "Prioritaire pour développer un réseau",
                ],
                [
                  "YouTube",
                  "⭐⭐⭐⭐⭐",
                  "Autorité, référencement, confiance",
                  "Grand public",
                  "Le meilleur actif long terme",
                ],
                [
                  "Podcast",
                  "⭐⭐⭐⭐⭐",
                  "Relation profonde, réseau",
                  "Auditeurs engagés",
                  "Très puissant pour l'expertise",
                ],
                [
                  "Instagram",
                  "⭐⭐⭐⭐",
                  "Relation, visibilité, communauté",
                  "Grand public",
                  "Très bon pour créer du lien",
                ],
                [
                  "Facebook",
                  "⭐⭐⭐",
                  "Communautés locales, groupes, seniors",
                  "Large audience",
                  "Encore utile selon la cible",
                ],
                [
                  "TikTok",
                  "⭐⭐⭐",
                  "Découverte rapide, notoriété",
                  "Public jeune",
                  "Intéressant mais exigeant",
                ],
                [
                  "Snapchat",
                  "⭐",
                  "Visibilité jeune",
                  "13-25 ans principalement",
                  "Rarement prioritaire",
                ],
              ]}
            />
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="tiktok">1. TikTok pour un thérapeute</H2>
            <P>Est-ce pertinent ? Oui, mais avec une stratégie spécifique. TikTok est très puissant pour :</P>
            <UL>
              <li>toucher de nouvelles personnes ;</li>
              <li>vulgariser ;</li>
              <li>devenir visible rapidement.</li>
            </UL>
            <P>Mais il est moins adapté pour :</P>
            <UL>
              <li>créer une relation thérapeutique profonde immédiatement ;</li>
              <li>développer un réseau de prescripteurs.</li>
            </UL>

            <H3>Les thérapeutes qui peuvent réussir sur TikTok</H3>
            <P>Très adapté pour :</P>
            <UL>
              <li>✅ psychologues</li>
              <li>✅ coachs émotionnels</li>
              <li>✅ sophrologues</li>
              <li>✅ thérapeutes relationnels</li>
              <li>✅ spécialistes anxiété/stress</li>
              <li>✅ parentalité</li>
              <li>✅ confiance en soi</li>
            </UL>

            <H3>Formats qui fonctionnent</H3>
            <P>Format 1 : &quot;3 signes que...&quot;. Exemples :</P>
            <UL>
              <li>3 signes que votre anxiété est devenue chronique</li>
              <li>3 comportements qui montrent une blessure émotionnelle</li>
            </UL>
            <P>Format 2 : Réponse à une question. Exemple :</P>
            <Quote>&quot;Pourquoi je culpabilise tout le temps ?&quot;</Quote>
            <P>Format 3 : Mythe / réalité. Exemple :</P>
            <Quote>&quot;Non, demander de l&apos;aide ne signifie pas être faible.&quot;</Quote>
            <P>Format 4 : Micro-éducation. 30-60 secondes :</P>
            <UL>
              <li>un concept ;</li>
              <li>une explication ;</li>
              <li>une action.</li>
            </UL>

            <H3>Erreur TikTok</H3>
            <P>Faire du contenu trop &quot;vendeur&quot;. TikTok récompense :</P>
            <UL>
              <li>authenticité ;</li>
              <li>pédagogie ;</li>
              <li>émotion.</li>
            </UL>
            <P>Pas :</P>
            <Quote>&quot;Réservez votre séance maintenant.&quot;</Quote>

            <H3>Stratégie TikTok recommandée</H3>
            <P>Créer une bibliothèque :</P>
            <UL>
              <li>3 vidéos/semaine ;</li>
              <li>recycler les Shorts YouTube ;</li>
              <li>recycler les Reels Instagram.</li>
            </UL>
            <P>Ne pas créer un contenu différent pour chaque plateforme.</P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="snapchat">2. Snapchat pour un thérapeute</H2>
            <P>Est-ce pertinent ? Dans la majorité des cas : non. Snapchat est surtout adapté pour :</P>
            <UL>
              <li>adolescents ;</li>
              <li>jeunes adultes ;</li>
              <li>communication très personnelle.</li>
            </UL>
            <P>Cas où cela peut fonctionner :</P>
            <UL>
              <li>thérapeute adolescent ;</li>
              <li>prévention santé mentale jeunes ;</li>
              <li>programmes scolaires ;</li>
              <li>influence éducative.</li>
            </UL>
            <P>Mais pour un cabinet classique : ➡️ faible priorité.</P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="facebook">3. Facebook pour un thérapeute</H2>
            <P>Facebook est souvent sous-estimé. Il reste intéressant pour :</P>
            <UL>
              <li>communautés locales ;</li>
              <li>groupes spécialisés ;</li>
              <li>personnes de 35-65 ans ;</li>
              <li>événements ;</li>
              <li>ateliers.</li>
            </UL>

            <H3>1. Groupes Facebook locaux</H3>
            <P>Exemples :</P>
            <UL>
              <li>Parents de [ville]</li>
              <li>Entrepreneurs de [ville]</li>
              <li>Bien-être [ville]</li>
              <li>Santé naturelle [ville]</li>
            </UL>
            <P>Attention : ne pas spammer. Apporter d&apos;abord de la valeur.</P>

            <H3>2. Page professionnelle</H3>
            <P>À maintenir : horaires, coordonnées, photos, avis, événements.</P>
            <P>Mais une page Facebook seule génère rarement beaucoup de clients aujourd&apos;hui.</P>

            <H3>3. Publicité locale</H3>
            <P>Facebook Ads peut être efficace pour : ateliers, conférences, formations, événements.</P>
            <P>Moins recommandé pour pousser directement une thérapie sensible.</P>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="strategie-par-type">4. La stratégie par type de thérapeute</H2>

            <H3>Psychologue / psychothérapeute</H3>
            <P>Priorité :</P>
            <PriorityList
              items={[
                "Google Business ⭐⭐⭐⭐⭐",
                "YouTube ⭐⭐⭐⭐⭐",
                "LinkedIn ⭐⭐⭐⭐",
                "Instagram ⭐⭐⭐⭐",
                "Facebook ⭐⭐⭐",
                "TikTok ⭐⭐⭐",
              ]}
            />

            <H3>Naturopathe / réflexologue / bien-être</H3>
            <P>Priorité :</P>
            <PriorityList
              items={[
                "Instagram ⭐⭐⭐⭐⭐",
                "Google Business ⭐⭐⭐⭐⭐",
                "YouTube ⭐⭐⭐⭐",
                "Facebook ⭐⭐⭐⭐",
                "TikTok ⭐⭐⭐",
                "LinkedIn ⭐⭐⭐",
              ]}
            />

            <H3>Coach / consultant thérapeutes</H3>
            <P>Priorité :</P>
            <PriorityList
              items={[
                "LinkedIn ⭐⭐⭐⭐⭐",
                "Podcast ⭐⭐⭐⭐⭐",
                "YouTube ⭐⭐⭐⭐⭐",
                "Instagram ⭐⭐⭐",
                "Facebook ⭐⭐",
                "TikTok ⭐⭐",
              ]}
            />
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="cascade">5. Le meilleur système aujourd&apos;hui : contenu en cascade</H2>
            <P>
              Je ne créerais pas 5 stratégies différentes. Je créerais un contenu source. Exemple :
            </P>
            <FlowSteps
              steps={[
                "Une vidéo YouTube de 15 minutes",
                "1 podcast audio",
                "3 Shorts YouTube",
                "3 TikTok",
                "3 Reels Instagram",
                "2 posts LinkedIn",
                "1 article blog SEO",
                "1 newsletter",
              ]}
            />
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="geo-reseaux">6. Priorité pour un thérapeute qui veut être visible dans les IA</H2>
            <P>Les IA valorisent surtout les traces d&apos;expertise durables. Je classerais :</P>
            <Table
              head={["Canal", "Impact GEO/IA"]}
              rows={[
                ["Site web expert", "⭐⭐⭐⭐⭐"],
                ["Articles longs", "⭐⭐⭐⭐⭐"],
                ["YouTube", "⭐⭐⭐⭐⭐"],
                ["Podcast avec transcription", "⭐⭐⭐⭐⭐"],
                ["LinkedIn", "⭐⭐⭐⭐"],
                ["Google Business", "⭐⭐⭐⭐"],
                ["Instagram", "⭐⭐⭐"],
                ["Facebook", "⭐⭐"],
                ["TikTok", "⭐⭐"],
              ]}
            />
          </section>

          <section className="border-t border-slate-200 pt-6">
            <H2 id="recommandation-globale">Ma recommandation globale pour un thérapeute en 2026</H2>
            <P>Je ferais :</P>

            <H3>Socle</H3>
            <UL>
              <li>✅ Site web expert</li>
              <li>✅ Google Business</li>
              <li>✅ YouTube</li>
              <li>✅ Podcast</li>
            </UL>

            <H3>Relation</H3>
            <UL>
              <li>✅ LinkedIn</li>
              <li>✅ Instagram</li>
            </UL>

            <H3>Amplification</H3>
            <UL>
              <li>✅ TikTok (recyclage)</li>
              <li>✅ Facebook (communautés locales)</li>
            </UL>

            <H3>Pas prioritaire</H3>
            <UL>
              <li>❌ Snapchat sauf cible très spécifique</li>
            </UL>

            <P>
              La logique n&apos;est pas &quot;être partout&quot;, mais construire un écosystème où
              chaque canal joue un rôle :
            </P>
            <UL>
              <li>Google capte l&apos;intention,</li>
              <li>YouTube explique,</li>
              <li>le podcast crée la confiance,</li>
              <li>LinkedIn crée les partenariats,</li>
              <li>Instagram humanise,</li>
              <li>TikTok diffuse.</li>
            </UL>
          </section>
        </article>
      </div>
    </div>
  );
}
