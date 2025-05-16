"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScientificLogo } from "@/components/scientific-logo"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Sparkles, Send, Mic, Search, Lightbulb, BookOpen, Beaker, Plus, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"

// Define team members
const TEAM_MEMBERS = {
  founder: "Jishnav",
  scientists: ["Dr. Eliza Chen", "Dr. Marcus Wei", "Dr. Sophia Rodriguez"],
  engineers: ["Alex Kim", "Taylor Johnson", "Jordan Patel"],
}

// Define conversation types
type MessageRole = "user" | "assistant" | "system"

interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export default function DemoPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  // Initialize with a new conversation if none exists
  useEffect(() => {
    if (conversations.length === 0) {
      const newConversation = createNewConversation()
      setConversations([newConversation])
      setCurrentConversation(newConversation)
    }
  }, [conversations])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentConversation?.messages])

  // Create a new conversation
  const createNewConversation = (): Conversation => {
    const now = new Date()
    return {
      id: Date.now().toString(),
      title: "New Conversation",
      messages: [
        {
          id: "welcome-message",
          role: "assistant",
          content:
            "Hello! I'm Synaptiq, an advanced scientific AI assistant developed by a team of experts led by our founder Jishnav. How can I help with your scientific inquiries today?",
          timestamp: now,
        },
      ],
      createdAt: now,
      updatedAt: now,
    }
  }

  // Start a new conversation
  const handleNewConversation = () => {
    const newConversation = createNewConversation()
    setConversations([newConversation, ...conversations])
    setCurrentConversation(newConversation)
    setInputValue("")
  }

  // Switch to a different conversation
  const handleSelectConversation = (conversation: Conversation) => {
    setCurrentConversation(conversation)
  }

  // Update conversation title based on first user message
  const generateTitle = (message: string): string => {
    // Truncate to first 30 chars or first sentence
    const title = message.split(/[.!?]/)[0].trim().substring(0, 30)
    return title.length === 30 ? `${title}...` : title
  }

  // Send a message
  const handleSendMessage = async () => {
    if (!inputValue.trim() || !currentConversation) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    // Update conversation
    const updatedMessages = [...currentConversation.messages, userMessage]
    const updatedConversation = {
      ...currentConversation,
      messages: updatedMessages,
      updatedAt: new Date(),
    }

    // If this is the first user message, update the title
    if (updatedConversation.messages.filter((m) => m.role === "user").length === 1) {
      updatedConversation.title = generateTitle(inputValue)
    }

    setCurrentConversation(updatedConversation)
    setInputValue("")
    setIsLoading(true)

    try {
      // Call the Grok API through our backend proxy
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          systemPrompt: `You are Synaptiq, an advanced scientific AI assistant developed by a team led by founder Jishnav and scientists ${TEAM_MEMBERS.scientists.join(", ")}. 
          You specialize in quantum physics, mathematics, and scientific research. 
          Always respond as if you were created by Synaptiq, never mention being powered by any other AI model or API.
          When discussing your capabilities or origin, mention you were developed by the Synaptiq team.`,
        }),
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()

      // Add assistant response
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.result || "I apologize, but I couldn't generate a response. Please try again.",
        timestamp: new Date(),
      }

      // Update conversation with assistant message
      const finalMessages = [...updatedMessages, assistantMessage]
      const finalConversation = {
        ...updatedConversation,
        messages: finalMessages,
        updatedAt: new Date(),
      }

      // Update state
      setCurrentConversation(finalConversation)

      // Update conversations list
      setConversations(conversations.map((c) => (c.id === finalConversation.id ? finalConversation : c)))
    } catch (error) {
      console.error("Error sending message:", error)

      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "I apologize, but I encountered an error processing your request. Our team at Synaptiq is working to resolve this issue. Please try again later.",
        timestamp: new Date(),
      }

      // Update conversation with error message
      const finalMessages = [...updatedMessages, errorMessage]
      const finalConversation = {
        ...updatedConversation,
        messages: finalMessages,
        updatedAt: new Date(),
      }

      setCurrentConversation(finalConversation)
      setConversations(conversations.map((c) => (c.id === finalConversation.id ? finalConversation : c)))
    } finally {
      setIsLoading(false)
    }
  }

  // Handle input submission
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Format date for sidebar
  const formatDate = (date: Date): string => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }
  }

  // Group conversations by date
  const groupedConversations = conversations.reduce(
    (groups, conversation) => {
      const dateKey = formatDate(conversation.createdAt)
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(conversation)
      return groups
    },
    {} as Record<string, Conversation[]>,
  )

  return (
    <div className="flex h-screen flex-col bg-black text-white">
      <SiteHeader />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col">
          {/* New chat button */}
          <div className="p-3">
            <Button
              onClick={handleNewConversation}
              className="w-full bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white border border-[#333] flex items-center gap-2"
            >
              <Plus size={16} />
              New chat
            </Button>
          </div>

          {/* Conversations list */}
          <div className="flex-1 overflow-y-auto">
            {Object.entries(groupedConversations).map(([dateGroup, convos]) => (
              <div key={dateGroup} className="mb-4">
                <h3 className="px-3 py-1 text-xs text-gray-500 font-medium">{dateGroup}</h3>
                <ul>
                  {convos.map((conversation) => (
                    <li key={conversation.id}>
                      <button
                        onClick={() => handleSelectConversation(conversation)}
                        className={cn(
                          "w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-[#1a1a1a] truncate",
                          currentConversation?.id === conversation.id ? "bg-[#1a1a1a]" : "",
                        )}
                      >
                        <Sparkles size={16} className="flex-shrink-0 text-gray-400" />
                        <span className="truncate">{conversation.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* User info */}
          <div className="p-3 border-t border-[#1a1a1a]">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.profileImage || "/placeholder.svg"} />
                <AvatarFallback className="bg-[#1a1a1a]">
                  <User size={16} />
                </AvatarFallback>
              </Avatar>
              <span className="text-sm truncate">{user?.name || "Guest User"}</span>
            </div>
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {currentConversation ? (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {currentConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                  >
                    <div className="flex-shrink-0 mr-4 ml-4">
                      {message.role === "user" ? (
                        <Avatar className="h-8 w-8 bg-blue-500/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-500" />
                        </Avatar>
                      ) : (
                        <Avatar className="h-8 w-8 bg-emerald-500/10 flex items-center justify-center">
                          <ScientificLogo variant="simple" className="h-5 w-5 text-emerald-500" />
                        </Avatar>
                      )}
                    </div>

                    <div className="space-y-2 max-w-[80%]">
                      {message.role === "user" ? (
                        <div className="rounded-lg px-4 py-2 bg-blue-600 text-white">
                          <p>{message.content}</p>
                          <div className="text-xs opacity-50 mt-1 text-right">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-lg px-4 py-2 bg-gray-800 text-white">
                          <MarkdownRenderer content={message.content} />
                          <div className="text-xs opacity-50 mt-1 text-right">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex max-w-3xl">
                      <div className="flex-shrink-0 mr-4">
                        <Avatar className="h-8 w-8 bg-emerald-500/10 flex items-center justify-center">
                          <ScientificLogo variant="simple" className="h-5 w-5 text-emerald-500" />
                        </Avatar>
                      </div>
                      <div className="rounded-lg px-4 py-2 bg-gray-800 text-white">
                        <div className="flex space-x-2">
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
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
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div className="p-4 border-t border-[#1a1a1a]">
                <div className="max-w-3xl mx-auto">
                  <div className="relative">
                    <Textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask Synaptiq anything..."
                      className="w-full pr-10 py-3 bg-[#1a1a1a] border border-[#333] rounded-lg text-white resize-none min-h-[56px] max-h-[200px]"
                      rows={1}
                    />
                    <div className="absolute right-3 bottom-3 flex items-center">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-gray-400 hover:text-white"
                        disabled={isLoading}
                      >
                        <Mic size={18} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className={cn(
                          "text-gray-400 hover:text-white",
                          inputValue.trim() && !isLoading ? "text-emerald-500 hover:text-emerald-400" : "",
                        )}
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isLoading}
                      >
                        <Send size={18} />
                      </Button>
                    </div>
                  </div>

                  {/* Quick action buttons */}
                  <div className="flex justify-center mt-4 space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-[#1a1a1a] border-[#333] text-gray-300 hover:bg-[#2a2a2a]"
                    >
                      <Search size={14} className="mr-1" />
                      Search
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-[#1a1a1a] border-[#333] text-gray-300 hover:bg-[#2a2a2a]"
                    >
                      <Lightbulb size={14} className="mr-1" />
                      Suggest
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-[#1a1a1a] border-[#333] text-gray-300 hover:bg-[#2a2a2a]"
                    >
                      <BookOpen size={14} className="mr-1" />
                      Research
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-[#1a1a1a] border-[#333] text-gray-300 hover:bg-[#2a2a2a]"
                    >
                      <Beaker size={14} className="mr-1" />
                      Experiment
                    </Button>
                  </div>

                  <div className="text-xs text-center mt-2 text-gray-500">
                    Synaptiq may produce inaccurate information about people, places, or facts.
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ScientificLogo className="h-16 w-16 mx-auto mb-4 text-emerald-500" />
                <h2 className="text-2xl font-bold mb-2">Welcome to Synaptiq</h2>
                <p className="text-gray-400 max-w-md">
                  The advanced scientific AI assistant developed by Jishnav and the Synaptiq team.
                </p>
                <Button onClick={handleNewConversation} className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white">
                  Start a new conversation
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
