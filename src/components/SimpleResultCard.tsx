import React from 'react';
import { HelpCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import HighlightText from './HighlightText';

interface SimpleResultCardProps {
  robotName: string;            // 공식 돌봄로봇 명칭 (예: "이송보조장비")
  shortDescription: string;    // 한 줄 설명 (simpleDescription 또는 description)
  reason: string;              // 왜 추천하나요?
  whenToUse: string;           // 이럴 때 사용해요
  precautions: string[];       // 조심하세요
}

export default function SimpleResultCard({
  robotName,
  shortDescription,
  reason,
  whenToUse,
  precautions
}: SimpleResultCardProps) {
  return (
    <div className="flex flex-col gap-4 text-left w-full max-w-2xl mx-auto">

      {/* 1. 추천 돌봄로봇 이름 + 짧은 설명 */}
      <div className="bg-indigo-50/50 rounded-2xl p-6 sm:p-8 space-y-2.5">
        <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">
          추천 돌봄로봇
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-indigo-950 leading-tight">
          {robotName}
        </h2>
        {shortDescription && (
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium pt-1">
            {shortDescription}
          </p>
        )}
      </div>

      {/* 2. 왜 추천하나요? */}
      <div className="bg-slate-50/50 rounded-2xl p-6 sm:p-8 space-y-2.5">
        <h4 className="text-base font-black text-amber-800 flex items-center gap-1.5">
          <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
          왜 추천하나요?
        </h4>
        <p className="text-lg text-slate-700 leading-relaxed font-semibold">
          <HighlightText text={reason} />
        </p>
      </div>

      {/* 3. 이럴 때 사용해요 */}
      {whenToUse && (
        <div className="bg-blue-50/30 rounded-2xl p-6 sm:p-8 space-y-2.5">
          <h4 className="text-base font-black text-indigo-800 flex items-center gap-1.5">
            <HelpCircle className="w-5 h-5 text-indigo-500 shrink-0" />
            이럴 때 사용해요
          </h4>
          <p className="text-lg text-slate-700 leading-relaxed font-semibold">
            <HighlightText text={whenToUse} />
          </p>
        </div>
      )}

      {/* 4. 조심하세요 */}
      {precautions && precautions.length > 0 && (
        <div className="bg-orange-50/50 rounded-2xl p-6 sm:p-8 space-y-3.5">
          <h4 className="text-base font-black text-orange-950 flex items-center gap-1.5">
            <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0" />
            조심하세요
          </h4>
          <ul className="space-y-2.5 text-base text-slate-700 font-semibold list-none leading-relaxed">
            {precautions.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                <HighlightText text={tip} type="warning" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
