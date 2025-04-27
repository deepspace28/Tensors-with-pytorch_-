"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { nanoid } from "nanoid"
import type { InteractionMode, Message, MessageSection } from "@/types/chat"
import type { Conversation } from "@/lib/conversation-service"

interface ChatContextType {
  messages: Message[]
  isLoading: boolean
  interactionMode: InteractionMode
  queriesRemaining: number
  isGuest: boolean
  showLimitModal: boolean
  conversationId: string | null
  conversations: Conversation[]
  setInteractionMode: (mode: InteractionMode) => void
  sendMessage: (content: string) => Promise<void>
  clearChat: () => void
  closeLimitModal: () => void
  createNewConversation: () => Promise<void>
  loadConversation: (id: string) => Promise<void>
  deleteConversation: (id: string) => Promise<void>
  updateConversationTitle: (id: string, title: string) => Promise<void>
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}

interface ChatProviderProps {
  children: React.ReactNode
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Welcome to Synaptiq. How can I assist with your scientific research today?",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [interactionMode, setInteractionMode] = useState<InteractionMode>("exploratory")
  const [queriesRemaining, setQueriesRemaining] = useState<number>(3)
  const [isGuest, setIsGuest] = useState(true)
  const [showLimitModal, setShowLimitModal] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [userId, setUserId] = useState<string>("anonymous")

  // Initialize user session
  useEffect(() => {
    // In a real app, this would check authentication status
    const storedUser = localStorage.getItem("synaptiq-user")

    if (storedUser) {
      const user = JSON.parse(storedUser)
      setIsGuest(user.isGuest)
      setQueriesRemaining(user.queriesRemaining)
      setUserId(user.id)
    } else {
      // Create a guest user
      const guestId = `guest-${nanoid(8)}`
      const guestUser = {
        id: guestId,
        isGuest: true,
        queriesRemaining: 3,
      }
      localStorage.setItem("synaptiq-user", JSON.stringify(guestUser))
      setIsGuest(true)
      setQueriesRemaining(3)
      setUserId(guestId)
    }
  }, [])

  // Load user conversations
  useEffect(() => {
    if (userId !== "anonymous") {
      loadUserConversations()
    }
  }, [userId])

