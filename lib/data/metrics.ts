import { createClient } from "@/lib/supabase/server";
import type {
  SeoMetric,
  GbpMetric,
  ReviewMetric,
  ConversionMetric,
} from "@/lib/supabase/types";

export interface PeriodFilter {
  from?: string;
  to?: string;
}

async function listMetric<T>(
  table: "seo_metric" | "gbp_metric" | "review_metric" | "conversion_metric",
  therapistId: string,
  filter: PeriodFilter = {}
): Promise<T[]> {
  const supabase = await createClient();
  let query = supabase
    .from(table)
    .select("*")
    .eq("therapist_id", therapistId)
    .order("period_date", { ascending: true });

  if (filter.from) query = query.gte("period_date", filter.from);
  if (filter.to) query = query.lte("period_date", filter.to);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as T[];
}

export const listSeoMetrics = (therapistId: string, filter?: PeriodFilter) =>
  listMetric<SeoMetric>("seo_metric", therapistId, filter);

export const listGbpMetrics = (therapistId: string, filter?: PeriodFilter) =>
  listMetric<GbpMetric>("gbp_metric", therapistId, filter);

export const listReviewMetrics = (therapistId: string, filter?: PeriodFilter) =>
  listMetric<ReviewMetric>("review_metric", therapistId, filter);

export const listConversionMetrics = (therapistId: string, filter?: PeriodFilter) =>
  listMetric<ConversionMetric>("conversion_metric", therapistId, filter);

export async function getMonthlyMetrics(therapistId: string, periodDate: string) {
  const supabase = await createClient();
  const [seo, gbp, review, conversion] = await Promise.all([
    supabase
      .from("seo_metric")
      .select("*")
      .eq("therapist_id", therapistId)
      .eq("period_date", periodDate)
      .maybeSingle(),
    supabase
      .from("gbp_metric")
      .select("*")
      .eq("therapist_id", therapistId)
      .eq("period_date", periodDate)
      .maybeSingle(),
    supabase
      .from("review_metric")
      .select("*")
      .eq("therapist_id", therapistId)
      .eq("period_date", periodDate)
      .maybeSingle(),
    supabase
      .from("conversion_metric")
      .select("*")
      .eq("therapist_id", therapistId)
      .eq("period_date", periodDate)
      .maybeSingle(),
  ]);

  if (seo.error) throw seo.error;
  if (gbp.error) throw gbp.error;
  if (review.error) throw review.error;
  if (conversion.error) throw conversion.error;

  return {
    seo: seo.data as SeoMetric | null,
    gbp: gbp.data as GbpMetric | null,
    review: review.data as ReviewMetric | null,
    conversion: conversion.data as ConversionMetric | null,
  };
}

export async function listPeriods(therapistId: string): Promise<string[]> {
  const seo = await listSeoMetrics(therapistId);
  return Array.from(new Set(seo.map((m) => m.period_date))).sort();
}
