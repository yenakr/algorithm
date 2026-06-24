'use client';

import { useState, use, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, BookOpen, GitMerge, HelpCircle, CheckCircle2, 
  ChevronRight, ChevronLeft, RefreshCw, AlertCircle, FileText, Image as ImageIcon, Bot, ArrowUp
} from 'lucide-react';

// Data layers
import { algorithmsData, robotTypeInfo } from '@/data';

// Component imports
import AlgorithmRunner from '@/components/AlgorithmRunner';

interface PageProps {
  params: Promise<{ id: string }>;
}

const getDeviceImage = (deviceId: string) => {
  const imageMap: Record<string, string> = {
    'B-B': '/images/hygiene_bidet.png',
    'B-C': '/images/toilet_lift.png',
    'B-D': '/images/toilet_lift.png',
    'B-G': '/images/excretion_robot.png',
    'B-H': '/images/smart_diaper_robot.png',
    'T-B': '/images/transfer_board.png',
    'T-C': '/images/standing_aid.png',
    'T-D': '/images/manual_standing_aid.png',
    'T-E': '/images/transfer_lift.png',
    'T-F': '/images/wall_lift.png',
    'T-G': '/images/mobile_sling_lift.png',
    'T-H': '/images/gantry_lift.png',
  };
  return imageMap[deviceId] || '';
};

