"use client"

import { useEffect, useRef } from "react"
import katex from "katex"
import "katex/dist/katex.min.css"

interface MathRendererProps {
  text: string
  displayMode?: boolean
}

export function MathRenderer({ text, displayMode = true }: MathRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(text, containerRef.current, {
          displayMode: displayMode,
          throwOnError: false,
          trust: true,
          strict: false,
          macros: {
            "\\f": "f(#1)",
            "\\hbar": "\\h",
          },
        })
      } catch (error) {
        console.error("KaTeX rendering error:", error)
        // Fallback rendering for errors
        if (containerRef.current) {
          containerRef.current.textContent = text
          containerRef.current.classList.add("katex-error")
        }
      }
    }
  }, [text, displayMode])

  return <div ref={containerRef} className="katex-container" />
}
