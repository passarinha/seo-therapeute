import Link from "next/link";
import { listTherapists } from "@/lib/data/therapists";
import { getCurrentUserId } from "@/lib/data/collaborators";
import type { TherapistProfile } from "@/lib/supabase/types";

function TherapistList({ therapists }: { therapists: TherapistProfile[] }) {
  return (
    <ul className="mt-1 space-y-1">
      {therapists.map((t) => (
        <li key={t.id}>
          <Link
            href={`/therapists/${t.id}`}
            className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            {t.cabinet_name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export async function Sidebar() {
  const [therapists, currentUserId] = await Promise.all([listTherapists(), getCurrentUserId()]);
  const myTherapists = therapists.filter((t) => t.user_id === currentUserId);
  const sharedTherapists = therapists.filter((t) => t.user_id !== currentUserId);

  return (
    <nav className="h-full w-64 shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-4">
      <Link
        href="/"
        className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
      >
        Vue globale
      </Link>

      <div className="mt-4">
        <div className="flex items-center justify-between px-3">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Mes cabinets
          </span>
          <Link href="/therapists/new" className="text-xs text-slate-500 hover:text-slate-900">
            + Nouveau
          </Link>
        </div>
        {myTherapists.length === 0 ? (
          <p className="px-3 py-2 text-xs text-slate-400">Aucun cabinet pour l&apos;instant.</p>
        ) : (
          <TherapistList therapists={myTherapists} />
        )}
      </div>

      {sharedTherapists.length > 0 && (
        <div className="mt-4">
          <span className="block px-3 text-xs font-medium uppercase tracking-wide text-slate-400">
            Partagés avec moi
          </span>
          <TherapistList therapists={sharedTherapists} />
        </div>
      )}

      <div className="mt-6 space-y-1 border-t border-slate-200 pt-4">
        <Link
          href="/aide"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
        >
          <span aria-hidden>❓</span> Aide
        </Link>
        <Link
          href="/aide/fiche-google"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
        >
          <span aria-hidden>🏷️</span> Optimisation de ma fiche Google
        </Link>
        <Link
          href="/aide/geo"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
        >
          <span aria-hidden>🤖</span> Optimisation référencement GEO
        </Link>
        <Link
          href="/aide/youtube"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
        >
          <span aria-hidden>▶️</span> SEO YouTube
        </Link>
        <Link
          href="/aide/reseaux-sociaux"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
        >
          <span aria-hidden>📱</span> Réseaux sociaux
        </Link>
        <Link
          href="/aide/podcast"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
        >
          <span aria-hidden>🎙️</span> Podcast
        </Link>
      </div>
    </nav>
  );
}
