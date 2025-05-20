import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if critical server-side environment variables exist
    // Don't expose their values, just check if they're set
    const criticalVars = {
      GROQ_API_KEY: !!process.env.GROQ_API_KEY,
      // Add other critical variables as needed
    }

    const allCriticalVarsSet = Object.values(criticalVars).every(Boolean)

    if (!allCriticalVarsSet) {
      return NextResponse.json(
        {
          status: "warning",
          message: "Some critical environment variables are missing",
          timestamp: new Date().toISOString(),
        },
        { status: 200 },
      )
    }

    return NextResponse.json({
      status: "ok",
      message: "All systems operational",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Health check error:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Health check failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
