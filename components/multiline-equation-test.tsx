"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

// ✨ Dynamically import MarkdownRenderer so it won't crash at build
const MarkdownRenderer = dynamic(() => import("@/components/markdown-renderer"), { ssr: false })

// ✨ Your examples object (no change needed)
const examples = {
  align: `
# Align Environment
...
\\end{align}
  `,
  gather: `
# Gather Environment
...
\\end{gather}
  `,
  cases: `
# Cases Environment
...
\\end{cases}
  `,
  matrix: `
# Matrix Environments
...
\\end{matrix}
  `,
  split: `
# Split and Multline Environments
...
\\end{multline*}
  `,
  array: `
# Array Environment
...
\\end{array}
  `,
  advanced: `
# Advanced Multi-line Equations
...
\\end{align}
  `
}

export function MultilineEquationTest() {
  const [customEquation, setCustomEquation] = useState(`a &= b + c \\\\
b &= d \\times e \\\\
c &= \\frac{f}{g} + h`)
  const [renderError, setRenderError] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleRenderCustom = () => {
    try {
      if (!customEquation.includes("\\\\")) {
        setRenderError("Your equation should include line breaks (\\\\) for multi-line rendering")
        return
      }
      setRenderError(null)
    } catch (error) {
      setRenderError("Error rendering equation. Please check your LaTeX syntax.")
    }
  }

  if (!isClient) {
    return null // 🛡️ Protect against server-side rendering issues
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Multi-line Equation Environment Test Suite</CardTitle>
          <CardDescription>
            This page tests the rendering of various multi-line equation environments in LaTeX.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="align">
            <TabsList className="grid grid-cols-7 mb-4">
              <TabsTrigger value="align">Align</TabsTrigger>
              <TabsTrigger value="gather">Gather</TabsTrigger>
              <TabsTrigger value="cases">Cases</TabsTrigger>
              <TabsTrigger value="matrix">Matrix</TabsTrigger>
              <TabsTrigger value="split">Split/Multline</TabsTrigger>
              <TabsTrigger value="array">Array</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="align">
              <MarkdownRenderer content={examples.align} />
            </TabsContent>

            <TabsContent value="gather">
              <MarkdownRenderer content={examples.gather} />
            </TabsContent>

            <TabsContent value="cases">
              <MarkdownRenderer content={examples.cases} />
            </TabsContent>

            <TabsContent value="matrix">
              <MarkdownRenderer content={examples.matrix} />
            </TabsContent>

            <TabsContent value="split">
              <MarkdownRenderer content={examples.split} />
            </TabsContent>

            <TabsContent value="array">
              <MarkdownRenderer content={examples.array} />
            </TabsContent>

            <TabsContent value="advanced">
              <MarkdownRenderer content={examples.advanced} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Custom Multi-line Equation Test</CardTitle>
          <CardDescription>Create and test your own multi-line LaTeX equations.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Enter your LaTeX equation content below (without the \\begin{align} and \\end{align} tags):
              </p>
              <Textarea
                value={customEquation}
                onChange={(e) => setCustomEquation(e.target.value)}
                placeholder="a &= b + c \\\\ b &= d \\times e \\\\ c &= \\frac{f}{g} + h"
                className="min-h-[150px] font-mono"
              />
              {renderError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{renderError}</AlertDescription>
                </Alert>
              )}
              <Button onClick={handleRenderCustom}>Render Equation</Button>
            </div>

            <div className="mt-8 p-4 border rounded-md">
              <h3 className="text-lg font-medium mb-4">Preview:</h3>
              <MarkdownRenderer content={`\\begin{align}\n${customEquation}\n\\end{align}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
