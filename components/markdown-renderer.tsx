"use client"

import { useTheme } from "next-themes"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism"
import "katex/dist/katex.min.css"
import { useEffect } from "react"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Apply dark mode styles for KaTeX
  useEffect(() => {
    // Add custom styles for KaTeX in dark mode
    if (isDark) {
      const style = document.createElement("style")
      style.id = "katex-dark-mode"
      style.innerHTML = `
        .katex {
          color: rgba(255, 255, 255, 0.9);
        }
        .katex-display > .katex {
          color: rgba(255, 255, 255, 0.9);
        }
        .katex .mord, .katex .mbin, .katex .mrel, .katex .mopen, .katex .mclose, 
        .katex .mpunct, .katex .minner, .katex .mop {
          color: rgba(255, 255, 255, 0.9);
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

    return () => {
      const darkModeStyle = document.getElementById("katex-dark-mode")
      if (darkModeStyle) {
        darkModeStyle.remove()
      }
    }
  }, [isDark])

  return (
    <div className={`markdown-content ${className}`}>
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
              <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-sm" {...props}>
                {children}
              </code>
            )
          },

          // Math blocks
          math({ value }) {
            return (
              <div className="my-4 py-2 overflow-x-auto">
                <div className="katex-display">{value}</div>
              </div>
            )
          },

          // Inline math
          inlineMath({ value }) {
            return <span className="katex-inline">{value}</span>
          },

          // Headings with minimal styling
          h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-semibold mt-5 mb-3">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-medium mt-4 mb-2">{children}</h3>,

          // Paragraphs with minimal styling
          p: ({ children }) => <p className="mb-4 leading-7">{children}</p>,

          // Lists with minimal styling
          ul: ({ children }) => <ul className="mb-4 ml-6 list-disc space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="mb-4 ml-6 list-decimal space-y-1">{children}</ol>,
          li: ({ children }) => <li className="leading-7">{children}</li>,

          // Blockquotes with minimal styling
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 italic">
              {children}
            </blockquote>
          ),

          // Tables with minimal styling
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

          // Links with minimal styling
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

          // Horizontal rules with minimal styling
          hr: () => <hr className="my-6 border-gray-200 dark:border-gray-700" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
