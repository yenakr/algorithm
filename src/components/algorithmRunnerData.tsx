import React from 'react';
import {
  ThumbsUp, Move, Accessibility, Bot, Bed, Footprints, Scale, Users, Shield
} from 'lucide-react';
import { robotTypeInfo, resultToRobotTypeMap } from '../data';

export interface Option {
  id: string;
  text: string;
  simpleText?: string;
  simpleLabel?: string;
  score?: number;
  value: string;
}

export interface Question {
  id: string;
  title: string;
  simpleTitle?: string;
  description?: string;
  simpleDescription?: string;
  simpleLabel?: string;
  iconType?: 'transfer' | 'walking' | 'balance' | 'toilet' | 'caregiver' | 'robot' | 'safety';
  type: 'single' | 'multi';
  options: Option[];
  nextQuestionId?: string | ((answers: Record<string, any>) => string | null);
  resultId?: string | ((answers: Record<string, any>) => string | null);
}

export interface Result {
  id: string;
  title: string;
  simpleTitle?: string;
  description: string;
  simpleDescription?: string;
  simpleLabel?: string;
  recommendation: string;
  simpleRecommendation?: string;
  reason: string;
  simpleReason?: string;
  simpleResultSummary?: string;
  simpleTips?: string[];
}

export interface Algorithm {
  id: string;
  title: string;
  startQuestionId: string;
  questions: Record<string, Question>;
  results: Record<string, Result>;
}

export interface AlgorithmRunnerProps {
  algorithm: Algorithm;
  mode: 'learning';
  uiMode?: 'simple' | 'detail' | 'map';
  onPathChange?: (path: string[]) => void;
  onLearnMore?: (deviceId: string) => void;
}

