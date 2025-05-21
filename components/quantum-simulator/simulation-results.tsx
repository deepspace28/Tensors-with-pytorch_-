"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { QuantumSimulationResult } from "@/lib/quantum-simulator-api"
import { Button } from "@/components/ui/button"
import { Download, Copy, Check } from "lucide-react"

interface SimulationResultsProps {
  result: QuantumSimulationResult | null
}

export function SimulationResults({ result }: SimulationResultsProps) {
  const [activeTab, setActiveTab] = useState("steps")
  const [copied, setCopied] = useState(false)

  if (!result) {
    return null
  }

  // Handle error case
  if (result.error) {
    return (
      <Card className="w-full mt-6 border-red-300">
        <CardHeader className="bg-red-50 dark:bg-red-900/20">
          <CardTitle className="text-red-600 dark:text-red-400">Simulation Error</CardTitle>
          <CardDescription>There was an error running the quantum simulation</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-md text-red-600 dark:text-red-400">
            {result.error}
          </div>
        </CardContent>
      </Card>
    )
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadResults = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "quantum-simulation-results.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Format complex number for display
  const formatComplex = (complex: { real: number; imag: number }) => {
    const real = complex.real.toFixed(4).replace(/\.?0+$/, "")
    const imag = complex.imag.toFixed(4).replace(/\.?0+$/, "")

    if (complex.real === 0 && complex.imag === 0) return "0"
    if (complex.real === 0) return `${imag}i`
    if (complex.imag === 0) return real

    const sign = complex.imag > 0 ? "+" : ""
    return `${real}${sign}${imag}i`
  }

  // Format probability for display
  const formatProbability = (prob: number) => {
    return (prob * 100).toFixed(2) + "%"
  }

  return (
    <Card className="w-full mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Quantum Simulation Results</CardTitle>
          <CardDescription>Step-by-step simulation of your quantum circuit</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "Copied" : "Copy JSON"}
          </Button>
          <Button variant="outline" size="sm" onClick={downloadResults}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="steps">Simulation Steps</TabsTrigger>
            <TabsTrigger value="state">State Evolution</TabsTrigger>
            <TabsTrigger value="probabilities">Measurement</TabsTrigger>
          </TabsList>

          <TabsContent value="steps" className="space-y-4">
            {/* Initial state */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
              <h3 className="text-lg font-medium mb-2">Initial State</h3>
              <div className="mb-2">
                <span className="font-mono text-lg">{result.initial_state.ket_notation}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {Object.entries(result.initial_state.vector).map(([state, amplitude]) => (
                  <div
                    key={`initial-${state}`}
                    className="flex justify-between p-2 bg-white dark:bg-gray-800 rounded border"
                  >
                    <span className="font-mono">|{state}⟩:</span>
                    <span className="font-mono">{formatComplex(amplitude)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Steps */}
            {result.steps.map((step, index) => (
              <div key={`step-${index}`} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
                <h3 className="text-lg font-medium mb-2">
                  Step {index + 1}: {step.gate.name} Gate
                </h3>

                {/* Gate details */}
                <div className="mb-4 p-3 bg-white dark:bg-gray-800 rounded border">
                  <h4 className="font-medium mb-1">Gate Parameters:</h4>
                  <div className="font-mono">
                    {Object.entries(step.gate)
                      .filter(([key]) => key !== "name")
                      .map(([key, value]) => (
                        <div key={`param-${key}`}>
                          {key}: {typeof value === "number" ? value : JSON.stringify(value)}
                        </div>
                      ))}
                  </div>
                </div>

                {/* Explanation */}
                <div className="mb-4">
                  <h4 className="font-medium mb-1">Explanation:</h4>
                  <p>{step.explanation}</p>
                </div>

                {/* State after */}
                <div className="mb-2">
                  <h4 className="font-medium mb-1">State After:</h4>
                  {step.state_after.ket_notation && (
                    <div className="mb-2 font-mono text-lg">{step.state_after.ket_notation}</div>
                  )}

                  {step.state_after.vector && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {Object.entries(step.state_after.vector).map(([state, amplitude]) => (
                        <div
                          key={`state-${index}-${state}`}
                          className="flex justify-between p-2 bg-white dark:bg-gray-800 rounded border"
                        >
                          <span className="font-mono">|{state}⟩:</span>
                          <span className="font-mono">{formatComplex(amplitude)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="state" className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
              <h3 className="text-lg font-medium mb-4">Quantum State Evolution</h3>

              <div className="space-y-6">
                {/* Initial state */}
                <div className="p-3 bg-white dark:bg-gray-800 rounded border">
                  <h4 className="font-medium mb-2">Initial State:</h4>
                  <div className="font-mono text-lg mb-2">{result.initial_state.ket_notation}</div>
                </div>

                {/* State evolution */}
                {result.steps.map((step, index) => (
                  <div key={`evolution-${index}`} className="p-3 bg-white dark:bg-gray-800 rounded border">
                    <h4 className="font-medium mb-2">
                      After {step.gate.name} Gate
                      {step.gate.name === "CNOT" &&
                        `(Control: Q${(step.gate as any).control}, Target: Q${(step.gate as any).target})`}
                      {(step.gate.name === "Hadamard" ||
                        step.gate.name === "PauliX" ||
                        step.gate.name === "PauliY" ||
                        step.gate.name === "PauliZ") &&
                        `(Target: Q${(step.gate as any).target})`}
                    </h4>
                    {step.state_after.ket_notation && (
                      <div className="font-mono text-lg mb-2">{step.state_after.ket_notation}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="probabilities" className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
              <h3 className="text-lg font-medium mb-4">Measurement Probabilities</h3>

              <div className="space-y-4">
                {/* Probabilities table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800">
                        <th className="p-2 text-left border">Measurement Outcome</th>
                        <th className="p-2 text-left border">Probability</th>
                        <th className="p-2 text-left border">Visualization</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(result.measurement_probabilities).map(([outcome, probability]) => (
                        <tr key={`prob-${outcome}`} className="border-b">
                          <td className="p-2 border font-mono">|{outcome}⟩</td>
                          <td className="p-2 border">{formatProbability(probability)}</td>
                          <td className="p-2 border">
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 dark:bg-blue-600 rounded-full"
                                style={{ width: `${probability * 100}%` }}
                              ></div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Visualization */}
                <div className="p-4 bg-white dark:bg-gray-800 rounded border">
                  <h4 className="font-medium mb-4">Probability Distribution</h4>
                  <div className="flex items-end h-40 space-x-1">
                    {Object.entries(result.measurement_probabilities).map(([outcome, probability]) => (
                      <div key={`bar-${outcome}`} className="flex flex-col items-center flex-1">
                        <div
                          className="w-full bg-blue-500 dark:bg-blue-600 rounded-t"
                          style={{ height: `${probability * 100}%` }}
                        ></div>
                        <div className="mt-2 text-xs font-mono truncate w-full text-center">|{outcome}⟩</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
