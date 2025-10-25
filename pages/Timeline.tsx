import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Clock, Play, Volume2 } from "lucide-react";
import { authenticatedFetch } from "@/lib/api";

interface TimelineItem {
  id: string;
  date: string;
  time: string;
  childUtterance: string;
  intent: string;
  parentResponse: string;
  audioUrl?: string;
  duration?: number;
  confidence?: number;
}

export default function Timeline() {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    date: '',
    intent: ''
  });

  useEffect(() => {
    fetchTimelineData();
  }, [filters]);

  const fetchTimelineData = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (filters.date) queryParams.append('date', filters.date);
      if (filters.intent) queryParams.append('intent', filters.intent);

      const response = await authenticatedFetch(`/api/timeline?${queryParams}`);

      if (!response.ok) {
        throw new Error('타임라인 데이터를 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      setTimeline(data.timeline || []);
    } catch (err) {
      console.error('Timeline data fetch error:', err);
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout showNav={true}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">타임라인 데이터를 불러오는 중...</p>
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
                onClick={fetchTimelineData}
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
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3">
            <Clock size={32} className="text-primary" />
            발화 타임라인
          </h1>
          <p className="text-muted-foreground">
            날짜별로 아이의 음성 상호작용 기록을 확인하세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Filters */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-card rounded-xl p-4 border">
              <h3 className="font-semibold text-foreground mb-4">필터</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-foreground">
                    날짜
                  </label>
                  <input
                    type="date"
                    value={filters.date}
                    onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    의도
                  </label>
                  <select
                    value={filters.intent}
                    onChange={(e) => setFilters(prev => ({ ...prev, intent: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 border rounded-lg bg-background text-foreground"
                  >
                    <option value="">모두</option>
                    <option value="요청">요청</option>
                    <option value="부르기">부르기</option>
                    <option value="모방">모방</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-2 space-y-4">
            {timeline.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">타임라인 데이터가 없습니다.</p>
              </div>
            ) : (
              timeline.map((item) => (
                <div key={item.id} className="bg-card rounded-xl p-6 border">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm font-semibold text-primary">
                        {item.date} {item.time}
                      </p>
                    </div>
                    <button className="p-2 hover:bg-muted rounded-lg">▶️</button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        아이 발화
                      </p>
                      <p className="text-lg font-semibold text-foreground italic">
                        "{item.childUtterance}"
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        LLM 분석
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {item.intent}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t">
                      <p className="text-xs text-muted-foreground mb-2">
                        권장 부모 반응
                      </p>
                      <p className="text-foreground font-medium">
                        💬 {item.parentResponse}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
