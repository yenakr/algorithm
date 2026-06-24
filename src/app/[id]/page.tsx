'use client';

import { useState, use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, BookOpen, GitMerge, HelpCircle, CheckCircle2, 
  ChevronRight, ChevronLeft, RefreshCw, AlertCircle, FileText, Image as ImageIcon, Bot
} from 'lucide-react';

// Data layers
import { algorithmsData } from '@/data';

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

  const devicesList = algoData.education.devices.list;

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

      {/* Hero section */}
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

      {/* Main Single Flow Column */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        {/* Section 1: Original Algorithm Tree */}
        <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              원본 알고리즘 트리 보기
            </h2>
          </div>
          <div className="h-0.5 bg-slate-100 w-full" />
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            아래 이미지는 알고리즘의 전체 흐름을 한눈에 볼 수 있도록 정리한 원본 도식입니다.<br />
            세부 판단 과정은 다음 단계에서 직접 선택하며 학습할 수 있습니다.
          </p>

          {/* Diagram display box */}
          <div className="relative border border-slate-200 bg-slate-100/50 rounded-xl overflow-hidden min-h-[300px] flex items-center justify-center p-4">
            {!imageError ? (
              <img
                src={algoData.diagramImage}
                alt={`${algoData.title} 원본 이미지`}
                className="max-h-[500px] object-contain rounded"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="text-center p-8 max-w-md space-y-4">
                <div className="w-16 h-16 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-700">원본 알고리즘 트리 이미지가 들어갈 영역입니다.</h4>
                  <p className="text-xs text-slate-500 leading-normal">
                    교수님께 받은 고해상도 이미지를 프로젝트 폴더의 <code className="bg-slate-200 px-1 py-0.5 rounded text-blue-700">public{algoData.diagramImage}</code> 경로에 업로드해 주세요.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Section: Related Care Robots Carousel Slider */}
        <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                <Bot className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                추천 돌봄로봇 유형 살펴보기
              </h2>
            </div>
            
            {/* Quick Slider Page Indicators */}
            <div className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
              {deviceIndex + 1} / {devicesList.length}
            </div>
          </div>
          <div className="h-0.5 bg-slate-100 w-full" />

          {/* Carousel Layout wrapper */}
          <div className="relative flex items-center justify-between gap-2 sm:gap-4 select-none">
            {/* Left Prev Arrow Button */}
            <button
              onClick={handlePrevDevice}
              className="p-2 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:shadow-sm transition-all focus:outline-none shrink-0"
              aria-label="이전 로봇 보기"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Premium Cuttoon style main card */}
            <div className="flex-1 min-w-0 bg-slate-50/50 border border-slate-200/60 rounded-2xl p-6 sm:p-8 transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Robot Image or Fallback container */}
                <div className="md:col-span-4 flex justify-center">
                  <div className="relative w-full max-w-[200px] h-[200px] bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm flex items-center justify-center p-3">
                    {getDeviceImage(devicesList[deviceIndex].id) ? (
                      <img
                        src={getDeviceImage(devicesList[deviceIndex].id)}
                        alt={devicesList[deviceIndex].name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-center p-4 flex flex-col items-center justify-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shadow-inner">
                          <Bot className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-400 leading-normal">
                          이미지 준비 중<br />({devicesList[deviceIndex].id})
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Robot Details contents */}
                <div className="md:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 text-xs font-bold bg-blue-100 text-blue-800 rounded-full">
                      {devicesList[deviceIndex].category}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      기기 코드: {devicesList[deviceIndex].id}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-800">
                    {devicesList[deviceIndex].name}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                    {devicesList[deviceIndex].description}
                  </p>

                  <div className="bg-white border border-slate-100 rounded-xl p-4 space-y-3">
                    <div>
                      <span className="text-xs font-bold text-slate-400 block mb-1">적용 대상자</span>
                      <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                        {devicesList[deviceIndex].target}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <span className="text-xs font-bold text-emerald-600 block mb-1">👍 장점</span>
                        <ul className="text-xs text-slate-500 font-semibold list-disc list-inside space-y-0.5">
                          {devicesList[deviceIndex].pros.map((pro, idx) => (
                            <li key={idx}>{pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-amber-600 block mb-1">⚠️ 유의사항</span>
                        <ul className="text-xs text-slate-500 font-semibold list-disc list-inside space-y-0.5">
                          {devicesList[deviceIndex].precautions.map((pre, idx) => (
                            <li key={idx}>{pre}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Right Next Arrow Button */}
            <button
              onClick={handleNextDevice}
              className="p-2 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:shadow-sm transition-all focus:outline-none shrink-0"
              aria-label="다음 로봇 보기"
            >
              <ChevronRight className="w-6 h-6" />
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
        </section>

        {/* Section 2: Interactive Clicking Algorithm */}
        <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <GitMerge className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              단계별 알고리즘 따라가기
            </h2>
          </div>
          <div className="h-0.5 bg-slate-100 w-full" />
          
          <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/50">
            <AlgorithmRunner 
              algorithm={algoData.algorithm} 
              mode="learning"
              uiMode="simple"
            />
          </div>
        </section>

        {/* Section 3: Case Study Quiz */}
        <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              알고리즘 기반 사례 퀴즈
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
        </section>

      </div>
    </div>
  );
}
