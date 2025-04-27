"use client"

import { useState } from "react"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

// Collection of complex LaTeX examples
const examples = {
  calculus: `
# Calculus Examples

## Derivatives and Integrals

The definition of a derivative:

\\[ f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h} \\]

A complex integral with multiple variables:

\\[ \\int_{0}^{\\infty} \\int_{0}^{\\infty} e^{-(x^2 + y^2)} \\, dx \\, dy = \\frac{\\pi}{4} \\]

The Fundamental Theorem of Calculus:

\\[ \\int_{a}^{b} f'(x) \\, dx = f(b) - f(a) \\]

## Vector Calculus

The divergence theorem:

\\[ \\oint_S \\vec{F} \\cdot \\vec{n} \\, dS = \\int_V \\nabla \\cdot \\vec{F} \\, dV \\]

Stokes' theorem:

\\[ \\oint_C \\vec{F} \\cdot d\\vec{r} = \\int_S (\\nabla \\times \\vec{F}) \\cdot \\vec{n} \\, dS \\]
  `,

  linearAlgebra: `
# Linear Algebra Examples

## Matrices and Determinants

A 3×3 matrix:

\\[ A = \\begin{pmatrix} 
a_{11} & a_{12} & a_{13} \\\\
a_{21} & a_{22} & a_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{pmatrix} \\]

The determinant formula for a 3×3 matrix:

\\[ \\det(A) = a_{11}(a_{22}a_{33} - a_{23}a_{32}) - a_{12}(a_{21}a_{33} - a_{23}a_{31}) + a_{13}(a_{21}a_{32} - a_{22}a_{31}) \\]

## Eigenvalues and Eigenvectors

The characteristic equation:

\\[ \\det(A - \\lambda I) = 0 \\]

The eigenvalue problem:

\\[ A\\vec{v} = \\lambda\\vec{v} \\]

## Matrix Decompositions

Singular Value Decomposition (SVD):

\\[ A = U\\Sigma V^T \\]

Where:
- $U$ is an $m \\times m$ orthogonal matrix
- $\\Sigma$ is an $m \\times n$ diagonal matrix with non-negative real numbers
- $V^T$ is the transpose of an $n \\times n$ orthogonal matrix
  `,

  quantumMechanics: `
# Quantum Mechanics Examples

## Schrödinger Equation

The time-dependent Schrödinger equation:

\\[ i\\hbar \\frac{\\partial}{\\partial t}\\Psi(\\mathbf{r},t) = \\left [ -\\frac{\\hbar^2}{2m}\\nabla^2 + V(\\mathbf{r},t)\\right ] \\Psi(\\mathbf{r},t) \\]

The time-independent Schrödinger equation:

\\[ -\\frac{\\hbar^2}{2m}\\nabla^2\\psi(\\mathbf{r}) + V(\\mathbf{r})\\psi(\\mathbf{r}) = E\\psi(\\mathbf{r}) \\]

## Quantum Operators

The position operator in the momentum representation:

\\[ \\hat{x} = i\\hbar\\frac{\\partial}{\\partial p} \\]

The momentum operator in the position representation:

\\[ \\hat{p} = -i\\hbar\\frac{\\partial}{\\partial x} \\]

## Dirac Notation

The expectation value of an operator:

\\[ \\langle \\hat{A} \\rangle = \\langle \\psi | \\hat{A} | \\psi \\rangle = \\int \\psi^*(x) \\hat{A} \\psi(x) \\, dx \\]

The completeness relation:

\\[ \\sum_n |n\\rangle\\langle n| = I \\]
  `,

  statistics: `
# Statistics and Probability Examples

## Probability Distributions

The normal distribution probability density function:

\\[ f(x | \\mu, \\sigma^2) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}} \\]

The binomial probability mass function:

\\[ P(X = k) = {n \\choose k} p^k (1-p)^{n-k} \\]

Where the binomial coefficient is:

\\[ {n \\choose k} = \\frac{n!}{k!(n-k)!} \\]

## Statistical Inference

The maximum likelihood estimator:

\\[ \\hat{\\theta}_{\\text{MLE}} = \\arg\\max_{\\theta} \\prod_{i=1}^{n} f(x_i|\\theta) \\]

Or equivalently:

\\[ \\hat{\\theta}_{\\text{MLE}} = \\arg\\max_{\\theta} \\sum_{i=1}^{n} \\log f(x_i|\\theta) \\]

## Bayesian Statistics

Bayes' theorem:

\\[ P(A|B) = \\frac{P(B|A)P(A)}{P(B)} \\]

The posterior distribution:

\\[ p(\\theta|\\mathbf{x}) = \\frac{p(\\mathbf{x}|\\theta)p(\\theta)}{p(\\mathbf{x})} \\propto p(\\mathbf{x}|\\theta)p(\\theta) \\]
  `,

  multilineEquations: `
# Multi-line Equations

## Aligned Equations

The quadratic formula derivation:

\\begin{align}
ax^2 + bx + c &= 0 \\\\
ax^2 + bx &= -c \\\\
x^2 + \\frac{b}{a}x &= -\\frac{c}{a} \\\\
x^2 + \\frac{b}{a}x + \\left(\\frac{b}{2a}\\right)^2 &= -\\frac{c}{a} + \\left(\\frac{b}{2a}\\right)^2 \\\\
\\left(x + \\frac{b}{2a}\\right)^2 &= \\frac{b^2 - 4ac}{4a^2} \\\\
x + \\frac{b}{2a} &= \\pm\\frac{\\sqrt{b^2 - 4ac}}{2a} \\\\
x &= -\\frac{b}{2a} \\pm \\frac{\\sqrt{b^2 - 4ac}}{2a} \\\\
x &= \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
\\end{align}

## Cases

The absolute value function:

\\[ |x| = 
\\begin{cases} 
x & \\text{if } x \\geq 0 \\\\
-x & \\text{if } x < 0
\\end{cases}
\\]

The sign function:

\\[ \\text{sgn}(x) = 
\\begin{cases} 
1 & \\text{if } x > 0 \\\\
0 & \\text{if } x = 0 \\\\
-1 & \\text{if } x < 0
\\end{cases}
\\]
  `,

  customEquation: `
# Custom Equation Test

Enter your own LaTeX equation below to test the rendering.

\\[ \\]
  `,
}

