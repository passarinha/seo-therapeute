"use client";

import { useTransition } from "react";
import { updateActionStatus } from "@/app/(dashboard)/therapists/[id]/actions/actions";
import type { ItemStatus } from "@/lib/supabase/types";

const OPTIONS: { value: ItemStatus; label: string }[] = [
  { value: "todo", label: "À faire" },
  { value: "in_progress", label: "En cours" },
  { value: "done", label: "Fait" },
];

export function ActionStatusSelect({
  actionId,
  therapistId,
  status,
}: {
  actionId: string;
  therapistId: string;
  status: ItemStatus;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={pending}
      onChange={(e) =>
        startTransition(() => {
          updateActionStatus(actionId, therapistId, e.target.value);
        })
      }
      className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
    >
      {OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
