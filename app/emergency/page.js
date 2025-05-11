"use client"

import { useState, useEffect } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Phone, MessageSquare, User, Heart, Clock, MapPin } from "lucide-react"
import Link from "next/link"

export default function EmergencyPage() {
  const [location, setLocation] = useState(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: "홍부모", relationship: "부모", phone: "010-9876-5432" },
    { id: 2, name: "김의사", relationship: "주치의", phone: "010-1111-2222" },
  ])
  const [medicalInfo, setMedicalInfo] = useState({
    name: "홍길동",
    bloodType: "A+",
    allergies: "없음",
    medications: "고혈압약",
    conditions: "고혈압",
  })

  useEffect(() => {
    // 페이지 로드 시 스크롤을 맨 위로
    window.scrollTo(0, 0)

    // 현재 위치 가져오기
    getCurrentLocation()
  }, [])

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("이 브라우저에서는 위치 정보를 지원하지 않습니다.")
      return
    }

    setIsLoadingLocation(true)

    navigator.geolocation.getCurrentPosition(
      // 성공 콜백
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({ lat: latitude, lng: longitude })
        setIsLoadingLocation(false)
      },
      // 오류 콜백
      (error) => {
        setIsLoadingLocation(false)
        console.error("위치 정보 가져오기 오류:", error)
        alert("위치 정보를 가져오는데 실패했습니다.")
      },
      // 옵션
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }

  const callEmergency = () => {
    window.location.href = "tel:119"
  }

  const sendSMS = (phone) => {
    const message = `[긴급] ${medicalInfo.name}님이 응급 상황입니다. ${location ? `현재 위치: https://map.naver.com/v5/entry/place/location?lng=${location.lng}&lat=${location.lat}` : "위치 정보 없음"}`
    window.location.href = `sms:${phone}?body=${encodeURIComponent(message)}`
  }

  const callContact = (phone) => {
    window.location.href = `tel:${phone}`
  }

  return (
    <MobileLayout>
      <div className="container px-4 py-6 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-3">긴급 연락</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-300 mx-auto rounded-full mb-3"></div>
            <p className="text-gray-600 max-w-xl mx-auto text-sm">응급 상황 시 빠르게 도움을 요청하세요</p>
          </div>

          {/* 119 긴급 전화 */}
          <div className="mb-6">
            <Button
              onClick={callEmergency}
              className="w-full h-20 bg-red-600 hover:bg-red-700 rounded-xl flex items-center justify-center gap-3 text-xl font-bold"
            >
              <AlertTriangle className="h-8 w-8" />
              119 긴급 전화
              <Phone className="h-8 w-8" />
            </Button>
          </div>

          {/* 내 의료 정보 */}
          <Card className="mb-6 border-0 shadow-lg rounded-2xl overflow-hidden bg-white">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-red-500" />내 의료 정보
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">이름:</span>
                  <span className="font-medium">{medicalInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">혈액형:</span>
                  <span className="font-medium">{medicalInfo.bloodType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">알레르기:</span>
                  <span className="font-medium">{medicalInfo.allergies}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">복용 중인 약물:</span>
                  <span className="font-medium">{medicalInfo.medications}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">기저질환:</span>
                  <span className="font-medium">{medicalInfo.conditions}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 비상 연락처 */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <Phone className="h-5 w-5 mr-2 text-red-500" />
              비상 연락처
            </h2>
            <div className="space-y-4">
              {emergencyContacts.map((contact) => (
                <Card key={contact.id} className="border-0 shadow-md rounded-xl overflow-hidden bg-white">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3 className="font-bold">{contact.name}</h3>
                        <p className="text-sm text-gray-600">{contact.relationship}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => sendSMS(contact.phone)}
                          size="sm"
                          variant="outline"
                          className="h-10 w-10 p-0 rounded-full border-gray-200"
                        >
                          <MessageSquare className="h-5 w-5 text-blue-600" />
                        </Button>
                        <Button
                          onClick={() => callContact(contact.phone)}
                          size="sm"
                          className="h-10 w-10 p-0 rounded-full bg-green-600 hover:bg-green-700"
                        >
                          <Phone className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm">{contact.phone}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 빠른 링크 */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <Heart className="h-5 w-5 mr-2 text-red-500" />
              빠른 응급 서비스
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/aed-map">
                <Button className="w-full h-16 bg-red-600 hover:bg-red-700 text-white rounded-xl flex flex-col items-center justify-center">
                  <MapPin className="h-6 w-6 mb-1" />
                  <span className="text-sm">AED 위치 찾기</span>
                </Button>
              </Link>
              <Link href="/patient-info">
                <Button
                  variant="outline"
                  className="w-full h-16 border-blue-200 hover:bg-blue-50 rounded-xl flex flex-col items-center justify-center"
                >
                  <User className="h-6 w-6 text-blue-600 mb-1" />
                  <span className="text-sm">환자 정보</span>
                </Button>
              </Link>
              <Link href="/scan">
                <Button
                  variant="outline"
                  className="w-full h-16 border-purple-200 hover:bg-purple-50 rounded-xl flex flex-col items-center justify-center"
                >
                  <Clock className="h-6 w-6 text-purple-600 mb-1" />
                  <span className="text-sm">NFC 스캔</span>
                </Button>
              </Link>
              <a href="tel:119">
                <Button
                  variant="outline"
                  className="w-full h-16 border-red-200 hover:bg-red-50 rounded-xl flex flex-col items-center justify-center"
                >
                  <Phone className="h-6 w-6 text-red-600 mb-1" />
                  <span className="text-sm">119 신고</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
