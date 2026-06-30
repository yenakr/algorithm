export interface CaseStudy {
  id: string;
  scenario: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  category: 'A' | 'B' | 'C' | 'D';
}

export const transferCases: CaseStudy[] = [
  // A. 알고리즘 이해
  {
    id: 'transfer_case_q1',
    scenario: '',
    question: '이동돌봄 알고리즘에서 가장 먼저 확인해야 하는 것은?',
    options: ['하지 근력', '자리이동하기 기능평가', '상체 기능', '설치 환경'],
    correctAnswerIndex: 1,
    explanation: '이승(이동)돌봄 알고리즘의 첫 단계에서는 자리이동하기 기능 평가를 시행합니다.',
    category: 'A'
  },
  {
    id: 'transfer_case_q2',
    scenario: '',
    question: '자리이동하기 기능평가 결과가 중간 정도 이상의 어려움이면 하지 근력 평가를 시행한다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 0,
    explanation: '자리이동하기 어려움이 중간 이상 수준인 경우 하지 근력의 손상도를 파악하기 위해 근력 평가를 진행합니다.',
    category: 'A'
  },
  {
    id: 'transfer_case_q3',
    scenario: '',
    question: '하지 근력 Grade III인 대상자의 다음 평가로 가장 적절한 것은?',
    options: ['체중 지지 가능 여부', '장비 구매 여부', '보호자 연령', '이동 거리'],
    correctAnswerIndex: 0,
    explanation: '하지 근력이 저하(Grade III)되어 있으므로 체중 지지를 하고 서 있을 수 있는지 우선 판별합니다.',
    category: 'A'
  },
  {
    id: 'transfer_case_q4',
    scenario: '',
    question: '하지 근력 Grade V인 대상자에게 추가적으로 확인해야 할 것은?',
    options: ['체중 지지 가능 여부', '상체 기능', '혈압', '체온'],
    correctAnswerIndex: 1,
    explanation: '하지 근력은 양호(Grade V)하나 이동 기능상 지장이 있으므로 상체(상지) 조절 기능을 검토합니다.',
    category: 'A'
  },
  {
    id: 'transfer_case_q5',
    scenario: '',
    question: '장비는 기능평가 전에 먼저 결정하는 것이 효율적이다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 1,
    explanation: '대상자의 기능 평가가 완료된 후에 적합한 이동지원로봇 종류를 결정하는 것이 올바른 순서입니다.',
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
    explanation: '올바른 알고리즘 흐름은 자리이동 기능평가 → 하지 근력 평가 → 체중지지/상체조절 등 추가평가 → 최종 장비선택 순서입니다.',
    category: 'A'
  },
  // B. 정보 판단
  {
    id: 'transfer_case_q7',
    scenario: '',
    question: '다음 정보만으로는 장비 선택이 어렵다. 자리이동기능평가: 중간 이상 어려움, 하지 근력: Grade III. 추가로 필요한 정보는?',
    options: ['체중 지지 가능 여부', '나이', '성별', '혈액형'],
    correctAnswerIndex: 0,
    explanation: 'Grade III 상태에서는 체중 지지 자립도가 기립보조형 또는 매달리는 형태의 리프트 중 어떤 리프트를 쓸지 결정합니다.',
    category: 'B'
  },
  {
    id: 'transfer_case_q8',
    scenario: '',
    question: '체중 지지 가능 여부는 장비 선택에 영향을 줄 수 있다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 0,
    explanation: '체중 지지 가능 여부에 따라 전신형 리프트와 기립식 리프트의 방향이 다르게 결정됩니다.',
    category: 'B'
  },
  {
    id: 'transfer_case_q9',
    scenario: '',
    question: '다음 정보만으로는 최종 장비 선택이 어렵다. 자리이동기능평가: 중간 이상 어려움, 하지 근력: Grade V. 추가로 필요한 정보는?',
    options: ['상체 기능', '식사량', '진단명', '병실 위치'],
    correctAnswerIndex: 0,
    explanation: '다리 근력이 좋은 상태에서 이동의 곤란함이 있다면, 상체 조절력이 떨어졌는지(상체 기능)를 평가해봐야 합니다.',
    category: 'B'
  },
  {
    id: 'transfer_case_q10',
    scenario: '',
    question: '상체 기능을 확인하는 가장 큰 이유는?',
    options: ['리프트 종류 결정', '식사 보조 여부', '수면 질 평가', '낙상 이력 확인'],
    correctAnswerIndex: 0,
    explanation: '상체를 유지할 수 있는지에 따라 몸체 고정 밴드 부위 및 리프트의 탑승 방식이 다릅니다.',
    category: 'B'
  },
  {
    id: 'transfer_case_q11',
    scenario: '',
    question: '하지 근력이 좋다면 추가 평가는 필요하지 않다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 1,
    explanation: '하지 근력이 완전하더라도 상체의 강도나 균형감각에 문제가 있을 수 있으므로 연쇄적인 추가 평가가 요구됩니다.',
    category: 'B'
  },
  {
    id: 'transfer_case_q12',
    scenario: '',
    question: '다음 중 장비 선택에 직접적으로 가장 중요한 정보는?',
    options: ['대상자의 기능 수준', '대상자의 취미', '보호자의 연령', '병실 번호'],
    correctAnswerIndex: 0,
    explanation: '이동장비 매칭에는 다른 정보보다 환자 본인의 인체 기능 평가 결과가 가장 핵심적입니다.',
    category: 'B'
  },
  // C. 장비 선택
  {
    id: 'transfer_case_q13',
    scenario: '',
    question: '체중 지지가 불가능한 경우 우선 고려할 장비는?',
    options: ['전신승강리프트', '기립보조리프트', '슬라이드 시트', '목발'],
    correctAnswerIndex: 0,
    explanation: '스스로 일어설 수 없으므로 환자 전체 몸무게를 매달아 올려 이동시키는 전신승강리프트가 필수적입니다.',
    category: 'C'
  },
  {
    id: 'transfer_case_q14',
    scenario: '',
    question: '체중 지지가 가능한 경우 고려할 수 있는 장비는?',
    options: ['기립보조리프트', '전신승강리프트만 가능', '산소치료기', '이동 불가능'],
    correctAnswerIndex: 0,
    explanation: '체중을 어느 정도 지탱해 일어설 수 있다면 일어서는 모션을 보조해주는 기립보조리프트를 고려합니다.',
    category: 'C'
  },
  {
    id: 'transfer_case_q15',
    scenario: '',
    question: '슬라이드 시트는 기본보조장비에 해당한다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 0,
    explanation: '환자의 체위를 미끄러뜨리듯 바꾸어주는 슬라이드 시트는 리프트와 다른 기본형 보조 도구군에 들어갑니다.',
    category: 'C'
  },
  {
    id: 'transfer_case_q16',
    scenario: '',
    question: '상체를 스스로 일으킬 수 없는 대상자에게 고려 가능한 것은?',
    options: ['천장형 또는 이동식 리프트', '슬라이드 시트만 사용', '보행기', '목발'],
    correctAnswerIndex: 0,
    explanation: '상체 지탱조차 어려운 대상자는 신체를 완벽하게 감싸서 지지해 올릴 수 있는 이동형 리프트 장치(천장형/이동식)가 필요합니다.',
    category: 'C'
  },
  {
    id: 'transfer_case_q17',
    scenario: '',
    question: '다음 중 기본보조장비에 해당하는 것은?',
    options: ['슬라이드 시트', '천장형 리프트', '전신승강리프트', '벽형 리프트'],
    correctAnswerIndex: 0,
    explanation: '슬라이드 시트가 대표적인 기계식 리프트 이전 단계의 간이형 기본보조장치입니다.',
    category: 'C'
  },
  {
    id: 'transfer_case_q18',
    scenario: '',
    question: '체중 지지가 불가능한 대상자에게 기립보조리프트를 우선 사용하는 것이 적절하다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 1,
    explanation: '체중을 버틸 수 없는 환자를 억지로 세우면 골절이나 낙상의 심각한 위험을 유발합니다.',
    category: 'C'
  },
  // D. 사례 적용
  {
    id: 'transfer_case_q19',
    scenario: '',
    question: '대상자 자리이동기능평가: 중간 이상 어려움, 하지 근력: Grade II, 체중 지지 불가능. 가장 적절한 장비는?',
    options: ['전신승강리프트', '슬라이드 시트', '목발', '보행기'],
    correctAnswerIndex: 0,
    explanation: '스스로 체중을 지탱하지 못하고 마비도 심하므로 공중으로 몸을 띄워 이동하는 전신승강리프트가 타당합니다.',
    category: 'D'
  },
  {
    id: 'transfer_case_q20',
    scenario: '',
    question: '대상자 자리이동기능평가: 중간 이상 어려움, 하지 근력: Grade IV, 체중 지지 가능. 가장 적절한 장비는?',
    options: ['기립보조리프트', '전신승강리프트', '슬라이드 시트', '산소치료기'],
    correctAnswerIndex: 0,
    explanation: '다리 힘이 어느 정도 있고 서는 균형이 가능한 수준이므로 환자의 일어섬을 보조하는 기립보조리프트를 매칭합니다.',
    category: 'D'
  },
  {
    id: 'transfer_case_q21',
    scenario: '',
    question: '대상자 자리이동기능평가: 가벼운 어려움. 가장 적절한 선택은?',
    options: ['기본보조장비', '전신승강리프트', '천장형 리프트', '벽형 리프트'],
    correctAnswerIndex: 0,
    explanation: '단순 보행 균형 보정만 필요한 가벼운 경증 환자이므로 리프트 대신 슬라이드 시트 등의 기본보조장비로 관리합니다.',
    category: 'D'
  },
  {
    id: 'transfer_case_q22',
    scenario: '',
    question: '자리이동기능평가가 가벼운 어려움 수준이라면 기본보조장비를 우선 고려할 수 있다.',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 0,
    explanation: '경미한 거동 제한 환자에게 고가의 전동 승강 장비보다는 우선 기본 시트나 저비용 도구를 검토합니다.',
    category: 'D'
  },
  {
    id: 'transfer_case_q23',
    scenario: '',
    question: '다음 두 대상자 중 전신승강리프트가 더 적합한 대상자는?',
    options: ['① 대상자 A (체중 지지 가능)', '② 대상자 B (체중 지지 불가능)'],
    correctAnswerIndex: 1,
    explanation: '자력으로 일어서지 못하는 중증 와상 상태의 대상자 B에게 매달아 옮기는 전신형 리프트가 훨씬 더 적합합니다.',
    category: 'D'
  },
  {
    id: 'transfer_case_q24',
    scenario: '',
    question: '다음 두 대상자 중 기립보조리프트가 더 적합한 대상자는?',
    options: ['① 대상자 A (체중 지지 가능)', '② 대상자 B (체중 지지 불가능)'],
    correctAnswerIndex: 0,
    explanation: '일어설 수는 있으나 다리에 온전한 힘을 주기 힘든 대상자 A에게 기립 모션 보조 장치인 기립형 리프트가 권장됩니다.',
    category: 'D'
  }
];
