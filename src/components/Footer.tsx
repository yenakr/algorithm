import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            <span className="text-white font-bold text-sm tracking-wide">
              돌봄로봇 교육 및 자가평가
            </span>
            <span className="text-xs text-slate-500 border-l border-slate-700 pl-2">
              연구용 MVP
            </span>
          </div>
          <div className="text-xs text-slate-500 text-center md:text-right">
            <p>본 플랫폼은 이승 및 배설 돌봄로봇 교육 알고리즘 연구 및 학습 목적으로 제작되었습니다.</p>
            <p className="mt-1">© {new Date().getFullYear()} Hanyang University Care Robotics. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
