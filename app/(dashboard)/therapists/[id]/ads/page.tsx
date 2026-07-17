import { notFound } from "next/navigation";
import { getTherapist } from "@/lib/data/therapists";
import { listKeywords } from "@/lib/data/keywords";
import { seedAdIdeasForKeyword } from "@/lib/data/adIdeas";
import { recommendMatchType } from "@/lib/ads/matchType";
import { seedStarterKeywordsIfNeeded } from "@/lib/actions/seedStarterKeywords";
import { AdIdeasCard } from "@/components/dashboard/AdIdeasCard";
import { InfoPanel } from "@/components/ui/InfoPanel";

const PRIORITY_ORDER: Record<string, number> = { high: 3, medium: 2, low: 1 };

export default async function AdsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const therapist = await getTherapist(id);
  if (!therapist) notFound();

  await seedStarterKeywordsIfNeeded(id, therapist);

  const keywords = await listKeywords(id);
  const sortedKeywords = [...keywords].sort(
    (a, b) => PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority]
  );

  const adIdeasByKeyword = await Promise.all(
    sortedKeywords.map((keyword) => seedAdIdeasForKeyword(therapist, keyword))
  );

  return (
    <div className="space-y-6">
      <InfoPanel title="Des exemples de départ, entièrement modifiables">
        Ces titres et descriptions sont générés automatiquement à partir de votre spécialité et de
        vos mots-clés — modifiez-les librement, supprimez ceux qui ne conviennent pas, ou ajoutez-en
        d&apos;autres. Relisez toujours avant publication, notamment pour respecter les règles
        publicitaires spécifiques à la santé et au bien-être (pas de promesses de guérison, pas de
        ciblage intrusif). Le vrai bouton &quot;Afficher les idées&quot; de Google Ads utilise leur
        propre intelligence artificielle à partir de votre page web — nous n&apos;y avons pas accès,
        mais le bouton &quot;Suggérer une nouvelle annonce&quot; ci-dessous propose une variante à
        éditer.
      </InfoPanel>

      {sortedKeywords.length === 0 ? (
        <p className="text-sm text-slate-500">
          Renseignez une spécialité sur la fiche cabinet, ou ajoutez des mots-clés, pour générer des
          idées d&apos;annonces.
        </p>
      ) : (
        <div className="space-y-4">
          {sortedKeywords.map((keyword, i) => (
            <AdIdeasCard
              key={keyword.id}
              keyword={keyword}
              therapistId={id}
              adIdeas={adIdeasByKeyword[i]}
              matchType={recommendMatchType(keyword)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