  // Update user session when queries remaining changes
  useEffect(() => {
    const storedUser = localStorage.getItem("synaptiq-user")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      user.queriesRemaining = queriesRemaining
      localStorage.setItem("synaptiq-user", JSON.stringify(user))
    }
  }, [queriesRemaining])

  const loadUserConversations = async () => {
    try {
      const response = await fetch(`/api/conversations?userId=${userId}`, {
        headers: {
          "x-user-id": userId,
          "x-user-type": isGuest ? "anonymous" : "free",
        },
      })

      if (response.ok) {
        const data = await response.json()
        setConversations(data.conversations)
      }
    } catch (error) {
      console.error("Error loading conversations:", error)
    }
  }

  const createNewConversation = async () => {
    try {
      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
          "x-user-type": isGuest ? "anonymous" : "free",
        },
        body: JSON.stringify({ userId }),
      })

      if (response.ok) {
        const data = await response.json()
        setConversationId(data.conversation._id)
        setConversations((prev) => [data.conversation, ...prev])

        // Clear messages
        setMessages([
          {
            id: "welcome",
            role: "assistant",
            content: "Welcome to Synaptiq. How can I assist with your scientific research today?",
            timestamp: new Date(),
          },
        ])
      }
    } catch (error) {
      console.error("Error creating conversation:", error)
    }
  }

  const loadConversation = async (id: string) => {
    try {
      const response = await fetch(`/api/conversations/${id}`, {
        headers: {
          "x-user-id": userId,
          "x-user-type": isGuest ? "anonymous" : "free",
        },
      })

      if (response.ok) {
        const data = await response.json()
        setConversationId(data.conversation._id)
        setMessages(data.conversation.messages)
      }
    } catch (error) {
      console.error("Error loading conversation:", error)
    }
  }

  const updateConversationTitle = async (id: string, title: string) => {
    try {
      const response = await fetch(`/api/conversations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
          "x-user-type": isGuest ? "anonymous" : "free",
        },
        body: JSON.stringify({ title }),
      })

      if (response.ok) {
        const data = await response.json()
        setConversations((prev) => prev.map((conv) => (conv._id === id ? data.conversation : conv)))
      }
    } catch (error) {
      console.error("Error updating conversation title:", error)
    }
  }

  const deleteConversation = async (id: string) => {
    try {
      const response = await fetch(`/api/conversations/${id}`, {
        method: "DELETE",
        headers: {
          "x-user-id": userId,
          "x-user-type": isGuest ? "anonymous" : "free",
        },
      })

      if (response.ok) {
        setConversations((prev) => prev.filter((conv) => conv._id !== id))

        // If the deleted conversation is the current one, create a new one
        if (conversationId === id) {
          setConversationId(null)
          setMessages([
            {
              id: "welcome",
              role: "assistant",
              content: "Welcome to Synaptiq. How can I assist with your scientific research today?",
              timestamp: new Date(),
            },
          ])
        }
      }
    } catch (error) {
      console.error("Error deleting conversation:", error)
    }
  }

  const decrementQueries = useCallback(() => {
    setQueriesRemaining((prev) => {
      const newCount = prev - 1
      // Show limit modal when reaching zero
      if (newCount <= 0) {
        setShowLimitModal(true)
      }
      return newCount
    })
  }, [])

  const closeLimitModal = () => {
    setShowLimitModal(false)
  }

  const processResponse = (data: any): Message => {
    // Ensure we have valid sections
    let sections = data.sections || []

    // Filter out empty sections or placeholder sections
    sections = sections.filter((section: MessageSection) => {
      const content = section.content || ""
      return (
        content.trim() !== "" &&
        !content.includes("No derivation needed") &&
        !content.includes("Not applicable") &&
        !content.includes("No visualization needed")
      )
    })

    return {
      id: `assistant-${nanoid()}`,
      role: "assistant",
      content: data.text,
      sections: sections,
      timestamp: new Date(),
    }
  }

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    // Check if user has queries remaining
    if (queriesRemaining <= 0) {
      setShowLimitModal(true)
      return
    }

    // Add user message
    const userMessage: Message = {
      id: `user-${nanoid()}`,
      role: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Prepare the conversation history for the API
      const conversationHistory = messages
        .filter((msg) => msg.role !== "system")
        .map(({ role, content }) => ({ role, content }))

      // Add the new user message
      conversationHistory.push({ role: "user", content })

      // Call the API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
          "x-user-type": isGuest ? "anonymous" : "free",
        },
        body: JSON.stringify({
          messages: conversationHistory,
          mode: interactionMode,
          conversationId,
        }),
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()

      // Parse the structured response
      const assistantMessage = processResponse(data)

      setMessages((prev) => [...prev, assistantMessage])
      decrementQueries()

      // If this is the first message in a new conversation, create a conversation
      if (!conversationId) {
        await createNewConversation()
      }

      // Refresh conversations list
      await loadUserConversations()
    } catch (error) {
      console.error("Error sending message:", error)

      // Add error message
      const errorMessage: Message = {
        id: `error-${nanoid()}`,
        role: "system",
        content: "I apologize, but I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Welcome to Synaptiq. How can I assist with your scientific research today?",
        timestamp: new Date(),
      },
    ])
    setConversationId(null)
  }

  const value = {
    messages,
    isLoading,
    interactionMode,
    queriesRemaining,
    isGuest,
    showLimitModal,
    conversationId,
    conversations,
    setInteractionMode,
    sendMessage,
    clearChat,
    closeLimitModal,
    createNewConversation,
    loadConversation,
    deleteConversation,
    updateConversationTitle,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
