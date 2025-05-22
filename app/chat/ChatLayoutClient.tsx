"use client"

import type React from "react"

export default function ChatLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <div className="chat-layout h-[100dvh] flex flex-col overflow-hidden">
      <style jsx global>{`
        body {
          overflow: hidden;
          position: fixed;
          width: 100%;
          height: 100%;
          overscroll-behavior-y: none;
        }
      `}</style>
      {children}
    </div>
  )
}
