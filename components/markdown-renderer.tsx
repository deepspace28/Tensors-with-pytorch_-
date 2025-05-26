"use client"

import { useTheme } from "next-themes"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism"
import "katex/dist/katex.min.css"
import { useEffect, useRef } from "react"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const containerRef = useRef<HTMLDivElement>(null)

  // Apply dark mode styles for KaTeX and render math
  useEffect(() => {
    // Add custom styles for KaTeX in dark mode
    if (isDark) {
      const style = document.createElement("style")
      style.id = "katex-dark-mode"
      style.innerHTML = `
        .katex {
          color: rgba(255, 255, 255, 0.9) !important;
        }
        .katex-display > .katex {
          color: rgba(255, 255, 255, 0.9) !important;
        }
        .katex .mord, .katex .mbin, .katex .mrel, .katex .mopen, .katex .mclose, 
        .katex .mpunct, .katex .minner, .katex .mop {
          color: rgba(255, 255, 255, 0.9) !important;
        }
        .katex .base {
          color: rgba(255, 255, 255, 0.9) !important;
        }
      `
      if (!document.getElementById("katex-dark-mode")) {
        document.head.appendChild(style)
      }
    } else {
      // Remove dark mode styles if theme is light
      const darkModeStyle = document.getElementById("katex-dark-mode")
      if (darkModeStyle) {
        darkModeStyle.remove()
      }
    }

    // Render math manually using KaTeX auto-render
    const renderMath = () => {
      if (containerRef.current && typeof window !== "undefined" && (window as any).renderMathInElement) {
        try {
          ;(window as any).renderMathInElement(containerRef.current, {
            delimiters: [
              { left: "$$", right: "$$", display: true },
              { left: "$", right: "$", display: false },
              { left: "\\[", right: "\\]", display: true },
              { left: "$$", right: "$$", display: false },
              { left: "\\begin{equation}", right: "\\end{equation}", display: true },
              { left: "\\begin{align}", right: "\\end{align}", display: true },
              { left: "\\begin{alignat}", right: "\\end{alignat}", display: true },
              { left: "\\begin{gather}", right: "\\end{gather}", display: true },
              { left: "\\begin{CD}", right: "\\end{CD}", display: true },
              { left: "\\boxed{", right: "}", display: false },
            ],
            throwOnError: false,
            strict: false,
            trust: true,
            macros: {
              "\\eqref": "\\href{#1}{}",
              "\\label": "\\href{#1}{}",
              "\\require": "\\href{#1}{}",
              "\\boxed": "\\fbox{#1}",
              "\\hbar": "\\bar{h}",
              "\\psi": "\\psi",
              "\\phi": "\\phi",
              "\\nabla": "\\nabla",
              "\\partial": "\\partial",
              "\\frac": "\\frac{#1}{#2}",
            },
          })
        } catch (e) {
          console.error("Error rendering math:", e)
        }
      }
    }

    // Try to render math after a delay to ensure content is loaded
    const timeouts = [0, 100, 300, 500]
    timeouts.forEach((delay) => {
      setTimeout(renderMath, delay)
    })

    return () => {
      const darkModeStyle = document.getElementById("katex-dark-mode")
      if (darkModeStyle) {
        darkModeStyle.remove()
      }
    }
  }, [isDark, content])

  // Handle empty or invalid content
  if (!content || typeof content !== "string") {
    return null
  }

  return (
    <div ref={containerRef} className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Code blocks with syntax highlighting
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "")
            const language = match ? match[1] : ""

            if (!inline && match) {
              return (
                <div className="my-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                    {language}
                  </div>
                  <SyntaxHighlighter
                    style={isDark ? oneDark : oneLight}
                    language={language}
                    PreTag="div"
                    className="!m-0 !bg-transparent"
                    customStyle={{
                      margin: 0,
                      padding: "1rem",
                      background: "transparent",
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              )
            }

            // Inline code
            return (
              <code
                className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-mono text-sm"
                {...props}
              >
                {children}
              </code>
            )
          },

          // Headings with proper spacing
          h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-semibold mt-5 mb-3">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-medium mt-4 mb-2">{children}</h3>,

          // Paragraphs with proper spacing
          p: ({ children }) => <p className="mb-4 leading-7">{children}</p>,

          // Lists with proper spacing
          ul: ({ children }) => <ul className="mb-4 ml-6 list-disc space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="mb-4 ml-6 list-decimal space-y-1">{children}</ol>,
          li: ({ children }) => <li className="leading-7">{children}</li>,

          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 italic">
              {children}
            </blockquote>
          ),

          // Tables
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto">
              <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>,
          th: ({ children }) => (
            <th className="px-4 py-2 text-left font-medium border-b border-gray-200 dark:border-gray-700">
              {children}
            </th>
          ),
          td: ({ children }) => <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{children}</td>,

          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),

          // Horizontal rules
          hr: () => <hr className="my-6 border-gray-200 dark:border-gray-700" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
