import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, ChevronDown, ChevronUp, ThumbsUp, Target, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import CareSceneIllustration, { IllustrationType } from './CareSceneIllustration';
import HighlightText from './HighlightText';

interface SimpleRobotCardProps {
  id: string;
  name: string;
  category: string;
  description: string;
  whenToUse: string;
  precautions: string[];
  illustrationType: IllustrationType;
  // Expert details for collapsible drawer
  pros: string[];
  target: string;
  imgPath: string;
}

export default function SimpleRobotCard({
  id,
  name,
  category,
  description,
  whenToUse,
  precautions,
  illustrationType,
  pros,
  target,
  imgPath
}: SimpleRobotCardProps) {
  const [isDetailedOpen, setIsDetailedOpen] = useState(false);

  return (
    <div 
      id={`device-${id}`} 
      className="bg-white rounded-3xl border-2 border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow duration-200 text-left"
    >
      <div className="p-6 sm:p-8 space-y-6">
        {/* Illustration Banner */}
        <div className="w-full shrink-0">
          <CareSceneIllustration type={illustrationType} size="md" />
        </div>

        {/* Robot Name & Category Header */}
        <div className="space-y-2">
          <span className="text-[10px] font-black px-3 py-1 rounded bg-indigo-50 border border-indigo-150 text-indigo-700 uppercase tracking-wider">
            {category}
          </span>
          <h3 className="text-2xl font-black text-slate-800 leading-snug">
            <HighlightText text={name} type="robot" />
          </h3>
        </div>

        {/* Core Description */}
        <p className="text-base sm:text-lg text-slate-650 leading-relaxed font-bold border-t border-slate-100 pt-4">
          <HighlightText text={description} />
        </p>

        {/* Usage & Safety Details Grid */}
        <div className="grid grid-cols-1 gap-5 pt-2">
          {/* When to use */}
          <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 space-y-2">
            <h4 className="text-sm font-black text-slate-700 flex items-center gap-1.5 uppercase">
              <ShieldCheck className="w-4.5 h-4.5 text-indigo-550 shrink-0" />
              이럴 때 사용해요
            </h4>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-semibold">
              <HighlightText text={whenToUse} />
            </p>
          </div>

          {/* Precautions */}
          <div className="bg-orange-50/50 border border-orange-150 rounded-2xl p-5 space-y-2">
            <h4 className="text-xs font-bold text-orange-850 flex items-center gap-1.5 uppercase font-extrabold">
              <AlertTriangle className="w-4.5 h-4.5 text-orange-600 shrink-0" />
              조심하세요 (주의사항)
            </h4>
            <ul className="space-y-1.5 text-sm text-slate-600 font-semibold list-disc pl-4 leading-relaxed">
              {precautions.map((pre, idx) => (
                <li key={idx}>
                  <HighlightText text={pre} type="warning" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Collapsible Expert Details Drawer */}
      <div className="border-t border-slate-200">
        <button
          onClick={() => setIsDetailedOpen(!isDetailedOpen)}
          className="w-full py-4 px-6 bg-slate-50 hover:bg-slate-100/80 font-extrabold text-sm text-slate-600 flex justify-between items-center transition-colors cursor-pointer select-none"
        >
          <span>전문 연구/추천 상세 기준 보기</span>
          {isDetailedOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isDetailedOpen && (
          <div className="p-6 bg-slate-50/30 border-t border-slate-150 space-y-6 animate-fade-in text-sm font-semibold text-slate-500">
            {/* Image & Target */}
            {imgPath && (
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start border-b border-slate-100 pb-5">
                <div className="relative w-28 h-28 shrink-0 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-2">
                  <Image
                    src={imgPath}
                    alt={name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <h4 className="text-xs font-black text-slate-450 uppercase flex items-center justify-center sm:justify-start gap-1">
                    <Target className="w-3.5 h-3.5" />
                    추천 세부 대상
                  </h4>
                  <p className="text-xs text-slate-600 font-bold leading-normal">{target}</p>
                </div>
              </div>
            )}

            {/* Pros List */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-emerald-700 flex items-center gap-1.5 uppercase">
                <ThumbsUp className="w-3.5 h-3.5" />
                상세 장점
              </h4>
              <ul className="space-y-1 text-xs text-emerald-800 list-disc pl-4 leading-relaxed font-semibold">
                {pros.map((pro, idx) => (
                  <li key={idx}>{pro}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
