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

type PdfMakeCanvasRect = {
  type: "rect";
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  color?: string;
  lineColor?: string;
  lineWidth?: number;
};

type PdfContent =
  | string
  | {
      text?: string;
      stack?: PdfContent[];
      columns?: PdfContent[];
      ul?: ({ text: string } | string)[];
      style?: string | string[];
      margin?: [number, number, number, number] | number[];
      alignment?: "left" | "center" | "right" | "justify";
      pageBreak?: "before" | "after" | "both";
      color?: string;
      canvas?: PdfMakeCanvasRect[];
    };

type PdfDocumentDefinition = {
  info?: { title?: string };
  pageSize?: string;
  pageMargins?: [number, number, number, number];
  defaultStyle?: Record<string, unknown>;
  styles?: Record<string, Record<string, unknown>>;
  content: PdfContent[];
};

const PDF_SCALE = 0.8;

const scale = (value: number) =>
  Math.round((value * PDF_SCALE + Number.EPSILON) * 100) / 100;

const PROGRESS_BAR_WIDTH = scale(200);
const PROGRESS_BAR_HEIGHT = scale(6);
const PROGRESS_BAR_RADIUS = scale(3);

const createProgressBar = (metric: ProgressMetric): PdfContent => {
  const clampedProgress = Math.min(Math.max(metric.progress, 0), 100);
  const progressWidth = (PROGRESS_BAR_WIDTH * clampedProgress) / 100;

  const baseRect: PdfMakeCanvasRect = {
    type: "rect",
    x: 0,
    y: 0,
    w: PROGRESS_BAR_WIDTH,
    h: PROGRESS_BAR_HEIGHT,
    r: PROGRESS_BAR_RADIUS,
    color: "#E5E7EB",
    lineColor: "#E5E7EB",
  };

  const progressRect: PdfMakeCanvasRect = {
    type: "rect",
    x: 0,
    y: 0,
    w: progressWidth,
    h: PROGRESS_BAR_HEIGHT,
    r: PROGRESS_BAR_RADIUS,
    color: metric.color,
    lineColor: metric.color,
  };

  return {
    canvas: [baseRect, progressRect],
    margin: [0, scale(6), 0, 0],
  };
};

