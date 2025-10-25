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
      background?: string;
      fillColor?: string;
      width?: string | number;
      fontSize?: number;
      bold?: boolean;
      table?: {
        widths?: (string | number)[];
        body: PdfContent[][];
      };
      layout?: string | {
        hLineWidth?: () => number;
        vLineWidth?: () => number;
        hLineColor?: () => string;
        vLineColor?: () => string;
        fillColor?: (rowIndex: number) => string | null;
        paddingLeft?: () => number;
        paddingRight?: () => number;
        paddingTop?: () => number;
        paddingBottom?: () => number;
      };
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

const PROGRESS_BAR_WIDTH = scale(250);
const PROGRESS_BAR_HEIGHT = scale(8);
const PROGRESS_BAR_RADIUS = scale(4);

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
    color: "#F3F4F6",
    lineColor: "#E5E7EB",
    lineWidth: 0.5,
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
    margin: [0, scale(8), 0, 0],
  };
};

const createColoredBox = (content: PdfContent[], color: string, borderColor?: string): PdfContent => {
  return {
    table: {
      widths: ['*'],
      body: [[{ stack: content, margin: [scale(12), scale(10), scale(12), scale(10)] }]]
    },
    layout: {
      hLineWidth: () => 1,
      vLineWidth: () => 1,
      hLineColor: () => borderColor || color,
      vLineColor: () => borderColor || color,
      fillColor: () => `${color}15`,
      paddingLeft: () => 0,
      paddingRight: () => 0,
      paddingTop: () => 0,
      paddingBottom: () => 0,
    },
    margin: [0, 0, 0, scale(12)],
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

  const metricBlocks: PdfContent[] = data.progressMetrics.map((metric) => 
    createColoredBox([
      { 
        columns: [
          { text: metric.label, style: "metricTitle", color: metric.color, width: '*' },
          { text: `${metric.progress}%`, style: "metricValue", alignment: 'right', width: 'auto' }
        ]
      },
      { text: metric.value, style: "metricValueLarge", margin: [0, scale(4), 0, scale(2)] },
      { text: metric.helper, style: "metricHelper" },
      createProgressBar(metric),
      { text: metric.trend, style: "metricTrend", margin: [0, scale(6), 0, 0] },
    ], metric.color, metric.color)
  );

  const stageBlocks: PdfContent[] = data.stageGuides.map((stage) =>
    createColoredBox([
      { text: `📍 ${stage.stage}`, style: "guideStage", color: stage.color },
      { text: stage.summary, style: "guideSummary", margin: [0, scale(4), 0, scale(8)] },
      {
        ul: stage.actions.map((action) => ({ text: action })),
        style: "guideList",
        margin: [0, 0, 0, scale(8)],
      },
      createColoredBox([
        { text: stage.example, style: "guideExample" }
      ], '#FFFFFF', '#E5E7EB'),
    ], stage.color, stage.color)
  );

  const diaryBlocks: PdfContent[] = data.dailyMoments.map((moment) =>
    createColoredBox([
      {
        columns: [
          { text: `🕐 ${moment.time}`, style: "diaryHeader", width: '*' },
          { text: moment.focus, style: "diaryFocus", alignment: 'right', width: 'auto' }
        ]
      },
      { text: moment.script, style: "diaryScript", margin: [0, scale(6), 0, 0] },
    ], '#FFF7FB', '#F4D7E8')
  );

  const recommendationBlocks: PdfContent[] = data.recommendations.map(
    (recommendation) =>
      createColoredBox([
        { text: recommendation.title, style: "recommendationTitle" },
        { text: recommendation.detail, style: "recommendationDetail", margin: [0, scale(4), 0, scale(6)] },
        createColoredBox([
          { text: recommendation.tip, style: "recommendationTip" }
        ], '#FFFFFF', '#A678E3'),
      ], '#F4E5FB', '#E7D7FA')
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
    // 헤더 박스
    createColoredBox([
      { text: "이번 주 우리 아이 성장 보고서 💕", style: "badge", alignment: 'center' },
      {
        text: "말로 표현하는 즐거움이 쑥쑥 자라는 중이에요!",
        style: "heading",
        alignment: 'center',
        margin: [0, scale(6), 0, scale(4)],
      },
      {
        text: "이번 주에는 아이가 어떤 말을 배웠을까요? 도담이가 관찰한 변화를 함께 살펴봐요.",
        style: "subheading",
        alignment: 'center',
      },
    ], '#FDE4EC', '#F4D7E8'),
    
    // 평균 진행률 카드
    createColoredBox([
      {
        columns: [
          {
            width: '*',
            stack: [
              { text: '전체 성장 진행률', style: 'sectionSubtitle', color: '#A678E3' },
              { text: `${averageProgress}%`, style: 'metricValueLarge', color: '#A678E3', margin: [0, scale(4), 0, 0] },
            ]
          },
          {
            width: 'auto',
            text: '📈',
            fontSize: scale(32),
            margin: [0, scale(4), 0, 0],
          }
        ]
      },
      { text: '아이가 들려주는 새로운 말들을 계속 응원해 주세요!', style: 'sectionSubtitle', margin: [0, scale(8), 0, 0] },
    ], '#F4E5FB', '#E7D7FA'),
  ];

  if (metricBlocks.length) {
    content.push({ 
      text: "📊 성장 지표 한눈에 보기", 
      style: "sectionTitle",
      margin: [0, scale(8), 0, scale(12)],
    });
    content.push(...metricBlocks);
  }

  if (stageBlocks.length) {
    content.push({
      text: "🎯 발달 단계 가이드",
      style: "sectionTitle",
      margin: [0, scale(16), 0, scale(12)],
    });
    content.push(...stageBlocks);
  }

  if (diaryBlocks.length) {
    content.push({
      text: "💬 오늘 나눈 따뜻한 대화들",
      style: "sectionTitle",
      margin: [0, scale(16), 0, scale(12)],
      pageBreak: metricBlocks.length || stageBlocks.length ? "before" : undefined,
    });
    content.push(...diaryBlocks);
    content.push(createColoredBox([
      { text: "💡 아이의 목소리는 도담 타임라인에서 언제든 다시 들어볼 수 있어요.", style: "sectionSubtitle" }
    ], '#E0F1FF', '#7EC4CF'));
  }

  if (recommendationBlocks.length) {
    content.push({ 
      text: "💝 이번 주 부모님을 위한 제안", 
      style: "sectionTitle",
      margin: [0, scale(16), 0, scale(12)],
    });
    content.push(...recommendationBlocks);
    content.push(createColoredBox([
      { text: "✨ 작고 꾸준한 대화 습관이 아이의 언어 자신감을 단단하게 키워줘요.", style: "sectionSubtitle" }
    ], '#FFF7FB', '#F4D7E8'));
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
      badge: { fontSize: scale(12), bold: true, color: "#E17AA4" },
      heading: { fontSize: scale(22), bold: true, color: "#1F2937" },
      subheading: { fontSize: scale(11), color: "#6B7280", lineHeight: 1.6 },
      sectionTitle: {
        fontSize: scale(16),
        bold: true,
        color: "#1F2937",
      },
      sectionSubtitle: { fontSize: scale(10), color: "#6B7280", lineHeight: 1.5 },
      metricTitle: { fontSize: scale(11), bold: true },
      metricValue: { fontSize: scale(14), bold: true, color: "#1F2937" },
      metricValueLarge: { fontSize: scale(24), bold: true },
      metricHelper: { fontSize: scale(9), color: "#6B7280", lineHeight: 1.4 },
      metricTrend: { fontSize: scale(9), color: "#4B5563", italic: true },
      guideStage: { fontSize: scale(12), bold: true },
      guideSummary: { fontSize: scale(13), bold: true, color: "#1F2937", lineHeight: 1.5 },
      guideList: { fontSize: scale(10), color: "#374151", lineHeight: 1.6 },
      guideExample: {
        fontSize: scale(9),
        color: "#4B5563",
        lineHeight: 1.5,
        italic: true,
      },
      diaryHeader: { fontSize: scale(10), bold: true, color: "#DB2777" },
      diaryFocus: { fontSize: scale(9), color: "#E17AA4", italic: true },
      diaryScript: { fontSize: scale(10), color: "#374151", lineHeight: 1.6 },
      recommendationTitle: {
        fontSize: scale(13),
        bold: true,
        color: "#A855F7",
      },
      recommendationDetail: {
        fontSize: scale(10),
        color: "#374151",
        lineHeight: 1.6,
      },
      recommendationTip: { fontSize: scale(9), color: "#7C3AED", italic: true },
    },
    content,
  };
};
