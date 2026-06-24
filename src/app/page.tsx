'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const algorithms = [
    {
      id: 'toileting',
      title: '배설돌봄',
      description: '배뇨와 배변 등 위생 관리가 필요한 상황에서 대상자의 인지 및 신체 상태를 기반으로 알맞은 솔루션을 판단합니다.',
      buttonText: '학습 시작하기',
      color: 'border-blue-200 hover:border-blue-400 bg-blue-50/30',
      tagColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'feeding',
      title: '식사돌봄',
      description: '식사 보조가 필요한 상황에서 대상자의 삼킴 장애 위험과 상지 조절 상태를 분석하여 적합한 보조 기기를 선별합니다.',
      buttonText: '학습 시작하기',
      color: 'border-emerald-200 hover:border-emerald-400 bg-emerald-50/30',
      tagColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'transfer',
      title: '이승돌봄',
      description: '침대, 의자, 휠체어 등으로 자리를 옮길 때 대상자의 기립 균형과 상하체 근력을 평가하여 안전한 리프트 유형을 결정합니다.',
      buttonText: '학습 시작하기',
      color: 'border-indigo-200 hover:border-indigo-400 bg-indigo-50/30',
      tagColor: 'bg-indigo-100 text-indigo-800',
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none">
            돌봄로봇 알고리즘 학습
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
            대상자의 상태와 돌봄 환경을 바탕으로, 상황에 맞는 돌봄로봇 유형을 판단하는 알고리즘을 학습합니다.
          </p>
        </div>
      </section>

      {/* About Description Shortened */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium max-w-3xl mx-auto">
          돌봄로봇은 대상자의 이동, 식사, 위생 관리를 돕고 돌봄제공자의 부담을 줄이는 새로운 돌봄 도구로 활용되고 있습니다.
          이 사이트에서는 배설돌봄, 식사돌봄, 이승돌봄 상황에 맞는 알고리즘을 따라가며 대상자에게 적합한 돌봄로봇 유형을 판단하는 과정을 학습할 수 있습니다.
        </p>
      </section>

      {/* Algorithms Selection Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {algorithms.map((algo) => (
            <div
              key={algo.id}
              className={`flex flex-col justify-between p-8 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md ${algo.color}`}
            >
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800">
                  {algo.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {algo.description}
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href={`/${algo.id}`}
                  className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-sm transition-colors duration-200 gap-2"
                >
                  <span>{algo.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
