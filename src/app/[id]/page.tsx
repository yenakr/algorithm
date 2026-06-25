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
    if (rawQuizzes.length > 0) {
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
  }, [algoId, algoData]);

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
      const scrollPosition = window.scrollY + 110;

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
      {/* Sticky Compact Navigation Header */}
      <div className="sticky top-0 z-50 bg-white/95 border-b border-slate-200/80 shadow-sm backdrop-blur-md py-2.5">
        <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between gap-4">
          {/* Logo / Home Link (Left aligned) */}
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-650 hover:text-slate-900 transition-colors shrink-0">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>메인</span>
          </Link>

          {/* Unified horizontal scrollable pill bar (Centered) */}
          <div className="flex-1 flex items-center justify-start md:justify-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
            {/* Algorithm Switchers */}
            <div className="flex items-center gap-1.5 shrink-0">
              {[
                { id: 'toileting', name: '배설돌봄' },
                { id: 'feeding', name: '식사돌봄' },
                { id: 'transfer', name: '이승돌봄' }
              ].map((tab) => (
                <Link
                  key={tab.id}
                  href={`/${tab.id}`}
                  className={`px-3 py-1.5 rounded-full text-xs font-black transition-all duration-200 ${
                    algoId === tab.id
                      ? 'bg-slate-950 text-white shadow-sm ring-1 ring-slate-900'
                      : 'bg-slate-100 text-slate-650 hover:bg-slate-200'
                  }`}
                >
                  {tab.name}
                </Link>
              ))}
            </div>

            {/* Subtle Divider */}
            <div className="h-5 w-[1px] bg-slate-300 mx-1 shrink-0" />

            {/* Section Anchors */}
            <div className="flex items-center gap-1.5 shrink-0">
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
                      ? 'bg-blue-100 text-blue-800 border border-blue-200 shadow-sm'
                      : 'bg-slate-50 text-slate-505 border border-slate-200/60 hover:bg-slate-100'
                  }`}
                >
                  {sec.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Single Flow Column */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        {/* Section 1: Original Algorithm Tree */}
        <section 
          id="original-tree" 
          style={{ scrollMarginTop: '90px' }}
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
          style={{ scrollMarginTop: '90px' }}
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
          style={{ scrollMarginTop: '90px' }}
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
          style={{ scrollMarginTop: '90px' }}
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
                <div className="md:col-span-5 flex justify-center self-center w-full">
                  <div className="relative w-full max-w-[280px] h-[280px] sm:max-w-[320px] sm:h-[320px] bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-md flex items-center justify-center p-4">
                    {devicesList[deviceIndex]?.image ? (
                      <img
                        src={devicesList[deviceIndex].image}
                        alt={devicesList[deviceIndex].name}
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
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
                      <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shadow-inner">
                        <Bot className="w-8 h-8" />
                      </div>
                      <span className="text-xs font-bold text-slate-400 leading-normal">
                        이미지 준비 중
                      </span>
                    </div>
                  </div>
                </div>

                {/* Robot Details contents */}
                <div className="md:col-span-7 space-y-5 text-left">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
                      {cleanInternalCodes(devicesList[deviceIndex]?.name)}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-slate-700 font-extrabold mt-3 leading-relaxed border-l-4 border-blue-500 pl-3">
                      {cleanInternalCodes(devicesList[deviceIndex]?.oneLine)
                        .replace(/(자동배설처리로봇|배설 케어 로봇|자동 식사 보조 로봇|이승 보조 장치|이승돌봄 장비)/g, '|$1|')
                        .split('|').map((chunk, i) => i % 2 === 1 ? <strong key={i} className="text-blue-600 font-black">{chunk}</strong> : chunk)}
                    </p>
                  </div>

                  {/* Applicability situations bullets */}
                  <div className="space-y-2">
                    <span className="text-xs sm:text-sm font-black text-slate-400 uppercase tracking-wider block">적용 상황</span>
                    <ul className="text-sm sm:text-base text-slate-800 font-bold list-disc list-inside space-y-1 pl-1 leading-relaxed">
                      {devicesList[deviceIndex]?.situations.map((sit, i) => (
                        <li key={i}>
                          {cleanInternalCodes(sit)
                            .replace(/(이동 보조|이승이 필요한|기저귀 교체|스스로 식사)/g, '|$1|')
                            .split('|').map((chunk, i) => i % 2 === 1 ? <span key={i} className="text-slate-955 font-black bg-yellow-50 px-1 rounded">{chunk}</span> : chunk)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Left / Right Split Layout for Functions & Cautions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    {/* Functions Box */}
                    <div className="bg-emerald-50/50 border border-emerald-100/80 rounded-xl p-4 sm:p-5">
                      <span className="text-xs sm:text-sm font-black text-emerald-800 block mb-2.5">주요 기능</span>
                      <ul className="text-xs sm:text-sm text-slate-700 font-bold list-disc list-inside space-y-1.5 leading-relaxed">
                        {devicesList[deviceIndex]?.functions.map((func, idx) => (
                          <li key={idx} className="whitespace-normal break-keep">
                            {cleanInternalCodes(func)
                              .replace(/(이동을 보조|세정, 건조|자동화)/g, '|$1|')
                              .split('|').map((chunk, i) => i % 2 === 1 ? <strong key={i} className="text-emerald-700 font-black">{chunk}</strong> : chunk)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Cautions Box */}
                    <div className="bg-amber-50/50 border border-amber-100/80 rounded-xl p-4 sm:p-5">
                      <span className="text-xs sm:text-sm font-black text-amber-800 block mb-2.5">확인할 점</span>
                      <ul className="text-xs sm:text-sm text-slate-700 font-bold list-disc list-inside space-y-1.5 leading-relaxed">
                        {devicesList[deviceIndex]?.cautions.map((caut, idx) => (
                          <li key={idx} className="whitespace-normal break-keep">
                            {cleanInternalCodes(caut)
                              .replace(/(설치 공간|주기적으로 확인|안전 확인)/g, '|$1|')
                              .split('|').map((chunk, i) => i % 2 === 1 ? <strong key={i} className="text-amber-700 font-black">{chunk}</strong> : chunk)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

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
          style={{ scrollMarginTop: '90px' }}
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

                  {/* Weakness analysis for the algorithm */}
                  {sessionQuizzes.length > 0 && (
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

                          // Commentary customized by algorithm
                          const getCommentary = (catKey: string) => {
                            if (algoId === 'toileting') {
                              const toiletingMap: Record<string, string> = {
                                A: "알고리즘 이해 영역이 부족합니다. 배뇨감 인지 ➔ 화장실 이동 ➔ 용변 후 청결로 순차 진행되는 의사결정 흐름을 복습해 보세요.",
                                B: "정보 판단 및 추가 평가 영역이 부족합니다. 요의 인지 어려움 수준이나 화장실 이동 가능 여부에 따라 뒤따르는 평가 단계를 꼼꼼히 확인해 보세요.",
                                C: "장비 선택 영역이 부족합니다. 자동 배설처리로봇, 비데, 이동 변기 등 환자 상태별 최적 장비 매칭을 학습해 보세요.",
                                D: "사례 적용 영역이 부족합니다. 복합적인 배설 장애 환자의 가상 시나리오에 알맞은 케어 방안을 적용하는 감각을 길러보세요.",
                                E: "안전 및 환경 판단 영역이 부족합니다. 피부 손상, 낙상 위험, 요로감염 예방을 위한 소독/안전 지침을 확인해 보세요."
                              };
                              return toiletingMap[catKey];
                            } else if (algoId === 'feeding') {
                              const feedingMap: Record<string, string> = {
                                A: "알고리즘 이해 영역이 부족합니다. 삼킴 기능(구강 섭취) 평가에서 시작하여 먹기/마시기 기능 ➔ 팔 근력 평가로 흐르는 흐름을 복습해 보세요.",
                                B: "정보 판단 및 추가 평가 영역이 부족합니다. 팔 근력의 등급(Grade III 기준)에 따른 세부 평가 기준을 다시 한번 읽어보세요.",
                                C: "장비 선택 영역이 부족합니다. 전자동 식사돌봄로봇, 수동식 상지 지지대, 특수식사도구(경사식기 등)의 선정 기준을 학습해 보세요.",
                                D: "사례 적용 영역이 부족합니다. 구강 섭취가 불가능해 경관 영양이 시급한 상황 등 구체적인 돌봄 사례에 대입해 보세요.",
                                E: "안전 및 환경 판단 영역이 부족합니다. 오접식이나 오연(사래·기도 폐쇄) 방지를 위한 환자 자세 제어 및 긴급 대처법을 점검해 보세요."
                              };
                              return feedingMap[catKey];
                            } else {
                              const transferMap: Record<string, string> = {
                                A: "알고리즘 이해 영역이 부족합니다. 기능평가 후 하지근력/체중지지/상체조절 순으로 이어지는 판단 흐름을 더 복습해 보세요.",
                                B: "정보 판단 및 추가 평가 영역이 부족합니다. 환자의 신체 등급이나 지탱력에 따라 추가적으로 확인해야 할 세부 정보를 정밀하게 복습해 보세요.",
                                C: "장비 선택 영역이 부족합니다. 기립보조, 슬링리프트, 슬라이딩 보드 등 환자의 역량에 알맞은 장비 매칭을 다져보세요.",
                                D: "사례 적용 영역이 부족합니다. 여러 가지 환자 시나리오 사례에 장비를 대입하는 연습을 많이 해보세요.",
                                E: "안전 및 환경 판단 영역이 부족합니다. 천장 보강 가능 여부, 문턱 등의 물리적 주거 환경이나 비상 중단 등의 안전 수칙을 점검해 보세요."
                              };
                              return transferMap[catKey];
                            }
                          };

                          return (
                            <ul className="space-y-2 list-disc pl-4 text-xs sm:text-sm text-slate-650 font-semibold leading-relaxed">
                              {weakCategories.map((catKey) => (
                                <li key={catKey}>
                                  {getCommentary(catKey)}
                                </li>
                              ))}
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
