"use client"

import { useState, useEffect } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Heart, Phone, Droplet, Calendar, AlertTriangle, Download, Share2 } from "lucide-react"

export default function MedicalIDPage() {
  const [isLoading, setIsLoading] = useState(true)

  // 사용자 의료 정보 (실제로는 API나 로컬 스토리지에서 가져올 것)
  const medicalInfo = {
    name: "홍길동",
    birthdate: "1990-01-01",
    bloodType: "A+",
    allergies: "페니실린, 땅콩",
    medications: "고혈압약",
    conditions: "고혈압, 당뇨",
    emergencyContacts: [{ name: "홍부모", relationship: "부모", phone: "010-9876-5432" }],
  }

  useEffect(() => {
    // 페이지 로드 시 스크롤을 맨 위로
    window.scrollTo(0, 0)

    // 로딩 상태 시뮬레이션
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <MobileLayout>
      <div className="container px-4 py-6 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-3">의료 ID 카드</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-300 mx-auto rounded-full mb-3"></div>
            <p className="text-gray-600 max-w-xl mx-auto text-sm">
              응급 상황에서 의료진이 확인할 수 있는 의료 정보 카드입니다.
            </p>
          </div>

          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white mb-6">
            <CardHeader className="bg-gradient-to-r from-red-600 to-red-500 text-white pb-4">
              <CardTitle className="flex items-center text-lg">
                <AlertTriangle className="w-5 h-5 mr-2" />
                응급 의료 정보 카드
              </CardTitle>
              <div className="text-sm opacity-90">응급 상황 시 의료진에게 보여주세요</div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="w-5 h-5 text-gray-500 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">이름</div>
                    <div className="font-medium">{medicalInfo.name}</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-500 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">생년월일</div>
                    <div className="font-medium">{medicalInfo.birthdate}</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Droplet className="w-5 h-5 text-red-500 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">혈액형</div>
                    <div className="font-medium">{medicalInfo.bloodType}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <div className="text-sm font-medium text-gray-700 mb-2">알레르기</div>
                  <div className="text-sm bg-red-50 p-2 rounded-lg text-red-700">{medicalInfo.allergies || "없음"}</div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">복용 중인 약물</div>
                  <div className="text-sm bg-blue-50 p-2 rounded-lg text-blue-700">
                    {medicalInfo.medications || "없음"}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">기저질환</div>
                  <div className="text-sm bg-green-50 p-2 rounded-lg text-green-700">
                    {medicalInfo.conditions || "없음"}
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <div className="text-sm font-medium text-gray-700 mb-2">비상 연락처</div>
                  {medicalInfo.emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg mb-2">
                      <div>
                        <div className="font-medium">
                          {contact.name} ({contact.relationship})
                        </div>
                        <div className="text-sm text-gray-500">{contact.phone}</div>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                        <Phone className="h-4 w-4 text-green-600" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-4 mb-8">
            <Button className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-200 h-12 korean-text-fix">
              <Download className="w-4 h-4 mr-2" />
              ID 카드 저장
            </Button>
            <Button
              variant="outline"
              className="flex-1 rounded-xl border-gray-200 hover:border-blue-300 hover:bg-blue-50 h-12 korean-text-fix"
            >
              <Share2 className="w-4 h-4 mr-2" />
              공유하기
            </Button>
          </div>

          <Card className="border-0 shadow-md rounded-2xl overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start">
                <Heart className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">의료 ID 카드 활용 팁</h3>
                  <p className="text-sm text-gray-600">
                    의료 ID 카드를 스마트폰에 저장하거나 인쇄하여 지갑에 보관하세요. 응급 상황에서 의료진이 빠르게
                    확인할 수 있도록 잠금 화면에도 표시할 수 있습니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MobileLayout>
  )
}
