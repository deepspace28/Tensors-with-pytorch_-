"use client"

import { useEffect, useRef } from "react"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"

interface MathRendererProps {
  text: string
}

export function MathRenderer({ text }: MathRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Load and initialize KaTeX
  useEffect(() => {
    // Check if the text contains math delimiters
    const containsMath = /(\$|\\\(|\\\[|\\begin\{)/.test(text)

    if (!containsMath) {
      return // Don't load KaTeX if no math is detected
    }

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
            { left: "\\[", right: "\\]", display: true },
            { left: "$$", right: "$$", display: false },
            { left: "\\begin{align}", right: "\\end{align}", display: true },
            { left: "\\begin{equation}", right: "\\end{equation}", display: true },
            { left: "\\begin{matrix}", right: "\\end{matrix}", display: true },
            { left: "\\begin{pmatrix}", right: "\\end{pmatrix}", display: true },
            { left: "\\begin{bmatrix}", right: "\\end{bmatrix}", display: true },
          ],
          throwOnError: false,
          output: "html",
          trust: true,
          strict: false,
          macros: {
            "\\mathcal": "\\mathcal",
            "\\otimes": "\\otimes",
            "\\rho": "\\rho",
            "\\psi": "\\psi",
            "\\phi": "\\phi",
          },
        })
      }
    }

    loadKaTeX()
  }, [text])

  return (
    <div ref={containerRef} className="prose prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkMath]}>{text}</ReactMarkdown>
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
