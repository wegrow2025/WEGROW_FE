import { Layout } from "@/components/Layout";
import {
  Upload as UploadIcon,
  X,
  CheckCircle,
  Bot,
  Volume2,
  Sparkles,
  Waves,
  ShieldCheck,
  Share2,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";

export default function Upload() {
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState<"upload" | "realtime" | "tts">("upload");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [source, setSource] = useState<"parent" | "robot">("parent");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

  const resetStatusMessages = () => {
    setUploadMessage(null);
    setUploadError(null);
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];

    resetStatusMessages();
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("audioFile", file);

      if (duration.trim() !== "") {
        formData.append("duration", duration.trim());
      }

      formData.append("source", source);

      if (notes.trim() !== "") {
        formData.append("notes", notes.trim());
      }

      const response = await fetch(`${API_BASE_URL}/api/audio/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("업로드에 실패했습니다. 다시 시도해주세요.");
      }

      const result = await response.json().catch(() => undefined);
      const message =
        result?.message ?? `${file.name} 파일이 성공적으로 업로드되었습니다.`;

      setUploadMessage(message);
      fileInputRef.current && (fileInputRef.current.value = "");
    } catch (error) {
      console.error("Upload failed", error);
      setUploadError(
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다."
      );
    } finally {
      setIsUploading(false);
    }
  };

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
      source: "수동 업로드",
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
          <section className="lg:grid-cols-[1.15fr,0.85fr]">
          <div className="rounded-[32px] border border-[#F4D7E8] bg-white/90 p-6 sm:p-8 shadow-lg space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#A678E3]">SAMPLE</p>
                <h2 className="text-2xl font-bold text-slate-900">{activeTabTitle}</h2>
                <p className="text-sm text-slate-500">
                  샘플 데이터 업로드
                </p>
              </div>
            </div>

            {activeTab === "upload" && (
              <div
                className="rounded-[28px] border-2 border-dashed border-[#E17AA4]/40 bg-[#FFF7FB] px-6 py-10 text-center transition hover:border-[#E17AA4]/70"
                onDragOver={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setDragActive(true);
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setDragActive(false);
                  if (event.dataTransfer?.files?.length) {
                    handleFiles(event.dataTransfer.files);
                  }
                }}
              >
                <div
                  className={`space-y-6 cursor-pointer ${dragActive ? "opacity-75" : ""}`}
                  onDragEnter={() => setDragActive(true)}
                  onDragLeave={() => setDragActive(false)}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm mx-auto">
                    <UploadIcon size={32} className="text-[#E17AA4]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-slate-900">음성 파일을 드래그하거나 클릭해서 선택하세요</h3>
                    <p className="text-sm text-slate-500">지원 형식: MP3, WAV, M4A (최대 30초)</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#A678E3] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#8f5cd1] focus:outline-none focus:ring-2 focus:ring-[#A678E3]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isUploading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          업로드 중...
                        </>
                      ) : (
                        <>
                          <UploadIcon size={18} />
                          파일 선택
                        </>
                      )}
                    </button>
                    {/* <button className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#E17AA4] px-6 py-3 text-sm font-semibold text-[#E17AA4] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#E17AA4]/40 focus:ring-offset-2">
                      <Mic size={18} />
                      바로 녹음하기
                    </button> */}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/mpeg,audio/wav,audio/x-m4a,audio/mp4,audio/aac"
                    className="hidden"
                    onChange={(event) => handleFiles(event.target.files)}
                  />
                </div>
                <div className="mt-6 space-y-2 text-sm">
                  {uploadMessage && (
                    <p className="rounded-2xl bg-[#E8DAFA] px-4 py-3 font-semibold text-[#6E3EC1]">{uploadMessage}</p>
                  )}
                  {uploadError && (
                    <p className="rounded-2xl bg-[#FFE5F1] px-4 py-3 font-semibold text-[#C9367C]">{uploadError}</p>
                  )}
                </div>
              </div>
            )}
          </div>
          </section>

        <section className="space-y-5 rounded-[36px] border border-[#F4D7E8] bg-white/90 p-8 sm:p-10 shadow-xl">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">최근 녹음 항목</h2>
            <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600">
              {/* 도담이가 분석 중인 샘플을 확인하고 필요한 메모를 남겨주세요. Growth 페이지에 반영될 내용을 미리 확인할 수 있어요. */}
              업로드한 샘플의 상태를 확인하고, 생성된 응답을 확인할 수 있습니다.
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