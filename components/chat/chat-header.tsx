"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle, Menu } from "lucide-react"
import { ScientificLogo } from "@/components/scientific-logo"
import Link from "next/link"

interface ChatHeaderProps {
  onNewChat: () => void
  onToggleSidebar: () => void
}

export function ChatHeader({ onNewChat, onToggleSidebar }: ChatHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm px-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onToggleSidebar} className="md:hidden">
          <Menu className="h-4 w-4" />
        </Button>

        <Link href="/" className="flex items-center gap-2">
          <ScientificLogo className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">Synaptiq</span>
        </Link>
      </div>

      <Button variant="outline" size="sm" onClick={onNewChat} className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        New Chat
      </Button>
    </header>
  )
}
