"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Phone, MessageSquare } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { useAuth } from "@/contexts/auth-context"

export default function PatientInfoPage() {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()
  const [mounted, setMounted] = useState(false)

  // 환자 기본 정보 상태
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    birthDate: "",
    gender: "",
    bloodType: "",
    height: "",
    weight: "",
  })

  // 의료 정보 상태
  const [medicalInfo, setMedicalInfo] = useState({
    allergies: [],
    medications: [],
    conditions: [],
    surgeries: [], // 최근 수술 이력
    medicalNotes: "", // 특별 의료 지시사항
    bloodDonor: "", // 헌혈/장기기증 여부
    newAllergy: "",
    newMedication: "",
    newCondition: "",
    newSurgery: "", // 새 수술 이력 입력용
  })

  // 응급 연락처 상태
  const [emergencyContacts, setEmergencyContacts] = useState([])

  const [newContact, setNewContact] = useState({
    name: "",
    relationship: "",
    phone: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // 인증 체크
  useEffect(() => {
    if (mounted && !loading && !isAuthenticated()) {
      router.push("/login?redirect=/patient-info")
    }
  }, [mounted, loading, isAuthenticated, router])

  // 로딩 중이거나 인증되지 않은 경우
  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated()) {
    return null // 리다이렉트 중
  }

  // 기본 정보 입력 핸들러
  const handleBasicInfoChange = (field, value) => {
    setBasicInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // 알레르기 추가
  const addAllergy = () => {
    if (medicalInfo.newAllergy.trim()) {
      setMedicalInfo((prev) => ({
        ...prev,
        allergies: [...prev.allergies, prev.newAllergy.trim()],
        newAllergy: "",
      }))
    }
  }

  // 알레르기 제거
  const removeAllergy = (index) => {
    setMedicalInfo((prev) => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index),
    }))
  }

  // 복용 약물 추가
  const addMedication = () => {
    if (medicalInfo.newMedication.trim()) {
      setMedicalInfo((prev) => ({
        ...prev,
        medications: [...prev.medications, prev.newMedication.trim()],
        newMedication: "",
      }))
    }
  }

  // 복용 약물 제거
  const removeMedication = (index) => {
    setMedicalInfo((prev) => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index),
    }))
  }

  // 기존 질환 추가
  const addCondition = () => {
    if (medicalInfo.newCondition.trim()) {
      setMedicalInfo((prev) => ({
        ...prev,
        conditions: [...prev.conditions, prev.newCondition.trim()],
        newCondition: "",
      }))
    }
  }

  // 기존 질환 제거
  const removeCondition = (index) => {
    setMedicalInfo((prev) => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index),
    }))
  }

  // 수술 이력 추가
  const addSurgery = () => {
    if (medicalInfo.newSurgery.trim()) {
      setMedicalInfo((prev) => ({
        ...prev,
        surgeries: [...prev.surgeries, prev.newSurgery.trim()],
        newSurgery: "",
      }))
    }
  }

  // 수술 이력 제거
  const removeSurgery = (index) => {
    setMedicalInfo((prev) => ({
      ...prev,
      surgeries: prev.surgeries.filter((_, i) => i !== index),
    }))
  }

  // 응급 연락처 추가
  const addEmergencyContact = () => {
    if (newContact.name && newContact.relationship && newContact.phone) {
      const newId = emergencyContacts.length > 0 ? Math.max(...emergencyContacts.map((c) => c.id), 0) + 1 : 1
      setEmergencyContacts((prev) => [...prev, { ...newContact, id: newId }])
      setNewContact({ name: "", relationship: "", phone: "" })
    }
  }

  // 응급 연락처 제거
  const removeEmergencyContact = (id) => {
    setEmergencyContacts((prev) => prev.filter((contact) => contact.id !== id))
  }

  // SMS 전송
  const sendSMS = (phone) => {
    // 실제 구현에서는 SMS API를 사용
    alert(`${phone}로 응급 상황 SMS를 전송했습니다.`)
  }

  // 전화 걸기
  const makeCall = (phone) => {
    window.location.href = `tel:${phone}`
  }

  // 정보 저장
  const savePatientInfo = () => {
    const patientData = {
      basicInfo,
      medicalInfo: {
        allergies: medicalInfo.allergies,
        medications: medicalInfo.medications,
        conditions: medicalInfo.conditions,
        surgeries: medicalInfo.surgeries,
        medicalNotes: medicalInfo.medicalNotes,
        bloodDonor: medicalInfo.bloodDonor,
      },
      emergencyContacts,
    }

    // 로컬 스토리지에 저장 (실제로는 서버에 저장)
    localStorage.setItem("patientInfo", JSON.stringify(patientData))
    alert("환자 정보가 저장되었습니다.")
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">환자 정보 관리</h1>
          <p className="text-gray-600">응급 상황에 필요한 의료 정보를 관리하세요.</p>
        </div>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">기본 정보</TabsTrigger>
            <TabsTrigger value="medical">의료 정보</TabsTrigger>
            <TabsTrigger value="emergency">응급 연락처</TabsTrigger>
          </TabsList>

          {/* 기본 정보 탭 */}
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>기본 정보</CardTitle>
              </CardHeader>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="name">이름</Label>
                    <Input
                      id="name"
                      value={basicInfo.name}
                      onChange={(e) => handleBasicInfoChange("name", e.target.value)}
                      placeholder="이름을 입력하세요"
                    />
                  </div>

                  <div>
                    <Label htmlFor="birthDate">생년월일</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={basicInfo.birthDate}
                      onChange={(e) => handleBasicInfoChange("birthDate", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="gender">성별</Label>
                    <Select value={basicInfo.gender} onValueChange={(value) => handleBasicInfoChange("gender", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="성별을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">남성</SelectItem>
                        <SelectItem value="female">여성</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="bloodType">혈액형</Label>
                    <p className="text-xs text-gray-500 mb-2">+ : Rh양성 (일반적), - : Rh음성 (희귀)</p>
                    <Select
                      value={basicInfo.bloodType}
                      onValueChange={(value) => handleBasicInfoChange("bloodType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="혈액형을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="height">신장 (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        value={basicInfo.height}
                        onChange={(e) => handleBasicInfoChange("height", e.target.value)}
                        placeholder="신장 입력"
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">체중 (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        value={basicInfo.weight}
                        onChange={(e) => handleBasicInfoChange("weight", e.target.value)}
                        placeholder="체중 입력"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* 의료 정보 탭 */}
          <TabsContent value="medical">
            <div className="space-y-6">
              {/* 알레르기 */}
              <Card>
                <CardHeader>
                  <CardTitle>알레르기</CardTitle>
                </CardHeader>
                <div className="p-6">
                  <div className="flex gap-2 mb-4">
                    <Input
                      value={medicalInfo.newAllergy}
                      onChange={(e) => setMedicalInfo((prev) => ({ ...prev, newAllergy: e.target.value }))}
                      placeholder="알레르기를 입력하세요"
                      onKeyPress={(e) => e.key === "Enter" && addAllergy()}
                    />
                    <Button onClick={addAllergy} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {medicalInfo.allergies.map((allergy, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {allergy}
                        <button onClick={() => removeAllergy(index)} className="ml-1">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>

              {/* 복용 약물 */}
              <Card>
                <CardHeader>
                  <CardTitle>복용 약물</CardTitle>
                </CardHeader>
                <div className="p-6">
                  <div className="flex gap-2 mb-4">
                    <Input
                      value={medicalInfo.newMedication}
                      onChange={(e) => setMedicalInfo((prev) => ({ ...prev, newMedication: e.target.value }))}
                      placeholder="복용 중인 약물을 입력하세요"
                      onKeyPress={(e) => e.key === "Enter" && addMedication()}
                    />
                    <Button onClick={addMedication} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {medicalInfo.medications.map((medication, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {medication}
                        <button onClick={() => removeMedication(index)} className="ml-1">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>

              {/* 기존 질환 */}
              <Card>
                <CardHeader>
                  <CardTitle>기존 질환</CardTitle>
                </CardHeader>
                <div className="p-6">
                  <div className="flex gap-2 mb-4">
                    <Input
                      value={medicalInfo.newCondition}
                      onChange={(e) => setMedicalInfo((prev) => ({ ...prev, newCondition: e.target.value }))}
                      placeholder="기존 질환을 입력하세요"
                      onKeyPress={(e) => e.key === "Enter" && addCondition()}
                    />
                    <Button onClick={addCondition} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {medicalInfo.conditions.map((condition, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {condition}
                        <button onClick={() => removeCondition(index)} className="ml-1">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>

              {/* 최근 수술 이력 */}
              <Card>
                <CardHeader>
                  <CardTitle>최근 수술 이력</CardTitle>
                </CardHeader>
                <div className="p-6">
                  <div className="flex gap-2 mb-4">
                    <Input
                      value={medicalInfo.newSurgery}
                      onChange={(e) => setMedicalInfo((prev) => ({ ...prev, newSurgery: e.target.value }))}
                      placeholder="수술명과 날짜를 입력하세요 (예: 맹장수술 2023-01-15)"
                      onKeyPress={(e) => e.key === "Enter" && addSurgery()}
                    />
                    <Button onClick={addSurgery} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {medicalInfo.surgeries.map((surgery, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {surgery}
                        <button onClick={() => removeSurgery(index)} className="ml-1">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>

              {/* 특별 의료 지시사항 */}
              <Card>
                <CardHeader>
                  <CardTitle>특별 의료 지시사항</CardTitle>
                </CardHeader>
                <div className="p-6">
                  <Label htmlFor="medicalNotes">응급 상황 시 참고할 특별 지시사항</Label>
                  <textarea
                    id="medicalNotes"
                    value={medicalInfo.medicalNotes}
                    onChange={(e) => setMedicalInfo((prev) => ({ ...prev, medicalNotes: e.target.value }))}
                    placeholder="예: 심장 질환으로 인한 특별 처치 필요, 특정 약물에 심한 반응 등"
                    className="w-full p-2 border rounded-md h-24 mt-1"
                  />
                </div>
              </Card>

              {/* 헌혈/장기기증 여부 */}
              <Card>
                <CardHeader>
                  <CardTitle>헌혈/장기기증 여부</CardTitle>
                </CardHeader>
                <div className="p-6">
                  <Label htmlFor="bloodDonor">헌혈/장기기증 의사</Label>
                  <Select
                    value={medicalInfo.bloodDonor}
                    onValueChange={(value) => setMedicalInfo((prev) => ({ ...prev, bloodDonor: value }))}
                  >
                    <SelectTrigger id="bloodDonor">
                      <SelectValue placeholder="선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">미지정</SelectItem>
                      <SelectItem value="blood">헌혈 희망</SelectItem>
                      <SelectItem value="organ">장기기증 희망</SelectItem>
                      <SelectItem value="both">헌혈 및 장기기증 희망</SelectItem>
                      <SelectItem value="no">헌혈/장기기증 거부</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* 응급 연락처 탭 */}
          <TabsContent value="emergency">
            <div className="space-y-6">
              {/* 새 연락처 추가 */}
              <Card>
                <CardHeader>
                  <CardTitle>새 응급 연락처 추가</CardTitle>
                </CardHeader>
                <div className="p-6 space-y-4">
                  <div>
                    <Label htmlFor="contactName">이름</Label>
                    <Input
                      id="contactName"
                      value={newContact.name}
                      onChange={(e) => setNewContact((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="이름 입력"
                    />
                  </div>
                  <div>
                    <Label htmlFor="relationship">관계</Label>
                    <Input
                      id="relationship"
                      value={newContact.relationship}
                      onChange={(e) => setNewContact((prev) => ({ ...prev, relationship: e.target.value }))}
                      placeholder="관계 입력"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">전화번호</Label>
                    <Input
                      id="contactPhone"
                      value={newContact.phone}
                      onChange={(e) => setNewContact((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="전화번호 입력"
                    />
                  </div>
                  <Button onClick={addEmergencyContact} className="w-full">
                    연락처 추가
                  </Button>
                </div>
              </Card>

              {/* 등록된 응급 연락처 목록 */}
              <Card>
                <CardHeader>
                  <CardTitle>등록된 응급 연락처</CardTitle>
                </CardHeader>
                <div className="p-6">
                  {emergencyContacts.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">등록된 응급 연락처가 없습니다.</div>
                  ) : (
                    <div className="space-y-3">
                      {emergencyContacts.map((contact) => (
                        <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{contact.name}</div>
                            <div className="text-sm text-gray-500">{contact.relationship}</div>
                            <div className="text-sm text-gray-700">{contact.phone}</div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => sendSMS(contact.phone)}>
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => makeCall(contact.phone)}>
                              <Phone className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => removeEmergencyContact(contact.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* 저장 버튼 */}
        <div className="mt-6">
          <Button onClick={savePatientInfo} className="w-full" size="lg">
            환자 정보 저장
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
