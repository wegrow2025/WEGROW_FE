import { Layout } from "@/components/Layout";
import { Clock } from "lucide-react";

export default function Timeline() {
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
                    className="w-full mt-1 px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    의도
                  </label>
                  <select className="w-full mt-1 px-3 py-2 border rounded-lg bg-background text-foreground">
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
          <div className="lg:col-span-2 space-y-4">
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
              <div key={idx} className="bg-card rounded-xl p-6 border">
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
                      {item.child}
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
