import { logger } from "./logger"

/**
 * Generates mock Qiskit code based on a prompt
 * @param prompt The user's prompt
 * @returns Mock Qiskit code as a string
 */
export function generateQiskitCode(prompt: string): string {
  logger.info(`Generating mock Qiskit code for prompt: ${prompt}`)

  // Extract key terms from the prompt
  const lowerPrompt = prompt.toLowerCase()

  // Generate different mock code based on the prompt
  if (lowerPrompt.includes("bell") || lowerPrompt.includes("entangle")) {
    return `
# Mock Bell State code (Python backend removed)
# In a real implementation, this would create a Bell state

# Create a Bell state
qc = QuantumCircuit(2, 2)
qc.h(0)
qc.cx(0, 1)
qc.measure([0, 1], [0, 1])

# Simulate the circuit
simulator = Aer.get_backend('qasm_simulator')
result = execute(qc, simulator, shots=1024).result()
counts = result.get_counts(qc)
print(counts)
`
  } else if (lowerPrompt.includes("grover")) {
    return `
# Mock Grover's Algorithm code (Python backend removed)
# In a real implementation, this would implement Grover's search algorithm

# Create a circuit for Grover's algorithm
qc = QuantumCircuit(3, 3)
qc.h([0, 1, 2])
# Apply oracle
qc.cz(0, 2)
# Apply diffusion operator
qc.h([0, 1, 2])
qc.x([0, 1, 2])
qc.h(2)
qc.ccx(0, 1, 2)
qc.h(2)
qc.x([0, 1, 2])
qc.h([0, 1, 2])
qc.measure([0, 1, 2], [0, 1, 2])

# Simulate the circuit
simulator = Aer.get_backend('qasm_simulator')
result = execute(qc, simulator, shots=1024).result()
counts = result.get_counts(qc)
print(counts)
`
  } else {
    return `
# Mock Quantum code (Python backend removed)
# In a real implementation, this would create a quantum circuit based on: "${prompt}"

# Create a simple quantum circuit
qc = QuantumCircuit(2, 2)
qc.h(0)
qc.cx(0, 1)
qc.measure([0, 1], [0, 1])

# Simulate the circuit
simulator = Aer.get_backend('qasm_simulator')
result = execute(qc, simulator, shots=1024).result()
counts = result.get_counts(qc)
print(counts)
`
  }
}
