"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Trash, Plus, Play } from "lucide-react"
import type { QuantumCircuitInput, QuantumGate } from "@/lib/quantum-simulator-api"

interface CircuitBuilderProps {
  onSimulate: (circuit: QuantumCircuitInput) => void
  isLoading: boolean
}

export function CircuitBuilder({ onSimulate, isLoading }: CircuitBuilderProps) {
  const [numQubits, setNumQubits] = useState(2)
  const [initialStates, setInitialStates] = useState<string[]>(Array(2).fill("|0>"))
  const [gates, setGates] = useState<QuantumGate[]>([
    { name: "Hadamard", target: 0 },
    { name: "CNOT", control: 0, target: 1 },
  ])
  const [measureQubits, setMeasureQubits] = useState<number[]>([0, 1])

  // Update initial states when number of qubits changes
  const handleNumQubitsChange = (value: number) => {
    setNumQubits(value)

    // Adjust initial states array
    if (value > initialStates.length) {
      setInitialStates([...initialStates, ...Array(value - initialStates.length).fill("|0>")])
    } else if (value < initialStates.length) {
      setInitialStates(initialStates.slice(0, value))
    }

    // Adjust measurement qubits
    setMeasureQubits(measureQubits.filter((q) => q < value))
  }

  // Handle initial state change
  const handleInitialStateChange = (index: number, value: string) => {
    const newStates = [...initialStates]
    newStates[index] = value
    setInitialStates(newStates)
  }

  // Add a new gate
  const addGate = () => {
    setGates([...gates, { name: "Hadamard", target: 0 }])
  }

  // Remove a gate
  const removeGate = (index: number) => {
    setGates(gates.filter((_, i) => i !== index))
  }

  // Update a gate
  const updateGate = (index: number, gate: QuantumGate) => {
    const newGates = [...gates]
    newGates[index] = gate
    setGates(newGates)
  }

  // Toggle measurement qubit
  const toggleMeasureQubit = (qubit: number) => {
    if (measureQubits.includes(qubit)) {
      setMeasureQubits(measureQubits.filter((q) => q !== qubit))
    } else {
      setMeasureQubits([...measureQubits, qubit].sort((a, b) => a - b))
    }
  }

  // Run the simulation
  const runSimulation = () => {
    onSimulate({
      qubits: numQubits,
      initial_states: initialStates,
      gates,
      measure: measureQubits,
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Quantum Circuit Builder</CardTitle>
        <CardDescription>Design your quantum circuit by specifying qubits, gates, and measurements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Number of qubits */}
        <div className="space-y-2">
          <Label htmlFor="num-qubits">Number of Qubits: {numQubits}</Label>
          <Slider
            id="num-qubits"
            min={1}
            max={10}
            step={1}
            value={[numQubits]}
            onValueChange={(value) => handleNumQubitsChange(value[0])}
          />
        </div>

        {/* Initial states */}
        <div className="space-y-2">
          <Label>Initial States</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {initialStates.map((state, index) => (
              <div key={`state-${index}`} className="flex items-center space-x-2">
                <Label htmlFor={`state-${index}`} className="w-10">
                  Q{index}:
                </Label>
                <Select value={state} onValueChange={(value) => handleInitialStateChange(index, value)}>
                  <SelectTrigger id={`state-${index}`} className="flex-1">
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

        {/* Gates */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Quantum Gates</Label>
            <Button variant="outline" size="sm" onClick={addGate}>
              <Plus className="h-4 w-4 mr-1" /> Add Gate
            </Button>
          </div>
          <div className="space-y-2">
            {gates.map((gate, index) => (
              <div key={`gate-${index}`} className="flex items-center space-x-2 p-2 border rounded-md">
                <Select
                  value={gate.name}
                  onValueChange={(value) => {
                    let newGate: QuantumGate

                    // Create appropriate gate based on type
                    switch (value) {
                      case "Hadamard":
                      case "PauliX":
                      case "PauliY":
                      case "PauliZ":
                      case "S":
                      case "T":
                        newGate = { name: value as any, target: "target" in gate ? gate.target : 0 }
                        break
                      case "Phase":
                        newGate = { name: value, target: "target" in gate ? gate.target : 0, angle: 0 }
                        break
                      case "RX":
                      case "RY":
                      case "RZ":
                        newGate = { name: value as any, target: "target" in gate ? gate.target : 0, angle: 0 }
                        break
                      case "CNOT":
                      case "CZ":
                        newGate = {
                          name: value as any,
                          control: "control" in gate ? gate.control : 0,
                          target: "target" in gate ? gate.target : 1,
                        }
                        break
                      case "SWAP":
                        newGate = {
                          name: value,
                          target1: 0,
                          target2: 1,
                        }
                        break
                      case "Toffoli":
                        newGate = {
                          name: value,
                          control1: 0,
                          control2: 1,
                          target: 2,
                        }
                        break
                      case "U":
                        newGate = {
                          name: value,
                          target: "target" in gate ? gate.target : 0,
                          theta: 0,
                          phi: 0,
                          lambda: 0,
                        }
                        break
                      default:
                        newGate = { name: "Hadamard", target: 0 }
                    }

                    updateGate(index, newGate)
                  }}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Gate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hadamard">Hadamard (H)</SelectItem>
                    <SelectItem value="PauliX">Pauli-X</SelectItem>
                    <SelectItem value="PauliY">Pauli-Y</SelectItem>
                    <SelectItem value="PauliZ">Pauli-Z</SelectItem>
                    <SelectItem value="Phase">Phase</SelectItem>
                    <SelectItem value="S">S Gate</SelectItem>
                    <SelectItem value="T">T Gate</SelectItem>
                    <SelectItem value="RX">RX</SelectItem>
                    <SelectItem value="RY">RY</SelectItem>
                    <SelectItem value="RZ">RZ</SelectItem>
                    <SelectItem value="CNOT">CNOT</SelectItem>
                    <SelectItem value="CZ">CZ</SelectItem>
                    <SelectItem value="SWAP">SWAP</SelectItem>
                    <SelectItem value="Toffoli">Toffoli</SelectItem>
                    <SelectItem value="U">U (Universal)</SelectItem>
                  </SelectContent>
                </Select>

                {/* Gate parameters based on gate type */}
                {gate.name === "Hadamard" ||
                gate.name === "PauliX" ||
                gate.name === "PauliY" ||
                gate.name === "PauliZ" ||
                gate.name === "S" ||
                gate.name === "T" ? (
                  <div className="flex items-center space-x-2">
                    <Label>Target:</Label>
                    <Select
                      value={gate.target.toString()}
                      onValueChange={(value) => updateGate(index, { ...gate, target: Number.parseInt(value) })}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="Target" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: numQubits }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            Q{i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : gate.name === "Phase" || gate.name === "RX" || gate.name === "RY" || gate.name === "RZ" ? (
                  <div className="flex flex-1 items-center space-x-2">
                    <Label>Target:</Label>
                    <Select
                      value={gate.target.toString()}
                      onValueChange={(value) => updateGate(index, { ...gate, target: Number.parseInt(value) })}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="Target" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: numQubits }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            Q{i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Label>Angle (rad):</Label>
                    <Input
                      type="number"
                      value={gate.angle}
                      onChange={(e) => updateGate(index, { ...gate, angle: Number.parseFloat(e.target.value) })}
                      className="w-20"
                      step="0.1"
                    />
                  </div>
                ) : gate.name === "CNOT" || gate.name === "CZ" ? (
                  <div className="flex flex-1 items-center space-x-2">
                    <Label>Control:</Label>
                    <Select
                      value={gate.control.toString()}
                      onValueChange={(value) => updateGate(index, { ...gate, control: Number.parseInt(value) })}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="Control" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: numQubits }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            Q{i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Label>Target:</Label>
                    <Select
                      value={gate.target.toString()}
                      onValueChange={(value) => updateGate(index, { ...gate, target: Number.parseInt(value) })}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="Target" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: numQubits }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            Q{i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : gate.name === "SWAP" ? (
                  <div className="flex flex-1 items-center space-x-2">
                    <Label>Target 1:</Label>
                    <Select
                      value={gate.target1.toString()}
                      onValueChange={(value) => updateGate(index, { ...gate, target1: Number.parseInt(value) })}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="Target 1" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: numQubits }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            Q{i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Label>Target 2:</Label>
                    <Select
                      value={gate.target2.toString()}
                      onValueChange={(value) => updateGate(index, { ...gate, target2: Number.parseInt(value) })}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="Target 2" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: numQubits }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            Q{i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : gate.name === "Toffoli" ? (
                  <div className="flex flex-1 items-center space-x-2">
                    <Label>Control 1:</Label>
                    <Select
                      value={gate.control1.toString()}
                      onValueChange={(value) => updateGate(index, { ...gate, control1: Number.parseInt(value) })}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="Control 1" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: numQubits }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            Q{i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Label>Control 2:</Label>
                    <Select
                      value={gate.control2.toString()}
                      onValueChange={(value) => updateGate(index, { ...gate, control2: Number.parseInt(value) })}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="Control 2" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: numQubits }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            Q{i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Label>Target:</Label>
                    <Select
                      value={gate.target.toString()}
                      onValueChange={(value) => updateGate(index, { ...gate, target: Number.parseInt(value) })}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="Target" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: numQubits }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            Q{i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : gate.name === "U" ? (
                  <div className="flex flex-1 items-center space-x-2">
                    <Label>Target:</Label>
                    <Select
                      value={gate.target.toString()}
                      onValueChange={(value) => updateGate(index, { ...gate, target: Number.parseInt(value) })}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="Target" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: numQubits }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            Q{i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Label>θ:</Label>
                    <Input
                      type="number"
                      value={gate.theta}
                      onChange={(e) => updateGate(index, { ...gate, theta: Number.parseFloat(e.target.value) })}
                      className="w-16"
                      step="0.1"
                    />
                    <Label>φ:</Label>
                    <Input
                      type="number"
                      value={gate.phi}
                      onChange={(e) => updateGate(index, { ...gate, phi: Number.parseFloat(e.target.value) })}
                      className="w-16"
                      step="0.1"
                    />
                    <Label>λ:</Label>
                    <Input
                      type="number"
                      value={gate.lambda}
                      onChange={(e) => updateGate(index, { ...gate, lambda: Number.parseFloat(e.target.value) })}
                      className="w-16"
                      step="0.1"
                    />
                  </div>
                ) : null}

                <Button variant="ghost" size="icon" onClick={() => removeGate(index)}>
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Measurement */}
        <div className="space-y-2">
          <Label>Measurement Qubits</Label>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: numQubits }, (_, i) => (
              <Button
                key={`measure-${i}`}
                variant={measureQubits.includes(i) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleMeasureQubit(i)}
              >
                Q{i}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={runSimulation}
          disabled={isLoading || gates.length === 0 || measureQubits.length === 0}
        >
          {isLoading ? "Simulating..." : "Run Simulation"}
          {!isLoading && <Play className="ml-2 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  )
}
