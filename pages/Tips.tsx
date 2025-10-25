import { Layout } from "@/components/Layout";
import { Lightbulb, Heart } from "lucide-react";
import { useState } from "react";

export default function Tips() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const tips = [
    {
      id: 1,
      level: "두 단어 조합 초기 단계",
      scenario: '아이: "또!"',
      parentResponse: "엄마(권장): \"또 해요? 또 하고 싶어요?\"",
      explanation:
        "아이의 한 단어를 길게 확장해서 말해주면, 아이가 자연스럽게 더 긴 표현을 들을 수 있습니다.",
    },
    {
      id: 2,
      level: "의도 표현 단계",
      scenario: '아이: "까까" (물을 가리키며)',
      parentResponse:
        '엄마(권장): "물 주세요? 엄마가 물 줄까요? 물 시원하지?"',
      explanation:
        "아이가 뭔가를 원하는 의도를 보이면, 그것을 자연스러운 문장으로 확장해 말해주세요.",
    },
    {
      id: 3,
      level: "음성 실험 단계",
      scenario: '아이: "바바바"',
      parentResponse:
        '엄마(권장): "바나나? 맛있는 바나나네요. 배? 노란 배?"',
      explanation:
        "음절 반복은 음성 실험입니다. 그 음절로 시작하는 실제 단어들을 여러 개 들려주세요.",
    },
    {
      id: 4,
      level: "감정 표현 초기",
      scenario: '아이가 웃으면서 옹알이함',
      parentResponse: '엄마(권장): "우와, 즐거워? 엄청 재미있어?"',
      explanation:
        "감정 표현이 나타나면, 그 감정을 이름지어서 말해주면 정서 어휘 발달을 돕습니다.",
    },
  ];

  return (
    <Layout showNav={true}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3">
            <Lightbulb size={32} className="text-primary" />
            맞춤 팁 & 부모 교육
          </h1>
          <p className="text-muted-foreground">
            우리 아이의 현재 수준에 맞춘 말걸기 팁을 확인하세요
          </p>
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm">
            전체
          </button>
          <button className="px-4 py-2 rounded-lg border text-foreground hover:bg-muted transition text-sm">
            즐겨찾기
          </button>
        </div>

        {/* Tips Grid */}
        <div className="space-y-4">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className="bg-card rounded-xl p-6 border hover:border-primary/50 transition group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  {tip.level}
                </span>
                <button
                  onClick={() => toggleFavorite(tip.id)}
                  className="p-2 hover:bg-muted rounded-lg transition"
                >
                  <Heart
                    size={20}
                    className={
                      favorites.has(tip.id)
                        ? "fill-secondary text-secondary"
                        : "text-muted-foreground"
                    }
                  />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 border border-muted">
                  <p className="text-sm text-muted-foreground mb-1">아이</p>
                  <p className="text-lg font-bold text-foreground italic">
                    {tip.scenario}
                  </p>
                </div>

                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-1">
                    권장 부모 반응
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {tip.parentResponse}
                  </p>
                </div>

                <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                  <p className="text-sm text-muted-foreground mb-2">💡 왜 이렇게?</p>
                  <p className="text-sm text-foreground leading-relaxed">
                    {tip.explanation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
          <h3 className="font-bold text-lg text-foreground mb-4">
            언어 발달 기초 이해하기
          </h3>
          <div className="space-y-4 text-sm text-foreground">
            <p>
              <span className="font-semibold">📍 모델링:</span> 아이의 발화를
              바로 수정하지 마세요. 대신 아이가 말한 것을 더 완성된 형태로
              자연스럽게 다시 말해주세요.
            </p>
            <p>
              <span className="font-semibold">📍 확장:</span> 아이의 한 단어에
              의미 있는 단어들을 더해서 더 긴 표현으로 확장해 들려주세요.
            </p>
            <p>
              <span className="font-semibold">📍 반복:</span> 같은 개념을
              여러 단어와 상황으로 반복 노출하면 학습이 강화됩니다.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}