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
    trend: "지난주 +6",
    progress: 84,
    color: "#E17AA4",
  },
  {
    label: "두 단어 조합",
    value: "1일 9회",
    helper: "자발 표현",
    trend: "+3회",
    progress: 72,
    color: "#A678E3",
  },
  {
    label: "제스처 이해",
    value: "93%",
    helper: "응답 정확도",
    trend: "+5%p",
    progress: 93,
    color: "#7EC4CF",
  },
];

const focusAreas = [
  {
    icon: <MessageCircleHeart className="text-[#E17AA4]" size={26} />,
    title: "상호작용 신호 포착",
    description:
      "아이가 말 대신 손짓·표정으로 보여주는 의도를 실시간으로 인식하고 부모에게 자막처럼 알려줘요.",
  },
  {
    icon: <BookOpen className="text-[#A678E3]" size={26} />,
    title: "모델링 문장 제시",
    description:
      "아이 발화 직후 맞장구 → 재진술 → 확장 문장 순서로 다음 표현을 자연스럽게 이어가요.",
  },
  {
    icon: <Sparkles className="text-[#F08AA4]" size={26} />,
    title: "놀이형 언어 자극",
    description:
      "소리 흉내, 역할 놀이, 손 인형 스토리 등 18~24개월에 적합한 언어 게임을 큐레이션합니다.",
  },
];

const dailyMoments = [
  {
    time: "아침 식사",
    script: '아이: "멍멍" → 도담: "멍멍이가 밥 먹을까? 손가락으로 가리켜줄래?"',
    focus: "소리와 제스처 연결",
  },
  {
    time: "낮 산책",
    script: '아이: "더 물" → 도담: "물 더 마시고 싶구나. 컵을 잡아볼까?"',
    focus: "두 단어 조합 확장",
  },
  {
    time: "잠자리",
    script: '아이: "책 읽어" → 도담: "어떤 책이 좋아? 고양이 이야기 골라볼까?"',
    focus: "선택 질문 연습",
  },
];

const stageGuides = [
  {
    stage: "18개월 집중 포인트",
    color: "#E17AA4",
    summary: "10~15개 단어와 의태어에 풍부한 반응",
    actions: [
      "일상 사물에 이름 붙이기 + 소리 흉내",
      "손짓, 끄덕임 등 비언어 반응을 즉시 말로 옮겨주기",
      '아이 발화 후 "맞아" → "그게 뭐지?" 식의 짧은 질문으로 이어가기',
    ],
    example: '오늘의 모델: "토토" → "토끼구나! 토끼는 폴짝 뛰지?"',
  },
  {
    stage: "24개월 집중 포인트",
    color: "#A678E3",
    summary: "50+ 단어, 두 단어 조합의 폭넓은 활용",
    actions: [
      "선택형 질문으로 대답을 유도하고 기다리기",
      "아이 문장을 받아 더 긴 문장으로 재구성하기",
      "역할 놀이 속 감정 단어(기뻐, 속상해) 소개",
    ],
    example: '오늘의 모델: "더 우유" → "우유 더 마시고 싶구나. 컵을 두 손으로 잡아볼까?"',
  },
];

const recommendations = [
  {
    title: "대화 확장 루틴",
    detail:
      "하루 3회, 아이 발화 후 5초 기다리고 확장 문장을 들려주는 루틴을 제안해요.",
    tip: "타이머 알림으로 부모 참여 시간대를 고정하면 아이가 예측 가능성을 느낍니다.",
  },
  {
    title: "환경 단어 탐색",
    detail:
      "집 안 물건에 단어 라벨을 붙이고, 로봇이 라벨을 읽어주면 아이가 즉시 손짓으로 반응해요.",
    tip: "주간 목표 단어 6개를 정해 반복 노출하세요.",
  },
  {
    title: "역할 놀이 확장",
    detail:
      "잠자리 전 5분 동안 인형과 함께 감정 표현과 선택 질문을 주고받도록 유도합니다.",
    tip: "“무슨 느낌이야?” 같은 감정 질문을 포함하세요.",
  },
];

