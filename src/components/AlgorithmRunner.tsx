'use client';

import { useState, useEffect, useRef } from 'react';
import {
  cleanInternalCodes,
  cleanEdgeLabel,
  getCustomEdgeLabel,
  getResultIcon,
  getRobotTypeForResult,
  learningGuides,
  optionDetails,
  resultDetails,
  simpleIconMap,
  toiletingEdges,
  toiletingNodes,
  transferEdges,
  transferNodes,
  feedingEdges,
  feedingNodes,
  getShortOptionText,
  Option,
  Question,
  Result,
  Algorithm,
  AlgorithmRunnerProps,
  getDisplayText,
  criteriaTables
} from './algorithmRunnerData';

import {
  RotateCcw, Check, Info, HelpCircle, AlertTriangle, ThumbsUp, ArrowRight,
  ChevronRight, ChevronLeft, ChevronDown, Move, Accessibility, Users, Bot, Shield, Trophy, GitMerge, Maximize2, Bed, Heart
} from 'lucide-react';
import Image from 'next/image';
import { Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import SimpleResultCard from './SimpleResultCard';

const renderCriteriaTable = (algorithmId: string, qId: string) => {
  const table = criteriaTables[algorithmId];
  if (!table) return null;

  const bgClasses = {
    blue: 'bg-blue-50/50 border-blue-200/80',
    emerald: 'bg-emerald-50/50 border-emerald-200/80',
    indigo: 'bg-indigo-50/50 border-indigo-200/80',
  };

  const titleClasses = {
    blue: 'text-blue-900 border-blue-100',
    emerald: 'text-emerald-900 border-emerald-100',
    indigo: 'text-indigo-900 border-indigo-100',
  };

  const iconClasses = {
    blue: 'text-blue-600',
    emerald: 'text-emerald-600',
    indigo: 'text-indigo-600',
  };

  const sectionTitleClasses = {
    blue: 'text-blue-800',
    emerald: 'text-emerald-800',
    indigo: 'text-indigo-800',
  };

  const badgeClasses = {
    blue: 'text-blue-900 bg-blue-100/70',
    emerald: 'text-emerald-900 bg-emerald-100/70',
    indigo: 'text-indigo-900 bg-indigo-100/70',
  };

  const theme = table.themeColor;

  return (
    <div className={`mt-4 p-5 rounded-2xl border text-base text-slate-700 space-y-4 text-left ${bgClasses[theme]}`}>
      <h5 className={`font-black flex items-center gap-1.5 text-lg sm:text-xl border-b pb-2.5 ${titleClasses[theme]}`}>
        <Info className={`w-5 h-5 shrink-0 ${iconClasses[theme]}`} />
        <span>{table.title}</span>
      </h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
        <div className="space-y-2">
          <span className={`font-extrabold text-base sm:text-[17px] block whitespace-pre-wrap ${sectionTitleClasses[theme]}`}>
            {table.leftSection.title}
          </span>
          {table.leftSection.type === 'list' ? (
            <ul className="list-decimal pl-5 font-bold space-y-1.5 text-sm sm:text-[15px] text-slate-655">
              {(table.leftSection.items as string[]).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : (
            <div className="space-y-2 font-bold text-sm sm:text-[15px] text-slate-655">
              {(table.leftSection.items as { label: string; text: string }[]).map((item, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <strong className={`font-extrabold px-1.5 py-0.5 rounded text-[13px] shrink-0 ${badgeClasses[theme]}`}>
                    {item.label}
                  </strong>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-2">
          <span className={`font-extrabold text-base sm:text-[17px] block whitespace-pre-wrap ${sectionTitleClasses[theme]}`}>
            {table.rightSection.title}
          </span>
          {table.rightSection.type === 'list' ? (
            <ul className="list-decimal pl-5 font-bold space-y-1.5 text-sm sm:text-[15px] text-slate-655">
              {(table.rightSection.items as string[]).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : (
            <div className="space-y-1.5 font-bold text-sm sm:text-[15px] text-slate-655">
              {(table.rightSection.items as { label: string; text: string }[]).map((item, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <strong className={`font-extrabold px-1.5 py-0.5 rounded text-[12px] shrink-0 ${badgeClasses[theme]}`}>
                    {item.label}
                  </strong>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function AlgorithmRunner({ algorithm, mode, uiMode = 'detail', onPathChange, onLearnMore }: AlgorithmRunnerProps) {
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(uiMode === 'map' ? null : algorithm.startQuestionId);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [history, setHistory] = useState<string[]>([]);
  const [resultId, setResultId] = useState<string | null>(null);

  // Guide panel tracking
  const [selectedGuideQuestionId, setSelectedGuideQuestionId] = useState<string | null>(algorithm.startQuestionId);
  const [tempMultiSelect, setTempMultiSelect] = useState<string[]>([]);
  const [tempSelectedSimple, setTempSelectedSimple] = useState<string | null>(null);

  useEffect(() => {
    if (uiMode === 'simple' && currentQuestionId) {
      setTempSelectedSimple(answers[currentQuestionId] || null);
    }
  }, [currentQuestionId, uiMode, answers]);




  // Detailed mode map collapsible & zoom states
  const [showDecisionMap, setShowDecisionMap] = useState(true);
  const [zoom, setZoom] = useState(0.75);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleFitView = () => {
    if (wrapperRef.current) {
      const wrapperWidth = wrapperRef.current.clientWidth;
      const logicalWidth = 1650;
      const fitScale = Math.max(0.5, Math.min(wrapperWidth / logicalWidth, 1.0));
      setZoom(fitScale);
    }
  };

  useEffect(() => {
    if (showDecisionMap) {
      setTimeout(handleFitView, 100);
    }
  }, [showDecisionMap]);

  const focusNode = (nodeId: string | null) => {
    if (!nodeId || !wrapperRef.current) return;
    const node = nodes[nodeId];
    if (!node) return;

    const nodeW = getNodeWidth(nodeId);
    const nodeH = getNodeHeight(nodeId);
    const wrapper = wrapperRef.current;
    
    const targetLeft = (node.x + nodeW / 2) * zoom - wrapper.clientWidth / 2;
    const targetTop = (node.y + nodeH / 2) * zoom - wrapper.clientHeight / 2;
    
    wrapper.scrollTo({
      left: Math.max(0, targetLeft),
      top: Math.max(0, targetTop),
      behavior: 'smooth'
    });
  };

  // Auto scroll map to focus on the active question or result node
  useEffect(() => {
    if (showDecisionMap) {
      const timer = setTimeout(() => {
        focusNode(currentQuestionId || resultId);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [currentQuestionId, resultId, zoom, showDecisionMap]);

  useEffect(() => {
    if (uiMode === 'map') {
      const timer = setTimeout(() => {
        focusNode(selectedGuideQuestionId);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedGuideQuestionId, zoom, uiMode]);

  useEffect(() => {
    if (uiMode === 'map' && !selectedGuideQuestionId) {
      setSelectedGuideQuestionId('q1');
    }
  }, [uiMode]);

  const getOptionValueLeadingTo = (qId: string, targetId: string) => {
    const question = algorithm.questions[qId];
    if (!question || !question.options) return null;
    
    for (const opt of question.options) {
      const tempAnswers = { ...answers, [qId]: opt.value };
      let nextId = null;
      if (question.nextQuestionId) {
        nextId = typeof question.nextQuestionId === 'function' 
          ? question.nextQuestionId(tempAnswers) 
          : question.nextQuestionId;
      }
      if (question.resultId) {
        const resId = typeof question.resultId === 'function' 
          ? question.resultId(tempAnswers) 
          : question.resultId;
        if (resId) nextId = resId;
      }
      if (nextId === targetId) {
        return opt.value;
      }
    }
    return question.options[0]?.value || null;
  };

  const isTransfer = algorithm.id === 'transfer';
  const isFeeding = algorithm.id === 'feeding';
  const nodes = isTransfer ? transferNodes : (isFeeding ? feedingNodes : toiletingNodes);
  const edges = isTransfer ? transferEdges : (isFeeding ? feedingEdges : toiletingEdges);

  const currentQuestion = currentQuestionId ? algorithm.questions[currentQuestionId] : null;

  // Keep selected guide synced with active question
  useEffect(() => {
    if (currentQuestionId) {
      setSelectedGuideQuestionId(currentQuestionId);
    }
  }, [currentQuestionId]);

  const getGuideKey = (qId: string | null) => {
    if (!qId) return '';
    if (algorithm.id === 'toileting' && ['q1', 'q2_a', 'q2_b', 'q3_a1', 'q3_a2', 'q3_b1', 'q3_b2'].includes(qId)) {
      return `toileting_${qId}`;
    }
    if (algorithm.id === 'feeding' && ['q1', 'q2_a', 'q2_b', 'q3_a'].includes(qId)) {
      return `feeding_${qId}`;
    }
    return qId;
  };

  const selectedGuide = selectedGuideQuestionId ? learningGuides[getGuideKey(selectedGuideQuestionId)] : null;

  const getMapResultInfo = (nodeId: string | null) => {
    if (!nodeId) return null;
    const robotType = getRobotTypeForResult(nodeId);
    if (robotType) {
      return {
        deviceName: robotType.name,
        image: robotType.image,
        intendedImage: robotType.intendedImage,
        whenToUse: robotType.situations.join(', '),
        situations: robotType.situations,
        pros: robotType.functions,
        precautions: robotType.cautions,
        environment: robotType.examples && robotType.examples.length > 0 ? `예시 기기: ${robotType.examples.join(', ')}` : '',
      };
    }
    const legacy = resultDetails[nodeId];
    if (legacy) {
      return {
        ...legacy,
        intendedImage: (legacy as any).intendedImage,
        situations: legacy.whenToUse.split(', '),
      };
    }
    return null;
  };
  const selectedResultInfo = selectedGuideQuestionId ? getMapResultInfo(selectedGuideQuestionId) : null;

  const handleSingleSelect = (qId: string, optionValue: string) => {
    if (answers[qId] === optionValue) {
      const currentAnswers = { ...answers };
      const idx = history.indexOf(qId);
      let currentHistory = [...history];
      if (idx !== -1) {
        currentHistory = history.slice(0, idx + 1);
        history.slice(idx).forEach(id => {
          delete currentAnswers[id];
        });
      } else {
        delete currentAnswers[qId];
      }
      setAnswers(currentAnswers);
      setHistory(currentHistory);
      setResultId(null);
      setCurrentQuestionId(qId);
      if (onPathChange) {
        onPathChange(currentHistory);
      }
      return;
    }

    let currentHistory = [...history];
    let currentAnswers = { ...answers };

    if (history.includes(qId)) {
      const idx = history.indexOf(qId);
      currentHistory = history.slice(0, idx);
      history.slice(idx).forEach(id => {
        delete currentAnswers[id];
      });
      setResultId(null);
    }

    const updatedAnswers = { ...currentAnswers, [qId]: optionValue };
    const newHistory = [...currentHistory, qId];

    setAnswers(updatedAnswers);
    setHistory(newHistory);

    if (onPathChange) {
      onPathChange([...newHistory, optionValue]);
    }

    resolveNextStep(qId, updatedAnswers, newHistory);
  };

  const handleMultiToggle = (optionValue: string) => {
    if (tempMultiSelect.includes(optionValue)) {
      setTempMultiSelect(tempMultiSelect.filter((v) => v !== optionValue));
    } else {
      setTempMultiSelect([...tempMultiSelect, optionValue]);
    }
  };

  const handleMultiSubmit = (qId: string) => {
    if (tempMultiSelect.length === 0) {
      alert('최소 하나 이상의 옵션을 선택해주세요.');
      return;
    }

    let currentHistory = [...history];
    let currentAnswers = { ...answers };

    if (history.includes(qId)) {
      const idx = history.indexOf(qId);
      currentHistory = history.slice(0, idx);
      history.slice(idx).forEach(id => {
        delete currentAnswers[id];
      });
      setResultId(null);
    }

    const updatedAnswers = { ...currentAnswers, [qId]: tempMultiSelect };
    const newHistory = [...currentHistory, qId];

    setAnswers(updatedAnswers);
    setHistory(newHistory);

    if (onPathChange) {
      onPathChange([...newHistory, tempMultiSelect.join(',')]);
    }

    resolveNextStep(qId, updatedAnswers, newHistory);
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
      setSelectedGuideQuestionId(resId);
    } else if (nextId) {
      setCurrentQuestionId(nextId);
      const nextQuestion = algorithm.questions[nextId];
      if (nextQuestion && nextQuestion.type === 'multi') {
        setTempMultiSelect(currentAnswers[nextId] || []);
      }
      if (uiMode === 'map') {
        setSelectedGuideQuestionId(nextId);
      }
    } else {
      alert('알고리즘 분기 경로를 매칭할 수 없습니다.');
    }
  };

  const handleNodeClick = (nodeId: string) => {
    setSelectedGuideQuestionId(nodeId);
    setIsHelpModalOpen(true);

    if (uiMode === 'map') {
      return;
    }

    if (nodes[nodeId]?.isResult) return;

    if (history.includes(nodeId)) {
      const idx = history.indexOf(nodeId);
      const newHistory = history.slice(0, idx);
      const newAnswers = { ...answers };

      history.slice(idx).forEach(qId => {
        delete newAnswers[qId];
      });

      setHistory(newHistory);
      setCurrentQuestionId(nodeId);
      setResultId(null);
      setAnswers(newAnswers);

      const clickedQuestion = algorithm.questions[nodeId];
      if (clickedQuestion && clickedQuestion.type === 'multi') {
        setTempMultiSelect(newAnswers[nodeId] || []);
      }

      if (onPathChange) {
        onPathChange(newHistory);
      }
    }
  };

  const handlePrevQuestion = () => {
    if (history.length === 0) return;
    const lastQuestionId = history[history.length - 1];
    const newHistory = history.slice(0, -1);
    const newAnswers = { ...answers };
    delete newAnswers[lastQuestionId];

    setAnswers(newAnswers);
    setHistory(newHistory);
    setResultId(null);
    setCurrentQuestionId(lastQuestionId);
    
    const prevQuestion = algorithm.questions[lastQuestionId];
    if (prevQuestion && prevQuestion.type === 'multi') {
      setTempMultiSelect(newAnswers[lastQuestionId] || []);
    } else {
      setTempMultiSelect([]);
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

  // Node dimensions config
  const getNodeWidth = (id: string) => {
    const node = nodes[id];
    if ((node as any)?.isLabel) return uiMode === 'simple' ? 200 : 180;
    if (node?.isResult) {
      const labelLen = (node.label || '').length;
      if (labelLen > 30) return uiMode === 'simple' ? 240 : 210;
      return uiMode === 'simple' ? 210 : 190;
    }
    const outgoingCount = edges.filter(e => e.from === id && e.label).length;
    const baseWidth = uiMode === 'simple' ? 260 : 220;
    if (outgoingCount >= 5) return baseWidth + 50;
    if (outgoingCount === 4) return baseWidth + 30;
    if (outgoingCount === 3) return baseWidth + 10;
    return baseWidth;
  };
  const getNodeHeight = (id: string) => {
    const node = nodes[id];
    if ((node as any)?.isLabel) return uiMode === 'simple' ? 56 : 48;
    if (node?.isResult) {
      const lines = (node.label || '')
        .split(/\n|\//).filter((s: string) => s.trim().length > 0).length;
      const baseH = uiMode === 'simple' ? 120 : 100;
      const perLine = 32;
      return baseH + lines * perLine;
    }
    const outgoingEdges2 = edges.filter(e => e.from === id);
    // noButtons 노드는 버튼 영역이 없으므로 높이 줄임
    if ((node as any)?.noButtons) {
      return uiMode === 'simple' ? 120 : 100;
    }
    const outgoingCount = outgoingEdges2.length;
    const allLabels = outgoingEdges2.map(e => getCustomEdgeLabel(e.from, e.to, e.label, algorithm.id));
    const maxLabelLen = allLabels.length > 0 ? Math.max(...allLabels.map(l => l.length)) : 0;
    const verticalStack = maxLabelLen > 4;
    const verticalExtra = verticalStack ? (outgoingCount - 1) * 38 : 0;
    const baseHeight = uiMode === 'simple' ? 210 : 180;
    if (outgoingCount >= 5) return baseHeight + 55 + verticalExtra;
    if (outgoingCount === 4) return baseHeight + 45 + verticalExtra;
    if (outgoingCount === 3) return baseHeight + 10 + verticalExtra;
    return baseHeight + verticalExtra;
  };

  const maxCoords = (() => {
    let maxX = 0;
    let maxY = 0;
    Object.entries(nodes).forEach(([id, n]) => {
      const w = getNodeWidth(id);
      const h = getNodeHeight(id);
      if (n.x + w > maxX) maxX = n.x + w;
      if (n.y + h > maxY) maxY = n.y + h;
    });
    return { width: maxX + 40, height: maxY + 40 };
  })();

  const getBezierPath = (x1: number, y1: number, x2: number, y2: number) => {
    const controlY = y1 + (y2 - y1) * 0.45;
    return `M ${x1} ${y1} C ${x1} ${controlY}, ${x2} ${y1 + (y2 - y1) * 0.55}, ${x2} ${y2}`;
  };

  const isEdgeActive = (edge: typeof edges[0]) => {
    // label 노드에서 나오는 항상 true 엣지는 배선 없는 연결
    const fromNode = nodes[edge.from];
    if ((fromNode as any)?.isLabel) return true;
    if (answers[edge.from] === undefined) return false;
    return edge.condition(answers);
  };

  const isEdgeHighlighted = (fromId: string, toId: string | null) => {
    if (!toId) return false;
    if (toId === selectedGuideQuestionId) return true;
    let current = selectedGuideQuestionId;
    const visited = new Set();
    while (current) {
      if (visited.has(current)) break;
      visited.add(current);
      const parentEdge = edges.find(e => e.to === current);
      if (parentEdge) {
        if (parentEdge.from === fromId && parentEdge.to === toId) {
          return true;
        }
        current = parentEdge.from;
      } else {
        break;
      }
    }
    return false;
  };

  const getNodeStatus = (nodeId: string) => {
    if (uiMode === 'map') {
      if (nodeId === selectedGuideQuestionId) {
        return nodes[nodeId]?.isResult ? 'result-active' : 'active';
      }
      return 'completed';
    }
    if (nodeId === resultId) return 'result-active';
    if (nodeId === currentQuestionId) return 'active';
    if (history.includes(nodeId)) return 'completed';
    return 'inactive';
  };

  const getFriendlyAlgorithmName = () => {
    switch (algorithm.id) {
      case 'transfer':
        return '이동 도움 자가진단';
      case 'toileting':
        return '화장실 사용 자가진단';
      case 'feeding':
        return '식사 도움 자가진단';
      default:
        return algorithm.title;
    }
  };

  const getNextNodeName = (optValue: string) => {
    if (!currentQuestionId) return '';
    const q = (algorithm.questions as any)[currentQuestionId];
    if (!q) return '';

    const tempAnswers = { ...answers, [currentQuestionId]: optValue };

    let nextId: string | null = null;
    let resId: string | null = null;

    if (typeof q.nextQuestionId === 'function') {
      nextId = q.nextQuestionId(tempAnswers);
    } else if (q.nextQuestionId) {
      nextId = q.nextQuestionId;
    }

    if (typeof q.resultId === 'function') {
      resId = q.resultId(tempAnswers);
    } else if (q.resultId) {
      resId = q.resultId;
    }

    if (resId) {
      const res = (resultDetails[resId] || algorithm.results[resId]) as any;
      const name = res?.deviceName || res?.simpleTitle || res?.title || '결과 추천';
      return `💡 추천: ${name}`;
    } else if (nextId) {
      const nextQ = (algorithm.questions as any)[nextId];
      const nextTitle = nextQ?.simpleTitle || nextQ?.title || '다음 질문';
      return `➔ 다음: ${nextTitle}`;
    }
    return '➔ 다음 단계';
  };


  const getProjectedPath = () => {
    const path: string[] = [];
    let currId: string | null = algorithm.startQuestionId;
    const tempAnswers = { ...answers };

    if (currentQuestionId && tempSelectedSimple) {
      tempAnswers[currentQuestionId] = tempSelectedSimple;
    }

    while (currId) {
      path.push(currId);
      const q: Question = (algorithm.questions as any)[currId];
      if (!q) break;

      let nextId: string | null = null;
      let resId: string | null = null;

      if (typeof q.nextQuestionId === 'function') {
        nextId = q.nextQuestionId(tempAnswers);
      } else if (q.nextQuestionId) {
        nextId = q.nextQuestionId;
      }

      if (typeof q.resultId === 'function') {
        resId = q.resultId(tempAnswers);
      } else if (q.resultId) {
        resId = q.resultId;
      }

      if (nextId) {
        currId = nextId;
      } else if (resId) {
        path.push(resId);
        break;
      } else {
        // Projecting forward using first option if no answer yet
        const firstOpt = q.options[0]?.value;
        if (firstOpt !== undefined) {
          tempAnswers[currId] = firstOpt;
          let projNextId: string | null = null;
          let projResId: string | null = null;
          if (typeof q.nextQuestionId === 'function') {
            projNextId = q.nextQuestionId(tempAnswers);
          } else if (q.nextQuestionId) {
            projNextId = q.nextQuestionId;
          }
          if (typeof q.resultId === 'function') {
            projResId = q.resultId(tempAnswers);
          } else if (q.resultId) {
            projResId = q.resultId;
          }

          if (projNextId) {
            currId = projNextId;
          } else if (projResId) {
            path.push(projResId);
            break;
          } else {
            break;
          }
        } else {
          break;
        }
      }
    }
    return path;
  };

  const handleSimpleOptionClick = (value: string) => {
    if (!currentQuestionId) return;
    const q = algorithm.questions[currentQuestionId];
    if (!q || q.type !== 'single') return;

    setTempSelectedSimple(value);
  };

  const handleSimpleNext = () => {
    if (!currentQuestionId) return;
    const q = algorithm.questions[currentQuestionId];
    if (!q) return;

    if (q.type === 'multi') {
      handleMultiSubmit(currentQuestionId);
    } else {
      if (!tempSelectedSimple) return;
      
      let currentHistory = [...history];
      let currentAnswers = { ...answers };

      if (history.includes(currentQuestionId)) {
        const idx = history.indexOf(currentQuestionId);
        currentHistory = history.slice(0, idx);
        history.slice(idx).forEach(id => {
          delete currentAnswers[id];
        });
      }

      const updatedAnswers = { ...currentAnswers, [currentQuestionId]: tempSelectedSimple };
      const newHistory = [...currentHistory, currentQuestionId];

      setAnswers(updatedAnswers);
      setHistory(newHistory);

      if (onPathChange) {
        onPathChange([...newHistory, tempSelectedSimple]);
      }

      resolveNextStep(currentQuestionId, updatedAnswers, newHistory);
    }
  };

  const renderSimpleWizard = () => {
    const projectedPath = getProjectedPath();
    const currentIndex = currentQuestionId 
      ? projectedPath.indexOf(currentQuestionId) 
      : (resultId ? projectedPath.indexOf(resultId) : 0);
    const displayCurrentPage = currentIndex !== -1 ? currentIndex + 1 : history.length + 1;
    const displayTotalPages = projectedPath.length;

    // Check if result is showing
    const isResultPage = !!resultId;
    const currentQuestion = currentQuestionId ? algorithm.questions[currentQuestionId] : null;

    const friendlyName = getFriendlyAlgorithmName();

    // Group options by their target destination (nextQuestionId or resultId)
    const groups: Record<string, {
      targetId: string;
      isResult: boolean;
      label: string;
      options: Option[];
    }> = {};

    if (currentQuestion) {
      currentQuestion.options.forEach((opt) => {
        const tempAnswers = { ...answers, [currentQuestion.id]: opt.value };
        let nextId: string | null = null;
        let resId: string | null = null;

        if (typeof currentQuestion.nextQuestionId === 'function') {
          nextId = currentQuestion.nextQuestionId(tempAnswers);
        } else if (currentQuestion.nextQuestionId) {
          nextId = currentQuestion.nextQuestionId;
        }

        if (typeof currentQuestion.resultId === 'function') {
          resId = currentQuestion.resultId(tempAnswers);
        } else if (currentQuestion.resultId) {
          resId = currentQuestion.resultId;
        }

        const targetId = resId || nextId || '';
        const isResult = !!resId;
        
        let label = '';
        if (isResult) {
          const res = (resultDetails[targetId] || algorithm.results[targetId]) as any;
          const name = res?.deviceName || res?.simpleTitle || res?.title || '결과 추천';
          label = `💡 추천: ${name}`;
        } else if (targetId) {
          const nextQ = (algorithm.questions as any)[targetId];
          const nextTitle = nextQ?.simpleTitle || nextQ?.title || '다음 질문';
          label = `➔ 다음: ${nextTitle}`;
        } else {
          label = '➔ 다음 단계';
        }

        if (!groups[targetId]) {
          groups[targetId] = {
            targetId,
            isResult,
            label,
            options: []
          };
        }
        groups[targetId].options.push(opt);
      });
    }

    const groupList = Object.values(groups);

    return (
      <div className="w-full max-w-4xl mx-auto py-10 px-6 sm:px-8 space-y-10 bg-gradient-to-br from-blue-50/30 via-emerald-50/10 to-white rounded-3xl border border-slate-200/80 shadow-xl min-h-[600px] flex flex-col justify-between">
        {/* Top Header Row */}
        <div className="space-y-4">
          <div className="flex justify-center items-center pb-4 border-b border-slate-200/60">
            <span className="text-xl sm:text-2xl font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-6 py-2 rounded-2xl shadow-sm">
              {displayCurrentPage} / {displayTotalPages}
            </span>
          </div>

          {/* Simple Progress Bar */}
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(displayCurrentPage / displayTotalPages) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 py-4 flex flex-col justify-center">
          {isResultPage ? (
            /* Infographic Result Card */
            (() => {
              const res = (resultDetails[resultId] || algorithm.results[resultId]) as any;
              const deviceName = res?.deviceName || res?.simpleTitle || res?.title;
              const image = res?.image;
              const reason = res?.simpleReason || res?.reason;
              const whenToUse = res?.whenToUse;
              const precautions = res?.precautions || [];

              const items = typeof deviceName === 'string' 
                ? deviceName.split(/\s*[\+\/]\s*/g).map(s => s.trim()).filter(Boolean)
                : [deviceName];

              return (
                <div className="space-y-8 animate-fade-in text-center">
                  <div className="space-y-3">
                    <span className="text-4xl">🎉</span>
                    <h3 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                      어르신께 딱 맞는 돌봄 방법!
                    </h3>
                    <p className="text-lg text-slate-500 font-semibold">
                      종합 분석 결과 아래의 돌봄로봇/기기를 추천해 드립니다.
                    </p>
                  </div>

                  <div className="bg-white rounded-3xl border border-blue-100 shadow-md p-6 sm:p-10 space-y-6 text-left max-w-2xl mx-auto">
                    {/* Device Icon/Badge */}
                    <div className="flex items-start gap-4 border-b border-slate-100 pb-5">
                      <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-100 text-blue-600 shrink-0 mt-1">
                        <Bot className="w-8 h-8" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-col gap-2.5">
                          {items.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2 bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-3 shadow-sm">
                              <span className="text-emerald-500 font-extrabold text-lg">•</span>
                              <span className="text-lg sm:text-xl font-black text-slate-800 leading-snug">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Image if available */}
                    {image && (
                      <div className="relative mx-auto w-full max-w-sm h-64 bg-slate-50 rounded-2xl border border-slate-105 overflow-hidden flex items-center justify-center p-4">
                        <Image
                          src={image}
                          alt={deviceName}
                          fill
                          className="object-contain p-4 hover:scale-105 transition-transform duration-300 animate-fade-in"
                          priority
                          unoptimized
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })()
          ) : (
            /* Question Wizard Page */
            currentQuestion && (
              <div className="space-y-8 animate-fade-in text-center max-w-5xl mx-auto w-full px-2">
                <div className="space-y-4">
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 leading-snug">
                    {currentQuestion.simpleTitle || currentQuestion.title}
                  </h4>
                  {getDisplayText(currentQuestion, 'description', 'simple') && (
                    <p className="text-base sm:text-lg text-slate-500 font-bold">
                      {getDisplayText(currentQuestion, 'description', 'simple')}
                    </p>
                  )}
                </div>

                <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch w-full mt-2">
                    {groupList.map((group) => {
                      return (
                        <div key={group.targetId} className="flex-1 min-w-[260px] max-w-md bg-slate-50/50 rounded-2xl border border-slate-200 p-5 flex flex-col justify-center shadow-sm hover:shadow transition-all space-y-5">
                          <div className="space-y-3 flex-1 flex flex-col justify-center">
                            {group.options.map((opt) => {
                              const isSelected = currentQuestion.type === 'multi'
                                ? tempMultiSelect.includes(opt.value)
                                : tempSelectedSimple === opt.value;
                              
                              return (
                                <button
                                  key={opt.id}
                                  onClick={() => {
                                    if (currentQuestion.type === 'multi') {
                                      handleMultiToggle(opt.value);
                                    } else {
                                      setTempSelectedSimple(opt.value);
                                      handleSingleSelect(currentQuestionId!, opt.value);
                                    }
                                  }}
                                  className={`w-full text-left rounded-xl border transition-all duration-250 p-5 flex items-center justify-between cursor-pointer group ${
                                    isSelected
                                      ? 'border-emerald-500 bg-emerald-50/30 text-emerald-950 ring-2 ring-emerald-500/20'
                                      : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50/50 text-slate-700'
                                  }`}
                                >
                                    <div className="flex-1 pr-4">
                                      <span className="text-lg sm:text-xl md:text-2xl font-black leading-snug block">
                                        {getDisplayText(opt, 'text', 'simple')}
                                      </span>
                                      {(() => {
                                        const cleanQId = currentQuestionId!.replace('_', ''); // q2_a -> q2a
                                        const optKey = `${cleanQId}_${opt.value}`; // q2a_yes, q2a_no
                                        const alternativeOptKey = `${currentQuestionId}_${opt.value}`; // q1_yes, q1_no
                                        const directDetail = optionDetails[optKey] || optionDetails[alternativeOptKey];

                                        if (directDetail) {
                                          return (
                                            <span className="text-base sm:text-lg text-slate-500 mt-2 block font-bold leading-normal">
                                              • {directDetail}
                                            </span>
                                          );
                                        }

                                        // 0~4점 분할식 자가진단 항목 가이드 맵핑
                                        // 1) 자리이동 기능평가 (transfer q1)
                                        if (currentQuestionId === 'q1' && algorithm.id === 'transfer') {
                                          const scores = opt.value === 'no' ? [0, 1] : [2, 3, 4];
                                          return (
                                            <div className="mt-2 space-y-1 text-base sm:text-lg text-slate-500 font-bold leading-normal">
                                              {scores.map(s => (
                                                <span key={s} className="block">• {optionDetails[`q1_${s}`]}</span>
                                              ))}
                                            </div>
                                          );
                                        }

                                        // 2) 배설 이동 평가 (toileting q2_a, q2_b)
                                        if ((currentQuestionId === 'q2_a' || currentQuestionId === 'q2_b') && algorithm.id === 'toileting') {
                                          const prefix = currentQuestionId === 'q2_a' ? 'q2a' : 'q2b';
                                          const scores = opt.value === 'no' ? [0, 1] : [2, 3, 4];
                                          return (
                                            <div className="mt-2 space-y-1 text-base sm:text-lg text-slate-500 font-bold leading-normal">
                                              {scores.map(s => (
                                                <span key={s} className="block">• {optionDetails[`${prefix}_${s}`]}</span>
                                              ))}
                                            </div>
                                          );
                                        }

                                        // 3) 배설 청결 평가 (toileting q3_a1, q3_a2, q3_b1, q3_b2)
                                        if (['q3_a1', 'q3_a2', 'q3_b1', 'q3_b2'].includes(currentQuestionId!) && algorithm.id === 'toileting') {
                                          const prefix = currentQuestionId!.replace('_', '');
                                          const scores = opt.value === 'no' ? [0, 1] : [2, 3, 4];
                                          return (
                                            <div className="mt-2 space-y-1 text-base sm:text-lg text-slate-500 font-bold leading-normal">
                                              {scores.map(s => (
                                                <span key={s} className="block">• {optionDetails[`${prefix}_${s}`]}</span>
                                              ))}
                                            </div>
                                          );
                                        }

                                        // 4) 식사 먹기/마시기 기능 평가 (feeding q2)
                                        if (currentQuestionId === 'q2' && algorithm.id === 'feeding') {
                                          const scores = opt.value === 'no' ? [0, 1] : [2, 3, 4];
                                          return (
                                            <div className="mt-2 space-y-1 text-base sm:text-lg text-slate-500 font-bold leading-normal">
                                              {scores.map(s => (
                                                <span key={s} className="block">• {optionDetails[`feeding_q2_${s}`]}</span>
                                              ))}
                                            </div>
                                          );
                                        }

                                        // 5) 식사 삼킴 및 팔의 근력 평가 (feeding q1, q3) 예/아니오 키 매핑
                                        if ((currentQuestionId === 'q1' || currentQuestionId === 'q3') && algorithm.id === 'feeding') {
                                          const specKey = `feeding_${currentQuestionId}_${opt.value}`;
                                          if (optionDetails[specKey]) {
                                            return (
                                              <span className="text-base sm:text-lg text-slate-500 mt-2 block font-bold leading-normal">
                                                • {optionDetails[specKey]}
                                              </span>
                                            );
                                          }
                                        }

                                        return null;
                                      })()}
                                    </div>
                                  <div className={`rounded-full border-2 transition-all shrink-0 w-6 h-6 flex items-center justify-center ${
                                    isSelected ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-350 bg-white'
                                  }`}>
                                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            )}
          </div>

        {/* Bottom Navigation Buttons */}
        <div className="flex justify-between items-center gap-6 border-t border-slate-200/60 pt-6">
          {/* Previous Button */}
          {history.length > 0 ? (
            <button
              onClick={handlePrevQuestion}
              className="px-6 py-3.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-600 font-extrabold transition-all cursor-pointer flex items-center gap-1.5 text-base sm:text-lg hover:bg-slate-50"
            >
              <ChevronLeft className="w-5 h-5 shrink-0" />
              <span>이전 단계</span>
            </button>
          ) : (
            <div className="w-28" />
          )}

          {/* Action/Next Button - result 또는 multi 타입일 때만 표시 */}
          {isResultPage ? (
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {onLearnMore && (
                <button
                  onClick={() => onLearnMore(resultId)}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-extrabold hover:from-blue-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-1.5 shadow hover:shadow-md cursor-pointer text-base sm:text-lg"
                >
                  <span>돌봄로봇 정보 더 알아보기</span>
                  <ArrowRight className="w-5 h-5 shrink-0" />
                </button>
              )}
              <button
                onClick={handleReset}
                className="px-6 py-3.5 rounded-xl border border-slate-300 text-slate-600 font-extrabold hover:bg-slate-50 transition-all cursor-pointer text-base sm:text-lg"
              >
                처음부터 다시하기
              </button>
            </div>
          ) : currentQuestion?.type === 'multi' ? (
            <button
              onClick={() => handleMultiSubmit(currentQuestionId!)}
              disabled={tempMultiSelect.length === 0}
              className={`px-8 py-3.5 rounded-xl font-extrabold transition-all flex items-center gap-1.5 shadow text-base sm:text-lg cursor-pointer ${
                tempMultiSelect.length > 0
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white shadow-md scale-[1.01] hover:scale-[1.03] active:scale-[0.98]'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none'
              }`}
            >
              <span>다음 단계</span>
              <ChevronRight className="w-5 h-5 shrink-0" />
            </button>
          ) : (
            <div className="w-28" />
          )}
        </div>
      </div>
    );
  };

  const modeUi = uiMode as any;
  if (modeUi === 'simple') {
    return renderSimpleWizard();
  }

  if (uiMode === 'map') {
    return (
      <div className="w-full space-y-6">
        {/* Zoom Controls Panel */}
        <div className="flex justify-end items-center bg-white border border-slate-200/80 rounded-xl px-4 py-2 shadow-sm gap-2">
          <span className="text-[11px] font-bold text-slate-400 mr-2">지도 확대/축소:</span>
          <button 
            onClick={() => setZoom(z => Math.max(0.3, z - 0.1))} 
            className="p-1 px-2.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-505 hover:bg-slate-50 hover:text-slate-700 cursor-pointer"
          >
            -
          </button>
          <span className="text-[10px] font-bold text-slate-505 min-w-10 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button 
            onClick={() => setZoom(z => Math.min(1.5, z + 0.1))} 
            className="p-1 px-2.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-505 hover:bg-slate-50 hover:text-slate-700 cursor-pointer"
          >
            +
          </button>
          <button 
            onClick={handleFitView} 
            className="p-1 px-2 bg-white border border-slate-200 rounded text-xs font-bold text-slate-505 hover:bg-slate-50 hover:text-slate-700 cursor-pointer flex items-center gap-1"
          >
            <Maximize2 className="w-3 h-3" />
            <span>화면맞춤</span>
          </button>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Flowchart Map */}
          <div className="lg:col-span-12 w-full bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div 
              ref={wrapperRef}
              className="w-full overflow-auto p-6 scrollbar-thin scrollbar-thumb-slate-200 bg-slate-50/10"
              style={{ maxHeight: '950px' }}
            >
              <div
                style={{
                  width: `${maxCoords.width * zoom}px`,
                  height: `${maxCoords.height * zoom}px`,
                  overflow: 'hidden',
                  transition: 'width 0.15s ease-out, height 0.15s ease-out'
                }}
              >
                <div 
                  ref={containerRef}
                  className="relative select-none origin-top-left"
                  style={{ 
                    width: `${maxCoords.width}px`, 
                    height: `${maxCoords.height}px`,
                    transform: `scale(${zoom})`,
                    transformOrigin: '0 0',
                    transition: 'transform 0.15s ease-out'
                  }}
                >
                {/* SVG Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  {edges.map((edge, idx) => {
                    const fromNode = nodes[edge.from];
                    const toNode = nodes[edge.to];
                    if (!fromNode || !toNode) return null;
                    const parentW = getNodeWidth(edge.from);
                    const parentH = getNodeHeight(edge.from);
                    const childW = getNodeWidth(edge.to);
                    const startX = fromNode.x + parentW / 2;
                    const startY = fromNode.y + parentH;
                    const endX = toNode.x + childW / 2;
                    const endY = toNode.y;
                    const active = isEdgeActive(edge);
                    const highlighted = isEdgeHighlighted(edge.from, edge.to) || active;
                    return (
                      <g key={`${edge.from}-${edge.to}-${idx}`}>
                        <path
                          d={getBezierPath(startX, startY, endX, endY)}
                          fill="none"
                          stroke={highlighted ? "#3B82F6" : "#94A3B8"}
                          strokeWidth={highlighted ? 3.0 : 1.5}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* HTML Nodes */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                  {Object.entries(nodes).map(([id, node]) => {
                    const status = getNodeStatus(id);
                    const nodeW = getNodeWidth(id);
                    const nodeH = getNodeHeight(id);
                    const isActive = status === 'active';
                    const isResult = node.isResult;
                    const isHighlightedResult = status === 'result-active';

                    const isPartofPath = id === selectedGuideQuestionId || isEdgeHighlighted(id, selectedGuideQuestionId) || edges.some(e => e.from === selectedGuideQuestionId && e.to === id);
                    const dimOpacity = isPartofPath ? 'opacity-100' : 'opacity-65';

                    const outgoingEdges = edges.filter(e => e.from === id);

                    const isLabel = (node as any).isLabel === true;
                    const isNoButtons = (node as any).noButtons === true;
                    const isLabelStyle = isLabel || isNoButtons; // 비주얼이 레이블처럼 보이는 노드

                    return (
                      <div
                        key={id}
                        onClick={() => handleNodeClick(id)}
                        className={`absolute pointer-events-auto flex flex-col justify-center p-4 select-none transition-all duration-300 ${dimOpacity} ${
                          isLabelStyle
                            ? 'rounded-xl border-2 border-blue-200 bg-blue-50/60 text-blue-800 shadow-sm cursor-pointer hover:shadow-md hover:border-blue-400'
                            : isResult
                              ? `rounded-2xl border-2 ${
                                  isHighlightedResult
                                    ? 'border-teal-600 bg-teal-600 text-white shadow-lg scale-[1.04] z-20 cursor-default ring-4 ring-teal-600/20'
                                    : isActive
                                      ? 'border-teal-500 bg-teal-55 text-teal-950 shadow-md ring-4 ring-teal-500/20 scale-[1.02] z-20 cursor-default'
                                      : 'border-teal-200/80 bg-teal-50/20 text-teal-900/80 shadow-sm cursor-pointer hover:shadow-md hover:border-teal-400'
                                 }`
                              : `rounded-2xl border-2 ${
                                  isActive
                                    ? 'border-purple-500 bg-purple-50 text-purple-950 shadow-md ring-4 ring-purple-100/30 scale-[1.02] z-20 cursor-default'
                                    : 'border-purple-200/80 bg-purple-50/10 text-purple-900 shadow-sm cursor-pointer hover:shadow-md hover:border-purple-400'
                                 }`
                        }`}
                        style={{
                          left: `${node.x}px`,
                          top: `${node.y}px`,
                          width: `${nodeW}px`,
                          ...(isResult
                            ? { minHeight: `${nodeH}px`, height: 'auto' }
                            : { height: `${nodeH}px` }),
                        }}
                      >
                        <div className="flex-1 flex flex-col justify-between gap-3">
                          <div>
                            {!isResult && !isLabelStyle && node.typeLabel && (
                              <p className="text-[18px] sm:text-[20px] font-extrabold text-blue-600 mb-1 leading-tight">
                                {node.typeLabel}
                              </p>
                            )}
                            {isLabelStyle ? (
                               <p className="text-[18px] sm:text-[20px] font-extrabold text-slate-700 text-center leading-snug">{cleanInternalCodes(node.label)}</p>
                            ) : isResult ? (
                              <div className="space-y-1.5 text-left">
                                {(algorithm.results[id]?.title || node.label)
                                  .split(/\s*\/\s*|\n/)
                                  .filter(Boolean)
                                  .map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-1.5 leading-tight">
                                      <span className={isHighlightedResult ? "text-white" : "text-emerald-500 font-extrabold"}>•</span>
                                      <span className={`text-[16px] sm:text-[17px] font-black leading-snug ${isHighlightedResult ? 'text-white' : 'text-slate-800'}`}>
                                        {cleanInternalCodes(item)}
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            ) : (
                              <h4 className={`text-[18px] sm:text-[20px] font-black leading-snug text-left ${
                                isHighlightedResult ? 'text-white' : 'text-slate-900'
                              }`}>
                                {cleanInternalCodes(algorithm.questions[id]?.title || node.label)}
                              </h4>
                            )}
                          </div>

                          {!isResult && !isLabelStyle && !(node as any).noButtons && outgoingEdges.filter(e => e.label).length > 0 && (() => {
                            const labeledEdges = [...outgoingEdges.filter(e => e.label)].sort((a, b) => {
                              const aLabel = getCustomEdgeLabel(a.from, a.to, a.label, algorithm.id);
                              const bLabel = getCustomEdgeLabel(b.from, b.to, b.label, algorithm.id);
                              const isNoA = aLabel.includes('아니오') || a.label.includes('no') || a.label.includes('none');
                              const isYesA = aLabel.includes('예') || a.label.includes('yes');
                              const isNoB = bLabel.includes('아니오') || b.label.includes('no') || b.label.includes('none');
                              const isYesB = bLabel.includes('예') || b.label.includes('yes');
                              if (isNoA && isYesB) return -1;
                              if (isYesA && isNoB) return 1;
                              return 0;
                            });
                            const allLabels = labeledEdges.map(e => getCustomEdgeLabel(e.from, e.to, e.label, algorithm.id));
                            const maxLen = Math.max(...allLabels.map(l => l.length));
                            const useVertical = maxLen > 4;
                            return (
                            <div 
                              className={`pt-2 border-t border-slate-100 mt-auto flex gap-2 w-full ${useVertical ? 'flex-col' : 'flex-row flex-nowrap'}`}
                            >
                              {labeledEdges.map((edge, eIdx) => {
                                const isBranchSelected = answers[id] !== undefined && isEdgeActive(edge);
                                return (
                                  <button
                                    key={eIdx}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const val = getOptionValueLeadingTo(id, edge.to);
                                      if (val !== null) {
                                        handleSingleSelect(id, val);
                                      }
                                    }}
                                    className={`px-3 py-1.5 rounded-xl text-sm sm:text-base font-extrabold transition-all border text-center leading-tight whitespace-nowrap cursor-pointer flex items-center justify-center min-h-[36px] flex-1 ${
                                      isBranchSelected
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-sm font-black'
                                        : 'bg-white border-slate-200 text-slate-655 hover:bg-slate-105 hover:text-slate-900'
                                    }`}
                                  >
                                    {allLabels[eIdx]}
                                  </button>
                                );
                              })}
                            </div>
                            );
                          })()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        {/* Full judgment criteria table reference */}
        {renderCriteriaTable(algorithm.id, '')}
      </div>
    );
  }

  // Render Interactive Decision Map Flowchart (Both Simple & Detailed Modes)
  return (
    <div className="w-full space-y-6">
      
      {/* Top Header Panel */}
      <div className="flex flex-wrap justify-between items-center bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm gap-4">
        <div className="text-left">
          <span className={`font-black text-primary uppercase tracking-wider block mb-0.5 ${
            uiMode === 'simple' ? 'text-sm' : 'text-xs'
          }`}>
            {uiMode === 'simple' ? '쉬운 자가 진단 및 학습' : '자가 진단 및 흐름 학습'}
          </span>
          <h3 className={`font-bold text-slate-705 leading-snug ${
            uiMode === 'simple' ? 'text-base sm:text-lg' : 'text-sm'
          }`}>
            아래의 상세 단계를 따라 진단을 진행하고 평가 기준을 학습해 보세요.
          </h3>
        </div>
        <button
          onClick={handleReset}
          className="px-4 py-2 text-xs font-bold text-slate-505 hover:text-red-500 hover:bg-red-55 hover:border-red-200 border border-slate-200 bg-white rounded-xl shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>진단 초기화</span>
        </button>
      </div>

      {/* Decision Map Section */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <button
          onClick={() => setShowDecisionMap(!showDecisionMap)}
          className="w-full py-4 px-6 bg-slate-50/70 hover:bg-slate-100/80 transition-all font-bold text-sm text-slate-700 flex justify-between items-center cursor-pointer border-b border-slate-200/60"
        >
          <span className="flex items-center gap-2">
            <GitMerge className="w-4 h-4 text-primary animate-pulse" />
            <span>의사결정 지도 보기</span>
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showDecisionMap ? 'rotate-180' : ''}`} />
        </button>

        {showDecisionMap && (
          <div className="w-full border-t border-slate-100 flex flex-col bg-slate-50/30">
            <div className="p-3 bg-slate-100/50 border-b border-slate-200 flex justify-between items-center px-6 shrink-0 text-xs">
              <div className="text-left">
                <span className="font-extrabold text-slate-705">의사결정 지도</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setZoom(z => Math.max(0.15, z - 0.1))} 
                  className="p-1 px-2.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-505 hover:bg-slate-50 hover:text-slate-700 cursor-pointer"
                >
                  -
                </button>
                <span className="text-[10px] font-bold text-slate-400 min-w-10 text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button 
                  onClick={() => setZoom(z => Math.min(1.5, z + 0.1))} 
                  className="p-1 px-2.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-505 hover:bg-slate-50 hover:text-slate-700 cursor-pointer"
                >
                  +
                </button>
                <button 
                  onClick={handleFitView} 
                  className="p-1 px-2 bg-white border border-slate-200 rounded text-xs font-bold text-slate-505 hover:bg-slate-50 hover:text-slate-700 cursor-pointer flex items-center gap-1"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>화면맞춤</span>
                </button>
              </div>
            </div>

            <div 
              ref={wrapperRef}
              className="w-full overflow-auto p-6 scrollbar-thin scrollbar-thumb-slate-200 bg-slate-50/10"
              style={{ maxHeight: '600px' }}
            >
              <div 
                ref={containerRef}
                className="relative select-none origin-top-left"
                style={{ 
                  width: `${(maxCoords.width + (uiMode === 'simple' ? 300 : 0)) * zoom}px`, 
                  height: `${(maxCoords.height + (uiMode === 'simple' ? 100 : 0)) * zoom}px`,
                  transform: `scale(${zoom})`,
                  transition: 'transform 0.15s ease-out'
                }}
              >
                {/* SVG Connection Layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  {edges.map((edge, idx) => {
                    const fromNode = nodes[edge.from];
                    const toNode = nodes[edge.to];
                    if (!fromNode || !toNode) return null;

                    const parentW = getNodeWidth(edge.from);
                    const parentH = getNodeHeight(edge.from);
                    const childW = getNodeWidth(edge.to);

                    const startX = fromNode.x + parentW / 2;
                    const startY = fromNode.y + parentH;
                    const endX = toNode.x + childW / 2;
                    const endY = toNode.y;

                    const active = isEdgeActive(edge);

                    return (
                      <g key={`${edge.from}-${edge.to}-${idx}`}>
                        <path
                          d={getBezierPath(startX, startY, endX, endY)}
                          fill="none"
                          stroke={active ? '#2563EB' : '#E2E8F0'}
                          strokeWidth={active ? 4.0 : 1.5}
                          className="transition-all duration-300"
                        />
                      </g>
                    );
                  })}

                  {/* SVG middle labels */}
                  {edges.map((edge, idx) => {
                    const fromNode = nodes[edge.from];
                    const toNode = nodes[edge.to];
                    if (!fromNode || !toNode) return null;

                    const parentW = getNodeWidth(edge.from);
                    const parentH = getNodeHeight(edge.from);
                    const childW = getNodeWidth(edge.to);

                    const startX = fromNode.x + parentW / 2;
                    const startY = fromNode.y + parentH;
                    const endX = toNode.x + childW / 2;
                    const endY = toNode.y;

                    const active = isEdgeActive(edge);

                    const midX = (startX + endX) / 2;
                    const midY = (startY + endY) / 2;

                    return (
                      <foreignObject
                        key={`label-${edge.from}-${edge.to}-${idx}`}
                        x={midX - 50}
                        y={midY - 12}
                        width={100}
                        height={24}
                        className="foreign-object overflow-visible pointer-events-none"
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <span className={`font-extrabold px-1.5 py-0.5 rounded-full border shadow-sm tracking-tight transition-all duration-300 ${
                            active 
                              ? 'bg-primary text-white border-primary scale-105 shadow-sm font-black' 
                              : 'bg-white text-slate-400 border-slate-200'
                          } ${uiMode === 'simple' ? 'text-[11px]' : 'text-[9px]'}`}>
                            {edge.label}
                          </span>
                        </div>
                      </foreignObject>
                    );
                  })}
                </svg>

                {/* HTML Absolute Nodes Layer */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                  {Object.entries(nodes).map(([id, node]) => {
                    const status = getNodeStatus(id);
                    const nodeW = getNodeWidth(id);
                    const nodeH = getNodeHeight(id);

                    const isActive = status === 'active';
                    const isCompleted = status === 'completed';
                    const isResult = node.isResult;
                    const isHighlightedResult = status === 'result-active';

                    return (
                      <div
                        key={id}
                        onClick={() => handleNodeClick(id)}
                        className={`absolute pointer-events-auto flex flex-col justify-between rounded-xl border p-3 select-none transition-all duration-300 cursor-pointer hover:shadow-md hover:border-primary/50 ${
                          isHighlightedResult
                            ? 'border-2 border-primary bg-primary text-white shadow-lg scale-[1.04] z-20 ring-4 ring-primary/30'
                            : isActive
                              ? 'border-2 border-primary bg-primary/5 shadow-md ring-4 ring-primary/20 scale-[1.02] z-20'
                              : isCompleted
                                ? 'border-sky-300 bg-sky-50 text-slate-800 shadow-sm'
                                : 'border-slate-200 bg-slate-50 text-slate-500 opacity-80'
                        }`}
                        style={{
                          left: `${node.x}px`,
                          top: `${node.y}px`,
                          width: `${nodeW}px`,
                          height: `${nodeH}px`,
                        }}
                      >
                        <div className="space-y-1">
                          {/* Card Top Label */}
                          <div className="flex justify-between items-center w-full">
                            <span className="text-[10px] uppercase font-bold text-slate-400">
                              {!isResult && node.typeLabel}
                            </span>
                            
                            {/* Completed checkmark */}
                            {isCompleted && (
                              <span className="text-emerald-500 bg-emerald-50 w-3.5 h-3.5 rounded-full flex items-center justify-center border border-emerald-200">
                                <Check className="w-2.5 h-2.5 stroke-[4]" />
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          {isResult ? (
                            <div className="space-y-1 text-left">
                              {(algorithm.results[id]?.title || node.label)
                                .split(/\s*\/\s*|\n/)
                                .filter(Boolean)
                                .map((item: string, idx: number) => (
                                  <div key={idx} className="flex items-start gap-1 leading-tight">
                                    <span className={isHighlightedResult ? "text-white" : "text-emerald-500 font-extrabold"}>•</span>
                                    <span className={`font-black ${isHighlightedResult ? 'text-white' : 'text-slate-800'} ${uiMode === 'simple' ? 'text-sm' : 'text-[11px]'}`}>
                                      {cleanInternalCodes(item.trim())}
                                    </span>
                                  </div>
                                ))}
                            </div>
                          ) : (
                            <h4 className={`leading-snug font-black text-left ${
                              uiMode === 'simple' ? 'text-sm sm:text-base md:text-lg' : 'text-xs font-bold'
                            } ${isHighlightedResult ? 'text-white' : 'text-slate-850'}`}>
                              {cleanInternalCodes(algorithm.questions[id]?.title || node.label)}
                            </h4>
                          )}
                        </div>

                        {/* Card Bottom Quick Action Interface */}
                        {isActive && !isResult && (
                          <div className="pt-2 flex flex-wrap gap-1 border-t border-slate-100 mt-1 shrink-0">
                            {algorithm.questions[id]?.type === 'single' ? (
                              algorithm.questions[id].options.map((opt) => (
                                <button
                                  key={opt.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSingleSelect(id, opt.value);
                                  }}
                                  className={`flex-1 font-extrabold rounded bg-primary/5 border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all text-center whitespace-nowrap cursor-pointer flex items-center justify-center ${
                                    uiMode === 'simple' ? 'text-xs sm:text-sm px-2 py-1.5 min-h-[38px]' : 'text-[8px] sm:text-[9px] px-1 py-0.5 min-h-[26px]'
                                  }`}
                                >
                                  {getShortOptionText(getDisplayText(opt, 'text', uiMode))}
                                </button>
                              ))
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedGuideQuestionId(id);
                                  setIsHelpModalOpen(true);
                                }}
                                className={`w-full font-extrabold rounded bg-primary text-white text-center hover:bg-primary-dark transition-colors cursor-pointer flex items-center justify-center ${
                                  uiMode === 'simple' ? 'text-xs sm:text-sm py-1.5' : 'text-[8px] sm:text-[9px] py-0.5'
                                }`}
                              >
                                조건 입력
                              </button>
                            )}
                          </div>
                        )}

                        {/* Selected result/badge for completed questions */}
                        {isCompleted && !isResult && (
                          <div className={`text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10 mt-1 truncate font-black text-center ${
                            uiMode === 'simple' ? 'text-xs' : 'text-[9px]'
                          }`}>
                            {(() => {
                              const ans = answers[id];
                              const q = algorithm.questions[id];
                              if (!q) return '';
                              if (q.type === 'single') {
                                const matchedOpt = q.options.find(o => o.value === ans);
                                return matchedOpt ? getShortOptionText(getDisplayText(matchedOpt, 'text', uiMode)) : '';
                              } else if (Array.isArray(ans)) {
                                return `${ans.length}개 조건`;
                              }
                              return '';
                            })()}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Active Question / Result Details & Path History */}
        <div className="lg:col-span-12 w-full space-y-6">
          {resultId ? (
            /* Result Details Card */
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden animate-fade-in flex flex-col text-left">
              <div className="bg-primary px-6 py-4 text-white">
                <span className={`font-black text-white/80 uppercase tracking-widest block ${
                  uiMode === 'simple' ? 'text-xs' : 'text-[10px]'
                }`}>자가평가 결과</span>
                <h3 className="font-extrabold text-sm sm:text-base leading-tight">자가평가 결과</h3>
              </div>

              <div className="p-6 space-y-6 flex-1">
                {(() => {
                  const robotType = getRobotTypeForResult(resultId);
                  if (robotType) {
                    return (
                      <>
                        {/* Result Title */}
                        <div className="text-center pb-5 border-b border-slate-100 space-y-2">
                          <span className={`font-black text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 ${
                            uiMode === 'simple' ? 'text-sm' : 'text-[9px]'
                          }`}>
                            추천 돌봄로봇 유형
                          </span>
                          <h2 className={`font-black text-slate-800 pt-1 tracking-tight leading-snug ${
                            uiMode === 'simple' ? 'text-3xl sm:text-4xl md:text-5xl' : 'text-2xl sm:text-3xl'
                          }`}>
                            {robotType.name}
                          </h2>
                          <p className={`text-slate-855 font-extrabold leading-normal ${
                            uiMode === 'simple' ? 'text-lg sm:text-xl md:text-2xl' : 'text-sm sm:text-base md:text-lg'
                          }`}>
                            {robotType.oneLine}
                          </p>
                        </div>

                        {/* Device Image */}
                        {robotType.image ? (
                          <div className="relative mx-auto w-44 h-44 rounded-2xl bg-white border border-slate-100 flex items-center justify-center p-3">
                            <img
                              src={robotType.image}
                              alt={robotType.name}
                              className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                                const sibling = (e.target as HTMLElement).nextElementSibling;
                                if (sibling) (sibling as HTMLElement).style.display = 'flex';
                              }}
                            />
                            <div className="hidden flex-col items-center justify-center gap-2 text-slate-400">
                              <Bot className="w-6 h-6" />
                              <span className="text-[10px] font-bold">이미지 준비 중</span>
                            </div>
                          </div>
                        ) : (
                          <div className="mx-auto w-44 h-44 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center p-3 text-slate-400 gap-2">
                            <Bot className="w-6 h-6 text-slate-300" />
                            <span className="text-xs font-black text-slate-550">이미지 준비 중</span>
                            {robotType.intendedImage && (
                              <div className="text-[10px] font-mono font-bold text-slate-500 bg-white px-2.5 py-1.5 rounded border border-slate-200/80 leading-normal max-w-full text-center break-all">
                                파일명: <span className="text-blue-600">{robotType.intendedImage.split('/').pop()}</span>
                                <div className="text-[9px] text-slate-400 font-normal mt-0.5">
                                  경로: {robotType.intendedImage}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Details Layout */}
                        <div className="grid grid-cols-1 gap-4">
                          {/* Applicability situations */}
                          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
                            <h5 className={`font-bold text-slate-400 tracking-wide uppercase ${
                              uiMode === 'simple' ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'
                            }`}>적용 상황</h5>
                            <ul className={`text-slate-855 font-extrabold list-disc pl-5 leading-relaxed ${
                              uiMode === 'simple' ? 'text-base sm:text-lg md:text-xl space-y-2' : 'text-sm sm:text-base space-y-1.5'
                            }`}>
                              {robotType.situations.map((sit, i) => (
                                <li key={i}>{sit}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Full-width Cautions Box */}
                          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-2 w-full">
                            <h5 className={`font-bold text-amber-805 tracking-wide uppercase flex items-center gap-1 font-black ${
                              uiMode === 'simple' ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'
                            }`}>
                              확인할 점
                            </h5>
                            <ul className={`text-slate-805 font-bold list-disc pl-5 leading-relaxed ${
                              uiMode === 'simple' ? 'text-base sm:text-lg md:text-xl space-y-2' : 'text-sm sm:text-base space-y-1.5'
                            }`}>
                              {robotType.cautions.map((caut, idx) => (
                                <li key={idx}>{caut}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Examples & reasons */}
                        <div className="space-y-4 border-t border-slate-100 pt-6 text-sm leading-normal">
                          {robotType.examples && robotType.examples.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-bold text-slate-400">예시 기기:</span>
                              {robotType.examples.map((ex, i) => (
                                <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-655 rounded text-xs font-bold">
                                  {ex}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="space-y-1">
                            <h5 className={`font-bold text-slate-400 tracking-wide uppercase ${
                              uiMode === 'simple' ? 'text-base' : 'text-xs sm:text-sm'
                            }`}>판단 사유</h5>
                            <p className={`text-slate-800 font-bold leading-relaxed bg-slate-55 p-3 rounded-xl border border-slate-100 ${
                              uiMode === 'simple' ? 'text-base sm:text-lg' : 'text-sm'
                            }`}>
                              {algorithm.results[resultId]?.reason}
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  }

                  // Fallback legacy result details
                  return (
                    <>
                      {/* Result Title */}
                      <div className="text-center pb-5 border-b border-slate-100 space-y-2">
                        <span className={`font-black text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 ${
                          uiMode === 'simple' ? 'text-sm' : 'text-[9px]'
                        }`}>
                          최적 추천 결과
                        </span>
                        <h2 className={`font-black text-slate-800 pt-1 tracking-tight leading-snug ${
                          uiMode === 'simple' ? 'text-3xl sm:text-4xl md:text-5xl' : 'text-2xl sm:text-3xl'
                        }`}>
                          {cleanInternalCodes(resultDetails[resultId]?.deviceName || algorithm.results[resultId]?.title)}
                        </h2>
                      </div>

                      {/* Device representative Image */}
                      {resultDetails[resultId]?.image ? (
                        <div className="relative mx-auto w-48 h-48 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3">
                          <Image
                            src={resultDetails[resultId].image}
                            alt={resultDetails[resultId].deviceName}
                            fill
                            className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                            priority
                          />
                        </div>
                      ) : (
                        <div className="mx-auto w-48 h-48 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-350 text-xs">
                          이미지 준비 중
                        </div>
                      )}

                      {/* Details layout */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2 col-span-2">
                          <h5 className="font-bold text-slate-400 tracking-wide uppercase text-[10px]">사용 조건 / 상황</h5>
                          <p className="text-slate-700 font-semibold leading-relaxed text-sm">
                            {resultDetails[resultId]?.whenToUse}
                          </p>
                        </div>

                        {resultDetails[resultId]?.pros && (
                          <div className="bg-emerald-50/55 border border-emerald-200 rounded-2xl p-5 space-y-2">
                            <h5 className="font-bold text-emerald-700 tracking-wide uppercase text-[10px] flex items-center gap-1 font-extrabold">
                              <ThumbsUp className="w-3.5 h-3.5" />
                              주요 장점
                            </h5>
                            <ul className="space-y-1 text-emerald-800 font-semibold list-disc pl-4 leading-relaxed">
                              {resultDetails[resultId].pros.map((pro, idx) => (
                                <li key={idx}>{pro}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {resultDetails[resultId]?.precautions && (
                          <div className="bg-amber-50/55 border border-amber-200 rounded-2xl p-5 space-y-2">
                            <h5 className="font-bold text-amber-700 tracking-wide uppercase text-[10px] flex items-center gap-1 font-extrabold">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              사용 시 유의사항
                            </h5>
                            <ul className="space-y-1 text-amber-855 font-semibold list-disc pl-4 leading-relaxed">
                              {resultDetails[resultId].precautions.map((pre, idx) => (
                                <li key={idx}>{pre}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Additional Clinical details */}
                      <div className="space-y-4 border-t border-slate-100 pt-6 text-xs leading-normal">
                        <div className="space-y-1">
                          <h5 className="font-bold text-slate-400 tracking-wide uppercase text-[10px]">매칭 매커니즘 / 임상 근거</h5>
                          <p className="text-slate-655 font-semibold leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                            {cleanInternalCodes(resultDetails[resultId]?.reason || algorithm.results[resultId]?.reason)}
                          </p>
                        </div>

                        {resultDetails[resultId]?.environment && (
                          <div className="space-y-1">
                            <h5 className="font-bold text-slate-400 tracking-wide uppercase text-[10px]">설치 및 권장 주거 환경</h5>
                            <p className="text-slate-755 font-extrabold">
                              ✓ {resultDetails[resultId].environment}
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  );
                })()}

                {/* Action buttons */}
                <div className="space-y-3 pt-6 border-t border-slate-100 mt-6 shrink-0 flex flex-col">
                  {onLearnMore && (
                    <button
                      onClick={() => onLearnMore(resultId)}
                      className={`w-full rounded-xl bg-primary hover:bg-primary-dark text-white font-extrabold shadow-md transition-all flex items-center justify-center gap-1.5 hover:shadow-lg scale-[1.01] cursor-pointer ${
                        uiMode === 'simple' ? 'py-5 text-base sm:text-lg' : 'py-3.5 text-sm'
                      }`}
                    >
                      <span>돌봄로봇 정보 더 알아보기</span>
                      <ArrowRight className={uiMode === 'simple' ? 'w-5 h-5' : 'w-4 h-4'} />
                    </button>
                  )}
                  <button
                    onClick={handleReset}
                    className={`w-full rounded-xl border border-slate-200 text-slate-505 hover:bg-slate-55 hover:text-slate-700 font-bold transition-colors cursor-pointer ${
                      uiMode === 'simple' ? 'py-4 text-base' : 'py-3 text-sm'
                    }`}
                  >
                    새로하기
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Active Question Card */
            currentQuestion && (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6 animate-fade-in flex flex-col text-left">
                {/* Header indicators */}
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <span className={`font-black text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20 inline-block shrink-0 ${
                    uiMode === 'simple' ? 'text-xs sm:text-sm' : 'text-[10px]'
                  }`}>
                    STEP {history.length + 1}
                  </span>
                  <span className={`font-bold text-slate-400 ${
                    uiMode === 'simple' ? 'text-sm' : 'text-xs'
                  }`}>
                    평가 세부 문항
                  </span>
                </div>

                {/* Question title & description */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className={`font-black text-slate-800 leading-snug flex-1 ${
                      uiMode === 'simple' ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-xl sm:text-2xl'
                    }`}>
                      {getDisplayText(currentQuestion, 'title', uiMode)}
                    </h3>
                    <button
                      onClick={() => {
                        setSelectedGuideQuestionId(currentQuestion.id);
                        setIsHelpModalOpen(true);
                      }}
                      className="p-1.5 rounded-full hover:bg-slate-105 text-slate-405 hover:text-slate-700 transition-colors cursor-pointer shrink-0"
                      title="평가 기준 도움말 보기"
                    >
                      <HelpCircle className={uiMode === 'simple' ? 'w-7 h-7' : 'w-5 h-5'} />
                    </button>
                  </div>
                  {getDisplayText(currentQuestion, 'description', uiMode) && (
                    <p className={`leading-relaxed font-bold bg-slate-55 p-4 rounded-xl border border-slate-100/60 ${
                      uiMode === 'simple' ? 'text-base sm:text-lg md:text-xl' : 'text-sm text-slate-550'
                    }`}>
                      💡 {getDisplayText(currentQuestion, 'description', uiMode)}
                    </p>
                  )}
                </div>

                {/* Options list inside main area */}
                {currentQuestion.type === 'single' ? (
                  <div className="space-y-3">
                    {currentQuestion.options.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSingleSelect(currentQuestion.id, opt.value)}
                        className={`w-full text-left rounded-xl border border-slate-200 hover:border-primary hover:bg-primary/5 transition-all flex justify-between items-center group font-black text-slate-755 bg-white cursor-pointer shadow-sm hover:shadow ${
                          uiMode === 'simple' ? 'text-lg sm:text-xl md:text-2xl p-5 sm:p-6' : 'text-sm sm:text-base p-4'
                        }`}
                      >
                        <span>{getDisplayText(opt, 'text', uiMode)}</span>
                        <div className={`rounded-full border-slate-300 border-2 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all shrink-0 ${
                          uiMode === 'simple' ? 'w-7 h-7' : 'w-5 h-5'
                        }`}>
                          <div className={`rounded-full bg-white scale-0 group-hover:scale-100 transition-transform ${
                            uiMode === 'simple' ? 'w-3 h-3' : 'w-2.5 h-2.5'
                          }`} />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      {currentQuestion.options.map((opt) => {
                        const isChecked = tempMultiSelect.includes(opt.value);
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleMultiToggle(opt.value)}
                            className={`text-left rounded-xl border transition-all flex items-center gap-3 font-black cursor-pointer shadow-sm ${
                              isChecked
                                ? 'border-primary bg-primary/5 text-primary font-black'
                                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-350'
                            } ${
                              uiMode === 'simple' ? 'text-lg sm:text-xl md:text-2xl p-5 sm:p-6' : 'text-sm sm:text-base p-4'
                            }`}
                          >
                            <div className={`rounded flex items-center justify-center border-2 transition-all shrink-0 ${
                              isChecked ? 'border-primary bg-primary text-white' : 'border-slate-300 bg-white'
                            } ${
                              uiMode === 'simple' ? 'w-7 h-7' : 'w-5 h-5'
                            }`}>
                              {isChecked && <Check className={`stroke-[3] ${uiMode === 'simple' ? 'w-4 h-4' : 'w-3.5 h-3.5'}`} />}
                            </div>
                            <span className="leading-snug">{getDisplayText(opt, 'text', uiMode)}</span>
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => handleMultiSubmit(currentQuestion.id)}
                      disabled={tempMultiSelect.length === 0}
                      className={`w-full rounded-xl bg-primary text-white font-extrabold hover:bg-primary-dark transition-colors flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
                        uiMode === 'simple' ? 'py-5 text-lg sm:text-xl' : 'py-3.5 text-sm'
                      }`}
                    >
                      <span>선택 완료</span>
                      <ArrowRight className={uiMode === 'simple' ? 'w-5 h-5' : 'w-4 h-4'} />
                    </button>
                  </div>
                )}

                {/* Back / Reset Controls */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-xs">
                  {history.length > 0 ? (
                    <button
                      onClick={handlePrevQuestion}
                      className={`px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-505 font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        uiMode === 'simple' ? 'text-base' : 'text-xs'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>이전 단계</span>
                    </button>
                  ) : <div />}
                  <button
                    onClick={handleReset}
                    className={`px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-405 hover:text-slate-655 transition-all font-bold cursor-pointer ${
                      uiMode === 'simple' ? 'text-base' : 'text-xs'
                    }`}
                  >
                    처음부터 다시하기
                  </button>
                </div>
              </div>
            )
          )}

          {/* Current Path Timeline (History list) */}
          {history.length > 0 && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3 text-left">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">자가진단 진행 과정</h4>
              <div className="relative border-l border-slate-200 ml-2.5 pl-4 space-y-4 py-2">
                {history.map((histId, index) => {
                  const q = algorithm.questions[histId];
                  if (!q) return null;
                  const ansVal = answers[histId];
                  const matchedOpt = q.options.find(o => o.value === ansVal);
                  return (
                    <div key={histId} className="relative text-xs">
                      {/* Node point marker */}
                      <span className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-primary border-2 border-white ring-2 ring-primary/20 inline-block" />
                      <div className="text-slate-655 font-bold leading-normal">
                        <span className="text-slate-400 mr-1.5 font-black">STEP {index + 1}:</span>
                        <span className="text-slate-800">{getDisplayText(q, 'title', uiMode)}</span>
                        <div className="mt-1 text-primary font-black flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>선택한 답변: {matchedOpt ? getDisplayText(matchedOpt, 'text', uiMode) : (Array.isArray(ansVal) ? `${ansVal.length}개 조건` : '')}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Dynamic Detail Panel (Guide info) */}
        <div className="hidden">
          {selectedGuide ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 animate-fade-in text-left">
              <div className="flex items-center gap-1.5 text-primary">
                <Info className="w-4 h-4 shrink-0" />
                <h4 className="font-extrabold text-sm leading-tight">
                  {selectedGuide.title}
                </h4>
              </div>
              
              <p className="text-xs text-slate-655 leading-relaxed font-semibold">
                {selectedGuide.content}
              </p>

              <div className="border-t border-slate-100 pt-3 space-y-2">
                {selectedGuide.details.map((detail, idx) => (
                  <div key={idx} className="text-[11px] leading-relaxed font-medium">
                    <strong className="text-slate-700 block mb-0.5">{detail.key}</strong>
                    <span className="text-slate-400 block">{detail.val}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm">
              <p className="text-xs text-slate-400 font-semibold">알고리즘 단계를 선택하시면 임상 평가 기준과 설명이 여기에 표시됩니다.</p>
            </div>
          )}
        </div>

      </div>

      {/* Elegant Help/Detail Modal */}
      {isHelpModalOpen && (selectedGuide || selectedResultInfo) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in text-left">
          <div 
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col text-left animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                {selectedResultInfo ? <Bot className="w-5 h-5 text-blue-400" /> : <Info className="w-5 h-5 text-blue-400" />}
                <span className="text-sm font-extrabold">
                  {selectedResultInfo ? '추천 돌봄로봇 상세 안내' : '평가 기준 및 설명'}
                </span>
              </div>
              <button 
                onClick={() => setIsHelpModalOpen(false)}
                className="text-white/70 hover:text-white text-xl font-bold cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh] space-y-5">
              {selectedResultInfo ? (
                /* Result Robot Details */
                <div className="space-y-4">
                  <div className="text-center pb-4 border-b border-slate-100 space-y-2">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">
                      {selectedResultInfo.deviceName}
                    </h3>
                  </div>
                  
                   {selectedResultInfo.image ? (
                    <div className="relative mx-auto w-36 h-36 rounded-2xl bg-slate-55 border border-slate-100 flex items-center justify-center p-2">
                      <img
                        src={selectedResultInfo.image}
                        alt={selectedResultInfo.deviceName}
                        className="object-contain max-h-full"
                      />
                    </div>
                  ) : (
                    <div className="mx-auto w-44 h-44 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center p-3 text-slate-400 gap-2">
                      <Bot className="w-6 h-6 text-slate-300" />
                      <span className="text-xs font-black text-slate-550">이미지 준비 중</span>
                      {(selectedResultInfo as any).intendedImage && (
                        <div className="text-[10px] font-mono font-bold text-slate-500 bg-white px-2.5 py-1.5 rounded border border-slate-200/80 leading-normal max-w-full text-center break-all">
                          파일명: <span className="text-blue-600">{(selectedResultInfo as any).intendedImage.split('/').pop()}</span>
                          <div className="text-[9px] text-slate-400 font-normal mt-0.5">
                            경로: {(selectedResultInfo as any).intendedImage}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                   <div className="space-y-3 text-sm sm:text-base">
                    <h5 className="font-bold text-slate-400 tracking-wide uppercase text-xs sm:text-sm">적용 상황</h5>
                    <p className="text-slate-800 font-extrabold leading-relaxed text-base sm:text-lg">
                      {selectedResultInfo.whenToUse}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100 text-sm sm:text-base">
                    <h5 className="font-bold text-amber-805 tracking-wide uppercase text-xs sm:text-sm flex items-center gap-1 font-black">
                      주의 및 확인할 점
                    </h5>
                    <ul className="space-y-1.5 text-slate-800 font-bold list-disc pl-5 leading-relaxed text-base sm:text-lg">
                      {selectedResultInfo.precautions.map((pre, idx) => (
                        <li key={idx}>{pre}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : selectedGuide ? (
                /* Question Guide Details */
                <div className="space-y-4">
                  <div className="pb-3 border-b border-slate-100">
                    <h3 className="text-lg font-black text-slate-800">
                      {selectedGuide.title}
                    </h3>
                  </div>
                  
                  <p className="text-xs text-slate-655 leading-relaxed font-bold bg-slate-55 p-4 rounded-xl border border-slate-100">
                    💡 {selectedGuide.content}
                  </p>

                  <div className="space-y-3 pt-2">
                    <h5 className="font-bold text-slate-400 tracking-wide uppercase text-[10px]">등급별 판정 기준</h5>
                    <div className="space-y-3.5 animate-fade-in">
                      {selectedGuide.details.map((detail, idx) => (
                        <div key={idx} className="text-xs leading-relaxed font-medium bg-slate-50/50 p-3 rounded-xl border border-slate-100/60">
                          <strong className="text-slate-800 block mb-1 font-bold">{detail.key}</strong>
                          <span className="text-slate-550 block leading-normal">{detail.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Criteria table popup rendering */}
                  <div className="pt-4 border-t border-slate-100">
                    <h5 className="font-bold text-slate-400 tracking-wide uppercase text-[10px] mb-2">판단 기준표</h5>
                    {renderCriteriaTable(algorithm.id, selectedGuideQuestionId || '')}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Footer */}
            <div className="bg-slate-55 px-6 py-4 flex justify-end border-t border-slate-100">
              <button
                onClick={() => setIsHelpModalOpen(false)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow transition-colors cursor-pointer"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
