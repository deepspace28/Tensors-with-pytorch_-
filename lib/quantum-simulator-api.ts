/**
 * API client for the quantum simulator service
 */
import { logger } from "./logger"

export interface QuantumCircuitInput {
  qubits: number
  initial_states: string[]
  gates: QuantumGate[]
  measure: number[]
}

export type QuantumGate =
  | { name: "Hadamard"; target: number }
  | { name: "PauliX"; target: number }
  | { name: "PauliY"; target: number }
  | { name: "PauliZ"; target: number }
  | { name: "CNOT"; control: number; target: number }
  | { name: "CZ"; control: number; target: number }
  | { name: "SWAP"; target1: number; target2: number }
  | { name: "Toffoli"; control1: number; control2: number; target: number }
  | { name: "Phase" | "S" | "T"; target: number; angle?: number }
  | { name: "RX" | "RY" | "RZ"; target: number; angle: number }
  | { name: "U"; target: number; theta: number; phi: number; lambda: number }

export interface QuantumSimulationStep {
  gate: QuantumGate
  explanation: string
  state_after: {
    vector?: Record<string, { real: number; imag: number }>
    ket_notation?: string
    bloch_params?: Record<string, { theta: number; phi: number }>
  }
}

export interface QuantumSimulationResult {
  initial_state: {
    vector: Record<string, { real: number; imag: number }>
    ket_notation: string
  }
  steps: QuantumSimulationStep[]
  measurement_probabilities: Record<string, number>
  error?: string
}

/**
 * Simulates a quantum circuit using the external API
 */
export async function simulateQuantumCircuit(
  circuit: QuantumCircuitInput
): Promise<QuantumSimulationResult> {
  try {
    logger.info(`Simulating quantum circuit with ${circuit.qubits} qubits`)
    
    const response = await fetch("https://sitebackend-production.up.railway.app/simulate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(circuit),
    })

    if (!response.ok) {
      const errorText = await response.text()
      logger.error(`Quantum simulation API error: ${response.status} - ${errorText}`)
      throw new Error(`Quantum simulation API error: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    logger.error(`Error simulating quantum circuit: ${error instanceof Error ? error.message : String(error)}`)

    // Return a fallback result with the error
    return {
      initial_state: {\
        vector: { "0\".repeat(circuit.qubits): { real: 1, imag: 0 } },
        ket_notation: `|${"0".repeat(circuit.qubits)}>`,
      },
      steps: [],
      measurement_probabilities: { "0".repeat(circuit.qubits): 1 },
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
