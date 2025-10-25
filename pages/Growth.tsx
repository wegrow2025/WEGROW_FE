import { useCallback, useRef, useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import {
  Sparkles,
  MessageCircleHeart,
  BookOpen,
  Download,
  Share2,
  Brain,
  HandHeart,
  Play,
} from "lucide-react";
import { toast } from "sonner";
import { authenticatedFetch } from "@/lib/api";

interface GrowthReport {
  vocabularyCount: number;
  twoWordSentences: number;
  conversationDuration: number;
  progressMetrics: Array<{
    label: string;
    value: string;
    helper: string;
    trend: string;
    progress: number;
    color: string;
  }>;
  dailyMoments: Array<{
    time: string;
    script: string;
    focus: string;
  }>;
  stageGuides: Array<{
    stage: string;
    color: string;
    summary: string;
    actions: string[];
    example: string;
  }>;
  recommendations: Array<{
    title: string;
    detail: string;
    tip: string;
  }>;
  parentAssist: string[];
}


const progressMetrics = [
  {
    label: "활용 어휘",
    value: "42 단어",
    helper: "목표 50 단어",
    trend: "지난주보다 6개 늘었어요!",
    progress: 84,
    color: "#E17AA4",
  },
  {
    label: "두 단어 말하기",
    value: "1일 9회",
    helper: "자연스러운 말 잇기",
    trend: "3번 더 늘었어요!",
    progress: 72,
    color: "#A678E3",
  },
  // {
  //   label: "신호 이해도",
  //   value: "93%",
  //   helper: "말맥락·요청 파악",
  //   trend: "5% 더 좋아졌어요!",
  //   progress: 93,
  //   color: "#7EC4CF",
  // },
];

const focusAreas = [
  {
    icon: <MessageCircleHeart className="text-[#E17AA4]" size={26} />,
    title: "아이가 보내는 신호 알아차리기",
    description:
      "말 대신 웃음소리, 또는 장난감의 버튼/터치 같은 입력을 도담이 감지해 부모님께 부드럽게 알려줘요 💕",
  },
  {
    icon: <BookOpen className="text-[#A678E3]" size={26} />,
    title: "따라 말하기·이어 말하기",
    description:
      "아이가 한 말을 도담이 다시 들려주고, 자연스럽게 다음 문장으로 이어가요. ‘맞아!’ ‘그다음은?’처럼요 😊",
  },
  {
    icon: <Sparkles className="text-[#F08AA4]" size={26} />,
    title: "놀이로 배우는 말",
    description:
      "소리 따라하기, 역할놀이, 손인형 이야기 등 재미있는 놀이 속에서 언어가 쑥쑥 자라요 🎈",
  },
];

const dailyMoments = [
  // {
  //   time: "아침 식사",
  //   script:
  //     '아이: "우유" → 도담: "우-유 마실래? 우유 컵을 두 손으로 잡아볼까?"',
  //   focus: "핵심 단어 반복으로 주의 집중",
  // },
  {
    time: "놀이 시간(블록)",
    script:
      '아이: "더!" → 도담: "더 쌓자. 높은 탑? 낮은 탑? 하나, 둘—올려볼까?"',
    focus: "반복 + 선택 질문으로 자발 발화 유도",
  },
  {
    time: "책 읽기",
    script:
      '아이: "읽어" → 도담: "더 읽자. 이 페이지에서 뭐가 보일까? 고양이? 기차?"',
    focus: "짧은 확장 발화(모델링)로 어휘 넓히기",
  },
  {
    time: "저녁 정리",
    script:
      '아이: "신발" → 도담: "신발 정리하자. 신발—여기, 신발장에 쏙! 우리 같이 넣어볼까?"',
    focus: "동작과 말 연결(행동 언어화)",
  },
  // {
  //   time: "잠자리",
  //   script:
  //     '아이: "더 보고 싶어" → 도담: "더 보고 싶구나. 마지막 한 장만 보고, 이제 불 끌까—괜찮을까?"',
  //   focus: "공감 + 선택형 마무리로 이행 돕기",
  // },
];

const stageGuides = [
  // {
  //   stage: "18개월 포인트",
  //   color: "#E17AA4",
  //   summary: "10~15개 단어와 소리에 반응이 풍부해요",
  //   actions: [
  //     "집안 사물에 이름 붙여주기 + 동물 소리 흉내내기 🐶",
  //     "아이가 소리 내면 그 뜻을 말로 덧붙여주기",
  //     '아이 말 뒤엔 “그렇구나~” “그게 뭐야?”처럼 짧게 이어가기',
  //   ],
  //   example: '예: "토토" → "토끼구나! 토끼는 폴짝폴짝 뛰지?" 🐰',
  // },
  {
    stage: "24개월 포인트",
    color: "#A678E3",
    summary: "50개 이상의 단어로 두 단어 문장을 말해요!",
    actions: [
      "‘무슨 색 좋아?’처럼 선택 질문으로 대화 유도하기 🎨",
      "아이의 짧은 말을 더 긴 문장으로 이어 말해주기",
      "역할놀이로 감정 단어(기뻐, 속상해 등) 알려주기 💕",
    ],
    example:
      '예: "더 우유" → "우유 더 마시고 싶구나~ 컵을 두 손으로 잡아볼까?" 🍼',
  },
];

const recommendations = [
  {
    title: "집 안 단어 탐험",
    detail:
      "컵, 의자, 신발 같은 물건에 이름표를 붙여요. 도담이 읽어주면 아이가 말소리로 반응하며 배워요!",
    tip: "이번 주엔 새로운 단어 6개를 골라 집중해볼까요? 📘",
  },
  {
    title: "📖 함께 묻고 대답하는 책읽기",
    detail:
      "책을 읽을 때 “이건 뭐야?”, “누가 나왔을까?”처럼 짧게 묻고 아이의 대답에 한 마디를 더해주세요.",
    tip: "💡 아이가 한 단어로 답하면 그 위에 한 단어를 덧붙여주세요. “토끼!” → “토끼가 뛰네!”",
  },
  {
    title: "🎈 함께 보는 것에 말 걸기",
    detail:
      "산책 중이나 놀이 중 아이가 바라보는 사물에 부모님이 관심을 맞춰주세요.",
    tip: "💡 “우와, 노란 꽃이 있네! 같이 볼까?”처럼 시선을 공유하는 짧은 문장이 좋아요.",
  },
];

export default function Growth() {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [growthData, setGrowthData] = useState<GrowthReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGrowthData();
  }, []);

  const fetchGrowthData = async () => {
    try {
      setLoading(true);
      const response = await authenticatedFetch('/api/growth/weekly-report');

      if (!response.ok) {
        throw new Error('성장 데이터를 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      setGrowthData(data);
    } catch (err) {
      console.error('Growth data fetch error:', err);
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = useCallback(async () => {
    if (!reportRef.current) {
      toast.error("보고서 영역을 찾지 못했어요. 페이지를 새로고침 해주세요.");
      return;
    }

    const html2canvasFn = window.html2canvas;
    const pdfConstructor = window.jspdf?.jsPDF;

    if (!html2canvasFn || !pdfConstructor) {
      toast.error("PDF 생성을 위한 라이브러리를 불러오지 못했어요. 네트워크 상태를 확인해주세요.");
      return;
    }

    setIsGeneratingPdf(true);

    try {
      await document.fonts.ready;

      const element = reportRef.current;
      const scale = Math.min(4, (window.devicePixelRatio || 1) * 2);
      const canvas = await html2canvasFn(element, {
        scale,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      const pdf = new pdfConstructor("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const pxPerMm = canvasWidth / pageWidth;
      const pageCanvasHeightPx = Math.floor(pxPerMm * pageHeight);

      if (!pageCanvasHeightPx) {
        throw new Error("PDF 페이지 높이를 계산하지 못했어요.");
      }
      const pageCount = Math.max(1, Math.ceil(canvasHeight / pageCanvasHeightPx));

      for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
        const pageCanvas = document.createElement("canvas");
        const context = pageCanvas.getContext("2d");

        if (!context) {
          throw new Error("PDF 캔버스 생성에 실패했어요.");
        }

        const sliceHeight = Math.min(
          pageCanvasHeightPx,
          canvasHeight - pageIndex * pageCanvasHeightPx,
        );

        pageCanvas.width = canvasWidth;
        pageCanvas.height = sliceHeight;

        context.drawImage(
          canvas,
          0,
          pageIndex * pageCanvasHeightPx,
          canvasWidth,
          sliceHeight,
          0,
          0,
          canvasWidth,
          sliceHeight,
        );

        const imgData = pageCanvas.toDataURL("image/png", 1.0);
        const pdfImageHeight = (sliceHeight * pageWidth) / canvasWidth;

        if (pageIndex > 0) {
          pdf.addPage();
        }

        pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pdfImageHeight, undefined, "SLOW");
      }

      pdf.setProperties({ title: "WeGrow-Weekly-Growth-Report" });
      pdf.save("wegrow-growth-report.pdf");

      toast.success("성장 리포트를 PDF로 저장했어요!");
    } catch (error) {
      console.error("Failed to generate PDF", error);
      toast.error("PDF 생성 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsGeneratingPdf(false);
    }
  }, []);

  if (loading) {
    return (
      <Layout showNav={true}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 space-y-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">성장 데이터를 불러오는 중...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout showNav={true}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 space-y-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-destructive mb-4">{error}</p>
              <button
                onClick={fetchGrowthData}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                다시 시도
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!growthData) {
    return (
      <Layout showNav={true}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 space-y-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">데이터를 불러올 수 없습니다.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showNav={true}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 space-y-6">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="inline-flex items-center gap-2 rounded-full bg-[#A678E3] px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-[#8f5cd1] focus:outline-none focus:ring-2 focus:ring-[#A678E3]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#CDB7F2]"
            aria-live="polite"
            aria-busy={isGeneratingPdf}
          >
            {isGeneratingPdf ? (
              <>
                <span className="inline-flex h-4 w-4 items-center justify-center">
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                </span>
                <span>PDF 생성 중...</span>
              </>
            ) : (
              <>
                <Download size={16} />
                <span>PDF로 저장하기</span>
              </>
            )}
          </button>
        </div>

        <div ref={reportRef} className="space-y-16">
          {/* Hero / Snapshot */}
          <section className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#FDE4EC] via-[#F4E5FB] to-[#E0F1FF] p-8 sm:p-12 shadow-xl">
            <div className="absolute -top-16 -left-10 h-44 w-44 rounded-full bg-white/40 blur-3xl" />
            <div className="absolute -bottom-12 -right-8 h-48 w-48 rounded-full bg-[#E7D7FA]/60 blur-3xl" />
            <div className="relative grid gap-10 lg:grid-cols-[1.1fr,1fr] items-start">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1 text-sm font-semibold text-[#E17AA4] shadow-sm">
                  이번 주 우리 아이 성장 보고서 💕
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                  말로 표현하는 즐거움이 쑥쑥 자라는 중이에요!
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-slate-600 text-[#BAABBA]">
                  이번 주에는 아이가 어떤 말을 배웠을까요? 🌼
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white/80 px-4 py-5 shadow-sm border border-white/60">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#A678E3]">주요 어휘</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">{growthData.vocabularyCount}</p>
                    <p className="text-xs text-slate-500">지난달보다 단어가 18% 늘었어요 👏</p>
                  </div>
                  <div className="rounded-2xl bg-white/80 px-4 py-5 shadow-sm border border-white/60">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#E17AA4]">두 단어 말하기</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">{growthData.twoWordSentences}회</p>
                    <p className="text-xs text-slate-500">“더 우유”처럼 문장으로 말했어요!</p>
                  </div>
                  <div className="rounded-2xl bg-white/80 px-4 py-5 shadow-sm border border-white/60">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#7EC4CF]">대화 이어가기</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">{growthData.conversationDuration}분</p>
                    <p className="text-xs text-slate-500">평균 4번씩 주고받았어요 💬</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 sm:p-8 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#A678E3]">
                      성장 지표
                    </p>
                    <p className="text-lg font-bold text-slate-900">우리 아이의 성장 속도는 적당해요</p>
                  </div>
                  <Sparkles className="text-[#E17AA4]" size={24} />
                </div>
                <div className="mt-6 space-y-5">
                  {growthData.progressMetrics?.map((metric) => (
                    <div key={metric.label} className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <span className="font-semibold text-slate-700">{metric.label}</span>
                        <span>{metric.helper}</span>
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="text-xl font-bold text-slate-900">{metric.value}</span>
                        <span className="text-xs text-slate-500">{metric.trend}</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100/80">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${metric.progress}%`,
                            backgroundColor: metric.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs leading-relaxed text-slate-500">
                  22.3개월 아이의 평균 활용 어휘는 50개예요. 아이가 더 많은 단어를 학습할 수 있도록 도담이 도울게요. 🌟
                </p>
              </div>
            </div>
          </section>

          {/* Conversation Diary + Parent Assist */}
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="rounded-[32px] border border-[#F4D7E8] bg-white/90 p-6 sm:p-8 shadow-lg space-y-6">
              <div className="flex items-center gap-3">
                <Brain className="text-[#A678E3]" size={24} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#A678E3]">Conversation Diary</p>
                  <h3 className="text-xl font-bold text-slate-900">오늘 나눈 따뜻한 대화들</h3>
                </div>
              </div>
              <div className="space-y-5">
                {growthData.dailyMoments?.map((moment) => (
                  <div key={moment.time} className="rounded-2xl border border-[#F4D7E8] bg-[#FFF7FB] p-4">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#E17AA4]">
                      <span>{moment.time}</span>
                      <span>{moment.focus}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">{moment.script}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs leading-relaxed text-slate-500">
                아이의 목소리는 좌측 메뉴의 타임라인에서 확인할수 있어요!
              </p>
            </div>
            {growthData.stageGuides?.map((stage) => (
              <div
                key={stage.stage}
                className="rounded-[32px] border border-[#F4D7E8] bg-white/90 p-6 sm:p-8 shadow-lg space-y-5"
              >
                <div className="flex items-center gap-3">
                  <Play style={{ color: stage.color }} size={22} />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: stage.color }}>
                      {stage.stage}
                    </p>
                    <h3 className="text-lg font-bold text-slate-900">{stage.summary}</h3>
                  </div>
                </div>
                <ul className="space-y-3 text-sm leading-relaxed text-slate-600">
                  {stage.actions?.map((action) => (
                    <li key={action}>• {action}</li>
                  ))}
                </ul>
                <div className="rounded-2xl border border-dashed border-[#F4D7E8] bg-[#FFF7FB] p-4 text-xs font-medium text-slate-600">
                  {stage.example}
                </div>
              </div>
            ))}
          </section>

          <section className="rounded-[32px] border border-[#E7D7FA] bg-white/90 p-6 sm:p-8 shadow-lg space-y-6">
            <div className="flex items-center gap-3">
              <HandHeart className="text-[#E17AA4]" size={24} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#E17AA4]">Parent Assist</p>
                <h3 className="text-xl font-bold text-slate-900">도담이의 관찰을 바탕으로 드리는 조언</h3>
              </div>
            </div>

            <ul className="space-y-4 text-sm leading-relaxed text-slate-600">
              {growthData.parentAssist?.map((assist, index) => (
                <li key={index}>
                  • {assist}
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-dashed border-[#E7D7FA] bg-[#FDF5FF] p-4 text-xs leading-relaxed text-slate-600">
              💡 연구에 따르면, 부모의 짧은 확장 말과 일관된 반응은 아이의 언어 이해력을 평균 5점 이상 향상시킬 수 있어요
              (Roberts & Kaiser, 2015). 내일은 도담이와의 대화 후, 잠시 멈추고 아이의 반응을 기다려보세요 — 짧은 ‘기다림’이
              언어를 자라게 해요 🌱
            </div>
          </section>

          {/* Recommendations */}
          <section className="space-y-8 rounded-[36px] border border-[#F4D7E8] bg-white/90 p-8 sm:p-10 shadow-xl">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">다음 주에는 이렇게 함께해요</h2>
              <p className="mx-auto max-w-3xl text-sm sm:text-base leading-relaxed text-slate-600">
                이번 주 성장 지표를 바탕으로 준비했어요. 부모님 참여, 놀이 환경, 어휘 확장을 고르게 담았어요.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {growthData.recommendations?.map((item) => (
                <div key={item.title} className="rounded-3xl border border-[#F4D7E8] bg-[#FFF7FB] p-6 shadow-sm space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{item.detail}</p>
                  <p className="text-xs font-medium text-[#A678E3]">{item.tip}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-slate-500">
              💡 소아과나 언어치료 상담 때 리포트를 함께 보여주시면, 더 꼭 맞는 조언을 빠르게 받으실 수 있어요.
            </p>



          </section>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-2 rounded-full bg-[#A678E3] px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-[#8f5cd1] focus:outline-none focus:ring-2 focus:ring-[#A678E3]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#CDB7F2]"
              aria-live="polite"
              aria-busy={isGeneratingPdf}
            >
              {isGeneratingPdf ? (
                <>
                  <span className="inline-flex h-4 w-4 items-center justify-center">
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  </span>
                  <span>PDF 생성 중...</span>
                </>
              ) : (
                <>
                  <Download size={16} />
                  <span>PDF로 저장하기</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </Layout>
  );
}