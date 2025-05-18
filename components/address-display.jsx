import { MapPin } from "lucide-react"

export function AddressDisplay({ address, type = "current", className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <MapPin className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
      <span className="text-sm text-gray-700 truncate flex-1">{address}</span>
      {type === "current" && (
        <div className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full ml-2">현재 위치</div>
      )}
    </div>
  )
}
