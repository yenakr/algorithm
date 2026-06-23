import React from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';
import CareSceneIllustration, { IllustrationType } from './CareSceneIllustration';
import SimpleRobotCard from './SimpleRobotCard';
import SafetyTipsCard from './SafetyTipsCard';
import NextStepCTA from './NextStepCTA';
import HighlightText from './HighlightText';

export interface StoryScenario {
  title: string;
  description: string;
  illustrationType: IllustrationType;
}

export interface StoryRobot {
  id: string;
  name: string;
  category: string;
  description: string;
  whenToUse: string;
  precautions: string[];
  illustrationType: IllustrationType;
  pros: string[];
  target: string;
  imgPath: string;
}

interface RobotStorySectionProps {
  scenariosTitle: string;
  scenarios: StoryScenario[];
  helpersTitle: string;
  helpers: string[];
  robots: StoryRobot[];
  safetyTips: string[];
  onCTAChangeTab: () => void;
}

export default function RobotStorySection({
  scenariosTitle,
  scenarios,
  helpersTitle,
  helpers,
  robots,
  safetyTips,
  onCTAChangeTab
}: RobotStorySectionProps) {
  return (
    <div className="space-y-16 animate-fade-in text-left pb-10">
      
      {/* 1. 이런 상황에서 필요해요 */}
      <section className="space-y-6">
        <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <span className="w-2.5 h-6 bg-indigo-600 rounded inline-block animate-pulse" />
          {scenariosTitle}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {scenarios.map((sc, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4 hover:shadow-md transition-shadow"
            >
              {/* Scenario Illustration */}
              <div className="w-full">
                <CareSceneIllustration type={sc.illustrationType} size="sm" />
              </div>
              {/* Scenario Info */}
              <div className="space-y-1.5">
                <h4 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                  <span className="w-5 h-5 bg-indigo-50 border border-indigo-150 rounded-full text-indigo-600 flex items-center justify-center font-bold text-xs">
                    {idx + 1}
                  </span>
                  {sc.title}
                </h4>
                <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                  <HighlightText text={sc.description} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. 돌봄로봇이 이렇게 도와줘요 */}
      <section className="bg-indigo-50/50 border border-indigo-100 rounded-3xl p-6 sm:p-8 space-y-5">
        <h3 className="text-xl font-black text-indigo-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          {helpersTitle}
        </h3>
        
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 font-semibold text-slate-700">
          {helpers.map((help, idx) => (
            <li 
              key={idx} 
              className="flex items-center gap-2.5 bg-white border border-slate-150 p-4 rounded-2xl shadow-sm hover:translate-x-0.5 transition-transform"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
              <span className="text-sm sm:text-base leading-relaxed">
                <HighlightText text={help} />
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. 어떤 돌봄로봇이 있나요? */}
      <section className="space-y-6">
        <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <span className="w-2.5 h-6 bg-indigo-600 rounded inline-block" />
          어떤 돌봄로봇이 있나요? (언제 쓰는지 함께 알아봐요)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {robots.map((robot) => (
            <SimpleRobotCard
              key={robot.id}
              id={robot.id}
              name={robot.name}
              category={robot.category}
              description={robot.description}
              whenToUse={robot.whenToUse}
              precautions={robot.precautions}
              illustrationType={robot.illustrationType}
              pros={robot.pros}
              target={robot.target}
              imgPath={robot.imgPath}
            />
          ))}
        </div>
      </section>

      {/* 4. 사용 전 꼭 확인해요 */}
      <section className="pt-2">
        <SafetyTipsCard tips={safetyTips} />
      </section>

      {/* 5. 나에게 필요한 돌봄로봇 찾아보기 */}
      <section className="pt-4">
        <NextStepCTA 
          label="나에게 필요한 돌봄로봇 찾아보기" 
          subLabel="간단한 질문에 답하고 나에게 가장 안전한 돌봄로봇을 추천받아 보세요."
          onClick={onCTAChangeTab} 
        />
      </section>

    </div>
  );
}
