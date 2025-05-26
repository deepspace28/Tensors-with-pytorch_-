"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Send,
  Plus,
  Search,
  Sparkles,
  Lightbulb,
  Beaker,
  Trash2,
  Edit,
  MoreVertical,
  AlertTriangle,
  Lock,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from "@/components/ui/avatar"
import { ScientificLogo } from "@/components/scientific-logo"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import type { Conversation, Message } from "@/lib/conversation-storage"
import { v4 as uuidv4 } from "uuid"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useUser } from "@/contexts/user-context"
import { DirectGroqClient, type ChatMode as GroqChatMode } from "@/lib/direct-groq-client"
import Link from "next/link"
import { BetaSignupModal } from "./beta-signup-modal"

// Mock implementation of ConversationStorage for development
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
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [editingTitle, setEditingTitle] = useState<string | null>(null)
  const [newTitle, setNewTitle] = useState("")
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [chatMode, setChatMode] = useState<ChatMode>("normal")
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [showOfflineMessage, setShowOfflineMessage] = useState(false)
  const [showBetaModal, setShowBetaModal] = useState(false)
  const [betaFeatureAttempted, setBetaFeatureAttempted] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [useDirectClient, setUseDirectClient] = useState(false)

  const [betaName, setBetaName] = useState("")
  const [betaEmail, setBetaEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { user, joinBeta } = useUser()

  const isBetaMember = user && !user.isGuest

  // Check network status
  useEffect(() => {
    const handleOnline = () => {
      setShowOfflineMessage(false)
    }
    const handleOffline = () => setShowOfflineMessage(true)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    setShowOfflineMessage(!navigator.onLine)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Load conversations on mount
  useEffect(() => {
    const loadedConversations = ConversationStorage.getAll()
    setConversations(loadedConversations)

    if (loadedConversations.length > 0) {
      const mostRecent = [...loadedConversations].sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())[0]
      setCurrentConversation(mostRecent)
    } else {
      const newConv = ConversationStorage.create()
      setConversations([newConv])
      setCurrentConversation(newConv)
    }
  }, [])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current && messagesContainerRef.current) {
      const container = messagesContainerRef.current
      const isScrolledToBottom = container.scrollHeight - container.clientHeight <= container.scrollTop + 100

      if (isScrolledToBottom) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [currentConversation?.messages])

  // Focus input after sending message
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isLoading])

  // Reset chat mode to normal if user is not a beta member
  useEffect(() => {
    if (!isBetaMember && chatMode !== "normal") {
      setChatMode("normal")
    }
  }, [isBetaMember, chatMode])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarOpen && window.innerWidth < 1024) {
        const sidebar = document.getElementById("chat-sidebar")
        if (sidebar && !sidebar.contains(event.target as Node)) {
          setSidebarOpen(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [sidebarOpen])

  const createNewConversation = () => {
    const newConv = ConversationStorage.create()
    setConversations((prev) => [newConv, ...prev])
    setCurrentConversation(newConv)
    setInput("")
    setChatMode("normal")
    setError(null)
    setSidebarOpen(false)
  }

  const switchConversation = (id: string) => {
    const conversation = conversations.find((c) => c.id === id)
    if (conversation) {
      setCurrentConversation(conversation)
      setInput("")
      setChatMode("normal")
      setError(null)
      setSidebarOpen(false)
    }
  }

  const deleteConversation = (id: string) => {
    ConversationStorage.delete(id)
    setConversations((prev) => prev.filter((c) => c.id !== id))

    if (currentConversation?.id === id) {
      const remaining = conversations.filter((c) => c.id !== id)
      if (remaining.length > 0) {
        setCurrentConversation(remaining[0])
      } else {
        const newConv = ConversationStorage.create()
        setConversations([newConv])
        setCurrentConversation(newConv)
      }
      setChatMode("normal")
      setError(null)
    }

    setDeleteConfirmId(null)
  }

  const updateConversationTitle = (id: string, title: string) => {
    if (!title.trim()) return

    ConversationStorage.updateTitle(id, title)
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, title, lastUpdated: new Date() } : c)))

    if (currentConversation?.id === id) {
      setCurrentConversation((prev) => (prev ? { ...prev, title, lastUpdated: new Date() } : prev))
    }

    setEditingTitle(null)
  }

  // Function to call the secure server-side endpoint
  const callSecureGroqEndpoint = async (messages: any[], mode: ChatMode) => {
    try {
      console.log("Calling secure server-side endpoint")
      const response = await fetch("/api/secure-groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages,
          temperature: mode === "reason" ? 0.5 : 0.7,
          max_tokens: 4096,
          mode,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
        const errorMessage = errorData.error || `Server error: ${response.status}`
        console.error("Secure endpoint error:", errorMessage)
        throw new Error(errorMessage)
      }

      const data = await response.json()
      return { text: data.choices[0]?.message?.content || "" }
    } catch (error) {
      console.error("Error calling secure endpoint:", error)
      return { error: error instanceof Error ? error.message : "Unknown error" }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!input.trim() || isLoading || !currentConversation) return

    setError(null)

    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    ConversationStorage.addMessage(currentConversation.id, userMessage)

    if (chatMode !== "search") {
      const placeholderMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: "Thinking...",
        timestamp: new Date(),
        isPlaceholder: true,
      }

      ConversationStorage.addMessage(currentConversation.id, placeholderMessage)
      const placeholderConversation = ConversationStorage.get(currentConversation.id)
      setCurrentConversation(placeholderConversation || null)
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }

    const updatedConversation = ConversationStorage.get(currentConversation.id)
    setCurrentConversation(updatedConversation || null)
    setConversations(ConversationStorage.getAll())
    setInput("")

    try {
      if (!navigator.onLine) {
        throw new Error("You appear to be offline. Please check your internet connection and try again.")
      }

      const apiMessages =
        updatedConversation?.messages
          .filter((msg) => !msg.isPlaceholder)
          .map(({ role, content }) => ({
            role: role as "user" | "assistant",
            content,
          })) || []

      console.log("Sending chat request with mode:", chatMode)

      let response
      if (!useDirectClient) {
        response = await callSecureGroqEndpoint(apiMessages, chatMode)

        if (response.error) {
          console.log("Server-side endpoint failed, trying direct client as fallback")
          response = await DirectGroqClient.chat({
            messages: apiMessages,
            mode: chatMode as GroqChatMode,
          })
        }
      } else {
        response = await DirectGroqClient.chat({
          messages: apiMessages,
          mode: chatMode as GroqChatMode,
        })

        if (response.error) {
          console.log("Direct client failed, trying server-side endpoint as fallback")
          response = await callSecureGroqEndpoint(apiMessages, chatMode)
        }
      }

      console.log("Received response:", response)

      if (response.error) {
        throw new Error(response.error)
      }

      const responseText = response.text || "I received your message, but had trouble processing it. Please try again."

      setRetryCount(0)

      const messages = updatedConversation?.messages || []
      const placeholderIndex = messages.findIndex((m) => m.isPlaceholder)

      if (placeholderIndex >= 0) {
        ConversationStorage.updateMessage(currentConversation.id, messages[placeholderIndex].id, {
          content: responseText,
          isPlaceholder: false,
        })
      } else {
        const assistantMessage: Message = {
          id: uuidv4(),
          role: "assistant",
          content: responseText,
          timestamp: new Date(),
        }
        ConversationStorage.addMessage(currentConversation.id, assistantMessage)
      }

      const finalConversation = ConversationStorage.get(currentConversation.id)
      setCurrentConversation(finalConversation || null)
      setConversations(ConversationStorage.getAll())
    } catch (error) {
      console.error("Chat error:", error)
      setRetryCount((prev) => prev + 1)

      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
      setError(errorMessage)

      let fallbackMessage = ""

      if (retryCount >= 2) {
        fallbackMessage = `I apologize, but I'm still having trouble connecting to the server. This might be due to:

1. Server maintenance
2. High traffic volume
3. Network connectivity issues

You can try:
- Refreshing the page
- Checking your internet connection
- Trying again in a few minutes

In the meantime, I can still try to help with basic questions using my core knowledge.`
      } else {
        fallbackMessage = `I apologize, but I encountered an error: ${errorMessage}. Please try again later.`

        if (chatMode === "search") {
          fallbackMessage +=
            "\n\nI'm unable to search the web at the moment. Would you like me to answer based on my general knowledge instead?"
        } else if (chatMode === "reason") {
          fallbackMessage +=
            "\n\nI'm unable to use reasoning mode at the moment. Would you like me to provide a standard response instead?"
        }
      }

      if (updatedConversation) {
        const messages = updatedConversation.messages || []
        const placeholderIndex = messages.findIndex((m) => m.isPlaceholder)

        if (placeholderIndex >= 0) {
          ConversationStorage.updateMessage(currentConversation.id, messages[placeholderIndex].id, {
            content: fallbackMessage,
            isPlaceholder: false,
          })
        } else {
          const errorResponseMessage: Message = {
            id: uuidv4(),
            role: "assistant",
            content: fallbackMessage,
            timestamp: new Date(),
          }
          ConversationStorage.addMessage(currentConversation.id, errorResponseMessage)
        }
      }

      const errorConversation = ConversationStorage.get(currentConversation.id)
      setCurrentConversation(errorConversation || null)
      setConversations(ConversationStorage.getAll())
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const [showBetaSignupModal, setShowBetaSignupModal] = useState(false)
  const [betaFeatureRequested, setBetaFeatureRequested] = useState<string | undefined>(undefined)

  const handleBetaFeature = (feature: string) => {
    if (!isBetaMember) {
      setBetaFeatureRequested(feature)
      setShowBetaSignupModal(true)
      return false
    }
    return true
  }

  const toggleChatMode = (mode: ChatMode) => {
    if (mode !== "normal" && !handleBetaFeature(mode === "search" ? "Search" : "Reason")) {
      return
    }
    setChatMode((currentMode) => (currentMode === mode ? "normal" : mode))
  }

  const goToSimulations = () => {
    if (!handleBetaFeature("Simulations")) {
      return
    }
    router.push("/simulations")
  }

  // Group conversations by date
  const todayConversations = conversations
    .filter((c) => {
      const today = new Date()
      return c.lastUpdated.toDateString() === today.toDateString()
    })
    .sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())

  const yesterdayConversations = conversations
    .filter((c) => {
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      return c.lastUpdated.toDateString() === yesterday.toDateString()
    })
    .sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())

  const olderConversations = conversations
    .filter((c) => {
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      return (
        c.lastUpdated.toDateString() !== today.toDateString() &&
        c.lastUpdated.toDateString() !== yesterday.toDateString()
      )
    })
    .sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())

  return (
    <div ref={chatContainerRef} className="flex flex-col h-screen overflow-hidden bg-[#0f0f0f] text-white">
      {/* Header - Compact desktop sizing */}
      <header className="border-b border-[#2a2a2a] flex-shrink-0 sticky top-0 z-50 bg-[#0f0f0f]">
        <div className="flex items-center justify-between h-12 sm:h-14 lg:h-12 px-3 sm:px-4 lg:px-4 max-w-none">
          {/* Left section - Logo and branding with proper alignment */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-2 min-w-0 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-400 hover:text-white h-8 w-8 sm:h-9 sm:w-9 p-0 flex-shrink-0"
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity min-w-0 flex-shrink-0"
            >
              <ScientificLogo className="h-5 w-5 sm:h-6 sm:w-6 lg:h-5 lg:w-5 text-white flex-shrink-0" />
              <h1 className="text-sm sm:text-base lg:text-sm font-semibold text-white whitespace-nowrap">Synaptiq</h1>
            </Link>
          </div>

          {/* Right section - Navigation with proper spacing */}
          <nav className="flex items-center gap-2 sm:gap-4 lg:gap-2 flex-shrink-0">
            <Link
              href="/"
              className="text-xs sm:text-sm lg:text-xs text-gray-300 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-gray-800 whitespace-nowrap min-h-[32px] sm:min-h-[36px] lg:min-h-[28px] flex items-center"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Offline warning */}
      {showOfflineMessage && (
        <div className="bg-amber-900/30 border-b border-amber-800 p-2 text-center text-amber-200 text-xs sm:text-sm sticky top-12 sm:top-14 lg:top-12 z-40">
          <AlertTriangle className="inline-block h-3 w-3 sm:h-4 sm:w-4 mr-2" />
          You are currently offline. Some features may be unavailable.
        </div>
      )}

      {/* Main content - Responsive flex container */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar - Compact desktop sizing */}
        <div
          id="chat-sidebar"
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 sm:w-72 lg:w-64 border-r border-[#2a2a2a] bg-[#1a1a1a] transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-auto",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar header with close button for mobile */}
            <div className="p-3 sm:p-4 lg:p-3 flex-shrink-0 border-b border-[#2a2a2a]">
              <div className="flex items-center justify-between mb-3 lg:hidden">
                <div className="flex items-center gap-2">
                  <ScientificLogo className="h-5 w-5 text-white" />
                  <span className="font-semibold text-white">Synaptiq</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-400 hover:text-white h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="outline"
                className="w-full justify-start bg-[#2a2a2a] border-[#3a3a3a] hover:bg-[#3a3a3a] text-sm lg:text-xs h-10 lg:h-9 min-h-[44px] lg:min-h-[36px]"
                onClick={createNewConversation}
              >
                <Plus className="mr-2 h-4 w-4 lg:h-3 lg:w-3" />
                New Chat
              </Button>
            </div>

            {/* Scrollable conversation list */}
            <div className="flex-1 overflow-y-auto">
              {todayConversations.length > 0 && (
                <>
                  <div className="px-3 sm:px-4 lg:px-3 py-2 lg:py-1 text-xs lg:text-xs font-medium text-gray-400 uppercase">
                    Today
                  </div>
                  <div className="space-y-1 px-2 sm:px-3 lg:px-2 mb-4 lg:mb-3">
                    {todayConversations.map((conv) => (
                      <div key={conv.id} className="relative group">
                        <button
                          className={cn(
                            "w-full text-left px-3 py-2.5 lg:py-2 rounded-md hover:bg-[#2a2a2a] text-gray-300 text-sm lg:text-xs truncate pr-8 min-h-[44px] lg:min-h-[32px] flex items-center transition-colors",
                            currentConversation?.id === conv.id && "bg-[#2a2a2a]",
                          )}
                          onClick={() => switchConversation(conv.id)}
                        >
                          {editingTitle === conv.id ? (
                            <input
                              type="text"
                              value={newTitle}
                              onChange={(e) => setNewTitle(e.target.value)}
                              onBlur={() => updateConversationTitle(conv.id, newTitle)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  updateConversationTitle(conv.id, newTitle)
                                }
                              }}
                              className="bg-[#3a3a3a] text-white border-none rounded px-2 py-1 w-full focus:outline-none text-sm lg:text-xs"
                              autoFocus
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            conv.title
                          )}
                        </button>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 flex">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 lg:h-6 lg:w-6 text-gray-400 hover:text-white min-h-[32px] min-w-[32px] lg:min-h-[24px] lg:min-w-[24px]"
                              >
                                <MoreVertical className="h-4 w-4 lg:h-3 lg:w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
                              <DropdownMenuItem
                                className="hover:bg-[#3a3a3a] cursor-pointer min-h-[36px] lg:min-h-[32px] text-sm lg:text-xs"
                                onClick={() => {
                                  setEditingTitle(conv.id)
                                  setNewTitle(conv.title)
                                }}
                              >
                                <Edit className="h-4 w-4 lg:h-3 lg:w-3 mr-2" />
                                Rename
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="hover:bg-[#3a3a3a] text-red-400 hover:text-red-300 cursor-pointer min-h-[36px] lg:min-h-[32px] text-sm lg:text-xs"
                                onClick={() => setDeleteConfirmId(conv.id)}
                              >
                                <Trash2 className="h-4 w-4 lg:h-3 lg:w-3 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {yesterdayConversations.length > 0 && (
                <>
                  <div className="px-3 sm:px-4 lg:px-3 py-2 lg:py-1 text-xs lg:text-xs font-medium text-gray-400 uppercase">
                    Yesterday
                  </div>
                  <div className="space-y-1 px-2 sm:px-3 lg:px-2 mb-4 lg:mb-3">
                    {yesterdayConversations.map((conv) => (
                      <div key={conv.id} className="relative group">
                        <button
                          className={cn(
                            "w-full text-left px-3 py-2.5 lg:py-2 rounded-md hover:bg-[#2a2a2a] text-gray-300 text-sm lg:text-xs truncate pr-8 min-h-[44px] lg:min-h-[32px] flex items-center transition-colors",
                            currentConversation?.id === conv.id && "bg-[#2a2a2a]",
                          )}
                          onClick={() => switchConversation(conv.id)}
                        >
                          {editingTitle === conv.id ? (
                            <input
                              type="text"
                              value={newTitle}
                              onChange={(e) => setNewTitle(e.target.value)}
                              onBlur={() => updateConversationTitle(conv.id, newTitle)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  updateConversationTitle(conv.id, newTitle)
                                }
                              }}
                              className="bg-[#3a3a3a] text-white border-none rounded px-2 py-1 w-full focus:outline-none text-sm lg:text-xs"
                              autoFocus
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            conv.title
                          )}
                        </button>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 flex">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 lg:h-6 lg:w-6 text-gray-400 hover:text-white min-h-[32px] min-w-[32px] lg:min-h-[24px] lg:min-w-[24px]"
                              >
                                <MoreVertical className="h-4 w-4 lg:h-3 lg:w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
                              <DropdownMenuItem
                                className="hover:bg-[#3a3a3a] cursor-pointer min-h-[36px] lg:min-h-[32px] text-sm lg:text-xs"
                                onClick={() => {
                                  setEditingTitle(conv.id)
                                  setNewTitle(conv.title)
                                }}
                              >
                                <Edit className="h-4 w-4 lg:h-3 lg:w-3 mr-2" />
                                Rename
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="hover:bg-[#3a3a3a] text-red-400 hover:text-red-300 cursor-pointer min-h-[36px] lg:min-h-[32px] text-sm lg:text-xs"
                                onClick={() => setDeleteConfirmId(conv.id)}
                              >
                                <Trash2 className="h-4 w-4 lg:h-3 lg:w-3 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {olderConversations.length > 0 && (
                <>
                  <div className="px-3 sm:px-4 lg:px-3 py-2 lg:py-1 text-xs lg:text-xs font-medium text-gray-400 uppercase">
                    Previous 7 Days
                  </div>
                  <div className="space-y-1 px-2 sm:px-3 lg:px-2">
                    {olderConversations.map((conv) => (
                      <div key={conv.id} className="relative group">
                        <button
                          className={cn(
                            "w-full text-left px-3 py-2.5 lg:py-2 rounded-md hover:bg-[#2a2a2a] text-gray-300 text-sm lg:text-xs truncate pr-8 min-h-[44px] lg:min-h-[32px] flex items-center transition-colors",
                            currentConversation?.id === conv.id && "bg-[#2a2a2a]",
                          )}
                          onClick={() => switchConversation(conv.id)}
                        >
                          {editingTitle === conv.id ? (
                            <input
                              type="text"
                              value={newTitle}
                              onChange={(e) => setNewTitle(e.target.value)}
                              onBlur={() => updateConversationTitle(conv.id, newTitle)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  updateConversationTitle(conv.id, newTitle)
                                }
                              }}
                              className="bg-[#3a3a3a] text-white border-none rounded px-2 py-1 w-full focus:outline-none text-sm lg:text-xs"
                              autoFocus
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            conv.title
                          )}
                        </button>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 flex">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 lg:h-6 lg:w-6 text-gray-400 hover:text-white min-h-[32px] min-w-[32px] lg:min-h-[24px] lg:min-w-[24px]"
                              >
                                <MoreVertical className="h-4 w-4 lg:h-3 lg:w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
                              <DropdownMenuItem
                                className="hover:bg-[#3a3a3a] cursor-pointer min-h-[36px] lg:min-h-[32px] text-sm lg:text-xs"
                                onClick={() => {
                                  setEditingTitle(conv.id)
                                  setNewTitle(conv.title)
                                }}
                              >
                                <Edit className="h-4 w-4 lg:h-3 lg:w-3 mr-2" />
                                Rename
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="hover:bg-[#3a3a3a] text-red-400 hover:text-red-300 cursor-pointer min-h-[36px] lg:min-h-[32px] text-sm lg:text-xs"
                                onClick={() => setDeleteConfirmId(conv.id)}
                              >
                                <Trash2 className="h-4 w-4 lg:h-3 lg:w-3 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Chat area - Responsive flex container */}
        <div className="flex-1 flex flex-col h-full max-h-screen overflow-hidden">
          {/* Messages - Responsive scrollable area */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-4 space-y-4 sm:space-y-6 lg:space-y-4"
            style={{
              overscrollBehavior: "contain",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {!currentConversation || currentConversation.messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4 sm:p-8 lg:p-6">
                <h2 className="text-xl sm:text-2xl lg:text-xl font-medium mb-2 sm:mb-4 lg:mb-3">
                  What can I help with?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-3 w-full max-w-2xl lg:max-w-3xl mt-6 sm:mt-8 lg:mt-6">
                  <div
                    className="bg-[#2a2a2a] p-4 sm:p-6 lg:p-4 rounded-lg hover:bg-[#3a3a3a] cursor-pointer transition-colors min-h-[100px] sm:min-h-[120px] lg:min-h-[90px] flex flex-col"
                    onClick={() => setInput("Explain quantum entanglement")}
                  >
                    <Search className="h-5 w-5 sm:h-6 sm:w-6 lg:h-5 lg:w-5 text-gray-400 mb-2 sm:mb-3 lg:mb-2" />
                    <h3 className="font-medium mb-1 sm:mb-2 lg:mb-1 text-sm sm:text-base lg:text-sm">
                      Explain quantum entanglement
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-xs text-gray-400 flex-1">
                      Learn about this fascinating quantum phenomenon
                    </p>
                  </div>
                  <div
                    className="bg-[#2a2a2a] p-4 sm:p-6 lg:p-4 rounded-lg hover:bg-[#3a3a3a] cursor-pointer transition-colors min-h-[100px] sm:min-h-[120px] lg:min-h-[90px] flex flex-col"
                    onClick={() => setInput("Solve the differential equation dy/dx = 2xy")}
                  >
                    <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 lg:h-5 lg:w-5 text-gray-400 mb-2 sm:mb-3 lg:mb-2" />
                    <h3 className="font-medium mb-1 sm:mb-2 lg:mb-1 text-sm sm:text-base lg:text-sm">
                      Solve a differential equation
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-xs text-gray-400 flex-1">
                      Get step-by-step solutions to complex problems
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              currentConversation.messages.map((message) => {
                if (message.isPlaceholder && isLoading) return null

                return (
                  <div
                    key={message.id}
                    className={cn("flex", message.role === "assistant" ? "justify-start" : "justify-end")}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] sm:max-w-[80%] lg:max-w-[75%]",
                        message.role === "assistant"
                          ? "bg-[#1a1a1a] p-3 sm:p-4 lg:p-3 rounded-lg"
                          : "bg-[#2a2a2a] p-3 sm:p-4 lg:p-3 rounded-lg",
                        message.isPlaceholder ? "opacity-70" : "",
                      )}
                    >
                      {message.role === "assistant" && (
                        <div className="flex items-start gap-3 sm:gap-4 lg:gap-3">
                          <Avatar className="h-6 w-6 sm:h-8 sm:w-8 lg:h-6 lg:w-6 bg-[#2a2a2a] text-white flex items-center justify-center flex-shrink-0 mt-1">
                            <ScientificLogo className="h-3 w-3 sm:h-5 sm:w-5 lg:h-3 lg:w-3" />
                          </Avatar>
                          <div className="flex-1 overflow-hidden min-w-0">
                            <div className="prose prose-invert max-w-none text-sm sm:text-base lg:text-sm">
                              <MarkdownRenderer content={message.content} />
                            </div>
                          </div>
                        </div>
                      )}
                      {message.role === "user" && (
                        <div className="overflow-hidden">
                          <div className="prose prose-invert max-w-none text-sm sm:text-base lg:text-sm">
                            <p>{message.content}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })
            )}
            {error && (
              <div className="flex items-center justify-center p-2">
                <Alert variant="destructive" className="bg-red-900/20 border border-red-800 text-red-300 max-w-2xl">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-sm lg:text-xs">{error}</AlertDescription>
                </Alert>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area - Compact desktop sizing */}
          <div className="p-3 sm:p-4 lg:p-4 flex-shrink-0 border-t border-[#2a2a2a] bg-[#0f0f0f]">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              <div className="relative rounded-xl border border-[#3a3a3a] bg-[#1a1a1a] focus-within:border-[#5a5a5a]">
                <Textarea
                  ref={(el) => {
                    textareaRef.current = el
                    inputRef.current = el
                  }}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={chatMode === "search" ? "Search the web..." : "Ask anything"}
                  className="min-h-[40px] sm:min-h-[48px] lg:min-h-[40px] max-h-[200px] resize-none py-3 sm:py-4 lg:py-3 px-3 sm:px-4 lg:px-3 rounded-xl bg-transparent border-none text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 overflow-anchor-none text-sm sm:text-base lg:text-sm"
                  disabled={isLoading}
                  style={{ overflowAnchor: "none" }}
                />

                {/* Action buttons below the input - Compact desktop layout */}
                <div className="flex items-center justify-between px-3 sm:px-4 lg:px-3 py-2 sm:py-3 lg:py-2 border-t border-[#3a3a3a]">
                  <div className="flex items-center gap-1 sm:gap-2 lg:gap-1 overflow-x-auto hide-scrollbar">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className={cn(
                        "h-8 sm:h-9 lg:h-7 rounded-lg transition-all whitespace-nowrap text-xs sm:text-sm lg:text-xs px-2 sm:px-3 lg:px-2 min-h-[32px] sm:min-h-[36px] lg:min-h-[28px]",
                        isBetaMember
                          ? chatMode === "search"
                            ? "text-white bg-[#2a2a2a] shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                            : "text-white hover:text-white hover:bg-[#2a2a2a]"
                          : "text-white hover:text-white hover:bg-[#2a2a2a]",
                      )}
                      onClick={() => toggleChatMode("search")}
                    >
                      <Search className="h-3 w-3 sm:h-4 sm:w-4 lg:h-3 lg:w-3 mr-1" />
                      <span className="hidden sm:inline lg:hidden">Search</span>
                      <span className="sm:hidden lg:inline">S</span>
                      {!isBetaMember && <Lock className="h-2 w-2 sm:h-3 sm:w-3 lg:h-2 lg:w-2 ml-1" />}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className={cn(
                        "h-8 sm:h-9 lg:h-7 rounded-lg transition-all whitespace-nowrap text-xs sm:text-sm lg:text-xs px-2 sm:px-3 lg:px-2 min-h-[32px] sm:min-h-[36px] lg:min-h-[28px]",
                        isBetaMember
                          ? chatMode === "reason"
                            ? "text-white bg-[#2a2a2a] shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                            : "text-white hover:text-white hover:bg-[#2a2a2a]"
                          : "text-white hover:text-white hover:bg-[#2a2a2a]",
                      )}
                      onClick={() => toggleChatMode("reason")}
                    >
                      <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4 lg:h-3 lg:w-3 mr-1" />
                      <span className="hidden sm:inline lg:hidden">Reason</span>
                      <span className="sm:hidden lg:inline">R</span>
                      {!isBetaMember && <Lock className="h-2 w-2 sm:h-3 sm:w-3 lg:h-2 lg:w-2 ml-1" />}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className={cn(
                        "h-8 sm:h-9 lg:h-7 rounded-lg transition-all whitespace-nowrap text-xs sm:text-sm lg:text-xs px-2 sm:px-3 lg:px-2 min-h-[32px] sm:min-h-[36px] lg:min-h-[28px]",
                        isBetaMember
                          ? "text-white hover:text-white hover:bg-[#2a2a2a]"
                          : "text-white hover:text-white hover:bg-[#2a2a2a]",
                      )}
                      onClick={goToSimulations}
                    >
                      <Beaker className="h-3 w-3 sm:h-4 sm:w-4 lg:h-3 lg:w-3 mr-1" />
                      <span className="hidden sm:inline lg:hidden">Simulations</span>
                      <span className="sm:hidden lg:inline">Sim</span>
                      {!isBetaMember && <Lock className="h-2 w-2 sm:h-3 sm:w-3 lg:h-2 lg:w-2 ml-1" />}
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-1 flex-shrink-0">
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!input.trim() || isLoading}
                      className="h-8 w-8 sm:h-9 sm:w-9 lg:h-7 lg:w-7 rounded-lg bg-[#3a3a3a] text-white hover:bg-[#4a4a4a] disabled:bg-[#2a2a2a] disabled:text-gray-500 min-h-[32px] min-w-[32px] sm:min-h-[36px] sm:min-w-[36px] lg:min-h-[28px] lg:min-w-[28px]"
                    >
                      <Send className="h-3 w-3 sm:h-4 sm:w-4 lg:h-3 lg:w-3" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mode indicator - Responsive text */}
              {chatMode !== "normal" && (
                <div className="text-xs sm:text-sm lg:text-xs text-center mt-2">
                  {chatMode === "search" && (
                    <span className="text-gray-400">Search mode active - I'll search the web for information</span>
                  )}
                  {chatMode === "reason" && (
                    <span className="text-gray-400">Reason mode active - I'll provide step-by-step reasoning</span>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmId !== null} onOpenChange={() => setDeleteConfirmId(null)}>
        <DialogContent className="bg-[#2a2a2a] border-[#3a3a3a] text-white max-w-sm sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg lg:text-base">Delete Conversation</DialogTitle>
          </DialogHeader>
          <p className="py-4 text-sm sm:text-base lg:text-sm">
            Are you sure you want to delete this conversation? This action cannot be undone.
          </p>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmId(null)}
              className="bg-transparent border-[#3a3a3a] text-white hover:bg-[#3a3a3a] text-sm lg:text-xs min-h-[44px] lg:min-h-[36px]"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirmId && deleteConversation(deleteConfirmId)}
              className="bg-red-600 hover:bg-red-700 text-white text-sm lg:text-xs min-h-[44px] lg:min-h-[36px]"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Beta Feature Modal */}
      <BetaSignupModal
        open={showBetaSignupModal}
        onOpenChange={setShowBetaSignupModal}
        featureAttempted={betaFeatureRequested}
      />
    </div>
  )
}

export default SynaptiqChat
