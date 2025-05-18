"use client"

import { useEffect, useState } from "react"
import { ChatHeader } from "./chat-header"
import { ChatInput } from "./chat-input"
import { ChatMessages } from "./chat-messages"
import { ConversationSidebar } from "./conversation-sidebar"
import { ModeSelector } from "./mode-selector"
import { BetaSignupModal } from "./beta-signup-modal"
import { LoginModal } from "./login-modal"
import { LimitReachedModal } from "./limit-reached-modal"
import { UpgradeModal } from "./upgrade-modal"
import { useChat } from "@/contexts/chat-context"

export function ChatInterface() {
  const {
    chatState,
    sendMessage,
    clearMessages,
    setInteractionMode,
    showBetaModal,
    setShowBetaModal,
    showLoginModal,
    setShowLoginModal,
    showLimitModal,
    setShowLimitModal,
    showUpgradeModal,
    setShowUpgradeModal,
  } = useChat()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Check if we should show the beta access modal after 3 messages
  useEffect(() => {
    const userMessageCount = chatState.messages.filter((m) => m.role === "user").length
    if (chatState.isGuest && userMessageCount === 3 && !showBetaModal && !showLoginModal && !showLimitModal) {
      setShowLimitModal(true)
    }
  }, [chatState.messages, chatState.isGuest, showBetaModal, showLoginModal, showLimitModal, setShowLimitModal])

  const updatedSendMessage = async (message: string) => {
    const mode = chatState.interactionMode
    const messages = [...chatState.messages, { role: "user", content: message }]

    try {
      console.log("Sending chat request to API")
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages, mode }),
      })

      console.log("API response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("API error:", response.status, errorText)
        throw new Error(`API error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      console.log("API response received successfully")

      // Process data...
    } catch (error) {
      console.error("Chat request failed:", error)
      // Handle error in UI...
    }
  }

  const testApiConnection = async () => {
    try {
      console.log("Testing API connection...")

      // Test the simple API endpoint
      const testResponse = await fetch("/api/test")
      console.log("Test API status:", testResponse.status)
      const testData = await testResponse.json()
      console.log("Test API response:", testData)

      // Test the health check endpoint
      const healthResponse = await fetch("/api/health-check")
      console.log("Health check status:", healthResponse.status)
      const healthData = await healthResponse.json()
      console.log("Health check response:", healthData)

      // Test the environment debug endpoint
      const envResponse = await fetch("/api/env-debug")
      console.log("Env debug status:", envResponse.status)
      const envData = await envResponse.json()
      console.log("Env debug response:", envData)

      // Add a button or trigger this function for testing
    } catch (error) {
      console.error("API test failed:", error)
    }
  }

  // You can call this function on component mount for testing:
  useEffect(() => {
    testApiConnection()
  }, [])

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <ConversationSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main chat area */}
      <div className="flex flex-col flex-1">
        <ChatHeader
          onMenuClick={() => setIsSidebarOpen(true)}
          onClearChat={clearMessages}
          queriesRemaining={chatState.queriesRemaining}
          isGuest={chatState.isGuest}
          onLoginClick={() => setShowLoginModal(true)}
          onUpgradeClick={() => setShowUpgradeModal(true)}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <ChatMessages messages={chatState.messages} isLoading={chatState.isLoading} />
          </div>

          <div className="border-t border-gray-800 bg-[#0a0a0a] p-4">
            <div className="mx-auto max-w-4xl">
              <ModeSelector
                selectedMode={chatState.interactionMode}
                onModeChange={setInteractionMode}
                disabled={chatState.isLoading}
              />
            </div>
          </div>

          <ChatInput
            onSendMessage={updatedSendMessage}
            disabled={chatState.isLoading || (chatState.isGuest && chatState.queriesRemaining <= 0)}
          />
        </div>
      </div>

      {/* Modals */}
      {showBetaModal && <BetaSignupModal onClose={() => setShowBetaModal(false)} />}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
      {showLimitModal && <LimitReachedModal onClose={() => setShowLimitModal(false)} />}
      {showUpgradeModal && <UpgradeModal onClose={() => setShowUpgradeModal(false)} />}
    </div>
  )
}
