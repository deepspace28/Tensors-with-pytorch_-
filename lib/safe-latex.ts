/**
 * Helper function to safely render LaTeX expressions in JSX
 * This avoids issues with backslashes and special characters
 *
 * @param latex The LaTeX expression to render
 * @returns A safe string for rendering in JSX
 */
export function safeLatex(latex: string): string {
  // Replace backslashes with double backslashes for JSX
  return latex.replace(/\\/g, "\\\\")
}

/**
 * Wraps a LaTeX expression in dollar signs for display
 *
 * @param latex The LaTeX expression to wrap
 * @returns The wrapped LaTeX expression
 */
export function inlineMath(latex: string): string {
  return `$${safeLatex(latex)}$`
}

/**
 * Wraps a LaTeX expression in double dollar signs for display math
 *
 * @param latex The LaTeX expression to wrap
 * @returns The wrapped LaTeX expression
 */
export function displayMath(latex: string): string {
  return `$$${safeLatex(latex)}$$`
}
