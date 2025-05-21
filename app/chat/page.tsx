import { ChatProvider } from "@/contexts/chat-context"
import { UserProvider } from "@/contexts/user-context"
import SynaptiqChat from "@/components/chat/synaptiq-chat"

export default function ChatPage() {
  return (
    <UserProvider>
      <ChatProvider>
        <SynaptiqChat />
      </ChatProvider>
    </UserProvider>
  )
}
