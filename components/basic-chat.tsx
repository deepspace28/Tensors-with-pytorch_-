"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function BasicChat() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setError(null)

    // Add user message
    const updatedMessages = [...messages, { role: "user", content: userMessage }]
    setMessages(updatedMessages)
    setIsLoading(true)

    try {
      console.log("Sending message to API")
      const response = await fetch("/api/simple-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      })

      console.log("API response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to get response")
      }

      const data = await response.json()
      console.log("Got response from API")

      // Add assistant message
      setMessages([...updatedMessages, { role: "assistant", content: data.text }])
    } catch (error) {
      console.error("Error in chat:", error)
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Basic Chat</h2>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 min-h-[300px]">
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
      </div>

      {/* Error message */}
      {error && (
        <div className="text-red-500 mb-2 p-3 bg-red-900/10 border border-red-800 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Input */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 bg-gray-800/20 border border-gray-700 rounded"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
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
