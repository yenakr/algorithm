import { Question, Result } from './transferCare';

// -------------------------------------------------------
// 배설돌봄 알고리즘 - 원본 트리 구조와 동일
//
// 배뇨감 인지 평가 → 중간 이상 어려움 (2~4)이 있는가?
//   아니오
//     → 화장실 이동 평가 → 중간 이상 어려움?
//         아니오 → 용변 후 청결 평가 → 중간 이상 어려움?
//                    아니오 → B-A (도움 필요)
//                    예   → B-B (용변 후 처리 돕기 (비데 등))
//         예   → 용변 후 청결 평가 → 중간 이상 어려움?
//                    아니오 → B-C (화장실 이동 돕기 + 침상 배설 또는 이동 변기 이용)
//                    예   → B-D (화장실 이동 돕기 + 침상 배설 또는 이동 변기 이용
//                               / 용변 후 처리 돕기 추가 또는 자동 배설처리로봇 간헐적 이용)
//   예
//     → 화장실 이동 평가 → 중간 이상 어려움?
//         아니오 → 용변 후 청결 평가 → 중간 이상 어려움?
//                    아니오 → B-E (시간에 맞춘 배뇨훈련 또는 배변 프로그램 적용 / 용변 후 처리 돕기 추가)
//                    예   → B-F (시간에 맞춘 배뇨훈련 또는 배변 프로그램 적용)
//         예   → 용변 후 청결 평가 → 중간 이상 어려움?
//                    아니오 → B-G (자동 배설처리로봇 간헐적 이용)
//                    예   → B-H (자동 배설처리로봇 간헐적 이용 / 흡인형 스마트 기저귀 로봇시스템 지속적 이용)
// -------------------------------------------------------

