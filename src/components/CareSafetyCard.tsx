import React from 'react';
import { Check } from 'lucide-react';
import CareSceneIllustration, { IllustrationType } from './CareSceneIllustration';

export interface SafetyItem {
  id: string;
  title: string;
  description: string;
  illustrationType: IllustrationType;
}

interface CareSafetyCardProps {
  items: SafetyItem[];
  checkedItems: Record<string, boolean>;
  onToggle: (id: string) => void;
}

export default function CareSafetyCard({ items, checkedItems, onToggle }: CareSafetyCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
      {items.map((item) => {
        const isChecked = !!checkedItems[item.id];
        return (
          <div
            key={item.id}
            onClick={() => onToggle(item.id)}
            className={`group relative bg-white border-2 rounded-2xl p-5 shadow-sm hover:shadow transition-all duration-300 cursor-pointer flex flex-col justify-between select-none ${isChecked
              ? 'border-emerald-500 ring-2 ring-emerald-500/10 bg-emerald-50/10'
              : 'border-slate-200 hover:border-slate-300'
              }`}
          >
            {/* Checkbox badge in top-right */}
            <div className="absolute top-4 right-4 z-20">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isChecked
                ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                : 'border-slate-350 bg-white group-hover:border-slate-400'
                }`}>
                {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            </div>

            {/* Illustration and text info */}
            <div className="space-y-4">
              <div className="pointer-events-none">
                <CareSceneIllustration
                  type={item.illustrationType}
                  size="sm"
                />
              </div>
              <div className="text-left space-y-1">
                <h4 className="text-sm font-extrabold text-slate-800 leading-snug">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">{item.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

