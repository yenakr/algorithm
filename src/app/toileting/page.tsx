'use client';

import { useState } from 'react';
import { 
  BookOpen, GitMerge, CheckSquare, Shield, ArrowRight, CheckCircle2, 
  ChevronRight, ChevronLeft, ChevronDown, ChevronUp, ThumbsUp, AlertTriangle, Map 
} from 'lucide-react';

// Data imports
import { toiletingCareAlgorithm } from '@/data/algorithms/toiletingCare';
import { toiletingEducationData } from '@/data/education/toiletingEducation';
import { toiletingCases } from '@/data/cases/toiletingCases';

// Component imports
import AlgorithmRunner from '@/components/AlgorithmRunner';
import CareTabs from '@/components/CareTabs';
import CareSafetyCard from '@/components/CareSafetyCard';
import RobotStorySection from '@/components/RobotStorySection';
import { IllustrationType } from '@/components/CareSceneIllustration';

const getToiletImage = (id: string) => {
  if (id === 'B-B') return '/images/hygiene_bidet.png';
  if (id === 'B-C' || id === 'B-D') return '/images/toilet_lift.png';
  if (id === 'B-G') return '/images/excretion_robot.png';
  if (id === 'B-H') return '/images/smart_diaper_robot.png';
  return '/images/excretion_robot.png';
};

const toiletingScenariosData = [
  { illustrationType: 'express-need' as const, title: '배설 신호 인지하기', description: '용변이 마려운 감각을 느끼고 표현해야 합니다.' },
  { illustrationType: 'move-difficulty' as const, title: '변기까지 이동하기', description: '침대에서 일어나 변기까지 걸어갈 때 넘어지지 않아야 합니다.' },
  { illustrationType: 'bedside-toileting' as const, title: '침상에서 용변 해결하기', description: '화장실까지 가기 곤란하면 침대 옆 변기를 이용해야 합니다.' },
  { illustrationType: 'clean-after' as const, title: '위생 뒤처리하기', description: '용변을 본 후 깨끗하게 닦고 바지를 올리는 과정이 필요합니다.' },
];

const toiletingHelpers = [
  '배뇨/배변 센서로 대소변이 나오면 *즉시 알아차리고 세정*해 줍니다.',
  '변기 시트의 높이와 각도를 조절해 *무릎 관절의 부담을 덜어* 줍니다.',
  '화장실까지 걸어가지 않고 *침대 바로 옆에서 안전하게 해결*하도록 돕습니다.',
  '오물을 깨끗이 진공 세정하고 온풍 건조하여 *피부의 짓무름과 염증을 예방*합니다.'
];

const toiletingStoryRobots = toiletingEducationData.devices.list.map(d => {
  let illustrationType: IllustrationType = 'hygiene-manage';
  if (d.id === 'B-B') illustrationType = 'hygiene-manage';
  else if (d.id === 'B-C') illustrationType = 'wheelchair-to-toilet';
  else if (d.id === 'B-D') illustrationType = 'bedside-toileting';
  else if (d.id === 'B-G') illustrationType = 'clean-after';
  else if (d.id === 'B-H') illustrationType = 'privacy-protection';
  
  return {
    id: d.id,
    name: d.name,
    category: d.category,
    description: d.description,
    whenToUse: d.target,
    precautions: d.precautions,
    illustrationType,
    pros: d.pros,
    target: d.target,
    imgPath: getToiletImage(d.id)
  };
});

const toiletingSafetyTips = [
  '대상자의 개인 사생활이 노출되지 않도록 가림막이나 커튼을 쳐 주세요.',
  '이동 변기나 리프트를 사용할 때는 바퀴가 확실히 잠겨 있는지 매번 확인하세요.',
  '화장실 이동 경로에 물기나 걸려 넘어질 수 있는 신발, 카펫 등을 깨끗이 치워 주세요.',
  '사용 중에 이상 동작이나 대상자가 고통을 호소하면 작동을 멈추고 보호자가 개입하세요.'
];

