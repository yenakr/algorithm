import React from 'react';
import { ArrowRight, HelpCircle } from 'lucide-react';

interface NextStepCTAProps {
  onClick: () => void;
  label: string;
  subLabel?: string;
}

export default function NextStepCTA({ onClick, label, subLabel }: NextStepCTAProps) {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-200/50 rounded-3xl p-8 text-center space-y-5 max-w-3xl mx-auto shadow-sm">
      <div className="space-y-1.5">
        <h4 className="text-xl font-black text-indigo-900 flex items-center justify-center gap-1.5">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          {label}
        </h4>
        {subLabel && (
          <p className="text-sm font-bold text-indigo-600/80">
            {subLabel}
          </p>
        )}
      </div>

      <button
        onClick={onClick}
        className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg sm:text-xl shadow-lg hover:shadow-indigo-500/20 transition-all flex items-center justify-center gap-3 cursor-pointer mx-auto group transform hover:-translate-y-0.5 active:translate-y-0 duration-200"
      >
        <span>질문에 답하고 추천받기</span>
        <ArrowRight className="w-5 h-5 stroke-[3.5] group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
