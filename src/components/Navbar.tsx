'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Activity, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: '홈 메인', href: '/' },
    { name: '이승돌봄 교육·자가평가', href: '/transfer' },
    { name: '배설돌봄 교육·자가평가', href: '/toileting' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200/80 backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="bg-primary p-2 rounded-lg text-white group-hover:bg-primary-dark transition-colors duration-200">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-slate-800 tracking-tight leading-tight">
                  돌봄로봇 교육 및 자가평가 플랫폼
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  HANYANG UNIVERSITY CARE ROBOTICS
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-light text-primary font-bold shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-2 pt-2 pb-4 space-y-1 shadow-lg absolute w-full left-0">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  isActive
                    ? 'bg-primary-light text-primary font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
