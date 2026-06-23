import { Question, Option } from './transferCare';

export const toiletingCareAlgorithm = {
  id: 'toileting',
  title: '배설돌봄로봇 자가평가 알고리즘',
  startQuestionId: 'q1',
  questions: {
    q1: {
      id: 'q1',
      title: '배뇨감 및 배변감을 인지하고 조절하는 데 어려움이 있나요?',
      description: '',
      simpleDescription: '환자분이 스스로 소변이나 대변을 누고 싶다는 느낌(요의, 변의)을 명확히 느끼시고 조절하실 수 있나요?',
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
        if (val >= 2) return 'q2_b';
        return 'q2_a';
      }
    } as Question,

    q2_a: {
      id: 'q2_a',
      title: '화장실까지 스스로 이동하는 데 어려움이 있나요?',
      description: '',
      simpleDescription: '환자분이 스스로 방에서 화장실 변기까지 걷거나 휠체어로 안전하게 이동하실 수 있나요?',
      type: 'single',
      options: [
        { id: 'q2a_0', text: '0점: 문제 없음', score: 0, value: '0' },
        { id: 'q2a_1', text: '1점: 가벼운 어려움', score: 1, value: '1' },
        { id: 'q2a_2', text: '2점: 중간 정도의 어려움', score: 2, value: '2' },
        { id: 'q2a_3', text: '3점: 심한 어려움', score: 3, value: '3' },
        { id: 'q2a_4', text: '4점: 극심한 어려움', score: 4, value: '4' },
      ],
      nextQuestionId: (answers: Record<string, any>) => {
        const val = parseInt(answers['q2_a'] || '0');
        if (val >= 2) return 'q3_a2';
        return 'q3_a1';
      }
    } as Question,

    q3_a1: {
      id: 'q3_a1',
      title: '용변을 마친 뒤 스스로 뒤처리를 할 수 있나요?',
      description: '',
      simpleDescription: '용변을 다 보신 뒤에 스스로 휴지를 써서 깨끗이 닦거나 물 세정을 할 수 있나요?',
      type: 'single',
      options: [
        { id: 'q3a1_0', text: '0점: 문제 없음', score: 0, value: '0' },
        { id: 'q3a1_1', text: '1점: 가벼운 어려움', score: 1, value: '1' },
        { id: 'q3a1_2', text: '2점: 중간 정도의 어려움', score: 2, value: '2' },
        { id: 'q3a1_3', text: '3점: 심한 어려움', score: 3, value: '3' },
        { id: 'q3a1_4', text: '4점: 극심한 어려움', score: 4, value: '4' },
      ],
      resultId: (answers: Record<string, any>) => {
        const val = parseInt(answers['q3_a1'] || '0');
        if (val >= 2) return 'B-B';
        return 'B-A';
      }
    } as Question,

    q3_a2: {
      id: 'q3_a2',
      title: '용변을 마친 뒤 스스로 뒤처리를 할 수 있나요?',
      description: '',
      simpleDescription: '용변을 다 보신 뒤에 스스로 휴지를 써서 깨끗이 닦거나 물 세정을 할 수 있나요?',
      type: 'single',
      options: [
        { id: 'q3a2_0', text: '0점: 문제 없음', score: 0, value: '0' },
        { id: 'q3a2_1', text: '1점: 가벼운 어려움', score: 1, value: '1' },
        { id: 'q3a2_2', text: '2점: 중간 정도의 어려움', score: 2, value: '2' },
        { id: 'q3a2_3', text: '3점: 심한 어려움', score: 3, value: '3' },
        { id: 'q3a2_4', text: '4점: 극심한 어려움', score: 4, value: '4' },
      ],
      resultId: (answers: Record<string, any>) => {
        const val = parseInt(answers['q3_a2'] || '0');
        if (val >= 2) return 'B-D';
        return 'B-C';
      }
    } as Question,

    q2_b: {
      id: 'q2_b',
      title: '화장실까지 스스로 이동하는 데 어려움이 있나요?',
      description: '',
      simpleDescription: '환자분이 스스로 방에서 화장실 변기까지 걷거나 휠체어로 안전하게 이동하실 수 있나요?',
      type: 'single',
      options: [
        { id: 'q2b_0', text: '0점: 문제 없음', score: 0, value: '0' },
        { id: 'q2b_1', text: '1점: 가벼운 어려움', score: 1, value: '1' },
        { id: 'q2b_2', text: '2점: 중간 정도의 어려움', score: 2, value: '2' },
        { id: 'q2b_3', text: '3점: 심한 어려움', score: 3, value: '3' },
        { id: 'q2b_4', text: '4점: 극심한 어려움', score: 4, value: '4' },
      ],
      nextQuestionId: (answers: Record<string, any>) => {
        const val = parseInt(answers['q2_b'] || '0');
        if (val >= 2) return 'q3_b2';
        return 'q3_b1';
      }
    } as Question,

    q3_b1: {
      id: 'q3_b1',
      title: '용변을 마친 뒤 스스로 뒤처리를 할 수 있나요?',
      description: '',
      simpleDescription: '용변을 다 보신 뒤에 스스로 휴지를 써서 깨끗이 닦거나 물 세정을 할 수 있나요?',
      type: 'single',
      options: [
        { id: 'q3b1_0', text: '0점: 문제 없음', score: 0, value: '0' },
        { id: 'q3b1_1', text: '1점: 가벼운 어려움', score: 1, value: '1' },
        { id: 'q3b1_2', text: '2점: 중간 정도의 어려움', score: 2, value: '2' },
        { id: 'q3b1_3', text: '3점: 심한 어려움', score: 3, value: '3' },
        { id: 'q3b1_4', text: '4점: 극심한 어려움', score: 4, value: '4' },
      ],
      resultId: (answers: Record<string, any>) => {
        const val = parseInt(answers['q3_b1'] || '0');
        if (val >= 2) return 'B-F';
        return 'B-E';
      }
    } as Question,

    q3_b2: {
      id: 'q3_b2',
      title: '용변을 마친 뒤 스스로 뒤처리를 할 수 있나요?',
      description: '',
      simpleDescription: '용변을 다 보신 뒤에 스스로 휴지를 써서 깨끗이 닦거나 물 세정을 할 수 있나요?',
      type: 'single',
      options: [
        { id: 'q3b2_0', text: '0점: 문제 없음', score: 0, value: '0' },
        { id: 'q3b2_1', text: '1점: 가벼운 어려움', score: 1, value: '1' },
        { id: 'q3b2_2', text: '2점: 중간 정도의 어려움', score: 2, value: '2' },
        { id: 'q3b2_3', text: '3점: 심한 어려움', score: 3, value: '3' },
        { id: 'q3b2_4', text: '4점: 극심한 어려움', score: 4, value: '4' },
      ],
      resultId: (answers: Record<string, any>) => {
        const val = parseInt(answers['q3_b2'] || '0');
        if (val >= 2) return 'B-H';
        return 'B-G';
      }
    } as Question,
  },
  results: {
    'B-A': {
      id: 'B-A',
      title: '도움 불필요',
      description: '인지력, 화장실 이동 능력, 용변 후 청결 관리 능력이 모두 양호하여 현재 특별한 돌봄로봇 지원은 필요하지 않습니다.',
      recommendation: '독립적인 배설 관리를 유지하기 위해 가벼운 스트레칭이나 일상 활동을 계속 장려합니다.',
      reason: '배뇨와 배변 인지, 화장실 이동, 용변 후 청결 평가에서 모두 어려움이 낮음으로 판정되었습니다.',
      simpleResultSummary: '스스로 신호를 인지하고 화장실로 옮겨가 용변 및 뒤처리가 모두 가능하시므로 기기 보조가 불필요합니다.'
    },
    'B-B': {
      id: 'B-B',
      title: '비데 고려',
      description: '인지와 화장실 이동은 양호하나 용변 후 잔여물을 깨끗하게 뒤처리하고 위생관리를 대행받을 필요가 있는 상태입니다.',
      recommendation: '온수 세정 및 건조가 자동으로 연동되는 비데 시트 도입을 고려해보세요.',
      reason: '배뇨와 배변 인지 조절과 화장실 이동 능력은 양호하나 용변 후 위생 뒤처리 단계에서 중간 정도 이상의 기능적 지장이 평가되었습니다.',
      simpleResultSummary: '대소변 신호와 화장실 이동은 양호하나 어깨 통증 등으로 휴지 뒤처리가 불편하시므로, 비데 세정을 권장합니다.',
      simpleTips: [
        '자동비데: 감지 센서를 기반으로 온수 세정과 따뜻한 바람 건조를 원스톱으로 처리합니다.',
        '위생적인 처리를 통해 피부 쓸림과 상처를 예방하고 방광염 등 요로 감염 질환을 예방합니다.',
        '패널 단추의 조작을 환자분이 직접 누르고 인지할 수 있도록 배치합니다.'
      ]
    },
    'B-C': {
      id: 'B-C',
      title: '화장실 이동 보조 및 변기 리프트 고려',
      description: '배설 의사는 명확히 인지하고 뒤처리 능력도 갖추었으나 보행 장애나 균형 저하로 인해 변기에 착석하고 일어서는 데 어려움이 큽니다.',
      recommendation: '일반 변기에 설치 가능한 양변기 리프트 또는 보행 보조기 활용을 추천합니다.',
      reason: '배뇨와 배변감 인지는 잘하고 뒤처리는 가능하지만 화장실까지의 이동 단계에서 낙상 위험 등 중등도 이상의 어려움을 겪고 있습니다.',
      simpleResultSummary: '스스로의 배뇨 및 뒤처리가 가능하지만 변기에 쪼그려 앉고 일어설 때 무릎 힘이 부족하므로 변기 전동 리프트를 권장합니다.',
      simpleTips: [
        '변기 리프트: 좌우 안전 지지대 손잡이가 탑재되어 변기 착석 및 기립 시 모터 힘으로 서서히 시트를 들어 올려 관절 부담을 없애줍니다.',
        '보호자 동행 없이도 앉아 일어서는 과정의 낙상 위험을 완벽히 방지하여 독립적 배설을 돕습니다.',
        '일반 화장실 변기 규격과 변기 옆 전원 콘센트 연결 상태를 우선 확인해야 합니다.'
      ]
    },
    'B-D': {
      id: 'B-D',
      title: '이동 변기 이용',
      description: '배설감은 스스로 느끼지만 화장실로의 이동과 용변 후 뒤처리를 독자적으로 수행하기 불가능하므로 침실 내에서 해결하는 이동 변기 솔루션이 권장됩니다.',
      recommendation: '방 안에 배치할 수 있고 팔걸이와 높이 조절이 가능한 가구형 이동 변기를 도입하세요.',
      reason: '배뇨와 배변감은 인지하지만 이동과 위생 뒤처리 모두에서 자립 수행이 불가능한 수준의 큰 제한이 존재합니다.',
      simpleResultSummary: '요의는 확실히 인지하지만 화장실까지 걸어가기 힘들고 뒤처리가 불완전하므로, 침대 옆 가구형 이동 변기를 권장합니다.',
      simpleTips: [
        '이동 변기: 화장실과 침실 간 거리가 먼 분을 위해 침대 바로 옆에 놓고 쓰며, 휠체어에서 스윙 팔걸이를 열어 슬라이딩하여 착석할 수 있습니다.',
        '오물 바스켓을 매번 비워주고 세척해야 하므로 보호자의 부분적인 돌봄 관리가 수반됩니다.',
        '냄새 차단을 위해 변기 내부 뚜껑 밀착에 유의해야 합니다.'
      ]
    },
    'B-E': {
      id: 'B-E',
      title: '시간에 맞춘 배뇨·배변 프로그램 적용',
      description: '화장실로 걸어갈 수 있고 뒤처리도 할 수 있지만 인지 기능 저하로 인해 배뇨와 배변 시기를 알아차리지 못해 실금하는 위험이 높은 단계입니다.',
      recommendation: '스마트 배뇨 예측 센서를 활용하여 정해진 시간마다 화장실로 동반 이동하는 체계적 훈련을 실시하세요.',
      reason: '배뇨와 배변감 인지에 중등도 이상의 장해가 있지만 신체적 이동력과 뒤처리 기능은 보존되어 인지적 지원이 주로 필요합니다.',
      simpleResultSummary: '신체적 움직임과 뒤처리는 양호하나, 인지 저하로 제때 요의를 느끼지 못하므로 예약 배설 훈련을 추천합니다.',
      simpleTips: [
        '배뇨 알림 센서: 아랫배에 젤 초음파 센서를 달아 방광에 차는 소변량을 스마트폰으로 확인하여 제때 화장실 유도를 가능하게 합니다.',
        '실금과 기저귀 의존을 줄이고 스스로 화장실 변기에서 누는 기회를 계속 보존할 수 있습니다.',
        '보호자가 2시간 간격 등으로 규칙적인 알림에 맞춰 동행 지도를 진행합니다.'
      ]
    },
    'B-F': {
      id: 'B-F',
      title: '시간에 맞춘 배뇨·배변 프로그램 및 비데 이용',
      description: '배설 인지 능력이 떨어져 제때 화장실을 가기 어렵고 신체적 관절 가동 범위 제한 등으로 용변 후 처리 능력마저 결여된 상태입니다.',
      recommendation: '주기적 알림 센서와 함께 화장실 내 전동 비데 시트 세정 시스템을 보조로 구축하는 것을 고려하십시오.',
      reason: '배설 인지 및 위생 뒤처리 영역에서 동시에 독립성이 결여되었으나 화장실까지의 이동은 비교적 가능한 상태입니다.',
      simpleResultSummary: '요의 인지가 곤란하고 신체적 뒤처리 능력도 쇠퇴하셨으므로, 주기적 화장실 이동 유도와 전동 비데의 자동 위생 기능을 조합해 사용하기를 권장합니다.',
      simpleTips: [
        '화장실 이동은 보호자의 감독 하에 가능하므로 정해진 시간에 배설을 시도합니다.',
        '어려운 항문 뒤처리는 화장실에 양변기 비데를 달아 자동 세정, 건조하도록 결합합니다.',
        '청결 유지로 발진 및 실금에 따르는 위생 2차 질환을 막을 수 있습니다.'
      ]
    },
    'B-G': {
      id: 'B-G',
      title: '자동배설로봇 간헐적 이용',
      description: '배설감을 인지하지 못하고 화장실로 직접 이동할 수도 없지만 다행히 보호자 도움을 받아 간헐적으로 침상에서 기기를 장착하여 뒤처리를 자동화하는 솔루션이 효과적입니다.',
      recommendation: '야간 또는 특정 시간대에 탈부착이 가능한 세정식 자동배설로봇의 간헐적 도입을 고려해 볼 수 있습니다.',
      reason: '배설 인지 및 이동 능력이 크게 손상되어 있으나 신체 협조와 위생 청결 자체는 일정 수준 협조가 가능한 상황입니다.',
      simpleResultSummary: '스스로의 신호 및 화장실 거동이 불가하여 침상에 완전히 누워 계시므로, 대소변 감지 후 자동 뒤처리를 돕는 배설로봇을 추천합니다.',
      simpleTips: [
        '자동배설로봇: 중요 부위에 센서가 내장된 특수 컵 패드를 간헐적으로 매어 대소변 즉시 자동으로 진공 흡입하고 물 세정, 온풍 건조를 처리합니다.',
        '기저귀를 하루 종일 갈 필요가 없어지고 실내의 불쾌한 오물 냄새를 억제합니다.',
        '보호자는 로봇 시스템 내 오물 버킷 정수 교환 등 일상 관리를 수행합니다.'
      ]
    },
    'B-H': {
      id: 'B-H',
      title: '흡인형 스마트 기저귀 로봇시스템 지속적 이용',
      description: '배설 인지, 이동 능력, 용변 후 뒤처리 자립도가 모두 상실된 전적인 와상 환자에게 자동으로 대소변을 처리해주는 스마트 기저귀 로봇시스템입니다.',
      recommendation: '침상에서 대소변을 감지 즉시 흡입, 세정, 온풍 건조하는 24시간 연동 흡인형 스마트 기저귀 로봇시스템 배치를 추천합니다.',
      reason: '배설 인지, 화장실 이동, 용변 후 청결 전 평가 영역에서 가장 중증인 극심한 어려움 상태를 보이고 있습니다.',
      simpleResultSummary: '24시간 침상에 누워 용변 자력 인지나 화장실 이동이 일절 불가하므로, 24시간 자동 음압 세정형 스마트 기저귀 로봇 시스템을 추천합니다.',
      simpleTips: [
        '스마트 기저귀 로봇: 배뇨와 배변이 생기는 그 즉시 진공음압 흡입, 따뜻한 물 청소, 온풍 송풍 건조를 환자 접촉 없이 자동 완수합니다.',
        '기저귀 발진 및 피부 짓무름을 원천 방지하며 밤샘 돌봄 피로를 엄청나게 줄여줍니다.',
        '스마트 기저귀 커버 소모품의 밀착 파지 상태를 주기적으로 잘 관리해 주어야 밀폐력이 유지됩니다.'
      ]
    }
  }
};
