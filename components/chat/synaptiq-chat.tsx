"use client"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import type { Conversation, Message } from "@/lib/conversation-storage"
import { v4 as uuidv4 } from "uuid"
import { BetaSignupModal } from "./beta-signup-modal"
import { ChatMessages } from "./chat-messages"
import { ChatInput } from "./chat-input"
import { ChatHeader } from "./chat-header"
import { ConversationSidebar } from "./conversation-sidebar"

// Mock implementation of ConversationStorage for development
// In a real app, this would be imported from "@/lib/conversation-storage"
export const ConversationStorage = {
  getAll: () => {
    if (typeof window === "undefined") return []

    try {
      const conversations = localStorage.getItem("conversations")
      if (!conversations) return []

      return JSON.parse(conversations).map((conv: any) => ({
        ...conv,
        lastUpdated: new Date(conv.lastUpdated),
      }))
    } catch (error) {
      console.error("Error getting conversations:", error)
      return []
    }
  },

  get: (id: string) => {
    const conversations = ConversationStorage.getAll()
    const conversation = conversations.find((c: Conversation) => c.id === id)
    return conversation || null
  },

  create: () => {
    const id = uuidv4()
    const newConversation: Conversation = {
      id,
      title: "New Conversation",
      messages: [],
      lastUpdated: new Date(),
    }

    const conversations = ConversationStorage.getAll()
    localStorage.setItem("conversations", JSON.stringify([newConversation, ...conversations]))

    return newConversation
  },

  addMessage: (conversationId: string, message: Message) => {
    const conversations = ConversationStorage.getAll()
    const conversationIndex = conversations.findIndex((c: Conversation) => c.id === conversationId)

    if (conversationIndex === -1) return

    const conversation = conversations[conversationIndex]
    const updatedConversation = {
      ...conversation,
      messages: [...conversation.messages, message],
      lastUpdated: new Date(),
      // Update title based on first user message if it's the default title
      title:
        conversation.title === "New Conversation" && message.role === "user"
          ? message.content.slice(0, 30) + (message.content.length > 30 ? "..." : "")
          : conversation.title,
    }

    conversations[conversationIndex] = updatedConversation
    localStorage.setItem("conversations", JSON.stringify(conversations))
  },

  updateMessage: (conversationId: string, messageId: string, updates: Partial<Message>) => {
    const conversations = ConversationStorage.getAll()
    const conversationIndex = conversations.findIndex((c: Conversation) => c.id === conversationId)

    if (conversationIndex === -1) return

    const conversation = conversations[conversationIndex]
    const messageIndex = conversation.messages.findIndex((m) => m.id === messageId)

    if (messageIndex === -1) return

    const updatedMessages = [...conversation.messages]
    updatedMessages[messageIndex] = {
      ...updatedMessages[messageIndex],
      ...updates,
    }

    const updatedConversation = {
      ...conversation,
      messages: updatedMessages,
      lastUpdated: new Date(),
    }

    conversations[conversationIndex] = updatedConversation
    localStorage.setItem("conversations", JSON.stringify(conversations))
  },

  updateTitle: (conversationId: string, title: string) => {
    const conversations = ConversationStorage.getAll()
    const conversationIndex = conversations.findIndex((c: Conversation) => c.id === conversationId)

    if (conversationIndex === -1) return

    const updatedConversation = {
      ...conversations[conversationIndex],
      title,
      lastUpdated: new Date(),
    }

    conversations[conversationIndex] = updatedConversation
    localStorage.setItem("conversations", JSON.stringify(conversations))
  },

  delete: (conversationId: string) => {
    const conversations = ConversationStorage.getAll()
    const updatedConversations = conversations.filter((c: Conversation) => c.id !== conversationId)
    localStorage.setItem("conversations", JSON.stringify(updatedConversations))
  },
}

type ChatMode = "normal" | "search" | "reason"

