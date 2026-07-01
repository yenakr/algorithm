import { Question, Result } from './transferCare';

// -------------------------------------------------------
// 식사돌봄 알고리즘 - 원본 트리 구조와 동일
//
// 삼킴 기능 평가 → 구강섭취 가능?
//   아니오 → F-D (구강 섭취 불가능 시, ...)
//   예
//     → 식사 종류 확인 → 먹기/마시기 기능평가
//     → 중간 정도 이상의 어려움이 있는가?
//         아니오 → F-A (가벼운 정도의 어려움이 있다면, • 특수식사도구 이용 ... / • 수동형 팔 지지대 이용)
//         예
//           → 팔의 근력 평가 → 팔을 들지 못하는가 (< Grade III)
//               예   → F-B (전자동 식사돌봄로봇 이용)
//               아니오 → F-C (팔의 근력에 따라, • 부분 식사보조기기 이용 ... / • 수동/반자동 식사돌봄로봇 이용)
// -------------------------------------------------------

export const feedingCareAlgorithm = {
  id: 'feeding',
  title: '식사돌봄 및 식사돌봄로봇의 활용 알고리즘',
  startQuestionId: 'q1',
  questions: {
    // Step 1: 삼킴 기능 평가
    q1: {
      id: 'q1',
      title: '구강섭취가 가능한가',
      simpleTitle: '구강섭취가 가능한가',
      description: '삼킴 기능 평가',
      simpleDescription: '삼킴 기능 평가',
      iconType: 'safety',
      type: 'single',
      options: [
        { id: 'q1_no', text: '아니오', simpleText: '아니오', value: 'no' },
        { id: 'q1_yes', text: '예', simpleText: '예', value: 'yes' },
      ],
      nextQuestionId: (answers: Record<string, any>) =>
        answers['q1'] === 'yes' ? 'q2' : null,
      resultId: (answers: Record<string, any>) =>
        answers['q1'] === 'no' ? 'F-D' : null,
    } as Question,

    // Step 2: 먹기/마시기 기능평가 (식사 종류 확인 후)
    q2: {
      id: 'q2',
      title: '중간 정도 이상의 어려움이 있는가',
      simpleTitle: '중간 정도 이상의 어려움이 있는가',
      description: '먹기/마시기 기능평가',
      simpleDescription: '먹기/마시기 기능평가',
      iconType: 'transfer',
      type: 'single',
      options: [
        { id: 'q2_no', text: '아니오', simpleText: '아니오', value: 'no' },
        { id: 'q2_yes', text: '예', simpleText: '예', value: 'yes' },
      ],
      nextQuestionId: (answers: Record<string, any>) =>
        answers['q2'] === 'yes' ? 'q3' : null,
      resultId: (answers: Record<string, any>) =>
        answers['q2'] === 'no' ? 'F-A' : null,
    } as Question,

    // Step 3: 팔의 근력 평가
    q3: {
      id: 'q3',
      title: '팔을 들지 못하는가 (< Grade III)',
      simpleTitle: '팔을 들지 못하는가 (< Grade III)',
      description: '팔의 근력 평가**',
      simpleDescription: '팔의 근력 평가**',
      iconType: 'balance',
      type: 'single',
      options: [
        { id: 'q3_yes', text: '예', simpleText: '예', value: 'yes' },
        { id: 'q3_no', text: '아니오', simpleText: '아니오', value: 'no' },
      ],
      resultId: (answers: Record<string, any>) =>
        answers['q3'] === 'yes' ? 'F-B' : 'F-C',
    } as Question,
  },
  results: {
    'F-A': {
      id: 'F-A',
      title: '가벼운 정도의 어려움이 있다면, \n• 특수식사도구 이용 (코 부위가 절린 컵, 경사 접시 등) \n• 수동형 팔 지지대 이용',
      simpleTitle: '가벼운 정도의 어려움이 있다면, \n• 특수식사도구 이용 (코 부위가 절린 컵, 경사 접시 등) \n• 수동형 팔 지지대 이용',
      description: '가벼운 정도의 어려움이 있다면, \n• 특수식사도구 이용 (코 부위가 절린 컵, 경사 접시 등) \n• 수동형 팔 지지대 이용',
      simpleDescription: '가벼운 정도의 어려움이 있다면, \n• 특수식사도구 이용 (코 부위가 절린 컵, 경사 접시 등) \n• 수동형 팔 지지대 이용',
      recommendation: '코 부위가 잘려 있는 특수 컵이나 경사 식기 및 수동 팔 거치 서포터를 도입합니다.',
      simpleRecommendation: '음식이 잘 쏟아지지 않는 특수 식기와 미끄럼 방지 그립 숟가락을 권장합니다.',
      reason: '먹기/마시기 기능평가 결과 가벼운 어려움이 있으므로 특수 식사도구와 수동형 팔 지지대를 통해 식사를 보조합니다.',
      simpleResultSummary: '수저 조작이 조금 떨리거나 쥐기가 다소 불편하신 상태이므로 그립 보조식기 및 수동식 팔 지지대를 권장합니다.'
    } as Result,
    'F-B': {
      id: 'F-B',
      title: '전자동 식사돌봄로봇 이용',
      simpleTitle: '전자동 식사돌봄로봇 이용',
      description: '전자동 식사돌봄로봇 이용',
      simpleDescription: '전자동 식사돌봄로봇 이용',
      recommendation: '사용자 작동형 또는 프로그램식 식사 공급 로봇을 가동합니다.',
      simpleRecommendation: '스스로의 버튼 조작이나 타이머에 맞춰 로봇이 밥을 입 앞까지 가져다주는 전자동 식사로봇 사용을 권장합니다.',
      reason: '팔 근력이 3등급 미만으로 스스로 팔을 들지 못해 숟가락질이 아예 불가능하므로 전자동 식사로봇을 권장합니다.',
      simpleResultSummary: '상지 근력 상실로 식사 동작은 불가능하지만 고개 조작 및 구강 섭취가 가능하므로 전자동 식사보조 로봇을 추천합니다.'
    } as Result,
    'F-C': {
      id: 'F-C',
      title: '부분 식사보조기기 이용 (예: 스프링 팔 지지대) \n수동/반자동 식사돌봄로봇 이용',
      simpleTitle: '부분 식사보조기기 이용 (예: 스프링 팔 지지대) \n수동/반자동 식사돌봄로봇 이용',
      description: '부분 식사보조기기 이용 (예: 스프링 팔 지지대) \n수동/반자동 식사돌봄로봇 이용',
      simpleDescription: '부분 식사보조기기 이용 (예: 스프링 팔 지지대) \n수동/반자동 식사돌봄로봇 이용',
      recommendation: '상지 기능 강도와 피로 수준에 맞춰 스프링 어깨 서포터나 반자동 로봇팔을 선택적으로 조합합니다.',
      simpleRecommendation: '팔을 공중에 띄워 무겁지 않게 받쳐주는 스프링식/반자동 팔 지지 서포터를 사용하여 식사를 지원합니다.',
      reason: '팔을 어느 정도 스스로 움직일 수 있으므로(3등급 이상) 잔존 동작 역량을 보조하고 피로를 줄여주는 부분식사보조나 반자동 기기가 추천됩니다.',
      simpleResultSummary: '팔을 어느 정도 스스로 들어 올릴 수 있으므로 팔을 받쳐주어 적은 힘으로 숟가락을 유도하게 돕는 반자동/스프링 지지 기기를 권장합니다.'
    } as Result,
    'F-D': {
      id: 'F-D',
      title: '구강 섭취 불가능 시, \n• 의료진의 지시에 따름. \n• 건강 영양 또는 완전 비경구영양 \n 식사 시 찾은 사례와 기침 시, \n• 구강 섭취(물 포함) 중단 \n• 의료진과 상의',
      simpleTitle: '구강 섭취 불가능 시, \n• 의료진의 지시에 따름. \n• 건강 영양 또는 완전 비경구영양 \n 식사 시 찾은 사례와 기침 시, \n• 구강 섭취(물 포함) 중단 \n• 의료진과 상의',
      description: '구강 섭취 불가능 시, \n• 의료진의 지시에 따름. \n• 건강 영양 또는 완전 비경구영양 \n 식사 시 찾은 사례와 기침 시, \n• 구강 섭취(물 포함) 중단 \n• 의료진과 상의',
      simpleDescription: '구강 섭취 불가능 시, \n• 의료진의 지시에 따름. \n• 건강 영양 또는 완전 비경구영양 \n 식사 시 찾은 사례와 기침 시, \n• 구강 섭취(물 포함) 중단 \n• 의료진과 상의',
      recommendation: '모든 구강 식이를 배제하고 수액이나 튜브를 이용해 안전을 도모하고 의료진과의 연하 치료를 상담하십시오.',
      simpleRecommendation: '안전을 위해 입으로 드시지 마시고 튜브나 수액을 통한 영양 공급 관리에 집중하며 기침 발생 시 즉시 식사를 중단하고 의료진을 찾으십시오.',
      reason: '삼킴이 전적으로 원활하지 않아 음식물 유입에 의한 질식 위험이 있으므로 비구강식 임상 영양 프로토콜을 따라야 합니다.',
      simpleResultSummary: '구강으로 섭취 시 기도 흡인 위험이 높으므로 비구강식 영양(튜브/TPN)을 안내하고 의사 상담을 처방합니다.'
    } as Result,
  }
};
