import { CaseStudy } from './transferCases';

export const feedingCases: CaseStudy[] = [
  // A. 알고리즘 이해
  {
    id: 'feeding_case_q1',
    scenario: '',
    question: '식사 돌봄 알고리즘에서 가장 먼저 확인해야 하는 것은?',
    options: ['팔의 근력', '삼킴 기능 평가', '식이 종류', '환경 평가'],
    correctAnswerIndex: 1,
    explanation: '식사 돌봄 알고리즘의 첫 단계에서는 삼킴 기능 평가를 시행합니다.',
    category: 'A'
  },
  {
    id: 'feeding_case_q2',
    scenario: '',
    question: '구강섭취가 가능하다고 판단되면 바로 먹기/마시기 기능평가를 시행한다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 0,
    explanation: '구강섭취가 가능한 경우 다음 단계로 먹기/마시기 기능평가를 시행합니다.',
    category: 'A'
  },
  {
    id: 'feeding_case_q3',
    scenario: '',
    question: '먹기/마시기 기능평가 결과가 중간 정도 이상의 어려움이면 다음으로 시행해야 할 평가는?',
    options: ['팔의 근력 평가', '체중 지지 여부', '인지 기능', '시력 평가'],
    correctAnswerIndex: 0,
    explanation: '먹기/마시기 기능평가 결과가 중간 정도 이상의 어려움이면 팔의 근력 평가를 시행합니다.',
    category: 'A'
  },
  {
    id: 'feeding_case_q4',
    scenario: '',
    question: '팔의 근력이 Grade III 미만인 경우 가장 적합한 장비는?',
    options: ['전자동 식사돌봄로봇', '특수식사도구', '수동형 팔 지지대', '일반 식판'],
    correctAnswerIndex: 0,
    explanation: '팔의 근력이 Grade III 미만인 경우 전자동 식사돌봄로봇이 가장 적절합니다.',
    category: 'A'
  },
  {
    id: 'feeding_case_q5',
    scenario: '',
    question: '구강섭취가 불가능한 경우에도 먹기/마시기 기능평가를 먼저 시행해야 한다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 1,
    explanation: '구강섭취가 불가능한 경우 먹기/마시기 기능평가는 시행하지 않고 바로 경관영양 단계로 넘어갑니다.',
    category: 'A'
  },
  {
    id: 'feeding_case_q6',
    scenario: '',
    question: '다음 중 알고리즘의 올바른 흐름은?',
    options: [
      '삼킴 평가 → 구강섭취 가능 여부 → 먹기/마시기 평가 → 팔 근력 평가 → 장비 선택',
      '팔 근력 → 삼킴 평가 → 장비 선택',
      '식이 종류 → 삼킴 평가 → 장비 선택',
      '장비 선택 → 기능 평가'
    ],
    correctAnswerIndex: 0,
    explanation: '식사돌봄 알고리즘은 삼킴 평가 → 구강섭취 가능 여부 → 먹기/마시기 평가 → 팔 근력 평가 → 장비 선택 순으로 진행됩니다.',
    category: 'A'
  },
  // B. 정보 판단
  {
    id: 'feeding_case_q7',
    scenario: '',
    question: '구강섭취 가능, 먹기/마시기 기능: 중간 이상 어려움. 추가로 가장 필요한 평가는?',
    options: ['팔의 근력 평가', '체중', '나이', '성별'],
    correctAnswerIndex: 0,
    explanation: '식사 조절 기능 저하 시 자력 섭취 여부를 판단하기 위해 팔의 근력 평가가 가장 필요합니다.',
    category: 'B'
  },
  {
    id: 'feeding_case_q8',
    scenario: '',
    question: '팔의 근력 평가는 중간 이상 어려움인 경우에만 시행한다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 0,
    explanation: '먹기/마시기 기능이 중간 이상 어려움인 경우에만 팔의 근력 평가를 시행합니다.',
    category: 'B'
  },
  {
    id: 'feeding_case_q9',
    scenario: '',
    question: '팔의 근력이 Grade III 이상이어도 추가 정보가 필요할 수 있다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 0,
    explanation: 'Grade III 이상이라도 세부적인 식사 보조 기기(특수도구 등)를 선택하기 위해 추가 정보를 확인합니다.',
    category: 'B'
  },
  {
    id: 'feeding_case_q10',
    scenario: '',
    question: '구강섭취가 불가능한 대상자에게 가장 먼저 고려해야 할 것은?',
    options: ['의료진 지시에 따른 경관영양', '전자동 식사로봇', '특수식사도구', '수동 팔 지지대'],
    correctAnswerIndex: 0,
    explanation: '구강섭취가 불가능하면 의학적 판단에 따른 경관영양이 최우선 조치입니다.',
    category: 'B'
  },
  {
    id: 'feeding_case_q11',
    scenario: '',
    question: '가벼운 정도의 어려움인 경우 팔의 근력 평가는 필수이다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 1,
    explanation: '가벼운 어려움인 대상자는 팔 근력 평가를 필수로 거치지 않고 기본 보조도구를 우선 적용합니다.',
    category: 'B'
  },
  {
    id: 'feeding_case_q12',
    scenario: '',
    question: '식사 돌봄 장비 선택에 가장 직접적으로 영향을 미치는 정보는?',
    options: ['대상자의 기능 수준', '보호자 연령', '병실 크기', '식사 시간'],
    correctAnswerIndex: 0,
    explanation: '식사 장비 선택에는 대상자의 신체 기능 수준이 가장 결정적인 역할을 합니다.',
    category: 'B'
  },
  // C. 장비 선택
  {
    id: 'feeding_case_q13',
    scenario: '',
    question: '먹기/마시기 기능이 중간 이상 어려움 + 팔 근력 Grade III 미만인 경우 우선 고려할 장비는?',
    options: ['전자동 식사돌봄로봇', '특수식사도구', '수동형 팔 지지대', '일반 숟가락'],
    correctAnswerIndex: 0,
    explanation: '스스로 팔을 들어 올리기 어려운 Grade III 미만 대상자에게는 전자동 식사돌봄로봇이 필요합니다.',
    category: 'C'
  },
  {
    id: 'feeding_case_q14',
    scenario: '',
    question: '먹기/마시기 기능이 가벼운 정도의 어려움인 경우 우선 고려할 수 있는 것은?',
    options: ['특수식사도구 또는 수동형 팔 지지대', '전자동 식사로봇', '경관영양만 가능', '아무것도 필요 없음'],
    correctAnswerIndex: 0,
    explanation: '가벼운 어려움 수준에서는 미세 동작 보완을 위해 특수식사도구나 수동형 팔 지지대를 우선 고려합니다.',
    category: 'C'
  },
  {
    id: 'feeding_case_q15',
    scenario: '',
    question: '팔의 근력이 좋은 경우에도 전자동 식사돌봄로봇을 사용할 수 있다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 0,
    explanation: '팔 근력이 좋더라도 삼킴 장애나 특수한 상황에 따라 보완적 목적으로 사용하거나 검토될 수 있습니다.',
    category: 'C'
  },
  {
    id: 'feeding_case_q16',
    scenario: '',
    question: '팔을 들지 못하는 대상자(< Grade III)에게 가장 적합한 장비는?',
    options: ['전자동 식사돌봄로봇', '수동형 팔 지지대', '특수식사도구만', '일반 식기'],
    correctAnswerIndex: 0,
    explanation: '스스로의 힘으로 중력을 이기고 팔을 올릴 수 없으므로 식사 과정을 자동화한 전자동 식사돌봄로봇이 적합합니다.',
    category: 'C'
  },
  {
    id: 'feeding_case_q17',
    scenario: '',
    question: '다음 중 기본적 보조도구에 해당하는 것은?',
    options: ['특수식사도구(경사접시, 코 컵)', '전자동 식사로봇', '천장형 리프트', '기립보조리프트'],
    correctAnswerIndex: 0,
    explanation: '경사식기나 컵과 같은 특수식사도구가 대표적인 식사용 기본 보조도구입니다.',
    category: 'C'
  },
  {
    id: 'feeding_case_q18',
    scenario: '',
    question: '구강섭취가 불가능한 대상자에게 특수식사도구를 우선 추천하는 것은 적절하다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 1,
    explanation: '구강섭취 불가능 시 기도로 흡입될 위험이 있어 경구용 보조도구는 권장하지 않습니다.',
    category: 'C'
  },
  // D. 사례 적용
  {
    id: 'feeding_case_q19',
    scenario: '',
    question: '대상자: 구강섭취 가능, 먹기/마시기 중간 이상 어려움, 팔 근력 Grade II. 가장 적절한 장비는?',
    options: ['전자동 식사돌봄로봇', '특수식사도구', '일반 식판', '보행기'],
    correctAnswerIndex: 0,
    explanation: '팔을 들 수 없는 수준의 마비(Grade II)가 동반된 식사 곤란자이므로 전자동 식사돌봄로봇이 가장 적절합니다.',
    category: 'D'
  },
  {
    id: 'feeding_case_q20',
    scenario: '',
    question: '대상자: 구강섭취 가능, 먹기/마시기 가벼운 어려움. 가장 적절한 선택은?',
    options: ['특수식사도구 및 수동형 팔 지지대', '전자동 식사로봇', '경관영양', '아무것도 필요 없음'],
    correctAnswerIndex: 0,
    explanation: '경증 삼킴 또는 흘림 등이 있는 상태이므로 특수식사도구를 우선 배정합니다.',
    category: 'D'
  },
  {
    id: 'feeding_case_q21',
    scenario: '',
    question: '대상자: 구강섭취 불가능. 가장 적절한 조치는?',
    options: ['의료진 지시에 따른 경관영양 또는 비경구영양', '전자동 식사로봇', '특수식사도구', '수동 팔 지지대'],
    correctAnswerIndex: 0,
    explanation: '경구 섭취 자체가 불가하므로 의사 지시에 부합하는 경관식 공급이 필수 조치입니다.',
    category: 'D'
  },
  {
    id: 'feeding_case_q22',
    scenario: '',
    question: '팔 근력이 Grade V이고 먹기/마시기 기능이 가벼운 어려움인 경우 기본 보조도구로 충분할 수 있다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 0,
    explanation: '스스로 숟가락질이 완전하므로 미세 보완 기기인 특수식사도구 정도로 충분합니다.',
    category: 'D'
  },
  {
    id: 'feeding_case_q23',
    scenario: '',
    question: '다음 중 전자동 식사돌봄로봇이 가장 필요한 대상자는?',
    options: ['① 대상자 A (팔 근력 Grade IV)', '② 대상자 B (팔 근력 Grade II)'],
    correctAnswerIndex: 1,
    explanation: '팔 마비 수준이 심한 대상자 B에게 식사 프로세스를 대행하는 전자동 로봇이 절대적으로 필요합니다.',
    category: 'D'
  },
  {
    id: 'feeding_case_q24',
    scenario: '',
    question: '다음 중 특수식사도구로 충분한 대상자는?',
    options: ['① 대상자 A (가벼운 어려움)', '② 대상자 B (중간 이상 어려움 + 팔 근력 Grade I)'],
    correctAnswerIndex: 0,
    explanation: '동작 제약이 미미한 대상자 A는 단순 보조식기류(특수식사도구)로 독립 자립을 유도할 수 있습니다.',
    category: 'D'
  }
];
