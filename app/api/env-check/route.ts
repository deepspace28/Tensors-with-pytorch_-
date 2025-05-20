import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Only check if non-sensitive variables exist, don't expose actual values
    // Never check for or expose API keys here
    const envStatus = {
      // Only check if server-side variables exist, don't expose their values
      hasServerKeys: {
        GROQ_API_KEY: !!process.env.GROQ_API_KEY,
        MONGODB_URI: !!process.env.MONGODB_URI,
        REDIS_URL: !!process.env.REDIS_URL,
      },
      // Safe to expose these non-sensitive environment settings
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
    }

    return NextResponse.json({
      status: "ok",
      environment: envStatus,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Environment check error:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to check environment variables",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
