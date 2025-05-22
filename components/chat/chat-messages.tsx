"use client"

import { useRef, useEffect } from "react"
import { Avatar } from "@/components/ui/avatar"
import { ScientificLogo } from "@/components/scientific-logo"
import { ExternalLink } from "lucide-react"
import type { Message, MessageSection } from "@/types/chat"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { VisualizationRenderer } from "./visualization-renderer"
import { Button } from "@/components/ui/button"
import { shouldShowSimLabButton } from "@/lib/query-classifier"
import { useChat } from "@/contexts/chat-context"
import { ScientificResult } from "@/components/scientific-result"
import { cn } from "@/lib/utils"

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { navigateToLab } = useChat()

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="h-full overflow-y-auto p-4 space-y-6">
      {messages.map((message) => (
        <div key={message.id} className={cn("flex", message.role === "assistant" ? "justify-start" : "justify-end")}>
          <div
            className={cn(
              "max-w-[80%]",
              message.role === "assistant" ? "bg-[#1a1a1a] p-4 rounded-lg" : "bg-[#2a2a2a] p-4 rounded-lg",
            )}
          >
            {message.role === "assistant" && (
              <div className="flex items-start">
                <Avatar className="h-8 w-8 mr-4 bg-[#2a2a2a] text-white flex items-center justify-center">
                  <ScientificLogo className="h-5 w-5" />
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="prose prose-invert max-w-none">
                    <MarkdownRenderer content={message.content} />
                  </div>
                </div>
              </div>
            )}
            {message.role === "user" && (
              <div className="overflow-hidden">
                <div className="prose prose-invert max-w-none">
                  <p>{message.content}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex items-start justify-start">
          <div className="bg-[#1a1a1a] p-4 rounded-lg max-w-[80%]">
            <div className="flex items-start">
              <Avatar className="h-8 w-8 mr-4 bg-[#2a2a2a] text-white flex items-center justify-center">
                <ScientificLogo className="h-5 w-5" />
              </Avatar>
              <div className="flex space-x-2 items-center">
                <div
                  className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}

function ParsedMessageContent({ content, timestamp }: { content: string; timestamp: Date }) {
  let structured: any = {}
  try {
    structured = JSON.parse(content)
  } catch (e) {
    // fallback to markdown
  }

  return structured?.summary ? (
    <ScientificResult
      summary={structured.summary}
      equations={structured.equations}
      insight={structured.insight}
      chart={structured.chart}
      timestamp={timestamp}
    />
  ) : (
    <div className="rounded-lg px-4 py-2 bg-gray-800 text-white">
      <MarkdownRenderer content={content} />
      <div className="text-xs opacity-50 mt-1 text-right">
        {timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
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
  const { navigateToLab } = useChat()
  const lastUserMessage = useRef<string | null>(null)

  // Find the last user message before this assistant message
  useEffect(() => {
    const messages = JSON.parse(localStorage.getItem("synaptiq-chat-messages") || "[]")
    const index = messages.findIndex((msg: any) => msg.id === message.id)
    if (index > 0) {
      for (let i = index - 1; i >= 0; i--) {
        if (messages[i].role === "user") {
          lastUserMessage.current = messages[i].content
          break
        }
      }
    }
  }, [message.id])

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

        {/* Add simulation lab button if appropriate */}
        {lastUserMessage.current && shouldShowSimLabButton(lastUserMessage.current) && (
          <div className="mt-3 pt-2 border-t border-gray-700">
            <Button
              size="sm"
              variant="outline"
              className="w-full text-xs bg-emerald-900/40 hover:bg-emerald-800/60 border-emerald-700/50 text-emerald-400"
              onClick={() => navigateToLab(lastUserMessage.current!)}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Open in Simulation Lab
            </Button>
          </div>
        )}
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

        {/* Add simulation lab button if appropriate */}
        {lastUserMessage.current && shouldShowSimLabButton(lastUserMessage.current) && (
          <div className="mt-3 pt-2 border-t border-gray-700">
            <Button
              size="sm"
              variant="outline"
              className="w-full text-xs bg-emerald-900/40 hover:bg-emerald-800/60 border-emerald-700/50 text-emerald-400"
              onClick={() => navigateToLab(lastUserMessage.current!)}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Open in Simulation Lab
            </Button>
          </div>
        )}

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
