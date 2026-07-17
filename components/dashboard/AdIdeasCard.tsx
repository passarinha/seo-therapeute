"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge, priorityColor, priorityLabel } from "@/components/ui/Badge";
import type { AdIdeas } from "@/lib/ads/generateAdIdeas";
import type { Keyword } from "@/lib/supabase/types";

function LineList({ title, lines }: { title: string; lines: AdIdeas["headlines"] }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{title}</p>
      <ul className="mt-1 space-y-1">
        {lines.map((line, i) => (
          <li key={i} className="flex items-center justify-between gap-3 text-sm">
            <span className="text-slate-700">{line.text}</span>
            <span className={`shrink-0 text-xs ${line.ok ? "text-slate-400" : "text-red-600"}`}>
              {line.ok ? "✓" : "⚠"} {line.length}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AdIdeasCard({ keyword, ideas }: { keyword: Keyword; ideas: AdIdeas }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = [
      "Titres :",
      ...ideas.headlines.map((h) => `- ${h.text}`),
      "",
      "Descriptions :",
      ...ideas.descriptions.map((d) => `- ${d.text}`),
    ].join("\n");
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
          {copied ? "Copié !" : "Copier tout"}
        </button>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <LineList title="Titres" lines={ideas.headlines} />
        <LineList title="Descriptions" lines={ideas.descriptions} />
      </div>
    </Card>
  );
}
