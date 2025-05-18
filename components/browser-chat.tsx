"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { browserApiClient } from "@/lib/browser-api-client"
import { LocalAI } from "@/lib/local-ai"

// Define message type
interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

export function BrowserChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [apiStatus, setApiStatus] = useState<"unknown" | "available" | "unavailable">("unknown")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Check API status on mount
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        // Make a simple POST request to test the API
        await browserApiClient.post("/api/test", { test: true })
        setApiStatus("available")
      } catch (error) {
        console.error("API status check failed:", error)
        setApiStatus("unavailable")
      }
    }

    checkApiStatus()
  }, [])

  // Send message
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

      // Try to use the API
      try {
        const result = await browserApiClient.post("/api/chat", {
          messages: newMessages,
          mode: "normal",
        })
        response = result.text
      } catch (error) {
        console.error("Error sending message via API:", error)

        // Fall back to local AI
        response = LocalAI.getResponse(userMessage)
        response += "\n\n(Note: I'm currently operating in offline mode with limited capabilities.)"
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
          <span className="text-sm">API Status:</span>
          <span
            className={`inline-block w-3 h-3 rounded-full ${
              apiStatus === "available" ? "bg-green-500" : apiStatus === "unavailable" ? "bg-red-500" : "bg-yellow-500"
            }`}
          ></span>
          <span className="text-sm">
            {apiStatus === "available" ? "Connected" : apiStatus === "unavailable" ? "Offline" : "Checking..."}
          </span>
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
