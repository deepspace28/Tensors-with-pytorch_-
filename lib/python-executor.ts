import { logger } from "./logger"

// Define a type for the mock execution result
interface MockExecutionResult {
  output?: string
  error?: string
  visualizations?: any[]
  circuit?: string
  measurements?: any
  insights?: string[]
  [key: string]: any
}

// Mock data for simulations
const MOCK_RESULTS: Record<string, MockExecutionResult> = {
  bell_state: {
    title: "Bell State Simulation",
    description: "A simulation of the Bell state, demonstrating quantum entanglement.",
    circuit: `
      q0: ─────■─────
              │     
      q1: ───┬┴┬─────
    `,
    measurements: {
      headers: ["State", "Probability"],
      rows: [
        ["00", "0.5"],
        ["11", "0.5"],
      ],
    },
    insights: [
      "The Bell state creates perfect correlation between two qubits.",
      "Measuring one qubit instantly determines the state of the other, regardless of distance.",
      "This demonstrates quantum entanglement, a key resource for quantum computing.",
    ],
    codeSnippet: `
// This is a mock code snippet - Python backend has been removed
// Bell state simulation would create entanglement between two qubits
`,
  },
  default: {
    title: "Quantum Simulation",
    description: "A basic quantum simulation with mock data.",
    circuit: `
      q0: ───H───
    `,
    measurements: {
      headers: ["State", "Probability"],
      rows: [
        ["0", "0.5"],
        ["1", "0.5"],
      ],
    },
    insights: [
      "This is a mock simulation since the Python backend has been removed.",
      "In a real simulation, you would see actual quantum computation results.",
    ],
    codeSnippet: `
// This is a mock code snippet - Python backend has been removed
// A real simulation would use quantum computing libraries
`,
  },
}

// Function to determine which mock result to use based on the code
function getMockResult(code: string): MockExecutionResult {
  if (code.includes("bell") || code.includes("entangle")) {
    return MOCK_RESULTS.bell_state
  }
  return MOCK_RESULTS.default
}

// Main function to execute Python code (now returns mock data)
export async function executePythonCode(code: string): Promise<MockExecutionResult> {
  try {
    logger.info("Python backend has been removed, returning mock data")

    // Return mock data based on the code
    const mockResult = getMockResult(code)
    logger.info("Using mock simulation data")
    return mockResult
  } catch (error) {
    logger.error(`Error in executePythonCode: ${error}`)
    return {
      error: `Execution failed: ${error instanceof Error ? error.message : String(error)}`,
      ...MOCK_RESULTS.default,
    }
  }
}
