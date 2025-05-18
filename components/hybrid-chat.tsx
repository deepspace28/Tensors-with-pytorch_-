"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { apiClient } from "@/lib/api-client"
import { DirectGroqClient } from "@/lib/direct-groq-client"
import { LocalAI } from "@/lib/local-ai"

// Define message type
interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

export function HybridChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [useDirectClient, setUseDirectClient] = useState(false)
  const [apiKey, setApiKey] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Try to get API key from environment
  useEffect(() => {
    const getApiKey = async () => {
      try {
        const response = await fetch("/api/auth/key")
        if (response.ok) {
          const data = await response.json()
          if (data.key) {
            setApiKey(data.key)
          }
        }
      } catch (error) {
        console.error("Failed to get API key:", error)
      }
    }

    getApiKey()
  }, [])

  // Send message using API route
  const sendMessageViaApi = async (userMessage: string) => {
    try {
      const response = await apiClient.post("/api/chat", {
        messages: [...messages, { role: "user", content: userMessage }],
        mode: "normal",
      })

      return response.text
    } catch (error) {
      console.error("Error sending message via API:", error)
      throw error
    }
  }

  // Send message using direct client
  const sendMessageDirectly = async (userMessage: string) => {
    if (!apiKey) {
      return LocalAI.getResponse(userMessage)
    }

    const directClient = new DirectGroqClient(apiKey)
    return await directClient.chatCompletion([...messages, { role: "user", content: userMessage }], "normal")
  }

  // Send message with fallback
  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput("")
    setError(null)

    // Add user message to chat
    const newMessages = [...messages, { role: "user", content: userMessage }]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      let response

      // Try the preferred method first
      try {
        if (useDirectClient) {
          response = await sendMessageDirectly(userMessage)
        } else {
          response = await sendMessageViaApi(userMessage)
        }
      } catch (error) {
        console.warn(`Primary method failed, trying fallback:`, error)

        // If the preferred method fails, try the other method
        if (useDirectClient) {
          response = await sendMessageViaApi(userMessage)
        } else {
          response = await sendMessageDirectly(userMessage)
        }
      }

      // If both methods fail, use local fallback
      if (!response) {
        response = LocalAI.getResponse(userMessage)
      }

      // Add assistant message to chat
      setMessages([...newMessages, { role: "assistant", content: response }])
    } catch (error) {
      console.error("Error sending message:", error)
      setError("Failed to send message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Synaptiq Chat</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">API Mode:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUseDirectClient(!useDirectClient)}
            className={useDirectClient ? "bg-blue-900/20" : ""}
          >
            {useDirectClient ? "Direct Client" : "API Route"}
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Send a message to start chatting</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <Card key={index} className={`p-4 ${message.role === "user" ? "bg-blue-900/10" : "bg-gray-800/10"}`}>
              <div className="font-semibold mb-1">{message.role === "user" ? "You" : "Synaptiq"}</div>
              <div className="whitespace-pre-wrap">{message.content}</div>
            </Card>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error message */}
      {error && <div className="text-red-500 mb-2">{error}</div>}

      {/* Input */}
      <div className="flex space-x-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a scientific question..."
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              sendMessage()
            }
          }}
          disabled={isLoading}
        />
        <Button onClick={sendMessage} disabled={isLoading || !input.trim()}>
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  )
}