export default function AlgorithmPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const algoId = resolvedParams.id;
  const algoData = algorithmsData[algoId];

  if (!algoData) {
    return notFound();
  }

  // Active section tracking state
  const [activeSection, setActiveSection] = useState('original-tree');

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Original image error tracking
  const [imageError, setImageError] = useState(false);

  // Device Carousel State
  const [deviceIndex, setDeviceIndex] = useState(0);

  const handleQuizAnswer = (optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedOption(optionIdx);
  };

  const handleQuizSubmit = () => {
    if (selectedOption === null) return;
    
    const currentQuiz = algoData.quizzes[quizIndex];
    if (selectedOption === currentQuiz.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
    setIsSubmitted(true);
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    
    if (quizIndex + 1 < algoData.quizzes.length) {
      setQuizIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setDeviceIndex(0);
    setQuizIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  const devicesList = robotTypeInfo[algoId] || [];

  const handlePrevDevice = () => {
    if (deviceIndex > 0) {
      setDeviceIndex(prev => prev - 1);
    } else {
      setDeviceIndex(devicesList.length - 1);
    }
  };

  const handleNextDevice = () => {
    if (deviceIndex < devicesList.length - 1) {
      setDeviceIndex(prev => prev + 1);
    } else {
      setDeviceIndex(0);
    }
  };

  // Determine original algorithm title
  const getOriginalTitle = () => {
    if (algoId === 'toileting') return '배설돌봄로봇의 활용 알고리즘';
    if (algoId === 'feeding') return '식사돌봄로봇의 활용 알고리즘';
    if (algoId === 'transfer') return '이승돌봄로봇의 활용 알고리즘';
    return `${algoData.title} 원본`;
  };

  // Scroll spy setup
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['original-tree', 'algo-map', 'step-learning', 'robot-types', 'quiz-section'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex-1 bg-slate-50 pb-20">
      {/* Upper Navigation Bar */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>메인으로 돌아가기</span>
          </Link>
        </div>
      </div>

      {/* Intro section */}
      <section className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {algoData.title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {algoData.fullDescription}
          </p>
        </div>
      </section>

      {/* Sticky Section Navigation Bar */}
      <div className="sticky top-0 z-40 bg-white/95 border-b border-slate-200/80 shadow-sm backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {[
            { id: 'original-tree', name: '원본 트리' },
            { id: 'algo-map', name: '알고리즘 지도' },
            { id: 'step-learning', name: '단계별 학습' },
            { id: 'robot-types', name: '돌봄로봇 유형' },
            { id: 'quiz-section', name: '사례 퀴즈' }
          ].map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                activeSection === sec.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sec.name}
            </a>
          ))}
        </div>
      </div>

      {/* Main Single Flow Column */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        {/* Section 1: Original Algorithm Tree */}
        <section 
          id="original-tree" 
          style={{ scrollMarginTop: '100px' }}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="text-center">
            <h2 className="text-2xl font-black text-slate-800">
              {getOriginalTitle()}
            </h2>
          </div>

          {/* Diagram display box */}
          <div className="relative border border-slate-200/60 bg-slate-100/30 rounded-xl overflow-x-auto min-h-[300px] flex items-center justify-center p-2">
            {!imageError ? (
              <img
                src={algoData.diagramImage}
                alt={`${algoData.title} 원본 이미지`}
                className="max-w-none md:max-w-full object-contain rounded"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="text-center p-8 max-w-md space-y-4">
                <div className="w-16 h-16 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-700">원본 알고리즘 트리 이미지가 들어갈 영역입니다.</h4>
                  <p className="text-xs text-slate-500 leading-normal text-center">
                    이미지를 프로젝트 폴더의 <code className="bg-slate-200 px-1 py-0.5 rounded text-blue-700">public{algoData.diagramImage}</code> 경로에 위치시켜 주세요.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <a href="#original-tree" className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-600 transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>맨 위로</span>
            </a>
          </div>
        </section>

        {/* Section 2: Interactive Decision Map Explorer */}
        <section 
          id="algo-map"
          style={{ scrollMarginTop: '100px' }}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-800">
                알고리즘 지도
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                지도에서 각 단계를 선택하면 판단 기준과 관련 돌봄로봇 정보를 확인할 수 있습니다.
              </p>
            </div>
          </div>
          <div className="h-0.5 bg-slate-100 w-full" />
          
          <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/50">
            <AlgorithmRunner 
              algorithm={algoData.algorithm} 
              mode="learning"
              uiMode="map"
            />
          </div>

          <div className="flex justify-end">
            <a href="#original-tree" className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-600 transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>맨 위로</span>
            </a>
          </div>
        </section>

        {/* Section 3: Interactive Q&A Algorithm Runner */}
        <section 
          id="step-learning"
          style={{ scrollMarginTop: '100px' }}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-800">
              단계별 학습
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
              질문에 응답해가며 대상자에 맞는 돌봄로봇 유형을 판단합니다.
            </p>
          </div>
          <div className="h-0.5 bg-slate-100 w-full" />
          
          <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/50">
            <AlgorithmRunner 
              algorithm={algoData.algorithm} 
              mode="learning"
              uiMode="simple"
            />
          </div>

          <div className="flex justify-end">
            <a href="#original-tree" className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-600 transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>맨 위로</span>
            </a>
          </div>
        </section>

        {/* Section 4: Related Care Robots Carousel Slider */}
        <section 
          id="robot-types"
          style={{ scrollMarginTop: '100px' }}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-800">
                돌봄로봇 유형 살펴보기
              </h2>
            </div>
            
            {/* Quick Slider Page Indicators */}
            <div className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
              {deviceIndex + 1} / {devicesList.length}
            </div>
          </div>
          <div className="h-0.5 bg-slate-100 w-full" />

          {/* Carousel Layout wrapper with fixed minimum height */}
          <div className="relative flex items-center justify-between gap-2 sm:gap-4 select-none min-h-[640px] sm:min-h-[500px] md:min-h-[440px]">
            {/* Left Prev Arrow Button */}
            <button
              onClick={handlePrevDevice}
              className="p-2 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:shadow-sm transition-all focus:outline-none shrink-0"
              aria-label="이전 로봇 보기"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Premium Cuttoon style main card */}
            <div className="flex-1 min-w-0 bg-slate-50/50 border border-slate-200/60 rounded-2xl p-5 sm:p-6 transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Robot Image or Fallback container */}
                <div className="md:col-span-4 flex justify-center self-center">
                  <div className="relative w-full max-w-[180px] h-[180px] bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm flex items-center justify-center p-3">
                    {devicesList[deviceIndex]?.image ? (
                      <img
                        src={devicesList[deviceIndex].image}
                        alt={devicesList[deviceIndex].name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // Handle image load failure by resetting src or showing error text
                          (e.target as HTMLElement).style.display = 'none';
                          const sibling = (e.target as HTMLElement).nextElementSibling;
                          if (sibling) (sibling as HTMLElement).style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className="text-center p-4 flex flex-col items-center justify-center gap-3"
                      style={{ display: devicesList[deviceIndex]?.image ? 'none' : 'flex' }}
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shadow-inner">
                        <Bot className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 leading-normal">
                        이미지 준비 중
                      </span>
                    </div>
                  </div>
                </div>

                {/* Robot Details contents */}
                <div className="md:col-span-8 space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-800 leading-none">
                      {devicesList[deviceIndex]?.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-bold mt-2 leading-relaxed">
                      {devicesList[deviceIndex]?.oneLine}
                    </p>
                  </div>

                  {/* Applicability situations bullets */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-400 block">적용 상황</span>
                    <ul className="text-xs text-slate-600 font-bold list-disc list-inside space-y-0.5">
                      {devicesList[deviceIndex]?.situations.map((sit, i) => (
                        <li key={i} className="leading-relaxed">{sit}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Left / Right Split Layout for Functions & Cautions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    {/* Functions Box */}
                    <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-4">
                      <span className="text-xs font-bold text-emerald-700 block mb-2">주요 기능</span>
                      <ul className="text-[11px] sm:text-xs text-slate-600 font-semibold list-disc list-inside space-y-1 leading-relaxed">
                        {devicesList[deviceIndex]?.functions.map((func, idx) => (
                          <li key={idx}>{func}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Cautions Box */}
                    <div className="bg-amber-50/40 border border-amber-100 rounded-xl p-4">
                      <span className="text-xs font-bold text-amber-700 block mb-2">확인할 점</span>
                      <ul className="text-[11px] sm:text-xs text-slate-600 font-semibold list-disc list-inside space-y-1 leading-relaxed">
                        {devicesList[deviceIndex]?.cautions.map((caut, idx) => (
                          <li key={idx}>{caut}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Example devices chip list */}
                  {devicesList[deviceIndex]?.examples && devicesList[deviceIndex].examples!.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-[10px] font-bold text-slate-400">예시 기기:</span>
                      {devicesList[deviceIndex].examples!.map((ex, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold">
                          {ex}
                        </span>
                      ))}
                    </div>
                  )}

                </div>

              </div>
            </div>

            {/* Right Next Arrow Button */}
            <button
              onClick={handleNextDevice}
              className="p-2 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:shadow-sm transition-all focus:outline-none shrink-0"
              aria-label="다음 로봇 보기"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Dot navigation indicators */}
          <div className="flex justify-center gap-1.5 pt-2">
            {devicesList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setDeviceIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === deviceIndex ? 'w-5 bg-blue-600' : 'bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`${idx + 1}번 로봇으로 이동`}
              />
            ))}
          </div>

          <div className="flex justify-end">
            <a href="#original-tree" className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-600 transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>맨 위로</span>
            </a>
          </div>
        </section>

        {/* Section 5: Case Study Quiz */}
        <section 
          id="quiz-section"
          style={{ scrollMarginTop: '100px' }}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              사례 기반 퀴즈
            </h2>
          </div>
          <div className="h-0.5 bg-slate-100 w-full" />

          {algoData.quizzes && algoData.quizzes.length > 0 ? (
            <div className="space-y-6">
              {!isFinished ? (
                <div className="space-y-6">
                  {/* Progress */}
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                    <span>진행률: {quizIndex + 1} / {algoData.quizzes.length} 문제</span>
                    <span className="text-emerald-600">현재 점수: {score}점</span>
                  </div>

                  {/* Scenario Card */}
                  <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 sm:p-6 space-y-4">
                    <span className="inline-block text-xs font-bold bg-slate-200 text-slate-700 px-2.5 py-1 rounded">
                      상황 사례
                    </span>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-semibold">
                      {algoData.quizzes[quizIndex].scenario}
                    </p>
                  </div>

                  {/* Question */}
                  <h4 className="text-base sm:text-lg font-bold text-slate-800">
                    Q. {algoData.quizzes[quizIndex].question}
                  </h4>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-3">
                    {algoData.quizzes[quizIndex].options.map((option, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrect = idx === algoData.quizzes[quizIndex].correctAnswerIndex;
                      
                      let optionStyle = 'border-slate-200 hover:bg-slate-50 text-slate-700';
                      if (isSelected) {
                        optionStyle = 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-600/20';
                      }
                      if (isSubmitted) {
                        if (isCorrect) {
                          optionStyle = 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-600/20';
                        } else if (isSelected) {
                          optionStyle = 'border-rose-600 bg-rose-50 text-rose-900 ring-2 ring-rose-600/20';
                        } else {
                          optionStyle = 'border-slate-200 opacity-60 text-slate-400';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isSubmitted}
                          onClick={() => handleQuizAnswer(idx)}
                          className={`flex items-start gap-3 p-4 rounded-xl border text-left font-semibold text-sm transition-all duration-200 ${optionStyle}`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 border ${
                            isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 text-slate-500'
                          }`}>
                            {idx + 1}
                          </span>
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Action buttons / Result description */}
                  <div className="pt-4 flex flex-col sm:flex-row sm:justify-end gap-3">
                    {!isSubmitted ? (
                      <button
                        onClick={handleQuizSubmit}
                        disabled={selectedOption === null}
                        className="px-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>정답 확인하기</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuiz}
                        className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-500 font-bold text-sm transition-all flex items-center justify-center gap-2"
                      >
                        <span>{quizIndex + 1 === algoData.quizzes.length ? '결과 페이지 보기' : '다음 문제 풀기'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Feedback explanation */}
                  {isSubmitted && (
                    <div className={`p-5 rounded-xl border flex gap-3.5 ${
                      selectedOption === algoData.quizzes[quizIndex].correctAnswerIndex
                        ? 'bg-emerald-50/50 border-emerald-200' 
                        : 'bg-rose-50/50 border-rose-200'
                    }`}>
                      <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 ${
                        selectedOption === algoData.quizzes[quizIndex].correctAnswerIndex ? 'text-emerald-600' : 'text-rose-600'
                      }`} />
                      <div className="space-y-1">
                        <h5 className={`font-bold text-sm ${
                          selectedOption === algoData.quizzes[quizIndex].correctAnswerIndex ? 'text-emerald-800' : 'text-rose-800'
                        }`}>
                          {selectedOption === algoData.quizzes[quizIndex].correctAnswerIndex ? '정답입니다!' : '오답입니다.'}
                        </h5>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                          {algoData.quizzes[quizIndex].explanation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Quiz Complete screen */
                <div className="text-center py-10 space-y-6 max-w-md mx-auto">
                  <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-800">모든 퀴즈를 완료했습니다!</h3>
                    <p className="text-sm text-slate-500 font-medium">
                      전체 {algoData.quizzes.length} 문제 중 <strong>{score}</strong> 문제를 맞추셨습니다.
                    </p>
                  </div>
                  <div className="flex gap-3 justify-center pt-4">
                    <button
                      onClick={handleResetQuiz}
                      className="px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm transition-all flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>다시 풀기</span>
                    </button>
                    <Link
                      href="/"
                      className="px-5 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-sm transition-all"
                    >
                      다른 알고리즘 선택
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-slate-400 text-sm text-center py-6">준비된 퀴즈가 없습니다.</p>
          )}

          <div className="flex justify-end">
            <a href="#original-tree" className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-600 transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>맨 위로</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
