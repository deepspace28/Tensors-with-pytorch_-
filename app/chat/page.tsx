import { UserProvider } from "@/contexts/user-context"
import { ChatProvider } from "@/contexts/chat-context"
import SynaptiqChat from "@/components/chat/synaptiq-chat"

export default function ChatPage() {
  return (
    <div className="h-screen w-full overflow-hidden fixed inset-0">
      <UserProvider>
        <ChatProvider>
          <SynaptiqChat />
        </ChatProvider>
      </UserProvider>
    </div>
  )
}
