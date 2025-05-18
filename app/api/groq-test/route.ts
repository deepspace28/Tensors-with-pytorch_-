import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if GROQ_API_KEY is available
    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is missing")
      return NextResponse.json(
        { error: "GROQ_API_KEY is missing", env: Object.keys(process.env).filter((k) => k.includes("GROQ")) },
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

    // Log the API key length for debugging (never log the actual key)
    console.log("GROQ_API_KEY length:", process.env.GROQ_API_KEY.length)

    // Make a simple request to Groq API to list models
    const response = await fetch("https://api.groq.com/openai/v1/models", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
    })

    // Get response data
    const data = await response.json()

    // Return response with CORS headers
    return NextResponse.json(
      {
        status: response.status,
        ok: response.ok,
        data: data,
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
    console.error("Groq test error:", error)
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
