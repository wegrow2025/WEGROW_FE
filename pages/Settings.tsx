import { Layout } from "@/components/Layout";
import { Settings as SettingsIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { authenticatedFetch } from "@/lib/api";

interface UserSettings {
  recordingCollection: boolean;
  analysisUsage: boolean;
  coachingRecommendations: boolean;
  notificationsEnabled: boolean;
  emailReports: boolean;
}

interface UserProfile {
  email: string;
  childAge: number;
}

// API_BASE_URL은 더 이상 필요하지 않음 (authenticatedFetch 사용)

export default function Settings() {
  const [settings, setSettings] = useState<UserSettings>({
    recordingCollection: true,
    analysisUsage: true,
    coachingRecommendations: true,
    notificationsEnabled: true,
    emailReports: true,
  });
  const [userProfile, setUserProfile] = useState<UserProfile>({
    email: '',
    childAge: 18
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettingsData();
  }, []);

  const fetchSettingsData = async () => {
    try {
      setLoading(true);
      const response = await authenticatedFetch('/api/settings');

      if (!response.ok) {
        throw new Error('설정 데이터를 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      setSettings({
        recordingCollection: data.recordingCollection,
        analysisUsage: data.analysisUsage,
        coachingRecommendations: data.coachingRecommendations,
        notificationsEnabled: data.notificationsEnabled,
        emailReports: data.emailReports,
      });
      setUserProfile({
        email: data.user.email,
        childAge: data.user.childAge
      });
    } catch (err) {
      console.error('Settings data fetch error:', err);
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      const response = await authenticatedFetch('/api/settings', {
        method: 'PUT',
        body: JSON.stringify(settings)
      });

      if (!response.ok) {
        throw new Error('설정 저장에 실패했습니다.');
      }

      console.log('Settings saved successfully');
    } catch (err) {
      console.error('Save settings error:', err);
      setError(err instanceof Error ? err.message : '설정 저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (loading) {
    return (
      <Layout showNav={true}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">설정 데이터를 불러오는 중...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout showNav={true}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-destructive mb-4">{error}</p>
              <button
                onClick={fetchSettingsData}
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
                  className={`ml-4 flex-shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.recordingCollection
                    ? "bg-primary"
                    : "bg-muted"
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.recordingCollection ? "translate-x-6" : "translate-x-1"
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
                  className={`ml-4 flex-shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.analysisUsage ? "bg-primary" : "bg-muted"
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.analysisUsage ? "translate-x-6" : "translate-x-1"
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
                  className={`ml-4 flex-shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.coachingRecommendations
                    ? "bg-primary"
                    : "bg-muted"
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.coachingRecommendations
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
                  className={`ml-4 flex-shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.notificationsEnabled ? "bg-primary" : "bg-muted"
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.notificationsEnabled
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
                  className={`ml-4 flex-shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.emailReports ? "bg-primary" : "bg-muted"
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.emailReports ? "translate-x-6" : "translate-x-1"
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

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={saveSettings}
            disabled={saving}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {saving ? '저장 중...' : '설정 저장'}
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
          <p>We:Grow © 2025</p>
        </div>
      </div>
    </Layout>
  );
}
