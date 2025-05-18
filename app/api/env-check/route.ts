import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Get all environment variables that start with GROQ or NEXT
    const envVars = Object.keys(process.env)
      .filter((key) => key.includes("GROQ") || key.includes("NEXT"))
      .reduce(
        (obj, key) => {
          // Don't include the actual values, just whether they exist and their length
          obj[key] = {
            exists: true,
            length: process.env[key]?.length || 0,
          }
          return obj
        },
        {} as Record<string, { exists: boolean; length: number }>,
      )

    // Return environment variables with CORS headers
    return NextResponse.json(
      {
        environment: process.env.NODE_ENV,
        variables: envVars,
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      },
    )
  } catch (error) {
    // Log and return error
    console.error("Environment check error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      },
    )
  }
}

export async function OPTIONS() {
  // Handle OPTIONS preflight request
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