export const createGrowthReportDocument = (
  data: GrowthReportData,
): PdfDocumentDefinition => {
  const totalProgress = data.progressMetrics.reduce(
    (acc, metric) => acc + metric.progress,
    0,
  );
  const averageProgress = Math.round(
    data.progressMetrics.length
      ? totalProgress / data.progressMetrics.length
      : 0,
  );

  const metricBlocks: PdfContent[] = data.progressMetrics.map((metric) => ({
    stack: [
      { text: metric.label, style: "metricTitle", color: metric.color },
      { text: metric.value, style: "metricValue" },
      { text: metric.helper, style: "metricHelper" },
      { text: metric.trend, style: "metricTrend" },
      createProgressBar(metric),
    ],
    margin: [0, 0, 0, scale(14)],
  }));

  const stageBlocks: PdfContent[] = data.stageGuides.map((stage) => ({
    stack: [
      { text: stage.stage, style: "guideStage", color: stage.color },
      { text: stage.summary, style: "guideSummary" },
      {
        ul: stage.actions.map((action) => ({ text: action })),
        margin: [0, 0, 0, scale(6)],
        style: "guideList",
      },
      { text: stage.example, style: "guideExample" },
    ],
    margin: [0, 0, 0, scale(12)],
  }));

  const diaryBlocks: PdfContent[] = data.dailyMoments.map((moment) => ({
    stack: [
      {
        columns: [
          { text: moment.time, style: "diaryHeader" },
          { text: moment.focus, style: "diaryHeader", alignment: "right" },
        ],
      },
      { text: moment.script, style: "diaryScript", margin: [0, scale(4), 0, 0] },
    ],
    margin: [0, 0, 0, scale(12)],
  }));

  const recommendationBlocks: PdfContent[] = data.recommendations.map(
    (recommendation) => ({
      stack: [
        { text: recommendation.title, style: "recommendationTitle" },
        { text: recommendation.detail, style: "recommendationDetail" },
        { text: recommendation.tip, style: "recommendationTip" },
      ],
      margin: [0, 0, 0, scale(12)],
    }),
  );

  const dailySectionHeader: PdfContent = {
    text: "오늘 나눈 따뜻한 대화들",
    style: "sectionTitle",
    margin: [0, scale(20), 0, scale(10)],
  };

  if (metricBlocks.length || stageBlocks.length) {
    (dailySectionHeader as { pageBreak?: "before" }).pageBreak = "before";
  }

  const content: PdfContent[] = [
    { text: "이번 주 우리 아이 성장 보고서 💕", style: "badge" },
    {
      text: "말로 표현하는 즐거움이 쑥쑥 자라는 중이에요!",
      style: "heading",
    },
    {
      text: "이번 주에는 아이가 어떤 말을 배웠을까요? 도담이가 관찰한 변화를 함께 살펴봐요.",
      style: "subheading",
    },
    {
      text: `평균 진행률 ${averageProgress}% 수준으로 차근차근 성장하고 있어요. 아이가 들려주는 새로운 말들을 계속 응원해 주세요!`,
      style: "sectionSubtitle",
      margin: [0, scale(12), 0, scale(20)],
    },
  ];

  if (metricBlocks.length) {
    content.push({ text: "성장 지표 한눈에 보기", style: "sectionTitle" });
    content.push(...metricBlocks);
  }

  if (stageBlocks.length) {
    content.push({
      text: "발달 단계 가이드",
      style: "sectionTitle",
      margin: [0, scale(8), 0, scale(4)],
    });
    content.push(...stageBlocks);
  }

  if (diaryBlocks.length) {
    content.push(dailySectionHeader);
    content.push(...diaryBlocks);
    content.push({
      text: "아이의 목소리는 도담 타임라인에서 언제든 다시 들어볼 수 있어요.",
      style: "sectionSubtitle",
      margin: [0, 0, 0, scale(20)],
    });
  }

  if (recommendationBlocks.length) {
    content.push({ text: "이번 주 부모님을 위한 제안", style: "sectionTitle" });
    content.push(...recommendationBlocks);
    content.push({
      text: "작고 꾸준한 대화 습관이 아이의 언어 자신감을 단단하게 키워줘요.",
      style: "sectionSubtitle",
    });
  }

  return {
    info: { title: "WeGrow-Weekly-Growth-Report" },
    pageSize: "A4",
    pageMargins: [scale(32), scale(32), scale(32), scale(32)],
    defaultStyle: {
      font: "NotoSansKR",
      fontSize: scale(12),
      color: "#1F2937",
      lineHeight: 1.45,
    },
    styles: {
      badge: { fontSize: scale(10), color: "#E17AA4" },
      heading: { fontSize: scale(20), bold: true, margin: [0, scale(6), 0, scale(6)] },
      subheading: { fontSize: scale(12), color: "#6B7280" },
      sectionTitle: {
        fontSize: scale(14),
        bold: true,
        color: "#1F2937",
        margin: [0, scale(12), 0, scale(6)],
      },
      sectionSubtitle: { fontSize: scale(10), color: "#6B7280" },
      metricTitle: { fontSize: scale(10), bold: true, margin: [0, 0, 0, scale(4)] },
      metricValue: { fontSize: scale(22), bold: true, margin: [0, 0, 0, scale(4)] },
      metricHelper: { fontSize: scale(9), color: "#6B7280" },
      metricTrend: { fontSize: scale(10), color: "#4B5563" },
      guideStage: { fontSize: scale(10), bold: true, margin: [0, 0, 0, scale(4)] },
      guideSummary: { fontSize: scale(12), bold: true, margin: [0, 0, 0, scale(6)] },
      guideList: { fontSize: scale(11), color: "#1F2937" },
      guideExample: {
        fontSize: scale(10),
        color: "#4B5563",
        margin: [0, scale(4), 0, 0],
      },
      diaryHeader: { fontSize: scale(10), bold: true, color: "#DB2777" },
      diaryScript: { fontSize: scale(11), color: "#374151" },
      recommendationTitle: {
        fontSize: scale(12),
        bold: true,
        color: "#A855F7",
        margin: [0, 0, 0, scale(6)],
      },
      recommendationDetail: {
        fontSize: scale(11),
        color: "#374151",
        margin: [0, 0, 0, scale(6)],
      },
      recommendationTip: { fontSize: scale(10), color: "#6B7280" },
    },
    content,
  };
};