export const toiletingCareAlgorithm = {
  id: 'toileting',
  title: '배설돌봄 및 배설돌봄로봇의 활용 알고리즘',
  startQuestionId: 'q1',
  questions: {
    // Step 1: 배뇨감 인지 평가
    q1: {
      id: 'q1',
      title: '중간 이상 어려움 (2~4)이 있는가',
      simpleTitle: '중간 이상 어려움 (2~4)이 있는가',
      description: '배뇨감 인지 평가',
      simpleDescription: '배뇨감 인지 평가',
      iconType: 'toilet',
      type: 'single',
      options: [
        { id: 'q1_no', text: '아니오', simpleText: '아니오', value: 'no' },
        { id: 'q1_yes', text: '예', simpleText: '예', value: 'yes' },
      ],
      nextQuestionId: (answers: Record<string, any>) =>
        answers['q1'] === 'yes' ? 'q2_b' : 'q2_a',
    } as Question,

    // Step 2a: 화장실 이동 평가 (인지 아니오 경로)
    q2_a: {
      id: 'q2_a',
      title: '중간 이상 어려움 (2~4)이 있는가',
      simpleTitle: '중간 이상 어려움 (2~4)이 있는가',
      description: '화장실 이동 평가',
      simpleDescription: '화장실 이동 평가',
      iconType: 'walking',
      type: 'single',
      options: [
        { id: 'q2a_no', text: '아니오', simpleText: '아니오', value: 'no' },
        { id: 'q2a_yes', text: '예', simpleText: '예', value: 'yes' },
      ],
      nextQuestionId: (answers: Record<string, any>) =>
        answers['q2_a'] === 'yes' ? 'q3_a2' : 'q3_a1',
    } as Question,

    // Step 2b: 화장실 이동 평가 (인지 예 경로)
    q2_b: {
      id: 'q2_b',
      title: '중간 이상 어려움 (2~4)이 있는가',
      simpleTitle: '중간 이상 어려움 (2~4)이 있는가',
      description: '화장실 이동 평가',
      simpleDescription: '화장실 이동 평가',
      iconType: 'walking',
      type: 'single',
      options: [
        { id: 'q2b_no', text: '아니오', simpleText: '아니오', value: 'no' },
        { id: 'q2b_yes', text: '예', simpleText: '예', value: 'yes' },
      ],
      nextQuestionId: (answers: Record<string, any>) =>
        answers['q2_b'] === 'yes' ? 'q3_b2' : 'q3_b1',
    } as Question,

    // Step 3a1: 용변 후 청결 평가 (인지 아니오 + 이동 아니오)
    q3_a1: {
      id: 'q3_a1',
      title: '중간 이상 어려움 (2~4)이 있는가',
      simpleTitle: '중간 이상 어려움 (2~4)이 있는가',
      description: '용변 후 청결 평가',
      simpleDescription: '용변 후 청결 평가',
      iconType: 'caregiver',
      type: 'single',
      options: [
        { id: 'q3a1_no', text: '아니오', simpleText: '아니오', value: 'no' },
        { id: 'q3a1_yes', text: '예', simpleText: '예', value: 'yes' },
      ],
      resultId: (answers: Record<string, any>) =>
        answers['q3_a1'] === 'yes' ? 'B-B' : 'B-A',
    } as Question,

    // Step 3a2: 용변 후 청결 평가 (인지 아니오 + 이동 예)
    q3_a2: {
      id: 'q3_a2',
      title: '중간 이상 어려움 (2~4)이 있는가',
      simpleTitle: '중간 이상 어려움 (2~4)이 있는가',
      description: '용변 후 청결 평가',
      simpleDescription: '용변 후 청결 평가',
      iconType: 'caregiver',
      type: 'single',
      options: [
        { id: 'q3a2_no', text: '아니오', simpleText: '아니오', value: 'no' },
        { id: 'q3a2_yes', text: '예', simpleText: '예', value: 'yes' },
      ],
      resultId: (answers: Record<string, any>) =>
        answers['q3_a2'] === 'yes' ? 'B-D' : 'B-C',
    } as Question,

    // Step 3b1: 용변 후 청결 평가 (인지 예 + 이동 아니오)
    q3_b1: {
      id: 'q3_b1',
      title: '중간 이상 어려움 (2~4)이 있는가',
      simpleTitle: '중간 이상 어려움 (2~4)이 있는가',
      description: '용변 후 청결 평가',
      simpleDescription: '용변 후 청결 평가',
      iconType: 'caregiver',
      type: 'single',
      options: [
        { id: 'q3b1_no', text: '아니오', simpleText: '아니오', value: 'no' },
        { id: 'q3b1_yes', text: '예', simpleText: '예', value: 'yes' },
      ],
      resultId: (answers: Record<string, any>) =>
        answers['q3_b1'] === 'yes' ? 'B-F' : 'B-E',
    } as Question,

    // Step 3b2: 용변 후 청결 평가 (인지 예 + 이동 예)
    q3_b2: {
      id: 'q3_b2',
      title: '중간 이상 어려움 (2~4)이 있는가',
      simpleTitle: '중간 이상 어려움 (2~4)이 있는가',
      description: '용변 후 청결 평가',
      simpleDescription: '용변 후 청결 평가',
      iconType: 'caregiver',
      type: 'single',
      options: [
        { id: 'q3b2_no', text: '아니오', simpleText: '아니오', value: 'no' },
        { id: 'q3b2_yes', text: '예', simpleText: '예', value: 'yes' },
      ],
      resultId: (answers: Record<string, any>) =>
        answers['q3_b2'] === 'yes' ? 'B-H' : 'B-G',
    } as Question,
  },
  results: {
    'B-A': {
      id: 'B-A',
      title: '도움 불필요',
      simpleTitle: '도움 불필요',
      description: '도움 불필요',
      simpleDescription: '도움 불필요',
      recommendation: '독립적인 배설 관리를 유지합니다.',
      simpleRecommendation: '현재의 양호한 신체 관리 능력을 유지하도록 규칙적인 화장실 이용을 권장합니다.',
      reason: '배뇨와 배변 인지, 화장실 이동, 용변 후 청결 평가에서 모두 어려움이 낮음으로 판정되었습니다.',
      simpleResultSummary: '스스로 신호를 알고 화장실로 이동해 뒤처리를 안전히 마치실 수 있습니다.'
    },
    'B-B': {
      id: 'B-B',
      title: '용변 후 처리 돕기 (비데 등)',
      simpleTitle: '용변 후 처리 돕기 (비데 등)',
      description: '용변 후 처리 돕기 (비데 등)',
      simpleDescription: '용변 후 처리 돕기 (비데 등)',
      recommendation: '온수 세정 및 건조가 자동으로 연동되는 비데 시트 도입을 고려해보세요.',
      simpleRecommendation: '용변 후 따뜻한 물로 세척하고 바람으로 건조하는 전동 온수 비데 사용을 추천합니다.',
      reason: '배뇨와 배변 인지 조절과 화장실 이동 능력은 양호하나 용변 후 위생 뒤처리 단계에서 어려움이 있습니다.',
      simpleResultSummary: '어깨 결림이나 관절 통증 등으로 휴지 닦기가 곤란하시므로 자동 위생 비데를 추천합니다.'
    },
    'B-C': {
      id: 'B-C',
      title: '화장실 이동 돕기 + 침상 배설 또는 이동 변기 이용',
      simpleTitle: '화장실 이동 돕기 + 침상 배설 또는 이동 변기 이용',
      description: '화장실 이동 돕기 + 침상 배설 또는 이동 변기 이용',
      simpleDescription: '화장실 이동 돕기 + 침상 배설 또는 이동 변기 이용',
      recommendation: '일반 변기에 설치 가능한 양변기 리프트 또는 보행 보조기 활용을 추천합니다.',
      simpleRecommendation: '양변기 주변에 설치하여 시트 각도와 높이를 조절하는 전동 리프트 설치를 권장합니다.',
      reason: '배뇨와 배변감 인지는 잘하고 뒤처리는 가능하지만 화장실까지의 이동 단계에서 어려움을 겪고 있습니다.',
      simpleResultSummary: '스스로의 인지와 세정은 양호하나 변기 착석/기립 시 무릎 통증이 심하시므로 전동 변기 리프트를 추천합니다.'
    },
    'B-D': {
      id: 'B-D',
      title: '화장실 이동 돕기 + 침상 배설 또는 이동 변기 이용 / 용변 후 처리 돕기 추가 또는 자동 배설처리로봇 간헐적 이용',
      simpleTitle: '화장실 이동 돕기 + 침상 배설 또는 이동 변기 이용 / 용변 후 처리 돕기 추가 또는 자동 배설처리로봇 간헐적 이용',
      description: '화장실 이동 돕기 + 침상 배설 또는 이동 변기 이용 / 용변 후 처리 돕기 추가 또는 자동 배설처리로봇 간헐적 이용',
      simpleDescription: '화장실 이동 돕기 + 침상 배설 또는 이동 변기 이용 / 용변 후 처리 돕기 추가 또는 자동 배설처리로봇 간헐적 이용',
      recommendation: '방 안에 배치할 수 있고 팔걸이와 높이 조절이 가능한 이동 변기를 도입하세요.',
      simpleRecommendation: '이동식 변기 돌봄로봇 사용을 권장합니다.',
      reason: '배뇨와 배변감은 인지하지만 이동과 위생 뒤처리 모두에서 자립 수행이 불가능한 수준입니다.',
      simpleResultSummary: '요의는 확실하나 화장실 이동 보행이 불가하므로 이동식 변기 돌봄로봇을 추천합니다.'
    },
    'B-E': {
      id: 'B-E',
      title: '시간에 맞춘 배뇨훈련 또는 배변 프로그램 적용 / 용변 후 처리 돕기 추가',
      simpleTitle: '시간에 맞춘 배뇨훈련 또는 배변 프로그램 적용 / 용변 후 처리 돕기 추가',
      description: '시간에 맞춘 배뇨훈련 또는 배변 프로그램 적용 / 용변 후 처리 돕기 추가',
      simpleDescription: '시간에 맞춘 배뇨훈련 또는 배변 프로그램 적용 / 용변 후 처리 돕기 추가',
      recommendation: '스마트 배뇨 예측 센서를 활용하여 정해진 시간마다 화장실로 동반 이동하는 훈련을 실시하세요.',
      simpleRecommendation: '2시간 간격 등으로 동행해 배뇨하도록 돕는 예약 훈련을 시작해 보십시오.',
      reason: '배뇨와 배변감 인지에 어려움이 있지만 신체적 이동력과 뒤처리 기능은 보존되어 있습니다.',
      simpleResultSummary: '신체 거동과 청결 관리는 양호하나 대소변 시기를 자각하지 못하므로 정기적 알림 유도 배설 시스템을 추천합니다.'
    },
    'B-F': {
      id: 'B-F',
      title: '시간에 맞춘 배뇨훈련 또는 배변 프로그램 적용',
      simpleTitle: '시간에 맞춘 배뇨훈련 또는 배변 프로그램 적용',
      description: '시간에 맞춘 배뇨훈련 또는 배변 프로그램 적용',
      simpleDescription: '시간에 맞춘 배뇨훈련 또는 배변 프로그램 적용',
      recommendation: '주기적 알림 센서와 함께 화장실 내 전동 비데 시트 세정 시스템을 보조로 구축하는 것을 고려하십시오.',
      simpleRecommendation: '정해진 시간에 화장실로 인도하고, 뒤처리는 비데 돌봄로봇을 연동해 구축하십시오.',
      reason: '배설 인지 및 위생 뒤처리 영역에서 동시에 독립성이 결여되었으나 화장실 이동은 비교적 가능합니다.',
      simpleResultSummary: '용변 신호를 인지하기 힘든 상태이고 뒤처리도 불가하므로 규칙적인 동행 부축과 자동 비데 돌봄로봇을 추천합니다.'
    },
    'B-G': {
      id: 'B-G',
      title: '자동 배설처리로봇 간헐적 이용',
      simpleTitle: '자동 배설처리로봇 간헐적 이용',
      description: '자동 배설처리로봇 간헐적 이용',
      simpleDescription: '자동 배설처리로봇 간헐적 이용',
      recommendation: '야간 또는 특정 시간대에 탈부착이 가능한 세정식 자동배설로봇의 간헐적 도입을 고려해 볼 수 있습니다.',
      simpleRecommendation: '특정 시간에 오물을 빨아들이고 자동으로 씻겨주는 배설로봇을 추천합니다.',
      reason: '배설 인지 및 이동 능력이 크게 손상되어 있으나 위생 청결 자체는 일정 수준 협조가 가능한 상황입니다.',
      simpleResultSummary: '대소변 신호를 자각하지 못하고 침상에 줄곧 누워 지내시므로 간헐식 배설로봇을 추천합니다.'
    },
    'B-H': {
      id: 'B-H',
      title: '자동 배설처리로봇 간헐적 이용 / 흡인형 스마트 기저귀 로봇시스템 지속적 이용',
      simpleTitle: '자동 배설처리로봇 간헐적 이용 / 흡인형 스마트 기저귀 로봇시스템 지속적 이용',
      description: '자동 배설처리로봇 간헐적 이용 / 흡인형 스마트 기저귀 로봇시스템 지속적 이용',
      simpleDescription: '자동 배설처리로봇 간헐적 이용 / 흡인형 스마트 기저귀 로봇시스템 지속적 이용',
      recommendation: '침상에서 대소변을 감지 즉시 흡입, 세정, 온풍 건조하는 24시간 연동 흡인형 스마트 기저귀 로봇시스템 배치를 추천합니다.',
      simpleRecommendation: '배뇨 배변과 즉시 음압 진공으로 흡인하고 물 세척과 온풍 드라이를 원스톱으로 처리하는 지속 가동 스마트 기저귀 로봇을 추천합니다.',
      reason: '배설 인지, 화장실 이동, 용변 후 청결 전 평가 영역에서 가장 중증인 극심한 어려움 상태를 보이고 있습니다.',
      simpleResultSummary: '인지, 거동, 뒤처리가 모두 차단된 중증 와상 상태로 24시간 대소변 감지 후 자동 물세척을 처리해주는 스마트 기저귀 로봇을 추천합니다.'
    }
  }
};
