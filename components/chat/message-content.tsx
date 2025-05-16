"use client"

import { MarkdownRenderer } from "@/components/markdown-renderer"
import { MathRenderer } from "@/components/math-renderer"
import { ScientificResult } from "@/components/scientific-result"
import { FormalMathExposition } from "@/components/formal-math-exposition"
import { formatMathExposition } from "@/lib/format-math-exposition"

interface MessageContentProps {
  content: string
}

export function MessageContent({ content }: MessageContentProps) {
  // Check if content contains math
  const containsMath = /(\$|\\\(|\\\[|\\begin\{)/.test(content)

  // Check if content is likely a formal mathematical exposition
  const isFormalMath =
    /theorem|lemma|proof|equation|integral|derivative|function|matrix|vector|scalar|tensor|space|topology|algebra|calculus|geometry|probability|statistics/i.test(
      content,
    ) && containsMath

  let structured: any = {}
  try {
    structured = JSON.parse(content)
  } catch (e) {
    // fallback to markdown
  }

  if (structured?.summary) {
    return (
      <ScientificResult
        summary={structured.summary}
        equations={structured.equations}
        insight={structured.insight}
        chart={structured.chart}
      />
    )
  }

  if (isFormalMath) {
    // Format the content as a formal math exposition
    const formattedContent = formatMathExposition(content)
    return <FormalMathExposition content={formattedContent} />
  }

  if (containsMath) {
    return <MathRenderer text={content} />
  }

  return <MarkdownRenderer content={content} />
}
