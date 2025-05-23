import dynamic from "next/dynamic"
import { Suspense } from "react"

// Import the chat component with SSR disabled
const SynaptiqChatNoSSR = dynamic(() => import("@/components/chat/synaptiq-chat"), { ssr: false })

// Simple loading component
function ChatLoading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
        <p className="text-lg font-medium text-gray-700">Loading chat interface...</p>
      </div>
    </div>
  )
}

export default function ChatPage() {
  return (
    <Suspense fallback={<ChatLoading />}>
      <SynaptiqChatNoSSR />
    </Suspense>
  )
}
