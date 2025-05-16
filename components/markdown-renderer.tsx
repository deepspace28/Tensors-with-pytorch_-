"use client"
import ReactMarkdown from "react-markdown"
import React from "react"

import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import { cn } from "@/lib/utils"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn("prose prose-invert max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        components={{
          // Override default components for better styling
          h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-5 mb-3" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2" {...props} />,
          p: ({ node, children, ...props }) => {
            // Check if children contains a pre element or code block
            const hasCodeBlock = React.Children.toArray(children).some(
              (child) =>
                React.isValidElement(child) &&
                ((child.type === "code" && child.props.className?.includes("language-")) ||
                  child.props.node?.type === "code" ||
                  child.props.node?.tagName === "code"),
            )

            // If it has a code block, don't wrap in a paragraph
            if (hasCodeBlock) {
              return <>{children}</>
            }

            // Otherwise render as a paragraph without any predetermined intro
            return (
              <p className="mb-4 leading-relaxed" {...props}>
                {children}
              </p>
            )
          },
          ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "")

            // For inline code
            if (inline) {
              return (
                <code className="bg-gray-800 px-1 py-0.5 rounded text-sm" {...props}>
                  {children}
                </code>
              )
            }

            // For code blocks
            return (
              <div className="not-prose">
                <pre className="p-4 bg-gray-900 rounded-md overflow-x-auto mb-4">
                  <code className={cn("text-sm", match && `language-${match[1]}`)} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            )
          },
          pre: ({ node, children, ...props }) => {
            // Return children directly to avoid nesting pre tags
            return <>{children}</>
          },
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-gray-700 pl-4 italic text-gray-400 mb-4" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full divide-y divide-gray-700" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => <thead className="bg-gray-800" {...props} />,
          tbody: ({ node, ...props }) => <tbody className="divide-y divide-gray-800" {...props} />,
          tr: ({ node, ...props }) => <tr className="hover:bg-gray-800/50" {...props} />,
          th: ({ node, ...props }) => (
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-300" {...props} />
          ),
          td: ({ node, ...props }) => <td className="px-4 py-2 text-sm" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
