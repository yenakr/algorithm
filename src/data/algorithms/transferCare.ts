export interface Option {
  id: string;
  text: string;
  score?: number;
  value: string;
}

export interface Question {
  id: string;
  title: string;
  description?: string;
  simpleDescription?: string;
  type: 'single' | 'multi';
  options: Option[];
  nextQuestionId?: string | ((answers: Record<string, any>) => string | null);
  resultId?: string | ((answers: Record<string, any>) => string | null);
}

export interface Result {
  id: string;
  title: string;
  description: string;
  recommendation: string;
  reason: string;
  simpleResultSummary?: string;
  simpleTips?: string[];
}

export const transferCareAlgorithm = {
  id: 'transfer',
  title: '이승돌봄로봇 자가평가 알고리즘',
  startQuestionId: 'q1',
  questions: {
    q1: {
      id: 'q1',
      title: '자리이동에 어려움이 있나요?',
      description: '',
      simpleDescription: '침대에서 휠체어로 옮겨 타거나 스스로 몸을 움직여 자리를 바꾸는 일이 얼마나 어려우신가요?',
      type: 'single',
      options: [
        { id: 'q1_0', text: '0점: 문제 없음', score: 0, value: '0' },
        { id: 'q1_1', text: '1점: 가벼운 어려움', score: 1, value: '1' },
        { id: 'q1_2', text: '2점: 중간 정도의 어려움', score: 2, value: '2' },
        { id: 'q1_3', text: '3점: 심한 어려움', score: 3, value: '3' },
        { id: 'q1_4', text: '4점: 극심한 어려움', score: 4, value: '4' },
      ],
      nextQuestionId: (answers: Record<string, any>) => {
        const val = parseInt(answers['q1'] || '0');
        if (val >= 2) return 'q2';
        return null;
      },
      resultId: (answers: Record<string, any>) => {
        const val = parseInt(answers['q1'] || '0');
        if (val === 0) return 'T-A';
        if (val === 1) return 'T-B';
        return null;
      }
    } as Question,
    q2: {
      id: 'q2',
      title: '다리 힘으로 체중을 지탱할 수 없는가?',
      description: '',
      simpleDescription: '보호자가 부축해 주었을 때, 환자분이 본인의 다리 힘으로 조금이라도 디디고 서 계실 수 있나요?',
      type: 'single',
      options: [
        { id: 'q2_yes', text: '예, 체중을 지탱하기 어렵다', value: 'yes' },
        { id: 'q2_no', text: '아니오, 체중을 지탱할 수 있다', value: 'no' },
      ],
      nextQuestionId: (answers: Record<string, any>) => {
        const val = answers['q2'];
        if (val === 'yes') return 'q3';
        if (val === 'no') return 'q4';
        return null;
      }
    } as Question,
    q3: {
      id: 'q3',
      title: '사용 환경은 어떤가요?',
      description: '(복수 선택 가능)',
      simpleDescription: '기기를 설치하고 가동할 침실이나 시설의 공간 상태를 모두 골라주세요.',
      type: 'multi',
      options: [
        { id: 'q3_ceiling', text: '천장에 장비 설치가 가능하다', value: 'ceiling' },
        { id: 'q3_wall', text: '벽면에 장비 설치가 가능하다', value: 'wall' },
        { id: 'q3_movable', text: '고정식 설치는 어렵고 이동식 장비가 필요하다', value: 'movable' },
        { id: 'q3_narrow', text: '침대 주변 공간이 좁다', value: 'narrow' },
        { id: 'q3_home', text: '가정 환경이다', value: 'home' },
        { id: 'q3_facility', text: '병원 또는 요양시설 환경이다', value: 'facility' },
      ],
      nextQuestionId: (answers: Record<string, any>) => {
        const selected: string[] = answers['q3'] || [];
        const hasCeiling = selected.includes('ceiling');
        const hasWall = selected.includes('wall');
        const hasMovable = selected.includes('movable');

        const fixedCount = [hasCeiling, hasWall].filter(Boolean).length;
        if (fixedCount >= 2 || (fixedCount >= 1 && hasMovable)) {
          return 'q3_1';
        }
        
        if (!hasCeiling && !hasWall) {
          return 'q3_2';
        }

        return null;
      },
      resultId: (answers: Record<string, any>) => {
        const selected: string[] = answers['q3'] || [];
        const hasCeiling = selected.includes('ceiling');
        const hasWall = selected.includes('wall');
        const hasMovable = selected.includes('movable');

        if (hasCeiling && !hasWall && !hasMovable) {
          return 'T-E';
        }
        if (hasWall && !hasCeiling && !hasMovable) {
          return 'T-F';
        }
        return null;
      }
    } as Question,
    q3_1: {
      id: 'q3_1',
      title: '우선순위가 어떻게 되나요?',
      description: '',
      simpleDescription: '이송 장비를 들여놓을 때 가장 중요하게 생각하시는 가치는 무엇인가요?',
      type: 'single',
      options: [
        { id: 'q3_1_convenience', text: '설치 후 사용 편의성 및 효율성', value: 'convenience' },
        { id: 'q3_1_cost', text: '설치 비용 절감', value: 'cost' },
        { id: 'q3_1_minimal', text: '공사 과정 최소화 및 이동성', value: 'minimal' },
      ],
      nextQuestionId: (answers: Record<string, any>) => {
        const val = answers['q3_1'];
        if (val === 'minimal') return 'q3_2';
        return null;
      },
      resultId: (answers: Record<string, any>) => {
        const val = answers['q3_1'];
        if (val === 'convenience') return 'T-E';
        if (val === 'cost') return 'T-F';
        return null;
      }
    } as Question,
    q3_2: {
      id: 'q3_2',
      title: '독립 지지대 설치가 가능한가요?',
      description: '',
      simpleDescription: '천장이나 벽을 뚫는 공사는 불가능하지만, 방안에 A자형 지지대 구조물(거치 프레임)을 독립적으로 세워둘 공간이 있나요?',
      type: 'single',
      options: [
        { id: 'q3_2_yes', text: '가능하다: 이동식 겐트리 및 독립 프레임 설치', value: 'yes' },
        { id: 'q3_2_no', text: '어렵다: 설치 없이 바퀴로 끄는 순수 이동식 필요', value: 'no' },
      ],
      resultId: (answers: Record<string, any>) => {
        const val = answers['q3_2'];
        if (val === 'yes') return 'T-H';
        return 'T-G';
      }
    } as Question,
    q4: {
      id: 'q4',
      title: '스스로 상체를 일으킬 수 없는가?',
      description: '',
      simpleDescription: '환자분이 스스로 상체(허리와 목)를 꼿꼿이 세워 앉을 수 있거나, 로봇 손잡이를 지탱해 잡을 수 있나요?',
      type: 'single',
      options: [
        { id: 'q4_yes', text: '예, 상체를 일으킬 수 없음', value: 'yes' },
        { id: 'q4_no', text: '아니오, 상체를 일으킬 수 있음', value: 'no' },
      ],
      resultId: (answers: Record<string, any>) => {
        const val = answers['q4'];
        if (val === 'yes') return 'T-C';
        if (val === 'no') return 'T-D';
        return null;
      }
    } as Question,
  },
  results: {
    'T-A': {
      id: 'T-A',
      title: '현재 이승돌봄로봇 필요도 낮음',
      description: '현재 혼자서 안전하게 자리를 이동할 수 있어 관련 로봇의 필요도가 매우 낮은 수준입니다.',
      recommendation: '현재 상태를 유지하는 것을 권장합니다.',
      reason: '자리이동하기 기능평가 결과, 일상생활에 지장을 초래하지 않는 가벼운 수준이거나 어려움이 관찰되지 않았습니다.',
      simpleResultSummary: '스스로 일어나 자리를 옮기실 수 있어, 현재는 별도의 이승 이동 로봇이 필요하지 않은 상태입니다.'
    },
    'T-B': {
      id: 'T-B',
      title: '이승보조장비 고려',
      description: '자리이동 시 약간의 불안정함이나 가벼운 어려움이 있으므로 안전을 보조할 수 있는 도구를 권장합니다.',
      recommendation: '미끄럼방지 매트, 이승용 슬라이딩 보드, 안전 손잡이 등의 간단한 이승보조도구 도입을 고려해보세요.',
      reason: '자리이동하기 기능평가 결과 가벼운 정도의 어려움이 존재하나 체중 지지나 일상 수행은 크게 훼손되지 않은 단계입니다.',
      simpleResultSummary: '가벼운 균형 불안정이 있으므로 안전하게 미끄러지듯 이동을 지원하는 보조판이나 벨트를 추천합니다.',
      simpleTips: [
        '슬라이딩 보드(미끄럼판): 침대와 휠체어 사이에 걸쳐서 피부 쓸림을 막고 스르륵 밀어서 이동시킵니다.',
        '이승벨트: 환자의 허리에 벨트를 매어 보호자가 부축 시 단단히 붙잡을 수 있도록 돕습니다.',
        '스스로 최소한의 상체 균형을 유지할 수 있는 분에게 적절합니다.'
      ]
    },
    'T-C': {
      id: 'T-C',
      title: '전동형 기립보조리프트 고려',
      description: '다리 근력이 부족하여 스스로 체중을 지탱하지 못하지만 상체 조절이 가능한 상태이므로 동력을 지원하는 기립보조리프트가 적합합니다.',
      recommendation: '모터 구동식 전동형 기립보조리프트(허그, 업고플러스 등) 고려를 추천합니다. 벨트를 등에 지지하고 기립을 도와 이승을 돕습니다.',
      reason: '자리이동 기능평가 결과 중간 정도 이상의 어려움이 있으나, 스스로 몸을 지탱하고 손잡이를 잡을 수 있는 등 상체 잔존 근력이 남아있어 전동기립 시 협조가 원활한 상황입니다.',
      simpleResultSummary: '다리 힘은 부족하지만 손잡이를 잡고 상체를 지탱할 수 있으므로, 일으켜 세워주는 전동 기립보조리프트를 추천합니다.',
      simpleTips: [
        '기립보조리프트: 일어서고 앉는 자세를 모터 동력으로 부드럽게 세워주는 로봇입니다.',
        '환자의 손잡이 파지 및 상체 버팀 힘이 요구되며, 보호자가 힘들이지 않고 옮길 수 있습니다.',
        '기립 과정을 통해 다리 근육의 운동 및 서기 훈련 효과를 병행할 수 있어 권장됩니다.'
      ]
    },
    'T-D': {
      id: 'T-D',
      title: '비전동형 기립보조기기 고려',
      description: '체중 지지가 어렵고 상체도 가누기 힘든 상태이므로 대상자를 안전하게 안아 올리거나 슬링으로 감싸 이동을 돕는 보조 수준이 높은 비전동형 기립보조기기를 고려해야 합니다.',
      recommendation: '탑승식 수동형 기립보조기기 또는 전적으로 몸을 고정해주는 기립 보조 리프트 전환을 고려하세요.',
      reason: '체중 지지가 불가능하고 스스로 상체를 가누거나 지탱하기도 어려워 전동 기립 시 낙상 위험이 높으며 더 전반적인 신체 지지가 요구됩니다.',
      simpleResultSummary: '체중 지지 능력이 약하고 상체를 지탱하기 어렵지만, 기계식으로 안전히 밀착 고정해 세우는 수동 기립보조기기를 추천합니다.',
      simpleTips: [
        '기립보조기기: 무릎과 가슴을 패드로 지탱하고 엉덩이 받침으로 안아 올리는 수동식 기구입니다.',
        '전원 장치가 필요 없어 충전 번거로움이 없고 방전될 염려가 일절 없습니다.',
        '환자의 자세를 패드가 안전하게 다중 밀착 지지하여 낙상 및 전복 위험이 낮습니다.'
      ]
    },
    'T-E': {
      id: 'T-E',
      title: '천장 고정형 리프트 고려',
      description: '체중 지지는 어렵고 전신 슬링 지원이 필요한 중등도 이상 상태이며 주거 혹은 시설 환경상 천장 레일 공사가 가능하고 사용 빈도가 높을 때 적합한 솔루션입니다.',
      recommendation: '방 또는 욕실 천장에 레일을 설치하고 슬링 모터를 장착하여 이송하는 천장 주행식 리프트를 설치하세요.',
      reason: '다리 힘으로 체중 지탱이 불가능하여 전신슬링 리프팅이 필요하며, 사용 장소의 천장 구조상 레일 보강 공사가 가능하고 뛰어난 사용 편의성을 선호하셨습니다.',
      simpleResultSummary: '다리와 상체 지지가 모두 어려운 경우로, 천장에 레일을 달아 그네처럼 들어 올려 옮기는 천장 고정형 리프트를 추천합니다.',
      simpleTips: [
        '전신슬링리프트: 몸 전체를 튼튼한 시트(슬링)로 완전히 싸서 공중에 띄워 옮기는 장치입니다.',
        '방바닥 공간을 전혀 차지하지 않아 협소한 가정에서 이동 및 회전이 가장 부드럽습니다.',
        '천장에 레일을 튼튼하게 고정하기 위한 하중 보강 및 사전 설치 공사가 반드시 필요합니다.'
      ]
    },
    'T-F': {
      id: 'T-F',
      title: '벽 고정형 리프트 고려',
      description: '천장 공사는 지지 하중 제한 등으로 어려우나 벽면의 내력벽 지지가 가능한 환경에서 효율적으로 이승을 돕는 리프트입니다.',
      recommendation: '벽면에 회전 가능한 관절 암 타입의 리프트를 장착하여 침대에서 휠체어로 이동시키는 벽 고정식 리프트를 설치하세요.',
      reason: '다리 힘으로 체중 지탱이 불가능하여 전신슬링 리프팅이 필요하지만 천장 레일 공사는 어렵고 튼튼한 옹벽이 지원되며 합리적인 설치 비용을 선호하셨습니다.',
      simpleResultSummary: '공중에 매달아 이동시키는 안전 리프트가 필요하나, 천장 대신 튼튼한 벽(옹벽)에 기둥을 고정하는 벽형 리프트를 추천합니다.',
      simpleTips: [
        '전신슬링리프트: 몸 전체를 그네 같은 전용 슬링 시트로 안아 들어 올리는 장치입니다.',
        '천장 보강 공사가 여의치 않은 상황에서도 단단한 콘크리트 벽면만 있으면 고정 장착할 수 있습니다.',
        '사용하지 않을 때는 벽 쪽으로 접어서 밀착해 둘 수 있어 실내 정리가 깔끔합니다.'
      ]
    },
    'T-G': {
      id: 'T-G',
      title: '이동식 리프트 고려',
      description: '방, 거실 등 다양한 공간으로 기기를 바퀴로 끌고 가 이승을 도울 수 있는 장비입니다. 고정식 공사가 전혀 필요 없습니다.',
      recommendation: '바퀴 달린 다목적 하부 프레임과 유압 혹은 전동 실린더가 장착된 이동식 리프트(슬링 없음, 슬링 자동 삽입, 슬링 수동 체결) 고려를 추천합니다.',
      reason: '다리 힘으로 체중 지탱이 불가능해 전신슬링 리프팅이 필수적이나, 건물 구조 손상 우려로 천장/벽면 고정형 설치가 불가능하고 바닥 주행이 용이한 환경입니다.',
      simpleResultSummary: '벽이나 천장 타공 공사가 불가능한 상황에서, 바퀴를 이용해 자유롭게 굴리고 끌어서 이송하는 이동식 리프트를 추천합니다.',
      simpleTips: [
        '전신슬링리프트: 환자의 신체를 안전한 전용 슬링으로 감싸 완전히 공중으로 띄워 이송합니다.',
        '설치 공사가 일절 없어 즉시 사용이 가능하고 필요에 따라 거실이나 화장실 등으로 주행합니다.',
        '침대 하부와 바닥 사이에 리프트 바퀴 프레임이 들어갈 수 있는 공간 높이가 약 10cm 이상 확보되어야 합니다.'
      ]
    },
    'T-H': {
      id: 'T-H',
      title: '이동식 겐트리 리프트 고려',
      description: '천장 타공 공사 등은 불가능하지만 방안에 A자형 지지대 구조물을 단독 배치하여 안정적인 수직 리프팅을 할 수 있는 보조 장치입니다.',
      recommendation: '이동식 겐트리 프레임과 모터를 결합한 패키지 제품 사용을 고려하세요.',
      reason: '다리 힘으로 체중 지탱이 불가하여 전신슬링 리프트가 필요하지만 고정형 공사가 불가능하며, 대신 침대 주변 공간에 독립적인 A자형 지지 프레임을 세울 수 있는 환경입니다.',
      simpleResultSummary: '공사를 할 수 없으나, 침대 위에 조립식 기둥 프레임(거치 지지대)을 단독 배치해 안전히 띄워 옮기는 겐트리 리프트를 추천합니다.',
      simpleTips: [
        '전신슬링리프트: 환자의 무게를 안전하게 감싸서 수직으로 들어 올려 이동을 돕는 그네식 장치입니다.',
        '천장과 벽에 구멍을 뚫을 수 없는 전세집이나 주택에서 훌륭한 대안입니다.',
        '침대 주변에 조립식 대형 지지대 기둥을 온전히 세울 수 있는 방 크기가 갖춰져야 합니다.'
      ]
    }
  }
};
