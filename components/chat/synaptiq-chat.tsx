"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, Search, Lightbulb, Beaker, AlertTriangle, Plus, MoreVertical, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { ScientificLogo } from "@/components/scientific-logo"
import { cn } from "@/lib/utils"
import { useRouter, usePathname } from "next/navigation"
import { type Conversation, ConversationStorage } from "@/lib/conversation-storage"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Message } from "@/lib/conversation-storage"

type ChatMode = "normal" | "search" | "reason"

export function SynaptiqChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [editingTitle, setEditingTitle] = useState<string | null>(null)
  const [newTitle, setNewTitle] = useState("")
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [chatMode, setChatMode] = useState<ChatMode>("normal")
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [showOfflineMessage, setShowOfflineMessage] = useState(false)
  const [isDemoMode, setIsDemoMode] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Check if we're in demo mode based on the URL path
  useEffect(() => {
    const isInDemoMode = pathname?.includes("/demo") || false
    setIsDemoMode(isInDemoMode)
  }, [pathname])

  // Check network status
  useEffect(() => {
    const handleOnline = () => {
      setShowOfflineMessage(false)
    }
    const handleOffline = () => setShowOfflineMessage(true)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Initial check
    setShowOfflineMessage(!navigator.onLine)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Load conversations on mount
  useEffect(() => {
    const loadedConversations = ConversationStorage.getAll()
    setConversations(loadedConversations)

    // Set current conversation to the most recent one or create a new one
    if (loadedConversations.length > 0) {
      // Sort by lastUpdated and get the most recent
      const mostRecent = [...loadedConversations].sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())[0]
      setCurrentConversation(mostRecent)
    } else {
      const newConv = ConversationStorage.create()
      setConversations([newConv])
      setCurrentConversation(newConv)
    }
  }, [])

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

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "24px"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentConversation?.messages])

  // Focus input after sending message
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isLoading])

  const createNewConversation = () => {
    const newConv = ConversationStorage.create()
    setConversations((prev) => [newConv, ...prev])
    setCurrentConversation(newConv)
    setInput("")
    setChatMode("normal")
    setError(null)
  }

  const switchConversation = (id: string) => {
    const conversation = conversations.find((c) => c.id === id)
    if (conversation) {
      setCurrentConversation(conversation)
      setInput("")
      setChatMode("normal")
      setError(null)
    }
  }

  const deleteConversation = (id: string) => {
    ConversationStorage.delete(id)
    setConversations((prev) => prev.filter((c) => c.id !== id))

    // If we deleted the current conversation, switch to another one or create new
    if (currentConversation?.id === id) {
      const remaining = conversations.filter((c) => c.id !== id)
      if (remaining.length > 0) {
        setCurrentConversation(remaining[0])
      } else {
        const newConv = ConversationStorage.create()
        setConversations([newConv])
        setCurrentConversation(newConv)
      }
      setChatMode("normal")
      setError(null)
    }

    setDeleteConfirmId(null)
  }

  const updateConversationTitle = (id: string, title: string) => {
    if (!title.trim()) return

    ConversationStorage.updateTitle(id, title)
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, title, lastUpdated: new Date() } : c)))

    if (currentConversation?.id === id) {
      setCurrentConversation((prev) => (prev ? { ...prev, title, lastUpdated: new Date() } : prev))
    }

    setEditingTitle(null)
  }

  // Updated handleSubmit function with improved demo mode handling
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

    try {
      // In a real implementation, this would call your API
      // For now, we'll simulate a response
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: getSimulatedResponse(input.trim()),
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error sending message:", error)
      setIsLoading(false)
    }
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

  const goToSimulations = () => {
    router.push("/simulations")
  }

  const toggleChatMode = (mode: ChatMode) => {
    setChatMode((currentMode) => (currentMode === mode ? "normal" : mode))
  }

  // Group conversations by date
  const todayConversations = conversations
    .filter((c) => {
      const today = new Date()
      return c.lastUpdated.toDateString() === today.toDateString()
    })
    .sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())

  const yesterdayConversations = conversations
    .filter((c) => {
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      return c.lastUpdated.toDateString() === yesterday.toDateString()
    })
    .sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())

  const olderConversations = conversations
    .filter((c) => {
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      return (
        c.lastUpdated.toDateString() !== today.toDateString() &&
        c.lastUpdated.toDateString() !== yesterday.toDateString()
      )
    })
    .sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="border-b border-[#2a2a2a] p-2">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-2 pl-0 md:pl-0">
            <ScientificLogo className="h-6 w-6 text-white" />
            <h1 className="text-lg font-medium">Synaptiq</h1>
            {isDemoMode && <span className="text-xs bg-amber-600 text-white px-2 py-0.5 rounded-full">Demo Mode</span>}
          </div>

          {/* Removed API Status Indicator */}
        </div>
      </header>

      {/* Demo Mode Banner */}
      {isDemoMode && (
        <div className="bg-amber-900/30 border-b border-amber-800 p-2 text-center text-amber-200 text-sm">
          <AlertTriangle className="inline-block h-4 w-4 mr-2" />
          You are currently in demo mode. All features use simulated responses.
        </div>
      )}

      {/* Offline warning */}
      {showOfflineMessage && (
        <div className="bg-amber-900/30 border-b border-amber-800 p-2 text-center text-amber-200 text-sm">
          <AlertTriangle className="inline-block h-4 w-4 mr-2" />
          You are currently offline. Some features may be unavailable.
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-64 border-r border-[#2a2a2a] bg-[#1a1a1a] hidden md:block">
          <div className="p-3">
            <Button
              variant="outline"
              className="w-full justify-start bg-[#2a2a2a] border-[#3a3a3a] hover:bg-[#3a3a3a]"
              onClick={createNewConversation}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Chat
            </Button>
          </div>

          {todayConversations.length > 0 && (
            <>
              <div className="px-3 py-2 text-xs font-medium text-gray-400 uppercase">Today</div>
              <div className="space-y-1 px-2 mb-4">
                {todayConversations.map((conv) => (
                  <div key={conv.id} className="relative group">
                    <button
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md hover:bg-[#2a2a2a] text-gray-300 text-sm truncate pr-8",
                        currentConversation?.id === conv.id && "bg-[#2a2a2a]",
                      )}
                      onClick={() => switchConversation(conv.id)}
                    >
                      {editingTitle === conv.id ? (
                        <input
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          onBlur={() => updateConversationTitle(conv.id, newTitle)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              updateConversationTitle(conv.id, newTitle)
                            }
                          }}
                          className="bg-[#3a3a3a] text-white border-none rounded px-2 py-1 w-full focus:outline-none"
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        conv.title
                      )}
                    </button>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 flex">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
                          <DropdownMenuItem
                            className="hover:bg-[#3a3a3a] cursor-pointer"
                            onClick={() => {
                              setEditingTitle(conv.id)
                              setNewTitle(conv.title)
                            }}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="hover:bg-[#3a3a3a] text-red-400 hover:text-red-300 cursor-pointer"
                            onClick={() => setDeleteConfirmId(conv.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {yesterdayConversations.length > 0 && (
            <>
              <div className="px-3 py-2 text-xs font-medium text-gray-400 uppercase">Yesterday</div>
              <div className="space-y-1 px-2 mb-4">
                {yesterdayConversations.map((conv) => (
                  <div key={conv.id} className="relative group">
                    <button
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md hover:bg-[#2a2a2a] text-gray-300 text-sm truncate pr-8",
                        currentConversation?.id === conv.id && "bg-[#2a2a2a]",
                      )}
                      onClick={() => switchConversation(conv.id)}
                    >
                      {editingTitle === conv.id ? (
                        <input
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          onBlur={() => updateConversationTitle(conv.id, newTitle)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              updateConversationTitle(conv.id, newTitle)
                            }
                          }}
                          className="bg-[#3a3a3a] text-white border-none rounded px-2 py-1 w-full focus:outline-none"
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        conv.title
                      )}
                    </button>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 flex">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
                          <DropdownMenuItem
                            className="hover:bg-[#3a3a3a] cursor-pointer"
                            onClick={() => {
                              setEditingTitle(conv.id)
                              setNewTitle(conv.title)
                            }}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="hover:bg-[#3a3a3a] text-red-400 hover:text-red-300 cursor-pointer"
                            onClick={() => setDeleteConfirmId(conv.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {olderConversations.length > 0 && (
            <>
              <div className="px-3 py-2 text-xs font-medium text-gray-400 uppercase">Previous 7 Days</div>
              <div className="space-y-1 px-2">
                {olderConversations.map((conv) => (
                  <div key={conv.id} className="relative group">
                    <button
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md hover:bg-[#2a2a2a] text-gray-300 text-sm truncate pr-8",
                        currentConversation?.id === conv.id && "bg-[#2a2a2a]",
                      )}
                      onClick={() => switchConversation(conv.id)}
                    >
                      {editingTitle === conv.id ? (
                        <input
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          onBlur={() => updateConversationTitle(conv.id, newTitle)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              updateConversationTitle(conv.id, newTitle)
                            }
                          }}
                          className="bg-[#3a3a3a] text-white border-none rounded px-2 py-1 w-full focus:outline-none"
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        conv.title
                      )}
                    </button>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 flex">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
                          <DropdownMenuItem
                            className="hover:bg-[#3a3a3a] cursor-pointer"
                            onClick={() => {
                              setEditingTitle(conv.id)
                              setNewTitle(conv.title)
                            }}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="hover:bg-[#3a3a3a] text-red-400 hover:text-red-300 cursor-pointer"
                            onClick={() => setDeleteConfirmId(conv.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col max-h-full overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <h1 className="text-4xl font-bold">What can I help with?</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                  <Card
                    className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => setInput("Explain quantum entanglement")}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Search className="h-5 w-5" />
                      <h3 className="font-medium">Explain quantum entanglement</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Learn about this fascinating quantum phenomenon</p>
                  </Card>
                  <Card
                    className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => setInput("Solve a differential equation")}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-5 w-5" />
                      <h3 className="font-medium">Solve a differential equation</h3>
                    </div>
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
            {error && (
              <div className="flex items-center justify-center p-2">
                <Alert variant="destructive" className="bg-red-900/20 border border-red-800 text-red-300">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>Error: {error}</AlertDescription>
                </Alert>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                className="min-h-[50px] resize-none"
                rows={1}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <div className="flex justify-center mt-2 gap-4">
              <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
                <Search className="h-3 w-3" />
                Search
              </Button>
              <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
                <Lightbulb className="h-3 w-3" />
                Reason
              </Button>
              <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
                <Beaker className="h-3 w-3" />
                Simulations
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmId !== null} onOpenChange={() => setDeleteConfirmId(null)}>
        <DialogContent className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
          <DialogHeader>
            <DialogTitle>Delete Conversation</DialogTitle>
          </DialogHeader>
          <p className="py-4">Are you sure you want to delete this conversation? This action cannot be undone.</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmId(null)}
              className="bg-transparent border-[#3a3a3a] text-white hover:bg-[#3a3a3a]"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirmId && deleteConversation(deleteConfirmId)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Make sure to export the component as default as well
export default SynaptiqChat
