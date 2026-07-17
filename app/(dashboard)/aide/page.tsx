import { Card, CardTitle } from "@/components/ui/Card";
import { InfoPanel } from "@/components/ui/InfoPanel";

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

export default function AidePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">Aide</h1>
        <p className="mt-1 text-sm text-slate-500">
          Ce que fait cet outil, comment récupérer vos chiffres Google, et comment utiliser les
          mots-clés et les concurrents.
        </p>
      </div>

      <Card>
        <CardTitle>À quoi sert cet outil ?</CardTitle>
        <p className="mt-2 text-sm text-slate-600">
          Il répond chaque mois à 3 questions simples :
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
          <li>Est-ce que les patients me trouvent sur Google ? → score <strong>Visibilité</strong></li>
          <li>Est-ce qu&apos;ils me font confiance une fois sur ma fiche ? → score <strong>Confiance</strong></li>
          <li>Est-ce que ça se transforme en rendez-vous ? → score <strong>Conversion</strong></li>
        </ul>
        <p className="mt-2 text-sm text-slate-600">
          Chaque score est calculé automatiquement à partir de quelques chiffres que vous saisissez,
          et l&apos;outil vous propose ensuite un plan d&apos;action priorisé.
        </p>
      </Card>

      <Card>
        <CardTitle>Comment connecter vos données Google ?</CardTitle>
        <div className="mt-3">
          <InfoPanel title="Il n'y a pas encore de connexion automatique">
            Pour l&apos;instant, l&apos;outil ne se branche pas tout seul sur vos comptes Google : vous
            copiez vous-même quelques chiffres chaque mois, ça prend environ 2 minutes. Une
            synchronisation automatique est prévue pour une prochaine version.
          </InfoPanel>
        </div>

        <div className="mt-4 space-y-4 text-sm text-slate-600">
          <div>
            <p className="font-medium text-slate-900">1. Google Search Console (impressions, clics, position)</p>
            <p className="mt-1">
              Rendez-vous sur{" "}
              <ExternalLink href="https://search.google.com/search-console/performance/search-analytics">
                search.google.com/search-console
              </ExternalLink>
              , sélectionnez votre site, ouvrez le rapport &quot;Performances sur les résultats de
              recherche&quot;. Vous y trouverez les impressions, les clics, le CTR et la position
              moyenne à recopier dans l&apos;onglet Performance de l&apos;outil.
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Si votre site n&apos;est pas encore relié à Search Console, votre développeur ou
              webmaster peut le faire en quelques minutes (c&apos;est gratuit).
            </p>
          </div>
          <div>
            <p className="font-medium text-slate-900">2. Google Business Profile (vues, appels, itinéraires, messages, réservations)</p>
            <p className="mt-1">
              Rendez-vous sur <ExternalLink href="https://business.google.com/">business.google.com</ExternalLink>,
              sélectionnez votre établissement, ouvrez l&apos;onglet &quot;Performances&quot; (ou
              &quot;Statistiques&quot;). Vous y trouverez les vues du profil, les appels, les
              demandes d&apos;itinéraire, les clics vers le site, les messages et les réservations.
            </p>
          </div>
          <div>
            <p className="font-medium text-slate-900">3. Avis</p>
            <p className="mt-1">
              Le nombre d&apos;avis et la note moyenne sont visibles directement sur votre fiche
              Google Business Profile, à côté du nom de votre établissement.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <CardTitle>Mots-clés : comment ça marche ?</CardTitle>
        <p className="mt-2 text-sm text-slate-600">
          Un mot-clé, c&apos;est une phrase qu&apos;un patient tape dans Google pour vous trouver
          (ex: &quot;psychologue Lyon 6&quot;, &quot;thérapie de couple en visio&quot;). Pour en
          trouver : pensez comme un patient (symptôme + spécialité + ville), regardez
          l&apos;auto-complétion Google, et si vous avez Search Console, regardez les requêtes qui
          vous amènent déjà des clics.
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Ajoutez-les dans l&apos;onglet Mots-clés avec leur position actuelle (cherchez le mot-clé
          en navigation privée) et une priorité. Concentrez-vous chaque mois sur 3 à 5 mots-clés
          prioritaires.
        </p>
      </Card>

      <Card>
        <CardTitle>Concurrents : comment ça marche ?</CardTitle>
        <p className="mt-2 text-sm text-slate-600">
          Ce sont les cabinets qui apparaissent sur Google quand un patient tape vos mots-clés,
          en particulier dans le bloc avec la carte (&quot;pack local&quot;) et les tout premiers
          résultats. Recherchez vos mots-clés principaux en navigation privée, notez les 3
          établissements qui reviennent le plus souvent.
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Renseignez leur nombre d&apos;avis, leur note (visibles sur leur fiche Google), et surtout
          une &quot;opportunité à exploiter&quot; : un point faible que vous pouvez utiliser à votre
          avantage (peu d&apos;avis récents, pas de créneaux en soirée, pas de réservation en ligne...).
        </p>
      </Card>

      <Card>
        <CardTitle>Routine recommandée</CardTitle>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
          <li>Chaque mois : saisir les métriques du mois précédent (Search Console + GBP).</li>
          <li>Chaque mois : regarder le tableau de bord et traiter les alertes en rouge.</li>
          <li>Chaque mois : régénérer le plan d&apos;action et traiter 1 à 3 actions à impact haut.</li>
          <li>Chaque trimestre : revoir la liste des concurrents et des mots-clés.</li>
        </ul>
      </Card>
    </div>
  );
}
