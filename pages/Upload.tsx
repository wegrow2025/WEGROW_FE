import { Layout } from "@/components/Layout";
import {
  Upload as UploadIcon,
  Mic,
  X,
  CheckCircle,
  Bot,
  Volume2,
  Sparkles,
  Waves,
  ShieldCheck,
  Share2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { RealtimeAudio } from "@/components/RealtimeAudio";
import { TTSPlayer } from "@/components/TTSPlayer";

export default function Upload() {
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState<"upload" | "realtime" | "tts">("upload");

  const stats = [
    {
      label: "로봇 자동 수집",
      value: "14개",
      helper: "지난주 대비 +3",
      accent: "#A678E3",
    },
    {
      label: "부모 업로드",
      value: "3개",
      helper: "직접 확인 필요",
      accent: "#E17AA4",
    },
    {
      label: "분석 완료",
      value: "16개",
      helper: "예상 대기 4분",
      accent: "#7EC4CF",
    },
  ];

  const samples = [
    {
      id: 1,
      timestamp: "오늘 14:32",
      duration: "3초",
      source: "로봇 자동 수집",
      status: "분석 완료",
      notes: "",
      waveform: [48, 82, 64, 36, 72, 58, 90, 64, 52, 78, 60, 44],
    },
    {
      id: 2,
      timestamp: "오늘 12:15",
      duration: "5초",
      source: "부모 업로드",
      status: "분석 중...",
      notes: "일반 옹알이",
      waveform: [20, 42, 30, 56, 38, 66, 24, 52, 68, 34, 58, 28],
    },
    {
      id: 3,
      timestamp: "어제 10:44",
      duration: "2초",
      source: "로봇 자동 수집",
      status: "분석 완료",
      notes: "잠꼬대 - 제외됨",
      waveform: [34, 72, 54, 26, 62, 44, 88, 52, 40, 70, 48, 32],
    },
  ];

  const activeTabTitle = useMemo(() => {
    if (activeTab === "realtime") {
      return "실시간 통신";
    }
    if (activeTab === "tts") {
      return "TTS 테스트";
    }
    return "파일 업로드";
  }, [activeTab]);

  return (
    <Layout showNav={true}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 space-y-10">
        <section className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#FDE4EC] via-[#F4E5FB] to-[#E0F1FF] p-8 sm:p-12 shadow-xl">
          <div className="absolute -top-16 -left-10 h-44 w-44 rounded-full bg-white/40 blur-3xl" />
          <div className="absolute -bottom-12 -right-8 h-48 w-48 rounded-full bg-[#E7D7FA]/60 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1.15fr,0.85fr] items-start">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1 text-sm font-semibold text-[#A678E3] shadow-sm">
                <Mic size={18} className="text-[#E17AA4]" />
                아이 목소리 수집 허브
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                녹음부터 분석까지 한 번에, 도담이가 함께해요
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-[#BAABBA]">
                음성 샘플을 업로드하면 AI가 빠르게 분석하여 Growth 리포트에 반영해요. 실시간 통신과 TTS 테스트도 이곳에서 진행할 수 있어요.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl bg-white/80 px-5 py-6 shadow-sm border border-white/60"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: item.accent }}>
                      {item.label}
                    </p>
                    <p className="mt-3 text-2xl font-bold text-slate-900">{item.value}</p>
                    <p className="text-xs text-slate-500">{item.helper}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 sm:p-8 shadow-lg space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#A678E3]">
                    업로드 상태
                  </p>
                  <p className="text-lg font-bold text-slate-900">최근 2시간 내 샘플 5개 수집</p>
                </div>
                <Sparkles className="text-[#E17AA4]" size={24} />
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
                자동으로 수집된 음성과 부모님이 직접 업로드한 샘플을 한곳에서 관리해요. 분석이 완료되면 Growth 리포트에 바로 반영돼요.
              </p>
              <div className="rounded-2xl border border-dashed border-[#F4D7E8] bg-[#FFF7FB] p-4 text-xs font-medium text-slate-600">
                💡 업로드 후 분석까지 평균 4분이 소요돼요. 중요한 샘플은 메모를 남겨주세요!
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setActiveTab("upload")}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E17AA4] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#d0648f] focus:outline-none focus:ring-2 focus:ring-[#E17AA4]/40 focus:ring-offset-2"
                >
                  <UploadIcon size={16} />
                  샘플 올리기
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("realtime")}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#A678E3] px-5 py-2 text-sm font-semibold text-[#A678E3] transition hover:bg-[#FDF5FF] focus:outline-none focus:ring-2 focus:ring-[#A678E3]/30 focus:ring-offset-2"
                >
                  <Waves size={16} />
                  실시간 듣기
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr,0.85fr]">
          <div className="rounded-[32px] border border-[#F4D7E8] bg-white/90 p-6 sm:p-8 shadow-lg space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#A678E3]">수집 모드</p>
                <h2 className="text-2xl font-bold text-slate-900">{activeTabTitle}</h2>
                <p className="text-sm text-slate-500">
                  업로드, 로봇과의 실시간 대화, 그리고 TTS 음성 테스트를 자유롭게 전환해보세요.
                </p>
              </div>
              <div className="flex space-x-1 bg-[#F8F4FF] p-1 rounded-full">
                <button
                  onClick={() => setActiveTab("upload")}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
                    activeTab === "upload"
                      ? "bg-white text-[#A678E3] shadow-sm"
                      : "text-slate-500 hover:text-[#A678E3]"
                  }`}
                >
                  <UploadIcon size={14} />
                  업로드
                </button>
                <button
                  onClick={() => setActiveTab("realtime")}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
                    activeTab === "realtime"
                      ? "bg-white text-[#A678E3] shadow-sm"
                      : "text-slate-500 hover:text-[#A678E3]"
                  }`}
                >
                  <Bot size={14} />
                  실시간
                </button>
                <button
                  onClick={() => setActiveTab("tts")}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
                    activeTab === "tts"
                      ? "bg-white text-[#A678E3] shadow-sm"
                      : "text-slate-500 hover:text-[#A678E3]"
                  }`}
                >
                  <Volume2 size={14} />
                  TTS
                </button>
              </div>
            </div>

            {activeTab === "upload" && (
              <div className="rounded-[28px] border-2 border-dashed border-[#E17AA4]/40 bg-[#FFF7FB] px-6 py-10 text-center transition hover:border-[#E17AA4]/70">
                <div
                  className={`space-y-6 cursor-pointer ${dragActive ? "opacity-75" : ""}`}
                  onDragEnter={() => setDragActive(true)}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={() => setDragActive(false)}
                >
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm mx-auto">
                    <UploadIcon size={28} className="text-[#E17AA4]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-slate-900">음성 파일을 드래그하거나 클릭해서 선택하세요</h3>
                    <p className="text-sm text-slate-500">지원 형식: MP3, WAV, M4A (최대 30초)</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#A678E3] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#8f5cd1] focus:outline-none focus:ring-2 focus:ring-[#A678E3]/40 focus:ring-offset-2">
                      <UploadIcon size={18} />
                      파일 선택
                    </button>
                    <button className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#E17AA4] px-6 py-3 text-sm font-semibold text-[#E17AA4] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#E17AA4]/40 focus:ring-offset-2">
                      <Mic size={18} />
                      바로 녹음하기
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "realtime" && (
              <div className="rounded-[28px] border border-[#A678E3]/30 bg-white/80 p-4 sm:p-6 shadow-inner">
                <RealtimeAudio />
              </div>
            )}

            {activeTab === "tts" && (
              <div className="rounded-[28px] border border-[#7EC4CF]/40 bg-white/80 p-4 sm:p-6 shadow-inner">
                <TTSPlayer defaultText="안녕하세요! 로봇과 대화해보세요." />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-[#F4D7E8] bg-white/90 p-6 sm:p-8 shadow-lg space-y-5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-[#A678E3]" size={24} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#A678E3]">안심 가이드</p>
                  <h3 className="text-lg font-bold text-slate-900">데이터는 안전하게 보관돼요</h3>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
                모든 음성 데이터는 암호화되어 저장되며 부모님이 언제든 삭제할 수 있어요. 샘플별 메모를 남기면 분석에서 제외하거나 우선 분석하도록 표시할 수 있어요.
              </p>
              <div className="rounded-2xl border border-dashed border-[#F4D7E8] bg-[#FFF7FB] p-4 text-xs font-medium text-slate-600">
                🔒 업로드된 파일은 30일이 지나면 자동으로 삭제돼요. 중요한 기록은 Growth 리포트로 내려받아 보관하세요.
              </div>
            </div>

            <div className="rounded-[32px] border border-[#E7D7FA] bg-white/90 p-6 sm:p-8 shadow-lg space-y-5">
              <div className="flex items-center gap-3">
                <Share2 className="text-[#E17AA4]" size={22} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#E17AA4]">활용 팁</p>
                  <h3 className="text-lg font-bold text-slate-900">샘플을 더 잘 기록하는 방법</h3>
                </div>
              </div>
              <ul className="space-y-3 text-sm leading-relaxed text-slate-600">
                <li>• 아이가 새로운 단어를 말하거나 반응할 때 바로 녹음하면 Growth 페이지에서 더 풍부한 리포트를 볼 수 있어요.</li>
                <li>• 주변 소음이 큰 경우엔 메모에 상황을 남겨주세요. 분석 시 참고해 정확도를 높일 수 있어요.</li>
                <li>• 실시간 통신으로 수집된 샘플은 자동 저장돼요. 필요 없는 샘플은 오른쪽 상단 메뉴에서 삭제하세요.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-5 rounded-[36px] border border-[#F4D7E8] bg-white/90 p-8 sm:p-10 shadow-xl">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">최근 녹음 샘플</h2>
            <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600">
              도담이가 분석 중인 샘플을 확인하고 필요한 메모를 남겨주세요. Growth 페이지에 반영될 내용을 미리 확인할 수 있어요.
            </p>
          </div>

          <div className="space-y-4">
            {samples.map((sample) => (
              <div
                key={sample.id}
                className="rounded-[28px] border border-[#F4D7E8] bg-[#FFF7FB] p-6 shadow-sm transition hover:border-[#E17AA4]/60"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#A678E3]">{sample.timestamp}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {sample.duration} • {sample.source}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 self-start rounded-full px-3 py-1 text-xs font-semibold ${
                      sample.status === "분석 완료"
                        ? "bg-[#E8DAFA] text-[#6E3EC1]"
                        : "bg-[#FFE5F1] text-[#C9367C]"
                    }`}
                  >
                    {sample.status === "분석 완료" && <CheckCircle size={14} />}
                    {sample.status}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl bg-white/70 px-4 py-3 shadow-inner">
                  <div className="flex flex-1 items-end gap-1">
                    {sample.waveform.map((height, index) => (
                      <div
                        key={`${sample.id}-${index}`}
                        className="flex-1 rounded-sm bg-[#A678E3]/60"
                        style={{ height: `${height}%`, minHeight: "4px" }}
                      />
                    ))}
                  </div>
                  <button className="shrink-0 rounded-full border border-[#A678E3]/40 px-3 py-1 text-xs font-semibold text-[#A678E3] transition hover:bg-[#FDF5FF]">
                    ▶ 재생
                  </button>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    type="text"
                    placeholder="메모 추가 (예: 잠꼬대, 배경음, 형/누나 음성)"
                    defaultValue={sample.notes}
                    className="flex-1 rounded-full border border-[#F4D7E8] bg-white px-4 py-2 text-sm text-slate-600 placeholder:text-slate-400 focus:border-[#E17AA4] focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <button className="inline-flex items-center justify-center gap-1 rounded-full border border-[#A678E3]/40 px-4 py-2 text-xs font-semibold text-[#A678E3] transition hover:bg-[#FDF5FF]">
                      분석 다시 실행
                    </button>
                    <button className="inline-flex items-center justify-center gap-1 rounded-full border border-[#BAABBA]/60 px-4 py-2 text-xs font-semibold text-[#706478] transition hover:bg-white">
                      <X size={14} />
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}