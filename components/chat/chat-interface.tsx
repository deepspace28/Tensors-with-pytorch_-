"use client"

import { useChat } from "@/contexts/chat-context"
import { ChatHeader } from "./chat-header"
import { ChatMessages } from "./chat-messages"
import { ChatInput } from "./chat-input"
import { ModeSelector } from "./mode-selector"
import { LimitReachedModal } from "./limit-reached-modal"
import { ConversationSidebar } from "./conversation-sidebar"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export function ChatInterface() {
  const { messages, isLoading, sendMessage, queriesRemaining, isGuest, showLimitModal, closeLimitModal } = useChat()
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a]">
      <ChatHeader onToggleSidebar={() => setShowSidebar(!showSidebar)} />

      <div className="flex-1 overflow-hidden flex">
        {/* Mobile sidebar toggle */}
        <div className="md:hidden absolute top-16 left-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-gray-400 hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Sidebar */}
        <div className={`${showSidebar ? "block" : "hidden"} md:block h-full`}>
          <ConversationSidebar />
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          <ModeSelector />

          <div className="flex-1 overflow-hidden">
            <ChatMessages messages={messages} isLoading={isLoading} />
          </div>

          <ChatInput onSendMessage={sendMessage} disabled={isLoading || queriesRemaining <= 0} />
        </div>
      </div>

      {showLimitModal && <LimitReachedModal isGuest={isGuest} onClose={closeLimitModal} />}
    </div>
  )
}
