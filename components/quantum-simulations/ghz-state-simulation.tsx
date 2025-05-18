"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function GHZStateSimulation() {
  const [qubits, setQubits] = useState(3)
  const [showResults, setShowResults] = useState(false)

  const handleSimulate = () => {
    setShowResults(true)
  }

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>GHZ State Simulation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Number of Qubits</label>
              <select
                value={qubits}
                onChange={(e) => setQubits(Number(e.target.value))}
                className="w-full p-2 border rounded"
              >
                {[2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} qubits
                  </option>
                ))}
              </select>
            </div>

            <Button onClick={handleSimulate}>Run Simulation</Button>

            {showResults && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
                <h3 className="font-medium mb-2">Simulation Results</h3>
                <p>
                  Created a GHZ state with {qubits} qubits: (1/√2)(|{"0".repeat(qubits)}⟩ + |{"1".repeat(qubits)}⟩)
                </p>
                <p className="mt-2">
                  Measurement probabilities:
                  <br />|{"0".repeat(qubits)}⟩: 50%
                  <br />|{"1".repeat(qubits)}⟩: 50%
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
