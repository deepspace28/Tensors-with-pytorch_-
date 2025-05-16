import { NextResponse } from "next/server"
import { processScientificPrompt } from "@/lib/engines/dynamicSimulationEngine"
import { logger } from "@/lib/logger"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { prompt, context } = body

    if (!prompt) {
      return NextResponse.json({ error: "Missing required parameter: prompt" }, { status: 400 })
    }

    logger.info(`Received dynamic simulation request: ${prompt}`)

    // Process the scientific prompt using our engine
    const result = await processScientificPrompt({
      prompt,
      context,
    })

    // Only return the result if it has a summary
    if (!result.summary) {
      return NextResponse.json({ error: "Failed to generate a valid scientific result" }, { status: 500 })
    }

    return NextResponse.json(result)
  } catch (error) {
    logger.error(`Error in dynamic simulation API: ${error instanceof Error ? error.message : String(error)}`)

    return NextResponse.json(
      {
        error: "Failed to process simulation",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
