export function formatMathExposition(content: string): string {
  // Check if content already has formal math formatting
  if (content.includes("**Statement:**") || content.includes("**Construction:**") || content.includes("**Proof:**")) {
    return content
  }

  // Extract any existing math expressions
  const mathExpressions: string[] = []
  const mathRegex = /\$\$(.*?)\$\$|\$(.*?)\$/gs
  let match

  while ((match = mathRegex.exec(content)) !== null) {
    mathExpressions.push(match[0])
  }

  // Determine if this is a mathematical content
  const isMathContent =
    mathExpressions.length > 0 ||
    /theorem|lemma|proof|equation|integral|derivative|function|matrix|vector|scalar|tensor|space|topology|algebra|calculus|geometry|probability|statistics/i.test(
      content,
    )

  if (!isMathContent) {
    return content
  }

  // Format the content in the requested style
  let formattedContent = content

  // Add statement section if not present
  if (!formattedContent.includes("**Statement:**")) {
    formattedContent = "**Statement:**\n\n" + formattedContent
  }

  // Ensure display math is properly formatted
  formattedContent = formattedContent.replace(/\$\$(.*?)\$\$/gs, (match, p1) => {
    return `\n$$\n${p1.trim()}\n$$\n`
  })

  // Ensure inline math is properly formatted
  formattedContent = formattedContent.replace(/\$(.*?)\$/g, (match, p1) => {
    if (match.startsWith("$$")) return match // Skip if it's display math
    return `$${p1.trim()}$`
  })

  // Format numbered lists
  formattedContent = formattedContent.replace(/(\d+\.\s+)/g, "\n$1")

  return formattedContent
}
