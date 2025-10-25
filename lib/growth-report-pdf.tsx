import type { ReactPdfModule } from "@/lib/react-pdf";
import type { ReactElement } from "react";

export type ProgressMetric = {
  label: string;
  value: string;
  helper: string;
  trend: string;
  progress: number;
  color: string;
};

export type DailyMoment = {
  time: string;
  script: string;
  focus: string;
};

export type StageGuide = {
  stage: string;
  color: string;
  summary: string;
  actions: string[];
  example: string;
};

export type Recommendation = {
  title: string;
  detail: string;
  tip: string;
};

export type GrowthReportData = {
  progressMetrics: ProgressMetric[];
  dailyMoments: DailyMoment[];
  stageGuides: StageGuide[];
  recommendations: Recommendation[];
};

let fontsRegistered = false;

const registerFonts = (reactPdf: ReactPdfModule) => {
  if (fontsRegistered) {
    return;
  }

  const { Font } = reactPdf;

  Font.register({
    family: "NotoSansKR",
    fonts: [
      {
        src: "https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.otf",
        fontWeight: "normal",
      },
      {
        src: "https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.otf",
        fontWeight: "700",
      },
    ],
  });

  Font.registerHyphenation?.((word) => [word]);
  fontsRegistered = true;
};

const PDF_SCALE = 0.8;
const scale = (value: number) => value * PDF_SCALE;

