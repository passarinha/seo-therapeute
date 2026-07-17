"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge, priorityColor, priorityLabel } from "@/components/ui/Badge";
import type { AdIdeas, AdLine } from "@/lib/ads/generateAdIdeas";
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

export function AdIdeasCard({ keyword, ideas }: { keyword: Keyword; ideas: AdIdeas }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = ideas.ads
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
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          {copied ? "Copié !" : "Copier les 5 annonces"}
        </button>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {ideas.ads.map((ad, i) => (
          <div key={i} className="rounded-md border border-slate-200 p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Annonce {i + 1}
            </p>
            <div className="mt-2 space-y-1.5">
              <LineDisplay line={ad.headline} />
              <LineDisplay line={ad.description} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
