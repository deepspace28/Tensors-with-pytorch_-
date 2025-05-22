"use client"

import { useEffect, useRef } from "react"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"

interface MathRendererProps {
  text: string
}

export function MathRenderer({ text }: MathRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Load KaTeX from CDN
  useEffect(() => {
    // Add KaTeX CSS if not already added
    if (!document.querySelector('link[href*="katex.min.css"]')) {
      const linkElement = document.createElement("link")
      linkElement.rel = "stylesheet"
      linkElement.href = "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
      linkElement.integrity = "sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn"
      linkElement.crossOrigin = "anonymous"
      document.head.appendChild(linkElement)
    }

    // Add KaTeX script if not already added
    if (!window.katex) {
      const scriptElement = document.createElement("script")
      scriptElement.defer = true
      scriptElement.src = "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"
      scriptElement.integrity = "sha384-cpW21h6RZv/phavutF+AuVYrr+dA8xD9zs6FwLpaCct6O9ctzYFfFr4dgmgccOTx"
      scriptElement.crossOrigin = "anonymous"
      document.head.appendChild(scriptElement)

      // Add auto-render extension
      const autoRenderScript = document.createElement("script")
      autoRenderScript.defer = true
      autoRenderScript.src = "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"
      autoRenderScript.integrity = "sha384-+VBxd3r6XgURycqtZ117nYw44OOcIax56Z4dCRWbxyPt0Koah1uHoK0o4+/RRE05"
      autoRenderScript.crossOrigin = "anonymous"
      document.head.appendChild(autoRenderScript)
    }

    // Render math in the container
    const renderMath = () => {
      if (containerRef.current && typeof window.renderMathInElement === "function") {
        // @ts-ignore
        window.renderMathInElement(containerRef.current, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\[", right: "\\]", display: true },
            { left: "$$", right: "$$", display: false },
          ],
          throwOnError: false,
        })
      }
    }

    // Try to render math after a short delay to ensure scripts are loaded
    const timer = setTimeout(() => {
      renderMath()
    }, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [text])

  return (
    <div ref={containerRef} className="prose max-w-none math-textbook">
      <ReactMarkdown remarkPlugins={[remarkMath]}>{text}</ReactMarkdown>
    </div>
  )
}
