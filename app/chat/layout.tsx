import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Synaptiq Chat",
  description: "Chat with Synaptiq's scientific AI assistant",
}

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
