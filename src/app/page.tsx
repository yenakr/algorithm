import Link from 'next/link';
import { ArrowRight, BookOpen, GitMerge, FileCheck, CheckCircle2, Trophy, HelpCircle } from 'lucide-react';

export default function Home() {
  const steps = [
    {
      step: 1,
      title: '교육자료 학습',
      description: '이승 및 배설돌봄의 개념과 의학적 기능 평가 기준을 학습합니다.',
      icon: BookOpen,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      step: 2,
      title: '알고리즘 구조 이해',
      description: '로봇 및 기기 유형을 선별하는 복잡한 의사결정 흐름을 차트로 살펴봅니다.',
      icon: GitMerge,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      step: 3,
      title: '맞춤형 자가평가',
      description: '대상자의 신체 조건과 환경에 관한 문답을 통해 자가 진단을 수행합니다.',
      icon: FileCheck,
      color: 'bg-sky-50 text-sky-600 border-sky-100',
    },
    {
      step: 4,
      title: '사례 기반 테스트',
      description: '실제 주거 환경 및 환자 상태 예시 퀴즈를 풀며 알고리즘 이해도를 높입니다.',
      icon: HelpCircle,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    {
      step: 5,
      title: '결과 및 해설 확인',
      description: '최종 매칭된 최적의 돌봄로봇 종류와 매칭 이유, 응답 경로를 복기합니다.',
      icon: Trophy,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-secondary text-white py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-primary-light text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            대학·의료계 공동 개발 교육 플랫폼
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none">
            돌봄로봇 교육 및 자가평가 플랫폼
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-slate-100/90 leading-relaxed font-medium">
            이승돌봄과 배설돌봄 상황에 맞는 돌봄기기와 최첨단 돌봄로봇을 쉽게 이해하고,<br className="hidden sm:inline" /> 
            대상자 신체 상태와 주거 환경에 꼭 필요한 맞춤형 기기 유형을 무료로 확인해보세요.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 max-w-md mx-auto sm:max-w-none">
            <Link
              href="/transfer"
              className="px-8 py-4 rounded-xl bg-white text-primary hover:bg-slate-100 font-extrabold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <span>이승돌봄 시작하기</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/toileting"
              className="px-8 py-4 rounded-xl bg-primary-dark/40 text-white hover:bg-primary-dark/60 font-extrabold text-base border border-white/20 hover:border-white/50 backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <span>배설돌봄 시작하기</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Objectives Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">ABOUT THE PLATFORM</span>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
            플랫폼 소개 및 개발 목적
          </h2>
          <div className="h-1.5 w-16 bg-primary rounded" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-2">
            고령사회가 도래함에 따라 거동이 불편한 어르신들의 돌봄 수요는 급격히 증가하고 있으나, 적절한 이승 및 배설 보조기기가 무엇인지 판단하기는 매우 어렵습니다. 
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            본 플랫폼은 보건복지 표준 알고리즘을 준용하여 고령자, 가족 보호자, 간호학생 및 돌봄 제공자가 **이승돌봄(자리이동)**과 **배설돌봄**에 쓰이는 첨단 로봇 기기의 특성을 정확하게 이해하고, 스스로 최적의 대안을 판단할 수 있도록 돕고자 개발된 공익적 교육 플랫폼입니다.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-200 space-y-4">
            <div className="bg-primary/5 text-primary p-3 rounded-xl w-fit">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">이승돌봄 (Transfer Care)</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              대상자가 침대에서 의자, 휠체어, 변기 등으로 몸을 옮길 때 필요한 기술입니다. 대상자의 잔존 하지 지지 능력 및 기립 능력을 파악하고 안전한 천장/이동식 리프트 유형을 분류합니다.
            </p>
            <Link href="/transfer" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline pt-2">
              이승돌봄 교육 및 진단 바로가기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-200 space-y-4">
            <div className="bg-primary/5 text-primary p-3 rounded-xl w-fit">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">배설돌봄 (Toileting Care)</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              요의/변의 인지 능력, 화장실 이동 능력, 용변 후 뒤처리 능력의 3차원 평가를 통해 도움의 불필요성부터 첨단 자동배설처리로봇 지속형 24시간 연동 필요 여부까지 정밀 판정합니다.
            </p>
            <Link href="/toileting" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline pt-2">
              배설돌봄 교육 및 진단 바로가기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Usage Process Section */}
      <section className="bg-slate-100/60 border-y border-slate-200/50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">PROCESS FLOW</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              이용 방법 및 진단 흐름
            </h2>
            <p className="text-sm sm:text-base text-slate-500">
              플랫폼에 내장된 콘텐츠를 순서대로 이수하면서 지식을 학습하고 상황 분석 능력을 배양할 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-sm relative group">
                  <div className="absolute top-4 right-4 text-xs font-black text-slate-200">
                    STEP 0{item.step}
                  </div>
                  <div className={`p-3 rounded-xl border w-fit mb-4 ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
