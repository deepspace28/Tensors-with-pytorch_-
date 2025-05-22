"use client"

import type React from "react"

import { UserProvider } from "@/contexts/user-context"

export default function BetaLayout({ children }: { children: React.ReactNode }) {
  return <UserProvider>{children}</UserProvider>
}
