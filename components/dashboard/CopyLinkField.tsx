"use client";

import { useState } from "react";

export function CopyLinkField({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-2">
      <input
        readOnly
        value={value}
        onFocus={(e) => e.target.select()}
        className="flex-1 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700"
      />
      <button
        type="button"
        onClick={handleCopy}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        {copied ? "Copié !" : "Copier"}
      </button>
    </div>
  );
}
