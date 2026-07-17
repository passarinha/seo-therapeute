"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge, priorityColor, priorityLabel } from "@/components/ui/Badge";
import { deleteKeyword } from "@/app/(dashboard)/therapists/[id]/keywords/actions";
import type { AdIdeas, AdLine } from "@/lib/ads/generateAdIdeas";
import type { MatchTypeResult } from "@/lib/ads/matchType";
import type { Keyword } from "@/lib/supabase/types";

function LineDisplay({ line }: { line: AdLine }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-slate-700">{line.text}</span>
      <span className="shrink-0 text-xs text-slate-400">
        ✓ {line.length}
        {line.shortened && <span className="ml-1 italic">(raccourci)</span>}
      </span>
    </div>
  );
}

function storageKey(keywordId: string) {
  return `dismissed_ads_${keywordId}`;
}

export function AdIdeasCard({
  keyword,
  therapistId,
  ideas,
  matchType,
}: {
  keyword: Keyword;
  therapistId: string;
  ideas: AdIdeas;
  matchType: MatchTypeResult;
}) {
  const [copied, setCopied] = useState(false);
  const [dismissed, setDismissed] = useState<number[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey(keyword.id));
      if (raw) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from localStorage on mount
        setDismissed(JSON.parse(raw));
      }
    } catch {
      // ignore corrupted/unavailable storage
    }
  }, [keyword.id]);

  function dismiss(index: number) {
    const next = [...dismissed, index];
    setDismissed(next);
    try {
      window.localStorage.setItem(storageKey(keyword.id), JSON.stringify(next));
    } catch {
      // ignore
    }
  }

  function restoreAll() {
    setDismissed([]);
    try {
      window.localStorage.removeItem(storageKey(keyword.id));
    } catch {
      // ignore
    }
  }

  const visibleAds = ideas.ads.filter((_, i) => !dismissed.includes(i));

  async function handleCopy() {
    const text = visibleAds
      .map((ad, i) => `Annonce ${i + 1}\nTitre : ${ad.headline.text}\nDescription : ${ad.description.text}`)
      .join("\n\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-900">{keyword.keyword}</h3>
          <Badge color={priorityColor(keyword.priority)}>{priorityLabel(keyword.priority)}</Badge>
          <span title={matchType.reason}>
            <Badge color="slate">Type : {matchType.label}</Badge>
          </span>
        </div>
        <div className="flex items-center gap-2">
          {dismissed.length > 0 && (
            <button
              type="button"
              onClick={restoreAll}
              className="text-xs text-slate-400 underline hover:text-slate-700"
            >
              Réafficher les {dismissed.length} masquée(s)
            </button>
          )}
          <button
            type="button"
            onClick={handleCopy}
            disabled={visibleAds.length === 0}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {copied ? "Copié !" : `Copier ${visibleAds.length > 0 ? visibleAds.length : ""} annonce(s)`}
          </button>
          <form
            action={deleteKeyword.bind(null, keyword.id, therapistId, `/therapists/${therapistId}/ads`)}
            onSubmit={(e) => {
              if (
                !window.confirm(
                  `Supprimer le mot-clé "${keyword.keyword}" et son groupe d'annonces ?`
                )
              ) {
                e.preventDefault();
              }
            }}
          >
            <button
              type="submit"
              title="Supprimer ce groupe d'annonces"
              className="rounded-md border border-red-200 bg-white px-2 py-1.5 text-sm text-red-600 hover:bg-red-50"
            >
              🗑️
            </button>
          </form>
        </div>
      </div>
      {visibleAds.length === 0 ? (
        <p className="mt-3 text-sm text-slate-400">
          Toutes les annonces ont été masquées pour ce mot-clé.
        </p>
      ) : (
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ideas.ads.map((ad, i) =>
            dismissed.includes(i) ? null : (
              <div key={i} className="relative rounded-md border border-slate-200 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Annonce {i + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() => dismiss(i)}
                    title="Masquer cette annonce"
                    className="text-xs text-slate-400 hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>
                <div className="mt-2 space-y-1.5">
                  <LineDisplay line={ad.headline} />
                  <LineDisplay line={ad.description} />
                </div>
              </div>
            )
          )}
        </div>
      )}
    </Card>
  );
}
