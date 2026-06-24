import { Question, Result } from './transferCare';

export const feedingCareAlgorithm = {
  id: 'feeding',
  title: '식사돌봄로봇 자가평가 알고리즘',
  startQuestionId: 'q1',
  questions: {
    q1: {
      id: 'q1',
      title: '음식물을 삼키는 능력(연하 및 삼킴 작용)에 어려움이 있나요?',
      simpleTitle: '음식을 씹고 삼킬 때 자주 사래가 들리거나 삼키기 힘드신가요?',
      description: '',
      simpleDescription: '음식을 삼키거나 씹는 능력을 평가하여 흡인 위험성이 있는지 체크합니다.',
      iconType: 'safety',
      type: 'single',
      options: [
        { id: 'q1_0', text: '0점: 문제 없음', simpleText: '네, 사래 들림 없이 잘 삼켜요', score: 0, value: '0' },
        { id: 'q1_1', text: '1점: 가벼운 어려움', simpleText: '가끔 마른기침을 하거나 사래가 걸려요', score: 1, value: '1' },
        { id: 'q1_2', text: '2점: 중간 정도의 어려움', simpleText: '부드러운 음식이 아니면 씹고 삼키기 힘들어요', score: 2, value: '2' },
        { id: 'q1_3', text: '3점: 심한 어려움', simpleText: '삼킬 때 통증이 있거나 사래가 매우 자주 걸려요', score: 3, value: '3' },
        { id: 'q1_4', text: '4점: 극심한 어려움', simpleText: '물이나 음식을 전혀 삼키지 못해 튜브관/콧줄을 써야 해요', score: 4, value: '4' },
      ],
      nextQuestionId: (answers: Record<string, any>) => {
        const val = parseInt(answers['q1'] || '0');
        if (val >= 2) return 'q2_b';
        return 'q2_a';
      }
    } as Question,

    q2_a: {
      id: 'q2_a',
      title: '스스로 수저나 식기를 들어 입으로 음식을 가져갈 수 있나요?',
      simpleTitle: '스스로 숟가락이나 포크를 쥐고 음식을 입까지 가져가실 수 있나요?',
      description: '',
      simpleDescription: '어깨, 팔, 손가락 등의 신체 조절 능력을 평가하여 숟가락질이 가능한지 확인합니다.',
      iconType: 'transfer',
      type: 'single',
      options: [
        { id: 'q2a_0', text: '0점: 문제 없음', simpleText: '네, 다른 도움 없이 혼자서 잘 드세요', score: 0, value: '0' },
        { id: 'q2a_1', text: '1점: 가벼운 어려움', simpleText: '약간 손이 떨리거나 서툴러 흘리며 드세요', score: 1, value: '1' },
        { id: 'q2a_2', text: '2점: 중간 정도의 어려움', simpleText: '보조 숟가락이나 손목 보조기가 있어야 식사하세요', score: 2, value: '2' },
        { id: 'q2a_3', text: '3점: 심한 어려움', simpleText: '숟가락질이 곤란해 보호자가 주로 떠먹여 줘야 해요', score: 3, value: '3' },
        { id: 'q2a_4', text: '4점: 극심한 어려움', simpleText: '양팔을 거의 쓸 수 없어 전혀 수저를 쥐지 못해요', score: 4, value: '4' },
      ],
      nextQuestionId: (answers: Record<string, any>) => {
        const val = parseInt(answers['q2_a'] || '0');
        if (val >= 3) return 'q3_a';
        if (val === 2 || val === 1) return 'F-B';
        return 'F-A';
      }
    } as Question,

    q3_a: {
      id: 'q3_a',
      title: '목과 머리를 조작하여 앞에 놓인 음식을 입으로 직접 받아먹을 수 있나요?',
      simpleTitle: '머리를 앞뒤로 움직여 앞에 떠 주는 음식을 입으로 안전하게 받아먹을 수 있나요?',
      description: '',
      simpleDescription: '양팔 조절이 어려울 때, 목과 머리의 조절 능력을 이용하여 입으로 직접 음식을 섭취할 수 있는지 확인합니다.',
      iconType: 'balance',
      type: 'single',
      options: [
        { id: 'q3a_yes', text: '예, 가능합니다', simpleText: '네, 숟가락이 앞에 오면 고개를 내밀어 먹을 수 있어요', value: 'yes' },
        { id: 'q3a_no', text: '아니오, 어렵습니다', simpleText: '아니오, 목을 조절하거나 삼키는 자세를 유지하기 힘들어요', value: 'no' }
      ],
      resultId: (answers: Record<string, any>) => {
        const val = answers['q3_a'];
        if (val === 'yes') return 'F-C';
        return 'F-D';
      }
    } as Question,

    q2_b: {
      id: 'q2_b',
      title: '식사 시간 및 식사 행위를 인지하고 집중할 수 있나요?',
      simpleTitle: '치매나 인지 장애 등으로 인해 식사 도중 먹는 행동을 잊거나 중단하나요?',
      description: '',
      simpleDescription: '식사가 필요한 상황임을 깨닫고, 숟가락질 및 씹는 행동을 끝까지 집중해 수행할 수 있는지 평가합니다.',
      iconType: 'caregiver',
      type: 'single',
      options: [
        { id: 'q2b_yes', text: '예, 인지 가능하고 집중합니다', simpleText: '네, 식사에 잘 집중하시는 편이에요', value: 'yes' },
        { id: 'q2b_no', text: '아니오, 식사 상황을 잊거나 멈춥니다', simpleText: '아니오, 밥을 물고 가만히 있거나 먹는 것을 자주 까먹어요', value: 'no' }
      ],
      resultId: (answers: Record<string, any>) => {
        const val = answers['q2_b'];
        if (val === 'no') return 'F-E';
        return 'F-D';
      }
    } as Question,
  },
  results: {
    'F-A': {
      id: 'F-A',
      title: '도움 불필요',
      simpleTitle: '도움 없이 스스로 식사 가능',
      description: '연하 기능 및 상체 거동 능력이 모두 양호하여 현재 식사 보조용 돌봄로봇이나 보조 장치가 필요하지 않습니다.',
      simpleDescription: '음식을 씹고 삼키는 데 문제가 없고, 스스로 숟가락질을 하여 식사할 수 있는 안전한 상태입니다.',
      recommendation: '대상자가 잔존 기능 유지를 위해 스스로 천천히 즐겁게 식사하도록 지지합니다.',
      simpleRecommendation: '독립적인 식사를 유지하시고 식사 후 가벼운 구강 청결 활동을 권장합니다.',
      reason: '삼킴(연하) 능력과 상지 조절력 평가에서 모두 자립 수준으로 양호한 결과가 나왔습니다.',
      simpleResultSummary: '식사 관련 인지, 삼킴 및 손동작 자립도가 모두 훌륭하여 특별한 보조 기구가 권장되지 않습니다.'
    } as Result,
    'F-B': {
      id: 'F-B',
      title: '기능성 보조 식기 및 그립 지원 도구 이용',
      simpleTitle: '기능성 보조 식기 추천',
      description: '삼킴은 문제가 없으나 손떨림이나 가벼운 관절염, 한 손 지체 현상 등으로 일반 숟가락 및 젓가락 조작 시 흘리는 상태입니다.',
      simpleDescription: '숟가락을 놓치지 않도록 쥐는 힘을 돕거나, 손떨림을 센서로 감지하여 균형을 잡아주는 자이로 스푼, 음식을 뜨기 쉬운 특수 경사 식기를 권장합니다.',
      recommendation: '자이로 손떨림 방지 숟가락, 미끄럼 방지 식기 매트, 두꺼운 그립 보조 젓가락 도입을 제안합니다.',
      simpleRecommendation: '음식이 잘 쏟아지지 않는 경사형 식기와 스스로 쥘 수 있게 두껍게 특수 제작된 그립 숟가락을 추천합니다.',
      reason: '삼킴은 경미하여 안전하지만 상지 기능에서 떨림이나 약화로 인해 식사 도구 사용에 경증/중등도의 보조가 필요합니다.',
      simpleResultSummary: '수저 조작이 조금 떨리거나 쥐기가 불편하신 상태이므로, 그립 보조식기 및 자이로 수저를 고려하십시오.'
    } as Result,
    'F-C': {
      id: 'F-C',
      title: '전동 식사용 로봇',
      simpleTitle: '전동 식사보조 로봇 추천',
      description: '연하 상태는 양호하여 삼킬 수는 있으나 양팔의 중증 마비나 절단 등으로 스스로 수저를 쥐는 것이 아예 불가능한 대상자입니다.',
      simpleDescription: '머리와 목 조절은 가능하나 팔을 전혀 움직이지 못하는 분을 위해, 센서나 턱 스위치로 음식을 골라 식탁 위 로봇 팔이 숟가락으로 밥과 반찬을 떠서 입 앞까지 배달해 주는 돌봄로봇입니다.',
      recommendation: '버튼, 턱 스위치, 목 모션 인식 등을 이용해 음식을 선택하면 알아서 공급해주는 전동 식사 보조 로봇을 적용하십시오.',
      simpleRecommendation: '스스로의 조작에 의해 로봇팔이 반찬과 밥을 떠서 입으로 전해 주는 전동형 식사로봇 사용을 권장합니다.',
      reason: '상지 기능은 완전히 제약되어 숟가락질이 불가능하지만, 경부 조절과 삼킴 능력이 잘 보존되어 있어 기계식 급식 보조가 가장 잘 작동합니다.',
      simpleResultSummary: '상지 근력 상실로 식사 동작은 불가능하지만 입으로 음식을 받아먹을 고개 조작은 충분하므로 전동 식사보조 로봇을 추천합니다.'
    } as Result,
    'F-D': {
      id: 'F-D',
      title: '연하 보조식 제공 및 보호자 밀착 급식 보조',
      simpleTitle: '밀착 돌봄 및 연하 보조 관리',
      description: '삼킴 기능이 크게 저하되어 음식물이 기도로 넘어가 흡인성 폐렴을 야기할 고위험군이거나, 목과 머리 조절마저 어려워 기계식 지원이 위험한 상황입니다.',
      simpleDescription: '삼킴 기능 장애가 있고 질식 우려가 있으므로, 기계에 의존하기보다는 숙련된 보호자가 음식을 연두부나 죽 형태로 잘게 조절하여 조금씩 떠먹여 주고 면밀히 호흡을 지켜봐야 하는 환경입니다.',
      recommendation: '점도 증진제를 섞은 연하 보조식을 준비하고 식사 시 상체를 30~60도 세운 올바른 삼킴 자세를 유지하십시오. 기계 장치의 자율적인 사용을 제한합니다.',
      simpleRecommendation: '턱을 아래로 당기고 상체를 곧게 세운 자세로, 점도가 높은 연두부 형태의 죽을 한 입씩 부드럽게 섭취하도록 보호자가 옆에서 직접 도와주어야 합니다.',
      reason: '삼킴 곤란의 평가 점수가 높아 기도 폐쇄나 흡인성 폐렴의 우려가 극도로 크며, 고개 지탱이 불완전하여 기계적 로봇팔 적용 시 위험할 수 있습니다.',
      simpleResultSummary: '삼킴 사래 위험도가 매우 높아 급식을 기계에 맡기면 질식 등의 안전사고 우려가 있으므로, 보호자의 세심한 수동 급식과 질환식 공급을 추천합니다.'
    } as Result,
    'F-E': {
      id: 'F-E',
      title: '인지 환기 보조 장치 및 보호자 지도 관리',
      simpleTitle: '인지 식사 유도 및 보호자 지도 추천',
      description: '치매나 뇌손상 등으로 식사 상황 자체를 기억하지 못하거나 소반에 올린 음식을 가만히 바라만 보며 식사를 중단하는 등 인지적 자극 결핍 상태입니다.',
      simpleDescription: '삼킴이나 움직임은 기능적으로 가능하나 식사 행동을 지속하지 못하는 분을 위해, 식사 주기마다 스피커나 시각 패널로 "꼭꼭 씹어 삼키세요"와 같은 지시를 건네 인지적 주의를 주기적으로 환기해주는 교육 기법 및 기기입니다.',
      recommendation: '주기적인 식사 리듬 유도를 위해 식사 타이밍 유도 알림판을 활용하고, 보호자가 시각적으로 즐겁고 친화적인 배치를 적용하여 식사 순서를 인지하도록 유도합니다.',
      simpleRecommendation: '식사 진행 속도를 점검해 삼킬 타이밍을 친근한 음성으로 계속 일깨워 주는 스마트 스피커나 보호자의 주기적 자극 유도를 병행하십시오.',
      reason: '식사 의사 소통 및 행동의 지속성이 인지 저하로 차단되어, 신체 능력 보행 및 기계적인 동작 보조보다 인지적 환기 지원이 우선적으로 요구됩니다.',
      simpleResultSummary: '식사 행동 집중이 저하된 인지 장애(치매 등) 상태이므로, 음성 지시 및 타이밍 유도식 인지 환기를 추천합니다.'
    } as Result
  }
};
