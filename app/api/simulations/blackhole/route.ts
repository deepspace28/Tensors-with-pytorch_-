import { NextResponse } from "next/server"
import { logger } from "@/lib/logger"
import { callBackendAPI } from "@/lib/replit-api"

export async function POST(request: Request) {
  try {
    const { prompt, parameters = {} } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Missing required parameter: prompt" }, { status: 400 })
    }

    logger.info(`Received blackhole simulation request: ${prompt}`)

    try {
      // Call the backend API for simulation
      const data = await callBackendAPI(prompt, "blackhole", parameters)

      return NextResponse.json({
        success: true,
        data,
      })
    } catch (error) {
      logger.error("Error calling backend API:", error)

      // Fallback response if the API call fails
      return NextResponse.json(
        {
          success: false,
          error: "Failed to run simulation through backend API",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    logger.error("Error in blackhole simulation:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process simulation request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
