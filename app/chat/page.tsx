import { UserProvider } from "@/contexts/user-context"

export default function ChatPage() {
  return (
    <UserProvider>
      <SynaptiqChat />
    </UserProvider>
  )
}
