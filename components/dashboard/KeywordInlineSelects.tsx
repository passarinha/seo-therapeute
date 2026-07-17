"use client";

import { useTransition } from "react";
import {
  updateKeywordPriority,
  updateKeywordStatus,
} from "@/app/(dashboard)/therapists/[id]/keywords/actions";
import type { Priority, ItemStatus } from "@/lib/supabase/types";

const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
  { value: "high", label: "Haute" },
  { value: "medium", label: "Moyenne" },
  { value: "low", label: "Basse" },
];

const STATUS_OPTIONS: { value: ItemStatus; label: string }[] = [
  { value: "todo", label: "À faire" },
  { value: "in_progress", label: "En cours" },
  { value: "done", label: "Fait" },
];

export function KeywordPrioritySelect({
  keywordId,
  therapistId,
  priority,
}: {
  keywordId: string;
  therapistId: string;
  priority: Priority;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <select
      value={priority}
      disabled={pending}
      onChange={(e) =>
        startTransition(() => {
          updateKeywordPriority(keywordId, therapistId, e.target.value);
        })
      }
      className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
    >
      {PRIORITY_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export function KeywordStatusSelect({
  keywordId,
  therapistId,
  status,
}: {
  keywordId: string;
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
          updateKeywordStatus(keywordId, therapistId, e.target.value);
        })
      }
      className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
    >
      {STATUS_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
