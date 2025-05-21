"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Plus, Trash2, Play, Download } from "lucide-react"

// Define types for quantum circuit elements
type GateType = "Hadamard" | "CNOT" | "PauliX" | "PauliY" | "PauliZ" | "Phase" | "T" | "S" | "RX" | "RY" | "RZ"
type QubitState = "|0>" | "|1>" | "|+>" | "|->"

interface Gate {
  name: GateType
  target: number
  control?: number
  angle?: number
}

interface CircuitInput {
  qubits: number
  initial_states: QubitState[]
  gates: Gate[]
  measure: number[]
}

interface SimulationResult {
  state_vector: Record<string, number[]>
  steps: SimulationStep[]
  measurement_probabilities: Record<string, number>
  final_state: string
}

interface SimulationStep {
  gate: string
  description: string
  state_after: string
  visualization?: any
}

export default function QuantumSimulator() {
  const [qubits, setQubits] = useState(2)
  const [initialStates, setInitialStates] = useState<QubitState[]>(Array(qubits).fill("|0>"))
  const [gates, setGates] = useState<Gate[]>([])
  const [measureQubits, setMeasureQubits] = useState<number[]>([0, 1])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<SimulationResult | null>(null)
  const [activeTab, setActiveTab] = useState("circuit")

  // Update initial states when qubit count changes
  const handleQubitCountChange = (count: number) => {
    setQubits(count)
    setInitialStates((prev) => {
      const newStates = [...prev]
      if (count > prev.length) {
        // Add new qubits with |0> state
        return [...prev, ...Array(count - prev.length).fill("|0>")]
      } else {
        // Remove extra qubits
        return prev.slice(0, count)
      }
    })
    // Update measurement qubits
    setMeasureQubits(Array.from({ length: count }, (_, i) => i))
  }

  // Update initial state for a specific qubit
  const handleInitialStateChange = (index: number, state: QubitState) => {
    setInitialStates((prev) => {
      const newStates = [...prev]
      newStates[index] = state
      return newStates
    })
  }

  // Add a new gate to the circuit
  const handleAddGate = () => {
    const newGate: Gate = {
      name: "Hadamard",
      target: 0,
    }
    setGates((prev) => [...prev, newGate])
  }

  // Update a gate in the circuit
  const handleUpdateGate = (index: number, field: string, value: any) => {
    setGates((prev) => {
      const newGates = [...prev]
      newGates[index] = { ...newGates[index], [field]: value }
      return newGates
    })
  }

  // Remove a gate from the circuit
  const handleRemoveGate = (index: number) => {
    setGates((prev) => prev.filter((_, i) => i !== index))
  }

  // Toggle measurement for a qubit
  const handleToggleMeasurement = (qubitIndex: number) => {
    setMeasureQubits((prev) => {
      if (prev.includes(qubitIndex)) {
        return prev.filter((q) => q !== qubitIndex)
      } else {
        return [...prev, qubitIndex].sort((a, b) => a - b)
      }
    })
  }

  // Run the quantum simulation
  const runSimulation = async () => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const circuitInput: CircuitInput = {
        qubits,
        initial_states: initialStates,
        gates,
        measure: measureQubits,
      }

      console.log("Sending circuit to API:", circuitInput)

      const response = await fetch("https://sitebackend-production.up.railway.app/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(circuitInput),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log("Simulation result:", data)
      setResult(data)
      setActiveTab("results")
    } catch (err) {
      console.error("Simulation error:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  // Download the circuit as JSON
  const downloadCircuit = () => {
    const circuitInput: CircuitInput = {
      qubits,
      initial_states: initialStates,
      gates,
      measure: measureQubits,
    }

    const blob = new Blob([JSON.stringify(circuitInput, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "quantum-circuit.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Quantum Circuit Simulator</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="circuit">Circuit Design</TabsTrigger>
          <TabsTrigger value="results" disabled={!result}>
            Simulation Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="circuit" className="space-y-6">
          {/* Qubit Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Qubit Configuration</CardTitle>
              <CardDescription>Set the number of qubits and their initial states</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="qubit-count">Number of Qubits</Label>
                <Select
                  value={qubits.toString()}
                  onValueChange={(value) => handleQubitCountChange(Number.parseInt(value))}
                >
                  <SelectTrigger id="qubit-count">
                    <SelectValue placeholder="Select number of qubits" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} qubit{num > 1 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Initial States</Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {initialStates.map((state, index) => (
                    <div key={index} className="space-y-1">
                      <Label htmlFor={`qubit-${index}`} className="text-xs">
                        Qubit {index}
                      </Label>
                      <Select
                        value={state}
                        onValueChange={(value) => handleInitialStateChange(index, value as QubitState)}
                      >
                        <SelectTrigger id={`qubit-${index}`}>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="|0>">|0⟩</SelectItem>
                          <SelectItem value="|1>">|1⟩</SelectItem>
                          <SelectItem value="|+>">|+⟩</SelectItem>
                          <SelectItem value="|->">|-⟩</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gates Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Quantum Gates</CardTitle>
              <CardDescription>Add quantum gates to your circuit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleAddGate} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Gate
              </Button>

              {gates.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No gates added yet. Click "Add Gate" to start building your circuit.
                </div>
              ) : (
                <div className="space-y-4">
                  {gates.map((gate, index) => (
                    <div key={index} className="flex flex-col space-y-2 p-4 border rounded-md">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Gate {index + 1}</h4>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveGate(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label htmlFor={`gate-${index}-type`}>Gate Type</Label>
                          <Select value={gate.name} onValueChange={(value) => handleUpdateGate(index, "name", value)}>
                            <SelectTrigger id={`gate-${index}-type`}>
                              <SelectValue placeholder="Select gate" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Hadamard">Hadamard (H)</SelectItem>
                              <SelectItem value="PauliX">Pauli-X</SelectItem>
                              <SelectItem value="PauliY">Pauli-Y</SelectItem>
                              <SelectItem value="PauliZ">Pauli-Z</SelectItem>
                              <SelectItem value="Phase">Phase (S)</SelectItem>
                              <SelectItem value="T">T Gate</SelectItem>
                              <SelectItem value="CNOT">CNOT</SelectItem>
                              <SelectItem value="RX">RX (Rotation-X)</SelectItem>
                              <SelectItem value="RY">RY (Rotation-Y)</SelectItem>
                              <SelectItem value="RZ">RZ (Rotation-Z)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor={`gate-${index}-target`}>Target Qubit</Label>
                          <Select
                            value={gate.target.toString()}
                            onValueChange={(value) => handleUpdateGate(index, "target", Number.parseInt(value))}
                          >
                            <SelectTrigger id={`gate-${index}-target`}>
                              <SelectValue placeholder="Select target" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: qubits }, (_, i) => (
                                <SelectItem key={i} value={i.toString()}>
                                  Qubit {i}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {gate.name === "CNOT" && (
                          <div className="space-y-1">
                            <Label htmlFor={`gate-${index}-control`}>Control Qubit</Label>
                            <Select
                              value={(gate.control || 0).toString()}
                              onValueChange={(value) => handleUpdateGate(index, "control", Number.parseInt(value))}
                            >
                              <SelectTrigger id={`gate-${index}-control`}>
                                <SelectValue placeholder="Select control" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: qubits }, (_, i) => (
                                  <SelectItem key={i} value={i.toString()} disabled={i === gate.target}>
                                    Qubit {i}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {(gate.name === "RX" || gate.name === "RY" || gate.name === "RZ") && (
                          <div className="space-y-1">
                            <Label htmlFor={`gate-${index}-angle`}>Angle (radians)</Label>
                            <Input
                              id={`gate-${index}-angle`}
                              type="number"
                              step="0.01"
                              value={gate.angle || 0}
                              onChange={(e) => handleUpdateGate(index, "angle", Number.parseFloat(e.target.value))}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Measurement Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Measurement</CardTitle>
              <CardDescription>Select which qubits to measure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: qubits }, (_, i) => (
                  <Button
                    key={i}
                    variant={measureQubits.includes(i) ? "default" : "outline"}
                    onClick={() => handleToggleMeasurement(i)}
                  >
                    Qubit {i}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={runSimulation}
              disabled={isLoading || gates.length === 0 || measureQubits.length === 0}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Simulating...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Run Simulation
                </>
              )}
            </Button>

            <Button variant="outline" onClick={downloadCircuit} className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download Circuit
            </Button>
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>}
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {result && (
            <>
              {/* Final State */}
              <Card>
                <CardHeader>
                  <CardTitle>Final Quantum State</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-gray-50 rounded-md font-mono whitespace-pre-wrap">{result.final_state}</div>
                </CardContent>
              </Card>

              {/* Measurement Probabilities */}
              <Card>
                <CardHeader>
                  <CardTitle>Measurement Probabilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(result.measurement_probabilities).map(([state, probability]) => (
                      <div key={state} className="p-4 border rounded-md">
                        <div className="text-lg font-mono text-center">{state}</div>
                        <div className="mt-2 flex flex-col items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{ width: `${probability * 100}%` }}
                            ></div>
                          </div>
                          <span className="mt-1 text-sm">{(probability * 100).toFixed(2)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Simulation Steps */}
              <Card>
                <CardHeader>
                  <CardTitle>Simulation Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.steps.map((step, index) => (
                      <div key={index} className="border rounded-md p-4">
                        <h4 className="font-medium mb-2">
                          Step {index + 1}: {step.gate}
                        </h4>
                        <p className="text-gray-600 mb-4">{step.description}</p>
                        <div className="bg-gray-50 p-3 rounded-md font-mono text-sm">{step.state_after}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Button variant="outline" onClick={() => setActiveTab("circuit")}>
                Back to Circuit
              </Button>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
