'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, GitMerge, HelpCircle, Trophy, Eye, CheckSquare } from 'lucide-react';

export default function Home() {
  const algorithms = [
    {
      id: 'toileting',
      title: '배설돌봄 알고리즘',
      description: '배뇨와 배변 등 위생 관리가 필요한 상황에서 적합한 배설돌봄 로봇 유형을 판단하는 알고리즘입니다.',
      buttonText: '배설돌봄 알고리즘 보기',
      color: 'border-blue-200 hover:border-blue-400 bg-blue-50/30',
      tagColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'feeding',
      title: '식사돌봄 알고리즘',
      description: '식사 보조가 필요한 상황에서 대상자의 기능과 돌봄 환경에 따라 적합한 식사돌봄 로봇 유형을 판단하는 알고리즘입니다.',
      buttonText: '식사돌봄 알고리즘 보기',
      color: 'border-emerald-200 hover:border-emerald-400 bg-emerald-50/30',
      tagColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'transfer',
      title: '이승돌봄 알고리즘',
      description: '침대, 의자, 휠체어 등으로 자리를 옮기는 상황에서 필요한 이승돌봄 로봇 유형을 판단하는 알고리즘입니다.',
      buttonText: '이승돌봄 알고리즘 보기',
      color: 'border-indigo-200 hover:border-indigo-400 bg-indigo-50/30',
      tagColor: 'bg-indigo-100 text-indigo-800',
    },
  ];

  const steps = [
    {
      step: 1,
      title: '알고리즘 선택',
      description: '학습할 돌봄로봇 알고리즘을 선택합니다.',
      icon: BookOpen,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      step: 2,
      title: '원본 알고리즘 트리 확인',
      description: '제공된 알고리즘 트리 원본 이미지를 통해 전체 판단 흐름을 먼저 살펴봅니다.',
      icon: Eye,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      step: 3,
      title: '단계별 알고리즘 따라가기',
      description: '클릭 가능한 질문 흐름을 따라가며 판단 기준을 익힙니다.',
      icon: GitMerge,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
    },
    {
      step: 4,
      title: '사례 문제 풀이',
      description: '실제 돌봄 상황을 바탕으로 알고리즘을 적용하는 연습을 합니다.',
      icon: CheckSquare,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
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
                <span className={`px-2.5 py-1 text-xs font-bold rounded-md uppercase tracking-wider ${algo.tagColor}`}>
                  Algorithm
                </span>
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

      {/* Simple 4-Step Process Section */}
      <section className="bg-slate-100/80 border-t border-slate-200/60 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              학습 흐름
            </h2>
            <div className="h-1 w-12 bg-blue-600 rounded mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-sm relative group">
                  <div className="absolute top-4 right-4 text-xs font-black text-slate-300">
                    STEP 0{item.step}
                  </div>
                  <div className={`p-3 rounded-xl border w-fit mb-4 ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
