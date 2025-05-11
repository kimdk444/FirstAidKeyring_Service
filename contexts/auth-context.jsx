"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// 인증 컨텍스트 생성
const AuthContext = createContext(undefined)

// 인증 컨텍스트 프로바이더 컴포넌트
export function AuthProvider({ children }) {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // 컴포넌트 마운트 시 로컬 스토리지에서 사용자 정보 불러오기
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse user data:", error)
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  // 로그인 함수
  const login = (userData) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  // 로그아웃 함수
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  // 인증 상태 확인 함수
  const isAuthenticated = () => {
    return !!user
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// 인증 컨텍스트 사용을 위한 훅
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
