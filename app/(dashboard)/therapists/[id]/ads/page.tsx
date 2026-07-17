import { notFound } from "next/navigation";
import { getTherapist } from "@/lib/data/therapists";
import { listKeywords } from "@/lib/data/keywords";
import { generateAdIdeas } from "@/lib/ads/generateAdIdeas";
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

  return (
    <div className="space-y-6">
      <InfoPanel title="Des exemples de départ à adapter, pas des annonces prêtes à publier">
        Ces titres et descriptions sont générés automatiquement à partir de votre spécialité et de
        vos mots-clés — ce sont des points de départ pour vous inspirer, pas des annonces
        prouvées ni prêtes à publier telles quelles. Relisez-les avant de les utiliser dans Google
        Ads, notamment pour respecter les règles publicitaires spécifiques à la santé et au
        bien-être (pas de promesses de guérison, pas de ciblage intrusif).
      </InfoPanel>

      {sortedKeywords.length === 0 ? (
        <p className="text-sm text-slate-500">
          Renseignez une spécialité sur la fiche cabinet, ou ajoutez des mots-clés, pour générer des
          idées d&apos;annonces.
        </p>
      ) : (
        <div className="space-y-4">
          {sortedKeywords.map((keyword) => (
            <AdIdeasCard
              key={keyword.id}
              keyword={keyword}
              therapistId={id}
              ideas={generateAdIdeas(therapist, keyword)}
              matchType={recommendMatchType(keyword)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
