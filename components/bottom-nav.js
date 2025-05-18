"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, MapPin, Scan, Heart } from "lucide-react"
import { useScreenSize } from "@/utils/responsive-utils"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export function BottomNav() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const { isMobile } = useScreenSize()
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  // 하이드레이션 이슈 방지
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // 로그인 페이지, 회원가입 페이지에서는 하단 네비게이션 숨기기
  if (pathname === "/login" || pathname === "/register" || pathname === "/forgot-password") {
    return null
  }

  // 로그인 필요한 페이지 처리
  const handleNavClick = (e, path, requiresAuth) => {
    if (requiresAuth && !isAuthenticated()) {
      e.preventDefault()
      router.push(`/login?redirect=${path}`)
    }
  }

  const navItems = [
    {
      href: "/patient-info",
      icon: <User className="w-5 h-5" />,
      label: "환자 정보",
      active: pathname === "/patient-info",
      requiresAuth: true,
    },
    {
      href: "/scan",
      icon: <Scan className="w-5 h-5" />,
      label: "NFC 스캔",
      active: pathname === "/scan",
      requiresAuth: true,
    },
    {
      href: "/",
      icon: <Home className="w-6 h-6" />,
      label: "홈",
      active: pathname === "/",
      isHome: true,
      requiresAuth: false,
    },
    {
      href: "/aed-map",
      icon: <MapPin className="w-5 h-5" />,
      label: "AED 찾기",
      active: pathname === "/aed-map",
      requiresAuth: false,
    },
    {
      href: "/medical-guide",
      icon: <Heart className="w-5 h-5" />,
      label: "응급 가이드",
      active: pathname === "/medical-guide",
      requiresAuth: false,
    },
  ]

  return (
    <nav className="mobile-nav-fixed h-[var(--app-bottom-nav-height)] border-t border-gray-200 relative">
      <div className="grid grid-cols-5 h-full">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center ${
              item.active ? "text-red-600" : "text-gray-500 hover:text-gray-700"
            } ${item.isHome ? "relative pt-1" : ""} slide-button`}
            onClick={(e) => {
              if (item.isHome && item.active) {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              } else if (item.requiresAuth) {
                handleNavClick(e, item.href, item.requiresAuth)
              }
            }}
          >
            {item.isHome ? (
              <div
                className={`
         absolute -top-5 w-14 h-14 rounded-full bg-red-600 flex items-center justify-center
         border-4 border-white shadow-md
       `}
              >
                <div className="text-white">{item.icon}</div>
              </div>
            ) : (
              <div
                className={`
       ${item.active ? "" : ""}
     `}
              >
                {item.icon}
              </div>
            )}
            <span
              className={`text-xs mt-1 ${item.active ? "font-medium" : "font-normal"} ${isMobile ? "text-[10px]" : ""} ${item.isHome ? "mt-7" : ""}`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