const toiletingSafetyItems = [
  { id: 't-s1', title: '개인 프라이버시 보호', description: '수치심을 유발하지 않게 항상 가림막이나 문을 잘 닫아 드립니다.', illustrationType: 'privacy-protection' as const },
  { id: 't-s2', title: '변기 고정 및 높이 맞춤', description: '이동식 변기의 바퀴를 잠그고 침대와의 높이 편차를 줄여 고정합니다.', illustrationType: 'safety-check' as const },
  { id: 't-s3', title: '이동로 장애물 제거', description: '바닥의 물기나 미끄러운 신발, 걸려 넘어질 물건을 모두 치웁니다.', illustrationType: 'move-difficulty' as const },
  { id: 't-s4', title: '도움 과정 미리 알리기', description: '갑자기 몸을 만지기 전에 진행하려는 과정을 대상자에게 먼저 상냥히 설명합니다.', illustrationType: 'caregiver-prep' as const },
  { id: 't-s5', title: '철저한 소독 및 위생', description: '배설 즉시 소독 및 환기를 진행하고 용기 수거 등 위생을 정돈합니다.', illustrationType: 'hygiene-manage' as const },
];

export default function ToiletingPage() {
  const [activeTab, setActiveTab] = useState<'devices' | 'learning' | 'map' | 'quiz'>('devices');
  const [learningPath, setLearningPath] = useState<string[]>([]);

  // Safety checklist state for Tab 4
  const [checkedSafety, setCheckedSafety] = useState<Record<string, boolean>>({});
  const [quizSafetyApproved, setQuizSafetyApproved] = useState(false);

  const handleToggleSafety = (id: string) => {
    setCheckedSafety(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleLearnMore = (deviceId: string) => {
    setActiveTab('devices');
    setTimeout(() => {
      const element = document.getElementById(`device-${deviceId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('ring-4', 'ring-primary', 'ring-offset-2');
        setTimeout(() => {
          element.classList.remove('ring-4', 'ring-primary', 'ring-offset-2');
        }, 2000);
      }
    }, 150);
  };

  const tabs = [
    { id: 'devices', name: '돌봄로봇 알아보기', icon: Shield },
    { id: 'learning', name: '나에게 맞는 돌봄로봇 찾기', icon: GitMerge },
    { id: 'map', name: '알고리즘 지도', icon: Map },
    { id: 'quiz', name: '연습해보기', icon: CheckSquare },
  ] as const;

  const tabOrder = ['devices', 'learning', 'map', 'quiz'] as const;
  const currentIdx = tabOrder.indexOf(activeTab);

  const handlePrevTab = () => {
    if (currentIdx > 0) {
      setActiveTab(tabOrder[currentIdx - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextTab = () => {
    if (currentIdx < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIdx + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleQuizAnswer = (optionIdx: number) => {
    if (isQuizSubmitted) return;
    setSelectedQuizOption(optionIdx);
  };

  const handleQuizSubmit = () => {
    if (selectedQuizOption === null) return;
    
    const currentCase = toiletingCases[quizIndex];
    if (selectedQuizOption === currentCase.correctAnswerIndex) {
      setQuizScore(prev => prev + 1);
    }
    setIsQuizSubmitted(true);
  };

  const handleQuizNext = () => {
    setSelectedQuizOption(null);
    setIsQuizSubmitted(false);
    if (quizIndex < toiletingCases.length - 1) {
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
    setCheckedSafety({});
    setQuizSafetyApproved(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col w-full max-w-full overflow-x-hidden min-w-0 text-lg">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="font-extrabold text-slate-800 tracking-tight text-4xl">
          배설돌봄로봇
        </h1>
      </div>

      {/* Tabs Navigation */}
      <CareTabs 
        tabs={tabs} 
        activeTab={activeTab} 
        onChange={setActiveTab} 
        isSimple={true} 
      />

      {/* Tab Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex-1">
          {/* Tab 1: 돌봄로봇 알아보기 */}
          {activeTab === 'devices' && (
            <div className="space-y-8 animate-fade-in text-left">
              {/* Definition Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-800 flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-indigo-600 rounded-full inline-block" />
                  배설돌봄이란?
                </h2>
                <p className="text-base sm:text-lg text-slate-650 leading-relaxed font-semibold">
                  소변과 대변의 처리를 스스로 하기 어려울 때, 화장실 이동, 옷 입고 벗기, 용변 후 뒤처리 및 세정 등을 안전하고 위생적으로 돕는 돌봄입니다.
                </p>
              </div>

              <RobotStorySection
                scenariosTitle="이런 상황에서 필요해요"
                scenarios={toiletingScenariosData}
                helpersTitle="돌봄로봇이 이렇게 도와줘요"
                helpers={toiletingHelpers}
                robots={toiletingStoryRobots}
                safetyTips={toiletingSafetyTips}
                onCTAChangeTab={() => {
                  setActiveTab('learning');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          )}

          {/* Tab 2: 나에게 맞는 돌봄로봇 찾기 */}
          {activeTab === 'learning' && (
            <div className="space-y-6 animate-fade-in flex-1 flex flex-col">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm text-left">
                <h2 className="font-bold text-slate-800 mb-2 text-2xl sm:text-3xl">
                  나에게 맞는 돌봄로봇 찾기
                </h2>
                <p className="text-slate-500 leading-relaxed font-semibold text-base sm:text-lg">
                  몇 가지 간단한 질문에 차근차근 답하시면, 환자분에게 가장 안전한 배설 보조 장치 유형을 찾아드립니다.
                </p>
              </div>

              <div className="w-full">
                <AlgorithmRunner
                  algorithm={toiletingCareAlgorithm}
                  mode="learning"
                  uiMode="simple"
                  onPathChange={(path) => setLearningPath(path)}
                  onLearnMore={handleLearnMore}
                />
              </div>
            </div>
          )}

          {/* Tab 3: 알고리즘 지도 */}
          {activeTab === 'map' && (
            <div className="space-y-6 animate-fade-in flex-1 flex flex-col">
              <AlgorithmRunner
                algorithm={toiletingCareAlgorithm}
                mode="learning"
                uiMode="map"
              />
            </div>
          )}

          {/* Tab 4: 연습해보기 */}
          {activeTab === 'quiz' && (
            <div className="max-w-3xl mx-auto w-full py-4 animate-fade-in">
              {!quizSafetyApproved ? (
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-md space-y-6">
                  <div className="space-y-2 text-left">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 flex items-center gap-2">
                      <span className="w-2.5 h-6 bg-emerald-500 rounded-full inline-block" />
                      안전한 배설돌봄을 위한 5대 약속
                    </h2>
                    <p className="text-sm text-slate-500 leading-relaxed font-semibold">
                      대상자와 보호자 모두의 안전을 지키는 가장 확실한 습관입니다. 아래 수칙을 터치하여 모두 확인해 주세요.
                    </p>
                  </div>

                  <CareSafetyCard
                    items={toiletingSafetyItems}
                    checkedItems={checkedSafety}
                    onToggle={handleToggleSafety}
                  />

                  <div className="flex justify-end pt-6 border-t border-slate-200">
                    <button
                      onClick={() => setQuizSafetyApproved(true)}
                      disabled={Object.keys(checkedSafety).length < toiletingSafetyItems.length || !Object.values(checkedSafety).every(Boolean)}
                      className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-extrabold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <span>확인 완료 및 연습 시작하기</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : !quizFinished ? (
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md overflow-hidden text-left">
                  <div className="bg-slate-100 h-1.5 w-full">
                    <div 
                      className="bg-primary h-full transition-all duration-300"
                      style={{ width: `${((quizIndex) / toiletingCases.length) * 100}%` }}
                    />
                  </div>

                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                      <span className="text-xs font-bold text-slate-400">
                        사례 테스트 Q. 0{quizIndex + 1} / 0{toiletingCases.length}
                      </span>
                      <span className="text-sm font-bold text-primary bg-primary-light px-2.5 py-0.5 rounded-full">
                        맞춘 개수: {quizScore}
                      </span>
                    </div>

                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/50 space-y-2">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">사례 (Scenario)</span>
                      <p className="text-slate-700 leading-relaxed font-semibold text-base sm:text-lg">
                        {toiletingCases[quizIndex].scenario}
                      </p>
                    </div>

                    <h3 className="font-bold text-slate-800 text-xl sm:text-2xl">
                      {toiletingCases[quizIndex].question}
                    </h3>

                    <div className="space-y-3">
                      {toiletingCases[quizIndex].options.map((opt, idx) => {
                        let btnStyle = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 bg-white';
                        
                        if (selectedQuizOption === idx) {
                          btnStyle = 'border-primary bg-primary/5 text-primary font-bold';
                        }

                        if (isQuizSubmitted) {
                          if (idx === toiletingCases[quizIndex].correctAnswerIndex) {
                            btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold';
                          } else if (selectedQuizOption === idx) {
                            btnStyle = 'border-red-400 bg-red-50 text-red-800';
                          } else {
                            btnStyle = 'border-slate-200 text-slate-400 opacity-60 bg-white';
                          }
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleQuizAnswer(idx)}
                            disabled={isQuizSubmitted}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between font-bold cursor-pointer text-base sm:text-lg ${btnStyle}`}
                          >
                            <span className="text-sm sm:text-base">{opt}</span>
                            <ChevronRight className="w-4 h-4 shrink-0" />
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-100">
                      {!isQuizSubmitted ? (
                        <button
                          onClick={handleQuizSubmit}
                          disabled={selectedQuizOption === null}
                          className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer"
                        >
                          답안 제출하기
                        </button>
                      ) : (
                        <button
                          onClick={handleQuizNext}
                          className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold transition-all flex items-center gap-2 shadow-md cursor-pointer"
                        >
                          <span>{quizIndex < toiletingCases.length - 1 ? '다음 문제' : '퀴즈 완료'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {isQuizSubmitted && (
                      <div className="mt-6 p-5 rounded-xl border border-slate-200/80 bg-white shadow-sm space-y-2 animate-fade-in text-left">
                        <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2 font-semibold">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          <span>정답 해설 ({selectedQuizOption === toiletingCases[quizIndex].correctAnswerIndex ? '정답입니다!' : '오답입니다.'})</span>
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                          {toiletingCases[quizIndex].explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-md text-center space-y-6 animate-fade-in">
                  <div className="bg-primary/5 text-primary p-4 rounded-full w-fit mx-auto">
                    <TrophyIcon className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">사례 퀴즈 종료</h2>
                    <p className="text-sm text-slate-500 font-semibold">
                      사례 해결 퀴즈를 모두 마쳤습니다.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 max-w-sm mx-auto">
                    <span className="text-xs font-bold text-slate-400 block uppercase">최종 평가 점수</span>
                    <span className="text-4xl sm:text-5xl font-black text-primary mt-2 block">
                      {quizScore} / {toiletingCases.length}
                    </span>
                  </div>

                  <div className="flex justify-center gap-4 pt-4">
                    <button
                      onClick={resetQuiz}
                      className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold shadow-md transition-all cursor-pointer"
                    >
                      퀴즈 다시 풀기
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tab Left/Right Navigation Arrows */}
        <div className="flex justify-between items-center border-t border-slate-200 pt-8 mt-12 w-full">
          {currentIdx > 0 ? (
            <button
              onClick={handlePrevTab}
              className="px-4 sm:px-5 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1 sm:gap-1.5 transition-all shadow-sm max-w-[48%] truncate cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 shrink-0" />
              <span className="truncate">이전: {tabs.find(t => t.id === tabOrder[currentIdx - 1])?.name}</span>
            </button>
          ) : <div />}

          {currentIdx < tabOrder.length - 1 ? (
            <button
              onClick={handleNextTab}
              className="px-4 sm:px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm flex items-center gap-1 sm:gap-1.5 transition-all shadow-sm max-w-[48%] truncate cursor-pointer"
            >
              <span className="truncate">다음: {tabs.find(t => t.id === tabOrder[currentIdx + 1])?.name}</span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </button>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}

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
