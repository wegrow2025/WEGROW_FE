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
  {
    label: "제스처 알아보기",
    value: "93%",
    helper: "표정·손짓 이해",
    trend: "5% 더 좋아졌어요!",
    progress: 93,
    color: "#7EC4CF",
  },
];

const focusAreas = [
  {
    icon: <MessageCircleHeart className="text-[#E17AA4]" size={26} />,
    title: "아이가 보내는 신호 알아차리기",
    description:
      "아이가 말 대신 손짓이나 표정으로 이야기할 때, 도담이 그 마음을 읽고 부모님께 살짝 알려줘요 💕",
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
  {
    time: "아침 식사",
    script: '아이: "멍멍" → 도담: "멍멍이가 밥 먹을까? 손가락으로 가리켜볼까?"',
    focus: "소리와 행동 연결하기",
  },
  {
    time: "낮 산책",
    script: '아이: "더 물" → 도담: "물 더 마시고 싶구나~ 컵을 잡아볼까?"',
    focus: "두 단어로 표현 넓히기",
  },
  {
    time: "잠자리",
    script: '아이: "책 읽어" → 도담: "어떤 책이 좋을까? 고양이 책 읽어볼까?"',
    focus: "질문으로 대화 이어가기",
  },
];

const stageGuides = [
  {
    stage: "18개월 포인트",
    color: "#E17AA4",
    summary: "10~15개 단어와 소리에 반응이 풍부해요",
    actions: [
      "집안 사물에 이름 붙여주기 + 동물 소리 흉내내기 🐶",
      "아이가 손짓하면 그 뜻을 말로 대신 표현해주기",
      '아이 말 뒤엔 “그렇구나~” “그게 뭐야?”처럼 짧게 이어가기',
    ],
    example: '예: "토토" → "토끼구나! 토끼는 폴짝폴짝 뛰지?" 🐰',
  },
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
    title: "대화 늘리기 루틴",
    detail:
      "하루에 세 번, 아이가 말한 뒤 5초 기다렸다가 도담이 문장을 이어주는 습관을 만들어보세요.",
    tip: "매일 같은 시간에 하면 아이가 ‘이 시간엔 도담이랑 얘기하는구나!’ 하고 기대하게 돼요 💬",
  },
  {
    title: "집 안 단어 탐험",
    detail:
      "컵, 의자, 신발 같은 물건에 이름표를 붙여요. 도담이 읽어주면 아이가 손으로 가리키며 배워요!",
    tip: "이번 주엔 새로운 단어 6개를 골라 집중해볼까요? 📘",
  },
  {
    title: "인형과 감정 놀이",
    detail:
      "잠자기 전에 인형과 대화하며 오늘의 기분을 말로 표현해보세요. ‘기뻐요’, ‘무서워요’ 같은 말이 좋아요.",
    tip: "“어떤 느낌이야?” 같은 질문으로 마음을 말하게 해주세요 💖",
  },
];

