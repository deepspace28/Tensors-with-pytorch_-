"use client"

import type React from "react"
import { UserProvider } from "@/contexts/user-context"

interface ChatLayoutClientProps {
  children: React.ReactNode
}

export default function ChatLayoutClient({ children }: ChatLayoutClientProps) {
  return (
    <UserProvider>
      <div className="flex h-screen bg-background">{children}</div>
    </UserProvider>
  )
}
