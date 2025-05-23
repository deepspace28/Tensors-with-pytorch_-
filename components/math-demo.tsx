"use client"

import { useState } from "react"
import { MarkdownRenderer } from "./markdown-renderer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const EXAMPLE_EQUATIONS = [
  "$$\\psi(t) = e^{-i\\hat{H}t/\\hbar} \\psi(0)$$",
  "$$E = mc^2$$",
  "$$\\nabla \\times \\vec{\\mathbf{B}} = \\mu_0\\vec{\\mathbf{J}} + \\mu_0\\epsilon_0\\frac{\\partial\\vec{\\mathbf{E}}}{\\partial t}$$",
  "$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$",
  "The Schrödinger equation: $i\\hbar\\frac{\\partial}{\\partial t}\\Psi(\\mathbf{r},t) = \\hat H\\Psi(\\mathbf{r},t)$",
  "$$P(A|B) = \\frac{P(B|A)P(A)}{P(B)}$$",
  "$$\\frac{d}{dx}\\left( \\int_{a(x)}^{b(x)} f(t,x) dt \\right) = f(b(x),x) \\frac{d}{dx}b(x) - f(a(x),x)\\frac{d}{dx}a(x) + \\int_{a(x)}^{b(x)} \\frac{\\partial f}{\\partial x}(t,x) dt$$",
]

export function MathDemo() {
  const [markdown, setMarkdown] = useState(EXAMPLE_EQUATIONS.join("\n\n"))

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Math Rendering Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="markdown-input" className="text-sm font-medium">
              Enter LaTeX or Markdown with Math:
            </label>
            <Textarea
              id="markdown-input"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="min-h-[200px] font-mono"
            />
          </div>

          <div className="flex gap-2">
            {EXAMPLE_EQUATIONS.slice(0, 3).map((eq, i) => (
              <Button key={i} variant="outline" size="sm" onClick={() => setMarkdown(eq)}>
                Example {i + 1}
              </Button>
            ))}
          </div>

          <div className="border rounded-lg p-4 bg-white dark:bg-gray-950">
            <h3 className="text-lg font-medium mb-4">Rendered Output:</h3>
            <MarkdownRenderer content={markdown} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
