"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "24px"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || disabled) return

    onSendMessage(input)
    setInput("")

    // Prevent scroll jump by maintaining the current scroll position
    const scrollPosition = window.scrollY
    window.scrollTo(0, scrollPosition)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)

      // Prevent any default browser behavior that might cause scrolling
      return false
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4">
      <div className="relative rounded-xl border border-[#3a3a3a] bg-[#1a1a1a] focus-within:border-[#5a5a5a]">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          className="min-h-[24px] max-h-[200px] resize-none py-3 px-4 rounded-xl bg-transparent border-none text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
          disabled={disabled}
        />
        <div className="absolute right-3 bottom-3 flex space-x-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
            disabled={disabled}
          >
            <Mic className="h-5 w-5" />
            <span className="sr-only">Voice input</span>
          </Button>
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || disabled}
            className="h-8 w-8 rounded-lg bg-[#3a3a3a] text-white hover:bg-[#4a4a4a] disabled:bg-[#2a2a2a] disabled:text-gray-500"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </form>
  )
}
