import { CaseStudy } from './transferCases';

export const feedingCases: CaseStudy[] = [
  // A. 알고리즘 이해 (Q1 ~ Q6)
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
    explanation: '구강섭취가 가능한 경우, 다음 단계로 먹기/마시기 기능평가를 시행합니다.',
    category: 'A'
  },
  {
    id: 'feeding_case_q3',
    scenario: '',
    question: '먹기/마시기 기능평가 결과가 중간 정도 이상의 어려움이면 다음으로 시행해야 할 평가는?',
    options: ['팔의 근력 평가', '체중 지지 여부', '인지 기능', '시력 평가'],
    correctAnswerIndex: 0,
    explanation: '먹기/마시기 기능평가 결과 중간 이상 어려움인 경우 다음 단계로 팔의 근력 평가를 시행합니다.',
    category: 'A'
  },
  {
    id: 'feeding_case_q4',
    scenario: '',
    question: '팔의 근력이 Grade III 미만인 경우 가장 적합한 장비는?',
    options: ['전자동 식사돌봄로봇', '특수식사도구', '수동형 팔 지지대', '일반 식판'],
    correctAnswerIndex: 0,
    explanation: '팔 근력이 Grade III 미만인 경우 전자동 식사돌봄로봇을 우선 고려합니다.',
    category: 'A'
  },
  {
    id: 'feeding_case_q5',
    scenario: '',
    question: '구강섭취가 불가능한 경우에도 먹기/마시기 기능평가를 먼저 시행해야 한다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 1,
    explanation: '구강섭취가 불가능한 경우 먹기/마시기 기능평가는 시행하지 않습니다.',
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
    explanation: '알고리즘의 올바른 흐름은 삼킴 평가 → 구강섭취 가능 여부 → 먹기/마시기 평가 → 팔 근력 평가 → 장비 선택 순서입니다.',
    category: 'A'
  },
  // B. 정보 판단 (Q7 ~ Q12)
  {
    id: 'feeding_case_q7',
    scenario: '',
    question: '구강섭취 가능, 먹기/마시기 기능: 중간 이상 어려움. 추가로 가장 필요한 평가는?',
    options: ['팔의 근력 평가', '체중', '나이', '성별'],
    correctAnswerIndex: 0,
    explanation: '먹기/마시기 기능이 중간 이상 어려움일 때 팔의 근력 평가가 필요합니다.',
    category: 'B'
  },
  {
    id: 'feeding_case_q8',
    scenario: '',
    question: '팔의 근력 평가는 중간 이상 어려움인 경우에만 시행한다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 0,
    explanation: '팔의 근력 평가는 먹기/마시기 기능이 중간 이상 어려움인 경우에만 시행합니다.',
    category: 'B'
  },
  {
    id: 'feeding_case_q9',
    scenario: '',
    question: '팔의 근력이 Grade III 이상이어도 추가 정보가 필요할 수 있다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 0,
    explanation: '팔의 근력이 Grade III 이상인 경우에도 상세한 보조도구 매칭을 위해 추가 정보가 필요할 수 있습니다.',
    category: 'B'
  },
  {
    id: 'feeding_case_q10',
    scenario: '',
    question: '구강섭취가 불가능한 대상자에게 가장 먼저 고려해야 할 것은?',
    options: ['의료진 지시에 따른 경관영양', '전자동 식사로봇', '특수식사도구', '수동 팔 지지대'],
    correctAnswerIndex: 0,
    explanation: '구강섭취가 불가능한 대상자에게는 의료진 지시에 따른 경관영양을 최우선으로 고려합니다.',
    category: 'B'
  },
  {
    id: 'feeding_case_q11',
    scenario: '',
    question: '가벼운 정도의 어려움인 경우 팔의 근력 평가는 필수이다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 1,
    explanation: '먹기/마시기 기능이 가벼운 정도의 어려움인 경우 팔의 근력 평가는 필수가 아닙니다.',
    category: 'B'
  },
  {
    id: 'feeding_case_q12',
    scenario: '',
    question: '식사 돌봄 장비 선택에 가장 직접적으로 영향을 미치는 정보는?',
    options: ['대상자의 기능 수준', '보호자 연령', '병실 크기', '식사 시간'],
    correctAnswerIndex: 0,
    explanation: '대상자의 기능 수준이 식사 돌봄 장비 선택에 가장 핵심적인 정보입니다.',
    category: 'B'
  },
  // C. 장비 선택 (Q13 ~ Q18)
  {
    id: 'feeding_case_q13',
    scenario: '',
    question: '먹기/마시기 기능이 중간 이상 어려움 + 팔 근력 Grade III 미만인 경우 우선 고려할 장비는?',
    options: ['전자동 식사돌봄로봇', '특수식사도구', '수동형 팔 지지대', '일반 숟가락'],
    correctAnswerIndex: 0,
    explanation: '먹기/마시기 중간 이상 어려움에 팔 근력이 Grade III 미만인 경우 전자동 식사돌봄로봇을 우선 고려합니다.',
    category: 'C'
  },
  {
    id: 'feeding_case_q14',
    scenario: '',
    question: '먹기/마시기 기능이 가벼운 정도의 어려움인 경우 우선 고려할 수 있는 것은?',
    options: ['특수식사도구 또는 수동형 팔 지지대', '전자동 식사로봇', '경관영양만 가능', '아무것도 필요 없음'],
    correctAnswerIndex: 0,
    explanation: '가벼운 정도의 어려움이 있는 경우 특수식사도구 또는 수동형 팔 지지대를 우선 고려합니다.',
    category: 'C'
  },
  {
    id: 'feeding_case_q15',
    scenario: '',
    question: '팔의 근력이 좋은 경우에도 전자동 식사돌봄로봇을 사용할 수 있다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 0,
    explanation: '인지장애나 다른 요인으로 식사 도구 사용이 어려운 경우, 팔의 근력이 좋아도 전자동 로봇을 사용할 수 있습니다.',
    category: 'C'
  },
  {
    id: 'feeding_case_q16',
    scenario: '',
    question: '팔을 들지 못하는 대상자(< Grade III)에게 가장 적합한 장비는?',
    options: ['전자동 식사돌봄로봇', '수동형 팔 지지대', '특수식사도구만', '일반 식기'],
    correctAnswerIndex: 0,
    explanation: '팔을 들지 못하는 대상자에게는 식사를 스스로 도울 수 있도록 지원하는 전자동 식사돌봄로봇이 가장 적합합니다.',
    category: 'C'
  },
  {
    id: 'feeding_case_q17',
    scenario: '',
    question: '다음 중 기본적 보조도구에 해당하는 것은?',
    options: ['특수식사도구(경사접시, 코 컵)', '전자동 식사로봇', '천장형 리프트', '기립보조리프트'],
    correctAnswerIndex: 0,
    explanation: '경사접시나 코 컵 같은 특수식사도구는 기본적인 식사 보조도구에 해당합니다.',
    category: 'C'
  },
  {
    id: 'feeding_case_q18',
    scenario: '',
    question: '구강섭취가 불가능한 대상자에게 특수식사도구를 우선 추천하는 것은 적절하다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 1,
    explanation: '구강섭취가 불가할 때는 삼킴 장애 위험으로 특수식사도구 사용이 부적절합니다.',
    category: 'C'
  },
  // D. 사례 적용 (Q19 ~ Q24)
  {
    id: 'feeding_case_q19',
    scenario: '',
    question: '대상자: 구강섭취 가능, 먹기/마시기 중간 이상 어려움, 팔 근력 Grade II. 가장 적절한 장비는?',
    options: ['전자동 식사돌봄로봇', '특수식사도구', '일반 식판', '보행기'],
    correctAnswerIndex: 0,
    explanation: '먹기/마시기 기능 중간 이상 어려움에 팔 근력이 Grade II인 대상자에게는 전자동 식사돌봄로봇이 가장 적합합니다.',
    category: 'D'
  },
  {
    id: 'feeding_case_q20',
    scenario: '',
    question: '대상자: 구강섭취 가능, 먹기/마시기 가벼운 어려움. 가장 적절한 선택은?',
    options: ['특수식사도구 및 수동형 팔 지지대', '전자동 식사로봇', '경관영양', '아무것도 필요 없음'],
    correctAnswerIndex: 0,
    explanation: '가벼운 어려움이 있는 경우에는 특수식사도구 및 수동형 팔 지지대가 가장 적절합니다.',
    category: 'D'
  },
  {
    id: 'feeding_case_q21',
    scenario: '',
    question: '대상자: 구강섭취 불가능. 가장 적절한 조치는?',
    options: ['의료진 지시에 따른 경관영양 또는 비경구영양', '전자동 식사로봇', '특수식사도구', '수동 팔 지지대'],
    correctAnswerIndex: 0,
    explanation: '구강섭취가 불가능한 대상자에게는 의료진 지시에 따른 경관영양이 가장 적절한 조치입니다.',
    category: 'D'
  },
  {
    id: 'feeding_case_q22',
    scenario: '',
    question: '팔 근력이 Grade V이고 먹기/마시기 기능이 가벼운 어려움인 경우 기본 보조도구로 충분할 수 있다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 0,
    explanation: '팔 근력이 우수하고 가벼운 정도의 어려움만 있다면 기본적인 특수식사도구만으로 충분할 수 있습니다.',
    category: 'D'
  },
  {
    id: 'feeding_case_q23',
    scenario: '',
    question: '다음 중 전자동 식사돌봄로봇이 가장 필요한 대상자는?',
    options: ['A: 팔 근력 Grade IV', 'B: 팔 근력 Grade II'],
    correctAnswerIndex: 1,
    explanation: '팔 근력이 더 떨어지는 대상자 B(Grade II)에게 전자동 식사돌봄로봇이 더욱 필요합니다.',
    category: 'D'
  },
  {
    id: 'feeding_case_q24',
    scenario: '',
    question: '다음 중 특수식사도구로 충분한 대상자는?',
    options: ['A: 가벼운 어려움', 'B: 중간 이상 어려움 + 팔 근력 Grade I'],
    correctAnswerIndex: 0,
    explanation: '가벼운 어려움이 있는 대상자 A가 특수식사도구를 사용하기에 적합합니다.',
    category: 'D'
  }
];
