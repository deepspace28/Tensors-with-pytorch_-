"use client"

import type React from "react"

import { useState } from "react"
import { useAIChat } from "@/hooks/use-ai-chat"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function RedesignedChat() {
  const [input, setInput] = useState("")
  const [mode, setMode] = useState<"default" | "reason">("default")
  const [approach, setApproach] = useState<"hybrid" | "client" | "server">("hybrid")

  const { messages, isLoading, error, sendMessage, sendMessageClientSide, sendMessageServerless, reset } = useAIChat({
    mode,
    fallbackToServerless: approach === "hybrid",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const content = input
    setInput("")

    // Choose the appropriate send method based on the selected approach
    if (approach === "client") {
      await sendMessageClientSide(content)
    } else if (approach === "server") {
      await sendMessageServerless(content)
    } else {
      await sendMessage(content)
    }
  }

  return (
    <div className="flex flex-col h-[700px] max-w-3xl mx-auto border rounded-lg overflow-hidden">
      <div className="bg-gray-100 p-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Redesigned Chat</h2>
          <div className="flex gap-2">
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as "default" | "reason")}
              className="px-2 py-1 border rounded text-sm"
            >
              <option value="default">Scientific Mode</option>
              <option value="reason">Reasoning Mode</option>
            </select>
            <select
              value={approach}
              onChange={(e) => setApproach(e.target.value as "hybrid" | "client" | "server")}
              className="px-2 py-1 border rounded text-sm"
            >
              <option value="hybrid">Hybrid Approach</option>
              <option value="client">Client-Side Only</option>
              <option value="server">Server-Side Only</option>
            </select>
            <Button variant="outline" size="sm" onClick={reset}>
              Reset
            </Button>
          </div>
        </div>
      </div>

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

        {isLoading && (
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
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>
    </div>
  )
}
