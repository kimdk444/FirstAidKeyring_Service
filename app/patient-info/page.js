"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MobileLayout } from "@/components/mobile-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Plus, Trash2, Phone, MessageSquare } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function PatientInfoPage() {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()
  const [activeTab, setActiveTab] = useState("basic")
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  // 기본 정보 상태
  const [name, setName] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [gender, setGender] = useState("")
  const [bloodType, setBloodType] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")

  // 의료 정보 상태
  const [allergies, setAllergies] = useState("")
  const [medications, setMedications] = useState("")
  const [conditions, setConditions] = useState("")
  const [notes, setNotes] = useState("")

  // 비상 연락처 상태
  const [contacts, setContacts] = useState([
    { name: "홍길동", relationship: "부모", phone: "010-1234-5678" },
    { name: "김철수", relationship: "형제", phone: "010-8765-4321" },
  ])
  const [newContact, setNewContact] = useState({ name: "", relationship: "", phone: "" })

  // 인증 상태 확인 및 리디렉션
  useEffect(() => {
    if (!loading && !isAuthenticated()) {
      router.push("/login?redirect=/patient-info")
    }
  }, [loading, isAuthenticated, router])

  // 저장 메시지 타이머
  useEffect(() => {
    if (saveMessage) {
      const timer = setTimeout(() => {
        setSaveMessage("")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [saveMessage])

  // 정보 저장 함수
  const saveInfo = () => {
    setIsSaving(true)

    // 저장 시뮬레이션
    setTimeout(() => {
      setIsSaving(false)
      setSaveMessage("정보가 저장되었습니다")
      console.log("저장된 정보:", {
        basic: { name, birthdate, gender, bloodType, height, weight },
        medical: { allergies, medications, conditions, notes },
        emergency: { contacts },
      })
    }, 1000)
  }

  // 비상 연락처 추가
  const addContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, { ...newContact }])
      setNewContact({ name: "", relationship: "", phone: "" })
    }
  }

  // 비상 연락처 삭제
  const removeContact = (index) => {
    const updatedContacts = [...contacts]
    updatedContacts.splice(index, 1)
    setContacts(updatedContacts)
  }

  // 로딩 중이거나 인증되지 않은 경우 로딩 표시
  if (loading || !isAuthenticated()) {
    return (
      <MobileLayout>
        <div className="container px-5 py-8 sm:py-12 mx-auto max-w-md flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600">인증 상태 확인 중...</p>
        </div>
      </MobileLayout>
    )
  }

  return (
    <MobileLayout>
      <div className="container px-5 py-8 sm:py-12 mx-auto max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">환자 정보</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-300 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 max-w-sm mx-auto">
            응급 상황에서 의료진이 확인할 수 있는 중요한 정보입니다. 정확하게 입력해주세요.
          </p>
        </div>

        <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="basic" className="rounded-l-lg">
              기본 정보
            </TabsTrigger>
            <TabsTrigger value="medical" className="rounded-none">
              의료 정보
            </TabsTrigger>
            <TabsTrigger value="emergency" className="rounded-r-lg">
              비상 연락처
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="mt-0">
            <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="홍길동"
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthdate">생년월일</Label>
                    <Input
                      id="birthdate"
                      type="date"
                      value={birthdate}
                      onChange={(e) => setBirthdate(e.target.value)}
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">성별</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger id="gender" className="rounded-lg">
                        <SelectValue placeholder="성별 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">남성</SelectItem>
                        <SelectItem value="female">여성</SelectItem>
                        <SelectItem value="other">기타</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bloodType">혈액형</Label>
                    <Select value={bloodType} onValueChange={setBloodType}>
                      <SelectTrigger id="bloodType" className="rounded-lg">
                        <SelectValue placeholder="혈액형 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height">키 (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="170"
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">몸무게 (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="65"
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medical" className="mt-0">
            <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="allergies">알레르기</Label>
                    <Textarea
                      id="allergies"
                      value={allergies}
                      onChange={(e) => setAllergies(e.target.value)}
                      placeholder="페니실린, 견과류, 꽃가루 등"
                      className="rounded-lg min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medications">복용 중인 약물</Label>
                    <Textarea
                      id="medications"
                      value={medications}
                      onChange={(e) => setMedications(e.target.value)}
                      placeholder="약물명, 용량, 복용 빈도"
                      className="rounded-lg min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="conditions">기저 질환</Label>
                    <Textarea
                      id="conditions"
                      value={conditions}
                      onChange={(e) => setConditions(e.target.value)}
                      placeholder="당뇨, 고혈압, 천식 등"
                      className="rounded-lg min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">추가 참고사항</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="의료진이 알아야 할 추가 정보"
                      className="rounded-lg min-h-[80px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emergency" className="mt-0">
            <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">등록된 비상 연락처</h3>
                    {contacts.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">등록된 비상 연락처가 없습니다.</p>
                    ) : (
                      <div className="space-y-3">
                        {contacts.map((contact, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
                          >
                            <div>
                              <p className="font-medium">{contact.name}</p>
                              <p className="text-sm text-gray-600">{contact.relationship}</p>
                              <p className="text-sm text-gray-600">{contact.phone}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full bg-green-50 border-green-200 text-green-600 hover:bg-green-100"
                                onClick={() => window.open(`sms:${contact.phone}`)}
                                aria-label="문자 보내기"
                              >
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100"
                                onClick={() => window.open(`tel:${contact.phone}`)}
                                aria-label="전화 걸기"
                              >
                                <Phone className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                                onClick={() => removeContact(index)}
                                aria-label="연락처 삭제"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">새 연락처 추가</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="contactName">이름</Label>
                        <Input
                          id="contactName"
                          value={newContact.name}
                          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                          placeholder="이름"
                          className="rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactRelationship">관계</Label>
                        <Input
                          id="contactRelationship"
                          value={newContact.relationship}
                          onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                          placeholder="관계"
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">전화번호</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="contactPhone"
                          value={newContact.phone}
                          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                          placeholder="010-0000-0000"
                          className="rounded-lg"
                        />
                        <Button
                          onClick={addContact}
                          className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                          disabled={!newContact.name || !newContact.phone}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          추가
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex flex-col space-y-4">
          <Button
            onClick={saveInfo}
            disabled={isSaving}
            className="w-full py-6 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                저장 중...
              </>
            ) : (
              "정보 저장하기"
            )}
          </Button>

          {saveMessage && (
            <div className="bg-green-50 text-green-700 p-3 rounded-lg text-center border border-green-200">
              {saveMessage}
            </div>
          )}

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() =>
                setActiveTab(activeTab === "basic" ? "emergency" : activeTab === "medical" ? "basic" : "medical")
              }
              className="rounded-lg border-gray-200"
            >
              {activeTab === "basic" ? "비상 연락처로" : activeTab === "medical" ? "기본 정보로" : "의료 정보로"}
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setActiveTab(activeTab === "basic" ? "medical" : activeTab === "medical" ? "emergency" : "basic")
              }
              className="rounded-lg border-gray-200"
            >
              {activeTab === "basic" ? "의료 정보로" : activeTab === "medical" ? "비상 연락처로" : "기본 정보로"}
            </Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
