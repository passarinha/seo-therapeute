import { notFound } from "next/navigation";
import { getTherapist } from "@/lib/data/therapists";
import { listKeywords } from "@/lib/data/keywords";
import { generateAdIdeas } from "@/lib/ads/generateAdIdeas";
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

  const keywords = await listKeywords(id);
  const sortedKeywords = [...keywords].sort(
    (a, b) => PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority]
  );

  return (
    <div className="space-y-6">
      <InfoPanel title="Des brouillons à relire avant publication">
        Ces titres et descriptions sont générés automatiquement à partir de vos mots-clés — ce sont
        des points de départ, pas des annonces prêtes à publier. Relisez-les avant de les utiliser
        dans Google Ads, notamment pour respecter les règles publicitaires spécifiques à la santé et
        au bien-être (pas de promesses de guérison, pas de ciblage intrusif).
      </InfoPanel>

      {sortedKeywords.length === 0 ? (
        <p className="text-sm text-slate-500">
          Ajoutez d&apos;abord des mots-clés pour générer des idées d&apos;annonces.
        </p>
      ) : (
        <div className="space-y-4">
          {sortedKeywords.map((keyword) => (
            <AdIdeasCard key={keyword.id} keyword={keyword} ideas={generateAdIdeas(therapist, keyword)} />
          ))}
        </div>
      )}
    </div>
  );
}
