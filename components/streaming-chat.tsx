"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useStreamingChat } from "@/hooks/use-streaming-chat"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function StreamingChat() {
  const [input, setInput] = useState("")
  const [mode, setMode] = useState<"default" | "reason">("default")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, isStreaming, error, sendMessage, reset } = useStreamingChat({
    mode,
    onError: (error) => console.error("Chat error:", error),
  })

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isStreaming) return

    const content = input
    setInput("")
    await sendMessage(content)
  }

  return (
    <div className="flex flex-col h-[700px] max-w-3xl mx-auto border rounded-lg overflow-hidden bg-white shadow-md">
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 p-4 text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Synaptiq Chat (Streaming)</h2>
          <div className="flex gap-2">
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as "default" | "reason")}
              className="px-2 py-1 border rounded text-sm bg-white text-gray-800"
            >
              <option value="default">Scientific Mode</option>
              <option value="reason">Reasoning Mode</option>
            </select>
            <Button
              variant="outline"
              size="sm"
              onClick={reset}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              New Chat
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <div className="mb-2 text-4xl">👋</div>
            <h3 className="text-xl font-medium mb-2">Welcome to Synaptiq Chat</h3>
            <p className="max-w-md">Ask me anything about quantum physics, mathematics, or scientific research.</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-4 p-3 rounded-lg ${
                msg.role === "user" ? "bg-blue-100 ml-10 border border-blue-200" : "bg-white mr-10 border shadow-sm"
              }`}
            >
              <div className="font-semibold mb-1 text-sm text-gray-700">{msg.role === "user" ? "You" : "Synaptiq"}</div>
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          ))
        )}

        {isStreaming && messages[messages.length - 1]?.content === "" && (
          <div className="flex justify-center items-center py-4">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div
                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t p-4 bg-white">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 resize-none min-h-[80px]"
            disabled={isStreaming}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          />
          <Button
            type="submit"
            disabled={isStreaming || !input.trim()}
            className="self-end bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800"
          >
            {isStreaming ? "Streaming..." : "Send"}
          </Button>
        </div>
      </form>
    </div>
  )
}