export const createGrowthReportDocument = (
  reactPdf: ReactPdfModule,
  data: GrowthReportData,
): ReactElement => {
  registerFonts(reactPdf);

  const { Document, Page, Text, View, StyleSheet } = reactPdf;

  const styles = StyleSheet.create({
    page: {
      padding: scale(32),
      backgroundColor: "#F8F6FF",
      fontFamily: "NotoSansKR",
      fontSize: scale(12),
      color: "#1F2937",
      lineHeight: 1.45,
    },
    section: {
      marginBottom: scale(20),
      padding: scale(16),
      backgroundColor: "#FFFFFF",
      borderRadius: scale(12),
      borderWidth: scale(1),
      borderColor: "#E8E5F9",
    },
    heroSection: {
      marginBottom: scale(20),
      padding: scale(20),
      backgroundColor: "#F4E5FB",
      borderRadius: scale(16),
    },
    badge: {
      fontSize: scale(10),
      color: "#E17AA4",
      marginBottom: scale(6),
    },
    heading: {
      fontSize: scale(20),
      fontWeight: 700,
      marginBottom: scale(6),
      color: "#1F2937",
    },
    subheading: {
      fontSize: scale(12),
      color: "#6B7280",
    },
    metricsRow: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: scale(14),
    },
    metricCard: {
      flexGrow: 1,
      minWidth: scale(150),
      borderRadius: scale(12),
      borderWidth: scale(1),
      borderColor: "#E3E1F9",
      backgroundColor: "#FFFFFF",
      padding: scale(12),
      marginRight: scale(10),
      marginBottom: scale(10),
    },
    metricTitle: {
      fontSize: scale(10),
      color: "#7C3AED",
      marginBottom: scale(4),
      fontWeight: 600,
    },
    metricValue: {
      fontSize: scale(22),
      fontWeight: 700,
      marginBottom: scale(4),
    },
    metricHelper: {
      fontSize: scale(9),
      color: "#6B7280",
    },
    metricTrend: {
      fontSize: scale(10),
      color: "#4B5563",
      marginTop: scale(4),
    },
    progressBar: {
      display: "flex",
      flexDirection: "row",
      height: scale(6),
      borderRadius: scale(9999),
      overflow: "hidden",
      backgroundColor: "#E5E7EB",
      marginTop: scale(6),
    },
    sectionTitle: {
      fontSize: scale(14),
      fontWeight: 700,
      color: "#1F2937",
      marginBottom: scale(8),
    },
    sectionSubtitle: {
      fontSize: scale(10),
      color: "#6B7280",
      marginBottom: scale(12),
    },
    guideCard: {
      borderRadius: scale(12),
      borderWidth: scale(1),
      borderColor: "#E8E5F9",
      padding: scale(12),
      marginBottom: scale(10),
    },
    guideStage: {
      fontSize: scale(10),
      fontWeight: 700,
      marginBottom: scale(4),
    },
    guideSummary: {
      fontSize: scale(12),
      fontWeight: 600,
      marginBottom: scale(6),
    },
    guideListItem: {
      fontSize: scale(11),
      marginBottom: scale(4),
    },
    guideExample: {
      marginTop: scale(8),
      padding: scale(10),
      borderRadius: scale(10),
      borderWidth: scale(1),
      borderColor: "#F4D7E8",
      backgroundColor: "#FFF7FB",
      fontSize: scale(10),
    },
    diaryItem: {
      borderRadius: scale(12),
      borderWidth: scale(1),
      borderColor: "#F4D7E8",
      backgroundColor: "#FFF7FB",
      padding: scale(12),
      marginBottom: scale(10),
    },
    diaryHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: scale(6),
      fontSize: scale(10),
      fontWeight: 600,
      color: "#DB2777",
    },
    diaryScript: {
      fontSize: scale(11),
      color: "#374151",
    },
    recommendationCard: {
      borderRadius: scale(12),
      borderWidth: scale(1),
      borderColor: "#E7D7FA",
      backgroundColor: "#FFFFFF",
      padding: scale(12),
      marginBottom: scale(10),
    },
    recommendationTitle: {
      fontSize: scale(12),
      fontWeight: 700,
      color: "#A855F7",
      marginBottom: scale(6),
    },
    recommendationDetail: {
      fontSize: scale(11),
      color: "#374151",
      marginBottom: scale(6),
    },
    recommendationTip: {
      fontSize: scale(10),
      color: "#6B7280",
    },
  });

  const totalProgress = data.progressMetrics.reduce(
    (acc, metric) => acc + metric.progress,
    0,
  );
  const averageProgress = Math.round(
    data.progressMetrics.length
      ? totalProgress / data.progressMetrics.length
      : 0,
  );

  return (
    <Document title="WeGrow-Weekly-Growth-Report">
      <Page size="A4" style={styles.page}>
        <View style={styles.heroSection}>
          <Text style={styles.badge}>이번 주 우리 아이 성장 보고서 💕</Text>
          <Text style={styles.heading}>말로 표현하는 즐거움이 쑥쑥 자라는 중이에요!</Text>
          <Text style={styles.subheading}>
            이번 주에는 아이가 어떤 말을 배웠을까요? 도담이가 관찰한 변화를 함께
            살펴봐요.
          </Text>
          <View style={styles.metricsRow}>
            {data.progressMetrics.map((metric) => (
              <View key={metric.label} style={styles.metricCard}>
                <Text style={styles.metricTitle}>{metric.label}</Text>
                <Text style={[styles.metricValue, { color: "#111827" }]}>
                  {metric.value}
                </Text>
                <Text style={styles.metricHelper}>{metric.helper}</Text>
                <Text style={styles.metricTrend}>{metric.trend}</Text>
                <View style={styles.progressBar}>
                  <View
                    style={{
                      backgroundColor: metric.color,
                      flexGrow: Math.max(metric.progress, 0),
                    }}
                  />
                  {metric.progress < 100 && (
                    <View
                      style={{
                        flexGrow: Math.max(100 - metric.progress, 0),
                      }}
                    />
                  )}
                </View>
              </View>
            ))}
          </View>
          <Text style={styles.sectionSubtitle}>
            평균 진행률 {averageProgress}% 수준으로 차근차근 성장하고 있어요. 아이가
            들려주는 새로운 말들을 계속 응원해 주세요!
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>성장 지표 한눈에 보기</Text>
          {data.progressMetrics.map((metric) => (
            <View key={metric.label} style={styles.guideCard}>
              <Text style={[styles.metricTitle, { color: metric.color }]}>
                {metric.label}
              </Text>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricHelper}>{metric.helper}</Text>
              <Text style={styles.metricTrend}>{metric.trend}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>발달 단계 가이드</Text>
          {data.stageGuides.map((stage) => (
            <View key={stage.stage} style={styles.guideCard}>
              <Text style={[styles.guideStage, { color: stage.color }]}>
                {stage.stage}
              </Text>
              <Text style={styles.guideSummary}>{stage.summary}</Text>
              {stage.actions.map((action) => (
                <Text key={action} style={styles.guideListItem}>
                  • {action}
                </Text>
              ))}
              <Text style={styles.guideExample}>{stage.example}</Text>
            </View>
          ))}
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>오늘 나눈 따뜻한 대화들</Text>
          {data.dailyMoments.map((moment) => (
            <View key={moment.time} style={styles.diaryItem}>
              <View style={styles.diaryHeader}>
                <Text>{moment.time}</Text>
                <Text>{moment.focus}</Text>
              </View>
              <Text style={styles.diaryScript}>{moment.script}</Text>
            </View>
          ))}
          <Text style={styles.sectionSubtitle}>
            아이의 목소리는 도담 타임라인에서 언제든 다시 들어볼 수 있어요.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>이번 주 부모님을 위한 제안</Text>
          {data.recommendations.map((recommendation) => (
            <View key={recommendation.title} style={styles.recommendationCard}>
              <Text style={styles.recommendationTitle}>{recommendation.title}</Text>
              <Text style={styles.recommendationDetail}>{recommendation.detail}</Text>
              <Text style={styles.recommendationTip}>{recommendation.tip}</Text>
            </View>
          ))}
          <Text style={styles.sectionSubtitle}>
            작고 꾸준한 대화 습관이 아이의 언어 자신감을 단단하게 키워줘요.
          </Text>
        </View>
      </Page>
    </Document>
  );
};
