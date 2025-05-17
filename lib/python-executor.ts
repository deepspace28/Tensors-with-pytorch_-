import { PYTHON_API_URL, PYTHON_API_KEY } from "@/app/env"

/**
 * Executes Python code using an external Python execution service
 * @param code The Python code to execute
 * @param input The input data for the Python code (as a JSON string)
 * @returns The result of the Python execution
 */
export async function executePythonCode(code: string, input: string): Promise<string> {
  try {
    console.log("Executing Python code with input:", input)

    // Call the Python execution API
    const response = await fetch(PYTHON_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PYTHON_API_KEY}`,
      },
      body: JSON.stringify({
        code,
        input,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Python API returned status ${response.status}: ${errorText}`)
    }

    const result = await response.json()

    if (result.error) {
      throw new Error(`Python execution error: ${result.error}`)
    }

    return result.output || ""
  } catch (error) {
    console.error("Error in Python executor:", error)
    throw error
  }
}

/**
 * Simulates Python execution for development/testing
 * @param code The Python code to execute
 * @param input The input data for the Python code
 * @returns A simulated result
 */
export function simulatePythonExecution(code: string, input: string): string {
  console.log("Simulating Python execution with input:", input)

  try {
    // Parse the input
    const parsedInput = JSON.parse(input)
    const { prompt, type } = parsedInput

    // Generate a simulation result based on the prompt
    const lowerPrompt = prompt.toLowerCase()

    const result: any = {
      simulationData: {
        title: "Simulated Results",
        explanation: `Simulation results for: "${prompt}"`,
        chartType: "line",
        equations: ["E = mc^2", "F = ma"],
      },
      results: {
        x: Array.from({ length: 100 }, (_, i) => i / 10),
        y: Array.from({ length: 100 }, (_, i) => Math.sin(i / 10) * Math.exp(-i / 100)),
      },
    }

    // Customize based on keywords in the prompt
    if (lowerPrompt.includes("quantum")) {
      result.simulationData.title = "Quantum Simulation"
      result.simulationData.equations = [
        "\\left|\\psi\\right> = \\alpha\\left|0\\right> + \\beta\\left|1\\right>",
        "|\\alpha|^2 + |\\beta|^2 = 1",
      ]
    } else if (lowerPrompt.includes("math") || lowerPrompt.includes("equation")) {
      result.simulationData.title = "Mathematical Analysis"
      result.simulationData.chartType = "scatter"
      result.steps = [
        "Step 1: Identify the equation type",
        "Step 2: Apply the appropriate formula",
        "Step 3: Solve for the unknown variables",
        "Step 4: Verify the solution",
      ]
    }

    return JSON.stringify(result)
  } catch (error) {
    console.error("Error in Python simulation:", error)
    return JSON.stringify({
      error: `Simulation error: ${error instanceof Error ? error.message : String(error)}`,
    })
  }
}
