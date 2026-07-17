import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { TherapistProfile, Keyword, Competitor, ActionItem } from "@/lib/supabase/types";
import type { ScoreResult } from "@/lib/scoring";

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 11, fontFamily: "Helvetica" },
  title: { fontSize: 18, marginBottom: 4 },
  subtitle: { fontSize: 11, color: "#64748b", marginBottom: 20 },
  sectionTitle: { fontSize: 13, marginTop: 18, marginBottom: 8, fontFamily: "Helvetica-Bold" },
  scoresRow: { flexDirection: "row", gap: 16 },
  scoreBox: { flex: 1, padding: 10, border: "1 solid #e2e8f0", borderRadius: 4 },
  scoreLabel: { fontSize: 9, color: "#64748b" },
  scoreValue: { fontSize: 22, fontFamily: "Helvetica-Bold" },
  row: { flexDirection: "row", borderBottom: "1 solid #e2e8f0", paddingVertical: 4 },
  cell: { flex: 1 },
  emptyText: { color: "#94a3b8", fontSize: 10 },
});

export function DashboardReport({
  therapist,
  visibilityScore,
  trustScore,
  conversionScore,
  topKeywords,
  topCompetitors,
  topActions,
  generatedAt,
}: {
  therapist: TherapistProfile;
  visibilityScore: ScoreResult;
  trustScore: ScoreResult;
  conversionScore: ScoreResult;
  topKeywords: Keyword[];
  topCompetitors: Competitor[];
  topActions: ActionItem[];
  generatedAt: string;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{therapist.cabinet_name}</Text>
        <Text style={styles.subtitle}>
          Résumé SEO local — généré le {generatedAt}
          {therapist.city ? ` — ${therapist.city}` : ""}
        </Text>

        <View style={styles.scoresRow}>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>Visibilité</Text>
            <Text style={styles.scoreValue}>{visibilityScore.value}</Text>
          </View>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>Confiance</Text>
            <Text style={styles.scoreValue}>{trustScore.value}</Text>
          </View>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>Conversion</Text>
            <Text style={styles.scoreValue}>{conversionScore.value}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Top mots-clés</Text>
        {topKeywords.length === 0 ? (
          <Text style={styles.emptyText}>Aucun mot-clé enregistré.</Text>
        ) : (
          topKeywords.map((k) => (
            <View key={k.id} style={styles.row}>
              <Text style={styles.cell}>{k.keyword}</Text>
              <Text style={styles.cell}>{k.location ?? "—"}</Text>
              <Text style={styles.cell}>Position {k.current_position ?? "—"}</Text>
            </View>
          ))
        )}

        <Text style={styles.sectionTitle}>Top concurrents</Text>
        {topCompetitors.length === 0 ? (
          <Text style={styles.emptyText}>Aucun concurrent enregistré.</Text>
        ) : (
          topCompetitors.map((c) => (
            <View key={c.id} style={styles.row}>
              <Text style={styles.cell}>{c.name}</Text>
              <Text style={styles.cell}>{c.city ?? "—"}</Text>
              <Text style={styles.cell}>
                {c.review_count ?? 0} avis · {c.avg_rating ?? "—"}★
              </Text>
            </View>
          ))
        )}

        <Text style={styles.sectionTitle}>Actions prioritaires</Text>
        {topActions.length === 0 ? (
          <Text style={styles.emptyText}>Aucune action en attente.</Text>
        ) : (
          topActions.map((a) => (
            <View key={a.id} style={styles.row}>
              <Text style={styles.cell}>{a.title}</Text>
              <Text style={styles.cell}>Impact {a.impact_estimate}</Text>
              <Text style={styles.cell}>{a.status}</Text>
            </View>
          ))
        )}
      </Page>
    </Document>
  );
}
