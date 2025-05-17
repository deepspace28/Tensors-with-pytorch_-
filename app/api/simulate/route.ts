import { type NextRequest, NextResponse } from "next/server"

// The Python backend API URL
const PYTHON_API_URL = "https://sitebackend-production.up.railway.app/simulate"

export async function POST(request: NextRequest) {
  try {
    console.log("Simulation API called")
    const body = await request.json()
    const { prompt, type = "unified", parameters = {} } = body

    if (!prompt) {
      return NextResponse.json({ error: "Simulation prompt is required" }, { status: 400 })
    }

    console.log(`Processing simulation request: "${prompt}" to ${PYTHON_API_URL}`)

    try {
      // Send the simulation request directly to the Python API
      const response = await fetch(PYTHON_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          type,
          parameters,
          // Include any other fields the API might require
          code: "", // Some APIs require this field even if empty
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`Python API error (${response.status}):`, errorText)
        throw new Error(`Python API returned status ${response.status}: ${errorText}`)
      }

      // Get the response from the Python API
      const result = await response.json()
      console.log("Simulation completed successfully")

      return NextResponse.json(result)
    } catch (error) {
      console.error("Error calling Python API:", error)

      // Generate a fallback response
      return generateFallbackResponse(prompt, error)
    }
  } catch (error) {
    console.error("Error in simulation API:", error)
    return NextResponse.json(
      {
        error: "Failed to process simulation",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

// Function to generate a fallback response when the API fails
function generateFallbackResponse(prompt: string, error: unknown) {
  console.log("Generating fallback response for:", prompt)

  // Extract keywords from the prompt
  const lowerPrompt = prompt.toLowerCase()

  // Default fallback data
  const fallbackData = {
    simulationData: {
      title: "Simulation Results (Fallback)",
      explanation: `We couldn't process your simulation "${prompt}" with our backend. Here's a basic visualization instead.`,
      chartType: "line",
      equations: ["E = mc^2", "F = ma"],
    },
    results: {
      x: Array.from({ length: 100 }, (_, i) => i / 10),
      y: Array.from({ length: 100 }, (_, i) => Math.sin(i / 10) * Math.exp(-i / 100)),
    },
    error: error instanceof Error ? error.message : String(error),
  }

  // Customize the fallback based on keywords in the prompt
  if (lowerPrompt.includes("quantum")) {
    fallbackData.simulationData.title = "Quantum Simulation (Fallback)"
    fallbackData.simulationData.explanation = "Fallback quantum simulation visualization."
    fallbackData.simulationData.equations = [
      "\\left|\\psi\\right> = \\alpha\\left|0\\right> + \\beta\\left|1\\right>",
      "|\\alpha|^2 + |\\beta|^2 = 1",
    ]

    // Quantum oscillation pattern
    fallbackData.results.y = Array.from(
      { length: 100 },
      (_, i) => Math.cos(i / 5) * Math.exp(-i / 200) + 0.5 * Math.sin(i / 2),
    )
  } else if (lowerPrompt.includes("schrodinger")) {
    fallbackData.simulationData.title = "Schrödinger Equation (Fallback)"
    fallbackData.simulationData.explanation = "Fallback visualization of a wavefunction."
    fallbackData.simulationData.equations = [
      "i\\hbar\\frac{\\partial}{\\partial t}\\Psi(x,t) = -\\frac{\\hbar^2}{2m}\\frac{\\partial^2}{\\partial x^2}\\Psi(x,t) + V(x)\\Psi(x,t)",
    ]

    // Wavefunction
    fallbackData.results.y = Array.from({ length: 100 }, (_, i) => {
      const x = (i - 50) / 10
      return Math.exp((-x * x) / 2) * Math.cos(5 * x)
    })
  } else if (lowerPrompt.includes("math") || lowerPrompt.includes("equation") || lowerPrompt.includes("solve")) {
    fallbackData.simulationData.title = "Mathematical Solution (Fallback)"
    fallbackData.simulationData.explanation = "Fallback mathematical visualization."
    fallbackData.simulationData.equations = ["f(x) = x^2 - 4x + 4", "f(x) = (x - 2)^2"]

    // Parabola
    fallbackData.results.y = Array.from({ length: 100 }, (_, i) => {
      const x = i / 10 - 5
      return x * x - 4 * x + 4
    })

    // Add step-by-step solution
    fallbackData.steps = [
      "Step 1: Identify the equation type",
      "Step 2: Apply the appropriate formula",
      "Step 3: Solve for the unknown variables",
      "Step 4: Verify the solution",
    ]
  }

  return NextResponse.json(fallbackData)
}
