import { Layout } from "@/components/Layout";
import {
  TrendingUp,
  Download,
  Share2,
  MessageCircleHeart,
  Sparkles,
  Baby,
  Brain,
  BookOpen,
} from "lucide-react";

export default function Growth() {
  return (
    <Layout showNav={true}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 space-y-16">
        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-10 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/80 border border-[#F4D7E8] text-sm text-[#E17AA4] font-semibold shadow-sm">
              18~24개월 언어 성장 여정
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-snug">
              대화로 키우는 우리 아이의 첫 언어, <span className="text-[#E17AA4]">성장 리포트</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              도담은 아이의 옹알이부터 두 단어 조합까지 모든 시도를 귀 기울여 듣고 즉각 반응합니다. 18개월에는 10~15개의 단어를, 24개월에는 50개 이상의 단어를 목표로 삼으며 아이가 표현한 말과 몸짓을 의미 있게 받아주는 "대화형 말벗"으로 동행해요.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-3xl border border-[#F4D7E8] bg-white/80 p-5 space-y-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <MessageCircleHeart className="text-[#E17AA4]" size={24} />
                  <span className="text-sm font-semibold text-slate-600">이번 주 대화 하이라이트</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  "바바"라고 말한 순간 도담이 "바나나? 노란색 좋아?"라고 확장 답변하며 더 긴 문장을 유도했어요.
                </p>
                <div className="flex items-center gap-6 text-xs text-slate-500">
                  <span>의미 있는 시도 <strong className="text-[#E17AA4]">+8%</strong></span>
                  <span>모델링 문장 <strong className="text-[#A678E3]">14회</strong></span>
                </div>
              </div>
              <div className="rounded-3xl border border-[#E7D7FA] bg-gradient-to-br from-[#FDE4EC]/70 to-[#E7D7FA]/70 p-5 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <TrendingUp className="text-[#A678E3]" size={24} />
                  <span className="text-sm font-semibold text-slate-600">주간 성장 수치</span>
                </div>
                <div className="space-y-2 text-sm text-slate-700">
                  <p>• 새로 이해한 단어 <span className="font-semibold text-[#E17AA4]">12개</span></p>
                  <p>• 손짓-말 연계 반응 <span className="font-semibold text-[#A678E3]">92%</span></p>
                  <p>• 부모 피드백 스크립트 <span className="font-semibold text-slate-900">6건</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -right-6 w-40 h-40 bg-[#FDE4EC] rounded-full blur-3xl opacity-60" />
            <div className="bg-white/90 border border-[#F4D7E8] rounded-[32px] p-8 space-y-6 shadow-xl relative">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#F7B5C3] flex items-center justify-center text-3xl">🐭</div>
                <div>
                  <p className="text-xs font-semibold text-[#A678E3] uppercase tracking-wide">도담 conversation buddy</p>
                  <p className="text-lg font-bold text-slate-900">맞춤 반응 로그</p>
                </div>
              </div>
              <div className="space-y-4 text-sm text-slate-700">
                <div className="rounded-2xl bg-[#FFF7FB] border border-[#F4D7E8] p-4 space-y-1">
                  <p className="font-semibold text-[#E17AA4]">18개월 Morning Talk</p>
                  <p>아이가 "멍멍"이라고 말해요 → 도담: "멍멍이 어디 있어? 이리 와볼까?"</p>
                </div>
                <div className="rounded-2xl bg-[#FDF5FF] border border-[#E7D7FA] p-4 space-y-1">
                  <p className="font-semibold text-[#A678E3]">24개월 Evening Story</p>
                  <p>아이가 "더 우유"라고 말해요 → 도담: "우유 더 마시고 싶구나. 컵을 잡아볼까?"</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                모든 발화는 억양·제스처와 함께 기록되어 부모 대시보드에 실시간 반영됩니다.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white/80 border border-[#F4D7E8] rounded-[32px] p-8 sm:p-10 shadow-xl space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">아이 발달에 맞춘 네 가지 핵심 기능</h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-3xl mx-auto">
              도담은 대화형 말벗으로 아이의 시도를 기다려주고, 의미를 찾아주고, 더 나은 표현을 제안합니다. 18~24개월 영유아의 언어 폭발기를 지지하기 위해 설계된 기능들을 확인하세요.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <MessageCircleHeart className="text-[#E17AA4]" size={28} />,
                title: "Conversational Companion",
                desc: "아이가 내뱉은 옹알이나 한 단어도 의미 있는 대화로 확장해 주는 말벗 모드입니다.",
              },
              {
                icon: <Brain className="text-[#A678E3]" size={28} />,
                title: "Adaptive Learning",
                desc: "일별·주별 데이터를 분석하여 질문 난이도와 모델링 문장을 단계적으로 조정합니다.",
              },
              {
                icon: <Sparkles className="text-[#E17AA4]" size={28} />,
                title: "Educational Stimuli",
                desc: "사운드 모방, 손짓 놀이, 역할극 등 언어 자극 활동을 게임처럼 제안합니다.",
              },
              {
                icon: <Baby className="text-[#F08AA4]" size={28} />,
                title: "Physical Design & Safety",
                desc: "아이 눈높이에 맞춘 라운드 디자인과 인증 소재로 안심하고 사용할 수 있어요.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-[#F4D7E8] bg-white/90 p-6 space-y-3 shadow-sm hover:-translate-y-1 transition"
              >
                <div>{item.icon}</div>
                <h3 className="font-semibold text-lg text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">월령별 대화 스크립트 변화</h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
              18개월에는 사물 이름과 제스처에 초점을 맞추고, 24개월에는 두 단어 이상의 문장을 유도합니다. 단계별 가이드를 확인하세요.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-[28px] border border-[#F4D7E8] bg-white/90 p-8 space-y-4 shadow-md">
              <div className="flex items-center gap-3 text-[#E17AA4]">
                <BookOpen size={24} />
                <span className="text-sm font-semibold uppercase tracking-wide">18개월 Focus</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">10~15개 단어, 명칭 익히기</h3>
              <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <li>• 사물 이름과 소리 흉내를 함께 제시하여 이해도를 높입니다.</li>
                <li>• "공 줘"와 같은 간단한 지시를 손짓과 함께 안내합니다.</li>
                <li>• 아이가 소리를 내면 즉시 모범 단어로 다시 들려주며 반복 연습합니다.</li>
              </ul>
              <div className="rounded-2xl bg-[#FFF7FB] border border-[#F4D7E8] p-4 text-xs text-slate-500">
                오늘의 예시: "멍멍" → "멍멍이 왈왈! 부드럽지? 손으로 쓰다듬어볼까?"
              </div>
            </div>
            <div className="rounded-[28px] border border-[#E7D7FA] bg-white/90 p-8 space-y-4 shadow-md">
              <div className="flex items-center gap-3 text-[#A678E3]">
                <BookOpen size={24} />
                <span className="text-sm font-semibold uppercase tracking-wide">24개월 Focus</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">50+ 단어, 두 단어 조합 확장</h3>
              <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <li>• "더 우유" 같은 표현을 받아 확장 문장("우유 더 마실래?")으로 모델링합니다.</li>
                <li>• 간단한 의문형 질문으로 아이의 선택과 대답을 유도합니다.</li>
                <li>• 비언어 신호(고개 끄덕임, 손가락 가리킴)를 말과 연결하여 설명해 줍니다.</li>
              </ul>
              <div className="rounded-2xl bg-[#FDF5FF] border border-[#E7D7FA] p-4 text-xs text-slate-500">
                오늘의 예시: "고양이?" → "그래, 고양이는 야옹야옹 해. 쓰다듬어볼래?"
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            {
              title: "반응을 기다려요",
              desc: "도담은 먼저 질문을 던진 뒤, 아이가 말이나 제스처로 반응할 때까지 충분히 기다립니다.",
            },
            {
              title: "의미를 해석해요",
              desc: '짧은 소리라도 상황과 표정을 분석해 “무슨 말을 하고 싶은지” 부모에게 요약해 알려줘요.',
            },
            {
              title: "표현을 확장해요",
              desc: "맞장구-재진술-확장 문장을 통해 다음 단계의 언어를 자연스럽게 제시합니다.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-[#F4D7E8] bg-white/90 p-7 space-y-3 shadow-md"
            >
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>

        <section className="bg-white/80 border border-[#F4D7E8] rounded-[32px] p-8 sm:p-10 shadow-xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-[#F4D7E8] bg-[#FFF7FB] p-6 space-y-2">
              <p className="text-sm font-semibold text-[#E17AA4]">언어 시도</p>
              <p className="text-3xl font-bold text-slate-900">127회</p>
              <p className="text-xs text-slate-500">지난주 대비 <span className="text-[#E17AA4] font-semibold">+11%</span></p>
            </div>
            <div className="rounded-3xl border border-[#E7D7FA] bg-[#FDF5FF] p-6 space-y-2">
              <p className="text-sm font-semibold text-[#A678E3]">새로운 어휘</p>
              <p className="text-3xl font-bold text-slate-900">18개</p>
              <p className="text-xs text-slate-500">맥락 속 반복 노출로 학습</p>
            </div>
            <div className="rounded-3xl border border-[#F7E2C7] bg-[#FFF9F4] p-6 space-y-2">
              <p className="text-sm font-semibold text-[#E9A05A]">부모 코칭</p>
              <p className="text-3xl font-bold text-slate-900">9개</p>
              <p className="text-xs text-slate-500">일상 속 대화 팁 알림</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed text-center max-w-3xl mx-auto">
            데이터는 음성, 억양, 손짓 등 멀티모달 입력을 기반으로 분석되며, 아이가 다음 단계로 도약할 수 있도록 새 단어와 질문을 추천합니다. 부모님은 리포트를 통해 오늘의 대화 포인트와 다음 활동을 즉시 확인할 수 있어요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-center">
            <button className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-[#E17AA4] text-white font-semibold hover:bg-[#d0648f] transition flex items-center justify-center gap-2 shadow-sm">
              <Download size={18} />
              리포트 PDF 다운로드
            </button>
            <button className="flex-1 sm:flex-none px-6 py-3 rounded-full border-2 border-[#A678E3] text-[#A678E3] font-semibold hover:bg-[#FDF5FF] transition flex items-center justify-center gap-2">
              <Share2 size={18} />
              보호자와 공유하기
            </button>
          </div>
          <p className="text-xs text-slate-500 text-center">
            💡 소아과, 언어치료 상담 시 리포트를 함께 보여주면 더욱 정확한 상담이 가능해요.
          </p>
        </section>
      </div>
    </Layout>
  );
}
