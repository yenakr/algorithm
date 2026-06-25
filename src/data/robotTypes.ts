export interface RobotType {
  id: string;
  name: string;
  oneLine: string;
  situations: string[];
  functions: string[];
  cautions: string[];
  examples?: string[];
  image: string;
}

export const robotTypeInfo: Record<string, RobotType[]> = {
  transfer: [
    {
      id: "ceiling-hoist",
      name: "천장형 리프트",
      oneLine: "천장에 설치된 트랙을 따라 돌봄받는자를 들어 올리고 이동시키는 고정형 이승 보조 장치입니다.",
      situations: [
        "침대, 휠체어, 의자 간 이동 보조가 필요한 경우",
        "같은 공간에서 반복적인 이승이 필요한 경우",
        "시설이나 방 안에 고정 설치가 가능한 경우"
      ],
      functions: [
        "천장 트랙을 따라 이동을 보조함",
        "돌봄받는자를 들어 올려 다른 위치로 옮기는 데 도움",
        "반복적인 이승 과정에서 돌봄제공자의 신체 부담을 줄이는 데 기여"
      ],
      cautions: [
        "설치 공간과 천장 구조 확인 필요",
        "고정 설치형이므로 사용 장소가 제한될 수 있음"
      ],
      examples: [],
      image: "/images/transfer_lift.png"
    },
    {
      id: "mobile-lift",
      name: "이동식 리프트",
      oneLine: "바퀴가 달린 이동형 장비로, 침대에서 의자나 화장실 등으로 이동하기 어려운 돌봄받는자를 옮기는 데 사용됩니다.",
      situations: [
        "특정 공간에 고정 설치가 어려운 경우",
        "침대, 휠체어, 의자, 화장실 등으로 이동이 필요한 경우",
        "여러 공간에서 같은 장비를 이동하며 사용해야 하는 경우"
      ],
      functions: [
        "이동형 구조로 필요한 위치에서 사용 가능",
        "돌봄받는자를 들어 올리고 이동하는 과정 보조",
        "수기 이승보다 돌봄제공자의 근골격계 부담을 줄이는 데 도움"
      ],
      cautions: [
        "사용 공간의 바닥 상태와 이동 경로 확인 필요",
        "방향 전환이나 좁은 공간 사용 가능 여부 확인 필요"
      ],
      examples: [],
      image: "/images/mobile_sling_lift.png"
    },
    {
      id: "transfer-automatic",
      name: "전자동 이승돌봄로봇 및 기기",
      oneLine: "전동 시스템과 지지 장치를 이용해 돌봄받는자의 체중을 지지하고, 들어올리기나 일어섬을 돕는 이승돌봄 장비입니다.",
      situations: [
        "체중 지지가 어렵거나 돌봄제공자의 직접 들어올림 부담이 큰 경우",
        "침대, 의자, 휠체어 간 이동 과정에서 더 강한 보조가 필요한 경우",
        "일어섬 또는 들어올림 과정에서 안정적인 지지가 필요한 경우"
      ],
      functions: [
        "특수 시트로 체중을 분산하여 들어올림을 보조",
        "흉부 지지 패드 등을 통해 몸을 지지하고 일어섬을 도움",
        "리모컨 조작으로 일정한 속도의 부드러운 이동을 지원",
        "과하중 경고, 브레이크, 비상정지 등 안전장치 포함"
      ],
      cautions: [
        "대상자의 자세 유지 능력과 체중 지지 가능 여부 확인 필요",
        "장비별 사용 조건과 보호자 조작 방법 확인 필요"
      ],
      examples: ["Sasuke", "Hug"],
      image: "/images/standing_aid.png"
    }
  ],
  toileting: [
    {
      id: "toileting-auto-care",
      name: "배설물 자동 처리 기기",
      oneLine: "거동이 불편한 대상자의 대소변을 감지하고, 처리·세정·건조 과정을 자동으로 보조하는 배설 케어 로봇입니다.",
      situations: [
        "침상에서 생활하는 시간이 긴 경우",
        "스스로 화장실 이동이나 배설 처리가 어려운 경우",
        "기저귀 교체와 회음부 세척 부담이 큰 경우"
      ],
      functions: [
        "소변과 대변 처리를 자동화하여 위생 관리 보조",
        "배설을 감지한 뒤 흡수, 세정, 건조 과정 수행",
        "피부가 젖어 있는 시간을 줄여 피부 손상 예방에 도움"
      ],
      cautions: [
        "피부 상태를 주기적으로 확인해야 함",
        "장시간 사용 시 위생 관리와 부착 상태 확인 필요",
        "대상자의 체형과 착용 가능 여부 확인 필요"
      ],
      examples: ["Care bidet", "intelligent incontinence cleaning robot"],
      image: "/images/excretion_robot.png"
    },
    {
      id: "smart-diaper-monitoring",
      name: "배뇨 및 배변 정보 모니터링 기기",
      oneLine: "센서를 통해 배뇨와 배변 정보를 감지하고, 돌봄제공자에게 실시간으로 전달하는 모니터링 기기입니다.",
      situations: [
        "배설 여부를 빠르게 확인해야 하는 경우",
        "배뇨·배변 발생 후 즉시 처리가 필요한 경우",
        "돌봄제공자가 계속 직접 확인하기 어려운 경우"
      ],
      functions: [
        "스마트 기저귀 등에 부착된 센서로 배뇨 및 배변 감지",
        "감지 정보를 스마트폰이나 컴퓨터로 전달",
        "배설 후 처리가 지연되지 않도록 알림 제공"
      ],
      cautions: [
        "센서 부착 상태 확인 필요",
        "알림 수신 환경과 돌봄제공자의 대응 체계 확인 필요",
        "실제 배설 처리 기능은 별도로 필요할 수 있음"
      ],
      examples: [],
      image: "/images/smart_diaper_robot.png"
    },
    {
      id: "toileting-prediction",
      name: "배설 예측 기기",
      oneLine: "방광 내 소변량을 모니터링하여 화장실에 갈 시점을 미리 알려주는 배설 예측 기기입니다.",
      situations: [
        "화장실에 가야 하는 시점을 스스로 판단하기 어려운 경우",
        "배뇨 실수를 줄이고 싶은 경우",
        "배뇨 패턴을 확인하며 관리해야 하는 경우"
      ],
      functions: [
        "초음파 센서를 이용해 방광 내 소변량을 모니터링",
        "화장실에 갈 타이밍을 미리 안내",
        "개인별 방광 용적에 따라 알림 기준 설정 가능"
      ],
      cautions: [
        "센서 부착 위치와 착용 지속 가능성 확인 필요",
        "알림을 받은 뒤 실제 화장실 이동이 가능한지 확인 필요",
        "이동 보조가 필요한 경우 다른 돌봄 장비와 함께 고려 필요"
      ],
      examples: ["DFree"],
      image: "/images/smart_diaper_robot.png"
    }
  ],
  feeding: [
    {
      id: "feeding-automatic",
      name: "전자동 식사돌봄로봇",
      oneLine: "사용자가 원하는 음식을 선택하면 로봇이 음식을 떠서 입 위치로 전달하는 자동 식사 보조 로봇입니다.",
      situations: [
        "손이나 팔 사용이 어려워 스스로 숟가락을 조작하기 어려운 경우",
        "식사 독립성을 높이고 싶은 경우",
        "일정한 위치와 속도로 음식 전달이 필요한 경우"
      ],
      functions: [
        "스위치나 터치스크린으로 음식 선택 가능",
        "입 위치 설정, 자동 음식 덜기, 접시 선택 지원",
        "사용자가 스스로 먹는 시간을 늘리는 데 도움"
      ],
      cautions: [
        "삼킴 기능과 흡인 위험 확인 필요",
        "입 위치 설정과 조작 방법 학습 필요",
        "사용 중 보호자 관찰이 필요할 수 있음"
      ],
      examples: ["Obi", "Neater Eater Robotic"],
      image: "/images/feeding_robot.png"
    },
    {
      id: "feeding-manual",
      name: "수동형 식사돌봄로봇",
      oneLine: "사용자의 손 움직임을 보조하여 숟가락을 들어 올리고 음식을 먹는 과정을 돕는 수동형 식사 보조 장치입니다.",
      situations: [
        "손이나 팔을 일부 사용할 수 있지만 움직임 조절이 어려운 경우",
        "떨림이나 운동실조로 식사가 어려운 경우",
        "전자동 장비보다 간단한 보조가 적합한 경우"
      ],
      functions: [
        "떨림이나 운동실조를 흡수하고 조정하는 데 도움",
        "내부 스프링을 통해 숟가락이 달린 팔의 움직임 보조",
        "높이와 속도 조절 가능"
      ],
      cautions: [
        "사용자가 장치를 조작할 수 있는 최소한의 상지 기능 확인 필요",
        "식사 자세와 식기 위치 조정 필요"
      ],
      examples: ["Neater Eater"],
      image: "/images/feeding_robot.png"
    },
    {
      id: "feeding-semi-auto-arm-support",
      name: "반자동 팔 지지대",
      oneLine: "팔을 전동 또는 반자동으로 지지하여 식사, 물 마시기, 물건 잡기 등의 동작을 돕는 장치입니다.",
      situations: [
        "팔을 들어 올리거나 입과 얼굴 쪽으로 손을 가져가기 어려운 경우",
        "삼두근 약화나 긴장으로 상지 움직임 보조가 필요한 경우",
        "식사뿐 아니라 위생활동이나 물건 잡기에도 보조가 필요한 경우"
      ],
      functions: [
        "컨트롤러, 터치스크린, 앱으로 지지 수준 조정",
        "식사, 물 마시기, 물건 잡기, 들어올리기 등 보조",
        "팔을 입과 얼굴 방향으로 움직이는 과정 지원"
      ],
      cautions: [
        "팔 지지 수준하고 움직임 범위 조정 필요",
        "휠체어 또는 테이블과의 설치 호환성 확인 필요"
      ],
      examples: [],
      image: "/images/feeding_robot.png"
    },
    {
      id: "feeding-manual-arm-support",
      name: "수동형 팔 지지대",
      oneLine: "팔과 손목을 지지해 음식을 입으로 가져가는 동작을 안정적으로 수행할 수 있도록 돕는 수동형 지지 장치입니다.",
      situations: [
        "팔을 일부 움직일 수 있지만 안정적인 지지가 필요한 경우",
        "식사 중 손목이나 팔의 피로가 큰 경우",
        "간단한 수동 보조만으로 식사 수행이 가능한 경우"
      ],
      functions: [
        "슬라이딩 동작으로 손목과 팔의 이동 보조",
        "식사 중 안정감과 지지력 제공",
        "어깨와 팔꿈치 움직임을 조절하는 데 도움"
      ],
      cautions: [
        "사용자의 자발적 움직임 가능 범위 확인 필요",
        "테이블 높이, 팔 위치, 식기 위치 조정 필요"
      ],
      examples: ["슬라이드형 팔 지지대", "어깨/팔꿈치 지지대"],
      image: "/images/feeding_robot.png"
    }
  ]
};

