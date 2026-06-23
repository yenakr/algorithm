import React from 'react';
import { 
  Bed, Accessibility, Users, Bot, Shield, ArrowRight, AlertTriangle, 
  Lock, Footprints, Droplet, EyeOff, Trash2, Heart, Check, Smile
} from 'lucide-react';

export type IllustrationType = 
  | 'bed-to-wheelchair'
  | 'wheelchair-to-bed'
  | 'wheelchair-to-toilet'
  | 'bed-to-chair'
  | 'caregiver-assist'
  | 'safety-check'
  | 'dizzy-warning'
  | 'express-need'
  | 'move-difficulty'
  | 'bedside-toileting'
  | 'clean-after'
  | 'caregiver-prep'
  | 'privacy-protection'
  | 'hygiene-manage';

interface CareMiniIllustrationProps {
  type: IllustrationType;
  size?: 'sm' | 'md' | 'lg';
}

export default function CareMiniIllustration({ type, size = 'md' }: CareMiniIllustrationProps) {
  
  const getDimensionClass = () => {
    switch (size) {
      case 'sm':
        return 'h-24 w-full';
      case 'lg':
        return 'h-48 w-full';
      case 'md':
      default:
        return 'h-36 w-full';
    }
  };

  // Scene-like rendering
  const renderScene = () => {
    switch (type) {
      case 'bed-to-wheelchair':
        return (
          <div className="relative w-full h-full bg-gradient-to-r from-blue-50/60 to-indigo-50/60 rounded-xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex items-end justify-between px-10 pb-4 relative z-10">
              {/* Bed element */}
              <div className="flex flex-col items-center gap-1">
                <div className="p-2.5 bg-blue-500 text-white rounded-lg shadow-sm border border-blue-400">
                  <Bed className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-extrabold text-blue-600 bg-blue-100/50 px-1.5 py-0.2 rounded">침대</span>
              </div>
              
              {/* Direction Indicator */}
              <div className="flex flex-col items-center gap-0.5 pb-2">
                <div className="flex items-center text-indigo-500 animate-pulse">
                  <div className="w-8 h-0.5 bg-indigo-300" />
                  <ArrowRight className="-ml-1.5 w-3.5 h-3.5" />
                </div>
                <span className="text-[8px] font-bold text-slate-400">이동</span>
              </div>

              {/* Wheelchair element */}
              <div className="flex flex-col items-center gap-1">
                <div className="p-2.5 bg-indigo-500 text-white rounded-lg shadow-sm border border-indigo-400">
                  <Accessibility className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-extrabold text-indigo-600 bg-indigo-100/50 px-1.5 py-0.2 rounded">휠체어</span>
              </div>
            </div>
            {/* Ground Line */}
            <div className="w-full h-1 bg-slate-250" />
          </div>
        );

      case 'wheelchair-to-bed':
        return (
          <div className="relative w-full h-full bg-gradient-to-r from-indigo-50/60 to-blue-50/60 rounded-xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex items-end justify-between px-10 pb-4 relative z-10">
              {/* Wheelchair element */}
              <div className="flex flex-col items-center gap-1">
                <div className="p-2.5 bg-indigo-500 text-white rounded-lg shadow-sm border border-indigo-400">
                  <Accessibility className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-extrabold text-indigo-600 bg-indigo-100/50 px-1.5 py-0.2 rounded">휠체어</span>
              </div>

              {/* Direction Indicator */}
              <div className="flex flex-col items-center gap-0.5 pb-2">
                <div className="flex items-center text-blue-500">
                  <div className="w-8 h-0.5 bg-blue-300" />
                  <ArrowRight className="-ml-1.5 w-3.5 h-3.5" />
                </div>
                <span className="text-[8px] font-bold text-slate-400">복귀</span>
              </div>

              {/* Bed element */}
              <div className="flex flex-col items-center gap-1">
                <div className="p-2.5 bg-blue-500 text-white rounded-lg shadow-sm border border-blue-400">
                  <Bed className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-extrabold text-blue-600 bg-blue-100/50 px-1.5 py-0.2 rounded">침대</span>
              </div>
            </div>
            {/* Ground Line */}
            <div className="w-full h-1 bg-slate-250" />
          </div>
        );

      case 'wheelchair-to-toilet':
        return (
          <div className="relative w-full h-full bg-gradient-to-r from-indigo-50/60 to-purple-50/60 rounded-xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex items-end justify-between px-10 pb-4 relative z-10">
              {/* Wheelchair element */}
              <div className="flex flex-col items-center gap-1">
                <div className="p-2.5 bg-indigo-500 text-white rounded-lg shadow-sm border border-indigo-400">
                  <Accessibility className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-extrabold text-indigo-600 bg-indigo-100/50 px-1.5 py-0.2 rounded">휠체어</span>
              </div>

              {/* Direction Indicator */}
              <div className="flex flex-col items-center gap-0.5 pb-2">
                <div className="flex items-center text-purple-500">
                  <div className="w-8 h-0.5 bg-purple-300" />
                  <ArrowRight className="-ml-1.5 w-3.5 h-3.5" />
                </div>
                <span className="text-[8px] font-bold text-slate-400">이동</span>
              </div>

              {/* Toilet element */}
              <div className="flex flex-col items-center gap-1">
                <div className="p-2.5 bg-purple-500 text-white rounded-lg shadow-sm border border-purple-400">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 3h10v4H7z" />
                    <path d="M7 7h10v10a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V7z" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <span className="text-[9px] font-extrabold text-purple-600 bg-purple-100/50 px-1.5 py-0.2 rounded">변기</span>
              </div>
            </div>
            {/* Ground Line */}
            <div className="w-full h-1 bg-slate-250" />
          </div>
        );

      case 'bed-to-chair':
        return (
          <div className="relative w-full h-full bg-gradient-to-r from-blue-50/60 to-emerald-50/60 rounded-xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex items-end justify-between px-10 pb-4 relative z-10">
              {/* Bed element */}
              <div className="flex flex-col items-center gap-1">
                <div className="p-2.5 bg-blue-500 text-white rounded-lg shadow-sm border border-blue-400">
                  <Bed className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-extrabold text-blue-600 bg-blue-100/50 px-1.5 py-0.2 rounded">침대</span>
              </div>

              {/* Direction Indicator */}
              <div className="flex flex-col items-center gap-0.5 pb-2">
                <div className="flex items-center text-emerald-500">
                  <div className="w-8 h-0.5 bg-emerald-300" />
                  <ArrowRight className="-ml-1.5 w-3.5 h-3.5" />
                </div>
                <span className="text-[8px] font-bold text-slate-400">이동</span>
              </div>

              {/* Chair element */}
              <div className="flex flex-col items-center gap-1">
                <div className="p-2.5 bg-emerald-500 text-white rounded-lg shadow-sm border border-emerald-400">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12h-14v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6z" />
                    <path d="M6 12v-6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6" />
                  </svg>
                </div>
                <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-100/50 px-1.5 py-0.2 rounded">의자</span>
              </div>
            </div>
            {/* Ground Line */}
            <div className="w-full h-1 bg-slate-250" />
          </div>
        );

      case 'caregiver-assist':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-indigo-50/50 to-pink-50/50 rounded-xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex items-end justify-center gap-8 pb-4 relative z-10">
              {/* Caregiver helper */}
              <div className="flex flex-col items-center gap-1">
                <div className="p-2.5 bg-indigo-500 text-white rounded-full shadow-sm">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-extrabold text-indigo-650 bg-indigo-100/50 px-1.5 py-0.2 rounded">보호자</span>
              </div>

              {/* Heart connection badge */}
              <div className="p-2 bg-white rounded-full shadow border border-slate-100 text-rose-500 -mb-1 animate-pulse">
                <Heart className="w-4 h-4 fill-rose-500" />
              </div>

              {/* Recipient */}
              <div className="flex flex-col items-center gap-1">
                <div className="p-2.5 bg-pink-500 text-white rounded-full shadow-sm">
                  <Accessibility className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-extrabold text-pink-650 bg-pink-100/50 px-1.5 py-0.2 rounded">대상자</span>
              </div>
            </div>
            {/* Ground Line */}
            <div className="w-full h-1 bg-slate-200" />
          </div>
        );

      case 'safety-check':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-amber-50/60 to-orange-50/60 rounded-xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex flex-col items-center justify-center h-full pb-3 relative z-10 gap-2">
              <div className="relative">
                <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-md">
                  <Lock className="w-6 h-6" />
                </div>
                <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full border-2 border-white">
                  <Check className="w-3 h-3 stroke-[3.5]" />
                </span>
              </div>
              <span className="text-[9px] font-black text-amber-700 bg-white border border-amber-200 px-2 py-0.5 rounded shadow-sm">바퀴 고정 완료</span>
            </div>
            {/* Ground Line */}
            <div className="w-full h-1 bg-amber-200/60" />
          </div>
        );

      case 'dizzy-warning':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-rose-50/60 to-amber-50/60 rounded-xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex flex-col items-center justify-center h-full pb-3 relative z-10 gap-2">
              <div className="p-3 bg-rose-500 text-white rounded-2xl shadow-md animate-bounce">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <span className="text-[9px] font-black text-rose-700 bg-white border border-rose-200 px-2 py-0.5 rounded shadow-sm">상태 체크 (어지러움/통증)</span>
            </div>
            {/* Ground Line */}
            <div className="w-full h-1 bg-rose-200/50" />
          </div>
        );

      case 'express-need':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-purple-50/50 to-sky-50/50 rounded-xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex items-end justify-center gap-6 pb-4 relative z-10">
              <div className="flex flex-col items-center gap-1">
                <div className="p-2.5 bg-purple-500 text-white rounded-xl shadow-sm">
                  <Accessibility className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-extrabold text-purple-600 bg-purple-100/50 px-1.5 py-0.2 rounded">대상자</span>
              </div>
              <div className="bg-white border-2 border-purple-200 rounded-2xl p-2 shadow-sm -mb-1 animate-pulse relative">
                <span className="text-[10px] font-black text-purple-700">"화장실 갈래요"</span>
                <div className="absolute -bottom-1 left-3 w-2.5 h-2.5 bg-white border-r-2 border-b-2 border-purple-200 rotate-45" />
              </div>
            </div>
            {/* Ground Line */}
            <div className="w-full h-1 bg-slate-200" />
          </div>
        );

      case 'move-difficulty':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-slate-100 to-amber-50/60 rounded-xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex items-end justify-center gap-8 pb-4 relative z-10">
              <div className="flex flex-col items-center gap-1">
                <div className="p-2.5 bg-slate-650 text-white rounded-xl shadow-sm">
                  <Footprints className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-extrabold text-slate-650 bg-slate-100 px-1.5 py-0.2 rounded">이동 곤란</span>
              </div>
              <div className="p-2.5 bg-amber-500 text-white rounded-full shadow-sm animate-pulse mb-1">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            {/* Ground Line */}
            <div className="w-full h-1 bg-slate-250" />
          </div>
        );

      case 'bedside-toileting':
        return (
          <div className="relative w-full h-full bg-gradient-to-r from-blue-50/60 to-purple-50/60 rounded-xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex items-end justify-between px-12 pb-4 relative z-10">
              <div className="flex flex-col items-center gap-1">
                <div className="p-2 bg-blue-500 text-white rounded-lg shadow-sm">
                  <Bed className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-extrabold text-blue-600 bg-blue-100/50 px-1.5 py-0.2 rounded">침상</span>
              </div>
              <div className="w-6 h-px bg-slate-300 pb-2 border-t border-dashed" />
              <div className="flex flex-col items-center gap-1">
                <div className="p-2.5 bg-purple-500 text-white rounded-lg shadow-sm">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 3h10v4H7z" />
                    <path d="M7 7h10v10a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V7z" />
                  </svg>
                </div>
                <span className="text-[9px] font-extrabold text-purple-600 bg-purple-100/50 px-1.5 py-0.2 rounded">간이변기</span>
              </div>
            </div>
            {/* Ground Line */}
            <div className="w-full h-1 bg-slate-250" />
          </div>
        );

      case 'clean-after':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-emerald-50/60 to-sky-50/60 rounded-xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex flex-col items-center justify-center h-full pb-3 relative z-10 gap-2">
              <div className="p-3 bg-emerald-500 text-white rounded-full shadow-md relative">
                <Droplet className="w-6 h-6 fill-sky-200 text-sky-200" />
                <span className="absolute -bottom-1 -right-1 bg-teal-500 text-white p-0.5 rounded-full border border-white">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
              </div>
              <span className="text-[9px] font-black text-emerald-700 bg-white border border-emerald-250 px-2 py-0.5 rounded shadow-sm">위생 세정 완료</span>
            </div>
            {/* Ground Line */}
            <div className="w-full h-1 bg-emerald-200/50" />
          </div>
        );

      case 'caregiver-prep':
        return (
          <div className="relative w-full h-full bg-gradient-to-r from-teal-50/60 to-sky-50/60 rounded-xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex items-end justify-center gap-6 pb-4 relative z-10">
              <div className="flex flex-col items-center gap-1">
                <div className="p-2.5 bg-teal-500 text-white rounded-xl shadow-sm">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-extrabold text-teal-600 bg-teal-100/50 px-1.5 py-0.2 rounded">보호자 준비</span>
              </div>
              <div className="flex gap-1.5 pb-1">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center text-sky-500">
                  <Droplet className="w-4 h-4 text-sky-500" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center text-teal-500">
                  <Smile className="w-4 h-4 text-teal-500" />
                </div>
              </div>
            </div>
            {/* Ground Line */}
            <div className="w-full h-1 bg-slate-250" />
          </div>
        );

      case 'privacy-protection':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-indigo-50/60 to-purple-50/60 rounded-xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex items-end justify-center gap-6 pb-4 relative z-10">
              <div className="flex flex-col items-center gap-1">
                <div className="p-2.5 bg-indigo-500 text-white rounded-xl shadow-sm">
                  <EyeOff className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-extrabold text-indigo-650 bg-indigo-100/50 px-1.5 py-0.2 rounded">프라이버시</span>
              </div>
              <div className="w-1.5 h-12 bg-purple-300/80 rounded-full border border-purple-400/30" />
              <div className="flex flex-col items-center gap-1 opacity-40">
                <div className="p-2 bg-slate-400 text-white rounded-xl">
                  <Accessibility className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-semibold text-slate-500">가림막</span>
              </div>
            </div>
            {/* Ground Line */}
            <div className="w-full h-1 bg-slate-250" />
          </div>
        );

      case 'hygiene-manage':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-teal-50/60 to-emerald-50/60 rounded-xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex items-end justify-center gap-8 pb-4 relative z-10">
              <div className="flex flex-col items-center gap-1">
                <div className="p-2.5 bg-teal-500 text-white rounded-xl shadow-sm">
                  <Trash2 className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-extrabold text-teal-650 bg-teal-100/50 px-1.5 py-0.2 rounded">폐기 수거</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white border border-emerald-100 flex items-center justify-center text-emerald-500 animate-pulse mb-1">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            </div>
            {/* Ground Line */}
            <div className="w-full h-1 bg-slate-250" />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`${getDimensionClass()} shrink-0`}>
      {renderScene()}
    </div>
  );
}
