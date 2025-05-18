"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define message type
interface Message {
  role: "user" | "assistant"
  content: string
}

// Define API endpoint options
const API_ENDPOINTS = [
  { id: "app-api", name: "App Router API", url: "/api/chat" },
  { id: "edge-api", name: "Edge Runtime API", url: "/api/edge-chat" },
  { id: "pages-api", name: "Pages Router API", url: "/api/chat" },
  { id: "proxy-api", name: "Proxy API", url: "/api/proxy" },
]

export function MultiEndpointChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedEndpoint, setSelectedEndpoint] = useState(API_ENDPOINTS[0].id)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Get selected endpoint URL
  const getEndpointUrl = () => {
    const endpoint = API_ENDPOINTS.find((e) => e.id === selectedEndpoint)
    return endpoint ? endpoint.url : API_ENDPOINTS[0].url
  }

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setError(null)

    // Add user message to chat
    const newMessages = [...messages, { role: "user", content: userMessage }]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      // Convert messages to format expected by API
      const apiMessages = newMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      // Get selected endpoint URL
      const endpointUrl = getEndpointUrl()

      // Send request to selected API endpoint
      const response = await fetch(endpointUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: apiMessages,
          mode: "normal",
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(`API error: ${response.status} - ${errorData.error || "Unknown error"}`)
      }

      const data = await response.json()

      // Add assistant message to chat
      setMessages([...newMessages, { role: "assistant", content: data.text }])
    } catch (error) {
      console.error("Error sending message:", error)
      setError(error instanceof Error ? error.message : "Failed to send message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Synaptiq Chat</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm">API Endpoint:</span>
          <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select API" />
            </SelectTrigger>
            <SelectContent>
              {API_ENDPOINTS.map((endpoint) => (
                <SelectItem key={endpoint.id} value={endpoint.id}>
                  {endpoint.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
      {error && (
        <div className="text-red-500 mb-2 p-3 bg-red-900/10 border border-red-800 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

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
