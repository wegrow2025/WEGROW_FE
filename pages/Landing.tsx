import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50 to-background">
      {/* Navigation */}
      <nav className="flex items-center justify-between h-16 px-4 sm:px-6 border-b bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">W</span>
          </div>
          <span className="text-lg font-bold text-primary hidden sm:inline">
            We:Grow
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-foreground hover:text-primary transition">
            로그인
          </button>
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition text-sm"
          >
            시작하기
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            <span className="text-primary">We:Grow</span>
            <br />
            아이와 함께 성장하는 로봇 친구
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            아이의 발화를 과학적으로 분석하고, 부모에게는 지금 바로 써먹을 수 있는 말걸기 방법을 알려줍니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/dashboard"
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2"
            >
              무료로 시작하기 <ArrowRight size={20} />
            </Link>
            <button className="px-8 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition flex items-center justify-center gap-2">
              데모 보기 <Play size={20} />
            </button>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 sm:p-12 border border-primary/20 mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium">
                🎯 과학 기반 분석
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                아이의 목소리에서 의미를 찾다
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                아이의 모든 옹알이, 첫 단어, 문장 시도를 실시간으로 기록하고 분석합니다. 로봇 친구가 듣고 응답하면서 자연스럽게 더 풍부한 언어 입력을 제공합니다.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center space-y-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/6134/6134346.png"
                  alt="Robot"
                  className="w-10 h-10 mx-auto"
                />
                <p className="text-sm font-medium text-muted-foreground">
                  실시간 음성 분석
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24">
          <div className="bg-card rounded-xl p-6 border hover:border-primary/50 transition">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-semibold text-lg text-foreground mb-2">
              오늘의 언어 리포트
            </h3>
            <p className="text-sm text-muted-foreground">
              아이가 오늘 어떤 소리를 냈는지, 몇 개의 의미 있는 시도를 했는지 한눈에 확인하세요.
            </p>
          </div>
          <div className="bg-card rounded-xl p-6 border hover:border-primary/50 transition">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="font-semibold text-lg text-foreground mb-2">
              말걸기 스크립트
            </h3>
            <p className="text-sm text-muted-foreground">
              전문 용어 없이, 부모가 지금 바로 써먹을 수 있는 자연스러운 표현을 제시합니다.
            </p>
          </div>
          <div className="bg-card rounded-xl p-6 border hover:border-primary/50 transition">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="font-semibold text-lg text-foreground mb-2">
              성장 추적
            </h3>
            <p className="text-sm text-muted-foreground">
              주·월 단위로 아이의 언어 발달을 시각적으로 비교하고 같은 월령 또래와 비교합니다.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-br from-background to-muted rounded-2xl p-8 sm:p-12 border mb-24">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            어떻게 작동할까요?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "로봇 친구가 귀 기울인다",
                desc: "아이가 말할 때마다 로봇이 음성을 캡처합니다.",
              },
              {
                step: "2",
                title: "AI가 분석한다",
                desc: "아이 발화의 음절, 의도, 발달 단계를 분석합니다.",
              },
              {
                step: "3",
                title: "로봇이 응답한다",
                desc: '모델링된 확장 표현으로 응답합니다 (예: "바바" → "바나나?")',
              },
              {
                step: "4",
                title: "부모가 배운다",
                desc: "대시보드에서 아이 발달을 보고 말걸기 방법을 배웁니다.",
              },
            ].map((item) => (
              <div key={item.step} className="space-y-3">
                <div className="inline-block w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Real Scenario */}
        <div className="space-y-8 mb-24">
          <h2 className="text-3xl font-bold text-foreground text-center">
            실제 사용 시나리오
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Scenario 1 */}
            <div className="bg-card rounded-xl p-6 border">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg h-40 flex items-center justify-center mb-4">
                <div className="text-center space-y-2">
                  <div className="text-4xl">👶</div>
                  <p className="text-sm text-muted-foreground">아이 방</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="font-semibold text-foreground">아이: "바 바 바" (옹알이)</p>
                <p className="text-sm text-muted-foreground">
                  로봇이 즉시 반응합니다:
                </p>
                <p className="font-semibold text-primary">
                  로봇: "바나나? 바나나 맛있어요!" (TTS)
                </p>
                <p className="text-xs text-muted-foreground italic">
                  이것이 '확장된 형태의 반복'이라는 언어 발달 기법입니다.
                </p>
              </div>
            </div>

            {/* Scenario 2 */}
            <div className="bg-card rounded-xl p-6 border">
              <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg h-40 flex items-center justify-center mb-4">
                <div className="text-center space-y-2">
                  <div className="text-4xl">👩‍💻</div>
                  <p className="text-sm text-muted-foreground">부모 대시보드</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="font-semibold text-foreground">
                  오늘의 언어 리포트
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    ✓ 옹알이: 12회{" "}
                    <span className="text-primary">↑ 어제보다 +2회</span>
                  </p>
                  <p>
                    ✓ 음절 조합 시도: 3회{" "}
                    <span className="text-secondary">신규!</span>
                  </p>
                  <p>✓ 지금 해주면 좋은 말: "바나나 맛있지?"</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Science Behind */}
        <div className="bg-accent/10 rounded-2xl p-8 sm:p-12 border border-accent/30 mb-24">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            언어 발달 과학 기반 접근
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="text-3xl flex-shrink-0">🎯</div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  모델링된 표현 들려주기
                </h3>
                <p className="text-muted-foreground">
                  아이가 "바바"라고 말했을 때 단순히 반복하지 않고 "바나나"라는 더 명확하고 완성된 형태의 단어를 자연스럽게 들려줍니다. 이는 아이가 자신의 발음과 정답 발음의 차이를 인지하고 학습하게 합니다.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl flex-shrink-0">📚</div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  일관된 반복 노출
                </h3>
                <p className="text-muted-foreground">
                  매일 자동으로 아이의 발화 패턴을 분석해서 부족한 언어 자극 영역을 파악하고, 로봇이 자연스럽게 그 부분을 자극합니다.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl flex-shrink-0">💡</div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  부모 교육의 중요성
                </h3>
                <p className="text-muted-foreground">
                  아이의 발달을 추적하는 것만으로는 부족합니다. 부모가 어떻게 상호작용하는지가 핵심입니다. We:Grow는 부모에게 실증적인 피드백과 간단한 지침을 제공해 가정에서의 언어 상호작용을 개선합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Age-based */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24">
          <div className="bg-card rounded-xl p-6 border">
            <h3 className="font-semibold text-lg text-foreground mb-3">
              6-12개월
            </h3>
            <p className="text-sm text-muted-foreground">
              음절성 옹알이(ba-ba)에서 의사소통 의도 발달 단계. 로봇은 이 시기의 음향적 특성을 학습하고 응답합니다.
            </p>
          </div>
          <div className="bg-card rounded-xl p-6 border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-lg text-foreground mb-3">
              12-18개월
            </h3>
            <p className="text-sm text-muted-foreground">
              첫 단어 출현 시기. "엄마", "까까" 같은 초기 어휘에서 의미 확장으로. 부모의 반응이 가장 중요한 시점입니다.
            </p>
          </div>
          <div className="bg-card rounded-xl p-6 border">
            <h3 className="font-semibold text-lg text-foreground mb-3">
              18-24개월
            </h3>
            <p className="text-sm text-muted-foreground">
              두 단어 조합과 간단한 문장 구성 단계. We:Grow의 "성장 분석"이 가장 활용되는 시기입니다.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-center text-white space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold">
            우리 아이의 언어 여정을 함께 시작하세요
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            아이의 현재 언어 수준을 정확히 이해하고, 발달을 적극적으로 지원하는 첫 번째 단계입니다.
          </p>
          <Link
            to="/dashboard"
            className="inline-block px-8 py-4 rounded-lg bg-white text-primary font-semibold hover:bg-gray-100 transition"
          >
            무료로 시작하기 →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">W</span>
                </div>
                <span className="font-bold text-foreground">We:Grow</span>
              </div>
              <p className="text-sm text-muted-foreground">
                아이와 함께 성장하는 로봇 친구
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">
                제품
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    기능
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    요금
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">
                회사
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    정보
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    연락처
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">
                법적
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    이용약관
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    개인정보
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 We:Grow. 모든 권리 보유.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}