"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { slug: "", label: "Fiche cabinet" },
  { slug: "keywords", label: "Mots-clés" },
  { slug: "ads", label: "Annonces Google Ads" },
  { slug: "competitors", label: "Concurrents" },
  { slug: "performance", label: "Performance" },
  { slug: "actions", label: "Plan d'action" },
  { slug: "import", label: "Import CSV" },
];

export function TherapistTabs({ therapistId }: { therapistId: string }) {
  const pathname = usePathname();

  return (
    <div className="overflow-x-auto border-b border-slate-200">
      <nav className="-mb-px flex gap-4 whitespace-nowrap">
        {TABS.map((tab) => {
          const href = `/therapists/${therapistId}${tab.slug ? `/${tab.slug}` : ""}`;
          const isActive = pathname === href;
          return (
            <Link
              key={tab.slug}
              href={href}
              className={`shrink-0 border-b-2 px-1 py-2 text-sm ${
                isActive
                  ? "border-slate-900 font-medium text-slate-900"
                  : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
