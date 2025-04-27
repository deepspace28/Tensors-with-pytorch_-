"use client"

import { useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar } from "@/components/ui/avatar"
import { ScientificLogo } from "@/components/scientific-logo"
import { User } from "lucide-react"
import type { Message, MessageSection } from "@/types/chat"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { VisualizationRenderer } from "./visualization-renderer"

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
    <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#0a0a0a]">
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex max-w-3xl ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className="flex-shrink-0 mr-4 ml-4">
                {message.role === "user" ? (
                  <Avatar className="h-8 w-8 bg-blue-500/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-500" />
                  </Avatar>
                ) : message.role === "assistant" ? (
                  <Avatar className="h-8 w-8 bg-emerald-500/10 flex items-center justify-center">
                    <ScientificLogo variant="simple" className="h-5 w-5 text-emerald-500" />
                  </Avatar>
                ) : (
                  <Avatar className="h-8 w-8 bg-red-500/10 flex items-center justify-center">
                    <span className="text-xs text-red-500">SYS</span>
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
                ) : message.sections ? (
                  <StructuredResponse message={message} />
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
          </motion.div>
        ))}

        {isLoading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
            <div className="flex max-w-3xl">
              <div className="flex-shrink-0 mr-4">
                <Avatar className="h-8 w-8 bg-emerald-500/10 flex items-center justify-center">
                  <ScientificLogo variant="simple" className="h-5 w-5 text-emerald-500" />
                </Avatar>
              </div>

              <div className="rounded-lg px-4 py-2 bg-gray-800">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce"></div>
                  <div
                    className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </AnimatePresence>
    </div>
  )
}

function ResponseSection({ section }: { section: MessageSection }) {
  const sectionTitles: Record<string, string> = {
    summary: "Summary",
    derivation: "Mathematical Derivation",
    visualization: "Visualization",
    insights: "Expert Insights",
  }

  // Skip rendering if content is empty or contains placeholder text
  if (
    !section.content ||
    typeof section.content !== "string" ||
    section.content.trim() === "" ||
    (typeof section.content === "string" &&
      (section.content.includes("No derivation needed") ||
        section.content.includes("Not applicable") ||
        section.content.includes("No visualization needed")))
  ) {
    return null
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-emerald-400">{sectionTitles[section.type] || section.type}</h3>

      {section.type === "visualization" ? (
        <VisualizationRenderer
          content={section.content}
          type={section.content.toLowerCase().includes("table") ? "table" : "chart"}
        />
      ) : (
        <div className="prose prose-invert max-w-none text-sm">
          <MarkdownRenderer content={section.content} />
        </div>
      )}
    </div>
  )
}

function StructuredResponse({ message }: { message: Message }) {
  if (!message.sections || message.sections.length === 0) {
    // If no sections, render the content directly with MarkdownRenderer
    return (
      <div className="rounded-lg px-4 py-2 bg-gray-800 text-white">
        <MarkdownRenderer content={message.content} />
        <div className="text-xs opacity-50 mt-1 text-right">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    )
  }

  return (
    <Card className="border border-gray-800 bg-gray-900 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <ScientificLogo variant="simple" className="h-4 w-4 text-emerald-500" />
          Synaptiq Response
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Render the main content with MarkdownRenderer */}
        <div className="prose prose-invert max-w-none">
          <MarkdownRenderer content={message.content} />
        </div>

        {/* Render each section */}
        {message.sections.map((section, index) => (
          <ResponseSection key={index} section={section} />
        ))}

        <div className="text-xs opacity-50 mt-1 text-right">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </CardContent>
    </Card>
  )
}
