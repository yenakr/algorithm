import React from 'react';
import { 
  Bed, Accessibility, Users, Bot, Shield, ArrowRight, AlertTriangle, 
  Lock, Footprints, Scale, Droplet, EyeOff, Trash2, Heart, RefreshCw, Check
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

interface CareIllustrationCardProps {
  type: IllustrationType;
  title: string;
  description: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function CareIllustrationCard({ type, title, description, size = 'md' }: CareIllustrationCardProps) {
  
  // Render visual graphic based on type
  const renderGraphic = () => {
    switch (type) {
      case 'bed-to-wheelchair':
        return (
          <div className="relative w-full h-full flex items-center justify-between px-8 bg-gradient-to-r from-blue-50/50 via-slate-50 to-indigo-50/50 rounded-xl border border-slate-100 overflow-hidden">
            <div className="flex flex-col items-center gap-1.5 z-10">
              <div className="p-3 bg-blue-100/80 rounded-xl text-blue-600 shadow-sm"><Bed className="w-7 h-7" /></div>
              <span className="text-[10px] font-extrabold text-blue-600">침대</span>
            </div>
            <div className="flex flex-col items-center gap-1 z-10">
              <ArrowRight className="w-5 h-5 text-slate-400 animate-pulse" />
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">이동</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 z-10">
              <div className="p-3 bg-indigo-100/80 rounded-xl text-indigo-600 shadow-sm"><Accessibility className="w-7 h-7" /></div>
              <span className="text-[10px] font-extrabold text-indigo-600">휠체어</span>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(241,245,249,0.5)_0%,transparent_70%)]" />
          </div>
        );
      case 'wheelchair-to-bed':
        return (
          <div className="relative w-full h-full flex items-center justify-between px-8 bg-gradient-to-r from-indigo-50/50 via-slate-50 to-blue-50/50 rounded-xl border border-slate-100 overflow-hidden">
            <div className="flex flex-col items-center gap-1.5 z-10">
              <div className="p-3 bg-indigo-100/80 rounded-xl text-indigo-600 shadow-sm"><Accessibility className="w-7 h-7" /></div>
              <span className="text-[10px] font-extrabold text-indigo-600">휠체어</span>
            </div>
            <div className="flex flex-col items-center gap-1 z-10">
              <ArrowRight className="w-5 h-5 text-slate-400" />
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">이동</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 z-10">
              <div className="p-3 bg-blue-100/80 rounded-xl text-blue-600 shadow-sm"><Bed className="w-7 h-7" /></div>
              <span className="text-[10px] font-extrabold text-blue-600">침대</span>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(241,245,249,0.5)_0%,transparent_70%)]" />
          </div>
        );
      case 'wheelchair-to-toilet':
        return (
          <div className="relative w-full h-full flex items-center justify-between px-8 bg-gradient-to-r from-indigo-50/50 via-slate-50 to-purple-50/50 rounded-xl border border-slate-100 overflow-hidden">
            <div className="flex flex-col items-center gap-1.5 z-10">
              <div className="p-3 bg-indigo-100/80 rounded-xl text-indigo-600 shadow-sm"><Accessibility className="w-7 h-7" /></div>
              <span className="text-[10px] font-extrabold text-indigo-600">휠체어</span>
            </div>
            <div className="flex flex-col items-center gap-1 z-10">
              <ArrowRight className="w-5 h-5 text-slate-400" />
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">이동</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 z-10">
              <div className="p-3 bg-purple-100/80 rounded-xl text-purple-600 shadow-sm">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 3h10v4H7z" />
                  <path d="M7 7h10v10a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V7z" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <span className="text-[10px] font-extrabold text-purple-600">변기</span>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(241,245,249,0.5)_0%,transparent_70%)]" />
          </div>
        );
      case 'bed-to-chair':
        return (
          <div className="relative w-full h-full flex items-center justify-between px-8 bg-gradient-to-r from-blue-50/50 via-slate-50 to-emerald-50/50 rounded-xl border border-slate-100 overflow-hidden">
            <div className="flex flex-col items-center gap-1.5 z-10">
              <div className="p-3 bg-blue-100/80 rounded-xl text-blue-600 shadow-sm"><Bed className="w-7 h-7" /></div>
              <span className="text-[10px] font-extrabold text-blue-600">침대</span>
            </div>
            <div className="flex flex-col items-center gap-1 z-10">
              <ArrowRight className="w-5 h-5 text-slate-400" />
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">이동</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 z-10">
              <div className="p-3 bg-emerald-100/80 rounded-xl text-emerald-600 shadow-sm">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12h-14v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6z" />
                  <path d="M6 12v-6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6" />
                </svg>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-600">의자</span>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(241,245,249,0.5)_0%,transparent_70%)]" />
          </div>
        );
      case 'caregiver-assist':
        return (
          <div className="relative w-full h-full flex items-center justify-center gap-6 bg-gradient-to-br from-indigo-50/40 to-rose-50/40 rounded-xl border border-slate-100 overflow-hidden">
            <div className="flex flex-col items-center gap-1.5 z-10">
              <div className="p-3 bg-indigo-100/80 rounded-full text-indigo-600 shadow-sm"><Users className="w-7 h-7" /></div>
              <span className="text-[10px] font-extrabold text-indigo-600">보호자 보조</span>
            </div>
            <div className="p-2 bg-white rounded-full border border-slate-100 shadow-sm text-rose-500 z-10">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div className="flex flex-col items-center gap-1.5 z-10">
              <div className="p-3 bg-rose-100/80 rounded-full text-rose-600 shadow-sm"><Accessibility className="w-7 h-7" /></div>
              <span className="text-[10px] font-extrabold text-rose-600">대상자</span>
            </div>
          </div>
        );
      case 'safety-check':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50/40 to-orange-50/40 rounded-xl border border-slate-100 overflow-hidden">
            <div className="relative z-10 p-4 bg-amber-100 rounded-full text-amber-600 shadow-md">
              <Lock className="w-8 h-8" />
              <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full border-2 border-white">
                <Check className="w-3 h-3 stroke-[3.5]" />
              </span>
            </div>
            <span className="text-[10px] font-black text-amber-700 tracking-wider uppercase mt-3 z-10 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              바퀴 고정 완료
            </span>
          </div>
        );
      case 'dizzy-warning':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-red-50/40 to-amber-50/40 rounded-xl border border-slate-100 overflow-hidden">
            <div className="z-10 p-4 bg-red-100 rounded-full text-red-600 shadow-md animate-bounce">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-black text-red-700 tracking-wider uppercase mt-3 z-10 bg-red-50 px-2 py-0.5 rounded border border-red-200">
              상태 확인 (어지러움/통증)
            </span>
          </div>
        );
      case 'express-need':
        return (
          <div className="relative w-full h-full flex items-center justify-center gap-4 bg-gradient-to-br from-purple-50/40 to-sky-50/40 rounded-xl border border-slate-100 overflow-hidden">
            <div className="z-10 p-3 bg-purple-100 rounded-xl text-purple-600 shadow-sm"><Accessibility className="w-7 h-7" /></div>
            <div className="relative z-10 bg-white border border-slate-150 rounded-2xl p-3 shadow-sm flex items-center gap-1.5 max-w-[120px]">
              <Droplet className="w-4 h-4 text-sky-500 fill-sky-200 shrink-0" />
              <span className="text-[10px] font-black text-slate-700 leading-none">화장실 마려움!</span>
            </div>
          </div>
        );
      case 'move-difficulty':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-amber-50/50 rounded-xl border border-slate-100 overflow-hidden">
            <div className="relative z-10 flex gap-2 items-center">
              <div className="p-3 bg-slate-200 rounded-xl text-slate-600"><Footprints className="w-6 h-6" /></div>
              <div className="text-amber-500 animate-pulse"><AlertTriangle className="w-7 h-7" /></div>
            </div>
            <span className="text-[10px] font-black text-slate-500 mt-3 z-10 bg-white px-2 py-0.5 rounded border border-slate-200">
              화장실 이동 어려움
            </span>
          </div>
        );
      case 'bedside-toileting':
        return (
          <div className="relative w-full h-full flex items-center justify-center gap-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-xl border border-slate-100 overflow-hidden">
            <div className="z-10 p-3 bg-blue-100 rounded-xl text-blue-600 shadow-sm"><Bed className="w-6 h-6" /></div>
            <div className="h-6 w-px bg-slate-200 z-10" />
            <div className="z-10 p-3 bg-purple-100 rounded-xl text-purple-600 shadow-sm">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 3h10v4H7z" />
                <path d="M7 7h10v10a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V7z" />
              </svg>
            </div>
            <span className="absolute bottom-2 text-[8px] font-black text-slate-400 bg-white border px-1.5 py-0.2 rounded shadow-sm">
              침상 근처 간이변기
            </span>
          </div>
        );
      case 'clean-after':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50/40 to-sky-50/40 rounded-xl border border-slate-100 overflow-hidden">
            <div className="z-10 p-3.5 bg-emerald-100 rounded-full text-emerald-600 shadow-md">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="text-[10px] font-black text-emerald-700 tracking-wider uppercase mt-3 z-10 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              세정 및 위생 정리 완료
            </span>
          </div>
        );
      case 'caregiver-prep':
        return (
          <div className="relative w-full h-full flex items-center justify-center gap-3 bg-gradient-to-r from-teal-50/40 to-sky-50/40 rounded-xl border border-slate-100 overflow-hidden">
            <div className="p-3 bg-teal-100/80 rounded-xl text-teal-600 z-10 shadow-sm"><Users className="w-6 h-6" /></div>
            <ArrowRight className="w-4 h-4 text-slate-350 z-10" />
            <div className="p-3 bg-sky-100/80 rounded-xl text-sky-600 z-10 shadow-sm"><Droplet className="w-6 h-6" /></div>
            <span className="absolute bottom-2 text-[8px] font-black text-slate-400 bg-white border px-1.5 py-0.2 rounded shadow-sm">
              물티슈 / 소독 등 준비
            </span>
          </div>
        );
      case 'privacy-protection':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50/40 to-purple-50/40 rounded-xl border border-slate-100 overflow-hidden">
            <div className="z-10 p-4 bg-indigo-100 rounded-full text-indigo-600 shadow-md">
              <EyeOff className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-black text-indigo-700 mt-3 z-10 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              커튼 및 사생활 보호
            </span>
          </div>
        );
      case 'hygiene-manage':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-teal-50/40 to-emerald-50/40 rounded-xl border border-slate-100 overflow-hidden">
            <div className="z-10 p-4 bg-teal-100 rounded-full text-teal-600 shadow-md">
              <Trash2 className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-black text-teal-700 mt-3 z-10 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              수거함 폐기 및 소독
            </span>
          </div>
        );
      default:
        return (
          <div className="w-full h-full bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
            <RefreshCw className="w-6 h-6 animate-spin" />
          </div>
        );
    }
  };

  const getDimensionClass = () => {
    switch (size) {
      case 'sm':
        return 'h-24';
      case 'lg':
        return 'h-48';
      case 'md':
      default:
        return 'h-36';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col hover:shadow transition-shadow duration-200">
      {/* Visual Graphic Area */}
      <div className={`w-full ${getDimensionClass()} mb-3.5 shrink-0`}>
        {renderGraphic()}
      </div>

      {/* Description Info Area */}
      <div className="text-left space-y-1">
        <h4 className="text-sm font-extrabold text-slate-800 leading-snug">{title}</h4>
        <p className="text-xs text-slate-500 leading-relaxed font-semibold">{description}</p>
      </div>
    </div>
  );
}
