"use client"

import { useState, useEffect } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Smartphone, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function ScanPage() {
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState(null)
  const [nfcSupported, setNfcSupported] = useState(null)

  // 페이지 로드 시 스크롤 위치 초기화 및 스타일 리셋
  useEffect(() => {
    // 스크롤 위치 강제 초기화
    window.scrollTo(0, 0)

    // 모바일 화면 문제 해결을 위한 추가 코드
    document.body.style.overflow = "auto"
    document.body.style.position = "static"
    document.body.style.height = "auto"
    document.body.style.width = "100%"
    document.documentElement.style.height = "auto"
  }, [])

  // NFC 지원 여부 확인
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("NDEFReader" in window) {
        setNfcSupported(true)
      } else {
        setNfcSupported(false)
      }
    }
  }, [])

  // NFC 스캔 시작
  const startScanning = () => {
    if (!nfcSupported) {
      setError("이 기기는 NFC를 지원하지 않습니다")
      return
    }

    setScanning(true)
    setError(null)

    // 테스트를 위한 타임아웃 (실제 구현에서는 제거)
    setTimeout(() => {
      // 테스트용 환자 ID로 리디렉션
      window.location.href = "/patient-info"
    }, 3000)
  }

  return (
    <MobileLayout>
      <div className="container px-5 py-8 sm:py-12 mx-auto max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">NFC 스캔</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-300 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 max-w-sm mx-auto">
            응급상황, 단 한 번의 태그로 하트 속 플러스는 생명을, 전파는 연결을 상징합니다. NFC를 태그하면 필요한 정보가
            바로 전달됩니다. TAG HERE. 당신을 위한 안전.
          </p>
        </div>

        <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-white pb-4">
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <Smartphone className="w-5 h-5 mr-2 text-blue-500" />
              NFC 스캔
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 pb-8">
            {nfcSupported === null ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : nfcSupported === false ? (
              <div className="text-center py-6">
                <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">NFC를 지원하지 않는 기기</h3>
                <p className="text-gray-600 mb-6">
                  이 기기는 NFC를 지원하지 않습니다. NFC를 지원하는 기기로 시도해주세요.
                </p>
                <div className="mt-4">
                  <Link href="/patient-info">
                    <Button
                      variant="outline"
                      className="rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50 transition-all duration-200"
                    >
                      환자 정보 관리
                    </Button>
                  </Link>
                </div>
              </div>
            ) : scanning ? (
              <div className="text-center py-8">
                <div className="relative mx-auto mb-6 w-32 h-32">
                  <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
                  <div className="relative flex items-center justify-center w-32 h-32 bg-blue-100 rounded-full">
                    <Smartphone className="h-12 w-12 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">NFC 태그를 스캔하는 중...</h3>
                <p className="text-gray-600 mb-4">NFC 키링을 스마트폰 뒷면에 가까이 대고 잠시 기다려주세요.</p>
                <Button
                  variant="outline"
                  onClick={() => setScanning(false)}
                  className="mt-4 rounded-xl border-red-200 text-red-600 hover:bg-red-50 transition-all duration-200"
                >
                  스캔 취소
                </Button>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="mx-auto mb-6 w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                  <Smartphone className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">NFC 키링 스캔 준비 완료</h3>
                <p className="text-gray-600 mb-6">스캔 버튼을 누른 후 NFC 키링을 스마트폰 뒷면에 가까이 대세요.</p>
                <Button
                  onClick={startScanning}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-200 py-2.5"
                >
                  스캔 시작
                </Button>
                <div className="mt-4">
                  <Link href="/patient-info">
                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 transition-all duration-200 py-2.5"
                    >
                      환자 정보 관리
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-6 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                <div className="flex items-start">
                  <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-semibold text-lg mb-3">NFC 키링 사용 방법</h3>
            <ol className="space-y-3 text-gray-700 list-decimal list-inside">
              <li>스마트폰의 NFC 기능이 켜져 있는지 확인하세요.</li>
              <li>스캔 시작 버튼을 누르세요.</li>
              <li>NFC 키링을 스마트폰 뒷면에 가까이 대세요.</li>
              <li>환자 정보가 자동으로 표시됩니다.</li>
            </ol>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
