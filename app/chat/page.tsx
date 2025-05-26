"use client"

import { UserProvider } from "@/contexts/user-context"
import { SynaptiqChat } from "@/components/chat/synaptiq-chat"

export default function ChatPage() {
  return (
    <UserProvider>
      <SynaptiqChat />
    </UserProvider>
  )
}