// Mappings from result IDs (e.g. T-C, B-B, F-C) to the corresponding Robot Type ID
export const resultToRobotTypeMap: Record<string, { category: 'transfer' | 'toileting' | 'feeding'; robotTypeId: string }> = {
  // 이승돌봄 결과 기기 매핑
  'T-C': { category: 'transfer', robotTypeId: 'transfer-automatic' },
  'T-D': { category: 'transfer', robotTypeId: 'transfer-automatic' },
  'T-E': { category: 'transfer', robotTypeId: 'ceiling-hoist' },
  'T-F': { category: 'transfer', robotTypeId: 'ceiling-hoist' },
  'T-G': { category: 'transfer', robotTypeId: 'mobile-lift' },
  'T-H': { category: 'transfer', robotTypeId: 'mobile-lift' },

  // 배설돌봄 결과 기기 매핑
  'B-B': { category: 'toileting', robotTypeId: 'toileting-auto-care' },
  'B-C': { category: 'toileting', robotTypeId: 'toileting-auto-care' },
  'B-D': { category: 'toileting', robotTypeId: 'toileting-auto-care' },
  'B-E': { category: 'toileting', robotTypeId: 'toileting-prediction' },
  'B-F': { category: 'toileting', robotTypeId: 'toileting-prediction' },
  'B-G': { category: 'toileting', robotTypeId: 'toileting-auto-care' },
  'B-H': { category: 'toileting', robotTypeId: 'smart-diaper-monitoring' },

  // 식사돌봄 결과 기기 매핑
  'F-B': { category: 'feeding', robotTypeId: 'feeding-manual' },
  'F-C': { category: 'feeding', robotTypeId: 'feeding-automatic' },
  'F-D': { category: 'feeding', robotTypeId: 'feeding-manual-arm-support' },
  'F-E': { category: 'feeding', robotTypeId: 'feeding-semi-auto-arm-support' }
};
