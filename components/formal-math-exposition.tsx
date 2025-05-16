"use client"

import { useEffect, useRef } from "react"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import { cn } from "@/lib/utils"

interface FormalMathExpositionProps {
  content: string
  className?: string
}

export function FormalMathExposition({ content, className }: FormalMathExpositionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Load and initialize KaTeX
  useEffect(() => {
    // Add KaTeX CSS
    if (!document.querySelector('link[href*="katex.min.css"]')) {
      const linkElement = document.createElement("link")
      linkElement.rel = "stylesheet"
      linkElement.href = "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
      document.head.appendChild(linkElement)
    }

    // Load KaTeX script
    const loadKaTeX = async () => {
      if (typeof window.katex === "undefined") {
        // Load KaTeX
        const katexScript = document.createElement("script")
        katexScript.src = "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"
        katexScript.async = true
        document.head.appendChild(katexScript)

        // Wait for KaTeX to load
        await new Promise<void>((resolve) => {
          katexScript.onload = () => resolve()
        })

        // Load auto-render extension
        const autoRenderScript = document.createElement("script")
        autoRenderScript.src = "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"
        autoRenderScript.async = true
        document.head.appendChild(autoRenderScript)

        // Wait for auto-render to load
        await new Promise<void>((resolve) => {
          autoRenderScript.onload = () => resolve()
        })
      }

      // Render math in the container
      if (containerRef.current && window.renderMathInElement) {
        window.renderMathInElement(containerRef.current, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "$$", right: "$$", display: false },
            { left: "\\[", right: "\\]", display: true },
          ],
          throwOnError: false,
          output: "html",
          trust: true,
        })
      }
    }

    loadKaTeX()
  }, [content])

  return (
    <div ref={containerRef} className={cn("prose prose-invert max-w-none", "formal-math-exposition", className)}>
      <ReactMarkdown remarkPlugins={[remarkMath]}>{content}</ReactMarkdown>
      <style jsx global>{`
        .formal-math-exposition h2,
        .formal-math-exposition h3,
        .formal-math-exposition h4 {
          font-weight: 600;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        
        .formal-math-exposition strong {
          font-weight: 600;
        }
        
        .formal-math-exposition em {
          font-style: italic;
        }
        
        .formal-math-exposition hr {
          margin: 1.5em 0;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .formal-math-exposition .katex-display {
          margin: 1.5em 0;
          overflow-x: auto;
          overflow-y: hidden;
        }
        
        .formal-math-exposition ol {
          list-style-type: decimal;
          padding-left: 1.5em;
          margin: 1em 0;
        }
        
        .formal-math-exposition ol li {
          margin-bottom: 0.5em;
        }
        
        .formal-math-exposition p {
          margin-bottom: 1em;
          line-height: 1.6;
        }
        
        .formal-math-exposition .katex {
          font-size: 1.1em;
        }
      `}</style>
    </div>
  )
}

// Add type definition for window.renderMathInElement
declare global {
  interface Window {
    katex: any
    renderMathInElement: (element: HTMLElement, options: any) => void
  }
}
