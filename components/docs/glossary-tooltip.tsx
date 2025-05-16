"use client"

import { type ReactNode, useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface GlossaryTooltipProps {
  term: string
  definition: string
  children: ReactNode
}

export function GlossaryTooltip({ term, definition, children }: GlossaryTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger asChild>
          <span
            className="border-b border-dotted border-gray-500 cursor-help"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-black border border-gray-700 p-3 text-white">
          <div>
            <strong className="text-white">{term}</strong>
            <p className="text-sm text-gray-300 mt-1">{definition}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
