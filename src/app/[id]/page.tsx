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

const cleanInternalCodes = (text: string): string => {
  if (!text) return '';
  let cleaned = text
    .replace(/^[BTF]-[A-H]\.?\s*/gi, '')
    .replace(/\b[BTF]-[A-H]\.?\s*/gi, '')
    .replace(/["']?[BTF]-[A-H]["']?/gi, '');
  
  cleaned = cleaned
    .replace(/도움 불필요\(위생 자립\)/g, '도움 없이 진행 가능')
    .replace(/도움 불필요/g, '도움 없이 진행 가능')
    .replace(/용변 후 처리 돕기/g, '용변 후 처리 보조')
    .replace(/화장실 이동 돕기/g, '화장실 이동 보조');
    
  return cleaned.trim();
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
  const [sessionQuizzes, setSessionQuizzes] = useState<any[]>([]);
  const [categoryScores, setCategoryScores] = useState<Record<string, number>>({ A: 0, B: 0, C: 0, D: 0, E: 0 });
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const generateSessionQuizzes = () => {
    const rawQuizzes = algoData.quizzes || [];
    if (algoId === 'transfer' && rawQuizzes.length > 0) {
      const categories: Record<string, any[]> = { A: [], B: [], C: [], D: [], E: [] };
      rawQuizzes.forEach((q) => {
        const cat = q.category;
        if (cat && categories[cat]) {
          categories[cat].push(q);
        }
      });

      const selected: any[] = [];
      ['A', 'B', 'C', 'D', 'E'].forEach((cat) => {
        const list = categories[cat] || [];
        const shuffled = [...list].sort(() => 0.5 - Math.random());
        selected.push(...shuffled.slice(0, 2));
      });
      return selected;
    }
    return rawQuizzes;
  };

  useEffect(() => {
    setSessionQuizzes(generateSessionQuizzes());
    setCategoryScores({ A: 0, B: 0, C: 0, D: 0, E: 0 });
  }, [algoId]);

  // Original image error tracking
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Device Carousel State
  const [deviceIndex, setDeviceIndex] = useState(0);

  const handleQuizAnswer = (optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedOption(optionIdx);
  };

  const handleQuizSubmit = () => {
    if (selectedOption === null || sessionQuizzes.length === 0) return;
    
    const currentQuiz = sessionQuizzes[quizIndex];
    if (selectedOption === currentQuiz.correctAnswerIndex) {
      setScore(prev => prev + 1);
      if (currentQuiz.category) {
        setCategoryScores(prev => ({
          ...prev,
          [currentQuiz.category]: (prev[currentQuiz.category] || 0) + 1
        }));
      }
    }
    setIsSubmitted(true);
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    
    if (quizIndex + 1 < sessionQuizzes.length) {
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
    setCategoryScores({ A: 0, B: 0, C: 0, D: 0, E: 0 });
    setSessionQuizzes(generateSessionQuizzes());
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
      const scrollPosition = window.scrollY + 200;

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
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-650 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>메인으로 돌아가기</span>
          </Link>
        </div>
      </div>

      {/* Intro section */}
      <section className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-[1400px] mx-auto text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {algoData.title}
          </h1>
          <p className="text-slate-350 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {algoData.fullDescription}
          </p>
        </div>
      </section>

      {/* Sticky Dual Navigation Header */}
      <div className="sticky top-16 z-45 bg-white/95 border-b border-slate-200 shadow-md backdrop-blur-md py-3.5 space-y-3">
        {/* 1. Algorithm switching tabs */}
        <div className="max-w-[1400px] mx-auto px-4 flex justify-center gap-2.5 flex-wrap">
          {[
            { id: 'toileting', name: '배설돌봄' },
            { id: 'feeding', name: '식사돌봄' },
            { id: 'transfer', name: '이승돌봄' }
          ].map((tab) => (
            <Link
              key={tab.id}
              href={`/${tab.id}`}
              className={`px-4 py-1.5 rounded-full text-xs font-black transition-all duration-200 ${
                algoId === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-650 hover:bg-slate-200'
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </div>

        {/* 2. Section Navigation Bar */}
        <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-start md:justify-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
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
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all duration-200 ${
                activeSection === sec.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-650 hover:bg-slate-200'
              }`}
            >
              {sec.name}
            </a>
          ))}
        </div>
      </div>

      {/* Main Single Flow Column */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        {/* Section 1: Original Algorithm Tree */}
        <section 
          id="original-tree" 
          style={{ scrollMarginTop: '180px' }}
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
            <a href="#original-tree" className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-650 transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>맨 위로</span>
            </a>
          </div>
        </section>

        {/* Section 2: Interactive Decision Map Explorer */}
        <section 
          id="algo-map"
          style={{ scrollMarginTop: '180px' }}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-800">
                알고리즘 지도
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                각 단계를 선택하면 판단 기준과 연결되는 돌봄로봇 유형을 확인할 수 있습니다.
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
            <a href="#original-tree" className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-650 transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>맨 위로</span>
            </a>
          </div>
        </section>

        {/* Section 3: Interactive Q&A Algorithm Runner */}
        <section 
          id="step-learning"
          style={{ scrollMarginTop: '180px' }}
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
            <a href="#original-tree" className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-650 transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>맨 위로</span>
            </a>
          </div>
        </section>

        {/* Section 4: Related Care Robots Carousel Slider */}
        <section 
          id="robot-types"
          style={{ scrollMarginTop: '180px' }}
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
              className="p-2 rounded-full border border-slate-200 bg-white text-slate-650 hover:text-slate-900 hover:bg-slate-50 hover:shadow-sm transition-all focus:outline-none shrink-0"
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
                      {cleanInternalCodes(devicesList[deviceIndex]?.name)}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-650 font-bold mt-2 leading-relaxed">
                      {cleanInternalCodes(devicesList[deviceIndex]?.oneLine)}
                    </p>
                  </div>

                  {/* Applicability situations bullets */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-400 block">적용 상황</span>
                    <ul className="text-xs text-slate-650 font-bold list-disc list-inside space-y-0.5">
                      {devicesList[deviceIndex]?.situations.map((sit, i) => (
                        <li key={i} className="leading-relaxed">{cleanInternalCodes(sit)}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Left / Right Split Layout for Functions & Cautions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    {/* Functions Box */}
                    <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-4">
                      <span className="text-xs font-bold text-emerald-700 block mb-2">주요 기능</span>
                      <ul className="text-[11px] sm:text-xs text-slate-650 font-semibold list-disc list-inside space-y-1 leading-relaxed">
                        {devicesList[deviceIndex]?.functions.map((func, idx) => (
                          <li key={idx}>{cleanInternalCodes(func)}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Cautions Box */}
                    <div className="bg-amber-50/40 border border-amber-100 rounded-xl p-4">
                      <span className="text-xs font-bold text-amber-700 block mb-2">확인할 점</span>
                      <ul className="text-[11px] sm:text-xs text-slate-650 font-semibold list-disc list-inside space-y-1 leading-relaxed">
                        {devicesList[deviceIndex]?.cautions.map((caut, idx) => (
                          <li key={idx}>{cleanInternalCodes(caut)}</li>
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
              className="p-2 rounded-full border border-slate-200 bg-white text-slate-650 hover:text-slate-900 hover:bg-slate-50 hover:shadow-sm transition-all focus:outline-none shrink-0"
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
            <a href="#original-tree" className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-650 transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>맨 위로</span>
            </a>
          </div>
        </section>

        {/* Section 5: Case Study Quiz */}
        <section 
          id="quiz-section"
          style={{ scrollMarginTop: '180px' }}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black text-slate-800">
              사례 기반 퀴즈
            </h2>
          </div>
          <div className="h-0.5 bg-slate-100 w-full" />

          {sessionQuizzes && sessionQuizzes.length > 0 ? (
            <div className="space-y-6">
              {!isFinished ? (
                <div className="space-y-6 animate-fade-in">
                  {/* Progress & Score */}
                  <div className="flex justify-between items-center text-sm sm:text-base font-bold text-slate-650 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 shadow-inner">
                    <span>진행률: <strong className="text-slate-800 text-lg">{quizIndex + 1}</strong> / <strong className="text-slate-800 text-lg">{sessionQuizzes.length}</strong> 문제</span>
                    <span className="text-emerald-600 font-extrabold text-base sm:text-lg">현재 점수: {score}점</span>
                  </div>

                  {/* Scenario Card */}
                  <div className="bg-slate-50 border-l-4 border-l-slate-900 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4">
                    <span className="inline-block text-xs sm:text-sm font-black bg-slate-900 text-white px-3 py-1 rounded">
                      상황 사례
                    </span>
                    <p className="text-lg sm:text-xl md:text-2xl text-slate-800 leading-relaxed font-black max-w-4xl">
                      {cleanInternalCodes(sessionQuizzes[quizIndex].scenario)}
                    </p>
                  </div>

                  {/* Question */}
                  <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-xl">
                    <h4 className="text-xl sm:text-2xl md:text-3xl font-black text-blue-900 leading-snug">
                      Q. {cleanInternalCodes(sessionQuizzes[quizIndex].question)}
                    </h4>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sessionQuizzes[quizIndex].options.map((option: string, idx: number) => {
                      const isSelected = selectedOption === idx;
                      const isCorrect = idx === sessionQuizzes[quizIndex].correctAnswerIndex;
                      
                      let optionStyle = 'border-slate-200 hover:bg-slate-50 text-slate-700 bg-white hover:border-slate-350';
                      if (isSelected) {
                        optionStyle = 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-600/30';
                      }
                      if (isSubmitted) {
                        if (isCorrect) {
                          optionStyle = 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-600/30';
                        } else if (isSelected) {
                          optionStyle = 'border-rose-600 bg-rose-50 text-rose-900 ring-2 ring-rose-600/30';
                        } else {
                          optionStyle = 'border-slate-200 opacity-50 text-slate-400 bg-slate-50/20';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isSubmitted}
                          onClick={() => handleQuizAnswer(idx)}
                          className={`flex items-start gap-4 p-5 sm:p-6 rounded-xl border text-left font-black text-base sm:text-lg md:text-xl transition-all duration-200 cursor-pointer shadow-sm ${optionStyle}`}
                        >
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 mt-0.5 border ${
                            isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 text-slate-505'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className="leading-snug">{cleanInternalCodes(option)}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Action buttons / Result description */}
                  <div className="pt-4 flex flex-col sm:flex-row sm:justify-end gap-4">
                    {!isSubmitted ? (
                      <button
                        onClick={handleQuizSubmit}
                        disabled={selectedOption === null}
                        className="px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-base sm:text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span>정답 확인하기</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuiz}
                        className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-base sm:text-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
                      >
                        <span>{quizIndex + 1 === sessionQuizzes.length ? '진단 결과 분석 보기' : '다음 문제 풀기'}</span>
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {/* Feedback explanation */}
                  {isSubmitted && (
                    <div className={`p-6 sm:p-8 rounded-xl border flex gap-4 ${
                      selectedOption === sessionQuizzes[quizIndex].correctAnswerIndex
                        ? 'bg-emerald-50/50 border-emerald-200' 
                        : 'bg-rose-50/50 border-rose-200'
                    }`}>
                      <AlertCircle className={`w-6 h-6 shrink-0 mt-0.5 ${
                        selectedOption === sessionQuizzes[quizIndex].correctAnswerIndex ? 'text-emerald-600' : 'text-rose-600'
                      }`} />
                      <div className="space-y-2 text-left">
                        <h5 className={`font-black text-base sm:text-lg ${
                          selectedOption === sessionQuizzes[quizIndex].correctAnswerIndex ? 'text-emerald-800' : 'text-rose-800'
                        }`}>
                          {selectedOption === sessionQuizzes[quizIndex].correctAnswerIndex ? '정답입니다!' : '오답입니다.'}
                        </h5>
                        <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-bold">
                          {cleanInternalCodes(sessionQuizzes[quizIndex].explanation)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Quiz Complete screen */
                <div className="text-center py-10 space-y-8 max-w-2xl mx-auto animate-fade-in text-slate-800">
                  <div className="w-24 h-24 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">모든 퀴즈를 완료했습니다!</h3>
                    <p className="text-lg sm:text-xl text-slate-600 font-bold">
                      전체 {sessionQuizzes.length} 문제 중 <strong className="text-blue-600 text-2xl sm:text-3xl font-black">{score}</strong> 문제를 맞추셨습니다.
                    </p>
                  </div>

                  {/* Weakness analysis for transfer algorithm */}
                  {algoId === 'transfer' && (
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left space-y-6">
                      <h4 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
                        <span>📊 영역별 진단 및 취약점 분석</span>
                      </h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { key: 'A', name: 'A. 알고리즘 이해' },
                          { key: 'B', name: 'B. 정보 판단 및 추가 평가' },
                          { key: 'C', name: 'C. 장비 선택' },
                          { key: 'D', name: 'D. 사례 적용' },
                          { key: 'E', name: 'E. 안전 및 환경 판단' }
                        ].map((cat) => {
                          const catScore = categoryScores[cat.key] || 0;
                          const isWeak = catScore < 2;
                          return (
                            <div key={cat.key} className={`p-4 rounded-xl border transition-all ${
                              isWeak ? 'bg-rose-50/40 border-rose-100' : 'bg-emerald-50/40 border-emerald-100'
                            }`}>
                              <div className="flex justify-between items-center mb-1.5">
                                <span className="font-bold text-sm sm:text-base text-slate-800">{cat.name}</span>
                                <span className={`text-xs sm:text-sm font-black px-2 py-0.5 rounded-full ${
                                  isWeak ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                                }`}>
                                  {catScore} / 2점
                                </span>
                              </div>
                              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    isWeak ? 'bg-rose-500' : 'bg-emerald-500'
                                  }`}
                                  style={{ width: `${(catScore / 2) * 100}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Weakness analysis commentary */}
                      <div className="bg-white border border-slate-200/80 rounded-xl p-5 space-y-3.5">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest block">자가 학습 피드백 가이드</span>
                        {(() => {
                          const weakCategories = ['A', 'B', 'C', 'D', 'E'].filter(k => (categoryScores[k] || 0) < 2);
                          if (weakCategories.length === 0) {
                            return (
                              <p className="text-emerald-700 font-bold text-base sm:text-lg leading-relaxed">
                                🎉 모든 영역을 완벽하게 이해하고 계십니다! 알고리즘을 현업에 바로 적용하기에 충분한 전문성을 갖추셨습니다.
                              </p>
                            );
                          }
                          return (
                            <ul className="space-y-2 list-disc pl-4 text-xs sm:text-sm text-slate-650 font-semibold leading-relaxed">
                              {weakCategories.map((catKey) => {
                                const commentaryMap: Record<string, string> = {
                                  A: "알고리즘 이해 영역이 부족합니다. 기능평가 후 하지근력/체중지지/상체조절 순으로 이어지는 판단 흐름을 더 복습해 보세요.",
                                  B: "정보 판단 및 추가 평가 영역이 부족합니다. 환자의 신체 등급이나 지탱력에 따라 추가적으로 확인해야 할 세부 정보를 정밀하게 복습해 보세요.",
                                  C: "장비 선택 영역이 부족합니다. 기립보조, 슬링리프트, 슬라이딩 보드 등 환자의 역량에 알맞은 장비 매칭을 다져보세요.",
                                  D: "사례 적용 영역이 부족합니다. 여러 가지 환자 시나리오 사례에 장비를 대입하는 연습을 많이 해보세요.",
                                  E: "안전 및 환경 판단 영역이 부족합니다. 천장 보강 가능 여부, 문턱 등의 물리적 주거 환경이나 비상 중단 등의 안전 수칙을 점검해 보세요."
                                };
                                return (
                                  <li key={catKey}>
                                    {commentaryMap[catKey]}
                                  </li>
                                );
                              })}
                            </ul>
                          );
                        })()}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 justify-center pt-4">
                    <button
                      onClick={handleResetQuiz}
                      className="px-6 py-4 rounded-xl border border-slate-350 hover:bg-slate-50 text-slate-700 font-extrabold text-base transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <RefreshCw className="w-5 h-5" />
                      <span>처음부터 다시 풀기</span>
                    </button>
                    <Link
                      href="/"
                      className="px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-base transition-all shadow-sm"
                    >
                      다른 알고리즘 학습하기
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-slate-400 text-sm text-center py-6">준비된 퀴즈가 없습니다.</p>
          )}

          <div className="flex justify-end">
            <a href="#original-tree" className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-650 transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>맨 위로</span>
            </a>
          </div>
        </section>

      </div>

      {/* Lightbox Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl p-4 overflow-auto flex flex-col items-center gap-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center w-full border-b pb-2">
              <h3 className="font-bold text-slate-800 text-base">{getOriginalTitle()} 크게 보기</h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-slate-500 hover:text-slate-850 font-bold text-sm bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                닫기
              </button>
            </div>
            <img
              src={algoData.diagramImage}
              alt={`${algoData.title} 크게 보기`}
              className="max-w-full h-auto object-contain rounded"
            />
          </div>
        </div>
      )}

    </div>
  );
}
