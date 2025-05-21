import { ChatProvider } from "@/contexts/chat-context"
import SynaptiqChat from "@/components/chat/synaptiq-chat"

export default function ChatPage() {
  return (
    <ChatProvider>
      <SynaptiqChat />
    </ChatProvider>
  )
}
