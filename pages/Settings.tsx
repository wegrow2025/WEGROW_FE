import { Layout } from "@/components/Layout";
import { Settings as SettingsIcon, Toggle as ToggleIcon } from "lucide-react";
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3">
            <SettingsIcon size={32} className="text-primary" />
            설정
          </h1>
          <p className="text-muted-foreground">
            프라이버시와 개인 설정을 관리하세요
          </p>
        </div>

        {/* Data Collection Consent */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-foreground">
            개인정보 & 동의
          </h3>

          <div className="space-y-4">
            <div className="bg-card rounded-xl p-6 border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">
                    음성 데이터 저장
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    아이의 음절성 옹알이를 자동으로 기록해두면, 더 발전된
                    발화로 이어질 수 있게 바로바로 모델링된 표현을 들려줄
                    수 있어요.
                  </p>
                </div>
                <button
                  onClick={() => toggleSetting("recordingCollection")}
                  className={`ml-4 flex-shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.recordingCollection
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.recordingCollection ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">
                    분석에 사용
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    저장된 음성 데이터를 AI 분석에 사용하여 아이의 언어 발달
                    단계를 정확히 파악할 수 있어요.
                  </p>
                </div>
                <button
                  onClick={() => toggleSetting("analysisUsage")}
                  className={`ml-4 flex-shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.analysisUsage ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.analysisUsage ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">
                    코칭 추천 활용
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    아이의 발달 단계에 맞춘 부모 코칭 문구와 말걸기 팁을
                    추천받을 수 있어요.
                  </p>
                </div>
                <button
                  onClick={() => toggleSetting("coachingRecommendations")}
                  className={`ml-4 flex-shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.coachingRecommendations
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.coachingRecommendations
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="space-y-4 border-t pt-6">
          <h3 className="font-bold text-lg text-foreground">알림</h3>

          <div className="space-y-4">
            <div className="bg-card rounded-xl p-6 border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">
                    인앱 알림
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    새로운 의미 있는 시도, 성장 지표 등을 실시간으로 알려드립니다.
                  </p>
                </div>
                <button
                  onClick={() => toggleSetting("notificationsEnabled")}
                  className={`ml-4 flex-shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.notificationsEnabled ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.notificationsEnabled
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">
                    주간 이메일 리포트
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    매주 월요일 아침에 지난주 발달 요약을 이메일로 받으세요.
                  </p>
                </div>
                <button
                  onClick={() => toggleSetting("emailReports")}
                  className={`ml-4 flex-shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.emailReports ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.emailReports ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="space-y-4 border-t pt-6">
          <h3 className="font-bold text-lg text-foreground">계정</h3>

          <div className="space-y-3">
            <div className="bg-card rounded-xl p-4 border flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">이메일</p>
                <p className="font-medium text-foreground">parent@example.com</p>
              </div>
              <button className="text-primary font-semibold hover:text-primary/80">
                변경
              </button>
            </div>

            <div className="bg-card rounded-xl p-4 border flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">아이 월령</p>
                <p className="font-medium text-foreground">18개월</p>
              </div>
              <button className="text-primary font-semibold hover:text-primary/80">
                수정
              </button>
            </div>

            <div className="bg-card rounded-xl p-4 border flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">비밀번호</p>
                <p className="font-medium text-muted-foreground text-sm">
                  ••••••••
                </p>
              </div>
              <button className="text-primary font-semibold hover:text-primary/80">
                변경
              </button>
            </div>
          </div>
        </div>

        {/* Dangerous Zone */}
        <div className="space-y-4 border-t pt-6">
          <h3 className="font-bold text-lg text-destructive">위험 영역</h3>

          <button className="w-full px-4 py-3 rounded-lg border-2 border-destructive text-destructive font-semibold hover:bg-destructive/5 transition">
            모든 데이터 삭제
          </button>

          <button className="w-full px-4 py-3 rounded-lg border-2 border-destructive text-destructive font-semibold hover:bg-destructive/5 transition">
            계정 삭제
          </button>
        </div>

        {/* Footer Links */}
        <div className="border-t pt-6 space-y-2 text-center text-sm text-muted-foreground">
          <p>
            <a href="#" className="text-primary hover:underline">
              이용약관
            </a>
            {" • "}
            <a href="#" className="text-primary hover:underline">
              개인정보 보호
            </a>
          </p>
          <p>Dodam © 2025</p>
        </div>
      </div>
    </Layout>
  );
}
