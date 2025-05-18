/**
 * 좌표를 주소로 변환하는 함수
 * @param {number} lng - 경도
 * @param {number} lat - 위도
 * @returns {Promise<string>} - 주소 문자열
 */
export async function coordsToAddress(lng, lat) {
  try {
    const response = await fetch(`/api/reverse-geocode?coords=${lng},${lat}`)

    if (!response.ok) {
      throw new Error("주소 변환에 실패했습니다.")
    }

    const data = await response.json()

    // 응답 데이터 로깅
    console.log("Reverse geocoding response:", data)

    if (data.status && data.status.code === 0) {
      // 주소 정보 추출
      const results = data.results || []
      let address = "주소 정보 없음"

      // 지역 정보 찾기
      const region = results.find((item) => item.name === "region")
      if (region && region.region) {
        // 시/도, 시/군/구, 읍/면/동 정보 조합
        const area1 = region.region.area1 ? region.region.area1.name : ""
        const area2 = region.region.area2 ? region.region.area2.name : ""
        const area3 = region.region.area3 ? region.region.area3.name : ""
        const area4 = region.region.area4 ? region.region.area4.name : ""

        address = [area1, area2, area3, area4].filter(Boolean).join(" ")
      }

      // 도로명 주소 찾기
      const land = results.find((item) => item.name === "land")
      if (land && land.land) {
        const roadName = land.land.name || ""
        const buildingNumber = land.land.number1 || ""
        const buildingName = (land.land.addition0 && land.land.addition0.value) || ""

        if (roadName && buildingNumber) {
          address += ` ${roadName} ${buildingNumber}`
          if (buildingName) {
            address += ` (${buildingName})`
          }
        }
      }

      return address
    }

    // 주소 정보가 없는 경우 기본 메시지 반환
    return "주소 정보를 찾을 수 없습니다"
  } catch (error) {
    console.error("주소 변환 오류:", error)
    // 오류 발생 시 기본 메시지 반환
    return "주소 정보를 찾을 수 없습니다"
  }
}

/**
 * 거리 계산 함수 (Haversine 공식)
 * @param {number} lat1 - 첫 번째 위치의 위도
 * @param {number} lng1 - 첫 번째 위치의 경도
 * @param {number} lat2 - 두 번째 위치의 위도
 * @param {number} lng2 - 두 번째 위치의 경도
 * @returns {number} - 미터 단위의 거리
 */
export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371e3 // 지구 반경 (미터)
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lng2 - lng1) * Math.PI) / 180

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c

  return d // 미터 단위
}

/**
 * 거리를 사람이 읽기 쉬운 형식으로 변환
 * @param {number} meters - 미터 단위의 거리
 * @returns {string} - 형식화된 거리 문자열
 */
export function formatDistance(meters) {
  if (meters < 1000) {
    return `${Math.round(meters)}m`
  } else {
    return `${(meters / 1000).toFixed(1)}km`
  }
}
