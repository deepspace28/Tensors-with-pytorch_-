"use client"

import { useState } from "react"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

// Collection of multi-line equation environments
const examples = {
  align: `
# Align Environment

The \`align\` environment is used for aligning multiple equations at specific points, typically at the equals sign.

## Basic Alignment

\\begin{align}
x &= y + z \\\\
x - y &= z
\\end{align}

## Multi-step Derivation

\\begin{align}
(x+y)^3 &= (x+y)^2(x+y) \\\\
&= (x^2 + 2xy + y^2)(x+y) \\\\
&= x^3 + 2x^2y + xy^2 + x^2y + 2xy^2 + y^3 \\\\
&= x^3 + 3x^2y + 3xy^2 + y^3
\\end{align}

## Multiple Alignment Points

\\begin{align}
x &= y &\\quad z &= w \\\\
x^2 &= y^2 &\\quad z^2 &= w^2
\\end{align}

## Align with Numbering

\\begin{align}
E &= mc^2 \\tag{1} \\\\
F &= ma \\tag{2}
\\end{align}

## Align* (Without Numbering)

\\begin{align*}
\\nabla \\times \\vec{E} &= -\\frac{\\partial \\vec{B}}{\\partial t} \\\\
\\nabla \\times \\vec{B} &= \\mu_0\\vec{J} + \\mu_0\\varepsilon_0\\frac{\\partial \\vec{E}}{\\partial t}
\\end{align*}
  `,

  gather: `
# Gather Environment

The \`gather\` environment is used for displaying multiple equations centered on the page without alignment.

## Basic Gather

\\begin{gather}
x = y + z \\\\
a = b + c
\\end{gather}

## Gather with Numbering

\\begin{gather}
E = mc^2 \\tag{1} \\\\
F = ma \\tag{2} \\\\
PV = nRT \\tag{3}
\\end{gather}

## Gather* (Without Numbering)

\\begin{gather*}
\\int_{a}^{b} f(x) \\, dx = F(b) - F(a) \\\\
\\oint_C \\vec{F} \\cdot d\\vec{r} = \\iint_S (\\nabla \\times \\vec{F}) \\cdot \\vec{n} \\, dS
\\end{gather*}

## Long Equations in Gather

\\begin{gather}
\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi} \\\\
\\sum_{n=0}^{\\infty} \\frac{x^n}{n!} = e^x \\\\
\\prod_{i=1}^{n} i = n!
\\end{gather}
  `,

  cases: `
# Cases Environment

The \`cases\` environment is used for piecewise functions and conditional expressions.

## Basic Piecewise Function

\\[ f(x) = 
\\begin{cases} 
x^2 & \\text{if } x \\geq 0 \\\\
-x^2 & \\text{if } x < 0
\\end{cases}
\\]

## Multiple Conditions

\\[ f(x,y) = 
\\begin{cases} 
xy & \\text{if } x > 0, y > 0 \\\\
x+y & \\text{if } x \\leq 0, y > 0 \\\\
0 & \\text{if } y \\leq 0
\\end{cases}
\\]

## Nested Cases

\\[ f(x) = 
\\begin{cases} 
x^2 & \\text{if } x > 0 \\\\
0 & \\text{if } x = 0 \\\\
\\begin{cases}
-x & \\text{if } x > -5 \\\\
-5 & \\text{if } x \\leq -5
\\end{cases} & \\text{if } x < 0
\\end{cases}
\\]

## Cases with Alignment

\\[ \\left.
\\begin{aligned}
B'&=-\\nabla \\times E \\\\
E'&=\\nabla \\times B - 4\\pi j
\\end{aligned}
\\right\\}
\\quad \\text{Maxwell's equations}
\\]
  `,

  matrix: `
# Matrix Environments

LaTeX offers several environments for displaying matrices with different delimiters.

## Basic Matrix (No Delimiters)

\\begin{matrix}
a & b & c \\\\
d & e & f \\\\
g & h & i
\\end{matrix}

## Parentheses Matrix

\\begin{pmatrix}
a & b & c \\\\
d & e & f \\\\
g & h & i
\\end{pmatrix}

## Bracket Matrix

\\begin{bmatrix}
a & b & c \\\\
d & e & f \\\\
g & h & i
\\end{bmatrix}

## Brace Matrix

\\begin{Bmatrix}
a & b & c \\\\
d & e & f \\\\
g & h & i
\\end{Bmatrix}

## Vertical Bar Matrix

\\begin{vmatrix}
a & b & c \\\\
d & e & f \\\\
g & h & i
\\end{vmatrix}

## Double Vertical Bar Matrix

\\begin{Vmatrix}
a & b & c \\\\
d & e & f \\\\
g & h & i
\\end{Vmatrix}

## Augmented Matrix

\\left[
\\begin{array}{ccc|c}
1 & 0 & 0 & a \\\\
0 & 1 & 0 & b \\\\
0 & 0 & 1 & c
\\end{array}
\\right]

## Block Matrix

\\begin{bmatrix}
A & B \\\\
C & D
\\end{bmatrix}
\\quad \\text{where} \\quad
A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}
  `,

  split: `
# Split and Multline Environments

The \`split\` environment is used within an equation environment for breaking and aligning long equations.
The \`multline\` environment is used for splitting long equations across multiple lines.

## Split Environment

\\begin{equation}
\\begin{split}
(x+y)^5 &= (x+y)^4(x+y) \\\\
&= (x^4 + 4x^3y + 6x^2y^2 + 4xy^3 + y^4)(x+y) \\\\
&= x^5 + 5x^4y + 10x^3y^2 + 10x^2y^3 + 5xy^4 + y^5
\\end{split}
\\end{equation}

## Multline Environment

\\begin{multline}
x = a + b + c + d + e + f + g + h + i + j + k + l + m + n + o + p + q + r + s + t + u + v + w + x + y + z \\\\
+ 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 + 11 + 12 + 13 + 14 + 15
\\end{multline}

## Multline* Environment (Without Numbering)

\\begin{multline*}
\\frac{1}{(1-x)(1-x^2)(1-x^3)(1-x^4)} = \\\\
1 + x + 2x^2 + 3x^3 + 5x^4 + 7x^5 + 11x^6 + 15x^7 + 22x^8 + \\cdots
\\end{multline*}
  `,

  array: `
# Array Environment

The \`array\` environment is used for creating custom arrays and tables within math mode.

## Basic Array

\\[
\\begin{array}{lcr}
\\text{Left} & \\text{Center} & \\text{Right} \\\\
1 & 2 & 3 \\\\
4 & 5 & 6
\\end{array}
\\]

## Array with Vertical Lines

\\[
\\begin{array}{c|c|c}
\\text{Column 1} & \\text{Column 2} & \\text{Column 3} \\\\
\\hline
a & b & c \\\\
d & e & f
\\end{array}
\\]

## Array for Systems of Equations

\\[
\\left\\{
\\begin{array}{rcl}
x + y + z &=& 1 \\\\
2x - y + z &=& 2 \\\\
x + 2y - z &=& 3
\\end{array}
\\right.
\\]

## Custom Delimiters with Array

\\[
\\left(
\\begin{array}{ccc}
a_{11} & \\cdots & a_{1n} \\\\
\\vdots & \\ddots & \\vdots \\\\
a_{m1} & \\cdots & a_{mn}
\\end{array}
\\right)
\\]
  `,

  subequations: `
# Subequations Environment

The \`subequations\` environment is used for grouping related equations with hierarchical numbering.

## Basic Subequations

\\begin{subequations}
\\begin{align}
f(x) &= x^2 \\tag{1a} \\\\
g(x) &= \\frac{1}{x} \\tag{1b} \\\\
h(x) &= \\sqrt{x} \\tag{1c}
\\end{align}
\\end{subequations}

## Maxwell's Equations as Subequations

\\begin{subequations}
\\begin{align}
\\nabla \\cdot \\vec{E} &= \\frac{\\rho}{\\varepsilon_0} \\tag{2a} \\\\
\\nabla \\cdot \\vec{B} &= 0 \\tag{2b} \\\\
\\nabla \\times \\vec{E} &= -\\frac{\\partial \\vec{B}}{\\partial t} \\tag{2c} \\\\
\\nabla \\times \\vec{B} &= \\mu_0\\vec{J} + \\mu_0\\varepsilon_0\\frac{\\partial \\vec{E}}{\\partial t} \\tag{2d}
\\end{align}
\\end{subequations}
  `,

  advanced: `
# Advanced Multi-line Equations

This section demonstrates complex combinations of multi-line environments.

## Aligned Equations with Cases

\\begin{align}
f(x,y) &= 
\\begin{cases} 
\\frac{x^2 + y^2}{x^2 - y^2} & \\text{if } x^2 \\neq y^2 \\\\[1ex]
\\frac{2xy}{\\varepsilon} & \\text{if } x^2 = y^2 \\neq 0 \\\\[1ex]
\\text{undefined} & \\text{if } x = y = 0
\\end{cases} \\\\
g(x,y) &= \\frac{\\partial f}{\\partial x} + \\frac{\\partial f}{\\partial y}
\\end{align}

## Nested Environments

\\begin{align}
S &= \\sum_{i=1}^{n} \\left( \\prod_{j=1}^{m} a_{ij} \\right) \\\\
&= \\sum_{i=1}^{n} \\left( 
   \\begin{pmatrix}
   a_{i1} & a_{i2} & \\cdots & a_{im}
   \\end{pmatrix}
   \\begin{pmatrix}
   1 \\\\ 1 \\\\ \\vdots \\\\ 1
   \\end{pmatrix}
   \\right)
\\end{align}

## Equation Arrays with Alignment

\\begin{array}{rcll}
(x+y)^2 &=& (x+y)(x+y) \\\\
&=& x(x+y) + y(x+y) \\\\
&=& x^2 + xy + yx + y^2 \\\\
&=& x^2 + 2xy + y^2
\\end{array}

## Complex Derivation with Multiple Environments

\\begin{align}
\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx &= \\left( \\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx \\right)^{1/2} \\left( \\int_{-\\infty}^{\\infty} e^{-y^2} \\, dy \\right)^{1/2} \\\\
&= \\left( \\int_{-\\infty}^{\\infty} \\int_{-\\infty}^{\\infty} e^{-(x^2 + y^2)} \\, dx \\, dy \\right)^{1/2} \\\\
&= \\left( \\int_{0}^{2\\pi} \\int_{0}^{\\infty} e^{-r^2} r \\, dr \\, d\\theta \\right)^{1/2} \\\\
&= \\left( 2\\pi \\int_{0}^{\\infty} e^{-r^2} r \\, dr \\right)^{1/2} \\\\
&= \\left( 2\\pi \\cdot \\frac{1}{2} \\right)^{1/2} \\\\
&= \\sqrt{\\pi}
\\end{align}
  `,

  custom: `
# Custom Multi-line Equation Test

Enter your own multi-line LaTeX equation below to test the rendering.

\\begin{align}
\\end{align}
  `,
}

export function MultilineEquationTest() {
  const [customEquation, setCustomEquation] = useState(`a &= b + c \\\\
b &= d \\times e \\\\
c &= \\frac{f}{g} + h`)
  const [renderError, setRenderError] = useState<string | null>(null)

  const handleRenderCustom = () => {
    try {
      // Simple validation
      if (!customEquation.includes("\\\\")) {
        setRenderError("Your equation should include line breaks (\\\\) for multi-line rendering")
        return
      }
      setRenderError(null)
    } catch (error) {
      setRenderError("Error rendering equation. Please check your LaTeX syntax.")
    }
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
                Enter your LaTeX equation content below (without the \begin{align} and \end{align} tags):
              </p>
              <Textarea
                value={customEquation}
                onChange={(e) => setCustomEquation(e.target.value)}
                placeholder="a &= b + c \\ b &= d \times e \\ c &= \frac{f}{g} + h"
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
