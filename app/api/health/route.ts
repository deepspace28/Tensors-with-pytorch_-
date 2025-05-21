import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if critical server-side environment variables exist
    // Don't expose their values, just check if they're set
    const groqApiKey = !!process.env.GROQ_API_KEY

    // Return a properly structured response
    return NextResponse.json({
      status: groqApiKey ? "ok" : "warning",
      message: groqApiKey ? "All systems operational" : "Some services may be unavailable",
      timestamp: new Date().toISOString(),
      services: {
        groq: {
          configured: groqApiKey,
          status: groqApiKey ? "available" : "unconfigured",
        },
      },
    })
  } catch (error) {
    console.error("Health check error:", error)

    // Even on error, return a properly structured response
    return NextResponse.json(
      {
        status: "error",
        message: "Health check failed",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
        services: {
          groq: {
            configured: false,
            status: "unknown",
          },
        },
      },
      { status: 500 },
    )
  }
}
