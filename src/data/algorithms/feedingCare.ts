import { Question, Result } from './transferCare';

export const feedingCareAlgorithm = {
  id: 'feeding',
  title: '식사돌봄로봇 자가평가 알고리즘',
  startQuestionId: 'q1',
  questions: {
    q1: {
      id: 'q1',
      title: '구강 섭취가 가능한가',
      simpleTitle: '입으로 직접 음식을 삼키고 섭취할 수 있나요?',
      iconType: 'safety',
      type: 'single',
      options: [
        { id: 'q1_yes', text: '예', simpleText: '네, 입으로 음식을 직접 먹을 수 있어요', value: 'yes' },
        { id: 'q1_no', text: '아니오', simpleText: '아니오, 입으로 먹기 어려워요', value: 'no' },
      ],
      nextQuestionId: (answers: Record<string, any>) => {
        const val = answers['q1'];
        if (val === 'yes') return 'q2';
        return null;
      },
      resultId: (answers: Record<string, any>) => {
        const val = answers['q1'];
        if (val === 'no') return 'F-D';
        return null;
      }
    } as Question,

    q2: {
      id: 'q2',
      title: '먹기/마시기 기능 평가',
      simpleTitle: '음식을 숟가락이나 도구로 떠서 직접 드시는 데 어느 정도 어려움이 있나요?',
      iconType: 'transfer',
      type: 'single',
      options: [
        { id: 'q2_light', text: '가벼운 어려움/어려움 없음', simpleText: '혼자 드실 수는 있지만 약간 서툴거나 손이 조금 떨려요', value: 'light' },
        { id: 'q2_heavy', text: '중간 정도 이상의 어려움', simpleText: '숟가락질이 많이 어렵거나 스스로 도구를 쓰지 못해요', value: 'heavy' },
      ],
      nextQuestionId: (answers: Record<string, any>) => {
        const val = answers['q2'];
        if (val === 'heavy') return 'q3';
        return null;
      },
      resultId: (answers: Record<string, any>) => {
        const val = answers['q2'];
        if (val === 'light') return 'F-A';
        return null;
      }
    } as Question,

    q3: {
      id: 'q3',
      title: '팔의 근력 평가 (팔을 들지 못하는가)',
      simpleTitle: '스스로 팔을 들어 올릴 수 있나요?',
      iconType: 'balance',
      type: 'single',
      options: [
        { id: 'q3_low', text: '아니오 (<Grade III)', simpleText: '팔을 위로 들어 올릴 수 없어요', value: 'low' },
        { id: 'q3_high', text: '예', simpleText: '팔을 스스로 들 수는 있지만, 버티는 힘이 약하거나 수저 조작이 서툴러요', value: 'high' }
      ],
      resultId: (answers: Record<string, any>) => {
        const val = answers['q3'];
        if (val === 'low') return 'F-B';
        if (val === 'high') return 'F-C';
        return null;
      }
    } as Question,
  },
  results: {
    'F-A': {
      id: 'F-A',
      title: '특수식사도구 이용',
      simpleTitle: '특수식사도구 이용',
      description: '삼킴은 문제가 없으나 손가락 관절염이나 가벼운 관절 약화 등으로 수저질이 약간 불편한 상태입니다.',
      simpleDescription: '가벼운 손떨림이나 그립력 부족을 메워주는 두꺼운 수저, 미끄럼 방지 식기 및 수동 팔 지지대를 권장합니다.',
      recommendation: '자이로 손떨림 방지 식기, 경사형 식기, 수동식 팔 지지 장치를 제안합니다.',
      simpleRecommendation: '음식이 잘 쏟아지지 않는 특수 식기와 미끄럼 방지 그립 숟가락을 권장합니다.',
      reason: '삼킴 및 구강 섭취에 문제는 없으며, 식사 보조 동작에서 경증의 조력만 필요하므로 특수 식사도구와 수동형 팔 지지대가 적절합니다.',
      simpleResultSummary: '수저 조작이 조금 떨리거나 쥐기가 다소 불편하신 상태이므로, 그립 보조식기 및 수동식 팔 지지대를 권장합니다.'
    } as Result,
    'F-B': {
      id: 'F-B',
      title: '전자동 식사돌봄로봇 이용',
      simpleTitle: '전자동 식사돌봄로봇 이용',
      description: '구강 섭취와 삼킴은 가능하지만, 양쪽 상지 마비나 극심한 약화(근력 3등급 미만)로 수저를 전혀 들 수 없는 상태입니다.',
      simpleDescription: '양팔을 전혀 사용하기 어려우나 목과 머리를 움직여 섭취가 가능한 상태로, 기계식 로봇팔이 반찬과 밥을 떠서 입 앞까지 배달해 주는 전동형 식사로봇이 필요합니다.',
      recommendation: '버튼, 턱 스위치, 음성/시선 인식 등의 컨트롤러로 밥과 반찬을 자동 공급받는 전자동 식사돌봄로봇을 적용합니다.',
      simpleRecommendation: '스스로의 버튼 조작이나 타이머에 맞춰 로봇이 밥을 입 앞까지 가져다주는 전자동 식사로봇 사용을 권장합니다.',
      reason: '팔 근력(근력 등급)이 3등급 미만으로 중력을 이겨내고 팔을 들 수 없는 상태이므로, 완전한 기계 보조(전자동) 방식이 적합합니다.',
      simpleResultSummary: '상지 근력 상실로 식사 동작은 불가능하지만 고개 조작 및 구강 섭취가 가능하므로 전자동 식사보조 로봇을 추천합니다.'
    } as Result,
    'F-C': {
      id: 'F-C',
      title: '부분 식사보조기기 / 수동·반자동 식사돌봄로봇',
      simpleTitle: '부분 식사보조기기 / 수동·반자동 식사돌봄로봇',
      description: '중력을 이겨내고 스스로 팔은 들어 올릴 수 있으나(근력 3등급 이상), 정밀한 수저 조작이 어렵거나 식사 시 피로도가 심한 상태입니다.',
      simpleDescription: '스스로 팔은 들 수 있으나 식사하는 동안 버티는 힘이 부족한 분을 위해, 팔의 무게를 덜어주는 반자동 팔 지지 장치나 스프링 장치를 사용해 섭취를 돕습니다.',
      recommendation: '상지 현수형 서포트 기기 및 동력 보조형 반자동 팔 지지 장치 사용을 제안합니다.',
      simpleRecommendation: '팔을 공중에 띄워 무겁지 않게 받쳐주는 스프링식/반자동 팔 지지 서포터를 사용하여 식사를 지원합니다.',
      reason: '팔을 들 힘(근력 3등급 이상)은 충분하므로 기계식 전자동 로봇 대신 환자의 잔존 동작을 보조하고 활성화하는 반자동/부분보조형 서포터가 바람직합니다.',
      simpleResultSummary: '팔을 어느 정도 스스로 들어 올릴 수 있으므로, 팔을 받쳐주어 적은 힘으로 숟가락을 유도하게 돕는 반자동/스프링 지지 기기를 권장합니다.'
    } as Result,
    'F-D': {
      id: 'F-D',
      title: '구강 섭취 불가능 시 (의료진 지시, 경관영양 등)',
      simpleTitle: '구강 섭취 불가능 시 (의료진 지시, 경관영양 등)',
      description: '구강을 통한 삼킴과 기침 조절이 절대 불가능하여, 입으로 식사할 시 흡인성 폐렴이나 기도 폐색의 위험이 매우 높은 상태입니다.',
      simpleDescription: '구강 섭취가 불가능해 콧줄/위루관(경관영양) 또는 정맥영양(TPN)을 사용 중이며, 식사 중 사래나 기침이 나면 물을 포함한 모든 구강 공급을 중단하고 의료진과 즉시 상의해야 합니다.',
      recommendation: '모든 구강 섭취를 중단하고, 경관영양 또는 정맥주사형 영양법(TPN)을 수행하며, 사래가 지속되면 주치의와 즉시 연하 재활 요법을 상담하십시오.',
      simpleRecommendation: '안전을 위해 입으로 드시지 마시고, 튜브나 수액을 통한 영양 공급 관리에 집중하며 사래 기침 발생 시 즉시 식사를 중단하고 의료진을 찾으십시오.',
      reason: '삼킴 기능의 불능으로 인해 흡인 위험이 매우 크므로, 비구강식 의료 전용 영양 지원 가이드라인을 따르는 것이 유일하고 안전한 처방입니다.',
      simpleResultSummary: '구강으로 섭취 시 기도 흡인 위험이 극히 높으므로 비구강식 영양(튜브/TPN)을 안내하고 의사 상담을 처방합니다.'
    } as Result
  }
};
