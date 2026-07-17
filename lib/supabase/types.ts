export type Priority = "low" | "medium" | "high";
export type ItemStatus = "todo" | "in_progress" | "done";

export type TherapistProfile = {
  id: string;
  user_id: string;
  cabinet_name: string;
  therapist_name: string | null;
  specialty: string | null;
  city: string | null;
  target_area: string | null;
  address: string | null;
  website_url: string | null;
  gbp_url: string | null;
  booking_url: string | null;
  phone: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
};

export type Keyword = {
  id: string;
  therapist_id: string;
  keyword: string;
  search_intent: string | null;
  location: string | null;
  volume_estimate: number | null;
  difficulty: number | null;
  current_position: number | null;
  target_url: string | null;
  priority: Priority;
  status: ItemStatus;
  updated_at: string;
};

export type Competitor = {
  id: string;
  therapist_id: string;
  name: string;
  website_url: string | null;
  city: string | null;
  keyword_positions: Record<string, number>;
  review_count: number | null;
  avg_rating: number | null;
  offer_type: string | null;
  differentiation: string | null;
  opportunity: string | null;
  updated_at: string;
};

export type SeoMetric = {
  id: string;
  therapist_id: string;
  period_date: string;
  impressions: number;
  clicks: number;
  ctr: number;
  avg_position: number;
};

export type GbpMetric = {
  id: string;
  therapist_id: string;
  period_date: string;
  profile_views: number;
  calls: number;
  direction_requests: number;
  website_clicks: number;
  messages: number;
  bookings: number;
};

export type ReviewMetric = {
  id: string;
  therapist_id: string;
  period_date: string;
  review_count: number;
  avg_rating: number;
  freshness_days: number;
  response_rate: number;
  nap_consistency: boolean;
  contact_page_quality: number;
};

export type ConversionMetric = {
  id: string;
  therapist_id: string;
  period_date: string;
  booking_clicks: number;
  phone_clicks: number;
  form_submissions: number;
  messages_received: number;
};

export type ActionImpact = "low" | "medium" | "high";

export type ActionItem = {
  id: string;
  therapist_id: string;
  title: string;
  category: string | null;
  impact_estimate: ActionImpact;
  status: ItemStatus;
  created_at: string;
};

export type ReportExport = {
  id: string;
  therapist_id: string;
  type: "csv" | "pdf";
  created_at: string;
};

export type TherapistCollaborator = {
  id: string;
  therapist_id: string;
  user_id: string | null;
  invited_by: string;
  invite_token: string;
  accepted_at: string | null;
  created_at: string;
};

type Table<Row, Insert> = {
  Row: Row;
  Insert: Insert;
  Update: Partial<Row>;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      profiles: Table<
        { id: string; email: string; full_name: string | null; created_at: string },
        { id: string; email: string; full_name?: string | null; created_at?: string }
      >;
      therapist_profile: Table<TherapistProfile, Partial<TherapistProfile> & { user_id: string; cabinet_name: string }>;
      keyword: Table<Keyword, Partial<Keyword> & { therapist_id: string; keyword: string }>;
      competitor: Table<Competitor, Partial<Competitor> & { therapist_id: string; name: string }>;
      seo_metric: Table<SeoMetric, Partial<SeoMetric> & { therapist_id: string; period_date: string }>;
      gbp_metric: Table<GbpMetric, Partial<GbpMetric> & { therapist_id: string; period_date: string }>;
      review_metric: Table<ReviewMetric, Partial<ReviewMetric> & { therapist_id: string; period_date: string }>;
      conversion_metric: Table<ConversionMetric, Partial<ConversionMetric> & { therapist_id: string; period_date: string }>;
      action_item: Table<ActionItem, Partial<ActionItem> & { therapist_id: string; title: string }>;
      report_export: Table<ReportExport, Partial<ReportExport> & { therapist_id: string; type: "csv" | "pdf" }>;
      therapist_collaborator: Table<
        TherapistCollaborator,
        Partial<TherapistCollaborator> & { therapist_id: string; invited_by: string }
      >;
    };
    Views: Record<string, never>;
    Functions: {
      get_invite_details: {
        Args: { p_token: string };
        Returns: { therapist_id: string; cabinet_name: string; accepted: boolean }[];
      };
      accept_invite: {
        Args: { p_token: string };
        Returns: string;
      };
    };
  };
};
