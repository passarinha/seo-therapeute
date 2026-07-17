import { notFound } from "next/navigation";
import { getTherapist } from "@/lib/data/therapists";
import { TherapistTabs } from "@/components/dashboard/TherapistTabs";

export default async function TherapistLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const therapist = await getTherapist(id);

  if (!therapist) notFound();

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-slate-900">{therapist.cabinet_name}</h1>
        <p className="text-sm text-slate-500">
          {[therapist.specialty, therapist.city].filter(Boolean).join(" · ") || "—"}
        </p>
      </div>

      <TherapistTabs therapistId={id} />

      <div className="mt-6">{children}</div>
    </div>
  );
}
