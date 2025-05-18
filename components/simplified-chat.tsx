"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function SimplifiedChat() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || loading) return

    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/direct-groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      if (data.choices && data.choices[0]?.message) {
        setMessages((prev) => [...prev, data.choices[0].message])
      } else {
        throw new Error("Invalid response format from API")
      }
    } catch (err) {
      console.error("Chat error:", err)
      setError(err.message || "Failed to get response")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto border rounded-lg overflow-hidden">
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">Send a message to start the conversation</div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-4 p-3 rounded-lg ${msg.role === "user" ? "bg-blue-100 ml-10" : "bg-white mr-10 border"}`}
            >
              <div className="font-semibold mb-1">{msg.role === "user" ? "You" : "AI"}</div>
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          ))
        )}

        {loading && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-pulse text-gray-500">AI is thinking...</div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t p-4 bg-white">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 resize-none"
            disabled={loading}
          />
          <Button type="submit" disabled={loading || !input.trim()}>
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>
    </div>
  )
}