export function LatexTestComplex() {
  const [customEquation, setCustomEquation] = useState("E = mc^2")

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>LaTeX Rendering Test Suite</CardTitle>
          <CardDescription>
            This page tests the rendering of complex LaTeX equations using the MarkdownRenderer component.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculus">
            <TabsList className="grid grid-cols-6 mb-4">
              <TabsTrigger value="calculus">Calculus</TabsTrigger>
              <TabsTrigger value="linearAlgebra">Linear Algebra</TabsTrigger>
              <TabsTrigger value="quantumMechanics">Quantum Mechanics</TabsTrigger>
              <TabsTrigger value="statistics">Statistics</TabsTrigger>
              <TabsTrigger value="multilineEquations">Multi-line</TabsTrigger>
              <TabsTrigger value="customEquation">Custom</TabsTrigger>
            </TabsList>

            <TabsContent value="calculus">
              <MarkdownRenderer content={examples.calculus} />
            </TabsContent>

            <TabsContent value="linearAlgebra">
              <MarkdownRenderer content={examples.linearAlgebra} />
            </TabsContent>

            <TabsContent value="quantumMechanics">
              <MarkdownRenderer content={examples.quantumMechanics} />
            </TabsContent>

            <TabsContent value="statistics">
              <MarkdownRenderer content={examples.statistics} />
            </TabsContent>

            <TabsContent value="multilineEquations">
              <MarkdownRenderer content={examples.multilineEquations} />
            </TabsContent>

            <TabsContent value="customEquation">
              <div className="space-y-4">
                <Textarea
                  value={customEquation}
                  onChange={(e) => setCustomEquation(e.target.value)}
                  placeholder="Enter LaTeX equation here..."
                  className="min-h-[100px] font-mono"
                />
                <Button onClick={() => setCustomEquation(customEquation)}>Render Equation</Button>
                <div className="mt-8 p-4 border rounded-md">
                  <MarkdownRenderer content={`\\[ ${customEquation} \\]`} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Inline LaTeX Test</CardTitle>
          <CardDescription>Testing inline LaTeX equations within paragraphs of text.</CardDescription>
        </CardHeader>
        <CardContent>
          <MarkdownRenderer
            content={`
In physics, the famous equation $E = mc^2$ relates energy ($E$) to mass ($m$) multiplied by the speed of light ($c$) squared.

The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse equals the sum of the squares of the other two sides: $a^2 + b^2 = c^2$.

The quadratic formula $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ gives the solutions to the quadratic equation $ax^2 + bx + c = 0$.

Maxwell's equations in differential form are:
$\\nabla \\cdot \\vec{E} = \\frac{\\rho}{\\varepsilon_0}$
$\\nabla \\cdot \\vec{B} = 0$
$\\nabla \\times \\vec{E} = -\\frac{\\partial \\vec{B}}{\\partial t}$
$\\nabla \\times \\vec{B} = \\mu_0\\vec{J} + \\mu_0\\varepsilon_0\\frac{\\partial \\vec{E}}{\\partial t}$
          `}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Edge Cases</CardTitle>
          <CardDescription>Testing potentially problematic LaTeX expressions.</CardDescription>
        </CardHeader>
        <CardContent>
          <MarkdownRenderer
            content={`
## Very Large Expressions

\\[ \\sum_{i=1}^{n} \\sum_{j=1}^{n} \\sum_{k=1}^{n} \\sum_{l=1}^{n} a_{ijkl} \\cdot \\prod_{m=1}^{n} \\int_{0}^{\\infty} f_m(x) \\, dx \\]

## Nested Fractions

\\[ \\frac{1}{1 + \\frac{1}{1 + \\frac{1}{1 + \\frac{1}{1 + x}}}} \\]

## Complex Subscripts and Superscripts

\\[ X^{2^{2^{2^{2}}}} \\]

\\[ X_{1_{2_{3_{4}}}} \\]

## Mixed Environments

\\begin{align}
f(x) &= \\begin{cases}
x^2 & \\text{if } x > 0 \\\\
\\int_{-\\infty}^{x} e^{-t^2} \\, dt & \\text{if } x \\leq 0
\\end{cases} \\\\
&= \\sum_{n=0}^{\\infty} \\frac{x^n}{n!}
\\end{align}
          `}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Additional Tests</CardTitle>
          <CardDescription>Explore more specialized LaTeX rendering tests.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/multiline-equation-test">Test Multi-line Equation Environments</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
