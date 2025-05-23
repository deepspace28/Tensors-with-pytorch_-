"use client"

import { useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"
import type { Message } from "@/types/chat"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { cn } from "@/lib/utils"

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={cn(
              "group relative px-4 py-6 border-b border-gray-100 dark:border-gray-800/50",
              message.role === "assistant" ? "bg-gray-50/50 dark:bg-gray-900/20" : "bg-white dark:bg-transparent",
            )}
          >
            <div className="flex gap-4 max-w-4xl mx-auto">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <Avatar className="h-8 w-8">
                  {message.role === "assistant" ? (
                    <>
                      <AvatarImage src="/synaptiq-logo.png" alt="Synaptiq" />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-xs font-medium">
                        S
                      </AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarFallback className="bg-gray-100 dark:bg-gray-800">
                        <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
              </div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                    {message.role === "assistant" ? "Synaptiq" : "You"}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <MarkdownRenderer content={message.content} />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="group relative px-4 py-6 bg-gray-50/50 dark:bg-gray-900/20 border-b border-gray-100 dark:border-gray-800/50">
            <div className="flex gap-4 max-w-4xl mx-auto">
              <div className="flex-shrink-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/synaptiq-logo.png" alt="Synaptiq" />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-xs font-medium">
                    S
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">Synaptiq</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">Thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