export const cleanInternalCodes = (text: string): string => {
  if (!text) return '';
  let cleaned = text
    .replace(/^[BTF]-[A-H]\.?\s*/gi, '')
    .replace(/\b[BTF]-[A-H]\.?\s*/gi, '')
    .replace(/["']?[BTF]-[A-H]["']?/gi, '');
  cleaned = cleaned
    .replace(/도움 불필요\(위생 자립\)/g, '도움 없이 진행 가능')
    .replace(/도움 불필요/g, '도움 없이 진행 가능')
    .replace(/용변 후 처리 돕기/g, '용변 후 처리 보조')
    .replace(/화장실 이동 돕기/g, '화장실 이동 보조');

  // Strip off parenthesis descriptions for '예' or '아니오'
  if (/^(예|아니오)\s*\(.*\)/.test(cleaned)) {
    cleaned = cleaned.replace(/^((?:예|아니오))\s*\(.*\)/, '$1');
  }
  return cleaned.trim();
};

export const cleanEdgeLabel = (label: string): string => {
  if (!label) return '';
  const labelMap: Record<string, string> = {
    '0점': '양호',
    '1점': '약간의 어려움',
    '2점 이상': '어려움',
    '0점 (양호)': '양호',
    '1~2점 (약간의 어려움)': '약간의 어려움',
    '3~4점 (심한 어려움)': '심한 어려움',
    '0~1점 (양호)': '양호',
    '2~4점 (어려움)': '어려움'
  };
  if (labelMap[label]) {
    return labelMap[label];
  }
  return label;
};

export const getCustomEdgeLabel = (fromId: string, toId: string, originalLabel: string, algorithmId: string): string => {
  // Toileting Care
  if (algorithmId === 'toileting') {
    if (fromId === 'q1') {
      if (originalLabel.includes('양호') || originalLabel.includes('0~1점')) return '아니오';
      return '예';
    }
    if (fromId === 'q2_a' || fromId === 'q2_b') {
      if (originalLabel.includes('양호') || originalLabel.includes('0~1점')) return '아니오';
      return '예';
    }
    if (fromId === 'q3_a1' || fromId === 'q3_a2' || fromId === 'q3_b1' || fromId === 'q3_b2') {
      if (originalLabel.includes('양호') || originalLabel.includes('0~1점') || originalLabel.includes('0점')) return '예';
      return '아니오';
    }
  }

  // Feeding Care
  if (algorithmId === 'feeding') {
    return cleanEdgeLabel(originalLabel);
  }

  // Transfer Care
  if (algorithmId === 'transfer') {
    if (fromId === 'q1') {
      if (originalLabel === '1점' || originalLabel.includes('약간')) return '가벼운 어려움';
      return '중간 이상 어려움';
    }
    if (fromId === 'q2') {
      if (originalLabel === '예' || originalLabel.includes('yes')) return '예';
      return '아니오';
    }
    if (fromId === 'q4') {
      if (originalLabel === '예' || originalLabel.includes('yes')) return '예';
      return '아니오';
    }
  }

  return cleanEdgeLabel(originalLabel);
};

export const getRobotTypeForResult = (resultId: string) => {
  const mapping = resultToRobotTypeMap[resultId];
  if (!mapping) return null;
  const list = robotTypeInfo[mapping.category];
  return list.find(r => r.id === mapping.robotTypeId) || null;
};

export const simpleIconMap: Record<string, React.ReactNode> = {
  transfer: <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm"><Bed className="w-8 h-8" /></div>,
  walking: <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm"><Footprints className="w-8 h-8" /></div>,
  balance: <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shadow-sm"><Scale className="w-8 h-8" /></div>,
  toilet: <div className="w-16 h-16 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shadow-sm"><Accessibility className="w-8 h-8" /></div>,
  caregiver: <div className="w-16 h-16 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm"><Users className="w-8 h-8" /></div>,
  robot: <div className="w-16 h-16 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shadow-sm"><Bot className="w-8 h-8" /></div>,
  safety: <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shadow-sm"><Shield className="w-8 h-8" /></div>
};

export const getResultIcon = (resultId: string) => {
  if (resultId === 'T-A' || resultId === 'B-A') {
    return <ThumbsUp className="w-8 h-8 text-emerald-600" />;
  }
  if (resultId.startsWith('T-')) {
    if (['T-B', 'T-C', 'T-D'].includes(resultId)) {
      return <Move className="w-8 h-8 text-blue-600" />;
    }
    return <Bot className="w-8 h-8 text-sky-600" />;
  }
  if (resultId.startsWith('B-')) {
    if (['B-B', 'B-C', 'B-D'].includes(resultId)) {
      return <Accessibility className="w-8 h-8 text-purple-600" />;
    }
    return <Bot className="w-8 h-8 text-sky-600" />;
  }
  return <Bot className="w-8 h-8 text-sky-600" />;
};

// Complete rich details database for each matching result ID
export const resultDetails: Record<string, {
  deviceName: string;
  image: string;
  whenToUse: string;
  pros: string[];
  precautions: string[];
  environment: string;
  reason: string;
}> = {
  // 이승돌봄 결과 기기 상세
  'T-A': {
    deviceName: '도움 불필요',
    image: '',
    whenToUse: '자리이동에 어려움이 없고 스스로 침대와 휠체어 등을 안전하게 오갈 수 있는 상태',
    pros: ['사용자의 잔존 신체 기능을 최대한 유지하여 퇴행 예방', '보호자의 별도 물리적 개입이 불필요하여 돌봄 독립성 유지'],
    precautions: ['낙상 방지를 위해 침대 주변 장애물을 정리하고 조명을 밝게 유지하세요.', '신체 근력 상태를 주기적으로 체크하여 변화가 생기는지 모니터링이 권장됩니다.'],
    environment: '일반 가정 주거 환경',
    reason: '자리이동 기능평가 결과 0점(문제 없음)으로 평가되어, 현재 특별한 전동 리프트나 신체 보조기기가 요구되지 않습니다.'
  },
  'T-B': {
    deviceName: '이승보조장비 (슬라이딩 보드/이승벨트)',
    image: '/images/transfer_board.png',
    whenToUse: '자리이동 시 가벼운 균형 불안정이 있어 보호자의 가벼운 조력이나 이동판 보조가 필요한 상태',
    pros: ['무거운 전동 장비 설치 없이 가볍고 신속하게 이동을 지원함', '대상자를 휠체어로 끌 때 발생하는 마찰을 줄여 피부 쓸림 및 상처를 방지함'],
    precautions: ['환자가 등받이 없이 앉은 자세에서 스스로 최소한의 상체 균형을 잡을 수 있어야 안전합니다.', '미끄러질 때 낙상을 방지하기 위해 보호자가 곁에서 파지 벨트 등을 함께 잡아야 합니다.'],
    environment: '침실 및 휠체어 주변 이승 공간',
    reason: '자리이동 기능평가에서 1점(가벼운 어려움) 수준을 보여, 고가의 전동 리프트 대신 물리적 마찰을 줄이는 슬라이딩 보드로 이송을 돕는 것이 가장 효율적입니다.'
  },
  'T-C': {
    deviceName: '전동형 기립보조리프트 (허그, 업고플러스 등)',
    image: '/images/standing_aid.png',
    whenToUse: '자리이동 장애와 하지 지지 능력은 부족하나, 스스로 상체를 세우고 로봇 손잡이를 지탱해 잡을 수 있는 고령자',
    pros: ['전동 버튼 조작만으로 보호자가 허리 힘을 전혀 쓰지 않고 고령자를 안전하게 일으켜 세움', '기립 자세를 유지하는 과정에서 하지 근력 재활 및 서기 훈련 효과를 유도함'],
    precautions: ['환자가 로봇의 팔걸이나 손잡이를 잡고 버틸 수 있는 최소한의 상체 근력과 인지 능력이 필요합니다.', '벨트 체결 시 조임 상태가 늑골이나 가슴에 압박을 주지 않는지 이송 전 확인하세요.'],
    environment: '바닥 문턱이 없고 리프트가 안전하게 회전할 수 있는 침대 및 화장실 주변 공간',
    reason: '다리 근력으로 체중을 스스로 지탱하지는 못하지만 상체를 가눌 힘이 남아 있어, 등판을 벨트로 감싸 안전하게 일으켜 세우는 전동 기립보조 로봇이 적합합니다.'
  },
  'T-D': {
    deviceName: '비전동형 기립보조기기 (수동 스탠딩 에이드)',
    image: '/images/manual_standing_aid.png',
    whenToUse: '하지 지지력이 약하지만 상체 협조가 어느 정도 가능하며, 전원 충전이 번거로운 환경의 사용자',
    pros: ['전기 동력이 필요 없어 방전이나 전원 고장 우려가 전혀 없고 실외에서도 사용 가능', '무릎 가슴 패드와 고정 플레이트로 다중 지지하여 전복 위험을 원천 차단함'],
    precautions: ['기계식 수동 지렛대 작동 구조를 위해 보호자가 레버를 밀거나 당길 수 있는 최소한의 힘이 필요합니다.', '환자의 무릎이 지지 패드에 정확히 밀착되도록 조정해 안전을 확보하십시오.'],
    environment: '단차가 없는 실내 침대/휠체어 이송 구간',
    reason: '체중 지지가 어렵고 상체 가누기가 불안정하지만, 모터 전동 방식 대신 보호자의 수동 조작으로 환자의 가슴과 무릎을 밀착해 간편하게 일으켜 주는 장치입니다.'
  },
  'T-E': {
    deviceName: '천장 고정형 리프트',
    image: '/images/transfer_lift.png',
    whenToUse: '하지 근력 및 상체 지지력이 모두 불가능하며, 주택 천장에 레일 공사가 가능한 와상 고령자',
    pros: ['바닥 공간을 전혀 차지하지 않아 협소한 방에서도 사용 가능', '보호자 한 명만으로도 근골격계 부담 없이 완벽한 이송 가능'],
    precautions: ['건물 천장 구조물의 내하중 보강 공사가 필수적임', '초기 설치 비용이 비교적 높음'],
    environment: '천장 레일 매립/노출 주행이 확보되는 공간 및 침대 주변',
    reason: '다리에 전혀 힘이 들어가지 않아 스스로 서거나 일어설 수 없으며, 벽체 타공 대신 천장 지지 공간을 안전하게 마련할 수 있는 가정에 가장 이상적입니다.'
  },
  'T-F': {
    deviceName: '벽 고정형 리프트',
    image: '/images/wall_lift.png',
    whenToUse: '하지 근력 및 상체 지지력이 불가하고 천장 공사는 지지 하중 등의 이유로 제한되나, 튼튼한 옹벽이 존재하는 장소',
    pros: ['천장 지지가 부실하더라도 옹벽에 강력 고정하여 낙상 없이 사용', '관절식 회전 암 구조로 침대 주변 등 좁은 영역 내에서 빠르게 휠체어 탑승을 지원함'],
    precautions: ['벽면 암의 작동 반경을 벗어난 장소로의 직접적인 이동은 불가합니다.', '장비 지지용 콘크리트 내력벽 확인이 필수적이며 벽면 상태에 따라 장착 보착이 수반되어야 합니다.'],
    environment: '리프트 회전이 자유롭고 단단한 콘크리트 내력벽이 존재하는 침실',
    reason: '천장 보강 공사가 불가능해 슬링 리프트를 설치할 차선책이 필요하나, 침대 주변의 옹벽을 이용해 그네 리프트를 안전히 작동시켜 이송을 돕는 합리적인 기기입니다.'
  },
  'T-G': {
    deviceName: '이동식 리프트',
    image: '/images/mobile_sling_lift.png',
    whenToUse: '벽/천장 공사가 완전히 금지되는 주거 환경이거나, 거실 and 안방 등 여러 장소로 굴려서 이송해야 하는 와상 사용자',
    pros: ['별도의 영구 설치 공사나 가옥 훼손 없이 즉각적 조립 사용이 가능', '바퀴 이동식으로 설계되어 욕실, 거실, 침실 등 전 공간 이동성 지원'],
    precautions: ['바닥에 단차가 있거나 문턱이 있으면 이동이 제한되므로 턱 제거 시공이 우선입니다.', '침대 밑에 리프트의 하부 프레임(다리 부분)이 들어갈 수 있는 빈 틈새(높이 10~12cm)가 필수입니다.'],
    environment: '바닥 문턱이 없고 평평하며 침대 하단 틈새가 열려있는 주거 공간',
    reason: '공사가 절대 불가해 고정식 레일을 달 수 없지만, 바닥이 평평하고 문턱이 없어 부드러운 바퀴 주행이 가능한 방과 거실에서 전신 슬링을 체결하여 옮기기에 가장 훌륭한 바퀴형 이동 리프트입니다.'
  },
  'T-H': {
    deviceName: '이동식 겐트리 리프트',
    image: '/images/gantry_lift.png',
    whenToUse: '천장/벽 손상 공사가 불가능하며, 침대 주변 공간이 넓고 수직 리프팅의 강한 하중 안정성을 선호하는 와상 사용자',
    pros: ['천장/벽 훼손 없이 튼튼한 문 모양 철제 독립 프레임을 세워 안정적으로 공중 이송', '조립형 구조로 임대 주택 거주자도 추후 이사 시 쉽게 분해 및 이전 설치가 용이함'],
    precautions: ['침대 좌우 및 상단으로 큰 겐트리 지지 기둥이 세워지므로 가구 배치 공간 확보가 먼저 요구됩니다.', '프레임의 수평 유지 및 연결 볼트의 견고한 고정 상태를 정기적으로 관리해야 합니다.'],
    environment: '철제 겐트리 지지 프레임을 침대 위에 충분히 둘러서 세울 수 있는 넓은 침실 공간',
    reason: '벽이나 천장 타공 등 가옥 훼손은 일절 불가능하지만, 침실 침대 사방으로 튼튼한 A자형 철제 프레임 기둥을 조립 배치하여 안정적으로 환자를 공중에 띄워 옮길 수 있습니다.'
  },

  // 배설돌봄 결과 기기 상세
  'B-A': {
    deviceName: '도움 불필요',
    image: '',
    whenToUse: '용변 요의/변의 인지, 화장실 보행 이동, 스스로 닦기 및 의복 조절이 원활히 가능한 자력 해결 상태',
    pros: ['환자 본인의 신체 잔존 역량 및 독립적 자조 능력을 최대한 유지', '보호자의 배설 돌봄 물리적 개입이 불필요하여 삶의 피로도 최하 유지'],
    precautions: ['화장실 바닥 물기로 인한 낙상을 예방하기 위해 미끄럼방지 테이프를 붙여두세요.', '인지 및 다리 근력 등의 퇴행 변화가 일어나는지 주기적 자가점검이 권장됩니다.'],
    environment: '일반 가정 화장실 및 욕실 주거 공간',
    reason: '배뇨/배변 인지 조절, 이동, 청결 전 과정에서 기능 제한이 거의 존재하지 않는 완전 자립 상태이므로 기기 지원이 필요하지 않습니다.'
  },
  'B-B': {
    deviceName: '온수 세정 자동 비데',
    image: '/images/hygiene_bidet.png',
    whenToUse: '화장실 이동과 기본적인 앉기/일어서기는 양호하지만 관절 손상이나 근육 마비로 용변 후 휴지로 깔끔히 닦아내지 못하는 사용자',
    pros: ['화장지 문지름에 따르는 노령 피부의 마찰 손상 및 통증 완화', '노즐 자동 온수 스프레이와 바람 건조로 청결한 항문 위생 조력 및 요로감염 예방'],
    precautions: ['컨트롤러 패널을 사용자가 보고 직접 누를 수 있는 인지력이 유지되어야 합니다.', '정기적인 비데 필터 교환 및 세정 노즐 청결 소독이 필요합니다.'],
    environment: '양변기 주변에 방수 플러그 전기 공급 및 급수 배관이 연결 가능한 화장실',
    reason: '배뇨 배변감 인지와 화장실 이동 능력은 양호하지만, 류마티스 관절염이나 어깨 및 허리 회전 가동 범위 제한으로 휴지를 써서 깨끗이 닦아내기 힘드므로 자동 세정 비데가 가장 적합합니다.'
  },
  'B-C': {
    deviceName: '화장실 전동 변기 리프트',
    image: '/images/toilet_lift.png',
    whenToUse: '배뇨/배변 신호를 스스로 인지하고 뒤처리 능력도 있지만, 무릎 고관절 연골 마모로 쪼그려 앉고 일어설 때 통증이 심하고 낙상 우려가 높은 사용자',
    pros: ['시트 자체의 높낮이와 각도를 유압 전동식으로 조절해 안전하게 일어서도록 유도', '무릎 관절에 체중 부담을 거의 주지 않고 편안한 용변 시작과 일어서기 퇴거를 보장함'],
    precautions: ['일반 변기 위에 결합하므로 도기 모양 규격을 체크하고 전기 전원 연결 유무를 보십시오.', '전동 시트가 회전해 올라올 때 균형을 잃고 쏠리지 않도록 속도에 익숙해지는 연습이 필요합니다.'],
    environment: '전동 변기 리프트를 지탱하고 안착할 수 있는 여유 면적의 화장실 양변기 주변',
    reason: '용변 신호를 잘 알고 뒤처리도 자력 해결하지만, 다리 힘과 고관절 약화로 변기에 완전히 착석하고 일어나 서는 과정에서 낙상 및 근골격계 손상이 우려되어 전동 보조 변기 리프트가 필요합니다.'
  },
  'B-D': {
    deviceName: '가구형 침상 이동 변기',
    image: '/images/toilet_lift.png', // Fallback
    whenToUse: '용변을 보고 싶은 신호는 정확히 느끼나, 화장실 문턱을 넘어가거나 먼 거리를 보행해 이동할 수 없는 사용자',
    pros: ['침실 침대 곁에 바로 닿게 설치해 실금과 낙상을 동시에 차단', '스윙식 안전 팔걸이 조절로 휠체어에서 변기로 미끄러지듯 바로 이동 승차 가능'],
    precautions: ['배설물이 모이는 오물통(버킷)을 보호자가 수시로 비우고 세척해 주어야 냄새와 세균 번식을 막습니다.', '변기 밑바닥 고정 장치나 브레이크가 확실히 잠겼는지 승하차 전에 점검하세요.'],
    environment: '침대 바로 옆 및 휠체어 접근 공간이 있는 침실',
    reason: '소대변 감각 인지와 뒤처리는 보존되거나 보조가 가능하지만, 하반신 보행 장애로 인해 방 밖 화장실 변기까지 움직일 수 없으므로 침대 바로 옆 가구형 이동 변기가 필수적입니다.'
  },
  'B-E': {
    deviceName: '시간에 맞춘 예약 배설 유도 프로그램',
    image: '/images/excretion_robot.png',
    whenToUse: '다리 거동 및 위생 뒤처리는 자력 완수가 가능하나, 치매 또는 인지저하로 방광에 오물이 차오르는 것을 자각하지 못해 실금이 빈번한 사용자',
    pros: ['스마트 센서가 방광 팽창도를 직접 추적하여 제시간에 소변을 해결하게 알림', '불필요한 기저귀 착용을 원천 차단하고 스스로의 신체 배설 능력을 마지막까지 보존 지원'],
    precautions: ['환자의 아랫배 부위에 초음파 센서 패드를 정확한 위치에 부착하고 밀착 상태를 체크해야 합니다.', '알람음이나 유도 멘트가 울릴 때 환자가 불안을 느끼지 않도록 다정하게 화장실로 이끌어주세요.'],
    environment: '일반 가정 주거 환경 전체',
    reason: '보행 및 뒤처리는 스스로 가능하나 치매나 인지 기능 저하로 인해 신호를 전혀 인지하지 못해 실금하는 위험이 크므로, 방광의 팽창 여부를 스마트 센서로 추적해 화장실 이용 시간을 강제로 환기시켜 주는 프로그램이 최선입니다.'
  },
  'B-F': {
    deviceName: '배설 유도 프로그램 및 자동 세정 비데 결합형',
    image: '/images/excretion_robot.png', // Fallback
    whenToUse: '인지 장하로 실금 빈도가 높고 신체 관절 약화로 배설 후 스스로 세정 및 뒤처리가 불가능한 환자',
    pros: ['센서 알람을 통한 주기적 화장실 방문 유도와 온수 비데 세정 자동화를 한 번에 해결', '보호자의 뒤처리 위생 노동 및 시간별 화장실 호출 감시 강도를 획기적으로 경감'],
    precautions: ['초음파 센서 장치 충전 및 비데 살균수 카트리지 청결을 동시에 점검해주십시오.', '인지 부족 환자가 양변기에 앉아있는 동안 비데 온수 스프레이 작동에 놀라지 않도록 조작법 가이드가 필요합니다.'],
    environment: '양변기 및 온전한 급배수가 구비된 화장실 공간',
    reason: '소대변 감각 인지 능력이 부실하고 신체적 손떨림이나 강직 등으로 뒤처리 위생 관리마저 결여된 상태이므로, 예약 배설 유도 및 양변기 자동 비데 세정이 통합 적용되어야 합니다.'
  },
  'B-G': {
    deviceName: '간헐적 흡인식 침상 배설처리기기 (탈착식 자동 배설로봇)',
    image: '/images/excretion_robot.png', // Fallback
    whenToUse: '배설 인지 및 화장실 거동이 안 되는 침상 와상 환자 중, 보호자가 배뇨 타이밍이나 용변 시에만 기기를 장착해 주는 환경',
    pros: ['기저귀를 계속 찬 채 지내는 것보다 짓무름과 피부 궤양(욕창) 예방율이 압도적으로 높음', '용변 즉시 센서가 작동해 오물을 진공 흡입하고 온수 세정 및 건조까지 완전 자동 수행'],
    precautions: ['기기 컵 패드가 환자의 회음부 갈래에 틈새 없이 부착되었는지 확실히 대조해야 샘 현상이 없습니다.', '대변의 경도가 너무 단단하면 흡입 노즐이 막힐 수 있으므로 수분 섭취 조절이 필요합니다.'],
    environment: '부피가 큰 배설물 처리기 본체와 급수/배수 통을 거치해 둘 수 있는 침대 밑 공간',
    reason: '배설감 인지와 거동, 위생 처리 능력이 모두 자립 불가능하지만 보호자가 실시간 상주하여 배설 신호 또는 주기마다 기기를 밀착 장착 및 분리 관리해 줄 수 있는 조건에 추천됩니다.'
  },
  'B-H': {
    deviceName: '지속적 침상 배설처리로봇 (고정 장착형 스마트 기저귀 시스템)',
    image: '/images/excretion_robot.png',
    whenToUse: '중증 치매 및 전신 마비로 24시간 누워 생활하며, 배설 주기를 종잡을 수 없고 전적인 자동 세정이 필요한 환자',
    pros: ['24시간 상시 밀착 고정되어 배설 즉시 보호자 호출 없이 진공 정화 세정 작동', '야간 시간 기저귀 교체를 위해 환자를 깨우거나 뒤척이게 하지 않아 고령자의 숙면 유도'],
    precautions: ['장시간 실리콘 패드 접촉에 따른 피부 발적이나 쓸림을 방지하기 위해 매일 고정 부위를 소독 점검해야 합니다.', '기기 오물 정화 버킷 용량을 확인하고 주 2~3회 필수 비우기를 해주십시오.'],
    environment: '전원 플러그 및 배설로봇 본체 거치 공간이 확보된 침실 침상 주변',
    reason: '인지, 보행 이동, 뒤처리 능력이 모두 소실된 전적인 침상 와상 상태이며 24시간 실시간 대소변 처리가 필요하므로, 지속적으로 착용하여 정화와 건조를 해결하는 고정 장착형 배설처리 로봇이 적합합니다.'
  },

  // 식사돌봄 결과 기기 상세
  'F-A': {
    deviceName: '도움 불필요',
    image: '',
    whenToUse: '음식을 씹고 삼키는 데 문제가 없고, 스스로 숟가락질을 하여 식사할 수 있는 안전한 상태',
    pros: ['대상자가 잔존 신체 기능을 최대한 활용하여 저하를 예방', '독립적인 일상 식사를 보장하여 자존감과 정서에 긍정적인 영향'],
    precautions: ['식사 속도가 너무 빠르지 않도록 조절해 급체나 가벼운 사래를 예방하십시오.', '정기적인 구강 위생(양치질) 관리를 통해 건강을 유지하십시오.'],
    environment: '일반 가정 식사용 식탁 환경',
    reason: '음식을 삼키는 기능 및 손동작 수저 조작에 경증 이상의 문제나 장애가 관찰되지 않아 기기 개입 없이 완전 자립이 가능합니다.'
  },
  'F-B': {
    deviceName: '전자동 식사보조로봇 (마이스푼 등)',
    image: '/images/feeding_robot.png',
    whenToUse: '구강 섭취와 삼킴은 안전하게 수행하나, 양팔 마비 및 상지 근력 등급 3등급 미만으로 숟가락을 전혀 들지 못하는 고령자',
    pros: ['로봇팔이 밥과 반찬을 전동 스푼으로 떠서 환자 입 바로 앞까지 오차 없이 도달시킴', '남의 손을 빌리지 않고 턱 스위치나 버튼 클릭만으로 자기 주도적인 식사 완수 가능'],
    precautions: ['음식의 점도와 크기가 너무 크거나 끈적거리면 로봇 스푼이 뜨지 못하고 흘릴 수 있으므로 한 입 크기 조절이 필수입니다.', '헤드 제스처나 버튼 스위치 입력 위치를 고령자의 잔존 기능에 맞춰 정밀 고정해 주십시오.'],
    environment: '로봇 본체와 전용 식판을 안정적으로 거치할 수 있는 튼튼한 식탁 환경',
    reason: '양쪽 팔 근력이 중력을 극복하지 못하는 등급(3등급 미만)으로 숟가락질이 아예 불가능하지만, 구강 연하와 고개 조작은 양호하여 로봇이 음식물을 입 앞까지 공급하는 전자동 방식이 요구됩니다.'
  },
  'F-C': {
    deviceName: '식사 보조 기구 및 수동형 팔 지지대',
    image: '/images/feeding_assist_tool.png',
    whenToUse: '삼킴은 문제없으며 상지 근력이 3등급 이상으로 팔은 들 수 있으나, 파킨슨 떨림이나 관절 강직으로 정밀한 수저 조작이 힘든 사용자',
    pros: ['자이로 손떨림 방지 스푼이 음식 쏟아짐을 최소화하여 단정하게 식사 완료', '수동 팔 받침대가 중력을 상쇄하여 장시간 식사 시 발생하는 팔 어깨 피로 극감'],
    precautions: ['손떨림 주파수 강도가 극심한 말기 파킨슨병의 경우 자이로 스푼의 제어 범위를 초과할 수 있어 사전 테스트가 권장됩니다.', '팔 지지 장치 장착 시 몸에 눌림이나 통증이 유발되지 않도록 패드 쿠션을 조절하십시오.'],
    environment: '보조 식기 및 팔 지지 장치를 흡착해 고정할 수 있는 매끄러운 표면의 식탁',
    reason: '스스로 팔은 들어 올릴 수 있지만 정밀 손가락 조작 저하 및 떨림 증상이 있으므로, 완전한 기계 자동 방식 대신 자이로 스푼과 수동 팔 지지대로 잔존 신체력을 활용하는 것이 효율적입니다.'
  },
  'F-D': {
    deviceName: '비구강영양 지원 및 보호자 밀착 연하 보조 (튜브/경관급식 케어)',
    image: '',
    whenToUse: '삼킴(연하) 반사가 소실되었거나 흡인성 폐렴 위험이 너무 극심하여 입으로 음식물 공급이 차단된 환자',
    pros: ['질식, 사래, 기도로의 오접촉으로 유발되는 치명적인 폐 손상을 원천 예방', '위관 튜브 또는 경정맥 영양을 통해 소화 기능 및 영양분 공급의 안전성 확보'],
    precautions: ['위관 급식(콧줄) 투여 시 주입 속도가 너무 빠르면 구토와 설사를 유발하므로 정밀 제어가 필수입니다.', '급식 후 상체를 30도 이상 세우고 1시간 이상 유지해야 역류성 폐 흡인을 예방합니다.'],
    environment: '가정 내 침상 케어 환경 또는 요양 시설 환경',
    reason: '연하 기능 평가 결과 구강 섭취가 전면 불가능한 상태이므로, 식사용 로봇팔 등은 적용 불가하며 위관 영양 또는 정맥 급여 관리 체계가 필수적으로 작용해야 합니다.'
  }
};

// Learning/Detail Guide details mapping
export const learningGuides: Record<string, { title: string; content: string; details: { key: string; val: string }[] }> = {
  q1: {
    title: '자리이동하기 기능평가 기준',
    content: '긴 의자에서 앉은 채로 옆으로 미끄러지듯 이동하거나, 침대에서 의자로 이동하는 것과 같이 자세를 바꾸지 않고 한 면에서 다른 면 으로 이동하기',
    details: [
      { key: '0점 (문제 없음)', val: '' },
      { key: '1점 (가벼운 정도의 어려움)', val: '견딜만한 정도' },
      { key: '2점 (중간 정도의 어려움)', val: '일상생활의 지장을 초래할 정도' },
      { key: '3점 (심한 정도의 어려움)', val: '일상생활을 부분적으로 방해할 정도' },
      { key: '4점 (극심한 정도의 어려움)', val: '일상생활을 완전히 방해할 정도' }
    ]
  },
  q2: {
    title: '하지 근력 평가 방법',
    content: '하지 근력으로 체중을 지탱할 수 있는지를 기준으로 평가',
    details: [
      { key: '체중 지탱 가능 (MMT IV~V)', val: '하지 근력으로 체중을 지탱할 수 있음' },
      { key: '체중 지탱 불가 (MMT 0~III)', val: '하지 근력으로 체중을 지탱할 수 없음' }
    ]
  },
  q3: {
    title: '환경적 요소 고려',
    content: '전신슬링 리프트는 종류에 따라 가옥 내부에 하중 지지 공사(천장 보강 공사, 옹벽 앵커 설치 등)를 동반해야 하는 경우가 많습니다. 공사가 가능한지, 불가능하여 이동식(바퀴형)이나 독립 조립 프레임(겐트리)을 세워야 하는지에 따라 최종 로봇 세부 추천이 결정됩니다.',
    details: [
      { key: '천장 고정', val: '천장에 단단히 레일을 매립/설치할 수 있어 공간 낭비가 전혀 없습니다.' },
      { key: '벽 고정', val: '콘크리트 옹벽면에 스윙 관절 암 타입으로 고정하여 회전 반경 내에서만 이동시킵니다.' },
      { key: '이동식', val: '가구 훼손이나 공사가 전면 불가할 때 바퀴로 끄는 형태이나 문턱 제거가 요구됩니다.' },
      { key: '이동식 겐트리', val: '공사는 어렵지만 침대 주변에 A자형 독립 프레임 철제 기둥 구조물을 단독 조립할 공간이 나올 때 훌륭한 대안입니다.' }
    ]
  },
  q3_1: {
    title: '우선순위 및 가치 판단',
    content: '천장이나 벽 설치가 둘 다 가능한 경우 또는 환경 제약이 적을 때 사용자의 선호 가치(사용 편의성 향상 vs 초기 비용 아끼기)를 선별합니다.',
    details: [
      { key: '사용 편의성 우선', val: '천장 주행 모터를 매달아 힘이 전혀 들지 않고 즉시 거실/침실 이동이 가능한 천장 고정형(T-E) 추천' },
      { key: '설치 비용 절감 우선', val: '옹벽 고정 암만 설치해 설치비를 줄이고 방 내부에서 부드럽게 사용하는 벽 고정형(T-F) 추천' }
    ]
  },
  q3_2: {
    title: '조립식 겐트리 지지대 배치 공간',
    content: '주택 손상이 불가해 공사는 거부하지만, 침대 위에 커다란 독립 지지 프레임을 세울 공간(침대 좌우 20cm 이상 빈 여유 공간)이 있는지 평가합니다.',
    details: [
      { key: '겐트리 프레임 가능)', val: '방 공간이 충분하여 단독 지지 프레임을 세워 안정적으로 리프팅 주행 가능' },
      { key: '순수 이동식 필요', val: '방이 좁아 기둥 세우기가 곤란하여 바퀴로 굴리는 이동식 프레임을 사용하고, 침대 밑에 하부 바퀴가 들어갈 틈새를 둡니다.' }
    ]
  },
  q4: {
    title: '상체 조절 및 협조 능력 평가',
    content: '다리 힘은 지탱하기 어렵지만 환자가 앉은 상태에서 스스로 등받이 없이 허리와 고개를 세우고 버티며, 리프트 앞의 보조 손잡이를 꽉 쥘 수 있는 잔존 기능이 살아있는지 검사합니다.',
    details: [
      { key: '상체 조절 가능', val: '전동 버튼 조작으로 벨트를 등뒤에 걸어 자연스럽게 세워 이송하는 전동형 기립보조리프트가 효율적입니다.' },
      { key: '상체 조절 불가', val: '손잡이를 잡고 버틸 능력이 부족하여 무릎 패드와 가슴 고정 밴드로 신체를 다중 밀착해 억지로 일으켜주는 탑승식 수동 기립보조기기가 안전합니다.' }
    ]
  },
  toileting_q1: {
    title: '생리적 배설 인지 능력 평가',
    content: '소변과 대변이 마렵다는 신호(요의 및 변의)를 환자 본인의 신경계가 명확히 인지하고, 마려울 때 괄약근을 의식적으로 조절해 참거나 화장실 가기를 표현할 수 있는지 확인합니다.',
    details: [
      { key: '인지 능력 양호 (0~1점)', val: '배설 신호를 제때 자각하므로 화장실 이동이나 뒤처리 세정이 양호하면 비데나 리프트로 쉽게 자립 유도가 가능합니다.' },
      { key: '인지 능력 저하 (2~4점)', val: '요의/변의를 지각하지 못해 실금이 잦으므로, 제시간에 맞춰 배설을 유도하는 프로그램이나 기저귀를 자동으로 세정 진공 수거하는 배설로봇(B-G, B-H) 케어가 권장됩니다.' }
    ]
  },
  toileting_q2_a: {
    title: '화장실 이동 능력 평가 (배설 인지 양호 시)',
    content: '배뇨와 배변 신호를 잘 인지하고 있을 때, 침대에서 일어나 화장실 도기 변기 위까지 안전하게 이동할 수 있는지 다리 거동과 균형을 채점합니다.',
    details: [
      { key: '이동 능력 양호 (0~1점)', val: '화장실까지 자력 보행이 되므로, 항문 위생 청결 상태만 보고 비데(B-B) 여부를 검토합니다.' },
      { key: '이동 능력 저하 (2~4점)', val: '낙상 불안이 크거나 걷지 못해 침대 근처에서 변기 리프트(B-C)를 대거나 침실 옆 가구형 이동 변기(B-D)를 이용해야 합니다.' }
    ]
  },
  toileting_q2_b: {
    title: '화장실 이동 능력 평가 (배설 인지 저하 시)',
    content: '배뇨와 배변 신호를 스스로 인지하지 못해 실금이 빈번한 와중에도, 부축을 받거나 자력으로 화장실 변기 앞까지 움직여 갈 수 있는 신체적 보행력 자체는 유지되고 있는지 판단합니다.',
    details: [
      { key: '이동 능력 유지 (0~1점)', val: '실금 위험이 크지만 신체 이동은 되므로, 시간마다 화장실로 이송을 유도(B-E, B-F)하여 기저귀 사용을 억제합니다.' },
      { key: '이동 능력 손상 (2~4점)', val: '인지 및 이동이 모두 불가능한 와상 단계이므로, 침상에 누운 채 자동으로 대소변을 처리해주는 배설처리로봇(B-G, B-H) 기기를 대항 구축합니다.' }
    ]
  },
  toileting_q3_a1: {
    title: '용변 후 청결 마무리',
    content: '화장실까지 갈 수 있고 인지도 양호할 때, 용변 후 스스로 항문을 화장지로 닦아내고 바지와 속옷을 올바르게 제 위치로 정리할 수 있는지 손가락 미세 가동 능력과 관절의 꼬임 능력을 봅니다.',
    details: [
      { key: '0~1점 (양호)', val: '위생 처리를 온전히 혼자서 하여 기기 도움 불필요 (B-A)' },
      { key: '2~4점 (어려움)', val: '어깨 결림이나 관절염 등으로 뒤처리가 힘들어 양변기 자동 온수 세정 비데(B-B) 도입 필요' }
    ]
  },
  toileting_q3_a2: {
    title: '용변 후 청결 마무리',
    content: '인지 지각은 양호하나 화장실까지 걸어가지 못할 때, 변기 착석을 도우면서 용변 처리를 완수할 수 있도록 뒤처리와 기립을 보완하는 단계를 결정합니다.',
    details: [
      { key: '0~1점 (양호)', val: '변기 시트를 높이고 손잡이로 일어서기만 도우면 혼자 닦을 수 있어 양변기 전동 변기 리프트(B-C) 도입' },
      { key: '2~4점 (어려움)', val: '화장실 이동도 어렵고 용변 후 닦아줄 사람도 필요해 침대 옆에서 해결하는 이동 변기(B-D) 도입' }
    ]
  },
  toileting_q3_b1: {
    title: '용변 후 청결 마무리',
    content: '인지 지각은 낮고 화장실 이동은 가능할 때 스스로 항문을 세정하고 뒤처리를 수행할 수 있는지 확인합니다.',
    details: [
      { key: '0~1점 (양호)', val: '유도를 통한 시간 맞춰 화장실 이용 후 스스로 뒤처리' },
      { key: '2~4점 (어려움)', val: '시간 맞춰 화장실 유도 및 비데 세정 자동화 구축' }
    ]
  },
  toileting_q3_b2: {
    title: '용변 후 청결 마무리',
    content: '인지도 낮고 이동도 불가능해 누워 지내는 와상 상태에서 배설 후 엉덩이 세정 조치를 기계적으로 자동화할 수 있는지 결정합니다.',
    details: [
      { key: '0~1점 (양호)', val: '누운 채 탈착형 자동배설로봇 간헐적 이용' },
      { key: '2~4점 (어려움)', val: '24시간 스마트 기저귀 흡인형 배설로봇 지속 가동' }
    ]
  },
  feeding_q1: {
    title: '삼킴(연하) 기능 평가',
    content: '식사 중 사래가 자주 걸리거나 기침을 하는지, 또는 목으로 삼키는 생리적인 동작에 어려움이 있는지 검사합니다. 삼킴 장애가 동반될 경우 흡인성 폐렴이나 질식의 고위험 상태로 보고 별도 수동 식사 급여 및 연하식 관리를 적용해야 합니다.',
    details: [
      { key: '0~1점 (양호)', val: '사래 들림 없이 식사하거나 가벼운 마른 기침 정도로 안전하게 음식물을 목 뒤로 넘기는 자립 수준' },
      { key: '2~4점 (어려움)', val: '저작 및 삼킴 곤란이 있어 연식/죽 등의 특별 조리식이 필요하거나 콧줄/튜브 급식이 유지되어 밀착 모니터링이 필요한 상태' }
    ]
  },
  feeding_q2_a: {
    title: '상지 조절 및 식사 거동 평가',
    content: '식기를 집어 숟가락으로 음식을 푸고, 이를 조절해 입 앞까지 흘리지 않고 안전하게 배달하는 상체 근력 및 손 동작 제어 기능을 평가합니다.',
    details: [
      { key: '0점 (문제 없음)', val: '아무 도움 없이 스스로 숟가락과 식기를 쥐고 흘리지 않고 식사함' },
      { key: '1~2점 (약간의 어려움)', val: '손떨림이 있거나 관절염 등으로 일부 반찬을 흘리지만, 스마트 자이로 스푼이나 잡기 편한 특수 그립 식기가 보조되면 스스로 식사 가능한 수준' },
      { key: '3~4점 (심한 어려움)', val: '어깨/팔 마비로 숟가락 조작이 아예 불가능하여 고개를 움직여 섭식할 수 있는지 추가로 체크해야 하는 상태' }
    ]
  },
  feeding_q3_a: {
    title: '경부 조절 및 협조 능력 평가',
    content: '팔은 움직이지 못하지만, 밥공기나 숟가락이 얼굴 근처에 왔을 때 목을 움직여 받아먹을 수 있는지 판단합니다.',
    details: [
      { key: '예 (조절 가능)', val: '고개 숙임이 가능하므로 숟가락에 올려진 음식을 입으로 안전하게 가져오는 전동 식사로봇 적용이 유용합니다.' },
      { key: '아니오 (조절불능)', val: '목을 가누지 못해 삼키는 자세 유지가 안 되므로 기계를 쓰지 않고 보호자가 안전 속도로 직접 급식을 전담해야 합니다.' }
    ]
  },
  feeding_q2_b: {
    title: '식사 행위 집중 및 인지 능력 평가',
    content: '인지 저하(치매 등)로 인해 본인이 밥을 먹는 상황을 망각하거나, 음식을 입에 물고만 있는 등 식사의 영양 공급에 장애가 생기는지 검사합니다.',
    details: [
      { key: '예 (집중함)', val: '삼킴 기능의 어려움 집중 보조와 특수 점도식 공급 관리가 이루어져야 합니다.' },
      { key: '아니오 (집중 불가)', val: '식사 진행 속도를 음성 등으로 지속 환기시켜 섭식을 유도하는 인지 환기 보조 기기를 고려해야 합니다.' }
    ]
  }
};

// Node positioning and styling configurations (Detail Mode React Flow coordinates)
export const transferNodes: Record<string, { x: number; y: number; label: string; isResult?: boolean; typeLabel: string }> = {
  q1: { x: 460, y: 0, label: "자리이동에 어려움이 있나요?", typeLabel: "기능평가" },
  q2: { x: 775, y: 220, label: "체중을 스스로 지탱할 수 없는가?", typeLabel: "하지 근력" },
  q4: { x: 480, y: 440, label: "스스로 상체를 일으킬 수 없는가?", typeLabel: "상체 조절" },
  q3: { x: 1060, y: 440, label: "환경적 요소 고려", typeLabel: "설치 환경" },
  q3_2: { x: 1360, y: 640, label: "독립 지지대 설치가 가능한가요?", typeLabel: "공사 평가" },
  'T-B': { x: 150, y: 840, label: "이승보조장비 (이승판/이승벨트)", isResult: true, typeLabel: "추천 결과" },
  'T-C': { x: 370, y: 840, label: "전동형 기립보조리프트", isResult: true, typeLabel: "추천 결과" },
  'T-D': { x: 590, y: 840, label: "비전동형 기립보조기기", isResult: true, typeLabel: "추천 결과" },
  'T-E': { x: 810, y: 840, label: "천장 고정형 리프트", isResult: true, typeLabel: "추천 결과" },
  'T-F': { x: 1030, y: 840, label: "벽 고정형 리프트", isResult: true, typeLabel: "추천 결과" },
  'T-H': { x: 1250, y: 840, label: "이동식 겐트리 리프트", isResult: true, typeLabel: "추천 결과" },
  'T-G': { x: 1470, y: 840, label: "이동식 리프트", isResult: true, typeLabel: "추천 결과" },
};

export const toiletingNodes: Record<string, { x: number; y: number; label: string; isResult?: boolean; typeLabel: string }> = {
  q1: { x: 770, y: 0, label: "배설 인지 조절에 어려움이 있나요?", typeLabel: "인지 평가" },
  q2_a: { x: 330, y: 220, label: "화장실 이동에 어려움이 있나요?", typeLabel: "이동 평가" },
  q2_b: { x: 1210, y: 220, label: "화장실 이동에 어려움이 있나요?", typeLabel: "이동 평가" },
  q3_a1: { x: 110, y: 440, label: "스스로 뒤처리를 할 수 있나요?", typeLabel: "청결 평가" },
  q3_a2: { x: 550, y: 440, label: "스스로 뒤처리를 할 수 있나요?", typeLabel: "청결 평가" },
  q3_b1: { x: 990, y: 440, label: "스스로 뒤처리를 할 수 있나요?", typeLabel: "청결 평가" },
  q3_b2: { x: 1430, y: 440, label: "스스로 뒤처리를 할 수 있나요?", typeLabel: "청결 평가" },
  'B-A': { x: 0, y: 660, label: "도움 없이 진행 가능", isResult: true, typeLabel: "추천 결과" },
  'B-B': { x: 220, y: 660, label: "온수 세정 자동 비데", isResult: true, typeLabel: "추천 결과" },
  'B-C': { x: 440, y: 660, label: "변기 전동 리프트", isResult: true, typeLabel: "추천 결과" },
  'B-D': { x: 660, y: 660, label: "이동식 전동변기", isResult: true, typeLabel: "추천 결과" },
  'B-E': { x: 880, y: 660, label: "배설 유도 프로그램", isResult: true, typeLabel: "추천 결과" },
  'B-F': { x: 1100, y: 660, label: "배설 프로그램 및 세정 비데", isResult: true, typeLabel: "추천 결과" },
  'B-G': { x: 1320, y: 660, label: "자동배설처리로봇 (간헐적)", isResult: true, typeLabel: "추천 결과" },
  'B-H': { x: 1540, y: 660, label: "자동배설처리로봇 (지속적)", isResult: true, typeLabel: "추천 결과" },
};

export const transferEdges = [
  { from: 'q1', to: 'T-B', label: "1점", condition: (ans: any) => ans['q1'] === '1' },
  { from: 'q1', to: 'q2', label: "2점 이상", condition: (ans: any) => parseInt(ans['q1'] || '-1') >= 2 },
  { from: 'q2', to: 'q3', label: "예", condition: (ans: any) => ans['q2'] === 'yes' },
  { from: 'q2', to: 'q4', label: "아니오", condition: (ans: any) => ans['q2'] === 'no' },
  { from: 'q4', to: 'T-C', label: "아니오", condition: (ans: any) => ans['q4'] === 'no' },
  { from: 'q4', to: 'T-D', label: "예", condition: (ans: any) => ans['q4'] === 'yes' },
  { from: 'q3', to: 'T-E', label: "천장식", condition: (ans: any) => ans['q3'] === 'ceiling' },
  { from: 'q3', to: 'T-F', label: "벽식", condition: (ans: any) => ans['q3'] === 'wall' },
  { from: 'q3', to: 'q3_2', label: "이동식", condition: (ans: any) => ans['q3'] === 'movable' },
  { from: 'q3_2', to: 'T-H', label: "프레임 가능", condition: (ans: any) => ans['q3_2'] === 'yes' },
  { from: 'q3_2', to: 'T-G', label: "프레임 불가", condition: (ans: any) => ans['q3_2'] === 'no' }
];

export const toiletingEdges = [
  { from: 'q1', to: 'q2_a', label: "0~1점 (양호)", condition: (ans: any) => parseInt(ans['q1'] || '-1') >= 0 && parseInt(ans['q1'] || '-1') <= 1 },
  { from: 'q1', to: 'q2_b', label: "2~4점 (어려움)", condition: (ans: any) => parseInt(ans['q1'] || '-1') >= 2 },
  { from: 'q2_a', to: 'q3_a1', label: "0~1점 (양호)", condition: (ans: any) => parseInt(ans['q2_a'] || '-1') >= 0 && parseInt(ans['q2_a'] || '-1') <= 1 },
  { from: 'q2_a', to: 'q3_a2', label: "2~4점 (어려움)", condition: (ans: any) => parseInt(ans['q2_a'] || '-1') >= 2 },
  { from: 'q2_b', to: 'q3_b1', label: "0~1점 (양호)", condition: (ans: any) => parseInt(ans['q2_b'] || '-1') >= 0 && parseInt(ans['q2_b'] || '-1') <= 1 },
  { from: 'q2_b', to: 'q3_b2', label: "2~4점 (어려움)", condition: (ans: any) => parseInt(ans['q2_b'] || '-1') >= 2 },
  { from: 'q3_a1', to: 'B-A', label: "0~1점 (양호)", condition: (ans: any) => parseInt(ans['q3_a1'] || '-1') >= 0 && parseInt(ans['q3_a1'] || '-1') <= 1 },
  { from: 'q3_a1', to: 'B-B', label: "2~4점 (어려움)", condition: (ans: any) => parseInt(ans['q3_a1'] || '-1') >= 2 },
  { from: 'q3_a2', to: 'B-C', label: "0~1점 (양호)", condition: (ans: any) => parseInt(ans['q3_a2'] || '-1') >= 0 && parseInt(ans['q3_a2'] || '-1') <= 1 },
  { from: 'q3_a2', to: 'B-D', label: "2~4점 (어려움)", condition: (ans: any) => parseInt(ans['q3_a2'] || '-1') >= 2 },
  { from: 'q3_b1', to: 'B-E', label: "0~1점 (양호)", condition: (ans: any) => parseInt(ans['q3_b1'] || '-1') >= 0 && parseInt(ans['q3_b1'] || '-1') <= 1 },
  { from: 'q3_b1', to: 'B-F', label: "2~4점 (어려움)", condition: (ans: any) => parseInt(ans['q3_b1'] || '-1') >= 2 },
  { from: 'q3_b2', to: 'B-G', label: "0~1점 (양호)", condition: (ans: any) => parseInt(ans['q3_b2'] || '-1') >= 0 && parseInt(ans['q3_b2'] || '-1') <= 1 },
  { from: 'q3_b2', to: 'B-H', label: "2~4점 (어려움)", condition: (ans: any) => parseInt(ans['q3_b2'] || '-1') >= 2 },
];

export const feedingNodes: Record<string, { x: number; y: number; label: string; isResult?: boolean; typeLabel: string }> = {
  q1: { x: 570, y: 0, label: "구강 섭취가 가능한가", typeLabel: "삼킴 평가" },
  q2: { x: 310, y: 240, label: "먹기/마시기 기능 평가", typeLabel: "동작 평가" },
  q3: { x: 520, y: 480, label: "팔 근력 평가 (근력 등급)", typeLabel: "근력 평가" },
  'F-A': { x: 100, y: 720, label: "특수식사도구 및 수동형 팔 지지대", isResult: true, typeLabel: "추천 결과" },
  'F-B': { x: 380, y: 720, label: "전자동 식사돌봄로봇", isResult: true, typeLabel: "추천 결과" },
  'F-C': { x: 660, y: 720, label: "부분보조기기 또는 반자동로봇", isResult: true, typeLabel: "추천 결과" },
  'F-D': { x: 940, y: 720, label: "비구강영양 지원 (의료진 지시 필수)", isResult: true, typeLabel: "추천 결과" },
};

export const feedingEdges = [
  { from: 'q1', to: 'q2', label: "예", condition: (ans: any) => ans['q1'] === 'yes' },
  { from: 'q1', to: 'F-D', label: "아니오", condition: (ans: any) => ans['q1'] === 'no' },
  { from: 'q2', to: 'F-A', label: "가벼운 어려움", condition: (ans: any) => ans['q2'] === 'light' },
  { from: 'q2', to: 'q3', label: "중간 이상의 어려움", condition: (ans: any) => ans['q2'] === 'heavy' },
  { from: 'q3', to: 'F-B', label: "3등급 미만", condition: (ans: any) => ans['q3'] === 'low' },
  { from: 'q3', to: 'F-C', label: "3등급 이상", condition: (ans: any) => ans['q3'] === 'high' },
];

export const getShortOptionText = (text: string) => {
  if (text.includes('사용 편의성')) return '사용 편의';
  if (text.includes('비용 절감')) return '비용 절감';
  if (text.includes('공사 과정 최소화')) return '공사 최소';
  const parts = text.split(/[:;,]/);
  return parts[0].trim();
};

export const optionDetails: Record<string, string> = {
  'q1_0': '혼자서 아무런 도구와 도움 없이 자리를 옮기거나 인지 조절이 원활한 상태',
  'q1_1': '약간 불안정하거나 가벼운 피로감이 있으나 대부분 자력으로 할 수 있는 상태',
  'q1_2': '넘어짐 방지를 위해 보조 기구를 쓰거나 타인의 가벼운 손길/부축이 있는 상태',
  'q1_3': '혼자서는 거의 어려워 전적인 지탱이나 부분적인 완전 보조가 자주 들어가는 상태',
  'q1_4': '신체 협조가 전혀 불가하여 기계 장치나 다수의 제공자가 부축해야 하는 상태',

  'q2_yes': '다리에 힘이 없어 본인의 힘으로 서서 몸무게를 버티지 못합니다.',
  'q2_no': '보호자가 부축해 주면 잔존 다리 힘으로 서 있거나 버티실 수 있습니다.',

  'q4_yes': '앉아 있을 때 허리와 고개가 꺾이고, 보조 손잡이를 꽉 잡지 못합니다.',
  'q4_no': '앉은 상태에서 스스로 상체를 세우고, 리프트 앞 손잡이를 힘있게 잡을 수 있습니다.',

  'q2a_0': '아무런 도움 없이도 안전하게 화장실까지 걸어서 가십니다.',
  'q2a_1': '화장실까지 가실 때 가끔 흔들리지만 스스로 해결하십니다.',
  'q2a_2': '낙상 예방을 위해 보행 보조기를 짚거나 보호자가 잡아주어야 합니다.',
  'q2a_3': '다리에 힘이 약해 주로 휠체어를 부축해 옮겨 태워 가야 합니다.',
  'q2a_4': '거동이 일절 불가능하여 침대를 전혀 벗어나지 못하십니다.',

  'q2b_0': '아무런 도움 없이도 안전하게 화장실까지 걸어서 가십니다.',
  'q2b_1': '화장실까지 가실 때 가끔 흔들리지만 스스로 해결하십니다.',
  'q2b_2': '낙상 예방을 위해 보행 보조기를 짚거나 보호자가 잡아주어야 합니다.',
  'q2b_3': '다리에 힘이 약해 주로 휠체어를 부축해 옮겨 태워 가야 합니다.',
  'q2b_4': '거동이 일절 불가능하여 침대를 전혀 벗어나지 못하십니다.',

  'q3a1_0': '화장실 용변 후에 혼자서 닦고 옷 입기까지 완벽히 해내십니다.',
  'q3a1_1': '약간 서툴거나 시간이 지체되지만 스스로 닦고 옷 정리를 하십니다.',
  'q3a1_2': '손에 힘이 없거나 통증으로 인해 엉덩이를 닦아줄 때 가벼운 부축이 필요합니다.',
  'q3a1_3': '용변 뒤처리를 보호자가 물티슈 등으로 다 닦아주고 옷도 정리해 주어야 합니다.',
  'q3a1_4': '스스로 위생 관리를 하려는 의도나 시도 자체가 불가능한 중증 상태입니다.',

  'q3a2_0': '화장실 용변 후에 혼자서 닦고 옷 입기까지 완벽히 해내십니다.',
  'q3a2_1': '약간 서툴거나 시간이 지체되지만 스스로 닦고 옷 정리를 하십니다.',
  'q3a2_2': '손에 힘이 없거나 통증으로 인해 엉덩이를 닦아줄 때 가벼운 부축이 필요합니다.',
  'q3a2_3': '용변 뒤처리를 보호자가 물티슈 등으로 다 닦아주고 옷도 정리해 주어야 합니다.',
  'q3a2_4': '스스로 위생 관리를 하려는 의도나 시도 자체가 불가능한 중증 상태입니다.',

  'q3b1_0': '화장실 용변 후에 혼자서 닦고 옷 입기까지 완벽히 해내십니다.',
  'q3b1_1': '약간 서툴거나 시간이 지체되지만 스스로 닦고 옷 정리를 하십니다.',
  'q3b1_2': '손에 힘이 없거나 통증으로 인해 엉덩이를 닦아줄 때 가벼운 부축이 필요합니다.',
  'q3b1_3': '용변 뒤처리를 보호자가 물티슈 등으로 다 닦아주고 옷도 정리해 주어야 합니다.',
  'q3b1_4': '스스로 위생 관리를 하려는 의도나 시도 자체가 불가능한 중증 상태입니다.',

  'q3b2_0': '화장실 용변 후에 혼자서 닦고 옷 입기까지 완벽히 해내십니다.',
  'q3b2_1': '약간 서툴거나 시간이 지체되지만 스스로 닦고 옷 정리를 하십니다.',
  'q3b2_2': '손에 힘이 없거나 통증으로 인해 엉덩이를 닦아줄 때 가벼운 부축이 필요합니다.',
  'q3b2_3': '용변 뒤처리를 보호자가 물티슈 등으로 다 닦아주고 옷도 정리해 주어야 합니다.',
  'q3b2_4': '스스로 위생 관리를 하려는 의도나 시도 자체가 불가능한 중증 상태입니다.',

  'q3_ceiling': '천장 레일 및 슬링 모터 장착을 위한 튼튼한 하중 공사가 가능합니다.',
  'q3_wall': '방 또는 화장실에 관절식 회전 암 지지대를 박아 고정할 옹벽이 있습니다.',
  'q3_movable': '집을 훼손하거나 타공을 뚫는 공사는 일절 어려운 환경입니다.',
  'q3_narrow': '침대 밑 공간이 막혀 있거나 휠체어 회전 반경이 좁아 주행이 어렵습니다.',
};

export function getDisplayText<T extends Record<string, any>>(
  item: T | null | undefined,
  field: keyof T,
  uiMode: 'simple' | 'detail'
): string {
  if (!item) return '';
  if (uiMode === 'simple') {
    const simpleField = `simple${String(field).charAt(0).toUpperCase()}${String(field).slice(1)}`;
    if (item[simpleField] !== undefined) {
      return String(item[simpleField]);
    }
  }
  return String(item[field] || '');
}

export interface CriteriaSection {
  title: string;
  type: 'list' | 'grades';
  items: { label: string; text: string }[] | string[];
}

export interface CriteriaTable {
  title: string;
  themeColor: 'blue' | 'emerald' | 'indigo';
  leftSection: CriteriaSection;
  rightSection: CriteriaSection;
}

export const criteriaTables: Record<string, CriteriaTable> = {
  toileting: {
    title: '배설(배뇨/배변) 조절하기 기능 평가 기준표 (ICF 기준)',
    themeColor: 'blue',
    leftSection: {
      title: '■ 배뇨/배변 조절 관련 자기관리 평가 항목',
      type: 'list',
      items: [
        '배뇨감 또는 배변감 인지하기',
        '배뇨 또는 배변에 적절한 장소를 선택하여 들어가기',
        '적절한 자세 취하기 (변기 안착 및 자세 유지)',
        '배뇨 또는 배변 전후 옷 입고 벗기',
        '배뇨 또는 배변 후 자신을 청결하게 하기'
      ]
    },
    rightSection: {
      title: '■ 기능 평가 기준 및 판단 등급',
      type: 'grades',
      items: [
        { label: '0점', text: '문제 없음 (자립 수준)' },
        { label: '1점', text: '가벼운 정도의 어려움 (견딜만한 정도)' },
        { label: '2점', text: '중간 정도의 어려움 (일상생활에 지장을 초래할 정도)' },
        { label: '3점', text: '심한 정도의 어려움 (일상생활을 부분적으로 방해)' },
        { label: '4점', text: '극심한 정도의 어려움 (일상생활을 완전히 방해)' }
      ]
    }
  },
  feeding: {
    title: '식사돌봄(먹기/마시기) 기능 및 근력 평가 기준표 (ICF/MRC 기준)',
    themeColor: 'emerald',
    leftSection: {
      title: '■ 먹기/마시기 기능 평가 기준',
      type: 'grades',
      items: [
        { label: '0점', text: '문제 없음 (삼킴 및 식사에 전혀 문제 없음)' },
        { label: '1점', text: '가벼운 정도의 어려움 (가끔 흘리거나 사래 걸림)' },
        { label: '2점', text: '중간 정도의 어려움 (보조기구가 있어야 식사 가능)' },
        { label: '3점', text: '심한 정도의 어려움 (대부분을 떠먹여 줘야 식사 가능)' },
        { label: '4점', text: '극심한 정도의 어려움 (삼키지 못해 콧줄/튜브 사용)' }
      ]
    },
    rightSection: {
      title: '■ 상지(팔) 근력 평가 방법\n(※ 식사할 때 주로 사용하는 팔을 기준으로 평가)',
      type: 'grades',
      items: [
        { label: 'Grade 0', text: '근육의 수축도 보이지 않음 (완전 마비)' },
        { label: 'Grade l', text: '팔은 못 움직이는데 근육의 수축이 보임' },
        { label: 'Grade II', text: '팔을 바닥에서 끌 수 있지만 들어올리지는 못함' },
        { label: 'Grade IlI', text: '팔을 바닥에서 들어올릴 수 있음' },
        { label: 'Grade IV', text: '들어올린 팔을 다른 사람이 밀어도 어느 정도 버틸 수 있음' },
        { label: 'Grade V', text: '근력이 완전함' }
      ]
    }
  },
  transfer: {
    title: '자리이동 기능 및 하지 근력 평가 기준표 (ICF/MRC 기준)',
    themeColor: 'indigo',
    leftSection: {
      title: '■ 자리이동하기 기능 평가 기준',
      type: 'grades',
      items: [
        { label: '0점', text: '문제 없음 (자력으로 안전한 침대-휠체어 이동)' },
        { label: '1점', text: '가벼운 정도의 어려움 (균형 불안이나 피로감 있음)' },
        { label: '2점', text: '중간 정도의 어려움 (보조기구나 가벼운 도움 필요)' },
        { label: '3점', text: '심한 정도의 어려움 (자력 이동 불가, 전적인 보조 필요)' },
        { label: '4점', text: '극심한 정도의 어려움 (기계장치나 여러 명의 부축 필수)' }
      ]
    },
    rightSection: {
      title: '■ 하지(다리) 근력 평가 방법\n(※ 하지 근력으로 체중을 지탱할 수 있는지를 기준으로 평가)',
      type: 'grades',
      items: [
        { label: 'Grade 0', text: '완전 마비. 근육의 기능이 전혀 없음' },
        { label: 'Grade I', text: '근육의 수축이 약간 있으나 관절운동이 없음' },
        { label: 'Grade II', text: '다리를 들어올릴 수 없으며 중력에 버티지 못하고 떨어뜨림' },
        { label: 'Grade III', text: '다리를 들어올릴 수 있지만 저항을 이기지 못하고 떨어뜨림' },
        { label: 'Grade IV', text: '약간의 약화를 느끼지만 혼자서 보행 가능함' },
        { label: 'Grade V', text: '근력이 완전' }
      ]
    }
  }
};


