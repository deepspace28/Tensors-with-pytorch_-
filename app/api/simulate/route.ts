import { NextResponse } from "next/server"
import { logger } from "@/lib/logger"

// Define fallback results for simulations
const FALLBACK_SIMULATION_RESULT = {
  title: "Quantum Simulation (Mock)",
  description: "This is a mock simulation result since the Python backend has been removed.",
  circuit: `
    q0: ───H───
    q1: ───X───
  `,
  measurements: {
    headers: ["State", "Probability"],
    rows: [
      ["00", "0.0"],
      ["01", "0.5"],
      ["10", "0.5"],
      ["11", "0.0"],
    ],
  },
  insights: [
    "This is a mock simulation since the Python backend has been removed.",
    "In a real simulation, you would see actual quantum computation results.",
  ],
  codeSnippet: `
# This is a mock code snippet
# In a real implementation, this would create a quantum circuit
  `,
}

export async function POST(request: Request) {
  try {
    // Add CORS headers
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    }

    // Handle preflight requests
    if (request.method === "OPTIONS") {
      return new NextResponse(null, { status: 204, headers })
    }

    const body = await request.json()
    const { prompt } = body

    if (!prompt) {
      return NextResponse.json({ error: "Missing required parameter: prompt" }, { status: 400, headers })
    }

    logger.info(`Received simulation request: ${prompt} - returning mock data`)

    // Return a mock result
    return NextResponse.json(
      {
        ...FALLBACK_SIMULATION_RESULT,
        prompt: prompt,
      },
      { headers },
    )
  } catch (error) {
    logger.error(`Error in simulation API: ${error instanceof Error ? error.message : String(error)}`)

    // Return a fallback result with error information
    return NextResponse.json(
      {
        ...FALLBACK_SIMULATION_RESULT,
        error: `API error: ${error instanceof Error ? error.message : String(error)}`,
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 200 },
    )
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
