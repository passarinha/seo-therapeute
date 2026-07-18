"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { syncActionPlan } from "@/lib/actions/syncActionPlan";

function num(formData: FormData, key: string) {
  const v = formData.get(key);
  return v ? Number(v) : 0;
}

export async function upsertMonthlyMetrics(therapistId: string, formData: FormData) {
  const periodDate = String(formData.get("period_date") ?? "");
  if (!periodDate) throw new Error("period_date requis");

  const supabase = await createClient();

  const seo = {
    therapist_id: therapistId,
    period_date: periodDate,
    impressions: num(formData, "seo_impressions"),
    clicks: num(formData, "seo_clicks"),
    ctr: num(formData, "seo_ctr"),
    avg_position: num(formData, "seo_avg_position"),
  };

  const gbp = {
    therapist_id: therapistId,
    period_date: periodDate,
    profile_views: num(formData, "gbp_profile_views"),
    calls: num(formData, "gbp_calls"),
    direction_requests: num(formData, "gbp_direction_requests"),
    website_clicks: num(formData, "gbp_website_clicks"),
    messages: num(formData, "gbp_messages"),
    bookings: num(formData, "gbp_bookings"),
  };

  const review = {
    therapist_id: therapistId,
    period_date: periodDate,
    review_count: num(formData, "review_count"),
    avg_rating: num(formData, "review_avg_rating"),
    freshness_days: num(formData, "review_freshness_days"),
    response_rate: num(formData, "review_response_rate"),
    nap_consistency: formData.get("review_nap_consistency") === "on",
    contact_page_quality: num(formData, "review_contact_page_quality"),
  };

  const conversion = {
    therapist_id: therapistId,
    period_date: periodDate,
    booking_clicks: num(formData, "conv_booking_clicks"),
    phone_clicks: num(formData, "conv_phone_clicks"),
    form_submissions: num(formData, "conv_form_submissions"),
    messages_received: num(formData, "conv_messages_received"),
  };

  const [seoRes, gbpRes, reviewRes, conversionRes] = await Promise.all([
    supabase.from("seo_metric").upsert(seo, { onConflict: "therapist_id,period_date" }),
    supabase.from("gbp_metric").upsert(gbp, { onConflict: "therapist_id,period_date" }),
    supabase.from("review_metric").upsert(review, { onConflict: "therapist_id,period_date" }),
    supabase
      .from("conversion_metric")
      .upsert(conversion, { onConflict: "therapist_id,period_date" }),
  ]);

  if (seoRes.error) throw seoRes.error;
  if (gbpRes.error) throw gbpRes.error;
  if (reviewRes.error) throw reviewRes.error;
  if (conversionRes.error) throw conversionRes.error;

  revalidatePath(`/therapists/${therapistId}/performance`);
  revalidatePath(`/therapists/${therapistId}`);
  after(() => syncActionPlan(therapistId));
  redirect(`/therapists/${therapistId}/performance`);
}

export async function deleteMonthlyMetrics(therapistId: string, periodDate: string) {
  const supabase = await createClient();

  const [seoRes, gbpRes, reviewRes, conversionRes] = await Promise.all([
    supabase.from("seo_metric").delete().eq("therapist_id", therapistId).eq("period_date", periodDate),
    supabase.from("gbp_metric").delete().eq("therapist_id", therapistId).eq("period_date", periodDate),
    supabase.from("review_metric").delete().eq("therapist_id", therapistId).eq("period_date", periodDate),
    supabase
      .from("conversion_metric")
      .delete()
      .eq("therapist_id", therapistId)
      .eq("period_date", periodDate),
  ]);

  if (seoRes.error) throw seoRes.error;
  if (gbpRes.error) throw gbpRes.error;
  if (reviewRes.error) throw reviewRes.error;
  if (conversionRes.error) throw conversionRes.error;

  revalidatePath(`/therapists/${therapistId}/performance`);
  redirect(`/therapists/${therapistId}/performance`);
}
