export interface CaseStudy {
  id: string;
  scenario: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  category?: 'A' | 'B' | 'C' | 'D';
}

export const transferCases: CaseStudy[] = [
  // A. 알고리즘 이해
  {
    id: 'transfer_case_q1',
    scenario: '',
    question: '이동돌봄 알고리즘에서 가장 먼저 확인해야 하는 것은?',
    options: ['하지 근력', '자리이동하기 기능평가', '상체 기능', '설치 환경'],
    correctAnswerIndex: 1,
    explanation: '이동돌봄 알고리즘의 첫 단계에서는 자리이동하기 기능평가를 시행합니다.',
    category: 'A'
  },
  {
    id: 'transfer_case_q2',
    scenario: '',
    question: '자리이동하기 기능평가 결과가 중간 정도 이상의 어려움이면 하지 근력 평가를 시행한다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 0,
    explanation: '자리이동하기 기능평가 결과 중간 정도 이상의 어려움인 경우 다음 단계로 하지 근력 평가를 시행합니다.',
    category: 'A'
  },
  {
    id: 'transfer_case_q3',
    scenario: '',
    question: '하지 근력 Grade III인 대상자의 다음 평가로 가장 적절한 것은?',
    options: ['체중 지지 가능 여부', '장비 구매 여부', '보호자 연령', '이동 거리'],
    correctAnswerIndex: 0,
    explanation: '하지 근력이 Grade III인 대상자의 경우 다음 단계로 체중 지지 가능 여부를 평가합니다.',
    category: 'A'
  },
  {
    id: 'transfer_case_q4',
    scenario: '',
    question: '하지 근력 Grade V인 대상자에게 추가적으로 확인해야 할 것은?',
    options: ['체중 지지 가능 여부', '상체 기능', '혈압', '체온'],
    correctAnswerIndex: 1,
    explanation: '하지 근력이 Grade V인 대상자의 경우 다음 단계로 상체 기능을 확인합니다.',
    category: 'A'
  },
  {
    id: 'transfer_case_q5',
    scenario: '',
    question: '장비는 기능평가 전에 먼저 결정하는 것이 효율적이다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 1,
    explanation: '장비는 기능평가를 완료한 후 결정하는 것이 효율적입니다.',
    category: 'A'
  },
  {
    id: 'transfer_case_q6',
    scenario: '',
    question: '다음 중 알고리즘 흐름으로 가장 적절한 것은?',
    options: [
      '기능평가 → 근력평가 → 추가평가 → 장비선택',
      '근력평가 → 기능평가 → 장비선택',
      '장비선택 → 기능평가 → 근력평가',
      '기능평가 → 장비선택 → 근력평가'
    ],
    correctAnswerIndex: 0,
    explanation: '올바른 알고리즘 흐름은 기능평가 → 근력평가 → 추가평가 → 장비선택 순서입니다.',
    category: 'A'
  },
  // B. 정보 판단
  {
    id: 'transfer_case_q7',
    scenario: '',
    question: '다음 정보만으로는 장비 선택이 어렵다. 자리이동기능평가: 중간 이상 어려움, 하지 근력: Grade III. 추가로 필요한 정보는?',
    options: ['체중 지지 가능 여부', '나이', '성별', '혈액형'],
    correctAnswerIndex: 0,
    explanation: '하지 근력이 Grade III인 경우 체중 지지 가능 여부 정보를 추가로 확인해야 합니다.',
    category: 'B'
  },
  {
    id: 'transfer_case_q8',
    scenario: '',
    question: '체중 지지 가능 여부는 장비 선택에 영향을 줄 수 있다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 0,
    explanation: '체중 지지 가능 여부는 이동 및 승강 관련 장비 선택에 직접적인 영향을 미칩니다.',
    category: 'B'
  },
  {
    id: 'transfer_case_q9',
    scenario: '',
    question: '다음 정보만으로는 최종 장비 선택이 어렵다. 자리이동기능평가: 중간 이상 어려움, 하지 근력: Grade V. 추가로 필요한 정보는?',
    options: ['상체 기능', '식사량', '진단명', '병실 위치'],
    correctAnswerIndex: 0,
    explanation: '하지 근력이 Grade V인 경우 추가로 상체 기능을 평가해야 합니다.',
    category: 'B'
  },
  {
    id: 'transfer_case_q10',
    scenario: '',
    question: '상체 기능을 확인하는 가장 큰 이유는?',
    options: ['리프트 종류 결정', '식사 보조 여부', '수면 질 평가', '낙상 이력 확인'],
    correctAnswerIndex: 0,
    explanation: '상체 기능 보유 여부에 따라 적절한 리프트 종류를 결정합니다.',
    category: 'B'
  },
  {
    id: 'transfer_case_q11',
    scenario: '',
    question: '하지 근력이 좋다면 추가 평가는 필요하지 않다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 1,
    explanation: '하지 근력이 좋더라도 상체 기능 등을 판단하기 위한 추가 평가가 필요합니다.',
    category: 'B'
  },
  {
    id: 'transfer_case_q12',
    scenario: '',
    question: '다음 중 장비 선택에 직접적으로 가장 중요한 정보는?',
    options: ['대상자의 기능 수준', '대상자의 취미', '보호자의 연령', '병실 번호'],
    correctAnswerIndex: 0,
    explanation: '대상자의 기능 수준이 장비 선택에 가장 직접적이고 중요하게 반영됩니다.',
    category: 'B'
  },
  // C. 장비 선택
  {
    id: 'transfer_case_q13',
    scenario: '',
    question: '체중 지지가 불가능한 경우 우선 고려할 장비는?',
    options: ['전신승강리프트', '기립보조리프트', '슬라이드 시트', '목발'],
    correctAnswerIndex: 0,
    explanation: '체중 지지가 불가능한 경우 우선적으로 전신승강리프트를 고려합니다.',
    category: 'C'
  },
  {
    id: 'transfer_case_q14',
    scenario: '',
    question: '체중 지지가 가능한 경우 고려할 수 있는 장비는?',
    options: ['기립보조리프트', '전신승강리프트만 가능', '산소치료기', '이동 불가능'],
    correctAnswerIndex: 0,
    explanation: '체중 지지가 가능한 대상자의 경우 우선 기립보조리프트를 고려할 수 있습니다.',
    category: 'C'
  },
  {
    id: 'transfer_case_q15',
    scenario: '',
    question: '슬라이드 시트는 기본보조장비에 해당한다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 0,
    explanation: '슬라이드 시트는 이동보조를 위한 대표적인 기본보조장비입니다.',
    category: 'C'
  },
  {
    id: 'transfer_case_q16',
    scenario: '',
    question: '상체를 스스로 일으킬 수 없는 대상자에게 고려 가능한 것은?',
    options: ['천장형 또는 이동식 리프트', '슬라이드 시트만 사용', '보행기', '목발'],
    correctAnswerIndex: 0,
    explanation: '상체 기능이 상실되어 스스로 몸을 유지하기 어려운 경우 천장형 또는 이동식 전신승강리프트를 고려합니다.',
    category: 'C'
  },
  {
    id: 'transfer_case_q17',
    scenario: '',
    question: '다음 중 기본보조장비에 해당하는 것은?',
    options: ['슬라이드 시트', '천장형 리프트', '전신승강리프트', '벽형 리프트'],
    correctAnswerIndex: 0,
    explanation: '슬라이드 시트는 기본보조장비에 속합니다.',
    category: 'C'
  },
  {
    id: 'transfer_case_q18',
    scenario: '',
    question: '체중 지지가 불가능한 대상자에게 기립보조리프트를 우선 사용하는 것이 적절하다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 1,
    explanation: '체중 지지가 불가능한 경우 기립보조리프트를 사용하면 낙상 위험이 있어 적절하지 않으며, 전신승강리프트를 우선해야 합니다.',
    category: 'C'
  },
  // D. 사례 적용
  {
    id: 'transfer_case_q19',
    scenario: '',
    question: '대상자 자리이동기능평가: 중간 이상 어려움, 하지 근력: Grade II, 체중 지지 불가능. 가장 적절한 장비는?',
    options: ['전신승강리프트', '슬라이드 시트', '목발', '보행기'],
    correctAnswerIndex: 0,
    explanation: '하지 근력이 저하되어 있고 체중 지지가 힘든 대상자이므로 전신승강리프트가 가장 적절합니다.',
    category: 'D'
  },
  {
    id: 'transfer_case_q20',
    scenario: '',
    question: '대상자 자리이동기능평가: 중간 이상 어려움, 하지 근력: Grade IV, 체중 지지 가능. 가장 적절한 장비는?',
    options: ['기립보조리프트', '전신승강리프트', '슬라이드 시트', '산소치료기'],
    correctAnswerIndex: 0,
    explanation: '체중 지지가 가능한 조건이므로 안전한 거동 보조를 위해 기립보조리프트가 가장 적합합니다.',
    category: 'D'
  },
  {
    id: 'transfer_case_q21',
    scenario: '',
    question: '대상자 자리이동기능평가: 가벼운 어려움. 가장 적절한 선택은?',
    options: ['기본보조장비', '전신승강리프트', '천장형 리프트', '벽형 리프트'],
    correctAnswerIndex: 0,
    explanation: '자리이동 기능 수준이 가벼운 어려움 단계인 경우 기본보조장비(예: 슬라이드 시트)로 지원 가능합니다.',
    category: 'D'
  },
  {
    id: 'transfer_case_q22',
    scenario: '',
    question: '자리이동기능평가가 가벼운 어려움 수준이라면 기본보조장비를 우선 고려할 수 있다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 0,
    explanation: '가벼운 어려움 상태에서는 전동 리프트 유형 보다는 슬라이드 시트 등 기본보조장비를 우선 검토합니다.',
    category: 'D'
  },
  {
    id: 'transfer_case_q23',
    scenario: '',
    question: '다음 두 대상자 중 전신승강리프트가 더 적합한 대상자는?',
    options: ['A: 체중 지지 가능', 'B: 체중 지지 불가능'],
    correctAnswerIndex: 1,
    explanation: '체중 지지가 불가능한 대상자(B)에게 전신승강리프트가 더 안전하고 적합합니다.',
    category: 'D'
  },
  {
    id: 'transfer_case_q24',
    scenario: '',
    question: '다음 두 대상자 중 기립보조리프트가 더 적합한 대상자는?',
    options: ['A: 체중 지지 가능', 'B: 체중 지지 불가능'],
    correctAnswerIndex: 0,
    explanation: '체중 지탱 능력이 있는 대상자(A)에게 재활 및 능동 보조 효과가 있는 기립보조리프트가 더 적합합니다.',
    category: 'D'
  }
];
