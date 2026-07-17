import type { ConversionMetric, GbpMetric } from "@/lib/supabase/types";
import { clamp, weightedAverage, latestByPeriod, type ScoreResult } from "./types";

export function computeConversionScore(
  conversionMetrics: ConversionMetric[],
  gbpMetrics: GbpMetric[]
): ScoreResult {
  const latestConversion = latestByPeriod(conversionMetrics);
  const latestGbp = latestByPeriod(gbpMetrics);

  const totalActions = latestConversion
    ? latestConversion.booking_clicks +
      latestConversion.phone_clicks +
      latestConversion.form_submissions +
      latestConversion.messages_received
    : 0;

  const actionsValue = clamp((totalActions / 20) * 100);
  const bookingsValue = latestGbp ? clamp((latestGbp.bookings / 10) * 100) : 0;

  const components = [
    { label: "Clics réservation, tél., formulaires, messages", value: Math.round(actionsValue), weight: 60 },
    { label: "Réservations Google Business Profile", value: Math.round(bookingsValue), weight: 40 },
  ];

  return { value: weightedAverage(components), components };
}