export default function Growth() {
  return (
    <Layout showNav={true}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 space-y-16">
        <section className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#FDE4EC] via-[#F4E5FB] to-[#E0F1FF] p-8 sm:p-12 shadow-xl">
          <div className="absolute -top-16 -left-10 h-44 w-44 rounded-full bg-white/40 blur-3xl" />
          <div className="absolute -bottom-12 -right-8 h-48 w-48 rounded-full bg-[#E7D7FA]/60 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr,1fr] items-start">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1 text-sm font-semibold text-[#E17AA4] shadow-sm">
                이번 주 성장 스냅샷
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                대화로 확인하는 18~24개월 언어 성장
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                도담은 아이의 옹알이, 두 단어 조합, 손짓까지 빠짐없이 포착해 즉각 반응합니다. 시각적으로 정리된 상단 지표로 지금 어디까지 성장했는지 한눈에 확인하세요.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/80 px-4 py-5 shadow-sm border border-white/60">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#A678E3]">주요 어휘</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">42</p>
                  <p className="text-xs text-slate-500">지난달 대비 +18%</p>
                </div>
                <div className="rounded-2xl bg-white/80 px-4 py-5 shadow-sm border border-white/60">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#E17AA4]">두 단어 조합</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">9회</p>
                  <p className="text-xs text-slate-500">"더 우유" 등 자발 조합 증가</p>
                </div>
                <div className="rounded-2xl bg-white/80 px-4 py-5 shadow-sm border border-white/60">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#7EC4CF]">상호작용 유지</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">6분</p>
                  <p className="text-xs text-slate-500">평균 대화 라운드 4.2회</p>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 sm:p-8 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#A678E3]">Progress Focus</p>
                  <p className="text-lg font-bold text-slate-900">언어 폭발기 대응 지표</p>
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
                지표는 음성·제스처·시선 데이터를 통합 분석해 산출됩니다. 목표 대비 달성률이 90%를 넘으면 다음 단계 활동이 자동 추천돼요.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">지금 주목해야 할 상호작용</h2>
            <p className="mx-auto max-w-3xl text-sm sm:text-base leading-relaxed text-slate-600">
              도담은 아이의 발화 직후 3초 안에 반응하도록 설계돼 있어요. 아래 요소를 강화하면 아이가 말 걸고 싶은 환경을 느끼게 됩니다.
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

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-[32px] border border-[#F4D7E8] bg-white/90 p-6 sm:p-8 shadow-lg space-y-6">
            <div className="flex items-center gap-3">
              <Brain className="text-[#A678E3]" size={24} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#A678E3]">Conversation Diary</p>
                <h3 className="text-xl font-bold text-slate-900">오늘 기록된 대화 흐름</h3>
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
              각 순간은 음성 톤, 아이의 시선, 손짓 데이터를 함께 기록해 부모님 대시보드에서 재생할 수 있습니다.
            </p>
          </div>

          <div className="rounded-[32px] border border-[#E7D7FA] bg-white/90 p-6 sm:p-8 shadow-lg space-y-6">
            <div className="flex items-center gap-3">
              <HandHeart className="text-[#E17AA4]" size={24} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#E17AA4]">Parent Assist</p>
                <h3 className="text-xl font-bold text-slate-900">부모 코칭 알림</h3>
              </div>
            </div>
            <ul className="space-y-4 text-sm leading-relaxed text-slate-600">
              <li>• 대화 후 5초 기다리기 알림이 저녁 7시에 전송됐어요.</li>
              <li>• "오늘의 모델 문장" 음성 리플레이가 세 번 재생됐습니다.</li>
              <li>• 보호자 공유 링크를 통해 조부모가 리포트를 열람했어요.</li>
            </ul>
            <div className="rounded-2xl border border-dashed border-[#E7D7FA] bg-[#FDF5FF] p-4 text-xs leading-relaxed text-slate-500">
              ✨ 내일은 새로운 생활 단어 3개(컵, 숟가락, 의자)를 중심으로 질문을 던질 예정이에요.
            </div>
          </div>
        </section>

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

        <section className="space-y-8 rounded-[36px] border border-[#F4D7E8] bg-white/90 p-8 sm:p-10 shadow-xl">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">다음 주를 위한 발전 방향</h2>
            <p className="mx-auto max-w-3xl text-sm sm:text-base leading-relaxed text-slate-600">
              상단 지표를 바탕으로 추천되는 맞춤 전략입니다. 부모 참여, 놀이 환경, 어휘 확장을 균형 있게 설계했어요.
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
            💡 소아과, 언어치료 상담 시 리포트를 함께 보여주면 맞춤 조언을 더 빠르게 받을 수 있어요.
          </p>
        </section>
      </div>
    </Layout>
  );
}

