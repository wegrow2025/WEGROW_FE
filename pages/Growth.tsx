import { Layout } from "@/components/Layout";
import { TrendingUp, Download, Share2 } from "lucide-react";

export default function Growth() {
  return (
    <Layout showNav={true}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3">
            <TrendingUp size={32} className="text-primary" />
            성장 분석
          </h1>
          <p className="text-muted-foreground">
            주별 / 월별 언어 발달 리포트를 확인하세요
          </p>
        </div>

        {/* Report Period Selection */}
        <div className="flex gap-2 flex-wrap">
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold">
            이번 주
          </button>
          <button className="px-4 py-2 rounded-lg border text-foreground hover:bg-muted transition">
            지난주
          </button>
          <button className="px-4 py-2 rounded-lg border text-foreground hover:bg-muted transition">
            이번 달
          </button>
          <button className="px-4 py-2 rounded-lg border text-foreground hover:bg-muted transition">
            지난달
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-6 border">
            <p className="text-sm text-muted-foreground mb-2">음절 조합</p>
            <p className="text-3xl font-bold text-primary">+12%</p>
            <p className="text-xs text-primary mt-2">지난주보다 증가</p>
          </div>
          <div className="bg-card rounded-xl p-6 border">
            <p className="text-sm text-muted-foreground mb-2">의미 있는 시도</p>
            <p className="text-3xl font-bold text-secondary">+8%</p>
            <p className="text-xs text-secondary mt-2">지난주보다 증가</p>
          </div>
          <div className="bg-card rounded-xl p-6 border">
            <p className="text-sm text-muted-foreground mb-2">총 상호작용</p>
            <p className="text-3xl font-bold text-accent-foreground">127회</p>
            <p className="text-xs text-muted-foreground mt-2">
              지난주: 114회
            </p>
          </div>
        </div>

        {/* Analysis Cards */}
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20">
            <h3 className="font-semibold text-foreground mb-2">
              이번 주 하이라이트 ⭐
            </h3>
            <p className="text-foreground leading-relaxed">
              아이가 이번 주에 처음으로 두 음절 이상의 조합을 시도했습니다.
              특히 "바나나", "엄마" 같은 표현에서 더 명확한 발음이 나타나고
              있습니다. 이는 아이의 음성 인지와 모방 능력이 발달 중임을
              보여주는 긍정적 신호입니다.
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 border">
            <h3 className="font-semibold text-foreground mb-4">
              월령 기준 비교 (18개월)
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    옹알이 발성
                  </span>
                  <span className="text-sm font-bold text-primary">75%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: "75%" }}
                  />
                </div>
                <p className="text-xs text-primary mt-1">
                  같은 월령 평균보다 높음
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    단어 생산
                  </span>
                  <span className="text-sm font-bold text-secondary">50%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-secondary h-full rounded-full"
                    style={{ width: "50%" }}
                  />
                </div>
                <p className="text-xs text-secondary mt-1">
                  같은 월령 평균 범위 내
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    의사소통 시도
                  </span>
                  <span className="text-sm font-bold text-accent-foreground">
                    60%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-accent h-full rounded-full"
                    style={{ width: "60%" }}
                  />
                </div>
                <p className="text-xs text-accent-foreground mt-1">
                  같은 월령 평균보다 높음
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Export/Share */}
        <div className="flex gap-3">
          <button className="flex-1 px-4 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/5 transition flex items-center justify-center gap-2">
            <Download size={20} />
            PDF 다운로드
          </button>
          <button className="flex-1 px-4 py-3 rounded-lg border border-secondary text-secondary font-semibold hover:bg-secondary/5 transition flex items-center justify-center gap-2">
            <Share2 size={20} />
            공유
          </button>
        </div>

        {/* Consultation Note */}
        <div className="bg-muted/50 rounded-xl p-6 border">
          <p className="text-sm text-foreground leading-relaxed">
            <span className="font-semibold">💡 부모님께:</span> 이 리포트는
            소아과나 언어치료 상담 시 참고 자료로 활용할 수 있습니다. 위의
            "PDF 다운로드" 버튼을 눌러 전문 의료진과 공유해 주세요.
          </p>
        </div>
      </div>
    </Layout>
  );
}
