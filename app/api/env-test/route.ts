import { NextResponse } from "next/server"
import { serverEnv } from "@/lib/env"

export async function GET() {
  // Check which server-side environment variables are set (without revealing values)
  const envStatus = {
    GROQ_API_KEY: !!serverEnv.GROQ_API_KEY,
    MONGODB_URI: !!serverEnv.MONGODB_URI,
    REDIS_URL: !!serverEnv.REDIS_URL,
    PYTHON_API_URL: !!serverEnv.PYTHON_API_URL,
    // Include public variables but not sensitive ones
    NEXT_PUBLIC_API_BASE_URL: !!process.env.NEXT_PUBLIC_API_BASE_URL,
  }

  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    variables: envStatus,
  })
}
