import { redirect } from "next/navigation";
import { listTherapists } from "@/lib/data/therapists";
import { getCurrentUser } from "@/lib/supabase/session";
import { isAdminEmail } from "@/lib/auth/admin";
import { TherapistForm } from "@/components/dashboard/TherapistForm";
import { createTherapist } from "../actions";

export default async function NewTherapistPage() {
  const [user, therapists] = await Promise.all([getCurrentUser(), listTherapists()]);

  if (!isAdminEmail(user?.email) && therapists.length > 0) {
    redirect("/therapists?error=limit");
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-lg font-semibold text-slate-900">Nouveau cabinet</h1>
      <p className="mt-1 text-sm text-slate-500">
        Renseigne les informations de base du cabinet à suivre.
      </p>
      <div className="mt-6">
        <TherapistForm action={createTherapist} submitLabel="Créer le cabinet" />
      </div>
    </div>
  );
}
