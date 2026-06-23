import React from 'react';
import CareMiniIllustration, { IllustrationType } from './CareMiniIllustration';

interface ScenarioStepItemProps {
  number: number;
  type: IllustrationType;
  title: string;
  description: string;
}

export default function ScenarioStepItem({ number, type, title, description }: ScenarioStepItemProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Left Area: Step Number Badge & Illustration */}
      <div className="w-full sm:w-48 bg-slate-50/50 p-4 shrink-0 border-b sm:border-b-0 sm:border-r border-slate-200 flex flex-col justify-between items-center gap-3">
        {/* Step Number Badge */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-sm">
            {number}
          </span>
          <span className="text-[10px] font-black text-indigo-600 tracking-wider uppercase">안내 단계</span>
        </div>

        {/* Visual Illustration */}
        <div className="w-full">
          <CareMiniIllustration type={type} size="sm" />
        </div>
      </div>

      {/* Right Area: Text Description Info */}
      <div className="flex-1 p-6 flex flex-col justify-center text-left space-y-2">
        <h4 className="text-lg font-black text-slate-800 leading-snug">
          {title}
        </h4>
        <p className="text-sm text-slate-500 font-semibold leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