export default function Growth() {
  return (
    <Layout showNav={true}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 space-y-16">
        {/* Hero / Snapshot */}
        <section className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#FDE4EC] via-[#F4E5FB] to-[#E0F1FF] p-8 sm:p-12 shadow-xl">
          <div className="absolute -top-16 -left-10 h-44 w-44 rounded-full bg-white/40 blur-3xl" />
          <div className="absolute -bottom-12 -right-8 h-48 w-48 rounded-full bg-[#E7D7FA]/60 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr,1fr] items-start">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1 text-sm font-semibold text-[#E17AA4] shadow-sm">
                이번 주 도담 성장 이야기 💕
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                말로 표현하는 즐거움이 쑥쑥 자라는 중이에요!
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                도담은 아이의 옹알이, 손짓, 두 단어 말까지 꼼꼼히 듣고 따뜻하게 반응해요.
                이번 주 아이가 어떤 말을 배우고, 얼마나 대화가 늘었는지 함께 살펴볼까요? 🌼
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/80 px-4 py-5 shadow-sm border border-white/60">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#A678E3]">주요 어휘</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">42</p>
                  <p className="text-xs text-slate-500">지난달보다 단어가 18% 늘었어요 👏</p>
                </div>
                <div className="rounded-2xl bg-white/80 px-4 py-5 shadow-sm border border-white/60">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#E17AA4]">두 단어 말하기</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">9회</p>
                  <p className="text-xs text-slate-500">“더 우유”처럼 문장으로 말했어요!</p>
                </div>
                <div className="rounded-2xl bg-white/80 px-4 py-5 shadow-sm border border-white/60">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#7EC4CF]">대화 이어가기</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">6분</p>
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
                  <p className="text-lg font-bold text-slate-900">도담이의 말하기 여정</p>
                </div>
                <Sparkles className="text-[#E17AA4]" size={24} />
              </div>
              <div className="mt-6 space-y-5">
                {progressMetrics.map((metric) => (
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
                도담은 아이의 소리, 손짓, 시선을 함께 살펴서 성장 정도를 계산해요.
                90% 이상 달성하면 다음 단계 놀이가 자동으로 추천돼요 🌟
              </p>
            </div>
          </div>
        </section>

        {/* Focus Areas */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">지금 집중하면 좋아요</h2>
            <p className="mx-auto max-w-3xl text-sm sm:text-base leading-relaxed text-slate-600">
              도담은 아이가 말한 뒤 3초 안에 반응하도록 설계되어 있어요. 아래 내용을 챙겨주시면,
              아이가 더 편안하게 먼저 말을 걸고 싶어해요 😊
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {focusAreas.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-[#F4D7E8] bg-white/90 p-6 shadow-sm transition hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex rounded-full bg-[#FDE4EC]/80 p-3">{item.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </div>
            ))}
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
              {dailyMoments.map((moment) => (
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
              각 순간은 음성 톤, 아이의 시선, 손짓과 함께 기록되어 부모님 대시보드에서 다시 볼 수 있어요.
            </p>
          </div>

          <div className="rounded-[32px] border border-[#E7D7FA] bg-white/90 p-6 sm:p-8 shadow-lg space-y-6">
            <div className="flex items-center gap-3">
              <HandHeart className="text-[#E17AA4]" size={24} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#E17AA4]">Parent Assist</p>
                <h3 className="text-xl font-bold text-slate-900">부모님께 드리는 작은 힌트</h3>
              </div>
            </div>
            <ul className="space-y-4 text-sm leading-relaxed text-slate-600">
              <li>• 대화 후 5초 기다리기 알림이 저녁 7시에 전송되었어요.</li>
              <li>• “오늘의 모델 문장” 음성 리플레이가 세 번 재생되었어요.</li>
              <li>• 보호자 공유 링크를 통해 조부모님도 리포트를 함께 보셨어요.</li>
            </ul>
            <div className="rounded-2xl border border-dashed border-[#E7D7FA] bg-[#FDF5FF] p-4 text-xs leading-relaxed text-slate-600">
              ✨ 내일은 생활 단어 3개(컵, 숟가락, 의자)를 중심으로 가볍게 질문해볼게요.
            </div>
          </div>
        </section>

        {/* Stage Guides */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {stageGuides.map((stage) => (
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
                {stage.actions.map((action) => (
                  <li key={action}>• {action}</li>
                ))}
              </ul>
              <div className="rounded-2xl border border-dashed border-[#F4D7E8] bg-[#FFF7FB] p-4 text-xs font-medium text-slate-600">
                {stage.example}
              </div>
            </div>
          ))}
        </section>

        {/* Recommendations */}
        <section className="space-y-8 rounded-[36px] border border-[#F4D7E8] bg-white/90 p-8 sm:p-10 shadow-xl">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">다음 주를 위한 작은 발걸음</h2>
            <p className="mx-auto max-w-3xl text-sm sm:text-base leading-relaxed text-slate-600">
              이번 주 성장 지표를 바탕으로 준비했어요. 부모님 참여, 놀이 환경, 어휘 확장을 고르게 담았어요.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {recommendations.map((item) => (
              <div key={item.title} className="rounded-3xl border border-[#F4D7E8] bg-[#FFF7FB] p-6 shadow-sm space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{item.detail}</p>
                <p className="text-xs font-medium text-[#A678E3]">{item.tip}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full bg-[#E17AA4] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#d0648f]">
              <Download size={18} />
              리포트 PDF 다운로드
            </button>
            <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#A678E3] px-6 py-3 font-semibold text-[#A678E3] transition hover:bg-[#FDF5FF]">
              <Share2 size={18} />
              보호자와 공유하기
            </button>
          </div>
          <p className="text-center text-xs text-slate-500">
            💡 소아과나 언어치료 상담 때 리포트를 함께 보여주시면, 더 꼭 맞는 조언을 빠르게 받으실 수 있어요.
          </p>
        </section>
      </div>
    </Layout>
  );
}
