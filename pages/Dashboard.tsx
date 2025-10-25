import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { TrendingUp, Volume2, MessageCircle, Zap, ArrowUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface DailyReport {
  vocalizations: number;
  syllableCombinations: number;
  meaningfulAttempts: number;
  newWords: number;
  previousDay?: {
    vocalizations: number;
  };
}

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [report] = useState<DailyReport>({
    vocalizations: 14,
    syllableCombinations: 3,
    meaningfulAttempts: 5,
    newWords: 1,
    previousDay: { vocalizations: 12 },
  });

  const userName = useMemo(() => {
    if (currentUser?.name && String(currentUser.name).trim().length > 0) {
      return String(currentUser.name).trim();
    }

    if (currentUser?.email && currentUser.email.includes("@")) {
      return currentUser.email.split("@")[0];
    }

    return "000";
  }, [currentUser]);

  const vocalizationChange =
    report.vocalizations - (report.previousDay?.vocalizations || 0);
  const isPositive = vocalizationChange >= 0;

  return (
    <Layout showNav={true}>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-8 py-12 space-y-10">
        <div className="pointer-events-none absolute inset-x-0 -top-32 h-72 bg-[radial-gradient(circle_at_top,_rgba(230,223,247,0.7),_rgba(255,255,255,0))]" />

        {/* Header */}
        <section className="relative overflow-hidden rounded-[32px] border border-[#F4D7E8] bg-white/90 p-6 sm:p-8 shadow-xl backdrop-blur-sm">
          <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_top_left,_rgba(230,223,247,0.55),_transparent_65%)]" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#A678E3]">welcome back</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                안녕하세요! {userName}님! 🎉
              </h1>
              <p className="text-sm text-slate-500">
                {new Date().toLocaleDateString("ko-KR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide">
              <span className="rounded-full border border-[#A678E3]/40 bg-[#F7F2FF] px-3 py-1 text-[#A678E3]">growth</span>
              <span className="rounded-full border border-[#E17AA4]/40 bg-[#FFF2F8] px-3 py-1 text-[#E17AA4]">insight</span>
            </div>
          </div>
        </section>

        {/* Main Report Card */}
        <div className="relative overflow-hidden rounded-[32px] border border-[#F4D7E8] bg-white/95 p-6 sm:p-8 shadow-lg backdrop-blur-sm space-y-6">
          <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-br from-[#F7F2FF]/70 via-transparent to-[#FFF0F6]/80" />
          <div className="relative flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              오늘 우리 아이 언어 리포트
            </h2>
            <button className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E17AA4]/40 bg-white/80 text-[#E17AA4] shadow-sm transition hover:border-[#E17AA4] hover:bg-[#FFE4F1]">
              <Volume2 size={22} />
            </button>
          </div>

          <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-4">
            {/* Vocalizations */}
            <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-inner">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    총 옹알이
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {report.vocalizations}
                  </p>
                </div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F2FF] text-[#A678E3]">🗣️</div>
              </div>
              {vocalizationChange !== 0 && (
                <p
                  className={`flex items-center gap-1 text-xs font-semibold ${
                    isPositive ? "text-[#A678E3]" : "text-[#E17AA4]"
                  }`}
                >
                  <ArrowUp size={14} />
                  어제보다 {Math.abs(vocalizationChange)}회
                </p>
              )}
            </div>

            {/* Syllable Combinations */}
            <div className="rounded-2xl border border-[#F4D7E8] bg-[#FFF2F8]/70 p-4 shadow-inner">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#E17AA4]/80">
                    음절 조합
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {report.syllableCombinations}
                  </p>
                </div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-[#E17AA4]">🎵</div>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#E17AA4]">신규!</p>
            </div>

            {/* Meaningful Attempts */}
            <div className="rounded-2xl border border-[#D7EAF0] bg-[#E8F7F9]/60 p-4 shadow-inner">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#4897A2]">
                    의미 있는 시도
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {report.meaningfulAttempts}
                  </p>
                </div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-[#4897A2]">⭐</div>
              </div>
              <p className="text-xs text-slate-500">예: 상징적 단어</p>
            </div>

            {/* New Words */}
            <div className="rounded-2xl border border-[#F4D7E8] bg-white/80 p-4 shadow-inner">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#A678E3]">
                    새로운 단어
                  </p>
                  <p className="text-3xl font-bold text-[#A678E3]">
                    {report.newWords}
                  </p>
                </div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F2FF] text-[#A678E3]">🆕</div>
              </div>
              <p className="text-xs font-semibold text-[#A678E3]">"까까" (물 표현)</p>
            </div>
          </div>

          {/* Summary */}
          <div className="relative rounded-[24px] border border-[#D7EAF0] bg-[#E8F7F9]/70 p-5">
            <p className="leading-relaxed text-slate-800">
              <span className="font-semibold text-[#4897A2]">좋은 소식! 👏</span>
              <br />
              아이가 오늘 처음으로 두 음절을 조합해서 발성했어요. 이제 더 복잡한 의사소통으로 한 걸음 나아가는 중입니다. 아래의 '지금 해주면 좋은 말'을 참고해서 아이의 시도를 격려해 주세요.
            </p>
          </div>

          {/* Recommended Response Guide */}
          <div className="relative overflow-hidden rounded-[24px] border border-[#F4D7E8] bg-[#FFF7FB]/80 p-5">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FDE4EC]/70 via-transparent to-[#E8DAFA]/60" />
            <div className="relative space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#A678E3]">
                지금 해주면 좋은 말 💬
              </p>
              <p className="text-lg font-semibold italic text-slate-900">
                "물? 물 주세요? 엄마가 물 줄까요?"
              </p>
              <p className="text-xs text-slate-500">
                ✓ 아이의 시도를 자연스럽게 확장해서 모델링해주기
              </p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr,0.95fr]">
          {/* Age-based Comparison */}
          <div className="relative overflow-hidden rounded-[28px] border border-[#F4D7E8] bg-white/90 p-6 shadow-md backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top_right,_rgba(253,228,236,0.6),_transparent_65%)]" />
            <div className="relative">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                <TrendingUp size={20} className="text-[#A678E3]" />
                월령 기준 비교
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-800">
                      음절성 옹알이
                    </span>
                    <span className="text-sm font-bold text-[#A678E3]">
                      상위 20%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/60">
                    <div className="h-full rounded-full bg-[#A678E3]" style={{ width: "75%" }} />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    18개월 평균 범위를 넘어섰습니다
                  </p>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-800">
                      단어 이해
                    </span>
                    <span className="text-sm font-bold text-[#E17AA4]">
                      평균 범위 내
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/60">
                    <div className="h-full rounded-full bg-[#E17AA4]" style={{ width: "55%" }} />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    같은 월령 평균 정도입니다
                  </p>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-800">
                      의미 있는 시도
                    </span>
                    <span className="text-sm font-bold text-[#4897A2]">
                      평균보다 높음
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/60">
                    <div className="h-full rounded-full bg-[#7EC4CF]" style={{ width: "65%" }} />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    아이가 의사소통을 주도적으로 시도 중
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[#D7EAF0] bg-[#E8F7F9]/70 p-4">
                <p className="text-sm text-slate-700">
                  <span className="font-semibold text-[#4897A2]">💡 해석:</span> 우리 아이는 대부분의 영역에서 또래 평균과 함께 성장 중입니다. 특히 음성 표현에 강점이 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-[28px] border border-[#F4D7E8] bg-white/90 p-6 shadow-md backdrop-blur-sm">
              <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top_left,_rgba(230,223,247,0.55),_transparent_70%)]" />
              <div className="relative">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                  <MessageCircle size={20} className="text-[#E17AA4]" />
                  빠른 실행
                </h3>
                <div className="space-y-3">
                  <button className="group w-full rounded-2xl border border-[#A678E3]/40 bg-[#F7F2FF]/80 px-4 py-3 text-left transition hover:border-[#A678E3] hover:bg-[#F0E8FF]">
                    <p className="font-semibold text-slate-900 transition group-hover:text-[#A678E3]">
                      → 전체 타임라인 보기
                    </p>
                    <p className="mt-1 text-xs text-slate-500">시간별 음성 상호작용 기록</p>
                  </button>
                  <button className="group w-full rounded-2xl border border-[#E17AA4]/40 bg-[#FFF2F8]/80 px-4 py-3 text-left transition hover:border-[#E17AA4] hover:bg-[#FFE4F1]">
                    <p className="font-semibold text-slate-900 transition group-hover:text-[#E17AA4]">
                      → 성장 분석 리포트
                    </p>
                    <p className="mt-1 text-xs text-slate-500">주별 / 월별 상세 분석</p>
                  </button>
                  <button className="group w-full rounded-2xl border border-[#7EC4CF]/40 bg-[#E8F7F9]/80 px-4 py-3 text-left transition hover:border-[#7EC4CF] hover:bg-[#D9EFF2]">
                    <p className="font-semibold text-slate-900 transition group-hover:text-[#4897A2]">
                      → 부모 코칭 팁
                    </p>
                    <p className="mt-1 text-xs text-slate-500">지금 바로 써먹을 수 있는 말걸기</p>
                  </button>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-[#D7EAF0] bg-[#E8F7F9]/70 p-6 shadow-inner">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#E8DAFA]/60 via-transparent to-[#FDE4EC]/70" />
              <div className="relative space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  <Zap size={20} className="text-[#4897A2]" />
                  실시간 코칭
                </h3>
                <p className="text-sm text-slate-600">
                  로봇이 아이와 상호작용할 때 어떤 방식으로 반응하는지 확인해보세요.
                </p>
                <button className="w-full rounded-full bg-[#A678E3] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#8f5cd1]">
                  프리뷰 보기
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Timeline Preview */}
        <div className="relative overflow-hidden rounded-[32px] border border-[#F4D7E8] bg-white/90 p-6 shadow-xl backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_top_left,_rgba(230,223,247,0.5),_transparent_70%)]" />
          <div className="relative space-y-4">
            <h3 className="text-lg font-bold text-slate-900">최근 활동</h3>
            <div className="space-y-3">
              {[
                {
                  time: "14:32",
                  child: '"까까" (물을 요청하는 발성)',
                  intent: "물품 요청",
                  suggestion:
                    '"물 주세요?" 라고 물어보는 형태로 확장해 주세요',
                },
                {
                  time: "12:15",
                  child: '"엄마 엄마"',
                  intent: "사람 부르기",
                  suggestion:
                    '"엄마예요, 엄마가 왔어요" 라고 응답해 주세요',
                },
                {
                  time: "10:44",
                  child: '"바바바"',
                  intent: "음성 실험",
                  suggestion:
                    '"바나나?", "배?", "버터?" 같이 자연스러운 단어로 모델링해 주세요',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 border-b border-white/60 pb-4 last:border-b-0"
                >
                  <div className="flex-shrink-0">
                    <div className="text-sm font-semibold text-[#A678E3]">
                      {item.time}
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="font-medium italic text-slate-900">
                      {item.child}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-[#A678E3]/40 bg-[#F7F2FF]/80 px-3 py-1 text-xs font-semibold text-[#A678E3]">
                        {item.intent}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">
                      💡 {item.suggestion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
