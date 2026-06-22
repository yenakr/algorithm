'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Check, Info, HelpCircle, Eye, X } from 'lucide-react';
import Image from 'next/image';
import AlgorithmFlowchart from './AlgorithmFlowchart';

interface Option {
  id: string;
  text: string;
  score?: number;
  value: string;
}

interface Question {
  id: string;
  title: string;
  description?: string;
  type: 'single' | 'multi';
  options: Option[];
  nextQuestionId?: string | ((answers: Record<string, any>) => string | null);
  resultId?: string | ((answers: Record<string, any>) => string | null);
}

interface Result {
  id: string;
  title: string;
  description: string;
  recommendation: string;
  reason: string;
}

interface Algorithm {
  id: string;
  title: string;
  startQuestionId: string;
  questions: Record<string, Question>;
  results: Record<string, Result>;
}

interface AlgorithmRunnerProps {
  algorithm: Algorithm;
  mode: 'learning';
  onPathChange?: (path: string[]) => void;
}

// Learning guides dictionary to explain the meaning/criteria of each step
const learningGuides: Record<string, { title: string; content: string; details: { key: string; val: string }[] }> = {
  q1: {
    title: '자리이동 기능평가 기준',
    content: '침대, 의자, 휠체어 등으로 자리를 옮길 때 환자의 자립 수준을 평가합니다. 어려움 지표가 중간 정도 이상(2점 이상)일 경우 로봇 이송 지원이 요구됩니다.',
    details: [
      { key: '0점 (문제 없음)', val: '아무런 보조 없이 안전하게 이동 가능' },
      { key: '1점 (가벼운 어려움)', val: '가벼운 피로가 있으나 자력 수행 가능' },
      { key: '2점 (중간 정도)', val: '안전을 위해 부축이나 로봇 기립 보조 필요' },
      { key: '3점 (심한 어려움)', val: '상당 부분의 물리적 부축 및 지지가 필요함' },
      { key: '4점 (극심한 어려움)', val: '환자의 협조 불가로 기계식 리프트 필수' }
    ]
  },
  q2: {
    title: '하지 근력 및 체중 지지',
    content: '다리 근력이 스스로 체중을 지지하고 서있을 수 있는지 판단합니다. 이에 따라 리프트(슬링 매달기)형과 기립보조(일으켜 세우기)형이 구분됩니다.',
    details: [
      { key: '예, 체중을 지탱하기 어렵다', val: '다리 힘으로 지탱이 불가하여 안전하게 전신을 감싸 띄우는 전신슬링 리프트 적합' },
      { key: '아니오, 체중을 지탱할 수 있다', val: '상체 힘이 남아있고 기립 협조가 가능하여 일으켜 세우는 기립보조리프트/스탠딩리프트 적합' }
    ]
  },
  q3: {
    title: '환경 평가와 설치 종류',
    content: '천장이나 벽의 구조, 방의 크기에 따라 고정형 또는 이동형 리프트를 선별합니다.',
    details: [
      { key: '천장 설치 가능', val: '천장 옹벽 보강 후 레일 모터 장착 (바닥 차지 없음)' },
      { key: '벽면 설치 가능', val: '천장 공사가 불가할 때 튼튼한 옆 벽에 회전 암 장착' },
      { key: '이동식 리프트', val: '고정 공사 없이 바퀴 달린 프레임으로 다목적 이송' },
      { key: '이동식 겐트리', val: '천장 손상 없이 침대 주위에 독립 지지대 조립' }
    ]
  },
  q3_1: {
    title: '우선순위 가치 선별',
    content: '주거 환경상 여러 로봇 설치가 가능한 경우 사용 편의성, 설치비용, 공사 최소화 중 선호하는 가치를 판별합니다.',
    details: [
      { key: '사용 편의성', val: '가장 편안하고 바닥 차지가 없는 천장 고정식 추천' },
      { key: '설치비용 절감', val: '공사 효율이 좋은 벽면 고정식 리프트 추천' },
      { key: '공사 최소화', val: '설치 훼손이 없는 이동식/겐트리 조립식 추천' }
    ]
  },
  q3_2: {
    title: '독립 지지대 프레임 조립 여부',
    content: '천장 타공이나 벽면 훼손 공사가 어려운 상황에서 침대 주변에 지지대 구조물을 독립적으로 배치할 공간과 여건이 되는지 확인합니다.',
    details: [
      { key: '가능하다', val: '수직 이동 안전성이 좋은 독립 겐트리 리프트 추천' },
      { key: '어렵다', val: '프레임 배치 없이 바퀴로만 끄는 순수 이동식 리프트 추천' }
    ]
  },
  q4: {
    title: '상체 조절 능력 평가',
    content: '다리 지지는 힘드나 상체 잔존 근력이 있어 등받이 벨트를 파지하고 로봇과 협조하여 상체를 버틸 수 있는지 확인합니다.',
    details: [
      { key: '가능하다', val: '스스로 잡고 일어서는 속도를 돕는 전동형 기립보조리프트 추천' },
      { key: '어렵다', val: '더 많은 신체 고정과 보조가 이루어지는 비전동형 기립보조기기 추천' }
    ]
  },
  // Toileting Care
  toileting_q1: {
    title: '배설 인지 조절 능력',
    content: '스스로 요의와 변의를 지각하고 배뇨/배변 타이밍을 컨트롤할 수 있는지 평가합니다. 인지 장애가 있을 경우 시간 맞춤형 알림 프로그램 및 센서 개입이 요구됩니다.',
    details: [
      { key: '0~1점 (양호)', val: '배설 의사를 스스로 지각하고 제어 가능' },
      { key: '2~4점 (장해)', val: '배설 시기를 모르거나 실금이 있어 주기적 돌봄 필요' }
    ]
  },
  toileting_q2_a: {
    title: '물리적 화장실 이동 능력',
    content: '침실에서 화장실 변기 앞까지 자력으로 걸어가 안전하게 착석할 수 있는지 판단합니다. 보행 장해가 클 경우 침상 변기 또는 이동식 휠체어 보조가 연동됩니다.',
    details: [
      { key: '0~1점 (양호)', val: '부축 없이 화장실로 스스로 안전하게 이동' },
      { key: '2~4점 (장해)', val: '낙상 위험으로 화장실 이동이 불가하거나 부축 필수' }
    ]
  },
  toileting_q2_b: {
    title: '물리적 화장실 이동 능력',
    content: '배설 신호 지각은 어려우나 신체적으로 화장실까지 갈 수 있는지 평가합니다. 이동이 가능하다면 시간 맞춤 이동을, 불가능하다면 침상 자동배설로봇을 선택합니다.',
    details: [
      { key: '0~1점 (양호)', val: '유도를 통해 화장실 변기까지 이동 가능' },
      { key: '2~4점 (장해)', val: '침상에서 와상 상태로 기계식 배설 관리가 요구됨' }
    ]
  },
  toileting_q3_a1: {
    title: '용변 후 청결 마무리',
    content: '용변을 마친 후 스스로 옷을 입고 항문 주변을 깨끗하게 닦아내 뒤처리를 끝마칠 수 있는지 측정합니다.',
    details: [
      { key: '0~1점 (양호)', val: '자력 위생 뒤처리 완수 가능' },
      { key: '2~4점 (장해)', val: '비데 세정 시스템이나 세정 보조 장치 필수' }
    ]
  },
  toileting_q3_a2: {
    title: '용변 후 청결 마무리',
    content: '화장실 이동은 불가해 침상 변기를 이용하는 상황에서 엉덩이 청결 닦기를 환자 스스로 수행할 수 있는지 평가합니다.',
    details: [
      { key: '0~1점 (양호)', val: '침상 변기 이용 후 스스로 위생 뒤처리 가능' },
      { key: '2~4점 (장해)', val: '침상 변기 및 보호자의 뒤처리 부축 연동' }
    ]
  },
  toileting_q3_b1: {
    title: '용변 후 청결 마무리',
    content: '인지 지각은 낮고 화장실 이동은 가능할 때 스스로 항문을 세정하고 뒤처리를 수행할 수 있는지 확인합니다.',
    details: [
      { key: '0~1점 (양호)', val: '유도를 통한 시간 맞춰 화장실 이용 후 스스로 뒤처리' },
      { key: '2~4점 (장해)', val: '시간 맞춰 화장실 유도 및 비데 세정 자동화 구축' }
    ]
  },
  toileting_q3_b2: {
    title: '용변 후 청결 마무리',
    content: '인지도 낮고 이동도 불가능해 누워 지내는 와상 상태에서 배설 후 엉덩이 세정 조치를 기계적으로 자동화할 수 있는지 결정합니다.',
    details: [
      { key: '0~1점 (양호)', val: '누운 채 탈착형 자동배설로봇 간헐적 이용' },
      { key: '2~4점 (장해)', val: '24시간 스마트 기저귀 흡인형 배설로봇 지속 가동' }
    ]
  }
};

