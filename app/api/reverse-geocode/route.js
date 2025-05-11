import { NextResponse } from "next/server"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const coords = searchParams.get("coords")

    if (!coords) {
      return NextResponse.json({ error: "좌표 정보가 필요합니다." }, { status: 400 })
    }

    const [lng, lat] = coords.split(",").map(Number)

    if (isNaN(lng) || isNaN(lat)) {
      return NextResponse.json({ error: "유효하지 않은 좌표 형식입니다." }, { status: 400 })
    }

    // 네이버 지도 API 키
    const clientId = process.env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID
    const clientSecret = process.env.NAVER_MAPS_CLIENT_SECRET

    if (!clientId || !clientSecret) {
      console.error("네이버 지도 API 키가 설정되지 않았습니다.")
      return NextResponse.json({ error: "API 키 설정 오류" }, { status: 500 })
    }

    // 네이버 지도 API 호출
    const url = `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${lng},${lat}&output=json`

    console.log("Reverse geocoding request URL:", url)

    const response = await fetch(url, {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": clientId,
        "X-NCP-APIGW-API-KEY": clientSecret,
      },
    })

    if (!response.ok) {
      console.error("네이버 API 응답 오류:", response.status, response.statusText)
      return NextResponse.json({ error: "네이버 API 응답 오류" }, { status: response.status })
    }

    const data = await response.json()

    // 응답 데이터 로깅
    console.log("Naver API response:", JSON.stringify(data).substring(0, 200) + "...")

    return NextResponse.json(data)
  } catch (error) {
    console.error("역지오코딩 처리 오류:", error)
    return NextResponse.json({ error: "역지오코딩 처리 중 오류가 발생했습니다." }, { status: 500 })
  }
}
