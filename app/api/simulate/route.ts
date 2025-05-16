import { type NextRequest, NextResponse } from "next/server"
import { handleSimulationRequest } from "../../../lib/engines/simulationRouter"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, parameters } = body

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const result = await handleSimulationRequest(prompt, parameters)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in simulation API:", error)

    return NextResponse.json(
      {
        error: "Failed to process simulation request",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
