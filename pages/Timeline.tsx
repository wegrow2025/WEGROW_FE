import { Layout } from "@/components/Layout";
import { Clock } from "lucide-react";

export default function Timeline() {
  return (
    <Layout showNav={true}>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-8 py-12 space-y-10">
        <div className="pointer-events-none absolute inset-x-0 -top-32 h-72 bg-[radial-gradient(circle_at_top,_rgba(230,223,247,0.7),_rgba(255,255,255,0))]" />

        <section className="relative rounded-[32px] border border-[#F4D7E8] bg-white/90 p-6 sm:p-8 shadow-xl backdrop-blur-sm">
          <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_top_left,_rgba(230,223,247,0.6),_transparent_60%)]" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E8DAFA] to-[#FDE4EC] text-[#A678E3] shadow-inner">
                <Clock size={28} />
              </span>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">발화 타임라인</h1>
                <p className="text-sm text-slate-500 sm:text-base">
                  날짜별로 아이의 음성 상호작용 기록을 한눈에 확인하세요
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide">
              <span className="rounded-full border border-[#A678E3]/40 bg-[#F7F2FF] px-3 py-1 text-[#A678E3]">progress</span>
              <span className="rounded-full border border-[#E17AA4]/40 bg-[#FFF2F8] px-3 py-1 text-[#E17AA4]">interaction</span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr,1.1fr] xl:grid-cols-[0.8fr,1.2fr]">
          {/* Filters */}
          <div className="space-y-4">
            <div className="rounded-[28px] border border-[#F4D7E8] bg-[#FFF7FB] p-6 shadow-sm">
              <div className="mb-4 space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#A678E3]">filters</p>
                <h3 className="text-lg font-semibold text-slate-900">기록 탐색</h3>
                <p className="text-sm text-slate-500">필요한 순간을 빠르게 찾아보세요</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    날짜
                  </label>
                  <input
                    type="date"
                    className="mt-2 w-full rounded-xl border border-[#F4D7E8] bg-white/90 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-[#A678E3] focus:outline-none focus:ring-2 focus:ring-[#A678E3]/40"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    의도
                  </label>
                  <select className="mt-2 w-full rounded-xl border border-[#F4D7E8] bg-white/90 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-[#A678E3] focus:outline-none focus:ring-2 focus:ring-[#A678E3]/40">
                    <option>모두</option>
                    <option>요청</option>
                    <option>부르기</option>
                    <option>모방</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-5">
            {[
              {
                date: "오늘",
                time: "14:32",
                child: '"까까"',
                intent: "물품 요청",
                response: '"물 주세요?" 라고 말해주세요',
              },
              {
                date: "어제",
                time: "11:20",
                child: '"엄마"',
                intent: "사람 부르기",
                response: '"엄마가 왔어요" 라고 응답해주세요',
              },
              {
                date: "2일 전",
                time: "09:15",
                child: '"바바바"',
                intent: "음성 실험",
                response:
                  '"바나나", "배", "버터" 같은 단어로 자연스럽게 모델링해주세요',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-[28px] border border-[#F4D7E8] bg-white/95 p-6 shadow-sm"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F7F2FF]/70 via-transparent to-[#FFF0F6]/80" />
                <div className="relative flex flex-col gap-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#A678E3]">
                        기록 시각
                      </p>
                      <p className="text-sm font-semibold text-[#A678E3]">
                        {item.date} · {item.time}
                      </p>
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-full border border-[#E17AA4]/50 bg-[#FFF2F8] px-3 py-1 text-xs font-semibold text-[#E17AA4] transition hover:border-[#E17AA4] hover:bg-[#FFE4F1]">
                      ▶ 재생 미리보기
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-[1.1fr,0.9fr]">
                    <div className="space-y-2 rounded-2xl border border-white/60 bg-white/70 p-4 shadow-inner">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        아이 발화
                      </p>
                      <p className="text-xl font-semibold text-slate-900 italic">{item.child}</p>
                    </div>

                    <div className="space-y-2 rounded-2xl border border-[#F4D7E8] bg-[#F7F2FF]/70 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#A678E3]">
                        LLM 분석
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-[#A678E3]/40 bg-white/90 px-3 py-1 text-xs font-semibold text-[#A678E3]">
                          {item.intent}
                        </span>
                        <span className="rounded-full border border-[#7EC4CF]/40 bg-[#E8F7F9] px-3 py-1 text-xs font-semibold text-[#4897A2]">
                          추천
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#F4D7E8] bg-[#FFF7FB] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#E17AA4]">
                      권장 부모 반응
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-800">
                      💬 {item.response}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
