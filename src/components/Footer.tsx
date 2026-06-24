import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            <span className="text-white font-bold text-sm tracking-wide">
              돌봄로봇 알고리즘
            </span>
          </div>
          <div className="text-xs text-slate-500 text-center md:text-right">
            <p>배설돌봄, 식사돌봄, 이승돌봄 알고리즘의 이해를 돕기 위한 학습용 페이지입니다.</p>
            <p className="mt-1">© 2026 Hanyang University Care Robotics.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
