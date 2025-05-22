import { remark } from "remark"
import remarkMath from "remark-math"
import remarkRehype from "remark-rehype"
import rehypeKatex from "rehype-katex"
import rehypeStringify from "rehype-stringify"

export async function processMathInMarkdown(content: string): Promise<string> {
  // Pre-process content to ensure LaTeX equations are properly delimited
  let processedContent = content

  // Fix common LaTeX issues
  processedContent = processedContent
    .replace(/\\hbar\}/g, "\\hbar")
    .replace(/\\partial\\/g, "\\partial ")
    .replace(/\\\\/g, "\\")

  // Check for LaTeX commands that need proper wrapping
  const latexRegex = /\\[a-zA-Z]+{.*?}|\\[a-zA-Z]+\^[0-9]|\\nabla|\\mathbf|\\frac|\\partial|\\hbar/g

  if (latexRegex.test(processedContent)) {
    // Process line by line for better control
    const lines = processedContent.split("\n")
    const processedLines = lines.map((line) => {
      // If line contains LaTeX commands but no delimiters
      if (latexRegex.test(line) && !line.includes("$$")) {
        // Check if it's a standalone equation (starts with common equation patterns)
        if (
          line.trim().startsWith("i \\hbar") ||
          line.trim().startsWith("\\frac") ||
          line.trim().startsWith("-\\frac")
        ) {
          return `$$${line}$$`
        }

        // Otherwise, wrap individual LaTeX commands
        return line.replace(latexRegex, (match) => {
          // Only wrap if not already in delimiters
          const beforeMatch = line.substring(0, line.indexOf(match))
          const afterMatch = line.substring(line.indexOf(match) + match.length)

          // Check if already in delimiters
          if (beforeMatch.includes("$$") && afterMatch.includes("$$")) {
            return match
          }

          return `$$${match}$$`
        })
      }
      return line
    })

    processedContent = processedLines.join("\n")
  }

  // Process with remark/rehype
  const result = await remark()
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex, {
      throwOnError: false,
      strict: false,
      trust: true,
      macros: {
        "\\f": "f(#1)",
        "\\hbar": "\\h",
      },
    })
    .use(rehypeStringify)
    .process(processedContent)

  return result.toString()
}
