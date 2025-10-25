import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// 타입 정의
type ProgressMetric = {
  label: string;
  value: string;
  helper: string;
  trend: string;
  progress: number;
  color: string;
};

type DailyMoment = {
  time: string;
  script: string;
  focus: string;
};

type StageGuide = {
  stage: string;
  color: string;
  summary: string;
  actions: string[];
  example: string;
};

type Recommendation = {
  title: string;
  detail: string;
  tip: string;
};

type GrowthReportPDFProps = {
  progressMetrics: ProgressMetric[];
  dailyMoments: DailyMoment[];
  stageGuides: StageGuide[];
  recommendations: Recommendation[];
};

// 스타일 정의
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
    fontFamily: "NotoSansKR",
  },
  headerBox: {
    backgroundColor: "#FDE4EC",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#F4D7E8",
  },
  badge: {
    fontSize: 12,
    color: "#E17AA4",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 6,
  },
  subheading: {
    fontSize: 11,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 1.6,
  },
  progressBox: {
    backgroundColor: "#F4E5FB",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E7D7FA",
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 10,
    color: "#A678E3",
    fontWeight: "bold",
  },
  progressValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#A678E3",
  },
  progressSubtext: {
    fontSize: 9,
    color: "#6B7280",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 16,
    marginBottom: 12,
  },
  metricBox: {
    backgroundColor: "#FFF7FB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  metricHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: "bold",
  },
  metricPercent: {
    fontSize: 11,
    fontWeight: "bold",
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 2,
  },
  metricHelper: {
    fontSize: 9,
    color: "#6B7280",
    marginBottom: 8,
  },
  progressBar: {
    width: "100%",
    height: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 3,
    marginBottom: 6,
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
  },
  metricTrend: {
    fontSize: 9,
    color: "#4B5563",
  },
  stageBox: {
    backgroundColor: "#F4E5FB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E7D7FA",
  },
  stageStage: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  stageSummary: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
    lineHeight: 1.5,
  },
  actionItem: {
    fontSize: 10,
    color: "#374151",
    marginBottom: 4,
    lineHeight: 1.6,
  },
  exampleBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  exampleText: {
    fontSize: 9,
    color: "#4B5563",
    lineHeight: 1.5,
  },
  diaryBox: {
    backgroundColor: "#FFF7FB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F4D7E8",
  },
  diaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  diaryTime: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#DB2777",
  },
  diaryFocus: {
    fontSize: 9,
    color: "#E17AA4",
  },
  diaryScript: {
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.6,
  },
  recommendBox: {
    backgroundColor: "#F4E5FB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E7D7FA",
  },
  recommendTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#A855F7",
    marginBottom: 6,
  },
  recommendDetail: {
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.6,
    marginBottom: 8,
  },
  tipBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#A678E3",
  },
  tipText: {
    fontSize: 9,
    color: "#7C3AED",
  },
  infoBox: {
    backgroundColor: "#E0F1FF",
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#7EC4CF",
  },
  infoText: {
    fontSize: 9,
    color: "#6B7280",
  },
});

// 한글 폰트 등록 - Google Fonts API 사용
Font.register({
  family: "NotoSansKR",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/nanumgothic/v23/PN_3Rfi-oW3hYwmKDpxS7F_z_tLfxno73g.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/nanumgothic/v23/PN_oRfi-oW3hYwmKDpxS7F_LQv37zlEn14YEUQ.ttf",
      fontWeight: 700,
    },
  ],
});

