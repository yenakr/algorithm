'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200/80 backdrop-blur-md bg-white/95 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="bg-primary p-2 rounded-lg text-white group-hover:bg-primary-dark transition-colors duration-200">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <span className="text-sm sm:text-base font-black text-slate-800 tracking-tight">
                돌봄로봇 알고리즘 학습
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
