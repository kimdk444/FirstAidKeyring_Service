// 환자 정보 타입 정의
// export interface PatientInfo {
//   id: string
//   name: string
//   birthdate: string
//   age: number
//   gender: string
//   bloodType: string
//   allergies: string
//   medications: string
//   conditions: string
//   emergencyContact: string
//   emergencyPhone: string
//   notes: string
// }

// AED 위치 타입 정의
// export interface AedLocation {
//   id: number
//   name: string
//   address: string
//   lat: number
//   lng: number
//   distance?: number
// }

// 환자 정보
export const mockPatients = {
  p12345: {
    id: "p12345",
    name: "홍길동",
    birthdate: "1980-05-15",
    age: 43,
    gender: "남성",
    bloodType: "A+",
    allergies: "페니실린, 땅콩",
    medications: "고혈압약 (아침 1정), 당뇨약 (아침/저녁 1정)",
    conditions: "고혈압, 당뇨병",
    emergencyContact: "홍길순 (배우자)",
    emergencyPhone: "010-1234-5678",
    notes: "최근 심장 스텐트 시술 (2023년 3월)",
  },
  p67890: {
    id: "p67890",
    name: "김영희",
    birthdate: "1992-11-23",
    age: 31,
    gender: "여성",
    bloodType: "O-",
    allergies: "해산물, 아스피린",
    medications: "천식 흡입기 (필요시 사용)",
    conditions: "천식, 갑상선 기능 저하증",
    emergencyContact: "김철수 (형제)",
    emergencyPhone: "010-9876-5432",
    notes: "임신 중 (28주차)",
  },
}

// AED 위치 정보
export const mockAedLocations = [
  { id: 1, name: "서울역", address: "서울특별시 중구 한강대로 405", lat: 37.556, lng: 126.972 },
  { id: 2, name: "강남역", address: "서울특별시 강남구 강남대로 396", lat: 37.498, lng: 127.027 },
  { id: 3, name: "홍대입구역", address: "서울특별시 마포구 양화로 지하 160", lat: 37.557, lng: 126.924 },
  { id: 4, name: "여의도공원", address: "서울특별시 영등포구 여의공원로 68", lat: 37.525, lng: 126.918 },
  { id: 5, name: "올림픽공원", address: "서울특별시 송파구 올림픽로 424", lat: 37.516, lng: 127.112 },
]

// 응급 상황 가이드 정보
// export interface EmergencyGuide {
//   title: string
//   steps: {
//     title: string
//     description: string
//   }[]
// }

export const emergencyGuide = {
  title: "응급 상황 대처 가이드",
  steps: [
    {
      title: "의식 확인",
      description: "환자의 어깨를 가볍게 두드리며 의식이 있는지 확인하세요. 반응이 없으면 즉시 119에 신고하세요.",
    },
    {
      title: "심폐소생술(CPR) 시작",
      description: "환자를 바로 눕히고 가슴 중앙에 손을 겹쳐 분당 100-120회 속도로 5-6cm 깊이로 압박하세요.",
    },
    {
      title: "AED 사용",
      description: "AED가 도착하면 전원을 켜고 음성 안내에 따라 패드를 부착하세요. 분석 버튼을 누르고 지시에 따르세요.",
    },
    {
      title: "구급대원 도착까지 반복",
      description:
        "구급대원이 도착할 때까지 CPR과 AED 사용을 반복하세요. 환자가 의식을 회복하면 회복 자세를 취하게 하세요.",
    },
  ],
}
