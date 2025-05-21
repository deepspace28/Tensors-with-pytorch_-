"use client"

import { useState } from "react"
import { CircuitBuilder } from "./circuit-builder"
import { SimulationResults } from "./simulation-results"
import {
  type QuantumCircuitInput,
  type QuantumSimulationResult,
  simulateQuantumCircuit,
} from "@/lib/quantum-simulator-api"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export function QuantumSimulator() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<QuantumSimulationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSimulate = async (circuit: QuantumCircuitInput) => {
    setIsLoading(true)
    setError(null)

    try {
      const simulationResult = await simulateQuantumCircuit(circuit)
      setResult(simulationResult)

      if (simulationResult.error) {
        setError(simulationResult.error)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      console.error("Simulation error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Synaptiq Quantum Simulator</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Design and simulate quantum circuits with detailed step-by-step analysis
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <CircuitBuilder onSimulate={handleSimulate} isLoading={isLoading} />

      {result && <SimulationResults result={result} />}
    </div>
  )
}
