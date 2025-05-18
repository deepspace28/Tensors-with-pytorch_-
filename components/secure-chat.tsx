"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { sendChatRequest } from "@/app/actions/chat-actions"

export function SecureChat() {
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setLoading(true)
    try {
      const result = await sendChatRequest(message)
      if (result.success) {
        setResponse(result.message)
      } else {
        setResponse(`Error: ${result.message}`)
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Secure Chat</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {response && (
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
              <p className="whitespace-pre-wrap">{response}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask a scientific question..."
              disabled={loading}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </Button>
          </form>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        This chat uses a secure server action to keep API keys private.
      </CardFooter>
    </Card>
  )
}
