"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Save, User, Calendar, Droplet, FileText, Phone } from "lucide-react"
import { MobileLayout } from "@/components/mobile-layout"

// 클라이언트 컴포넌트에서는 메타데이터를 정의하지 않음
// 메타데이터는 layout.js 파일에서 정의

export default function PatientInfoPage() {
  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    gender: "",
    bloodType: "",
    allergies: "",
    medications: "",
    conditions: "",
    emergencyContact: "",
    emergencyPhone: "",
    notes: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  // Force scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)

    // Reset any problematic styles
    document.body.style.overflow = "auto"
    document.body.style.position = "static"
    document.body.style.height = "auto"
    document.body.style.width = "100%"
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!formData.name || !formData.birthdate || !formData.gender || !formData.bloodType) {
      setError("필수 항목을 모두 입력해주세요")
      return
    }

    setIsLoading(true)

    try {
      // 실제 저장 로직 구현
      console.log("환자 정보:", formData)

      // API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess("환자 정보가 성공적으로 저장되었습니다")
    } catch (err) {
      setError("정보 저장 중 오류가 발생했습니다")
    } finally {
      setIsLoading(false)
    }
  }

  const goToNextTab = () => {
    if (activeTab === "basic") {
      setActiveTab("medical")
    } else if (activeTab === "medical") {
      setActiveTab("emergency")
    }
  }

  const goToPrevTab = () => {
    if (activeTab === "emergency") {
      setActiveTab("medical")
    } else if (activeTab === "medical") {
      setActiveTab("basic")
    }
  }

  return (
    <MobileLayout>
      <div className="container px-4 py-8 sm:py-12 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">환자 인적사항</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-300 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
              응급 상황에서 의료진이 확인할 수 있는 중요한 의료 정보를 입력해주세요
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8 bg-gray-100 p-1 rounded-xl">
              <TabsTrigger
                value="basic"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm text-xs sm:text-sm"
              >
                <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                기본 정보
              </TabsTrigger>
              <TabsTrigger
                value="medical"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm text-xs sm:text-sm"
              >
                <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                의료 정보
              </TabsTrigger>
              <TabsTrigger
                value="emergency"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm text-xs sm:text-sm"
              >
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                비상 연락처
              </TabsTrigger>
            </TabsList>

            {error && (
              <Alert variant="destructive" className="mb-6 bg-red-50 border-red-200 rounded-xl">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>오류</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 bg-green-50 border-green-200 rounded-xl">
                <AlertCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">성공</AlertTitle>
                <AlertDescription className="text-green-700">{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TabsContent value="basic">
                <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white">
                  <CardHeader className="bg-gradient-to-r from-red-50 to-white pb-4">
                    <CardTitle className="flex items-center text-lg sm:text-xl">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-500" />
                      기본 정보
                    </CardTitle>
                    <CardDescription>환자의 기본 인적사항을 입력해주세요</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-5 pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium flex items-center">
                        <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-red-500" />
                        이름 <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-10 sm:h-12 rounded-xl border-gray-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthdate" className="text-sm font-medium flex items-center">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-red-500" />
                        생년월일 <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="birthdate"
                        name="birthdate"
                        type="date"
                        value={formData.birthdate}
                        onChange={handleChange}
                        required
                        className="h-10 sm:h-12 rounded-xl border-gray-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-sm font-medium">
                        성별 <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                        <SelectTrigger
                          id="gender"
                          className="h-10 sm:h-12 rounded-xl border-gray-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 transition-all duration-200"
                        >
                          <SelectValue placeholder="성별 선택" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl bg-white border border-gray-200 shadow-lg z-50">
                          <SelectItem value="male">남성</SelectItem>
                          <SelectItem value="female">여성</SelectItem>
                          <SelectItem value="other">기타</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bloodType" className="text-sm font-medium flex items-center">
                        <Droplet className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-red-500" />
                        혈액형 <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Select
                        value={formData.bloodType}
                        onValueChange={(value) => handleSelectChange("bloodType", value)}
                      >
                        <SelectTrigger
                          id="bloodType"
                          className="h-10 sm:h-12 rounded-xl border-gray-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 transition-all duration-200"
                        >
                          <SelectValue placeholder="혈액형 선택" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl bg-white border border-gray-200 shadow-lg z-50">
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                          <SelectItem value="Unknown">모름</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-4 pb-6">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => window.history.back()}
                      className="rounded-xl border-gray-200 hover:bg-gray-50 transition-all duration-200 text-xs sm:text-sm h-9 sm:h-10 korean-text-fix"
                    >
                      뒤로가기
                    </Button>
                    <Button
                      type="button"
                      onClick={goToNextTab}
                      className="rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-md hover:shadow-lg transition-all duration-200 text-xs sm:text-sm h-9 sm:h-10 korean-text-fix"
                    >
                      다음
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="medical">
                <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-white pb-4">
                    <CardTitle className="flex items-center text-lg sm:text-xl">
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" />
                      의료 정보
                    </CardTitle>
                    <CardDescription>환자의 의료 정보를 입력해주세요</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-5 pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="allergies" className="text-sm font-medium">
                        알레르기
                      </Label>
                      <Textarea
                        id="allergies"
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleChange}
                        placeholder="알레르기가 있다면 입력해주세요"
                        className="min-h-[80px] sm:min-h-[100px] rounded-xl border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="medications" className="text-sm font-medium">
                        복용 중인 약물
                      </Label>
                      <Textarea
                        id="medications"
                        name="medications"
                        value={formData.medications}
                        onChange={handleChange}
                        placeholder="현재 복용 중인 약물을 입력해주세요"
                        className="min-h-[80px] sm:min-h-[100px] rounded-xl border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="conditions" className="text-sm font-medium">
                        기저질환
                      </Label>
                      <Textarea
                        id="conditions"
                        name="conditions"
                        value={formData.conditions}
                        onChange={handleChange}
                        placeholder="당뇨, 고혈압 등 기저질환을 입력해주세요"
                        className="min-h-[80px] sm:min-h-[100px] rounded-xl border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-4 pb-6">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={goToPrevTab}
                      className="rounded-xl border-gray-200 hover:bg-gray-50 transition-all duration-200 text-xs sm:text-sm h-9 sm:h-10 korean-text-fix"
                    >
                      이전
                    </Button>
                    <Button
                      type="button"
                      onClick={goToNextTab}
                      className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-200 text-xs sm:text-sm h-9 sm:h-10 korean-text-fix"
                    >
                      다음
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="emergency">
                <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-white pb-4">
                    <CardTitle className="flex items-center text-lg sm:text-xl">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500" />
                      비상 연락처
                    </CardTitle>
                    <CardDescription>응급 상황 시 연락할 사람의 정보를 입력해주세요</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-5 pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact" className="text-sm font-medium">
                        비상 연락처 이름
                      </Label>
                      <Input
                        id="emergencyContact"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        placeholder="홍길동"
                        className="h-10 sm:h-12 rounded-xl border-gray-200 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone" className="text-sm font-medium">
                        비상 연락처 전화번호
                      </Label>
                      <Input
                        id="emergencyPhone"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleChange}
                        placeholder="010-1234-5678"
                        className="h-10 sm:h-12 rounded-xl border-gray-200 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-sm font-medium">
                        추가 참고사항
                      </Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="의료진이 알아야 할 추가 정보를 입력해주세요"
                        className="min-h-[80px] sm:min-h-[100px] rounded-xl border-gray-200 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-all duration-200"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-4 pb-6">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={goToPrevTab}
                      className="rounded-xl border-gray-200 hover:bg-gray-50 transition-all duration-200 text-xs sm:text-sm h-9 sm:h-10 korean-text-fix"
                    >
                      이전
                    </Button>
                    <Button
                      type="submit"
                      className="rounded-xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-md hover:shadow-lg transition-all duration-200 text-xs sm:text-sm h-9 sm:h-10 korean-text-fix"
                      disabled={isLoading}
                    >
                      <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      {isLoading ? "저장 중..." : "저장하기"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </form>
          </Tabs>
        </div>
      </div>
    </MobileLayout>
  )
}
