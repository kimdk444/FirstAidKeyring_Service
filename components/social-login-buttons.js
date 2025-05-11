"use client"

import { Button } from "@/components/ui/button"

export function SocialLoginButtons({ isRegister = false }) {
  const actionText = isRegister ? "회원가입" : "로그인"

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">또는 소셜 계정으로 {actionText}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="h-10 sm:h-12 rounded-xl border-gray-300 bg-white hover:bg-gray-50 text-black"
          onClick={() => console.log("Google login")}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </Button>

        <Button
          variant="outline"
          className="h-10 sm:h-12 rounded-xl border-gray-300 bg-[#FEE500] hover:bg-[#FDD800] text-black"
          onClick={() => console.log("Kakao login")}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2.188C6.477 2.188 2 5.65 2 9.937c0 2.695 1.786 5.066 4.472 6.404-.195.667-.707 2.41-.814 2.785-.128.469.172.463.361.337.148-.1 2.38-1.61 3.357-2.265.87.128 1.764.195 2.677.195 5.523 0 10-3.462 10-7.75s-4.477-7.75-10-7.75z"
              fill="#371d1e"
            />
          </svg>
          Kakao
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="h-10 sm:h-12 rounded-xl border-gray-300 bg-[#1877F2] hover:bg-[#0b5fcc] text-white"
          onClick={() => console.log("Facebook login")}
        >
          <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
          </svg>
          Facebook
        </Button>

        <Button
          variant="outline"
          className="h-10 sm:h-12 rounded-xl border-gray-300 bg-[#03C75A] hover:bg-[#02b350] text-white"
          onClick={() => console.log("Naver login")}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.6668 2.66675H6.3335C4.3335 2.66675 2.3335 4.66675 2.3335 6.66675V13.3334C2.3335 15.3334 4.3335 17.3334 6.3335 17.3334H13.6668C15.6668 17.3334 17.6668 15.3334 17.6668 13.3334V6.66675C17.6668 4.66675 15.6668 2.66675 13.6668 2.66675Z" />
            <path d="M11.5 10.5L8.5 6H6V14H8.5V9.5L11.5 14H14V6H11.5V10.5Z" fill="white" />
          </svg>
          Naver
        </Button>
      </div>
    </div>
  )
}
