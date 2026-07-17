"use client";

import { useRouter } from "next/navigation";
import type { TherapistProfile } from "@/lib/supabase/types";

export function TherapistSelector({
  therapists,
  selectedId,
}: {
  therapists: TherapistProfile[];
  selectedId: string;
}) {
  const router = useRouter();

  return (
    <select
      value={selectedId}
      onChange={(e) => router.push(`/?therapist=${e.target.value}`)}
      className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
    >
      {therapists.map((t) => (
        <option key={t.id} value={t.id}>
          {t.cabinet_name}
        </option>
      ))}
    </select>
  );
}
