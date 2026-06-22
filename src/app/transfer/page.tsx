'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BookOpen, GitMerge, FileText, CheckSquare, Shield, HelpCircle, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

// Data imports
import { transferCareAlgorithm } from '@/data/algorithms/transferCare';
import { transferEducationData } from '@/data/education/transferEducation';
import { transferCases } from '@/data/cases/transferCases';

// Component imports
import AlgorithmRunner from '@/components/AlgorithmRunner';
import AlgorithmFlowchart from '@/components/AlgorithmFlowchart';

export default function TransferPage() {
  const [activeTab, setActiveTab] = useState<'info' | 'devices' | 'learning' | 'assessment' | 'quiz'>('info');
  const [learningPath, setLearningPath] = useState<string[]>([]);
  const [assessmentPath, setAssessmentPath] = useState<string[]>([]);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const tabs = [
    { id: 'info', name: '소개 & 평가기준', icon: BookOpen },
    { id: 'devices', name: '이승기기 종류', icon: Shield },
    { id: 'learning', name: '알고리즘 학습', icon: GitMerge },
    { id: 'assessment', name: '나의 맞춤 자가평가', icon: FileText },
    { id: 'quiz', name: '사례 테스트 (퀴즈)', icon: CheckSquare },
  ] as const;

  const handleQuizAnswer = (optionIdx: number) => {
    if (isQuizSubmitted) return;
    setSelectedQuizOption(optionIdx);
  };

  const handleQuizSubmit = () => {
    if (selectedQuizOption === null) return;
    
    const currentCase = transferCases[quizIndex];
    if (selectedQuizOption === currentCase.correctAnswerIndex) {
      setQuizScore(prev => prev + 1);
    }
    setIsQuizSubmitted(true);
  };

  const handleQuizNext = () => {
    setSelectedQuizOption(null);
    setIsQuizSubmitted(false);
    if (quizIndex < transferCases.length - 1) {
      setQuizIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setSelectedQuizOption(null);
    setIsQuizSubmitted(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-5 mb-8">
        <span className="text-xs font-bold text-primary uppercase tracking-wider">TRANSFER CARE</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mt-1">
          이승돌봄 로봇 교육 및 자가평가
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-2">
          침대, 휠체어, 의자 등으로 안전하게 환자를 옮기기 위한 가이드라인과 최적의 리프트/기립보조 기기를 확인합니다.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto gap-2 border-b border-slate-200 pb-px mb-8 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm whitespace-nowrap transition-all ${
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 flex flex-col">
        {/* Tab 1: 소개 & 평가기준 */}
        {activeTab === 'info' && (
          <div className="space-y-10 animate-fade-in">
            {/* Definition Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-primary rounded-full inline-block" />
                {transferEducationData.definition.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                {transferEducationData.definition.content}
              </p>
              <div className="bg-slate-50 rounded-xl p-4 sm:p-6 border border-slate-100 space-y-3">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">주요 이승 상황 예시</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-semibold text-slate-700">
                  {transferEducationData.definition.examples.map((ex, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Standards Section */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-primary rounded-full inline-block" />
                자리이동 기능평가 (독립성 측정)
              </h2>
              <p className="text-sm sm:text-base text-slate-500">
                {transferEducationData.standards.description} 2점 이상(중간 정도의 어려움 이상)부터 기계적 이승돌봄 기기의 적극적 개입이 요구됩니다.
              </p>

              {/* Grid representation of scores */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {transferEducationData.standards.items.map((item) => (
                  <div key={item.score} className="p-4 rounded-xl border border-slate-200/60 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-200/80 text-slate-700 inline-block mb-2">
                        {item.score}
                      </span>
                      <h3 className="text-base font-bold text-slate-800 mb-1">{item.label}</h3>
                      <p className="text-xs text-slate-500 leading-normal font-medium">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Muscle Grade Section */}
              {transferEducationData.standards.subSection && (
                <div className="border-t border-slate-100 pt-8 mt-8 space-y-4">
                  <h3 className="text-lg font-bold text-slate-800">
                    {transferEducationData.standards.subSection.title}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {transferEducationData.standards.subSection.description}
                  </p>
                  <div className="overflow-x-auto rounded-xl border border-slate-200/70">
                    <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                      <thead className="bg-slate-100 font-bold text-slate-700">
                        <tr>
                          <th className="px-6 py-3">근력 레벨</th>
                          <th className="px-6 py-3">상태 구분</th>
                          <th className="px-6 py-3">임상 판정 기준 (체중 지지력 여부)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-600 bg-white">
                        {transferEducationData.standards.subSection.items.map((subItem) => {
                          const isWeightBearing = ['Grade IV', 'Grade V'].includes(subItem.grade);
                          return (
                            <tr key={subItem.grade} className={isWeightBearing ? 'bg-sky-50/30' : ''}>
                              <td className="px-6 py-4 font-bold text-slate-800">{subItem.grade}</td>
                              <td className="px-6 py-4">
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                  isWeightBearing ? 'bg-sky-100 text-primary' : 'bg-slate-100 text-slate-500'
                                }`}>
                                  {subItem.label}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="block leading-relaxed">{subItem.criteria}</span>
                                {isWeightBearing ? (
                                  <span className="text-xs text-primary font-bold mt-0.5 block">→ 알고리즘상 체중 지지 가능으로 판정</span>
                                ) : (
                                  <span className="text-xs text-amber-600 font-bold mt-0.5 block">→ 체중 지지 불가능 (전신 슬링형 리프트 적합)</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: 이승기기 종류 */}
        {activeTab === 'devices' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
                이승돌봄 기기 및 로봇 유형 소개
              </h2>
              <p className="text-sm sm:text-base text-slate-500">
                {transferEducationData.devices.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {transferEducationData.devices.list.map((device) => {
                const isStanding = ['T-C', 'T-D'].includes(device.id);
                const imgPath = isStanding ? '/images/standing_aid.png' : '/images/transfer_lift.png';
                return (
                  <div key={device.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
                    <div className="p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                        {/* Device Image */}
                        <div className="sm:col-span-4 relative aspect-square rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2">
                          <Image
                            src={imgPath}
                            alt={device.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        
                        {/* Device Info */}
                        <div className="sm:col-span-8 space-y-3">
                          <div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500 uppercase">
                              {device.category}
                            </span>
                            <h3 className="text-lg font-bold text-slate-800 mt-1 leading-snug">{device.name}</h3>
                          </div>
                          <p className="text-xs text-slate-400 font-semibold leading-normal">
                            <strong className="text-slate-600 block mb-0.5">추천 대상자:</strong>
                            {device.target}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 border-t border-slate-100 pt-4">
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                          {device.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {device.features.map((f, idx) => (
                            <span key={idx} className="text-xs bg-slate-100 text-slate-600 font-semibold px-2.5 py-1 rounded-md">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: 알고리즘 학습 */}
        {activeTab === 'learning' && (
          <div className="space-y-8 animate-fade-in flex-1 flex flex-col">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
                이승돌봄 알고리즘 학습 시뮬레이터
              </h2>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                자가평가를 시뮬레이션해 보면서 각 질문에 따라 알고리즘 맵 상에서 어느 경로로 이동하는지 실시간 하이라이트로 공부할 수 있는 인터랙티브 학습 뷰입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Runner */}
              <div className="lg:col-span-5">
                <AlgorithmRunner
                  algorithm={transferCareAlgorithm}
                  mode="learning"
                  onPathChange={(path) => setLearningPath(path)}
                />
              </div>

              {/* Right Column: Flowchart Mapping */}
              <div className="lg:col-span-7">
                <AlgorithmFlowchart
                  algorithmId="transfer"
                  activePath={learningPath}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: 맞춤 자가평가 */}
        {activeTab === 'assessment' && (
          <div className="max-w-3xl mx-auto w-full py-4 animate-fade-in">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm mb-6 text-center space-y-3">
              <h2 className="text-2xl font-bold text-slate-800">
                이승돌봄 자가평가 진단
              </h2>
              <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
                환자 본인 또는 보호자가 직접 질문에 응답하여 현재 기능 수준에 꼭 알맞은 돌봄기기 또는 최첨단 로봇을 진단받고, 그에 따른 안전 대책 가이드를 도출합니다.
              </p>
            </div>
            
            <AlgorithmRunner
              algorithm={transferCareAlgorithm}
              mode="self-assessment"
              onPathChange={(path) => setAssessmentPath(path)}
            />
          </div>
        )}

        {/* Tab 5: 사례 테스트 */}
        {activeTab === 'quiz' && (
          <div className="max-w-3xl mx-auto w-full py-4 animate-fade-in">
            {!quizFinished ? (
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md overflow-hidden">
                {/* Progress bar */}
                <div className="bg-slate-100 h-1.5 w-full">
                  <div 
                    className="bg-primary h-full transition-all duration-300"
                    style={{ width: `${((quizIndex) / transferCases.length) * 100}%` }}
                  />
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  {/* Quiz Header */}
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <span className="text-xs font-bold text-slate-400">
                      사례 테스트 Q. 0{quizIndex + 1} / 0{transferCases.length}
                    </span>
                    <span className="text-sm font-bold text-primary bg-primary-light px-2.5 py-0.5 rounded-full">
                      맞춘 개수: {quizScore}
                    </span>
                  </div>

                  {/* Case Scenario */}
                  <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">임상 사례 (Scenario)</span>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-semibold">
                      {transferCases[quizIndex].scenario}
                    </p>
                  </div>

                  {/* Question */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                    {transferCases[quizIndex].question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-3">
                    {transferCases[quizIndex].options.map((opt, idx) => {
                      let btnStyle = 'border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-700';
                      
                      if (selectedQuizOption === idx) {
                        btnStyle = 'border-primary bg-primary/5 text-primary font-bold';
                      }

                      if (isQuizSubmitted) {
                        if (idx === transferCases[quizIndex].correctAnswerIndex) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold';
                        } else if (selectedQuizOption === idx) {
                          btnStyle = 'border-red-400 bg-red-50 text-red-800';
                        } else {
                          btnStyle = 'border-slate-100 text-slate-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleQuizAnswer(idx)}
                          disabled={isQuizSubmitted}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between font-medium ${btnStyle}`}
                        >
                          <span className="text-sm sm:text-base">{opt}</span>
                          <ChevronRight className="w-4 h-4 shrink-0" />
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation & Submission */}
                  <div className="flex justify-end pt-4 border-t border-slate-100">
                    {!isQuizSubmitted ? (
                      <button
                        onClick={handleQuizSubmit}
                        disabled={selectedQuizOption === null}
                        className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                      >
                        답안 제출하기
                      </button>
                    ) : (
                      <button
                        onClick={handleQuizNext}
                        className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold transition-all flex items-center gap-2 shadow-md"
                      >
                        <span>{quizIndex < transferCases.length - 1 ? '다음 문제' : '퀴즈 완료'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Explanation Block */}
                  {isQuizSubmitted && (
                    <div className="mt-6 p-5 rounded-xl border border-sky-100 bg-sky-50/50 space-y-2 animate-fade-in">
                      <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        <span>정답 해설 ({selectedQuizOption === transferCases[quizIndex].correctAnswerIndex ? '정답입니다!' : '오답입니다.'})</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                        {transferCases[quizIndex].explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Quiz completion screen
              <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-md text-center space-y-6 animate-fade-in">
                <div className="bg-primary/5 text-primary p-4 rounded-full w-fit mx-auto">
                  <TrophyIcon className="w-12 h-12" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">이승돌봄 사례 퀴즈 종료</h2>
                  <p className="text-sm text-slate-500">
                    실제 임상 및 보호자의 니즈 사례에 대한 알고리즘 해독 시험을 모두 마쳤습니다.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 max-w-sm mx-auto">
                  <span className="text-xs font-bold text-slate-400 block uppercase">최종 평가 점수</span>
                  <span className="text-4xl sm:text-5xl font-black text-primary mt-2 block">
                    {quizScore} / {transferCases.length}
                  </span>
                  <p className="text-xs text-slate-500 mt-2 font-medium">
                    {quizScore === transferCases.length
                      ? '축하합니다! 이승돌봄 알고리즘을 완벽하게 마스터하셨습니다.'
                      : '해설을 복기하며 돌봄 판별 기준을 다시 복습해 보시길 권장합니다.'}
                  </p>
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  <button
                    onClick={resetQuiz}
                    className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold shadow-md transition-all"
                  >
                    퀴즈 다시 풀기
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Simple local Trophy icon component
function TrophyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
      <path d="M12 2a6 6 0 0 0-6 6v3.5c0 1.63 1.37 2.95 3.08 2.95h5.84c1.71 0 3.08-1.32 3.08-2.95V8a6 6 0 0 0-6-6z" />
    </svg>
  );
}
