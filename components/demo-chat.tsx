"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { ScientificLogo } from "@/components/scientific-logo"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function DemoChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Save current scroll position
    const scrollPosition = window.scrollY

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Restore scroll position
    window.scrollTo(0, scrollPosition)

    // Simulate API call delay
    setTimeout(() => {
      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getSimulatedResponse(input.trim()),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const getSimulatedResponse = (query: string): string => {
    // Simple response logic based on keywords
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("quantum") || lowerQuery.includes("entanglement")) {
      return "Quantum entanglement is a physical phenomenon that occurs when a group of particles are generated, interact, or share spatial proximity in a way such that the quantum state of each particle of the group cannot be described independently of the state of the others, including when the particles are separated by a large distance."
    } else if (lowerQuery.includes("differential") || lowerQuery.includes("equation")) {
      return "Differential equations are equations that relate a function with its derivatives. They are used to model various phenomena in physics, engineering, economics, and other domains where change is related to other factors."
    } else if (lowerQuery.includes("hello") || lowerQuery.includes("hi")) {
      return "Hello! I'm Synaptiq, an AI assistant specialized in scientific topics. How can I help you today?"
    } else {
      return "I'm here to help with scientific questions and simulations. Could you provide more details about what you'd like to know?"
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <ScientificLogo className="h-16 w-16 text-primary" />
            <h2 className="text-2xl font-bold">Welcome to Synaptiq</h2>
            <p className="text-muted-foreground max-w-md">
              Your scientific research assistant. Ask me about quantum physics, mathematics, or any scientific topic.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
              <Card
                className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => setInput("Explain quantum entanglement")}
              >
                <h3 className="font-medium">Explain quantum entanglement</h3>
                <p className="text-sm text-muted-foreground">Learn about this fascinating quantum phenomenon</p>
              </Card>
              <Card
                className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => setInput("Solve a differential equation")}
              >
                <h3 className="font-medium">Solve a differential equation</h3>
                <p className="text-sm text-muted-foreground">Get step-by-step solutions to complex problems</p>
              </Card>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                <Avatar className={message.role === "assistant" ? "bg-primary" : "bg-secondary"}>
                  {message.role === "assistant" ? (
                    <ScientificLogo className="h-5 w-5 text-primary-foreground" />
                  ) : (
                    <div className="text-secondary-foreground">U</div>
                  )}
                </Avatar>
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <Avatar className="bg-primary">
                <ScientificLogo className="h-5 w-5 text-primary-foreground" />
              </Avatar>
              <div className="rounded-lg px-4 py-2 bg-muted">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 rounded-full bg-current animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a scientific question..."
            className="min-h-[50px] resize-none"
            rows={1}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
