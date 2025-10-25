import { Layout } from "@/components/Layout";
import {
  Settings as SettingsIcon,
  Mic,
  BrainCircuit,
  Sparkles,
  Bell,
  Mail,
  Baby,
  ShieldAlert,
  Lock,
} from "lucide-react";
import { useState, useEffect } from "react";
import { authenticatedFetch } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

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

type SettingKey = keyof UserSettings;

interface SettingItem {
  key: SettingKey;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
}

export default function Settings() {
  const [settings, setSettings] = useState<UserSettings>({
    recordingCollection: true,
    analysisUsage: true,
    coachingRecommendations: true,
    notificationsEnabled: true,
    emailReports: true,
  });
  const [userProfile, setUserProfile] = useState<UserProfile>({
    email: "",
    childAge: 0,
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
      const response = await authenticatedFetch("/api/settings");

      if (!response.ok) {
        throw new Error("설정 데이터를 불러오는데 실패했습니다.");
      }

      const data = await response.json();

      setSettings({
        recordingCollection: Boolean(data.recordingCollection),
        analysisUsage: Boolean(data.analysisUsage),
        coachingRecommendations: Boolean(data.coachingRecommendations),
        notificationsEnabled: Boolean(data.notificationsEnabled),
        emailReports: Boolean(data.emailReports),
      });

      setUserProfile({
        email: data?.user?.email ?? "",
        childAge: Number.isFinite(data?.user?.childAge)
          ? Number(data.user.childAge)
          : 0,
      });
      setError(null);
    } catch (err) {
      console.error("Settings data fetch error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "알 수 없는 오류가 발생했습니다.",
      );
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      const response = await authenticatedFetch("/api/settings", {
        method: "PUT",
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error("설정 저장에 실패했습니다.");
      }

      console.log("Settings saved successfully");
      setError(null);
    } catch (err) {
      console.error("Save settings error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "설정 저장 중 오류가 발생했습니다.",
      );
    } finally {
      setSaving(false);
    }
  };

  const toggleSetting = (key: SettingKey) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleButtonClasses = (active: boolean) =>
    cn(
      "ml-4 flex-shrink-0 relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      active
        ? "bg-primary shadow-[0_10px_30px_-12px_rgba(99,102,241,0.9)]"
        : "bg-muted",
    );

  const toggleThumbClasses = (active: boolean) =>
    cn(
      "inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform",
      active ? "translate-x-7" : "translate-x-1",
    );

  const privacyOptions: SettingItem[] = [
    {
      key: "recordingCollection",
      title: "음성 데이터 저장",
      description:
        "아이의 옹알이를 안전하게 기록해 보다 정교한 발화 모델링을 제공합니다.",
      icon: Mic,
      accent: "bg-primary/10 text-primary",
    },
    {
      key: "analysisUsage",
      title: "AI 분석 활용",
      description:
        "수집된 데이터를 AI가 분석하여 아이의 언어 발달 단계와 패턴을 파악합니다.",
      icon: BrainCircuit,
      accent: "bg-secondary/10 text-secondary-foreground",
    },
    {
      key: "coachingRecommendations",
      title: "코칭 추천",
      description:
        "아이의 발달 속도에 맞춘 맞춤형 부모 코칭 문장과 말걸기 팁을 드립니다.",
      icon: Sparkles,
      accent: "bg-amber-100 text-amber-600",
    },
  ];

  const notificationOptions: SettingItem[] = [
    {
      key: "notificationsEnabled",
      title: "인앱 알림",
      description:
        "성장 지표 업데이트와 의미 있는 순간을 실시간으로 알려드려요.",
      icon: Bell,
      accent: "bg-blue-100 text-blue-600",
    },
    {
      key: "emailReports",
      title: "주간 이메일 리포트",
      description:
        "매주 월요일, 지난주 발달 요약과 추천 액션을 이메일로 받습니다.",
      icon: Mail,
      accent: "bg-emerald-100 text-emerald-600",
    },
  ];

  const accountItems = [
    {
      label: "이메일",
      value: userProfile.email || "연결된 이메일이 없습니다.",
      actionLabel: "변경",
      icon: Mail,
    },
    {
      label: "아이 월령",
      value:
        userProfile.childAge > 0
          ? `${userProfile.childAge}개월`
          : "월령 정보가 필요합니다.",
      actionLabel: "수정",
      icon: Baby,
    },
    {
      label: "비밀번호",
      value: "보안을 위해 숨김 처리되어 있습니다.",
      actionLabel: "변경",
      icon: Lock,
    },
  ];

  const renderSettingCard = (item: SettingItem) => {
    const Icon = item.icon;
    const isActive = settings[item.key];

    return (
      <div
        key={item.key}
        className="relative overflow-hidden rounded-2xl border bg-card/80 p-6 shadow-sm transition hover:shadow-lg"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-primary/5 opacity-70" />
        <div className="relative flex items-start justify-between gap-6">
          <div className="space-y-2">
            <div className={cn("inline-flex h-12 w-12 items-center justify-center rounded-full", item.accent)}>
              <Icon size={24} />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground">
                {item.title}
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => toggleSetting(item.key)}
            className={toggleButtonClasses(isActive)}
            aria-pressed={isActive}
            aria-label={`${item.title} ${isActive ? "사용" : "미사용"}`}
          >
            <span className={toggleThumbClasses(isActive)} />
          </button>
        </div>
      </div>
    );
  };

  const formatChildAgeDetail = () => {
    if (userProfile.childAge <= 0) {
      return "아이 월령 정보를 설정하면 맞춤형 리포트를 더 정확하게 제공할 수 있어요.";
    }

    if (userProfile.childAge < 12) {
      return "생후 1년 이내의 성장 변화에 맞춰 세밀한 팁을 전해드릴게요.";
    }

    if (userProfile.childAge < 36) {
      return "폭발적으로 성장하는 언어 감수성을 기반으로 맞춤 코칭을 제공합니다.";
    }

    return "다양한 표현이 터져 나오는 시기! 심화 코칭 모드가 활성화되어 있어요.";
  };

  if (loading) {
    return (
      <Layout showNav={true}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-center justify-center">
            <div className="rounded-3xl border bg-card/80 p-12 text-center shadow-lg">
              <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-b-2 border-primary" />
              <p className="text-muted-foreground">설정 데이터를 불러오는 중이에요...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout showNav={true}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-10 text-center shadow-lg">
            <p className="mb-6 text-destructive">{error}</p>
            <button
              type="button"
              onClick={fetchSettingsData}
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90"
            >
              다시 시도하기
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showNav={true}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-8 shadow-xl">
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-10 -bottom-12 h-48 w-48 rounded-full bg-secondary/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 rounded-full bg-primary/15 px-4 py-2 text-sm font-semibold text-primary">
                <SettingsIcon size={18} />
                맞춤 설정 허브
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                  내 계정과 프라이버시를 한눈에 관리해요
                </h1>
                <p className="mt-3 max-w-xl text-base text-muted-foreground">
                  데이터 활용 범위와 알림 방식을 선택해 나와 아이에게 꼭 맞는 성장 경험을 설계하세요.
                </p>
              </div>
            </div>

            <div className="relative rounded-2xl border bg-background/80 p-5 shadow-lg backdrop-blur-sm">
              <p className="text-sm font-medium text-muted-foreground">연결된 계정</p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                {userProfile.email || "이메일 정보가 필요해요"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {userProfile.childAge > 0
                  ? `${userProfile.childAge}개월 아이와 함께 성장 중`
                  : "아이 정보를 입력하면 더 맞춤화됩니다."}
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <header className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">프라이버시 & 동의</h2>
            <p className="text-sm text-muted-foreground">
              데이터 활용을 통해 제공되는 혜택과 범위를 직접 선택할 수 있어요.
            </p>
          </header>

          <div className="grid gap-4">
            {privacyOptions.map((option) => renderSettingCard(option))}
          </div>
        </section>

        <section className="space-y-6">
          <header className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">알림</h2>
            <p className="text-sm text-muted-foreground">
              놓치고 싶지 않은 성장 순간을 편한 채널로 받아보세요.
            </p>
          </header>

          <div className="grid gap-4">
            {notificationOptions.map((option) => renderSettingCard(option))}
          </div>
        </section>

        <section className="space-y-6">
          <header className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">계정 관리</h2>
            <p className="text-sm text-muted-foreground">기본 정보를 최신 상태로 유지하면 더욱 정밀한 코칭을 받을 수 있어요.</p>
          </header>

          <div className="grid gap-4 sm:grid-cols-3">
            {accountItems.map(({ label, value, actionLabel, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col justify-between rounded-2xl border bg-card/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="space-y-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {value}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-muted px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-primary hover:text-primary-foreground"
                >
                  {actionLabel}
                </button>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border bg-gradient-to-r from-secondary/10 via-background to-primary/10 p-6 shadow-inner">
            <p className="text-sm text-muted-foreground">{formatChildAgeDetail()}</p>
          </div>
        </section>

        <section className="space-y-6">
          <header className="space-y-2">
            <h2 className="text-2xl font-semibold text-destructive">위험 영역</h2>
            <p className="text-sm text-muted-foreground">
              데이터 삭제는 즉시 반영되며 복구가 불가능하니 신중히 진행해주세요.
            </p>
          </header>

          <div className="space-y-4">
            <button
              type="button"
              className="w-full rounded-2xl border-2 border-destructive/80 bg-destructive/10 px-4 py-4 text-sm font-semibold text-destructive transition hover:border-destructive hover:bg-destructive/15"
            >
              모든 데이터 삭제
            </button>
            <button
              type="button"
              className="w-full rounded-2xl border-2 border-destructive/80 bg-destructive/10 px-4 py-4 text-sm font-semibold text-destructive transition hover:border-destructive hover:bg-destructive/15"
            >
              계정 삭제
            </button>
          </div>
        </section>

        <div className="flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-10 w-10 rounded-full bg-primary/10 p-2 text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">모든 변경 사항을 저장하세요</p>
              <p className="text-xs text-muted-foreground">
                저장하지 않으면 페이지를 떠날 때 이전 상태로 되돌아갑니다.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={saveSettings}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "저장 중..." : "설정 저장"}
          </button>
        </div>

        <footer className="border-t pt-6 text-center text-sm text-muted-foreground">
          <p>
            <a href="#" className="text-primary hover:underline">
              이용약관
            </a>
            {" • "}
            <a href="#" className="text-primary hover:underline">
              개인정보 보호
            </a>
            {" • "}
            <a href="#" className="text-primary hover:underline">
              도움말 센터
            </a>
          </p>
          <p className="mt-2">We:Grow © 2025</p>
        </footer>
      </div>
    </Layout>
  );
}
