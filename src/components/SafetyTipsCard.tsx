import React from 'react';
import { ShieldCheck, CheckCircle } from 'lucide-react';
import HighlightText from './HighlightText';

interface SafetyTipsCardProps {
  tips: string[];
  type?: 'transfer' | 'toileting';
}

export default function SafetyTipsCard({ tips, type = 'transfer' }: SafetyTipsCardProps) {
  return (
    <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/60 border-2 border-amber-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-left">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-md">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-xl font-black text-amber-900 leading-none">사용 전 꼭 확인해요</h4>
          <p className="text-xs text-amber-700 font-semibold mt-1">안전사고 예방을 위한 핵심 약속</p>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 bg-white/80 backdrop-blur-sm border border-amber-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <CheckCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <span className="text-sm sm:text-base font-semibold text-slate-700 leading-relaxed">
              <HighlightText text={tip} type="warning" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
