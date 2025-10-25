import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  const logoSrc = "/DodamLogo.png"
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F4] via-[#FEEFF7] to-[#F7F6FF] text-slate-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between h-16 px-4 sm:px-36 border-b border-[#F4D7E8] bg-white/80 backdrop-blur-md sticky top-0 z-40">
          <Link to="/" className="flex items-center">
            <img
              src={logoSrc}
              alt="도담 로고"
              className="h-20"
              loading="eager"
            />
          </Link>
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link
            to="/login"
            className="text-slate-600 hover:text-[#E17AA4] transition"
          >
            로그인
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#F4D7E8] text-sm text-[#E17AA4] font-semibold">
              18-24개월 언어 발달을 위한 AI 말벗 로봇
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              아이의 첫 대화를 지켜주는 <span className="text-[#E17AA4]">도담</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              도담은 아이의 발화를 세심하게 듣고, 나이에 맞춘 말걸기와 놀이로 언어 능력을 차근차근 키워줍니다. 아이가 어떤 방식으로든 표현하면 즉시 반응하며, 부모에게는 오늘 바로 활용할 수 있는 대화 가이드를 전해요.
            </p>
          </div>
          <div className="bg-white rounded-3xl border border-[#F4D7E8] shadow-xl p-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-12 w-64 h-64 bg-[#FDE4EC] rounded-full blur-3xl opacity-80" />
            <div className="relative space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#F7B5C3] flex items-center justify-center text-2xl">
                  🐭
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500">오늘의 말놀이 기록</p>
                  <p className="text-xl font-bold text-slate-900">"바바" → "바나나"</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl border border-[#F4D7E8] bg-[#FFF7FB] p-4 space-y-2">
                  <p className="font-semibold text-[#E17AA4]">18개월 아이</p>
                  <ul className="space-y-1 text-slate-600">
                    <li>• 옹알이 이해도 92%</li>
                    <li>• 어휘 확장 제안 3개</li>
                    <li>• 추천 표현: "바나나 좋아?"</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-[#F4D7E8] bg-[#FDF5FF] p-4 space-y-2">
                  <p className="font-semibold text-[#A678E3]">부모 대시보드</p>
                  <ul className="space-y-1 text-slate-600">
                    <li>• 오늘의 반응률 87%</li>
                    <li>• 새로 배운 단어 4개</li>
                    <li>• 다음 질문: "고양이는 뭐라고 해?"</li>
                  </ul>
                </div>
              </div>
              <div className="rounded-2xl bg-gradient-to-r from-[#FDE4EC] to-[#E7D7FA] p-6 space-y-2 text-slate-700">
                <p className="text-sm font-semibold text-[#A678E3]">도담의 약속</p>
                <p className="text-base leading-relaxed">
                  아이의 발화를 기다려주고, 의미를 찾아주며, 더 나은 표현을 제안합니다. 부모는 앱에서 성장 변화를 시각으로 확인해요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-white/80 py-16 sm:py-24 border-y border-[#F4D7E8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
            도담이 만드는 언어 성장 루틴
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
            18~24개월 영유아의 발달 단계에 맞춰 설계된 네 가지 핵심 기능으로, 아이의 시도 하나하나에 의미 있게 반응합니다.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[ 
              {
                icon: "💞",
                title: "대화형 말벗",
                desc: "아이의 옹알이와 단어를 실시간으로 듣고, 반응하며 맞장구쳐요.",
              },
              {
                icon: "🎯",
                title: "발달 맞춤 학습",
                desc: "아이의 이해도와 발화를 분석해 다음에 들려줄 표현을 조정합니다.",
              },
              {
                icon: "🧠",
                title: "인지 자극 놀이",
                desc: "소리 흉내, 간단한 질문, 역할 놀이로 언어 자극을 확장해요.",
              },
              {
                icon: "🛡️",
                title: "안전한 디자인",
                desc: "아이와 가까이서 쓰는 만큼 모서리를 줄이고 소재를 검증했습니다.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-[#F4D7E8] bg-white p-6 shadow-sm hover:-translate-y-1 transition"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2 text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">도담과 하루를 보내는 방법</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              title: "귀 기울이는 시작",
              desc: "도담이 아이 높이에서 말을 건네고, 반응을 기다립니다.",
            },
            {
              step: "2",
              title: "AI 분석",
              desc: "발화 길이, 억양, 제스처를 통합 분석해 발달 단계를 추적합니다.",
            },
            {
              step: "3",
              title: "맞춤 응답",
              desc: '"바바"에는 "바나나? 노란색이네"처럼 한 걸음 확장된 표현으로 답해요.',
            },
            {
              step: "4",
              title: "부모 코칭",
              desc: "앱에서 오늘의 대화 포인트와 놀이 스크립트를 확인합니다.",
            },
          ].map((item) => (
            <div key={item.step} className="rounded-3xl border border-[#F4D7E8] bg-white/80 p-6 space-y-3 text-slate-700">
              <div className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-[#E17AA4] text-white font-bold text-lg">
                {item.step}
              </div>
              <h3 className="font-semibold text-lg text-slate-900">{item.title}</h3>
              <p className="text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Development Focus */}
      <section className="bg-[#FFF2F8] py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">18~24개월, 가장 중요한 언어 폭발기</h2>
              <p className="text-slate-700 leading-relaxed">
                이 시기의 아이들은 10~15개의 단어를 말하기 시작하고, 두 단어를 이어 말하는 시도로 성장합니다. 도담은 이러한 발달 지표를 실시간으로 관찰해 언어 자극의 난이도를 조절합니다.
              </p>
              <ul className="space-y-4 text-slate-700 text-sm">
                <li>
                  <span className="font-semibold text-[#E17AA4]">✔ 컨텍스트 맞춤 피드백</span>
                  <p>아이가 말하거나 손짓하면 즉시 의미를 해석하고, 관련 단어를 모델링해줍니다.</p>
                </li>
                <li>
                  <span className="font-semibold text-[#E17AA4]">✔ 비언어 신호 이해</span>
                  <p>고개 끄덕임, 손가락 가리킴 등 비언어 표현도 함께 기록하여 부모에게 알려줍니다.</p>
                </li>
                <li>
                  <span className="font-semibold text-[#E17AA4]">✔ 단계별 활동 제안</span>
                  <p>오늘의 발화 데이터를 기반으로 새로운 어휘 놀이와 질문을 제안합니다.</p>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-3xl border border-[#F4D7E8] p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900">발달 단계별 도담 대화 예시</h3>
              <div className="space-y-4 text-sm text-slate-700">
                <div className="p-4 rounded-2xl bg-[#FFF7FB] border border-[#F4D7E8]">
                  <p className="font-semibold text-[#E17AA4]">18개월</p>
                  <p className="mt-2">아이: "바 바"</p>
                  <p>도담: "바나나 찾는구나? 노란색 바나나 맛있지!"</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FDF5FF] border border-[#E2D2FF]">
                  <p className="font-semibold text-[#A678E3]">21개월</p>
                  <p className="mt-2">아이: "멍멍 어디?"</p>
                  <p>도담: "멍멍이는 마당에 있어. 한번 불러볼까? '멍멍아 여기 와!'"</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#F2F7FF] border border-[#C9D9FF]">
                  <p className="font-semibold text-[#6B8AF2]">24개월</p>
                  <p className="mt-2">아이: "더 우유"</p>
                  <p>도담: "우유 더 마시고 싶구나. '우유 더 주세요'라고 말해볼까?"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Value */}
      {/* <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">부모가 느끼는 변화</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[ 
            {
              title: "말걸기 스크립트", 
              desc: "전문가가 검토한 표현을 간단한 카드로 제공해 부모가 바로 활용할 수 있어요.",
              tag: "오늘의 추천 질문 2개",
            },
            {
              title: "언어 리포트",
              desc: "일, 주, 월 단위로 아이의 발화 패턴을 비교하고 그래프로 확인합니다.",
              tag: "어휘 증가 추세 +4",
            },
            {
              title: "놀이 아카이브",
              desc: "아이와 나눴던 대화와 놀이를 저장해 성장 앨범처럼 되돌아볼 수 있어요.",
              tag: "지난주 녹음 8개",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-[#F4D7E8] bg-white p-6 shadow-sm space-y-4">
              <div className="inline-flex px-3 py-1 rounded-full bg-[#FFF7FB] text-xs font-semibold text-[#E17AA4]">
                {item.tag}
              </div>
              <h3 className="font-semibold text-lg text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* CTA */}
      <section className="px-4 sm:px-8 pb-24 py-28">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-[#FDE4EC] via-[#F5D7FF] to-[#DDE4FF] text-slate-900 text-center py-16 px-8 shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">아이의 언어 여정, 지금 도담과 시작하세요</h2>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto mb-8">
            아이의 모든 시도를 존중하고 확장해주는 말놀이 파트너. 부모는 도담과 함께 더 따뜻하고 풍부한 대화를 준비할 수 있습니다.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 border-t border-[#F4D7E8] py-12 px-4 sm:px-8 text-slate-600">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              {/* <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#F7B5C3] flex items-center justify-center text-xl">🐭</div>
                <span className="font-bold text-slate-900">도담</span>
              </div>
              <p className="text-sm leading-relaxed">
                아이의 언어 시도를 기다려주고 확장해주는 맞춤형 말놀이 로봇 친구.
              </p> */}
              <Link to="/" className="flex items-center">
            <p className="text-sm leading-relaxed">
                AI 말벗 로봇 도담
              </p>
              <img
              src={logoSrc}
              alt="도담 로고"
              className="h-20"
              loading="eager"
            />
            
          </Link>
          
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3 text-sm">제품</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-[#E17AA4] transition">
                    주요 기능
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#E17AA4] transition">
                    데모 신청
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3 text-sm">지원</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-[#E17AA4] transition">
                    자주 묻는 질문
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#E17AA4] transition">
                    고객센터
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3 text-sm">정책</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-[#E17AA4] transition">
                    이용약관
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#E17AA4] transition">
                    개인정보처리방침
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#F4D7E8] pt-6 text-center text-xs text-slate-500">
            <p>© 2025 Dodam Labs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
