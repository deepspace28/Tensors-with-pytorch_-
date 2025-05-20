import { NextResponse } from "next/server"
import { getDynamicEnv } from "@/lib/dynamic-env"

export async function GET() {
  const config = getDynamicEnv()

  // Remove any sensitive information
  const safeConfig = {
    environment: config.environment,
    featureFlags: config.featureFlags,
    debugMode: config.debugMode,
    analyticsEnabled: config.analyticsEnabled,
    // Include safe URLs but not full API URLs
    baseUrlDomain: new URL(config.baseUrl).hostname,
    apiUrlDomain: new URL(config.apiBaseUrl).hostname,
  }

  return NextResponse.json({
    status: "success",
    config: safeConfig,
    envVars: {
      NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL ? "Set" : "Not set",
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ? "Set" : "Not set",
      NEXT_PUBLIC_FEATURE_FLAG: process.env.NEXT_PUBLIC_FEATURE_FLAG || "Not set",
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ? "Set" : "Not set",
      NEXT_PUBLIC_GROQ_API_KEY: process.env.NEXT_PUBLIC_GROQ_API_KEY ? "Set" : "Not set",
    },
  })
}
