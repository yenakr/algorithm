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

export const transferCareAlgorithm = {
  id: 'transfer',
  title: '이승돌봄 및 이승돌봄로봇의 활용 알고리즘',
  startQuestionId: 'q1',
  questions: {
    q1: {
      id: 'q1',
      title: '중간 정도 이상의 어려움(2~4)이 있는가',
      simpleTitle: '중간 정도 이상의 어려움(2~4)이 있는가',
      description: '자리이동하기 기능평가*',
      simpleDescription: '자리이동하기 기능평가*',
      iconType: 'transfer',
      type: 'single',
      options: [
        { id: 'q1_no', text: '아니오', simpleText: '아니오', value: 'no' },
        { id: 'q1_yes', text: '예', simpleText: '예', value: 'yes' },
      ],
      nextQuestionId: (answers: Record<string, any>) => {
        const val = answers['q1'];
        if (val === 'yes') return 'q2';
        return null;
      },
      resultId: (answers: Record<string, any>) => {
        const val = answers['q1'];
        if (val === 'no') return 'T-B';
        return null;
      }
    } as Question,

    q2: {
      id: 'q2',
      title: '체중을 지탱할 수 없는가 (<Grade IV)',
      simpleTitle: '체중을 지탱할 수 없는가 (<Grade IV)',
      description: '하지 근력 평가**',
      simpleDescription: '하지 근력 평가**',
      iconType: 'balance',
      type: 'single',
      options: [
        { id: 'q2_no', text: '아니오', simpleText: '아니오', value: 'no' },
        { id: 'q2_yes', text: '예', simpleText: '예', value: 'yes' },
      ],
      nextQuestionId: (answers: Record<string, any>) => {
        const val = answers['q2'];
        if (val === 'yes') return 'q3';
        return 'q4';
      }
    } as Question,

    q3: {
      id: 'q3',
      title: '슬링 적용방식 고려',
      simpleTitle: '슬링 적용방식 고려',
      description: '환경 요소 고려',
      simpleDescription: '환경 요소 고려',
      iconType: 'safety',
      type: 'single',
      options: [
        { id: 'q3_none', text: '슬링 없음 (예: 로베아)', simpleText: '슬링 없음 (예: 로베아)', value: 'none' },
        { id: 'q3_auto', text: '슬링 자동 삽입 (예: 맨엔텔 자세 변환형 전동의자)', simpleText: '슬링 자동 삽입 (예: 맨엔텔 자세 변환형 전동의자)', value: 'auto' },
        { id: 'q3_manual', text: '슬링 수동 체결 (예: 슬라, 사스케)', simpleText: '슬링 수동 체결 (예: 슬라, 사스케)', value: 'manual' },
      ],
      resultId: (answers: Record<string, any>) => {
        const val = answers['q3'];
        if (val === 'none') return 'T-E';
        if (val === 'auto') return 'T-F';
        if (val === 'manual') return 'T-G';
        return null;
      }
    } as Question,

    q4: {
      id: 'q4',
      title: '스스로 상체를 일으킬 수 없는가?',
      simpleTitle: '스스로 상체를 일으킬 수 없는가?',
      description: '기립보조리프트 / 스탠딩리프트',
      simpleDescription: '기립보조리프트 / 스탠딩리프트',
      iconType: 'balance',
      type: 'single',
      options: [
        { id: 'q4_no', text: '아니오', simpleText: '아니오', value: 'no' },
        { id: 'q4_yes', text: '예', simpleText: '예', value: 'yes' },
      ],
      resultId: (answers: Record<string, any>) => {
        const val = answers['q4'];
        if (val === 'no') return 'T-D';
        if (val === 'yes') return 'T-C';
        return null;
      }
    } as Question,
  },
  results: {
    'T-B': {
      id: 'T-B',
      title: '가벼운 정도의 어려움이 있다면, • 이승보조장비 이용',
      simpleTitle: '가벼운 정도의 어려움이 있다면, • 이승보조장비 이용',
      description: '가벼운 정도의 어려움이 있다면, • 이승보조장비 이용',
      simpleDescription: '가벼운 정도의 어려움이 있다면, • 이승보조장비 이용',
      recommendation: '슬라이딩 보드 또는 이승벨트를 사용하여 안전한 이동을 지원합니다.',
      simpleRecommendation: '침대와 휠체어 사이를 매끄럽게 연결하는 슬라이딩 보드(미끄럼판)나 보호자가 잡는 이승 부축 벨트를 추천합니다.',
      reason: '자리이동하기 기능평가 결과 가벼운 정도의 어려움이 존재하나 체중 지지나 일상 수행은 크게 훼손되지 않은 단계입니다.',
      simpleResultSummary: '안전하게 미끄러지듯 이동하도록 돕는 슬라이딩 보드나 파지용 부축 벨트를 추천합니다.'
    },
    'T-C': {
      id: 'T-C',
      title: '전동형 기립보조리프트 (예: 허그, 업고플러스)',
      simpleTitle: '전동형 기립보조리프트 (예: 허그, 업고플러스)',
      description: '전동형 기립보조리프트 (예: 허그, 업고플러스)',
      simpleDescription: '전동형 기립보조리프트 (예: 허그, 업고플러스)',
      recommendation: '모터 구동식 전동형 기립보조리프트(허그, 업고플러스 등) 고려를 추천합니다.',
      simpleRecommendation: '벨트로 엉덩이와 등을 받친 후 단추만 누르면 알아서 일으켜 태우고 이동할 수 있는 전동 기립 리프트를 추천합니다.',
      reason: '체중을 스스로 지탱하지는 못하지만 상체를 가눌 힘이 남아 있어, 등판을 벨트로 감싸 안전하게 일으켜 세우는 전동 기립보조 로봇이 적합합니다.',
      simpleResultSummary: '다리 힘은 약하나 상체 고정이 가능하므로, 엉덩이를 벨트로 감싸서 전동 힘으로 일어서게 돕는 리프트를 추천합니다.'
    },
    'T-D': {
      id: 'T-D',
      title: '비전동형 기립보조기기',
      simpleTitle: '비전동형 기립보조기기',
      description: '비전동형 기립보조기기',
      simpleDescription: '비전동형 기립보조기기',
      recommendation: '수동식 기립 보조 기구를 사용하여 안전하게 일으켜 세웁니다.',
      simpleRecommendation: '전기 충전 번거로움이 없이 무릎 패드와 엉덩이 받침대를 지렛대 지지 구조로 안전하게 밀착하여 끄는 수동식 리프트 차를 추천합니다.',
      reason: '체중 지지가 어렵고 스스로 상체를 가누거나 지탱하기도 어려워 전동 기립 시 낙상 위험이 높으며 더 전반적인 신체 지지가 요구됩니다.',
      simpleResultSummary: '스스로 상체를 버티거나 손잡이를 꽉 쥐기 힘드므로, 가슴과 무릎을 패드로 다중 밀착 고정해 세우는 수동형 기립기를 추천합니다.'
    },
    'T-E': {
      id: 'T-E',
      title: '슬링 없음 (예: 로베아)',
      simpleTitle: '슬링 없음 (예: 로베아)',
      description: '슬링 없음 (예: 로베아)',
      simpleDescription: '슬링 없음 (예: 로베아)',
      recommendation: '슬링 없이 이승을 보조할 수 있는 로베아 기기의 도입을 고려합니다.',
      simpleRecommendation: '슬링 그네 시트를 사용하지 않고 안전하게 앉아서 이동하는 로베아형 장비를 추천합니다.',
      reason: '천장이나 벽 설치가 불가능하고 바닥 틈새가 있는 주거환경에서 슬링 없는 전동 리프트가 최적의 이승을 지원합니다.',
      simpleResultSummary: '슬링 체결이 번거롵을 때 시트 슬라이딩만으로 이송할 수 있는 슬링 없는 리프트를 추천합니다.'
    },
    'T-F': {
      id: 'T-F',
      title: '슬링 자동 삽입 (예: 맨엔텔 자세 변환형 전동의자)',
      simpleTitle: '슬링 자동 삽입 (예: 맨엔텔 자세 변환형 전동의자)',
      description: '슬링 자동 삽입 (예: 맨엔텔 자세 변환형 전동의자)',
      simpleDescription: '슬링 자동 삽입 (예: 맨엔텔 자세 변환형 전동의자)',
      recommendation: '슬링이 자동으로 삽입되어 대상자를 이승시키는 전동의자형 로봇을 적용합니다.',
      simpleRecommendation: '체결 과정을 기계가 자동 삽입 방식으로 단축해주는 전동의자 장비를 추천합니다.',
      reason: '수동으로 슬링을 고정하고 체결하기 곤란하지만 자동 삽입되는 스마트 전동의자를 쓸 환경이 갖추어져 있습니다.',
      simpleResultSummary: '손가락이나 어깨 통증 등으로 슬링 시트 수동 체결이 곤란하므로, 슬링 자동 삽입형 전동의자를 추천합니다.'
    },
    'T-G': {
      id: 'T-G',
      title: '슬링 수동 체결 (예: 슬라, 사스케)',
      simpleTitle: '슬링 수동 체결 (예: 슬라, 사스케)',
      description: '슬링 수동 체결 (예: 슬라, 사스케)',
      simpleDescription: '슬링 수동 체결 (예: 슬라, 사스케)',
      recommendation: '수동으로 슬링을 체결하여 안전하게 이송하는 사스케, 슬라 등의 기기를 권장합니다.',
      simpleRecommendation: '그네 시트를 수동으로 환자 몸에 감싼 뒤 모터나 휠체어에 매달아 안전하게 옮기는 장비를 추천합니다.',
      reason: '수동으로 견고히 체결하여 공중에 띄우거나 안정적인 포그를 갖춘 리프트 활용이 필요한 환경입니다.',
      simpleResultSummary: '환자 상태에 맞춰 직접 슬링 시트를 꼼꼼히 감싼 후 이동시키는 수동 체결식 리프트를 추천합니다.'
    }
  }
};
