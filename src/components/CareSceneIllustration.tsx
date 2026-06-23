import React from 'react';
import { 
  Bed, Accessibility, Users, Shield, ArrowRight, AlertTriangle, 
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

interface CareSceneIllustrationProps {
  type: IllustrationType;
  size?: 'sm' | 'md' | 'lg';
}

export default function CareSceneIllustration({ type, size = 'md' }: CareSceneIllustrationProps) {
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

  const renderScene = () => {
    switch (type) {
      case 'bed-to-wheelchair':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-blue-50/70 to-indigo-50/70 rounded-2xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex items-end justify-between px-10 pb-4 relative z-10">
              <div className="flex flex-col items-center gap-1.5">
                <div className="p-3 bg-blue-600 text-white rounded-xl shadow-md border border-blue-500 transform hover:scale-105 transition-transform">
                  <Bed className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black text-blue-700 bg-blue-50 border border-blue-200/50 px-2 py-0.5 rounded shadow-sm">침대</span>
              </div>
              
              <div className="flex flex-col items-center gap-1 pb-3">
                <div className="flex items-center text-indigo-600 animate-pulse">
                  <div className="w-10 h-0.5 bg-indigo-300" />
                  <ArrowRight className="-ml-2 w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-[9px] font-black text-slate-400">이동</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-md border border-indigo-500 transform hover:scale-105 transition-transform">
                  <Accessibility className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black text-indigo-700 bg-indigo-50 border border-indigo-200/50 px-2 py-0.5 rounded shadow-sm">휠체어</span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-slate-300/80" />
          </div>
        );

      case 'wheelchair-to-bed':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-indigo-50/70 to-blue-50/70 rounded-2xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex items-end justify-between px-10 pb-4 relative z-10">
              <div className="flex flex-col items-center gap-1.5">
                <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-md border border-indigo-500 transform hover:scale-105 transition-transform">
                  <Accessibility className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black text-indigo-700 bg-indigo-50 border border-indigo-200/50 px-2 py-0.5 rounded shadow-sm">휠체어</span>
              </div>

              <div className="flex flex-col items-center gap-1 pb-3">
                <div className="flex items-center text-blue-600">
                  <div className="w-10 h-0.5 bg-blue-300" />
                  <ArrowRight className="-ml-2 w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-[9px] font-black text-slate-400">침대로 이동</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <div className="p-3 bg-blue-600 text-white rounded-xl shadow-md border border-blue-500 transform hover:scale-105 transition-transform">
                  <Bed className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black text-blue-700 bg-blue-50 border border-blue-200/50 px-2 py-0.5 rounded shadow-sm">침대</span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-slate-300/80" />
          </div>
        );

      case 'wheelchair-to-toilet':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-indigo-50/70 to-purple-50/70 rounded-2xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex items-end justify-between px-10 pb-4 relative z-10">
              <div className="flex flex-col items-center gap-1.5">
                <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-md border border-indigo-500 transform hover:scale-105 transition-transform">
                  <Accessibility className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black text-indigo-700 bg-indigo-50 border border-indigo-200/50 px-2 py-0.5 rounded shadow-sm">휠체어</span>
              </div>

              <div className="flex flex-col items-center gap-1 pb-3">
                <div className="flex items-center text-purple-600">
                  <div className="w-10 h-0.5 bg-purple-300" />
                  <ArrowRight className="-ml-2 w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-[9px] font-black text-slate-400">변기로 이동</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <div className="p-3 bg-purple-600 text-white rounded-xl shadow-md border border-purple-500 transform hover:scale-105 transition-transform">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 3h10v4H7z" />
                    <path d="M7 7h10v10a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V7z" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <span className="text-[10px] font-black text-purple-700 bg-purple-50 border border-purple-200/50 px-2 py-0.5 rounded shadow-sm">변기</span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-slate-300/80" />
          </div>
        );

      case 'bed-to-chair':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-blue-50/70 to-emerald-50/70 rounded-2xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex items-end justify-between px-10 pb-4 relative z-10">
              <div className="flex flex-col items-center gap-1.5">
                <div className="p-3 bg-blue-600 text-white rounded-xl shadow-md border border-blue-500 transform hover:scale-105 transition-transform">
                  <Bed className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black text-blue-700 bg-blue-50 border border-blue-200/50 px-2 py-0.5 rounded shadow-sm">침대</span>
              </div>

              <div className="flex flex-col items-center gap-1 pb-3">
                <div className="flex items-center text-emerald-600">
                  <div className="w-10 h-0.5 bg-emerald-300" />
                  <ArrowRight className="-ml-2 w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-[9px] font-black text-slate-400">의자로 이동</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-md border border-emerald-500 transform hover:scale-105 transition-transform">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12h-14v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6z" />
                    <path d="M6 12v-6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6" />
                  </svg>
                </div>
                <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200/50 px-2 py-0.5 rounded shadow-sm">의자</span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-slate-300/80" />
          </div>
        );

      case 'caregiver-assist':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-indigo-50/60 to-pink-50/60 rounded-2xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex items-end justify-center gap-10 pb-4 relative z-10">
              <div className="flex flex-col items-center gap-1.5">
                <div className="p-3 bg-indigo-650 text-white rounded-full shadow-md">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-black text-indigo-700 bg-indigo-50 border border-indigo-150 px-2 py-0.5 rounded">보호자</span>
              </div>

              <div className="p-2.5 bg-white rounded-full shadow-md border border-slate-100 text-rose-500 -mb-1 animate-pulse flex items-center justify-center">
                <Heart className="w-5 h-5 fill-rose-500" />
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <div className="p-3 bg-pink-500 text-white rounded-full shadow-md">
                  <Accessibility className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-black text-pink-700 bg-pink-50 border border-pink-150 px-2 py-0.5 rounded">대상자</span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-slate-250" />
          </div>
        );

      case 'safety-check':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-amber-50/70 to-orange-50/70 rounded-2xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex flex-col items-center justify-center h-full pb-3 relative z-10 gap-2">
              <div className="relative">
                <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-md">
                  <Lock className="w-6 h-6" />
                </div>
                <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full border-2 border-white">
                  <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                </span>
              </div>
              <span className="text-[10px] font-black text-amber-800 bg-white border border-amber-200/80 px-2.5 py-0.8 rounded shadow-sm">바퀴 잠금 확인</span>
            </div>
            <div className="w-full h-1.5 bg-amber-300/60" />
          </div>
        );

      case 'dizzy-warning':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-rose-50/70 to-amber-50/70 rounded-2xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex flex-col items-center justify-center h-full pb-3 relative z-10 gap-2">
              <div className="p-3.5 bg-rose-500 text-white rounded-full shadow-md animate-bounce">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-rose-800 bg-white border border-rose-200/80 px-2.5 py-0.8 rounded shadow-sm">어지러움 즉시 정지</span>
            </div>
            <div className="w-full h-1.5 bg-rose-300/50" />
          </div>
        );

      case 'express-need':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-purple-50/70 to-sky-50/70 rounded-2xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex items-end justify-center gap-6 pb-4 relative z-10">
              <div className="flex flex-col items-center gap-1.5">
                <div className="p-3 bg-purple-600 text-white rounded-2xl shadow-md">
                  <Accessibility className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded shadow-sm">대상자</span>
              </div>
              <div className="bg-white border-2 border-purple-200 rounded-2xl px-3 py-2.5 shadow-md -mb-1 animate-pulse relative">
                <span className="text-[11px] font-black text-purple-800">"화장실 신호"</span>
                <div className="absolute -bottom-1 left-4 w-2.5 h-2.5 bg-white border-r-2 border-b-2 border-purple-200 rotate-45" />
              </div>
            </div>
            <div className="w-full h-1.5 bg-slate-250" />
          </div>
        );

      case 'move-difficulty':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-slate-100 to-amber-50/70 rounded-2xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex items-end justify-center gap-10 pb-4 relative z-10">
              <div className="flex flex-col items-center gap-1.5">
                <div className="p-3 bg-slate-600 text-white rounded-2xl shadow-md">
                  <Footprints className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black text-slate-700 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded shadow-sm">이동 곤란</span>
              </div>
              <div className="p-3 bg-amber-500 text-white rounded-full shadow-md animate-pulse mb-1">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="w-full h-1.5 bg-slate-300" />
          </div>
        );

      case 'bedside-toileting':
        return (
          <div className="relative w-full h-full bg-gradient-to-r from-blue-50/70 to-purple-50/70 rounded-2xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex items-end justify-between px-14 pb-4 relative z-10">
              <div className="flex flex-col items-center gap-1.5">
                <div className="p-2.5 bg-blue-500 text-white rounded-xl shadow-md">
                  <Bed className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded shadow-sm">침상</span>
              </div>
              <div className="w-10 h-px bg-slate-300 pb-2 border-t border-dashed" />
              <div className="flex flex-col items-center gap-1.5">
                <div className="p-2.5 bg-purple-500 text-white rounded-xl shadow-md">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 3h10v4H7z" />
                    <path d="M7 7h10v10a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V7z" />
                  </svg>
                </div>
                <span className="text-[10px] font-black text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded shadow-sm">간이변기</span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-slate-300" />
          </div>
        );

      case 'clean-after':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-emerald-50/70 to-sky-50/70 rounded-2xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex flex-col items-center justify-center h-full pb-3 relative z-10 gap-2">
              <div className="p-3.5 bg-emerald-500 text-white rounded-full shadow-md relative">
                <Droplet className="w-6 h-6 fill-sky-200 text-sky-200" />
                <span className="absolute -bottom-1 -right-1 bg-teal-500 text-white p-0.5 rounded-full border border-white">
                  <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                </span>
              </div>
              <span className="text-[10px] font-black text-emerald-800 bg-white border border-emerald-250 px-2.5 py-0.8 rounded shadow-sm">세정 완료</span>
            </div>
            <div className="w-full h-1.5 bg-emerald-350/50" />
          </div>
        );

      case 'caregiver-prep':
        return (
          <div className="relative w-full h-full bg-gradient-to-r from-teal-50/70 to-sky-50/70 rounded-2xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex items-end justify-center gap-8 pb-4 relative z-10">
              <div className="flex flex-col items-center gap-1.5">
                <div className="p-3 bg-teal-500 text-white rounded-2xl shadow-md">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded shadow-sm">준비 완료</span>
              </div>
              <div className="flex gap-2 pb-1">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-md flex items-center justify-center text-sky-500">
                  <Droplet className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-md flex items-center justify-center text-teal-500 animate-pulse">
                  <Smile className="w-5 h-5" />
                </div>
              </div>
            </div>
            <div className="w-full h-1.5 bg-slate-300" />
          </div>
        );

      case 'privacy-protection':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-indigo-50/70 to-purple-50/70 rounded-2xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex items-end justify-center gap-8 pb-4 relative z-10">
              <div className="flex flex-col items-center gap-1.5">
                <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-md">
                  <EyeOff className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded shadow-sm">프라이버시</span>
              </div>
              <div className="w-2 h-14 bg-purple-300/80 rounded-full border border-purple-400/30" />
              <div className="flex flex-col items-center gap-1.5 opacity-40">
                <div className="p-2.5 bg-slate-400 text-white rounded-xl">
                  <Accessibility className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-semibold text-slate-500">가림막</span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-slate-300" />
          </div>
        );

      case 'hygiene-manage':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-teal-50/70 to-emerald-50/70 rounded-2xl border border-slate-100 overflow-hidden flex flex-col justify-end">
            <div className="flex items-end justify-center gap-10 pb-4 relative z-10">
              <div className="flex flex-col items-center gap-1.5">
                <div className="p-3 bg-teal-500 text-white rounded-2xl shadow-md">
                  <Trash2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded shadow-sm">소독 수거</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white border border-emerald-100 flex items-center justify-center text-emerald-550 shadow-md animate-bounce mb-1">
                <Check className="w-5 h-5 stroke-[3.5]" />
              </div>
            </div>
            <div className="w-full h-1.5 bg-slate-300" />
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
