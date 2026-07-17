"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge, priorityColor, priorityLabel } from "@/components/ui/Badge";
import { deleteKeyword } from "@/app/(dashboard)/therapists/[id]/keywords/actions";
import { updateAdIdea, deleteAdIdea, addSuggestedAdIdea } from "@/app/(dashboard)/therapists/[id]/ads/actions";
import { HEADLINE_LIMIT, DESCRIPTION_LIMIT } from "@/lib/ads/generateAdIdeas";
import type { MatchTypeResult } from "@/lib/ads/matchType";
import type { AdIdea, Keyword } from "@/lib/supabase/types";

function CharCount({ length, limit }: { length: number; limit: number }) {
  const ok = length <= limit;
  return (
    <span className={`text-xs ${ok ? "text-slate-400" : "text-red-600"}`}>
      {ok ? "✓" : "⚠"} {length}/{limit}
    </span>
  );
}

function AdIdeaRow({ ad, index, therapistId }: { ad: AdIdea; index: number; therapistId: string }) {
  const [headline, setHeadline] = useState(ad.headline);
  const [description, setDescription] = useState(ad.description);
  const [saved, setSaved] = useState(false);

  return (
    <div className="rounded-md border border-slate-200 p-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Annonce {index + 1}
        </p>
        <form action={deleteAdIdea.bind(null, ad.id, therapistId)}>
          <button
            type="submit"
            title="Supprimer cette annonce"
            className="text-xs text-slate-400 hover:text-red-600"
          >
            ✕
          </button>
        </form>
      </div>

      <form
        action={updateAdIdea.bind(null, ad.id, therapistId)}
        onSubmit={() => {
          setSaved(true);
          setTimeout(() => setSaved(false), 2000);
        }}
        className="mt-2 space-y-2"
      >
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor={`headline-${ad.id}`} className="text-xs text-slate-500">
              Titre
            </label>
            <CharCount length={headline.length} limit={HEADLINE_LIMIT} />
          </div>
          <input
            id={`headline-${ad.id}`}
            name="headline"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="mt-1 block w-full rounded-md border border-slate-300 px-2 py-1 text-sm shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor={`description-${ad.id}`} className="text-xs text-slate-500">
              Description
            </label>
            <CharCount length={description.length} limit={DESCRIPTION_LIMIT} />
          </div>
          <textarea
            id={`description-${ad.id}`}
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="mt-1 block w-full rounded-md border border-slate-300 px-2 py-1 text-sm shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
        </div>
        <button
          type="submit"
          className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          {saved ? "Enregistré !" : "Enregistrer"}
        </button>
      </form>
    </div>
  );
}

export function AdIdeasCard({
  keyword,
  therapistId,
  adIdeas,
  matchType,
}: {
  keyword: Keyword;
  therapistId: string;
  adIdeas: AdIdea[];
  matchType: MatchTypeResult;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = adIdeas
      .map((ad, i) => `Annonce ${i + 1}\nTitre : ${ad.headline}\nDescription : ${ad.description}`)
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
          <button
            type="button"
            onClick={handleCopy}
            disabled={adIdeas.length === 0}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {copied ? "Copié !" : `Copier ${adIdeas.length > 0 ? adIdeas.length : ""} annonce(s)`}
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

      {adIdeas.length === 0 ? (
        <p className="mt-3 text-sm text-slate-400">Aucune annonce pour ce mot-clé.</p>
      ) : (
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {adIdeas.map((ad, i) => (
            <AdIdeaRow key={ad.id} ad={ad} index={i} therapistId={therapistId} />
          ))}
        </div>
      )}

      <form action={addSuggestedAdIdea.bind(null, keyword.id, therapistId)} className="mt-3">
        <button
          type="submit"
          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          + Suggérer une nouvelle annonce
        </button>
      </form>
    </Card>
  );
}
