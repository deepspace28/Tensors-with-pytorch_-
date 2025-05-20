import { NextResponse } from "next/server"
import { serverEnv } from "@/lib/env"

export async function GET() {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  }

  try {
    // Check if GROQ_API_KEY is configured
    const groqConfigured = Boolean(serverEnv.GROQ_API_KEY)
    let groqStatus = "unknown"
    let groqMessage = ""

    // Only test the API if the key is configured
    if (groqConfigured) {
      try {
        // Simple test request to Groq API
        const response = await fetch("https://api.groq.com/openai/v1/models", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${serverEnv.GROQ_API_KEY}`,
          },
          cache: "no-store",
        })

        if (response.ok) {
          groqStatus = "available"
          groqMessage = "API is responding normally"
        } else {
          // Handle different error codes
          if (response.status === 401) {
            groqStatus = "unavailable"
            groqMessage = "Invalid API key"
          } else if (response.status === 429) {
            groqStatus = "limited"
            groqMessage = "Rate limit exceeded"
          } else {
            groqStatus = "unavailable"
            groqMessage = `API returned status ${response.status}`
          }
        }
      } catch (error) {
        groqStatus = "unavailable"
        groqMessage = error instanceof Error ? error.message : "Unknown error"
      }
    } else {
      groqStatus = "unconfigured"
      groqMessage = "API key not configured"
    }

    // Return the health status
    return NextResponse.json(
      {
        status: groqStatus === "available" ? "ok" : "error",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
        services: {
          groq: {
            configured: groqConfigured,
            status: groqStatus,
            message: groqMessage,
          },
        },
      },
      { headers },
    )
  } catch (error) {
    // Handle any unexpected errors
    console.error("Health check error:", error)
    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
        message: error instanceof Error ? error.message : "Unknown error",
        services: {
          groq: {
            configured: false,
            status: "unknown",
            message: "Health check failed",
          },
        },
      },
      { headers, status: 500 },
    )
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
