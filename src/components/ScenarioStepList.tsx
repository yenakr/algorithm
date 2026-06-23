import React from 'react';
import ScenarioStepItem from './ScenarioStepItem';
import { IllustrationType } from './CareSceneIllustration';

export interface StepScenario {
  type: IllustrationType;
  title: string;
  description: string;
}

interface ScenarioStepListProps {
  scenarios: StepScenario[];
}

export default function ScenarioStepList({ scenarios }: ScenarioStepListProps) {
  return (
    <div className="flex flex-col gap-5 w-full">
      {scenarios.map((sc, idx) => (
        <ScenarioStepItem
          key={idx}
          number={idx + 1}
          type={sc.type}
          title={sc.title}
          description={sc.description}
        />
      ))}
    </div>
  );
}
