import { ChatInterface } from "@/components/chat/chat-interface"
import { ChatProvider } from "@/contexts/chat-context"

export const metadata = {
  title: "Synaptiq Scientific Chat",
  description: "Advanced AI-powered scientific chat for quantum mechanics, physics, and mathematics",
}

export default function ChatPage() {
  return (
    <ChatProvider>
      <ChatInterface />
    </ChatProvider>
  )
}
