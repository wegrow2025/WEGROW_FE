import { useMemo, useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { TrendingUp, Volume2, MessageCircle, Zap, ArrowUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { authenticatedFetch } from "@/lib/api";

interface DailyReport {
  vocalizations: number;
  syllableCombinations: number;
  meaningfulAttempts: number;
  newWords: number;
  previousDay?: {
    vocalizations: number;
  };
  summary: string;
  recommendedResponse: string;
  date: string;
}

interface AgeComparison {
  vocalizationScore: number;
  wordUnderstandingScore: number;
  communicationScore: number;
  interpretation: string;
  childAge: number;
}

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [report, setReport] = useState<DailyReport>({
    vocalizations: 0,
    syllableCombinations: 0,
    meaningfulAttempts: 0,
    newWords: 0,
    previousDay: { vocalizations: 0 },
    summary: "",
    recommendedResponse: "",
    date: new Date().toISOString().split('T')[0]
  });
  const [ageComparison, setAgeComparison] = useState<AgeComparison>({
    vocalizationScore: 0,
    wordUnderstandingScore: 0,
    communicationScore: 0,
    interpretation: "",
    childAge: 18
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [dailyReportResponse, ageComparisonResponse] = await Promise.all([
        authenticatedFetch('/api/dashboard/daily-report'),
        authenticatedFetch('/api/dashboard/age-comparison')
      ]);

      if (!dailyReportResponse.ok || !ageComparisonResponse.ok) {
        throw new Error('데이터를 불러오는데 실패했습니다.');
      }

      const dailyReportData = await dailyReportResponse.json();
      const ageComparisonData = await ageComparisonResponse.json();

      setReport(dailyReportData);
      setAgeComparison(ageComparisonData);
    } catch (err) {
      console.error('Dashboard data fetch error:', err);
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <Layout showNav={true}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">데이터를 불러오는 중...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout showNav={true}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-destructive mb-4">{error}</p>
              <button
                onClick={fetchDashboardData}
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            안녕하세요! {userName}님! 🎉
          </h1>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString("ko-KR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Main Report Card */}
        <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 rounded-2xl p-6 sm:p-8 border border-primary/20 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              오늘 우리 아이 언어 리포트
            </h2>
            <button className="p-2 hover:bg-muted rounded-lg transition text-muted-foreground hover:text-foreground">
              <Volume2 size={24} />
            </button>
          </div>

          {/* Report Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Vocalizations */}
            <div className="bg-card rounded-xl p-4 border">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    총 옹알이
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {report.vocalizations}
                  </p>
                </div>
                <div className="text-2xl">🗣️</div>
              </div>
              {vocalizationChange !== 0 && (
                <p
                  className={`text-xs font-semibold flex items-center gap-1 ${isPositive ? "text-primary" : "text-destructive"}`}
                >
                  <ArrowUp size={14} />
                  어제보다 {Math.abs(vocalizationChange)}회
                </p>
              )}
            </div>

            {/* Syllable Combinations */}
            <div className="bg-card rounded-xl p-4 border">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    음절 조합
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {report.syllableCombinations}
                  </p>
                </div>
                <div className="text-2xl">🎵</div>
              </div>
              <p className="text-xs text-primary font-semibold">신규!</p>
            </div>

            {/* Meaningful Attempts */}
            <div className="bg-card rounded-xl p-4 border">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    의미 있는 시도
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {report.meaningfulAttempts}
                  </p>
                </div>
                <div className="text-2xl">⭐</div>
              </div>
              <p className="text-xs text-muted-foreground">
                예: 상징적 단어
              </p>
            </div>

            {/* New Words */}
            <div className="bg-card rounded-xl p-4 border border-accent/50 bg-accent/5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">새로운 단어</p>
                  <p className="text-3xl font-bold text-accent-foreground">
                    {report.newWords}
                  </p>
                </div>
                <div className="text-2xl">🆕</div>
              </div>
              <p className="text-xs text-accent-foreground font-semibold">
                "까까" (물 표현)
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-card rounded-xl p-4 border border-secondary/20 bg-secondary/5">
            <p className="text-foreground leading-relaxed">
              <span className="font-semibold text-secondary">좋은 소식! 👏</span>
              <br />
              {report.summary}
            </p>
          </div>

          {/* Recommended Response Guide */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 border border-primary/20">
            <p className="text-sm text-muted-foreground mb-2">
              지금 해주면 좋은 말 💬
            </p>
            <p className="text-lg font-semibold text-foreground italic">
              "{report.recommendedResponse}"
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              ✓ 아이의 시도를 자연스럽게 확장해서 모델링해주기
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Age-based Comparison */}
          <div className="bg-card rounded-2xl p-6 border">
            <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-primary" />
              월령 기준 비교
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    음절성 옹알이
                  </span>
                  <span className="text-sm font-bold text-primary">
                    상위 20%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{
                    width: `${ageComparison.vocalizationScore}%`
                  }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {ageComparison.childAge}개월 평균 범위를 넘어섰습니다
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    단어 이해
                  </span>
                  <span className="text-sm font-bold text-secondary">
                    평균 범위 내
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{
                    width: `${ageComparison.wordUnderstandingScore}%`
                  }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  같은 월령 평균 정도입니다
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    의미 있는 시도
                  </span>
                  <span className="text-sm font-bold text-accent-foreground">
                    평균보다 높음
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="bg-accent h-full rounded-full" style={{
                    width: `${ageComparison.communicationScore}%`
                  }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  아이가 의사소통을 주도적으로 시도 중
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-sm text-foreground">
                <span className="font-semibold">💡 해석:</span> {ageComparison.interpretation}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="bg-card rounded-2xl p-6 border">
              <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                <MessageCircle size={20} className="text-primary" />
                빠른 실행
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 transition group">
                  <p className="font-semibold text-foreground group-hover:text-primary transition">
                    → 전체 타임라인 보기
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    시간별 음성 상호작용 기록
                  </p>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg bg-secondary/10 hover:bg-secondary/20 border border-secondary/20 transition group">
                  <p className="font-semibold text-foreground group-hover:text-secondary transition">
                    → 성장 분석 리포트
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    주별 / 월별 상세 분석
                  </p>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg bg-accent/10 hover:bg-accent/20 border border-accent/20 transition group">
                  <p className="font-semibold text-foreground group-hover:text-accent-foreground transition">
                    → 부모 코칭 팁
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    지금 바로 써먹을 수 있는 말걸기
                  </p>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20">
              <h3 className="font-bold text-lg text-foreground mb-3 flex items-center gap-2">
                <Zap size={20} className="text-accent" />
                실시간 코칭
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                로봇이 아이와 상호작용할 때 어떤 방식으로 반응하는지 확인해보세요.
              </p>
              <button className="w-full px-4 py-2 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition">
                프리뷰 보기
              </button>
            </div>
          </div>
        </div>

        {/* Recent Timeline Preview */}
        <div className="bg-card rounded-2xl p-6 border">
          <h3 className="font-bold text-lg text-foreground mb-4">최근 활동</h3>
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
                className="flex gap-4 pb-4 border-b last:border-b-0"
              >
                <div className="flex-shrink-0">
                  <div className="text-sm font-semibold text-primary">
                    {item.time}
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <p className="font-medium text-foreground italic">
                    {item.child}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {item.intent}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    💡 {item.suggestion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
