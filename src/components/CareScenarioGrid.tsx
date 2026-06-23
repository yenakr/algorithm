import React from 'react';
import CareIllustrationCard, { IllustrationType } from './CareIllustrationCard';

export interface ScenarioItem {
  type: IllustrationType;
  title: string;
  description: string;
}

interface CareScenarioGridProps {
  scenarios: ScenarioItem[];
}

export default function CareScenarioGrid({ scenarios }: CareScenarioGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
      {scenarios.map((sc, idx) => (
        <CareIllustrationCard
          key={idx}
          type={sc.type}
          title={sc.title}
          description={sc.description}
          size="md"
        />
      ))}
    </div>
  );
}
