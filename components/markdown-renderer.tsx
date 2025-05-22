import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { MathRenderer } from "./math-renderer"
import "katex/dist/katex.min.css"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Pre-process content to properly handle LaTeX equations
  const processedContent = preprocessLatex(content)

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "")

          // Handle LaTeX code blocks
          if ((match && match[1] === "math") || (match && match[1] === "latex")) {
            return <MathRenderer text={String(children).replace(/\n$/, "")} displayMode={true} />
          }

          // Handle inline LaTeX
          if (inline && String(children).startsWith("$") && String(children).endsWith("$")) {
            return <MathRenderer text={String(children).slice(1, -1)} displayMode={false} />
          }

          // Regular code blocks
          return !inline && match ? (
            <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div" {...props}>
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
        // Fix for the ordered attribute issue
        ol({ ordered, ...props }) {
          const safeProps = { ...props }
          if (ordered !== undefined) {
            delete safeProps.ordered
          }
          return <ol {...safeProps} />
        },
        ul(props) {
          const safeProps = { ...props }
          if ("ordered" in safeProps) {
            delete safeProps.ordered
          }
          return <ul {...safeProps} />
        },
        li(props) {
          const safeProps = { ...props }
          if ("ordered" in safeProps) {
            delete safeProps.ordered
          }
          return <li {...safeProps} />
        },
        // Handle LaTeX equations wrapped in $$ delimiters
        p({ children }) {
          const childArray = React.Children.toArray(children)

          // Check if paragraph contains LaTeX equation
          if (childArray.length === 1 && typeof childArray[0] === "string") {
            const text = childArray[0] as string
            if (text.startsWith("$$") && text.endsWith("$$")) {
              return <MathRenderer text={text.slice(2, -2)} displayMode={true} />
            }
          }

          return <p>{children}</p>
        },
      }}
    >
      {processedContent}
    </ReactMarkdown>
  )
}

// Function to preprocess LaTeX in content
function preprocessLatex(content: string): string {
  const processedContent = content

  // Fix common LaTeX patterns that might be causing issues
  const fixLatexPatterns = (text: string) => {
    // Replace raw LaTeX patterns that might be causing issues
    return (
      text
        // Fix common LaTeX commands that might be causing issues
        .replace(/\\hbar\}/g, "\\hbar")
        .replace(/\\partial\\/g, "\\partial ")
        .replace(/\\\\/g, "\\")

        // Ensure proper spacing in LaTeX expressions
        .replace(/([^\\])\}/g, "$1 }")
        .replace(/\{([^\\])/g, "{ $1")

        // Ensure LaTeX equations are properly wrapped in $$ delimiters
        .replace(/(?<!\$)(\\frac|\\partial|\\hbar|\\nabla|\\mathbf)(?!\$)/g, "$$$$1")
        .replace(/(?<!\$)([^$]*)(?:\$\$)([^$]*)(?!\$)/g, "$$$$1$$2$$")
    )
  }

  // Process content line by line
  const lines = processedContent.split("\n")
  const processedLines = lines.map((line) => {
    // Check if line contains LaTeX-like content but isn't properly wrapped
    if (
      (line.includes("\\") || line.includes("\\frac") || line.includes("\\partial") || line.includes("\\hbar")) &&
      !line.includes("$$")
    ) {
      // Wrap the entire line in $$ if it looks like a standalone equation
      if (line.trim().startsWith("i \\hbar") || line.trim().startsWith("\\frac") || line.trim().startsWith("-\\frac")) {
        return `$$${fixLatexPatterns(line)}$$`
      }

      // Otherwise, fix LaTeX patterns in the line
      return fixLatexPatterns(line)
    }
    return line
  })

  return processedLines.join("\n")
}
