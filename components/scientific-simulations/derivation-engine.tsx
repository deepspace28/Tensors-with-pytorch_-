"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function DerivationEngine() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showFinalResult, setShowFinalResult] = useState(false)

  const derivationSteps = [
    "\\begin{align} F = ma \\end{align}",
    "\\begin{align} \\vec{F} = m\\vec{a} \\end{align}",
    "\\begin{align} \\vec{F} = m\\frac{d\\vec{v}}{dt} \\end{align}",
    "\\begin{align} \\vec{F} = m\\frac{d^2\\vec{x}}{dt^2} \\end{align}",
    "\\begin{align} \\int \\vec{F} \\cdot d\\vec{x} = \\int m\\frac{d^2\\vec{x}}{dt^2} \\cdot d\\vec{x} \\end{align}",
    "\\begin{align} \\int \\vec{F} \\cdot d\\vec{x} = \\int m\\frac{d\\vec{v}}{dt} \\cdot d\\vec{x} \\end{align}",
    "\\begin{align} \\int \\vec{F} \\cdot d\\vec{x} = \\int m\\vec{v} \\cdot d\\vec{v} \\end{align}",
    "\\begin{align} W = \\int \\vec{F} \\cdot d\\vec{x} = \\frac{1}{2}mv^2 - \\frac{1}{2}mv_0^2 \\end{align}",
    "\\begin{align} W = \\Delta KE \\end{align}",
  ]

  const handleNextStep = () => {
    if (currentStep < derivationSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowFinalResult(true)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setShowFinalResult(false)
  }

  return (
    <Card className="w-full bg-[#282a36] border-[#44475a] text-[#f8f8f2]">
      <CardHeader>
        <CardTitle className="text-[#8be9fd]">Mathematical Derivation Engine</CardTitle>
        <CardDescription className="text-[#6272a4]">Step-by-step derivation of the Work-Energy Theorem</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="min-h-[200px] bg-[#1e1f29] rounded-md p-4 flex items-center justify-center">
            {!showFinalResult ? (
              <div className="text-center">
                <div className="text-[#f1fa8c] mb-4">
                  Step {currentStep + 1} of {derivationSteps.length}
                </div>
                <div className="text-xl text-[#f8f8f2] font-mono">
                  {/* This would use a LaTeX renderer in a real implementation */}
                  <pre className="whitespace-pre-wrap">{derivationSteps[currentStep]}</pre>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-[#50fa7b] mb-4">Final Result</div>
                <div className="text-xl text-[#f8f8f2] font-mono">
                  <pre className="whitespace-pre-wrap">
                    {`\\begin{align}
W = \\Delta KE = \\frac{1}{2}mv^2 - \\frac{1}{2}mv_0^2
\\end{align}`}
                  </pre>
                </div>
                <div className="mt-4 text-[#6272a4]">The work done by a force equals the change in kinetic energy</div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleNextStep}
              disabled={showFinalResult}
              className="bg-[#50fa7b] text-[#282a36] hover:bg-[#50fa7b]/80"
            >
              {currentStep < derivationSteps.length - 1 ? "Next Step" : "Show Final Result"}
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-[#ff79c6] text-[#ff79c6] hover:bg-[#ff79c6]/10"
            >
              Reset
            </Button>
          </div>

          <div className="text-sm text-[#6272a4] mt-4">
            <p>
              This derivation shows how Newton's Second Law (F = ma) leads to the Work-Energy Theorem, demonstrating the
              relationship between work and kinetic energy.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
