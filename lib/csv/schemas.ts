export type ColumnType = "string" | "number" | "boolean" | "date";

export interface CsvColumn {
  key: string;
  required?: boolean;
  type: ColumnType;
  default?: string;
}

export interface CsvEntitySchema {
  label: string;
  table: "keyword" | "competitor" | "seo_metric" | "gbp_metric" | "review_metric" | "conversion_metric";
  conflictKey: string | null;
  columns: CsvColumn[];
}

export const CSV_SCHEMAS: Record<string, CsvEntitySchema> = {
  keyword: {
    label: "Mots-clés",
    table: "keyword",
    conflictKey: null,
    columns: [
      { key: "keyword", required: true, type: "string" },
      { key: "search_intent", type: "string" },
      { key: "location", type: "string" },
      { key: "volume_estimate", type: "number" },
      { key: "difficulty", type: "number" },
      { key: "current_position", type: "number" },
      { key: "target_url", type: "string" },
      { key: "priority", type: "string", default: "medium" },
      { key: "status", type: "string", default: "todo" },
    ],
  },
  competitor: {
    label: "Concurrents",
    table: "competitor",
    conflictKey: null,
    columns: [
      { key: "name", required: true, type: "string" },
      { key: "city", type: "string" },
      { key: "review_count", type: "number" },
      { key: "avg_rating", type: "number" },
      { key: "offer_type", type: "string" },
      { key: "differentiation", type: "string" },
      { key: "opportunity", type: "string" },
    ],
  },
  seo_metric: {
    label: "Métriques SEO (Search Console)",
    table: "seo_metric",
    conflictKey: "therapist_id,period_date",
    columns: [
      { key: "period_date", required: true, type: "date" },
      { key: "impressions", type: "number" },
      { key: "clicks", type: "number" },
      { key: "ctr", type: "number" },
      { key: "avg_position", type: "number" },
    ],
  },
  gbp_metric: {
    label: "Métriques Google Business Profile",
    table: "gbp_metric",
    conflictKey: "therapist_id,period_date",
    columns: [
      { key: "period_date", required: true, type: "date" },
      { key: "profile_views", type: "number" },
      { key: "calls", type: "number" },
      { key: "direction_requests", type: "number" },
      { key: "website_clicks", type: "number" },
      { key: "messages", type: "number" },
      { key: "bookings", type: "number" },
    ],
  },
  review_metric: {
    label: "Métriques de confiance (avis)",
    table: "review_metric",
    conflictKey: "therapist_id,period_date",
    columns: [
      { key: "period_date", required: true, type: "date" },
      { key: "review_count", type: "number" },
      { key: "avg_rating", type: "number" },
      { key: "freshness_days", type: "number" },
      { key: "response_rate", type: "number" },
      { key: "nap_consistency", type: "boolean", default: "true" },
      { key: "contact_page_quality", type: "number" },
    ],
  },
  conversion_metric: {
    label: "Métriques de conversion",
    table: "conversion_metric",
    conflictKey: "therapist_id,period_date",
    columns: [
      { key: "period_date", required: true, type: "date" },
      { key: "booking_clicks", type: "number" },
      { key: "phone_clicks", type: "number" },
      { key: "form_submissions", type: "number" },
      { key: "messages_received", type: "number" },
    ],
  },
};

export type CsvEntityKey = keyof typeof CSV_SCHEMAS;
