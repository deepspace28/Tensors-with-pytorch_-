import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SimplifiedGHZSimulation } from "@/components/quantum-simulations/simplified-ghz-simulation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function GHZStatePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>GHZ State Quantum Simulation</CardTitle>
              <CardDescription>
                Exploring the Greenberger-Horne-Zeilinger (GHZ) state, a maximally entangled quantum state
              </CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                The GHZ state is a notable multi-qubit entangled state that demonstrates quantum non-locality beyond
                what Bell states show. It is defined as a superposition of all qubits in state |0⟩ and all qubits in
                state |1⟩.
              </p>
              <div className="my-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-md text-center">
                <p>|GHZ⟩ = (1/√2)(|00...0⟩ + |11...1⟩)</p>
              </div>
              <p>
                This simulation demonstrates the creation and measurement of a GHZ state using quantum gates. The
                results show the perfect correlation between qubits that is characteristic of this entangled state.
              </p>
            </CardContent>
          </Card>

          <SimplifiedGHZSimulation qubits={3} shots={1024} />

          <Card>
            <CardHeader>
              <CardTitle>Code Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md overflow-x-auto">
                <code className="language-python">
                  {`import numpy as np
from qiskit import QuantumCircuit, Aer, execute
from qiskit.visualization import plot_histogram
from qiskit.quantum_info import Statevector

# Create a quantum circuit with 3 qubits and 3 classical bits
circuit = QuantumCircuit(3, 3)

# Step 1: Apply Hadamard gate to the first qubit
circuit.h(0)

# Step 2: Apply CNOT gates with control qubit 0 and target qubits 1 and 2
circuit.cx(0, 1)
circuit.cx(0, 2)

# Measure all qubits
circuit.measure([0, 1, 2], [0, 1, 2])

# Use the Qiskit Aer simulator
simulator = Aer.get_backend('qasm_simulator')

# Execute the circuit on the simulator
job = execute(circuit, simulator, shots=1024)
result = job.result()

# Get the counts of each measurement outcome
counts = result.get_counts(circuit)
print("Measurement counts:", counts)`}
                </code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
