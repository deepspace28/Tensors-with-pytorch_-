import { UserProvider } from "@/contexts/user-context"
import { SynaptiqChat } from "@/components/chat/synaptiq-chat"

export default function ChatPage() {
  return (
    <div className="h-screen overflow-hidden">
      <UserProvider>
        <SynaptiqChat />
      </UserProvider>
    </div>
  )
}
