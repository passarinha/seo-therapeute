import type { Keyword } from "@/lib/supabase/types";

export type MatchType = "exact" | "phrase" | "broad";

export interface MatchTypeResult {
  matchType: MatchType;
  label: string;
  reason: string;
}

export function recommendMatchType(keyword: Keyword): MatchTypeResult {
  const wordCount = keyword.keyword.trim().split(/\s+/).filter(Boolean).length;
  const hasLocation = Boolean(keyword.location);

  if (wordCount >= 4 || (wordCount >= 3 && hasLocation)) {
    return {
      matchType: "exact",
      label: "Exact",
      reason: "Mot-clé précis et long : cible exactement cette recherche, évite de gaspiller le budget.",
    };
  }

  if (wordCount === 1) {
    return {
      matchType: "broad",
      label: "Large (à surveiller)",
      reason: "Mot-clé très général : portée large mais risque de requêtes peu qualifiées, à surveiller de près.",
    };
  }

  return {
    matchType: "phrase",
    label: "Expression",
    reason: "Bon compromis : capte les variantes proches sans trop diluer le budget.",
  };
}