// Resolve device images based on Result ID
function getDeviceImage(resultId: string): string {
  if (resultId.startsWith('T-')) {
    if (resultId === 'T-B') return '/images/transfer_board.png';
    if (resultId === 'T-C') return '/images/standing_aid.png';
    if (resultId === 'T-D') return '/images/manual_standing_aid.png';
    if (resultId === 'T-E') return '/images/transfer_lift.png';
    if (resultId === 'T-F') return '/images/wall_lift.png';
    if (resultId === 'T-G') return '/images/mobile_sling_lift.png';
    if (resultId === 'T-H') return '/images/gantry_lift.png';
    return '';
  } else {
    if (resultId === 'B-B') return '/images/hygiene_bidet.png';
    if (resultId === 'B-C' || resultId === 'B-D') return '/images/toilet_lift.png';
    if (resultId === 'B-G') return '/images/excretion_robot.png';
    if (resultId === 'B-H') return '/images/smart_diaper_robot.png';
    return '';
  }
}

export default function AlgorithmRunner({ algorithm, mode, onPathChange }: AlgorithmRunnerProps) {
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(algorithm.startQuestionId);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [history, setHistory] = useState<string[]>([]);
  const [resultId, setResultId] = useState<string | null>(null);

  // Modal control
  const [isFlowchartModalOpen, setIsFlowchartModalOpen] = useState(false);
  const [flowchartMode, setFlowchartMode] = useState<'active' | 'full'>('full');
  const [tempMultiSelect, setTempMultiSelect] = useState<string[]>([]);

  // Selected step for the explanation panel
  const [selectedGuideQuestionId, setSelectedGuideQuestionId] = useState<string | null>(algorithm.startQuestionId);

  const currentQuestion = currentQuestionId ? algorithm.questions[currentQuestionId] : null;

  // Sync selected guide step with active question
  useEffect(() => {
    if (currentQuestionId) {
      setSelectedGuideQuestionId(currentQuestionId);
    }
  }, [currentQuestionId]);

  const getGuideKey = (qId: string | null) => {
    if (!qId) return '';
    return algorithm.id === 'toileting' && ['q1', 'q2_a', 'q2_b', 'q3_a1', 'q3_a2', 'q3_b1', 'q3_b2'].includes(qId)
      ? `toileting_${qId}`
      : qId;
  };

  const selectedGuide = selectedGuideQuestionId ? learningGuides[getGuideKey(selectedGuideQuestionId)] : null;

  const handleSingleSelect = (optionValue: string) => {
    const updatedAnswers = { ...answers, [currentQuestionId!]: optionValue };
    setAnswers(updatedAnswers);

    const newHistory = [...history, currentQuestionId!];
    setHistory(newHistory);

    if (onPathChange) {
      onPathChange([...newHistory, optionValue]);
    }

    resolveNextStep(currentQuestionId!, updatedAnswers, newHistory);
  };

  const handleMultiToggle = (optionValue: string) => {
    if (tempMultiSelect.includes(optionValue)) {
      setTempMultiSelect(tempMultiSelect.filter((v) => v !== optionValue));
    } else {
      setTempMultiSelect([...tempMultiSelect, optionValue]);
    }
  };

  const handleMultiSubmit = () => {
    if (tempMultiSelect.length === 0) {
      alert('최소 하나 이상의 옵션을 선택해주세요.');
      return;
    }

    const updatedAnswers = { ...answers, [currentQuestionId!]: tempMultiSelect };
    setAnswers(updatedAnswers);

    const newHistory = [...history, currentQuestionId!];
    setHistory(newHistory);

    if (onPathChange) {
      onPathChange([...newHistory, tempMultiSelect.join(',')]);
    }

    resolveNextStep(currentQuestionId!, updatedAnswers, newHistory);
  };

  const resolveNextStep = (qId: string, currentAnswers: Record<string, any>, currentHistory: string[]) => {
    const question = algorithm.questions[qId];
    let nextId: string | null = null;
    let resId: string | null = null;

    if (question.nextQuestionId) {
      if (typeof question.nextQuestionId === 'function') {
        nextId = question.nextQuestionId(currentAnswers);
      } else {
        nextId = question.nextQuestionId;
      }
    }

    if (question.resultId) {
      if (typeof question.resultId === 'function') {
        resId = question.resultId(currentAnswers);
      } else {
        resId = question.resultId;
      }
    }

    if (resId) {
      setResultId(resId);
      setCurrentQuestionId(null);
      // Keep selected guide on the last question
      setSelectedGuideQuestionId(qId);
    } else if (nextId) {
      setCurrentQuestionId(nextId);
      const nextQuestion = algorithm.questions[nextId];
      if (nextQuestion && nextQuestion.type === 'multi') {
        setTempMultiSelect(currentAnswers[nextId] || []);
      }
    } else {
      alert('알고리즘 분기 경로를 탐색할 수 없습니다.');
    }
  };

  const handleBack = () => {
    if (history.length === 0) return;

    const newHistory = [...history];
    const prevQuestionId = newHistory.pop()!;
    
    setHistory(newHistory);
    setResultId(null);
    setCurrentQuestionId(prevQuestionId);

    const prevQuestion = algorithm.questions[prevQuestionId];
    if (prevQuestion && prevQuestion.type === 'multi') {
      setTempMultiSelect(answers[prevQuestionId] || []);
    }

    if (onPathChange) {
      onPathChange(newHistory);
    }
  };

  const handleReset = () => {
    setCurrentQuestionId(algorithm.startQuestionId);
    setAnswers({});
    setHistory([]);
    setResultId(null);
    setTempMultiSelect([]);
    setSelectedGuideQuestionId(algorithm.startQuestionId);
    if (onPathChange) {
      onPathChange([]);
    }
  };

  const openFlowchart = (modeType: 'active' | 'full') => {
    setFlowchartMode(modeType);
    setIsFlowchartModalOpen(true);
  };

  // Generate interactive step list
  interface StepListItem {
    id: string;
    stepNum: number;
    title: string;
    status: 'completed' | 'active';
    answerText: string;
  }

  const stepsList: StepListItem[] = [];
  history.forEach((qId, idx) => {
    const q = algorithm.questions[qId];
    if (!q) return;
    const ans = answers[qId];
    let answerText = '';
    if (q.type === 'single') {
      const option = q.options.find((o) => o.value === ans);
      answerText = option ? option.text : '';
    } else if (q.type === 'multi' && Array.isArray(ans)) {
      answerText = ans
        .map((v) => q.options.find((o) => o.value === v)?.text || '')
        .filter(Boolean)
        .join(', ');
    }

    stepsList.push({
      id: qId,
      stepNum: idx + 1,
      title: q.title,
      status: 'completed',
      answerText: answerText.split(':')[0].trim(),
    });
  });

  if (!resultId && currentQuestion) {
    stepsList.push({
      id: currentQuestion.id,
      stepNum: history.length + 1,
      title: currentQuestion.title,
      status: 'active',
      answerText: '',
    });
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Top Header Controls */}
      <div className="flex flex-wrap justify-between items-center bg-slate-50 border border-slate-200/80 rounded-xl px-5 py-3 gap-3">
        <span className="text-xs sm:text-sm font-bold text-slate-500">
          돌봄 상황 자가평가 진행
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => openFlowchart('active')}
            disabled={history.length === 0}
            className="text-xs font-bold text-slate-600 hover:text-primary transition-colors flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm disabled:opacity-50 disabled:pointer-events-none"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>현재 경로 보기</span>
          </button>
          <button
            onClick={() => openFlowchart('full')}
            className="text-xs font-bold text-slate-600 hover:text-primary transition-colors flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>전체 알고리즘 보기</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Interactive Questionnaire or Result Screen */}
        <div className="lg:col-span-7 w-full">
          {!resultId && currentQuestion ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 transition-all duration-300">
              {/* Step indicator */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-primary uppercase bg-primary-light px-3 py-1.5 rounded-full">
                  STEP {history.length + 1}
                </span>
              </div>

              {/* Natural language title */}
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 leading-tight">
                {currentQuestion.title}
              </h3>
              {currentQuestion.description && (
                <p className="text-sm sm:text-base text-slate-500 mb-8 whitespace-pre-line font-medium">
                  {currentQuestion.description}
                </p>
              )}

              {/* Render Options */}
              {currentQuestion.type === 'single' ? (
                <div className="space-y-4 mb-8">
                  {currentQuestion.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSingleSelect(opt.value)}
                      className="w-full text-left p-5 rounded-xl border-2 border-slate-100 hover:border-primary hover:bg-primary/5 transition-all duration-200 flex justify-between items-center group font-bold text-slate-700 text-sm sm:text-base"
                    >
                      <span>{opt.text}</span>
                      <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-white scale-0 group-hover:scale-100 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 mb-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentQuestion.options.map((opt) => {
                      const isChecked = tempMultiSelect.includes(opt.value);
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleMultiToggle(opt.value)}
                          className={`text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 font-bold text-xs sm:text-sm ${
                            isChecked
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-slate-100 bg-white text-slate-700 hover:border-slate-200'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                            isChecked ? 'border-primary bg-primary text-white' : 'border-slate-300 bg-white'
                          }`}>
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="leading-snug">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handleMultiSubmit}
                      disabled={tempMultiSelect.length === 0}
                      className="px-6 py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary-dark transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>다음 단계</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Footer Control Buttons */}
              <div className="flex justify-between items-center border-t border-slate-100 pt-6 mt-8">
                <button
                  onClick={handleBack}
                  disabled={history.length === 0}
                  className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>이전 단계</span>
                </button>

                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-sm font-bold text-red-400 hover:text-red-600 flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>다시하기</span>
                </button>
              </div>
            </div>
          ) : resultId ? (
            <div className="bg-white rounded-2xl border-2 border-primary/20 shadow-lg overflow-hidden transition-all duration-300">
              <div className="bg-primary px-6 py-5 text-white flex items-center gap-3">
                <h3 className="text-lg sm:text-xl font-bold">자가 평가 매칭 결과</h3>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                {/* Recommended result in very large typography */}
                <div className="text-center py-6 border-b border-slate-100 space-y-3">
                  <span className="text-xs font-black text-primary uppercase tracking-wider bg-primary-light px-3.5 py-1.5 rounded-full">
                    최종 추천 결과
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-black text-slate-800 pt-2 tracking-tight">
                    {algorithm.results[resultId]?.title}
                  </h2>
                </div>

                {/* Recommended Details */}
                <div className="space-y-6">
                  {/* Visual Section */}
                  {getDeviceImage(resultId) ? (
                    <div className="mx-auto relative w-full max-w-[240px] aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-4">
                      <Image
                        src={getDeviceImage(resultId)}
                        alt={algorithm.results[resultId]?.title}
                        fill
                        className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                        priority
                      />
                    </div>
                  ) : (
                    <div className="mx-auto w-full max-w-[240px] aspect-square rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                      <span className="text-slate-300 text-sm">이미지 준비 중</span>
                    </div>
                  )}

                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-sm sm:text-base text-slate-600 font-bold leading-relaxed">
                      {algorithm.results[resultId]?.description}
                    </p>
                  </div>

                  {/* Why this result? (Under recommended result, with large bold title) */}
                  <div className="space-y-3 border-t border-slate-100 pt-5">
                    <h4 className="text-lg sm:text-xl font-black text-slate-800 flex items-center gap-1.5">
                      <HelpCircle className="w-5.5 h-5.5 text-primary shrink-0" />
                      왜 이런 결과가 나왔나요?
                    </h4>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-semibold">
                      {algorithm.results[resultId]?.reason}
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      추천 조치 및 가이드라인
                    </h5>
                    <p className="text-sm text-slate-700 bg-sky-50/50 p-4 rounded-xl border border-sky-100 leading-relaxed font-bold">
                      {algorithm.results[resultId]?.recommendation}
                    </p>
                  </div>
                </div>

                {/* Reset Buttons */}
                <div className="flex justify-between items-center border-t border-slate-100 pt-6 mt-8">
                  <button
                    onClick={handleBack}
                    className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-slate-700 flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>이전 질문으로 돌아가기</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>새로운 진단 시작하기</span>
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Right Column: Real-time Selection Path & Learning Explanation Panel */}
        <div className="lg:col-span-5 w-full space-y-6 lg:sticky lg:top-6">
          
          {/* Real-time selection path with clickable steps */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
              나의 진행 경로 및 학습
            </h4>
            {stepsList.length === 0 ? (
              <p className="text-xs text-slate-400 font-medium">자가평가를 시작하면 응답 경로가 기록됩니다.</p>
            ) : (
              <div className="space-y-3">
                {stepsList.map((step) => {
                  const isSelected = selectedGuideQuestionId === step.id;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setSelectedGuideQuestionId(step.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex flex-col gap-1.5 ${
                        isSelected
                          ? 'border-primary bg-primary/5 ring-1 ring-primary/20 shadow-sm'
                          : 'border-slate-100 bg-white hover:border-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className={`text-[10px] font-bold ${isSelected ? 'text-primary' : 'text-slate-400'}`}>
                          STEP {step.stepNum}
                        </span>
                        {step.status === 'active' ? (
                          <span className="text-[9px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200 shrink-0">
                            ⚡ 진행 중
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                            ✓ 선택 완료
                          </span>
                        )}
                      </div>
                      <h5 className="font-bold text-slate-800 text-xs sm:text-sm leading-snug">
                        {step.title}
                      </h5>
                      {step.status === 'completed' && (
                        <p className="text-[11px] text-slate-500 font-semibold mt-0.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          선택: <span className="text-slate-800 font-extrabold">{step.answerText}</span>
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Explanation Panel (Linked to selection path click) */}
          {selectedGuide ? (
            <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-5 shadow-sm space-y-4 animate-fade-in">
              <div className="flex items-center gap-1.5 text-primary">
                <Info className="w-4 h-4 shrink-0" />
                <h4 className="font-extrabold text-sm sm:text-base leading-tight">
                  {selectedGuide.title}
                </h4>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                {selectedGuide.content}
              </p>

              <div className="border-t border-sky-100/70 pt-3 space-y-2">
                {selectedGuide.details.map((detail, idx) => (
                  <div key={idx} className="text-[11px] sm:text-xs leading-relaxed font-medium">
                    <strong className="text-slate-700 block mb-0.5">{detail.key}</strong>
                    <span className="text-slate-500 block">{detail.val}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-center">
              <p className="text-xs text-slate-400 font-semibold">알고리즘 단계를 선택하시면 임상 평가 설명이 여기에 표시됩니다.</p>
            </div>
          )}
        </div>

      </div>

      {/* Decision Flowchart Modal Overlay */}
      {isFlowchartModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scale-in">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3 shrink-0">
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm sm:text-base">의사결정 순서도</h3>
              </div>
              
              {/* Tabs inside modal to switch views */}
              <div className="flex gap-1.5 bg-slate-800 p-1 rounded-lg self-start sm:self-auto">
                <button
                  onClick={() => setFlowchartMode('active')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                    flowchartMode === 'active' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  현재 경로만 보기
                </button>
                <button
                  onClick={() => setFlowchartMode('full')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                    flowchartMode === 'full' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  전체 알고리즘 보기
                </button>
              </div>

              <button 
                onClick={() => setIsFlowchartModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1 absolute top-4 right-4 sm:relative sm:top-auto sm:right-auto"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 bg-slate-100">
              <AlgorithmFlowchart 
                algorithmId={algorithm.id as any} 
                activePath={history} 
                highlightOnlyActive={flowchartMode === 'active'}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
