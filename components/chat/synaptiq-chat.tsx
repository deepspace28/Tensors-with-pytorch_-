"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Send,
  Search,
  Sparkles,
  Lightbulb,
  Beaker,
  Trash2,
  Edit,
  MoreVertical,
  AlertTriangle,
  Lock,
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
  // Always use the server-side endpoint by default
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

  // Check if user is a beta member
  const isBetaMember = user && !user.isGuest

  // Check network status
  useEffect(() => {
    const handleOnline = () => {
      setShowOfflineMessage(false)
    }
    const handleOffline = () => setShowOfflineMessage(true)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Initial check
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

    // Set current conversation to the most recent one or create a new one
    if (loadedConversations.length > 0) {
      // Sort by lastUpdated and get the most recent
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
      textareaRef.current.style.height = "24px"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  // Improved scroll to bottom when messages change
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        })
      }
    }

    // Always scroll to bottom when messages change
    if (currentConversation?.messages && currentConversation.messages.length > 0) {
      // Use multiple timeouts to ensure scrolling works
      setTimeout(scrollToBottom, 0)
      setTimeout(scrollToBottom, 100)
      setTimeout(scrollToBottom, 300)
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

  // Enhanced KaTeX loading and math rendering
  useEffect(() => {
    // Load KaTeX CSS
    if (!document.querySelector('link[href*="katex.min.css"]')) {
      const linkElement = document.createElement("link")
      linkElement.rel = "stylesheet"
      linkElement.href = "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
      linkElement.integrity = "sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn"
      linkElement.crossOrigin = "anonymous"
      document.head.appendChild(linkElement)
    }

    // Load KaTeX JavaScript
    const loadKaTeX = () => {
      if (!(window as any).katex) {
        const scriptElement = document.createElement("script")
        scriptElement.src = "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"
        scriptElement.integrity = "sha384-cpW21h6RZv/phavutF+AuVYrr+dA8xD9zs6FwLpaCct6O9ctzYFfFr4dgmgccOTx"
        scriptElement.crossOrigin = "anonymous"
        scriptElement.onload = () => {
          // Load auto-render extension
          const autoRenderScript = document.createElement("script")
          autoRenderScript.src = "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"
          autoRenderScript.integrity = "sha384-+VBxd3r6XgURycqtZ117nYw44OOcIax56Z4dCRWbxyPt0Koah1uHoK0o4+/RRE05"
          autoRenderScript.crossOrigin = "anonymous"
          autoRenderScript.onload = () => {
            // Render math in existing content
            renderMathInContainer()
          }
          document.head.appendChild(autoRenderScript)
        }
        document.head.appendChild(scriptElement)
      } else {
        renderMathInContainer()
      }
    }

    const renderMathInContainer = () => {
      if (messagesContainerRef.current && (window as any).renderMathInElement) {
        try {
          ;(window as any).renderMathInElement(messagesContainerRef.current, {
            delimiters: [
              { left: "$$", right: "$$", display: true },
              { left: "$", right: "$", display: false },
              { left: "\\[", right: "\\]", display: true },
              { left: "$$", right: "$$", display: false },
              { left: "\\begin{equation}", right: "\\end{equation}", display: true },
              { left: "\\begin{align}", right: "\\end{align}", display: true },
              { left: "\\begin{alignat}", right: "\\end{alignat}", display: true },
              { left: "\\begin{gather}", right: "\\end{gather}", display: true },
              { left: "\\begin{CD}", right: "\\end{CD}", display: true },
            ],
            throwOnError: false,
            strict: false,
            trust: true,
            macros: {
              "\\eqref": "\\href{#1}{}",
              "\\label": "\\href{#1}{}",
              "\\require": "\\href{#1}{}",
              "\\boxed": "\\fbox{#1}",
              "\\hbar": "\\bar{h}",
              "\\psi": "\\psi",
              "\\phi": "\\phi",
              "\\nabla": "\\nabla",
              "\\partial": "\\partial",
            },
          })
        } catch (e) {
          console.error("Error rendering math:", e)
        }
      }
    }

    loadKaTeX()

    // Set up mutation observer for dynamic content
    const observer = new MutationObserver(() => {
      setTimeout(renderMathInContainer, 100)
    })

    if (messagesContainerRef.current) {
      observer.observe(messagesContainerRef.current, {
        childList: true,
        subtree: true,
        characterData: true,
      })
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  // Re-render math when messages change
  useEffect(() => {
    if (currentConversation?.messages && (window as any).renderMathInElement && messagesContainerRef.current) {
      setTimeout(() => {
        try {
          ;(window as any).renderMathInElement(messagesContainerRef.current, {
            delimiters: [
              { left: "$$", right: "$$", display: true },
              { left: "$", right: "$", display: false },
              { left: "\\[", right: "\\]", display: true },
              { left: "$$", right: "$$", display: false },
              { left: "\\begin{equation}", right: "\\end{equation}", display: true },
              { left: "\\begin{align}", right: "\\end{align}", display: true },
              { left: "\\begin{alignat}", right: "\\end{alignat}", display: true },
              { left: "\\begin{gather}", right: "\\end{gather}", display: true },
              { left: "\\begin{CD}", right: "\\end{CD}", display: true },
            ],
            throwOnError: false,
            strict: false,
            trust: true,
            macros: {
              "\\eqref": "\\href{#1}{}",
              "\\label": "\\href{#1}{}",
              "\\require": "\\href{#1}{}",
              "\\boxed": "\\fbox{#1}",
              "\\hbar": "\\bar{h}",
              "\\psi": "\\psi",
              "\\phi": "\\phi",
              "\\nabla": "\\nabla",
              "\\partial": "\\partial",
            },
          })
        } catch (e) {
          console.error("Error rendering math:", e)
        }
      }, 200)
    }
  }, [currentConversation?.messages])

  // Prevent page from scrolling when chat container is scrolled
  useEffect(() => {
    const preventPageScroll = (e: WheelEvent) => {
      if (chatContainerRef.current && chatContainerRef.current.contains(e.target as Node)) {
        e.stopPropagation()
      }
    }

    document.addEventListener("wheel", preventPageScroll, { passive: false })

    return () => {
      document.removeEventListener("wheel", preventPageScroll)
    }
  }, [])

  const createNewConversation = () => {
    const newConv = ConversationStorage.create()
    setConversations((prev) => [newConv, ...prev])
    setCurrentConversation(newConv)
    setInput("")
    setChatMode("normal")
    setError(null)
    setRetryCount(0)
    setIsLoading(false)
  }

  const switchConversation = (id: string) => {
    const conversation = conversations.find((c) => c.id === id)
    if (conversation) {
      setCurrentConversation(conversation)
      setInput("")
      setChatMode("normal")
      setError(null)
    }
  }

  const deleteConversation = (id: string) => {
    ConversationStorage.delete(id)
    setConversations((prev) => prev.filter((c) => c.id !== id))

    // If we deleted the current conversation, switch to another one or create new
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

  const scrollToBottom = (force = false) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!input.trim() || isLoading || !currentConversation) return

    // Clear any previous errors
    setError(null)
    setRetryCount(0)

    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    // Add user message to conversation
    ConversationStorage.addMessage(currentConversation.id, userMessage)

    // Create placeholder for assistant response
    const placeholderMessage: Message = {
      id: uuidv4(),
      role: "assistant",
      content: "Thinking...",
      timestamp: new Date(),
      isPlaceholder: true,
    }

    ConversationStorage.addMessage(currentConversation.id, placeholderMessage)

    // Update state immediately
    const updatedConversation = ConversationStorage.get(currentConversation.id)
    setCurrentConversation(updatedConversation || null)
    setConversations(ConversationStorage.getAll())

    const currentInput = input
    setInput("")
    setIsLoading(true)

    // Force scroll to bottom after sending message
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        })
      }
    }, 100)

    try {
      // Check network connectivity
      if (!navigator.onLine) {
        throw new Error("No internet connection. Please check your network and try again.")
      }

      // Prepare messages for API
      const apiMessages =
        updatedConversation?.messages
          .filter((msg) => !msg.isPlaceholder)
          .map(({ role, content }) => ({
            role: role as "user" | "assistant",
            content,
          })) || []

      console.log("Sending chat request with mode:", chatMode)

      let response
      let lastError

      // Try server-side endpoint first
      try {
        response = await callSecureGroqEndpoint(apiMessages, chatMode)
        if (response.error) {
          lastError = response.error
          throw new Error(response.error)
        }
      } catch (serverError) {
        console.log("Server-side endpoint failed, trying direct client as fallback")
        lastError = serverError instanceof Error ? serverError.message : "Server error"

        // Fallback to direct client
        try {
          response = await DirectGroqClient.chat({
            messages: apiMessages,
            mode: chatMode as GroqChatMode,
          })
          if (response.error) {
            throw new Error(response.error)
          }
        } catch (directError) {
          console.log("Direct client also failed")
          throw new Error(lastError || "Both server and direct client failed")
        }
      }

      const responseText =
        response.text || "I received your message but couldn't generate a proper response. Please try again."

      // Replace placeholder with actual response
      const messages = updatedConversation?.messages || []
      const placeholderIndex = messages.findIndex((m) => m.isPlaceholder)

      if (placeholderIndex >= 0) {
        ConversationStorage.updateMessage(currentConversation.id, messages[placeholderIndex].id, {
          content: responseText,
          isPlaceholder: false,
        })
      } else {
        // Fallback: add as new message
        const assistantMessage: Message = {
          id: uuidv4(),
          role: "assistant",
          content: responseText,
          timestamp: new Date(),
        }
        ConversationStorage.addMessage(currentConversation.id, assistantMessage)
      }

      // Update state with final conversation
      const finalConversation = ConversationStorage.get(currentConversation.id)
      setCurrentConversation(finalConversation || null)
      setConversations(ConversationStorage.getAll())

      // Force scroll to bottom after response
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          })
        }
      }, 200)

      // Clear error state on success
      setError(null)
      setRetryCount(0)
    } catch (error) {
      console.error("Chat error:", error)

      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
      setError(errorMessage)

      // Create user-friendly error message
      let fallbackMessage = ""

      if (errorMessage.includes("network") || errorMessage.includes("internet") || errorMessage.includes("offline")) {
        fallbackMessage = `I'm having trouble connecting to the internet. Please check your connection and try again.

If the problem persists, you can:
- Refresh the page
- Check your network settings
- Try again in a few moments`
      } else if (errorMessage.includes("rate limit") || errorMessage.includes("too many requests")) {
        fallbackMessage = `I'm receiving too many requests right now. Please wait a moment and try again.

This helps ensure the service remains available for everyone.`
      } else if (errorMessage.includes("server") || errorMessage.includes("503") || errorMessage.includes("502")) {
        fallbackMessage = `The server is temporarily unavailable. This is usually brief.

Please try again in a few moments. If the issue continues, the service may be under maintenance.`
      } else {
        fallbackMessage = `I encountered an error while processing your request: ${errorMessage}

Please try again. If the problem continues, try:
- Refreshing the page
- Starting a new conversation
- Checking your internet connection`
      }

      // Replace placeholder with error message
      const messages = updatedConversation?.messages || []
      const placeholderIndex = messages.findIndex((m) => m.isPlaceholder)

      if (placeholderIndex >= 0) {
        ConversationStorage.updateMessage(currentConversation.id, messages[placeholderIndex].id, {
          content: fallbackMessage,
          isPlaceholder: false,
        })
      } else {
        // Fallback: add error as new message
        const errorMessage: Message = {
          id: uuidv4(),
          role: "assistant",
          content: fallbackMessage,
          timestamp: new Date(),
        }
        ConversationStorage.addMessage(currentConversation.id, errorMessage)
      }

      // Update state with error conversation
      const errorConversation = ConversationStorage.get(currentConversation.id)
      setCurrentConversation(errorConversation || null)
      setConversations(ConversationStorage.getAll())

      // Force scroll to bottom after error message
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          })
        }
      }, 200)
    } finally {
      setIsLoading(false)
    }
  }

  const retryLastMessage = async () => {
    if (!currentConversation || currentConversation.messages.length === 0) return

    // Find the last user message
    const messages = [...currentConversation.messages].reverse()
    const lastUserMessage = messages.find((m) => m.role === "user")

    if (lastUserMessage) {
      setInput(lastUserMessage.content)
      // Remove the error response if it exists
      const lastMessage = currentConversation.messages[currentConversation.messages.length - 1]
      if (lastMessage.role === "assistant") {
        // Remove the last assistant message and retry
        const updatedMessages = currentConversation.messages.slice(0, -1)
        const updatedConversation = {
          ...currentConversation,
          messages: updatedMessages,
        }
        setCurrentConversation(updatedConversation)

        // Update storage
        localStorage.setItem(
          "conversations",
          JSON.stringify(
            ConversationStorage.getAll().map((c) => (c.id === currentConversation.id ? updatedConversation : c)),
          ),
        )
      }
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
    <div className="flex h-screen bg-[#0f0f0f] text-white">
      {/* Sidebar */}
      <aside className="w-[260px] border-r border-[#2a2a2a] bg-[#1a1a1a] p-4">
        <button
          className="w-full bg-[#3a3a3a] text-white py-2 rounded-md mb-4 hover:bg-[#4a4a4a] transition-colors"
          onClick={createNewConversation}
        >
          + New Chat
        </button>

        {/* Today's conversations */}
        {todayConversations.length > 0 && (
          <>
            <div className="text-gray-400 text-sm mb-2">TODAY</div>
            <div className="space-y-1 mb-4">
              {todayConversations.map((conv) => (
                <div key={conv.id} className="relative group">
                  <button
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md hover:bg-[#2a2a2a] text-gray-300 text-sm truncate pr-8",
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
                        className="bg-[#3a3a3a] text-white border-none rounded px-2 py-1 w-full focus:outline-none"
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
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
                        <DropdownMenuItem
                          className="hover:bg-[#3a3a3a] cursor-pointer"
                          onClick={() => {
                            setEditingTitle(conv.id)
                            setNewTitle(conv.title)
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="hover:bg-[#3a3a3a] text-red-400 hover:text-red-300 cursor-pointer"
                          onClick={() => setDeleteConfirmId(conv.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
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

        {/* Yesterday's conversations */}
        {yesterdayConversations.length > 0 && (
          <>
            <div className="text-gray-400 text-sm mb-2">YESTERDAY</div>
            <div className="space-y-1 mb-4">
              {yesterdayConversations.map((conv) => (
                <div key={conv.id} className="relative group">
                  <button
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md hover:bg-[#2a2a2a] text-gray-300 text-sm truncate pr-8",
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
                        className="bg-[#3a3a3a] text-white border-none rounded px-2 py-1 w-full focus:outline-none"
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
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
                        <DropdownMenuItem
                          className="hover:bg-[#3a3a3a] cursor-pointer"
                          onClick={() => {
                            setEditingTitle(conv.id)
                            setNewTitle(conv.title)
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="hover:bg-[#3a3a3a] text-red-400 hover:text-red-300 cursor-pointer"
                          onClick={() => setDeleteConfirmId(conv.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
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

        {/* Older conversations */}
        {olderConversations.length > 0 && (
          <>
            <div className="text-gray-400 text-sm mb-2">PREVIOUS 7 DAYS</div>
            <div className="space-y-1">
              {olderConversations.map((conv) => (
                <div key={conv.id} className="relative group">
                  <button
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md hover:bg-[#2a2a2a] text-gray-300 text-sm truncate pr-8",
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
                        className="bg-[#3a3a3a] text-white border-none rounded px-2 py-1 w-full focus:outline-none"
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
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
                        <DropdownMenuItem
                          className="hover:bg-[#3a3a3a] cursor-pointer"
                          onClick={() => {
                            setEditingTitle(conv.id)
                            setNewTitle(conv.title)
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="hover:bg-[#3a3a3a] text-red-400 hover:text-red-300 cursor-pointer"
                          onClick={() => setDeleteConfirmId(conv.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
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
      </aside>

      {/* Main Chat Panel */}
      <div className="flex flex-col flex-1">
        {/* Top Navbar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-2">
            <ScientificLogo className="h-6 w-6 text-white" />
            <span className="text-xl font-bold">Synaptiq</span>
          </div>
          <Link href="/" className="text-sm text-gray-400 hover:text-white hover:underline transition-colors">
            Home
          </Link>
        </header>

        {/* Offline warning */}
        {showOfflineMessage && (
          <div className="bg-amber-900/30 border-b border-amber-800 p-2 text-center text-amber-200 text-sm">
            <AlertTriangle className="inline-block h-4 w-4 mr-2" />
            You are currently offline. Some features may be unavailable.
          </div>
        )}

        {/* Chat Messages Area */}
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4 relative">
          {!currentConversation || currentConversation.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <h2 className="text-3xl font-medium mb-2">What can I help with?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mt-8">
                <div
                  className="bg-[#2a2a2a] p-4 rounded-lg hover:bg-[#3a3a3a] cursor-pointer"
                  onClick={() => setInput("Explain quantum entanglement")}
                >
                  <Search className="h-5 w-5 text-gray-400 mb-2" />
                  <h3 className="font-medium mb-1">Explain quantum entanglement</h3>
                  <p className="text-sm text-gray-400">Learn about this fascinating quantum phenomenon</p>
                </div>
                <div
                  className="bg-[#2a2a2a] p-4 rounded-lg hover:bg-[#3a3a3a] cursor-pointer"
                  onClick={() => setInput("Solve the differential equation dy/dx = 2xy")}
                >
                  <Sparkles className="h-5 w-5 text-gray-400 mb-2" />
                  <h3 className="font-medium mb-1">Solve a differential equation</h3>
                  <p className="text-sm text-gray-400">Get step-by-step solutions to complex problems</p>
                </div>
              </div>
            </div>
          ) : (
            currentConversation.messages.map((message) => {
              // Skip placeholder messages that are being replaced
              if (message.isPlaceholder && isLoading) return null

              return (
                <div
                  key={message.id}
                  className={cn("flex", message.role === "assistant" ? "justify-start" : "justify-end")}
                >
                  <div
                    className={cn(
                      "max-w-[80%]",
                      message.role === "assistant" ? "bg-[#1a1a1a] p-4 rounded-lg" : "bg-[#2a2a2a] p-4 rounded-lg",
                      message.isPlaceholder ? "opacity-70" : "",
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-start">
                        <Avatar className="h-8 w-8 mr-4 bg-[#2a2a2a] text-white flex items-center justify-center">
                          <ScientificLogo className="h-5 w-5" />
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                          <div className="prose prose-invert max-w-none">
                            <MarkdownRenderer content={message.content} />
                          </div>
                        </div>
                      </div>
                    )}
                    {message.role === "user" && (
                      <div className="overflow-hidden">
                        <div className="prose prose-invert max-w-none">
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
            <div className="flex flex-col items-center justify-center p-4 space-y-3">
              <Alert variant="destructive" className="bg-red-900/20 border border-red-800 text-red-300 max-w-md">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Connection issue detected. Please check your internet connection.
                </AlertDescription>
              </Alert>
              <Button
                variant="outline"
                size="sm"
                onClick={retryLastMessage}
                className="text-white border-gray-600 hover:bg-gray-700"
              >
                Try Again
              </Button>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Box */}
        <footer className="border-t border-[#2a2a2a] p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex gap-2">
              <Textarea
                ref={(el) => {
                  textareaRef.current = el
                  inputRef.current = el
                }}
                className="flex-1 border border-[#3a3a3a] rounded-md px-4 py-2 bg-[#1a1a1a] text-white placeholder:text-gray-500 resize-none min-h-[44px] max-h-[200px] focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder={chatMode === "search" ? "Search the web..." : "Ask anything"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="bg-[#3a3a3a] text-white px-4 py-2 rounded-md hover:bg-[#4a4a4a] disabled:bg-[#2a2a2a] disabled:text-gray-500"
                disabled={!input.trim() || isLoading}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Mode buttons */}
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className={cn(
                  "h-8 rounded-lg transition-all",
                  isBetaMember
                    ? chatMode === "search"
                      ? "text-white bg-[#2a2a2a] shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                      : "text-white hover:text-white hover:bg-[#2a2a2a]"
                    : "text-white hover:text-white hover:bg-[#2a2a2a]",
                )}
                onClick={() => toggleChatMode("search")}
              >
                <Search className="h-4 w-4 mr-1" />
                <span>Search</span>
                {!isBetaMember && <Lock className="h-3 w-3 ml-1" />}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className={cn(
                  "h-8 rounded-lg transition-all",
                  isBetaMember
                    ? chatMode === "reason"
                      ? "text-white bg-[#2a2a2a] shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                      : "text-white hover:text-white hover:bg-[#2a2a2a]"
                    : "text-white hover:text-white hover:bg-[#2a2a2a]",
                )}
                onClick={() => toggleChatMode("reason")}
              >
                <Lightbulb className="h-4 w-4 mr-1" />
                <span>Reason</span>
                {!isBetaMember && <Lock className="h-3 w-3 ml-1" />}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className={cn(
                  "h-8 rounded-lg transition-all",
                  isBetaMember
                    ? "text-white hover:text-white hover:bg-[#2a2a2a]"
                    : "text-white hover:text-white hover:bg-[#2a2a2a]",
                )}
                onClick={goToSimulations}
              >
                <Beaker className="h-4 w-4 mr-1" />
                <span>Simulations</span>
                {!isBetaMember && <Lock className="h-3 w-3 ml-1" />}
              </Button>
            </div>

            {/* Mode indicator */}
            {chatMode !== "normal" && (
              <div className="text-xs text-center">
                {chatMode === "search" && (
                  <span className="text-gray-400">Search mode active - I'll search the web for information</span>
                )}
                {chatMode === "reason" && (
                  <span className="text-gray-400">Reason mode active - I'll provide step-by-step reasoning</span>
                )}
              </div>
            )}
          </form>
        </footer>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmId !== null} onOpenChange={() => setDeleteConfirmId(null)}>
        <DialogContent className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
          <DialogHeader>
            <DialogTitle>Delete Conversation</DialogTitle>
          </DialogHeader>
          <p className="py-4">Are you sure you want to delete this conversation? This action cannot be undone.</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmId(null)}
              className="bg-transparent border-[#3a3a3a] text-white hover:bg-[#3a3a3a]"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirmId && deleteConversation(deleteConfirmId)}
              className="bg-red-600 hover:bg-red-700 text-white"
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

// Make sure to export the component as default as well
export default SynaptiqChat