export function SynaptiqChat() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showBetaModal, setShowBetaModal] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Initialize with a default conversation
  useEffect(() => {
    if (!isClient) return

    const initialConversation: Conversation = {
      id: uuidv4(),
      title: "New Conversation",
      messages: [],
      lastUpdated: new Date(),
    }
    setConversations([initialConversation])
    setCurrentConversationId(initialConversation.id)
  }, [isClient])

  // Handle new chat creation
  const handleNewChat = () => {
    const newConversation: Conversation = {
      id: uuidv4(),
      title: "New Conversation",
      messages: [],
      lastUpdated: new Date(),
    }
    setConversations((prev) => [newConversation, ...prev])
    setCurrentConversationId(newConversation.id)
    setMessages([])
    setSidebarOpen(false)
  }

  // Handle conversation switching
  const handleConversationSwitch = (conversationId: string) => {
    setCurrentConversationId(conversationId)
    const conversation = conversations.find((c) => c.id === conversationId)
    setMessages(conversation?.messages || [])
    setSidebarOpen(false)
  }

  // Handle conversation deletion
  const deleteConversation = (conversationId: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== conversationId))
    if (currentConversationId === conversationId) {
      const remainingConversations = conversations.filter((c) => c.id !== conversationId)
      if (remainingConversations.length > 0) {
        setCurrentConversationId(remainingConversations[0].id)
        setMessages(remainingConversations[0].messages)
      } else {
        handleNewChat()
      }
    }
  }

  // Handle sending a message
  const sendMessage = async (content: string) => {
    if (!currentConversationId) return

    setIsLoading(true)

    // Create a new user message
    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content,
      timestamp: new Date(),
    }

    // Update messages state
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)

    // Update the current conversation
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === currentConversationId) {
          return {
            ...conv,
            messages: updatedMessages,
            lastUpdated: new Date(),
            // Update title for new conversations
            title: conv.messages.length === 0 ? content.slice(0, 30) + (content.length > 30 ? "..." : "") : conv.title,
          }
        }
        return conv
      }),
    )

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Create a new assistant message
      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: `I've processed your query about "${content}". Here's what I found...`,
        timestamp: new Date(),
      }

      // Update messages with the assistant response
      const finalMessages = [...updatedMessages, assistantMessage]
      setMessages(finalMessages)

      // Update the conversation with the assistant message
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === currentConversationId) {
            return {
              ...conv,
              messages: finalMessages,
              lastUpdated: new Date(),
            }
          }
          return conv
        }),
      )
    } catch (error) {
      console.error("Error sending message:", error)

      // Create an error message
      const errorMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: "I'm sorry, but I encountered an error processing your request. Please try again later.",
        timestamp: new Date(),
      }

      // Update messages with the error
      setMessages([...updatedMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-hide sidebar on mobile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarOpen && chatContainerRef.current && !chatContainerRef.current.contains(event.target as Node)) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [sidebarOpen])

  // Show loading state until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
          <p className="text-lg font-medium text-gray-700">Loading chat interface...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-950">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <ConversationSidebar
          conversations={conversations}
          currentConversationId={currentConversationId}
          onConversationSelect={handleConversationSwitch}
          onConversationDelete={deleteConversation}
          onNewChat={handleNewChat}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main chat area */}
      <div className="flex flex-1 flex-col min-w-0" ref={chatContainerRef}>
        <ChatHeader onNewChat={handleNewChat} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex flex-1 flex-col min-h-0">
          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center max-w-md">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">S</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Welcome to Synaptiq</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your AI-powered scientific research assistant. Ask me anything about quantum mechanics, physics,
                    mathematics, or any scientific topic.
                  </p>
                </div>

                <div className="grid gap-3 text-sm">
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 text-left">
                    <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">🔬 Scientific Analysis</div>
                    <div className="text-gray-600 dark:text-gray-400">
                      "Explain quantum entanglement with mathematical formulation"
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 text-left">
                    <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">⚛️ Quantum Simulations</div>
                    <div className="text-gray-600 dark:text-gray-400">"Simulate a quantum circuit with 3 qubits"</div>
                  </div>

                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 text-left">
                    <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">📊 Data Analysis</div>
                    <div className="text-gray-600 dark:text-gray-400">
                      "Analyze this experimental data and find patterns"
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <ChatMessages messages={messages} isLoading={isLoading} />
          )}

          <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
            <div className="max-w-4xl mx-auto">
              <ChatInput
                onSendMessage={sendMessage}
                isLoading={isLoading}
                onOpenBetaModal={() => setShowBetaModal(true)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Beta signup modal */}
      <BetaSignupModal open={showBetaModal} onOpenChange={setShowBetaModal} />
    </div>
  )
}

// Make sure to export the component as default as well
export default SynaptiqChat
