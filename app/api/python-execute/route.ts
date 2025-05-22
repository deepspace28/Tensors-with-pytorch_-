import { NextResponse } from "next/server"
import { logger } from "@/lib/logger"

// Define a fallback response for when execution is requested
const FALLBACK_RESPONSE = {
  output: "Mock output: The Python execution service has been removed.",
  message: "Python backend has been removed - using mock data",
}

export async function POST(request: Request) {
  // Add CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  }

  try {
    const body = await request.json()
    const { code } = body

    if (!code) {
      return NextResponse.json({ error: "Missing required parameter: code" }, { status: 400, headers })
    }

    logger.info("Received Python execution request - returning mock data")

    // Return a mock response
    return NextResponse.json(
      {
        ...FALLBACK_RESPONSE,
        code: code,
      },
      { status: 200, headers },
    )
  } catch (error) {
    logger.error(`API error: ${error instanceof Error ? error.message : String(error)}`)

    // Return a fallback response
    return NextResponse.json(
      {
        ...FALLBACK_RESPONSE,
        error: `API error: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 200, headers },
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
