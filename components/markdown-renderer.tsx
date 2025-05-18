import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import "katex/dist/katex.min.css"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Safely process the content to handle potential table parsing issues
  const safeContent = content
    // Replace any potentially problematic table syntax
    .replace(/\|(\s*-+\s*\|)+/g, (match) => {
      // Ensure table headers have proper formatting
      return match.replace(/\|\s*-+\s*\|/g, "| --- |")
    })
    // Ensure tables have proper closing
    .replace(/(\|[^\n]*)\n(?!\|)/g, "$1\n\n")

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "")
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
        // Remove boolean attributes that cause React warnings
        ol(props) {
          const safeProps = { ...props }
          if ("ordered" in safeProps) {
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
          if ("checked" in safeProps && typeof safeProps.checked !== "boolean") {
            delete safeProps.checked
          }
          return <li {...safeProps} />
        },
        // Handle table components more safely
        table(props) {
          return <table className="border-collapse my-4 w-full" {...props} />
        },
        thead(props) {
          return <thead className="bg-muted" {...props} />
        },
        tbody(props) {
          return <tbody {...props} />
        },
        tr(props) {
          return <tr className="border-b border-muted" {...props} />
        },
        th(props) {
          return <th className="px-4 py-2 text-left font-medium" {...props} />
        },
        td(props) {
          return <td className="px-4 py-2 border-muted" {...props} />
        },
      }}
    >
      {safeContent}
    </ReactMarkdown>
  )
}
