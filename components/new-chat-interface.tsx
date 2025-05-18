"use client"

import { useState, useRef, useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { sendMessage, clearChat, type ChatState } from "@/app/actions/chat-actions"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle, Loader2 } from "lucide-react"

// Initial state for the chat
const initialState: ChatState = {
  messages: [],
}

// Submit button with loading state
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        "Send"
      )}
    </Button>
  )
}

export function NewChatInterface() {
  // Use form state to manage the chat state
  const [state, formAction] = useFormState(sendMessage, initialState)

  // Local state for the input value
  const [inputValue, setInputValue] = useState("")

  // Ref for the messages container to auto-scroll
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [state.messages])

  // Handle form submission
  const handleSubmit = (formData: FormData) => {
    formAction(formData)
    setInputValue("")
  }

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Chat header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-bold">Synaptiq Chat</h1>
        <Button
          variant="outline"
          onClick={async () => {
            const newState = await clearChat()
            // Reset the form state
            formAction(new FormData())
          }}
        >
          Clear Chat
        </Button>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {state.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Welcome to Synaptiq</h2>
              <p className="text-gray-500">Ask me anything about science, math, or quantum physics!</p>
            </div>
          </div>
        ) : (
          state.messages.map((message, index) => (
            <Card key={index} className={`p-4 ${message.role === "user" ? "bg-primary/10" : "bg-secondary/10"}`}>
              <div className="font-semibold mb-1">{message.role === "user" ? "You" : "Synaptiq"}</div>
              <div className="whitespace-pre-wrap">{message.content}</div>
            </Card>
          ))
        )}

        {/* Error message */}
        {state.error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Error</p>
              <p className="text-sm">{state.error}</p>
            </div>
          </div>
        )}

        {/* Invisible element for auto-scrolling */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <form action={handleSubmit} className="border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            name="message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-md bg-background"
            required
          />
          <SubmitButton />
        </div>
      </form>
    </div>
  )
}
