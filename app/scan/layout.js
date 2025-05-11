export const metadata = {
  title: "NFC 스캔 - FirstAidKeyring",
  description: "NFC 키링을 스캔하여 환자 정보를 확인하세요.",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
}

export default function ScanLayout({ children }) {
  return <>{children}</>
}
