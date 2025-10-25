import { Layout } from "@/components/Layout";
import { Settings as SettingsIcon } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [settings, setSettings] = useState({
    recordingCollection: true,
    analysisUsage: true,
    coachingRecommendations: true,
    notificationsEnabled: true,
    emailReports: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Layout showNav={true}>
      <div className="mx-auto max-w-4xl px-4 sm:px-8 py-12 space-y-10">
        <section className="rounded-[32px] border border-[#F4D7E8] bg-white/90 p-6 sm:p-8 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E8DAFA] to-[#FDE4EC] text-[#A678E3] shadow-inner">
                <SettingsIcon size={28} />
              </span>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">설정</h1>
                <p className="text-sm text-slate-500 sm:text-base">
                  프라이버시와 개인 설정을 관리하세요
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#A678E3]">
              <span className="rounded-full border border-[#A678E3]/40 bg-[#F7F2FF] px-3 py-1 uppercase tracking-wide">
                personalize
              </span>
              <span className="rounded-full border border-[#E17AA4]/40 bg-[#FFF2F8] px-3 py-1 uppercase tracking-wide text-[#E17AA4]">
                privacy
              </span>
            </div>
          </div>
        </section>

        {/* Data Collection Consent */}
        <section className="space-y-5">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#A678E3]">
              privacy & consent
            </p>
            <h3 className="text-xl font-bold text-slate-900">개인정보 & 동의</h3>
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] border border-[#F4D7E8] bg-[#FFF7FB] p-6 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="mb-2 font-semibold text-slate-900">
                    음성 데이터 저장
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-500">
                    아이의 음절성 옹알이를 자동으로 기록해두면, 더 발전된
                    발화로 이어질 수 있게 바로바로 모델링된 표현을 들려줄
                    수 있어요.
                  </p>
                </div>
                <button
                  onClick={() => toggleSetting("recordingCollection")}
                  className={`ml-4 flex-shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-all ${
                    settings.recordingCollection
                      ? "bg-[#A678E3]"
                      : "bg-[#E6DFF7]"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      settings.recordingCollection ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#F4D7E8] bg-[#FFF7FB] p-6 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="mb-2 font-semibold text-slate-900">
                    분석에 사용
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-500">
                    저장된 음성 데이터를 AI 분석에 사용하여 아이의 언어 발달
                    단계를 정확히 파악할 수 있어요.
                  </p>
                </div>
                <button
                  onClick={() => toggleSetting("analysisUsage")}
                  className={`ml-4 flex-shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-all ${
                    settings.analysisUsage ? "bg-[#A678E3]" : "bg-[#E6DFF7]"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      settings.analysisUsage ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#F4D7E8] bg-[#FFF7FB] p-6 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="mb-2 font-semibold text-slate-900">
                    코칭 추천 활용
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-500">
                    아이의 발달 단계에 맞춘 부모 코칭 문구와 말걸기 팁을
                    추천받을 수 있어요.
                  </p>
                </div>
                <button
                  onClick={() => toggleSetting("coachingRecommendations")}
                  className={`ml-4 flex-shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-all ${
                    settings.coachingRecommendations
                      ? "bg-[#A678E3]"
                      : "bg-[#E6DFF7]"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      settings.coachingRecommendations
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Notification Settings */}
        <section className="space-y-5 border-t border-[#F4D7E8] pt-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#A678E3]">notifications</p>
            <h3 className="text-xl font-bold text-slate-900">알림</h3>
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] border border-[#F4D7E8] bg-[#FFF7FB] p-6 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="mb-2 font-semibold text-slate-900">
                    인앱 알림
                  </h4>
                  <p className="text-sm text-slate-500">
                    새로운 의미 있는 시도, 성장 지표 등을 실시간으로 알려드립니다.
                  </p>
                </div>
                <button
                  onClick={() => toggleSetting("notificationsEnabled")}
                  className={`ml-4 flex-shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-all ${
                    settings.notificationsEnabled ? "bg-[#A678E3]" : "bg-[#E6DFF7]"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      settings.notificationsEnabled
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#F4D7E8] bg-[#FFF7FB] p-6 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="mb-2 font-semibold text-slate-900">
                    주간 이메일 리포트
                  </h4>
                  <p className="text-sm text-slate-500">
                    매주 월요일 아침에 지난주 발달 요약을 이메일로 받으세요.
                  </p>
                </div>
                <button
                  onClick={() => toggleSetting("emailReports")}
                  className={`ml-4 flex-shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-all ${
                    settings.emailReports ? "bg-[#A678E3]" : "bg-[#E6DFF7]"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      settings.emailReports ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Account Settings */}
        <section className="space-y-5 border-t border-[#F4D7E8] pt-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#A678E3]">account</p>
            <h3 className="text-xl font-bold text-slate-900">계정</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-2xl border border-[#F4D7E8] bg-white/90 p-4 shadow-sm">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[#A678E3]">이메일</p>
                <p className="font-medium text-slate-900">parent@example.com</p>
              </div>
              <button className="rounded-full border border-[#A678E3]/40 px-4 py-2 text-sm font-semibold text-[#A678E3] transition hover:bg-[#FDF5FF]">
                변경
              </button>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-[#F4D7E8] bg-white/90 p-4 shadow-sm">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[#A678E3]">아이 월령</p>
                <p className="font-medium text-slate-900">18개월</p>
              </div>
              <button className="rounded-full border border-[#A678E3]/40 px-4 py-2 text-sm font-semibold text-[#A678E3] transition hover:bg-[#FDF5FF]">
                수정
              </button>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-[#F4D7E8] bg-white/90 p-4 shadow-sm">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[#A678E3]">비밀번호</p>
                <p className="text-sm font-medium text-slate-500">
                  ••••••••
                </p>
              </div>
              <button className="rounded-full border border-[#A678E3]/40 px-4 py-2 text-sm font-semibold text-[#A678E3] transition hover:bg-[#FDF5FF]">
                변경
              </button>
            </div>
          </div>
        </section>

        {/* Dangerous Zone */}
        <section className="space-y-4 border-t border-[#F4D7E8] pt-6">
          <h3 className="text-xl font-bold text-[#D6456E]">위험 영역</h3>

          <button className="w-full rounded-2xl border-2 border-[#F5A6B8] bg-[#FFF1F5] px-4 py-3 text-sm font-semibold text-[#D6456E] transition hover:bg-[#FFE5EE]">
            모든 데이터 삭제
          </button>

          <button className="w-full rounded-2xl border-2 border-[#F5A6B8] bg-[#FFF1F5] px-4 py-3 text-sm font-semibold text-[#D6456E] transition hover:bg-[#FFE5EE]">
            계정 삭제
          </button>
        </section>

        {/* Footer Links */}
        <div className="space-y-2 border-t border-[#F4D7E8] pt-6 text-center text-sm text-slate-500">
          <p>
            <a href="#" className="font-semibold text-[#E17AA4] transition hover:text-[#d0648f]">
              이용약관
            </a>
            {" • "}
            <a href="#" className="font-semibold text-[#E17AA4] transition hover:text-[#d0648f]">
              개인정보 보호
            </a>
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-[#A678E3]">Dodam © 2025</p>
        </div>
      </div>
    </Layout>
  );
}
