import type React from "react"
import type { Metadata } from "next"
import { ChatProvider } from "@/contexts/chat-context"

export const metadata: Metadata = {
  title: "Synaptiq Chat",
  description: "Chat with Synaptiq's scientific AI assistant",
}

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return <ChatProvider>{children}</ChatProvider>
}
