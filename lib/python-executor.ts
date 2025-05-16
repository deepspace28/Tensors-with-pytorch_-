import { logger } from "./logger"

/**
 * Executes Python code using the Python API or a mock implementation
 * @param code The Python code to execute
 * @param engine Optional engine type (qiskit, sympy, scipy)
 * @returns A promise resolving to the execution result
 */
export async function executePythonCode(code: string, engine?: string): Promise<string> {
  try {
    // Check if we have access to Python API
    if (process.env.PYTHON_API_URL) {
      const response = await fetch(process.env.PYTHON_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PYTHON_API_KEY || ""}`,
        },
        body: JSON.stringify({
          code,
          engine,
        }),
      })

      if (!response.ok) {
        throw new Error(`Python API returned status ${response.status}`)
      }

      return await response.text()
    } else {
      // Mock execution for development/testing
      logger.warn("Python API URL not configured, using mock execution")
      return mockPythonExecution(code, engine)
    }
  } catch (error) {
    logger.error(`Error executing Python code: ${error instanceof Error ? error.message : String(error)}`)
    throw error
  }
}

/**
 * Provides a mock execution result for testing without a Python API
 */
function mockPythonExecution(code: string, engine?: string): string {
  // Extract the type of computation from the code
  const isQuantum = code.includes("qiskit") || engine === "qiskit"
  const isSymbolic = code.includes("sympy") || engine === "sympy"
  const isPhysics = code.includes("scipy") || engine === "scipy"

  if (isQuantum) {
    return JSON.stringify({
      success: true,
      summary: "Simulated a quantum circuit with 2 qubits",
      circuit_description: "Bell state preparation circuit",
      equations: [
        "\\ket{\\Psi} = \\frac{1}{\\sqrt{2}}(\\ket{00} + \\ket{11})",
        "\\text{Probability of measuring }\\ket{00}\\text{ or }\\ket{11} = \\frac{1}{2}",
      ],
      chart_data: {
        type: "bar",
        labels: ["00", "11"],
        datasets: [{ label: "Counts", data: [504, 520] }],
      },
      table_data: {
        headers: ["State", "Count", "Probability"],
        rows: [
          ["00", 504, 0.492],
          ["11", 520, 0.508],
        ],
      },
    })
  } else if (isSymbolic) {
    return JSON.stringify({
      success: true,
      summary: "Performed symbolic computation",
      equations: ["f(x) = x^2 + 2x + 1", "f(x) = (x + 1)^2", "f'(x) = 2x + 2"],
      chart_data: {
        type: "line",
        labels: [-3, -2, -1, 0, 1, 2, 3],
        datasets: [{ label: "f(x)", data: [16, 9, 4, 1, 0, 1, 4] }],
      },
      table_data: {
        headers: ["x", "f(x)", "f'(x)"],
        rows: [
          [-2, 1, -2],
          [-1, 0, 0],
          [0, 1, 2],
          [1, 4, 4],
          [2, 9, 6],
        ],
      },
    })
  } else if (isPhysics) {
    return JSON.stringify({
      success: true,
      summary: "Simulated projectile motion",
      equations: ["x(t) = v_0 \\cos(\\theta) t", "y(t) = v_0 \\sin(\\theta) t - \\frac{1}{2}gt^2"],
      chart_data: {
        type: "line",
        labels: [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0],
        datasets: [{ label: "Height (m)", data: [0, 4.9, 8.8, 11.7, 13.6, 14.5, 14.4] }],
      },
      table_data: {
        headers: ["Time (s)", "x (m)", "y (m)", "v_x (m/s)", "v_y (m/s)"],
        rows: [
          [0, 0, 0, 10, 10],
          [1, 10, 5, 10, 0],
          [2, 20, 0, 10, -10],
        ],
      },
    })
  } else {
    // Generic response for other types of code
    return JSON.stringify({
      success: true,
      summary: "Executed Python code",
      result: "Mock execution result",
    })
  }
}
