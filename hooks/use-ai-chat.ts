"use client"

import { useState, useCallback } from "react"
import { clientAIService } from "@/lib/client-ai-service"

// Types
type Message = {
  role: string
  content: string
}

type ChatState = {
  messages: Message[]
  isLoading: boolean
  error: string | null
}

type UseChatOptions = {
  initialMessages?: Message[]
  mode?: string
  fallbackToServerless?: boolean
}

export function useAIChat(options: UseChatOptions = {}) {
  const { initialMessages = [], mode = "default", fallbackToServerless = true } = options

  const [state, setState] = useState<ChatState>({
    messages: initialMessages,
    isLoading: false,
    error: null,
  })

  // Reset the chat
  const reset = useCallback(() => {
    setState({
      messages: [],
      isLoading: false,
      error: null,
    })
  }, [])

  // Send a message using the client-side approach
  const sendMessageClientSide = useCallback(
    async (content: string) => {
      if (!content.trim()) return

      const userMessage = { role: "user", content }

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage],
        isLoading: true,
        error: null,
      }))

      try {
        const allMessages = [...state.messages, userMessage]
        const response = await clientAIService.sendChatRequest(allMessages, mode)

        if (response.error) {
          console.warn("Client-side AI error:", response.error)
        }

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, userMessage, { role: "assistant", content: response.text }],
          isLoading: false,
        }))
      } catch (error) {
        console.error("Error in client-side sendMessage:", error)

        setState((prev) => ({
          ...prev,
          error: error.message || "Failed to send message",
          isLoading: false,
        }))
      }
    },
    [state.messages, mode],
  )

  // Send a message using the serverless approach
  const sendMessageServerless = useCallback(
    async (content: string) => {
      if (!content.trim()) return

      const userMessage = { role: "user", content }

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage],
        isLoading: true,
        error: null,
      }))

      try {
        const allMessages = [...state.messages, userMessage]

        const response = await fetch("/api/serverless-chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: allMessages,
            mode,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
          throw new Error(errorData.error || `Server error: ${response.status}`)
        }

        const data = await response.json()

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, userMessage, { role: "assistant", content: data.text }],
          isLoading: false,
        }))
      } catch (error) {
        console.error("Error in serverless sendMessage:", error)

        setState((prev) => ({
          ...prev,
          error: error.message || "Failed to send message",
          isLoading: false,
        }))
      }
    },
    [state.messages, mode],
  )

  // Combined send message function with fallback
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return

      const userMessage = { role: "user", content }

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage],
        isLoading: true,
        error: null,
      }))

      try {
        // First try client-side approach
        try {
          const allMessages = [...state.messages, userMessage]
          const response = await clientAIService.sendChatRequest(allMessages, mode)

          if (response.error && fallbackToServerless) {
            // If client-side fails and fallback is enabled, try serverless
            console.warn("Falling back to serverless approach:", response.error)
            throw new Error("Fallback to serverless")
          }

          setState((prev) => ({
            ...prev,
            messages: [...prev.messages, userMessage, { role: "assistant", content: response.text }],
            isLoading: false,
          }))
        } catch (clientError) {
          if (fallbackToServerless) {
            // Try serverless approach as fallback
            console.log("Using serverless fallback...")
            const allMessages = [...state.messages, userMessage]

            const response = await fetch("/api/serverless-chat", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                messages: allMessages,
                mode,
              }),
            })

            if (!response.ok) {
              const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
              throw new Error(errorData.error || `Server error: ${response.status}`)
            }

            const data = await response.json()

            setState((prev) => ({
              ...prev,
              messages: [...prev.messages, userMessage, { role: "assistant", content: data.text }],
              isLoading: false,
            }))
          } else {
            // If fallback is disabled, propagate the error
            throw clientError
          }
        }
      } catch (error) {
        console.error("Error in sendMessage:", error)

        setState((prev) => ({
          ...prev,
          error: error.message || "Failed to send message",
          isLoading: false,
        }))
      }
    },
    [state.messages, mode, fallbackToServerless],
  )

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    sendMessageClientSide,
    sendMessageServerless,
    reset,
  }
}
