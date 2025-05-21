import { ChatProvider } from "@/contexts/chat-context"
import { ApiStatusChecker } from "@/components/api-status-checker"
import dynamic from "next/dynamic"

// Use dynamic import with no SSR for components that might use browser APIs
const DynamicSynaptiqChat = dynamic(() => import("@/components/chat/synaptiq-chat"), { ssr: false })

export default function DemoPage() {
  return (
    <ChatProvider>
      <DynamicSynaptiqChat />
      <ApiStatusChecker />
    </ChatProvider>
  )
}
