'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const algorithms = [
    {
      id: 'toileting',
      title: '배설돌봄',
      image: '/images/excretion_robot.png',
      buttonText: '학습 시작하기',
      color: 'border-blue-200 hover:border-blue-400 bg-blue-50/30',
      tagColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'feeding',
      title: '식사돌봄',
      image: '/images/feeding_robot.png',
      buttonText: '학습 시작하기',
      color: 'border-emerald-200 hover:border-emerald-400 bg-emerald-50/30',
      tagColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'transfer',
      title: '이승돌봄',
      image: '/images/transfer_lift.png',
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
            돌봄로봇 알고리즘
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
            상황에 맞는 돌봄로봇 유형을 판단하는 알고리즘
          </p>
        </div>
      </section>

      {/* About Description Shortened */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium max-w-3xl mx-auto">
          알고리즘을 통해 대상자에게 적합한 돌봄로봇 유형을 판단하는 과정을 학습할 수 있습니다.
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
              <div className="text-center">
                <h3 className="text-2xl font-black text-slate-800">
                  {algo.title}
                </h3>
              </div>
              <div className="pt-6">
                <Link
                  href={`/${algo.id}`}
                  className="w-full inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-sm transition-colors duration-200 gap-2 shadow"
                >
                  <span>{algo.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Illustration Image under the button */}
              <div className="mt-6 flex justify-center items-center w-full h-[180px] bg-white rounded-xl border border-slate-200/60 p-4 shadow-inner">
                <img
                  src={algo.image}
                  alt={algo.title}
                  className="max-h-full object-contain hover:scale-105 transition-transform duration-350"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
