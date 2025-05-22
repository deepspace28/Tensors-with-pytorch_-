import { NextResponse } from "next/server"
import { logger } from "@/lib/logger"
import { getMockQuantumData } from "@/lib/mock-quantum-data"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { prompt, parameters = {} } = body

    if (!prompt) {
      return NextResponse.json({ error: "Missing required parameter: prompt" }, { status: 400 })
    }

    logger.info(`Received quantum simulation request: ${prompt} - returning mock data`)

    // Use mock data since Python backend has been removed
    const mockData = getMockQuantumData(prompt)

    // Return the structured data
    return NextResponse.json({
      summary: mockData.summary,
      equations: mockData.equations || [],
      insight: mockData.insight || "",
      chart: mockData.chart,
      circuit: mockData.circuit,
      message: "Python backend has been removed - using mock data",
    })
  } catch (error) {
    logger.error(`Error in quantum simulation: ${error.message}`, error)

    // Return a more detailed error response
    return NextResponse.json(
      {
        error: "Failed to run quantum simulation",
        details: error.message,
        message: "Python backend has been removed - using mock data",
      },
      { status: 500 },
    )
  }
}
