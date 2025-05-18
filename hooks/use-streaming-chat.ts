"use client"

import { useState, useCallback, useRef, useEffect } from "react"

// Types
type Message = {
  role: string
  content: string
}

type StreamingChatOptions = {
  initialMessages?: Message[]
  mode?: string
  onError?: (error: Error) => void
}

export function useStreamingChat(options: StreamingChatOptions = {}) {
  const { initialMessages = [], mode = "default", onError } = options

  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Use a ref to store the EventSource instance
  const eventSourceRef = useRef<EventSource | null>(null)

  // Clean up the EventSource on unmount
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
      }
    }
  }, [])

  const reset = useCallback(() => {
    setMessages([])
    setError(null)

    // Close any active stream
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
      eventSourceRef.current = null
    }
  }, [])

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isStreaming) return

      // Close any existing stream
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
        eventSourceRef.current = null
      }

      const userMessage: Message = { role: "user", content }

      // Add user message immediately
      setMessages((prev) => [...prev, userMessage])
      setIsStreaming(true)
      setError(null)

      try {
        // Create a placeholder for the assistant's response
        const assistantMessage: Message = { role: "assistant", content: "" }
        setMessages((prev) => [...prev, assistantMessage])

        // Prepare the messages to send
        const allMessages = [...messages, userMessage]

        // Create a unique ID for this request to use as a URL parameter
        // This helps prevent caching issues with EventSource
        const requestId = Date.now().toString()

        // Set up server-sent events connection
        const eventSource = new EventSource(`/api/streaming-chat?id=${requestId}`)
        eventSourceRef.current = eventSource

        // Send the actual request via fetch
        fetch("/api/streaming-chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: allMessages,
            mode,
          }),
        }).catch((error) => {
          console.error("Error sending streaming request:", error)
          setError("Failed to connect to the server. Please try again.")
          setIsStreaming(false)

          if (eventSource) {
            eventSource.close()
          }
        })

        // Handle incoming message chunks
        eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)

            // Update the assistant's message with the new chunk
            setMessages((prev) => {
              const newMessages = [...prev]
              const lastIndex = newMessages.length - 1

              // Make sure we're updating the assistant's message
              if (lastIndex >= 0 && newMessages[lastIndex].role === "assistant") {
                newMessages[lastIndex] = {
                  ...newMessages[lastIndex],
                  content: newMessages[lastIndex].content + data.text,
                }
              }

              return newMessages
            })
          } catch (error) {
            console.error("Error parsing streaming message:", error, event.data)
          }
        }

        // Handle stream completion
        eventSource.addEventListener("done", () => {
          setIsStreaming(false)
          eventSource.close()
          eventSourceRef.current = null
        })

        // Handle errors
        eventSource.onerror = (error) => {
          console.error("EventSource error:", error)
          setError("The connection was interrupted. Please try again.")
          setIsStreaming(false)
          eventSource.close()
          eventSourceRef.current = null

          if (onError) {
            onError(new Error("Stream connection error"))
          }
        }
      } catch (error) {
        console.error("Error in sendMessage:", error)
        setError(error.message || "An unexpected error occurred")
        setIsStreaming(false)

        if (onError) {
          onError(error)
        }
      }
    },
    [messages, isStreaming, mode, onError],
  )

  return {
    messages,
    isStreaming,
    error,
    sendMessage,
    reset,
  }
}
