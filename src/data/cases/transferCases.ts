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
  // A. 알고리즘 이해 (Q1 ~ Q6)
  {
    id: 'transfer_case_q1',
    scenario: '이승돌봄 알고리즘을 시작할 때, 대상자 평가의 첫 단계 과정입니다.',
    question: '이동돌봄 알고리즘에서 가장 먼저 확인해야 하는 것은 무엇인가요?',
    options: ['하지 근력', '자리이동하기 기능평가', '상체 기능', '설치 환경'],
    correctAnswerIndex: 1,
    explanation: '이승돌봄 알고리즘의 첫 단계는 대상자의 기초적인 움직임 자립도를 파악하는 \'자리이동하기 기능평가\'를 진행하는 것입니다.',
    category: 'A'
  },
  {
    id: 'transfer_case_q2',
    scenario: '자리이동하기 기능평가를 통해 대상자의 자립 수준을 확인한 직후의 단계입니다.',
    question: '자리이동하기 기능평가 결과가 중간 정도 이상의 어려움(2점 이상)이면 하지 근력 평가를 시행하나요?',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 0,
    explanation: '자리이동 기능평가 결과 중간 정도 이상의 어려움(2점 이상)인 경우, 기립보조로봇이나 리프트 계열 선택을 위해 다음 단계로 하지 근력 평가를 시행합니다.',
    category: 'A'
  },
  {
    id: 'transfer_case_q3',
    scenario: '하지 근력이 저하되어 중등도 약화(Grade III)로 평가된 대상자의 사례입니다.',
    question: '하지 근력 Grade III인 대상자의 다음 평가로 가장 적절한 것은 무엇인가요?',
    options: ['체중 지지 가능 여부', '장비 구매 여부', '보호자 연령', '이동 거리'],
    correctAnswerIndex: 0,
    explanation: '하지 근력이 Grade III(중등도 약화) 수준인 경우, 스스로 다리 힘을 가해 체중을 지탱할 수 있는지(체중 지지 가능 여부)를 평가하여 적절한 이송 기기를 매칭합니다.',
    category: 'A'
  },
  {
    id: 'transfer_case_q4',
    scenario: '하지 근력이 Grade V(정상 또는 경미한 약화) 상태인 대상자의 장비를 선택하기 위한 단계입니다.',
    question: '하지 근력 Grade V인 대상자에게 추가적으로 확인해야 할 것은 무엇인가요?',
    options: ['체중 지지 가능 여부', '상체 기능', '혈압', '체온'],
    correctAnswerIndex: 1,
    explanation: '하지 근력이 Grade IV~V인 대상자의 경우, 기립보조로봇 유형을 세분화하기 위해 스스로 상체를 일으키고 유지할 수 있는지(상체 기능)를 평가합니다.',
    category: 'A'
  },
  {
    id: 'transfer_case_q5',
    scenario: '알고리즘 흐름의 효율성과 설계 원칙에 대한 설명입니다.',
    question: '장비는 기능평가 전에 먼저 결정하는 것이 효율적입니까?',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 1,
    explanation: '대상자의 기능평가(자리이동, 하지근력 등)를 먼저 완료하여 신체 역량을 정확히 분석한 후에 최적의 장비를 결정하는 것이 원칙입니다.',
    category: 'A'
  },
  {
    id: 'transfer_case_q6',
    scenario: '이승돌봄로봇 알고리즘의 전체 판단 프로세스를 요약한 질문입니다.',
    question: '다음 중 알고리즘 흐름으로 가장 적절한 것은 무엇인가요?',
    options: [
      '기능평가 → 근력평가 → 추가평가 → 장비선택',
      '근력평가 → 기능평가 → 장비선택',
      '장비선택 → 기능평가 → 근력평가',
      '기능평가 → 장비선택 → 근력평가'
    ],
    correctAnswerIndex: 0,
    explanation: '이승돌봄 알고리즘은 기능평가(자리이동)를 먼저 하고, 이어서 근력평가(하지근력)를 진행한 후 세부 추가평가(체중 지지, 상체 조작 등)를 거쳐 최종 장비를 매칭합니다.',
    category: 'A'
  },

  // B. 정보 판단 (Q7 ~ Q12)
  {
    id: 'transfer_case_q7',
    scenario: '기동성 제한은 크지만 다리 힘의 잔존 상태를 통해 보조 형태를 결정하려는 시점입니다.',
    question: '다음 정보만으로는 장비 선택이 어렵습니다. [자리이동기능평가: 중간 이상 어려움, 하지 근력: Grade III] 추가로 필요한 정보는 무엇인가요?',
    options: ['체중 지지 가능 여부', '나이', '성별', '혈액형'],
    correctAnswerIndex: 0,
    explanation: '하지 근력이 Grade III로 지탱력이 부족할 때는 환자가 몸무게를 스스로 싣고 설 수 있는지(체중 지지 여부)를 추가 평가하여 기립보조인지 전신리프트인지 확정합니다.',
    category: 'B'
  },
  {
    id: 'transfer_case_q8',
    scenario: '스스로 다리로 일어설 수 있는지에 따라 장비의 기계 동력 형태가 극단적으로 갈리는 판단 기준입니다.',
    question: '체중 지지 가능 여부는 장비 선택에 영향을 줄 수 있나요?',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 0,
    explanation: '스스로의 다리 힘으로 체중을 지탱하지 못한다면 매달아 올리는 전신승강리프트(슬링 리프트)가 필수적이므로 장비 선택에 핵심적인 영향을 미칩니다.',
    category: 'B'
  },
  {
    id: 'transfer_case_q9',
    scenario: '자리이동은 힘들지만 하지 근력이 정상(Grade V)인 대상자의 최종 기기 매칭을 분석 중입니다.',
    question: '다음 정보만으로는 최종 장비 선택이 어렵습니다. [자리이동기능평가: 중간 이상 어려움, 하지 근력: Grade V] 추가로 필요한 정보는 무엇인가요?',
    options: ['상체 기능', '식사량', '진단명', '병실 위치'],
    correctAnswerIndex: 0,
    explanation: '하지 근력이 좋아도 상체를 가눌 수 있는지(상체 기능)에 따라 전동 기립보조기를 쓸지 수동 기립보조기를 쓸지 나뉘므로 상체 기능을 평가해야 합니다.',
    category: 'B'
  },
  {
    id: 'transfer_case_q10',
    scenario: '대상자가 이승 벨트를 꽉 붙잡을 수 있는지, 상체 균형을 스스로 10초 이상 유지할 수 있는지 평가하는 이유입니다.',
    question: '상체 기능을 확인하는 가장 큰 이유는 무엇인가요?',
    options: ['리프트 종류 결정', '식사 보조 여부', '수면 질 평가', '낙상 이력 확인'],
    correctAnswerIndex: 0,
    explanation: '상체 지지력이 있으면 기립보조기를 쓸 수 있지만, 상체가 완전히 무너지는 대상자는 전동 허그/슬링 리프트 같은 전신형을 적용해야 하므로 리프트 종류 결정에 결정적입니다.',
    category: 'B'
  },
  {
    id: 'transfer_case_q11',
    scenario: '다리 근력이 최고 수준(정상)이므로, 자리이동의 다른 장해 평가는 모두 스킵하려 하는 상황입니다.',
    question: '하지 근력이 좋다면 추가 평가는 필요하지 않나요?',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 1,
    explanation: '하지 근력이 뛰어나더라도 허리를 펴고 앉아있지 못하는 등 상체 중심을 잡지 못하면 이송 시 낙상 위험이 높으므로 추가 평가(상체 기능, 환경 등)가 진행되어야 합니다.',
    category: 'B'
  },
  {
    id: 'transfer_case_q12',
    scenario: '수많은 환자의 인적 정보와 의료 기록 중 장비 도입 결정의 나침반이 되는 핵심 기준입니다.',
    question: '다음 중 장비 선택에 직접적으로 가장 중요한 정보는 무엇인가요?',
    options: ['대상자의 기능 수준', '대상자의 취미', '보호자의 연령', '병실 번호'],
    correctAnswerIndex: 0,
    explanation: '환자가 스스로 일어설 수 있는지, 상체를 가누는지 등의 신체 기능 수준이 최우선 매칭 기준이 됩니다.',
    category: 'B'
  },

  // C. 장비 선택 (Q13 ~ Q18)
  {
    id: 'transfer_case_q13',
    scenario: '스스로 다리로 디디고 서서 1초도 버틸 수 없는 중증 와상 환자의 장비 처방 기준입니다.',
    question: '체중 지지가 불가능한 경우 우선 고려할 장비는 무엇인가요?',
    options: ['전신승강리프트', '기립보조리프트', '슬라이드 시트', '목발'],
    correctAnswerIndex: 0,
    explanation: '다리로 체중 지지가 안 되는 환자는 기립보조리프트를 사용할 수 없으며, 안전하게 들어 올릴 수 있는 그네(슬링)식 \'전신승강리프트\'를 처방해야 합니다.',
    category: 'C'
  },
  {
    id: 'transfer_case_q14',
    scenario: '하지 근육 마비가 덜해, 누군가 상체 벨트를 채워 일으켜 주면 서서 유지할 수 있는 고령자입니다.',
    question: '체중 지지가 가능한 경우 고려할 수 있는 장비는 무엇인가요?',
    options: ['기립보조리프트', '전신승강리프트만 가능', '산소치료기', '이동 불가능'],
    correctAnswerIndex: 0,
    explanation: '체중을 다리로 지탱하고 버틸 수 있다면, 굳이 전신을 띄우지 않고 일어서는 동작을 보조하는 \'기립보조리프트\'를 활용해 이동하는 것이 재활 및 안전에 좋습니다.',
    category: 'C'
  },
  {
    id: 'transfer_case_q15',
    scenario: '환자를 침대에서 휠체어로 살짝 당겨 밀 때 마찰력을 줄여주는 얇은 매끄러운 천(시트)의 보조장비 분류입니다.',
    question: '슬라이드 시트는 기본보조장비에 해당하나요?',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 0,
    explanation: '이송을 간편하게 도와주는 슬라이드 시트나 슬라이딩 보드는 비교적 저렴하고 널리 쓰이는 \'기본보조장비\' 범주에 들어갑니다.',
    category: 'C'
  },
  {
    id: 'transfer_case_q16',
    scenario: '의식 및 근력 소실로 휠체어에 앉혔을 때 바로 몸이 앞으로 쏠려 꼬꾸라지는 환자의 이송 조치입니다.',
    question: '상체를 스스로 일으킬 수 없는 대상자에게 고려 가능한 가장 적합한 것은 무엇인가요?',
    options: ['천장형 또는 이동식 리프트', '슬라이드 시트만 사용', '보행기', '목발'],
    correctAnswerIndex: 0,
    explanation: '상체 조절력이 전혀 없는 중증 환자는 슬링(그네형 시트)으로 전신을 완전히 포지셔닝하고 띄워주는 천장형 리프트 또는 이동식 겐트리 리프트가 필수적입니다.',
    category: 'C'
  },
  {
    id: 'transfer_case_q17',
    scenario: '가옥에 레일을 타공해 달아야 하는 고가 리프트 외에, 상시 비치하여 쓸 수 있는 도구들을 확인 중입니다.',
    question: '다음 중 기본보조장비에 해당하는 것은 무엇인가요?',
    options: ['슬라이드 시트', '천장형 리프트', '전신승강리프트', '벽형 리프트'],
    correctAnswerIndex: 0,
    explanation: '천장식/벽식/전동식 리프트들은 전문 전동 대형 장비이며, 마찰력을 줄여주는 슬라이드 시트는 간편한 기본 보조 기구입니다.',
    category: 'C'
  },
  {
    id: 'transfer_case_q18',
    scenario: '양다리가 마비되어 서 있을 수 없는 환자를 전동 기립 리프트에 강제로 태우려고 계획 중인 상황입니다.',
    question: '체중 지지가 불가능한 대상자에게 기립보조리프트를 우선 사용하는 것이 적절한가요?',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 1,
    explanation: '체중 지지가 전혀 안 되는 환자를 기립 리프트에 태우면 몸이 밑으로 미끄러져 추락하거나 관절이 꺾이는 심각한 위험을 유발하므로 절대 부적절합니다.',
    category: 'C'
  },

  // D. 사례 적용 (Q19 ~ Q24)
  {
    id: 'transfer_case_q19',
    scenario: '대상자 평가 결과: [자리이동하기: 중등도 이상 어려움, 하지 근력: Grade II(매우 약함), 체중 지지: 불가] 상태입니다.',
    question: '이 환자에게 가장 안전하고 적절한 장비는 무엇인가요?',
    options: ['전신승강리프트', '슬라이드 시트', '목발', '보행기'],
    correctAnswerIndex: 0,
    explanation: '다리 지탱력이 완전히 소실(Grade II)되고 체중 지지가 불가한 와상 대상자이므로, 전신을 편안히 받쳐서 이송하는 \'전신승강리프트\'가 가장 적절합니다.',
    category: 'D'
  },
  {
    id: 'transfer_case_q20',
    scenario: '대상자 평가 결과: [자리이동하기: 중등도 어려움, 하지 근력: Grade IV(비교적 양호), 체중 지탱: 가능] 상태입니다.',
    question: '이 환자에게 추천하기에 가장 적합한 장비는 무엇인가요?',
    options: ['기립보조리프트', '전신승강리프트', '슬라이드 시트', '산소치료기'],
    correctAnswerIndex: 0,
    explanation: '하지 근력이 비교적 살아있어 다리에 힘을 싣고 서실 수 있으므로, 일으켜 세워 주는 \'기립보조리프트\'를 처방하는 것이 적절합니다.',
    category: 'D'
  },
  {
    id: 'transfer_case_q21',
    scenario: '고령자가 가벼운 관절염 수준으로 인해 휠체어를 탈 때 약간 균형이 삐끗하지만 일어서기는 가뿐히 하십니다.',
    question: '자리이동기능평가 결과 가벼운 어려움(1점) 수준인 경우 가장 적절한 선택은 무엇인가요?',
    options: ['기본보조장비', '전신승강리프트', '천장형 리프트', '벽형 리프트'],
    correctAnswerIndex: 0,
    explanation: '중증 기능 상실이 아니므로 고가의 리프트는 불필요하며, 간단하게 이송을 부드럽게 돕는 슬라이드 시트나 이송 보드 등 \'기본보조장비\'로 충분합니다.',
    category: 'D'
  },
  {
    id: 'transfer_case_q22',
    scenario: '침대에서 혼자서 몸을 트는 데는 약간의 뻐근한 어려움을 겪는 대상자를 지원하려고 합니다.',
    question: '자리이동기능평가가 가벼운 어려움 수준이라면 기본보조장비를 우선 고려할 수 있나요?',
    options: ['예 (O)', '아니오 (X)'],
    correctAnswerIndex: 0,
    explanation: '가벼운 거동 제약이 있는 분들은 값비싼 모터 장비 대신 슬라이딩 보드 같은 기본 보조 도구만 배치해도 보호자와 환자 모두 편리하게 자립할 수 있습니다.',
    category: 'D'
  },
  {
    id: 'transfer_case_q23',
    scenario: '리프트 장비를 선정할 두 대상자 A와 B의 신체 조건을 대조하고 있습니다.',
    question: '다음 두 대상자 중 그네 슬링을 이용해 전신을 띄우는 전신승강리프트가 절대적으로 더 적합한 대상자는 누구인가요?',
    options: ['A: 체중 지지 가능', 'B: 체중 지지 불가능'],
    correctAnswerIndex: 1,
    explanation: '체중 지지가 불가능한 대상자 B에게는 일어서서 지탱하는 기립보조기를 쓸 수 없으므로 몸을 완전히 띄우는 전신승강리프트가 필수적입니다.',
    category: 'D'
  },
  {
    id: 'transfer_case_q24',
    scenario: '보호자와 환자의 근골격계 안전을 위해 일으키는 형태의 기기를 적용할 적절한 환경을 찾고 있습니다.',
    question: '다음 두 대상자 중 가슴과 무릎 패드를 댄 채 일으켜 세우는 기립보조리프트가 가장 적합한 대상자는 누구인가요?',
    options: ['A: 체중 지지 가능', 'B: 체중 지지 불가능'],
    correctAnswerIndex: 0,
    explanation: '다리 지탱 및 체중 지지가 가능한 대상자 A는 기립보조기를 활용해 일어서기 훈련을 하면서 이송될 때 잔존 다리 힘을 유지하는 데 매우 도움이 됩니다.',
    category: 'D'
  }
];