export const GrowthReportPDF = ({
  progressMetrics,
  dailyMoments,
  stageGuides,
  recommendations,
}: GrowthReportPDFProps) => {
  const totalProgress = progressMetrics.reduce(
    (acc, metric) => acc + metric.progress,
    0
  );
  const averageProgress = Math.round(
    progressMetrics.length ? totalProgress / progressMetrics.length : 0
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* 헤더 */}
        <View style={styles.headerBox}>
          <Text style={styles.badge}>이번 주 우리 아이 성장 보고서 💕</Text>
          <Text style={styles.heading}>
            말로 표현하는 즐거움이 쑥쑥 자라는 중이에요!
          </Text>
          <Text style={styles.subheading}>
            이번 주에는 아이가 어떤 말을 배웠을까요? 도담이가 관찰한 변화를
            함께 살펴봐요.
          </Text>
        </View>

        {/* 전체 진행률 */}
        <View style={styles.progressBox}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressTitle}>전체 성장 진행률</Text>
              <Text style={styles.progressValue}>{averageProgress}%</Text>
            </View>
            <Text style={{ fontSize: 32 }}>📈</Text>
          </View>
          <Text style={styles.progressSubtext}>
            아이가 들려주는 새로운 말들을 계속 응원해 주세요!
          </Text>
        </View>

        {/* 성장 지표 */}
        {progressMetrics.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>📊 성장 지표 한눈에 보기</Text>
            {progressMetrics.map((metric, index) => (
              <View
                key={index}
                style={[
                  styles.metricBox,
                  { borderColor: metric.color },
                ]}
              >
                <View style={styles.metricHeader}>
                  <Text style={[styles.metricLabel, { color: metric.color }]}>
                    {metric.label}
                  </Text>
                  <Text style={[styles.metricPercent, { color: metric.color }]}>
                    {metric.progress}%
                  </Text>
                </View>
                <Text style={styles.metricValue}>{metric.value}</Text>
                <Text style={styles.metricHelper}>{metric.helper}</Text>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${metric.progress}%`,
                        backgroundColor: metric.color,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.metricTrend}>{metric.trend}</Text>
              </View>
            ))}
          </>
        )}

        {/* 발달 단계 가이드 */}
        {stageGuides.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>🎯 발달 단계 가이드</Text>
            {stageGuides.map((stage, index) => (
              <View key={index} style={styles.stageBox}>
                <Text style={[styles.stageStage, { color: stage.color }]}>
                  📍 {stage.stage}
                </Text>
                <Text style={styles.stageSummary}>{stage.summary}</Text>
                {stage.actions.map((action, idx) => (
                  <Text key={idx} style={styles.actionItem}>
                    • {action}
                  </Text>
                ))}
                <View style={styles.exampleBox}>
                  <Text style={styles.exampleText}>{stage.example}</Text>
                </View>
              </View>
            ))}
          </>
        )}
      </Page>

      {/* 두 번째 페이지 */}
      <Page size="A4" style={styles.page}>
        {/* 대화 일기 */}
        {dailyMoments.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>💬 오늘 나눈 따뜻한 대화들</Text>
            {dailyMoments.map((moment, index) => (
              <View key={index} style={styles.diaryBox}>
                <View style={styles.diaryHeader}>
                  <Text style={styles.diaryTime}>🕐 {moment.time}</Text>
                  <Text style={styles.diaryFocus}>{moment.focus}</Text>
                </View>
                <Text style={styles.diaryScript}>{moment.script}</Text>
              </View>
            ))}
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                💡 아이의 목소리는 도담 타임라인에서 언제든 다시 들어볼 수
                있어요.
              </Text>
            </View>
          </>
        )}

        {/* 추천 사항 */}
        {recommendations.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>💝 이번 주 부모님을 위한 제안</Text>
            {recommendations.map((item, index) => (
              <View key={index} style={styles.recommendBox}>
                <Text style={styles.recommendTitle}>{item.title}</Text>
                <Text style={styles.recommendDetail}>{item.detail}</Text>
                <View style={styles.tipBox}>
                  <Text style={styles.tipText}>{item.tip}</Text>
                </View>
              </View>
            ))}
            <View style={[styles.infoBox, { backgroundColor: "#FFF7FB", borderColor: "#F4D7E8" }]}>
              <Text style={styles.infoText}>
                ✨ 작고 꾸준한 대화 습관이 아이의 언어 자신감을 단단하게 키워줘요.
              </Text>
            </View>
          </>
        )}
      </Page>
    </Document>
  );
};
