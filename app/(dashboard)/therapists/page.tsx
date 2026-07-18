import { listTherapists } from "@/lib/data/therapists";
import { getCurrentUser } from "@/lib/supabase/session";
import { isAdminEmail } from "@/lib/auth/admin";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export default async function TherapistsListPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const [therapists, user, { error }] = await Promise.all([
    listTherapists(),
    getCurrentUser(),
    searchParams,
  ]);
  const canCreateMore = isAdminEmail(user?.email) || therapists.length === 0;

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">Cabinets</h1>
          <p className="mt-1 text-sm text-slate-500">
            Gère les fiches de tes cabinets/thérapeutes suivis.
          </p>
        </div>
        {canCreateMore && <LinkButton href="/therapists/new">+ Nouveau cabinet</LinkButton>}
      </div>

      {error === "limit" && (
        <p className="mt-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-700">
          Vous avez déjà accès à un cabinet. Contactez l&apos;administrateur si vous devez en
          suivre un second.
        </p>
      )}

      {therapists.length === 0 ? (
        <Card className="mt-6">
          <p className="text-sm text-slate-500">
            Aucun cabinet pour l&apos;instant.{" "}
            <Link href="/therapists/new" className="font-medium text-slate-900 underline">
              Créer le premier
            </Link>
            .
          </p>
        </Card>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {therapists.map((t) => (
            <Link key={t.id} href={`/therapists/${t.id}`}>
              <Card className="h-full transition hover:border-slate-400">
                <h2 className="text-sm font-semibold text-slate-900">{t.cabinet_name}</h2>
                <p className="mt-1 text-sm text-slate-500">{t.therapist_name}</p>
                <p className="mt-2 text-xs text-slate-400">
                  {[t.specialty, t.city].filter(Boolean).join(" · ") || "—"}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
