"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

interface GHZStateSimulationProps {
  qubits?: number
  shots?: number
}

export function SimplifiedGHZSimulation({ qubits = 3, shots = 1024 }: GHZStateSimulationProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [results, setResults] = useState<any>(null)

  useEffect(() => {
    // Simulate loading time for the quantum simulation
    const timer = setTimeout(() => {
      const simulationResults = runGHZSimulation(qubits, shots)
      setResults(simulationResults)
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [qubits, shots])

  const runGHZSimulation = (numQubits: number, numShots: number) => {
    // Generate mock results that would come from a real quantum simulation
    const halfShots = Math.floor(numShots / 2)
    const zeroState = "0".repeat(numQubits)
    const oneState = "1".repeat(numQubits)

    // Add slight randomness to the counts to simulate quantum noise
    const zeroCount = halfShots + Math.floor(Math.random() * 20) - 10
    const oneCount = numShots - zeroCount

    return {
      counts: {
        [zeroState]: zeroCount,
        [oneState]: oneCount,
      },
      parameters: {
        qubits: numQubits,
        shots: numShots,
      },
    }
  }

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>GHZ State Simulation</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="mt-4 text-lg">Running quantum simulation...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>GHZ State Simulation Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="mathematical" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="mathematical">Mathematical</TabsTrigger>
              <TabsTrigger value="circuit">Circuit</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="mathematical" className="space-y-4">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Initial State</h3>
                <div className="my-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-md text-center">
                  <p>Initial state: |000...</p>
                </div>

                <h3>After Hadamard Gate</h3>
                <div className="my-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-md text-center">
                  <p>After Hadamard: (1/√2)(|0⟩ + |1⟩) ⊗ |00...</p>
                </div>

                <h3>After CNOT Gates</h3>
                <div className="my-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-md text-center">
                  <p>Final state: (1/√2)(|000...⟩ + |111...⟩)</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="circuit" className="space-y-4">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Quantum Circuit Diagram</h3>
                <div className="my-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-md font-mono whitespace-pre">
                  <pre>
                    {`q_0: --[H]--●---●---
                |   |
q_1: -------X---+---
                |
q_2: -----------X---`}
                  </pre>
                </div>

                <h3>Circuit Description</h3>
                <p>This circuit creates a GHZ state with {results?.parameters.qubits || 3} qubits by:</p>
                <ol>
                  <li>Applying a Hadamard gate to the first qubit, creating a superposition</li>
                  <li>Applying CNOT gates from the first qubit to all other qubits, creating entanglement</li>
                </ol>
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Measurement Outcomes</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Measurement
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Count</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Probability
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {results &&
                        Object.entries(results.counts).map(([state, count]: [string, any]) => (
                          <tr key={state}>
                            <td className="px-6 py-4 whitespace-nowrap">{state}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{count}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {(Number(count) / results.parameters.shots).toFixed(4)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Quantum Properties Demonstrated</h3>
                <p>The GHZ state demonstrates several key quantum phenomena:</p>
                <ul>
                  <li>
                    <strong>Multipartite Entanglement:</strong> The qubits are entangled in a way that cannot be
                    decomposed into simpler entangled states.
                  </li>
                  <li>
                    <strong>Quantum Non-locality:</strong> The GHZ state violates local realism in a stronger way than
                    Bell states.
                  </li>
                  <li>
                    <strong>Perfect Correlation:</strong> Measuring any qubit immediately determines the state of all
                    other qubits.
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
