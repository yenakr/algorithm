import { toiletingCareAlgorithm } from './algorithms/toiletingCare';
import { transferCareAlgorithm } from './algorithms/transferCare';
import { feedingCareAlgorithm } from './algorithms/feedingCare';

import { toiletingCases } from './cases/toiletingCases';
import { transferCases } from './cases/transferCases';
import { feedingCases } from './cases/feedingCases';

import { toiletingEducationData } from './education/toiletingEducation';
import { transferEducationData } from './education/transferEducation';
import { feedingEducationData } from './education/feedingEducation';

import { Question, Result } from './algorithms/transferCare';
import { CaseStudy } from './cases/transferCases';
import { EducationData } from './education/transferEducation';

export interface AlgorithmData {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  diagramImage: string;
  algorithm: typeof transferCareAlgorithm;
  quizzes: CaseStudy[];
  education: EducationData;
  status: string;
}

export const algorithmsData: Record<string, AlgorithmData> = {
  toileting: {
    id: 'toileting',
    title: '배설돌봄 알고리즘',
    shortDescription: '배뇨와 배변 등 위생 관리가 필요한 상황에서 적합한 배설돌봄 로봇 유형을 판단하는 알고리즘입니다.',
    fullDescription: '배설돌봄 알고리즘은 배뇨와 배변 등 위생 관리가 필요한 상황에서 대상자의 상태와 돌봄 환경을 바탕으로 적합한 돌봄로봇 유형을 판단하기 위한 학습 도구입니다.',
    diagramImage: '/algorithm-trees/toileting-original.png',
    algorithm: toiletingCareAlgorithm as any,
    quizzes: toiletingCases,
    education: toiletingEducationData,
    status: 'active'
  },
  feeding: {
    id: 'feeding',
    title: '식사돌봄 알고리즘',
    shortDescription: '식사 보조가 필요한 상황에서 대상자의 기능과 돌봄 환경에 따라 적합한 식사돌봄 로봇 유형을 판단하는 알고리즘입니다.',
    fullDescription: '식사돌봄 알고리즘은 대상자의 식사 수행 능력과 필요한 보조 수준을 바탕으로 적합한 식사돌봄 로봇 유형을 판단하기 위한 학습 도구입니다.',
    diagramImage: '/algorithm-trees/feeding-original.png',
    algorithm: feedingCareAlgorithm as any,
    quizzes: feedingCases,
    education: feedingEducationData,
    status: 'active'
  },
  transfer: {
    id: 'transfer',
    title: '이승돌봄 알고리즘',
    shortDescription: '침대, 의자, 휠체어 등으로 자리를 옮기는 상황에서 필요한 이승돌봄 로봇 유형을 판단하는 알고리즘입니다.',
    fullDescription: '이승돌봄 알고리즘은 대상자가 침대, 의자, 휠체어 등으로 자리를 옮길 때 필요한 돌봄로봇 유형을 판단하기 위한 학습 도구입니다.',
    diagramImage: '/algorithm-trees/transfer-original.png',
    algorithm: transferCareAlgorithm as any,
    quizzes: transferCases,
    education: transferEducationData,
    status: 'active'
  }
};
export type { Question, Result, CaseStudy, EducationData };
export { toiletingCareAlgorithm, transferCareAlgorithm, feedingCareAlgorithm };
