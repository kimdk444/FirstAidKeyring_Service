"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { Settings } from "lucide-react"
import Link from "next/link"

export function AuthButtons() {
  const router = useRouter()
  const { user, logout } = useAuth()

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <Link href="/settings">
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <Settings className="h-5 w-5" />
          <span className="sr-only">설정</span>
        </Button>
      </Link>

      {user ? (
        <Button variant="outline" size="sm" onClick={logout} className="text-sm">
          로그아웃
        </Button>
      ) : (
        <>
          <Button variant="outline" size="sm" onClick={() => router.push("/login")} className="text-sm">
            로그인
          </Button>
          <Button variant="default" size="sm" onClick={() => router.push("/register")} className="text-sm">
            회원가입
          </Button>
        </>
      )}
    </div>
  )
}
